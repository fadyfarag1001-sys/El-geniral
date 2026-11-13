# Al General Parfums (الجنرال للعطور) — project context for Claude

Owner: Fady Farag. Talk to him in Egyptian Arabic. He likes seeing visuals quickly over long explanations.

## What this is
An Egyptian perfume brand aiming to feel like a **global, premium niche brand**.
- Target: young people 16–35, mostly men (a women's line "Madame General" planned later).
- Target retail price: **900–950 EGP** per 100 ml bottle.
- Online store first (Arabic + English, RTL default), cash on delivery in Egypt.

## Decisions made so far
- **Identity colors:** deep olive `#1F2419` / `#161A12`, sand `#E9E1CC`, brass gold `#C9A24A`. Packaging must use the SAME palette as the website (not plain black).
- **Bottle look:** modern, premium, desk-worthy — NOT military. The "general" idea lives in the name and logo only.
- **Logo:** moving to the **AG monogram** (Cinzel-style serif, gold, inside a double ring) with an emblem around it. Three options in `design-system/logo/` — owner has NOT picked yet (my recommendation: `ag-laurel.svg`, laurel wreath + star). The old chevron insignia is deprecated.
- **Strength options per product:** all perfumes are aged (متعتّقة). Two buttons: **Standard** (default) and **General Elite** (highest concentration, longer aging, +50–100 EGP).
- **Positioning question still open:** the owner started as an "inspired-by / dupe" brand. At 900 EGP I recommended dropping "مستوحى من" from packaging and giving every scent its own name + story. Confirm with the owner before writing product copy.
- **Bottle (current pick):** Elbana `EI-1039/48 BLACK` (100 ml smoky glass, 40 EGP) + cap `CAP-110` (matte black square, 12 EGP) or `CAB-225` (gold ribbed, 18 EGP). For the 900 EGP price, a heavier bottle + zamac cap is recommended — still open.
- **Box:** rigid two-piece box, base + lift-off lid (NOT drawer, NOT front-opening). Gold hot-foil logo, foam insert cut to bottle shape, thin gold edges. One box for all scents + small number sticker underneath.
- **Label:** clear sticker printed in gold/sand on the smoky glass.

## Folders
- `design-system/` — `tokens.json` (source of truth), `tokens.css` (CSS variables), `README.md` (brand book), `logo/` (SVGs; the SVG text uses the Cinzel font — outline it before print).
- `website/` — static HTML prototype: `index.html`, `product.html`, `cart.html`. Built in the earlier "military" direction: still uses the old chevron logo and stencil/military copy. **Next job: re-skin to the AG logo and premium tone**, then turn into a real store.
- `packaging/` — box design PDF (3 pages, 1:1, estimated sizes), mockups, bottle/cap shortlists from supplier catalogues (Elbana, Mataweh Group).
- `docs/decisions.md` — suppliers, costs, open questions.

## Rules
- Placeholders in `[brackets]` are unknown real data (prices, %, durations, ingredients). Never invent numbers.
- Never use other brands' names, logos or bottle shapes in designs.
- Keep every surface (site, box, sticker, social) on the same tokens.
