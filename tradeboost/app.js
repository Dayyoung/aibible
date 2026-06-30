// App State
let currentView = 'home';
let currentPackage = null;
let orderQuantity = 1;
let paypalButtonInstance = null;

// Package Catalog with Localized Keys
const packageCatalog = {
    basic: {
        title_en: 'Market Entry Audit',
        title_ko: '시장 진입 진단',
        packages: [
            {
                id: 'basic-scan',
                name_en: 'Starter Audit',
                name_ko: '스타터 진단',
                desc_en: 'Market research, competitor scan, and target-country analysis for a clear overseas entry plan.',
                desc_ko: '해외 진출 방향을 잡기 위한 시장조사, 경쟁사 분석, 타겟 국가 분석 패키지입니다.',
                price: 429,
                featured: false,
                features_en: ['Market research brief', 'Competitor snapshot', 'Target market shortlist', 'PDF report delivery'],
                features_ko: ['시장 조사 브리프', '경쟁사 요약 리포트', '타겟 시장 후보 리스트', 'PDF 리포트 제공']
            }
        ]
    },
    pro: {
        title_en: 'Buyer & Supplier Sourcing',
        title_ko: '바이어·공급처 소싱',
        packages: [
            {
                id: 'pro-match',
                name_en: 'Growth Match',
                name_ko: '그로스 매칭',
                desc_en: 'Buyer sourcing, supplier discovery, and negotiation support for active import/export deals.',
                desc_ko: '수출입 거래를 위한 바이어 발굴, 공급처 탐색, 협상 지원 패키지입니다.',
                price: 999,
                featured: true,
                features_en: ['Buyer/supplier matching', 'Negotiation support', 'Trade lane review', 'Weekly progress updates'],
                features_ko: ['바이어·공급처 매칭', '협상 지원', '물류/무역 루트 검토', '주간 진행 상황 공유']
            }
        ]
    },
    enterprise: {
        title_en: 'Full Trade Desk',
        title_ko: '풀 트레이드 데스크',
        packages: [
            {
                id: 'enterprise-desk',
                name_en: 'Enterprise Desk',
                name_ko: '엔터프라이즈 데스크',
                desc_en: 'End-to-end trade operations: contracts, logistics coordination, payment guidance, and after-sales support.',
                desc_ko: '계약서, 물류 조율, 결제 가이드, 사후관리까지 포함한 전담 무역 운영 패키지입니다.',
                price: 2143,
                featured: false,
                features_en: ['Contract review', 'Logistics coordination', 'Payment workflow guidance', 'After-sales follow-up'],
                features_ko: ['계약서 검토', '물류 조율', '결제 프로세스 가이드', '사후관리 지원']
            }
        ]
    }
};

// Translation Dictionary
const translations = {
    en: {
        'logo-subtitle': 'TRADEBOOST!',
        'nav-home': 'Home',
        'nav-basic': 'Market Entry',
        'nav-pro': 'Sourcing',
        'nav-enterprise': 'Enterprise Desk',
        'btn-orders': 'My Orders',
        'hero-badge': 'Global Trade Support',
        'hero-title': 'TRADEBOOST — Global Trade Agency',
        'hero-desc': 'Find overseas buyers, suppliers, and trade support with a modern PayPal checkout flow.',
        'btn-explore': 'Explore Packages',
        'btn-how': 'How It Works',
        'btn-compliance': 'See Service Scope',
        'stat-global-numbers': 'Markets Covered',
        'stat-accuracy-rate': 'Response Speed',
        'stat-opt-in': 'Trade Support',
        'stat-delivery': 'Consultation Ready',
        'stat-da': 'Trade Experience',
        'stat-dofollow': 'Trade Support',
        'stat-indexed': 'Response Rate',
        'sec-packages-title': 'Choose Your Trade Package',
        'sec-packages-subtitle': 'From market research to sourcing and enterprise trade support, pick the level you need.',
        'sec-channels-title': 'Pick the Right Trade Package',
        'sec-channels-subtitle': 'Choose a package for market research, sourcing, or end-to-end trade operations.',
        'card-basic-title': 'Market Entry Audit',
        'card-basic-desc': 'Start with market research, competitor checks, and a country shortlist before you invest.',
        'card-pro-title': 'Buyer & Supplier Sourcing',
        'card-pro-desc': 'Get matching support for real import/export conversations, negotiation, and deal discovery.',
        'card-enterprise-title': 'Full Trade Desk',
        'card-enterprise-desc': 'End-to-end trade help covering contracts, logistics, payments, and ongoing support.',
        'card-view-pricing': 'View Pricing',
        'comp-title': 'What We Handle',
        'comp-desc': 'We help founders and operators move from research to trade execution with practical support across sourcing, contract checks, logistics, and follow-up.',
        'how-title': 'How TRADEBOOST Works',
        'how-desc': 'A simple 4-step workflow takes you from trade intake to live execution.',
        'how-step1-bold': '1. Consultation:',
        'how-step1-text': 'We review your target market, product, and current trade goals.',
        'how-step2-bold': '2. Sourcing:',
        'how-step2-text': 'We shortlist buyers, suppliers, and relevant trade partners.',
        'how-step3-bold': '3. Execution:',
        'how-step3-text': 'We help with contracts, logistics, and payment workflow guidance.',
        'how-step4-bold': '4. Follow-up:',
        'how-step4-text': 'We provide a report and support the next steps after delivery.',
        'sec-industries-title': 'Who We <span>Serve</span>',
        'comp-bullet1-bold': 'Market Research:',
        'comp-bullet1-text': 'Understand your target country, competition, and entry opportunities.',
        'comp-bullet2-bold': 'Supplier Discovery:',
        'comp-bullet2-text': 'Find reliable overseas buyers, suppliers, and trade partners.',
        'comp-bullet3-bold': 'Operational Support:',
        'comp-bullet3-text': 'Review contracts, logistics, payment terms, and post-sale issues.',
        'view-basic-sub': 'Start with a market entry audit before you scale internationally.',
        'view-pro-sub': 'Source buyers and suppliers, then move the deal forward with negotiation support.',
        'view-enterprise-sub': 'Use the full trade desk for contracts, logistics coordination, and after-sales care.',
        'view-orders-title': 'My Purchase History',
        'view-orders-sub': 'Review completed orders. Your records are stored locally in this browser.',
        'th-date': 'Order Date',
        'th-order-id': 'Transaction ID',
        'th-product': 'Product',
        'th-tier': 'Package Tier',
        'th-target': 'Target Keywords',
        'th-qty': 'Quantity',
        'th-total': 'Total Paid',
        'th-status': 'Status',
        'no-orders-msg': 'No purchase records yet. Complete your first order to see it here.',
        'modal-title': 'Configure Order',
        'modal-desc': 'Choose quantity and complete secure PayPal payment.',
        'modal-base-pkg': 'Base Package:',
        'modal-base-price-label': 'Base Price:',
        'modal-email-label': 'Email Address *',
        'modal-email-placeholder': 'name@example.com',
        'modal-email-error': 'Please enter a valid email address.',
        'modal-keywords-label': 'Target Keywords:',
        'modal-keywords-placeholder': 'e.g. import partner, HS code, wholesale buyer',
        'modal-qty': 'Quantity:',
        'modal-total-amt': 'Total Amount:',
        
        'badge-ssl': 'SSL Secured Checkout',
        'badge-paypal': 'PayPal Verified',
        'foot-channels': 'Service Packages',
        'foot-why': 'Why TRADEBOOST',
        'foot-legal': 'Trade Support',
        'foot-gdpr': 'Market Research',
        'foot-canspam': 'Buyer Discovery',
        'foot-match': 'Contract Review',
        'foot-contact': 'Contact support: snsherocom@gmail.com',
        'foot-copy': '&copy; 2026 BibleForAI TRADEBOOST. All rights reserved. Global trade solutions.',
        'order-button': 'Order Package',
        'featured-badge': 'Best Seller',
        'receipt-header': 'BIBLEFORAI - TRADEBOOST RECEIPT',
        'receipt-date': 'Order Date',
        'receipt-txid': 'Transaction ID',
        'receipt-email': 'Customer Email',
        'receipt-type': 'Service Type',
        'receipt-size': 'Package Tier',
        'receipt-target': 'Target Keywords',
        'receipt-qty': 'Quantity',
        'receipt-baseprice': 'Base Price',
        'receipt-total': 'Total Paid',
        'receipt-status': 'Status',
        'receipt-method': 'Payment Method',
        'receipt-method-val': 'PayPal Secure Checkout'
    },
    ko: {
        'logo-subtitle': 'TRADEBOOST!',
        'nav-home': '홈',
        'nav-basic': '시장 진입',
        'nav-pro': '소싱',
        'nav-enterprise': '엔터프라이즈 데스크',
        'btn-orders': '내 주문 내역',
        'hero-badge': '글로벌 무역 지원',
        'hero-title': 'TRADEBOOST — Global Trade Agency',
        'hero-desc': '해외 바이어, 공급처, 무역 지원을 PayPal 결제로 간편하게 이용하세요.',
        'btn-explore': '패키지 보기',
        'btn-how': '이용 방법',
        'btn-compliance': '서비스 범위 보기',
        'stat-global-numbers': '커버 시장',
        'stat-accuracy-rate': '응답 속도',
        'stat-opt-in': '무역 지원',
        'stat-delivery': '상담 준비 완료',
        'stat-da': '무역 경험',
        'stat-dofollow': '무역 지원',
        'stat-indexed': '응답률',
        'sec-packages-title': '무역 패키지를 선택하세요',
        'sec-packages-subtitle': '시장 조사부터 소싱, 전담 무역 지원까지 필요한 수준을 선택하세요.',
        'sec-channels-title': '맞는 무역 패키지를 선택하세요',
        'sec-channels-subtitle': '시장 조사, 소싱, 전담 무역 운영 중 필요한 패키지를 선택하세요.',
        'card-basic-title': '시장 진입 진단',
        'card-basic-desc': '해외 진출 전 시장조사, 경쟁사 분석, 국가 후보군부터 정리하세요.',
        'card-pro-title': '바이어·공급처 소싱',
        'card-pro-desc': '실제 수출입 상담, 협상, 거래 발굴을 위한 매칭 지원을 받으세요.',
        'card-enterprise-title': '풀 트레이드 데스크',
        'card-enterprise-desc': '계약, 물류 조율, 결제, 사후관리까지 전담으로 지원합니다.',
        'card-view-pricing': '가격 확인하기',
        'comp-title': '지원 범위',
        'comp-desc': '창업가와 실무자가 조사에서 실제 거래 실행으로 넘어갈 수 있도록 소싱, 계약 검토, 물류, 후속 지원까지 도와드립니다.',
        'how-title': 'TRADEBOOST 이용 방법',
        'how-desc': '간단한 4단계로 무역 상담부터 실행까지 이어집니다.',
        'how-step1-bold': '1. 상담:',
        'how-step1-text': '타겟 시장, 제품, 현재 무역 목표를 검토합니다.',
        'how-step2-bold': '2. 소싱:',
        'how-step2-text': '바이어, 공급처, 관련 파트너를 선별합니다.',
        'how-step3-bold': '3. 실행:',
        'how-step3-text': '계약, 물류, 결제 흐름을 함께 정리합니다.',
        'how-step4-bold': '4. 후속 관리:',
        'how-step4-text': '결과 리포트와 다음 단계 지원을 제공합니다.',
        'sec-industries-title': '누구를 <span>돕나요</span>',
        'comp-bullet1-bold': '시장 조사:',
        'comp-bullet1-text': '타겟 국가, 경쟁 상황, 진입 기회를 파악합니다.',
        'comp-bullet2-bold': '공급처 발굴:',
        'comp-bullet2-text': '신뢰할 수 있는 해외 바이어, 공급처, 파트너를 찾습니다.',
        'comp-bullet3-bold': '운영 지원:',
        'comp-bullet3-text': '계약, 물류, 결제 조건, 사후 문제를 검토합니다.',
        'view-basic-sub': '국제 확장 전 시장 진입 진단부터 시작하세요.',
        'view-pro-sub': '바이어와 공급처를 찾고 협상 지원으로 거래를 진행하세요.',
        'view-enterprise-sub': '계약, 물류 조율, 사후관리까지 포함한 전담 무역 운영 서비스입니다.',
        'view-orders-title': '내 구매 히스토리',
        'view-orders-sub': '완료된 주문을 확인하세요. 기록은 이 브라우저에 로컬로 저장됩니다.',
        'th-date': '주문 날짜',
        'th-order-id': '트랜잭션 ID',
        'th-product': '상품명',
        'th-tier': '패키지 등급',
        'th-target': '타겟 키워드',
        'th-qty': '수량',
        'th-total': '총 결제금액',
        'th-status': '상태',
        'no-orders-msg': '구매 기록이 없습니다. 첫 주문을 완료하면 여기에 표시됩니다.',
        'modal-title': '주문 설정',
        'modal-desc': '수량을 선택하고 안전한 PayPal 결제를 진행하세요.',
        'modal-base-pkg': '기본 패키지:',
        'modal-base-price-label': '기본 가격:',
        'modal-email-label': '이메일 주소 *',
        'modal-email-placeholder': 'name@example.com',
        'modal-email-error': '올바른 이메일 주소를 입력해주세요.',
        'modal-keywords-label': '타겟 키워드:',
        'modal-keywords-placeholder': '예: import partner, HS code, wholesale buyer',
        'modal-qty': '수량:',
        'modal-total-amt': '총 결제금액:',
        
        'badge-ssl': 'SSL 보안 결제 지원',
        'badge-paypal': 'PayPal 인증됨',
        'foot-channels': '서비스 패키지',
        'foot-legal': '무역 지원',
        'foot-gdpr': '시장 조사',
        'foot-canspam': '바이어 발굴',
        'foot-match': '계약 검토',
        'foot-contact': '문의 지원: snsherocom@gmail.com',
        'foot-copy': '&copy; 2026 BibleForAI TRADEBOOST. All rights reserved. Global trade solutions.',
        'order-button': '패키지 주문하기',
        'featured-badge': '베스트 셀러',
        'receipt-header': 'BIBLEFORAI - TRADEBOOST 영수증',
        'receipt-date': '주문 날짜',
        'receipt-txid': '거래 ID',
        'receipt-email': '고객 이메일',
        'receipt-type': '서비스 유형',
        'receipt-size': '패키지 등급',
        'receipt-target': '타겟 키워드',
        'receipt-qty': '수량',
        'receipt-baseprice': '기본 가격',
        'receipt-total': '총 결제금액',
        'receipt-status': '상태',
        'receipt-method': '결제 방법',
        'receipt-method-val': 'PayPal 안전 결제'
    }
};

let currentLang = localStorage.getItem('bibleforai_lang') || (() => {
    const browserLang = (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage || '';
    return browserLang.toLowerCase().startsWith('ko') ? 'ko' : 'en';
})();

function formatPrice(usdPrice, includeUnit = true) {
    const isKo = currentLang === 'ko';
    if (isKo) {
        const krw = Math.round(usdPrice * 1300);
        return includeUnit ? `₩${krw.toLocaleString()} KRW` : `₩${krw.toLocaleString()}`;
    }
    const formatted = (usdPrice % 1 === 0) ? usdPrice.toLocaleString() : usdPrice.toFixed(2);
    return includeUnit ? `$${formatted} USD` : `$${formatted}`;
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

    document.title = isKo
        ? 'BibleForAI - TRADEBOOST | 글로벌 무역대행'
        : 'BibleForAI - TRADEBOOST | Global Trade Agency';

    const metaMap = {
        'meta[name="description"]': isKo
            ? '글로벌 무역대행, 바이어 소싱, 공급처 발굴, 계약 검토, 물류 조율을 하나로 제공하는 TRADEBOOST 서비스입니다.'
            : 'Global trade agency support for market entry, buyer sourcing, supplier discovery, contract review, logistics coordination, and after-sales help.',
        'meta[property="og:title"]': isKo
            ? 'BibleForAI - TRADEBOOST | 글로벌 무역대행'
            : 'BibleForAI - TRADEBOOST | Global Trade Agency',
        'meta[property="og:description"]': isKo
            ? '글로벌 무역대행, 바이어 소싱, 공급처 발굴, 계약 검토, 물류 조율을 하나로 제공하는 서비스입니다.'
            : 'Global trade agency support for market entry, sourcing, contracts, logistics, and ongoing trade operations.',
        'meta[name="twitter:title"]': isKo
            ? 'BibleForAI - TRADEBOOST | 글로벌 무역대행'
            : 'BibleForAI - TRADEBOOST | Global Trade Agency',
        'meta[name="twitter:description"]': isKo
            ? '글로벌 무역대행, 바이어 소싱, 공급처 발굴, 계약 검토, 물류 조율을 하나로 제공하는 서비스입니다.'
            : 'Global trade agency support for market entry, sourcing, contracts, logistics, and ongoing trade operations.'
    };
    Object.entries(metaMap).forEach(([selector, content]) => {
        const el = document.querySelector(selector);
        if (el) el.content = content;
    });

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const translation = translations[lang] && translations[lang][key];
        if (translation) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = translation;
            } else {
                el.innerHTML = translation;
            }
        }
    });

    const selector = document.getElementById('language-selector');
    if (selector) selector.value = lang;
}

function changeLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('bibleforai_lang', lang);
    applyTranslations();
    renderAllPackages();
    renderOrders();
}

function setupHeaderScroll() {
    const header = document.getElementById('app-header');
    if (!header) return;
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });
}

function navigate(viewId) {
    currentView = viewId;
    document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
    const targetView = document.getElementById(`${viewId}-view`);
    if (targetView) targetView.classList.add('active');
    document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
    const activeNav = document.getElementById(`nav-${viewId}`);
    if (activeNav) activeNav.classList.add('active');
    if (window.innerWidth <= 768) {
        const drawer = document.getElementById('mobile-drawer');
        if (drawer) drawer.classList.remove('active');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleMobileMenu() {
    const drawer = document.getElementById('mobile-drawer');
    if (drawer) drawer.classList.toggle('active');
}

function renderAllPackages() {
    const isKo = currentLang === 'ko';
    Object.keys(packageCatalog).forEach(categoryKey => {
        const categoryData = packageCatalog[categoryKey];
        const container = document.getElementById(`${categoryKey}-packages`);
        if (!container) return;
        container.innerHTML = categoryData.packages.map(pkg => {
            const featuredClass = pkg.featured ? 'featured' : '';
            const badgeIcon = getCategoryIcon(categoryKey);
            const name = isKo ? pkg.name_ko : pkg.name_en;
            const desc = isKo ? pkg.desc_ko : pkg.desc_en;
            const features = isKo ? pkg.features_ko : pkg.features_en;
            const btnText = translations[currentLang]['order-button'] || 'Order Package';
            return `
                <div class="package-card ${featuredClass}">
                    <div class="card-icon ${categoryKey}-color"><i class="${badgeIcon}"></i></div>
                    <h3>${name}</h3>
                    <p class="package-desc">${desc}</p>
                    <div class="package-price-box">
                        <span class="price">${formatPrice(pkg.price, false)}</span>
                        <span class="currency">${currentLang === 'ko' ? 'KRW' : 'USD'}</span>
                    </div>
                    <ul class="package-features">
                        ${features.map(feat => `<li><i class="fa-solid fa-circle-check"></i> ${feat}</li>`).join('')}
                    </ul>
                    <button class="btn-buy" onclick="openPurchaseModal('${categoryKey}', '${pkg.id}')">
                        <i class="${badgeIcon}"></i> ${btnText}
                    </button>
                </div>`;
        }).join('');
    });
}

function getCategoryIcon(category) {
    switch (category) {
        case 'basic': return 'fa-solid fa-compass-drafting';
        case 'pro': return 'fa-solid fa-people-arrows';
        case 'enterprise': return 'fa-solid fa-ship';
        default: return 'fa-solid fa-ship';
    }
}

function openPurchaseModal(categoryKey, packageId) {
    const category = packageCatalog[categoryKey];
    const pkg = category?.packages.find(p => p.id === packageId);
    if (!pkg) return;
    const isKo = currentLang === 'ko';
    const catTitle = isKo ? category.title_ko : category.title_en;
    const pkgName = isKo ? pkg.name_ko : pkg.name_en;
    currentPackage = { categoryKey, categoryName: catTitle, tierName: pkgName, basePrice: pkg.price };
    orderQuantity = 1;

    const modalTitle = document.getElementById('modal-product-title');
    const modalPkgName = document.getElementById('modal-package-name');
    const modalBasePrice = document.getElementById('modal-base-price');
    const qtyInput = document.getElementById('order-quantity');
    if (modalTitle) modalTitle.innerText = catTitle;
    if (modalPkgName) modalPkgName.innerText = pkgName;
    if (modalBasePrice) modalBasePrice.innerText = formatPrice(pkg.price);
    if (qtyInput) qtyInput.value = orderQuantity;

    const emailInput = document.getElementById('order-email');
    if (emailInput) {
        emailInput.value = '';
        emailInput.style.borderColor = 'var(--border)';
    }
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
    document.getElementById('purchase-modal')?.classList.add('active');

    setTimeout(() => {
        const modalCard = document.querySelector('.modal-card');
        const totalBox = document.querySelector('.total-price-box');
        if (modalCard && totalBox) {
            modalCard.scrollTop = Math.max(totalBox.offsetTop - 20, 0);
        }
    }, 150);

    initPayPalButtons();
}

function closeModal() {
    document.getElementById('purchase-modal')?.classList.remove('active');
    const container = document.getElementById('paypal-button-container');
    if (container) container.innerHTML = '';
}

function adjustQty(amount) {
    const qtyInput = document.getElementById('order-quantity');
    let val = parseInt(qtyInput?.value || '1', 10);
    val = Math.max(1, val + amount);
    if (qtyInput) qtyInput.value = val;
    orderQuantity = val;
    updateModalPrice();
}

function updateModalPrice() {
    const qtyInput = document.getElementById('order-quantity');
    let val = parseInt(qtyInput?.value || '1', 10);
    if (Number.isNaN(val) || val < 1) val = 1;
    orderQuantity = val;
    const totalPrice = currentPackage ? currentPackage.basePrice * orderQuantity : 0;
    const totalEl = document.getElementById('modal-total-price');
    if (totalEl) totalEl.innerText = formatPrice(totalPrice);
}

function validateEmailField() {
    const emailInput = document.getElementById('order-email');
    const emailError = document.getElementById('email-error');
    if (!emailInput) return true;
    const email = emailInput.value.trim();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!ok) {
        emailInput.style.borderColor = '#ef4444';
        if (emailError) {
            emailError.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> ${translations[currentLang]['modal-email-error']}`;
            emailError.style.display = 'block';
        }
        return false;
    }
    emailInput.style.borderColor = 'var(--border)';
    if (emailError) emailError.style.display = 'none';
    return true;
}

function triggerTestCheckout() {
    const emailInput = document.getElementById('order-email');
    if (emailInput && !emailInput.value.trim()) emailInput.value = 'secure checkout@test.dev';
    if (!validateEmailField()) return;
    saveLocalOrder({ id: 'TEST-PAYID-' + Math.random().toString(36).slice(2, 11).toUpperCase(), isTest: true });
    closeModal();
}

function initPayPalButtons() {
    const container = document.getElementById('paypal-button-container');
    if (!container) return;
    container.innerHTML = '';
    if (typeof paypal === 'undefined') {
        container.innerHTML = '<p style="color:#ef4444;text-align:center;font-size:0.9rem;padding:1rem;font-weight:600;"><i class="fa-solid fa-triangle-exclamation"></i> PayPal is unavailable. Please reload the page.</p>';
        return;
    }
    paypal.Buttons({
        style: { layout: 'vertical', color: 'blue', shape: 'rect', label: 'checkout' },
        onClick: function(data, actions) {
            return validateEmailField() ? actions.resolve() : actions.reject();
        },
        createOrder: function(data, actions) {
            const selectedKeywords = document.getElementById('order-keywords')?.value.trim() || 'Global';
            const finalAmount = (currentPackage.basePrice * orderQuantity).toFixed(2);
            return actions.order.create({
                purchase_units: [{
                    description: `${currentPackage.categoryName} - ${currentPackage.tierName} [Keywords: ${selectedKeywords}] (Qty: ${orderQuantity})`,
                    amount: { currency_code: 'USD', value: finalAmount }
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
    }).render('#paypal-button-container');
}

function saveLocalOrder(details) {
    const orderLogs = JSON.parse(localStorage.getItem('tradeboost_orders')) || [];
    const selectedKeywords = document.getElementById('order-keywords') ? document.getElementById('order-keywords').value.trim() : 'Global';
    const emailVal = document.getElementById('order-email') ? document.getElementById('order-email').value.trim() : '';

    const newOrder = {
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
        id: details.id,
        email: emailVal,
        category: currentPackage.categoryName,
        package: currentPackage.tierName,
        target: selectedKeywords,
        quantity: orderQuantity,
        basePrice: currentPackage.basePrice,
        totalPaid: formatPrice(currentPackage.basePrice * orderQuantity),
        status: 'Completed'
    };

    orderLogs.unshift(newOrder);
    localStorage.setItem('tradeboost_orders', JSON.stringify(orderLogs));
    renderOrders();

    const dict = translations[currentLang];
    const receiptText = `===================================
   ${dict['receipt-header']}
===================================
${dict['receipt-date'].padEnd(15)} : ${newOrder.date}
${dict['receipt-txid'].padEnd(15)} : ${newOrder.id}
${dict['receipt-email'].padEnd(15)} : ${newOrder.email}
${dict['receipt-type'].padEnd(15)} : ${newOrder.category}
${dict['receipt-size'].padEnd(15)} : ${newOrder.package}
${dict['receipt-target'].padEnd(15)} : ${newOrder.target}
${dict['receipt-qty'].padEnd(15)} : ${newOrder.quantity}
${dict['receipt-baseprice'].padEnd(15)} : ${formatPrice(newOrder.basePrice)}
${dict['receipt-total'].padEnd(15)} : ${newOrder.totalPaid}
${dict['receipt-status'].padEnd(15)} : ${newOrder.status}
-----------------------------------
${dict['receipt-method'].padEnd(15)} : ${dict['receipt-method-val']}
===================================`;

    const encodedReceipt = encodeURIComponent(receiptText);
    window.location.href = `https://docs.google.com/forms/d/e/1FAIpQLScMPqbEWWttS5mb1m_krsO_kco24ImpgvYVSbc7zO0nEVmYFw/viewform?entry.1059822061=${encodedReceipt}`;
}

function renderOrders() {
    const orderLogs = JSON.parse(localStorage.getItem('tradeboost_orders')) || [];
    const tbody = document.getElementById('orders-tbody');
    const noOrders = document.getElementById('no-orders-msg');
    if (!tbody) return;
    tbody.innerHTML = orderLogs.map(order => `
        <tr>
            <td>${order.date}</td>
            <td>${order.id}</td>
            <td>${order.category}</td>
            <td>${order.package}</td>
            <td>${order.target}</td>
            <td>${order.quantity}</td>
            <td>${order.totalPaid}</td>
            <td><span class="status-pill">${order.status}</span></td>
        </tr>`).join('');
    if (noOrders) noOrders.style.display = orderLogs.length ? 'none' : 'flex';
}

document.addEventListener('DOMContentLoaded', () => {
    applyTranslations();
    renderAllPackages();
    renderOrders();
    setupHeaderScroll();
});

// Expose variables globally to prevent ReferenceErrors in inline HTML scripts/handlers
if (typeof navigate !== 'undefined') { window.navigate = navigate; }
if (typeof currentLang !== 'undefined') { window.currentLang = currentLang; }

window.openPurchaseModal = openPurchaseModal;
window.closeModal = closeModal;
window.adjustQty = adjustQty;
window.changeLanguage = changeLanguage;
