// SHOPBOOST app state
const STORAGE_KEY = 'shopboost_orders';
let currentLang = localStorage.getItem('bibleforai_lang') || (() => {
  const browserLang = (navigator.languages && navigator.languages[0]) || navigator.language || '';
  return browserLang.toLowerCase().startsWith('ko') ? 'ko' : 'en';
})();
let currentView = 'home';
let currentPackage = null;
let orderQuantity = 1;
let paypalButtonInstance = null;

const packageCatalog = {
  shopify: {
    title_en: 'Shopify / Global Store Launch',
    title_ko: 'Shopify / 글로벌 스토어 런칭',
    packages: [
      {
        id: 'launch',
        name_en: 'LAUNCH — Store Setup',
        name_ko: '런치 — 스토어 셋업',
        desc_en: 'Theme setup, core pages, payments, shipping, and 5 starter products for a fast launch.',
        desc_ko: '테마 설정, 핵심 페이지, 결제, 배송, 5개 스타터 상품 등록을 포함한 빠른 런칭 패키지.',
        price: 2538,
        featured: false,
        features_en: ['Theme installation & styling', 'Payments + PayPal setup', 'Shipping zones configured', 'Google Form order intake'],
        features_ko: ['테마 설치 및 스타일링', '결제 + PayPal 설정', '배송 지역 설정', 'Google Form 주문 접수']
      },
      {
        id: 'growth',
        name_en: 'GROWTH — Localization Pack',
        name_ko: '그로스 — 로컬라이제이션 패키지',
        desc_en: 'Multi-language storefront polish with marketplace-ready copy, policy pages, and conversion tuning.',
        desc_ko: '다국어 스토어 최적화, 마켓플레이스용 카피, 정책 페이지, 전환율 개선을 포함합니다.',
        price: 4231,
        featured: true,
        features_en: ['EN + KR storefront structure', 'Policy & FAQ pages', 'Conversion-focused sections', '1 revision included'],
        features_ko: ['영문 + 한글 스토어 구조', '정책 및 FAQ 페이지', '전환 중심 섹션 구성', '수정 1회 포함']
      },
      {
        id: 'scale',
        name_en: 'SCALE — Multi-market Expansion',
        name_ko: '스케일 — 멀티마켓 확장',
        desc_en: 'Full international launch plan for global sellers, with tracking, reporting, and store growth support.',
        desc_ko: '글로벌 셀러를 위한 국제 런칭 플랜, 추적, 리포트, 스토어 성장 지원을 제공합니다.',
        price: 5923,
        featured: false,
        features_en: ['Market expansion roadmap', 'Tracking pixels & analytics', 'Operations checklist', 'Priority support'],
        features_ko: ['시장 확장 로드맵', '추적 픽셀 및 분석 설정', '운영 체크리스트', '우선 지원']
      }
    ]
  }
};

const translations = {
  en: {
    'logo-subtitle': 'SHOPBOOST!',
    'nav-home': 'Home',
    'nav-packages': 'Packages',
    'nav-process': 'Process',
    'nav-orders': 'My Orders',
    'hero-badge': 'International eCommerce Launch',
    'hero-title': 'SHOPBOOST — Global Store Entry',
    'hero-desc': 'Launch a clean, conversion-ready Shopify store for international buyers with PayPal checkout, localization, and ready-to-sell structure.',
    'btn-explore': 'Explore Packages',
    'btn-compliance': 'How It Works',
    'stat-stores': 'Stores Launched',
    'stat-markets': 'Target Markets',
    'stat-delivery': 'Fast Delivery',
    'sec-packages-title': 'Choose Your Launch Package',
    'sec-packages-subtitle': 'All pricing reflects a 2× markup over the original KMong base price and is displayed in USD by default.',
    'sec-process-title': 'Built for Global Selling',
    'sec-process-subtitle': 'English-first by default, Korean available at /kr/, with payment and intake flows ready for international clients.',
    'process-1-title': 'Storefront Setup',
    'process-1-desc': 'Theme, menu, homepage, product pages, and policies are arranged for launch speed.',
    'process-2-title': 'Payments & Intake',
    'process-2-desc': 'PayPal checkout plus a Google Form order handoff keeps the workflow simple.',
    'process-3-title': 'Localization',
    'process-3-desc': 'English is the default version, and a Korean version is provided under /kr/.',
    'view-orders-title': 'My Purchase History',
    'view-orders-sub': 'Completed orders are stored locally in your browser for quick reference.',
    'th-date': 'Order Date',
    'th-order-id': 'Transaction ID',
    'th-product': 'Product',
    'th-tier': 'Package Tier',
    'th-country': 'Target Country',
    'th-qty': 'Quantity',
    'th-total': 'Total Paid',
    'th-status': 'Status',
    'no-orders-msg': 'No orders yet. Open a package and complete the test checkout or PayPal payment.',
    'modal-title': 'Configure Order',
    'modal-desc': 'Choose quantity and complete payment with PayPal or the test button.',
    'modal-base-pkg': 'Base Package:',
    'modal-base-price-label': 'Base Price:',
    'modal-email-label': 'Email Address *',
    'modal-email-placeholder': 'name@example.com',
    'modal-email-error': 'Please enter a valid email address.',
    'modal-country-label': 'Target Market:',
    'modal-qty': 'Quantity:',
    'modal-total-amt': 'Total Amount:',
    'modal-test-btn': 'Test Checkout',
    'badge-ssl': 'SSL Secured Checkout',
    'badge-paypal': 'PayPal Verified',
    'foot-main': 'Global Shopify store setup, localization, and launch support.',
    'foot-contact': 'Contact support: snsherocom@gmail.com',
    'foot-copy': '&copy; 2026 BibleForAI SHOPBOOST. All rights reserved.',
    'order-button': 'Order Package',
    'featured-badge': 'Best Seller',
    'receipt-header': 'BIBLEFORAI - SHOPBOOST RECEIPT',
    'receipt-date': 'Order Date',
    'receipt-txid': 'Transaction ID',
    'receipt-email': 'Customer Email',
    'receipt-type': 'Product Type',
    'receipt-size': 'Package Size',
    'receipt-country': 'Target Market',
    'receipt-qty': 'Quantity',
    'receipt-baseprice': 'Base Price',
    'receipt-total': 'Total Paid',
    'receipt-status': 'Status',
    'receipt-method': 'Payment Method',
    'receipt-method-val': 'PayPal Secure Checkout'
  },
  ko: {
    'logo-subtitle': '샵부스트!',
    'nav-home': '홈',
    'nav-packages': '패키지',
    'nav-process': '진행 방식',
    'nav-orders': '내 주문 내역',
    'hero-badge': '글로벌 이커머스 런칭',
    'hero-title': 'SHOPBOOST — 글로벌 스토어 입점',
    'hero-desc': 'PayPal 결제, 로컬라이제이션, 즉시 판매 가능한 구조를 갖춘 전환 중심 Shopify 스토어를 제작합니다.',
    'btn-explore': '패키지 보기',
    'btn-compliance': '진행 방식',
    'stat-stores': '런칭 완료 스토어',
    'stat-markets': '타겟 시장',
    'stat-delivery': '빠른 납기',
    'sec-packages-title': '런칭 패키지를 선택하세요',
    'sec-packages-subtitle': '표시 가격은 KMong 원가의 2배 마크업을 반영한 USD 기준이며, 한국어 버전은 /kr/에서 제공합니다.',
    'sec-process-title': '글로벌 판매에 맞춘 구조',
    'sec-process-subtitle': '영문이 기본이며, 한국어 버전은 /kr/에 제공되고 국제 고객용 결제 및 접수 흐름이 준비되어 있습니다.',
    'process-1-title': '스토어 구성',
    'process-1-desc': '테마, 메뉴, 홈, 상품 페이지, 정책 페이지를 빠르게 런칭 가능하게 정리합니다.',
    'process-2-title': '결제 및 접수',
    'process-2-desc': 'PayPal 결제와 Google Form 접수를 연결해 운영을 단순화합니다.',
    'process-3-title': '로컬라이제이션',
    'process-3-desc': '영문이 기본 버전이며, 한국어 버전은 /kr/ 경로로 제공합니다.',
    'view-orders-title': '내 구매 히스토리',
    'view-orders-sub': '완료된 주문은 브라우저에 로컬 저장되어 빠르게 확인할 수 있습니다.',
    'th-date': '주문 날짜',
    'th-order-id': '거래 ID',
    'th-product': '상품명',
    'th-tier': '패키지 등급',
    'th-country': '타겟 시장',
    'th-qty': '수량',
    'th-total': '총 결제금액',
    'th-status': '상태',
    'no-orders-msg': '주문 내역이 없습니다. 패키지를 열고 테스트 결제 또는 PayPal 결제를 진행하세요.',
    'modal-title': '주문 설정',
    'modal-desc': '수량을 선택하고 PayPal 또는 테스트 버튼으로 결제하세요.',
    'modal-base-pkg': '기본 패키지:',
    'modal-base-price-label': '기본 가격:',
    'modal-email-label': '이메일 주소 *',
    'modal-email-placeholder': 'name@example.com',
    'modal-email-error': '올바른 이메일 주소를 입력해주세요.',
    'modal-country-label': '타겟 시장:',
    'modal-qty': '수량:',
    'modal-total-amt': '총 결제금액:',
    'modal-test-btn': '테스트 결제',
    'badge-ssl': 'SSL 보안 결제',
    'badge-paypal': 'PayPal 인증됨',
    'foot-main': '글로벌 Shopify 스토어 구축, 로컬라이제이션, 런칭 지원.',
    'foot-contact': '문의 지원: snsherocom@gmail.com',
    'foot-copy': '&copy; 2026 BibleForAI SHOPBOOST. All rights reserved.',
    'order-button': '패키지 주문하기',
    'featured-badge': '인기',
    'receipt-header': 'BIBLEFORAI - SHOPBOOST 영수증',
    'receipt-date': '주문 날짜',
    'receipt-txid': '거래 ID',
    'receipt-email': '고객 이메일',
    'receipt-type': '상품 종류',
    'receipt-size': '패키지 크기',
    'receipt-country': '타겟 시장',
    'receipt-qty': '수량',
    'receipt-baseprice': '기본 가격',
    'receipt-total': '총 결제금액',
    'receipt-status': '상태',
    'receipt-method': '결제 방법',
    'receipt-method-val': 'PayPal 안전 결제'
  }
};

function formatPrice(usdPrice, includeUnit = true) {
  if (currentLang === 'ko') {
    const krw = Math.round(usdPrice * 1300);
    return includeUnit ? `₩${krw.toLocaleString()} KRW` : `₩${krw.toLocaleString()}`;
  }
  const formatted = usdPrice % 1 === 0 ? usdPrice.toLocaleString() : usdPrice.toFixed(2);
  return includeUnit ? `$${formatted} USD` : `$${formatted}`;
}

function applyTranslations() {
  const lang = currentLang;
  const isKo = lang === 'ko';
  document.documentElement.lang = lang;
  document.title = isKo ? 'BibleForAI - SHOPBOOST | 글로벌 Shopify 스토어 구축' : 'BibleForAI - SHOPBOOST | Global Shopify Store Launch';

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.content = isKo
      ? 'PayPal 결제, Google Form 접수, 한국어/영어 로컬라이제이션을 갖춘 글로벌 Shopify 스토어 구축 서비스입니다.'
      : 'Shopify store launch service for global sellers with PayPal checkout, Google Form intake, and English/Korean localization.';
  }

  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.content = document.title;
  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.content = metaDesc.content;
  const twTitle = document.querySelector('meta[name="twitter:title"]');
  if (twTitle) twTitle.content = document.title;
  const twDesc = document.querySelector('meta[name="twitter:description"]');
  if (twDesc) twDesc.content = metaDesc.content;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const translation = translations[lang] && translations[lang][key];
    if (!translation) return;
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = translation;
    } else {
      el.innerHTML = translation;
    }
  });

  const selector = document.getElementById('language-selector');
  if (selector) selector.value = lang;
}

function changeLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('bibleforai_lang', lang);
  applyTranslations();
  renderPackages();
  renderOrders();
}

function setupHeaderScroll() {
  const header = document.getElementById('app-header');
  window.addEventListener('scroll', () => {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 50);
  });
}

function navigate(viewId) {
  currentView = viewId;
  document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
  const activeSection = document.getElementById(`${viewId}-view`);
  if (activeSection) activeSection.classList.add('active');
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.classList.toggle('active', link.id === `nav-${viewId}`);
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleMobileMenu() {
  const drawer = document.getElementById('mobile-drawer');
  if (drawer) drawer.classList.toggle('active');
}

function renderPackages() {
  const container = document.getElementById('shopify-packages');
  if (!container) return;
  const category = packageCatalog.shopify;
  const isKo = currentLang === 'ko';
  const btnText = translations[currentLang]['order-button'];
  container.innerHTML = category.packages.map(pkg => {
    const name = isKo ? pkg.name_ko : pkg.name_en;
    const desc = isKo ? pkg.desc_ko : pkg.desc_en;
    const features = isKo ? pkg.features_ko : pkg.features_en;
    return `
      <div class="package-card ${pkg.featured ? 'featured' : ''}">
        <h3>${name}</h3>
        <p class="package-desc">${desc}</p>
        <div class="package-price-box">
          <span class="price">${formatPrice(pkg.price, false)}</span>
          <span class="currency">${currentLang === 'ko' ? 'KRW' : 'USD'}</span>
        </div>
        <ul class="package-features">
          ${features.map(feat => `<li><i class="fa-solid fa-circle-check"></i> ${feat}</li>`).join('')}
        </ul>
        <button class="btn-buy" onclick="openPurchaseModal('shopify', '${pkg.id}')">
          <i class="fa-solid fa-store"></i> ${btnText}
        </button>
      </div>
    `;
  }).join('');
}

function openPurchaseModal(categoryKey, packageId) {
  const category = packageCatalog[categoryKey];
  const pkg = category.packages.find(p => p.id === packageId);
  if (!pkg) return;

  currentPackage = {
    categoryKey,
    categoryName: currentLang === 'ko' ? category.title_ko : category.title_en,
    tierName: currentLang === 'ko' ? pkg.name_ko : pkg.name_en,
    basePrice: pkg.price
  };

  orderQuantity = 1;
  document.getElementById('modal-product-title').innerText = currentPackage.categoryName;
  document.getElementById('modal-package-name').innerText = currentPackage.tierName;
  document.getElementById('modal-base-price').innerText = formatPrice(pkg.price);
  document.getElementById('order-quantity').value = 1;

  const emailInput = document.getElementById('order-email');
  if (emailInput) {
    emailInput.value = '';
    emailInput.style.borderColor = 'var(--border)';
  }
  const emailError = document.getElementById('email-error');
  if (emailError) emailError.style.display = 'none';

  updateModalPrice();
  document.getElementById('purchase-modal').classList.add('active');
  setTimeout(() => initPayPalButtons(), 150);
}

function closeModal() {
  document.getElementById('purchase-modal').classList.remove('active');
  const container = document.getElementById('paypal-button-container');
  if (container) container.innerHTML = '';
  paypalButtonInstance = null;
}

function adjustQty(amount) {
  const qtyInput = document.getElementById('order-quantity');
  let val = parseInt(qtyInput.value, 10) || 1;
  val = Math.max(1, val + amount);
  qtyInput.value = val;
  updateModalPrice();
}

function updateModalPrice() {
  const qtyInput = document.getElementById('order-quantity');
  const val = Math.max(1, parseInt(qtyInput.value, 10) || 1);
  orderQuantity = val;
  document.getElementById('modal-total-price').innerText = formatPrice(currentPackage.basePrice * orderQuantity);
}

function validateEmailField() {
  const emailInput = document.getElementById('order-email');
  const emailError = document.getElementById('email-error');
  const email = (emailInput?.value || '').trim();
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!ok) {
    if (emailInput) emailInput.style.borderColor = '#ef4444';
    if (emailError) {
      emailError.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> ${translations[currentLang]['modal-email-error']}`;
      emailError.style.display = 'block';
    }
    return false;
  }
  if (emailInput) emailInput.style.borderColor = 'var(--border)';
  if (emailError) emailError.style.display = 'none';
  return true;
}

function triggerTestCheckout() {
  const emailInput = document.getElementById('order-email');
  if (emailInput && !emailInput.value.trim()) emailInput.value = 'sandbox@test.dev';
  if (!validateEmailField()) return;
  saveLocalOrder({ id: `TEST-${Math.random().toString(36).slice(2, 10).toUpperCase()}`, isTest: true });
  closeModal();
}

function initPayPalButtons() {
  const container = document.getElementById('paypal-button-container');
  if (!container) return;
  if (typeof paypal === 'undefined') {
    container.innerHTML = '<p style="color:#ef4444;text-align:center;font-size:0.9rem;padding:1rem;font-weight:600;"><i class="fa-solid fa-triangle-exclamation"></i> PayPal is unavailable. Please reload the page.</p>';
    return;
  }
  if (paypalButtonInstance) {
    container.innerHTML = '';
    paypalButtonInstance = null;
  }
  paypalButtonInstance = paypal.Buttons({
    style: { layout: 'vertical', color: 'blue', shape: 'rect', label: 'checkout' },
    onClick(data, actions) {
      return validateEmailField() ? actions.resolve() : actions.reject();
    },
    createOrder(data, actions) {
      const selectedCountry = document.getElementById('order-country').value;
      const finalAmount = (currentPackage.basePrice * orderQuantity).toFixed(2);
      return actions.order.create({
        purchase_units: [{
          description: `${currentPackage.categoryName} - ${currentPackage.tierName} [Market: ${selectedCountry}] (Qty: ${orderQuantity})`,
          amount: { currency_code: 'USD', value: finalAmount }
        }]
      });
    },
    onApprove(data, actions) {
      return actions.order.capture().then(details => {
        saveLocalOrder(details);
        closeModal();
      });
    },
    onError(err) {
      console.error('PayPal Checkout error:', err);
      alert('An error occurred during payment processing. Please try again.');
    }
  });
  paypalButtonInstance.render('#paypal-button-container');
}

function saveLocalOrder(details) {
  const orderLogs = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  const selectedCountry = document.getElementById('order-country').value;
  const emailVal = document.getElementById('order-email') ? document.getElementById('order-email').value.trim() : '';
  const newOrder = {
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
    id: details.id,
    email: emailVal,
    category: currentPackage.categoryName,
    package: currentPackage.tierName,
    country: selectedCountry,
    quantity: orderQuantity,
    basePrice: currentPackage.basePrice,
    totalPaid: formatPrice(currentPackage.basePrice * orderQuantity),
    status: 'Completed'
  };
  orderLogs.unshift(newOrder);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orderLogs));
  renderOrders();

  const dict = translations[currentLang];
  const receiptText = `===================================
   ${dict['receipt-header']}
===================================
${dict['receipt-date'].padEnd(15)} : ${newOrder.date}
${dict['receipt-txid'].padEnd(15)} : ${newOrder.id}
${dict['receipt-email'].padEnd(15)} : ${newOrder.email}
${dict['receipt-type'].padEnd(15)} : ${newOrder.category}
${dict['receipt-size'].padEnd(15)} : ${newOrder.package}
${dict['receipt-country'].padEnd(15)} : ${newOrder.country}
${dict['receipt-qty'].padEnd(15)} : ${newOrder.quantity}
${dict['receipt-baseprice'].padEnd(15)} : ${formatPrice(newOrder.basePrice)}
${dict['receipt-total'].padEnd(15)} : ${newOrder.totalPaid}
${dict['receipt-status'].padEnd(15)} : ${newOrder.status}
-----------------------------------
${dict['receipt-method'].padEnd(15)} : ${dict['receipt-method-val']}
===================================`;
  const encodedReceipt = encodeURIComponent(receiptText);
  const redirectUrl = `https://docs.google.com/forms/d/e/1FAIpQLScMPqbEWWttS5mb1m_krsO_kco24ImpgvYVSbc7zO0nEVmYFw/viewform?entry.1059822061=${encodedReceipt}`;
  window.location.href = redirectUrl;
}

function renderOrders() {
  const orderLogs = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  const tbody = document.getElementById('orders-tbody');
  const noOrdersMsg = document.getElementById('no-orders-msg');
  if (!tbody) return;
  if (!orderLogs.length) {
    tbody.innerHTML = '';
    if (noOrdersMsg) noOrdersMsg.style.display = 'block';
    return;
  }
  if (noOrdersMsg) noOrdersMsg.style.display = 'none';
  const isKo = currentLang === 'ko';
  tbody.innerHTML = orderLogs.map(order => `
    <tr>
      <td>${order.date}</td>
      <td class="tx-id">${order.id}</td>
      <td>${order.category}</td>
      <td>${order.package}</td>
      <td>${order.country || 'Global'}</td>
      <td>${order.quantity}</td>
      <td><strong>${order.totalPaid}</strong></td>
      <td><span class="status-badge">${isKo ? '완료됨' : order.status}</span></td>
    </tr>
  `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  applyTranslations();
  renderPackages();
  renderOrders();
  setupHeaderScroll();
});

// Expose variables globally to prevent ReferenceErrors in inline HTML scripts/handlers
if (typeof navigate !== 'undefined') { window.navigate = navigate; }
if (typeof currentLang !== 'undefined') { window.currentLang = currentLang; }
