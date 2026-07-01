let currentLang = document.documentElement.lang === 'ko' ? 'ko' : (localStorage.getItem('bibleforai_lang') || 'en');
const isKrPage = location.pathname.includes('/kr/');
const STORAGE_KEY = 'shopdata_orders';
const PAYPAL_CLIENT_ID = 'Ae_xg2SjogcseJVcjXldc_TEnVWBzmPw8aNimrSncYBb0Wrn_m93w_PkMgdxWTQ2fJExV8QKWHR2-7hK';
const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScMPqbEWWttS5mb1m_krsO_kco24ImpgvYVSbc7zO0nEVmYFw/viewform';

let currentPackage = null;
let orderQuantity = 1;
let paypalButtonInstance = null;

const packageCatalog = {
  shopdata: {
    title_en: 'SHOPDATA — Shopify Analytics & CAPI Setup',
    title_ko: 'SHOPDATA — 쇼피파이 분석 & CAPI 세팅',
    tagline_en: 'A Shopify tracking setup built for accurate revenue reporting and automated retention.',
    tagline_ko: '정확한 매출 추적과 자동화 리텐션을 위한 쇼피파이 트래킹 세팅 서비스입니다.',
    packages: [
      {
        id: 'standard',
        name_en: 'Standard Setup',
        name_ko: '스탠다드 세팅',
        desc_en: 'GA4 ecommerce tracking, Search Console link, and core conversion goals.',
        desc_ko: 'GA4 전자상거래 추적, 서치 콘솔 연결, 핵심 전환 목표 설정.',
        price: 271,
        iconClass: 'standard',
        features_en: ['GA4 ecommerce events', 'Search Console connection', 'Primary conversion goals', 'Delivery QA report'],
        features_ko: ['GA4 전자상거래 이벤트', '서치 콘솔 연결', '핵심 전환 목표 설정', 'QA 검증 리포트']
      },
      {
        id: 'advanced',
        name_en: 'Advanced CAPI',
        name_ko: '어드밴스드 CAPI',
        desc_en: 'Pixel + server-side Meta CAPI with deduplication and event matching QA.',
        desc_ko: '픽셀 + 서버사이드 Meta CAPI, 중복 제거와 이벤트 매칭 QA 포함.',
        price: 414,
        iconClass: 'advanced',
        featured: true,
        features_en: ['Meta Pixel install', 'Server-side CAPI setup', 'Deduplication rules', 'Event matching QA'],
        features_ko: ['Meta 픽셀 설치', '서버사이드 CAPI 세팅', '중복 제거 규칙 적용', '이벤트 매칭 QA']
      },
      {
        id: 'premium',
        name_en: 'Premium Growth Stack',
        name_ko: '프리미엄 성장 스택',
        desc_en: 'Full analytics + CAPI + Klaviyo flows for welcome, cart, and browse abandonment.',
        desc_ko: '전체 분석 + CAPI + Klaviyo 플로우(웰컴/장바구니/브라우즈 이탈) 구축.',
        price: 1271,
        iconClass: 'premium',
        features_en: ['GA4 + Meta CAPI', 'Klaviyo 3-flow build', 'Retention QA pass', 'Implementation guide'],
        features_ko: ['GA4 + Meta CAPI', 'Klaviyo 3개 플로우 구축', '리텐션 QA 검증', '운영 가이드 문서']
      }
    ]
  }
};

const translations = {
  en: {
    'logo-subtitle': 'SHOPDATA',
    'hero-eyebrow': 'Shopify growth infrastructure',
    'hero-title': 'SHOPDATA — Shopify Analytics & CAPI Setup',
    'hero-desc': 'Accurate ecommerce tracking, server-side events, and Klaviyo automation for Shopify brands scaling globally.',
    'pill-ga4': 'GA4 Ecommerce',
    'pill-capi': 'Meta CAPI',
    'pill-klaviyo': 'Klaviyo Flows',
    'hero-cta': 'View Packages',
    'hero-cta-secondary': 'Read FAQ',
    'stat-1': 'Ecommerce Events',
    'stat-2': 'Server-side Tracking',
    'stat-3': 'QA Verification',
    'stat-4': 'Setup Tiers',
    'packages-title': 'Package Options',
    'packages-subtitle': 'Built from a real Shopify tracking workflow, doubled from the original KRW marketplace price and converted to USD.',
    'how-title': 'What’s Included',
    'how-subtitle': 'Clear scope for Shopify founders, D2C teams, and agencies that need reliable revenue attribution.',
    'feature-1-title': 'Analytics setup',
    'feature-1-desc': 'GA4 ecommerce events, search console link, and conversion goals.',
    'feature-2-title': 'Tracking quality',
    'feature-2-desc': 'Pixel + server-side CAPI with deduplication and QA checks.',
    'feature-3-title': 'CRM automation',
    'feature-3-desc': 'Klaviyo flows for welcome, cart abandonment, and browse abandonment.',
    'orders-title': 'My Orders',
    'orders-subtitle': 'Orders are stored locally in your browser and used to generate the receipt data for the form redirect.',
    'th-date': 'Order Date',
    'th-order-id': 'Transaction ID',
    'th-product': 'Product',
    'th-tier': 'Package Tier',
    'th-qty': 'Qty',
    'th-total': 'Total Paid',
    'th-status': 'Status',
    'no-orders-msg': 'No purchase records found. Make your first order to see history here.',
    'faq-title': 'Frequently Asked Questions',
    'faq-q1': 'What does SHOPDATA do?',
    'faq-a1': 'It sets up Shopify analytics, tracking, and retention automation so you can trust your revenue data.',
    'faq-q2': 'Is the visible total price clickable?',
    'faq-a2': 'Yes. In the purchase modal the total price text is clickable and launches the test checkout flow.',
    'faq-q3': 'What is the payment flow?',
    'faq-a3': 'PayPal handles the secure checkout. After purchase completion the receipt data is encoded into a Google Form redirect.',
    'faq-q4': 'Who is this for?',
    'faq-a4': 'Shopify store owners, D2C founders, agencies, and cross-border e-commerce teams that need trustworthy attribution.',
    'footer-desc': 'Shopify analytics and growth infrastructure for brands selling globally.',
    'copyright': '&copy; 2026 BibleForAI. All rights reserved.',
    'modal-kicker': 'Secure checkout',
    'modal-total-label': 'Total Amount:',
    'modal-note': 'Click the total price to run the test checkout and continue to the receipt flow.',
    'modal-email-label': 'Email Address *',
    'modal-qty-label': 'Quantity',
    'badge-ssl': 'SSL Secured Checkout',
    'badge-paypal': 'PayPal Verified',
    'package-cta': 'Choose Package',
    'menu-heading-database': 'Database & Scraping',
    'menu-heading-design': 'Design & Coding',
    'menu-heading-marketing': 'Marketing & SEO',
    'menu-heading-media': 'Media & Audio',
    'menu-heading-strategy': 'Strategy & Analytics',
    'menu-b2bdb': 'B2B Core Database',
    'menu-b2cdb': 'B2C Lead Database',
    'menu-databoost': 'DATABOOST — Web Scraping',
    'menu-land': 'AI Landing Page',
    'menu-opencode': 'OpenCode AI',
    'menu-shopboost': 'SHOPBOOST — E-Commerce Entry',
    'menu-flowboost': 'FLOWBOOST — Workflow Automation',
    'menu-imgboost': 'IMGBOOST — Product Photography',
    'menu-pitchboost': 'PITCHBOOST — AI Presentations',
    'menu-boostsm': 'SMM Growth Booster',
    'menu-prboost': 'PRBOOST — Global Press Release Distribution',
    'menu-mailboost': 'MAILBOOST — Email Marketing',
    'menu-searchboost': 'SEARCHBOOST — AI SEO',
    'menu-mkboost': 'MKBOOST — Market Research',
    'menu-contentboost': 'CONTENTBOOST — AI Publishing',
    'menu-clipboost': 'CLIPBOOST — Short-Form Video',
    'menu-voiceboost': 'VOICEBOOST — AI Voice',
    'menu-transboost': 'TRANSBOOST — Translation',
    'menu-aiboost': 'AIBOOST — AI Consulting',
    'menu-insightboost': 'INSIGHTBOOST — Data Analytics'
  },
  ko: {
    'logo-subtitle': 'SHOPDATA',
    'hero-eyebrow': '쇼피파이 성장 인프라',
    'hero-title': 'SHOPDATA — 쇼피파이 분석 & CAPI 세팅',
    'hero-desc': '글로벌 시장에서 판매하는 쇼피파이 브랜드를 위한 정확한 이커머스 추적, 서버사이드 이벤트, Klaviyo 자동화 서비스입니다.',
    'pill-ga4': 'GA4 전자상거래',
    'pill-capi': 'Meta CAPI',
    'pill-klaviyo': 'Klaviyo 플로우',
    'hero-cta': '패키지 보기',
    'hero-cta-secondary': 'FAQ 보기',
    'stat-1': '이커머스 이벤트',
    'stat-2': '서버사이드 추적',
    'stat-3': 'QA 검증',
    'stat-4': '세팅 티어',
    'packages-title': '패키지 옵션',
    'packages-subtitle': '실제 쇼피파이 트래킹 워크플로우를 바탕으로, 원래 크몽 원화 가격의 2배를 USD로 환산했습니다.',
    'how-title': '포함 항목',
    'how-subtitle': '신뢰 가능한 매출 귀속이 필요한 쇼피파이 창업자, D2C 팀, 에이전시를 위한 명확한 범위입니다.',
    'feature-1-title': '분석 세팅',
    'feature-1-desc': 'GA4 전자상거래 이벤트, 서치 콘솔 연결, 전환 목표 설정.',
    'feature-2-title': '추적 품질',
    'feature-2-desc': '픽셀 + 서버사이드 CAPI, 중복 제거, QA 검증 포함.',
    'feature-3-title': 'CRM 자동화',
    'feature-3-desc': '웰컴, 장바구니 이탈, 브라우즈 이탈용 Klaviyo 플로우 구성.',
    'orders-title': '내 주문 내역',
    'orders-subtitle': '주문은 브라우저 로컬 저장소에 저장되며, 폼 리디렉션용 영수증 데이터로 사용됩니다.',
    'th-date': '주문 날짜',
    'th-order-id': '거래 ID',
    'th-product': '상품명',
    'th-tier': '패키지 등급',
    'th-qty': '수량',
    'th-total': '총 결제금액',
    'th-status': '상태',
    'no-orders-msg': '구매 기록이 없습니다. 첫 주문을 완료하면 여기에서 확인할 수 있습니다.',
    'faq-title': '자주 묻는 질문',
    'faq-q1': 'SHOPDATA는 무엇을 하나요?',
    'faq-a1': '쇼피파이 분석, 추적, 리텐션 자동화를 세팅해 매출 데이터를 정확하게 볼 수 있게 합니다.',
    'faq-q2': '보이는 총액 텍스트를 클릭할 수 있나요?',
    'faq-a2': '네. 구매 모달에서 총액 텍스트를 클릭하면 테스트 결제 흐름이 실행됩니다.',
    'faq-q3': '결제 흐름은 어떻게 되나요?',
    'faq-a3': '안전 결제는 PayPal이 담당하고, 결제 완료 후 영수증 데이터가 인코딩되어 Google Form으로 이동합니다.',
    'faq-q4': '누구를 위한 서비스인가요?',
    'faq-a4': '정확한 귀속 데이터가 필요한 쇼피파이 스토어 운영자, D2C 창업자, 에이전시, 크로스보더 이커머스 팀을 위한 서비스입니다.',
    'footer-desc': '전 세계에 판매하는 브랜드를 위한 쇼피파이 분석 및 성장 인프라입니다.',
    'copyright': '&copy; 2026 BibleForAI. All rights reserved.',
    'modal-kicker': '안전 결제',
    'modal-total-label': '총 결제금액:',
    'modal-note': '총액 텍스트를 클릭하면 테스트 결제 흐름이 실행되고 영수증 단계로 이동합니다.',
    'modal-email-label': '이메일 주소 *',
    'modal-qty-label': '수량',
    'badge-ssl': 'SSL 보안 결제',
    'badge-paypal': 'PayPal 인증됨',
    'package-cta': '패키지 선택',
    'menu-heading-database': '데이터베이스 & 스크래핑',
    'menu-heading-design': '디자인 & 코딩',
    'menu-heading-marketing': '마케팅 & SEO',
    'menu-heading-media': '미디어 & 오디오',
    'menu-heading-strategy': '전략 & 분석',
    'menu-b2bdb': 'B2B 핵심 데이터베이스',
    'menu-b2cdb': 'B2C 리드 데이터베이스',
    'menu-databoost': 'DATABOOST — 웹 스크래핑',
    'menu-land': 'AI 랜딩페이지',
    'menu-opencode': 'OpenCode AI',
    'menu-shopboost': 'SHOPBOOST — 이커머스 진입',
    'menu-flowboost': 'FLOWBOOST — 업무 자동화',
    'menu-imgboost': 'IMGBOOST — 상품 사진',
    'menu-pitchboost': 'PITCHBOOST — AI 프레젠테이션',
    'menu-boostsm': 'SMM 성장 부스터',
    'menu-prboost': 'PRBOOST — 글로벌 보도자료 배포',
    'menu-mailboost': 'MAILBOOST — 이메일 마케팅',
    'menu-searchboost': 'SEARCHBOOST — AI SEO',
    'menu-mkboost': 'MKBOOST — 시장 조사',
    'menu-contentboost': 'CONTENTBOOST — AI 퍼블리싱',
    'menu-clipboost': 'CLIPBOOST — 숏폼 영상',
    'menu-voiceboost': 'VOICEBOOST — AI 보이스',
    'menu-transboost': 'TRANSBOOST — 번역',
    'menu-aiboost': 'AIBOOST — AI 컨설팅',
    'menu-insightboost': 'INSIGHTBOOST — 데이터 분석'
  }
};

function currentDict() { return translations[currentLang] || translations.en; }
function isKorean() { return currentLang === 'ko'; }

function formatPrice(value) {
  return `$${Number(value).toLocaleString('en-US')}`;
}

function applyTranslations() {
  const dict = currentDict();
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) el.innerHTML = dict[key];
  });
  const selector = document.getElementById('language-selector');
  if (selector) selector.value = currentLang;
  document.title = isKorean()
    ? 'BibleForAI - SHOPDATA | 쇼피파이 분석 & CAPI 세팅'
    : 'BibleForAI - SHOPDATA | Shopify Analytics & CAPI Setup';
}

function renderPackages() {
  const grid = document.getElementById('packages-grid');
  if (!grid) return;
  const dict = currentDict();
  const category = packageCatalog.shopdata;
  document.getElementById('modal-product-title')?.replaceChildren();
  grid.innerHTML = category.packages.map(pkg => `
    <article class="package-card ${pkg.featured ? 'featured' : ''}">
      <div class="price-row">
        <div class="card-icon ${pkg.iconClass}"><i class="fa-solid fa-shopify"></i></div>
        <span class="price-chip" onclick="openPurchaseModal('shopdata', '${pkg.id}')">${formatPrice(pkg.price)}</span>
      </div>
      <h3>${isKorean() ? pkg.name_ko : pkg.name_en}</h3>
      <p class="package-desc">${isKorean() ? pkg.desc_ko : pkg.desc_en}</p>
      <ul class="package-features">
        ${(isKorean() ? pkg.features_ko : pkg.features_en).map(f => `<li><i class="fa-solid fa-circle-check"></i><span>${f}</span></li>`).join('')}
      </ul>
      <button class="package-action" onclick="openPurchaseModal('shopdata', '${pkg.id}')">${dict['package-cta']}</button>
    </article>
  `).join('');
}

function toggleMobileMenu() {
  document.getElementById('mobile-drawer')?.classList.toggle('active');
}

function changeLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('bibleforai_lang', lang);
  if (isKrPage && lang === 'en') {
    location.href = '../';
    return;
  }
  if (!isKrPage && lang === 'ko') {
    location.href = 'kr/';
    return;
  }
  applyTranslations();
  renderPackages();
  renderOrders();
}

function updateCurrentPackage(packageId) {
  const category = packageCatalog.shopdata;
  const pkg = category.packages.find(p => p.id === packageId);
  if (!pkg) return null;
  currentPackage = {
    categoryKey: 'shopdata',
    categoryName: isKorean() ? category.title_ko : category.title_en,
    tierName: isKorean() ? pkg.name_ko : pkg.name_en,
    basePrice: pkg.price,
    packageId
  };
  return pkg;
}

function openPurchaseModal(categoryKey, packageId) {
  const pkg = updateCurrentPackage(packageId);
  if (!pkg) return;
  orderQuantity = 1;
  document.getElementById('order-quantity').value = 1;
  document.getElementById('order-email').value = '';
  document.getElementById('email-error').style.display = 'none';
  document.getElementById('modal-product-title').innerText = packageCatalog.shopdata.title_en;
  document.getElementById('modal-package-name').innerText = isKorean() ? pkg.name_ko : pkg.name_en;
  updateModalPrice();
  const modal = document.getElementById('purchase-modal');
  modal.classList.add('active');
  setTimeout(() => {
    const card = document.querySelector('.modal-card');
    const target = document.querySelector('.modal-price-box');
    if (card && target) card.scrollTo({ top: Math.max(target.offsetTop - 20, 0), behavior: 'smooth' });
  }, 80);
  initPayPalButtons();
}

function closeModal() {
  document.getElementById('purchase-modal')?.classList.remove('active');
  const container = document.getElementById('paypal-button-container');
  if (container) container.innerHTML = '';
  paypalButtonInstance = null;
}

function adjustQty(delta) {
  const input = document.getElementById('order-quantity');
  let qty = parseInt(input.value || '1', 10) + delta;
  qty = Math.max(1, qty);
  input.value = qty;
  orderQuantity = qty;
  updateModalPrice();
}

function updateModalPrice() {
  const qty = Math.max(1, parseInt(document.getElementById('order-quantity').value || '1', 10));
  orderQuantity = qty;
  const total = (currentPackage?.basePrice || 0) * qty;
  document.getElementById('modal-total-price').innerText = formatPrice(total);
}

function validateEmailField() {
  const input = document.getElementById('order-email');
  const error = document.getElementById('email-error');
  const val = input.value.trim();
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  if (!ok) {
    input.style.borderColor = '#f87171';
    error.innerText = isKorean() ? '올바른 이메일 주소를 입력해주세요.' : 'Please enter a valid email address.';
    error.style.display = 'block';
  } else {
    input.style.borderColor = 'var(--border)';
    error.style.display = 'none';
  }
  return ok;
}

function triggerTestCheckout() {
  const emailInput = document.getElementById('order-email');
  if (emailInput && !emailInput.value.trim()) emailInput.value = 'test@shopdata.dev';
  if (!validateEmailField()) return;
  saveLocalOrder({ id: `TEST-${Math.random().toString(36).slice(2, 10).toUpperCase()}`, isTest: true });
  closeModal();
}

function initPayPalButtons() {
  const container = document.getElementById('paypal-button-container');
  if (!container || paypalButtonInstance) return;
  if (typeof paypal === 'undefined') {
    container.innerHTML = `<p style="color:#fca5a5;padding:1rem;text-align:center">PayPal is unavailable.</p>`;
    return;
  }
  paypalButtonInstance = paypal.Buttons({
    style: { layout: 'vertical', color: 'blue', shape: 'rect', label: 'checkout' },
    onClick(data, actions) {
      if (!validateEmailField()) return actions.reject();
      return actions.resolve();
    },
    createOrder(data, actions) {
      return actions.order.create({
        purchase_units: [{
          description: `${currentPackage.categoryName} - ${currentPackage.tierName} (Qty: ${orderQuantity})`,
          amount: { currency_code: 'USD', value: (currentPackage.basePrice * orderQuantity).toFixed(2) }
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
      console.error(err);
      alert(isKorean() ? '결제 처리 중 오류가 발생했습니다.' : 'An error occurred during payment processing.');
    }
  });
  paypalButtonInstance.render('#paypal-button-container');
}

function saveLocalOrder(details) {
  const orders = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  const email = document.getElementById('order-email')?.value.trim() || '';
  const order = {
    date: new Date().toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
    id: details.id,
    email,
    category: currentPackage.categoryName,
    package: currentPackage.tierName,
    quantity: orderQuantity,
    basePrice: currentPackage.basePrice,
    totalPaid: formatPrice(currentPackage.basePrice * orderQuantity),
    status: 'Completed',
    test: !!details.isTest
  };
  orders.unshift(order);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  renderOrders();

  const dict = currentDict();
  const receipt = [
    '===================================',
    dict['logo-subtitle'],
    '===================================',
    `${isKorean() ? '주문 날짜' : 'Order Date'} : ${order.date}`,
    `${isKorean() ? '거래 ID' : 'Transaction ID'} : ${order.id}`,
    `${isKorean() ? '고객 이메일' : 'Customer Email'} : ${order.email}`,
    `${isKorean() ? '상품 종류' : 'Product Type'} : ${order.category}`,
    `${isKorean() ? '패키지 등급' : 'Package Tier'} : ${order.package}`,
    `${isKorean() ? '수량' : 'Quantity'} : ${order.quantity}`,
    `${isKorean() ? '기본 가격' : 'Base Price'} : ${formatPrice(order.basePrice)}`,
    `${isKorean() ? '총 결제금액' : 'Total Paid'} : ${order.totalPaid}`,
    `${isKorean() ? '상태' : 'Status'} : ${isKorean() ? '완료됨' : order.status}`,
    '-----------------------------------',
    `${isKorean() ? '결제 방법' : 'Payment Method'} : PayPal Secure Checkout`,
    '===================================' 
  ].join('\n');

  const encoded = encodeURIComponent(receipt);
  window.location.href = `${GOOGLE_FORM_URL}?entry.1059822061=${encoded}`;
}

function renderOrders() {
  const orders = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  const tbody = document.getElementById('orders-tbody');
  const empty = document.getElementById('no-orders-msg');
  if (!tbody) return;
  if (!orders.length) {
    tbody.innerHTML = '';
    empty.style.display = 'block';
    return;
  }
  empty.style.display = 'none';
  tbody.innerHTML = orders.map(o => `
    <tr>
      <td>${o.date}</td>
      <td>${o.id}</td>
      <td>${o.category}</td>
      <td>${o.package}</td>
      <td>${o.quantity}</td>
      <td>${o.totalPaid}</td>
      <td>${o.status}</td>
    </tr>
  `).join('');
}

function bindModalPriceClick() {
  const total = document.getElementById('modal-total-price');
  if (!total || total.dataset.bound) return;
  total.dataset.bound = '1';
  total.addEventListener('click', triggerTestCheckout);
  total.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); triggerTestCheckout(); }
  });
}

function setupHeaderScroll() {
  const header = document.getElementById('app-header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 24);
  });
}

function navigateSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function init() {
  if (isKrPage) localStorage.setItem('bibleforai_lang', 'ko');
  if (!isKrPage && !localStorage.getItem('bibleforai_lang')) localStorage.setItem('bibleforai_lang', 'en');
  currentLang = isKrPage ? 'ko' : (localStorage.getItem('bibleforai_lang') || 'en');
  applyTranslations();
  renderPackages();
  renderOrders();
  setupHeaderScroll();
  bindModalPriceClick();
  document.querySelectorAll('.hero-actions a').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href') || '';
      if (href.startsWith('#')) {
        e.preventDefault();
        navigateSection(href.slice(1));
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', init);

window.toggleMobileMenu = toggleMobileMenu;
window.changeLanguage = changeLanguage;
window.openPurchaseModal = openPurchaseModal;
window.closeModal = closeModal;
window.adjustQty = adjustQty;
window.updateModalPrice = updateModalPrice;
window.triggerTestCheckout = triggerTestCheckout;
