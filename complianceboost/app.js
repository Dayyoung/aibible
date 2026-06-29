// COMPLIANCEBOOST app state
const STORAGE_KEY = 'complianceboost_orders';
let currentLang = localStorage.getItem('bibleforai_lang') || 'en';
let currentPackage = null;
let orderQuantity = 1;
let paypalButtonInstance = null;

const packageCatalog = {
  amazon: {
    title_en: 'Compliance Docs & Audit Prep',
    title_ko: '컴플라이언스 문서 & 감사 준비',
    packages: [
      {
        id: 'audit-starter',
        name_en: 'STANDARD — Audit Starter',
        name_ko: '스탠다드 — 감사 스타터',
        desc_en: 'Quick policy audit, risk checklist, and a clean roadmap for your first compliance pass.',
        desc_ko: '빠른 정책 진단, 리스크 체크리스트, 첫 컴플라이언스 점검용 로드맵 제공.',
        price: 159,
        featured: false,
        features_en: [
          'Policy audit',
          'Risk checklist',
          'Gap summary',
          'Starter roadmap'
        ],
        features_ko: [
          '정책 진단',
          '리스크 체크리스트',
          '갭 요약',
          '스타터 로드맵'
        ]
      },
      {
        id: 'policy-bundle',
        name_en: 'DELUXE — Policy Bundle',
        name_ko: '델럭스 — 정책 번들',
        desc_en: 'Privacy policy, terms, cookie banner guidance, and basic implementation support.',
        desc_ko: '개인정보처리방침, 이용약관, 쿠키 배너 가이드, 기본 적용 지원.',
        price: 489,
        featured: true,
        features_en: [
          'Privacy policy draft',
          'Terms of service draft',
          'Cookie banner guidance',
          'Implementation notes'
        ],
        features_ko: [
          '개인정보처리방침 초안',
          '이용약관 초안',
          '쿠키 배너 가이드',
          '적용 노트'
        ]
      },
      {
        id: 'enterprise-shield',
        name_en: 'PREMIUM — Enterprise Shield',
        name_ko: '프리미엄 — 엔터프라이즈 실드',
        desc_en: 'Ongoing documentation support, audit prep, and priority response for larger teams.',
        desc_ko: '대규모 팀을 위한 지속 문서 지원, 감사 준비, 우선 대응 서비스.',
        price: 1289,
        featured: false,
        features_en: [
          'Ongoing support',
          'Audit prep',
          'Priority response',
          'Documentation cleanup'
        ],
        features_ko: [
          '지속 지원',
          '감사 준비',
          '우선 대응',
          '문서 정리'
        ]
      }
    ]
  }
};

const translations = {
  en: {
    'logo-subtitle': 'Compliance Operations!',
    'nav-overview': 'Overview',
    'nav-packages': 'Packages',
    'nav-faq': 'FAQ',
    'nav-orders': 'Orders',
    'btn-orders': 'My Orders',
    'hero-badge': 'Legal Ops Ready',
    'hero-title': 'COMPLIANCEBOOST — Compliance Docs & Audit Prep',
    'hero-desc': 'Prepare policies, disclosures, and audit-ready documentation with a clean PayPal workflow.',
    'hero-cta': 'See Packages',
    'hero-secondary': 'Read FAQ',
    'stat-one-num': 'GDPR',
    'stat-one-label': 'Policy mapping',
    'stat-two-num': 'Audit',
    'stat-two-label': 'Gap review',
    'stat-three-num': 'Fast',
    'stat-three-label': 'Delivery ready',
    'section-packages-title': 'Compliance Packages',
    'section-packages-sub': 'Choose a plan for policy updates, risk checks, and audit-ready documentation.',
    'why-title': 'Why COMPLIANCEBOOST works',
    'why-desc': 'Built around policy mapping, gap analysis, documentation cleanup, and audit preparation.',
    'why-1-bold': 'Policy-first workflow:',
    'why-1-text': 'We focus on policy gaps and risk flags instead of one-off vanity metrics.',
    'why-2-bold': 'Clear documentation:',
    'why-2-text': 'Daily updates, weekly PDFs, and monthly strategy reviews keep every step transparent.',
    'why-3-bold': 'Jurisdiction ready:',
    'why-3-text': 'Built for global compliance workflows across the US, UK, EU, JP, CA, and more.',
    'faq-title': 'Frequently Asked Questions',
    'faq-sub': 'Answers for startups, agencies, and global teams preparing compliance documents.',
    'faq-q1': 'What should I prepare before starting?',
    'faq-a1': 'Send your company website, jurisdictions, and the policy or disclosure pages you already have. If you have existing legal docs, share them for a faster audit.',
    'faq-q2': 'Which standards are supported?',
    'faq-a2': 'We can work on GDPR-style privacy pages, cookie banners, terms of service, basic audit prep, and similar documentation workflows.',
    'faq-q3': 'How is the work delivered?',
    'faq-a3': 'You receive email updates, a structured receipt, and Google Form intake for jurisdiction and document scope.',
    'faq-q4': 'Is this a one-time service or ongoing management?',
    'faq-a4': 'Both. STANDARD is a one-time document bundle, while DELUXE and PREMIUM are ongoing compliance support plans.',
    'orders-title': 'My Purchase History',
    'orders-sub': 'Successful orders are stored locally in your browser workspace.',
    'th-date': 'Order Date',
    'th-order-id': 'Transaction ID',
    'th-product': 'Product',
    'th-tier': 'Package Tier',
    'th-marketplace': 'Jurisdiction',
    'th-qty': 'Quantity',
    'th-total': 'Total Paid',
    'th-status': 'Status',
    'no-orders-msg': 'No purchase records yet. Tap a package to start your first order.',
    'modal-title': 'Configure Compliance Order',
    'modal-desc': 'Confirm your package and complete the secure PayPal checkout.',
    'modal-base-pkg': 'Base Package:',
    'modal-base-price-label': 'Base Price:',
    'modal-email-label': 'Email Address *',
    'modal-email-placeholder': 'name@example.com',
    'modal-marketplace-label': 'Target Jurisdiction *',
    'modal-marketplace-placeholder': 'US, UK, JP, EU...',
    'modal-keywords-label': 'Compliance Scope *',
    'modal-keywords-placeholder': 'amazon ppc, acos, fba...',
    'modal-qty': 'Quantity:',
    'modal-total-amt': 'Total Amount:',
    'modal-test-hint': 'Click the total price to run a sandbox test checkout',
    'badge-ssl': 'SSL Secured Checkout',
    'badge-paypal': 'PayPal Verified',
    'pay-now': 'Pay with PayPal',
    'featured-badge': 'Best Seller',
    'order-button': 'Order Package',
    'foot-note': 'COMPLIANCEBOOST helps Amazon sellers improve PPC control, keyword discipline, and account operations.',
    'foot-contact': 'Contact support: snsherocom@gmail.com',
    'foot-copy': '&copy; 2026 BibleForAI COMPLIANCEBOOST. All rights reserved.',
    'receipt-header': 'BIBLEFORAI - COMPLIANCEBOOST RECEIPT',
    'receipt-date': 'Order Date',
    'receipt-txid': 'Transaction ID',
    'receipt-email': 'Customer Email',
    'receipt-type': 'Service Type',
    'receipt-size': 'Package Tier',
    'receipt-marketplace': 'Jurisdiction',
    'receipt-keywords': 'Keywords',
    'receipt-qty': 'Quantity',
    'receipt-baseprice': 'Base Price',
    'receipt-total': 'Total Paid',
    'receipt-status': 'Status',
    'receipt-method': 'Payment Method',
    'receipt-method-val': 'PayPal Secure Checkout'
  },
  ko: {
    'logo-subtitle': '아마존 PPC!',
    'nav-overview': '개요',
    'nav-packages': '패키지',
    'nav-faq': 'FAQ',
    'nav-orders': '주문내역',
    'btn-orders': '내 주문내역',
    'hero-badge': '법무 운영 준비',
    'hero-title': 'COMPLIANCEBOOST — 컴플라이언스 문서 & 감사 준비',
    'hero-desc': '정책, 고지사항, 감사 대응 문서를 빠르게 준비하고 깔끔한 PayPal 워크플로우로 진행하세요.',
    'hero-cta': '패키지 보기',
    'hero-secondary': 'FAQ 보기',
    'stat-one-num': 'ACOS ↓',
    'stat-one-label': '광고비 낭비 감소',
    'stat-two-num': '매일',
    'stat-two-label': '아침 리포트',
    'stat-three-num': '글로벌',
    'stat-three-label': '관할권 지원',
    'section-packages-title': '컴플라이언스 패키지',
    'section-packages-sub': '정책 업데이트, 리스크 점검, 감사 대응 문서 수준에 맞는 플랜을 선택하세요.',
    'why-title': 'COMPLIANCEBOOST가 효과적인 이유',
    'why-desc': '정책 매핑, 갭 분석, 문서 정리, 감사 준비를 중심으로 구성된 운영 방식입니다.',
    'why-1-bold': '데이터 중심 PPC:',
    'why-1-text': '단순 노출보다 ACOS, CVR, 매출 흐름을 중심으로 운영합니다.',
    'why-2-bold': '명확한 리포팅:',
    'why-2-text': '매일 아침 이메일, 주간 PDF, 월간 전략 회고로 모든 과정을 투명하게 공유합니다.',
    'why-3-bold': '글로벌 대응:',
    'why-3-text': '미국, 영국, 유럽, 일본, 캐나다 등 다양한 아마존 관할권에 대응합니다.',
    'faq-title': '자주 묻는 질문',
    'faq-sub': '아마존 FBA 계정을 시작하거나 확장하는 셀러를 위한 답변입니다.',
    'faq-q1': '시작 전에 무엇을 준비해야 하나요?',
    'faq-a1': '회사 웹사이트, 관할권, 그리고 이미 보유한 정책/고지 페이지를 보내주세요. 기존 법무 문서가 있으면 감사가 더 빨라집니다.',
    'faq-q2': '어떤 기준을 지원하나요?',
    'faq-a2': 'GDPR 스타일 개인정보처리방침, 쿠키 배너, 이용약관, 기본 감사 준비 등 문서 워크플로우를 지원합니다.',
    'faq-q3': '작업 결과는 어떻게 전달되나요?',
    'faq-a3': '이메일 업데이트, 구조화된 영수증, 그리고 관할권/문서 범위 입력용 Google Form으로 전달됩니다.',
    'faq-q4': '1회성 서비스인가요, 아니면 운영형 서비스인가요?',
    'faq-a4': '둘 다 가능합니다. STANDARD는 1회 문서 번들이고, DELUXE와 PREMIUM은 지속 컴플라이언스 지원 플랜입니다.',
    'orders-title': '내 구매 내역',
    'orders-sub': '성공한 주문은 브라우저 작업공간에 로컬로 저장됩니다.',
    'th-date': '주문 날짜',
    'th-order-id': '트랜잭션 ID',
    'th-product': '상품명',
    'th-tier': '패키지',
    'th-marketplace': '관할권',
    'th-qty': '수량',
    'th-total': '결제 금액',
    'th-status': '상태',
    'no-orders-msg': '아직 구매 내역이 없습니다. 패키지를 눌러 첫 주문을 시작해 보세요.',
    'modal-title': '컴플라이언스 주문 설정',
    'modal-desc': '패키지를 확인하고 안전한 PayPal 결제를 완료하세요.',
    'modal-base-pkg': '기본 패키지:',
    'modal-base-price-label': '기본 가격:',
    'modal-email-label': '이메일 주소 *',
    'modal-email-placeholder': 'name@example.com',
    'modal-marketplace-label': '타겟 관할권 *',
    'modal-marketplace-placeholder': 'US, UK, JP, EU...',
    'modal-keywords-label': '컴플라이언스 범위 *',
    'modal-keywords-placeholder': 'amazon ppc, acos, fba...',
    'modal-qty': '수량:',
    'modal-total-amt': '총 결제액:',
    'modal-test-hint': '총액을 클릭하면 샌드박스 테스트 결제가 실행됩니다',
    'badge-ssl': 'SSL 보안 결제',
    'badge-paypal': 'PayPal 인증',
    'pay-now': 'PayPal로 결제',
    'featured-badge': '베스트셀러',
    'order-button': '패키지 주문',
    'foot-note': 'COMPLIANCEBOOST는 아마존 셀러의 PPC 제어, 키워드 운영, 계정 관리를 돕습니다.',
    'foot-contact': '문의: snsherocom@gmail.com',
    'foot-copy': '&copy; 2026 BibleForAI COMPLIANCEBOOST. All rights reserved.',
    'receipt-header': 'BIBLEFORAI - COMPLIANCEBOOST 영수증',
    'receipt-date': '주문 날짜',
    'receipt-txid': '트랜잭션 ID',
    'receipt-email': '고객 이메일',
    'receipt-type': '상품 유형',
    'receipt-size': '패키지',
    'receipt-marketplace': '관할권',
    'receipt-keywords': '키워드',
    'receipt-qty': '수량',
    'receipt-baseprice': '기본 가격',
    'receipt-total': '총 결제액',
    'receipt-status': '상태',
    'receipt-method': '결제 수단',
    'receipt-method-val': 'PayPal 안전 결제'
  }
};

function formatPrice(value) {
  return `$${Number(value).toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
}

function getCurrentLabels() {
  return translations[currentLang] || translations.en;
}

function applyTranslations(lang) {
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
  const catalog = packageCatalog.amazon;

  container.innerHTML = catalog.packages.map(pkg => {
    const name = isKo ? pkg.name_ko : pkg.name_en;
    const desc = isKo ? pkg.desc_ko : pkg.desc_en;
    const features = isKo ? pkg.features_ko : pkg.features_en;
    const featured = pkg.featured ? `<span class="package-chip">${getCurrentLabels()['featured-badge']}</span>` : '';
    return `
      <article class="package-card ${pkg.featured ? 'featured' : ''}">
        ${featured}
        <div class="card-icon amazon-color"><i class="fa-solid fa-store"></i></div>
        <h3>${name}</h3>
        <p class="package-desc">${desc}</p>
        <div class="package-price-box">
          <span class="currency">USD</span>
          <span class="price">${formatPrice(pkg.price)}</span>
        </div>
        <ul class="package-features">
          ${features.map(feat => `<li><i class="fa-solid fa-circle-check"></i> ${feat}</li>`).join('')}
        </ul>
        <button class="btn-buy" onclick="openPurchaseModal('amazon', '${pkg.id}')">
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
  document.getElementById('purchase-modal').classList.add('active');

  setTimeout(() => {
    const modalCard = document.querySelector('.modal-card');
    const totalBox = document.querySelector('.total-price-box');
    if (modalCard && totalBox) {
      modalCard.scrollTo({ top: Math.max(totalBox.offsetTop - 120, 0), behavior: 'smooth' });
    }
  }, 150);

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
  if (keywords && !keywords.value.trim()) keywords.value = 'amazon ppc';

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
          description: `${currentPackage.categoryName} - ${currentPackage.tierName} [Jurisdiction: ${marketplace}] [Keywords: ${keywords}] (Qty: ${orderQuantity})`,
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
