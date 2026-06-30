const SERVICE_KEY = 'webseo';
const LOCAL_STORAGE_KEY = `${SERVICE_KEY}_orders`;
const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScMPqbEWWttS5mb1m_krsO_kco24ImpgvYVSbc7zO0nEVmYFw/viewform?entry.1059822061=';

let currentLang = localStorage.getItem('bibleforai_lang') || 'en';
let currentPackage = null;
let orderQuantity = 1;
let paypalButtonInstance = null;

const service = {
  title_en: 'WEBSEO — Global Website Development & SEO',
  title_ko: 'WEBSEO — 글로벌 웹사이트 개발 & SEO',
  subtitle_en: 'International website builds with SEO structure, conversion copy, and multilingual readiness.',
  subtitle_ko: 'SEO 구조, 전환형 카피, 다국어 대응을 포함한 해외용 웹사이트 구축 서비스입니다.',
  packages: [
    {
      id: 'starter',
      name_en: 'STARTER',
      name_ko: '스타터',
      desc_en: 'Launch a responsive business website with clear sections, contact conversion, and basic on-page SEO.',
      desc_ko: '명확한 섹션 구성, 문의 전환, 기본 온페이지 SEO를 갖춘 반응형 비즈니스 웹사이트를 시작합니다.',
      price: 857.14,
      featured: false,
      iconClass: 'tier-standard',
      icon: 'fa-solid fa-sitemap',
      features_en: ['Responsive layout', 'Up to 5 pages', 'Basic SEO structure', 'Contact form'],
      features_ko: ['반응형 레이아웃', '최대 5페이지', '기본 SEO 구조', '문의 폼']
    },
    {
      id: 'growth',
      name_en: 'GROWTH',
      name_ko: '그로스',
      desc_en: 'Add keyword mapping, conversion copy, multilingual routing, and stronger structure for international leads.',
      desc_ko: '키워드 매핑, 전환형 카피, 다국어 라우팅, 해외 리드 유입을 위한 강화된 구조를 제공합니다.',
      price: 1714.29,
      featured: true,
      iconClass: 'tier-deluxe',
      icon: 'fa-solid fa-language',
      features_en: ['Keyword mapping', 'Up to 10 pages', 'Multilingual pages', 'On-page SEO checklist'],
      features_ko: ['키워드 매핑', '최대 10페이지', '다국어 페이지', '온페이지 SEO 체크리스트']
    },
    {
      id: 'premium',
      name_en: 'PREMIUM',
      name_ko: '프리미엄',
      desc_en: 'Full global-ready build with analytics, performance tuning, advanced SEO, and priority support.',
      desc_ko: '분석 도구, 성능 최적화, 고급 SEO, 우선 지원까지 포함한 글로벌 대응 완성형 패키지입니다.',
      price: 5714.29,
      featured: false,
      iconClass: 'tier-premium',
      icon: 'fa-solid fa-globe',
      features_en: ['Analytics setup', 'Performance tuning', 'Advanced SEO', 'Priority support'],
      features_ko: ['분석 도구 연동', '성능 최적화', '고급 SEO', '우선 지원']
    }
  ]
};

const faqData = {
  en: [
    { q: 'What is WEBSEO?', a: 'WEBSEO builds international-ready websites with SEO structure, conversion copy, and multilingual readiness.' },
    { q: 'Who is this service for?', a: 'It is for founders, agencies, and businesses that need a stronger website for international growth.' },
    { q: 'What happens after payment?', a: 'You receive a receipt, then a Google Form collects your website goals, keywords, and content assets.' },
    { q: 'Can you help with SEO strategy?', a: 'Yes. The growth and premium packages include keyword mapping and stronger on-page SEO guidance.' }
  ],
  ko: [
    { q: 'WEBSEO는 무엇인가요?', a: 'WEBSEO는 SEO 구조, 전환형 카피, 다국어 대응을 갖춘 해외용 웹사이트 구축 서비스입니다.' },
    { q: '누가 이용하면 좋나요?', a: '글로벌 성장에 필요한 더 강한 웹사이트가 필요한 창업자, 에이전시, 비즈니스에 적합합니다.' },
    { q: '결제 후에는 무엇을 받나요?', a: '영수증을 받은 뒤 Google Form에서 웹사이트 목표, 키워드, 콘텐츠 자료를 입력하게 됩니다.' },
    { q: 'SEO 전략도 도와주나요?', a: '네. 그로스와 프리미엄 패키지에는 키워드 매핑과 강한 온페이지 SEO 가이드가 포함됩니다.' }
  ]
};

const translations = {
  en: {
    'logo-subtitle': 'Global Website Studio',
    'nav-home': 'Overview',
    'nav-packages': 'Packages',
    'nav-faq': 'FAQ',
    'nav-orders': 'Orders',
    'btn-orders': 'My Orders',
    'hero-badge': 'Website Development + SEO',
    'hero-title': 'Build a website that converts across markets.',
    'hero-desc': 'International website builds with SEO structure, conversion copy, and multilingual readiness.',
    'hero-cta': 'View Packages',
    'hero-secondary': 'Read FAQ',
    'stat-1-num': '5+',
    'stat-1-label': 'Pages in starter',
    'stat-2-num': '2x',
    'stat-2-label': 'Markup applied',
    'stat-3-num': 'SEO',
    'stat-3-label': 'Search-ready',
    'section-packages-title': 'Choose your website package',
    'section-packages-subtitle': 'From a clean business launch to a full international growth build — pick the package that fits your expansion plan.',
    'section-faq-title': 'Frequently asked questions',
    'section-faq-subtitle': 'Everything you need to know about the WEBSEO service.',
    'section-orders-title': 'My Orders',
    'section-orders-subtitle': 'Your completed orders are stored in your browser.',
    'no-orders-msg': 'No purchase records yet. Your history will appear here after checkout.',
    'footer-copy': '&copy; 2026 BibleForAI WEBSEO. All rights reserved.',
    'modal-title': 'Configure your order',
    'modal-desc': 'Choose your website goals, set quantity, and complete secure PayPal checkout.',
    'modal-base-pkg': 'Base package',
    'modal-base-price-label': 'Base price',
    'modal-email-label': 'Email address *',
    'modal-email-placeholder': 'name@example.com',
    'modal-email-error': 'Please enter a valid email address.',
    'modal-target-label': 'Target keywords / market',
    'modal-target-placeholder': 'e.g. global SEO, B2B website, multilingual site',
    'modal-qty': 'Quantity',
    'modal-total-amt': 'Total amount',
    'badge-ssl': 'SSL Secured Checkout',
    'badge-paypal': 'PayPal Verified',
    'order-button': 'Order Package',
    'featured-badge': 'Best Value',
    'receipt-header': 'BIBLEFORAI - WEBSEO RECEIPT',
    'receipt-date': 'Order Date',
    'receipt-txid': 'Transaction ID',
    'receipt-email': 'Customer Email',
    'receipt-product': 'Product',
    'receipt-package': 'Package',
    'receipt-targetmarket': 'Target Keywords / Market',
    'receipt-qty': 'Quantity',
    'receipt-baseprice': 'Base Price',
    'receipt-total': 'Total Paid',
    'receipt-status': 'Status',
    'receipt-method': 'Payment Method',
    'receipt-method-val': 'PayPal Secure Checkout'
  },
  ko: {
    'logo-subtitle': '글로벌 웹사이트 스튜디오',
    'nav-home': '개요',
    'nav-packages': '패키지',
    'nav-faq': 'FAQ',
    'nav-orders': '주문내역',
    'btn-orders': '내 주문',
    'hero-badge': '웹사이트 개발 + SEO',
    'hero-title': '모든 시장에서 전환되는 웹사이트를 만드세요.',
    'hero-desc': 'SEO 구조, 전환형 카피, 다국어 대응을 포함한 해외용 웹사이트 구축 서비스입니다.',
    'hero-cta': '패키지 보기',
    'hero-secondary': 'FAQ 보기',
    'stat-1-num': '5+',
    'stat-1-label': '스타터 페이지 수',
    'stat-2-num': '2x',
    'stat-2-label': '마크업 적용',
    'stat-3-num': 'SEO',
    'stat-3-label': '검색 대응',
    'section-packages-title': '웹사이트 패키지를 선택하세요',
    'section-packages-subtitle': '깔끔한 비즈니스 런칭부터 글로벌 성장형 완성본까지 — 확장 계획에 맞는 패키지를 선택하세요.',
    'section-faq-title': '자주 묻는 질문',
    'section-faq-subtitle': 'WEBSEO 서비스에 대해 알아야 할 모든 것.',
    'section-orders-title': '내 주문 내역',
    'section-orders-subtitle': '완료된 주문은 브라우저에 저장됩니다.',
    'no-orders-msg': '아직 구매 기록이 없습니다. 결제 후 내역이 여기에 표시됩니다.',
    'footer-copy': '&copy; 2026 BibleForAI WEBSEO. All rights reserved.',
    'modal-title': '주문 설정',
    'modal-desc': '웹사이트 목표를 선택하고 수량을 설정한 뒤 안전한 PayPal 결제를 진행하세요.',
    'modal-base-pkg': '기본 패키지',
    'modal-base-price-label': '기본 가격',
    'modal-email-label': '이메일 주소 *',
    'modal-email-placeholder': 'name@example.com',
    'modal-email-error': '올바른 이메일 주소를 입력해주세요.',
    'modal-target-label': '타겟 키워드 / 시장',
    'modal-target-placeholder': '예: 글로벌 SEO, B2B 웹사이트, 다국어 사이트',
    'modal-qty': '수량',
    'modal-total-amt': '총 결제금액',
    'badge-ssl': 'SSL 보안 결제',
    'badge-paypal': 'PayPal 인증됨',
    'order-button': '패키지 주문하기',
    'featured-badge': '추천',
    'receipt-header': 'BIBLEFORAI - WEBSEO 영수증',
    'receipt-date': '주문 날짜',
    'receipt-txid': '거래 ID',
    'receipt-email': '고객 이메일',
    'receipt-product': '상품',
    'receipt-package': '패키지',
    'receipt-targetmarket': '타겟 키워드 / 시장',
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
        const krw = Math.round(usdPrice * 1400);
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
    ? 'BibleForAI - WEBSEO | 글로벌 웹사이트 개발 & SEO'
    : 'BibleForAI - WEBSEO | Global Website Development & SEO';

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', currentLang === 'ko'
    ? 'SEO 구조와 전환형 카피를 갖춘 글로벌 웹사이트 개발 서비스입니다.'
    : 'International website builds with SEO structure, conversion copy, and multilingual readiness.');

  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', currentLang === 'ko'
    ? 'BibleForAI - WEBSEO | 다국어 웹사이트 및 글로벌 SEO'
    : 'BibleForAI - WEBSEO | Multilingual Website & Global SEO');

  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', currentLang === 'ko'
    ? 'SEO 구조와 전환형 카피를 갖춘 글로벌 웹사이트 개발 서비스입니다.'
    : 'International website builds with SEO structure, conversion copy, and multilingual readiness.');

  const twTitle = document.querySelector('meta[name="twitter:title"]');
  if (twTitle) twTitle.setAttribute('content', currentLang === 'ko'
    ? 'BibleForAI - WEBSEO | 다국어 웹사이트 및 글로벌 SEO'
    : 'BibleForAI - WEBSEO | Multilingual Website & Global SEO');

  const twDesc = document.querySelector('meta[name="twitter:description"]');
  if (twDesc) twDesc.setAttribute('content', currentLang === 'ko'
    ? '글로벌 구직자를 위한 ATS 친화형 이력서 및 커버레터 최적화 서비스.'
    : 'Multilingual websites, localization, and global SEO for international expansion.');

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
  const targetEl = document.getElementById('order-target');
  if (targetEl) targetEl.value = '';
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
  const email = (emailInput.value || '').trim() || 'sandbox@test.dev';
  if (!validateEmail(email)) {
    document.getElementById('modal-error').textContent = translations[currentLang]['modal-email-error'];
    return;
  }
  const target = targetInput.value.trim() || (currentLang === 'ko' ? '글로벌 웹사이트' : 'Global website');
  const txid = `TEST-${Math.random().toString(36).slice(2, 10).toUpperCase()}`;
  const order = saveOrder({
    email,
    target,
    method: 'Sandbox Test',
    status: 'Test checkout',
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
      const target = document.getElementById('order-target').value.trim() || (currentLang === 'ko' ? '글로벌 웹사이트' : 'Global website');
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
