// TIKSHOP app state
const STORAGE_KEY = 'tikshop_orders';
let currentLang = localStorage.getItem('bibleforai_lang') || (() => {
  const browserLang = (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage || '';
  return browserLang.toLowerCase().startsWith('ko') ? 'ko' : 'en';
})();
let currentPackage = null;
let orderQuantity = 1;
let paypalButtonInstance = null;

const packageCatalog = {
  tiktokshop: {
    title_en: 'TikTok Shop Seller Setup',
    title_ko: '틱톡샵 셀러 등록/승인',
    packages: [
      {
        id: 'standard',
        name_en: 'STANDARD — US / SEA Entry',
        name_ko: '스탠다드 — US / SEA 진입',
        desc_en: 'TikTok Shop seller registration for US domestic or KR-SEA cross-border accounts with guided setup.',
        desc_ko: '미국 국내 또는 한국-동남아 크로스보더 계정에 대한 TikTok Shop 셀러 등록/승인 패키지입니다.',
        price: 6286,
        featured: false,
        features_en: [
          'Seller Center registration & approval',
          'Seller / Business Center account setup',
          'Payment account guidance',
          'Estimated timeline: 45 days'
        ],
        features_ko: [
          '셀러 센터 등록 및 승인',
          '셀러 / 비즈니스 센터 계정 세팅',
          '정산 수단 설정 가이드',
          '예상 작업 기간: 45일'
        ]
      },
      {
        id: 'deluxe',
        name_en: 'DELUXE — KR-US Cross-Border',
        name_ko: '델럭스 — KR-US 크로스보더',
        desc_en: 'For Korea-based brands entering the US market with cross-border seller onboarding and payout workflow.',
        desc_ko: '한국 법인 브랜드의 미국 진출을 위한 크로스보더 셀러 온보딩 및 정산 워크플로우 패키지입니다.',
        price: 11000,
        featured: true,
        features_en: [
          'KR-US cross-border registration',
          'Brand / compliance checklist',
          'Payout & withdrawal setup',
          'Estimated timeline: 60 days'
        ],
        features_ko: [
          'KR-US 크로스보더 등록',
          '브랜드 / 컴플라이언스 체크리스트',
          '정산 및 출금 세팅',
          '예상 작업 기간: 60일'
        ]
      },
      {
        id: 'premium',
        name_en: 'PREMIUM — SEA 6-Country Launch',
        name_ko: '프리미엄 — SEA 6개국 런칭',
        desc_en: 'The widest scope: KR-SEA cross-border registration for six Southeast Asia markets and handoff guidance.',
        desc_ko: '가장 넓은 범위의 KR-SEA 크로스보더 등록으로 동남아 6개국과 인수인계 가이드를 제공합니다.',
        price: 14143,
        featured: false,
        features_en: [
          'KR-SEA six-country launch',
          'Account handoff guide',
          'Channel reference review',
          'Estimated timeline: 75 days'
        ],
        features_ko: [
          'KR-SEA 6개국 런칭',
          '계정 인수인계 가이드',
          '레퍼런스 채널 검토',
          '예상 작업 기간: 75일'
        ]
      }
    ]
  }
};

const translations = {
  en: {
    'logo-subtitle': 'TikTok Shop Setup!',
    'nav-overview': 'Overview',
    'nav-packages': 'Packages',
    'nav-faq': 'FAQ',
    'nav-orders': 'Orders',
    'btn-orders': 'My Orders',
    'hero-badge': 'Cross-Border Commerce',
    'hero-title': 'TIKSHOP — TikTok Shop Seller Setup',
    'hero-desc': 'Get TikTok Shop seller registration, approval workflow, payout setup, and launch guidance for US and Southeast Asia markets.',
    'hero-cta': 'See Packages',
    'hero-secondary': 'Read FAQ',
    'stat-one-num': '45-75d',
    'stat-one-label': 'Timeline range',
    'stat-two-num': 'US / SEA',
    'stat-two-label': 'Global markets',
    'stat-three-num': 'Cross-border',
    'stat-three-label': 'Launch support',
    'section-packages-title': 'TikTok Shop Launch Packages',
    'section-packages-sub': 'Choose the level of seller onboarding you need for your brand or corporation.',
    'why-title': 'Why TIKSHOP works',
    'why-desc': 'Built around the real onboarding flow: account registration, approval guidance, payout setup, and handoff notes for your team.',
    'why-1-bold': 'Seller onboarding:',
    'why-1-text': 'We align the seller type, region, and account setup path before submission.',
    'why-2-bold': 'Compliance-aware:',
    'why-2-text': 'Brand references, corporate status, and payout readiness are reviewed before launch.',
    'why-3-bold': 'Global ready:',
    'why-3-text': 'Designed for US domestic, KR-US cross-border, and KR-SEA cross-border launch paths.',
    'faq-title': 'Frequently Asked Questions',
    'faq-sub': 'Practical answers for TikTok Shop registration and launch planning.',
    'faq-q1': 'What should I prepare before starting?',
    'faq-a1': 'Please prepare your email, company name, brand name, and any existing marketplace references such as Amazon, Shopify, Shopee, or Lazada.',
    'faq-q2': 'Which markets are supported?',
    'faq-a2': 'The packages cover US domestic, KR-US cross-border, and KR-SEA cross-border setups, including Southeast Asia launch guidance.',
    'faq-q3': 'How is the work delivered?',
    'faq-a3': 'You receive email updates, setup notes, and a payment completion receipt that is mirrored into Google Forms.',
    'faq-q4': 'Is this a one-time service?',
    'faq-a4': 'Yes. It is a launch and registration service, with setup guidance and handoff support included per package scope.',
    'orders-title': 'My Purchase History',
    'orders-sub': 'Successful orders are stored locally in your browser workspace.',
    'th-date': 'Order Date',
    'th-order-id': 'Transaction ID',
    'th-product': 'Product',
    'th-tier': 'Package Tier',
    'th-market': 'Market Type',
    'th-company': 'Company / Brand',
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
    'modal-market-label': 'Market Type *',
    'modal-market-placeholder': 'US Domestic / KR-US / KR-SEA',
    'modal-company-label': 'Company / Brand *',
    'modal-company-placeholder': 'Your brand name',
    'modal-ref-label': 'Reference Channels *',
    'modal-ref-placeholder': 'Amazon, Shopify, Shopee, Lazada...',
    'modal-qty': 'Quantity:',
    'modal-total-amt': 'Total Amount:',
    
    'badge-ssl': 'SSL Secured Checkout',
    'badge-paypal': 'PayPal Verified',
    'pay-now': 'Pay with PayPal',
    'featured-badge': 'Best Seller',
    'order-button': 'Order Package',
    'foot-note': 'TIKSHOP helps brands move from planning to a working TikTok Shop account with less friction.',
    'foot-contact': 'Contact support: snsherocom@gmail.com',
    'foot-copy': '&copy; 2026 BibleForAI TIKSHOP. All rights reserved.',
    'receipt-header': 'BIBLEFORAI - TIKSHOP RECEIPT',
    'receipt-date': 'Order Date',
    'receipt-txid': 'Transaction ID',
    'receipt-email': 'Customer Email',
    'receipt-type': 'Product Type',
    'receipt-size': 'Package Tier',
    'receipt-market': 'Market Type',
    'receipt-company': 'Company / Brand',
    'receipt-ref': 'Reference Channels',
    'receipt-qty': 'Quantity',
    'receipt-baseprice': 'Base Price',
    'receipt-total': 'Total Paid',
    'receipt-status': 'Status',
    'receipt-method': 'Payment Method',
    'receipt-method-val': 'PayPal Secure Checkout'
  },
  ko: {
    'logo-subtitle': '틱톡샵 세팅!',
    'nav-overview': '개요',
    'nav-packages': '패키지',
    'nav-faq': 'FAQ',
    'nav-orders': '주문내역',
    'btn-orders': '내 주문내역',
    'hero-badge': '크로스보더 커머스',
    'hero-title': 'TIKSHOP — 틱톡샵 셀러 등록/승인',
    'hero-desc': '미국 및 동남아 시장을 위한 TikTok Shop 셀러 등록, 승인 워크플로우, 정산 세팅, 런칭 가이드를 제공합니다.',
    'hero-cta': '패키지 보기',
    'hero-secondary': 'FAQ 보기',
    'stat-one-num': '45-75일',
    'stat-one-label': '작업 기간',
    'stat-two-num': 'US / SEA',
    'stat-two-label': '글로벌 시장',
    'stat-three-num': '크로스보더',
    'stat-three-label': '런칭 지원',
    'section-packages-title': '틱톡샵 런칭 패키지',
    'section-packages-sub': '브랜드 또는 법인 상황에 맞는 셀러 온보딩 수준을 선택하세요.',
    'why-title': 'TIKSHOP가 효과적인 이유',
    'why-desc': '계정 등록, 승인 가이드, 정산 세팅, 팀 인수인계 노트까지 실제 런칭 흐름에 맞춰 설계했습니다.',
    'why-1-bold': '셀러 온보딩:',
    'why-1-text': '제출 전 셀러 유형, 지역, 계정 세팅 경로를 정리합니다.',
    'why-2-bold': '컴플라이언스 고려:',
    'why-2-text': '브랜드 레퍼런스, 법인 상태, 정산 가능 여부를 먼저 점검합니다.',
    'why-3-bold': '글로벌 대응:',
    'why-3-text': 'US 국내, KR-US 크로스보더, KR-SEA 크로스보더 런칭 경로에 맞춰 설계합니다.',
    'faq-title': '자주 묻는 질문',
    'faq-sub': 'TikTok Shop 등록과 런칭 계획을 위한 실무 답변입니다.',
    'faq-q1': '시작 전에 무엇을 준비해야 하나요?',
    'faq-a1': '이메일, 회사명, 브랜드명, 그리고 Amazon·Shopify·Shopee·Lazada 같은 기존 마켓플레이스 레퍼런스를 준비해 주세요.',
    'faq-q2': '어떤 시장을 지원하나요?',
    'faq-a2': 'US 국내, KR-US 크로스보더, KR-SEA 크로스보더 세 가지 경로와 동남아 런칭 가이드를 지원합니다.',
    'faq-q3': '작업 결과는 어떻게 전달되나요?',
    'faq-a3': '이메일 업데이트, 세팅 노트, 그리고 Google Form으로 연결되는 결제 완료 영수증으로 전달됩니다.',
    'faq-q4': '1회성 서비스인가요?',
    'faq-a4': '네. 런칭 및 등록 서비스이며, 패키지 범위에 따라 세팅 가이드와 인수인계 지원이 포함됩니다.',
    'orders-title': '내 구매 내역',
    'orders-sub': '성공한 주문은 브라우저 작업공간에 로컬로 저장됩니다.',
    'th-date': '주문 날짜',
    'th-order-id': '트랜잭션 ID',
    'th-product': '상품명',
    'th-tier': '패키지',
    'th-market': '시장 유형',
    'th-company': '회사 / 브랜드',
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
    'modal-market-label': '시장 유형 *',
    'modal-market-placeholder': 'US 국내 / KR-US / KR-SEA',
    'modal-company-label': '회사 / 브랜드 *',
    'modal-company-placeholder': '브랜드명을 입력하세요',
    'modal-ref-label': '레퍼런스 채널 *',
    'modal-ref-placeholder': 'Amazon, Shopify, Shopee, Lazada...',
    'modal-qty': '수량:',
    'modal-total-amt': '총 결제액:',
    
    'badge-ssl': 'SSL 보안 결제',
    'badge-paypal': 'PayPal 인증',
    'pay-now': 'PayPal로 결제',
    'featured-badge': '베스트셀러',
    'order-button': '패키지 주문',
    'foot-note': 'TIKSHOP는 브랜드가 TikTok Shop 계정을 실제로 운영 가능한 상태로 전환하도록 돕습니다.',
    'foot-contact': '문의: snsherocom@gmail.com',
    'foot-copy': '&copy; 2026 BibleForAI TIKSHOP. All rights reserved.',
    'receipt-header': 'BIBLEFORAI - TIKSHOP 영수증',
    'receipt-date': '주문 날짜',
    'receipt-txid': '트랜잭션 ID',
    'receipt-email': '고객 이메일',
    'receipt-type': '상품 유형',
    'receipt-size': '패키지',
    'receipt-market': '시장 유형',
    'receipt-company': '회사 / 브랜드',
    'receipt-ref': '레퍼런스 채널',
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
  const container = document.getElementById('tiktokshop-packages');
  if (!container) return;
  const isKo = currentLang === 'ko';
  const catalog = packageCatalog.tiktokshop;

  container.innerHTML = catalog.packages.map(pkg => {
    const name = isKo ? pkg.name_ko : pkg.name_en;
    const desc = isKo ? pkg.desc_ko : pkg.desc_en;
    const features = isKo ? pkg.features_ko : pkg.features_en;
    const badge = pkg.featured ? `<span class="package-chip">${getCurrentLabels()['featured-badge']}</span>` : '';
    return `
      <article class="package-card ${pkg.featured ? 'featured' : ''} card-${pkg.id}">
        ${badge}
        <div class="card-icon ${pkg.id}-color"><i class="fa-brands fa-tiktok"></i></div>
        <h3>${name}</h3>
        <p class="package-desc">${desc}</p>
        <div class="package-price-box">
          <span class="currency">USD</span>
          <span class="price">${formatPrice(pkg.price)}</span>
        </div>
        <ul class="package-features">
          ${features.map(feat => `<li><i class="fa-solid fa-circle-check"></i> ${feat}</li>`).join('')}
        </ul>
        <button class="btn-buy" onclick="openPurchaseModal('tiktokshop', '${pkg.id}')">
          <i class="fa-brands fa-tiktok"></i> ${getCurrentLabels()['order-button']}
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

  const resetField = id => { const el = document.getElementById(id); if (el) el.value = ''; };
  resetField('order-email');
  resetField('order-market');
  resetField('order-company');
  resetField('order-ref');
  const qtyEl = document.getElementById('order-quantity');
  if (qtyEl) qtyEl.value = '1';

  const emailError = document.getElementById('email-error');
  if (emailError) emailError.style.display = 'none';

  updateModalPrice();
  document.getElementById('purchase-modal').classList.add('active');
  setTimeout(() => {
    const modalCard = document.querySelector('.modal-card');
    const totalBox = document.querySelector('.total-price-box');
    if (modalCard && totalBox) {
      modalCard.scrollTo({ top: Math.max(totalBox.offsetTop - 120, 0), behavior: 'smooth' });
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
  const market = document.getElementById('order-market');
  const company = document.getElementById('order-company');
  const ref = document.getElementById('order-ref');
  const invalid = [market, company, ref].filter(el => el && !el.value.trim());
  invalid.forEach(el => el.style.borderColor = '#ef4444');
  return invalid.length === 0;
}

function triggerTestCheckout() {
  const emailInput = document.getElementById('order-email');
  const market = document.getElementById('order-market');
  const company = document.getElementById('order-company');
  const ref = document.getElementById('order-ref');
  if (emailInput && !emailInput.value.trim()) emailInput.value = 'sandbox@test.dev';
  if (market && !market.value.trim()) market.value = 'US Domestic';
  if (company && !company.value.trim()) company.value = 'Sandbox Brand';
  if (ref && !ref.value.trim()) ref.value = 'TikTok Shop, Shopify, Amazon';
  if (!validateEmailField() || !validateOrderFields()) return;
  saveLocalOrder({ id: `TEST-PAYID-${Math.random().toString(36).slice(2, 10).toUpperCase()}`, isTest: true });
  closeModal();
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
      const market = document.getElementById('order-market').value.trim();
      const company = document.getElementById('order-company').value.trim();
      const ref = document.getElementById('order-ref').value.trim();
      return actions.order.create({
        purchase_units: [{
          description: `${currentPackage.categoryName} - ${currentPackage.tierName} [Market: ${market}] [Company: ${company}] [Refs: ${ref}] (Qty: ${orderQuantity})`,
          amount: { currency_code: 'USD', value: total }
        }]
      });
    },
    onApprove: function(data, actions) {
      return actions.order.capture().then(details => {
        saveLocalOrder(details);
        closeModal();
      });
    },
    onError: function(err) {
      console.error('PayPal Checkout error:', err);
      alert('An error occurred during payment processing. Please try again.');
    }
  });

  paypalButtonInstance.render('#paypal-button-container');
}

function saveLocalOrder(details) {
  const orderLogs = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  const emailVal = document.getElementById('order-email') ? document.getElementById('order-email').value.trim() : '';
  const marketVal = document.getElementById('order-market') ? document.getElementById('order-market').value.trim() : '';
  const companyVal = document.getElementById('order-company') ? document.getElementById('order-company').value.trim() : '';
  const refVal = document.getElementById('order-ref') ? document.getElementById('order-ref').value.trim() : '';
  const dict = getCurrentLabels();

  const newOrder = {
    date: new Date().toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
    id: details.id,
    email: emailVal,
    category: currentPackage.categoryName,
    package: currentPackage.tierName,
    market: marketVal || 'US Domestic',
    company: companyVal || 'Brand',
    reference: refVal || 'TikTok Shop',
    quantity: orderQuantity,
    basePrice: currentPackage.basePrice,
    totalPaid: formatPrice(currentPackage.basePrice * orderQuantity),
    status: 'Completed'
  };

  orderLogs.unshift(newOrder);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orderLogs));
  renderOrders();

  const receiptText = `===================================\n${dict['receipt-header']}\n===================================\n${dict['receipt-date'].padEnd(15)} : ${newOrder.date}\n${dict['receipt-txid'].padEnd(15)} : ${newOrder.id}\n${dict['receipt-email'].padEnd(15)} : ${newOrder.email}\n${dict['receipt-type'].padEnd(15)} : ${newOrder.category}\n${dict['receipt-size'].padEnd(15)} : ${newOrder.package}\n${dict['receipt-market'].padEnd(15)} : ${newOrder.market}\n${dict['receipt-company'].padEnd(15)} : ${newOrder.company}\n${dict['receipt-ref'].padEnd(15)} : ${newOrder.reference}\n${dict['receipt-qty'].padEnd(15)} : ${newOrder.quantity}\n${dict['receipt-baseprice'].padEnd(15)} : ${formatPrice(newOrder.basePrice)}\n${dict['receipt-total'].padEnd(15)} : ${newOrder.totalPaid}\n${dict['receipt-status'].padEnd(15)} : ${newOrder.status}\n-----------------------------------\n${dict['receipt-method'].padEnd(15)} : ${dict['receipt-method-val']}\n===================================`;
  const redirectUrl = `https://docs.google.com/forms/d/e/1FAIpQLScMPqbEWWttS5mb1m_krsO_kco24ImpgvYVSbc7zO0nEVmYFw/viewform?entry.1059822061=${encodeURIComponent(receiptText)}`;
  window.location.href = redirectUrl;
}

function renderOrders() {
  const tbody = document.getElementById('orders-tbody');
  const emptyMsg = document.getElementById('no-orders-msg');
  if (!tbody || !emptyMsg) return;
  const orderLogs = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  const isKo = currentLang === 'ko';

  if (!orderLogs.length) {
    tbody.innerHTML = '';
    emptyMsg.style.display = 'block';
    return;
  }

  emptyMsg.style.display = 'none';
  tbody.innerHTML = orderLogs.map(order => `
    <tr>
      <td>${order.date}</td>
      <td class="tx-id">${order.id}</td>
      <td>${order.category}</td>
      <td>${order.package}</td>
      <td>${order.market || 'US Domestic'}</td>
      <td>${order.company || 'Brand'}</td>
      <td>${order.quantity}</td>
      <td><strong>${order.totalPaid}</strong></td>
      <td><span class="status-badge">${isKo ? '완료됨' : order.status}</span></td>
    </tr>
  `).join('');
}

window.changeLanguage = changeLanguage;
window.navigate = navigate;
window.toggleMobileMenu = toggleMobileMenu;
window.closeModal = closeModal;
window.adjustQty = adjustQty;
window.triggerTestCheckout = triggerTestCheckout;
window.openPurchaseModal = openPurchaseModal;
window.updateModalPrice = updateModalPrice;

window.addEventListener('DOMContentLoaded', () => {
  applyTranslations(currentLang);
  renderPackages();
  renderOrders();
});

// Expose variables globally to prevent ReferenceErrors in inline HTML scripts/handlers
if (typeof navigate !== 'undefined') { window.navigate = navigate; }
if (typeof currentLang !== 'undefined') { window.currentLang = currentLang; }
