#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function loadDotEnv(filePath) {
  try {
    const text = await fs.readFile(filePath, "utf8");
    for (const rawLine of text.split(/\r?\n/)) {
      const line = rawLine.trim();
      if (!line || line.startsWith("#")) continue;
      const match = line.match(/^(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
      if (!match) continue;

      const [, key, rawValue] = match;
      if (process.env[key] !== undefined) continue;

      let value = rawValue.trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      process.env[key] = value;
    }
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
}

await loadDotEnv(path.join(__dirname, ".env"));
await loadDotEnv(path.join(process.cwd(), ".env"));

const config = {
  appId: process.env.WECHAT_APP_ID,
  appSecret: process.env.WECHAT_APP_SECRET,
  accessToken: process.env.WECHAT_ACCESS_TOKEN,
  title: process.env.WECHAT_ARTICLE_TITLE || "Untitled WeChat Draft",
  author: process.env.WECHAT_ARTICLE_AUTHOR || "",
  digest: process.env.WECHAT_ARTICLE_DIGEST || "",
  sourceUrl: process.env.WECHAT_CONTENT_SOURCE_URL || "",
  htmlPath: process.env.WECHAT_HTML_PATH || path.join(process.cwd(), "wechat-draft.html"),
  coverPath: process.env.WECHAT_COVER_PATH || path.join(process.cwd(), "output", "wechat-21x9-cover.png"),
  thumbMediaId: process.env.WECHAT_THUMB_MEDIA_ID,
  dryRun: process.env.DRY_RUN === "1",
};

function requireValue(value, name) {
  if (!value) throw new Error(`Missing ${name}`);
  return value;
}

async function postJson(url, body) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  });
  const json = await res.json();
  if (!res.ok || json.errcode) {
    throw new Error(`${url}\n${JSON.stringify(json, null, 2)}`);
  }
  return json;
}

async function postFile(url, filePath) {
  const bytes = await fs.readFile(filePath);
  const blob = new Blob([bytes]);
  const form = new FormData();
  form.append("media", blob, path.basename(filePath));
  const res = await fetch(url, { method: "POST", body: form });
  const json = await res.json();
  if (!res.ok || json.errcode) {
    throw new Error(`${url}\n${filePath}\n${JSON.stringify(json, null, 2)}`);
  }
  return json;
}

async function getAccessToken() {
  if (config.accessToken) return config.accessToken;
  const appId = requireValue(config.appId, "WECHAT_APP_ID");
  const appSecret = requireValue(config.appSecret, "WECHAT_APP_SECRET");
  const url =
    "https://api.weixin.qq.com/cgi-bin/token" +
    `?grant_type=client_credential&appid=${encodeURIComponent(appId)}` +
    `&secret=${encodeURIComponent(appSecret)}`;
  const res = await fetch(url);
  const json = await res.json();
  if (!res.ok || json.errcode || !json.access_token) {
    throw new Error(`Failed to get access_token:\n${JSON.stringify(json, null, 2)}`);
  }
  return json.access_token;
}

function extractArticleHtml(fullHtml) {
  const match = fullHtml.match(/<main id="wechat-copy-root"[^>]*>([\s\S]*?)<\/main>/);
  if (!match) throw new Error("Cannot find #wechat-copy-root in HTML");
  return match[1].trim();
}

function findLocalImageSrcs(content) {
  const srcs = [];
  for (const match of content.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/g)) {
    const src = match[1];
    if (!/^https?:\/\//i.test(src) && !src.startsWith("data:")) srcs.push(src);
  }
  return [...new Set(srcs)];
}

function enforceWeChatInlineResets(content) {
  return content
    .replace(/<h2\b/g, '<section data-role="heading"')
    .replace(/<\/h2>/g, "</section>")
    .replace(/<p\b/g, "<section")
    .replace(/<\/p>/g, "</section>")
    .replace(
      /<(section|h2|img)\b([^>]*)\bstyle="([^"]*)"/g,
      (match, tag, beforeStyle, style) => {
        const declarations = style
          .split(";")
          .map((item) => item.trim())
          .filter(Boolean)
          .filter((item) => !/^text-indent\s*:/i.test(item))
          .filter((item) => !/^text-align\s*:/i.test(item));
        declarations.unshift("text-indent:0em !important", "text-align:left");
        return `<${tag}${beforeStyle}style="${declarations.join("; ")};"`;
      },
    );
}

function wrapLeafTextBlocks(content) {
  return content.replace(
    /<section\b([^>]*)>((?:(?!<\/?section\b).)*?)<\/section>/gs,
    (match, attrs, inner) => {
      const trimmed = inner.trim();
      if (!trimmed || /^<span\b/i.test(trimmed) || /<(img|table|h[1-6]|ul|ol)\b/i.test(trimmed)) {
        return match;
      }
      const isHeading = /\bdata-role="heading"/.test(attrs);
      const spanStyle = isHeading
        ? "display:block; text-align:left; text-indent:0em !important; margin:0; padding:0; font-size:21px; line-height:1.45; font-weight:800; color:#24231f;"
        : "display:block; text-align:left; text-indent:0em !important; margin:0; padding:0;";
      return `<section${attrs}><span style="${spanStyle}">${trimmed}</span></section>`;
    },
  );
}

async function prepareContent(accessToken) {
  const html = await fs.readFile(config.htmlPath, "utf8");
  let content = wrapLeafTextBlocks(enforceWeChatInlineResets(extractArticleHtml(html)));
  const htmlDir = path.dirname(config.htmlPath);
  const localSrcs = findLocalImageSrcs(content);

  const replacements = [];
  for (const src of localSrcs) {
    const imagePath = path.resolve(htmlDir, src);
    if (config.dryRun) {
      replacements.push({ src, imagePath, url: `https://example.invalid/uploaded/${path.basename(src)}` });
      continue;
    }
    const url =
      "https://api.weixin.qq.com/cgi-bin/media/uploadimg" +
      `?access_token=${encodeURIComponent(accessToken)}`;
    const uploaded = await postFile(url, imagePath);
    replacements.push({ src, imagePath, url: uploaded.url });
  }

  for (const item of replacements) {
    content = content.replaceAll(`src="${item.src}"`, `src="${item.url}"`);
  }

  return { content, replacements };
}

async function prepareThumbMediaId(accessToken) {
  if (config.thumbMediaId) return config.thumbMediaId;
  if (config.dryRun) return "DRY_RUN_THUMB_MEDIA_ID";
  const url =
    "https://api.weixin.qq.com/cgi-bin/material/add_material" +
    `?access_token=${encodeURIComponent(accessToken)}&type=image`;
  const uploaded = await postFile(url, config.coverPath);
  return uploaded.media_id;
}

async function main() {
  const accessToken = config.dryRun ? "DRY_RUN_ACCESS_TOKEN" : await getAccessToken();
  const { content, replacements } = await prepareContent(accessToken);
  const thumbMediaId = await prepareThumbMediaId(accessToken);

  const payload = {
    articles: [
      {
        title: config.title,
        author: config.author,
        digest: config.digest,
        content,
        content_source_url: config.sourceUrl,
        thumb_media_id: thumbMediaId,
        show_cover_pic: 1,
        need_open_comment: 0,
        only_fans_can_comment: 0,
      },
    ],
  };

  if (config.dryRun) {
    console.log(
      JSON.stringify(
        {
          mode: "dry-run",
          htmlPath: config.htmlPath,
          coverPath: config.coverPath,
          imageReplacements: replacements,
          payloadPreview: {
            ...payload,
            articles: [{ ...payload.articles[0], content: `${content.slice(0, 600)}...` }],
          },
          contentBytes: Buffer.byteLength(content, "utf8"),
        },
        null,
        2,
      ),
    );
    return;
  }

  const url =
    "https://api.weixin.qq.com/cgi-bin/draft/add" +
    `?access_token=${encodeURIComponent(accessToken)}`;
  const result = await postJson(url, payload);
  console.log(JSON.stringify(result, null, 2));
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
