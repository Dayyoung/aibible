// LOGOBOOST app
const ORDER_STORAGE_KEY = 'logoboost_orders';
const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScMPqbEWWttS5mb1m_krsO_kco24ImpgvYVSbc7zO0nEVmYFw/viewform?entry.1059822061=';
const KRW_PER_USD = 1400;

let currentLang = localStorage.getItem('bibleforai_lang') || 'en';
let currentPackage = null;
let orderQuantity = 1;

const packageCatalog = {
  logo: {
    title_en: 'Global Logo Design',
    title_ko: '글로벌 로고 디자인',
    packages: [
      {
        id: 'standard',
        name_en: 'STANDARD',
        name_ko: '스탠다드',
        desc_en: 'Two logo directions, fast turn-around, and brand-ready source files.',
        desc_ko: '2가지 로고 시안, 빠른 작업, 브랜드용 소스 파일 제공.',
        price: 47,
        featured: false,
        features_en: ['2 Concepts', '3 Revisions', 'Source Files', 'Commercial Use'],
        features_ko: ['2개 시안', '3회 수정', '원본 파일 제공', '상업적 이용 가능']
      },
      {
        id: 'deluxe',
        name_en: 'DELUXE',
        name_ko: '딜럭스',
        desc_en: 'Logo plus business card direction for growing e-commerce and service brands.',
        desc_ko: '성장 중인 브랜드를 위한 로고 + 명함 디자인 패키지.',
        price: 141,
        featured: true,
        features_en: ['2 Concepts', 'Unlimited Revisions', 'Business Card', '3 Mockups'],
        features_ko: ['2개 시안', '무제한 수정', '명함 디자인', '목업 3종']
      },
      {
        id: 'premium',
        name_en: 'PREMIUM',
        name_ko: '프리미엄',
        desc_en: 'Four directions, priority support, and premium mockups for launch-ready brands.',
        desc_ko: '4개 시안, 우선 지원, 런칭 준비 브랜드용 프리미엄 목업 제공.',
        price: 267,
        featured: false,
        features_en: ['4 Concepts', 'Unlimited Revisions', 'Business Card', '5 Mockups'],
        features_ko: ['4개 시안', '무제한 수정', '명함 디자인', '목업 5종']
      }
    ]
  }
};

const translations = {
  en: {
    'logo-subtitle': 'GLOBAL LOGO DESIGN',
    'nav-home': 'Home',
    'nav-packages': 'Packages',
    'nav-process': 'Process',
    'nav-faq': 'FAQ',
    'nav-orders': 'Orders',
    'hero-badge': 'Brand identity for global markets',
    'hero-title': 'LOGOBOOST — Global Logo Design',
    'hero-desc': 'Turn a rough idea into a clean, memorable identity for Shopify, Amazon, startups, creators, and service businesses.',
    'btn-explore': 'View Packages',
    'btn-secondary': 'See FAQ',
    'stat-1-num': '2–4',
    'stat-1-label': 'Concepts',
    'stat-2-num': '24h',
    'stat-2-label': 'Fast Reply',
    'stat-3-num': '100%',
    'stat-3-label': 'Commercial Use',
    'stat-4-num': 'Global',
    'stat-4-label': 'Ready',
    'sec-packages-title': 'Choose a package',
    'sec-packages-subtitle': 'Original KMONG base price ×2, converted to USD using roughly ₩1,400 = $1.',
    'sec-process-title': 'Simple process',
    'sec-process-subtitle': 'Brief → concepts → revisions → final files → receipt.',
    'sec-faq-title': 'Frequently asked questions',
    'sec-faq-subtitle': 'Everything you need before paying.',
    'sec-orders-title': 'Order history',
    'sec-orders-subtitle': 'Saved locally in your browser after checkout.',
    'card-view': 'Order now',
    'feat-branding': 'Brand-first direction',
    'feat-branding-desc': 'Positioning, shape language, and color mood aligned to your market.',
    'feat-delivery': 'Fast delivery',
    'feat-delivery-desc': 'Quick turnaround for launch windows and urgent rebrands.',
    'feat-files': 'Ready-to-use files',
    'feat-files-desc': 'Source files and high-resolution exports for web, print, and socials.',
    'faq-q1': 'What do I receive?',
    'faq-a1': 'You receive logo concepts, revision support, and final files suitable for web and print.',
    'faq-q2': 'Can I test checkout?',
    'faq-a2': 'Yes. Click the total amount in the modal to trigger the sandbox test checkout flow.',
    'faq-q3': 'Do you support Korean too?',
    'faq-a3': 'Yes. Switch the language selector to Korean or open the /kr/ page.',
    'faq-q4': 'How is the receipt delivered?',
    'faq-a4': 'After payment or test checkout, we redirect to the Google Form with receipt data encoded in the URL.',
    'table-date': 'Date',
    'table-txid': 'Transaction ID',
    'table-package': 'Package',
    'table-keywords': 'Brand Keywords',
    'table-qty': 'Qty',
    'table-total': 'Total Paid',
    'table-status': 'Status',
    'no-orders': 'No orders yet. Your first checkout will appear here.',
    'modal-title': 'Complete your order',
    'modal-desc': 'Enter your email and brand keywords, then pay securely with PayPal.',
    'modal-base-package': 'Package',
    'modal-base-price': 'Base price',
    'modal-email-label': 'Email address *',
    'modal-email-placeholder': 'name@company.com',
    'modal-email-error': 'Please enter a valid email address.',
    'modal-keywords-label': 'Brand keywords / style notes',
    'modal-keywords-placeholder': 'minimal, premium, blue, bold',
    'modal-qty': 'Quantity',
    'modal-total': 'Total amount',
    'badge-ssl': 'SSL Secured Checkout',
    'badge-paypal': 'PayPal Verified',
    'footer-copy': '&copy; 2026 LOGOBOOST. All rights reserved.',
    'footer-note': 'Global logo design for modern brands.',
    'order-button': 'Order package',
    'receipt-header': 'LOGOBOOST RECEIPT',
    'receipt-date': 'Order Date',
    'receipt-txid': 'Transaction ID',
    'receipt-email': 'Customer Email',
    'receipt-type': 'Service',
    'receipt-size': 'Package',
    'receipt-keywords': 'Brand Keywords',
    'receipt-qty': 'Quantity',
    'receipt-baseprice': 'Base Price',
    'receipt-total': 'Total Paid',
    'receipt-status': 'Status',
    'receipt-method': 'Payment Method',
    'receipt-method-val': 'PayPal Secure Checkout'
  },
  ko: {
    'logo-subtitle': '글로벌 로고 디자인',
    'nav-home': '홈',
    'nav-packages': '패키지',
    'nav-process': '진행 방식',
    'nav-faq': 'FAQ',
    'nav-orders': '주문내역',
    'hero-badge': '글로벌 시장용 브랜드 아이덴티티',
    'hero-title': 'LOGOBOOST — 글로벌 로고 디자인',
    'hero-desc': 'Shopify, Amazon, 스타트업, 크리에이터, 서비스 브랜드를 위한 기억에 남는 아이덴티티를 만듭니다.',
    'btn-explore': '패키지 보기',
    'btn-secondary': 'FAQ 보기',
    'stat-1-num': '2–4',
    'stat-1-label': '시안 수',
    'stat-2-num': '24h',
    'stat-2-label': '빠른 응답',
    'stat-3-num': '100%',
    'stat-3-label': '상업적 이용',
    'stat-4-num': 'Global',
    'stat-4-label': '전세계 대응',
    'sec-packages-title': '패키지를 선택하세요',
    'sec-packages-subtitle': '크몽 원가 ×2 후, ₩1,400 = $1 기준으로 USD로 변환했습니다.',
    'sec-process-title': '간단한 진행 방식',
    'sec-process-subtitle': '브리프 → 시안 → 수정 → 최종 파일 → 영수증.',
    'sec-faq-title': '자주 묻는 질문',
    'sec-faq-subtitle': '결제 전에 꼭 확인하세요.',
    'sec-orders-title': '주문 내역',
    'sec-orders-subtitle': '결제 후 브라우저에 로컬 저장됩니다.',
    'card-view': '지금 주문',
    'feat-branding': '브랜드 중심 방향성',
    'feat-branding-desc': '시장과 어울리는 포지셔닝, 형태 언어, 컬러 무드를 맞춥니다.',
    'feat-delivery': '빠른 납품',
    'feat-delivery-desc': '런칭 일정이나 급한 리브랜딩에도 대응합니다.',
    'feat-files': '바로 쓰는 파일',
    'feat-files-desc': '웹·인쇄·SNS용 원본/고해상도 파일을 제공합니다.',
    'faq-q1': '무엇을 받게 되나요?',
    'faq-a1': '로고 시안, 수정 지원, 웹/인쇄용 최종 파일을 받습니다.',
    'faq-q2': '테스트 결제가 가능한가요?',
    'faq-a2': '네. 모달의 총 결제금액을 누르면 샌드박스 테스트 결제가 실행됩니다.',
    'faq-q3': '한국어도 지원하나요?',
    'faq-a3': '네. 언어 선택기를 한국어로 바꾸거나 /kr/ 페이지를 이용하세요.',
    'faq-q4': '영수증은 어떻게 전달되나요?',
    'faq-a4': '결제 또는 테스트 결제 후 Google Form으로 영수증 데이터가 전달됩니다.',
    'table-date': '날짜',
    'table-txid': '거래 ID',
    'table-package': '패키지',
    'table-keywords': '브랜드 키워드',
    'table-qty': '수량',
    'table-total': '총 결제금액',
    'table-status': '상태',
    'no-orders': '주문 내역이 없습니다. 첫 결제를 완료하면 여기에 표시됩니다.',
    'modal-title': '주문을 완료하세요',
    'modal-desc': '이메일과 브랜드 키워드를 입력한 뒤 PayPal로 안전하게 결제하세요.',
    'modal-base-package': '패키지',
    'modal-base-price': '기본 가격',
    'modal-email-label': '이메일 주소 *',
    'modal-email-placeholder': 'name@company.com',
    'modal-email-error': '올바른 이메일 주소를 입력해주세요.',
    'modal-keywords-label': '브랜드 키워드 / 스타일 메모',
    'modal-keywords-placeholder': 'minimal, premium, blue, bold',
    'modal-qty': '수량',
    'modal-total': '총 결제금액',
    'badge-ssl': 'SSL 보안 결제',
    'badge-paypal': 'PayPal 인증됨',
    'footer-copy': '&copy; 2026 LOGOBOOST. All rights reserved.',
    'footer-note': '현대 브랜드를 위한 글로벌 로고 디자인.',
    'order-button': '패키지 주문',
    'receipt-header': 'LOGOBOOST 영수증',
    'receipt-date': '주문 날짜',
    'receipt-txid': '거래 ID',
    'receipt-email': '고객 이메일',
    'receipt-type': '서비스',
    'receipt-size': '패키지',
    'receipt-keywords': '브랜드 키워드',
    'receipt-qty': '수량',
    'receipt-baseprice': '기본 가격',
    'receipt-total': '총 결제금액',
    'receipt-status': '상태',
    'receipt-method': '결제 방식',
    'receipt-method-val': 'PayPal 보안 결제'
  }
};

function formatPrice(usdPrice, includeUnit = true) {
  if (currentLang === 'ko') {
    const krw = Math.round(usdPrice * KRW_PER_USD);
    return includeUnit ? `₩${krw.toLocaleString()} KRW` : `₩${krw.toLocaleString()}`;
  }
  const formatted = Number.isInteger(usdPrice) ? usdPrice.toLocaleString() : usdPrice.toFixed(2);
  return includeUnit ? `$${formatted} USD` : `$${formatted}`;
}

function applyTranslations() {
  document.documentElement.lang = currentLang;
  const dict = translations[currentLang] || translations.en;

  document.title = currentLang === 'ko'
    ? 'LOGOBOOST — 글로벌 로고 디자인 | 브랜드 아이덴티티 패키지'
    : 'LOGOBOOST — Global Logo Design | Brand Identity Packages';

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.content = currentLang === 'ko'
    ? '글로벌 브랜드를 위한 로고 디자인 서비스. PayPal 결제, 샘플 체크아웃, Google Form 영수증, 한영 이중언어 지원.'
    : 'Global logo design service with PayPal checkout, click-to-test flow, Google Form receipt delivery, and bilingual support.';

  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.content = document.title;
  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.content = metaDesc ? metaDesc.content : '';
  const twTitle = document.querySelector('meta[name="twitter:title"]');
  if (twTitle) twTitle.content = document.title;
  const twDesc = document.querySelector('meta[name="twitter:description"]');
  if (twDesc) twDesc.content = metaDesc ? metaDesc.content : '';

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const value = dict[key];
    if (value === undefined) return;
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') el.placeholder = value;
    else el.innerHTML = value;
  });

  const selector = document.getElementById('language-selector');
  if (selector) selector.value = currentLang;
}

function renderPackages() {
  const wrapper = document.getElementById('logo-packages');
  if (!wrapper) return;
  const isKo = currentLang === 'ko';
  const dict = translations[currentLang] || translations.en;
  const category = packageCatalog.logo;

  wrapper.innerHTML = category.packages.map(pkg => `
    <article class="data-card ${pkg.featured ? 'featured' : ''}">
      <div class="card-icon tier-${pkg.id}"><i class="fa-solid fa-pen-nib"></i></div>
      <h3>${isKo ? pkg.name_ko : pkg.name_en}</h3>
      <p>${isKo ? pkg.desc_ko : pkg.desc_en}</p>
      <div class="package-price-box">
        <span class="price">${formatPrice(pkg.price, false)}</span>
        <span class="currency">${currentLang === 'ko' ? 'KRW' : 'USD'}</span>
      </div>
      <ul class="package-features">
        ${(isKo ? pkg.features_ko : pkg.features_en).map(item => `<li><i class="fa-solid fa-circle-check"></i> ${item}</li>`).join('')}
      </ul>
      <button class="btn-primary btn-buy" onclick="openPurchaseModal('logo', '${pkg.id}')">
        <i class="fa-solid fa-cart-shopping"></i> ${dict['order-button']}
      </button>
    </article>
  `).join('');
}

function getCategoryIcon() {
  return 'fa-solid fa-pen-nib';
}

function openPurchaseModal(categoryKey, packageId) {
  const category = packageCatalog[categoryKey];
  const pkg = category?.packages?.find(item => item.id === packageId);
  if (!pkg) return;

  currentPackage = {
    categoryKey,
    categoryName: currentLang === 'ko' ? category.title_ko : category.title_en,
    tierName: currentLang === 'ko' ? pkg.name_ko : pkg.name_en,
    basePrice: pkg.price
  };
  orderQuantity = 1;

  document.getElementById('modal-product-title').innerText = currentLang === 'ko' ? '주문을 완료하세요' : 'Complete your order';
  document.getElementById('modal-product-desc').innerText = currentLang === 'ko'
    ? '이메일과 브랜드 키워드를 입력한 뒤 PayPal로 안전하게 결제하세요.'
    : 'Enter your email and brand keywords, then pay securely with PayPal.';
  document.getElementById('modal-package-name').innerText = currentPackage.tierName;
  document.getElementById('modal-base-price').innerText = formatPrice(pkg.price);
  document.getElementById('order-quantity').value = orderQuantity;

  const emailInput = document.getElementById('order-email');
  const keywordsInput = document.getElementById('order-keywords');
  if (emailInput) emailInput.value = '';
  if (keywordsInput) keywordsInput.value = '';

  const emailError = document.getElementById('email-error');
  if (emailError) emailError.style.display = 'none';

  const modal = document.getElementById('purchase-modal');
  modal.classList.add('active');
  updateModalPrice();
  initPayPalButtons();

  const totalEl = document.getElementById('modal-total-price');
  if (totalEl && !totalEl.dataset.bound) {
    totalEl.dataset.bound = '1';
    totalEl.style.cursor = 'pointer';
    totalEl.setAttribute('role', 'button');
    totalEl.setAttribute('tabindex', '0');
    totalEl.addEventListener('click', triggerTestCheckout);
    totalEl.addEventListener('keydown', ev => {
      if (ev.key === 'Enter' || ev.key === ' ') {
        ev.preventDefault();
        triggerTestCheckout();
      }
    });
  }

  setTimeout(() => {
    const card = document.querySelector('.modal-card');
    const paypalWrap = document.querySelector('.paypal-wrapper');
    if (card && paypalWrap) {
      card.scrollTo({ top: Math.max(paypalWrap.offsetTop - 40, 0), behavior: 'smooth' });
    }
  }, 150);
}

function closeModal() {
  const modal = document.getElementById('purchase-modal');
  if (modal) modal.classList.remove('active');
  const container = document.getElementById('paypal-button-container');
  if (container) container.innerHTML = '';
}

function adjustQty(amount) {
  const qtyInput = document.getElementById('order-quantity');
  if (!qtyInput) return;
  const next = Math.max(1, (parseInt(qtyInput.value, 10) || 1) + amount);
  qtyInput.value = next;
  updateModalPrice();
}

function updateModalPrice() {
  const qty = Math.max(1, parseInt(document.getElementById('order-quantity')?.value || '1', 10));
  orderQuantity = qty;
  const total = currentPackage ? currentPackage.basePrice * qty : 0;
  const totalEl = document.getElementById('modal-total-price');
  if (totalEl) totalEl.innerText = formatPrice(total);
}

function validateEmailField() {
  const emailInput = document.getElementById('order-email');
  const emailError = document.getElementById('email-error');
  if (!emailInput) return true;
  const value = emailInput.value.trim();
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  if (emailError) emailError.style.display = ok ? 'none' : 'block';
  emailInput.style.borderColor = ok ? 'var(--border)' : '#ef4444';
  return ok;
}

function triggerTestCheckout() {
  const emailInput = document.getElementById('order-email');
  if (emailInput && !emailInput.value.trim()) emailInput.value = 'sandbox@test.dev';
  const keywordsInput = document.getElementById('order-keywords');
  if (keywordsInput && !keywordsInput.value.trim()) keywordsInput.value = 'global, brand, logo';
  if (!validateEmailField()) return;
  saveLocalOrder({ id: 'TEST-' + Math.random().toString(36).slice(2, 10).toUpperCase(), isTest: true });
  closeModal();
}

function initPayPalButtons() {
  const container = document.getElementById('paypal-button-container');
  if (!container) return;
  if (typeof paypal === 'undefined') {
    container.innerHTML = '<p style="color:#f87171;text-align:center;font-size:0.9rem;padding:1rem;">PayPal is unavailable right now.</p>';
    return;
  }
  container.innerHTML = '';
  paypal.Buttons({
    style: { layout: 'vertical', color: 'blue', shape: 'rect', label: 'checkout' },
    onClick: function(data, actions) {
      return validateEmailField() ? actions.resolve() : actions.reject();
    },
    createOrder: function(data, actions) {
      const total = (currentPackage.basePrice * orderQuantity).toFixed(2);
      const keywords = document.getElementById('order-keywords')?.value.trim() || 'global logo';
      return actions.order.create({
        purchase_units: [{
          description: `${currentPackage.categoryName} - ${currentPackage.tierName} [${keywords}] x${orderQuantity}`,
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
      console.error('PayPal error:', err);
      alert('PayPal payment failed. Please try again.');
    }
  }).render('#paypal-button-container');
}

function saveLocalOrder(details) {
  const logs = JSON.parse(localStorage.getItem(ORDER_STORAGE_KEY) || '[]');
  const email = document.getElementById('order-email')?.value.trim() || '';
  const keywords = document.getElementById('order-keywords')?.value.trim() || '';
  const totalPaid = formatPrice((currentPackage.basePrice * orderQuantity));
  const order = {
    date: new Date().toLocaleString(currentLang === 'ko' ? 'ko-KR' : 'en-US', {
      year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
    }),
    id: details.id,
    email,
    category: currentPackage.categoryName,
    package: currentPackage.tierName,
    keywords,
    quantity: orderQuantity,
    basePrice: currentPackage.basePrice,
    totalPaid,
    status: currentLang === 'ko' ? '완료' : 'Completed',
    isTest: !!details.isTest
  };

  logs.unshift(order);
  localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(logs));
  renderOrders();

  const dict = translations[currentLang] || translations.en;
  const receipt = [
    '===================================',
    `   ${dict['receipt-header']}`,
    '===================================',
    `${dict['receipt-date'].padEnd(15)} : ${order.date}`,
    `${dict['receipt-txid'].padEnd(15)} : ${order.id}`,
    `${dict['receipt-email'].padEnd(15)} : ${order.email}`,
    `${dict['receipt-type'].padEnd(15)} : ${order.category}`,
    `${dict['receipt-size'].padEnd(15)} : ${order.package}`,
    `${dict['receipt-keywords'].padEnd(15)} : ${order.keywords}`,
    `${dict['receipt-qty'].padEnd(15)} : ${order.quantity}`,
    `${dict['receipt-baseprice'].padEnd(15)} : ${formatPrice(order.basePrice)}`,
    `${dict['receipt-total'].padEnd(15)} : ${order.totalPaid}`,
    `${dict['receipt-status'].padEnd(15)} : ${order.status}`,
    '-----------------------------------',
    `${dict['receipt-method'].padEnd(15)} : ${dict['receipt-method-val']}`,
    '===================================' 
  ].join('\n');

  const redirect = GOOGLE_FORM_URL + encodeURIComponent(receipt);
  window.location.href = redirect;
}

function renderOrders() {
  const tbody = document.getElementById('orders-tbody');
  const empty = document.getElementById('no-orders-msg');
  if (!tbody || !empty) return;
  const logs = JSON.parse(localStorage.getItem(ORDER_STORAGE_KEY) || '[]');
  if (!logs.length) {
    tbody.innerHTML = '';
    empty.style.display = 'block';
    return;
  }
  empty.style.display = 'none';
  tbody.innerHTML = logs.map(order => `
    <tr>
      <td>${order.date}</td>
      <td class="tx-id">${order.id}</td>
      <td>${order.package}</td>
      <td>${order.keywords || '-'}</td>
      <td>${order.quantity}</td>
      <td><strong>${order.totalPaid}</strong></td>
      <td><span class="status-badge">${order.status}</span></td>
    </tr>
  `).join('');
}

function toggleMobileMenu() {
  const drawer = document.getElementById('mobile-drawer');
  if (drawer) drawer.classList.toggle('active');
}

function changeLanguage(lang) {
  currentLang = lang === 'ko' ? 'ko' : 'en';
  localStorage.setItem('bibleforai_lang', currentLang);
  applyTranslations();
  renderPackages();
  renderOrders();
}

function setupHeaderScroll() {
  const header = document.getElementById('app-header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  applyTranslations();
  renderPackages();
  renderOrders();
  setupHeaderScroll();
});

window.openPurchaseModal = openPurchaseModal;
window.closeModal = closeModal;
window.adjustQty = adjustQty;
window.updateModalPrice = updateModalPrice;
window.changeLanguage = changeLanguage;
window.toggleMobileMenu = toggleMobileMenu;
window.triggerTestCheckout = triggerTestCheckout;
