// ETSYBOOST app state
const SERVICE_KEY = 'etsyboost';
const STORAGE_KEY = `${SERVICE_KEY}_orders`;
const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScMPqbEWWttS5mb1m_krsO_kco24ImpgvYVSbc7zO0nEVmYFw/viewform?entry.1059822061=';

let currentLang = localStorage.getItem('bibleforai_lang') || (() => {
  const browserLang = (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage || '';
  return browserLang.toLowerCase().startsWith('ko') ? 'ko' : 'en';
})();
let currentPackage = null;
let orderQuantity = 1;
let paypalButtonInstance = null;

const packageCatalog = {
  etsyboost: {
    title_en: 'Etsy Store Launch & Operations',
    title_ko: 'Etsy 스토어 런칭 & 운영',
    packages: [
      {
        id: 'starter',
        name_en: 'STARTER — Etsy Operating Guide',
        name_ko: '스타터 — Etsy 운영 가이드',
        desc_en: 'Best for sellers who need the exact playbook from setup to first listings.',
        desc_ko: '설정부터 첫 상품 등록까지의 운영 플레이북이 필요한 셀러에게 적합합니다.',
        price: 24.76,
        featured: false,
        icon: 'fa-solid fa-store',
        cardClass: 'starter-color',
        features_en: ['Shop setup checklist', 'Keyword and tag framework', 'Listing launch roadmap', 'Google Form intake'],
        features_ko: ['스토어 세팅 체크리스트', '키워드·태그 프레임워크', '리스팅 런칭 로드맵', 'Google Form 인수인계']
      },
      {
        id: 'growth',
        name_en: 'GROWTH — Shop Audit & Listing Plan',
        name_ko: '그로스 — 스토어 진단 & 리스팅 플랜',
        desc_en: 'For sellers who already have a shop and need a conversion-focused audit and optimization plan.',
        desc_ko: '이미 스토어가 있고 전환 중심의 진단과 최적화 계획이 필요한 셀러용입니다.',
        price: 49.52,
        featured: true,
        icon: 'fa-solid fa-chart-line',
        cardClass: 'growth-color',
        features_en: ['Shop audit notes', 'Title + tag optimization', 'Pricing and offer review', 'Priority support'],
        features_ko: ['스토어 진단 노트', '제목+태그 최적화', '가격·오퍼 점검', '우선 지원']
      },
      {
        id: 'premium',
        name_en: 'PREMIUM — Launch Strategy & 30-Day Roadmap',
        name_ko: '프리미엄 — 런칭 전략 & 30일 로드맵',
        desc_en: 'Best for international brands entering Etsy with a structured launch and expansion plan.',
        desc_ko: '국제 브랜드의 Etsy 진출을 위한 체계적인 런칭 및 확장 플랜입니다.',
        price: 74.28,
        featured: false,
        icon: 'fa-solid fa-rocket',
        cardClass: 'premium-color',
        features_en: ['Launch roadmap', '30-day content calendar', 'Market positioning review', 'Dedicated handoff notes'],
        features_ko: ['런칭 로드맵', '30일 콘텐츠 캘린더', '시장 포지셔닝 검토', '전담 인수인계 노트']
      }
    ]
  }
};

const translations = {
  en: {
    'logo-subtitle': 'Etsy Store Launch!',
    'nav-overview': 'Overview',
    'nav-packages': 'Packages',
    'nav-faq': 'FAQ',
    'nav-orders': 'Orders',
    'btn-orders': 'My Orders',
    'hero-badge': 'Global Marketplace Strategy',
    'hero-title': 'ETSYBOOST — Etsy Store Launch & Operations',
    'hero-desc': 'Launch and optimize an Etsy store for international buyers with a practical checklist and growth plan.',
    'hero-cta': 'See Packages',
    'hero-secondary': 'Read FAQ',
    'stat-one-num': '$24.76',
    'stat-one-label': 'Starting price',
    'stat-two-num': '3',
    'stat-two-label': 'Package levels',
    'stat-three-num': 'Global sellers',
    'stat-three-label': 'Target audience',
    'section-packages-title': 'Etsy Launch Packages',
    'section-packages-sub': 'Choose the support level that fits your shop setup, listings, and growth stage.',
    'benefits-title': 'Why ETSYBOOST works',
    'benefits-sub': 'Built for international sellers who need a practical path to launch and optimize on Etsy.',
    'benefit-1-bold': 'Launch-ready:',
    'benefit-1-text': 'Move from setup to first listings with a clear checklist and action plan.',
    'benefit-2-bold': 'Keyword-focused:',
    'benefit-2-text': 'Use title, tag, and pricing guidance designed for search visibility and conversion.',
    'benefit-3-bold': 'Global-friendly:',
    'benefit-3-text': 'Perfect for handmade brands, digital products, printables, and international shops.',
    'faq-title': 'Frequently Asked Questions',
    'faq-sub': 'Practical answers about Etsy setup, listing strategy, and the launch workflow.',
    'faq-q1': 'What do I need to prepare before ordering?',
    'faq-a1': 'Your email, shop URL or brand name, target market, and a short description of your products.',
    'faq-q2': 'Who is this service for?',
    'faq-a2': 'It is best for handmade brands, digital product sellers, printables, and international sellers expanding to Etsy.',
    'faq-q3': 'How is the work delivered?',
    'faq-a3': 'You receive setup notes, a receipt, and a Google Form handoff record after checkout completes.',
    'faq-q4': 'Is the price fixed?',
    'faq-a4': 'Each package has a clear starting price based on the scope of support included.',
    'orders-title': 'My Purchase History',
    'orders-sub': 'Successful orders are stored locally in your browser workspace.',
    'th-date': 'Order Date',
    'th-order-id': 'Transaction ID',
    'th-product': 'Product',
    'th-tier': 'Package Tier',
    'th-state': 'Shop URL',
    'th-company': 'Shop / Brand',
    'th-qty': 'Quantity',
    'th-total': 'Total Paid',
    'th-status': 'Status',
    'no-orders-msg': 'No purchase records yet. Tap a package to start your first order.',
    'modal-title': 'Configure Order',
    'modal-desc': 'Confirm your package and complete the secure PayPal checkout.',
    'modal-base-pkg': 'Base Package:',
    'modal-base-price-label': 'Base Price:',
    'modal-email-label': 'Email Address *',
    'modal-email-placeholder': 'name@example.com',
    'modal-state-label': 'Shop URL *',
    'modal-state-placeholder': 'https://etsy.com/shop/your-shop',
    'modal-company-label': 'Shop / Brand *',
    'modal-company-placeholder': 'Your Etsy shop or brand name',
    'modal-goal-label': 'Listing Goal *',
    'modal-goal-placeholder': 'Launch my Etsy shop, optimize listings, or improve conversion...',
    'modal-qty': 'Quantity:',
    'modal-total-amt': 'Total Amount:',
    
    'badge-ssl': 'SSL Secured Checkout',
    'badge-paypal': 'PayPal Verified',
    'featured-badge': 'Best Value',
    'order-button': 'Order Package',
    'foot-note': 'ETSYBOOST helps international sellers build a practical Etsy launch path with a conversion-focused plan.',
    'foot-contact': 'Contact support: snsherocom@gmail.com',
    'foot-copy': '&copy; 2026 BibleForAI ETSYBOOST. All rights reserved.',
    'receipt-header': 'BIBLEFORAI - ETSYBOOST RECEIPT',
    'receipt-date': 'Order Date',
    'receipt-txid': 'Transaction ID',
    'receipt-email': 'Customer Email',
    'receipt-type': 'Product Type',
    'receipt-size': 'Package Tier',
    'receipt-state': 'Shop URL',
    'receipt-company': 'Shop / Brand',
    'receipt-goal': 'Listing Goal',
    'receipt-qty': 'Quantity',
    'receipt-baseprice': 'Base Price',
    'receipt-total': 'Total Paid',
    'receipt-status': 'Status',
    'receipt-method': 'Payment Method',
    'receipt-method-val': 'PayPal Secure Checkout'
  },
  ko: {
    'logo-subtitle': 'Etsy 스토어 런칭!',
    'nav-overview': '개요',
    'nav-packages': '패키지',
    'nav-faq': 'FAQ',
    'nav-orders': '주문내역',
    'btn-orders': '내 주문내역',
    'hero-badge': '글로벌 마켓플레이스 전략',
    'hero-title': 'ETSYBOOST — Etsy 스토어 런칭 & 운영',
    'hero-desc': '실전 체크리스트와 성장 플랜으로 Etsy 스토어를 런칭하고, 해외 구매자 대상 최적화를 진행하세요.',
    'hero-cta': '패키지 보기',
    'hero-secondary': 'FAQ 보기',
    'stat-one-num': '$24.76',
    'stat-one-label': '시작 가격',
    'stat-two-num': '3',
    'stat-two-label': '패키지 레벨',
    'stat-three-num': '글로벌 셀러',
    'stat-three-label': '타겟 고객',
    'section-packages-title': 'Etsy 런칭 패키지',
    'section-packages-sub': '스토어 세팅, 리스팅, 성장 단계에 맞는 지원 수준을 선택하세요.',
    'benefits-title': 'ETSYBOOST가 효과적인 이유',
    'benefits-sub': 'Etsy 런칭과 최적화가 필요한 해외 셀러를 위해 실무 중심으로 설계했습니다.',
    'benefit-1-bold': '런칭 준비형:',
    'benefit-1-text': '명확한 체크리스트와 실행 플랜으로 첫 리스팅까지 빠르게 연결합니다.',
    'benefit-2-bold': '키워드 중심:',
    'benefit-2-text': '검색 노출과 전환을 고려한 제목, 태그, 가격 가이드를 제공합니다.',
    'benefit-3-bold': '글로벌 친화형:',
    'benefit-3-text': '핸드메이드 브랜드, 디지털 상품, 프린터블, 해외 셀러에게 적합합니다.',
    'faq-title': '자주 묻는 질문',
    'faq-sub': 'Etsy 세팅, 리스팅 전략, 런칭 워크플로우에 대한 실무 답변입니다.',
    'faq-q1': '주문 전에 무엇을 준비해야 하나요?',
    'faq-a1': '이메일, 스토어 URL 또는 브랜드명, 타깃 시장, 그리고 제품 설명을 간단히 준비해 주세요.',
    'faq-q2': '어떤 분들을 위한 서비스인가요?',
    'faq-a2': '핸드메이드 브랜드, 디지털 상품 판매자, 프린터블 셀러, Etsy 진출을 준비하는 해외 셀러에게 적합합니다.',
    'faq-q3': '작업 결과는 어떻게 전달되나요?',
    'faq-a3': '체크아웃 완료 후 세팅 노트, 영수증, Google Form 인수인계 기록을 전달합니다.',
    'faq-q4': '가격은 고정인가요?',
    'faq-a4': '각 패키지는 포함 범위에 따라 명확한 시작 가격으로 제공됩니다.',
    'orders-title': '내 구매 내역',
    'orders-sub': '성공한 주문은 브라우저 작업공간에 로컬로 저장됩니다.',
    'th-date': '주문 날짜',
    'th-order-id': '트랜잭션 ID',
    'th-product': '상품명',
    'th-tier': '패키지',
    'th-state': '스토어 URL',
    'th-company': '스토어 / 브랜드',
    'th-qty': '수량',
    'th-total': '결제 금액',
    'th-status': '상태',
    'no-orders-msg': '아직 구매 내역이 없습니다. 패키지를 눌러 첫 주문을 시작해 보세요.',
    'modal-title': '주문 설정',
    'modal-desc': '패키지를 확인하고 안전한 PayPal 결제를 완료하세요.',
    'modal-base-pkg': '기본 패키지:',
    'modal-base-price-label': '기본 가격:',
    'modal-email-label': '이메일 주소 *',
    'modal-email-placeholder': 'name@example.com',
    'modal-state-label': '스토어 URL *',
    'modal-state-placeholder': 'https://etsy.com/shop/your-shop',
    'modal-company-label': '스토어 / 브랜드 *',
    'modal-company-placeholder': 'Etsy 스토어 또는 브랜드명을 입력하세요',
    'modal-goal-label': '리스팅 목표 *',
    'modal-goal-placeholder': 'Etsy 스토어 런칭, 리스팅 최적화, 전환 개선...',
    'modal-qty': '수량:',
    'modal-total-amt': '총 결제액:',
    
    'badge-ssl': 'SSL 보안 결제',
    'badge-paypal': 'PayPal 인증',
    'featured-badge': '가성비 최고',
    'order-button': '패키지 주문',
    'foot-note': 'ETSYBOOST는 해외 셀러가 전환 중심의 Etsy 런칭 경로를 구축하도록 돕습니다.',
    'foot-contact': '문의: snsherocom@gmail.com',
    'foot-copy': '&copy; 2026 BibleForAI ETSYBOOST. All rights reserved.',
    'receipt-header': 'BIBLEFORAI - ETSYBOOST 영수증',
    'receipt-date': '주문 날짜',
    'receipt-txid': '트랜잭션 ID',
    'receipt-email': '고객 이메일',
    'receipt-type': '상품 유형',
    'receipt-size': '패키지',
    'receipt-state': '스토어 URL',
    'receipt-company': '스토어 / 브랜드',
    'receipt-goal': '리스팅 목표',
    'receipt-qty': '수량',
    'receipt-baseprice': '기본 가격',
    'receipt-total': '총 결제액',
    'receipt-status': '상태',
    'receipt-method': '결제 수단',
    'receipt-method-val': 'PayPal 안전 결제'
  }
};

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

function getCurrentLabels() {
  return translations[currentLang] || translations.en;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
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

  currentLang = lang;
  localStorage.setItem('bibleforai_lang', lang);
  document.documentElement.lang = lang;
  const dict = getCurrentLabels();

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) el.innerHTML = dict[key];
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (dict[key]) el.setAttribute('placeholder', dict[key]);
  });

  const selector = document.getElementById('language-selector');
  if (selector && selector.value !== lang) selector.value = lang;

  renderPackages();
  renderOrders();
}

function changeLanguage(lang) {
  applyTranslations(lang);
}

function navigate(target) {
  const el = document.getElementById(target) || document.getElementById(`${target}-section`) || document.getElementById(`${target}-view`);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  closeMobileMenu();
}

function toggleMobileMenu() {
  const drawer = document.getElementById('mobile-drawer');
  if (drawer) drawer.classList.toggle('active');
}

function closeMobileMenu() {
  const drawer = document.getElementById('mobile-drawer');
  if (drawer) drawer.classList.remove('active');
}

function renderPackages() {
  const container = document.getElementById('etsyboost-packages');
  if (!container) return;
  const isKo = currentLang === 'ko';
  const catalog = packageCatalog.etsyboost;

  container.innerHTML = catalog.packages.map(pkg => {
    const name = isKo ? pkg.name_ko : pkg.name_en;
    const desc = isKo ? pkg.desc_ko : pkg.desc_en;
    const features = isKo ? pkg.features_ko : pkg.features_en;
    const badge = pkg.featured ? `<span class="package-chip">${getCurrentLabels()['featured-badge']}</span>` : '';
    return `
      <article class="package-card ${pkg.featured ? 'featured' : ''}">
        ${badge}
        <div class="card-icon ${pkg.cardClass}"><i class="${pkg.icon}"></i></div>
        <h3>${escapeHtml(name)}</h3>
        <p class="package-desc">${escapeHtml(desc)}</p>
        <div class="package-price-box">
          <span class="currency">USD</span>
          <span class="price">${formatPrice(pkg.price)}</span>
        </div>
        <ul class="package-features">
          ${features.map(feat => `<li><i class="fa-solid fa-circle-check"></i> ${escapeHtml(feat)}</li>`).join('')}
        </ul>
        <button class="btn-buy" onclick="openPurchaseModal('etsyboost', '${pkg.id}')">
          <i class="fa-solid fa-cart-shopping"></i> ${getCurrentLabels()['order-button']}
        </button>
      </article>
    `;
  }).join('');
}

function openPurchaseModal(categoryKey, packageId) {
  const category = packageCatalog[categoryKey];
  const pkg = category.packages.find(p => p.id === packageId);
  if (!pkg) return;

  const isKo = currentLang === 'ko';
  const pkgName = isKo ? pkg.name_ko : pkg.name_en;
  currentPackage = {
    categoryKey,
    categoryName: isKo ? category.title_ko : category.title_en,
    tierName: pkgName,
    basePrice: pkg.price
  };
  orderQuantity = 1;

  const setText = (id, value) => { const el = document.getElementById(id); if (el) el.innerText = value; };
  setText('modal-product-title', isKo ? category.title_ko : category.title_en);
  setText('modal-package-name', pkgName);
  setText('modal-base-price', formatPrice(pkg.price));

  const emailInput = document.getElementById('order-email');
  const stateSelect = document.getElementById('order-state');
  const companyInput = document.getElementById('order-company');
  const goalInput = document.getElementById('order-goal');
  if (emailInput) emailInput.value = '';
  if (stateSelect) stateSelect.value = '';
  if (companyInput) companyInput.value = '';
  if (goalInput) goalInput.value = '';
  const qtyEl = document.getElementById('order-quantity');
  if (qtyEl) qtyEl.value = '1';

  const emailError = document.getElementById('email-error');
  if (emailError) emailError.style.display = 'none';

  updateModalPrice();

    const totalEl = document.getElementById('modal-total-price');
    if (totalEl && !totalEl.dataset.checkoutBound) {
        totalEl.style.cursor = 'pointer';
        totalEl.setAttribute('role', 'button');
        totalEl.setAttribute('tabindex', '0');
        totalEl.addEventListener('click', triggerTestCheckout);
        totalEl.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                triggerTestCheckout();
            }
        });
        totalEl.dataset.checkoutBound = '1';
    }
  document.getElementById('purchase-modal').classList.add('active');
  setTimeout(() => {
    const modalCard = document.querySelector('.modal-card');
    const paymentArea = document.querySelector('.total-price-box');
    if (modalCard && paymentArea) {
      modalCard.scrollTo({ top: Math.max(paymentArea.offsetTop - 120, 0), behavior: 'smooth' });
    }
  }, 120);
  initPayPalButtons();
}

function closeModal() {
  const modal = document.getElementById('purchase-modal');
  if (modal) modal.classList.remove('active');
  const container = document.getElementById('paypal-button-container');
  if (container) container.innerHTML = '';
  paypalButtonInstance = null;
}

function adjustQty(amount) {
  const qtyInput = document.getElementById('order-quantity');
  if (!qtyInput || !currentPackage) return;
  let val = parseInt(qtyInput.value, 10) || 1;
  val += amount;
  if (val < 1) val = 1;
  qtyInput.value = String(val);
  orderQuantity = val;
  updateModalPrice();
}

function updateModalPrice() {
  const qtyInput = document.getElementById('order-quantity');
  if (!qtyInput || !currentPackage) return;
  let val = parseInt(qtyInput.value, 10);
  if (Number.isNaN(val) || val < 1) val = 1;
  orderQuantity = val;
  const total = currentPackage.basePrice * orderQuantity;
  const totalEl = document.getElementById('modal-total-price');
  if (totalEl) totalEl.innerText = formatPrice(total);
}

function validateEmailField() {
  const emailInput = document.getElementById('order-email');
  const emailError = document.getElementById('email-error');
  if (!emailInput) return true;
  const email = emailInput.value.trim();
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const valid = pattern.test(email);
  if (!valid) {
    emailInput.style.borderColor = '#ef4444';
    if (emailError) {
      emailError.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> ${currentLang === 'ko' ? '올바른 이메일 주소를 입력해주세요.' : 'Please enter a valid email address.'}`;
      emailError.style.display = 'block';
    }
    return false;
  }
  emailInput.style.borderColor = 'var(--border)';
  if (emailError) emailError.style.display = 'none';
  return true;
}

function validateOrderFields() {
  const state = document.getElementById('order-state');
  const company = document.getElementById('order-company');
  const goal = document.getElementById('order-goal');
  const invalid = [state, company, goal].filter(el => el && !el.value.trim());
  invalid.forEach(el => el.style.borderColor = '#ef4444');
  return invalid.length === 0;
}

function triggerTestCheckout() {
  const emailInput = document.getElementById('order-email');
  const state = document.getElementById('order-state');
  const company = document.getElementById('order-company');
  const goal = document.getElementById('order-goal');
  if (emailInput && !emailInput.value.trim()) emailInput.value = 'secure checkout@test.dev';
  if (state && !state.value.trim()) state.value = 'https://etsy.com/shop/my-store';
  if (company && !company.value.trim()) company.value = 'secure checkout Etsy Shop';
  if (goal && !goal.value.trim()) goal.value = 'Etsy launch secure checkout test';
  if (!validateEmailField() || !validateOrderFields()) return;
  finalizeOrder({ id: `TEST-PAYID-${Math.random().toString(36).slice(2, 10).toUpperCase()}` }, true);
}

function initPayPalButtons() {
  const container = document.getElementById('paypal-button-container');
  if (!container || paypalButtonInstance) return;
  if (typeof paypal === 'undefined') {
    container.innerHTML = '<p style="color:#ef4444;text-align:center;font-size:0.92rem;padding:1rem;font-weight:600;"><i class="fa-solid fa-triangle-exclamation"></i> PayPal is unavailable right now. Please reload the page.</p>';
    return;
  }

  paypalButtonInstance = paypal.Buttons({
    style: { layout: 'vertical', color: 'blue', shape: 'rect', label: 'checkout' },
    onClick: function(data, actions) {
      if (!validateEmailField() || !validateOrderFields()) return actions.reject();
      return actions.resolve();
    },
    createOrder: function(data, actions) {
      const total = (currentPackage.basePrice * orderQuantity).toFixed(2);
      const state = document.getElementById('order-state').value.trim();
      const company = document.getElementById('order-company').value.trim();
      const goal = document.getElementById('order-goal').value.trim();
      return actions.order.create({
        purchase_units: [{
          description: `${currentPackage.categoryName} - ${currentPackage.tierName} [Shop URL: ${state}] [Shop: ${company}] [Goal: ${goal}] (Qty: ${orderQuantity})`,
          amount: { currency_code: 'USD', value: total }
        }]
      });
    },
    onApprove: function(data, actions) {
      return actions.order.capture().then(details => {
        finalizeOrder(details, false);
      });
    },
    onError: function(err) {
      console.error('PayPal Checkout error:', err);
      alert('An error occurred during payment processing. Please try again.');
    }
  });

  paypalButtonInstance.render('#paypal-button-container');
}

function buildReceiptText(order) {
  const dict = getCurrentLabels();
  const receiptLines = [
    '===================================',
    dict['receipt-header'],
    '===================================',
    `${dict['receipt-date'].padEnd(15)} : ${order.date}`,
    `${dict['receipt-txid'].padEnd(15)} : ${order.id}`,
    `${dict['receipt-email'].padEnd(15)} : ${order.email}`,
    `${dict['receipt-type'].padEnd(15)} : ${order.category}`,
    `${dict['receipt-size'].padEnd(15)} : ${order.package}`,
    `${dict['receipt-state'].padEnd(15)} : ${order.state}`,
    `${dict['receipt-company'].padEnd(15)} : ${order.company}`,
    `${dict['receipt-goal'].padEnd(15)} : ${order.goal}`,
    `${dict['receipt-qty'].padEnd(15)} : ${order.quantity}`,
    `${dict['receipt-baseprice'].padEnd(15)} : ${order.basePrice}`,
    `${dict['receipt-total'].padEnd(15)} : ${order.total}`,
    `${dict['receipt-status'].padEnd(15)} : ${order.status}`,
    `${dict['receipt-method'].padEnd(15)} : ${dict['receipt-method-val']}`
  ];
  return receiptLines.join('\n');
}

function redirectToGoogleForm(receiptText) {
  const redirectUrl = `${GOOGLE_FORM_URL}${encodeURIComponent(receiptText)}`;
  window.location.href = redirectUrl;
}

function finalizeOrder(details, isTest = false) {
  saveLocalOrder(details, isTest);
  const emailInput = document.getElementById('order-email');
  const state = document.getElementById('order-state');
  const company = document.getElementById('order-company');
  const goal = document.getElementById('order-goal');
  const total = currentPackage.basePrice * orderQuantity;
  const order = {
    date: new Date().toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
    id: details.id,
    email: emailInput ? emailInput.value.trim() : '',
    category: currentPackage.categoryName,
    package: currentPackage.tierName,
    state: state ? state.value.trim() : '',
    company: company ? company.value.trim() : '',
    goal: goal ? goal.value.trim() : '',
    quantity: orderQuantity,
    basePrice: formatPrice(currentPackage.basePrice),
    total: formatPrice(total),
    status: isTest ? 'secure checkout Test' : 'Paid'};
  closeModal();
  redirectToGoogleForm(buildReceiptText(order));
}

function saveLocalOrder(details, isTest = false) {
  const orderLogs = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  const emailVal = document.getElementById('order-email') ? document.getElementById('order-email').value.trim() : '';
  const stateVal = document.getElementById('order-state') ? document.getElementById('order-state').value.trim() : '';
  const companyVal = document.getElementById('order-company') ? document.getElementById('order-company').value.trim() : '';
  const goalVal = document.getElementById('order-goal') ? document.getElementById('order-goal').value.trim() : '';
  const total = currentPackage.basePrice * orderQuantity;

  orderLogs.unshift({
    date: new Date().toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
    id: details.id,
    email: emailVal,
    category: currentPackage.categoryName,
    package: currentPackage.tierName,
    state: stateVal,
    company: companyVal,
    goal: goalVal,
    quantity: orderQuantity,
    basePrice: formatPrice(currentPackage.basePrice),
    total: formatPrice(total),
    status: isTest ? 'secure checkout Test' : 'Paid'
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(orderLogs));
}

function renderOrders() {
  const tbody = document.getElementById('orders-tbody');
  const emptyState = document.getElementById('no-orders-msg');
  if (!tbody) return;
  const logs = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

  if (!logs.length) {
    tbody.innerHTML = '';
    if (emptyState) emptyState.style.display = 'block';
    return;
  }

  if (emptyState) emptyState.style.display = 'none';
  tbody.innerHTML = logs.map(item => `
    <tr>
      <td>${escapeHtml(item.date)}</td>
      <td class="tx-id">${escapeHtml(item.id)}</td>
      <td>${escapeHtml(item.category)}</td>
      <td>${escapeHtml(item.package)}</td>
      <td>${escapeHtml(item.state || '-')}</td>
      <td>${escapeHtml(item.company || '-')}</td>
      <td>${escapeHtml(item.quantity)}</td>
      <td>${escapeHtml(item.total)}</td>
      <td><span class="status-badge">${escapeHtml(item.status)}</span></td>
    </tr>
  `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  const lang = currentLang.toLowerCase().startsWith('ko') ? 'ko' : 'en';
  applyTranslations(lang);
  renderOrders();
});

// Expose variables globally to prevent ReferenceErrors in inline HTML scripts/handlers
if (typeof navigate !== 'undefined') { window.navigate = navigate; }
if (typeof currentLang !== 'undefined') { window.currentLang = currentLang; }

window.openPurchaseModal = openPurchaseModal;
window.closeModal = closeModal;
window.adjustQty = adjustQty;
window.changeLanguage = changeLanguage;
