// FOREIGNCARE app state
const STORAGE_KEY = 'foreigncare_orders';
const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScMPqbEWWttS5mb1m_krsO_kco24ImpgvYVSbc7zO0nEVmYFw/viewform?entry.1059822061=';
const BASE_PATH = window.location.pathname.includes('/kr/') ? '/foreigncare/kr/' : '/foreigncare/';
const isKrPage = window.location.pathname.includes('/kr/');
if (isKrPage && localStorage.getItem('bibleforai_lang') !== 'ko') {
  localStorage.setItem('bibleforai_lang', 'ko');
}
let currentLang = localStorage.getItem('bibleforai_lang') || (isKrPage ? 'ko' : 'en');
let currentPackage = null;
let orderQuantity = 1;

const packageCatalog = {
  basic: {
    title_en: 'Starter Outreach',
    title_ko: '스타터 아웃리치',
    packages: [
      {
        id: 'starter',
        name_en: 'Starter',
        name_ko: '스타터',
        desc_en: 'Fast setup for one market with a clear lead angle and localized landing copy.',
        desc_ko: '하나의 시장을 대상으로 리드 각도와 로컬라이즈된 랜딩 문구를 빠르게 세팅합니다.',
        price: 43,
        featured: false,
        features_en: ['1 market brief', 'Target audience mapping', 'Localized message angle', '1 revision'],
        features_ko: ['시장 브리프 1건', '타깃 고객 맵핑', '로컬라이즈된 메시지 각도', '수정 1회']
      }
    ]
  },
  pro: {
    title_en: 'Growth Outreach',
    title_ko: '그로스 아웃리치',
    packages: [
      {
        id: 'growth',
        name_en: 'Growth',
        name_ko: '그로스',
        desc_en: 'Reddit, backlinks, and outreach copy tuned for international lead generation.',
        desc_ko: '레딧, 백링크, 아웃리치 문구를 활용한 국제 리드 제너레이션용 패키지입니다.',
        price: 89,
        featured: true,
        features_en: ['Reddit outreach', 'Backlink support', 'Lead capture copy', '2 revisions'],
        features_ko: ['레딧 아웃리치', '백링크 지원', '리드 캡처 문구', '수정 2회']
      }
    ]
  },
  enterprise: {
    title_en: 'Scale Outreach',
    title_ko: '스케일 아웃리치',
    packages: [
      {
        id: 'scale',
        name_en: 'Scale',
        name_ko: '스케일',
        desc_en: 'Multi-market acquisition plan with reporting and rollout guidance for expanding teams.',
        desc_ko: '다중 시장 확장 팀을 위한 리포트와 롤아웃 가이드를 포함한 종합 확장 플랜입니다.',
        price: 179,
        featured: false,
        features_en: ['Multi-market plan', 'Campaign reporting', 'Launch playbook', '3 revisions'],
        features_ko: ['다중 시장 플랜', '캠페인 리포팅', '런칭 플레이북', '수정 3회']
      }
    ]
  }
};

const translations = {
  en: {
    'logo-subtitle': 'FOREIGNCARE',
    'nav-home': 'Home',
    'nav-basic': 'Starter',
    'nav-pro': 'Growth',
    'nav-enterprise': 'Scale',
    'btn-orders': 'My Orders',
    'hero-badge': 'Global Lead Gen & Patient Outreach',
    'hero-title': 'FOREIGNCARE — Foreign Customer & Patient Acquisition',
    'hero-desc': 'Turn international demand into qualified leads with Reddit outreach, backlink support, and localized conversion copy.',
    'btn-explore': 'View Packages',
    'btn-how': 'How It Works',
    'stat-1': 'Packages',
    'stat-2': 'Channels',
    'stat-3': 'Markets',
    'stat-4': 'Fast Delivery',
    'sec-packages-title': 'Choose Your Acquisition Package',
    'sec-packages-subtitle': 'Pick a package, click the price to open the checkout flow, and review the receipt on Google Form.',
    'card-basic-title': 'Starter Outreach',
    'card-basic-desc': 'Fast setup for one market with a clear lead angle and localized landing copy.',
    'card-pro-title': 'Growth Outreach',
    'card-pro-desc': 'Reddit, backlinks, and outreach copy tuned for international lead generation.',
    'card-enterprise-title': 'Scale Outreach',
    'card-enterprise-desc': 'Multi-market acquisition plan with reporting and rollout guidance for expanding teams.',
    'card-view-pricing': 'View Pricing',
    'how-title': 'How FOREIGNCARE Works',
    'how-desc': 'We keep the flow simple: choose a package, review the brief, pay securely, and complete the receipt form.',
    'how-step1-bold': '1. Brief:',
    'how-step1-text': 'Share your target audience, region, and website.',
    'how-step2-bold': '2. Setup:',
    'how-step2-text': 'We craft Reddit, backlink, and outreach copy for the target market.',
    'how-step3-bold': '3. Checkout:',
    'how-step3-text': 'Click the total price in the modal to trigger the payment checkout flow.',
    'how-step4-bold': '4. Receipt:',
    'how-step4-text': 'You are redirected to Google Form with encoded receipt details.',
    'faq-title': 'Frequently Asked Questions',
    'faq-subtitle': 'A few quick answers about pricing, delivery, and checkout.',
    'faq-q1': 'Is this only for clinics?',
    'faq-a1': 'No. It also works for agencies, medical tourism teams, and brands targeting overseas buyers.',
    'faq-q2': 'What happens when I click the total price?',
    'faq-a2': 'Clicking the total price saves a local order, then opens the Google Form receipt flow.',
    'faq-q3': 'What inputs do you need?',
    'faq-a3': 'Your target audience, region, website, and the offer you want to promote.',
    'faq-q4': 'Can you support multiple markets?',
    'faq-a4': 'Yes. The Scale tier is built for multi-market lead generation and rollout planning.',
    'orders-title': 'My Orders',
    'orders-subtitle': 'your orders are stored locally in your browser.',
    'th-date': 'Date',
    'th-order-id': 'Transaction ID',
    'th-product': 'Product',
    'th-tier': 'Tier',
    'th-email': 'Email',
    'th-qty': 'Qty',
    'th-total': 'Total',
    'th-status': 'Status',
    'no-orders-msg': 'No purchase records found yet.',
    'modal-title': 'Configure Your Lead Order',
    'modal-desc': 'Fill in the details, then click the total price for checkout.',
    'modal-base-pkg': 'Package',
    'modal-base-price-label': 'Base Price',
    'modal-email-label': 'Email Address *',
    'modal-email-placeholder': 'name@example.com',
    'modal-email-error': 'Please enter a valid email address.',
    'modal-keywords-label': 'Target Audience / Region',
    'modal-keywords-placeholder': 'e.g. US dental clinics, Dubai wellness buyers, B2B SaaS managers',
    'modal-site-label': 'Website URL',
    'modal-site-placeholder': 'https://example.com',
    'modal-qty': 'Quantity',
    'modal-total-amt': 'Total Amount',
    'badge-ssl': 'SSL Secured',
    'badge-paypal': 'PayPal Verified',
    'footer-link': 'FOREIGNCARE Home'
  },
  ko: {
    'logo-subtitle': 'FOREIGNCARE',
    'nav-home': '홈',
    'nav-basic': '스타터',
    'nav-pro': '그로스',
    'nav-enterprise': '스케일',
    'btn-orders': '주문 내역',
    'hero-badge': '글로벌 리드 제너레이션 & 환자/고객 유치',
    'hero-title': 'FOREIGNCARE — 외국인 고객 · 환자 유치',
    'hero-desc': '레딧 아웃리치, 백링크 지원, 로컬라이즈된 전환 문구로 해외 수요를 실질 리드로 바꿉니다.',
    'btn-explore': '패키지 보기',
    'btn-how': '진행 방식',
    'stat-1': '패키지',
    'stat-2': '채널',
    'stat-3': '시장',
    'stat-4': '빠른 작업',
    'sec-packages-title': '유치 패키지를 선택하세요',
    'sec-packages-subtitle': '패키지를 고르고, 가격을 클릭해 체크아웃 흐름을 열고, Google Form 영수증을 확인하세요.',
    'card-basic-title': '스타터 아웃리치',
    'card-basic-desc': '하나의 시장을 대상으로 리드 각도와 로컬라이즈된 랜딩 문구를 빠르게 세팅합니다.',
    'card-pro-title': '그로스 아웃리치',
    'card-pro-desc': '레딧, 백링크, 아웃리치 문구를 활용한 국제 리드 제너레이션용 패키지입니다.',
    'card-enterprise-title': '스케일 아웃리치',
    'card-enterprise-desc': '다중 시장 확장 팀을 위한 리포트와 롤아웃 가이드를 포함한 종합 확장 플랜입니다.',
    'card-view-pricing': '가격 보기',
    'how-title': 'FOREIGNCARE 진행 방식',
    'how-desc': '패키지 선택 → 브리프 확인 → 안전 결제 → 영수증 폼 작성의 간단한 흐름으로 진행됩니다.',
    'how-step1-bold': '1. 브리프:',
    'how-step1-text': '타깃 고객, 지역, 웹사이트 정보를 전달하세요.',
    'how-step2-bold': '2. 세팅:',
    'how-step2-text': '레딧, 백링크, 아웃리치 문구를 타깃 시장에 맞게 구성합니다.',
    'how-step3-bold': '3. 결제:',
    'how-step3-text': '모달의 총액을 클릭하면 페이팔 구매를 완료합니다.',
    'how-step4-bold': '4. 영수증:',
    'how-step4-text': '암호화된 영수증 정보와 함께 Google Form으로 이동합니다.',
    'faq-title': '자주 묻는 질문',
    'faq-subtitle': '가격, 작업, 결제 흐름에 대한 간단한 안내입니다.',
    'faq-q1': '이 서비스는 병원만 대상인가요?',
    'faq-a1': '아니요. 에이전시, 의료관광팀, 해외 바이어를 타깃하는 브랜드에도 적합합니다.',
    'faq-q2': '총액을 클릭하면 어떻게 되나요?',
    'faq-a2': '총액을 클릭하면 로컬 주문이 저장된 뒤 Google Form 영수증 흐름이 열립니다.',
    'faq-q3': '어떤 입력이 필요한가요?',
    'faq-a3': '타깃 고객, 지역, 웹사이트, 그리고 홍보하고 싶은 오퍼가 필요합니다.',
    'faq-q4': '여러 시장도 지원하나요?',
    'faq-a4': '네. 스케일 티어는 다중 시장 리드 제너레이션과 롤아웃 플랜에 맞춰져 있습니다.',
    'orders-title': '주문 내역',
    'orders-subtitle': '주문 내역은 브라우저에 로컬 저장됩니다.',
    'th-date': '날짜',
    'th-order-id': '거래 ID',
    'th-product': '상품',
    'th-tier': '티어',
    'th-email': '이메일',
    'th-qty': '수량',
    'th-total': '합계',
    'th-status': '상태',
    'no-orders-msg': '아직 구매 기록이 없습니다.',
    'modal-title': '리드 주문 설정',
    'modal-desc': '세부 정보를 입력한 뒤 총액을 클릭해 결제를 진행하세요.',
    'modal-base-pkg': '패키지',
    'modal-base-price-label': '기본 가격',
    'modal-email-label': '이메일 주소 *',
    'modal-email-placeholder': 'name@example.com',
    'modal-email-error': '유효한 이메일 주소를 입력해주세요.',
    'modal-keywords-label': '타깃 고객 / 지역',
    'modal-keywords-placeholder': '예: 미국 치과, 두바이 웰니스 고객, B2B SaaS 담당자',
    'modal-site-label': '웹사이트 URL',
    'modal-site-placeholder': 'https://example.com',
    'modal-qty': '수량',
    'modal-total-amt': '총액',
    'badge-ssl': 'SSL 보안',
    'badge-paypal': 'PayPal 인증',
    'footer-link': 'FOREIGNCARE 홈'
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
    window.location.href = '/foreigncare/kr/';
  } else if (lang === 'en' && isKrPage) {
    window.location.href = '/foreigncare/';
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
  const footerLink = document.getElementById('footer-foreigncare-link');
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
            <span class="price-note">${currentLang === 'ko' ? '가격을 클릭해 결제' : 'Click price to checkout'}</span>
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
  
  // Sync the currency label in modal (USD -> KRW for Korean)
  const currencyLabel = document.querySelector('.total-price-box span:first-child');
  if (currencyLabel) {
    currencyLabel.textContent = currentLang === 'ko' ? 'KRW' : 'USD';
  }
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
  const email = document.getElementById('order-email')?.value.trim() || 'secure checkout@test.dev';
  const audience = document.getElementById('order-audience')?.value.trim() || '-';
  const website = document.getElementById('order-website')?.value.trim() || '-';
  const txId = `PRB-${Math.random().toString(36).slice(2, 10).toUpperCase()}`;
  const totalPaid = currentPackage ? currentPackage.basePrice * orderQuantity : 0;
  const productName = currentPackage ? `${currentPackage.categoryKey.toUpperCase()}-${currentPackage.packageId.toUpperCase()}` : 'FOREIGNCARE';

  const orderData = {
    date: new Date().toISOString().slice(0, 10),
    id: txId,
    product: `FOREIGNCARE - ${productName}`,
    tier: currentPackage?.packageId || '-',
    email,
    qty: orderQuantity,
    total: formatPrice(totalPaid),
    status: 'Paid (secure checkout)'
  };

  const orders = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  orders.unshift(orderData);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  renderOrders();

  const receipt = [
    '===================================',
    '          FOREIGNCARE RECEIPT',
    '===================================',
    `Order Date     : ${orderData.date}`,
    `Transaction ID : ${orderData.id}`,
    `Customer Email : ${orderData.email}`,
    `Product Name   : ${orderData.product}`,
    `Package Tier   : ${orderData.tier}`,
    `Target Audience : ${audience}`,
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
        const audience = document.getElementById('order-audience')?.value.trim() || '-';
        const website = document.getElementById('order-website')?.value.trim() || '-';
        const txId = `PP-${(data.orderID || Math.random().toString(36).slice(2, 10)).toUpperCase()}`;
        const orderData = {
          date: new Date().toISOString().slice(0, 10),
          id: txId,
          product: `FOREIGNCARE - ${currentPackage.packageId.toUpperCase()}`,
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
          '          FOREIGNCARE RECEIPT',
          '===================================',
          `Order Date     : ${orderData.date}`,
          `Transaction ID : ${orderData.id}`,
          `Customer Email : ${orderData.email}`,
          `Product Name   : ${orderData.product}`,
          `Package Tier   : ${orderData.tier}`,
          `Target Audience : ${audience}`,
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
  currentLang = localStorage.getItem('bibleforai_lang') || 'en';
  applyTranslations();
});

window.navigate = navigate;
window.toggleMobileMenu = toggleMobileMenu;
window.changeLanguage = changeLanguage;
window.openPurchaseModal = openPurchaseModal;
window.closeModal = closeModal;
window.updateModalPrice = updateModalPrice;
window.handlePurchaseSubmit = handlePurchaseSubmit;
window.triggerTestCheckout = triggerTestCheckout;
