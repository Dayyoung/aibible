// App State
let currentView = 'home';
let currentPackage = null;
let orderQuantity = 1;
let paypalButtonInstance = null;

// Talent Role Packages
const rolePackages = [
  { id: 'hr-trial', name_en: 'Starter Sprint (1 role)', name_ko: '스타터 스프린트 (1 포지션)', desc_en: 'Single-role hiring with onboarding docs, offer letter, and compliance checklist.', desc_ko: '온보딩 문서, 오퍼 레터 및 규정 체크리스트를 포함한 단일 포지션 채용 패키지.', price: 149, featured: false, features_en: ['Job Description + JD Localization', 'Offer Letter + Contract Draft', 'Background Check Consent Flow', 'Country Compliance Checklist'], features_ko: ['JD 현지화 및 초안 작성', '오퍼 레터 및 계약서 초안', '배경 확인 동의 플로우', '국가별 규정 준수 체크리스트'] },
  { id: 'hr-team', name_en: 'Team Expansion (3 roles)', name_ko: '팀 확장 패키지 (3 포지션)', desc_en: 'Parallel hiring for 3 roles with shared employer-of-record intake, payroll, and benefits setup.', desc_ko: '동일 EOR 기반 3개 포지션 동시 채용 및 급여/복리후생 연동 세팅.', price: 399, featured: false, features_en: ['EOR Intake + Worker Classification', 'Multicountry Payroll Profile Setup', 'Benefits Enrollment Workflow', 'Dedicated Hiring Coordinator'], features_ko: ['EOR 온보딩 및 고용 분류', '다국가 급여 프로필 구성', '복리후생 등록 워크플로우', '전담 채용 코디네이터'] },
  { id: 'hr-growth', name_en: 'Growth Pod (10 roles)', name_ko: '그로스 포드 (10 포지션)', desc_en: 'Scale headcount with weekly hiring reviews, Sourcing plan, and repeated interview coordination.', desc_ko: '주간 채용 리뷰, 소싱 플랜, 인터뷰 운영을 통한 조직 스케일 패키지.', price: 899, featured: true, features_en: ['Dedicated Sourcer + Screening', 'Interview Scheduling + ATS Sync', 'Background Check + Digital Onboarding', 'Payroll + Compliance Reporting'], features_ko: ['전담 소서스 + 스크리닝', '인터뷰 스케줄 및 ATS 연동', '배경 확인 및 디지털 온보딩', '급여 운영 + 규정 보고'] },
  { id: 'hr-enterprise', name_en: 'Enterprise Workforce (50 roles)', name_ko: '엔터프라이즈 워크포스 (50 포지션)', desc_en: 'High-volume hiring with custom employer policy, benefits catalog, and global payroll coverage.', desc_ko: '맞춤 고용 정책, 글로벌 급여 커버리지로 대규모 인력 충원을 지원합니다.', price: 2499, featured: false, features_en: ['Custom Employer Policy Pack', 'Global Benefits Catalog Admin', 'Weekly Harvest Reporting', 'Dedicated Workforce Lead'], features_ko: ['맞춤 고용 정책 패키지', '글로벌 복리후생 카탈로그 관리', '주간 채용 정밀 리포트', '전담 워크포스 리드'] },
  { id: 'hr-global', name_en: 'Global Workforce Unlimited', name_ko: '글로벌 워크포스 무제한 플랜', desc_en: 'Unlimited hiring across unlimited countries with concierge ops and custom API integrations.', desc_ko: '무제한 채용, 컨시어지 운영, 커스텀 API로 글로벌 인력 전반을 관리합니다.', price: 4999, featured: false, features_en: ['Unlimited Country Coverage', 'Concierge Ops Desk (24/7)', 'Custom API + HRIS Integrations', 'Quarterly Compliance Audits'], features_ko: ['무제한 국가 커버리지', '24/7 컨시어지 운영 데스크', '커스텀 API + HRIS 연동', '분기별 규정 감사 제공'] },
];

// Translation Dictionary
const translations = {
  en: {
    "logo-subtitle": "HRBOOST",
    "nav-home": "Home",
    "nav-packages": "Talent & Roles",
    "btn-orders": "My Orders",
    "hero-badge": "Global Workforce Orchestration",
    "hero-title": "HRBOOST — Global Hiring & Compliance",
    "hero-desc": "Hire faster across borders with compliant onboarding, background checks, payroll, and benefits management in one workflow.",
    "btn-explore": "Explore Talent Solutions",
    "stat-countries": "65+",
    "stat-countries-label": "Supported Countries",
    "stat-onboard": "48h",
    "stat-onboard-label": "Avg. Onboard Time",
    "stat-compliance": "100%",
    "stat-compliance-label": "Labor-Law Ready",
    "stat-retention": "NPS 82",
    "stat-retention-label": "Experience Rating",
    "sec-title": "Built for Fast, Compliant Hiring",
    "sec-subtitle": "HRBOOST unifies job slots, screening, compliance, payroll, and benefits so you can expand headcount without headcount risk.",
    "card-1-title": "Compliant Onboarding",
    "card-1-desc": "Localized offer letters, contracts, and documentation for 65+ jurisdictions with localized labor-law templates.",
    "card-2-title": "Verified Background Checks",
    "card-2-desc": "Configurable screening packages aligned with local privacy rules for GDPR, CCPA, and jurisdiction-specific consent.",
    "card-3-title": "Global Payroll Sync",
    "card-3-desc": "Multicurrency payroll, statutory deductions, and benefits enrollment synchronized in a single operating workflow.",
    "pkg-title": "Talent & Role Packages",
    "pkg-subtitle": "Choose a hiring package sized to your team expansion speed and compliance requirements.",
    "view-orders-title": "My Purchase History",
    "view-orders-sub": "Review your successful orders. Your data is stored locally in your browser workspace.",
    "th-date": "Order Date",
    "th-order-id": "Transaction ID",
    "th-product": "Product",
    "th-tier": "Role Type",
    "th-country": "Target Country",
    "th-qty": "Quantity",
    "th-total": "Total Paid",
    "th-status": "Status",
    "no-orders-msg": "No purchase records found. Start a new hiring batch to see history here!",
    "modal-title": "Configure Order",
    "modal-desc": "Configure quantity and complete secure PayPal payment.",
    "modal-base-pkg": "Base Package:",
    "modal-base-price-label": "Base Price:",
    "modal-email-label": "Work Email *",
    "modal-email-placeholder": "name@company.com",
    "modal-email-error": "Please enter a valid email address.",
    "modal-country-label": "Target Country/Region",
    "modal-qty": "Quantity:",
    "modal-total-amt": "Total Amount:",
    "modal-test-btn": "Click price to test checkout",
    "badge-ssl": "SSL Secured Checkout",
    "badge-paypal": "PayPal Verified",
    "foot-talent": "Talent Operations",
    "foot-legal": "Legal & Compliance",
    "foot-gdpr": "GDPR & Labor-Law Ready",
    "foot-contact": "Contact support: snsherocom@gmail.com",
    "foot-copy": "© 2026 BibleForAI HRBOOST. All rights reserved.",
    "order-button": "Order Hiring Package",
    "featured-badge": "Best Value",
    "receipt-header": "BIBLEFORAI - HRBOOST RECEIPT",
    "receipt-date": "Order Date",
    "receipt-txid": "Transaction ID",
    "receipt-email": "Client Email",
    "receipt-type": "Product Type",
    "receipt-size": "Package Size",
    "receipt-country": "Target Country",
    "receipt-qty": "Quantity",
    "receipt-baseprice": "Base Price",
    "receipt-total": "Total Paid",
    "receipt-status": "Status",
    "receipt-method": "Payment Method",
    "receipt-method-val": "PayPal Secure Checkout"
  },
  ko: {
    "logo-subtitle": "HRBOOST",
    "nav-home": "홈",
    "nav-packages": "인력 & 포지션",
    "btn-orders": "내 주문 내역",
    "hero-badge": "글로벌 인력 운영 자동화",
    "hero-title": "HRBOOST — 글로벌 채용 & 규정 준수",
    "hero-desc": "온보딩, 배경 확인, 급여 운영, 복리후생까지 한 워크플로우로 글로벌 채용을 빠르게 진행하세요.",
    "btn-explore": "인재 솔루션 둘러보기",
    "stat-countries": "65+",
    "stat-countries-label": "지원 국가",
    "stat-onboard": "48h",
    "stat-onboard-label": "평균 온보딩 시간",
    "stat-compliance": "100%",
    "stat-compliance-label": "노동법 준수",
    "stat-retention": "NPS 82",
    "stat-retention-label": "사용자 만족도",
    "sec-title": "빠르고 안전한 채용을 위한 플랫폼",
    "sec-subtitle": "HRBOOST는 채용, 스크리닝, 규정 준수, 급여, 복리후생을 하나로 통합해 헤드카운트 리스크 없이 확장할 수 있습니다.",
    "card-1-title": "규정 준수 온보딩",
    "card-1-desc": "65+ 지역 현지화된 제안서와 근로 계약, 노동법 템플릿으로 규정을 준수하는 온보딩을 제공합니다.",
    "card-2-title": "검증된 배경 확인",
    "card-2-desc": "GDPR, CCPA 및 지역별 동의 요건을 반영한 설정형 스크리닝 패키지를 운영합니다.",
    "card-3-title": "글로벌 급여 자동화",
    "card-3-desc": "다중 통화 급여, 법정 공제, 복리후생 등록을 하나의 워크플로우에서 동기화합니다.",
    "pkg-title": "인력 & 포지션 패키지",
    "pkg-subtitle": "팀 확장 속도와 규정 요건에 맞는 채용 패키지를 선택하세요.",
    "view-orders-title": "내 구매 히스토리",
    "view-orders-sub": "성공한 주문 내역을 검토하세요. 결제 데이터는 브라우저 로컬저장소에 안전하게 보관됩니다.",
    "th-date": "주문 날짜",
    "th-order-id": "거래 ID",
    "th-product": "상품 종류",
    "th-tier": "포지션 유형",
    "th-country": "대상 국가",
    "th-qty": "수량",
    "th-total": "결제 총액",
    "th-status": "진행 상태",
    "no-orders-msg": "구매 기록이 없습니다. 첫 채용 패키지를 시작하면 내역이 여기에 표시됩니다!",
    "modal-title": "주문 설정 및 결제",
    "modal-desc": "수량을 선택하고 안전한 PayPal 결제를 진행하세요.",
    "modal-base-pkg": "선택 패키지:",
    "modal-base-price-label": "기본 단가:",
    "modal-email-label": "업무 이메일 *",
    "modal-email-placeholder": "name@company.com",
    "modal-email-error": "올바른 이메일 주소를 입력해 주십시오.",
    "modal-country-label": "대상 국가/지역",
    "modal-qty": "주문 수량:",
    "modal-total-amt": "총 결제금액:",
    "modal-test-btn": "가격 텍스트를 눌러 테스트 결제",
    "badge-ssl": "SSL 보안 결제 적용",
    "badge-paypal": "PayPal 보안 인증됨",
    "foot-talent": "인력 운영",
    "foot-legal": "법률 및 규정 준수",
    "foot-gdpr": "GDPR & 노동법 준수",
    "foot-contact": "문의 지원: snsherocom@gmail.com",
    "foot-copy": "© 2026 BibleForAI HRBOOST. All rights reserved.",
    "order-button": "채용 패키지 주문하기",
    "featured-badge": "베스트 밸류",
    "receipt-header": "BIBLEFORAI - HRBOOST 결제 영수증",
    "receipt-date": "주문 날짜",
    "receipt-txid": "거래 ID",
    "receipt-email": "고객 이메일",
    "receipt-type": "상품 종류",
    "receipt-size": "패키지 크기",
    "receipt-country": "대상 국가",
    "receipt-qty": "수량",
    "receipt-baseprice": "기본 가격",
    "receipt-total": "총 결제금액",
    "receipt-status": "진행 상태",
    "receipt-method": "결제 방법",
    "receipt-method-val": "PayPal 안전 결제"
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

  const lang = currentLang;
  const isKo = lang === 'ko';

  document.documentElement.lang = lang;
  document.title = isKo ? "BibleForAI - HRBOOST | 글로벌 채용 및 규정 준수" : "BibleForAI — HRBOOST | Global Hiring & Compliance";

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.content = isKo ? "글로벌 채용, 규정 준수 온보딩, 배경 확인, 급여 운영 및 복리후생을 하나의 워크플로우로 제공합니다." : "Hire faster across borders with compliant onboarding, background checks, payroll, and benefits management in one workflow.";

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

function getRoleIcon() {
  return 'fa-solid fa-users';
}

function renderPackages() {
  const container = document.getElementById('hr-packages');
  if (!container) return;
  container.innerHTML = '';
  const lang = currentLang;
  rolePackages.forEach(pkg => {
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
      <ul class="features-list">${features.map(f => `<li><i class="${getRoleIcon()}"></i> ${f}</li>`).join('')}</ul>
      <button class="btn-buy" onclick="openPurchaseModal('${pkg.id}')" data-i18n="order-button">${translations[lang]['order-button']}</button>
    `;
    container.appendChild(card);
  });
}

// Modal and payment handling
function openPurchaseModal(packageId) {
  const pkg = rolePackages.find(p => p.id === packageId);
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
  }, 800);

  initPayPalButtons();
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
  const valid = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(val);
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
      const selectedCountry = document.getElementById('order-country').value;
      const total = (currentPackage.basePrice * orderQuantity).toFixed(2);
      return actions.order.create({
        purchase_units: [{ amount: { currency_code: 'USD', value: total }, description: `HRBOOST - ${selectedCountry} x${orderQuantity}` }]
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
  const mockDetails = { id: 'TEST-HR-' + Math.random().toString(36).substr(2, 8).toUpperCase(), isTest: true };
  saveLocalOrder(mockDetails);
  closeModal();
}

function saveLocalOrder(details) {
  const email = document.getElementById('order-email').value.trim();
  const country = document.getElementById('order-country').value;
  const qty = orderQuantity;
  const total = currentPackage.basePrice * qty;
  const orderData = {
    date: new Date().toLocaleDateString(currentLang === 'ko' ? 'ko-KR' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
    transactionId: details.id,
    email,
    product: 'HRBOOST - Global Hiring',
    tier: currentLang === 'ko' ? 'HRBOOST 패키지' : 'HRBOOST Package',
    country,
    qty,
    total: formatPrice(total),
    status: 'Completed'
  };
  const existing = JSON.parse(localStorage.getItem('hrboost_orders') || '[]');
  existing.unshift(orderData);
  localStorage.setItem('hrboost_orders', JSON.stringify(existing));
  renderOrders();

  const lang = currentLang;
  const receiptText = `\n=============================================\n${translations[lang]['receipt-header']}\n=============================================\n${translations[lang]['receipt-date']}: ${orderData.date}\n${translations[lang]['receipt-txid']}: ${orderData.transactionId}\n${translations[lang]['receipt-email']}: ${email}\n${translations[lang]['receipt-type']}: ${orderData.product}\n${translations[lang]['receipt-size']}: ${orderData.tier}\n${translations[lang]['receipt-country']}: ${orderData.country}\n${translations[lang]['receipt-qty']}: ${orderData.qty}\n${translations[lang]['receipt-baseprice']}: ${formatPrice(currentPackage.basePrice)}\n${translations[lang]['receipt-total']}: ${orderData.total}\n${translations[lang]['receipt-status']}: ${orderData.status}\n${translations[lang]['receipt-method']}: ${translations[lang]['receipt-method-val']}\n=============================================\n`;
  const payload = encodeURIComponent(receiptText);
  const redirectUrl = `https://docs.google.com/forms/d/e/1FAIpQLScMPqbEWWttS5mb1m_krsO_kco24ImpgvYVSbc7zO0nEVmYFw/viewform?entry.1059822061=${payload}`;
  window.location.href = redirectUrl;
}

function renderOrders() {
  const tbody = document.getElementById('orders-tbody');
  const msg = document.getElementById('no-orders-msg');
  if (!tbody) return;
  const orders = JSON.parse(localStorage.getItem('hrboost_orders') || '[]');
  tbody.innerHTML = '';
  if (orders.length === 0) {
    msg.style.display = 'flex';
    return;
  }
  msg.style.display = 'none';
  orders.forEach(o => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${o.date}</td><td class="tx-id">${o.transactionId}</td><td>${o.product}</td><td>${o.tier}</td><td>${o.country}</td><td>${o.qty}</td><td style="font-weight:700;color:var(--primary)">${o.total}</td><td><span class="badge-status badge-completed">${o.status}</span></td>`;
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

window.openPurchaseModal = openPurchaseModal;
window.closeModal = closeModal;
window.adjustQty = adjustQty;
window.changeLanguage = changeLanguage;
