const STORAGE_KEY = 'chinaboost_orders';
const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScMPqbEWWttS5mb1m_krsO_kco24ImpgvYVSbc7zO0nEVmYFw/viewform?entry.1059822061=';
const currentLang = ((window.DEFAULT_LANG || localStorage.getItem('bibleforai_lang') || navigator.language || 'en').toLowerCase().startsWith('ko')) ? 'ko' : 'en';

let activeLang = currentLang;
let currentPackage = null;
let orderQuantity = 1;
let paypalButtonInstance = null;

const packageCatalog = [
  {
    id: 'cn-guide',
    name_en: 'Starter Guide & Market Scan',
    name_ko: '스타터 가이드 & 시장 스캔',
    desc_en: 'A fast-entry consulting package for founders who need a practical China market view, compliance checklist, and launch roadmap.',
    desc_ko: '중국 시장에 빠르게 진입하려는 창업자를 위한 실무형 컨설팅 패키지로, 시장 개요·규정 체크리스트·런칭 로드맵을 제공합니다.',
    originalPrice: 99,
    price: 198,
    featured: false,
    features_en: ['Market entry checklist', 'Bilingual intake form', 'Google Form handoff', 'PayPal receipt workflow'],
    features_ko: ['시장 진입 체크리스트', '한영 접수 폼', 'Google Form 인수인계', 'PayPal 영수증 워크플로우']
  },
  {
    id: 'cn-setup',
    name_en: 'Registration Setup Package',
    name_ko: '등록 세팅 패키지',
    desc_en: 'For brands launching in China: entity setup planning, documentation review, and practical local partner coordination.',
    desc_ko: '중국 진출 브랜드를 위한 법인 세팅 플랜, 서류 검토, 로컬 파트너 조율까지 포함한 실전형 패키지입니다.',
    originalPrice: 1249,
    price: 2498,
    featured: true,
    features_en: ['Entity setup roadmap', 'Document review', 'Local partner brief', 'Priority support'],
    features_ko: ['법인 세팅 로드맵', '서류 검토', '현지 파트너 브리핑', '우선 지원']
  },
  {
    id: 'cn-enterprise',
    name_en: 'Enterprise Launch Suite',
    name_ko: '엔터프라이즈 런치 슈트',
    desc_en: 'A full-service China market entry plan for teams that need strategy, setup guidance, and launch coordination together.',
    desc_ko: '전략, 세팅 가이드, 런칭 조율을 한 번에 해결해야 하는 팀을 위한 풀 서비스 중국 진출 패키지입니다.',
    originalPrice: 1999,
    price: 3998,
    featured: false,
    features_en: ['Full launch roadmap', 'Operational checklist', 'Bilingual coordination notes', 'Executive handoff summary'],
    features_ko: ['전체 런칭 로드맵', '운영 체크리스트', '한중 조율 메모', '임원용 요약본']
  }
];

const translations = {
  en: {
    'logo-subtitle': 'China Market Entry!',
    'nav-overview': 'Overview',
    'nav-packages': 'Packages',
    'nav-process': 'Workflow',
    'nav-faq': 'FAQ',
    'nav-orders': 'Orders',
    'btn-orders': 'My Orders',
    'hero-badge': 'Asia Expansion Ready',
    'hero-title': 'ChinaBoost — China Business Registration & Market Entry',
    'hero-desc': 'Launch into China with practical market entry planning, registration guidance, bilingual intake, and a clean PayPal-to-Google-Form workflow.',
    'hero-cta': 'See Packages',
    'hero-secondary': 'Read Workflow',
    'stat-1-num': '48h',
    'stat-1-label': 'Fast kickoff',
    'stat-2-num': '2x',
    'stat-2-label': 'Markup pricing',
    'stat-3-num': 'USD',
    'stat-3-label': 'Billing currency',
    'section-packages-title': 'China Entry Packages',
    'section-packages-sub': 'Prices are shown in USD with a 2x markup over the benchmark market rate.',
    'section-process-title': 'Workflow',
    'section-process-sub': 'PayPal checkout, secure checkout test button, and a Google Form handoff are included.',
    'section-faq-title': 'Frequently Asked Questions',
    'section-faq-sub': 'Short answers for founders, sellers, agencies, and operators expanding into China.',
    'process-1-title': '1. Choose a package',
    'process-1-desc': 'Pick the scope that matches your launch stage and project size.',
    'process-2-title': '2. Pay securely',
    'process-2-desc': 'Use the PayPal checkout or the built-in test button for secure checkout verification.',
    'process-3-title': '3. Submit the handoff',
    'process-3-desc': 'We redirect your receipt and notes into Google Form-ready data for follow-up.',
    'faq-q1': 'What information do I need before checkout?',
    'faq-a1': 'Email, company name, target city or region, and a short launch objective are enough to start.',
    'faq-q2': 'Is this for non-Chinese founders?',
    'faq-a2': 'Yes. The workflow is designed for international founders, exporters, agencies, and e-commerce teams.',
    'faq-q3': 'How does the Google Form integration work?',
    'faq-a3': 'After payment or payment checkout, a plain-text receipt is encoded and passed into the Google Form URL.',
    'faq-q4': 'Is Korean supported?',
    'faq-a4': 'Yes. Switch the language selector or open /kr/ for the Korean version.',
    'orders-title': 'My Orders',
    'orders-sub': 'Recent orders are stored locally in your browser workspace.',
    'th-date': 'Date',
    'th-id': 'Transaction ID',
    'th-package': 'Package',
    'th-market': 'Target Market',
    'th-qty': 'Qty',
    'th-total': 'Total Paid',
    'th-status': 'Status',
    'no-orders': 'No orders yet. Complete a checkout to see your history.',
    'open-order': 'Order Package',
    'featured': 'Best Value',
    'price-prefix': 'USD',
    'orig-price': 'Original',
    'now-price': 'Now',
    'feature-badge': 'Included',
    'modal-title': 'Configure Order',
    'modal-desc': 'Fill in your contact details, run a test, or pay with PayPal.',
    'modal-email': 'Email Address *',
    'modal-email-placeholder': 'name@example.com',
    'modal-company': 'Company / Brand',
    'modal-company-placeholder': 'Acme Global Ltd.',
    'modal-market': 'Target City / Region',
    'modal-market-placeholder': 'Shanghai / Shenzhen / Hong Kong',
    'modal-goal': 'Launch Goal',
    'modal-goal-placeholder': 'Register a local entity and prepare market entry',
    'modal-qty': 'Quantity',
    'modal-total': 'Total Amount',
    'modal-test': 'Click price to payment checkout',
    'badge-paypal': 'PayPal Verified',
    'badge-ssl': 'SSL Secured',
    'footer-note': 'ChinaBoost provides practical business-entry planning with bilingual handoff, PayPal checkout, and Google Form receipt routing.'
  },
  ko: {
    'logo-subtitle': '중국 시장 진출!',
    'nav-overview': '개요',
    'nav-packages': '패키지',
    'nav-process': '진행 방식',
    'nav-faq': 'FAQ',
    'nav-orders': '주문 내역',
    'btn-orders': '내 주문 내역',
    'hero-badge': '아시아 확장 준비 완료',
    'hero-title': 'ChinaBoost — 중국 법인 등록 & 시장 진출',
    'hero-desc': '실무형 시장 진입 플랜, 등록 가이드, 한영 접수, 그리고 PayPal → Google Form 워크플로우로 중국 진출을 시작하세요.',
    'hero-cta': '패키지 보기',
    'hero-secondary': '진행 방식 보기',
    'stat-1-num': '48시간',
    'stat-1-label': '빠른 시작',
    'stat-2-num': '2배',
    'stat-2-label': '마크업 가격',
    'stat-3-num': 'USD',
    'stat-3-label': '결제 통화',
    'section-packages-title': '중국 진출 패키지',
    'section-packages-sub': '기준 시장가 대비 2배 마크업을 적용한 USD 가격입니다.',
    'section-process-title': '진행 방식',
    'section-process-sub': 'PayPal 결제, 테스트 버튼, Google Form 인수인계가 포함됩니다.',
    'section-faq-title': '자주 묻는 질문',
    'section-faq-sub': '중국 진출을 준비하는 창업자, 셀러, 에이전시, 운영팀을 위한 간단한 답변입니다.',
    'process-1-title': '1. 패키지 선택',
    'process-1-desc': '런칭 단계와 프로젝트 규모에 맞는 패키지를 선택하세요.',
    'process-2-title': '2. 안전 결제',
    'process-2-desc': 'PayPal 결제 또는 보안 테스트 버튼으로 결제 흐름을 검증합니다.',
    'process-3-title': '3. 인수인계 제출',
    'process-3-desc': '영수증과 안내 메모가 Google Form 입력용 데이터로 전달됩니다.',
    'faq-q1': '결제 전에 무엇을 준비해야 하나요?',
    'faq-a1': '이메일, 회사명, 목표 도시/지역, 간단한 진출 목표만 있으면 시작할 수 있습니다.',
    'faq-q2': '중국 외 국가의 창업자도 이용할 수 있나요?',
    'faq-a2': '네. 해외 창업자, 수출업체, 에이전시, 이커머스 팀을 위한 흐름으로 설계했습니다.',
    'faq-q3': 'Google Form 연동은 어떻게 되나요?',
    'faq-a3': '결제 또는 테스트 완료 후, 일반 텍스트 영수증이 인코딩되어 Google Form URL로 전달됩니다.',
    'faq-q4': '한국어도 지원되나요?',
    'faq-a4': '네. 언어 선택기를 사용하거나 /kr/ 경로로 접속하면 한국어 버전을 볼 수 있습니다.',
    'orders-title': '주문 내역',
    'orders-sub': '최근 주문은 브라우저 작업공간에 로컬로 저장됩니다.',
    'th-date': '날짜',
    'th-id': '거래 ID',
    'th-package': '패키지',
    'th-market': '대상 시장',
    'th-qty': '수량',
    'th-total': '총 결제금액',
    'th-status': '상태',
    'no-orders': '아직 주문이 없습니다. 결제를 완료하면 내역이 표시됩니다.',
    'open-order': '패키지 주문하기',
    'featured': '추천',
    'price-prefix': 'USD',
    'orig-price': '원가',
    'now-price': '현재가',
    'feature-badge': '포함',
    'modal-title': '주문 설정',
    'modal-desc': '연락처를 입력하고 테스트 또는 PayPal 결제를 진행하세요.',
    'modal-email': '이메일 주소 *',
    'modal-email-placeholder': 'name@example.com',
    'modal-company': '회사 / 브랜드',
    'modal-company-placeholder': 'Acme Global Ltd.',
    'modal-market': '대상 도시 / 지역',
    'modal-market-placeholder': '상하이 / 선전 / 홍콩',
    'modal-goal': '진출 목표',
    'modal-goal-placeholder': '현지 법인 등록 및 시장 진출 준비',
    'modal-qty': '수량',
    'modal-total': '총 결제금액',
    'modal-test': '가격 텍스트를 눌러 결제 진행',
    'badge-paypal': 'PayPal 인증',
    'badge-ssl': 'SSL 보안',
    'footer-note': 'ChinaBoost는 한중 이중 언어 인수인계, PayPal 결제, Google Form 영수증 라우팅을 포함한 실무형 진출 지원을 제공합니다.'
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

function getDict() {
  return translations[activeLang] || translations.en;
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

  activeLang = lang === 'ko' ? 'ko' : 'en';
  localStorage.setItem('bibleforai_lang', activeLang);
  document.documentElement.lang = activeLang;
  const dict = getDict();
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) el.innerHTML = dict[key];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (dict[key]) el.setAttribute('placeholder', dict[key]);
  });
  renderPackages();
  renderOrders();
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
  document.getElementById('language-selector').value = activeLang;
}

function renderPackages() {
  const grid = document.getElementById('packages-grid');
  if (!grid) return;
  const dict = getDict();
  grid.innerHTML = packageCatalog.map(pkg => `
    <article class="package-card ${pkg.featured ? 'featured' : ''}">
      ${pkg.featured ? `<span class="featured-badge">${dict.featured}</span>` : ''}
      <div class="package-top">
        <h3>${activeLang === 'ko' ? pkg.name_ko : pkg.name_en}</h3>
        <p>${activeLang === 'ko' ? pkg.desc_ko : pkg.desc_en}</p>
      </div>
      <div class="price-row">
        <div class="price-block">
          <span class="price-label">${dict['orig-price']}</span>
          <span class="price-old">${formatPrice(pkg.originalPrice)}</span>
        </div>
        <div class="price-block highlight">
          <span class="price-label">${dict['now-price']}</span>
          <span class="price-new">${formatPrice(pkg.price)}</span>
        </div>
      </div>
      <ul class="feature-list">
        ${(activeLang === 'ko' ? pkg.features_ko : pkg.features_en).map(f => `<li><i class="fa-solid fa-circle-check"></i> ${f}</li>`).join('')}
      </ul>
      <button class="btn-package" onclick="openPurchaseModal('${pkg.id}')">${dict['open-order']}</button>
    </article>
  `).join('');
}

function openPurchaseModal(packageId) {
  currentPackage = packageCatalog.find(pkg => pkg.id === packageId) || null;
  if (!currentPackage) return;
  orderQuantity = 1;
  document.getElementById('order-quantity').value = '1';
  document.getElementById('order-email').value = '';
  document.getElementById('order-company').value = '';
  document.getElementById('order-market').value = '';
  document.getElementById('order-goal').value = '';
  document.getElementById('email-error').style.display = 'none';
  document.getElementById('modal-package-name').innerText = activeLang === 'ko' ? currentPackage.name_ko : currentPackage.name_en;
  document.getElementById('modal-base-price').innerText = formatPrice(currentPackage.price);
  updateModalPrice();
  document.getElementById('purchase-modal').classList.add('active');
  initPayPalButtons();
}

function closeModal() {
  document.getElementById('purchase-modal').classList.remove('active');
  const container = document.getElementById('paypal-button-container');
  if (container) container.innerHTML = '';
  paypalButtonInstance = null;
}

function adjustQty(delta) {
  const qty = Math.max(1, (parseInt(document.getElementById('order-quantity').value, 10) || 1) + delta);
  document.getElementById('order-quantity').value = String(qty);
  orderQuantity = qty;
  updateModalPrice();
}

function updateModalPrice() {
  const qty = Math.max(1, parseInt(document.getElementById('order-quantity').value, 10) || 1);
  orderQuantity = qty;
  const total = currentPackage ? currentPackage.price * qty : 0;
  const totalEl = document.getElementById('modal-total-price');
  if (totalEl) totalEl.innerText = formatPrice(total);
}

function validateEmailField() {
  const emailInput = document.getElementById('order-email');
  const emailError = document.getElementById('email-error');
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim());
  if (!ok) {
    emailInput.style.borderColor = '#ef4444';
    emailError.style.display = 'block';
    return false;
  }
  emailInput.style.borderColor = 'rgba(255,255,255,0.08)';
  emailError.style.display = 'none';
  return true;
}

function validateOrderFields() {
  const requiredIds = ['order-company', 'order-market', 'order-goal'];
  let valid = true;
  requiredIds.forEach(id => {
    const el = document.getElementById(id);
    if (!el.value.trim()) {
      el.style.borderColor = '#ef4444';
      valid = false;
    } else {
      el.style.borderColor = 'rgba(255,255,255,0.08)';
    }
  });
  return valid;
}

function triggerTestCheckout() {
  const emailInput = document.getElementById('order-email');
  const companyInput = document.getElementById('order-company');
  const marketInput = document.getElementById('order-market');
  const goalInput = document.getElementById('order-goal');
  if (!emailInput.value.trim()) emailInput.value = 'secure checkout@test.dev';
  if (!companyInput.value.trim()) companyInput.value = 'secure checkout Global Ltd.';
  if (!marketInput.value.trim()) marketInput.value = 'Shanghai';
  if (!goalInput.value.trim()) goalInput.value = 'China market entry secure checkout test';
  if (!validateEmailField() || !validateOrderFields()) return;
  finalizeOrder({ id: `TEST-PAYID-${Math.random().toString(36).slice(2, 10).toUpperCase()}` }, true);
}

function initPayPalButtons() {
  const container = document.getElementById('paypal-button-container');
  if (!container || paypalButtonInstance) return;
  if (typeof paypal === 'undefined') {
    container.innerHTML = '<p style="color:#ef4444;text-align:center;padding:1rem;font-weight:700;">PayPal is unavailable right now.</p>';
    return;
  }

  paypalButtonInstance = paypal.Buttons({
    style: { layout: 'vertical', color: 'gold', shape: 'rect', label: 'paypal' },
    onClick: function(data, actions) {
      if (!validateEmailField() || !validateOrderFields()) return actions.reject();
      return actions.resolve();
    },
    createOrder: function(data, actions) {
      const total = (currentPackage.price * orderQuantity).toFixed(2);
      const email = document.getElementById('order-email').value.trim();
      const company = document.getElementById('order-company').value.trim();
      const market = document.getElementById('order-market').value.trim();
      const goal = document.getElementById('order-goal').value.trim();
      return actions.order.create({
        purchase_units: [{
          description: `${currentPackage.id} | ${company} | ${market} | ${goal} | ${email} | Qty:${orderQuantity}`,
          amount: { currency_code: 'USD', value: total }
        }]
      });
    },
    onApprove: function(data, actions) {
      return actions.order.capture().then(details => finalizeOrder(details, false));
    },
    onError: function(err) {
      console.error('PayPal Checkout error:', err);
      alert('An error occurred during payment processing.');
    }
  });

  paypalButtonInstance.render('#paypal-button-container');
}

function buildReceiptText(order) {
  const dict = getDict();
  return [
    '===================================',
    'CHINABOOST RECEIPT',
    '===================================',
    `${dict['th-date']}: ${order.date}`,
    `${dict['th-id']}: ${order.id}`,
    `${dict['modal-email']}: ${order.email}`,
    `${dict['modal-company']}: ${order.company}`,
    `${dict['th-market']}: ${order.market}`,
    `${dict['modal-goal']}: ${order.goal}`,
    `${dict['th-package']}: ${order.package}`,
    `${dict['th-qty']}: ${order.quantity}`,
    `${dict['th-total']}: ${order.total}`,
    `Status: ${order.status}`,
    `Method: PayPal Secure Checkout`
  ].join('\n');
}

function redirectToGoogleForm(receiptText) {
  window.location.href = `${GOOGLE_FORM_URL}${encodeURIComponent(receiptText)}`;
}

function saveLocalOrder(details, isTest = false) {
  const orderLogs = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  const order = {
    date: new Date().toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
    id: details.id,
    email: document.getElementById('order-email').value.trim(),
    company: document.getElementById('order-company').value.trim(),
    market: document.getElementById('order-market').value.trim(),
    goal: document.getElementById('order-goal').value.trim(),
    package: activeLang === 'ko' ? currentPackage.name_ko : currentPackage.name_en,
    quantity: orderQuantity,
    total: formatPrice(currentPackage.price * orderQuantity),
    status: isTest ? 'secure checkout Test' : 'Paid'
  };
  orderLogs.unshift(order);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orderLogs));
  renderOrders();
  return order;
}

function finalizeOrder(details, isTest = false) {
  const order = saveLocalOrder(details, isTest);
  closeModal();
  redirectToGoogleForm(buildReceiptText(order));
}

function renderOrders() {
  const tbody = document.getElementById('orders-tbody');
  const empty = document.getElementById('no-orders-msg');
  if (!tbody) return;
  const orders = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  if (!orders.length) {
    tbody.innerHTML = '';
    if (empty) empty.style.display = 'block';
    return;
  }
  if (empty) empty.style.display = 'none';
  tbody.innerHTML = orders.map(order => `
    <tr>
      <td>${order.date}</td>
      <td class="tx-id">${order.id}</td>
      <td>${order.package}</td>
      <td>${order.market || '-'}</td>
      <td>${order.quantity}</td>
      <td>${order.total}</td>
      <td><span class="status-pill">${order.status}</span></td>
    </tr>
  `).join('');
}

function toggleMobileMenu() {
  document.getElementById('mobile-drawer').classList.toggle('active');
}

function navigate(section) {
  document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
  const target = document.getElementById(`${section}-view`);
  if (target) target.classList.add('active');
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  const nav = document.querySelector(`[data-nav="${section}"]`);
  if (nav) nav.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function changeLanguage(lang) {
  applyTranslations(lang);
}

document.addEventListener('DOMContentLoaded', () => {
  applyTranslations(activeLang);
  renderPackages();
  renderOrders();
  document.getElementById('language-selector').value = activeLang;
});

// Expose variables globally to prevent ReferenceErrors in inline HTML scripts/handlers
if (typeof navigate !== 'undefined') { window.navigate = navigate; }
if (typeof currentLang !== 'undefined') { window.currentLang = currentLang; }

window.openPurchaseModal = openPurchaseModal;
window.closeModal = closeModal;
window.adjustQty = adjustQty;
window.changeLanguage = changeLanguage;
