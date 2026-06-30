// ENGTRANSLATE app state
const STORAGE_KEY = 'engtranslate_orders';
const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScMPqbEWWttS5mb1m_krsO_kco24ImpgvYVSbc7zO0nEVmYFw/viewform?entry.1059822061=';
const SERVICE_ROOT = '/engtranslate/';
const IS_KR_PAGE = window.location.pathname.includes('/engtranslate/kr/');
let currentLang = IS_KR_PAGE ? 'ko' : (localStorage.getItem('bibleforai_lang') || 'en');
let currentPackage = null;
let orderQuantity = 1;

const packageCatalog = {
  packages: [
    {
      id: 'starter',
      icon: 'fa-regular fa-file-lines',
      name_en: 'Starter',
      name_ko: '스타터',
      desc_en: 'Best for short emails, product blurbs, and quick business notes that need clean English.',
      desc_ko: '짧은 이메일, 제품 소개문, 빠른 비즈니스 노트에 적합한 깔끔한 영어 번역입니다.',
      price: 7.14,
      featured: false,
      features_en: ['Up to 250 words', 'Tone cleanup', '1 revision pass', '24h delivery'],
      features_ko: ['최대 250단어', '톤 정리', '수정 1회', '24시간 내 전달']
    },
    {
      id: 'standard',
      icon: 'fa-solid fa-file-pen',
      name_en: 'Standard',
      name_ko: '스탠다드',
      desc_en: 'Ideal for one-page reports, landing page sections, and investor-facing summaries.',
      desc_ko: '1페이지 분량 보고서, 랜딩페이지 문구, 투자자용 요약문에 적합합니다.',
      price: 14.29,
      featured: false,
      features_en: ['Up to 500 words', 'Terminology alignment', 'Style polishing', 'Business-ready format'],
      features_ko: ['최대 500단어', '용어 정합성 맞춤', '문체 다듬기', '비즈니스용 포맷']
    },
    {
      id: 'premium',
      icon: 'fa-solid fa-language',
      name_en: 'Premium',
      name_ko: '프리미엄',
      desc_en: 'For decks, brochures, and marketing copy where meaning and brand voice matter most.',
      desc_ko: '의미와 브랜드 톤이 중요한 덱, 브로슈어, 마케팅 카피에 적합합니다.',
      price: 28.57,
      featured: true,
      features_en: ['Up to 1,000 words', 'Brand-voice adaptation', 'Keyword sensitivity', 'Priority handling'],
      features_ko: ['최대 1,000단어', '브랜드 톤 반영', '키워드 민감도 조정', '우선 처리']
    },
    {
      id: 'enterprise',
      icon: 'fa-solid fa-globe',
      name_en: 'Enterprise',
      name_ko: '엔터프라이즈',
      desc_en: 'Best for contracts, legal files, technical docs, and full website localization packages.',
      desc_ko: '계약서, 법률 문서, 기술 문서, 웹사이트 현지화 패키지에 적합합니다.',
      price: 57.14,
      featured: false,
      features_en: ['Up to 2,000 words', 'Terminology sheet', 'Multi-file handling', 'Dedicated support'],
      features_ko: ['최대 2,000단어', '용어집 제공', '다중 파일 처리', '전담 지원']
    }
  ]
};

const translations = {
  en: {
    'logo-subtitle': 'English Translation',
    'nav-home': 'Home',
    'nav-packages': 'Packages',
    'nav-how': 'How It Works',
    'nav-faq': 'FAQ',
    'nav-orders': 'Orders',
    'btn-orders': 'My Orders',
    'hero-badge': 'English Translation for Global Business',
    'hero-title': 'ENGTRANSLATE — Premium English Translation & Localization',
    'hero-desc': 'Based on the Kmong service: fast English translation for reports, contracts, presentations, marketing copy, subtitles, and legal documents.',
    'btn-explore': 'View Packages',
    'btn-how': 'How It Works',
    'stat-1': 'Base starts at ₩5,000',
    'stat-2': '1-day turnarounds',
    'stat-3': 'Business docs',
    'stat-4': 'Global-ready',
    'packages-title': 'Choose the translation package that fits your file',
    'packages-subtitle': 'Click the visible price to trigger the sandbox test checkout flow, then finish the receipt on Google Form.',
    'how-title': 'How ENGTRANSLATE Works',
    'how-desc': 'Simple flow: choose a tier, provide your source material, pay securely, and complete the receipt form.',
    'how-step1-bold': '1. Share your file:',
    'how-step1-text': 'Upload or paste the text, plus any terminology notes or brand references.',
    'how-step2-bold': '2. Translation pass:',
    'how-step2-text': 'We translate and localize the content for a native-sounding English result.',
    'how-step3-bold': '3. Test checkout:',
    'how-step3-text': 'Click the total price to trigger the sandbox checkout and create a receipt record.',
    'how-step4-bold': '4. Receipt flow:',
    'how-step4-text': 'You are redirected to Google Form with encoded receipt details.',
    'faq-title': 'Frequently Asked Questions',
    'faq-subtitle': 'Quick answers about scope, delivery, and checkout.',
    'faq-q1': 'What kind of files can you translate?',
    'faq-a1': 'Reports, contracts, websites, decks, product pages, subtitles, manuals, and other business documents.',
    'faq-q2': 'What does the price-click test checkout do?',
    'faq-a2': 'Clicking the total price saves a sandbox order locally and redirects to the Google Form receipt flow.',
    'faq-q3': 'Is this service suitable for international business?',
    'faq-a3': 'Yes. It is designed for founders, SaaS teams, agencies, exporters, and global brands.',
    'faq-q4': 'Do you support localization, not just literal translation?',
    'faq-a4': 'Yes. The Premium and Enterprise tiers are built for tone, terminology, and localization quality.',
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
    'modal-title': 'Configure Your Translation Order',
    'modal-desc': 'Add your file details, then click the total price for the sandbox checkout test.',
    'modal-base-pkg': 'Package',
    'modal-base-price-label': 'Base Price',
    'modal-email-label': 'Email Address *',
    'modal-email-placeholder': 'name@example.com',
    'modal-email-error': 'Please enter a valid email address.',
    'modal-source-label': 'Source Language / File Type',
    'modal-source-placeholder': 'e.g. Korean PDF, English article, Spanish email',
    'modal-tone-label': 'Target Audience / Tone',
    'modal-tone-placeholder': 'e.g. investors, customers, legal review',
    'modal-qty': 'Quantity',
    'modal-total-amt': 'Total Amount',
    'badge-ssl': 'SSL Secured',
    'badge-paypal': 'PayPal Verified',
    'footer-link': 'ENGTRANSLATE Home',
    'card-view-pricing': 'View Pricing',
    'price-note': 'Click for sandbox checkout',
    'price-chip-aria': 'Click to start sandbox checkout'
  },
  ko: {
    'logo-subtitle': '영문 번역',
    'nav-home': '홈',
    'nav-packages': '패키지',
    'nav-how': '진행 방식',
    'nav-faq': 'FAQ',
    'nav-orders': '주문 내역',
    'btn-orders': '내 주문',
    'hero-badge': '글로벌 비즈니스를 위한 영어 번역',
    'hero-title': 'ENGTRANSLATE — 프리미엄 영어 번역 & 로컬라이제이션',
    'hero-desc': '크몽에서 찾은 서비스 기반: 보고서, 계약서, 프레젠테이션, 마케팅 카피, 자막, 법률 문서의 빠른 영어 번역.',
    'btn-explore': '패키지 보기',
    'btn-how': '진행 방식',
    'stat-1': '기준가 ₩5,000부터',
    'stat-2': '1일 내 작업',
    'stat-3': '비즈니스 문서',
    'stat-4': '글로벌 대응',
    'packages-title': '파일에 맞는 번역 패키지를 선택하세요',
    'packages-subtitle': '보이는 가격을 클릭하면 샌드박스 테스트 결제 흐름이 열리고, 이후 Google Form 영수증으로 이동합니다.',
    'how-title': 'ENGTRANSLATE 진행 방식',
    'how-desc': '패키지 선택 → 원문 전달 → 안전 결제 → 영수증 폼 작성의 간단한 흐름입니다.',
    'how-step1-bold': '1. 파일 전달:',
    'how-step1-text': '텍스트, 용어 노트, 브랜드 참고자료를 전달하세요.',
    'how-step2-bold': '2. 번역/로컬라이즈:',
    'how-step2-text': '자연스럽고 네이티브한 영어 결과물로 다듬습니다.',
    'how-step3-bold': '3. 테스트 결제:',
    'how-step3-text': '총액을 클릭하면 샌드박스 체크아웃이 실행되고 주문 기록이 생성됩니다.',
    'how-step4-bold': '4. 영수증 흐름:',
    'how-step4-text': '암호화된 영수증 정보와 함께 Google Form으로 이동합니다.',
    'faq-title': '자주 묻는 질문',
    'faq-subtitle': '범위, 작업, 결제 흐름에 대한 빠른 안내입니다.',
    'faq-q1': '어떤 파일을 번역할 수 있나요?',
    'faq-a1': '보고서, 계약서, 웹사이트, 덱, 제품 페이지, 자막, 매뉴얼 등 비즈니스 문서 전반입니다.',
    'faq-q2': '가격 텍스트 클릭 테스트 결제는 무엇인가요?',
    'faq-a2': '총액을 클릭하면 샌드박스 주문이 로컬에 저장되고 Google Form 영수증 흐름으로 이동합니다.',
    'faq-q3': '해외 비즈니스에 적합한가요?',
    'faq-a3': '네. 창업자, SaaS 팀, 에이전시, 수출 기업, 글로벌 브랜드를 위해 설계했습니다.',
    'faq-q4': '직역만 아니라 로컬라이제이션도 가능한가요?',
    'faq-a4': '네. 프리미엄과 엔터프라이즈는 톤, 용어, 현지화 품질까지 고려합니다.',
    'orders-title': '주문 내역',
    'orders-subtitle': '샌드박스 주문은 브라우저에 로컬 저장됩니다.',
    'th-date': '날짜',
    'th-order-id': '거래 ID',
    'th-product': '상품',
    'th-tier': '등급',
    'th-email': '이메일',
    'th-qty': '수량',
    'th-total': '합계',
    'th-status': '상태',
    'no-orders-msg': '아직 구매 기록이 없습니다.',
    'modal-title': '번역 주문 설정',
    'modal-desc': '파일 정보를 입력한 뒤 총액 텍스트를 클릭하면 샌드박스 체크아웃 테스트가 진행됩니다.',
    'modal-base-pkg': '패키지',
    'modal-base-price-label': '기본 가격',
    'modal-email-label': '이메일 주소 *',
    'modal-email-placeholder': 'name@example.com',
    'modal-email-error': '올바른 이메일 주소를 입력해주세요.',
    'modal-source-label': '원문 언어 / 파일 형식',
    'modal-source-placeholder': '예: 한국어 PDF, 영어 기사, 스페인어 이메일',
    'modal-tone-label': '대상 독자 / 톤',
    'modal-tone-placeholder': '예: 투자자, 고객, 법률 검토',
    'modal-qty': '수량',
    'modal-total-amt': '총액',
    'badge-ssl': 'SSL 보안',
    'badge-paypal': 'PayPal 인증',
    'footer-link': 'ENGTRANSLATE 홈',
    'card-view-pricing': '가격 보기',
    'price-note': '가격을 눌러 샌드박스 결제',
    'price-chip-aria': '샌드박스 결제를 시작하려면 클릭'
  }
};

function formatPrice(value) {
  return `$${Number(value).toFixed(2)}`;
}

function navigate(viewKey) {
  const viewId = `${viewKey}-view`;
  document.querySelectorAll('.view-section').forEach(section => section.classList.remove('active'));
  const target = document.getElementById(viewId);
  if (target) target.classList.add('active');
  document.querySelectorAll('.nav-links a').forEach(link => link.classList.remove('active'));
  const active = document.getElementById(`nav-${viewKey}`);
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
  currentLang = lang;
  localStorage.setItem('bibleforai_lang', lang);
  const target = lang === 'ko' ? `${SERVICE_ROOT}kr/` : SERVICE_ROOT;
  if ((lang === 'ko' && !IS_KR_PAGE) || (lang === 'en' && IS_KR_PAGE)) {
    window.location.href = target;
    return;
  }
  applyTranslations();
  renderPackages();
  renderOrders();
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
  const footerLink = document.getElementById('footer-engtranslate-link');
  if (footerLink) footerLink.textContent = dict['footer-link'];
}

function renderPackages() {
  const grid = document.getElementById('packages-grid');
  if (!grid) return;
  const dict = translations[currentLang] || translations.en;
  grid.innerHTML = packageCatalog.packages.map(pkg => {
    const title = currentLang === 'ko' ? pkg.name_ko : pkg.name_en;
    const desc = currentLang === 'ko' ? pkg.desc_ko : pkg.desc_en;
    const features = currentLang === 'ko' ? pkg.features_ko : pkg.features_en;
    return `
      <div class="package-card ${pkg.featured ? 'featured' : ''}">
        ${pkg.featured ? `<div class="featured-badge">${currentLang === 'ko' ? '추천' : 'Best Value'}</div>` : ''}
        <div class="package-header">
          <div class="card-icon ${pkg.id}"><i class="${pkg.icon}"></i></div>
          <h3>${title}</h3>
          <p class="package-desc">${desc}</p>
        </div>
        <div class="price-row">
          <button class="price-chip" type="button" aria-label="${dict['price-chip-aria']}" onclick="openPurchaseModal('${pkg.id}')">${formatPrice(pkg.price)}</button>
          <span class="price-note">${dict['price-note']}</span>
        </div>
        <ul class="package-features">
          ${features.map(feat => `<li><i class="fa-solid fa-circle-check"></i> ${feat}</li>`).join('')}
        </ul>
        <button class="btn-buy" onclick="openPurchaseModal('${pkg.id}')">
          <i class="fa-solid fa-cart-shopping"></i> ${dict['card-view-pricing']}
        </button>
      </div>`;
  }).join('');
}

function getCategoryIcon(packageId) {
  switch (packageId) {
    case 'starter': return 'fa-regular fa-file-lines';
    case 'standard': return 'fa-solid fa-file-pen';
    case 'premium': return 'fa-solid fa-language';
    case 'enterprise': return 'fa-solid fa-globe';
    default: return 'fa-solid fa-language';
  }
}

function openPurchaseModal(packageId) {
  const pkg = packageCatalog.packages.find(item => item.id === packageId);
  if (!pkg) return;
  currentPackage = { packageId: pkg.id, basePrice: pkg.price, icon: pkg.icon };
  orderQuantity = 1;
  const isKo = currentLang === 'ko';
  const titleEl = document.getElementById('modal-product-title');
  const descEl = document.getElementById('modal-product-desc');
  const pkgNameEl = document.getElementById('modal-package-name');
  const basePriceEl = document.getElementById('modal-base-price');
  if (titleEl) titleEl.textContent = `${isKo ? 'ENGTRANSLATE — ' + pkg.name_ko : 'ENGTRANSLATE — ' + pkg.name_en}`;
  if (descEl) descEl.textContent = isKo ? translations.ko['modal-desc'] : translations.en['modal-desc'];
  if (pkgNameEl) pkgNameEl.textContent = isKo ? pkg.name_ko : pkg.name_en;
  if (basePriceEl) basePriceEl.textContent = formatPrice(pkg.price);
  const qtyInput = document.getElementById('order-quantity');
  if (qtyInput) qtyInput.value = '1';
  const emailInput = document.getElementById('order-email');
  if (emailInput) emailInput.value = '';
  const sourceInput = document.getElementById('order-source');
  if (sourceInput) sourceInput.value = '';
  const toneInput = document.getElementById('order-tone');
  if (toneInput) toneInput.value = '';
  const emailError = document.getElementById('email-error');
  if (emailError) emailError.style.display = 'none';
  const modal = document.getElementById('purchase-modal');
  if (modal) modal.classList.add('active');
  updateModalPrice();
  initPayPalButtons();
  const paymentArea = document.getElementById('paypal-button-container');
  if (paymentArea) {
    setTimeout(() => paymentArea.scrollIntoView({ behavior: 'smooth', block: 'center' }), 140);
  }
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

function buildReceipt(orderData, extra = {}) {
  const lines = [
    '===================================',
    '        ENGTRANSLATE RECEIPT',
    '===================================',
    `Order Date     : ${orderData.date}`,
    `Transaction ID : ${orderData.id}`,
    `Customer Email : ${orderData.email}`,
    `Product Name   : ${orderData.product}`,
    `Package Tier   : ${orderData.tier}`,
    `Source Info    : ${extra.source || '-'}`,
    `Audience/Tone  : ${extra.tone || '-'}`,
    `Quantity       : ${orderData.qty}`,
    `Total Paid     : ${orderData.total}`,
    `Status         : ${orderData.status}`,
    '-----------------------------------',
    'Payment Method : PayPal Secure Checkout',
    '===================================' 
  ];
  return lines.join('\n');
}

function persistOrder(orderData) {
  const orders = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  orders.unshift(orderData);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  renderOrders();
}

function triggerTestCheckout() {
  if (!validateEmail()) return;
  const email = document.getElementById('order-email')?.value.trim() || 'sandbox@test.dev';
  const source = document.getElementById('order-source')?.value.trim() || '-';
  const tone = document.getElementById('order-tone')?.value.trim() || '-';
  const txId = `ENG-${Math.random().toString(36).slice(2, 10).toUpperCase()}`;
  const totalPaid = currentPackage ? currentPackage.basePrice * orderQuantity : 0;
  const orderData = {
    date: new Date().toISOString().slice(0, 10),
    id: txId,
    product: `ENGTRANSLATE - ${currentPackage?.packageId?.toUpperCase() || 'ORDER'}`,
    tier: currentPackage?.packageId || '-',
    email,
    qty: orderQuantity,
    total: formatPrice(totalPaid),
    status: 'Paid (Sandbox)'
  };
  persistOrder(orderData);
  closeModal();
  window.location.href = GOOGLE_FORM_URL + encodeURIComponent(buildReceipt(orderData, { source, tone }));
}

function handlePurchaseSubmit(event) {
  if (event) event.preventDefault();
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
    </tr>
  `).join('');
}

function initPayPalButtons() {
  const container = document.getElementById('paypal-button-container');
  if (!container || typeof paypal === 'undefined' || !paypal.Buttons || !currentPackage) return;
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
        const source = document.getElementById('order-source')?.value.trim() || '-';
        const tone = document.getElementById('order-tone')?.value.trim() || '-';
        const txId = `PP-${(data.orderID || Math.random().toString(36).slice(2, 10)).toUpperCase()}`;
        const orderData = {
          date: new Date().toISOString().slice(0, 10),
          id: txId,
          product: `ENGTRANSLATE - ${currentPackage.packageId.toUpperCase()}`,
          tier: currentPackage.packageId,
          email,
          qty: orderQuantity,
          total: formatPrice(currentPackage.basePrice * orderQuantity),
          status: 'Paid (PayPal)'
        };
        persistOrder(orderData);
        closeModal();
        window.location.href = GOOGLE_FORM_URL + encodeURIComponent(buildReceipt(orderData, { source, tone }));
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

  if (IS_KR_PAGE) {
    localStorage.setItem('bibleforai_lang', 'ko');
  } else if (!localStorage.getItem('bibleforai_lang')) {
    localStorage.setItem('bibleforai_lang', 'en');
  }

  const purchaseModal = document.getElementById('purchase-modal');
  if (purchaseModal) purchaseModal.addEventListener('click', (e) => {
    if (e.target === purchaseModal) closeModal();
  });
});

window.navigate = navigate;
window.toggleMobileMenu = toggleMobileMenu;
window.changeLanguage = changeLanguage;
window.openPurchaseModal = openPurchaseModal;
window.closeModal = closeModal;
window.updateModalPrice = updateModalPrice;
window.handlePurchaseSubmit = handlePurchaseSubmit;
window.triggerTestCheckout = triggerTestCheckout;
