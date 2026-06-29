const SERVICE_KEY = 'atsresume';
const LOCAL_STORAGE_KEY = `${SERVICE_KEY}_orders`;
const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScMPqbEWWttS5mb1m_krsO_kco24ImpgvYVSbc7zO0nEVmYFw/viewform?entry.1059822061=';

let currentLang = localStorage.getItem('bibleforai_lang') || 'en';
let currentPackage = null;
let orderQuantity = 1;
let paypalButtonInstance = null;

const service = {
  title_en: 'ATSRESUME — Global Resume & Cover Letter Optimization',
  title_ko: 'ATSRESUME — 글로벌 이력서 및 커버레터 최적화',
  subtitle_en: 'ATS-friendly resume and cover letter optimization for global job seekers, founders, freelancers, and sales professionals.',
  subtitle_ko: '글로벌 취업 준비자, 창업자, 프리랜서, 세일즈 전문가를 위한 ATS 친화형 이력서 및 커버레터 최적화 서비스입니다.',
  packages: [
    {
      id: 'cover-letter-polish',
      name_en: 'Cover Letter Polish',
      name_ko: '커버레터 다듬기',
      desc_en: 'Grammar, tone, and structure polish for a compelling cover letter.',
      desc_ko: '문법, 톤, 구조를 다듬어 설득력 있는 커버레터로 개선합니다.',
      price: 50,
      featured: false,
      iconClass: 'tier-coverletter',
      features_en: ['Grammar polish', 'Tone refinement', 'Structure cleanup', 'Hiring-friendly wording'],
      features_ko: ['문법 교정', '문체 개선', '구조 정리', '채용 친화 표현']
    },
    {
      id: 'resume-rewrite',
      name_en: 'ATS Resume Rewrite',
      name_ko: 'ATS 이력서 리라이트',
      desc_en: 'Full ATS resume rewrite — summary, experience, skills, and formatting rebuilt for recruiters and ATS systems.',
      desc_ko: '채용 담당자와 ATS 통과를 위해 요약, 경력, 기술, 포맷 전체를 재작성합니다.',
      price: 121,
      featured: true,
      iconClass: 'tier-resume',
      features_en: ['ATS keyword alignment', 'Summary rewrite', 'Experience bullets x3', 'Skills section cleanup'],
      features_ko: ['ATS 키워드 정렬', '요약 섹션 재작성', '경력 불릿 다듬기 x3', '기술 섹션 정리']
    },
    {
      id: 'resume-build',
      name_en: 'Resume + Cover Letter Build',
      name_ko: '이력서+커버레터 작성',
      desc_en: 'ATS resume + cover letter writing + job target strategy for fast job search execution.',
      desc_ko: 'ATS 이력서 + 커버레터 작성 + 타겟 직무 전략까지 포함한 빠른 취업 실행 패키지입니다.',
      price: 207,
      featured: false,
      iconClass: 'tier-build',
      features_en: ['Full resume rewrite', 'Cover letter included', 'Job target strategy', 'Application-ready formatting'],
      features_ko: ['이력서 전체 재작성', '커버레터 포함', '직무 타겟 전략', '지원용 포맷 정리']
    }
  ]
};

const faqData = {
  en: [
    { q: 'What is ATSRESUME?', a: 'ATSRESUME is a resume and cover letter optimization service for global job seekers who want stronger applications and better ATS performance.' },
    { q: 'Who should use ATSRESUME?', a: 'Anyone applying for jobs, changing careers, or preparing a stronger resume for global opportunities will benefit from our service.' },
    { q: 'How do I receive the deliverables?', a: 'After payment confirmation, you receive a structured receipt and are redirected to a Google Form to share your current resume, target role, and goals. Deliverables are sent within 2 business days.' },
    { q: 'Is the resume rewrite done by AI or humans?', a: 'We use AI-assisted drafting with professional human review to ensure quality, tone, and ATS compatibility.' },
    { q: 'Can I test the checkout flow?', a: 'Yes. Clicking the total price amount in the order modal triggers a sandbox-style test checkout without a real payment.' }
  ],
  ko: [
    { q: 'ATSRESUME는 무엇인가요?', a: 'ATSRESUME는 글로벌 구직자를 위해 더 강한 지원서와 더 나은 ATS 성능을 목표로 하는 이력서 및 커버레터 최적화 서비스입니다.' },
    { q: '누가 이용하면 좋나요?', a: '구직, 이직, 글로벌 기회를 위한 더 강한 이력서를 준비하는 모든 분들에게 적합합니다.' },
    { q: '결과물은 어떻게 받나요?', a: '결제 확인 후 영수증이 제공되며 Google Form으로 이동해 현재 이력서, 희망 직무, 목표를 입력합니다. 결과물은 영업일 기준 2일 내 전달됩니다.' },
    { q: '이력서 리라이트는 AI가 하나요, 사람이 하나요?', a: 'AI 초안 작성과 전문가의 인간 검수를 결합해 품질, 톤, ATS 호환성을 보장합니다.' },
    { q: '실제 결제 전에 테스트할 수 있나요?', a: '네. 주문 모달의 총액 텍스트를 클릭하면 실제 결제 없이 테스트 체크아웃이 실행됩니다.' }
  ]
};

const translations = {
  en: {
    'logo-subtitle': 'ATS Resume Studio',
    'nav-home': 'Overview',
    'nav-packages': 'Packages',
    'nav-faq': 'FAQ',
    'nav-orders': 'Orders',
    'btn-orders': 'My Orders',
    'hero-badge': 'ATS Resume & Cover Letter Optimization',
    'hero-title': 'Build the resume that opens doors.',
    'hero-desc': 'ATS-ready resumes, cover letters, and job-targeting strategy for global professionals.',
    'hero-cta': 'View Packages',
    'hero-secondary': 'Read FAQ',
    'stat-1-num': 'ATS',
    'stat-1-label': 'ATS optimized',
    'stat-2-num': '2D',
    'stat-2-label': 'Fast delivery',
    'stat-3-num': '5★',
    'stat-3-label': 'Client satisfaction',
    'section-packages-title': 'Choose your resume package',
    'section-packages-subtitle': 'From quick cover-letter polishing to full resume rewrites — we have a plan for every job search stage.',
    'section-faq-title': 'Frequently asked questions',
    'section-faq-subtitle': 'Everything you need to know about the ATSRESUME service.',
    'section-orders-title': 'My Orders',
    'section-orders-subtitle': 'Your completed orders are stored in your browser.',
    'no-orders-msg': 'No purchase records yet. Your history will appear here after checkout.',
    'footer-copy': '&copy; 2026 BibleForAI ATSRESUME. All rights reserved.',
    'modal-title': 'Configure your order',
    'modal-desc': 'Select your target role, set quantity, and complete secure PayPal checkout.',
    'modal-base-pkg': 'Base package',
    'modal-base-price-label': 'Base price',
    'modal-email-label': 'Email address *',
    'modal-email-placeholder': 'name@example.com',
    'modal-email-error': 'Please enter a valid email address.',
    'modal-target-label': 'Target role / job title',
    'modal-qty': 'Quantity',
    'modal-total-amt': 'Total amount',
    'badge-ssl': 'SSL Secured Checkout',
    'badge-paypal': 'PayPal Verified',
    'order-button': 'Order Package',
    'featured-badge': 'Best Value',
    'receipt-header': 'BIBLEFORAI - ATSRESUME RECEIPT',
    'receipt-date': 'Order Date',
    'receipt-txid': 'Transaction ID',
    'receipt-email': 'Customer Email',
    'receipt-product': 'Product',
    'receipt-package': 'Package',
    'receipt-targetrole': 'Target Role',
    'receipt-qty': 'Quantity',
    'receipt-baseprice': 'Base Price',
    'receipt-total': 'Total Paid',
    'receipt-status': 'Status',
    'receipt-method': 'Payment Method',
    'receipt-method-val': 'PayPal Secure Checkout'
  },
  ko: {
    'logo-subtitle': 'ATS 이력서 스튜디오',
    'nav-home': '개요',
    'nav-packages': '패키지',
    'nav-faq': 'FAQ',
    'nav-orders': '주문내역',
    'btn-orders': '내 주문',
    'hero-badge': 'ATS 이력서 & 커버레터 최적화',
    'hero-title': '합격률을 높이는 이력서와 커버레터를 만드세요.',
    'hero-desc': 'ATS에 맞춘 이력서, 커버레터, 직무 타겟팅 전략을 제공합니다.',
    'hero-cta': '패키지 보기',
    'hero-secondary': 'FAQ 보기',
    'stat-1-num': 'ATS',
    'stat-1-label': 'ATS 최적화',
    'stat-2-num': '2일',
    'stat-2-label': '빠른 납기',
    'stat-3-num': '5★',
    'stat-3-label': '고객 만족도',
    'section-packages-title': '이력서 패키지를 선택하세요',
    'section-packages-subtitle': '커버레터 다듬기부터 이력서 전체 재작성까지 — 모든 구직 단계에 맞는 플랜이 있습니다.',
    'section-faq-title': '자주 묻는 질문',
    'section-faq-subtitle': 'ATSRESUME 서비스에 대해 알아야 할 모든 것.',
    'section-orders-title': '내 주문 내역',
    'section-orders-subtitle': '완료된 주문은 브라우저에 저장됩니다.',
    'no-orders-msg': '아직 구매 기록이 없습니다. 결제 후 내역이 여기에 표시됩니다.',
    'footer-copy': '&copy; 2026 BibleForAI ATSRESUME. All rights reserved.',
    'modal-title': '주문 설정',
    'modal-desc': '타겟 역할을 선택하고, 수량을 설정한 뒤 안전한 PayPal 결제를 진행하세요.',
    'modal-base-pkg': '기본 패키지',
    'modal-base-price-label': '기본 가격',
    'modal-email-label': '이메일 주소 *',
    'modal-email-placeholder': 'name@example.com',
    'modal-email-error': '올바른 이메일 주소를 입력해주세요.',
    'modal-target-label': '타겟 역할 / 희망 직무',
    'modal-qty': '수량',
    'modal-total-amt': '총 결제금액',
    'badge-ssl': 'SSL 보안 결제',
    'badge-paypal': 'PayPal 인증됨',
    'order-button': '패키지 주문하기',
    'featured-badge': '추천',
    'receipt-header': 'BIBLEFORAI - ATSRESUME 영수증',
    'receipt-date': '주문 날짜',
    'receipt-txid': '거래 ID',
    'receipt-email': '고객 이메일',
    'receipt-product': '상품',
    'receipt-package': '패키지',
    'receipt-targetrole': '타겟 역할',
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

function formatPrice(v) {
  return `$${Number(v).toFixed(2)}`;
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
  currentLang = lang in translations ? lang : 'en';
  localStorage.setItem('bibleforai_lang', currentLang);
  const dict = translations[currentLang];

  document.documentElement.lang = currentLang;
  document.title = currentLang === 'ko'
    ? 'BibleForAI - ATSRESUME | 글로벌 이력서 및 커버레터 최적화'
    : 'BibleForAI - ATSRESUME | Global Resume & Cover Letter Optimization';

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', currentLang === 'ko'
    ? '글로벌 구직자를 위한 ATS 친화형 이력서 및 커버레터 최적화 서비스.'
    : 'ATS-friendly resume and cover letter optimization for global job seekers, founders, freelancers, and sales professionals.');

  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', currentLang === 'ko'
    ? 'BibleForAI - ATSRESUME | 글로벌 이력서 최적화'
    : 'BibleForAI - ATSRESUME | Global Resume Optimization');

  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', currentLang === 'ko'
    ? '글로벌 구직자를 위한 ATS 친화형 이력서 및 커버레터 최적화 서비스.'
    : 'Optimize your resume with ATS-friendly rewrites, cover-letter strategy, and job targeting for global professionals.');

  const twTitle = document.querySelector('meta[name="twitter:title"]');
  if (twTitle) twTitle.setAttribute('content', currentLang === 'ko'
    ? 'BibleForAI - ATSRESUME | 글로벌 이력서 최적화'
    : 'BibleForAI - ATSRESUME | Global Resume Optimization');

  const twDesc = document.querySelector('meta[name="twitter:description"]');
  if (twDesc) twDesc.setAttribute('content', currentLang === 'ko'
    ? '글로벌 구직자를 위한 ATS 친화형 이력서 및 커버레터 최적화 서비스.'
    : 'ATS-optimized resumes and cover letters for job seekers, founders, and sales professionals.');

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
          <div class="card-icon ${pkg.iconClass}"><i class="fa-solid fa-file-lines"></i></div>
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
    `${t['receipt-targetrole']}: ${order.target}`,
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
  const target = targetInput.value || (currentLang === 'ko' ? '일반' : 'General');
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
      const target = document.getElementById('order-target').value || (currentLang === 'ko' ? '일반' : 'General');
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
      document.getElementById('modal-error').textContent = 'Payment error. Please try again.';
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
