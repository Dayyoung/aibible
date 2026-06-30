// AMZFBA app state
const STORAGE_KEY = 'amzfba_orders';
let currentLang = localStorage.getItem('bibleforai_lang') || 'en';
let currentPackage = null;
let orderQuantity = 1;
let paypalButtonInstance = null;

const packageCatalog = {
  fba: {
    title_en: 'Amazon FBA & 3PL Logistics Optimization',
    title_ko: '아마존 FBA & 3PL 물류 최적화',
    packages: [
      {
        id: 'route-check',
        name_en: 'STANDARD — Route Check',
        name_ko: '스탠다드 — 물류 경로 점검',
        desc_en: 'Marketplace-to-warehouse flow review, FBA prep checklist, and logistics risk scan.',
        desc_ko: '마켓플레이스→창고 흐름 점검, FBA 준비 체크리스트, 물류 리스크 진단.',
        price: 204.29,
        featured: false,
        features_en: [
          'Route review',
          'FBA prep checklist',
          '3PL risk scan',
          'Quick action plan'
        ],
        features_ko: [
          '경로 검토',
          'FBA 준비 체크리스트',
          '3PL 리스크 진단',
          '즉시 실행 플랜'
        ]
      },
      {
        id: 'fba-flow',
        name_en: 'DELUXE — FBA Flow Optimization',
        name_ko: '델럭스 — FBA 흐름 최적화',
        desc_en: 'SKU routing, warehouse coordination, labeling flow, and multi-channel shipping guidance.',
        desc_ko: 'SKU 라우팅, 창고 협업, 라벨링 흐름, 멀티채널 배송 가이드 제공.',
        price: 489,
        featured: true,
        features_en: [
          'SKU routing map',
          'Warehouse coordination',
          'Labeling flow',
          'Multi-channel shipping'
        ],
        features_ko: [
          'SKU 라우팅 맵',
          '창고 협업',
          '라벨링 흐름',
          '멀티채널 배송'
        ]
      },
      {
        id: 'global-ops',
        name_en: 'PREMIUM — Global Ops & Cost Control',
        name_ko: '프리미엄 — 글로벌 운영 & 비용 관리',
        desc_en: 'Cross-border fulfillment setup, landed cost modeling, and escalation support for growing sellers.',
        desc_ko: '국경 간 풀필먼트 구축, 착지 원가 모델링, 성장 셀러용 이슈 대응 지원.',
        price: 899,
        featured: false,
        features_en: [
          'Fulfillment setup',
          'Landed cost model',
          'Escalation support',
          'Growth roadmap'
        ],
        features_ko: [
          '풀필먼트 세팅',
          '착지 원가 모델',
          '이슈 대응 지원',
          '성장 로드맵'
        ]
      }
    ]
  }
};

const translations = {
  en: {
    'logo-subtitle': 'Global FBA Logistics!',
    'nav-overview': 'Overview',
    'nav-packages': 'Packages',
    'nav-faq': 'FAQ',
    'nav-orders': 'Orders',
    'btn-orders': 'My Orders',
    'hero-badge': 'Cross-Border FBA & 3PL',
    'hero-title': 'AMZFBA — Amazon FBA & 3PL Logistics Optimization',
    'hero-desc': 'Optimize warehouse routing, shipping flow, landed cost control, and cross-border fulfillment for Amazon sellers.',
    'hero-cta': 'See Packages',
    'hero-secondary': 'Read FAQ',
    'stat-one-num': 'FBA',
    'stat-one-label': 'Routing clarity',
    'stat-two-num': '3PL',
    'stat-two-label': 'Warehouse sync',
    'stat-three-num': 'Global',
    'stat-three-label': 'Logistics coverage',
    'section-packages-title': 'FBA Logistics Services',
    'section-packages-sub': 'Choose a plan for route checks, FBA flow optimization, and global ops support.',
    'why-title': 'Why AMZFBA works',
    'why-desc': 'Built for sellers who need cleaner logistics, faster routing decisions, and better landed-cost visibility.',
    'why-1-bold': 'Logistics-first planning:',
    'why-1-text': 'We optimize the path from supplier to fulfillment center before scaling spend.',
    'why-2-bold': 'Clear reporting:',
    'why-2-text': 'Daily updates, weekly PDFs, and monthly reviews keep every logistics step transparent.',
    'why-3-bold': 'Global ready:',
    'why-3-text': 'Designed for Amazon and 3PL workflows across the US, UK, EU, JP, CA, and beyond.',
    'faq-title': 'Frequently Asked Questions',
    'faq-sub': 'Answers for sellers building or fixing cross-border fulfillment.',
    'faq-q1': 'What do I need to prepare before starting?',
    'faq-a1': 'Share your marketplace, SKU list, warehouse/3PL details, and any current shipping or labeling issues.',
    'faq-q2': 'Which marketplaces are supported?',
    'faq-a2': 'We support Amazon marketplaces across the US, UK, EU, JP, CA, and other regions on request.',
    'faq-q3': 'How is the work delivered?',
    'faq-a3': 'You receive email updates, a structured receipt, and Google Form intake for logistics assets and goals.',
    'faq-q4': 'Is this a one-time service or ongoing management?',
    'faq-a4': 'STANDARD is a one-time route review package, while DELUXE and PREMIUM are ongoing operations plans.',
    'orders-title': 'My Purchase History',
    'orders-sub': 'Successful orders are stored locally in your browser workspace.',
    'th-date': 'Order Date',
    'th-order-id': 'Transaction ID',
    'th-product': 'Product',
    'th-tier': 'Package Tier',
    'th-marketplace': 'Marketplace',
    'th-qty': 'Quantity',
    'th-total': 'Total Paid',
    'th-status': 'Status',
    'no-orders-msg': 'No purchase records yet. Tap a package to start your first order.',
    'modal-title': 'Configure Logistics Order',
    'modal-desc': 'Confirm your package and complete the secure PayPal checkout.',
    'modal-base-pkg': 'Base Package:',
    'modal-base-price-label': 'Base Price:',
    'modal-email-label': 'Email Address *',
    'modal-email-placeholder': 'name@example.com',
    'modal-marketplace-label': 'Target Marketplace *',
    'modal-marketplace-placeholder': 'US, UK, JP, EU...',
    'modal-keywords-label': 'Target SKUs / Issues *',
    'modal-keywords-placeholder': 'fba, 3pl, shipping, labeling...',
    'modal-qty': 'Quantity:',
    'modal-total-amt': 'Total Amount:',
    'badge-ssl': 'SSL Secured Checkout',
    'badge-paypal': 'PayPal Verified',
    'pay-now': 'Pay with PayPal',
    'featured-badge': 'Best Seller',
    'order-button': 'Order Package',
    'foot-note': 'AMZFBA helps Amazon sellers improve FBA flow, logistics routing, and landed-cost control.',
    'foot-contact': 'Contact support: snsherocom@gmail.com',
    'foot-copy': '&copy; 2026 BibleForAI AMZFBA. All rights reserved.',
    'receipt-header': 'BIBLEFORAI - AMZFBA RECEIPT',
    'receipt-date': 'Order Date',
    'receipt-txid': 'Transaction ID',
    'receipt-email': 'Customer Email',
    'receipt-type': 'Product Type',
    'receipt-size': 'Package Tier',
    'receipt-marketplace': 'Marketplace',
    'receipt-keywords': 'Logistics Notes',
    'receipt-qty': 'Quantity',
    'receipt-baseprice': 'Base Price',
    'receipt-total': 'Total Paid',
    'receipt-status': 'Status',
    'receipt-method': 'Payment Method',
    'receipt-method-val': 'PayPal Secure Checkout'
  },
  ko: {
    'logo-subtitle': '글로벌 FBA 물류!',
    'nav-overview': '개요',
    'nav-packages': '패키지',
    'nav-faq': 'FAQ',
    'nav-orders': '주문내역',
    'btn-orders': '내 주문내역',
    'hero-badge': '국경 간 FBA & 3PL',
    'hero-title': 'AMZFBA — 아마존 FBA & 3PL 물류 최적화',
    'hero-desc': '아마존 셀러를 위해 창고 라우팅, 배송 흐름, 착지 원가 관리, 국경 간 풀필먼트를 최적화합니다.',
    'hero-cta': '패키지 보기',
    'hero-secondary': 'FAQ 보기',
    'stat-one-num': 'FBA',
    'stat-one-label': '라우팅 명확화',
    'stat-two-num': '3PL',
    'stat-two-label': '창고 연동',
    'stat-three-num': 'Global',
    'stat-three-label': '물류 커버리지',
    'section-packages-title': 'FBA 물류 서비스',
    'section-packages-sub': '경로 점검, FBA 흐름 최적화, 글로벌 운영 지원에 맞는 플랜을 선택하세요.',
    'why-title': 'AMZFBA가 효과적인 이유',
    'why-desc': '더 깔끔한 물류, 더 빠른 라우팅 판단, 더 좋은 착지 원가 가시성이 필요한 셀러를 위해 설계되었습니다.',
    'why-1-bold': '물류 우선 설계:',
    'why-1-text': '예산을 늘리기 전에 공급처에서 풀필먼트 센터까지의 경로를 최적화합니다.',
    'why-2-bold': '명확한 리포팅:',
    'why-2-text': '매일 업데이트, 주간 PDF, 월간 리뷰로 모든 물류 단계를 투명하게 공유합니다.',
    'why-3-bold': '글로벌 대응:',
    'why-3-text': '미국, 영국, 유럽, 일본, 캐나다 등 Amazon과 3PL 워크플로를 지원합니다.',
    'faq-title': '자주 묻는 질문',
    'faq-sub': '국경 간 풀필먼트를 만들거나 수정하는 셀러를 위한 답변입니다.',
    'faq-q1': '시작 전에 무엇을 준비해야 하나요?',
    'faq-a1': '마켓플레이스, SKU 목록, 창고/3PL 정보, 그리고 현재 배송이나 라벨링 이슈를 공유해주세요.',
    'faq-q2': '어떤 마켓플레이스를 지원하나요?',
    'faq-a2': '미국, 영국, 유럽, 일본, 캐나다를 포함한 글로벌 아마존 마켓플레이스를 지원하며, 요청 시 추가 지역도 협의 가능합니다.',
    'faq-q3': '작업 결과는 어떻게 전달되나요?',
    'faq-a3': '이메일 업데이트, 구조화된 영수증, 그리고 물류 자산/목표 입력용 Google Form으로 전달됩니다.',
    'faq-q4': '1회성 서비스인가요, 아니면 운영형 서비스인가요?',
    'faq-a4': 'STANDARD는 1회 경로 점검 패키지이고, DELUXE와 PREMIUM은 지속 운영 플랜입니다.',
    'orders-title': '내 구매 내역',
    'orders-sub': '성공한 주문은 브라우저 작업공간에 로컬로 저장됩니다.',
    'th-date': '주문 날짜',
    'th-order-id': '트랜잭션 ID',
    'th-product': '상품명',
    'th-tier': '패키지',
    'th-marketplace': '마켓플레이스',
    'th-qty': '수량',
    'th-total': '결제 금액',
    'th-status': '상태',
    'no-orders-msg': '아직 구매 내역이 없습니다. 패키지를 눌러 첫 주문을 시작해 보세요.',
    'modal-title': '물류 주문 설정',
    'modal-desc': '패키지를 확인하고 안전한 PayPal 결제를 완료하세요.',
    'modal-base-pkg': '기본 패키지:',
    'modal-base-price-label': '기본 가격:',
    'modal-email-label': '이메일 주소 *',
    'modal-email-placeholder': 'name@example.com',
    'modal-marketplace-label': '타겟 마켓플레이스 *',
    'modal-marketplace-placeholder': 'US, UK, JP, EU...',
    'modal-keywords-label': '타겟 SKU / 이슈 *',
    'modal-keywords-placeholder': 'fba, 3pl, shipping, labeling...',
    'modal-qty': '수량:',
    'modal-total-amt': '총 결제액:',
    'badge-ssl': 'SSL 보안 결제',
    'badge-paypal': 'PayPal 인증',
    'pay-now': 'PayPal로 결제',
    'featured-badge': '베스트셀러',
    'order-button': '패키지 주문',
    'foot-note': 'AMZFBA는 아마존 셀러의 FBA 흐름, 물류 라우팅, 착지 원가 관리를 돕습니다.',
    'foot-contact': '문의: snsherocom@gmail.com',
    'foot-copy': '&copy; 2026 BibleForAI AMZFBA. All rights reserved.',
    'receipt-header': 'BIBLEFORAI - AMZFBA 영수증',
    'receipt-date': '주문 날짜',
    'receipt-txid': '트랜잭션 ID',
    'receipt-email': '고객 이메일',
    'receipt-type': '상품 유형',
    'receipt-size': '패키지',
    'receipt-marketplace': '마켓플레이스',
    'receipt-keywords': '물류 노트',
    'receipt-qty': '수량',
    'receipt-baseprice': '기본 가격',
    'receipt-total': '총 결제액',
    'receipt-status': '상태',
    'receipt-method': '결제 수단',
    'receipt-method-val': 'PayPal 안전 결제'
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

function getCurrentLabels() {
  return translations[currentLang] || translations.en;
}

function applyTranslations(lang) {
    // Force trailing slash for consistent relative path resolution
    if (!window.location.pathname.endsWith('/') && !window.location.pathname.split('/').pop().includes('.')) {
        window.location.replace(window.location.pathname + '/' + window.location.search + window.location.hash);
        return;
    }

    // Auto-redirect based on global language preference
    const isKrPage = window.location.pathname.includes('/kr/');
    let preferredLang = localStorage.getItem('bibleforai_lang');
    if (!preferredLang) {
        preferredLang = isKrPage ? 'ko' : 'en';
        localStorage.setItem('bibleforai_lang', preferredLang);
    }
    if (preferredLang === 'ko' && !isKrPage) {
        const base = window.location.pathname.endsWith('/') ? window.location.pathname : window.location.pathname + '/';
        window.location.href = base + 'kr/';
        return;
    } else if (preferredLang === 'en' && isKrPage) {
        window.location.href = window.location.pathname.replace('/kr/', '/');
        return;
    }
 else if (preferredLang === 'en' && isKrPage) {
        window.location.href = window.location.pathname.replace('/kr/', '/');
        return;
    }

  currentLang = lang;
  localStorage.setItem('bibleforai_lang', lang);
  document.documentElement.lang = lang;
  const dict = getCurrentLabels();

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) el.innerHTML = dict[key];
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (dict[key]) el.setAttribute('placeholder', dict[key]);
  });

  const selector = document.getElementById('language-selector');
  if (selector && selector.value !== lang) selector.value = lang;

  renderPackages();
  renderOrders();
}

function changeLanguage(lang) {
  applyTranslations(lang);
}

function navigate(target) {
  const el = document.getElementById(`${target}-section`) || document.getElementById(`${target}-view`) || document.getElementById(target);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  closeMobileMenu();
}

function toggleMobileMenu() {
  const drawer = document.getElementById('mobile-drawer');
  if (drawer) drawer.classList.toggle('active');
}

function closeMobileMenu() {
  const drawer = document.getElementById('mobile-drawer');
  if (drawer) drawer.classList.remove('active');
}

function renderPackages() {
  const container = document.getElementById('amazon-packages');
  if (!container) return;
  const isKo = currentLang === 'ko';
  const catalog = packageCatalog.fba;

  container.innerHTML = catalog.packages.map(pkg => {
    const name = isKo ? pkg.name_ko : pkg.name_en;
    const desc = isKo ? pkg.desc_ko : pkg.desc_en;
    const features = isKo ? pkg.features_ko : pkg.features_en;
    const featured = pkg.featured ? `<span class="package-chip">${getCurrentLabels()['featured-badge']}</span>` : '';
    return `
      <article class="package-card ${pkg.featured ? 'featured' : ''}">
        ${featured}
        <div class="card-icon fba-color"><i class="fa-solid fa-truck-fast"></i></div>
        <h3>${name}</h3>
        <p class="package-desc">${desc}</p>
        <div class="package-price-box">
          <span class="currency">USD</span>
          <span class="price" role="button" tabindex="0" title="Click to open checkout" onclick="openPurchaseModal('fba', '${pkg.id}')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openPurchaseModal('fba', '${pkg.id}');}">${formatPrice(pkg.price)}</span>
        </div>
        <ul class="package-features">
          ${features.map(feat => `<li><i class="fa-solid fa-circle-check"></i> ${feat}</li>`).join('')}
        </ul>
        <button class="btn-buy" onclick="openPurchaseModal('fba', '${pkg.id}')">
          <i class="fa-solid fa-bag-shopping"></i> ${getCurrentLabels()['order-button']}
        </button>
      </article>
    `;
  }).join('');
}

function openPurchaseModal(categoryKey, packageId) {
  const category = packageCatalog[categoryKey];
  const pkg = category.packages.find(p => p.id === packageId);
  if (!pkg) return;

  const dict = getCurrentLabels();
  const isKo = currentLang === 'ko';
  const pkgName = isKo ? pkg.name_ko : pkg.name_en;

  currentPackage = {
    categoryKey,
    categoryName: isKo ? category.title_ko : category.title_en,
    tierName: pkgName,
    basePrice: pkg.price
  };

  orderQuantity = 1;
  const titleEl = document.getElementById('modal-product-title');
  const pkgEl = document.getElementById('modal-package-name');
  const basePriceEl = document.getElementById('modal-base-price');
  const emailEl = document.getElementById('order-email');
  const marketplaceEl = document.getElementById('order-marketplace');
  const keywordsEl = document.getElementById('order-keywords');
  const qtyEl = document.getElementById('order-quantity');

  if (titleEl) titleEl.innerText = isKo ? category.title_ko : category.title_en;
  if (pkgEl) pkgEl.innerText = pkgName;
  if (basePriceEl) basePriceEl.innerText = formatPrice(pkg.price);
  if (qtyEl) qtyEl.value = '1';
  if (emailEl) emailEl.value = '';
  if (marketplaceEl) marketplaceEl.value = '';
  if (keywordsEl) keywordsEl.value = '';

  const emailError = document.getElementById('email-error');
  if (emailError) emailError.style.display = 'none';

  updateModalPrice();

    const totalEl = document.getElementById('modal-total-price');
    if (totalEl && !totalEl.dataset.checkoutBound) {
        totalEl.style.cursor = 'pointer';
        totalEl.setAttribute('role', 'button');
        totalEl.setAttribute('tabindex', '0');
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
    if (modalCard && totalBox) {
      modalCard.scrollTo({ top: Math.max(totalBox.offsetTop - 12, 0), behavior: 'smooth' });
    }
  }, 800);

  initPayPalButtons();
}

function closeModal() {
  const modal = document.getElementById('purchase-modal');
  if (modal) modal.classList.remove('active');
  const container = document.getElementById('paypal-button-container');
  if (container) container.innerHTML = '';
  paypalButtonInstance = null;
}

function adjustQty(amount) {
  const qtyInput = document.getElementById('order-quantity');
  if (!qtyInput) return;
  let val = parseInt(qtyInput.value, 10) || 1;
  val += amount;
  if (val < 1) val = 1;
  qtyInput.value = String(val);
  orderQuantity = val;
  updateModalPrice();
}

function updateModalPrice() {
  const qtyInput = document.getElementById('order-quantity');
  if (!qtyInput || !currentPackage) return;
  let val = parseInt(qtyInput.value, 10);
  if (Number.isNaN(val) || val < 1) val = 1;
  orderQuantity = val;
  const total = currentPackage.basePrice * orderQuantity;
  const totalEl = document.getElementById('modal-total-price');
  if (totalEl) totalEl.innerText = formatPrice(total);
}

function validateEmailField() {
  const emailInput = document.getElementById('order-email');
  const emailError = document.getElementById('email-error');
  if (!emailInput) return true;
  const email = emailInput.value.trim();
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const valid = pattern.test(email);
  if (!valid) {
    emailInput.style.borderColor = '#ef4444';
    if (emailError) {
      emailError.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> ${currentLang === 'ko' ? '올바른 이메일 주소를 입력해주세요.' : 'Please enter a valid email address.'}`;
      emailError.style.display = 'block';
    }
    return false;
  }
  emailInput.style.borderColor = 'var(--border)';
  if (emailError) emailError.style.display = 'none';
  return true;
}

function validateOrderFields() {
  const marketplace = document.getElementById('order-marketplace');
  const keywords = document.getElementById('order-keywords');
  const missing = [];
  if (marketplace && !marketplace.value.trim()) missing.push(marketplace);
  if (keywords && !keywords.value.trim()) missing.push(keywords);
  missing.forEach(el => { el.style.borderColor = '#ef4444'; });
  return missing.length === 0;
}

function triggerTestCheckout() {
  const emailInput = document.getElementById('order-email');
  if (emailInput && !emailInput.value.trim()) {
    emailInput.value = 'sandbox@test.dev';
  }
  const marketplace = document.getElementById('order-marketplace');
  if (marketplace && !marketplace.value.trim()) marketplace.value = 'Global';
  const keywords = document.getElementById('order-keywords');
  if (keywords && !keywords.value.trim()) keywords.value = 'amazon fba logistics';

  if (!validateEmailField() || !validateOrderFields()) return;
  const mockDetails = {
    id: `TEST-PAYID-${Math.random().toString(36).slice(2, 10).toUpperCase()}`,
    isTest: true
  };
  saveLocalOrder(mockDetails);
  closeModal();
}

function initPayPalButtons() {
  const container = document.getElementById('paypal-button-container');
  if (!container || paypalButtonInstance) return;
  if (typeof paypal === 'undefined') {
    container.innerHTML = '<p style="color:#ef4444;text-align:center;font-size:0.92rem;padding:1rem;font-weight:600;"><i class="fa-solid fa-triangle-exclamation"></i> PayPal is unavailable right now. Please reload the page.</p>';
    return;
  }

  paypalButtonInstance = paypal.Buttons({
    style: { layout: 'vertical', color: 'blue', shape: 'rect', label: 'checkout' },
    onClick: function(data, actions) {
      if (!validateEmailField() || !validateOrderFields()) {
        return actions.reject();
      }
      return actions.resolve();
    },
    createOrder: function(data, actions) {
      const total = (currentPackage.basePrice * orderQuantity).toFixed(2);
      const marketplace = document.getElementById('order-marketplace').value.trim();
      const keywords = document.getElementById('order-keywords').value.trim();
      return actions.order.create({
        purchase_units: [{
          description: `${currentPackage.categoryName} - ${currentPackage.tierName} [Marketplace: ${marketplace}] [Keywords: ${keywords}] (Qty: ${orderQuantity})`,
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
      console.error('PayPal Checkout error:', err);
      alert('An error occurred during payment processing. Please try again.');
    }
  });

  paypalButtonInstance.render('#paypal-button-container');
}

function saveLocalOrder(details) {
  const orderLogs = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  const emailVal = document.getElementById('order-email') ? document.getElementById('order-email').value.trim() : '';
  const marketplaceVal = document.getElementById('order-marketplace') ? document.getElementById('order-marketplace').value.trim() : '';
  const keywordsVal = document.getElementById('order-keywords') ? document.getElementById('order-keywords').value.trim() : '';
  const dict = getCurrentLabels();

  const newOrder = {
    date: new Date().toLocaleString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    }),
    id: details.id,
    email: emailVal,
    category: currentPackage.categoryName,
    package: currentPackage.tierName,
    marketplace: marketplaceVal || 'Global',
    keywords: keywordsVal,
    quantity: orderQuantity,
    basePrice: currentPackage.basePrice,
    totalPaid: formatPrice(currentPackage.basePrice * orderQuantity),
    status: 'Completed'
  };

  orderLogs.unshift(newOrder);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orderLogs));
  renderOrders();

  const receiptText = `===================================
${dict['receipt-header']}
===================================
${dict['receipt-date'].padEnd(15)} : ${newOrder.date}
${dict['receipt-txid'].padEnd(15)} : ${newOrder.id}
${dict['receipt-email'].padEnd(15)} : ${newOrder.email}
${dict['receipt-type'].padEnd(15)} : ${newOrder.category}
${dict['receipt-size'].padEnd(15)} : ${newOrder.package}
${dict['receipt-marketplace'].padEnd(15)} : ${newOrder.marketplace}
${dict['receipt-keywords'].padEnd(15)} : ${newOrder.keywords}
${dict['receipt-qty'].padEnd(15)} : ${newOrder.quantity}
${dict['receipt-baseprice'].padEnd(15)} : ${formatPrice(newOrder.basePrice)}
${dict['receipt-total'].padEnd(15)} : ${newOrder.totalPaid}
${dict['receipt-status'].padEnd(15)} : ${newOrder.status}
-----------------------------------
${dict['receipt-method'].padEnd(15)} : ${dict['receipt-method-val']}
===================================`;

  const redirectUrl = `https://docs.google.com/forms/d/e/1FAIpQLScMPqbEWWttS5mb1m_krsO_kco24ImpgvYVSbc7zO0nEVmYFw/viewform?entry.1059822061=${encodeURIComponent(receiptText)}`;
  window.location.href = redirectUrl;
}

function renderOrders() {
  const tbody = document.getElementById('orders-tbody');
  const emptyMsg = document.getElementById('no-orders-msg');
  if (!tbody || !emptyMsg) return;
  const orderLogs = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  const isKo = currentLang === 'ko';

  if (!orderLogs.length) {
    tbody.innerHTML = '';
    emptyMsg.style.display = 'block';
    return;
  }

  emptyMsg.style.display = 'none';
  tbody.innerHTML = orderLogs.map(order => `
    <tr>
      <td>${order.date}</td>
      <td class="tx-id">${order.id}</td>
      <td>${order.category}</td>
      <td>${order.package}</td>
      <td>${order.marketplace || 'Global'}</td>
      <td>${order.quantity}</td>
      <td><strong>${order.totalPaid}</strong></td>
      <td><span class="status-badge">${isKo ? '완료됨' : order.status}</span></td>
    </tr>
  `).join('');
}

window.changeLanguage = changeLanguage;
window.navigate = navigate;
window.toggleMobileMenu = toggleMobileMenu;
window.closeModal = closeModal;
window.adjustQty = adjustQty;
window.triggerTestCheckout = triggerTestCheckout;
window.openPurchaseModal = openPurchaseModal;
window.updateModalPrice = updateModalPrice;

window.addEventListener('DOMContentLoaded', () => {
  applyTranslations(currentLang);
  renderPackages();
  renderOrders();
});

// Expose variables globally to prevent ReferenceErrors in inline HTML scripts/handlers
if (typeof navigate !== 'undefined') { window.navigate = navigate; }
if (typeof currentLang !== 'undefined') { window.currentLang = currentLang; }
