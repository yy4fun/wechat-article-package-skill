# WeChat Article Package Skill

Turn a source URL, blog post, article text, research note, or company announcement into a Chinese WeChat official account article package.

This repository contains one Codex skill:

```text
wechat-article-package/
  SKILL.md
  agents/openai.yaml
  references/
  scripts/wechat-api-publish.mjs
  templates/wechat-api.env.example
```

The skill is named `wechat-article-package` because it covers the full article package:

- source extraction and faithful fact handling
- Chinese deep-dive article draft
- title, summary, and article angle
- WeChat `21:9` and `1:1` cover images
- supporting article cards
- WeChat editor/API-safe HTML body
- optional Feishu/Lark document sync

## Install

Copy the skill folder into your Codex skills directory:

```bash
mkdir -p ~/.codex/skills
cp -R wechat-article-package ~/.codex/skills/
```

Then ask Codex to use `$wechat-article-package` on a source URL or article.

## WeChat Draft API Helper

The optional helper script creates a WeChat official account draft from a generated `wechat-draft.html` and local cover/body images.

Copy the env template:

```bash
cp wechat-article-package/templates/wechat-api.env.example .env
```

Fill in your own WeChat official account credentials locally. Do not commit `.env`.

Run a dry run first:

```bash
DRY_RUN=1 node wechat-article-package/scripts/wechat-api-publish.mjs
```

Create a draft:

```bash
node wechat-article-package/scripts/wechat-api-publish.mjs
```

The script creates a draft only. It never publishes automatically.

## Feishu/Lark Sync

Feishu/Lark sync is optional. When enabled, use XML-style structured documents instead of raw Markdown import so images sit near relevant sections and the document remains readable.

## Safety

- Do not commit `.env`, API secrets, access tokens, or generated drafts.
- The API helper reads credentials from local environment variables or `.env`.
- The skill tells the agent to create WeChat drafts, not publish them.
