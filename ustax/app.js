// USTAX app logic
const packageCatalog = {
  tax: {
    title_en: 'US Tax & Incorporation Advisory',
    title_ko: '미국 세무 & 법인설립 자문',
    packages: [
      {
        id: 'starter',
        name_en: 'Starter Setup',
        name_ko: '스타터 세팅',
        desc_en: 'Perfect for founders who need a clear US market entry roadmap, entity checklist, and compliance starter pack.',
        desc_ko: '미국 진출 로드맵, 법인설립 체크리스트, 기본 컴플라이언스 패키지가 필요한 창업자에게 적합합니다.',
        price: 71,
        featured: false,
        tag_en: 'Entity Setup',
        tag_ko: '법인설립',
        iconClass: 'starter-color',
        icon: 'fa-solid fa-seedling',
        features_en: ['Entity type comparison', 'State selection guidance', 'Required document checklist', 'Email support'],
        features_ko: ['법인 형태 비교 안내', '주(State) 선택 가이드', '필수 서류 체크리스트', '이메일 지원']
      },
      {
        id: 'filing',
        name_en: 'Cross-Border Filing',
        name_ko: '크로스보더 신고',
        desc_en: 'Tax filing support for overseas founders, US e-commerce sellers, and cross-border operators.',
        desc_ko: '해외 창업자, 미국 이커머스 셀러, 크로스보더 운영자를 위한 세금 신고 지원 서비스입니다.',
        price: 142,
        featured: true,
        tag_en: 'Tax Filing',
        tag_ko: '세금 신고',
        iconClass: 'filing-color',
        icon: 'fa-solid fa-file-invoice-dollar',
        features_en: ['Tax filing review', 'Income & expense mapping', 'Deadline reminders', 'Priority support'],
        features_ko: ['세금 신고 검토', '수입/지출 분류', '마감일 알림 제공', '우선 지원']
      },
      {
        id: 'advisory',
        name_en: 'USCPA Advisory',
        name_ko: 'USCPA 어드바이저리',
        desc_en: 'Advanced advisory for company structure, recurring bookkeeping, and expansion-ready financial operations.',
        desc_ko: '법인 구조, 반복 회계 관리, 사업 확장용 재무 운영까지 지원하는 고급 자문 서비스입니다.',
        price: 284,
        featured: false,
        tag_en: 'Advisory',
        tag_ko: '자문',
        iconClass: 'advisory-color',
        icon: 'fa-solid fa-building-columns',
        features_en: ['Company structure review', 'Bookkeeping process design', 'Cross-border planning', 'Strategy call included'],
        features_ko: ['법인 구조 검토', '장부 관리 프로세스 설계', '크로스보더 세무 계획', '전략 상담 포함']
      }
    ]
  }
};

const faqData = [
  {
    question_en: 'Who is this service for?',
    answer_en: 'Founders, agency owners, Amazon sellers, SaaS teams, and overseas businesses that need US tax and incorporation guidance.',
    question_ko: '이 서비스는 누구를 위한 것인가요?',
    answer_ko: '미국 세무 및 법인설립 가이드가 필요한 창업자, 에이전시, 아마존 셀러, SaaS 팀, 해외 사업자용 서비스입니다.'
  },
  {
    question_en: 'What do I receive after payment?',
    answer_en: 'You will receive a confirmation receipt, order log, and next-step guidance through our Google Form workflow.',
    question_ko: '결제 후 무엇을 받나요?',
    answer_ko: '결제 완료 후 확인 영수증, 주문 기록, 다음 단계 안내가 Google Form 워크플로우로 전달됩니다.'
  },
  {
    question_en: 'Can you handle cross-border cases?',
    answer_en: 'Yes. The service is designed for international operators, remote founders, and cross-border business setups.',
    question_ko: '크로스보더 케이스도 가능한가요?',
    answer_ko: '네. 해외 운영자, 원격 창업자, 크로스보더 사업 셋업을 위해 설계된 서비스입니다.'
  },
  {
    question_en: 'Is the checkout secure?',
    answer_en: 'Yes. Checkout uses PayPal with SSL-secured handling and a secure checkout payment checkout button for QA.',
    question_ko: '결제는 안전한가요?',
    answer_ko: '네. PayPal과 SSL 보안 결제를 사용하며 QA용 가격 텍스트를 눌러 결제 진행 버튼도 제공합니다.'
  }
];

const translations = {
  en: {
    'logo-subtitle': 'US TAX BOOST!',
    'nav-home': 'Home',
    'nav-orders': 'Orders',
    'hero-badge': 'Cross-Border Tax Support',
    'hero-title': 'USTAX — US Tax & Incorporation Advisory',
    'hero-desc': 'Get practical guidance for US entity setup, tax filing, and cross-border financial operations.',
    'btn-explore': 'Explore Packages',
    'btn-orders': 'My Orders',
    'overview-title': 'What this service covers',
    'overview-desc': 'Built for global founders who need clear next steps for US business formation and tax compliance.',
    'highlight-1-title': 'Entity Setup',
    'highlight-1-desc': 'Choose the right structure before you register.',
    'highlight-2-title': 'Tax Filing',
    'highlight-2-desc': 'Keep filings organized and on schedule.',
    'highlight-3-title': 'Advisory',
    'highlight-3-desc': 'Stay ready for scaling, bookkeeping, and expansion.',
    'packages-title': 'Service Packages',
    'packages-subtitle': 'Select the package that matches your current stage.',
    'faq-title': 'Frequently Asked Questions',
    'faq-subtitle': 'Quick answers before checkout.',
    'orders-title': 'My Orders',
    'orders-subtitle': 'Your completed orders are stored locally in this browser.',
    'th-date': 'Order Date',
    'th-order-id': 'Transaction ID',
    'th-product': 'Package',
    'th-jurisdiction': 'Jurisdiction',
    'th-qty': 'Qty',
    'th-total': 'Total Paid',
    'th-status': 'Status',
    'no-orders-msg': 'No purchase records yet. Complete your first checkout to see it here.',
    'modal-title': 'Configure Order',
    'modal-desc': 'Review the package, choose quantity, and complete secure PayPal checkout.',
    'modal-base-pkg': 'Base Package:',
    'modal-base-price-label': 'Base Price:',
    'modal-email-label': 'Email Address *',
    'modal-email-placeholder': 'name@example.com',
    'modal-email-error': 'Please enter a valid email address.',
    'modal-jurisdiction-label': 'Tax Jurisdiction:',
    'modal-qty': 'Quantity:',
    'modal-total-amt': 'Total Amount:',
    'modal-test-btn': 'Click price to payment checkout',
    'badge-ssl': 'SSL Secured Checkout',
    'badge-paypal': 'PayPal Verified',
    'featured-badge': 'Best Seller',
    'order-button': 'Order Package',
    'foot-services': 'Services',
    'foot-support': 'Support',
    'foot-contact': 'Contact support: snsherocom@gmail.com',
    'foot-copy': '&copy; 2026 BibleForAI. All rights reserved.',
    'receipt-header': 'BIBLEFORAI - USTAX RECEIPT',
    'receipt-date': 'Order Date',
    'receipt-txid': 'Transaction ID',
    'receipt-email': 'Customer Email',
    'receipt-type': 'Service Type',
    'receipt-size': 'Package',
    'receipt-jurisdiction': 'Jurisdiction',
    'receipt-qty': 'Quantity',
    'receipt-baseprice': 'Base Price',
    'receipt-total': 'Total Paid',
    'receipt-status': 'Status',
    'receipt-method': 'Payment Method',
    'receipt-method-val': 'PayPal Secure Checkout'
  },
  ko: {
    'logo-subtitle': '미국 세무 부스트!',
    'nav-home': '홈',
    'nav-orders': '주문 내역',
    'hero-badge': '크로스보더 세무 지원',
    'hero-title': 'USTAX — 미국 세무 & 법인설립 자문',
    'hero-desc': '미국 법인설립, 세금 신고, 크로스보더 재무 운영에 필요한 실무 가이드를 제공합니다.',
    'btn-explore': '패키지 보기',
    'btn-orders': '내 주문',
    'overview-title': '서비스 범위',
    'overview-desc': '미국 사업 설립과 세무 규정 준수가 필요한 글로벌 창업자를 위해 설계되었습니다.',
    'highlight-1-title': '법인설립',
    'highlight-1-desc': '등록 전 가장 적합한 구조를 선택하세요.',
    'highlight-2-title': '세금 신고',
    'highlight-2-desc': '신고 일정과 자료를 체계적으로 관리합니다.',
    'highlight-3-title': '자문',
    'highlight-3-desc': '확장, 장부 관리, 사업 운영을 위한 준비를 돕습니다.',
    'packages-title': '서비스 패키지',
    'packages-subtitle': '현재 단계에 맞는 패키지를 선택하세요.',
    'faq-title': '자주 묻는 질문',
    'faq-subtitle': '결제 전 빠르게 확인하세요.',
    'orders-title': '내 주문 내역',
    'orders-subtitle': '완료된 주문은 이 브라우저에 로컬 저장됩니다.',
    'th-date': '주문 날짜',
    'th-order-id': '거래 ID',
    'th-product': '패키지',
    'th-jurisdiction': '관할',
    'th-qty': '수량',
    'th-total': '총 결제금액',
    'th-status': '상태',
    'no-orders-msg': '구매 기록이 없습니다. 첫 결제를 완료하면 여기에 표시됩니다.',
    'modal-title': '주문 설정',
    'modal-desc': '패키지를 확인하고 수량을 선택한 뒤 안전한 PayPal 결제를 진행하세요.',
    'modal-base-pkg': '기본 패키지:',
    'modal-base-price-label': '기본 가격:',
    'modal-email-label': '이메일 주소 *',
    'modal-email-placeholder': 'name@example.com',
    'modal-email-error': '올바른 이메일 주소를 입력해주세요.',
    'modal-jurisdiction-label': '세무 관할:',
    'modal-qty': '수량:',
    'modal-total-amt': '총 결제금액:',
    'modal-test-btn': '가격 텍스트를 눌러 결제 진행',
    'badge-ssl': 'SSL 보안 결제',
    'badge-paypal': 'PayPal 인증됨',
    'featured-badge': '베스트셀러',
    'order-button': '패키지 주문',
    'foot-services': '서비스',
    'foot-support': '지원',
    'foot-contact': '문의 지원: snsherocom@gmail.com',
    'foot-copy': '&copy; 2026 BibleForAI. All rights reserved.',
    'receipt-header': 'BIBLEFORAI - USTAX 영수증',
    'receipt-date': '주문 날짜',
    'receipt-txid': '거래 ID',
    'receipt-email': '고객 이메일',
    'receipt-type': '서비스 종류',
    'receipt-size': '패키지',
    'receipt-jurisdiction': '관할',
    'receipt-qty': '수량',
    'receipt-baseprice': '기본 가격',
    'receipt-total': '총 결제금액',
    'receipt-status': '상태',
    'receipt-method': '결제 방법',
    'receipt-method-val': 'PayPal 안전 결제'
  }
};

let currentLang = localStorage.getItem('bibleforai_lang') || ((navigator.language || '').toLowerCase().startsWith('ko') ? 'ko' : 'en');
let currentView = 'home';
let currentPackage = null;
let orderQuantity = 1;

function formatPrice(usdPrice, includeUnit = true) {
  if (currentLang === 'ko') {
    const krw = Math.round(usdPrice * 1400);
    return includeUnit ? `₩${krw.toLocaleString()} KRW` : `₩${krw.toLocaleString()}`;
  }
  const formatted = Number.isInteger(usdPrice) ? usdPrice.toLocaleString() : usdPrice.toFixed(2);
  return includeUnit ? `$${formatted} USD` : `$${formatted}`;
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

  const dict = translations[currentLang];
  document.documentElement.lang = currentLang;
  document.title = currentLang === 'ko'
    ? 'BibleForAI - USTAX | 미국 세무 & 법인설립 자문'
    : 'BibleForAI - USTAX | US Tax & Incorporation Advisory';

  const metaMap = {
    'meta[name="description"]': currentLang === 'ko'
      ? '미국 법인설립, 세금 신고, 크로스보더 재무 운영을 위한 실무 자문 서비스.'
      : 'Practical advisory for US entity setup, tax filing, and cross-border financial operations.',
    'meta[property="og:title"]': document.title,
    'meta[property="og:description"]': currentLang === 'ko'
      ? '글로벌 창업자를 위한 미국 세무 & 법인설립 자문 서비스.'
      : 'US tax and incorporation advisory for global founders.',
    'meta[name="twitter:title"]': document.title,
    'meta[name="twitter:description"]': currentLang === 'ko'
      ? '글로벌 창업자를 위한 미국 세무 & 법인설립 자문 서비스.'
      : 'US tax and incorporation advisory for global founders.'
  };

  Object.entries(metaMap).forEach(([selector, value]) => {
    const el = document.querySelector(selector);
    if (el) el.content = value;
  });

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const translation = dict[key];
    if (translation) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') el.placeholder = translation;
      else el.innerHTML = translation;
    }
  });

  const selector = document.getElementById('language-selector');
  if (selector) selector.value = currentLang;
}

function renderPackages() {
  const container = document.getElementById('tax-packages');
  if (!container) return;

  const isKo = currentLang === 'ko';
  const category = packageCatalog.tax;
  container.innerHTML = category.packages.map(pkg => `
    <article class="package-card ${pkg.featured ? 'featured' : ''}">
      <div class="package-topline">
        <span class="package-tag">${isKo ? pkg.tag_ko : pkg.tag_en}</span>
        ${pkg.featured ? `<span class="featured-pill">${translations[currentLang]['featured-badge']}</span>` : ''}
      </div>
      <div class="card-icon ${pkg.iconClass}"><i class="${pkg.icon}"></i></div>
      <h3>${isKo ? pkg.name_ko : pkg.name_en}</h3>
      <p class="package-desc">${isKo ? pkg.desc_ko : pkg.desc_en}</p>
      <div class="package-price-box">
        <span class="price">${formatPrice(pkg.price, false)}</span>
        <span class="currency">${currentLang === 'ko' ? 'KRW' : 'USD'}</span>
      </div>
      <ul class="package-features">
        ${(isKo ? pkg.features_ko : pkg.features_en).map(item => `<li><i class="fa-solid fa-circle-check"></i> ${item}</li>`).join('')}
      </ul>
      <button class="btn-buy" onclick="openPurchaseModal('tax', '${pkg.id}')">
        <i class="fa-solid fa-credit-card"></i> ${translations[currentLang]['order-button']}
      </button>
    </article>
  `).join('');
}

function renderFaq() {
  const container = document.getElementById('faq-grid');
  if (!container) return;
  const isKo = currentLang === 'ko';
  container.innerHTML = faqData.map(item => `
    <article class="faq-item">
      <h3>${isKo ? item.question_ko : item.question_en}</h3>
      <p>${isKo ? item.answer_ko : item.answer_en}</p>
    </article>
  `).join('');
}

function navigate(viewId) {
  currentView = viewId;
  document.querySelectorAll('.view-section').forEach(section => section.classList.remove('active'));
  const target = document.getElementById(`${viewId}-view`);
  if (target) target.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleMobileMenu() {
  const drawer = document.getElementById('mobile-drawer');
  if (drawer) drawer.classList.toggle('active');
}

function renderOrders() {
  const orderLogs = JSON.parse(localStorage.getItem('ustax_orders') || '[]');
  const tbody = document.getElementById('orders-tbody');
  const noOrdersMsg = document.getElementById('no-orders-msg');
  if (!tbody || !noOrdersMsg) return;

  if (!orderLogs.length) {
    tbody.innerHTML = '';
    noOrdersMsg.style.display = 'block';
    return;
  }

  noOrdersMsg.style.display = 'none';
  const isKo = currentLang === 'ko';
  tbody.innerHTML = orderLogs.map(order => `
    <tr>
      <td>${order.date}</td>
      <td class="tx-id">${order.id}</td>
      <td>${order.package}</td>
      <td>${order.jurisdiction || 'Global'}</td>
      <td>${order.quantity}</td>
      <td><strong>${order.totalPaid}</strong></td>
      <td><span class="status-badge">${isKo ? '완료됨' : order.status}</span></td>
    </tr>
  `).join('');
}

function getCategoryIcon(category) {
  switch (category) {
    case 'tax': return 'fa-solid fa-file-invoice-dollar';
    default: return 'fa-solid fa-circle-dollar-to-slot';
  }
}

function validateEmailField() {
  const input = document.getElementById('order-email');
  const error = document.getElementById('email-error');
  if (!input) return true;
  const value = input.value.trim();
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  if (!ok) {
    input.style.borderColor = '#ef4444';
    if (error) {
      error.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> ${translations[currentLang]['modal-email-error']}`;
      error.style.display = 'block';
    }
    return false;
  }
  input.style.borderColor = 'var(--border)';
  if (error) error.style.display = 'none';
  return true;
}

function updateModalPrice() {
  if (!currentPackage) return;
  const qtyInput = document.getElementById('order-quantity');
  let qty = parseInt(qtyInput.value, 10);
  if (!Number.isFinite(qty) || qty < 1) qty = 1;
  orderQuantity = qty;
  qtyInput.value = qty;
  document.getElementById('modal-total-price').innerText = formatPrice(currentPackage.basePrice * orderQuantity);
}

function adjustQty(delta) {
  const qtyInput = document.getElementById('order-quantity');
  qtyInput.value = Math.max(1, (parseInt(qtyInput.value, 10) || 1) + delta);
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
}

function openPurchaseModal(categoryKey, packageId) {
  const category = packageCatalog[categoryKey];
  const pkg = category.packages.find(item => item.id === packageId);
  if (!pkg) return;

  currentPackage = {
    categoryKey,
    categoryName: currentLang === 'ko' ? category.title_ko : category.title_en,
    tierName: currentLang === 'ko' ? pkg.name_ko : pkg.name_en,
    basePrice: pkg.price,
    icon: pkg.icon
  };
  orderQuantity = 1;

  document.getElementById('modal-product-title').innerText = currentPackage.categoryName;
  document.getElementById('modal-package-name').innerText = currentPackage.tierName;
  document.getElementById('modal-base-price').innerText = formatPrice(pkg.price);
  document.getElementById('order-quantity').value = '1';
  document.getElementById('purchase-modal').classList.add('active');

  const emailInput = document.getElementById('order-email');
  if (emailInput) emailInput.value = '';
  const emailError = document.getElementById('email-error');
  if (emailError) emailError.style.display = 'none';

  updateModalPrice();
  initPayPalButtons();

  setTimeout(() => {
    const card = document.querySelector('.modal-card');
    const target = document.querySelector('.paypal-wrapper') || document.getElementById('paypal-button-container');
    if (card && target) card.scrollTop = Math.max(0, target.offsetTop - 20);
  }, 120);
}

function closeModal() {
  document.getElementById('purchase-modal').classList.remove('active');
  const container = document.getElementById('paypal-button-container');
  if (container) container.innerHTML = '';
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
  container.innerHTML = '';
  if (typeof paypal === 'undefined') {
    container.innerHTML = '<p style="color:#ef4444;text-align:center;padding:1rem;font-weight:600;">PayPal is unavailable.</p>';
    return;
  }

  paypal.Buttons({
    style: { layout: 'vertical', color: 'blue', shape: 'rect', label: 'pay' },
    onClick: (data, actions) => validateEmailField() ? actions.resolve() : actions.reject(),
    createOrder: (data, actions) => {
      const jurisdiction = document.getElementById('order-jurisdiction').value;
      const amount = (currentPackage.basePrice * orderQuantity).toFixed(2);
      return actions.order.create({
        purchase_units: [{
          description: `${currentPackage.categoryName} - ${currentPackage.tierName} [Jurisdiction: ${jurisdiction}] x${orderQuantity}`,
          amount: { currency_code: 'USD', value: amount }
        }]
      });
    },
    onApprove: (data, actions) => actions.order.capture().then(details => {
      saveLocalOrder(details);
      closeModal();
    }),
    onError: err => {
      console.error('PayPal error:', err);
      alert('Payment error occurred. Please try again.');
    }
  }).render('#paypal-button-container');
}

function saveLocalOrder(details) {
  const logs = JSON.parse(localStorage.getItem('ustax_orders') || '[]');
  const jurisdiction = document.getElementById('order-jurisdiction').value;
  const emailVal = document.getElementById('order-email') ? document.getElementById('order-email').value.trim() : '';
  const dict = translations[currentLang];

  const record = {
    date: new Date().toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
    id: details.id,
    email: emailVal,
    package: currentPackage.tierName,
    jurisdiction,
    quantity: orderQuantity,
    basePrice: currentPackage.basePrice,
    totalPaid: formatPrice(currentPackage.basePrice * orderQuantity),
    status: 'Completed'
  };
  logs.unshift(record);
  localStorage.setItem('ustax_orders', JSON.stringify(logs));
  renderOrders();

  const receiptText = `===================================
   ${dict['receipt-header']}
===================================
${dict['receipt-date'].padEnd(16)} : ${record.date}
${dict['receipt-txid'].padEnd(16)} : ${record.id}
${dict['receipt-email'].padEnd(16)} : ${record.email}
${dict['receipt-type'].padEnd(16)} : ${currentPackage.categoryName}
${dict['receipt-size'].padEnd(16)} : ${record.package}
${dict['receipt-jurisdiction'].padEnd(16)} : ${record.jurisdiction}
${dict['receipt-qty'].padEnd(16)} : ${record.quantity}
${dict['receipt-baseprice'].padEnd(16)} : ${formatPrice(record.basePrice)}
${dict['receipt-total'].padEnd(16)} : ${record.totalPaid}
${dict['receipt-status'].padEnd(16)} : ${currentLang === 'ko' ? '완료됨' : record.status}
-----------------------------------
${dict['receipt-method'].padEnd(16)} : ${dict['receipt-method-val']}
===================================`;

  const encodedReceipt = encodeURIComponent(receiptText);
  window.location.href = `https://docs.google.com/forms/d/e/1FAIpQLScMPqbEWWttS5mb1m_krsO_kco24ImpgvYVSbc7zO0nEVmYFw/viewform?entry.1059822061=${encodedReceipt}`;
}

function setupHeaderScroll() {
  const header = document.getElementById('app-header');
  window.addEventListener('scroll', () => {
    header?.classList.toggle('scrolled', window.scrollY > 50);
  });
}

function changeLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('bibleforai_lang', lang);
  applyTranslations();
  renderPackages();
  renderFaq();
  renderOrders();
}

document.addEventListener('DOMContentLoaded', () => {
  applyTranslations();
  renderPackages();
  renderFaq();
  renderOrders();
  setupHeaderScroll();
});

// Expose variables globally to prevent ReferenceErrors in inline HTML scripts/handlers
if (typeof navigate !== 'undefined') { window.navigate = navigate; }
if (typeof currentLang !== 'undefined') { window.currentLang = currentLang; }

window.openPurchaseModal = openPurchaseModal;
window.closeModal = closeModal;
window.adjustQty = adjustQty;
window.changeLanguage = changeLanguage;
