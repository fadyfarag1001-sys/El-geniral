# الجنرال للعطور

**Al General Parfums** — an Egyptian "inspired-by" perfume brand: the scent of famous international fragrances, made locally, at a price young people can afford. Audience: young men 16–35 first, with a women's line (Madame General) inside the same brand. Shopping is online, Arabic first with an English switch.

> **Update (Nov 2026):** the brand is moving to a global premium niche look. Logo → AG monogram (see `logo/`). Bottles and packaging are modern and premium, not military; packaging uses the olive/sand/gold palette. Sections below that mention chevrons/stencil describe the first website prototype.

The original look was **military luxury**: deep olive, sand and brass gold; rank chevrons; stencil codenames. Think officer's dress uniform and medal case — power, order and polish. **Never war**: no camouflage, guns, bullets, blood or anything violent.

## Content fundamentals

- **Language.** Egyptian Arabic for all copy (حلو، قريب، واثق). English only for stencil codenames, eyebrows and the EN version of the site. Pages are `dir="rtl"`.
- **Voice.** Confident and short, like an order: "ريحة عالمية. بأوامر الجنرال." Military vocabulary as flavour, not overload — رتبة، مهمة، الترسانة، أوامر، تعليمات.
- **Product names.** Every perfume gets an English codename in stencil + a number: `COMMANDER No.01`, `FIELD MARSHAL No.02`, `SNIPER No.03`, `RECON No.04`.
- **The "inspired by" rule (must).** Each product shows `مستوحى من: <original name>` as plain descriptive text. Never use the original brand's logo, bottle shape, packaging or typeface, never say "original" or "نسخة أصلية", and keep the footer disclaimer on every page: "عطور الجنرال مستوحاة من روائح عالمية، وليست تابعة لأي علامة تجارية أصلية ولا معتمدة منها."
- **No invented numbers.** Concentration, longevity and delivery time are real figures or a `[placeholder]`.

## Strength options (every product page)

**All Al General perfumes are aged (متعتّقة)** — say it in every product description and on the homepage: "كل عطور الجنرال متعتّقة [X] أسابيع قبل ما توصلك."

The customer picks one of two strengths, as two option buttons on the product page:

| Option | English (stencil) | What it is | Price |
| --- | --- | --- | --- |
| ستاندرد | STANDARD | The default. Aged, regular concentration, approx. [6–8] hours depending on the scent | Base price |
| جنرال إليت | GENERAL ELITE | The strongest: highest concentration, longer aging, strongest longevity and projection | Base + a fixed upgrade (≈ 50–100 EGP, set per product) |

Rules: Standard is always pre-selected. Elite is the gold-filled option. Longevity figures are tested per scent and written as approximate ("تقريبًا"). Never offer free/custom percentages on the site.

Military rank words (جندي، ضابط) are kept for bundles and loyalty only, never for strength; "جنرال" in a product option always means General Elite.

## Madame General — the women's line

Same structure, same fonts, same Standard / Elite options (Elite there can be named "Madame Elite"). Inside this line only, `madame-rose` replaces `gold` and `madame-wine` replaces `surface-raised`. Everything else stays olive so it still reads as Al General.

## Visual foundations

- **Colour.** `surface` olive is the page; `surface-raised` for cards; `surface-sunken` for product image wells; `surface-night` for the footer. `ink` (sand) for headings, `ink-muted` for body, `ink-subtle` for small meta. `gold` is the one accent: primary buttons, prices, insignia, eyebrows. Text on gold is always `on-gold`. Never put two gold buttons side by side — the second is an outline (1.5px `gold` border, `ink` text).
- **Type.** `display` (Reem Kufi — geometric kufi, feels engraved) for headlines; `sans` (IBM Plex Sans Arabic) for everything you read; `stencil` (Saira Stencil One) for English codenames and labels, with `letter-spacing: 2–3px`. All three are Google Fonts.
- **Shape.** Sharp: `radius-md` 4px buttons, `radius-lg` 6px cards. Borders, not shadows: 1px `line`.
- **Layout.** Max width 1280px, `space-8` side padding, `space-20` between sections. Section header = stencil eyebrow (with a short gold rule) + display-l title.
- **Accessibility.** Buttons ≥44px tall. `ink-subtle` only at 14px+.

## Iconography

- Logo: **the insignia** — three stacked gold chevrons (`assets/Logos/general-insignia.svg`, drawn in `currentColor`), beside the wordmark "الجنرال" in `display` 700 and "AL GENERAL PARFUMS" in `stencil` below it. There is no drawn wordmark file yet: set it in type.
- UI icons: simple 2px stroke line icons in `currentColor` (cart, search, menu). No emoji, no filled cartoon icons.
- Marks: chevrons for the brand; a five-point star marks General Elite.

## Using this system

Colours are tokens with one dark theme (`field`). Build pages from the tokens above; the homepage design on the canvas "الجنرال للعطور — اتجاهين للتصميم" (the military direction) is the reference layout.
