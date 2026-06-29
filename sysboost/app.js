// App State
let currentView = 'home';
let currentPackage = null;
let orderQuantity = 1;
let paypalButtonInstance = null;

// System Integration Packages
const systemPackages = [
  { id: 'sys-crm', name_en: 'CRM Starter Pack', name_ko: 'CRM 스타터 팩', desc_en: 'Lightweight CRM with contact pipelines, deal tracking, and follow-up automation.', desc_ko: '연락처 파이프라인, 딜 추적, 후속 자동화를 포함한 경량 CRM 패키지.', price: 99, featured: false, features_en: ['Contact + Deal Pipeline', 'Email Follow-Up Rules', 'Dashboard Templates', 'Basic Webhook Setup'], features_ko: ['연락처 및 딜 파이프라인', '이메일 후속 규칙', '기본 대시보드 템플릿', '웹훅 기본 설정'] },
  { id: 'sys-erp', name_en: 'ERP Core Flow', name_ko: 'ERP 코어 플로우', desc_en: 'Core finance + inventory workflows with approval chains and reporting snapshots.', desc_ko: '재무/재고 핵심 흐름, 승인 체인, 리포팅 스냅샷을 구성합니다.', price: 249, featured: true, features_en: ['Finance + Inventory Modules', 'Approval Chain Builder', 'Monthly Reporting Pack', 'Role-Based Access'], features_ko: ['재무 및 재고 모듈', '승인 체인 생성기', '월간 리포팅 패키지', '역할 기반 접근 제어'] },
  { id: 'sys-scm', name_en: 'SCM Operations Hub', name_ko: 'SCM 운영 허브', desc_en: 'Supplier, order, logistics, and fulfillment orchestration with exception alerts.', desc_ko: '공급업체, 주문, 물류, 이행 운영과 예외 알림을 통합합니다.', price: 499, featured: false, features_en: ['Supplier Order Sync', 'Fulfillment Checklists', 'Exception Alert Rules', 'Carrier Data Connectors'], features_ko: ['공급업체 주문 동기화', '이행 체크리스트', '예외 알림 규칙', '운송사 데이터 커넥터'] },
  { id: 'sys-enterprise', name_en: 'Enterprise System Suite', name_ko: '엔터프라이즈 시스템 스위트', desc_en: 'Combined ERP + CRM + SCM stack with data warehouse and API gateway.', desc_ko: 'ERP·CRM·SCM 통합 스택, 데이터 웨어하우스, API 게이트웨이를 포함합니다.', price: 1499, featured: false, features_en: ['Unified ERP + CRM + SCM', 'Data Warehouse Views', 'API Gateway + Webhooks', 'Quarterly Performance Audit'], features_ko: ['ERP + CRM + SCM 통합', '데이터 웨어하우스 뷰', 'API 게이트웨이 및 웹훅', '분기별 성과 감사'] },
  { id: 'sys-unlimited', name_en: 'Platform Unlimited', name_ko: '플랫폼 무제한 플랜', desc_en: 'Custom modules, unlimited users, dedicated solution architect, and procurement support.', desc_ko: '맞춤 모듈, 무제한 사용자, 전담 솔루션 아키텍트 및 구매 지원을 제공합니다.', price: 2999, featured: false, features_en: ['Custom Module Builder', 'Unlimited User Seats', 'Solution Architect Onboarding', 'Procurement + Security Review'], features_ko: ['맞춤 모듈 빌더', '무제한 사용자 라이선스', '솔루션 아키텍트 온보딩', '구매 및 보안 검토 지원'] }
];

const translations = {
  en: {
    "logo-subtitle": "SYSBOOST",
    "nav-home": "Home",
    "nav-packages": "System Modules",
    "btn-orders": "My Orders",
    "hero-badge": "Business System Integration",
    "hero-title": "SYSBOOST — Operating System for Business",
    "hero-desc": "Design ERP, CRM, and SCM workflows as one integrated system with automation, alerts, and real-time dashboards.",
    "btn-explore": "Explore System Packages",
    "stat-countries": "20+",
    "stat-countries-label": "Modules Supported",
    "stat-onboard": "14 days",
    "stat-onboard-label": "Avg. Build Time",
    "stat-compliance": "SOC2",
    "stat-compliance-label": "Security Ready",
    "stat-retention": "99.9%",
    "stat-retention-label": "Uptime Track Record",
    "sec-title": "Built as One Business Operating System",
    "sec-subtitle": "SYSBOOST replaces disconnected spreadsheets and tools with governed modules that automate operations and scale with your business.",
    "card-1-title": "ERP + Finance",
    "card-1-desc": "Order-to-cash and procure-to-pay workflows with approval chains, journal entries, and settlement views.",
    "card-2-title": "CRM + GTM Ops",
    "card-2-desc": "Lead pipelines, forecasting, territory rules, and follow-up automation inside one customer system.",
    "card-3-title": "SCM + Logistics",
    "card-3-desc": "Supplier, carrier, inventory, and fulfillment orchestration with exception handling and alerting.",
    "pkg-title": "System Integration Packages",
    "pkg-subtitle": "Choose a system package sized to your operations maturity and integration breadth.",
    "view-orders-title": "My Purchase History",
    "view-orders-sub": "Review your successful orders. Your data is stored locally in your browser workspace.",
    "th-date": "Order Date",
    "th-order-id": "Transaction ID",
    "th-product": "Product",
    "th-tier": "Target Module",
    "th-country": "Target Scope",
    "th-qty": "Quantity",
    "th-total": "Total Paid",
    "th-status": "Status",
    "no-orders-msg": "No purchase records found. Start a system integration build to see history here!",
    "modal-title": "Configure Integration Build",
    "modal-desc": "Configure quantity and complete secure PayPal payment.",
    "modal-base-pkg": "Base Package:",
    "modal-base-price-label": "Base Price:",
    "modal-email-label": "Work Email *",
    "modal-email-placeholder": "name@company.com",
    "modal-email-error": "Please enter a valid email address.",
    "modal-country-label": "Target Scope",
    "modal-module-label": "Primary Module",
    "modal-qty": "Quantity:",
    "modal-total-amt": "Total Amount:",
    "modal-test-btn": "Click price to test checkout",
    "badge-ssl": "SSL Secured Checkout",
    "badge-paypal": "PayPal Verified",
    "foot-talent": "System Operations",
    "foot-legal": "Security & Compliance",
    "foot-gdpr": "SOC2 & Privacy Ready",
    "foot-contact": "Contact support: snsherocom@gmail.com",
    "foot-copy": "© 2026 BibleForAI SYSBOOST. All rights reserved.",
    "order-button": "Order System Package",
    "featured-badge": "Best Value",
    "receipt-header": "BIBLEFORAI - SYSBOOST RECEIPT",
    "receipt-date": "Order Date",
    "receipt-txid": "Transaction ID",
    "receipt-email": "Client Email",
    "receipt-type": "Product Type",
    "receipt-size": "Package Size",
    "receipt-country": "Target Scope",
    "receipt-module": "Primary Module",
    "receipt-qty": "Quantity",
    "receipt-baseprice": "Base Price",
    "receipt-total": "Total Paid",
    "receipt-status": "Status",
    "receipt-method": "Payment Method",
    "receipt-method-val": "PayPal Secure Checkout",
    "scope-global": "Global",
    "scope-enterprise": "Enterprise Group",
    "scope-division": "Business Division",
    "scope-site": "Single Site",
    "module-erp": "ERP Core",
    "module-crm": "CRM / GTM",
    "module-scm": "SCM / Logistics",
    "module-combined": "Combined Stack"
  },
  ko: {
    "logo-subtitle": "SYSBOOST",
    "nav-home": "홈",
    "nav-packages": "시스템 모듈",
    "btn-orders": "내 주문 내역",
    "hero-badge": "비즈니스 시스템 통합 자동화",
    "hero-title": "SYSBOOST — 기업용 비즈니스 OS",
    "hero-desc": "ERP, CRM, SCM 워크플로우를 하나의 운영 체계로 구성하고 자동화, 알림, 실시간 대시보드로 확장하세요.",
    "btn-explore": "시스템 패키지 둘러보기",
    "stat-countries": "20+",
    "stat-countries-label": "지원 모듈",
    "stat-onboard": "14일",
    "stat-onboard-label": "평균 구축 기간",
    "stat-compliance": "SOC2",
    "stat-compliance-label": "보안 준수",
    "stat-retention": "99.9%",
    "stat-retention-label": "서비스 가동률",
    "sec-title": "하나의 비즈니스 운영 체계로 설계",
    "sec-subtitle": "SYSBOOST는 분리된 스프래드시트와 도구를 자동화된 거버넌스 모듈로 대체하여 비즈니스 성장에 맞춰 운영을 확장합니다.",
    "card-1-title": "ERP + Finance",
    "card-1-desc": "주문-현금 흐름과 조달-지급 프로세스를 승인 체인, 분개, 정산 뷰로 관리합니다.",
    "card-2-title": "CRM + GTM Ops",
    "card-2-desc": "리드 파이프라인, 예측, 영역 규칙, 후속 자동화를 하나의 고객 시스템으로 통합합니다.",
    "card-3-title": "SCM + Logistics",
    "card-3-desc": "공급업체, 운송사, 재고, 이행 운영을 예외 처리와 알림으로 오케스트레이션합니다.",
    "pkg-title": "시스템 통합 패키지",
    "pkg-subtitle": "운업 성숙도와 통합 범위에 맞는 시스템 패키지를 선택하세요.",
    "view-orders-title": "내 구매 히스토리",
    "view-orders-sub": "성공한 주문 내역을 검토하세요. 결제 데이터는 브라우저 로컬저장소에 안전하게 보관됩니다.",
    "th-date": "주문 날짜",
    "th-order-id": "거래 ID",
    "th-product": "상품 종류",
    "th-tier": "대상 모듈",
    "th-country": "적용 범위",
    "th-qty": "수량",
    "th-total": "결제 총액",
    "th-status": "진행 상태",
    "no-orders-msg": "구매 기록이 없습니다. 첫 시스템 통합 빌드를 시작하면 내역이 여기에 표시됩니다!",
    "modal-title": "통합 빌드 설정 및 결제",
    "modal-desc": "수량을 선택하고 안전한 PayPal 결제를 진행하세요.",
    "modal-base-pkg": "선택 패키지:",
    "modal-base-price-label": "기본 단가:",
    "modal-email-label": "업무 이메일 *",
    "modal-email-placeholder": "name@company.com",
    "modal-email-error": "올바른 이메일 주소를 입력해 주십시오.",
    "modal-country-label": "적용 범위",
    "modal-module-label": "주요 모듈",
    "modal-qty": "주문 수량:",
    "modal-total-amt": "총 결제금액:",
    "modal-test-btn": "가격 텍스트를 눌러 테스트 결제",
    "badge-ssl": "SSL 보안 결제 적용",
    "badge-paypal": "PayPal 보안 인증됨",
    "foot-talent": "시스템 운영",
    "foot-legal": "보안 및 규정 준수",
    "foot-gdpr": "SOC2 및 privacy 준수",
    "foot-contact": "문의 지원: snsherocom@gmail.com",
    "foot-copy": "© 2026 BibleForAI SYSBOOST. All rights reserved.",
    "order-button": "시스템 패키지 주문하기",
    "featured-badge": "베스트 밸류",
    "receipt-header": "BIBLEFORAI - SYSBOOST 결제 영수증",
    "receipt-date": "주문 날짜",
    "receipt-txid": "거래 ID",
    "receipt-email": "고객 이메일",
    "receipt-type": "상품 종류",
    "receipt-size": "패키지 크기",
    "receipt-country": "적용 범위",
    "receipt-module": "선택 모듈",
    "receipt-qty": "수량",
    "receipt-baseprice": "기본 가격",
    "receipt-total": "총 결제금액",
    "receipt-status": "진행 상태",
    "receipt-method": "결제 방법",
    "receipt-method-val": "PayPal 안전 결제",
    "scope-global": "글로벌",
    "scope-enterprise": "그룹 전체",
    "scope-division": "사업부 단위",
    "scope-site": "단일 사이트",
    "module-erp": "ERP Core",
    "module-crm": "CRM / GTM",
    "module-scm": "SCM / Logistics",
    "module-combined": "Combined Stack"
  }
};

// Fetch current active language from unified key 'bibleforai_lang'
let currentLang = localStorage.getItem('bibleforai_lang') || (() => {
  const browserLang = (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage || '';
  return browserLang.toLowerCase().startsWith('ko') ? 'ko' : 'en';
})();

function formatPrice(usdPrice, includeUnit = true) {
  const isKo = currentLang === 'ko';
  const krw = Math.round(usdPrice * 1400);
  const usdFormatted = (usdPrice % 1 === 0) ? usdPrice.toLocaleString() : usdPrice.toFixed(2);
  return includeUnit ? (isKo ? `₩${krw.toLocaleString()} KRW` : `$${usdFormatted} USD`) : (isKo ? `₩${krw.toLocaleString()}` : `$${usdFormatted}`);
}

function applyTranslations() {
  const lang = currentLang;
  const isKo = lang === 'ko';

  document.documentElement.lang = lang;
  document.title = isKo ? "BibleForAI - SYSBOOST | 기업업무 시스템 통합" : "BibleForAI — SYSBOOST | Business System Integration";

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.content = isKo ? "ERP, CRM, SCM을 하나의 시스템으로 통합하는 자동화 솔루션입니다." : "Unify ERP, CRM, and SCM workflows into one governed operating system with automation and real-time dashboards.";

  // i18n updates
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const t = translations[lang] && translations[lang][key];
    if (!t) return;
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = t;
    } else {
      el.innerHTML = t;
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

function getSysIcon() {
  return 'fa-solid fa-network-wired';
}

function renderPackages() {
  const container = document.getElementById('sys-packages');
  if (!container) return;
  container.innerHTML = '';
  const lang = currentLang;
  systemPackages.forEach(pkg => {
    const name = lang === 'ko' ? pkg.name_ko : pkg.name_en;
    const desc = lang === 'ko' ? pkg.desc_ko : pkg.desc_en;
    const features = lang === 'ko' ? pkg.features_ko : pkg.features_en;
    const card = document.createElement('div');
    card.className = 'package-card' + (pkg.featured ? ' featured' : '');
    card.innerHTML = `
      ${pkg.featured ? `<span class="featured-badge" data-i18n="featured-badge">${translations[lang]['featured-badge']}</span>` : ''}
      <h3>${name}</h3>
      <p>${desc}</p>
      <div class="price-box"><span class="price">${formatPrice(pkg.price, false)}</span><span class="currency">${lang === 'ko' ? 'KRW' : 'USD'}</span></div>
      <ul class="features-list">${features.map(f => `<li><i class="${getSysIcon()}"></i> ${f}</li>`).join('')}</ul>
      <button class="btn-buy" onclick="openPurchaseModal('${pkg.id}')" data-i18n="order-button">${translations[lang]['order-button']}</button>
    `;
    container.appendChild(card);
  });
}

// Modal and payment handling
function openPurchaseModal(packageId) {
  const pkg = systemPackages.find(p => p.id === packageId);
  if (!pkg) return;
  currentPackage = { basePrice: pkg.price };
  orderQuantity = 1;

  const lang = currentLang;
  document.getElementById('modal-package-name').innerText = lang === 'ko' ? pkg.name_ko : pkg.name_en;
  document.getElementById('modal-base-price').innerText = formatPrice(pkg.price);
  document.getElementById('order-quantity').value = orderQuantity;
  document.getElementById('order-email').value = '';

  const emailError = document.getElementById('email-error');
  if (emailError) emailError.style.display = 'none';

  updateModalPrice();
  document.getElementById('purchase-modal').classList.add('active');

  setTimeout(() => {
    const modalCard = document.querySelector('.modal-card');
    const totalBox = document.querySelector('.total-price-box');
    if (modalCard && totalBox) modalCard.scrollTop = totalBox.offsetTop - 10;
  }, 80);

  setTimeout(() => {
    initPayPalButtons();
  }, 150);
}

function closeModal() {
  document.getElementById('purchase-modal').classList.remove('active');
  const container = document.getElementById('paypal-button-container');
  if (container) container.innerHTML = '';
  currentPackage = null;
}

function adjustQty(amount) {
  const qtyInput = document.getElementById('order-quantity');
  let val = parseInt(qtyInput.value) || 1;
  val += amount;
  if (val < 1) val = 1;
  qtyInput.value = val;
  orderQuantity = val;
  updateModalPrice();
}

function updateModalPrice() {
  const qtyInput = document.getElementById('order-quantity');
  const qty = parseInt(qtyInput.value) || 1;
  orderQuantity = qty;
  document.getElementById('modal-total-price').innerText = formatPrice((currentPackage ? currentPackage.basePrice : 0) * qty);
}

function validateEmailField() {
  const emailInput = document.getElementById('order-email');
  const errorSpan = document.getElementById('email-error');
  const val = emailInput ? emailInput.value.trim() : '';
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  if (!valid) {
    emailInput.style.borderColor = '#ef4444';
    if (errorSpan) errorSpan.style.display = 'block';
    return false;
  }
  emailInput.style.borderColor = 'var(--border)';
  if (errorSpan) errorSpan.style.display = 'none';
  return true;
}

function initPayPalButtons() {
  const container = document.getElementById('paypal-button-container');
  if (!container) return;
  if (typeof paypal === 'undefined') {
    container.innerHTML = '<p style="color:#ef4444;text-align:center;padding:1rem"><i class="fa-solid fa-triangle-exclamation"></i> PayPal unavailable</p>';
    return;
  }
  paypal.Buttons({
    style: { layout: 'vertical', color: 'blue', shape: 'rect', label: 'checkout' },
    onClick: (data, actions) => validateEmailField() ? actions.resolve() : actions.reject(),
    createOrder: (data, actions) => {
      const scope = document.getElementById('order-country').value;
      const total = (currentPackage.basePrice * orderQuantity).toFixed(2);
      return actions.order.create({
        purchase_units: [{ amount: { currency_code: 'USD', value: total }, description: `SYSBOOST - ${scope} x${orderQuantity}` }]
      });
    },
    onApprove: (data, actions) => actions.order.capture().then(function(details) { saveLocalOrder(details); closeModal(); }),
    onError: (err) => console.error('PayPal error:', err)
  }).render('#paypal-button-container');
}

function triggerTestCheckout() {
  const emailInput = document.getElementById('order-email');
  if (emailInput && !emailInput.value.trim()) {
    emailInput.value = 'sandbox@test.dev';
    const errorSpan = document.getElementById('email-error');
    if (errorSpan) errorSpan.style.display = 'none';
  }
  if (!validateEmailField()) return;
  const mockDetails = { id: 'TEST-SYS-' + Math.random().toString(36).substr(2, 8).toUpperCase(), isTest: true };
  saveLocalOrder(mockDetails);
  closeModal();
}

function saveLocalOrder(details) {
  const email = document.getElementById('order-email').value.trim();
  const scope = document.getElementById('order-country').value;
  const qty = orderQuantity;
  const total = currentPackage.basePrice * qty;
  const orderData = {
    date: new Date().toLocaleDateString(currentLang === 'ko' ? 'ko-KR' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
    transactionId: details.id,
    email,
    product: 'SYSBOOST - Business Systems',
    tier: currentLang === 'ko' ? 'SYSBOOST 패키지' : 'SYSBOOST Package',
    scope,
    module: document.getElementById('order-module').value,
    qty,
    total: formatPrice(total),
    status: 'Completed'
  };
  const existing = JSON.parse(localStorage.getItem('sysboost_orders') || '[]');
  existing.unshift(orderData);
  localStorage.setItem('sysboost_orders', JSON.stringify(existing));
  renderOrders();

  const lang = currentLang;
  const receiptText = `
=============================================
${translations[lang]['receipt-header']}
=============================================
${translations[lang]['receipt-date']}: ${orderData.date}
${translations[lang]['receipt-txid']}: ${orderData.transactionId}
${translations[lang]['receipt-email']}: ${email}
${translations[lang]['receipt-type']}: ${orderData.product}
${translations[lang]['receipt-size']}: ${orderData.tier}
${translations[lang]['receipt-country']}: ${orderData.scope}
${translations[lang]['receipt-module']}: ${orderData.module}
${translations[lang]['receipt-qty']}: ${orderData.qty}
${translations[lang]['receipt-baseprice']}: ${formatPrice(currentPackage.basePrice)}
${translations[lang]['receipt-total']}: ${orderData.total}
${translations[lang]['receipt-status']}: ${orderData.status}
${translations[lang]['receipt-method']}: ${translations[lang]['receipt-method-val']}
=============================================
`;
  const payload = encodeURIComponent(receiptText);
  const redirectUrl = `https://docs.google.com/forms/d/e/1FAIpQLScMPqbEWWttS5mb1m_krsO_kco24ImpgvYVSbc7zO0nEVmYFw/viewform?entry.1059822061=${payload}`;
  window.location.href = redirectUrl;
}

function renderOrders() {
  const tbody = document.getElementById('orders-tbody');
  const msg = document.getElementById('no-orders-msg');
  if (!tbody) return;
  const orders = JSON.parse(localStorage.getItem('sysboost_orders') || '[]');
  tbody.innerHTML = '';
  if (orders.length === 0) {
    msg.style.display = 'flex';
    return;
  }
  msg.style.display = 'none';
  orders.forEach(o => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${o.date}</td><td class="tx-id">${o.transactionId}</td><td>${o.product}</td><td>${o.tier}</td><td>${o.scope}</td><td>${o.module}</td><td>${o.qty}</td><td style="font-weight:700;color:var(--primary)">${o.total}</td><td><span class="badge-status badge-completed">${o.status}</span></td>`;
    tbody.appendChild(tr);
  });
}

function toggleMobileMenu() {
  const drawer = document.getElementById('mobile-drawer');
  drawer.classList.toggle('active');
}

function navigate(viewId) {
  currentView = viewId;
  document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
  const section = document.getElementById(`${viewId}-view`);
  if (section) section.classList.add('active');
  document.querySelectorAll('.nav-links a').forEach(link => link.classList.remove('active'));
  const navLink = document.getElementById(`nav-${viewId}`);
  if (navLink) navLink.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', () => {
  applyTranslations();
  renderPackages();
  renderOrders();
});

// Expose variables globally to prevent ReferenceErrors in inline HTML scripts/handlers
if (typeof navigate !== 'undefined') { window.navigate = navigate; }
if (typeof currentLang !== 'undefined') { window.currentLang = currentLang; }
