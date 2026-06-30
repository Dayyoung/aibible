// GROWTHCONSULT app state
const STORAGE_KEY = 'growthconsult_orders';
const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScMPqbEWWttS5mb1m_krsO_kco24ImpgvYVSbc7zO0nEVmYFw/viewform?entry.1059822061=';
const BASE_PATH = window.location.pathname.includes('/kr/') ? '/growthconsult/kr/' : '/growthconsult/';
const isKrPage = window.location.pathname.includes('/kr/');
if (isKrPage && localStorage.getItem('bibleforai_lang') !== 'ko') {
  localStorage.setItem('bibleforai_lang', 'ko');
}
let currentLang = localStorage.getItem('bibleforai_lang') || (isKrPage ? 'ko' : 'en');
let currentPackage = null;
let orderQuantity = 1;

const packageCatalog = {
  basic: {
    title_en: 'Growth Audit Session',
    title_ko: '성장 진단 세션',
    packages: [
      {
        id: 'standard',
        name_en: 'Standard',
        name_ko: '스탠다드',
        desc_en: 'A 30-minute consulting call to clarify your growth goals, channel mix, and next steps.',
        desc_ko: '성장 목표, 채널 구성, 다음 액션을 정리하는 30분 컨설팅입니다.',
        price: 100,
        featured: false,
        features_en: ['30-minute video call', 'Action checklist', '1 follow-up note', 'Fast turnaround'],
        features_ko: ['30분 화상 상담', '실행 체크리스트', '후속 요약 노트 1회', '빠른 진행']
      }
    ]
  },
  pro: {
    title_en: 'Strategy Workshop',
    title_ko: '전략 워크숍',
    packages: [
      {
        id: 'deep-dive',
        name_en: 'Deep Dive',
        name_ko: '딥다이브',
        desc_en: 'A 60-minute workshop to map channels, funnel gaps, and priority experiments.',
        desc_ko: '채널, 퍼널 갭, 우선 실험안을 정리하는 60분 워크숍입니다.',
        price: 200,
        featured: true,
        features_en: ['60-minute workshop', 'Channel map', 'Priority experiments', 'Written summary'],
        features_ko: ['60분 워크숍', '채널 맵 작성', '우선 실험안 정리', '서면 요약 제공']
      }
    ]
  },
  enterprise: {
    title_en: 'Advisory Sprint',
    title_ko: '어드바이저리 스프린트',
    packages: [
      {
        id: 'advisory',
        name_en: 'Advisory',
        name_ko: '어드바이저리',
        desc_en: 'A 90-minute executive session for teams that want a detailed roadmap and decision support.',
        desc_ko: '상세 로드맵과 의사결정 지원이 필요한 팀을 위한 90분 임원 세션입니다.',
        price: 300,
        featured: false,
        features_en: ['90-minute session', 'Roadmap draft', 'Decision support', 'Priority Q&A'],
        features_ko: ['90분 세션', '로드맵 초안', '의사결정 지원', '우선 질의응답']
      }
    ]
  }
};

const translations = {
  en: {
    'logo-subtitle': 'GROWTHCONSULT',
    'nav-home': 'Home',
    'nav-basic': 'Audit',
    'nav-pro': 'Workshop',
    'nav-enterprise': 'Advisory',
    'btn-orders': 'My Orders',
    'hero-badge': 'Integrated Marketing Consulting',
    'hero-title': 'GROWTHCONSULT — Integrated Marketing Consulting',
    'hero-desc': 'Turn your business challenge into a practical growth plan with brand, performance, content, and data guidance.',
    'btn-explore': 'View Packages',
    'btn-how': 'How It Works',
    'stat-1': 'Sessions',
    'stat-2': 'Strategy Clarity',
    'stat-3': 'Channel Plan',
    'stat-4': 'Fast Delivery',
    'sec-packages-title': 'Choose Your Consulting Session',
    'sec-packages-subtitle': 'Select a session, click the price to open the payment checkout flow, and review the receipt on Google Form.',
    'card-basic-title': 'Growth Audit Session',
    'card-basic-desc': 'A 30-minute consulting call to clarify your growth goals, channel mix, and next steps.',
    'card-pro-title': 'Strategy Workshop',
    'card-pro-desc': 'A 60-minute workshop to map channels, funnel gaps, and priority experiments.',
    'card-enterprise-title': 'Advisory Sprint',
    'card-enterprise-desc': 'A 90-minute executive session for teams that want a detailed roadmap and decision support.',
    'card-view-pricing': 'Book Session',
    'how-title': 'How GROWTHCONSULT Works',
    'how-desc': 'We keep the flow simple: choose a session, review the plan, pay securely, and complete the receipt form.',
    'how-step1-bold': '1. Brief:',
    'how-step1-text': 'Share your goals, audience, website, and the channel you want to improve.',
    'how-step2-bold': '2. Session:',
    'how-step2-text': 'We review your situation and prepare an actionable growth direction.',
    'how-step3-bold': '3. Checkout:',
    'how-step3-text': 'Click the total price in the modal to trigger the secure checkout payment checkout flow.',
    'how-step4-bold': '4. Receipt:',
    'how-step4-text': 'You are redirected to Google Form with encoded receipt details.',
    'faq-title': 'Frequently Asked Questions',
    'faq-subtitle': 'A few quick answers about pricing, delivery, and checkout.',
    'faq-q1': 'Who should book this consulting service?',
    'faq-a1': 'Founders, agencies, e-commerce brands, SaaS teams, and any company preparing for growth.',
    'faq-q2': 'What does the price-click payment checkout do?',
    'faq-a2': 'Clicking the total price saves a secure checkout order locally and redirects to the Google Form receipt flow.',
    'faq-q3': 'What topics can we discuss?',
    'faq-a3': 'Brand positioning, paid media, SEO, content, analytics, funnel planning, and launch strategy.',
    'faq-q4': 'Can I use this for international expansion?',
    'faq-a4': 'Yes. The workshop is designed for globally usable business planning and market entry decisions.',
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
    'modal-title': 'Configure Your Consulting Session',
    'modal-desc': 'Fill in the details, then click the total price for the payment checkout test.',
    'modal-base-pkg': 'Package',
    'modal-base-price-label': 'Base Price',
    'modal-email-label': 'Email Address *',
    'modal-email-placeholder': 'name@example.com',
    'modal-email-error': 'Please enter a valid email address.',
    'modal-keywords-label': 'Growth Goal / Angle',
    'modal-keywords-placeholder': 'e.g. B2B leads, launch plan, SEO growth',
    'modal-site-label': 'Website URL',
    'modal-site-placeholder': 'https://example.com',
    'modal-qty': 'Quantity',
    'modal-total-amt': 'Total Amount',
    'badge-ssl': 'SSL Secured',
    'badge-paypal': 'PayPal Verified',
    'footer-link': 'GROWTHCONSULT Home'
  },
  ko: {
    'logo-subtitle': 'GROWTHCONSULT',
    'nav-home': '홈',
    'nav-basic': '진단',
    'nav-pro': '워크숍',
    'nav-enterprise': '자문',
    'btn-orders': '주문 내역',
    'hero-badge': '통합 마케팅 컨설팅',
    'hero-title': 'GROWTHCONSULT — 통합 마케팅 컨설팅',
    'hero-desc': '브랜드, 퍼포먼스, 콘텐츠, 데이터 관점에서 실용적인 성장 계획을 만듭니다.',
    'btn-explore': '패키지 보기',
    'btn-how': '진행 방식',
    'stat-1': '세션',
    'stat-2': '전략 명확화',
    'stat-3': '채널 계획',
    'stat-4': '빠른 진행',
    'sec-packages-title': '컨설팅 세션을 선택하세요',
    'sec-packages-subtitle': '세션을 선택하고, 가격 텍스트를 클릭하면 보안 결제 흐름이 열립니다. 이후 Google Form 영수증으로 이동합니다.',
    'card-basic-title': '성장 진단 세션',
    'card-basic-desc': '성장 목표, 채널 구성, 다음 액션을 정리하는 30분 컨설팅입니다.',
    'card-pro-title': '전략 워크숍',
    'card-pro-desc': '채널, 퍼널 갭, 우선 실험안을 정리하는 60분 워크숍입니다.',
    'card-enterprise-title': '어드바이저리 스프린트',
    'card-enterprise-desc': '상세 로드맵과 의사결정 지원이 필요한 팀을 위한 90분 임원 세션입니다.',
    'card-view-pricing': '세션 예약',
    'how-title': 'GROWTHCONSULT 진행 방식',
    'how-desc': '세션 선택 → 상황 검토 → 안전 결제 → 영수증 폼 작성의 간단한 흐름으로 진행됩니다.',
    'how-step1-bold': '1. 브리프:',
    'how-step1-text': '목표, 타깃, 웹사이트, 개선하고 싶은 채널을 전달하세요.',
    'how-step2-bold': '2. 세션:',
    'how-step2-text': '현재 상황을 검토하고 실행 가능한 성장 방향을 정리합니다.',
    'how-step3-bold': '3. 결제:',
    'how-step3-text': '모달의 총액 텍스트를 클릭하면 결제 진행이 실행됩니다.',
    'how-step4-bold': '4. 영수증:',
    'how-step4-text': '암호화된 영수증 정보와 함께 Google Form으로 이동합니다.',
    'faq-title': '자주 묻는 질문',
    'faq-subtitle': '가격, 작업, 결제 흐름에 대한 간단한 안내입니다.',
    'faq-q1': '누가 이 컨설팅 서비스를 예약하면 좋나요?',
    'faq-a1': '창업자, 에이전시, 이커머스 브랜드, SaaS 팀, 그리고 성장을 준비하는 모든 기업에 적합합니다.',
    'faq-q2': '가격 텍스트 클릭 결제 진행은 무엇인가요?',
    'faq-a2': '총액을 클릭하면 주문 기록이 로컬에 저장되고 Google Form 영수증 흐름으로 이동합니다.',
    'faq-q3': '어떤 주제를 논의할 수 있나요?',
    'faq-a3': '브랜드 포지셔닝, 퍼포먼스 광고, SEO, 콘텐츠, 분석, 퍼널 계획, 런칭 전략 등을 다룹니다.',
    'faq-q4': '해외 확장에도 사용할 수 있나요?',
    'faq-a4': '네. 워크숍은 글로벌 비즈니스 계획과 시장 진입 의사결정에 맞게 설계되었습니다.',
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
    'modal-title': '컨설팅 세션 설정',
    'modal-desc': '세부 정보를 입력한 뒤 총액 텍스트를 클릭하면 결제 완료 테스트가 진행됩니다.',
    'modal-base-pkg': '패키지',
    'modal-base-price-label': '기본 가격',
    'modal-email-label': '이메일 주소 *',
    'modal-email-placeholder': 'name@example.com',
    'modal-email-error': '유효한 이메일 주소를 입력해주세요.',
    'modal-keywords-label': '성장 목표 / 방향',
    'modal-keywords-placeholder': '예: B2B 리드, 런칭 계획, SEO 성장',
    'modal-site-label': '웹사이트 URL',
    'modal-site-placeholder': 'https://example.com',
    'modal-qty': '수량',
    'modal-total-amt': '총액',
    'badge-ssl': 'SSL 보안',
    'badge-paypal': 'PayPal 인증',
    'footer-link': 'GROWTHCONSULT 홈'
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
    window.location.href = '/growthconsult/kr/';
  } else if (lang === 'en' && isKrPage) {
    window.location.href = '/growthconsult/';
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
  const footerLink = document.getElementById('footer-growthconsult-link');
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
            <span class="price-note">${currentLang === 'ko' ? '클릭하여 결제 완료' : 'Click for payment checkout'}</span>
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
  const angle = document.getElementById('order-market')?.value.trim() || '-';
  const website = document.getElementById('order-website')?.value.trim() || '-';
  const txId = `GC-${Math.random().toString(36).slice(2, 10).toUpperCase()}`;
  const totalPaid = currentPackage ? currentPackage.basePrice * orderQuantity : 0;
  const productName = currentPackage ? `${currentPackage.categoryKey.toUpperCase()}-${currentPackage.packageId.toUpperCase()}` : 'GROWTHCONSULT';

  const orderData = {
    date: new Date().toISOString().slice(0, 10),
    id: txId,
    product: `GROWTHCONSULT - ${productName}`,
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
    '          GROWTHCONSULT RECEIPT',
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
          product: `GROWTHCONSULT - ${currentPackage.packageId.toUpperCase()}`,
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
          '          GROWTHCONSULT RECEIPT',
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
