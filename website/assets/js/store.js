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

  /* ---------- bottle illustration (own design; based on the shortlisted square smoky bottle + ribbed gold cap) ---------- */
  let uid = 0;
  function bottleSVG(p, { size = 'md', label = true } = {}) {
    const u = `b${++uid}`;
    const nameSize = p.name.length > 9 ? 8.2 : 10.5;
    return `<svg class="bottle bottle--${size}" viewBox="0 0 200 320" role="img" aria-label="${p.name} No.${p.no}" focusable="false">
  <defs>
    <linearGradient id="${u}g" x1="0" x2="1"><stop offset="0" stop-color="#262823"/><stop offset=".18" stop-color="#55574f"/><stop offset=".5" stop-color="#383a34"/><stop offset=".86" stop-color="#4a4c45"/><stop offset="1" stop-color="#1f211c"/></linearGradient>
    <linearGradient id="${u}c" x1="0" x2="1"><stop offset="0" stop-color="#8F7433"/><stop offset=".35" stop-color="#E7CB82"/><stop offset=".6" stop-color="#C9A24A"/><stop offset="1" stop-color="#7a6229"/></linearGradient>
    <linearGradient id="${u}l" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#C9A24A" stop-opacity=".0"/><stop offset=".45" stop-color="#C9A24A" stop-opacity=".16"/><stop offset="1" stop-color="#C9A24A" stop-opacity=".30"/></linearGradient>
  </defs>
  <ellipse cx="100" cy="312" rx="78" ry="6" fill="#000" opacity=".35"/>
  <rect x="66" y="10" width="68" height="10" rx="2" fill="#15171a"/>
  <rect x="62" y="18" width="76" height="40" rx="3" fill="url(#${u}c)"/>
  <g stroke="#6d5724" stroke-width="1.2" opacity=".55">${Array.from({ length: 15 }, (_, i) => `<line x1="${67 + i * 4.7}" y1="21" x2="${67 + i * 4.7}" y2="55"/>`).join('')}</g>
  <rect x="80" y="58" width="40" height="8" fill="#C9A24A"/><rect x="78" y="66" width="44" height="10" rx="2" fill="#121315"/>
  <path d="M46 84 Q46 76 60 76 H140 Q154 76 154 84 L166 104 Q172 112 172 126 V286 Q172 304 154 304 H46 Q28 304 28 286 V126 Q28 112 34 104 Z" fill="url(#${u}g)"/>
  <path d="M40 120 V280 Q40 294 54 294 H146 Q160 294 160 280 V120 Q160 108 146 100 H54 Q40 108 40 120 Z" fill="url(#${u}l)"/>
  <rect x="38" y="112" width="7" height="170" rx="3.5" fill="#fff" opacity=".10"/>
  <rect x="152" y="118" width="3" height="150" rx="1.5" fill="#fff" opacity=".06"/>
  ${label ? `<g class="bottle__label">
    <rect x="58" y="130" width="84" height="132" fill="#0f120c" fill-opacity=".35" stroke="#C9A24A" stroke-width="1"/>
    <circle cx="100" cy="164" r="17" fill="none" stroke="#C9A24A" stroke-width="1.2"/><circle cx="100" cy="164" r="14.5" fill="none" stroke="#C9A24A" stroke-width=".6" opacity=".6"/>
    <text x="100" y="170" text-anchor="middle" font-family="Cinzel, serif" font-size="16" letter-spacing="-1.5" fill="#C9A24A">AG</text>
    <text x="100" y="200" text-anchor="middle" font-family="Cinzel, serif" font-size="6" letter-spacing="2.5" fill="#C9A24A">AL GENERAL</text>
    <line x1="84" y1="208" x2="116" y2="208" stroke="#C9A24A" stroke-width=".8"/>
    <text x="100" y="224" text-anchor="middle" font-family="Cinzel, serif" font-size="${nameSize}" letter-spacing="1.6" fill="#E9E1CC">${p.name}</text>
    <text x="100" y="236" text-anchor="middle" font-family="Cinzel, serif" font-size="6.5" letter-spacing="1.5" fill="#C9A24A">No. ${p.no}</text>
    <text x="100" y="254" text-anchor="middle" font-family="Cinzel, serif" font-size="4.4" letter-spacing="1.4" fill="#B9B49C">EAU DE PARFUM · 100 ML</text>
  </g>` : ''}
</svg>`;
  }

  window.AG_STORE = { cart, byId, unitPrice, fmt, fromPrice, totals, bottleSVG };
})();
