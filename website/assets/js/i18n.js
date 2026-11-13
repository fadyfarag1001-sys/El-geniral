/* Al General — tiny i18n (Arabic default, RTL; English LTR).
 * Markup: data-i18n="key" sets textContent; data-i18n-html="key" sets innerHTML (trusted strings only);
 * data-i18n-attr="aria-label:key,placeholder:key2" sets attributes.
 */
(function () {
  const dict = {
    ar: {
      'meta.home': 'الجنرال للعطور — عطور متعتّقة بتوقيع الجنرال',
      'meta.product': 'الجنرال للعطور — {name}',
      'meta.cart': 'الجنرال للعطور — السلة',
      'meta.help': 'الجنرال للعطور — مساعدة',
      'skip': 'تخطَّ إلى المحتوى',
      'topbar': 'توصيل لكل المحافظات · الدفع عند الاستلام · [عرض الافتتاح]',
      'brand.ar': 'الجنرال', 'brand.full': 'الجنرال للعطور',
      'nav.label': 'القائمة الرئيسية',
      'nav.home': 'الرئيسية', 'nav.collection': 'الكوليكشن', 'nav.elite': 'الإليت',
      'nav.men': 'رجالي', 'nav.women': 'حريمي', 'nav.about': 'عن الجنرال',
      'nav.menu': 'افتح القائمة', 'nav.close': 'اقفل القائمة',
      'lang.switch': 'English', 'lang.label': 'Switch to English',
      'search.open': 'بحث', 'search.label': 'ابحث عن عطر', 'search.placeholder': 'اسم العطر أو العيلة… مثلًا: خشبي',
      'search.empty': 'مفيش نتايج. جرّب كلمة تانية.', 'search.close': 'اقفل البحث', 'search.hint': 'اكتب علشان تدوّر في الكوليكشن',
      'cart.label': 'السلة، {n} منتجات', 'cart.short': 'السلة',
      'hero.eyebrow': 'AL GENERAL PARFUMS · No.01',
      'hero.title1': 'ريحة عالمية.', 'hero.title2': 'بتوقيع الجنرال.',
      'hero.copy': 'عطور محاكاة لأشهر الروائح العالمية، بتركيز عالي وتغليف يليق بيك. كل عطورنا متعتّقة — واختار انت القوة.',
      'hero.cta': 'تسوّق الآن', 'hero.cta2': 'اعرف الإليت', 'hero.scroll': 'انزل',
      'hero.meta1': '100 ML · EAU DE PARFUM', 'hero.meta2': 'AGED · متعتّق',
      'strength.eyebrow': 'CHOOSE YOUR STRENGTH',
      'strength.title': 'كل عطورنا متعتّقة. انت اختار القوة.',
      'strength.copy': 'كل زجاجة بتتساب {weeks} أسابيع قبل ما توصلك علشان الريحة تتجانس وتثبت. ولو عايز أجمد حاجة عندنا — اختار الإليت.',
      'std.label': 'STANDARD', 'std.name': 'ستاندرد',
      'std.f1': 'عطر متعتّق بتركيز [النسبة]٪', 'std.f2': 'ثبات تقريبًا [6–8] ساعات حسب العطر', 'std.f3': 'مناسب للجامعة والشغل واليوم كله',
      'std.price': 'من {price}', 'std.default': 'الاختيار الأساسي',
      'elite.label': 'GENERAL ELITE', 'elite.name': 'جنرال إليت',
      'elite.f1': 'أعلى تركيز عندنا — [النسبة]٪', 'elite.f2': 'تعتيق أطول [X] أسابيع', 'elite.f3': 'أقوى ثبات وأقوى فوحان',
      'elite.price': '+ {price} على أي عطر', 'elite.badge': 'الأقوى',
      'col.eyebrow': 'THE COLLECTION', 'col.title': 'الكوليكشن',
      'col.copy': 'أربع روائح، لكل واحدة رقمها وشخصيتها.',
      'filter.label': 'فلترة العطور', 'filter.all': 'الكل', 'filter.men': 'رجالي', 'filter.women': 'حريمي', 'filter.unisex': 'يونيسكس',
      'filter.empty.women': 'خط Madame General للسيدات جاي قريب.', 'filter.empty': 'مفيش عطور في القسم ده لسه — قريبًا.',
      'filter.count': '{n} عطور',
      'card.inspired': 'مستوحى من: {name}', 'card.add': 'أضف للسلة', 'card.view': 'تفاصيل {name}', 'card.ml': '100 مل',
      'badge.bestseller': 'الأكثر طلبًا',
      'ph.price': '[السعر]', 'ph.original': '[اسم العطر الأصلي]', 'ph.diff': '[الفرق]', 'ph.weeks': '[X]',
      'ph.time': '[المدة]', 'ph.amount': '[المبلغ]', 'ph.total': '[الإجمالي]', 'ph.subtotal': '[المجموع]', 'ph.shipping': '[سعر الشحن]',
      'ph.notes': '[المكونات]', 'ph.desc': '[وصف قصير للريحة — إمتى تلبسه وإحساسه إيه، في سطرين.]',
      'ph.hours': '[X] ساعة', 'ph.projection': '[قوي / متوسط]', 'ph.season': '[شتوي / صيفي]', 'ph.daytime': '[نهار / ليل]',
      'craft.eyebrow': 'THE CRAFT', 'craft.title': 'مصنوع بصبر. متغلّف بفخامة.',
      'craft.1.t': 'متعتّق قبل ما يوصلك', 'craft.1.p': 'كل عطر متعتّق {weeks} أسابيع — ريحة متجانسة وثابتة.',
      'craft.2.t': 'علبة تليق بالهدية', 'craft.2.p': 'علبة هارد بغطا بيترفع لفوق، لوجو دهبي بالفويل، وفوم محفور على مقاس الزجاجة.',
      'craft.3.t': 'توصيل والدفع عند الاستلام', 'craft.3.p': 'اطلب أونلاين وادفع عند الاستلام، والتوصيل لكل المحافظات خلال {time}.',
      'story.eyebrow': 'THE HOUSE', 'story.title': 'AG — توقيع الجنرال',
      'story.copy': 'براند عطور مصري بروح عالمية. هويتنا زيتوني عميق، رملي، ودهبي نحاسي — من الموقع للعلبة للزجاجة.',
      'story.cta': 'اكتشف الكوليكشن',
      'footer.tagline': 'ريحة عالمية بسعر يناسبك.',
      'footer.shop': 'تسوّق', 'footer.help': 'مساعدة', 'footer.follow': 'تابعنا', 'footer.links': 'روابط الفوتر',
      'footer.shipping': 'الشحن والتوصيل', 'footer.returns': 'الاستبدال والاسترجاع', 'footer.contact': 'تواصل معانا',
      'footer.soon': 'قريبًا',
      'footer.disclaimer': 'عطور الجنرال مستوحاة من روائح عالمية، وليست تابعة لأي علامة تجارية أصلية ولا معتمدة منها. أسماء العطور الأصلية لأغراض الوصف فقط.',
      'footer.rights': '© الجنرال للعطور',
      'toast.added': 'اتضاف {name} للسلة', 'toast.view': 'شوف السلة',
      // product page
      'pd.crumbs': 'مسار التصفح', 'pd.codename': 'CODENAME No.{no}',
      'pd.aged': 'كل عطور الجنرال متعتّقة {weeks} أسابيع قبل ما توصلك',
      'pd.strength': 'اختار القوة', 'pd.size': 'الحجم', 'pd.qty': 'الكمية',
      'pd.std.note': 'الاختيار الأساسي: عطر متعتّق بتركيز [النسبة]٪ — مناسب لليوم كله.',
      'pd.elite.note': 'أجمد حاجة عندنا: تركيز [النسبة]٪ وتعتيق [X] أسابيع — لو عايز الريحة تفضل وراك.',
      'pd.std.sub': 'متعتّق · ثبات تقريبًا [6–8] ساعات', 'pd.elite.sub': 'أعلى تركيز · تعتيق أطول · أقوى ثبات وفوحان',
      'size.100': '100 مل', 'size.50': '50 مل', 'size.10': 'تستر 10 مل',
      'pd.inc': 'زوّد الكمية', 'pd.dec': 'قلّل الكمية',
      'pd.add': 'أضف للسلة', 'pd.buy': 'اطلب على طول — الدفع عند الاستلام',
      'pd.delivery': 'توصيل خلال {time}', 'pd.cod': 'ادفع عند الاستلام', 'pd.exchange': 'استبدال خلال {time}',
      'pd.gallery': 'صور المنتج', 'pd.g.bottle': 'صورة الزجاجة', 'pd.g.box': 'صورة العلبة', 'pd.g.life': '[صورة لايف ستايل]', 'pd.g.video': '[فيديو]',
      'pd.g.soon': 'الصورة دي لسه بتتجهّز',
      'pd.details.eyebrow': 'THE COMPOSITION', 'pd.details.title': 'تفاصيل العطر',
      'pd.top': 'الافتتاحية', 'pd.heart': 'القلب', 'pd.base': 'القاعدة',
      'pd.longevity': 'الثبات', 'pd.projection': 'الفوحان', 'pd.season': 'الموسم', 'pd.time': 'الوقت',
      'pd.more': 'كمّل المجموعة', 'pd.notfound': 'العطر ده مش موجود.', 'pd.back': 'ارجع للكوليكشن',
      // cart
      'cart.eyebrow': 'YOUR SELECTION', 'cart.title': 'السلة', 'cart.continue': 'كمّل تسوّق',
      'cart.free': 'فاضلك {amount} وتاخد شحن مجاني', 'cart.free.done': 'مبروك! الشحن مجاني',
      'cart.empty.t': 'السلة فاضية', 'cart.empty.p': 'اختار ريحتك من الكوليكشن.', 'cart.empty.cta': 'تسوّق الآن',
      'cart.remove': 'شيل', 'cart.remove.label': 'شيل {name} من السلة',
      'cart.tester.t': 'زوّد تستر 10 مل بـ {price}', 'cart.tester.p': 'جرّب ريحة جديدة قبل ما تشتري الكبير.', 'cart.tester.add': '+ ضيف',
      'cart.summary': 'ملخص الطلب', 'cart.items': 'المنتجات ({n})', 'cart.shipping': 'الشحن',
      'cart.promo': 'كود الخصم', 'cart.promo.ph': 'مثلًا: GENERAL10', 'cart.promo.apply': 'طبّق',
      'cart.promo.bad': 'الكود ده مش شغال.', 'cart.promo.ok': 'تم تطبيق الخصم {percent}٪', 'cart.promo.empty': 'اكتب الكود الأول.',
      'cart.discount': 'الخصم',
      'cart.total': 'الإجمالي', 'cart.checkout': 'كمّل الطلب',
      'cart.pay': 'الدفع عند الاستلام أو [وسائل الدفع]', 'cart.ship': 'توصيل لكل المحافظات خلال {time}', 'cart.box': 'بيتغلف في علبة الجنرال',
      'cart.pricesPending': 'الأسعار النهائية هتظهر هنا أول ما تتحدد.',
      'co.title': 'بيانات التوصيل', 'co.name': 'الاسم', 'co.phone': 'رقم الموبايل', 'co.gov': 'المحافظة', 'co.address': 'العنوان بالتفصيل',
      'co.notes': 'ملاحظات (اختياري)', 'co.submit': 'أكّد الطلب — الدفع عند الاستلام', 'co.cancel': 'رجوع',
      'co.err.name': 'اكتب اسمك.', 'co.err.phone': 'اكتب رقم موبايل مصري صحيح (11 رقم يبدأ بـ 01).', 'co.err.gov': 'اكتب المحافظة.', 'co.err.address': 'اكتب العنوان.',
      'co.errors': 'راجع الحقول المعلَّمة.',
      'co.done.t': 'طلبك جاهز', 'co.done.wa': 'ابعت الطلب على واتساب',
      'co.done.offline': 'الطلب أونلاين لسه مش متوصّل بنظام استلام طلبات. احفظ الملخص ده — هيتفعّل الإرسال أول ما رقم واتساب أو نظام الطلبات يتضاف.',
      'qty.label': 'الكمية: {n}',
      // help
      'help.eyebrow': 'CLIENT CARE', 'help.title': 'مساعدة',
      'help.ship.t': 'الشحن والتوصيل', 'help.ship.p': 'بنوصّل لكل المحافظات، والدفع عند الاستلام. مدة التوصيل: {time}. سعر الشحن: {fee}.',
      'help.ret.t': 'الاستبدال والاسترجاع', 'help.ret.p': 'تقدر تستبدل خلال {time}. [شروط الاستبدال والاسترجاع]',
      'help.contact.t': 'تواصل معانا', 'help.contact.p': 'هنكون موجودين على واتساب وإنستجرام وتيك توك.'
    },
    en: {
      'meta.home': 'Al General Parfums — Aged fragrances, signed by the General',
      'meta.product': 'Al General Parfums — {name}',
      'meta.cart': 'Al General Parfums — Bag',
      'meta.help': 'Al General Parfums — Help',
      'skip': 'Skip to content',
      'topbar': 'Delivery to every governorate · Cash on delivery · [Launch offer]',
      'brand.ar': 'AL GENERAL', 'brand.full': 'Al General Parfums',
      'nav.label': 'Main menu',
      'nav.home': 'Home', 'nav.collection': 'Collection', 'nav.elite': 'Elite',
      'nav.men': 'Men', 'nav.women': 'Women', 'nav.about': 'The House',
      'nav.menu': 'Open menu', 'nav.close': 'Close menu',
      'lang.switch': 'العربية', 'lang.label': 'التبديل للعربية',
      'search.open': 'Search', 'search.label': 'Search fragrances', 'search.placeholder': 'Name or family… e.g. woody',
      'search.empty': 'No results. Try another word.', 'search.close': 'Close search', 'search.hint': 'Type to search the collection',
      'cart.label': 'Bag, {n} items', 'cart.short': 'Bag',
      'hero.eyebrow': 'AL GENERAL PARFUMS · No.01',
      'hero.title1': 'A world-class scent.', 'hero.title2': 'Signed by the General.',
      'hero.copy': 'Fragrances modelled on the world’s best-known scents, highly concentrated and beautifully boxed. Every bottle is aged — you choose the strength.',
      'hero.cta': 'Shop now', 'hero.cta2': 'Discover Elite', 'hero.scroll': 'Scroll',
      'hero.meta1': '100 ML · EAU DE PARFUM', 'hero.meta2': 'AGED',
      'strength.eyebrow': 'CHOOSE YOUR STRENGTH',
      'strength.title': 'Every bottle is aged. You choose the strength.',
      'strength.copy': 'Each bottle rests for {weeks} weeks before it reaches you, so the scent settles and lasts. Want our strongest? Choose Elite.',
      'std.label': 'STANDARD', 'std.name': 'Standard',
      'std.f1': 'Aged, [X]% concentration', 'std.f2': 'Lasts approx. [6–8] hours, depending on the scent', 'std.f3': 'For university, work and all day',
      'std.price': 'From {price}', 'std.default': 'Default choice',
      'elite.label': 'GENERAL ELITE', 'elite.name': 'General Elite',
      'elite.f1': 'Our highest concentration — [X]%', 'elite.f2': 'Longer aging — [X] weeks', 'elite.f3': 'Strongest longevity and projection',
      'elite.price': '+ {price} on any scent', 'elite.badge': 'Strongest',
      'col.eyebrow': 'THE COLLECTION', 'col.title': 'The Collection',
      'col.copy': 'Four scents, each with its own number and character.',
      'filter.label': 'Filter fragrances', 'filter.all': 'All', 'filter.men': 'Men', 'filter.women': 'Women', 'filter.unisex': 'Unisex',
      'filter.empty.women': 'Madame General, our women’s line, is coming soon.', 'filter.empty': 'Nothing here yet — coming soon.',
      'filter.count': '{n} fragrances',
      'card.inspired': 'Inspired by: {name}', 'card.add': 'Add to bag', 'card.view': '{name} details', 'card.ml': '100 ml',
      'badge.bestseller': 'Bestseller',
      'ph.price': '[price]', 'ph.original': '[original fragrance]', 'ph.diff': '[difference]', 'ph.weeks': '[X]',
      'ph.time': '[duration]', 'ph.amount': '[amount]', 'ph.total': '[total]', 'ph.subtotal': '[subtotal]', 'ph.shipping': '[shipping]',
      'ph.notes': '[notes]', 'ph.desc': '[Short scent description — when to wear it and how it feels, in two lines.]',
      'ph.hours': '[X] hours', 'ph.projection': '[strong / moderate]', 'ph.season': '[winter / summer]', 'ph.daytime': '[day / night]',
      'craft.eyebrow': 'THE CRAFT', 'craft.title': 'Made with patience. Boxed with care.',
      'craft.1.t': 'Aged before it ships', 'craft.1.p': 'Every scent is aged for {weeks} weeks — blended, settled, long-lasting.',
      'craft.2.t': 'A box worth gifting', 'craft.2.p': 'A rigid box with a lift-off lid, gold-foil logo and a foam insert cut to the bottle.',
      'craft.3.t': 'Cash on delivery', 'craft.3.p': 'Order online, pay on delivery, anywhere in Egypt within {time}.',
      'story.eyebrow': 'THE HOUSE', 'story.title': 'AG — the General’s signature',
      'story.copy': 'An Egyptian perfume house with a global spirit. Deep olive, sand and brass gold — from the website to the box to the bottle.',
      'story.cta': 'Explore the collection',
      'footer.tagline': 'World-class scent, at a fair price.',
      'footer.shop': 'Shop', 'footer.help': 'Help', 'footer.follow': 'Follow', 'footer.links': 'Footer links',
      'footer.shipping': 'Shipping & delivery', 'footer.returns': 'Exchanges & returns', 'footer.contact': 'Contact us',
      'footer.soon': 'soon',
      'footer.disclaimer': 'Al General fragrances are inspired by world-famous scents and are not affiliated with or endorsed by any original brand. Original fragrance names are used for description only.',
      'footer.rights': '© Al General Parfums',
      'toast.added': '{name} added to your bag', 'toast.view': 'View bag',
      'pd.crumbs': 'Breadcrumb', 'pd.codename': 'CODENAME No.{no}',
      'pd.aged': 'Every Al General scent is aged {weeks} weeks before it reaches you',
      'pd.strength': 'Choose strength', 'pd.size': 'Size', 'pd.qty': 'Quantity',
      'pd.std.note': 'Default: aged, [X]% concentration — made for all day.',
      'pd.elite.note': 'Our strongest: [X]% concentration, aged [X] weeks — for a scent that stays.',
      'pd.std.sub': 'Aged · lasts approx. [6–8] hours', 'pd.elite.sub': 'Highest concentration · longer aging · strongest projection',
      'size.100': '100 ml', 'size.50': '50 ml', 'size.10': '10 ml tester',
      'pd.inc': 'Increase quantity', 'pd.dec': 'Decrease quantity',
      'pd.add': 'Add to bag', 'pd.buy': 'Order now — cash on delivery',
      'pd.delivery': 'Delivery in {time}', 'pd.cod': 'Cash on delivery', 'pd.exchange': 'Exchange within {time}',
      'pd.gallery': 'Product images', 'pd.g.bottle': 'Bottle', 'pd.g.box': 'Box', 'pd.g.life': '[Lifestyle photo]', 'pd.g.video': '[Video]',
      'pd.g.soon': 'This image is still in production',
      'pd.details.eyebrow': 'THE COMPOSITION', 'pd.details.title': 'Fragrance details',
      'pd.top': 'Top notes', 'pd.heart': 'Heart notes', 'pd.base': 'Base notes',
      'pd.longevity': 'Longevity', 'pd.projection': 'Projection', 'pd.season': 'Season', 'pd.time': 'Time',
      'pd.more': 'Complete the set', 'pd.notfound': 'This fragrance doesn’t exist.', 'pd.back': 'Back to the collection',
      'cart.eyebrow': 'YOUR SELECTION', 'cart.title': 'Your bag', 'cart.continue': 'Continue shopping',
      'cart.free': '{amount} more for free shipping', 'cart.free.done': 'You’ve unlocked free shipping',
      'cart.empty.t': 'Your bag is empty', 'cart.empty.p': 'Find your scent in the collection.', 'cart.empty.cta': 'Shop now',
      'cart.remove': 'Remove', 'cart.remove.label': 'Remove {name} from bag',
      'cart.tester.t': 'Add a 10 ml tester for {price}', 'cart.tester.p': 'Try a new scent before buying the full size.', 'cart.tester.add': '+ Add',
      'cart.summary': 'Order summary', 'cart.items': 'Items ({n})', 'cart.shipping': 'Shipping',
      'cart.promo': 'Promo code', 'cart.promo.ph': 'e.g. GENERAL10', 'cart.promo.apply': 'Apply',
      'cart.promo.bad': 'This code isn’t valid.', 'cart.promo.ok': '{percent}% discount applied', 'cart.promo.empty': 'Enter a code first.',
      'cart.discount': 'Discount',
      'cart.total': 'Total', 'cart.checkout': 'Checkout',
      'cart.pay': 'Cash on delivery or [payment methods]', 'cart.ship': 'Delivery to every governorate within {time}', 'cart.box': 'Packed in the Al General box',
      'cart.pricesPending': 'Final prices will appear here once they are set.',
      'co.title': 'Delivery details', 'co.name': 'Full name', 'co.phone': 'Mobile number', 'co.gov': 'Governorate', 'co.address': 'Full address',
      'co.notes': 'Notes (optional)', 'co.submit': 'Confirm order — cash on delivery', 'co.cancel': 'Back',
      'co.err.name': 'Enter your name.', 'co.err.phone': 'Enter a valid Egyptian mobile (11 digits starting with 01).', 'co.err.gov': 'Enter your governorate.', 'co.err.address': 'Enter your address.',
      'co.errors': 'Please check the highlighted fields.',
      'co.done.t': 'Your order is ready', 'co.done.wa': 'Send order on WhatsApp',
      'co.done.offline': 'Online ordering isn’t connected to an order inbox yet. Keep this summary — sending will switch on once a WhatsApp number or order system is added.',
      'qty.label': 'Quantity: {n}',
      'help.eyebrow': 'CLIENT CARE', 'help.title': 'Help',
      'help.ship.t': 'Shipping & delivery', 'help.ship.p': 'We deliver to every governorate, cash on delivery. Delivery time: {time}. Shipping fee: {fee}.',
      'help.ret.t': 'Exchanges & returns', 'help.ret.p': 'Exchange within {time}. [Exchange & return terms]',
      'help.contact.t': 'Contact us', 'help.contact.p': 'Find us on WhatsApp, Instagram and TikTok.'
    }
  };

  const KEY = 'ag-lang';
  let lang = 'ar';
  try { const saved = localStorage.getItem(KEY); if (saved === 'en' || saved === 'ar') lang = saved; } catch (e) { /* storage unavailable */ }

  function t(key, vars) {
    let s = (dict[lang] && dict[lang][key]) ?? dict.ar[key] ?? key;
    if (vars) s = s.replace(/\{(\w+)\}/g, (m, k) => (vars[k] ?? m));
    return s;
  }

  function apply(root) {
    root = root || document;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    root.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
    root.querySelectorAll('[data-i18n-attr]').forEach(el => {
      el.dataset.i18nAttr.split(',').forEach(pair => {
        const [attr, key] = pair.split(':').map(s => s.trim());
        if (attr && key) el.setAttribute(attr, t(key));
      });
    });
  }

  function setLang(next) {
    lang = next === 'en' ? 'en' : 'ar';
    try { localStorage.setItem(KEY, lang); } catch (e) { /* ignore */ }
    apply();
    document.dispatchEvent(new CustomEvent('ag:lang', { detail: { lang } }));
  }

  window.AG_I18N = { dict, t, apply, setLang, get lang() { return lang; } };
  // Set direction as early as possible to avoid a layout flip.
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
})();
