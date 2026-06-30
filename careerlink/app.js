// CAREERLINK — LinkedIn Career & Profile Optimization
const SERVICE_KEY = 'careerlink';
const LOCAL_STORAGE_KEY = `${SERVICE_KEY}_orders`;
const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScMPqbEWWttS5mb1m_krsO_kco24ImpgvYVSbc7zO0nEVmYFw/viewform?entry.1059822061=';

let currentLang = localStorage.getItem('bibleforai_lang') || 'en';
let currentView = 'home';
let orderQuantity = 1;
let currentPackage = null;
let paypalButtonInstance = null;

const packageCatalog = {
  careerlink: {
    title_en: 'CAREERLINK — LinkedIn Career & Profile Optimization',
    title_ko: 'CAREERLINK — 링크드인 커리어 및 프로필 최적화',
    subtitle_en: 'ATS-friendly LinkedIn profile optimization and career coaching for global job seekers, founders, freelancers, and sales professionals.',
    subtitle_ko: '글로벌 취업 준비자, 창업자, 프리랜서, 세일즈 전문가를 위한 ATS 친화형 링크드인 프로필 최적화 및 커리어 코칭 서비스입니다.',
    packages: [
      {
        id: 'profile-audit',
        name_en: 'Profile Audit',
        name_ko: '프로필 진단',
        desc_en: 'Complete LinkedIn profile audit with ATS keyword analysis and quick-win recommendations.',
        desc_ko: 'ATS 키워드 분석과 즉시 적용 가능한 개선 포인트를 제공하는 링크드인 프로필 진단 서비스입니다.',
        price: 9.90,
        featured: false,
        iconClass: 'tier-audit',
        features_en: ['ATS keyword check', 'Profile score report', 'Headline analysis', 'Top 5 quick wins'],
        features_ko: ['ATS 키워드 점검', '프로필 점수 리포트', '헤드라인 분석', '즉시 적용 팁 5가지']
      },
      {
        id: 'profile-rewrite',
        name_en: 'Profile Rewrite',
        name_ko: '프로필 리라이트',
        desc_en: 'Full LinkedIn profile rewrite — headline, About, experience, and skills sections rewritten for recruiters and search visibility.',
        desc_ko: '채용 담당자와 검색 노출을 위해 헤드라인, 소개, 경력, 기술 섹션 전체를 재작성합니다.',
        price: 19.80,
        featured: true,
        iconClass: 'tier-rewrite',
        features_en: ['Headline & tagline rewrite', 'About section (250+ words)', 'Experience polish x3', 'Skills & endorsement set'],
        features_ko: ['헤드라인 & 태그라인 재작성', '소개 섹션 (250자 이상)', '경력 문구 다듬기 x3', '기술 및 추천 설정']
      },
      {
        id: 'career-sprint',
        name_en: 'Career Sprint',
        name_ko: '커리어 스프린트',
        desc_en: 'Optimized LinkedIn profile + tailored job search strategy + interview prep guide for fast career pivots.',
        desc_ko: '프로필 최적화 + 맞춤 취업 전략 + 면접 준비 가이드까지 포함한 빠른 커리어 전환 패키지입니다.',
        price: 39.60,
        featured: false,
        iconClass: 'tier-activation',
        features_en: ['Full profile rewrite', 'Job search strategy', 'Interview Q&A guide', 'Outreach message templates'],
        features_ko: ['프로필 전체 재작성', '취업 전략 수립', '면접 Q&A 가이드', '아웃리치 메시지 템플릿']
      },
      {
        id: 'sales-pro',
        name_en: 'Sales Pro Branding',
        name_ko: '세일즈 프로 브랜딩',
        desc_en: 'Profile and content strategy built for B2B sales professionals to attract inbound leads on LinkedIn.',
        desc_ko: 'B2B 영업 전문가를 위해 인바운드 리드를 유치하는 프로필 및 콘텐츠 전략을 구성합니다.',
        price: 59.40,
        featured: false,
        iconClass: 'tier-outreach',
        features_en: ['Sales-focused profile', 'ICP messaging framework', 'Content hook strategy', '30-day posting plan'],
        features_ko: ['영업 중심 프로필 작성', 'ICP 메시지 프레임워크', '콘텐츠 훅 전략', '30일 게시 플랜']
      },
      {
        id: 'executive-brand',
        name_en: 'Executive Brand Builder',
        name_ko: '임원 브랜딩 패키지',
        desc_en: 'Premium personal brand development for C-suite executives, board advisors, and founders on LinkedIn.',
        desc_ko: 'C레벨 임원, 이사회 자문위원, 창업자를 위한 프리미엄 개인 브랜드 구축 서비스입니다.',
        price: 99.00,
        featured: false,
        iconClass: 'tier-growth',
        features_en: ['Executive narrative', 'Board-ready bio', 'Media & speaking kit', '60-day visibility plan'],
        features_ko: ['임원 서사 구성', '이사회 바이오 작성', '미디어 & 스피킹 키트', '60일 노출 플랜']
      }
    ]
  }
};

const faqData = {
  en: [
    { q: 'What is CAREERLINK?', a: 'CAREERLINK is a LinkedIn profile optimization and career coaching service for job seekers, founders, freelancers, and sales professionals looking to maximize their LinkedIn presence.' },
    { q: 'Who should use CAREERLINK?', a: 'Anyone who uses LinkedIn professionally — whether for job searching, personal branding, B2B sales, or thought leadership — will benefit from our optimization services.' },
    { q: 'How do I receive the deliverables?', a: 'After payment confirmation, you receive a structured receipt and are redirected to a Google Form to share your current profile and goals. Deliverables are sent within 3–5 business days.' },
    { q: 'Is the profile rewrite done by AI or humans?', a: 'We use a hybrid approach: AI-assisted drafting with professional human review to ensure quality, tone, and ATS-compatibility.' }],
  ko: [
    { q: 'CAREERLINK는 무엇인가요?', a: 'CAREERLINK는 취업 준비자, 창업자, 프리랜서, 세일즈 전문가의 링크드인 존재감을 극대화하기 위한 프로필 최적화 및 커리어 코칭 서비스입니다.' },
    { q: '누가 이용하면 좋나요?', a: '취업 준비, 개인 브랜딩, B2B 영업, 소트 리더십 등 링크드인을 전문적으로 활용하는 모든 분들에게 적합합니다.' },
    { q: '납품은 어떻게 받나요?', a: '결제 확인 후 Google Form으로 이동하여 현재 프로필과 목표를 공유하면, 영업일 기준 3~5일 이내에 결과물을 전달합니다.' },
    { q: '프로필 리라이트는 AI가 하나요, 사람이 하나요?', a: 'AI 보조 초안 작성과 전문가의 인간 검토를 결합하여 품질, 톤, ATS 호환성을 보장합니다.' }]
};

const translations = {
  en: {
    'logo-subtitle': 'LinkedIn Career Studio',
    'nav-home': 'Overview', 'nav-packages': 'Packages', 'nav-faq': 'FAQ', 'nav-orders': 'Orders',
    'btn-orders': 'My Orders',
    'hero-badge': 'LinkedIn Career & Profile Optimization',
    'hero-title': 'Build the LinkedIn profile that opens doors.',
    'hero-desc': 'ATS-optimized profiles, personal brand strategy, and career coaching for global professionals.',
    'hero-cta': 'View Packages', 'hero-secondary': 'Read FAQ',
    'stat-1-num': 'ATS', 'stat-1-label': 'Keyword optimized',
    'stat-2-num': '3–5D', 'stat-2-label': 'Fast delivery',
    'stat-3-num': '5★', 'stat-3-label': 'Client satisfaction',
    'section-packages-title': 'Choose a career optimization package',
    'section-packages-subtitle': 'From quick profile audits to full executive branding — we have a plan for every career stage.',
    'section-faq-title': 'Frequently asked questions',
    'section-faq-subtitle': 'Everything you need to know about the CAREERLINK service.',
    'section-orders-title': 'My Orders',
    'section-orders-subtitle': 'Your completed orders are stored in your browser.',
    'no-orders-msg': 'No purchase records yet. Your history will appear here after checkout.',
    'footer-copy': '&copy; 2026 BibleForAI CAREERLINK. All rights reserved.',
    'modal-title': 'Configure your order',
    'modal-desc': 'Select your career goal, set quantity, and complete secure PayPal checkout.',
    'modal-base-pkg': 'Base package', 'modal-base-price-label': 'Base price',
    'modal-email-label': 'Email address *',
    'modal-email-placeholder': 'name@example.com',
    'modal-email-error': 'Please enter a valid email address.',
    'modal-goal-label': 'Career goal',
    'modal-qty': 'Quantity', 'modal-total-amt': 'Total amount',
    'badge-ssl': 'SSL Secured Checkout', 'badge-paypal': 'PayPal Verified',
    'order-button': 'Buy Package', 'featured-badge': 'Best Value',
    'receipt-header': 'BIBLEFORAI - CAREERLINK RECEIPT',
    'receipt-date': 'Order Date', 'receipt-txid': 'Transaction ID',
    'receipt-email': 'Customer Email', 'receipt-product': 'Product',
    'receipt-package': 'Package', 'receipt-goal': 'Career Goal',
    'receipt-qty': 'Quantity', 'receipt-baseprice': 'Base Price',
    'receipt-total': 'Total Paid', 'receipt-status': 'Status',
    'receipt-method': 'Payment Method', 'receipt-method-val': 'PayPal Secure Checkout'
  },
  ko: {
    'logo-subtitle': '링크드인 커리어 스튜디오',
    'nav-home': '개요', 'nav-packages': '패키지', 'nav-faq': 'FAQ', 'nav-orders': '주문내역',
    'btn-orders': '내 주문',
    'hero-badge': '링크드인 커리어 & 프로필 최적화',
    'hero-title': '기회의 문을 여는 링크드인 프로필을 만드세요.',
    'hero-desc': 'ATS 최적화 프로필, 개인 브랜드 전략, 글로벌 전문가를 위한 커리어 코칭 서비스입니다.',
    'hero-cta': '패키지 보기', 'hero-secondary': 'FAQ 보기',
    'stat-1-num': 'ATS', 'stat-1-label': '키워드 최적화',
    'stat-2-num': '3~5일', 'stat-2-label': '빠른 납기',
    'stat-3-num': '5★', 'stat-3-label': '고객 만족도',
    'section-packages-title': '커리어 최적화 패키지를 선택하세요',
    'section-packages-subtitle': '빠른 프로필 진단부터 임원 브랜딩까지 — 모든 커리어 단계에 맞는 플랜이 있습니다.',
    'section-faq-title': '자주 묻는 질문',
    'section-faq-subtitle': 'CAREERLINK 서비스에 대해 알아야 할 모든 것.',
    'section-orders-title': '내 주문 내역',
    'section-orders-subtitle': '완료된 주문은 브라우저에 저장됩니다.',
    'no-orders-msg': '아직 구매 기록이 없습니다. 결제 후 내역이 여기에 표시됩니다.',
    'footer-copy': '&copy; 2026 BibleForAI CAREERLINK. All rights reserved.',
    'modal-title': '주문 설정',
    'modal-desc': '커리어 목표를 선택하고, 수량을 설정한 뒤 안전한 PayPal 결제를 진행하세요.',
    'modal-base-pkg': '기본 패키지', 'modal-base-price-label': '기본 가격',
    'modal-email-label': '이메일 주소 *',
    'modal-email-placeholder': 'name@example.com',
    'modal-email-error': '올바른 이메일 주소를 입력해주세요.',
    'modal-goal-label': '커리어 목표',
    'modal-qty': '수량', 'modal-total-amt': '총 결제금액',
    'badge-ssl': 'SSL 보안 결제', 'badge-paypal': 'PayPal 인증됨',
    'order-button': '패키지 구매', 'featured-badge': '추천',
    'receipt-header': 'BIBLEFORAI - CAREERLINK 영수증',
    'receipt-date': '주문 날짜', 'receipt-txid': '거래 ID',
    'receipt-email': '고객 이메일', 'receipt-product': '상품',
    'receipt-package': '패키지', 'receipt-goal': '커리어 목표',
    'receipt-qty': '수량', 'receipt-baseprice': '기본 가격',
    'receipt-total': '총 결제금액', 'receipt-status': '상태',
    'receipt-method': '결제 방식', 'receipt-method-val': 'PayPal 보안 결제'
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

function toggleMobileMenu() {
  document.getElementById('mobile-drawer')?.classList.toggle('active');
}

function navigate(view) {
  currentView = view;
  document.querySelectorAll('.view-section').forEach(s => s.classList.toggle('active', s.id === `${view}-view`));
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.toggle('active', a.dataset.view === view));
  document.getElementById(`${view}-view`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  document.getElementById('mobile-drawer')?.classList.remove('active');
}

function changeLanguage(lang) {
  currentLang = lang === 'ko' ? 'ko' : 'en';
  localStorage.setItem('bibleforai_lang', currentLang);
  document.documentElement.lang = currentLang;
  applyTranslations(); renderPackages(); renderFaq(); renderOrders();
}

function applyTranslations() {
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

  const dict = translations[currentLang] || translations.en;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key] !== undefined) el.textContent = dict[key];
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (dict[key] !== undefined) el.innerHTML = dict[key];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (dict[key] !== undefined) el.setAttribute('placeholder', dict[key]);
  });
  const selector = document.getElementById('language-selector');
  if (selector) selector.value = currentLang;
  const service = packageCatalog[SERVICE_KEY];
  const sub = document.getElementById('service-subtitle');
  if (sub) sub.textContent = currentLang === 'ko' ? service.subtitle_ko : service.subtitle_en;
}

function renderPackages() {
  const grid = document.getElementById('packages-grid');
  if (!grid) return;
  const service = packageCatalog[SERVICE_KEY];
  const isKo = currentLang === 'ko';
  grid.innerHTML = service.packages.map(pkg => {
    const name = isKo ? pkg.name_ko : pkg.name_en;
    const desc = isKo ? pkg.desc_ko : pkg.desc_en;
    const features = isKo ? pkg.features_ko : pkg.features_en;
    return `
      <article class="package-card ${pkg.featured ? 'featured' : ''}">
        <div class="card-icon ${pkg.iconClass}"><i class="fa-brands fa-linkedin"></i></div>
        <div class="package-meta">
          <span class="package-tag">${pkg.featured ? translations[currentLang]['featured-badge'] : (isKo ? '패키지' : 'Package')}</span>
          <span class="package-price">${formatPrice(pkg.price)}</span>
        </div>
        <h3>${name}</h3>
        <p>${desc}</p>
        <ul class="package-features">
          ${features.map(f => `<li><i class="fa-solid fa-circle-check"></i> ${f}</li>`).join('')}
        </ul>
        <button class="btn-buy" onclick="openPurchaseModal('${SERVICE_KEY}', '${pkg.id}')">${translations[currentLang]['order-button']}</button>
      </article>
    `;
  }).join('');
}

function renderFaq() {
  const list = document.getElementById('faq-list');
  if (!list) return;
  const items = faqData[currentLang] || faqData.en;
  list.innerHTML = items.map(item => `
    <details class="faq-item">
      <summary>${item.q}</summary>
      <p>${item.a}</p>
    </details>
  `).join('');
}

function updateModalPrice() {
  const qty = Math.max(parseInt(document.getElementById('order-quantity')?.value || '1', 10) || 1, 1);
  orderQuantity = qty;
  const totalEl = document.getElementById('modal-total-price');
  if (totalEl) totalEl.textContent = formatPrice(currentPackage.basePrice * orderQuantity);
}

function validateEmailField() {
  const input = document.getElementById('order-email');
  const error = document.getElementById('email-error');
  if (!input) return true;
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
  input.style.borderColor = ok ? 'var(--border)' : '#ef4444';
  if (error) {
    error.textContent = ok ? '' : translations[currentLang]['modal-email-error'];
    error.style.display = ok ? 'none' : 'block';
  }
  return ok;
}

function openPurchaseModal(categoryKey, packageId) {
  const category = packageCatalog[categoryKey];
  const pkg = category?.packages.find(p => p.id === packageId);
  if (!pkg) return;
  const isKo = currentLang === 'ko';
  currentPackage = {
    categoryKey, categoryName: isKo ? category.title_ko : category.title_en,
    tierName: isKo ? pkg.name_ko : pkg.name_en, basePrice: pkg.price
  };
  orderQuantity = 1;
  document.getElementById('modal-product-title').textContent = currentPackage.categoryName;
  document.getElementById('modal-product-desc').textContent = isKo ? category.subtitle_ko : category.subtitle_en;
  document.getElementById('modal-package-name').textContent = currentPackage.tierName;
  document.getElementById('modal-base-price').textContent = formatPrice(pkg.price);
  const emailInput = document.getElementById('order-email');
  if (emailInput) { emailInput.value = ''; emailInput.style.borderColor = 'var(--border)'; }
  const goalInput = document.getElementById('order-goal');
  if (goalInput) goalInput.selectedIndex = 0;
  const qtyInput = document.getElementById('order-quantity');
  if (qtyInput) qtyInput.value = '1';
  const error = document.getElementById('email-error');
  if (error) error.style.display = 'none';
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
    const card = document.querySelector('.modal-card');
    const payment = document.querySelector('.paypal-wrapper');
    if (card && payment) card.scrollTo({ top: Math.max(payment.offsetTop - 110, 0), behavior: 'smooth' });
  }, 150);
  initPayPalButtons();
}

function closeModal() {
  document.getElementById('purchase-modal').classList.remove('active');
  const container = document.getElementById('paypal-button-container');
  if (container) container.innerHTML = '';
  paypalButtonInstance = null;
}

function adjustQty(delta) {
  const input = document.getElementById('order-quantity');
  const next = Math.max((parseInt(input.value || '1', 10) || 1) + delta, 1);
  input.value = String(next);
  updateModalPrice();
}

function triggerTestCheckout() {
  const emailInput = document.getElementById('order-email');
  if (emailInput && !emailInput.value.trim()) emailInput.value = 'secure checkout@test.dev';
  if (!validateEmailField()) return;
  saveLocalOrder({ id: `TEST-${Math.random().toString(36).slice(2, 10).toUpperCase()}`, isTest: true });
  closeModal();
}

function initPayPalButtons() {
  const container = document.getElementById('paypal-button-container');
  if (!container) return;
  if (typeof paypal === 'undefined') {
    container.innerHTML = '<p style="color:#f87171;font-size:0.85rem;"><i class="fa-solid fa-triangle-exclamation"></i> PayPal is unavailable. Please refresh.</p>';
    return;
  }
  container.innerHTML = '';
  paypalButtonInstance = paypal.Buttons({
    style: { layout: 'vertical', color: 'blue', shape: 'rect', label: 'checkout' },
    onClick: (data, actions) => validateEmailField() ? actions.resolve() : actions.reject(),
    createOrder: (data, actions) => {
      const goal = document.getElementById('order-goal')?.value || 'General';
      const finalAmount = (currentPackage.basePrice * orderQuantity).toFixed(2);
      return actions.order.create({
        purchase_units: [{
          description: `${currentPackage.categoryName} - ${currentPackage.tierName} [Goal: ${goal}] (Qty: ${orderQuantity})`,
          amount: { currency_code: 'USD', value: finalAmount }
        }]
      });
    },
    onApprove: (data, actions) => actions.order.capture().then(details => { saveLocalOrder(details); closeModal(); }),
    onError: err => console.error('PayPal error:', err)
  });
  paypalButtonInstance.render('#paypal-button-container');
}

function saveLocalOrder(details) {
  const orders = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
  const emailVal = document.getElementById('order-email')?.value.trim() || '';
  const goalVal = document.getElementById('order-goal')?.value || 'General';
  const isKo = currentLang === 'ko';
  const newOrder = {
    date: new Date().toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
    id: details.id, email: emailVal,
    category: currentPackage.categoryName, package: currentPackage.tierName,
    goal: goalVal, quantity: orderQuantity,
    basePrice: currentPackage.basePrice,
    totalPaid: formatPrice(currentPackage.basePrice * orderQuantity),
    status: 'Completed', isTest: Boolean(details.isTest)
  };
  orders.unshift(newOrder);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(orders));
  renderOrders();
  const dict = translations[currentLang];
  const receiptText = `===================================
${dict['receipt-header']}
===================================
${dict['receipt-date'].padEnd(15)} : ${newOrder.date}
${dict['receipt-txid'].padEnd(15)} : ${newOrder.id}
${dict['receipt-email'].padEnd(15)} : ${newOrder.email}
${dict['receipt-product'].padEnd(15)} : ${currentPackage.categoryName}
${dict['receipt-package'].padEnd(15)} : ${newOrder.package}
${dict['receipt-goal'].padEnd(15)} : ${newOrder.goal}
${dict['receipt-qty'].padEnd(15)} : ${newOrder.quantity}
${dict['receipt-baseprice'].padEnd(15)} : ${formatPrice(newOrder.basePrice)}
${dict['receipt-total'].padEnd(15)} : ${newOrder.totalPaid}
${dict['receipt-status'].padEnd(15)} : ${isKo ? '완료됨' : newOrder.status}
-----------------------------------
${dict['receipt-method'].padEnd(15)} : ${dict['receipt-method-val']}
===================================`;
  window.location.href = `${GOOGLE_FORM_URL}${encodeURIComponent(receiptText)}`;
}

function renderOrders() {
  const tbody = document.getElementById('orders-tbody');
  const empty = document.getElementById('no-orders-msg');
  if (!tbody || !empty) return;
  const orders = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
  if (!orders.length) { tbody.innerHTML = ''; empty.style.display = 'block'; return; }
  empty.style.display = 'none';
  tbody.innerHTML = orders.map(o => `
    <tr>
      <td>${o.date}</td><td>${o.id}</td><td>${o.package}</td>
      <td>${o.goal}</td><td>${o.quantity}</td><td>${o.totalPaid}</td><td>${o.status}</td>
    </tr>
  `).join('');
}

function init() {
  document.documentElement.lang = currentLang;
  applyTranslations(); renderPackages(); renderFaq(); renderOrders(); navigate('home');
  const selector = document.getElementById('language-selector');
  if (selector) selector.value = currentLang;
}

document.addEventListener('DOMContentLoaded', init);
window.toggleMobileMenu = toggleMobileMenu;
window.navigate = navigate;
window.changeLanguage = changeLanguage;
window.openPurchaseModal = openPurchaseModal;
window.closeModal = closeModal;
window.adjustQty = adjustQty;
window.triggerTestCheckout = triggerTestCheckout;
window.updateModalPrice = updateModalPrice;
window.renderOrders = renderOrders;

// Expose variables globally to prevent ReferenceErrors in inline HTML scripts/handlers
if (typeof navigate !== 'undefined') { window.navigate = navigate; }
if (typeof currentLang !== 'undefined') { window.currentLang = currentLang; }
