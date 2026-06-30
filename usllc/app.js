// USLLC app state
const STORAGE_KEY = 'usllc_orders';
const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScMPqbEWWttS5mb1m_krsO_kco24ImpgvYVSbc7zO0nEVmYFw/viewform?entry.1059822061=';
const BASE_PATH = window.location.pathname.includes('/kr/') ? '/usllc/kr/' : '/usllc/';
const isKrPage = window.location.pathname.includes('/kr/');
let currentLang = isKrPage ? 'ko' : 'en';
let currentPackage = null;
let orderQuantity = 1;

const packageCatalog = {
  basic: {
    title_en: 'LLC Strategy Call',
    title_ko: 'LLC 전략 상담',
    packages: [
      {
        id: 'starter',
        name_en: 'Starter',
        name_ko: '스타터',
        desc_en: 'Choose the best state, confirm your entity type, and get a filing roadmap before you pay any state fees.',
        desc_ko: '가장 적합한 주를 고르고, 법인 유형을 정한 뒤, 설립 로드맵을 먼저 정리합니다.',
        price: 70,
        featured: false,
        features_en: ['State recommendation', 'Entity-type guidance', 'Filing checklist', '1 quick revision'],
        features_ko: ['주 추천', '법인 유형 가이드', '설립 체크리스트', '빠른 수정 1회']
      }
    ]
  },
  pro: {
    title_en: 'LLC Formation',
    title_ko: 'LLC 설립',
    packages: [
      {
        id: 'formation',
        name_en: 'Formation',
        name_ko: '포메이션',
        desc_en: 'We prepare the LLC filing workflow, operating agreement, and EIN roadmap for a U.S. company.',
        desc_ko: '미국 법인 설립을 위한 LLC 서류 흐름, 운영계약서, EIN 로드맵을 준비합니다.',
        price: 180,
        featured: true,
        features_en: ['LLC filing workflow', 'Operating agreement outline', 'EIN roadmap', '1 revision'],
        features_ko: ['LLC 설립 흐름', '운영계약서 초안', 'EIN 로드맵', '수정 1회']
      }
    ]
  },
  enterprise: {
    title_en: 'Banking & Compliance',
    title_ko: '은행 · 컴플라이언스',
    packages: [
      {
        id: 'banking',
        name_en: 'Banking Prep',
        name_ko: '뱅킹 준비',
        desc_en: 'LLC + EIN + bank-account prep, annual-report reminders, and a compliance checklist for founders abroad.',
        desc_ko: '해외 창업자를 위한 LLC + EIN + 은행 계좌 준비, 연례보고 알림, 컴플라이언스 체크리스트를 제공합니다.',
        price: 420,
        featured: false,
        features_en: ['LLC + EIN prep', 'Bank-account checklist', 'Annual report reminders', 'Compliance notes'],
        features_ko: ['LLC + EIN 준비', '은행계좌 체크리스트', '연례보고 알림', '컴플라이언스 노트']
      },
      {
        id: 'elite',
        name_en: 'Elite',
        name_ko: '엘리트',
        desc_en: 'Full cross-border setup with LLC/C-Corp comparison, bank-account prep, and compliance roadmap.',
        desc_ko: 'LLC/C-Corp 비교, 은행 계좌 준비, 컴플라이언스 로드맵까지 포함한 풀 패키지입니다.',
        price: 980,
        featured: false,
        features_en: ['LLC vs C-Corp comparison', 'Bank-account prep', 'Compliance roadmap', 'Founder action plan'],
        features_ko: ['LLC vs C-Corp 비교', '은행 계좌 준비', '컴플라이언스 로드맵', '창업자 실행 플랜']
      }
    ]
  }
};

const translations = {
  en: {
    'logo-subtitle': 'USLLC',
    'nav-home': 'Home',
    'nav-basic': 'Starter',
    'nav-pro': 'Formation',
    'nav-enterprise': 'Compliance',
    'btn-orders': 'My Orders',
    'hero-badge': 'U.S. Entity Formation',
    'hero-title': 'USLLC — US LLC & EIN Setup',
    'hero-desc': 'Form a U.S. company with state selection, EIN guidance, banking prep, and compliance support.',
    'btn-explore': 'View Plans',
    'btn-how': 'How It Works',
    'stat-1': 'Plans',
    'stat-2': 'States',
    'stat-3': 'EIN Ready',
    'stat-4': 'Fast Setup',
    'sec-packages-title': 'Choose Your U.S. Setup Plan',
    'sec-packages-subtitle': 'Select a plan, click the price to open the sandbox checkout flow, and review the receipt on Google Form.',
    'card-basic-title': 'LLC Strategy Call',
    'card-basic-desc': 'Choose the best state, confirm your entity type, and get a filing roadmap before any fees are paid.',
    'card-pro-title': 'LLC Formation',
    'card-pro-desc': 'We prepare the LLC filing workflow, operating agreement outline, and EIN roadmap for a U.S. company.',
    'card-enterprise-title': 'Banking & Compliance',
    'card-enterprise-desc': 'Bank-account prep, annual-report reminders, and a cross-border compliance roadmap.',
    'card-view-pricing': 'View Pricing',
    'how-title': 'How USLLC Works',
    'how-desc': 'We keep the flow simple: choose a plan, review the setup details, pay securely, and complete the receipt form.',
    'how-step1-bold': '1. Brief:',
    'how-step1-text': 'Share your target state, entity type, and website.',
    'how-step2-bold': '2. Plan:',
    'how-step2-text': 'We map out the LLC filing, EIN, and banking steps.',
    'how-step3-bold': '3. Checkout:',
    'how-step3-text': 'Click the total price in the modal to trigger the sandbox test checkout flow.',
    'how-step4-bold': '4. Receipt:',
    'how-step4-text': 'You are redirected to Google Form with encoded receipt details.',
    'faq-title': 'Frequently Asked Questions',
    'faq-subtitle': 'A few quick answers about pricing, setup, and checkout.',
    'faq-q1': 'Can non-U.S. founders use this service?',
    'faq-a1': 'Yes. The starter packages are built for founders outside the U.S. who need an LLC setup roadmap.',
    'faq-q2': 'Which states can you work with?',
    'faq-a2': 'We can guide you through popular states like Delaware, Wyoming, and New Mexico.',
    'faq-q3': 'Can you help with EIN and banking prep?',
    'faq-a3': 'Yes. The premium tiers include EIN guidance and bank-account preparation.',
    'faq-q4': 'Who is this service for?',
    'faq-a4': 'Founders, e-commerce sellers, SaaS teams, digital nomads, and cross-border businesses.',
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
    'modal-title': 'Configure Your U.S. Setup Order',
    'modal-desc': 'Fill in the details, then click the total price for the sandbox checkout test.',
    'modal-base-pkg': 'Plan',
    'modal-base-price-label': 'Base Price',
    'modal-email-label': 'Email Address *',
    'modal-email-placeholder': 'name@example.com',
    'modal-email-error': 'Please enter a valid email address.',
    'modal-keywords-label': 'Target State / Entity Type',
    'modal-keywords-placeholder': 'e.g. Delaware LLC, Wyoming C-Corp',
    'modal-site-label': 'Website URL',
    'modal-site-placeholder': 'https://example.com',
    'modal-qty': 'Quantity',
    'modal-total-amt': 'Total Amount',
    'badge-ssl': 'SSL Secured',
    'badge-paypal': 'PayPal Verified',
    'footer-link': 'USLLC Home'
  },
  ko: {
    'logo-subtitle': 'USLLC',
    'nav-home': '홈',
    'nav-basic': '스타터',
    'nav-pro': '설립',
    'nav-enterprise': '컴플라이언스',
    'btn-orders': '주문 내역',
    'hero-badge': '미국 법인 설립',
    'hero-title': 'USLLC — 미국 LLC & EIN 설립',
    'hero-desc': '주 선택, EIN 가이드, 은행 계좌 준비, 컴플라이언스 지원까지 한 번에 정리합니다.',
    'btn-explore': '플랜 보기',
    'btn-how': '진행 방식',
    'stat-1': '플랜',
    'stat-2': '주',
    'stat-3': 'EIN 준비',
    'stat-4': '빠른 세팅',
    'sec-packages-title': '미국 설립 플랜을 선택하세요',
    'sec-packages-subtitle': '플랜을 고르고, 가격 텍스트를 클릭하면 샌드박스 결제 흐름이 열립니다. 이후 Google Form 영수증으로 이동합니다.',
    'card-basic-title': 'LLC 전략 상담',
    'card-basic-desc': '가장 적합한 주와 법인 유형을 정하고, 수수료 지불 전 설립 로드맵을 정리합니다.',
    'card-pro-title': 'LLC 설립',
    'card-pro-desc': '미국 법인 설립을 위한 LLC 서류 흐름, 운영계약서 초안, EIN 로드맵을 준비합니다.',
    'card-enterprise-title': '은행 · 컴플라이언스',
    'card-enterprise-desc': '은행 계좌 준비, 연례보고 알림, 국경 간 컴플라이언스 로드맵을 제공합니다.',
    'card-view-pricing': '가격 보기',
    'how-title': 'USLLC 진행 방식',
    'how-desc': '플랜 선택 → 세팅 내용 확인 → 안전 결제 → 영수증 폼 작성의 간단한 흐름으로 진행됩니다.',
    'how-step1-bold': '1. 브리프:',
    'how-step1-text': '희망 주, 법인 유형, 웹사이트 정보를 전달하세요.',
    'how-step2-bold': '2. 플랜:',
    'how-step2-text': 'LLC 설립, EIN, 은행 절차를 정리합니다.',
    'how-step3-bold': '3. 결제:',
    'how-step3-text': '모달의 총액 텍스트를 클릭하면 샌드박스 테스트 체크아웃이 실행됩니다.',
    'how-step4-bold': '4. 영수증:',
    'how-step4-text': '암호화된 영수증 정보와 함께 Google Form으로 이동합니다.',
    'faq-title': '자주 묻는 질문',
    'faq-subtitle': '가격, 세팅, 결제 흐름에 대한 간단한 안내입니다.',
    'faq-q1': '비미국 창업자도 이용할 수 있나요?',
    'faq-a1': '네. 스타터 패키지는 미국 외 지역 창업자가 LLC 설립 로드맵이 필요할 때 맞게 구성했습니다.',
    'faq-q2': '어떤 주를 도와주시나요?',
    'faq-a2': '델라웨어, 와이오밍, 뉴멕시코 같은 인기 주를 중심으로 안내해 드립니다.',
    'faq-q3': 'EIN과 은행 준비도 도와주나요?',
    'faq-a3': '네. 상위 티어에는 EIN 가이드와 은행 계좌 준비가 포함됩니다.',
    'faq-q4': '이 서비스는 누구에게 적합한가요?',
    'faq-a4': '창업자, 이커머스 셀러, SaaS 팀, 디지털 노마드, 크로스보더 사업자에게 적합합니다.',
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
    'modal-title': '미국 설립 주문 설정',
    'modal-desc': '세부 정보를 입력한 뒤 총액 텍스트를 클릭하면 샌드박스 체크아웃 테스트가 진행됩니다.',
    'modal-base-pkg': '플랜',
    'modal-base-price-label': '기본 가격',
    'modal-email-label': '이메일 주소 *',
    'modal-email-placeholder': 'name@example.com',
    'modal-email-error': '유효한 이메일 주소를 입력해주세요.',
    'modal-keywords-label': '희망 주 / 법인 유형',
    'modal-keywords-placeholder': '예: Delaware LLC, Wyoming C-Corp',
    'modal-site-label': '웹사이트 URL',
    'modal-site-placeholder': 'https://example.com',
    'modal-qty': '수량',
    'modal-total-amt': '총액',
    'badge-ssl': 'SSL 보안',
    'badge-paypal': 'PayPal 인증',
    'footer-link': 'USLLC 홈'
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
    window.location.href = '/usllc/kr/';
  } else if (lang === 'en' && isKrPage) {
    window.location.href = '/usllc/';
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
  const footerLink = document.getElementById('footer-prboost-link');
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
    case 'pro': return 'fa-solid fa-file-signature';
    case 'enterprise': return 'fa-solid fa-building-columns';
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
  const txId = `USL-${Math.random().toString(36).slice(2, 10).toUpperCase()}`;
  const totalPaid = currentPackage ? currentPackage.basePrice * orderQuantity : 0;
  const productName = currentPackage ? `${currentPackage.categoryKey.toUpperCase()}-${currentPackage.packageId.toUpperCase()}` : 'USLLC';

  const orderData = {
    date: new Date().toISOString().slice(0, 10),
    id: txId,
    product: `USLLC - ${productName}`,
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
    '          USLLC RECEIPT',
    '===================================',
    `Order Date     : ${orderData.date}`,
    `Transaction ID : ${orderData.id}`,
    `Customer Email : ${orderData.email}`,
    `Product Name   : ${orderData.product}`,
    `Package Tier   : ${orderData.tier}`,
    `Target State / Entity Type : ${angle}`,
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
          product: `USLLC - ${currentPackage.packageId.toUpperCase()}`,
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
          '          USLLC RECEIPT',
          '===================================',
          `Order Date     : ${orderData.date}`,
          `Transaction ID : ${orderData.id}`,
          `Customer Email : ${orderData.email}`,
          `Product Name   : ${orderData.product}`,
          `Package Tier   : ${orderData.tier}`,
          `Target State / Entity Type : ${angle}`,
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
});

window.navigate = navigate;
window.toggleMobileMenu = toggleMobileMenu;
window.changeLanguage = changeLanguage;
window.openPurchaseModal = openPurchaseModal;
window.closeModal = closeModal;
window.updateModalPrice = updateModalPrice;
window.handlePurchaseSubmit = handlePurchaseSubmit;
window.triggerTestCheckout = triggerTestCheckout;
