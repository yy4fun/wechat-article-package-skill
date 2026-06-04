# Social Layout

Use this when the user wants polished WeChat cover pairs, article cards, quote cards, weekly blog roundups, or supporting images for a public-account article.

## Output Set

For WeChat article packages, default to:

```text
wechat-21x9-cover.png         2100 x 900
wechat-1x1-cover.png          1080 x 1080
wechat-cover-pair-preview.png optional review image
article-card-01-*.png         optional in-article card
article-card-02-*.png         optional in-article card
```

Use stable task folders:

```text
wechat-<slug>/
  index.html
  render.mjs
  assets/
  output/
```

## Rendering Rule

Use HTML/CSS for any image that contains important Chinese text. It gives exact typography, line breaks, and repeatable exports.

Use image generation only for raw visual assets:

- Background illustration without text.
- Conceptual object/scene.
- Soft hero image to place behind HTML text.

Do not ask an image model to render long Chinese headings, tables, labels, or citations when HTML/CSS can do it.

## WeChat Cover Pair

`21:9` main cover:

- Size: `2100 x 900`.
- Full or near-full article title.
- One strong visual relation: diagram, screenshot, generated illustration, or source image.
- Subtitle and metadata allowed if they help.
- Keep center from feeling hollow; scale title or visual up before adding decoration.

`1:1` square cover:

- Size: `1080 x 1080`.
- Short title only by default, 4-10 Chinese characters.
- No image by default unless it is the core visual.
- Compose separately; do not crop the `21:9` cover.

## Article Image Roles

Prefer 3-5 supporting images for a deep-dive article:

- `roundup-card`: past-week blog list or source overview.
- `source-evidence`: official source screenshot/figure with attribution.
- `concept-card`: self-made diagram explaining the core idea.
- `mistake-card`: three failure modes, risks, or myths.
- `workflow-card`: before/after or step-by-step work process.
- `closing-card`: one short takeaway for sharing.

Every supporting image should answer: what should the reader understand in one glance?

## Layout Recipes

Use a small set of repeatable structures:

- `Hero split`: big headline left, evidence/diagram right.
- `Issue board`: weekly list with dates and one-line takeaways.
- `Three causes`: three columns or stacked rows, each with an icon, title, and consequence.
- `Pipeline`: 4-6 steps connected by arrows or rules.
- `Quote card`: one large judgment sentence plus short source note.
- `Definition card`: term, plain-language definition, one example.

Avoid making every image a rounded card grid. Use rules, columns, type hierarchy, and whitespace instead.

## QA

- Exported dimensions match the requested platform.
- WeChat body HTML does not include a visible first `<h1>` that duplicates the platform article title.
- WeChat body HTML does not include a pre-cover summary that repeats the opening paragraph after the cover.
- Body section headings should be left-aligned and restrained. Prefer bold text with spacing or a thin bottom rule; avoid heavy left bars, centered card-like headings, and decorative heading blocks that may render strangely in WeChat.
- If WeChat centers or indents `<h2>`, do not use semantic heading tags in the API/editor body. Use a normal section with `data-role="heading"` and an inner block-level span for the visible title.
- Body text blocks should use `<section>` rather than `<p>` if WeChat's final editor adds first-line indentation. Body paragraphs/headings should carry inline `text-indent:0em !important; text-align:left;`. If direct section text still indents, wrap the text in an inner block-level span reset. Do not rely only on a parent class or stylesheet, because WeChat can rewrite styles after a draft enters the final editor.
- Text is readable at phone thumbnail size.
- Chinese line breaks are intentional.
- No text touches edges or overlaps images.
- Each image has one focal point.
- Official/source images are not distorted or cropped in a misleading way.
- File paths are reported in the final response.
