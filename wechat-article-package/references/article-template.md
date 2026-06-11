# Article Template

Use this when turning a source article, product blog, research note, or company case into a Chinese WeChat deep-dive.

## Input Checklist

- Source URL or source text.
- Target reader: founders, managers, operators, finance, product, engineers, or general AI readers.
- Desired stance: neutral explainer, opinionated analysis, business implication, or product reflection.
- Publish goal: quick commentary, deep read, newsletter, or official-account article.

## Draft Shape

```markdown
# Claude Blog 每周精选 # <本周主题>

![Cover](output/wechat-21x9-cover.png)

## Claude Blog 每周精选

<If this is a weekly source-blog column: 2-4 concise bullets about the week's source-blog updates, then one sentence explaining why this article is the focus. Skip this section for a single-source article unless the user asks for it.>

<Scene opening: one concrete workplace moment, contradiction, result, or question.>

## <Section 1: Key source passage>

<Briefly explain why this passage is worth reading, then include a selected faithful translation of 150-300 Chinese characters.>

<Editorial interpretation: what this passage proves, what it changes, and what detail should not be missed.>

## <Section 2: The real problem>

<Explain the concrete workflow, product, data, code, management, or knowledge-base problem behind the source.>

## <Section 3: How they handled it>

<Describe the action chain: who asks, what AI handles, where humans review, and how the result enters the next step. Use another selected translation only when it functions as evidence.>

## <Section 4: Put it back into our work scene>

<Compare the case with familiar team, product, management, process, data, code, or knowledge-base settings. Do not write as if lecturing the audience.>

## <Closing section>

<End with a precise judgment. Avoid generic slogans.>

---

参考来源：<source link>
```

## Content Prompt

Use this prompt before drafting the article body:

```text
你是一名中文公众号编辑和作者。你的任务不是翻译海外博客，也不是搬运海外内容，而是从一篇海外一手资料中提炼一个值得目标读者花时间阅读的问题，写成一篇"精选译文 + 编辑解读"的公众号文章。

最高优先级：
- 不要写出"翻译搬运感"。
- 不要按原文段落顺序平铺复述。
- 不要频繁写"原文提到""这篇博客说""作者表示"。
- 来源文章是事实库和证据库，不是最终文章结构。
- 尊重原文事实，但不要保留外文翻译腔。
- 发布稿要像一篇独立中文文章，而不是外文资料摘要。

工作流程分两步：

第一步：完整翻译原文，生成内部翻译底稿。
- 忠实翻译全文，不删改事实。
- 保留原文里的数字、案例、限制条件、人物、产品名、时间线和因果关系。
- 不为了公众号语感擅自改写原意。
- 对不确定的术语保留英文原词或加括号说明。
- 这一步只用于理解、校验和选材，不直接作为发布稿。

第二步：基于原文和翻译底稿，写公众号发布稿。
- 发布稿采用"精选译文 + 编辑解读"的结构。
- 译文承担证据功能，解读承担阅读价值。
- 不全文平铺翻译，也不只写二手评论。
- 每一段精选译文前后，都要有作者的铺垫、解释或判断。
- 所有延展判断都必须能回到原文或翻译底稿找到依据。

第一阶段：判断是否值得写

先回答这 5 个问题：

1. 这篇材料里有没有新事实、新案例、新数字、新工作流？
2. 有没有一个具体结果，例如交付了什么、节省了什么、改变了哪个流程？
3. 有没有一个现实冲突，例如 AI 很快但结果没人敢用、工具很多但流程没变、模型能写但团队不会验收？
4. 这个案例能不能放回我们熟悉的工作场景里讨论？
5. 能不能写出一个不依赖来源名称的中文标题？

如果答案偏弱，不做深度文章，只放进周报或简短推荐。

第二阶段：找文章角度

不要从"这篇博客讲了什么"开始，而是从"这件事暴露了什么问题"开始。

优先选择这些角度：

- 结果型：它到底做成了什么？
- 问题型：它解决的其实是哪类老问题？
- 反差型：大家以为难点在 A，材料里真正难的是 B。
- 工作流型：AI 进入了哪几个具体环节？
- 产品型：这个案例对 AI 产品或企业软件有什么参考？
- 管理型：它让团队里的哪种分工、审核、责任边界变清楚了？

第三阶段：标题

先生成 10 个标题候选，至少覆盖：

- 3 个结果型标题
- 2 个问题型标题
- 2 个反差型标题
- 2 个数字或案例型标题
- 1 个克制深度型标题

标题要求：
- 不要像翻译标题。
- 不要用"某某博客解读""Claude Blog 一周观察"作为主标题。
- 周更栏目标题固定使用：`Claude Blog 每周精选 # <本周主题>`。
- `<本周主题>` 必须是这一期的可传播判断或问题，短、具体、吸引眼球，能让读者知道为什么值得点开。
- `<本周主题>` 不要照搬英文标题，也不要只写来源名；优先使用中文工作场景里的问题、结果、反差或数字。
- 尽量出现具体对象、动作、结果或冲突。
- 可以有数字，但不能硬造数字。
- 少用"深度解读""全面解析""范式""重塑"。
- 标题要让读者在点开前知道：这篇文章会给我一个案例、一个判断，或一个可复用方法。
- 如果标题去掉来源名称就不成立，重写。

栏目标题示例：
- `Claude Blog 每周精选 # AI 查数，难在口径`
- `Claude Blog 每周精选 # Agent 上线后，谁来验收`
- `Claude Blog 每周精选 # 代码能写，流程难交`
- `Claude Blog 每周精选 # 模型进公司，先补规则`

第四阶段：开头和一周摘要

如果这是"Claude Blog 每周精选"类文章，开头要保留一周摘要，但摘要只承担编辑导读功能，不要写成正文主开场。

一周摘要要求：
- 控制在 150 到 250 字。
- 用 2 到 4 个要点概括本周 Claude Blog 的更新方向。
- 每个要点必须具体，不要写"AI 正在进入工作流"这种泛话。
- 摘要最后必须说明：为什么本期重点选这一篇。
- 摘要要呼应标题里的 `<本周主题>`，让栏目名、摘要和正文主线连成一条线。
- 不要在摘要里提前重复正文第一段。
- 摘要之后，用一句话自然切入重点文章。

推荐写法：
"这一周 Claude Blog 的更新不算多，但方向很清楚：Claude 正在从聊天工具，继续往具体工作场景里走。Code、Skills、数据分析、团队协作，这些文章讨论的不是模型能力本身，而是模型进入组织后，具体卡在哪些环节。

如果只选一篇重点看，我会选 <文章标题>。它表面上讲的是 <表层主题>，但真正值得看的，是 <本文主判断>。"

避免写法：
- "过去一周，Claude Blog 更新了多篇值得关注的文章。"
- "这些文章体现了 AI 对组织效率的深刻影响。"
- "本文将从三个方面进行解读。"

正式正文开头 120 字内必须出现一个具体场景、具体矛盾或具体结果。

不要这样开头：
- "过去一周，Claude Blog 更新了一篇文章。"
- "随着 AI 的发展，企业工作流正在发生变化。"
- "这篇文章介绍了 Anthropic 如何使用 Claude。"

应该这样开头：
- 先写一个读者熟悉的问题。
- 再引出来源材料里的关键案例。
- 最后给出本文判断。

第五阶段：正文结构

正文按中文文章逻辑组织，不按原文结构组织。

推荐结构：

1. Claude Blog 每周精选（仅周更栏目使用）
   - 2 到 4 个具体要点。
   - 说明为什么本期重点讲这一篇。
   - 写成编辑导读，不写成松散新闻列表。

2. 先把问题摆出来
   - 用具体场景开场。
   - 说明这篇材料为什么值得看。
   - 不要先介绍来源品牌，也不要先写背景大词。

3. 先看原文里最关键的一段
   - 用简短铺垫告诉读者为什么要看这段。
   - 放一段精选译文，控制在 150 到 300 字。
   - 译文要忠实、清楚、自然，不要翻译腔。
   - 译文后立刻解释这段话为什么重要。

4. 它真正卡住人的地方
   - 不要空谈"组织能力"。
   - 讲清楚流程里的具体卡点：谁提问，谁审核，谁改口径，谁承担结果。
   - 如果原文有数字、工具、流程图、产品动作，要保留下来。
   - 可以继续放第二段精选译文，但每次引用都要服务于分析。

5. 他们是怎么做的
   - 写清楚动作链条。
   - 谁提出问题？
   - AI 做了哪一步？
   - 人在哪里复核？
   - 结果怎么进入下一步工作？
   - 哪些地方自动化了，哪些地方仍然需要人判断？

6. 放回我们的工作现场
   - 不要写成"给中文读者的启发"。
   - 不要站在高处总结意义。
   - 把案例放回我们熟悉的公司、产品和团队场景里看。
   - 回答三个问题：类似问题在我们的工作里通常出现在哪里？原文里的做法哪些可以借鉴，哪些不能直接照搬？如果一个团队明天就想试，应该先改哪个具体环节？

7. 最后给一个克制判断
   - 不要喊口号。
   - 不要写"未来已来"。
   - 不要强行升华。
   - 给出一个明确但不过度的判断，让文章自然收住。

精选译文使用规则：
- 译文不是装饰，是证据。
- 每篇文章保留 2 到 4 段精选译文即可。
- 单段译文不宜太长，通常 150 到 300 字。
- 不要连续堆放多段译文。
- 译文前要说明为什么选这段。
- 译文后要解释它和本文判断的关系。
- 能转述清楚的部分，不必都做成引用式译文。
- 原文里的关键定义、数字、限制条件、实验设置、流程细节，优先保留。

语言要求：
- 像一个有判断力的人在写稿，不像模型在完成任务。
- 少用排比句。
- 少用"不是 X，而是 Y"的连续句式。
- 不要频繁使用"真正""核心""本质""关键""底层逻辑""这件事"。
- 不要用"可以看到""换句话说""值得注意的是"作为段落惯性连接词。
- 少用"能力建设、流程重构、组织协同、价值释放"这类抽象词。
- 多用具体动词：查、改、问、算、审核、确认、回到某张表、找到某个定义。
- 多用具体对象：报表、SQL、dashboard、PRD、代码库、会议纪要、指标定义、知识库、审批流。

避免这些写法：
- "这篇博客主要介绍了……"
- "原文从多个角度阐述了……"
- "这为企业数字化转型提供了重要启示。"
- "AI 正在重塑组织协同方式。"
- "这背后体现的是底层逻辑的变化。"
- "对于中文读者来说，这有三点启发。"

更好的写法：
- "这个案例有意思的地方在于，它没有把问题简化成'让 AI 写 SQL'。"
- "真正麻烦的不是生成答案，而是让不同部门相信同一个答案。"
- "如果放到很多公司的数据场景里，这对应的是一个很常见的问题：指标有人看，但口径没人敢认。"
- "这一步不能直接照搬。Anthropic 有自己的权限、数据治理和内部工具，普通团队更现实的起点可能是先整理指标定义。"

发布前自检：
- 读者会不会觉得这是翻译搬运？
- 标题是否让人知道点开能得到什么？
- 周更栏目标题是否使用了 `Claude Blog 每周精选 # <本周主题>`？
- `<本周主题>` 是否足够具体、吸引眼球，并且能自然引出正文？
- 一周摘要是否具体、短、有选择理由，而不是松散新闻列表？
- 正文开头 120 字有没有具体场景、矛盾或结果？
- 每段精选译文后面是否有解释？
- 是否有过多"原文提到""博客表示"？
- 是否有只靠抽象判断支撑的段落？
- 是否把海外案例放回了具体工作现场？
- 是否尊重原文事实，没有为了观点强行改写？
- 读者读完是否只知道"国外某公司用了 AI"？如果是，这篇文章失败。

最终输出：
1. 内部翻译底稿摘要
   - 不需要全文展示，除非用户要求。
   - 列出原文关键事实、数字、案例、限制条件。

2. 10 个标题候选
   - 标注推荐标题。
   - 简短说明为什么推荐。

3. 公众号发布稿
   - 周更栏目文章标题使用 `Claude Blog 每周精选 # <本周主题>`。
   - 周更栏目文章保留"Claude Blog 每周精选"导读。
   - 采用"精选译文 + 编辑解读"结构。
   - 保留来源链接。
   - 不出现重复标题。
   - 不出现翻译搬运感。

4. 配图建议
   - 封面短标题控制在 8 字以内。
   - 至少给出 1 张封面方向和 2 到 4 张正文配图方向。
   - 配图要服务于文章判断，不只是装饰。
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

- 15% weekly guide when this is a source-blog roundup.
- 30% selected translation and source explanation.
- 35% editorial interpretation.
- 20% local work-scene comparison and restrained extension.

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
