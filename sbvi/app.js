// SBVI app state
const STORAGE_KEY = 'sbvi_orders';
const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScMPqbEWWttS5mb1m_krsO_kco24ImpgvYVSbc7zO0nEVmYFw/viewform?entry.1059822061=';
const BASE_PATH = window.location.pathname.includes('/kr/') ? '/sbvi/kr/' : '/sbvi/';
const isKrPage = window.location.pathname.includes('/kr/');
let currentLang = isKrPage ? 'ko' : 'en';
let currentPackage = null;
let orderQuantity = 1;

const packageCatalog = {
  basic: {
    title_en: 'Jurisdiction Scout',
    title_ko: '관할지역 스카우트',
    packages: [{
      id: 'starter',
      name_en: 'Starter',
      name_ko: '스타터',
      desc_en: 'Identify the best jurisdiction — Singapore, Hong Kong, or BVI — and map the filing path before you commit to a full setup.',
      desc_ko: '싱가포르, 홍콩, BVI 중 가장 적합한 관할을 정하고, 전체 설립 전에 필요한 절차를 정리합니다.',
      price: 1500,
      featured: false,
      features_en: ['Jurisdiction shortlist', 'Entity-type guidance', 'Document checklist', '1 quick revision'],
      features_ko: ['관할지역 추천', '법인 유형 가이드', '서류 체크리스트', '빠른 수정 1회']
    }]
  },
  pro: {
    title_en: 'Incorporation Package',
    title_ko: '법인설립 패키지',
    packages: [{
      id: 'incorporation',
      name_en: 'Incorporation',
      name_ko: '법인설립',
      desc_en: 'Prepare incorporation documents, director/shareholder details, and the launch checklist for your target market.',
      desc_ko: '법인설립 서류, 이사/주주 정보, 런칭 체크리스트를 준비합니다.',
      price: 3500,
      featured: true,
      features_en: ['Incorporation workflow', 'Director/shareholder docs', 'Launch checklist', '2 revisions'],
      features_ko: ['법인설립 절차', '이사/주주 서류', '런칭 체크리스트', '수정 2회']
    }]
  },
  enterprise: {
    title_en: 'Full Setup & Banking',
    title_ko: '풀 세팅 & 뱅킹',
    packages: [{
      id: 'full-setup',
      name_en: 'Full Setup',
      name_ko: '풀 세팅',
      desc_en: 'Run the full cross-border setup with incorporation, bank prep, visa/document guidance, and compliance notes.',
      desc_ko: '법인설립, 은행 준비, 비자/서류 가이드, 컴플라이언스 노트까지 포함한 풀 패키지입니다.',
      price: 5000,
      featured: false,
      features_en: ['Full incorporation flow', 'Bank-prep checklist', 'Visa/document guidance', 'Compliance notes'],
      features_ko: ['법인설립 전체 절차', '은행 준비 체크리스트', '비자/서류 가이드', '컴플라이언스 노트']
    }]
  }
};
const translations = {
  en: {
    'logo-subtitle': 'SBVI',
    'nav-home': 'Home',
    'nav-basic': 'Scout',
    'nav-pro': 'Incorporation',
    'nav-enterprise': 'Full Setup',
    'btn-orders': 'My Orders',
    'hero-badge': 'Singapore · Hong Kong · BVI Setup',
    'hero-title': 'SBVI — Singapore, Hong Kong & BVI Incorporation',
    'hero-desc': 'Based on a KMong service priced at ₩3,500,000, this offer helps founders structure an international entity and launch with the right documents.',
    'btn-explore': 'View Packages',
    'btn-how': 'How It Works',
    'stat-1': 'Packages',
    'stat-2': 'Markets',
    'stat-3': 'Docs Ready',
    'stat-4': 'Fast Support',
    'sec-packages-title': 'Choose Your Incorporation Package',
    'sec-packages-subtitle': 'Select a package, click the price to open the checkout flow, and review the receipt on Google Form.',
    'card-basic-title': 'Jurisdiction Scout',
    'card-basic-desc': 'Identify the best jurisdiction and filing path before committing to a full setup.',
    'card-pro-title': 'Incorporation Package',
    'card-pro-desc': 'Prepare incorporation documents, director/shareholder details, and the launch checklist.',
    'card-enterprise-title': 'Full Setup & Banking',
    'card-enterprise-desc': 'Full cross-border setup with incorporation, bank prep, visa/document guidance, and compliance notes.',
    'card-view-pricing': 'View Plan',
    'how-title': 'How SBVI Works',
    'how-desc': 'We keep the flow simple: choose a package, review the brief, pay securely, and complete the receipt form.',
    'how-step1-bold': '1. Brief:',
    'how-step1-text': 'Tell us your target jurisdiction, company type, and website.',
    'how-step2-bold': '2. Build:',
    'how-step2-text': 'We prepare the incorporation roadmap, documents, and setup notes.',
    'how-step3-bold': '3. Checkout:',
    'how-step3-text': 'Click the total price in the modal to trigger the test checkout flow.',
    'how-step4-bold': '4. Receipt:',
    'how-step4-text': 'You are redirected to Google Form with encoded receipt details.',
    'faq-title': 'Frequently Asked Questions',
    'faq-subtitle': 'Quick answers about pricing, delivery, and checkout.',
    'faq-q1': 'Is this only for one country?',
    'faq-a1': 'No. It is designed for founders comparing Singapore, Hong Kong, and BVI setup paths.',
    'faq-q2': 'What happens when I click the total price?',
    'faq-a2': 'Clicking the total price saves a local order, then opens the Google Form receipt flow.',
    'faq-q3': 'What inputs do you need?',
    'faq-a3': 'Your target jurisdiction, company type, business model, and website or channel URL.',
    'faq-q4': 'Who is this service for?',
    'faq-a4': 'Founders, agencies, e-commerce brands, SaaS teams, and cross-border operators.',
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
    'modal-title': 'Configure Your Incorporation Order',
    'modal-desc': 'Fill in the details, then click the total price for checkout.',
    'modal-base-pkg': 'Package',
    'modal-base-price-label': 'Base Price',
    'modal-email-label': 'Email Address *',
    'modal-email-placeholder': 'name@example.com',
    'modal-email-error': 'Please enter a valid email address.',
    'modal-jurisdiction-label': 'Target Jurisdiction / Entity Type',
    'modal-jurisdiction-placeholder': 'e.g. Singapore Pte. Ltd., Hong Kong Ltd., BVI company',
    'modal-business-label': 'Business Model / Industry',
    'modal-business-placeholder': 'e.g. SaaS, e-commerce, consulting, holding company',
    'modal-site-label': 'Website / Company URL',
    'modal-site-placeholder': 'https://example.com',
    'modal-qty': 'Quantity',
    'modal-total-amt': 'Total Amount',
    'badge-ssl': 'SSL Secured Checkout',
    'badge-paypal': 'PayPal Verified',
    'footer-link': 'SBVI Home',
    'receipt-header': 'SBVI RECEIPT',
    'receipt-date': 'Order Date',
    'receipt-txid': 'Transaction ID',
    'receipt-email': 'Customer Email',
    'receipt-type': 'Product Type',
    'receipt-size': 'Package Size',
    'receipt-jurisdiction': 'Target Jurisdiction',
    'receipt-business': 'Business Model',
    'receipt-site': 'Website / Company URL',
    'receipt-qty': 'Quantity',
    'receipt-baseprice': 'Base Price',
    'receipt-total': 'Total Paid',
    'receipt-status': 'Status',
    'receipt-method': 'Payment Method',
    'receipt-method-val': 'PayPal Secure Checkout'
  },
  ko: {
    'logo-subtitle': 'SBVI',
    'nav-home': '홈',
    'nav-basic': '스카우트',
    'nav-pro': '법인설립',
    'nav-enterprise': '풀 세팅',
    'btn-orders': '주문 내역',
    'hero-badge': '싱가포르 · 홍콩 · BVI 설립',
    'hero-title': 'SBVI — 싱가포르, 홍콩 & BVI 법인설립',
    'hero-desc': '₩3,500,000 크몽 서비스를 바탕으로, 해외 법인 구조를 설계하고 필요한 서류로 런칭할 수 있도록 돕습니다.',
    'btn-explore': '패키지 보기',
    'btn-how': '진행 방식',
    'stat-1': '패키지',
    'stat-2': '관할',
    'stat-3': '서류 준비',
    'stat-4': '빠른 지원',
    'sec-packages-title': '법인설립 패키지를 선택하세요',
    'sec-packages-subtitle': '패키지를 고르고, 가격을 클릭해 체크아웃 흐름을 열고, Google Form 영수증을 확인하세요.',
    'card-basic-title': '관할지역 스카우트',
    'card-basic-desc': '풀 세팅 전에 가장 적합한 관할과 설립 경로를 정리합니다.',
    'card-pro-title': '법인설립 패키지',
    'card-pro-desc': '법인설립 서류, 이사/주주 정보, 런칭 체크리스트를 준비합니다.',
    'card-enterprise-title': '풀 세팅 & 뱅킹',
    'card-enterprise-desc': '법인설립, 은행 준비, 비자/서류 가이드, 컴플라이언스 노트를 모두 포함합니다.',
    'card-view-pricing': '플랜 보기',
    'how-title': 'SBVI 진행 방식',
    'how-desc': '패키지 선택 → 브리프 확인 → 안전 결제 → 영수증 폼 작성의 간단한 흐름으로 진행됩니다.',
    'how-step1-bold': '1. 브리프:',
    'how-step1-text': '희망 관할, 법인 형태, 웹사이트 정보를 전달하세요.',
    'how-step2-bold': '2. 설계:',
    'how-step2-text': '법인설립 로드맵, 필요 서류, 세팅 노트를 준비합니다.',
    'how-step3-bold': '3. 결제:',
    'how-step3-text': '모달의 총액을 클릭하면 테스트 체크아웃 흐름이 실행됩니다.',
    'how-step4-bold': '4. 영수증:',
    'how-step4-text': '암호화된 영수증 정보와 함께 Google Form으로 이동합니다.',
    'faq-title': '자주 묻는 질문',
    'faq-subtitle': '가격, 작업, 결제 흐름에 대한 간단한 안내입니다.',
    'faq-q1': '한 국가만 대상인가요?',
    'faq-a1': '아니요. 싱가포르, 홍콩, BVI 설립 경로를 비교하는 창업자에게 맞춰져 있습니다.',
    'faq-q2': '총액을 클릭하면 어떻게 되나요?',
    'faq-a2': '총액을 클릭하면 로컬 주문이 저장된 뒤 Google Form 영수증 흐름이 열립니다.',
    'faq-q3': '어떤 입력이 필요한가요?',
    'faq-a3': '희망 관할, 법인 형태, 비즈니스 모델, 웹사이트 또는 채널 URL이 필요합니다.',
    'faq-q4': '이 서비스는 누구에게 적합한가요?',
    'faq-a4': '창업자, 에이전시, 이커머스 브랜드, SaaS 팀, 크로스보더 사업자에게 적합합니다.',
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
    'modal-title': '법인설립 주문 설정',
    'modal-desc': '세부 정보를 입력한 뒤 총액을 클릭해 결제를 진행하세요.',
    'modal-base-pkg': '패키지',
    'modal-base-price-label': '기본 가격',
    'modal-email-label': '이메일 주소 *',
    'modal-email-placeholder': 'name@example.com',
    'modal-email-error': '유효한 이메일 주소를 입력해주세요.',
    'modal-jurisdiction-label': '희망 관할 / 법인 형태',
    'modal-jurisdiction-placeholder': '예: Singapore Pte. Ltd., Hong Kong Ltd., BVI company',
    'modal-business-label': '비즈니스 모델 / 업종',
    'modal-business-placeholder': '예: SaaS, 이커머스, 컨설팅, 지주회사',
    'modal-site-label': '웹사이트 / 회사 URL',
    'modal-site-placeholder': 'https://example.com',
    'modal-qty': '수량',
    'modal-total-amt': '총액',
    'badge-ssl': 'SSL 보안 결제',
    'badge-paypal': 'PayPal 인증',
    'footer-link': 'SBVI 홈',
    'receipt-header': 'SBVI 영수증',
    'receipt-date': '주문 날짜',
    'receipt-txid': '거래 ID',
    'receipt-email': '고객 이메일',
    'receipt-type': '상품 종류',
    'receipt-size': '패키지 등급',
    'receipt-jurisdiction': '희망 관할',
    'receipt-business': '비즈니스 모델',
    'receipt-site': '웹사이트 / 회사 URL',
    'receipt-qty': '수량',
    'receipt-baseprice': '기본 가격',
    'receipt-total': '총 결제금액',
    'receipt-status': '상태',
    'receipt-method': '결제 방식',
    'receipt-method-val': 'PayPal 안전 결제'
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
    window.location.href = '/sbvi/kr/';
  } else if (lang === 'en' && isKrPage) {
    window.location.href = '/sbvi/';
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
  const footerLink = document.getElementById('footer-sbvi-link');
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
    case 'basic': return 'fa-solid fa-compass';
    case 'pro': return 'fa-solid fa-building-columns';
    case 'enterprise': return 'fa-solid fa-shield-halved';
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
  const jurisdiction = document.getElementById('order-jurisdiction')?.value.trim() || '-';
  const business = document.getElementById('order-business')?.value.trim() || '-';
  const website = document.getElementById('order-website')?.value.trim() || '-';
  const txId = `SBV-${Math.random().toString(36).slice(2, 10).toUpperCase()}`;
  const totalPaid = currentPackage ? currentPackage.basePrice * orderQuantity : 0;
  const productName = currentPackage ? `${currentPackage.categoryKey.toUpperCase()}-${currentPackage.packageId.toUpperCase()}` : 'SBVI';

  const orderData = {
    date: new Date().toISOString().slice(0, 10),
    id: txId,
    product: `SBVI - ${productName}`,
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
    '          SBVI RECEIPT',
    '===================================',
    `Order Date     : ${orderData.date}`,
    `Transaction ID : ${orderData.id}`,
    `Customer Email : ${orderData.email}`,
    `Product Name   : ${orderData.product}`,
    `Package Tier   : ${orderData.tier}`,
    `Target Jurisdiction : ${jurisdiction}`,
    `Business Model  : ${business}`,
    `Website        : ${website}`,
    `Quantity       : ${orderData.qty}`,
    `Total Paid     : ${orderData.total}`,
    `Status         : ${orderData.status}`,
    '-----------------------------------',
    'Payment Method : PayPal Secure Checkout',
    '===================================' 
  ].join('\\n');

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
        const jurisdiction = document.getElementById('order-jurisdiction')?.value.trim() || '-';
        const business = document.getElementById('order-business')?.value.trim() || '-';
        const website = document.getElementById('order-website')?.value.trim() || '-';
        const txId = `PP-${(data.orderID || Math.random().toString(36).slice(2, 10)).toUpperCase()}`;
        const orderData = {
          date: new Date().toISOString().slice(0, 10),
          id: txId,
          product: `SBVI - ${currentPackage.packageId.toUpperCase()}`,
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
          '          SBVI RECEIPT',
          '===================================',
          `Order Date     : ${orderData.date}`,
          `Transaction ID : ${orderData.id}`,
          `Customer Email : ${orderData.email}`,
          `Product Name   : ${orderData.product}`,
          `Package Tier   : ${orderData.tier}`,
          `Target Jurisdiction : ${jurisdiction}`,
          `Business Model  : ${business}`,
          `Website        : ${website}`,
          `Quantity       : ${orderData.qty}`,
          `Total Paid     : ${orderData.total}`,
          `Status         : ${orderData.status}`,
          '-----------------------------------',
          'Payment Method : PayPal Secure Checkout',
          '===================================' 
        ].join('\\n');
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
