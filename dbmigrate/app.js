// DBMIGRATE app state
const STORAGE_KEY = 'dbmigrate_orders';
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
    'logo-subtitle': 'DBMIGRATE',
    'nav-home': 'Home',
    'nav-basic': 'Audit',
    'nav-pro': 'Migration',
    'nav-enterprise': 'Enterprise',
    'btn-orders': 'My Orders',
    'hero-badge': 'Global Database Migration',
    'hero-title': 'DBMIGRATE — Database Migration & Transfer',
    'hero-desc': 'Based on a Professional listing priced at ₩110,000, this service helps teams move databases safely with rollback planning and verification.',
    'btn-explore': 'View Packages',
    'btn-how': 'How It Works',
    'stat-1': 'Database Types',
    'stat-2': 'Migration Steps',
    'stat-3': 'Rollback Plan',
    'stat-4': 'Secure Handoff',
    'sec-packages-title': 'Choose Your Migration Package',
    'sec-packages-subtitle': 'Pick a package, click the price to open the checkout flow, and review the receipt on Google Form.',
    'card-basic-title': 'Assessment Package',
    'card-basic-desc': 'Review source and target databases, risks, schema gaps, and rollback planning before you move.',
    'card-growth-title': 'Migration Package',
    'card-growth-desc': 'Move your database with field mapping, data validation, and post-move verification.',
    'card-scale-title': 'Enterprise Rollout',
    'card-scale-desc': 'Complex multi-database cutovers for teams that need high-availability planning and coordination.',
    'card-view-pricing': 'View Pricing',
    'how-title': 'How DBMIGRATE Works',
    'how-desc': 'We keep the flow simple: assess the source, rehearse the move, cut over safely, and finish with a receipt.',
    'how-step1-bold': '1. Audit:',
    'how-step1-text': 'Share the source and target database details, version, and data volume.',
    'how-step2-bold': '2. Prepare:',
    'how-step2-text': 'We map fields, identify risks, and prepare a rollback plan.',
    'how-step3-bold': '3. Checkout:',
    'how-step3-text': 'Click the total price in the modal to trigger the payment checkout flow.',
    'how-step4-bold': '4. Receipt:',
    'how-step4-text': 'You are redirected to Google Form with encoded receipt details.',
    'faq-title': 'Frequently Asked Questions',
    'faq-subtitle': 'Quick answers about pricing, delivery, and checkout.',
    'faq-q1': 'Is this only for one database engine?',
    'faq-a1': 'No. It works for PostgreSQL, MySQL, SQL Server, Oracle, and many mixed-stack migrations.',
    'faq-q2': 'What happens when I click the total price?',
    'faq-a2': 'Clicking the total price saves a local order, then opens the Google Form receipt flow.',
    'faq-q3': 'What inputs do you need?',
    'faq-a3': 'Source database, target database, approximate data size, and your desired downtime window.',
    'faq-q4': 'Can you handle high-availability cutovers?',
    'faq-a4': 'Yes. The Enterprise tier is built for coordinated, low-risk production cutovers.',
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
    'modal-title': 'Configure Migration',
    'modal-desc': 'Fill in the details, then click the total price for checkout.',
    'modal-base-pkg': 'Package',
    'modal-base-price-label': 'Base Price',
    'modal-email-label': 'Email Address *',
    'modal-email-placeholder': 'name@example.com',
    'modal-email-error': 'Please enter a valid email address.',
    'modal-source-label': 'Source Database *',
    'modal-source-placeholder': 'e.g. PostgreSQL 12 on AWS RDS',
    'modal-target-label': 'Target Database *',
    'modal-target-placeholder': 'e.g. MySQL 8 on Cloud SQL',
    'modal-size-label': 'Data Volume / Downtime Window',
    'modal-size-placeholder': 'e.g. 2.4M rows / 18 GB / 4-hour window',
    'modal-qty': 'Quantity',
    'modal-total-amt': 'Total Amount',
    'badge-ssl': 'SSL Secured Checkout',
    'badge-paypal': 'PayPal Verified',
    'footer-link': 'DBMIGRATE Home',
    'receipt-header': 'DBMIGRATE RECEIPT',
    'receipt-date': 'Order Date',
    'receipt-txid': 'Transaction ID',
    'receipt-email': 'Customer Email',
    'receipt-type': 'Product Type',
    'receipt-size': 'Package Size',
    'receipt-source': 'Source Database',
    'receipt-target': 'Target Database',
    'receipt-data': 'Data Volume',
    'receipt-qty': 'Quantity',
    'receipt-baseprice': 'Base Price',
    'receipt-total': 'Total Paid',
    'receipt-status': 'Status',
    'receipt-method': 'Payment Method',
    'receipt-method-val': 'PayPal Secure Checkout'
  },
  ko: {
    'logo-subtitle': 'DBMIGRATE',
    'nav-home': '홈',
    'nav-basic': '진단',
    'nav-pro': '마이그레이션',
    'nav-enterprise': '엔터프라이즈',
    'btn-orders': '주문 내역',
    'hero-badge': '글로벌 DB 마이그레이션',
    'hero-title': 'DBMIGRATE — 데이터베이스 이전 & 전환',
    'hero-desc': '체계적인 가이드를 바탕으로, 롤백 계획과 검증을 포함한 안전한 DB 이전을 지원합니다.',
    'btn-explore': '패키지 보기',
    'btn-how': '진행 방식',
    'stat-1': 'DB 유형',
    'stat-2': '이전 단계',
    'stat-3': '롤백 계획',
    'stat-4': '안전 인계',
    'sec-packages-title': '이전 패키지를 선택하세요',
    'sec-packages-subtitle': '패키지를 고르고, 가격을 클릭해 체크아웃 흐름을 열고, Google Form 영수증을 확인하세요.',
    'card-basic-title': '진단 패키지',
    'card-basic-desc': '이전 전 소스/타깃 DB, 위험 요소, 스키마 차이, 롤백 계획을 점검합니다.',
    'card-growth-title': '마이그레이션 패키지',
    'card-growth-desc': '필드 매핑, 데이터 검증, 이전 후 검수까지 포함한 DB 이전 서비스입니다.',
    'card-scale-title': '엔터프라이즈 롤아웃',
    'card-scale-desc': '고가용성 계획과 조율이 필요한 복수 DB 대규모 전환용 패키지입니다.',
    'card-view-pricing': '가격 보기',
    'how-title': 'DBMIGRATE 진행 방식',
    'how-desc': '소스 진단 → 이전 리허설 → 안전 전환 → 영수증 작성의 간단한 흐름으로 진행됩니다.',
    'how-step1-bold': '1. 진단:',
    'how-step1-text': '소스와 타깃 DB 정보, 버전, 데이터 규모를 알려주세요.',
    'how-step2-bold': '2. 준비:',
    'how-step2-text': '필드를 매핑하고 위험 요소와 롤백 계획을 준비합니다.',
    'how-step3-bold': '3. 결제:',
    'how-step3-text': '모달의 총액을 클릭하면 페이팔 구매를 완료합니다.',
    'how-step4-bold': '4. 영수증:',
    'how-step4-text': '암호화된 영수증 정보와 함께 Google Form으로 이동합니다.',
    'faq-title': '자주 묻는 질문',
    'faq-subtitle': '가격, 작업, 결제 흐름에 대한 간단한 안내입니다.',
    'faq-q1': '한 종류의 DB 엔진만 지원하나요?',
    'faq-a1': '아니요. PostgreSQL, MySQL, SQL Server, Oracle 등 다양한 혼합 환경을 지원합니다.',
    'faq-q2': '총액을 클릭하면 어떻게 되나요?',
    'faq-a2': '총액을 클릭하면 로컬 주문이 저장된 뒤 Google Form 영수증 흐름이 열립니다.',
    'faq-q3': '어떤 입력이 필요한가요?',
    'faq-a3': '소스 DB, 타깃 DB, 대략적인 데이터 규모, 원하는 다운타임 창이 필요합니다.',
    'faq-q4': '고가용성 전환도 가능한가요?',
    'faq-a4': '네. 엔터프라이즈 티어는 운영 중단을 최소화하는 전환을 위해 설계되었습니다.',
    'orders-title': '내 주문 내역',
    'orders-subtitle': '주문 내역은 브라우저에 로컬 저장됩니다.',
    'th-date': '날짜',
    'th-order-id': '트랜잭션 ID',
    'th-product': '상품',
    'th-tier': '티어',
    'th-email': '이메일',
    'th-qty': '수량',
    'th-total': '합계',
    'th-status': '상태',
    'no-orders-msg': '아직 구매 기록이 없습니다.',
    'modal-title': '마이그레이션 설정',
    'modal-desc': '세부 정보를 입력한 뒤 총액을 클릭해 결제를 진행하세요.',
    'modal-base-pkg': '패키지',
    'modal-base-price-label': '기본 가격',
    'modal-email-label': '이메일 주소 *',
    'modal-email-placeholder': 'name@example.com',
    'modal-email-error': '올바른 이메일 주소를 입력해주세요.',
    'modal-source-label': '소스 DB *',
    'modal-source-placeholder': '예: AWS RDS의 PostgreSQL 12',
    'modal-target-label': '타깃 DB *',
    'modal-target-placeholder': '예: Cloud SQL의 MySQL 8',
    'modal-size-label': '데이터 규모 / 다운타임 창',
    'modal-size-placeholder': '예: 240만 행 / 18GB / 4시간',
    'modal-qty': '수량',
    'modal-total-amt': '총액',
    'badge-ssl': 'SSL 보안 결제 지원',
    'badge-paypal': 'PayPal 인증됨',
    'footer-link': 'DBMIGRATE 홈',
    'receipt-header': 'DBMIGRATE 영수증',
    'receipt-date': '주문 날짜',
    'receipt-txid': '거래 ID',
    'receipt-email': '고객 이메일',
    'receipt-type': '상품 종류',
    'receipt-size': '패키지 등급',
    'receipt-source': '소스 DB',
    'receipt-target': '타깃 DB',
    'receipt-data': '데이터 규모',
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
    window.location.href = '/dbmigrate/kr/';
  } else if (lang === 'en' && isKrPage) {
    window.location.href = '/dbmigrate/';
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
  const footerLink = document.getElementById('footer-dbmigrate-link');
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
    case 'basic': return 'fa-solid fa-magnifying-glass-chart';
    case 'growth': return 'fa-solid fa-right-left';
    case 'scale': return 'fa-solid fa-server';
    default: return 'fa-solid fa-database';
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
  ['order-source', 'order-target', 'order-size'].forEach(id => {
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
    source: document.getElementById('order-source')?.value.trim() || '-',
    target: document.getElementById('order-target')?.value.trim() || '-',
    size: document.getElementById('order-size')?.value.trim() || '-',
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
    `${dict['receipt-type'].padEnd(15)} : DBMIGRATE - ${currentPackage?.packageId || '-'}`,
    `${dict['receipt-size'].padEnd(15)} : ${currentPackage?.categoryKey || '-'}`,
    `${dict['receipt-source'].padEnd(15)} : ${values.source}`,
    `${dict['receipt-target'].padEnd(15)} : ${values.target}`,
    `${dict['receipt-data'].padEnd(15)} : ${values.size}`,
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
          description: `DBMIGRATE - ${currentPackage?.categoryKey || ''} / ${currentPackage?.packageId || ''}`,
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
      <td>DBMIGRATE - ${order.package}</td>
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
