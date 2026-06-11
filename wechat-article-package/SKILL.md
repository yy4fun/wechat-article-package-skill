---
name: wechat-article-package
description: Use when turning a source URL, blog post, article text, research note, or company announcement into a Chinese WeChat official account article package, including deep-dive draft, title, summary, cover images, WeChat draft HTML/API payload, and optional Feishu/Lark doc sync.
---

# WeChat Article Package

Create polished Chinese WeChat article packages from source URLs or source material: source extraction, article angle, Chinese deep-dive draft, title, summary, cover pair, supporting article images, WeChat-ready HTML/API payload, and optional Feishu/Lark document sync. Default to the built-in `$imagegen` workflow only when producing raster illustration assets; prefer HTML/CSS for text-heavy covers and cards.

## Input Modes

- **Source URL first**: when the user gives a link, fetch and extract the source before drafting. Preserve source facts, dates, names, examples, and links.
- **Source text first**: when the user pastes article text or notes, treat that text as the source of truth.
- **Weekly digest**: when the user asks for a weekly blog roundup, inspect the target blog's recent posts, choose the strongest topic, and make the selection logic explicit.
- **Publishing package**: when the user wants a WeChat draft, produce local article files, rendered images, and a WeChat API/editor-safe HTML body.
- **Optional Feishu sync**: only sync to Feishu/Lark when the user asks for it or a project config explicitly enables it.

## Workflow

1. If the input is a URL, extract clean source content before writing. If source facts are current or time-sensitive, verify them live.
2. Extract the article hook: topic, reader pain, curiosity gap, and one concrete judgment.
3. Separate faithful source points from original extension. Do not blur facts and commentary.
4. Draft the article in Chinese with a concrete scene opening, restrained analysis, and a clear final takeaway.
5. Create 3-5 title candidates; prefer one concrete, clickable, non-clickbait title.
6. When exporting for WeChat editor/API, remove the first Markdown `#` title or first body `<h1>` from the article content; the platform title field already supplies it.
7. Produce a WeChat pair: `21:9` main cover plus `1:1` square share cover unless the user only asks for text.
8. For text-heavy covers/cards, build with HTML/CSS and render to PNG so Chinese typography is exact. Use `imagegen` only for raw illustration/photo assets.
9. Never ask an image model to typeset multi-line Chinese/English text inside tight cards. For any list card, quote card, table, or card with wrapped titles, use HTML/CSS and inspect the rendered PNG for clipping before publishing.
10. Plan supporting images: official source screenshots/figures for evidence, self-made diagrams/cards for explanation, generated images only when a missing visual metaphor is needed.
11. Save generated/rendered images under the project workspace, usually `assets/` or a task `output/` folder, without deleting original generated images.
12. If WeChat API credentials/config exist and the user asked for a draft, create a draft but never publish automatically.
13. If Feishu/Lark sync is enabled, create or update a readable doc with inline images and structured blocks; do not dump images at the end.

## Article Writing

Use this structure for deep-dive articles based on a source:

- Weekly guide, when relevant: use the column title format `Claude Blog 每周精选 # <本周主题>`, briefly summarize the week's source-blog updates, then say why this article is the one worth focusing on.
- Opening: begin with a specific work scene, contradiction, or result, not an abstract slogan.
- Selected translation: use translated source passages as evidence, not as the article's whole structure.
- Editorial interpretation: explain what the selected passage proves, what it misses, and why it matters in a familiar work setting.
- Local work-scene comparison: discuss teams, products, management, process, data, code, knowledge bases, or review steps without sounding like a lecture to the audience.
- Closing: end with a concise judgment, not a generic motivational paragraph.

Write in a polished Chinese long-form style: narrative but clear, restrained but opinionated. Do not imitate any living publication's exact voice.

Use the full content prompt before drafting. The prompt should force a concrete reader, a concrete workplace scene, source-backed claims, selected translation plus editorial interpretation, a weekly guide when relevant, and a final human edit pass. Avoid producing a generic "AI trend analysis" essay or a translation dump.

For the full article drafting template, read `references/article-template.md`.

For layout packages and rendered image sets, read `references/social-layout.md`.

For using source blog images safely, read `references/image-sourcing.md`.

## Publishing Export

- Keep `article.md` with a single top-level `# <title>` for local reading and archival use.
- For `wechat-draft.html`, clipboard-ready editor HTML, and WeChat API `content`, start the body after the title: cover image or opening paragraph first, then `##` sections.
- Do not render a visible body `<h1>` when the same text is already in `WECHAT_ARTICLE_TITLE`, a platform title field, or the publishing UI.
- Do not add a separate deck, abstract, or pre-cover lead if the opening paragraphs already say the same thing. Default published order: cover image first, then opening paragraph.
- If a user explicitly wants a title inside the body, use a short deck/subtitle instead of repeating the exact article title.
- For body section headings, prefer simple left-aligned bold text with subtle spacing or a thin bottom rule. Avoid standalone left bars or centered title blocks; they often look odd after WeChat paste/theme rendering.
- Avoid semantic heading tags like `<h2>` in WeChat editor/API body when final editor rewrites heading alignment. Use a normal `<section data-role="heading">` plus an inner bold block-level span.
- Avoid `<p>` for WeChat editor/API body text when the final editor adds first-line indentation. Use `<section>` blocks with inline `text-indent:0; text-align:left;` instead.
- Add inline `text-indent:0; text-align:left;` to the body container and every normal text/heading block. The WeChat publishing editor may add first-line indentation after opening a draft even if the uploaded preview looked fine.
- If `section` blocks still get first-line indentation, wrap leaf text blocks in an inner `<span style="display:block; text-align:left; text-indent:0em !important; margin:0; padding:0;">...</span>`. This resets inherited editor styles closer to the actual text node.
- Optional helper: `scripts/wechat-api-publish.mjs` can create a WeChat draft from `wechat-draft.html`. Configure it with `templates/wechat-api.env.example`; never commit real `.env` values.

## Optional Feishu/Lark Sync

- Treat Feishu/Lark sync as optional. Do it only when requested or configured.
- Use Feishu XML, not raw Markdown import, when the doc needs to be readable and image-rich.
- Put cover and supporting images near the relevant section, not as a pile at the end.
- Use `<callout>`, `<grid>`, `<table>`, `<blockquote>`, `<hr/>`, and `<img>` blocks to break up long text.
- When updating an existing doc, prefer `overwrite` only if the user explicitly wants a full repackaging; otherwise use targeted section updates.

## Source Discipline

- Mark source-derived facts mentally while drafting; cite the source link at the end if the user wants a publishable draft.
- Keep direct translation respectful but not wooden.
- Keep extension clearly grounded in the source instead of inventing unsupported claims.
- If current facts, dates, or source contents matter, verify them before drafting.
- For source-based articles, avoid making up quotes, metrics, publication dates, or job titles.

## Chinese Style Notes

Avoid common AI-flavored phrasing unless it is truly natural in context:

- Prefer `处理` / `承担` / `负责` over `接住`.
- Prefer `讲清楚` / `保持一致` / `校验` over `守住`.
- Prefer `让整份材料前后说得通` over `叙事不散架`.
- Prefer `把时间留给判断` over `把时间还给判断`.
- Prefer concrete nouns and verbs over abstract labels like `完整性层`, unless the article explains them well.

## Signature Style

- Flat hand-drawn doodle illustration, not photorealistic.
- Macaron colors: peach pink, mint green, cream yellow, pale blue, warm off-white.
- Soft watercolor wash or gentle pastel gradient background.
- Simple black line icons with flat fills.
- Rounded irregular blobs, pebble shapes, cloud-like containers.
- 2-5 concrete objects that express the article's argument, such as workflow cards, evidence docs, terminal windows, dashboards, ledgers, permission shields, checklists, or review panels.
- 1-2 small supporting doodle icons such as rocket, lightning, shield, chart, calculator, document, or simple character.
- Decorative stars, dashed lines, dots, and tiny spark marks.
- Breathing room but not emptiness: keep one strong focal visual, fill dead corners with subtle topic-relevant micro elements, and avoid crowded layouts or heavy corporate mood.

## Composition

- Main visual centered or slightly left.
- Reserve the right side for large title text on a soft rounded blob.
- Keep title high contrast: dark gray or black on pale background.
- Use modern rounded sans-serif Chinese typography with moderate weight. Avoid extra-bold, heavy, compressed, or poster-like black fonts.
- Use only free-for-commercial-use Chinese fonts for final rendered text. Preferred choices: `Noto Sans CJK SC`, `Source Han Sans SC`, `Source Han Serif SC`, `LXGW WenKai`, `Alibaba PuHuiTi 3.0`, or other verified free-commercial fonts. If unsure, use Noto/Source Han.
- Avoid logos, brand marks, watermarks, random letters, distorted text, and realistic copyrighted people.

## Title Hooks

For article titles, prefer a concrete promise:

- `Anthropic 财务团队怎么用 Claude：不是写报告，而是讲清楚数字为什么变化`
- `AI 进入 CFO 工作流：真正重要的不是提效`
- `一份董事会材料，暴露了企业 AI 的新位置`

For cover titles, keep them shorter:

- Number hook: `省下20小时`
- Pain hook: `报表太乱了`
- Curiosity hook: `数字会说话`
- Contrast hook: `不只是写报告`
- Outcome hook: `看懂变化`

If the article title is long, make the cover title a shorter hook and put the explanation in the subtitle.

## Prompt Template

For a full cover prompt, read `references/prompt-template.md`.

Minimum prompt shape:

```text
Use case: ads-marketing
Asset type: Chinese WeChat official account cover image, 2.35:1 landscape
Primary request: <article topic and hook>
Visual style: flat hand-drawn doodle illustration, Macaron colors, soft watercolor background
Composition: main visual left/center, right side title area on rounded pastel blob, breathing room but not empty; include 2-5 topic-specific objects
Text (verbatim): Large title: "<8 Chinese chars or fewer>". Small subtitle: "<short subtitle>"
Typography: use free-for-commercial-use Chinese fonts such as Noto Sans CJK SC, Source Han Sans SC, LXGW WenKai, or Alibaba PuHuiTi 3.0; medium or semibold weight, not heavy black.
Text safety: all text must fit fully inside its container with generous padding; no cropped text, no clipped descenders, no half-visible second line. If text wraps, use a larger text box or smaller font.
Constraints: accurate Chinese text, no logos, no watermark, no random letters, no photorealism, no empty-feeling layout, no crowded layout, no clipped or cropped text
```

## Quality Check

Before finishing, verify:

- Article separates source facts from extension and does not invent unsupported claims.
- Article language is natural Chinese, not translationese or AI-flavored filler.
- Article passes the low-AI-voice check: concrete scene, source-backed details, few abstract slogans, no generic "从工具到工作流" filler unless the source specifically supports it.
- Article does not feel like translated/copied source material: selected translated passages are framed, explained, and connected to the article's own argument.
- If it is a weekly source-blog column, the title follows `Claude Blog 每周精选 # <本周主题>` and the theme is concrete, eye-catching, and useful enough to justify reading.
- If it is a weekly source-blog column, the weekly guide is short and editorial, not a duplicate opening paragraph or a loose news list.
- If covers are requested, both `21:9` and `1:1` variants exist unless the user only asked for one.
- Text-heavy covers/cards use deterministic HTML/CSS when possible.
- Final cover text uses verified free-for-commercial-use Chinese fonts and avoids overly bold/heavy title weight.
- Multi-line titles, mixed Chinese/English titles, list cards, and roundup cards have enough row height, line-height, and padding; no text is clipped by fixed-height boxes.
- If a source title is too long for a compact card, rewrite it into a short Chinese label instead of squeezing or clipping it.
- Rendered PNGs are visually inspected before delivery; any clipped text, cropped line, or half-visible title must be fixed and re-rendered.
- WeChat editor/API body does not repeat the platform title as a visible first `<h1>`.
- WeChat editor/API body does not repeat the same hook before and after the cover image.
- WeChat body section headings look like article headings, not detached card titles or broken vertical-bar blocks.
- WeChat body headings avoid `<h2>` if WeChat's final editor centers or indents them; use section/span heading blocks instead.
- WeChat body text uses `<section>` blocks rather than `<p>` when editor-added first-line indentation appears.
- WeChat body paragraphs and headings explicitly set `text-indent:0; text-align:left;` inline to prevent editor-added first-line indentation or centering.
- WeChat leaf text blocks use an inner block-level span reset when the final publish editor still indents direct section text.
- Optional Feishu/Lark output is visually structured, with images placed near relevant sections rather than appended at the end.
- Any official/source image used in the article has a visible or nearby source note.
- Ratio is close to 2.35:1.
- Chinese title is readable and accurate.
- Main generated-image title is 8 Chinese characters or fewer unless the user explicitly chose otherwise; HTML-rendered covers may use longer titles if readable.
- The cover communicates the article hook at a glance.
- The cover has a clear focal visual and does not feel hollow, even when the background stays clean.
- The final image path is in the workspace and shown to the user.
