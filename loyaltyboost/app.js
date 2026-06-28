// App State
let currentView = 'home';
let currentPackage = null;
let orderQuantity = 1;
let paypalButtonInstance = null;

const messages = {
  fieldError: document.getElementById('order-email-error'),
  baseName: document.getElementById('modal-package-name'),
  basePrice: document.getElementById('modal-base-price'),
  totalPrice: document.getElementById('modal-total-price')
};

const ORDER_ITEMS_KEY = 'loyaltyboost_order_items';

const packageCatalog = {
  starter: {
    title: 'Starter Loyalty',
    packages: [
      { id: 'st-1', title: 'Mini Rewards Setup', price: 60, featured: false, features: ['Loyalty rewards framework', 'Tier support policy handout', '2-channel follow-up flows'] },
      { id: 'st-2', title: 'Retention Mini Plan', price: 80, featured: true, features: ['Birthday reward rule', 'VIP tier naming', 'Winning-loop review'] }
    ]
  },
  pro: {
    title: 'Pro Retention',
    packages: [
      { id: 'pr-1', title: 'Loyalty Automation', price: 140, featured: false, features: ['Tiered design', 'Referral reward rules', 'Email or chat automation'] },
      { id: 'pr-2', title: 'Retention Playbook', price: 160, featured: true, features: ['Retention dashboard', 'Abandoned-membership flow', '30-day feedback window'] }
    ]
  },
  enterprise: {
    title: 'Enterprise LTV',
    packages: [
      { id: 'en-1', title: 'LTV Program Suite', price: 200, featured: false, features: ['Cohort memo', 'Lifecycle playbook', '60-minute advisory session'] },
      { id: 'en-2', title: 'Whitelabel Retention', price: 240, featured: true, features: ['Client-tailored rewards', 'NPS survey support', 'Escalation escalation'] }
    ]
  }
};

const googleFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLScMPqbEWWttS5mb1m_krsO_kco24ImpgvYVSbc7zO0nEVmYFw/viewform';

function formatPrice(value) {
  return '$' + Number(value).toFixed(2);
}

// Orders can be initialized by authorizeUserSession if needed here.

function switchView(viewId) {
  document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
  const target = document.getElementById(viewId + '-view');
  if (target) target.classList.add('active');
  currentView = viewId;
  document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
  const section = document.getElementById(viewId + '-view');
  if (section) section.classList.add('active');
}

function closeAllModals() {
  document.querySelectorAll('.modal, .test-modal, .receipt-modal').forEach(el => el.style.display = 'none');
}

document.addEventListener('mousedown', (event) => {
  const isClickInsideModal = event.target.closest('.modal, .test-modal, .receipt-modal');
  if (!isClickInsideModal) {
    closeAllModals();
  }
});

function toggleMobileMenu() {
  const drawer = document.getElementById('mobile-drawer');
  if (!drawer) return;
  drawer.classList.toggle('active');
}
document.addEventListener('click', (event) => {
  const clickedInsideDrawer = event.target.closest('.mobile-drawer');
  const clickedToggleButton = event.target.closest('#menu-toggle');
  if (!clickedInsideDrawer && !clickedToggleButton) {
    const drawer = document.getElementById('mobile-drawer');
    if (drawer && drawer.classList.contains('active')) {
      drawer.classList.remove('active');
    }
  }
});

function changeLanguage(lang) {
  document.getElementById('bibleforai_lang') && (document.documentElement.lang = lang);
  localStorage.setItem('bibleforai_lang', lang);
  applyTranslations();
  closeAllModals();
}

function applyTranslations() {
  const lang = localStorage.getItem('bibleforai_lang') || 'ko';
  const textMap = {
    en: {
      'logo-subtitle': 'LOYALTYBOOST!',
      'nav-home': 'Home',
      'nav-starter': 'Starter',
      'nav-pro': 'Pro',
      'nav-enterprise': 'Enterprise',
      'btn-orders': 'My Orders',
      'hero-badge': 'AI-Powered Loyalty & Retention',
      'hero-title': 'LOYALTYBOOST — Customer Loyalty & Retention',
      'hero-desc': 'Turn buyers into repeat buyers with custom loyalty programs, reward design, and retention consulting for B2C brands.',
      'btn-explore': 'Explore Packages',
      'btn-how': 'How It Works',
      'stat-repeat': 'Higher Retention',
      'stat-rewards': 'Tiered Loyalty',
      'stat-retention': 'Loyalty Design',
      'stat-ltv': 'Lifetime Value',
      'sec-packages-title': 'Choose Your Retention Package',
      'sec-packages-subtitle': 'Pick a loyalty consulting package, share your business model, and we will build a repeat-purchase system tailored to your customers.',
      'card-starter-title': 'Starter Loyalty',
      'card-starter-desc': 'Mini loyalty plan with basic reward flows. Great for new stores that want a quick retention lift.',
      'card-pro-title': 'Pro Retention',
      'card-pro-desc': 'Tiered reward design, referral prompts, and email or chat automation rules.',
      'card-enterprise-title': 'Enterprise LTV',
      'card-enterprise-desc': 'Full lifecycle retention playbook with cohort analysis, advanced automation and review consulting.',
      'card-view-pricing': 'View Pricing',
      'how-title': 'How LOYALTYBOOST Works',
      'how-desc': 'We combine behavioral insights with AI-assisted program design to make every customer relationship more valuable over time.',
      'how-step1-bold': '1. Consultation:',
      'how-step1-text': 'We review your purchase history, channels and retention goals.',
      'how-step2-bold': '2. Program Design:',
      'how-step2-text': 'We create a tailored points, tier and reward structure for your brand.',
      'how-step3-bold': '3. Automation Setup:',
      'how-step3-text': 'We map rewards, triggers and follow-up flows into your CRM or messaging tools.',
      'how-step4-bold': '4. Review:',
      'how-step4-text': 'We review KPIs, optimize communications, and expand winning retention loops.',
      'sec-industries-title': 'Industries We <span>Serve</span>',
      'view-basic-sub': 'Mini loyalty plan with basic reward flows. Ideal for new stores that want a quick retention lift.',
      'view-pro-sub': 'Tiered reward design, referral prompts, and email or chat automation rules for repeat buyers.',
      'view-enterprise-sub': 'Full lifecycle retention playbook with cohort analysis, advanced automation and review consulting for mature brands.',
      'view-orders-title': 'My Purchase History',
      'view-orders-sub': 'Review your completed orders.',
      'th-date': 'Order Date',
      'th-order-id': 'Transaction ID',
      'th-product': 'Product',
      'th-tier': 'Package Tier',
      'th-brand': 'Brand',
      'th-qty': 'Quantity',
      'th-total': 'Total Paid',
      'th-status': 'Status',
      'no-orders-msg': 'No purchase records found yet.',
      'modal-title': 'Configure Order',
      'modal-desc': 'Configure details and complete secure PayPal payment.',
      'modal-base-pkg': 'Base Package:',
      'modal-base-price-label': 'Base Price:',
      'modal-email-label': 'Email Address *',
      'modal-email-placeholder': 'name@example.com',
      'modal-email-error': 'Please enter a valid email address.',
      'modal-brand-label': 'Brand Name',
      'modal-brand-placeholder': 'e.g. BeautyCo',
      'modal-industry-label': 'Industry',
      'modal-industry-placeholder': 'e.g. D2C skincare',
      'modal-goals-label': 'Retention Goals',
      'modal-goals-placeholder': 'e.g. increase repeat purchases and referral signups',
      'modal-qty': 'Quantity:',
      'modal-total-amt': 'Total Amount:',
      'modal-test-btn': 'Click price to test checkout',
      'badge-ssl': 'SSL Secured Checkout',
      'badge-paypal': 'PayPal Verified',
      'foot-packages': 'Loyalty Packages',
      'foot-why': 'Why LOYALTYBOOST',
      'foot-repeat': 'Repeat Buyer Program',
      'foot-rewards': 'Tiered Rewards',
      'foot-automation': 'Retention Automation',
      'foot-contact': 'Contact support: snsherocom@gmail.com',
      'foot-copy': '&copy; 2026 BibleForAI LOYALTYBOOST. All rights reserved.',
      'order-button': 'Order Package',
      'featured-badge': 'Best Seller',
      'receipt-header': 'BIBLEFORAI - LOYALTYBOOST RECEIPT',
      'receipt-date': 'Order Date',
      'receipt-txid': 'Transaction ID',
      'receipt-email': 'Customer Email',
      'receipt-product': 'Product',
      'receipt-size': 'Package Size',
      'receipt-brand': 'Brand',
      'receipt-qty': 'Quantity',
      'receipt-baseprice': 'Base Price',
      'receipt-total': 'Total Paid',
      'receipt-status': 'Status',
      'receipt-method': 'Payment Method',
      'receipt-method-val': 'PayPal Secure Checkout'
    },
    ko: {
      'logo-subtitle': 'LOYALTYBOOST!',
      'nav-home': '홈',
      'nav-starter': '스타터',
      'nav-pro': '프로',
      'nav-enterprise': '엔터프라이즈',
      'btn-orders': '내 주문 내역',
      'hero-badge': 'AI 기반 충성도 및 리텐션',
      'hero-title': 'LOYALTYBOOST — Customer Loyalty & Retention',
      'hero-desc': 'AI 기반 충성도 및 리텐션 컨설팅으로 반복 구매와 장기 브랜드 팬을 만드세요.',
      'btn-explore': '패키지 둘러보기',
      'btn-how': '이용 방법',
      'stat-repeat': 'Higher Retention',
      'stat-rewards': 'Tiered Loyalty',
      'stat-retention': 'Loyalty Design',
      'stat-ltv': 'Lifetime Value',
      'sec-packages-title': 'Choose Your Retention Package',
      'sec-packages-subtitle': 'Pick a loyalty consulting package, share your business model, and we will build a repeat-purchase system tailored to your customers.',
      'card-starter-title': 'Starter Loyalty',
      'card-starter-desc': 'Mini loyalty plan with basic reward flows. Great for new stores that want a quick retention lift.',
      'card-pro-title': 'Pro Retention',
      'card-pro-desc': 'Tiered reward design, referral prompts, and email or chat automation rules.',
      'card-enterprise-title': 'Enterprise LTV',
      'card-enterprise-desc': 'Full lifecycle retention playbook with cohort analysis, advanced automation and review consulting.',
      'card-view-pricing': 'View Pricing',
      'how-title': 'How LOYALTYBOOST Works',
      'how-desc': 'We combine behavioral insights with AI-assisted program design to make every customer relationship more valuable over time.',
      'how-step1-bold': '1. Consultation:',
      'how-step1-text': 'We review your purchase history, channels and retention goals.',
      'how-step2-bold': '2. Program Design:',
      'how-step2-text': 'We create a tailored points, tier and reward structure for your brand.',
      'how-step3-bold': '3. Automation Setup:',
      'how-step3-text': 'We map rewards, triggers and follow-up flows into your CRM or messaging tools.',
      'how-step4-bold': '4. Review:',
      'how-step4-text': 'We review KPIs, optimize communications, and expand winning retention loops.',
      'sec-industries-title': 'Industries We <span>Serve</span>',
      'view-basic-sub': 'Mini loyalty plan with basic reward flows. Ideal for new stores that want a quick retention lift.',
      'view-pro-sub': 'Tiered reward design, referral prompts, and email or chat automation rules for repeat buyers.',
      'view-enterprise-sub': 'Full lifecycle retention playbook with cohort analysis, advanced automation and review consulting for mature brands.',
      'view-orders-title': '내 구매 히스토리',
      'view-orders-sub': '완료한 주문 내역을 확인하세요.',
      'th-date': '주문 날짜',
      'th-order-id': '거래 ID',
      'th-product': '상품',
      'th-tier': '패키지 등급',
      'th-brand': '브랜드',
      'th-qty': '수량',
      'th-total': '총 결제금액',
      'th-status': '상태',
      'no-orders-msg': '구매 기록이 없습니다.',
      'modal-title': '주문 설정',
      'modal-desc': '세부사항을 설정하고 안전한 PayPal 결제를 진행하세요.',
      'modal-base-pkg': '기본 패키지:',
      'modal-base-price-label': '기본 가격:',
      'modal-email-label': '이메일 주소 *',
      'modal-email-placeholder': 'name@example.com',
      'modal-email-error': '올바른 이메일 주소를 입력해주세요.',
      'modal-brand-label': '브랜드명',
      'modal-brand-placeholder': '예: 뷰티코',
      'modal-industry-label': '업종',
      'modal-industry-placeholder': '예: D2C 스킨케어',
      'modal-goals-label': '리텐션 목표',
      'modal-goals-placeholder': '예: 재구매율 및 추천 가입 증가',
      'modal-qty': '수량:',
      'modal-total-amt': '총 결제금액:',
      'modal-test-btn': '가격 텍스트를 눌러 테스트 결제',
      'badge-ssl': 'SSL 보안 결제 지원',
      'badge-paypal': 'PayPal 인증됨',
      'foot-packages': 'Loyalty Packages',
      'foot-why': 'Why LOYALTYBOOST',
      'foot-repeat': 'Repeat Buyer Program',
      'foot-rewards': 'Tiered Rewards',
      'foot-automation': 'Retention Automation',
      'foot-contact': '문의 지원: snsherocom@gmail.com',
      'foot-copy': '&copy; 2026 BibleForAI LOYALTYBOOST. All rights reserved.',
      'order-button': '패키지 주문하기',
      'featured-badge': '베스트 셀러',
      'receipt-header': 'BIBLEFORAI - LOYALTYBOOST 영수증',
      'receipt-date': '주문 날짜',
      'receipt-txid': '거래 ID',
      'receipt-email': '고객 이메일',
      'receipt-product': '상품',
      'receipt-size': '패키지 등급',
      'receipt-brand': '브랜드',
      'receipt-qty': '수량',
      'receipt-baseprice': '기본 가격',
      'receipt-total': '총 결제금액',
      'receipt-status': '진행 상태',
      'receipt-method': '결제 방법',
      'receipt-method-val': 'PayPal 안전 결제'
    }
  };

  const currentLang = lang === 'ko' ? 'ko' : 'en';
  const tMap = textMap[currentLang];

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (tMap[key] !== undefined) {
      el.innerHTML = tMap[key];
    }
  });

  // Sync select value without triggering full rerender loops.
  const langSelect = document.getElementById('language-selector');
  if (langSelect && langSelect.value !== lang) langSelect.value = lang;
}

function openPurchaseModal(categoryKey, packageId) {
  const category = packageCatalog[categoryKey];
  if (!category) return;

  const matched = category.packages.find((pkg) => pkg.id === packageId);
  const pkg = matched || category.packages[0];
  currentPackage = { categoryKey, packageId: pkg.id };

  messages.baseName.textContent = pkg.title;
  messages.basePrice.textContent = formatPrice(pkg.price);
  updateTotalPrice();

  const modal = document.getElementById('purchase-modal');
  if (modal) modal.style.display = 'block';

  setTimeout(() => {
    const firstInput = document.getElementById('order-email');
    if (firstInput) firstInput.focus();
    modal && modal.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 0);
}

function openTestCheckoutModal() {
  const testModal = document.getElementById('test-checkout-modal');
  if (testModal) {
    testModal.style.display = 'block';
  }
  const amount = messages.totalPrice.textContent || '$0.00';
  const txId = 'TEST-' + Math.random().toString(36).toUpperCase();
  const record = {
    email: 'sandbox@test.local',
    industry: 'SANDBOX',
    goals: 'Test checkout run',
    transactionId: txId,
    category: currentPackage ? currentPackage.categoryKey : '',
    packageId: currentPackage ? currentPackage.packageId : '',
    total: amount,
    date: new Date().toISOString(),
    status: 'paid'
  };
  finalizeOrder(record, amount);
}

function updateTotalPrice() {
  if (!currentPackage) return;
  const category = packageCatalog[currentPackage.categoryKey];
  if (!category) return;
  const matched = category.packages.find((pkg) => pkg.id === currentPackage.packageId);
  const pkg = matched || category.packages[0];
  const qty = Math.max(1, Number(document.getElementById('order-qty')?.value || 1));
  const total = Number(pkg.price) * qty;
  messages.totalPrice.textContent = formatPrice(total);
}

function finalizeOrder(record, amount) {
  const existing = JSON.parse(localStorage.getItem(ORDER_ITEMS_KEY) || '[]');
  existing.unshift(record);
  localStorage.setItem(ORDER_ITEMS_KEY, JSON.stringify(existing));
  messages.fieldError.style.display = 'none';
  renderOrders();
  if (currentView !== 'orders') switchView('orders');
}

function submitOrder() {
  if (!currentPackage) return;
  const category = packageCatalog[currentPackage.categoryKey];
  if (!category) return;
  const matched = category.packages.find((pkg) => pkg.id === currentPackage.packageId);
  const pkg = matched || category.packages[0];
  const emailInput = document.getElementById('order-email');
  const email = emailInput ? emailInput.value.trim() : '';
  if (!email || !email.includes('@')) {
    if (messages.fieldError) messages.fieldError.style.display = 'block';
    return;
  }
  if (messages.fieldError) messages.fieldError.style.display = 'none';
  const txId = 'LOY-' + Math.random().toString(36).toUpperCase().slice(2, 10);
  const record = {
    email,
    industry: document.getElementById('order-industry')?.value || '',
    goals: document.getElementById('order-goals')?.value || '',
    transactionId: txId,
    category: currentPackage.categoryKey,
    packageId: pkg.id,
    total: messages.totalPrice.textContent,
    date: new Date().toISOString(),
    status: 'paid'
  };
  const amt = Number(pkg.price) * Math.max(1, Number(document.getElementById('order-qty')?.value || 1));
  finalizeOrder(record, formatPrice(amt));
  const formUrl = new URL(googleFormUrl);
  formUrl.searchParams.set('entry.123456789', txId);
  window.open(formUrl.toString(), '_blank');
}

function renderOrders() {
  const orders = JSON.parse(localStorage.getItem(ORDER_ITEMS_KEY) || '[]');
  const tbody = document.getElementById('orders-body');
  const emptyState = document.getElementById('no-orders-msg');
  if (!tbody) return;
  tbody.innerHTML = '';
  if (orders.length === 0) {
    if (emptyState) emptyState.style.display = 'block';
    return;
  }
  if (emptyState) emptyState.style.display = 'none';
  orders.forEach((order) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${order.date ? new Date(order.date).toLocaleString() : ''}</td>
      <td>${order.transactionId || ''}</td>
      <td>${order.category || ''}</td>
      <td>${order.packageId || ''}</td>
      <td>${order.industry || order.goals || ''}</td>
      <td>${typeof order.quantity === 'number' ? order.quantity : 1}</td>
      <td>${order.total || ''}</td>
      <td>${order.status || ''}</td>
    `;
    tbody.appendChild(row);
  });
}

function openTestCheckoutModal() {
  openPurchaseModal('starter', 'st-2');
}

function navigate(viewId) {
  switchView(viewId);
  if (viewId === 'orders') renderOrders();
  if (viewId !== 'orders') closeAllModals();

  if (['starter', 'pro', 'enterprise'].includes(viewId)) {
    const categoryKey = viewId;
    const firstPackage = packageCatalog[categoryKey]?.packages?.[0]?.id;
    if (firstPackage) openPurchaseModal(categoryKey, firstPackage);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  applyTranslations();
  renderOrders();
  const qtyInput = document.getElementById('order-qty');
  if (qtyInput) qtyInput.addEventListener('input', updateTotalPrice);
});
