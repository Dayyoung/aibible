// PDPBOOST — Product Detail Page Design
const packageCatalog = {
  pdp: {
    title_en: 'Product Detail Page Design',
    title_ko: '상세페이지 디자인',
    packages: [
      {
        id: 'pdp-starter',
        name_en: 'Starter PDP',
        name_ko: '스타터 상세페이지',
        desc_en: 'A clean one-page product detail layout for one SKU or one campaign.',
        desc_ko: '단일 상품 또는 1개 캠페인에 맞는 깔끔한 1페이지 상세페이지 구성.',
        price: 7.15,
        featured: false,
        features_en: ['Conversion-ready hero section', '3 benefit blocks', 'Mobile-first spacing', '1 revision round'],
        features_ko: ['전환 중심 히어로 섹션', '3개 핵심 베네핏 블록', '모바일 최적 여백 설계', '1회 수정 포함']
      },
      {
        id: 'pdp-growth',
        name_en: 'Growth PDP',
        name_ko: '그로스 상세페이지',
        desc_en: 'Adds stronger product story, comparison blocks, and trust signals.',
        desc_ko: '제품 스토리, 비교표, 신뢰 요소를 더해 구매 설득력을 높인 구성.',
        price: 21.45,
        featured: true,
        features_en: ['Buyer journey copy', 'FAQ + trust blocks', 'Marketplace-ready layout', '2 revision rounds'],
        features_ko: ['구매 여정형 카피', 'FAQ + 신뢰 블록', '마켓플레이스용 레이아웃', '2회 수정 포함']
      },
      {
        id: 'pdp-pro',
        name_en: 'Pro PDP',
        name_ko: '프로 상세페이지',
        desc_en: 'Full sales page with deep-copywriting, visual direction, and CTA tuning.',
        desc_ko: '딥 카피라이팅, 비주얼 방향, CTA 조정을 포함한 풀 세일즈 페이지.',
        price: 42.9,
        featured: false,
        features_en: ['Keyword-based copy', 'Visual direction board', 'CTA optimization', 'Multi-device QA'],
        features_ko: ['키워드 기반 카피', '비주얼 방향 보드', 'CTA 최적화', '멀티 디바이스 QA']
      },
      {
        id: 'pdp-premium',
        name_en: 'Premium Bundle',
        name_ko: '프리미엄 번들',
        desc_en: 'Best for launches: strategy, copy, design, and revision in one bundle.',
        desc_ko: '런칭용 올인원 번들: 전략, 카피, 디자인, 수정까지 한 번에.',
        price: 71.5,
        featured: false,
        features_en: ['Launch planning', 'Brand tone matching', 'Image guidance', 'Priority delivery'],
        features_ko: ['런칭 플랜 포함', '브랜드 톤 매칭', '이미지 가이드 포함', '우선 납품']
      }
    ]
  }
};

const translations = {
  en: {
    'logo-subtitle': 'PRODUCT DETAIL PAGE',
    'nav-home': 'Home',
    'nav-packages': 'Packages',
    'nav-faq': 'FAQ',
    'nav-orders': 'Orders',
    'btn-orders': 'My Orders',
    'hero-badge': 'E-commerce conversion design',
    'hero-title': 'PDPBOOST — Product Detail Page Design',
    'hero-desc': 'Conversion-focused product detail pages for brands, marketplace sellers, and Shopify stores.',
    'hero-cta': 'Open starter pricing',
    'hero-note': 'Click the price to open the first checkout modal.',
    'section-packages-title': 'Choose your PDP package',
    'section-packages-subtitle': 'All packages are built for global sellers, with clear structure, better storytelling, and stronger CTA placement.',
    'section-faq-title': 'Frequently asked questions',
    'section-faq-subtitle': 'Short answers about process, delivery, and checkout.',
    'section-orders-title': 'Purchase history',
    'section-orders-subtitle': 'Your successful orders are stored locally in this browser.',
    'no-orders-msg': 'No purchase records yet. Click a price to test checkout and create your first receipt.',
    'th-date': 'Order Date',
    'th-order-id': 'Transaction ID',
    'th-product': 'Product',
    'th-tier': 'Package Tier',
    'th-target': 'Target Category',
    'th-qty': 'Quantity',
    'th-total': 'Total Paid',
    'th-status': 'Status',
    'faq-q1': 'What do I receive?',
    'faq-a1': 'A conversion-focused product detail page concept with copy direction, layout structure, and a clear CTA flow.',
    'faq-q2': 'Is this service international?',
    'faq-a2': 'Yes. It works for Amazon, Shopify, DTC brands, marketplace listings, and cross-border product launches.',
    'faq-q3': 'How do I test checkout?',
    'faq-a3': 'Open the modal and click the total price. That visible price text triggers the test checkout flow.',
    'faq-q4': 'What happens after payment?',
    'faq-a4': 'A receipt is saved locally and the flow redirects to the Google Form with encoded receipt data.',
    'modal-title': 'Configure Order',
    'modal-desc': 'Choose quantity, confirm details, and use PayPal secure checkout.',
    'modal-base-pkg': 'Base Package:',
    'modal-base-price-label': 'Base Price:',
    'modal-email-label': 'Email Address *',
    'modal-email-placeholder': 'name@example.com',
    'modal-email-error': 'Please enter a valid email address.',
    'modal-product-label': 'Target Product Category',
    'modal-qty': 'Quantity:',
    'modal-total-amt': 'Total Amount:',
    'badge-ssl': 'SSL Secured Checkout',
    'badge-paypal': 'PayPal Verified',
    'order-button': 'Order Package',
    'featured-badge': 'Best Seller',
    'foot-contact': 'Contact support: snsherocom@gmail.com',
    'foot-copy': '&copy; 2026 BibleForAI. All rights reserved.'
  },
  ko: {
    'logo-subtitle': '상세페이지 디자인',
    'nav-home': '홈',
    'nav-packages': '패키지',
    'nav-faq': 'FAQ',
    'nav-orders': '주문내역',
    'btn-orders': '내 주문',
    'hero-badge': '이커머스 전환 설계',
    'hero-title': 'PDPBOOST — 상세페이지 디자인',
    'hero-desc': '브랜드, 마켓플레이스 셀러, Shopify 스토어를 위한 전환 중심 상세페이지 디자인 서비스입니다.',
    'hero-cta': '스타터 가격 보기',
    'hero-note': '가격을 클릭하면 첫 결제 모달이 열립니다.',
    'section-packages-title': '상세페이지 패키지 선택',
    'section-packages-subtitle': '모든 패키지는 글로벌 셀러용 구조, 더 강한 스토리텔링, 명확한 CTA 배치를 포함합니다.',
    'section-faq-title': '자주 묻는 질문',
    'section-faq-subtitle': '진행 방식, 납품, 결제에 대한 간단한 답변입니다.',
    'section-orders-title': '구매 내역',
    'section-orders-subtitle': '성공한 주문은 이 브라우저에 로컬 저장됩니다.',
    'no-orders-msg': '아직 구매 내역이 없습니다. 가격을 클릭해 테스트 결제를 진행해 첫 영수증을 만들어보세요.',
    'th-date': '주문 날짜',
    'th-order-id': '거래 ID',
    'th-product': '상품명',
    'th-tier': '패키지 등급',
    'th-target': '대상 카테고리',
    'th-qty': '수량',
    'th-total': '총 결제금액',
    'th-status': '상태',
    'faq-q1': '무엇을 받게 되나요?',
    'faq-a1': '전환 중심 상세페이지 콘셉트, 카피 방향, 레이아웃 구조, 명확한 CTA 흐름을 받게 됩니다.',
    'faq-q2': '해외 판매에도 적합한가요?',
    'faq-a2': '네. Amazon, Shopify, DTC 브랜드, 마켓플레이스, 크로스보더 런칭에 모두 활용할 수 있습니다.',
    'faq-q3': '테스트 결제는 어떻게 하나요?',
    'faq-a3': '모달을 연 뒤 총 금액을 클릭하세요. 보이는 가격 텍스트가 테스트 결제 흐름을 실행합니다.',
    'faq-q4': '결제 후에는 어떻게 되나요?',
    'faq-a4': '영수증이 로컬에 저장되고, Google Form으로 인코딩된 영수증 데이터가 전달됩니다.',
    'modal-title': '주문 설정',
    'modal-desc': '수량을 선택하고 세부 사항을 확인한 뒤 PayPal 안전 결제를 진행하세요.',
    'modal-base-pkg': '기본 패키지:',
    'modal-base-price-label': '기본 가격:',
    'modal-email-label': '이메일 주소 *',
    'modal-email-placeholder': 'name@example.com',
    'modal-email-error': '올바른 이메일 주소를 입력해주세요.',
    'modal-product-label': '대상 상품 카테고리',
    'modal-qty': '수량:',
    'modal-total-amt': '총 결제금액:',
    'badge-ssl': 'SSL 보안 결제',
    'badge-paypal': 'PayPal 인증됨',
    'order-button': '패키지 주문하기',
    'featured-badge': '베스트',
    'foot-contact': '문의: snsherocom@gmail.com',
    'foot-copy': '&copy; 2026 BibleForAI. All rights reserved.'
  }
};

let currentLang = localStorage.getItem('bibleforai_lang') || ((navigator.language || '').toLowerCase().startsWith('ko') ? 'ko' : 'en');
let currentPackage = null;
let orderQuantity = 1;
let paypalButtonInstance = null;

function formatPrice(usdPrice, includeUnit = true) {
  if (currentLang === 'ko') {
    const krw = Math.round(usdPrice * 1400);
    return includeUnit ? `₩${krw.toLocaleString()} KRW` : `₩${krw.toLocaleString()}`;
  }
  const formatted = Number.isInteger(usdPrice) ? usdPrice.toLocaleString() : usdPrice.toFixed(2);
  return includeUnit ? `$${formatted} USD` : `$${formatted}`;
}

function applyTranslations() {
  const lang = currentLang;
  const isKo = lang === 'ko';
  document.documentElement.lang = lang;
  document.title = isKo ? 'PDPBOOST — 상세페이지 디자인 | 전환 중심 이커머스 상세페이지' : 'PDPBOOST — Product Detail Page Design | Conversion-focused E-commerce Pages';

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.content = isKo ? '브랜드, 마켓플레이스 셀러, Shopify 스토어를 위한 전환 중심 상세페이지 디자인 서비스입니다.' : 'Conversion-focused product detail pages for brands, marketplace sellers, and Shopify stores.';
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogDesc = document.querySelector('meta[property="og:description"]');
  const twTitle = document.querySelector('meta[name="twitter:title"]');
  const twDesc = document.querySelector('meta[name="twitter:description"]');
  if (ogTitle) ogTitle.content = document.title;
  if (twTitle) twTitle.content = document.title;
  if (ogDesc) ogDesc.content = metaDesc ? metaDesc.content : '';
  if (twDesc) twDesc.content = metaDesc ? metaDesc.content : '';

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const text = translations[lang] && translations[lang][key];
    if (text) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') el.placeholder = text;
      else el.innerHTML = text;
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

function renderPackages() {
  const container = document.getElementById('pdp-packages');
  if (!container) return;
  const cat = packageCatalog.pdp;
  const btnText = translations[currentLang]['order-button'];
  const isKo = currentLang === 'ko';
  container.innerHTML = cat.packages.map(pkg => `
    <article class="package-card ${pkg.featured ? 'featured' : ''}">
      ${pkg.featured ? `<span class="featured-tag">${translations[currentLang]['featured-badge']}</span>` : ''}
      <div class="card-icon"><i class="fa-solid fa-box-open"></i></div>
      <h3>${isKo ? pkg.name_ko : pkg.name_en}</h3>
      <p class="package-desc">${isKo ? pkg.desc_ko : pkg.desc_en}</p>
      <div class="package-price-box">
        <button class="price-chip" type="button" onclick="openPurchaseModal('pdp', '${pkg.id}')">
          <span class="price">${formatPrice(pkg.price, false)}</span>
          <span class="currency">${currentLang === 'ko' ? 'KRW' : 'USD'}</span>
        </button>
      </div>
      <ul class="package-features">
        ${(isKo ? pkg.features_ko : pkg.features_en).map(f => `<li><i class="fa-solid fa-circle-check"></i> ${f}</li>`).join('')}
      </ul>
      <button class="btn-buy" type="button" onclick="openPurchaseModal('pdp', '${pkg.id}')"><i class="fa-solid fa-cart-shopping"></i> ${btnText}</button>
    </article>
  `).join('');
}

function getCategoryIcon() {
  return 'fa-solid fa-box-open';
}

function navigate(viewId) {
  document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
  const activeSection = document.getElementById(`${viewId}-view`);
  if (activeSection) activeSection.classList.add('active');
  document.querySelectorAll('.nav-links a').forEach(link => link.classList.remove('active'));
  const activeLink = document.getElementById(`nav-${viewId}`);
  if (activeLink) activeLink.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleMobileMenu() {
  const drawer = document.getElementById('mobile-drawer');
  if (drawer) drawer.classList.toggle('active');
}

function openPurchaseModal(categoryKey, packageId) {
  const category = packageCatalog[categoryKey];
  if (!category) return;
  const pkg = category.packages.find(p => p.id === packageId);
  if (!pkg) return;

  currentPackage = {
    categoryKey,
    categoryName: currentLang === 'ko' ? category.title_ko : category.title_en,
    tierName: currentLang === 'ko' ? pkg.name_ko : pkg.name_en,
    basePrice: pkg.price
  };
  orderQuantity = 1;

  document.getElementById('modal-product-title').innerText = currentLang === 'ko' ? '주문 설정' : 'Configure Order';
  document.getElementById('modal-product-desc').innerText = currentLang === 'ko' ? '수량을 선택하고 세부 사항을 확인한 뒤 PayPal 안전 결제를 진행하세요.' : 'Choose quantity, confirm details, and use PayPal secure checkout.';
  document.getElementById('modal-package-name').innerText = currentLang === 'ko' ? pkg.name_ko : pkg.name_en;
  document.getElementById('modal-base-price').innerText = formatPrice(pkg.price);
  const productSelect = document.getElementById('order-product');
  if (productSelect) productSelect.value = 'Shopify Store';
  const qtyInput = document.getElementById('order-quantity');
  if (qtyInput) qtyInput.value = '1';
  const emailInput = document.getElementById('order-email');
  if (emailInput) {
    emailInput.value = '';
    emailInput.style.borderColor = 'var(--border)';
  }
  const emailError = document.getElementById('email-error');
  if (emailError) emailError.style.display = 'none';

  updateModalPrice();

  const totalEl = document.getElementById('modal-total-price');
  if (totalEl && !totalEl.dataset.checkoutBound) {
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
    const modalCard = document.querySelector('.modal-card');
    const totalBox = document.querySelector('.total-price-box');
    if (modalCard && totalBox) modalCard.scrollTop = Math.max(0, totalBox.offsetTop - 20);
  }, 200);
  initPayPalButtons();
}

function closeModal() {
  document.getElementById('purchase-modal').classList.remove('active');
  const container = document.getElementById('paypal-button-container');
  if (container) container.innerHTML = '';
  paypalButtonInstance = null;
}

function adjustQty(amount) {
  const qtyInput = document.getElementById('order-quantity');
  const next = Math.max(1, (parseInt(qtyInput.value, 10) || 1) + amount);
  qtyInput.value = String(next);
  orderQuantity = next;
  updateModalPrice();
}

function updateModalPrice() {
  const qtyInput = document.getElementById('order-quantity');
  const next = Math.max(1, parseInt(qtyInput.value, 10) || 1);
  orderQuantity = next;
  const total = currentPackage ? currentPackage.basePrice * orderQuantity : 0;
  const totalEl = document.getElementById('modal-total-price');
  if (totalEl) totalEl.innerText = formatPrice(total);
}

function validateEmailField() {
  const emailInput = document.getElementById('order-email');
  const emailError = document.getElementById('email-error');
  if (!emailInput) return true;
  const email = emailInput.value.trim();
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!ok) {
    emailInput.style.borderColor = '#ef4444';
    if (emailError) {
      emailError.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> ${translations[currentLang]['modal-email-error'] || 'Please enter a valid email address.'}`;
      emailError.style.display = 'block';
    }
    return false;
  }
  emailInput.style.borderColor = 'var(--border)';
  if (emailError) emailError.style.display = 'none';
  return true;
}

function triggerTestCheckout() {
  const emailInput = document.getElementById('order-email');
  if (emailInput && !emailInput.value.trim()) emailInput.value = 'sandbox@test.dev';
  if (!validateEmailField()) return;
  saveLocalOrder({ id: `TEST-PAYID-${Math.random().toString(36).slice(2, 10).toUpperCase()}`, isTest: true });
  closeModal();
}

function initPayPalButtons() {
  const container = document.getElementById('paypal-button-container');
  if (!container) return;
  if (typeof paypal === 'undefined') {
    container.innerHTML = '<p style="color:#ef4444;text-align:center;font-size:0.9rem;padding:1rem;font-weight:600;"><i class="fa-solid fa-triangle-exclamation"></i> PayPal system is unavailable.</p>';
    return;
  }
  if (paypalButtonInstance) {
    container.innerHTML = '';
  }
  paypalButtonInstance = paypal.Buttons({
    style: { layout: 'vertical', color: 'blue', shape: 'rect', label: 'checkout' },
    onClick: (_, actions) => validateEmailField() ? actions.resolve() : actions.reject(),
    createOrder: (_, actions) => {
      const product = document.getElementById('order-product')?.value || 'Shopify Store';
      const finalAmount = (currentPackage.basePrice * orderQuantity).toFixed(2);
      return actions.order.create({ purchase_units: [{ description: `${currentPackage.categoryName} - ${currentPackage.tierName} [${product}] (Qty: ${orderQuantity})`, amount: { currency_code: 'USD', value: finalAmount } }] });
    },
    onApprove: (_, actions) => actions.order.capture().then(details => { saveLocalOrder(details); closeModal(); }),
    onError: err => {
      console.error('PayPal Checkout error:', err);
      alert('An error occurred during payment processing. Please try again.');
    }
  });
  paypalButtonInstance.render('#paypal-button-container');
}

function saveLocalOrder(details) {
  const orders = JSON.parse(localStorage.getItem('pdpboost_orders')) || [];
  const product = document.getElementById('order-product')?.value || 'Shopify Store';
  const emailVal = document.getElementById('order-email') ? document.getElementById('order-email').value.trim() : '';
  const newOrder = {
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
    id: details.id,
    email: emailVal,
    category: currentPackage.categoryName,
    package: currentPackage.tierName,
    target: product,
    quantity: orderQuantity,
    basePrice: currentPackage.basePrice,
    totalPaid: formatPrice(currentPackage.basePrice * orderQuantity),
    status: 'Completed'
  };
  orders.unshift(newOrder);
  localStorage.setItem('pdpboost_orders', JSON.stringify(orders));
  renderOrders();

  const dict = translations[currentLang];
  const receiptText = [
    '===================================',
    `   ${currentLang === 'ko' ? 'PDPBOOST 영수증' : 'PDPBOOST RECEIPT'}`,
    '===================================',
    `${currentLang === 'ko' ? '주문 날짜' : 'Order Date'} : ${newOrder.date}`,
    `${currentLang === 'ko' ? '거래 ID' : 'Transaction ID'} : ${newOrder.id}`,
    `${currentLang === 'ko' ? '고객 이메일' : 'Customer Email'} : ${newOrder.email}`,
    `${currentLang === 'ko' ? '상품 종류' : 'Product Type'} : ${newOrder.category}`,
    `${currentLang === 'ko' ? '패키지 등급' : 'Package Tier'} : ${newOrder.package}`,
    `${currentLang === 'ko' ? '대상 카테고리' : 'Target Category'} : ${newOrder.target}`,
    `${currentLang === 'ko' ? '수량' : 'Quantity'} : ${newOrder.quantity}`,
    `${currentLang === 'ko' ? '기본 가격' : 'Base Price'} : ${formatPrice(newOrder.basePrice)}`,
    `${currentLang === 'ko' ? '총 결제금액' : 'Total Paid'} : ${newOrder.totalPaid}`,
    `${currentLang === 'ko' ? '상태' : 'Status'} : ${newOrder.status}`,
    '-----------------------------------',
    `${currentLang === 'ko' ? '결제 방법' : 'Payment Method'} : PayPal Secure Checkout`,
    '===================================' 
  ].join('\n');

  const encodedReceipt = encodeURIComponent(receiptText);
  const redirectUrl = `https://docs.google.com/forms/d/e/1FAIpQLScMPqbEWWttS5mb1m_krsO_kco24ImpgvYVSbc7zO0nEVmYFw/viewform?entry.1059822061=${encodedReceipt}`;
  window.location.href = redirectUrl;
}

function renderOrders() {
  const orders = JSON.parse(localStorage.getItem('pdpboost_orders')) || [];
  const tbody = document.getElementById('orders-tbody');
  const noOrdersMsg = document.getElementById('no-orders-msg');
  if (!tbody) return;
  if (!orders.length) {
    tbody.innerHTML = '';
    if (noOrdersMsg) noOrdersMsg.style.display = 'block';
    return;
  }
  if (noOrdersMsg) noOrdersMsg.style.display = 'none';
  tbody.innerHTML = orders.map(order => `
    <tr>
      <td>${order.date}</td>
      <td class="tx-id">${order.id}</td>
      <td>${order.category}</td>
      <td>${order.package}</td>
      <td>${order.target || 'Global'}</td>
      <td>${order.quantity}</td>
      <td><strong>${order.totalPaid}</strong></td>
      <td><span class="status-badge">${order.status}</span></td>
    </tr>
  `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  applyTranslations();
  renderPackages();
  renderOrders();
  document.querySelectorAll('.faq-item').forEach(item => {
    item.querySelector('button')?.addEventListener('click', () => item.classList.toggle('open'));
  });
  const defaultView = document.querySelector('.view-section.active') ? 'home' : 'home';
  navigate(defaultView);
  const totalEl = document.getElementById('modal-total-price');
  if (totalEl) {
    totalEl.style.cursor = 'pointer';
    totalEl.setAttribute('role', 'button');
    totalEl.setAttribute('tabindex', '0');
  }
  const initial = localStorage.getItem('bibleforai_lang') || 'en';
  currentLang = initial;
  applyTranslations();
});

window.openPurchaseModal = openPurchaseModal;
window.closeModal = closeModal;
window.adjustQty = adjustQty;
window.changeLanguage = changeLanguage;
window.navigate = navigate;
window.toggleMobileMenu = toggleMobileMenu;
window.triggerTestCheckout = triggerTestCheckout;
