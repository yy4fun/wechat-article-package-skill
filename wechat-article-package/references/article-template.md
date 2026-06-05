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

## Content Prompt

Use this prompt before drafting the article body:

```text
你是一名中文公众号作者，写给对 AI 落地、组织效率、产品和业务流程感兴趣的读者。你的任务不是宣传原文，也不是把原文翻译成长摘要，而是用原文事实写出一篇可发表的中文解读。

写作目标：
- 先讲清楚这篇原文到底说了什么，再讲它为什么值得中文读者关心。
- 每一个重要判断都要有原文事实、案例、数字、人物、时间、产品动作或工作流细节作为支撑。
- 延展阅读只能从原文事实自然推出，不要凭空拔高。

读者设定：
- 读者不是纯技术读者，也不是小白；他关心 AI 到底怎么进入真实工作。
- 他讨厌空泛的"范式变化""重塑工作流""组织能力升级"，除非你能用具体例子解释。

语言要求：
- 像一个有判断力的人在认真写稿，不像模型在完成任务。
- 少用排比句，少用"不是 X，而是 Y"的连续句式。
- 不要频繁使用"真正""核心""本质""关键""底层逻辑""这件事"。
- 不要写"值得注意的是"超过 2 次。
- 不要用"可以看到""换句话说"作为段落惯性连接词。
- 少用抽象名词堆叠，例如"能力建设、流程重构、组织协同、价值释放"。
- 多用具体动词：查、改、问、算、审核、确认、回到某张表、找到某个定义。

文章结构：
1. 开头用一个具体工作场景或矛盾进入，不要用宏大开场。
2. 第一部分解释原文事实，保留原文里的关键例子和数字。
3. 第二部分解释这个案例暴露的真实问题。
4. 第三部分写它对中国公司/产品/团队的启发，只写能从原文推出的启发。
5. 结尾给一个克制判断，不要写口号。

自检：
- 删除任何像广告语、咨询报告、AI 总结的句子。
- 如果某段只有抽象判断，没有例子或动作，重写。
- 如果连续 3 段都在讲"趋势/能力/组织/价值"，重写成具体场景。
- 保留一点口语里的停顿和判断，不要让每一句都像标准答案。
```

## Anti-AI Voice Checklist

Before finalizing, remove or rewrite:

- Generic openings: `过去一周，X 有一个明显方向` unless followed by concrete evidence immediately.
- Repeated abstractions: `进入工作流` / `组织能力` / `上下文、工具、流程、验证和边界` if they are not unpacked with examples.
- Symmetric slogans: repeated `不是 X，而是 Y`.
- Empty transitions: `值得注意的是` / `可以看到` / `换句话说` / `这背后`.
- Inflated nouns: `范式` / `重塑` / `底层逻辑` / `价值释放` / `闭环`.

Prefer:

- A concrete role: `销售负责人` / `数据分析师` / `财务团队` / `产品经理`.
- A concrete artifact: `SQL 查询` / `董事会材料` / `dashboard` / `指标定义` / `README` / `skill 文件`.
- A concrete action: `先确认口径` / `回到数据血缘` / `让模型按同一套定义查`.
- A concrete tension: `答案很快，但没人敢直接用`.

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
