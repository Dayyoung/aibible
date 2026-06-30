const SERVICE_KEY = 'influboost';
const LOCAL_STORAGE_KEY = `${SERVICE_KEY}_orders`;
const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScMPqbEWWttS5mb1m_krsO_kco24ImpgvYVSbc7zO0nEVmYFw/viewform?entry.1059822061=';

let currentLang = localStorage.getItem('bibleforai_lang') || 'en';
let currentPackage = null;
let orderQuantity = 1;
let paypalButtonInstance = null;

const service = {
  title_en: 'INFLUBOOST — Global Influencer Seeding',
  title_ko: 'INFLUBOOST — 글로벌 인플루언서 시딩',
  subtitle_en: 'Foreign creator seeding across Instagram, TikTok, YouTube Shorts, Threads, Xiaohongshu, and X for global brands.',
  subtitle_ko: '인스타그램, 틱톡, 유튜브 쇼츠, Threads, 샤오홍슈, X를 아우르는 글로벌 인플루언서 시딩 서비스입니다.',
  packages: [
    {
      id: 'standard',
      name_en: 'STANDARD',
      name_ko: '스탠다드',
      desc_en: 'Launch a compact global seeding campaign with random creator matching, post tracking, and basic reporting.',
      desc_ko: '랜덤 크리에이터 매칭, 게시물 추적, 기본 리포트를 포함한 소형 글로벌 시딩 캠페인입니다.',
      price: 157.14,
      featured: false,
      iconClass: 'tier-standard',
      icon: 'fa-solid fa-bullhorn',
      features_en: ['Random creator matching', 'Instagram + TikTok seeding', '10+ creators', '30-day campaign'],
      features_ko: ['랜덤 크리에이터 매칭', '인스타그램 + 틱톡 시딩', '10명+ 크리에이터', '30일 캠페인']
    },
    {
      id: 'deluxe',
      name_en: 'DELUXE',
      name_ko: '디럭스',
      desc_en: 'Use strategic matching for stronger brand fit, wider channel coverage, and higher-quality creator selection.',
      desc_ko: '브랜드 적합도가 높은 전략형 매칭, 더 넓은 채널 커버리지, 높은 퀄리티의 크리에이터 선정을 제공합니다.',
      price: 282.86,
      featured: true,
      iconClass: 'tier-deluxe',
      icon: 'fa-solid fa-wand-magic-sparkles',
      features_en: ['Strategic creator matching', 'Multi-platform seeding', '5+ creators', '180-day support window'],
      features_ko: ['전략형 크리에이터 매칭', '멀티플랫폼 시딩', '5명+ 크리에이터', '180일 지원']
    },
    {
      id: 'premium',
      name_en: 'PREMIUM',
      name_ko: '프리미엄',
      desc_en: 'Premium direct outreach with 1:1 creator placement, ambassador-style coverage, and priority management.',
      desc_ko: '1:1 크리에이터 섭외, 앰배서더형 커버리지, 우선 관리를 포함한 프리미엄 다이렉트 아웃리치입니다.',
      price: 1571.43,
      featured: false,
      iconClass: 'tier-premium',
      icon: 'fa-solid fa-crown',
      features_en: ['1:1 direct outreach', 'Mega-creator placement', 'Custom retention plan', 'Priority account management'],
      features_ko: ['1:1 다이렉트 섭외', '메가 크리에이터 배치', '맞춤 유지 전략', '우선 계정 관리']
    }
  ]
};

const faqData = {
  en: [
    { q: 'What is INFLUBOOST?', a: 'INFLUBOOST matches brands with global influencers and resident creators to generate authentic social proof.' },
    { q: 'Which platforms can you support?', a: 'Instagram, TikTok, YouTube Shorts, Threads, Xiaohongshu, and X can all be included in the campaign plan.' },
    { q: 'What do I need to start?', a: 'A short brand brief, target markets, product sample details, and your preferred campaign tone are enough to begin.' },
    
    { q: 'What happens after payment?', a: 'A Google Form collects receipt and campaign brief details, then onboarding begins right away.' }
  ],
  ko: [
    { q: 'INFLUBOOST는 무엇인가요?', a: 'INFLUBOOST는 글로벌 인플루언서와 현지 거주 크리에이터를 매칭해 진정성 있는 소셜 신뢰를 만드는 서비스입니다.' },
    { q: '어떤 플랫폼을 지원하나요?', a: '인스타그램, 틱톡, 유튜브 쇼츠, Threads, 샤오홍슈, X까지 캠페인에 포함할 수 있습니다.' },
    { q: '시작하려면 무엇이 필요한가요?', a: '간단한 브랜드 소개, 타겟 시장, 제품 샘플 정보, 원하는 캠페인 톤이면 충분합니다.' },
    
    { q: '결제 후에는 어떻게 되나요?', a: 'Google Form에서 영수증과 캠페인 브리프를 수집한 뒤 바로 온보딩이 시작됩니다.' }
  ]
};

const translations = {
  en: {
    'logo-subtitle': 'Global Influencer Seeding',
    'nav-home': 'Overview',
    'nav-packages': 'Packages',
    'nav-faq': 'FAQ',
    'nav-orders': 'Orders',
    'btn-orders': 'My Orders',
    'hero-badge': 'Global Creator Seeding',
    'hero-title': 'Turn global creators into real social proof.',
    'hero-desc': 'We match brands with multilingual, foreign-resident influencers across Instagram, TikTok, YouTube Shorts, Threads, Xiaohongshu, and X.',
    'hero-cta': 'View Packages',
    'hero-secondary': 'Read FAQ',
    'stat-1-num': '6+',
    'stat-1-label': 'Platforms covered',
    'stat-2-num': '2x',
    'stat-2-label': 'Markup applied',
    'stat-3-num': '30D',
    'stat-3-label': 'Campaign cycle',
    'section-packages-title': 'Choose your creator seeding package',
    'section-packages-subtitle': 'From a focused starter campaign to a premium ambassador-style rollout — pick the package that fits your international launch.',
    'section-faq-title': 'Frequently asked questions',
    'section-faq-subtitle': 'Everything you need to know about the INFLUBOOST service.',
    'section-orders-title': 'My Orders',
    'section-orders-subtitle': 'Your completed orders are stored in your browser.',
    'no-orders-msg': 'No purchase records yet. Your history will appear here after checkout.',
    'footer-copy': '&copy; 2026 BibleForAI INFLUBOOST. All rights reserved.',
    'modal-title': 'Configure your order',
    'modal-desc': 'Choose your campaign focus, set quantity, and complete secure PayPal checkout.',
    'modal-base-pkg': 'Base package',
    'modal-base-price-label': 'Base price',
    'modal-email-label': 'Email address *',
    'modal-email-placeholder': 'name@example.com',
    'modal-email-error': 'Please enter a valid email address.',
    'modal-target-label': 'Target markets / platforms',
    'modal-qty': 'Quantity',
    'modal-total-amt': 'Total amount',
    'badge-ssl': 'SSL Secured Checkout',
    'badge-paypal': 'PayPal Verified',
    'order-button': 'Order Package',
    'featured-badge': 'Best Value',
    'receipt-header': 'BIBLEFORAI - INFLUBOOST RECEIPT',
    'receipt-date': 'Order Date',
    'receipt-txid': 'Transaction ID',
    'receipt-email': 'Customer Email',
    'receipt-product': 'Product',
    'receipt-package': 'Package',
    'receipt-targetmarket': 'Target Markets / Platforms',
    'receipt-qty': 'Quantity',
    'receipt-baseprice': 'Base Price',
    'receipt-total': 'Total Paid',
    'receipt-status': 'Status',
    'receipt-method': 'Payment Method',
    'receipt-method-val': 'PayPal Secure Checkout'
  },
  ko: {
    'logo-subtitle': '글로벌 인플루언서 시딩',
    'nav-home': '개요',
    'nav-packages': '패키지',
    'nav-faq': 'FAQ',
    'nav-orders': '주문내역',
    'btn-orders': '내 주문',
    'hero-badge': '글로벌 크리에이터 시딩',
    'hero-title': '글로벌 크리에이터를 진짜 소셜 증거로 바꾸세요.',
    'hero-desc': '인스타그램, 틱톡, 유튜브 쇼츠, Threads, 샤오홍슈, X 전반에서 다국어·현지 거주 인플루언서와 브랜드를 매칭합니다.',
    'hero-cta': '패키지 보기',
    'hero-secondary': 'FAQ 보기',
    'stat-1-num': '6+',
    'stat-1-label': '지원 플랫폼',
    'stat-2-num': '2x',
    'stat-2-label': '마크업 적용',
    'stat-3-num': '30D',
    'stat-3-label': '캠페인 주기',
    'section-packages-title': '크리에이터 시딩 패키지를 선택하세요',
    'section-packages-subtitle': '집중형 스타터 캠페인부터 앰배서더형 프리미엄 론칭까지 — 해외 진출 계획에 맞는 플랜을 선택하세요.',
    'section-faq-title': '자주 묻는 질문',
    'section-faq-subtitle': 'INFLUBOOST 서비스에 대해 알아야 할 모든 것.',
    'section-orders-title': '내 주문 내역',
    'section-orders-subtitle': '완료된 주문은 브라우저에 저장됩니다.',
    'no-orders-msg': '아직 구매 기록이 없습니다. 결제 후 내역이 여기에 표시됩니다.',
    'footer-copy': '&copy; 2026 BibleForAI INFLUBOOST. All rights reserved.',
    'modal-title': '주문 설정',
    'modal-desc': '캠페인 방향을 선택하고 수량을 설정한 뒤 안전한 PayPal 결제를 진행하세요.',
    'modal-base-pkg': '기본 패키지',
    'modal-base-price-label': '기본 가격',
    'modal-email-label': '이메일 주소 *',
    'modal-email-placeholder': 'name@example.com',
    'modal-email-error': '올바른 이메일 주소를 입력해주세요.',
    'modal-target-label': '타겟 시장 / 플랫폼',
    'modal-qty': '수량',
    'modal-total-amt': '총 결제금액',
    'badge-ssl': 'SSL 보안 결제',
    'badge-paypal': 'PayPal 인증됨',
    'order-button': '패키지 주문하기',
    'featured-badge': '추천',
    'receipt-header': 'BIBLEFORAI - INFLUBOOST 영수증',
    'receipt-date': '주문 날짜',
    'receipt-txid': '거래 ID',
    'receipt-email': '고객 이메일',
    'receipt-product': '상품',
    'receipt-package': '패키지',
    'receipt-targetmarket': '타겟 시장 / 플랫폼',
    'receipt-qty': '수량',
    'receipt-baseprice': '기본 가격',
    'receipt-total': '총 결제금액',
    'receipt-status': '상태',
    'receipt-method': '결제 방식',
    'receipt-method-val': 'PayPal 보안 결제'
  }
};

function getService() {
  return service;
}

function formatPrice(usdPrice, includeUnit = true) {
    const isKo = currentLang === 'ko';
    if (isKo) {
        const krw = Math.round(usdPrice * 1300);
        return includeUnit ? `₩${krw.toLocaleString()} KRW` : `₩${krw.toLocaleString()}`;
    } else {
        const formatted = (usdPrice % 1 === 0) ? usdPrice.toLocaleString() : usdPrice.toFixed(2);
        return includeUnit ? `$${formatted} USD` : `$${formatted}`;
    }
}

function formatDate(date = new Date()) {
  return date.toLocaleString(currentLang === 'ko' ? 'ko-KR' : 'en-US', {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit'
  });
}

function getPackage(pkgId) {
  return getService().packages.find(p => p.id === pkgId);
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = text;
}

function applyTranslations(lang) {
    // Force trailing slash for consistent relative path resolution
    if (!window.location.pathname.endsWith('/') && !window.location.pathname.split('/').pop().includes('.')) {
        window.location.replace(window.location.pathname + '/' + window.location.search + window.location.hash);
        return;
    }

    // Auto-redirect based on global language preference
    const isKrPage = window.location.pathname.includes('/kr/');
    let preferredLang = localStorage.getItem('bibleforai_lang');
    if (!preferredLang) {
        preferredLang = isKrPage ? 'ko' : 'en';
        localStorage.setItem('bibleforai_lang', preferredLang);
    }
    if (preferredLang === 'ko' && !isKrPage) {
        const base = window.location.pathname.endsWith('/') ? window.location.pathname : window.location.pathname + '/';
        window.location.href = base + 'kr/';
        return;
    } else if (preferredLang === 'en' && isKrPage) {
        window.location.href = window.location.pathname.replace('/kr/', '/');
        return;
    }
 else if (preferredLang === 'en' && isKrPage) {
        window.location.href = window.location.pathname.replace('/kr/', '/');
        return;
    }

  currentLang = lang in translations ? lang : 'en';
  localStorage.setItem('bibleforai_lang', currentLang);
  const dict = translations[currentLang];

  document.documentElement.lang = currentLang;
  document.title = currentLang === 'ko'
    ? 'BibleForAI - INFLUBOOST | 글로벌 인플루언서 시딩'
    : 'BibleForAI - INFLUBOOST | Global Influencer Seeding';

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', currentLang === 'ko'
    ? '인스타그램, 틱톡, 유튜브 쇼츠, Threads, 샤오홍슈, X를 아우르는 글로벌 인플루언서 시딩 서비스입니다.'
    : 'Foreign creator seeding across Instagram, TikTok, YouTube Shorts, Threads, Xiaohongshu, and X for global brands.');

  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', currentLang === 'ko'
    ? 'BibleForAI - INFLUBOOST | 글로벌 인플루언서 시딩'
    : 'BibleForAI - INFLUBOOST | Global Influencer Seeding');

  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', currentLang === 'ko'
    ? '인스타그램, 틱톡, 유튜브 쇼츠, Threads, 샤오홍슈, X를 아우르는 글로벌 인플루언서 시딩 서비스입니다.'
    : 'Foreign creator seeding across Instagram, TikTok, YouTube Shorts, Threads, Xiaohongshu, and X for global brands.');

  const twTitle = document.querySelector('meta[name="twitter:title"]');
  if (twTitle) twTitle.setAttribute('content', currentLang === 'ko'
    ? 'BibleForAI - INFLUBOOST | 글로벌 인플루언서 시딩'
    : 'BibleForAI - INFLUBOOST | Global Influencer Seeding');

  const twDesc = document.querySelector('meta[name="twitter:description"]');
  if (twDesc) twDesc.setAttribute('content', currentLang === 'ko'
    ? '인스타그램, 틱톡, 유튜브 쇼츠, Threads, 샤오홍슈, X를 아우르는 글로벌 인플루언서 시딩 서비스입니다.'
    : 'Foreign creator seeding across Instagram, TikTok, YouTube Shorts, Threads, Xiaohongshu, and X for global brands.');

  Object.entries(dict).forEach(([key, value]) => {
    document.querySelectorAll(`[data-i18n="${key}"]`).forEach(el => {
      el.innerHTML = value;
    });
  });

  const svc = getService();
  setText('service-title', currentLang === 'ko' ? svc.title_ko : svc.title_en);
  setText('service-subtitle', currentLang === 'ko' ? svc.subtitle_ko : svc.subtitle_en);
  renderPackages();
  renderFaq();
  renderOrders();
  renderLanguageBadges();
  document.getElementById('language-selector').value = currentLang;
}

function renderLanguageBadges() {
  const active = document.querySelectorAll('.lang-pill');
  active.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === currentLang);
  });
}

function renderPackages() {
  const grid = document.getElementById('packages-grid');
  if (!grid) return;
  const svc = getService();
  grid.innerHTML = svc.packages.map(pkg => {
    const name = currentLang === 'ko' ? pkg.name_ko : pkg.name_en;
    const desc = currentLang === 'ko' ? pkg.desc_ko : pkg.desc_en;
    const features = currentLang === 'ko' ? pkg.features_ko : pkg.features_en;
    return `
      <article class="package-card${pkg.featured ? ' featured' : ''}">
        <div class="card-top">
          <div class="card-icon ${pkg.iconClass}"><i class="${pkg.icon || 'fa-solid fa-globe'}"></i></div>
          ${pkg.featured ? `<div class="package-badge">${translations[currentLang]['featured-badge']}</div>` : ''}
        </div>
        <h3>${name}</h3>
        <p>${desc}</p>
        <ul class="package-features">
          ${features.map(f => `<li><i class="fa-solid fa-check"></i> ${f}</li>`).join('')}
        </ul>
        <div class="package-footer">
          <span class="package-price">${formatPrice(pkg.price)}</span>
          <button class="btn-package" onclick="openPurchaseModal('${SERVICE_KEY}', '${pkg.id}')">${currentLang === 'ko' ? '주문하기' : 'Order Now'}</button>
        </div>
      </article>`;
  }).join('');
}

function renderFaq() {
  const list = document.getElementById('faq-list');
  if (!list) return;
  list.innerHTML = faqData[currentLang].map((item, idx) => `
    <details class="faq-item" ${idx === 0 ? 'open' : ''}>
      <summary>${item.q}</summary>
      <p>${item.a}</p>
    </details>
  `).join('');
}

function renderOrders() {
  const tbody = document.getElementById('orders-table-body');
  const empty = document.getElementById('no-orders-msg');
  const orders = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
  if (!tbody) return;
  tbody.innerHTML = orders.map(order => `
    <tr>
      <td>${order.date}</td>
      <td>${order.txid}</td>
      <td>${order.email}</td>
      <td>${order.package}</td>
      <td>${order.target}</td>
      <td>${order.quantity}</td>
      <td>${formatPrice(order.basePrice)}</td>
      <td>${formatPrice(order.total)}</td>
      <td>${order.status}</td>
    </tr>
  `).join('');
  if (empty) empty.style.display = orders.length ? 'none' : 'block';
}

function updateModalPrice() {
  if (!currentPackage) return;
  const total = currentPackage.price * orderQuantity;
  const el = document.getElementById('modal-total-price');
  if (el) el.textContent = formatPrice(total);
}

function validateEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function openPurchaseModal(serviceKey, packageId) {
  const pkg = getPackage(packageId);
  if (!pkg) return;
  currentPackage = pkg;
  orderQuantity = 1;

  const lang = currentLang;
  document.getElementById('modal-title').textContent = translations[lang]['modal-title'];
  document.getElementById('modal-desc').textContent = translations[lang]['modal-desc'];
  document.getElementById('modal-package-name').textContent = lang === 'ko' ? pkg.name_ko : pkg.name_en;
  document.getElementById('modal-package-desc').textContent = lang === 'ko' ? pkg.desc_ko : pkg.desc_en;
  document.getElementById('modal-base-price').textContent = formatPrice(pkg.price);
  document.getElementById('order-email').value = '';
  document.getElementById('order-target').selectedIndex = 0;
  document.getElementById('order-quantity').textContent = String(orderQuantity);
  document.getElementById('modal-error').textContent = '';
  updateModalPrice();
  document.getElementById('purchase-modal').classList.add('active');
  initPayPalButtons();
  document.getElementById('paypal-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function closeModal() {
  document.getElementById('purchase-modal').classList.remove('active');
}

function adjustQty(delta) {
  orderQuantity = Math.max(1, orderQuantity + delta);
  document.getElementById('order-quantity').textContent = String(orderQuantity);
  updateModalPrice();
}

function buildReceipt(order) {
  const t = translations[currentLang];
  return [
    t['receipt-header'],
    `\n${t['receipt-date']}: ${order.date}`,
    `${t['receipt-txid']}: ${order.txid}`,
    `${t['receipt-email']}: ${order.email}`,
    `${t['receipt-product']}: ${order.product}`,
    `${t['receipt-package']}: ${order.package}`,
    `${t['receipt-targetmarket']}: ${order.target}`,
    `${t['receipt-qty']}: ${order.quantity}`,
    `${t['receipt-baseprice']}: ${formatPrice(order.basePrice)}`,
    `${t['receipt-total']}: ${formatPrice(order.total)}`,
    `${t['receipt-status']}: ${order.status}`,
    `${t['receipt-method']}: ${t['receipt-method-val']}`
  ].join('\n');
}

function saveOrder({ email, target, method, status, txid }) {
  const orders = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
  const total = currentPackage.price * orderQuantity;
  const order = {
    date: formatDate(),
    txid,
    email,
    product: currentLang === 'ko' ? service.title_ko : service.title_en,
    package: currentLang === 'ko' ? currentPackage.name_ko : currentPackage.name_en,
    target,
    quantity: orderQuantity,
    basePrice: currentPackage.price,
    total,
    status,
    method
  };
  orders.unshift(order);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(orders));
  renderOrders();
  return order;
}

function redirectToGoogleForm(order) {
  const receipt = buildReceipt(order);
  const url = `${GOOGLE_FORM_URL}${encodeURIComponent(receipt)}`;
  window.location.href = url;
}

function triggerTestCheckout() {
  if (!currentPackage) return;
  const emailInput = document.getElementById('order-email');
  const targetInput = document.getElementById('order-target');
  const email = (emailInput.value || '').trim() || 'secure checkout@test.dev';
  if (!validateEmail(email)) {
    document.getElementById('modal-error').textContent = translations[currentLang]['modal-email-error'];
    return;
  }
  const target = targetInput.value || (currentLang === 'ko' ? '글로벌' : 'Global');
  const txid = `TEST-${Math.random().toString(36).slice(2, 10).toUpperCase()}`;
  const order = saveOrder({
    email,
    target,
    method: 'secure checkout Test',
    status: 'payment checkout',
    txid
  });
  closeModal();
  redirectToGoogleForm(order);
}

function initPayPalButtons() {
  const container = document.getElementById('paypal-button-container');
  if (!container) return;
  container.innerHTML = '';
  if (!window.paypal || !currentPackage) {
    container.innerHTML = '<div class="paypal-fallback">PayPal buttons will appear here.</div>';
    return;
  }
  if (paypalButtonInstance && paypalButtonInstance.close) {
    try { paypalButtonInstance.close(); } catch (_) {}
  }
  paypalButtonInstance = window.paypal.Buttons({
    style: {
      layout: 'vertical',
      color: 'blue',
      shape: 'rect',
      label: 'paypal'
    },
    createOrder: (_, actions) => actions.order.create({
      purchase_units: [{
        amount: { value: (currentPackage.price * orderQuantity).toFixed(2) },
        description: `${currentPackage.name_en} x${orderQuantity}`
      }]
    }),
    onApprove: async (_, actions) => {
      await actions.order.capture();
      const email = (document.getElementById('order-email').value || '').trim();
      const target = document.getElementById('order-target').value || (currentLang === 'ko' ? '글로벌' : 'Global');
      const txid = `PP-${Math.random().toString(36).slice(2, 10).toUpperCase()}`;
      const order = saveOrder({
        email,
        target,
        method: 'PayPal',
        status: 'Paid',
        txid
      });
      closeModal();
      redirectToGoogleForm(order);
    },
    onError: err => {
      console.error(err);
      document.getElementById('modal-error').textContent = currentLang === 'ko' ? '결제 오류가 발생했습니다. 다시 시도해주세요.' : 'Payment error. Please try again.';
    }
  });
  paypalButtonInstance.render('#paypal-button-container');
}

function changeLanguage(lang) {
  applyTranslations(lang);
}

function toggleMobileMenu() {
  document.getElementById('mobile-drawer').classList.toggle('active');
  document.getElementById('mobile-overlay').classList.toggle('active');
}

function navigate(view) {
  const target = document.getElementById(view);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  document.querySelectorAll('[data-view]').forEach(el => {
    el.classList.toggle('active', el.getAttribute('data-view') === view);
  });
}

function init() {
  applyTranslations(currentLang);
  navigate('home');
  renderPackages();
  renderFaq();
  renderOrders();
  document.getElementById('purchase-modal').addEventListener('click', e => {
    if (e.target.id === 'purchase-modal' || e.target.classList.contains('modal-close')) closeModal();
  });
  document.getElementById('modal-total-price').addEventListener('click', triggerTestCheckout);
  document.getElementById('order-email').addEventListener('input', () => {
    document.getElementById('modal-error').textContent = '';
  });
}

document.addEventListener('DOMContentLoaded', init);
window.changeLanguage = changeLanguage;
window.navigate = navigate;
window.toggleMobileMenu = toggleMobileMenu;
window.openPurchaseModal = openPurchaseModal;
window.closeModal = closeModal;
window.adjustQty = adjustQty;
window.triggerTestCheckout = triggerTestCheckout;

// Expose variables globally to prevent ReferenceErrors in inline HTML scripts/handlers
if (typeof navigate !== 'undefined') { window.navigate = navigate; }
if (typeof currentLang !== 'undefined') { window.currentLang = currentLang; }
