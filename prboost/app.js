// PRBOOST app state
const STORAGE_KEY = 'prboost_orders';
const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScMPqbEWWttS5mb1m_krsO_kco24ImpgvYVSbc7zO0nEVmYFw/viewform?entry.1059822061=';
const BASE_PATH = window.location.pathname.includes('/kr/') ? '/prboost/kr/' : '/prboost/';
const isKrPage = window.location.pathname.includes('/kr/');
let currentLang = isKrPage ? 'ko' : 'en';
let currentPackage = null;
let orderQuantity = 1;

const packageCatalog = {
  basic: {
    title_en: 'Standard PR Writing',
    title_ko: '스탠다드 보도자료 작성',
    packages: [
      {
        id: 'standard',
        name_en: 'Standard',
        name_ko: '스탠다드',
        desc_en: 'English press release rewrite for brands that need a polished, globally readable announcement.',
        desc_ko: '브랜드 소식을 글로벌 톤에 맞는 영문 보도자료로 정리합니다.',
        price: 110,
        featured: false,
        features_en: ['1 press release draft', 'Global tone & structure', '1 revision', '24–48h turnaround'],
        features_ko: ['보도자료 초안 1건', '글로벌 톤 & 구조 정리', '수정 1회', '24~48시간 내 작업']
      }
    ]
  },
  pro: {
    title_en: 'Custom PR Copy',
    title_ko: '맞춤형 PR 카피',
    packages: [
      {
        id: 'deluxe',
        name_en: 'Deluxe',
        name_ko: '딜럭스',
        desc_en: 'A custom PR article built from your brief, launch notes, or existing Korean article.',
        desc_ko: '브리프나 한국어 원고를 바탕으로 맞춤형 PR 기사로 작성합니다.',
        price: 283,
        featured: true,
        features_en: ['Custom article writing', 'Media-ready formatting', '1 revision', 'Message polishing'],
        features_ko: ['맞춤형 기사 작성', '미디어 송출 형식 정리', '수정 1회', '핵심 메시지 다듬기']
      }
    ]
  },
  enterprise: {
    title_en: 'Distribution & Coverage',
    title_ko: '배포 & 커버리지',
    packages: [
      {
        id: 'premium',
        name_en: 'Premium',
        name_ko: '프리미엄',
        desc_en: 'Overseas media distribution with coverage reporting and SEO-friendly placement support.',
        desc_ko: '해외 미디어 배포와 커버리지 리포트, SEO 친화형 노출을 지원합니다.',
        price: 990,
        featured: false,
        features_en: ['Overseas distribution', 'Coverage report', 'SEO support', '3-day delivery'],
        features_ko: ['해외 배포', '커버리지 리포트', 'SEO 지원', '3일 내 작업']
      },
      {
        id: 'elite',
        name_en: 'Elite',
        name_ko: '엘리트',
        desc_en: 'Highest-reach distribution bundle for major outlets, AI indexing, and podcast amplification.',
        desc_ko: '주요 매체 배포, AI 색인, 팟캐스트 확산까지 포함한 최상위 번들입니다.',
        price: 1886,
        featured: false,
        features_en: ['Major outlet reach', 'AI indexing', 'Podcast amplification', 'Coverage bundle'],
        features_ko: ['주요 매체 도달', 'AI 색인', '팟캐스트 확산', '커버리지 번들']
      }
    ]
  }
};

const translations = {
  en: {
    'logo-subtitle': 'PRBOOST',
    'nav-home': 'Home',
    'nav-basic': 'Standard',
    'nav-pro': 'Custom Copy',
    'nav-enterprise': 'Distribution',
    'btn-orders': 'My Orders',
    'hero-badge': 'Global PR & Press Distribution',
    'hero-title': 'PRBOOST — Global Press Release Distribution',
    'hero-desc': 'Turn your launch, announcement, or brand story into an English press release that is ready for overseas media and SEO-driven visibility.',
    'btn-explore': 'View Packages',
    'btn-how': 'How It Works',
    'stat-1': 'Packages',
    'stat-2': 'Media Reach',
    'stat-3': 'SEO Friendly',
    'stat-4': 'Fast Delivery',
    'sec-packages-title': 'Choose Your PR Package',
    'sec-packages-subtitle': 'Select a package, click the price to open the sandbox checkout flow, and review the receipt on Google Form.',
    'card-basic-title': 'Standard PR Writing',
    'card-basic-desc': 'English press release rewrite for brands that need a polished, globally readable announcement.',
    'card-pro-title': 'Custom PR Copy',
    'card-pro-desc': 'A custom PR article built from your brief, launch notes, or existing Korean article.',
    'card-enterprise-title': 'Distribution & Coverage',
    'card-enterprise-desc': 'Overseas distribution, coverage reporting, and major-outlet bundles.',
    'card-view-pricing': 'View Pricing',
    'how-title': 'How PRBOOST Works',
    'how-desc': 'We keep the flow simple: choose a package, review the draft, pay securely, and complete the receipt form.',
    'how-step1-bold': '1. Brief:',
    'how-step1-text': 'Share your target market, launch notes, and website.',
    'how-step2-bold': '2. Draft:',
    'how-step2-text': 'We create or rewrite the press release for global use.',
    'how-step3-bold': '3. Checkout:',
    'how-step3-text': 'Click the total price in the modal to trigger the sandbox test checkout flow.',
    'how-step4-bold': '4. Receipt:',
    'how-step4-text': 'You are redirected to Google Form with encoded receipt details.',
    'faq-title': 'Frequently Asked Questions',
    'faq-subtitle': 'A few quick answers about pricing, delivery, and checkout.',
    'faq-q1': 'Can I request a brand-new PR article from scratch?',
    'faq-a1': 'Yes. The Deluxe package is designed for new copy based on a brief, product launch, or company update.',
    'faq-q2': 'What does the price-click test checkout do?',
    'faq-a2': 'Clicking the total price saves a sandbox order locally and redirects to the Google Form receipt flow.',
    'faq-q3': 'Do you support overseas media distribution?',
    'faq-a3': 'Yes. The Premium and Elite tiers are built around overseas distribution and coverage reporting.',
    'faq-q4': 'Who is this service for?',
    'faq-a4': 'Founders, agencies, e-commerce brands, SaaS teams, and any company entering overseas markets.',
    'orders-title': 'My Orders',
    'orders-subtitle': 'Sandbox orders are stored locally in your browser.',
    'th-date': 'Date',
    'th-order-id': 'Transaction ID',
    'th-product': 'Product',
    'th-tier': 'Tier',
    'th-email': 'Email',
    'th-qty': 'Qty',
    'th-total': 'Total',
    'th-status': 'Status',
    'no-orders-msg': 'No purchase records found yet.',
    'modal-title': 'Configure Your PR Order',
    'modal-desc': 'Fill in the details, then click the total price for the sandbox checkout test.',
    'modal-base-pkg': 'Package',
    'modal-base-price-label': 'Base Price',
    'modal-email-label': 'Email Address *',
    'modal-email-placeholder': 'name@example.com',
    'modal-email-error': 'Please enter a valid email address.',
    'modal-keywords-label': 'Target Keywords / Angle',
    'modal-keywords-placeholder': 'e.g. fintech launch, AI platform, global expansion',
    'modal-site-label': 'Website URL',
    'modal-site-placeholder': 'https://example.com',
    'modal-qty': 'Quantity',
    'modal-total-amt': 'Total Amount',
    'badge-ssl': 'SSL Secured',
    'badge-paypal': 'PayPal Verified',
    'footer-link': 'PRBOOST Home'
  },
  ko: {
    'logo-subtitle': 'PRBOOST',
    'nav-home': '홈',
    'nav-basic': '스탠다드',
    'nav-pro': '맞춤 카피',
    'nav-enterprise': '배포',
    'btn-orders': '주문 내역',
    'hero-badge': '글로벌 PR & 보도자료 배포',
    'hero-title': 'PRBOOST — 글로벌 보도자료 배포',
    'hero-desc': '런칭, 발표, 브랜드 스토리를 해외 미디어와 SEO 노출에 적합한 영문 보도자료로 완성합니다.',
    'btn-explore': '패키지 보기',
    'btn-how': '진행 방식',
    'stat-1': '패키지',
    'stat-2': '미디어 도달',
    'stat-3': 'SEO 친화',
    'stat-4': '빠른 작업',
    'sec-packages-title': 'PR 패키지를 선택하세요',
    'sec-packages-subtitle': '패키지를 고르고, 가격 텍스트를 클릭하면 샌드박스 결제 흐름이 열립니다. 이후 Google Form 영수증으로 이동합니다.',
    'card-basic-title': '스탠다드 보도자료 작성',
    'card-basic-desc': '브랜드 소식을 세련된 글로벌 문체의 영문 보도자료로 정리합니다.',
    'card-pro-title': '맞춤형 PR 카피',
    'card-pro-desc': '브리프, 런칭 노트, 기존 한국어 원고를 바탕으로 신규 PR 기사를 작성합니다.',
    'card-enterprise-title': '배포 & 커버리지',
    'card-enterprise-desc': '해외 배포, 커버리지 리포트, 주요 매체 번들을 제공합니다.',
    'card-view-pricing': '가격 보기',
    'how-title': 'PRBOOST 진행 방식',
    'how-desc': '패키지 선택 → 원고 확인 → 안전 결제 → 영수증 폼 작성의 간단한 흐름으로 진행됩니다.',
    'how-step1-bold': '1. 브리프:',
    'how-step1-text': '타깃 시장, 런칭 내용, 웹사이트 정보를 전달하세요.',
    'how-step2-bold': '2. 초안:',
    'how-step2-text': '글로벌 용도에 맞게 보도자료를 작성/수정합니다.',
    'how-step3-bold': '3. 결제:',
    'how-step3-text': '모달의 총액 텍스트를 클릭하면 샌드박스 테스트 체크아웃이 실행됩니다.',
    'how-step4-bold': '4. 영수증:',
    'how-step4-text': '암호화된 영수증 정보와 함께 Google Form으로 이동합니다.',
    'faq-title': '자주 묻는 질문',
    'faq-subtitle': '가격, 작업, 결제 흐름에 대한 간단한 안내입니다.',
    'faq-q1': '처음부터 새로운 PR 원고를 작성해 주나요?',
    'faq-a1': '네. 딜럭스 패키지는 브리프, 제품 런칭, 회사 소식 기반의 신규 카피 작성에 적합합니다.',
    'faq-q2': '가격 텍스트 클릭 테스트 결제는 무엇인가요?',
    'faq-a2': '총액을 클릭하면 샌드박스 주문이 로컬에 저장되고 Google Form 영수증 흐름으로 이동합니다.',
    'faq-q3': '해외 미디어 배포도 지원하나요?',
    'faq-a3': '네. 프리미엄과 엘리트는 해외 배포와 커버리지 리포트에 중점을 둡니다.',
    'faq-q4': '이 서비스는 누구에게 적합한가요?',
    'faq-a4': '해외 진출 기업, 에이전시, 이커머스 브랜드, SaaS 팀, 스타트업 창업자에게 적합합니다.',
    'orders-title': '주문 내역',
    'orders-subtitle': '샌드박스 주문은 브라우저에 로컬 저장됩니다.',
    'th-date': '날짜',
    'th-order-id': '거래 ID',
    'th-product': '상품',
    'th-tier': '티어',
    'th-email': '이메일',
    'th-qty': '수량',
    'th-total': '합계',
    'th-status': '상태',
    'no-orders-msg': '아직 구매 기록이 없습니다.',
    'modal-title': 'PR 주문 설정',
    'modal-desc': '세부 정보를 입력한 뒤 총액 텍스트를 클릭하면 샌드박스 체크아웃 테스트가 진행됩니다.',
    'modal-base-pkg': '패키지',
    'modal-base-price-label': '기본 가격',
    'modal-email-label': '이메일 주소 *',
    'modal-email-placeholder': 'name@example.com',
    'modal-email-error': '유효한 이메일 주소를 입력해주세요.',
    'modal-keywords-label': '타깃 키워드 / 방향',
    'modal-keywords-placeholder': '예: 핀테크 런칭, AI 플랫폼, 글로벌 진출',
    'modal-site-label': '웹사이트 URL',
    'modal-site-placeholder': 'https://example.com',
    'modal-qty': '수량',
    'modal-total-amt': '총액',
    'badge-ssl': 'SSL 보안',
    'badge-paypal': 'PayPal 인증',
    'footer-link': 'PRBOOST 홈'
  }
};

function formatPrice(value) {
  return `$${Number(value).toFixed(2)}`;
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
    window.location.href = '/prboost/kr/';
  } else if (lang === 'en' && isKrPage) {
    window.location.href = '/prboost/';
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
  const footerLink = document.getElementById('footer-prboost-link');
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
            <span class="price-note">${currentLang === 'ko' ? '클릭하여 샌드박스 체크아웃' : 'Click for sandbox checkout'}</span>
          </div>
          <ul class="package-features">
            ${features.map(feat => `<li><i class="fa-solid fa-circle-check"></i> ${feat}</li>`).join('')}
          </ul>
          <button class="btn-buy" onclick="openPurchaseModal('${categoryKey}', '${pkg.id}')">
            <i class="fa-solid fa-cart-shopping"></i> ${dict['card-view-pricing'] || 'View Pricing'}
          </button>
        </div>`;
    }).join('');
  });
}

function getCategoryIcon(category) {
  switch (category) {
    case 'basic': return 'fa-solid fa-pen-nib';
    case 'pro': return 'fa-solid fa-wand-magic-sparkles';
    case 'enterprise': return 'fa-solid fa-globe';
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
  const qtyInput = document.getElementById('order-quantity');
  if (qtyInput) qtyInput.value = '1';
  const emailError = document.getElementById('email-error');
  if (emailError) emailError.style.display = 'none';
  const modal = document.getElementById('purchase-modal');
  if (modal) modal.classList.add('active');
  updateModalPrice();
  initPayPalButtons();
  setTimeout(() => {
    const modalCard = document.querySelector('.modal-card');
    const totalBox = document.querySelector('.total-price-box');
    if (modalCard && totalBox) modalCard.scrollTop = totalBox.offsetTop - 10;
  }, 800);
}

function closeModal() {
  const modal = document.getElementById('purchase-modal');
  if (modal) modal.classList.remove('active');
}

function updateModalPrice() {
  const qtyInput = document.getElementById('order-quantity');
  orderQuantity = Math.max(1, parseInt(qtyInput?.value || '1', 10) || 1);
  if (qtyInput) qtyInput.value = String(orderQuantity);
  const total = currentPackage ? currentPackage.basePrice * orderQuantity : 0;
  const totalEl = document.getElementById('modal-total-price');
  if (totalEl) totalEl.textContent = formatPrice(total);
}

function validateEmail() {
  const emailInput = document.getElementById('order-email');
  const emailError = document.getElementById('email-error');
  const value = (emailInput?.value || '').trim();
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  if (!ok) {
    if (emailError) emailError.style.display = 'block';
    return false;
  }
  if (emailError) emailError.style.display = 'none';
  return true;
}

function triggerTestCheckout() {
  if (!validateEmail()) return;
  const email = document.getElementById('order-email')?.value.trim() || 'sandbox@test.dev';
  const angle = document.getElementById('order-market')?.value.trim() || '-';
  const website = document.getElementById('order-website')?.value.trim() || '-';
  const txId = `PRB-${Math.random().toString(36).slice(2, 10).toUpperCase()}`;
  const totalPaid = currentPackage ? currentPackage.basePrice * orderQuantity : 0;
  const productName = currentPackage ? `${currentPackage.categoryKey.toUpperCase()}-${currentPackage.packageId.toUpperCase()}` : 'PRBOOST';

  const orderData = {
    date: new Date().toISOString().slice(0, 10),
    id: txId,
    product: `PRBOOST - ${productName}`,
    tier: currentPackage?.packageId || '-',
    email,
    qty: orderQuantity,
    total: formatPrice(totalPaid),
    status: 'Paid (Sandbox)'
  };

  const orders = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  orders.unshift(orderData);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  renderOrders();

  const receipt = [
    '===================================',
    '          PRBOOST RECEIPT',
    '===================================',
    `Order Date     : ${orderData.date}`,
    `Transaction ID : ${orderData.id}`,
    `Customer Email : ${orderData.email}`,
    `Product Name   : ${orderData.product}`,
    `Package Tier   : ${orderData.tier}`,
    `Target Angle   : ${angle}`,
    `Website        : ${website}`,
    `Quantity       : ${orderData.qty}`,
    `Total Paid     : ${orderData.total}`,
    `Status         : ${orderData.status}`,
    '-----------------------------------',
    'Payment Method : PayPal Secure Checkout',
    '==================================='
  ].join('\n');

  closeModal();
  window.location.href = GOOGLE_FORM_URL + encodeURIComponent(receipt);
}

function handlePurchaseSubmit(event) {
  if (event) event.preventDefault();
  if (!validateEmail()) return;
  triggerTestCheckout();
}

function renderOrders() {
  const tbody = document.getElementById('orders-tbody');
  if (!tbody) return;
  const orders = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  if (!orders.length) {
    tbody.innerHTML = `<tr><td colspan="8">${translations[currentLang]['no-orders-msg']}</td></tr>`;
    return;
  }
  tbody.innerHTML = orders.map(order => `
    <tr>
      <td>${order.date}</td>
      <td><code>${order.id}</code></td>
      <td>${order.product}</td>
      <td>${order.tier}</td>
      <td>${order.email}</td>
      <td>${order.qty}</td>
      <td><strong>${order.total}</strong></td>
      <td><span class="status-badge active">${order.status}</span></td>
    </tr>`).join('');
}

function initPayPalButtons() {
  const container = document.getElementById('paypal-button-container');
  if (!container || typeof paypal === 'undefined' || !paypal.Buttons) return;
  container.innerHTML = '';
  try {
    paypal.Buttons({
      style: { layout: 'vertical', color: 'gold', shape: 'rect', label: 'paypal' },
      createOrder: (data, actions) => actions.order.create({
        purchase_units: [{ amount: { value: Number((currentPackage.basePrice * orderQuantity).toFixed(2)) } }]
      }),
      onApprove: async (data, actions) => {
        const details = await actions.order.capture();
        const email = document.getElementById('order-email')?.value.trim() || details?.payer?.email_address || 'paypal@test.dev';
        const angle = document.getElementById('order-market')?.value.trim() || '-';
        const website = document.getElementById('order-website')?.value.trim() || '-';
        const txId = `PP-${(data.orderID || Math.random().toString(36).slice(2, 10)).toUpperCase()}`;
        const orderData = {
          date: new Date().toISOString().slice(0, 10),
          id: txId,
          product: `PRBOOST - ${currentPackage.packageId.toUpperCase()}`,
          tier: currentPackage.packageId,
          email,
          qty: orderQuantity,
          total: formatPrice(currentPackage.basePrice * orderQuantity),
          status: 'Paid (PayPal)'
        };
        const orders = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        orders.unshift(orderData);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
        renderOrders();
        const receipt = [
          '===================================',
          '          PRBOOST RECEIPT',
          '===================================',
          `Order Date     : ${orderData.date}`,
          `Transaction ID : ${orderData.id}`,
          `Customer Email : ${orderData.email}`,
          `Product Name   : ${orderData.product}`,
          `Package Tier   : ${orderData.tier}`,
          `Target Angle   : ${angle}`,
          `Website        : ${website}`,
          `Quantity       : ${orderData.qty}`,
          `Total Paid     : ${orderData.total}`,
          `Status         : ${orderData.status}`,
          '-----------------------------------',
          'Payment Method : PayPal Secure Checkout',
          '===================================' 
        ].join('\n');
        closeModal();
        window.location.href = GOOGLE_FORM_URL + encodeURIComponent(receipt);
      }
    }).render('#paypal-button-container');
  } catch (err) {
    console.warn('PayPal render failed', err);
  }
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
  if (totalEl) totalEl.addEventListener('click', triggerTestCheckout);
  const form = document.getElementById('purchase-form');
  if (form) form.addEventListener('submit', handlePurchaseSubmit);

  if (isKrPage) {
    localStorage.setItem('bibleforai_lang', 'ko');
  } else if (!localStorage.getItem('bibleforai_lang')) {
    localStorage.setItem('bibleforai_lang', 'en');
  }
});

window.navigate = navigate;
window.toggleMobileMenu = toggleMobileMenu;
window.changeLanguage = changeLanguage;
window.openPurchaseModal = openPurchaseModal;
window.closeModal = closeModal;
window.updateModalPrice = updateModalPrice;
window.handlePurchaseSubmit = handlePurchaseSubmit;
window.triggerTestCheckout = triggerTestCheckout;
