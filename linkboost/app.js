// LINKBOOST — LinkedIn Profile Growth & B2B Engagement
const SERVICE_KEY = 'linkboost';
const LOCAL_STORAGE_KEY = `${SERVICE_KEY}_orders`;
const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScMPqbEWWttS5mb1m_krsO_kco24ImpgvYVSbc7zO0nEVmYFw/viewform?entry.1059822061=';

let currentLang = localStorage.getItem('bibleforai_lang') || 'en';
let currentView = 'home';
let orderQuantity = 1;
let currentPackage = null;
let paypalButtonInstance = null;

const packageCatalog = {
  linkboost: {
    title_en: 'LINKBOOST — LinkedIn Profile Growth',
    title_ko: 'LINKBOOST — 링크드인 프로필 성장',
    subtitle_en: 'LinkedIn profile activation, authority building, and B2B engagement systems.',
    subtitle_ko: '링크드인 프로필 활성화, 전문성 강화, B2B 참여 시스템 구축 서비스.',
    packages: [
      {
        id: 'audit',
        name_en: 'Starter Audit',
        name_ko: '스타터 진단',
        desc_en: 'A fast audit of your profile with keyword and positioning fixes.',
        desc_ko: '프로필 키워드와 포지셔닝을 빠르게 진단하고 개선점을 제안합니다.',
        price: 7.15,
        featured: false,
        iconClass: 'tier-audit',
        features_en: ['Profile scan', 'Keyword map', 'Headline notes', 'Quick wins'],
        features_ko: ['프로필 점검', '키워드 맵 구성', '헤드라인 개선안', '즉시 적용 팁']
      },
      {
        id: 'rewrite',
        name_en: 'Profile Rewrite',
        name_ko: '프로필 리라이트',
        desc_en: 'Headline, About, and experience sections rewritten for stronger credibility.',
        desc_ko: '헤드라인, 소개, 경력 섹션을 신뢰도 높게 다시 작성합니다.',
        price: 14.30,
        featured: true,
        iconClass: 'tier-rewrite',
        features_en: ['Headline rewrite', 'About section', 'Experience polish', 'CTA wording'],
        features_ko: ['헤드라인 재작성', '소개 섹션 정리', '경력 문구 다듬기', 'CTA 문구 개선']
      },
      {
        id: 'activation',
        name_en: 'Activation Sprint',
        name_ko: '활성화 스프린트',
        desc_en: 'Content hooks and engagement prompts designed to revive your network.',
        desc_ko: '네트워크 반응을 되살리는 콘텐츠 훅과 참여 유도 문구를 제공합니다.',
        price: 28.57,
        featured: false,
        iconClass: 'tier-activation',
        features_en: ['Post hooks', 'Comment prompts', 'Connection flow', 'Engagement plan'],
        features_ko: ['게시물 훅', '댓글 유도 문구', '연결 흐름', '참여 플랜']
      },
      {
        id: 'outreach',
        name_en: 'Lead Outreach Kit',
        name_ko: '리드 아웃리치 키트',
        desc_en: 'ICP targeting, connection messages, and follow-up templates for B2B outreach.',
        desc_ko: 'B2B 아웃리치용 ICP 타겟팅, 연결 메시지, 팔로업 템플릿을 제공합니다.',
        price: 49.00,
        featured: false,
        iconClass: 'tier-outreach',
        features_en: ['ICP targeting', 'DM scripts', 'Follow-up cadence', 'Lead scoring'],
        features_ko: ['ICP 타겟팅', 'DM 스크립트', '팔로업 주기', '리드 스코어링']
      },
      {
        id: 'growth',
        name_en: 'Growth Sprint',
        name_ko: '그로스 스프린트',
        desc_en: 'Complete profile strategy plus a 7-day action plan and support.',
        desc_ko: '프로필 전략 전체와 7일 실행 계획, 운영 지원까지 포함됩니다.',
        price: 99.00,
        featured: false,
        iconClass: 'tier-growth',
        features_en: ['Full profile strategy', 'Audience matrix', '7-day plan', 'Support included'],
        features_ko: ['전체 프로필 전략', '오디언스 매트릭스', '7일 실행 계획', '운영 지원 포함']
      }
    ]
  }
};

const faqData = {
  en: [
    {
      q: 'What is LINKBOOST?',
      a: 'A LinkedIn growth service for founders, freelancers, recruiters, and B2B teams that want a stronger profile and better engagement.'
    },
    {
      q: 'Who should use this service?',
      a: 'Anyone using LinkedIn as a sales, recruiting, or personal branding channel.'
    },
    {
      q: 'How do I receive the deliverables?',
      a: 'After payment, you receive a structured receipt and the service plan via Google Form redirection.'
    },
    {
      q: 'Can I test checkout before real payment?',
      a: 'Yes. Clicking the visible total price triggers the sandbox-style test checkout flow.'
    }
  ],
  ko: [
    {
      q: 'LINKBOOST는 무엇인가요?',
      a: '창업자, 프리랜서, 채용 담당자, B2B 팀을 위한 링크드인 성장 서비스입니다.'
    },
    {
      q: '누가 이용하면 좋나요?',
      a: '세일즈, 채용, 개인 브랜딩 채널로 링크드인을 사용하는 누구나 적합합니다.'
    },
    {
      q: '납품은 어떻게 받나요?',
      a: '결제 후 Google Form으로 리디렉션되어 영수증과 서비스 정보가 전달됩니다.'
    },
    {
      q: '실제 결제 전에 테스트할 수 있나요?',
      a: '네. 화면에 보이는 총액 텍스트를 클릭하면 테스트 체크아웃이 실행됩니다.'
    }
  ]
};

const translations = {
  en: {
    'logo-subtitle': 'LinkedIn Growth Studio',
    'nav-home': 'Overview',
    'nav-packages': 'Packages',
    'nav-faq': 'FAQ',
    'nav-orders': 'Orders',
    'btn-orders': 'My Orders',
    'hero-badge': 'LinkedIn Growth & B2B Activation',
    'hero-title': 'Build a profile that gets seen, trusted, and converted.',
    'hero-desc': 'Optimize your LinkedIn presence with high-conviction messaging, audience targeting, and engagement systems.',
    'hero-cta': 'Explore Packages',
    'hero-secondary': 'View FAQ',
    'stat-1-num': '5x',
    'stat-1-label': 'Better profile clarity',
    'stat-2-num': '7D',
    'stat-2-label': 'Action plan sprint',
    'stat-3-num': 'B2B',
    'stat-3-label': 'Outbound ready',
    'section-packages-title': 'Select a LinkedIn growth package',
    'section-packages-subtitle': 'All packages use the original kmong pricing baseline with a 2x markup and are displayed in USD.',
    'section-faq-title': 'Frequently asked questions',
    'section-faq-subtitle': 'A quick overview of how this LinkedIn service works.',
    'section-orders-title': 'My Orders',
    'section-orders-subtitle': 'Your confirmed orders are stored locally in your browser.',
    'no-orders-msg': 'No purchase records yet. Your history will appear here after checkout.',
    'footer-copy': '&copy; 2026 BibleForAI LINKBOOST. All rights reserved.',
    'modal-title': 'Configure your order',
    'modal-desc': 'Pick a quantity, review the price, and complete secure PayPal checkout.',
    'modal-base-pkg': 'Base package',
    'modal-base-price-label': 'Base price',
    'modal-email-label': 'Email address *',
    'modal-email-placeholder': 'name@example.com',
    'modal-email-error': 'Please enter a valid email address.',
    'modal-audience-label': 'Target audience',
    'modal-qty': 'Quantity',
    'modal-total-amt': 'Total amount',
    'badge-ssl': 'SSL Secured Checkout',
    'badge-paypal': 'PayPal Verified',
    'order-button': 'Buy Package',
    'featured-badge': 'Best Value',
    'receipt-header': 'BIBLEFORAI - LINKBOOST RECEIPT',
    'receipt-date': 'Order Date',
    'receipt-txid': 'Transaction ID',
    'receipt-email': 'Customer Email',
    'receipt-product': 'Product',
    'receipt-package': 'Package',
    'receipt-audience': 'Target Audience',
    'receipt-qty': 'Quantity',
    'receipt-baseprice': 'Base Price',
    'receipt-total': 'Total Paid',
    'receipt-status': 'Status',
    'receipt-method': 'Payment Method',
    'receipt-method-val': 'PayPal Secure Checkout'
  },
  ko: {
    'logo-subtitle': '링크드인 성장 스튜디오',
    'nav-home': '개요',
    'nav-packages': '패키지',
    'nav-faq': 'FAQ',
    'nav-orders': '주문내역',
    'btn-orders': '내 주문',
    'hero-badge': '링크드인 성장 & B2B 활성화',
    'hero-title': '보여지고, 신뢰받고, 전환되는 프로필을 만드세요.',
    'hero-desc': '강력한 메시지, 오디언스 타겟팅, 참여 시스템으로 링크드인 존재감을 최적화합니다.',
    'hero-cta': '패키지 보기',
    'hero-secondary': 'FAQ 보기',
    'stat-1-num': '5배',
    'stat-1-label': '더 명확한 프로필',
    'stat-2-num': '7일',
    'stat-2-label': '실행 계획 스프린트',
    'stat-3-num': 'B2B',
    'stat-3-label': '아웃바운드 준비 완료',
    'section-packages-title': '링크드인 성장 패키지를 선택하세요',
    'section-packages-subtitle': '모든 패키지는 크몽 원가 기준 2배 마크업을 반영해 USD로 표시됩니다.',
    'section-faq-title': '자주 묻는 질문',
    'section-faq-subtitle': '링크드인 서비스 이용 방법을 간단히 확인하세요.',
    'section-orders-title': '내 주문 내역',
    'section-orders-subtitle': '결제 완료 주문은 브라우저에 로컬 저장됩니다.',
    'no-orders-msg': '아직 구매 기록이 없습니다. 결제 후 내역이 여기에 표시됩니다.',
    'footer-copy': '&copy; 2026 BibleForAI LINKBOOST. All rights reserved.',
    'modal-title': '주문 설정',
    'modal-desc': '수량을 선택하고 가격을 확인한 뒤 안전한 PayPal 결제를 진행하세요.',
    'modal-base-pkg': '기본 패키지',
    'modal-base-price-label': '기본 가격',
    'modal-email-label': '이메일 주소 *',
    'modal-email-placeholder': 'name@example.com',
    'modal-email-error': '올바른 이메일 주소를 입력해주세요.',
    'modal-audience-label': '타겟 오디언스',
    'modal-qty': '수량',
    'modal-total-amt': '총 결제금액',
    'badge-ssl': 'SSL 보안 결제',
    'badge-paypal': 'PayPal 인증됨',
    'order-button': '패키지 구매',
    'featured-badge': '추천',
    'receipt-header': 'BIBLEFORAI - LINKBOOST 영수증',
    'receipt-date': '주문 날짜',
    'receipt-txid': '거래 ID',
    'receipt-email': '고객 이메일',
    'receipt-product': '상품',
    'receipt-package': '패키지',
    'receipt-audience': '타겟 오디언스',
    'receipt-qty': '수량',
    'receipt-baseprice': '기본 가격',
    'receipt-total': '총 결제금액',
    'receipt-status': '상태',
    'receipt-method': '결제 방식',
    'receipt-method-val': 'PayPal 보안 결제'
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
  const drawer = document.getElementById('mobile-drawer');
  if (!drawer) return;
  drawer.classList.toggle('active');
}

function navigate(view) {
  currentView = view;
  document.querySelectorAll('.view-section').forEach(section => {
    section.classList.toggle('active', section.id === `${view}-view`);
  });
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.classList.toggle('active', link.dataset.view === view);
  });
  const target = document.getElementById(`${view}-view`);
  if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const drawer = document.getElementById('mobile-drawer');
  if (drawer) drawer.classList.remove('active');
}

function changeLanguage(lang) {
  currentLang = lang === 'ko' ? 'ko' : 'en';
  localStorage.setItem('bibleforai_lang', currentLang);
  document.documentElement.lang = currentLang;
  applyTranslations();
  renderPackages();
  renderFaq();
  renderOrders();
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
  const service = packageCatalog[ SERVICE_KEY ];
  const heroSubtitle = document.getElementById('service-subtitle');
  if (heroSubtitle) heroSubtitle.textContent = currentLang === 'ko' ? service.subtitle_ko : service.subtitle_en;
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
        <div class="card-icon ${pkg.iconClass}"><i class="fa-solid fa-chart-line"></i></div>
        <div class="package-meta">
          <span class="package-tag">${pkg.featured ? translations[currentLang]['featured-badge'] : (isKo ? '패키지' : 'Package')}</span>
          <span class="package-price">${formatPrice(pkg.price)}</span>
        </div>
        <h3>${name}</h3>
        <p>${desc}</p>
        <ul class="package-features">
          ${features.map(feature => `<li><i class="fa-solid fa-circle-check"></i> ${feature}</li>`).join('')}
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
  const qtyInput = document.getElementById('order-quantity');
  const qty = Math.max(parseInt(qtyInput?.value || '1', 10) || 1, 1);
  orderQuantity = qty;
  const total = currentPackage.basePrice * orderQuantity;
  const totalEl = document.getElementById('modal-total-price');
  if (totalEl) totalEl.textContent = formatPrice(total);
}

function validateEmailField() {
  const input = document.getElementById('order-email');
  const error = document.getElementById('email-error');
  if (!input) return true;
  const email = input.value.trim();
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!pattern.test(email)) {
    input.style.borderColor = '#ef4444';
    if (error) {
      error.textContent = translations[currentLang]['modal-email-error'];
      error.style.display = 'block';
    }
    return false;
  }
  input.style.borderColor = 'var(--border)';
  if (error) error.style.display = 'none';
  return true;
}

function openPurchaseModal(categoryKey, packageId) {
  const category = packageCatalog[categoryKey];
  const pkg = category?.packages.find(item => item.id === packageId);
  if (!pkg) return;
  const isKo = currentLang === 'ko';
  currentPackage = {
    categoryKey,
    categoryName: isKo ? category.title_ko : category.title_en,
    tierName: isKo ? pkg.name_ko : pkg.name_en,
    basePrice: pkg.price
  };
  orderQuantity = 1;
  document.getElementById('modal-product-title').textContent = currentPackage.categoryName;
  document.getElementById('modal-product-desc').textContent = isKo ? category.subtitle_ko : category.subtitle_en;
  document.getElementById('modal-package-name').textContent = currentPackage.tierName;
  document.getElementById('modal-base-price').textContent = formatPrice(pkg.price);
  const emailInput = document.getElementById('order-email');
  const audienceInput = document.getElementById('order-audience');
  const qtyInput = document.getElementById('order-quantity');
  if (emailInput) {
    emailInput.value = '';
    emailInput.style.borderColor = 'var(--border)';
  }
  if (audienceInput) audienceInput.selectedIndex = 0;
  if (qtyInput) qtyInput.value = '1';
  const error = document.getElementById('email-error');
  if (error) error.style.display = 'none';
  updateModalPrice();
  document.getElementById('purchase-modal').classList.add('active');
  setTimeout(() => {
    const card = document.querySelector('.modal-card');
    const payment = document.querySelector('.paypal-wrapper');
    if (card && payment) {
      card.scrollTo({ top: Math.max(payment.offsetTop - 110, 0), behavior: 'smooth' });
    }
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
  if (emailInput && !emailInput.value.trim()) {
    emailInput.value = 'sandbox@test.dev';
  }
  if (!validateEmailField()) return;
  saveLocalOrder({ id: `TEST-${Math.random().toString(36).slice(2, 10).toUpperCase()}`, isTest: true });
  closeModal();
}

function initPayPalButtons() {
  const container = document.getElementById('paypal-button-container');
  if (!container) return;
  if (typeof paypal === 'undefined') {
    container.innerHTML = '<p class="paypal-error"><i class="fa-solid fa-triangle-exclamation"></i> PayPal is unavailable. Please refresh the page.</p>';
    return;
  }
  container.innerHTML = '';
  paypalButtonInstance = paypal.Buttons({
    style: { layout: 'vertical', color: 'blue', shape: 'rect', label: 'checkout' },
    onClick: function (data, actions) {
      if (!validateEmailField()) return actions.reject();
      return actions.resolve();
    },
    createOrder: function (data, actions) {
      const audience = document.getElementById('order-audience')?.value || 'Global';
      const finalAmount = (currentPackage.basePrice * orderQuantity).toFixed(2);
      return actions.order.create({
        purchase_units: [{
          description: `${currentPackage.categoryName} - ${currentPackage.tierName} [Audience: ${audience}] (Qty: ${orderQuantity})`,
          amount: { currency_code: 'USD', value: finalAmount }
        }]
      });
    },
    onApprove: function (data, actions) {
      return actions.order.capture().then(details => {
        saveLocalOrder(details);
        closeModal();
      });
    },
    onError: function (err) {
      console.error('PayPal Checkout error:', err);
      alert('An error occurred during payment processing. Please try again.');
    }
  });
  paypalButtonInstance.render('#paypal-button-container');
}

function saveLocalOrder(details) {
  const orders = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
  const emailVal = document.getElementById('order-email')?.value.trim() || '';
  const audienceVal = document.getElementById('order-audience')?.value || 'Global';
  const isKo = currentLang === 'ko';
  const newOrder = {
    date: new Date().toLocaleString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
    }),
    id: details.id,
    email: emailVal,
    category: currentPackage.categoryName,
    package: currentPackage.tierName,
    audience: audienceVal,
    quantity: orderQuantity,
    basePrice: currentPackage.basePrice,
    totalPaid: formatPrice(currentPackage.basePrice * orderQuantity),
    status: 'Completed',
    isTest: Boolean(details.isTest)
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
${dict['receipt-audience'].padEnd(15)} : ${newOrder.audience}
${dict['receipt-qty'].padEnd(15)} : ${newOrder.quantity}
${dict['receipt-baseprice'].padEnd(15)} : ${formatPrice(newOrder.basePrice)}
${dict['receipt-total'].padEnd(15)} : ${newOrder.totalPaid}
${dict['receipt-status'].padEnd(15)} : ${isKo ? '완료됨' : newOrder.status}
-----------------------------------
${dict['receipt-method'].padEnd(15)} : ${dict['receipt-method-val']}
===================================`;
  const encodedReceipt = encodeURIComponent(receiptText);
  window.location.href = `${GOOGLE_FORM_URL}${encodedReceipt}`;
}

function renderOrders() {
  const tbody = document.getElementById('orders-tbody');
  const empty = document.getElementById('no-orders-msg');
  if (!tbody || !empty) return;
  const orders = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
  if (!orders.length) {
    tbody.innerHTML = '';
    empty.style.display = 'block';
    return;
  }
  empty.style.display = 'none';
  tbody.innerHTML = orders.map(order => `
    <tr>
      <td>${order.date}</td>
      <td>${order.id}</td>
      <td>${order.package}</td>
      <td>${order.audience}</td>
      <td>${order.quantity}</td>
      <td>${order.totalPaid}</td>
      <td>${order.status}</td>
    </tr>
  `).join('');
}

function init() {
  document.documentElement.lang = currentLang;
  applyTranslations();
  renderPackages();
  renderFaq();
  renderOrders();
  navigate('home');
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
