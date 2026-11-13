/* Al General — cart (localStorage), pricing helpers and the bottle illustration. */
(function () {
  const D = window.AG_DATA;
  const { t } = window.AG_I18N;
  const KEY = 'ag-cart-v1';

  const byId = id => D.products.find(p => p.id === id);

  function read() {
    try {
      const raw = JSON.parse(localStorage.getItem(KEY) || '[]');
      return Array.isArray(raw) ? raw.filter(i => byId(i.id) && D.sizes.includes(i.size)) : [];
    } catch (e) { return []; }
  }
  let items = read();

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(items)); } catch (e) { /* private mode: cart lives for this page only */ }
    document.dispatchEvent(new CustomEvent('ag:cart', { detail: { items: items.slice() } }));
  }

  const keyOf = i => `${i.id}|${i.strength}|${i.size}`;

  const cart = {
    get items() { return items.slice(); },
    count() { return items.reduce((n, i) => n + i.qty, 0); },
    add(id, { strength = 'standard', size = '100', qty = 1 } = {}) {
      if (!byId(id)) return;
      const line = { id, strength: strength === 'elite' ? 'elite' : 'standard', size, qty: 0 };
      const found = items.find(i => keyOf(i) === keyOf(line));
      if (found) found.qty = Math.min(99, found.qty + qty); else { line.qty = Math.min(99, qty); items.push(line); }
      save();
    },
    setQty(key, qty) {
      const it = items.find(i => keyOf(i) === key);
      if (!it) return;
      if (qty < 1) items = items.filter(i => i !== it); else it.qty = Math.min(99, qty);
      save();
    },
    remove(key) { items = items.filter(i => keyOf(i) !== key); save(); },
    clear() { items = []; save(); },
    keyOf
  };

  // Keep tabs in sync.
  window.addEventListener('storage', e => { if (e.key === KEY) { items = read(); document.dispatchEvent(new CustomEvent('ag:cart')); } });

  /* ---------- pricing: null means "not decided yet" ---------- */
  function unitPrice(item) {
    const p = byId(item.id);
    const base = p.price[item.size];
    if (base == null) return null;
    if (item.strength === 'elite') return p.eliteUpgrade == null ? null : base + p.eliteUpgrade;
    return base;
  }
  function fmt(amount, placeholderKey = 'ph.price') {
    const cur = D.currency[window.AG_I18N.lang] || D.currency.ar;
    if (amount == null) return `${t(placeholderKey)} ${cur}`;
    const n = new Intl.NumberFormat(window.AG_I18N.lang === 'ar' ? 'ar-EG' : 'en-EG').format(amount);
    return `${n} ${cur}`;
  }
  function fromPrice(p) {
    const vals = Object.values(p.price).filter(v => v != null);
    return vals.length ? Math.min(...vals) : null;
  }
  function totals(promo) {
    const lines = items.map(i => { const u = unitPrice(i); return u == null ? null : u * i.qty; });
    const known = lines.every(v => v != null) && items.length > 0;
    const subtotal = known ? lines.reduce((a, b) => a + b, 0) : null;
    const discount = known && promo ? Math.round(subtotal * promo.percent / 100) : 0;
    const thr = D.settings.freeShippingThreshold;
    let shipping = D.settings.shippingFee;
    if (known && thr != null && subtotal - discount >= thr) shipping = 0;
    const total = known && shipping != null ? subtotal - discount + shipping : null;
    return { subtotal, discount, shipping, total, known };
  }

  /* ---------- bottle illustration (the original prototype's flat bottle: gold cap, olive glass, gold outline) ----------
   * size 'lg' | 'xl' → tall display bottle with chevrons, codename and الجنرال (hero, product page)
   * anything else     → compact catalogue bottle with the number (cards, cart, search, thumbnails)
   */
  const CHEVRONS = '<path class="chev" d="M8 14 L22 6 L36 14"/><path class="chev" d="M8 24 L22 16 L36 24"/><path class="chev" d="M8 34 L22 26 L36 34"/>';
  function bottleSVG(p, { size = 'md', label = true } = {}) {
    const name = p.name, no = p.no;
    if (size === 'lg' || size === 'xl') {
      const fs = name.length > 10 ? 20 : 26;
      return `<svg class="bottle bottle--${size}" viewBox="0 0 244 378" role="img" aria-label="${name} No.${no}" focusable="false">
  <rect class="bottle__cap" x="74" y="1" width="96" height="56" rx="6" fill="#8F7433" stroke="#C9A24A" stroke-width="2"/>
  <rect class="bottle__neck" x="100" y="57" width="44" height="18" fill="#C9A24A"/>
  <rect class="bottle__body" x="2" y="76" width="240" height="300" rx="16" fill="#2A3122" stroke="#C9A24A" stroke-width="2"/>
  ${label ? `<g class="bottle__label">
    <g transform="translate(94 150) scale(1.27)" fill="none" stroke="#C9A24A" stroke-width="3" stroke-linejoin="round">${CHEVRONS}</g>
    <text x="122" y="250" text-anchor="middle" font-family="'Saira Stencil One', sans-serif" font-size="${fs}" letter-spacing="3" fill="#E9E1CC">${name}</text>
    <rect x="62" y="266" width="120" height="1" fill="#C9A24A"/>
    <text x="122" y="300" text-anchor="middle" font-family="'Reem Kufi', sans-serif" font-size="18" fill="#C9A24A">الجنرال</text>
  </g>` : ''}
</svg>`;
    }
    return `<svg class="bottle bottle--${size}" viewBox="0 0 134 206" role="img" aria-label="${name} No.${no}" focusable="false">
  <rect class="bottle__cap" x="39" y="1" width="56" height="32" rx="4" fill="#8F7433" stroke="#C9A24A" stroke-width="2"/>
  <rect class="bottle__neck" x="54" y="33" width="26" height="10" fill="#C9A24A"/>
  <rect class="bottle__body" x="2" y="44" width="130" height="160" rx="10" fill="#161A12" stroke="#C9A24A" stroke-width="2"/>
  ${label ? `<text x="67" y="132" text-anchor="middle" font-family="'Saira Stencil One', sans-serif" font-size="22" fill="#C9A24A">${no}</text>` : ''}
</svg>`;
  }

  window.AG_STORE = { cart, byId, unitPrice, fmt, fromPrice, totals, bottleSVG };
})();
