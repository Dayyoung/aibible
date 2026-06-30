// AICASH app state
const STORAGE_KEY = 'aicash_orders';
const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScMPqbEWWttS5mb1m_krsO_kco24ImpgvYVSbc7zO0nEVmYFw/viewform?entry.1059822061=';
const isKrPage = window.location.pathname.includes('/kr/');
if (isKrPage && localStorage.getItem('bibleforai_lang') !== 'ko') {
  localStorage.setItem('bibleforai_lang', 'ko');
}
let currentLang = localStorage.getItem('bibleforai_lang') || (isKrPage ? 'ko' : 'en');
let currentPackage = null;
let orderQuantity = 1;

const packageCatalog = {
  basic: {
    title_en: 'Starter Playbook',
    title_ko: '스타터 플레이북',
    packages: [{
      id: 'starter',
      name_en: 'Starter',
      name_ko: '스타터',
      desc_en: 'Launch one AI content niche on one international platform with positioning, content map, and a 30-day plan.',
      desc_ko: '하나의 AI 콘텐츠 니치를 하나의 글로벌 플랫폼에 런칭하기 위한 포지셔닝, 콘텐츠 맵, 30일 실행 플랜입니다.',
      price: 140,
      featured: false,
      features_en: ['Niche audit', 'Platform selection', 'Prompt stack', 'Launch checklist'],
      features_ko: ['니치 진단', '플랫폼 선정', '프롬프트 스택', '런칭 체크리스트']
    }]
  },
  growth: {
    title_en: 'Growth Accelerator',
    title_ko: '그로스 액셀러레이터',
    packages: [{
      id: 'growth',
      name_en: 'Growth',
      name_ko: '그로스',
      desc_en: 'Build a multi-platform monetization system for Medium, Substack, Ghost, and LinkedIn.',
      desc_ko: 'Medium, Substack, Ghost, LinkedIn을 활용한 멀티 플랫폼 수익화 시스템을 구축합니다.',
      price: 240,
      featured: true,
      features_en: ['Platform stack', 'Monetization funnel', 'SEO content map', '2 revisions'],
      features_ko: ['플랫폼 스택', '수익화 퍼널', 'SEO 콘텐츠 맵', '수정 2회']
    }]
  },
  scale: {
    title_en: 'Scale Partner',
    title_ko: '스케일 파트너',
    packages: [{
      id: 'scale',
      name_en: 'Scale',
      name_ko: '스케일',
      desc_en: 'Automation, distribution, and revenue ops for teams turning AI content into recurring income.',
      desc_ko: 'AI 콘텐츠를 반복 매출로 전환하는 팀을 위한 자동화, 배포, 매출 운영 패키지입니다.',
      price: 390,
      featured: false,
      features_en: ['AI workflow', 'Distribution system', 'Revenue dashboard', '3 revisions'],
      features_ko: ['AI 워크플로우', '배포 시스템', '매출 대시보드', '수정 3회']
    }]
  }
};

const translations = {
  en: {
    'logo-subtitle': 'AICASH',
    'nav-home': 'Home',
    'nav-basic': 'Starter',
    'nav-pro': 'Growth',
    'nav-enterprise': 'Scale',
    'btn-orders': 'My Orders',
    'hero-badge': 'Global AI Creator Monetization',
    'hero-title': 'AICASH — Global AI Content Monetization',
    'hero-desc': 'Based on a professional guide, this service helps you turn AI content into international recurring revenue.',
    'btn-explore': 'View Packages',
    'btn-how': 'How It Works',
    'stat-1': 'Packages',
    'stat-2': 'Platforms',
    'stat-3': 'Monetization Paths',
    'stat-4': 'Fast Delivery',
    'sec-packages-title': 'Choose Your Monetization Package',
    'sec-packages-subtitle': 'Pick a package, click the price to open the checkout flow, and review the receipt on Google Form.',
    'card-basic-title': 'Starter Playbook',
    'card-basic-desc': 'Launch one AI content niche on one platform with positioning, content map, and a 30-day plan.',
    'card-growth-title': 'Growth Accelerator',
    'card-growth-desc': 'Build a multi-platform monetization system for Medium, Substack, Ghost, and LinkedIn.',
    'card-scale-title': 'Scale Partner',
    'card-scale-desc': 'Automation, distribution, and revenue ops for teams turning AI content into recurring income.',
    'card-view-pricing': 'View Pricing',
    'how-title': 'How AICASH Works',
    'how-desc': 'We keep the flow simple: choose a package, review the brief, pay securely, and complete the receipt form.',
    'how-step1-bold': '1. Brief:',
    'how-step1-text': 'Tell us your niche, audience, and target platform.',
    'how-step2-bold': '2. Build:',
    'how-step2-text': 'We design the content system, monetization path, and distribution workflow.',
    'how-step3-bold': '3. Checkout:',
    'how-step3-text': 'Click the total price in the modal to trigger the payment checkout flow.',
    'how-step4-bold': '4. Receipt:',
    'how-step4-text': 'You are redirected to Google Form with encoded receipt details.',
    'faq-title': 'Frequently Asked Questions',
    'faq-subtitle': 'Quick answers about pricing, delivery, and checkout.',
    'faq-q1': 'Is this only for creators?',
    'faq-a1': 'No. It also works for founders, agencies, coaches, and teams that want to sell AI content internationally.',
    'faq-q2': 'What happens when I click the total price?',
    'faq-a2': 'Clicking the total price saves a local order, then opens the Google Form receipt flow.',
    'faq-q3': 'What inputs do you need?',
    'faq-a3': 'Your niche, target audience, platform, and any website or channel URL.',
    'faq-q4': 'Can you support multiple platforms?',
    'faq-a4': 'Yes. The Growth and Scale tiers are designed for multi-platform monetization and rollout planning.',
    'orders-title': 'My Orders',
    'orders-subtitle': 'your orders are stored locally in your browser.',
    'th-date': 'Date',
    'th-order-id': 'Transaction ID',
    'th-product': 'Product',
    'th-tier': 'Tier',
    'th-email': 'Email',
    'th-qty': 'Qty',
    'th-total': 'Total',
    'th-status': 'Status',
    'no-orders-msg': 'No purchase records found yet.',
    'modal-title': 'Configure Your Content System',
    'modal-desc': 'Fill in the details, then click the total price for checkout.',
    'modal-base-pkg': 'Package',
    'modal-base-price-label': 'Base Price',
    'modal-email-label': 'Email Address *',
    'modal-email-placeholder': 'name@example.com',
    'modal-email-error': 'Please enter a valid email address.',
    'modal-audience-label': 'Target Niche / Audience',
    'modal-audience-placeholder': 'e.g. AI education, solo founders, SaaS marketers',
    'modal-platform-label': 'Primary Platform',
    'modal-platform-placeholder': 'e.g. Medium, Substack, LinkedIn',
    'modal-site-label': 'Website / Channel URL',
    'modal-site-placeholder': 'https://example.com',
    'modal-qty': 'Quantity',
    'modal-total-amt': 'Total Amount',
    'badge-ssl': 'SSL Secured Checkout',
    'badge-paypal': 'PayPal Verified',
    'footer-link': 'AICASH Home',
    'receipt-header': 'AICASH RECEIPT',
    'receipt-date': 'Order Date',
    'receipt-txid': 'Transaction ID',
    'receipt-email': 'Customer Email',
    'receipt-type': 'Product Type',
    'receipt-size': 'Package Size',
    'receipt-audience': 'Target Niche',
    'receipt-platform': 'Primary Platform',
    'receipt-website': 'Website / Channel URL',
    'receipt-qty': 'Quantity',
    'receipt-baseprice': 'Base Price',
    'receipt-total': 'Total Paid',
    'receipt-status': 'Status',
    'receipt-method': 'Payment Method',
    'receipt-method-val': 'PayPal Secure Checkout'
  },
  ko: {
    'logo-subtitle': 'AICASH',
    'nav-home': '홈',
    'nav-basic': '스타터',
    'nav-pro': '그로스',
    'nav-enterprise': '스케일',
    'btn-orders': '주문 내역',
    'hero-badge': '글로벌 AI 크리에이터 수익화',
    'hero-title': 'AICASH — 글로벌 AI 콘텐츠 수익화',
    'hero-desc': '전문 가이드를 바탕으로, AI 콘텐츠를 해외 반복 매출로 전환하는 서비스를 제공합니다.',
    'btn-explore': '패키지 보기',
    'btn-how': '진행 방식',
    'stat-1': '패키지',
    'stat-2': '플랫폼',
    'stat-3': '수익화 경로',
    'stat-4': '빠른 작업',
    'sec-packages-title': '수익화 패키지를 선택하세요',
    'sec-packages-subtitle': '패키지를 고르고, 가격을 클릭해 체크아웃 흐름을 열고, Google Form 영수증을 확인하세요.',
    'card-basic-title': '스타터 플레이북',
    'card-basic-desc': '하나의 플랫폼에 AI 콘텐츠 니치를 런칭하기 위한 포지셔닝, 콘텐츠 맵, 30일 플랜입니다.',
    'card-growth-title': '그로스 액셀러레이터',
    'card-growth-desc': 'Medium, Substack, Ghost, LinkedIn을 활용한 멀티 플랫폼 수익화 시스템을 구축합니다.',
    'card-scale-title': '스케일 파트너',
    'card-scale-desc': 'AI 콘텐츠를 반복 매출로 전환하는 팀을 위한 자동화, 배포, 매출 운영 패키지입니다.',
    'card-view-pricing': '가격 보기',
    'how-title': 'AICASH 진행 방식',
    'how-desc': '패키지 선택 → 브리프 확인 → 안전 결제 → 영수증 폼 작성의 간단한 흐름으로 진행됩니다.',
    'how-step1-bold': '1. 브리프:',
    'how-step1-text': '니치, 타깃 고객, 목표 플랫폼을 알려주세요.',
    'how-step2-bold': '2. 설계:',
    'how-step2-text': '콘텐츠 시스템, 수익화 경로, 배포 워크플로우를 설계합니다.',
    'how-step3-bold': '3. 결제:',
    'how-step3-text': '모달의 총액을 클릭하면 페이팔 구매를 완료합니다.',
    'how-step4-bold': '4. 영수증:',
    'how-step4-text': '암호화된 영수증 정보와 함께 Google Form으로 이동합니다.',
    'faq-title': '자주 묻는 질문',
    'faq-subtitle': '가격, 작업, 결제 흐름에 대한 간단한 안내입니다.',
    'faq-q1': '이 서비스는 크리에이터만 대상인가요?',
    'faq-a1': '아니요. 해외에서 AI 콘텐츠를 판매하고 싶은 창업자, 에이전시, 코치, 팀에도 적합합니다.',
    'faq-q2': '총액을 클릭하면 어떻게 되나요?',
    'faq-a2': '총액을 클릭하면 로컬 주문이 저장된 뒤 Google Form 영수증 흐름이 열립니다.',
    'faq-q3': '어떤 입력이 필요한가요?',
    'faq-a3': '니치, 타깃 고객, 플랫폼, 그리고 웹사이트 또는 채널 URL이 필요합니다.',
    'faq-q4': '여러 플랫폼도 지원하나요?',
    'faq-a4': '네. 그로스와 스케일 티어는 다중 플랫폼 수익화와 롤아웃 플랜에 맞춰져 있습니다.',
    'orders-title': '주문 내역',
    'orders-subtitle': '주문 내역은 브라우저에 로컬 저장됩니다.',
    'th-date': '날짜',
    'th-order-id': '거래 ID',
    'th-product': '상품',
    'th-tier': '티어',
    'th-email': '이메일',
    'th-qty': '수량',
    'th-total': '합계',
    'th-status': '상태',
    'no-orders-msg': '아직 구매 기록이 없습니다.',
    'modal-title': '콘텐츠 시스템 설정',
    'modal-desc': '세부 정보를 입력한 뒤 총액을 클릭해 결제를 진행하세요.',
    'modal-base-pkg': '패키지',
    'modal-base-price-label': '기본 가격',
    'modal-email-label': '이메일 주소 *',
    'modal-email-placeholder': 'name@example.com',
    'modal-email-error': '유효한 이메일 주소를 입력해주세요.',
    'modal-audience-label': '타깃 니치 / 고객층',
    'modal-audience-placeholder': '예: AI 교육, 1인 창업가, SaaS 마케터',
    'modal-platform-label': '주요 플랫폼',
    'modal-platform-placeholder': '예: Medium, Substack, LinkedIn',
    'modal-site-label': '웹사이트 / 채널 URL',
    'modal-site-placeholder': 'https://example.com',
    'modal-qty': '수량',
    'modal-total-amt': '총액',
    'badge-ssl': 'SSL 보안 결제 지원',
    'badge-paypal': 'PayPal 인증됨',
    'footer-link': 'AICASH 홈',
    'receipt-header': 'AICASH 영수증',
    'receipt-date': '주문 날짜',
    'receipt-txid': '거래 ID',
    'receipt-email': '고객 이메일',
    'receipt-type': '상품 종류',
    'receipt-size': '패키지 등급',
    'receipt-audience': '타깃 니치',
    'receipt-platform': '주요 플랫폼',
    'receipt-website': '웹사이트 / 채널 URL',
    'receipt-qty': '수량',
    'receipt-baseprice': '기본 가격',
    'receipt-total': '총 결제금액',
    'receipt-status': '상태',
    'receipt-method': '결제 방식',
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

function navigate(viewId) {
  document.querySelectorAll('.view-section').forEach(section => section.classList.remove('active'));
  const target = document.getElementById(`${viewId}-view`);
  if (target) target.classList.add('active');
  document.querySelectorAll('.nav-links a').forEach(link => link.classList.remove('active'));
  const active = document.getElementById(`nav-${viewId}`);
  if (active) active.classList.add('active');
  const drawer = document.getElementById('mobile-drawer');
  if (drawer) drawer.classList.remove('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleMobileMenu() {
  const drawer = document.getElementById('mobile-drawer');
  if (drawer) drawer.classList.toggle('active');
}

function changeLanguage(lang) {
  localStorage.setItem('bibleforai_lang', lang);
  if (lang === 'ko' && !isKrPage) {
    window.location.href = '/aicash/kr/';
  } else if (lang === 'en' && isKrPage) {
    window.location.href = '/aicash/';
  }
}

function applyTranslations() {
  const dict = translations[currentLang] || translations.en;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const value = dict[key];
    if (value !== undefined) el.innerHTML = value;
  });
  const selector = document.getElementById('language-selector');
  if (selector) selector.value = currentLang;
  const footerLink = document.getElementById('footer-aicash-link');
  if (footerLink) footerLink.textContent = dict['footer-link'];
}

function renderPackages() {
  const dict = translations[currentLang] || translations.en;
  Object.entries(packageCatalog).forEach(([categoryKey, category]) => {
    const container = document.getElementById(`${categoryKey}-packages`);
    if (!container) return;
    container.innerHTML = category.packages.map(pkg => {
      const title = currentLang === 'ko' ? pkg.name_ko : pkg.name_en;
      const desc = currentLang === 'ko' ? pkg.desc_ko : pkg.desc_en;
      const features = currentLang === 'ko' ? pkg.features_ko : pkg.features_en;
      return `
        <div class="package-card ${pkg.featured ? 'featured' : ''}">
          <div class="package-header">
            <div class="card-icon ${categoryKey}"><i class="${getCategoryIcon(categoryKey)}"></i></div>
            <h3>${title}</h3>
            <p class="package-desc">${desc}</p>
          </div>
          <div class="price-row">
            <button class="price-chip" type="button" onclick="openPurchaseModal('${categoryKey}', '${pkg.id}')">${formatPrice(pkg.price)}</button>
            <span class="price-note">${currentLang === 'ko' ? '가격을 클릭해 결제' : 'Click price to checkout'}</span>
          </div>
          <ul class="package-features">${features.map(feat => `<li><i class="fa-solid fa-circle-check"></i> ${feat}</li>`).join('')}</ul>
          <button class="btn-buy" type="button" onclick="openPurchaseModal('${categoryKey}', '${pkg.id}')"><i class="fa-solid fa-cart-shopping"></i> ${dict['card-view-pricing']}</button>
        </div>`;
    }).join('');
  });
}

function getCategoryIcon(category) {
  switch (category) {
    case 'basic': return 'fa-solid fa-pen-nib';
    case 'growth': return 'fa-solid fa-wand-magic-sparkles';
    case 'scale': return 'fa-solid fa-chart-line';
    default: return 'fa-solid fa-bullhorn';
  }
}

function openPurchaseModal(categoryKey, packageId) {
  const category = packageCatalog[categoryKey];
  const pkg = category?.packages.find(item => item.id === packageId);
  if (!pkg) return;
  currentPackage = { categoryKey, packageId, basePrice: pkg.price };
  orderQuantity = 1;

  const isKo = currentLang === 'ko';
  document.getElementById('modal-product-title').textContent = isKo ? category.title_ko : category.title_en;
  document.getElementById('modal-product-desc').textContent = isKo ? pkg.desc_ko : pkg.desc_en;
  document.getElementById('modal-package-name').textContent = isKo ? pkg.name_ko : pkg.name_en;
  document.getElementById('modal-base-price').textContent = formatPrice(pkg.price);
  document.getElementById('order-quantity').value = '1';
  const emailInput = document.getElementById('order-email');
  if (emailInput) emailInput.value = '';
  ['order-audience', 'order-platform', 'order-website'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  const emailError = document.getElementById('email-error');
  if (emailError) emailError.style.display = 'none';
  document.getElementById('purchase-modal').classList.add('active');
  updateModalPrice();
  initPayPalButtons();
  setTimeout(() => {
    const modalCard = document.querySelector('.modal-card');
    const totalBox = document.querySelector('.total-price-box');
    if (modalCard && totalBox) modalCard.scrollTop = Math.max(0, totalBox.offsetTop - 10);
  }, 550);
}

function closeModal() {
  const modal = document.getElementById('purchase-modal');
  if (modal) modal.classList.remove('active');
  const container = document.getElementById('paypal-button-container');
  if (container) container.innerHTML = '';
}

function updateModalPrice() {
  const qtyInput = document.getElementById('order-quantity');
  orderQuantity = Math.max(1, parseInt(qtyInput?.value || '1', 10) || 1);
  if (qtyInput) qtyInput.value = String(orderQuantity);
  const total = currentPackage ? currentPackage.basePrice * orderQuantity : 0;
  const totalEl = document.getElementById('modal-total-price');
  if (totalEl) totalEl.textContent = formatPrice(total);
  
  // Sync the currency label in modal (USD -> KRW for Korean)
  const currencyLabel = document.querySelector('.total-price-box span:first-child');
  if (currencyLabel) {
    currencyLabel.textContent = currentLang === 'ko' ? 'KRW' : 'USD';
  }
}

function validateEmailField() {
  const emailInput = document.getElementById('order-email');
  const emailError = document.getElementById('email-error');
  const value = (emailInput?.value || '').trim();
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  if (!ok) {
    if (emailInput) emailInput.style.borderColor = '#ef4444';
    if (emailError) emailError.style.display = 'block';
    return false;
  }
  if (emailInput) emailInput.style.borderColor = 'var(--border)';
  if (emailError) emailError.style.display = 'none';
  return true;
}

function buildReceipt(details, status) {
  const dict = translations[currentLang] || translations.en;
  const values = {
    date: new Date().toLocaleString(currentLang === 'ko' ? 'ko-KR' : 'en-US', {
      year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
    }),
    id: details.id,
    email: document.getElementById('order-email')?.value.trim() || details.email || 'secure checkout@test.dev',
    audience: document.getElementById('order-audience')?.value.trim() || '-',
    platform: document.getElementById('order-platform')?.value.trim() || '-',
    website: document.getElementById('order-website')?.value.trim() || '-',
    qty: orderQuantity,
    basePrice: currentPackage?.basePrice || 0,
    totalPaid: formatPrice((currentPackage?.basePrice || 0) * orderQuantity),
    status
  };
  return [
    '===================================',
    `          ${dict['receipt-header']}`,
    '===================================',
    `${dict['receipt-date'].padEnd(15)} : ${values.date}`,
    `${dict['receipt-txid'].padEnd(15)} : ${values.id}`,
    `${dict['receipt-email'].padEnd(15)} : ${values.email}`,
    `${dict['receipt-type'].padEnd(15)} : AICASH - ${currentPackage?.packageId || '-'}`,
    `${dict['receipt-size'].padEnd(15)} : ${currentPackage?.categoryKey || '-'}`,
    `${dict['receipt-audience'].padEnd(15)} : ${values.audience}`,
    `${dict['receipt-platform'].padEnd(15)} : ${values.platform}`,
    `${dict['receipt-website'].padEnd(15)} : ${values.website}`,
    `${dict['receipt-qty'].padEnd(15)} : ${values.qty}`,
    `${dict['receipt-baseprice'].padEnd(15)} : ${formatPrice(values.basePrice)}`,
    `${dict['receipt-total'].padEnd(15)} : ${values.totalPaid}`,
    `${dict['receipt-status'].padEnd(15)} : ${values.status}`,
    '-----------------------------------',
    `${dict['receipt-method'].padEnd(15)} : ${dict['receipt-method-val']}`,
    '===================================' 
  ].join('\n');
}

function saveOrder(details, status) {
  const orderLogs = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  const order = {
    date: new Date().toLocaleDateString(currentLang === 'ko' ? 'ko-KR' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    id: details.id,
    email: document.getElementById('order-email')?.value.trim() || details.email || 'secure checkout@test.dev',
    category: currentPackage?.categoryKey || '-',
    package: currentPackage?.packageId || '-',
    quantity: orderQuantity,
    totalPaid: formatPrice((currentPackage?.basePrice || 0) * orderQuantity),
    status
  };
  orderLogs.unshift(order);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orderLogs));
  renderOrders();
}

function triggerTestCheckout() {
  const emailInput = document.getElementById('order-email');
  if (emailInput && !emailInput.value.trim()) {
    emailInput.value = 'secure checkout@test.dev';
    emailInput.style.borderColor = 'var(--border)';
  }
  if (!validateEmailField()) return;
  const txId = `TEST-${Math.random().toString(36).slice(2, 10).toUpperCase()}`;
  const details = { id: txId, email: document.getElementById('order-email')?.value.trim() || 'secure checkout@test.dev' };
  saveOrder(details, 'Paid (secure checkout)');
  const receipt = buildReceipt(details, 'Paid (secure checkout)');
  closeModal();
  window.location.href = GOOGLE_FORM_URL + encodeURIComponent(receipt);
}

function initPayPalButtons() {
  const container = document.getElementById('paypal-button-container');
  if (!container || typeof paypal === 'undefined' || !paypal.Buttons) return;
  container.innerHTML = '';
  try {
    paypal.Buttons({
      style: { layout: 'vertical', color: 'gold', shape: 'rect', label: 'paypal' },
      onClick: (data, actions) => validateEmailField() ? actions.resolve() : actions.reject(),
      createOrder: (data, actions) => actions.order.create({
        purchase_units: [{
          description: `AICASH - ${currentPackage?.categoryKey || ''} / ${currentPackage?.packageId || ''}`,
          amount: { currency_code: 'USD', value: Number((currentPackage.basePrice * orderQuantity).toFixed(2)) }
        }]
      }),
      onApprove: async (data, actions) => {
        await actions.order.capture();
        const details = { id: `PP-${(data.orderID || Math.random().toString(36).slice(2, 10)).toUpperCase()}` };
        saveOrder(details, 'Paid (PayPal)');
        const receipt = buildReceipt(details, 'Paid (PayPal)');
        closeModal();
        window.location.href = GOOGLE_FORM_URL + encodeURIComponent(receipt);
      },
      onError: err => {
        console.error('PayPal Checkout error:', err);
        alert(currentLang === 'ko' ? '결제 처리 중 오류가 발생했습니다. 다시 시도해주세요.' : 'An error occurred during payment processing. Please try again.');
      }
    }).render('#paypal-button-container');
  } catch (err) {
    console.warn('PayPal render failed', err);
  }
}

function handlePurchaseSubmit(event) {
  if (event) event.preventDefault();
  triggerTestCheckout();
}

function renderOrders() {
  const tbody = document.getElementById('orders-tbody');
  if (!tbody) return;
  const orders = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  if (!orders.length) {
    tbody.innerHTML = `<tr><td colspan="8" data-i18n="no-orders-msg">${translations[currentLang]['no-orders-msg']}</td></tr>`;
    return;
  }
  tbody.innerHTML = orders.map(order => `
    <tr>
      <td>${order.date}</td>
      <td><code>${order.id}</code></td>
      <td>AICASH - ${order.package}</td>
      <td>${order.category}</td>
      <td>${order.email}</td>
      <td>${order.quantity}</td>
      <td><strong>${order.totalPaid}</strong></td>
      <td><span class="status-badge active">${order.status}</span></td>
    </tr>`).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  const selector = document.getElementById('language-selector');
  if (selector) selector.value = currentLang;
  applyTranslations();
  renderPackages();
  renderOrders();

  const qtyInput = document.getElementById('order-quantity');
  if (qtyInput) {
    qtyInput.addEventListener('input', updateModalPrice);
    qtyInput.addEventListener('change', updateModalPrice);
  }
  const totalEl = document.getElementById('modal-total-price');
  if (totalEl) {
    totalEl.setAttribute('role', 'button');
    totalEl.setAttribute('tabindex', '0');
    totalEl.addEventListener('click', triggerTestCheckout);
    totalEl.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        triggerTestCheckout();
      }
    });
  }
  const form = document.getElementById('purchase-form');
  if (form) form.addEventListener('submit', handlePurchaseSubmit);
  if (isKrPage) localStorage.setItem('bibleforai_lang', 'ko');
  else if (!localStorage.getItem('bibleforai_lang')) localStorage.setItem('bibleforai_lang', 'en');
  currentLang = localStorage.getItem('bibleforai_lang') || 'en';
  applyTranslations();
});

window.navigate = navigate;
window.toggleMobileMenu = toggleMobileMenu;
window.changeLanguage = changeLanguage;
window.openPurchaseModal = openPurchaseModal;
window.closeModal = closeModal;
window.updateModalPrice = updateModalPrice;
window.handlePurchaseSubmit = handlePurchaseSubmit;
window.triggerTestCheckout = triggerTestCheckout;
