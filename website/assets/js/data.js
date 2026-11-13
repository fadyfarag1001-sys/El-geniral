/* Al General — store data.
 * ONE place to edit products, prices and settings.
 * Rule (CLAUDE.md): unknown real data stays a [placeholder]. Never invent numbers.
 * A price of `null` is shown as "[السعر] ج.م" and totals are not calculated until
 * every price in the cart is filled in.
 */
window.AG_DATA = {
  currency: { ar: 'ج.م', en: 'EGP' },

  settings: {
    // Fill these when they are decided. null = shown as a [placeholder].
    agingWeeks: null,          // "كل عطورنا متعتّقة [X] أسابيع"
    deliveryTime: null,        // e.g. "2–4 أيام"
    exchangeWindow: null,      // e.g. "14 يوم"
    shippingFee: null,         // EGP
    freeShippingThreshold: null, // EGP
    testerPrice: null,         // EGP, 10 ml tester
    whatsappNumber: null,      // international format, digits only, e.g. "2010xxxxxxxx"
    social: { instagram: null, tiktok: null, whatsapp: null }, // full URLs
    promoCodes: {}             // e.g. { GENERAL10: { percent: 10 } } — none are live yet
  },

  // Strength options (brand book): Standard is always the default.
  strengths: {
    standard: { concentration: null, longevity: '[6–8]' },
    elite:    { concentration: null, extraAgingWeeks: null }
  },

  sizes: ['100', '50', '10'],   // 10 = tester

  products: [
    {
      id: 'commander', no: '01', name: 'COMMANDER',
      nameAr: 'القائد', audience: 'men', badge: 'bestseller',
      family: { ar: 'خشبي · توابل', en: 'Woody · Spicy' },
      inspiredBy: null,
      // price per size for Standard; eliteUpgrade is added on top (≈ 50–100 EGP, not set yet)
      price: { '100': null, '50': null, '10': null }, eliteUpgrade: null,
      description: null,
      notes: { top: null, heart: null, base: null },
      profile: { longevity: null, projection: null, season: null, time: null }
    },
    {
      id: 'field-marshal', no: '02', name: 'FIELD MARSHAL',
      nameAr: null, audience: null, badge: null,
      family: { ar: 'عنبري · جلد', en: 'Amber · Leather' },
      inspiredBy: null,
      price: { '100': null, '50': null, '10': null }, eliteUpgrade: null,
      description: null,
      notes: { top: null, heart: null, base: null },
      profile: { longevity: null, projection: null, season: null, time: null }
    },
    {
      id: 'sniper', no: '03', name: 'SNIPER',
      nameAr: null, audience: null, badge: null,
      family: { ar: 'فريش · حمضيات', en: 'Fresh · Citrus' },
      inspiredBy: null,
      price: { '100': null, '50': null, '10': null }, eliteUpgrade: null,
      description: null,
      notes: { top: null, heart: null, base: null },
      profile: { longevity: null, projection: null, season: null, time: null }
    },
    {
      id: 'recon', no: '04', name: 'RECON',
      nameAr: null, audience: null, badge: null,
      family: { ar: 'أروماتيك · لافندر', en: 'Aromatic · Lavender' },
      inspiredBy: null,
      price: { '100': null, '50': null, '10': null }, eliteUpgrade: null,
      description: null,
      notes: { top: null, heart: null, base: null },
      profile: { longevity: null, projection: null, season: null, time: null }
    }
  ]
};
