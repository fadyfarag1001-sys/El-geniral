# Al General — website

A static storefront: plain HTML, CSS and JS with no build step. Arabic RTL is the default, with an English switch. It is mobile-first and uses GSAP + ScrollTrigger for motion.

| Page | What it does |
|---|---|
| `index.html` | Hero, Standard vs General Elite, collection with filters (All / Men / Women / Unisex), craft, the house |
| `product.html#commander` | Product page: gallery, strength + size + quantity, add to bag, buy now, notes, related scents, sticky mobile buy bar |
| `cart.html` | Bag saved in the browser. Includes quantity, remove, tester upsell, promo field, cash-on-delivery checkout form with validation |
| `help.html` | Shipping, returns and contact (footer links point here) |

## Where to edit things

- **Products, prices, delivery time, aging weeks, WhatsApp number, social links, promo codes:** `assets/js/data.js`.
  Anything left as `null` shows as a `[placeholder]` on the site. Totals only calculate once every price in the bag is filled in.
- **Text (Arabic + English):** `assets/js/i18n.js`. After changing Arabic text, run `npm run prerender` so the HTML has the text before JS loads.
- **Colours / fonts:** `assets/css/styles.css` (`:root`). These follow `design-system/tokens.css`.
- **Animation:** `assets/js/motion.js`.
- **Look:** the original prototype design (chevron insignia, stencil codenames, military-luxury copy), as chosen by the owner. The logo is `CHEVRON_MARK` in `assets/js/app.js`; the bottle drawings are `bottleSVG` in `assets/js/store.js`.

## Run, check, test

```bash
npm install          # once
npm run dev          # serves website/ on http://localhost:8080 (and your Wi-Fi)
npm run check        # HTML validation + JS syntax
npm test             # Playwright smoke test on iPhone + desktop (30+ checks)
npm run vendor       # re-copy GSAP from node_modules after updating it
```

With no Node, `python3 -m http.server 8080 --directory website` works too.

## Preview on your iPhone (same Wi-Fi, nothing gets published)

1. On your computer, run `npm run dev` from the project folder.
2. Find your computer's local IP address:
   - Mac: System Settings → Wi-Fi → Details → IP address (e.g. `192.168.1.23`)
   - Windows: run `ipconfig` and look for the IPv4 Address
3. On the iPhone, connected to the **same Wi-Fi**, open Safari and go to `http://192.168.1.23:8080` (use your IP).
4. Optional: Share → **Add to Home Screen** for a full-screen app-like icon.

If it doesn't load, allow Python through the computer's firewall, and check that both devices are on the same network (not a guest network).

Opening `index.html` directly by tapping it as a file also works on a computer. On iPhone, use the local server above.

## Not live yet (needs your decision)

- No online payments or order inbox. Checkout builds a cash-on-delivery order summary, and the "send on WhatsApp" button appears once `whatsappNumber` is set.
- Nothing is deployed and no domain is bought. Deployment is a separate step that needs your approval.
