# Article Template

Use this when turning a source article, product blog, research note, or company case into a Chinese WeChat deep-dive.

## Input Checklist

- Source URL or source text.
- Target reader: founders, managers, operators, finance, product, engineers, or general AI readers.
- Desired stance: neutral explainer, opinionated analysis, business implication, or product reflection.
- Publish goal: quick commentary, deep read, newsletter, or official-account article.

## Draft Shape

```markdown
# <Chinese title>

<Scene opening: one concrete workplace moment, contradiction, or question.>

<Bridge: why this source article is worth reading now.>

## <Section 1: What the source actually says>

<Respectful paraphrase/translation of the source's key facts. Preserve people, dates, numbers, workflow details, and examples. Avoid over-quoting.>

## <Section 2: The real issue>

<Explain the deeper problem behind the source. Use concrete Chinese business/work language.>

## <Section 3: What changes in the workflow>

<Describe the before/after. Show which tasks AI handles and which judgment still belongs to people.>

## <Section 4: Why it matters to Chinese readers>

<Extend to management, business operations, product design, organization capability, or industry implications.>

## <Closing section>

<End with a precise judgment. Avoid generic slogans.>

---

参考来源：<source link>
```

## Publishing Export

Keep the `# <Chinese title>` in `article.md` so the local Markdown file is readable.

When preparing content for WeChat editor paste, `wechat-draft.html`, or WeChat API `content`, remove the first `# <Chinese title>` / first body `<h1>`. The WeChat platform title field already shows the article title above the body, so repeating it creates a duplicate title on the final article page.

Also remove any pre-cover deck, abstract, or lead paragraph if it repeats the first body paragraph. A WeChat draft should not say the same hook once above the cover and again below the cover.

Preferred published body shape:

```markdown
![封面](output/wechat-21x9-cover.png)

<Scene opening...>

## <Section 1>
```

## Writing Rules

- The first 3 paragraphs should create forward motion: scene, tension, judgment.
- Use short section headings. Avoid decorative headings that do not say anything.
- Keep paragraphs breathable: usually 1-4 sentences each.
- Use facts from the source as the spine, then add interpretation.
- Explain jargon in plain Chinese; do not stack abstract nouns.
- Avoid hype words like `颠覆`, `革命`, `范式级`, unless the article earns them.

## Source And Extension Ratio

Good default:

- 40% source explanation and translation.
- 40% interpretation for Chinese readers.
- 20% extension to product, management, or industry implications.

Adjust:

- More source-heavy when the reader has not seen the original.
- More extension-heavy when the source is already widely circulated.

## Title Patterns

- `不是 X，而是 Y`
- `真正重要的不是 X，是 Y`
- `<Company/Team> 怎么用 <AI/tool>`
- `一份 <material/workflow>，暴露了 <larger issue>`
- `<number/time> 背后，<unexpected judgment>`

## Common Rewrites

- `守住数字背后的故事` -> `讲清楚数字背后的业务逻辑`
- `接住那些看不见但耗人的工作` -> `处理那些看不见但耗时的工作`
- `完整性层` -> `一致性检查层` / `校验层`
- `叙事不散架` -> `让整份材料前后说得通`
- `维护业务叙事` -> `保持业务解释的一致`
- `把时间还给判断` -> `把时间留给判断`
