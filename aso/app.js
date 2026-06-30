// ASO app state
const STORAGE_KEY = 'aso_orders';
const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScMPqbEWWttS5mb1m_krsO_kco24ImpgvYVSbc7zO0nEVmYFw/viewform?entry.1059822061=';
const BASE_PATH = window.location.pathname.includes('/kr/') ? '/aso/kr/' : '/aso/';
const isKrPage = window.location.pathname.includes('/kr/');
let currentLang = isKrPage ? 'ko' : 'en';
let currentPackage = null;
let orderQuantity = 1;

const packageCatalog = {
  basic: {
    title_en: 'App Store Keyword Management',
    title_ko: '앱스토어 키워드 관리',
    packages: [
      {
        id: 'starter',
        name_en: 'Starter',
        name_ko: '스타터',
        desc_en: '30-day keyword ranking management for a newly launched app.',
        desc_ko: '출시 초기 앱을 위한 30일 키워드 순위 관리 서비스입니다.',
        price: 7.15,
        featured: false,
        features_en: ['30-day monitoring', 'App Store + Google Play', 'Weekly keyword report', '1 revision'],
        features_ko: ['30일 모니터링', '앱스토어 + 구글플레이', '주간 키워드 리포트', '수정 1회']
      }
    ]
  },
  pro: {
    title_en: 'ASO Growth Plan',
    title_ko: 'ASO 성장 플랜',
    packages: [
      {
        id: 'growth',
        name_en: 'Growth',
        name_ko: '그로스',
        desc_en: 'Listing optimization, competitor analysis, and rank tracking for growth teams.',
        desc_ko: '성장팀을 위한 스토어 최적화, 경쟁사 분석, 순위 추적 서비스입니다.',
        price: 12.9,
        featured: true,
        features_en: ['Rank tracking', 'Listing optimization', 'Competitor analysis', '2 revisions'],
        features_ko: ['순위 추적', '스토어 최적화', '경쟁사 분석', '수정 2회']
      }
    ]
  },
  enterprise: {
    title_en: 'ASO Elite',
    title_ko: 'ASO 엘리트',
    packages: [
      {
        id: 'elite',
        name_en: 'Elite',
        name_ko: '엘리트',
        desc_en: 'Localization, review strategy, and priority support for global apps.',
        desc_ko: '글로벌 앱을 위한 현지화, 리뷰 전략, 우선 지원 서비스입니다.',
        price: 21.4,
        featured: false,
        features_en: ['Store localization', 'Review strategy', 'Monthly support', 'Priority delivery'],
        features_ko: ['스토어 현지화', '리뷰 전략', '월간 지원', '우선 작업']
      }
    ]
  }
};

const translations = {
  en: {
    'logo-subtitle': 'ASO',
    'nav-home': 'Overview',
    'nav-basic': 'Starter',
    'nav-pro': 'Growth',
    'nav-enterprise': 'Elite',
    'btn-orders': 'My Orders',
    'hero-badge': 'App Store Optimization',
    'hero-title': 'ASO — App Store & Google Play Keyword Management',
    'hero-desc': 'Turn your app into a discoverable global product with monthly keyword ranking management, listing optimization, and review strategy.',
    'btn-explore': 'View Packages',
    'btn-how': 'How It Works',
    'stat-1': 'Packages',
    'stat-2': 'Stores',
    'stat-3': 'Keyword Rank',
    'stat-4': '30d Support',
    'sec-packages-title': 'Choose Your ASO Package',
    'sec-packages-subtitle': 'Pick a package, click the price to launch the sandbox checkout, and review the Google Form receipt flow.',
    'card-basic-title': 'App Store Keyword Management',
    'card-basic-desc': 'Monthly keyword ranking management for new or growing apps.',
    'card-pro-title': 'ASO Growth Plan',
    'card-pro-desc': 'Listing optimization, competitor analysis, and rank tracking for growth teams.',
    'card-enterprise-title': 'ASO Elite',
    'card-enterprise-desc': 'Localization, review strategy, and priority support for global apps.',
    'card-view-pricing': 'View Pricing',
    'pro-section-title': 'Growth Package',
    'enterprise-section-title': 'Elite Package',
    'how-title': 'How ASO Works',
    'how-desc': 'We keep the process simple: choose a tier, review the scope, pay securely, and complete the receipt form.',
    'how-step1-bold': '1. Brief:',
    'how-step1-text': 'Share your app URL, target keywords, and launch notes.',
    'how-step2-bold': '2. Draft:',
    'how-step2-text': 'We optimize the store listing and keyword strategy for global use.',
    'how-step3-bold': '3. Checkout:',
    'how-step3-text': 'Click the total price in the modal to trigger the sandbox test checkout flow.',
    'how-step4-bold': '4. Receipt:',
    'how-step4-text': 'You are redirected to Google Form with encoded receipt details.',
    'faq-title': 'Frequently Asked Questions',
    'faq-subtitle': 'A few quick answers about pricing, stores, and checkout.',
    'faq-q1': 'Do you work for both App Store and Google Play?',
    'faq-a1': 'Yes. The service is built for both App Store and Google Play keyword management.',
    'faq-q2': 'What does the price-click test checkout do?',
    'faq-a2': 'Clicking the total price saves a sandbox order locally and redirects to the Google Form receipt flow.',
    'faq-q3': 'Can you help with keyword research and listing optimization?',
    'faq-a3': 'Yes. The Growth and Elite tiers focus on keyword research, store listing optimization, and reporting.',
    'faq-q4': 'Who is this service for?',
    'faq-a4': 'App founders, startups, agencies, and in-house growth teams.',
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
    'modal-title': 'Configure Your ASO Order',
    'modal-desc': 'Fill in the details, then click the total price for the sandbox checkout test.',
    'modal-base-pkg': 'Package',
    'modal-base-price-label': 'Base Price',
    'modal-email-label': 'Email Address *',
    'modal-email-placeholder': 'name@example.com',
    'modal-email-error': 'Please enter a valid email address.',
    'modal-keywords-label': 'Target Keywords / App Angle',
    'modal-keywords-placeholder': 'e.g. meditation app, B2B SaaS, fitness launch',
    'modal-site-label': 'App Store / Google Play URL',
    'modal-site-placeholder': 'https://apps.apple.com/... or https://play.google.com/...',
    'modal-qty': 'Quantity',
    'modal-total-amt': 'Total Amount',
    'badge-ssl': 'SSL Secured',
    'badge-paypal': 'PayPal Verified',
    'footer-link': 'ASO Home'
  },
  ko: {
    'logo-subtitle': 'ASO',
    'nav-home': '개요',
    'nav-basic': '스타터',
    'nav-pro': '성장',
    'nav-enterprise': '엘리트',
    'btn-orders': '주문 내역',
    'hero-badge': '앱스토어 최적화',
    'hero-title': 'ASO — 앱스토어·구글플레이 키워드 관리',
    'hero-desc': '월간 키워드 순위 관리, 스토어 최적화, 리뷰 전략으로 앱의 글로벌 노출을 높입니다.',
    'btn-explore': '패키지 보기',
    'btn-how': '진행 방식',
    'stat-1': '패키지',
    'stat-2': '스토어',
    'stat-3': '키워드 순위',
    'stat-4': '30일 지원',
    'sec-packages-title': 'ASO 패키지를 선택하세요',
    'sec-packages-subtitle': '패키지를 고르고, 가격을 클릭하면 샌드박스 결제가 열립니다. 이후 Google Form 영수증으로 이동합니다.',
    'card-basic-title': '앱스토어 키워드 관리',
    'card-basic-desc': '신규 및 성장 중인 앱을 위한 30일 키워드 순위 관리입니다.',
    'card-pro-title': 'ASO 성장 플랜',
    'card-pro-desc': '성장팀을 위한 스토어 최적화, 경쟁사 분석, 순위 추적 서비스입니다.',
    'card-enterprise-title': 'ASO 엘리트',
    'card-enterprise-desc': '글로벌 앱을 위한 현지화, 리뷰 전략, 우선 지원 서비스입니다.',
    'card-view-pricing': '가격 보기',
    'pro-section-title': '성장 패키지',
    'enterprise-section-title': '엘리트 패키지',
    'how-title': 'ASO 진행 방식',
    'how-desc': '패키지 선택 → 범위 확인 → 안전 결제 → 영수증 폼 작성 순으로 진행됩니다.',
    'how-step1-bold': '1. 브리프:',
    'how-step1-text': '앱 URL, 타깃 키워드, 런칭 메모를 전달하세요.',
    'how-step2-bold': '2. 초안:',
    'how-step2-text': '글로벌 용도에 맞게 스토어 목록과 키워드 전략을 최적화합니다.',
    'how-step3-bold': '3. 결제:',
    'how-step3-text': '모달의 총액 텍스트를 클릭하면 샌드박스 테스트 체크아웃이 실행됩니다.',
    'how-step4-bold': '4. 영수증:',
    'how-step4-text': '암호화된 영수증 정보와 함께 Google Form으로 이동합니다.',
    'faq-title': '자주 묻는 질문',
    'faq-subtitle': '가격, 스토어, 결제 흐름에 대한 간단한 안내입니다.',
    'faq-q1': '앱스토어와 구글플레이 모두 지원하나요?',
    'faq-a1': '네. 이 서비스는 앱스토어와 구글플레이 키워드 관리에 맞춰 설계되었습니다.',
    'faq-q2': '가격 텍스트 클릭 테스트 결제는 무엇인가요?',
    'faq-a2': '총액을 클릭하면 샌드박스 주문이 로컬에 저장되고 Google Form 영수증 흐름으로 이동합니다.',
    'faq-q3': '키워드 리서치와 스토어 최적화도 도와주나요?',
    'faq-a3': '네. 성장과 엘리트 티어는 키워드 리서치, 스토어 최적화, 리포팅에 집중합니다.',
    'faq-q4': '이 서비스는 누구에게 적합한가요?',
    'faq-a4': '앱 창업자, 스타트업, 에이전시, 인하우스 성장팀에게 적합합니다.',
    'orders-title': '주문 내역',
    'orders-subtitle': '샌드박스 주문은 브라우저에 로컬 저장됩니다.',
    'th-date': '날짜',
    'th-order-id': '거래 ID',
    'th-product': '상품',
    'th-tier': '패키지',
    'th-email': '이메일',
    'th-qty': '수량',
    'th-total': '합계',
    'th-status': '상태',
    'no-orders-msg': '아직 구매 기록이 없습니다.',
    'modal-title': 'ASO 주문 설정',
    'modal-desc': '세부 정보를 입력한 뒤 총액 텍스트를 클릭하면 샌드박스 체크아웃 테스트가 진행됩니다.',
    'modal-base-pkg': '패키지',
    'modal-base-price-label': '기본 가격',
    'modal-email-label': '이메일 주소 *',
    'modal-email-placeholder': 'name@example.com',
    'modal-email-error': '유효한 이메일 주소를 입력해주세요.',
    'modal-keywords-label': '타깃 키워드 / 앱 방향',
    'modal-keywords-placeholder': '예: 명상 앱, B2B SaaS, 피트니스 출시',
    'modal-site-label': '앱스토어 / 구글플레이 URL',
    'modal-site-placeholder': 'https://apps.apple.com/... 또는 https://play.google.com/...',
    'modal-qty': '수량',
    'modal-total-amt': '총액',
    'badge-ssl': 'SSL 보안',
    'badge-paypal': 'PayPal 인증',
    'footer-link': 'ASO 홈'
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
    window.location.href = '/aso/kr/';
  } else if (lang === 'en' && isKrPage) {
    window.location.href = '/aso/';
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
  const footerLink = document.getElementById('footer-aso-link');
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
  const txId = `ASO-${Math.random().toString(36).slice(2, 10).toUpperCase()}`;
  const totalPaid = currentPackage ? currentPackage.basePrice * orderQuantity : 0;
  const productName = currentPackage ? `${currentPackage.packageId.toUpperCase()}` : 'ASO';

  const orderData = {
    date: new Date().toISOString().slice(0, 10),
    id: txId,
    product: `ASO - ${productName}`,
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
    '          ASO RECEIPT',
    '===================================',
    `Order Date     : ${orderData.date}`,
    `Transaction ID : ${orderData.id}`,
    `Customer Email : ${orderData.email}`,
    `Product Name   : ${orderData.product}`,
    `Package Tier   : ${orderData.tier}`,
    `Target Angle   : ${angle}`,
    `App URL        : ${website}`,
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
          product: `ASO - ${currentPackage.packageId.toUpperCase()}`,
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
          '          ASO RECEIPT',
          '===================================',
          `Order Date     : ${orderData.date}`,
          `Transaction ID : ${orderData.id}`,
          `Customer Email : ${orderData.email}`,
          `Product Name   : ${orderData.product}`,
          `Package Tier   : ${orderData.tier}`,
          `Target Angle   : ${angle}`,
          `App URL        : ${website}`,
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
