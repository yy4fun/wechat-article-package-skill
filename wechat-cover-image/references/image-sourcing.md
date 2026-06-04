# Image Sourcing

Use this when a WeChat article package is based on a source article, company blog, product page, research paper, or web report.

## Image Roles

Separate image roles:

- Cover / main visual: usually self-made or generated, not copied from the source.
- Source evidence: official source figures, screenshots, architecture diagrams, or product screenshots used to explain the original.
- Explanation image: self-made diagram/card that interprets the source for Chinese readers.
- Decorative image: avoid unless it adds meaning.

## Source Blog Images

When using images from the source blog:

- Use only the images needed to explain the source.
- Keep source context visible in the article text or caption.
- Add a nearby note such as `图源：Anthropic Claude Blog`.
- Link the original source at the end of the article.
- Do not use official images as if they were original branding, article cover, or account identity.
- Prefer recreating simple diagrams yourself when the article's value is interpretation, not screenshot evidence.

This is workflow guidance, not legal advice. If a user needs commercial/legal certainty, ask them to confirm usage rights.

## SOURCES.md

For downloaded or referenced images, create `assets/SOURCES.md` or `output/SOURCES.md`:

```text
filename.png
- Source: <url>
- Role: source evidence / cover visual / generated asset
- Note: <caption or attribution text>
```

## Choosing Official vs Self-Made

Use official/source images when:

- The visual is the object being discussed.
- The figure contains architecture or product evidence.
- A reader benefits from seeing the original artifact.

Use self-made images when:

- You are explaining the implication.
- You need Chinese labels or simplified structure.
- The source image is too branded, too dense, or unsuitable for a cover.

Use generated images when:

- No source visual exists.
- The piece needs a friendly metaphor.
- The image has no important text.
