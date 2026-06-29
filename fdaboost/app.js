// AIBible - FDABOOST service app
let currentLang = localStorage.getItem('bibleforai_lang') || ((navigator.language || 'en').toLowerCase().startsWith('ko') ? 'ko' : 'en');
let currentPackage = null;
let orderQuantity = 1;
let paypalButtonInstance = null;

const GOOGLE_FORM_ID = '1FAIpQLScMPqbEWWttS5mb1m_krsO_kco24ImpgvYVSbc7zO0nEVmYFw';
const ORDERS_KEY = 'fdaboost_orders';

const packageCatalog = {
    fdaboost: {
        title_en: 'FDA Labeling & Certification',
        title_ko: 'FDA 라벨링 & 인증',
        packages: [
            {
                id: 'audit',
                name_en: 'Compliance Audit',
                name_ko: '컴플라이언스 점검',
                desc_en: 'Quick review of product labels, ingredients, and launch readiness for US food FDA requirements.',
                desc_ko: '미국 식품 FDA 요건에 맞춘 제품 라벨, 성분, 출시 준비도를 빠르게 점검합니다.',
                price: 247,
                featured: false,
                features_en: ['Label review', 'Ingredient check', 'Risk notes', '30-minute consult'],
                features_ko: ['라벨 검토', '성분 확인', '리스크 노트', '30분 상담']
            },
            {
                id: 'labeling',
                name_en: 'Labeling Pack',
                name_ko: '라벨링 팩',
                desc_en: 'Practical support for required label wording, nutrition layout guidance, and packaging edits.',
                desc_ko: '필수 라벨 문구, 영양성분표 구성 가이드, 패키징 수정 지원.',
                price: 389,
                featured: false,
                features_en: ['Label wording guide', 'Nutrition panel layout', 'Packaging edit notes', 'Priority email support'],
                features_ko: ['라벨 문구 가이드', '영양성분표 레이아웃', '패키징 수정 노트', '우선 이메일 지원']
            },
            {
                id: 'registration',
                name_en: 'Registration Pack',
                name_ko: '등록 팩',
                desc_en: 'Support for FDA registration workflow, account prep, and document handoff.',
                desc_ko: 'FDA 등록 절차, 계정 준비, 문서 인수인계를 지원합니다.',
                price: 589,
                featured: true,
                features_en: ['Registration workflow', 'Account prep checklist', 'Document handoff', 'Fast response'],
                features_ko: ['등록 절차 가이드', '계정 준비 체크리스트', '문서 인수인계', '빠른 응답']
            },
            {
                id: 'launch',
                name_en: 'Launch Sprint',
                name_ko: '런치 스프린트',
                desc_en: 'A premium sprint for brands entering the US market with compliance, labeling, and go-to-market readiness.',
                desc_ko: '컴플라이언스, 라벨링, 시장 진입 준비가 필요한 브랜드를 위한 프리미엄 스프린트입니다.',
                price: 899,
                featured: false,
                features_en: ['Launch roadmap', 'Market entry checklist', 'Go-live support', 'Weekly follow-up'],
                features_ko: ['런치 로드맵', '시장 진입 체크리스트', '런칭 지원', '주간 후속 점검']
            },
            {
                id: 'enterprise',
                name_en: 'Enterprise Launch',
                name_ko: '엔터프라이즈 런치',
                desc_en: 'For teams that need multi-product launch support across the US food compliance workflow.',
                desc_ko: '미국 식품 컴플라이언스 워크플로우 전반에 걸친 멀티 제품 런치 지원이 필요한 팀용입니다.',
                price: 1290,
                featured: false,
                features_en: ['Multi-product plan', 'Internal handoff pack', 'Compliance checklist', 'Dedicated support'],
                features_ko: ['멀티 제품 플랜', '내부 인수인계 패키지', '컴플라이언스 체크리스트', '전담 지원']
            }
        ]
    }
};

const translations = {
    en: {
        'logo-subtitle': 'FDA COMPLIANCE',
        'nav-home': 'Home',
        'nav-packages': 'Packages',
        'nav-faq': 'FAQ',
        'nav-orders': 'My Orders',
        'hero-badge': 'KMONG-Sourced FDA Playbook',
        'hero-title': 'FDA Labeling & Certification',
        'hero-desc': 'Labeling, registration prep, launch readiness, and certification support for US food brands.',
        'hero-note': 'Kmong base offer starts at ₩190,000. AIBible pricing begins at about $247 after a 2x markup.',
        'hero-cta': 'See Packages',
        'hero-secondary': 'View FAQ',
        'stat-1-value': '5',
        'stat-1-label': 'Service Paths',
        'stat-2-value': '24h',
        'stat-2-label': 'Fast Response',
        'stat-3-value': '1:1',
        'stat-3-label': 'Consulting',
        'stat-4-value': 'US Market',
        'stat-4-label': 'Target Focus',
        'section-title': 'Choose the Right FDA Package',
        'section-subtitle': 'Pick the stage that matches your product and launch readiness goals.',
        'card-title': 'FDA Labeling & Certification',
        'card-desc': 'Practical FDA guidance for food brands that need compliant labels, registration prep, and launch direction.',
        'card-btn': 'View Pricing',
        'why-title': 'What you get',
        'why-subtitle': 'Built for brands that need a practical plan, not just a generic checklist.',
        'why-1': 'Label, ingredient, and packaging guidance',
        'why-2': 'Registration prep and document handoff support',
        'why-3': 'US launch readiness roadmap for food products',
        'packages-title': 'Packages',
        'packages-subtitle': 'All prices are shown in USD. The Korean page displays the converted KRW estimate.',
        'faq-title': 'Frequently Asked Questions',
        'faq-subtitle': 'Quick answers about the service, price, and checkout flow.',
        'faq-q1': 'Who is this service for?',
        'faq-a1': 'It is for food brands, founders, manufacturers, and agencies entering the US market with FDA-related packaging needs.',
        'faq-q2': 'What is the original Kmong price?',
        'faq-a2': 'The referenced Kmong FDA labeling service starts at ₩190,000, and this page uses a 2x markup for AIBible pricing.',
        'faq-q3': 'How does the test checkout work?',
        'faq-a3': 'Click the visible total price inside the payment modal to run the sandbox-style test checkout and generate a receipt.',
        'faq-q4': 'What information should I prepare?',
        'faq-a4': 'Have your product name, ingredient list, current label draft, target market, and packaging notes ready for the consultation.',
        'orders-title': 'My Orders',
        'orders-subtitle': 'Your successful orders are stored locally in this browser.',
        'th-date': 'Order Date',
        'th-order-id': 'Transaction ID',
        'th-product': 'Product',
        'th-tier': 'Package',
        'th-market': 'Target Market',
        'th-qty': 'Qty',
        'th-total': 'Total Paid',
        'th-status': 'Status',
        'no-orders': 'No orders yet. Complete a checkout to see the receipt history here.',
        'modal-title': 'Configure Order',
        'modal-desc': 'Fill in your details, then complete secure PayPal payment.',
        'modal-package-label': 'Selected Package',
        'modal-price-label': 'Base Price',
        'modal-email-label': 'Email Address *',
        'modal-email-placeholder': 'name@example.com',
        'modal-email-error': 'Please enter a valid email address.',
        'modal-market-label': 'Target Market',
        'modal-qty': 'Quantity',
        'modal-total-amt': 'Total Amount',
        
        'badge-ssl': 'SSL Secured Checkout',
        'badge-paypal': 'PayPal Verified',
        'footer-note': 'FDA labeling, certification, and launch support for food brands.',
        'footer-copy': '&copy; 2026 BibleForAI FDABOOST. All rights reserved.'
    },
    ko: {
        'logo-subtitle': 'FDA 컴플라이언스',
        'nav-home': '홈',
        'nav-packages': '패키지',
        'nav-faq': 'FAQ',
        'nav-orders': '내 주문',
        'hero-badge': '크몽 기반 FDA 플레이북',
        'hero-title': 'FDA 라벨링 & 인증',
        'hero-desc': '미국 식품 브랜드를 위한 라벨링, 등록 준비, 출시 준비, 인증 지원 서비스입니다.',
        'hero-note': '크몽 기준 시작가는 ₩190,000이며, 본 페이지는 2배 마크업 후 약 $247부터 시작합니다.',
        'hero-cta': '패키지 보기',
        'hero-secondary': 'FAQ 보기',
        'stat-1-value': '5',
        'stat-1-label': '서비스 경로',
        'stat-2-value': '24h',
        'stat-2-label': '빠른 응답',
        'stat-3-value': '1:1',
        'stat-3-label': '컨설팅',
        'stat-4-value': 'US Market',
        'stat-4-label': '타깃 시장',
        'section-title': '적합한 FDA 패키지를 선택하세요',
        'section-subtitle': '제품과 출시 준비 수준에 맞는 단계를 고르세요.',
        'card-title': 'FDA 라벨링 & 인증',
        'card-desc': 'FDA 라벨, 등록 준비, 출시 방향이 필요한 식품 브랜드를 위한 실무형 서비스입니다.',
        'card-btn': '가격 보기',
        'why-title': '받게 되는 것',
        'why-subtitle': '단순 체크리스트가 아닌, 바로 실행 가능한 실전 플랜에 초점을 맞춥니다.',
        'why-1': '라벨, 성분, 패키징 가이드',
        'why-2': '등록 준비 및 문서 인수인계 지원',
        'why-3': '미국 식품 런칭 준비 로드맵',
        'packages-title': '패키지',
        'packages-subtitle': '가격은 USD 기준이며, 한국어 페이지에서는 환산 KRW가 표시됩니다.',
        'faq-title': '자주 묻는 질문',
        'faq-subtitle': '서비스, 가격, 결제 흐름에 대한 빠른 답변입니다.',
        'faq-q1': '이 서비스는 누구를 위한 건가요?',
        'faq-a1': '미국 시장 진출 과정에서 FDA 관련 패키징과 등록 준비가 필요한 식품 브랜드, 창업자, 제조사, 에이전시를 위한 서비스입니다.',
        'faq-q2': '크몽 원본 가격은 얼마였나요?',
        'faq-a2': '참조한 크몽 FDA 라벨링 서비스는 ₩190,000부터 시작하며, 본 페이지는 AIBible 기준 2배 마크업을 적용했습니다.',
        'faq-q3': '테스트 결제는 어떻게 하나요?',
        'faq-a3': '결제 모달의 보이는 총액을 클릭하면 샌드박스 방식의 테스트 체크아웃과 영수증 생성이 실행됩니다.',
        'faq-q4': '어떤 정보를 준비하면 좋나요?',
        'faq-a4': '제품명, 성분표, 현재 라벨 초안, 타깃 시장, 패키징 메모를 준비하시면 좋습니다.',
        'orders-title': '내 주문 내역',
        'orders-subtitle': '성공한 주문은 브라우저 작업공간에 로컬로 저장됩니다.',
        'th-date': '주문일',
        'th-order-id': '거래 ID',
        'th-product': '상품',
        'th-tier': '패키지',
        'th-market': '타깃 시장',
        'th-qty': '수량',
        'th-total': '총 결제액',
        'th-status': '상태',
        'no-orders': '아직 주문 내역이 없습니다. 패키지를 눌러 첫 주문을 시작해 보세요.',
        'modal-title': '주문 설정',
        'modal-desc': '정보를 입력하고 안전한 PayPal 결제를 완료하세요.',
        'modal-package-label': '선택 패키지',
        'modal-price-label': '기본 가격',
        'modal-email-label': '이메일 주소 *',
        'modal-email-placeholder': 'name@example.com',
        'modal-email-error': '유효한 이메일 주소를 입력하세요.',
        'modal-market-label': '타깃 시장',
        'modal-qty': '수량',
        'modal-total-amt': '총 결제액',
        
        'badge-ssl': 'SSL 보안 결제',
        'badge-paypal': 'PayPal 인증',
        'footer-note': '식품 브랜드를 위한 FDA 라벨링, 인증, 런치 지원 서비스.',
        'footer-copy': '&copy; 2026 BibleForAI FDABOOST. All rights reserved.'
    }
};

function formatPrice(usdPrice, includeUnit = true) {
    const isKo = currentLang === 'ko';
    if (isKo) {
        const krw = Math.round(usdPrice * 1300);
        return includeUnit ? `₩${krw.toLocaleString()} KRW` : `₩${krw.toLocaleString()}`;
    }
    const formatted = (usdPrice % 1 === 0) ? usdPrice.toLocaleString() : usdPrice.toFixed(2);
    return includeUnit ? `$${formatted} USD` : `$${formatted}`;
}

function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
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

    const dict = translations[currentLang];
    document.documentElement.lang = currentLang;

    document.title = currentLang === 'ko'
        ? 'BibleForAI - FDABOOST | FDA 라벨링 & 인증'
        : 'BibleForAI - FDABOOST | FDA Labeling & Certification';

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.content = currentLang === 'ko'
            ? '크몽에서 검증된 FDA 라벨링 및 인증 서비스를 기반으로, 미국 식품 브랜드의 출시 준비와 등록 지원을 제공합니다.'
            : 'FDA labeling and certification support for US food brands, based on a Kmong-sourced service playbook.';
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.content = document.title;
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.content = metaDesc ? metaDesc.content : '';
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.content = document.title;
    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) twDesc.content = metaDesc ? metaDesc.content : '';

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) el.innerHTML = dict[key];
    });

    renderAllPackages();
    renderOrders();
}

function changeLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('bibleforai_lang', lang);
    const selector = document.getElementById('language-selector');
    if (selector) selector.value = lang;
    applyTranslations();
}

function renderAllPackages() {
    const container = document.getElementById('fdaboost-packages');
    if (!container) return;
    const isKo = currentLang === 'ko';
    const category = packageCatalog.fdaboost;

    container.innerHTML = category.packages.map(pkg => `
        <div class="package-card ${pkg.featured ? 'featured' : ''}">
            <h3>${isKo ? pkg.name_ko : pkg.name_en}</h3>
            <p class="package-desc">${isKo ? pkg.desc_ko : pkg.desc_en}</p>
            <div class="package-price-box">
                <span class="price">${formatPrice(pkg.price, false)}</span>
                <span class="currency">${isKo ? 'KRW' : 'USD'}</span>
            </div>
            <ul class="package-features">
                ${(isKo ? pkg.features_ko : pkg.features_en).map(feat => `<li><i class="fa-solid fa-circle-check"></i> ${feat}</li>`).join('')}
            </ul>
            <button class="btn-buy" onclick="openPurchaseModal('fdaboost', '${pkg.id}')">
                <i class="fa-solid fa-sparkles"></i> ${currentLang === 'ko' ? '주문하기' : 'Order Package'}
            </button>
        </div>
    `).join('');
}

function navigate(target) {
    const section = document.getElementById(`${target}-section`) || document.getElementById(`${target}-view`) || document.getElementById(`${target}`);
    if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    document.querySelectorAll('.mobile-drawer').forEach(el => el.classList.remove('active'));
}

function toggleMobileMenu() {
    const drawer = document.getElementById('mobile-drawer');
    if (drawer) drawer.classList.toggle('active');
}

function getCategoryIcon(category) {
    switch (category) {
        case 'fdaboost': return 'fa-solid fa-vial-circle-check';
        default: return 'fa-solid fa-rocket';
    }
}

function openPurchaseModal(categoryKey, packageId) {
    const category = packageCatalog[categoryKey];
    const pkg = category?.packages.find(p => p.id === packageId);
    if (!pkg) return;

    currentPackage = {
        categoryKey,
        categoryName: currentLang === 'ko' ? category.title_ko : category.title_en,
        tierName: currentLang === 'ko' ? pkg.name_ko : pkg.name_en,
        basePrice: pkg.price
    };
    orderQuantity = 1;

    const modal = document.getElementById('purchase-modal');
    document.getElementById('modal-product-title').textContent = currentPackage.categoryName;
    document.getElementById('modal-package-name').textContent = currentPackage.tierName;
    document.getElementById('modal-base-price').textContent = formatPrice(pkg.price);
    document.getElementById('order-quantity').value = '1';
    document.getElementById('order-email').value = '';
    document.getElementById('order-market').value = 'Global';
    const emailError = document.getElementById('email-error');
    if (emailError) emailError.style.display = 'none';

    modal.classList.add('active');
    initPayPalButtons();

    setTimeout(() => {
        const modalCard = document.querySelector('.modal-card');
        const paymentBox = document.querySelector('.total-price-box');
        if (modalCard && paymentBox) {
            modalCard.scrollTop = Math.max(paymentBox.offsetTop - 80, 0);
        }
    }, 100);
}

function closeModal() {
    const modal = document.getElementById('purchase-modal');
    if (modal) modal.classList.remove('active');
    const container = document.getElementById('paypal-button-container');
    if (container) container.innerHTML = '';
}

function adjustQty(delta) {
    const input = document.getElementById('order-quantity');
    const next = Math.max(1, (parseInt(input.value, 10) || 1) + delta);
    input.value = next;
    orderQuantity = next;
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
}

function updateModalPrice() {
    const input = document.getElementById('order-quantity');
    const qty = Math.max(1, parseInt(input.value, 10) || 1);
    orderQuantity = qty;
    const total = currentPackage ? currentPackage.basePrice * qty : 0;
    const totalPrice = document.getElementById('modal-total-price');
    if (totalPrice) totalPrice.textContent = formatPrice(total);
}

function validateEmailField() {
    const emailInput = document.getElementById('order-email');
    const emailError = document.getElementById('email-error');
    const email = (emailInput?.value || '').trim();
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!pattern.test(email)) {
        if (emailInput) emailInput.style.borderColor = '#ef4444';
        if (emailError) emailError.style.display = 'block';
        return false;
    }
    if (emailInput) emailInput.style.borderColor = 'var(--border)';
    if (emailError) emailError.style.display = 'none';
    return true;
}

function buildReceipt(details) {
    const now = new Date();
    const market = document.getElementById('order-market')?.value || 'Global';
    const email = document.getElementById('order-email')?.value.trim() || 'sandbox@test.dev';
    const qty = orderQuantity;
    const total = (currentPackage.basePrice * qty).toFixed(2);
    const txid = details?.id || `TEST-${Date.now()}`;
    const status = details?.isTest ? 'TEST COMPLETED' : 'PAID';

    return [
        '===================================',
        `SERVICE: FDABOOST`,
        `DATE: ${now.toISOString()}`,
        `TRANSACTION ID: ${txid}`,
        `EMAIL: ${email}`,
        `PACKAGE: ${currentPackage.categoryName} / ${currentPackage.tierName}`,
        `TARGET MARKET: ${market}`,
        `QTY: ${qty}`,
        `BASE PRICE: ${formatPrice(currentPackage.basePrice)}`,
        `TOTAL: ${formatPrice(Number(total))}`,
        `STATUS: ${status}`,
        `PAYMENT METHOD: PayPal Secure Checkout`,
        '==================================='].join('\n');
}

function saveLocalOrder(details) {
    if (!currentPackage) return;
    const orderLogs = JSON.parse(localStorage.getItem(ORDERS_KEY)) || [];
    const market = document.getElementById('order-market')?.value || 'Global';
    const email = document.getElementById('order-email')?.value.trim() || 'sandbox@test.dev';
    const qty = orderQuantity;
    const total = currentPackage.basePrice * qty;
    const now = new Date();

    const order = {
        date: now.toISOString(),
        transactionId: details?.id || `TEST-${Date.now()}`,
        product: currentPackage.categoryName,
        tier: currentPackage.tierName,
        market,
        qty,
        total,
        status: details?.isTest ? (currentLang === 'ko' ? '테스트 완료' : 'TEST COMPLETED') : (currentLang === 'ko' ? '결제 완료' : 'PAID'),
        email
    };

    orderLogs.unshift(order);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orderLogs));
    renderOrders();

    const receipt = encodeURIComponent(buildReceipt(details));
    window.location.href = `https://docs.google.com/forms/d/e/${GOOGLE_FORM_ID}/viewform?entry.1059822061=${receipt}`;
}

function renderOrders() {
    const tbody = document.getElementById('orders-tbody');
    const noOrders = document.getElementById('no-orders');
    if (!tbody) return;
    const orderLogs = JSON.parse(localStorage.getItem(ORDERS_KEY)) || [];

    if (!orderLogs.length) {
        tbody.innerHTML = '';
        if (noOrders) noOrders.style.display = 'block';
        return;
    }

    if (noOrders) noOrders.style.display = 'none';
    tbody.innerHTML = orderLogs.map(order => `
        <tr>
            <td>${new Date(order.date).toLocaleString()}</td>
            <td>${order.transactionId}</td>
            <td>${order.product}</td>
            <td>${order.tier}</td>
            <td>${order.market}</td>
            <td>${order.qty}</td>
            <td>${formatPrice(order.total)}</td>
            <td><span class="status-pill">${order.status}</span></td>
        </tr>
    `).join('');
}

function triggerTestCheckout() {
    const emailInput = document.getElementById('order-email');
    if (emailInput && !emailInput.value.trim()) emailInput.value = 'sandbox@test.dev';
    if (!validateEmailField()) return;
    saveLocalOrder({ id: `TEST-${Math.random().toString(36).slice(2, 10).toUpperCase()}`, isTest: true });
}

function initPayPalButtons() {
    const container = document.getElementById('paypal-button-container');
    if (!container) return;
    container.innerHTML = '';
    if (typeof paypal === 'undefined') {
        container.innerHTML = '<p style="color:#f87171;text-align:center;font-size:0.9rem;padding:1rem;">PayPal is unavailable right now.</p>';
        return;
    }

    try {
        if (paypalButtonInstance?.close) paypalButtonInstance.close();
    } catch (_) {}

    paypalButtonInstance = paypal.Buttons({
        style: { layout: 'vertical', color: 'blue', shape: 'rect', label: 'checkout' },
        onClick(data, actions) {
            return validateEmailField() ? actions.resolve() : actions.reject();
        },
        createOrder(data, actions) {
            const total = (currentPackage.basePrice * orderQuantity).toFixed(2);
            const market = document.getElementById('order-market')?.value || 'Global';
            return actions.order.create({
                purchase_units: [{
                    description: `${currentPackage.categoryName} - ${currentPackage.tierName} [Market: ${market}] (Qty: ${orderQuantity})`,
                    amount: {
                        currency_code: 'USD',
                        value: total
                    }
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
            console.error('PayPal error:', err);
            alert(currentLang === 'ko' ? '결제 처리 중 오류가 발생했습니다.' : 'An error occurred during payment processing.');
        }
    });

    paypalButtonInstance.render('#paypal-button-container');
}

window.changeLanguage = changeLanguage;
window.navigate = navigate;
window.toggleMobileMenu = toggleMobileMenu;
window.openPurchaseModal = openPurchaseModal;
window.closeModal = closeModal;
window.adjustQty = adjustQty;
window.updateModalPrice = updateModalPrice;
window.triggerTestCheckout = triggerTestCheckout;
window.validateEmailField = validateEmailField;

document.addEventListener('DOMContentLoaded', () => {
    const langSelector = document.getElementById('language-selector');
    if (langSelector) {
        langSelector.value = currentLang;
        langSelector.addEventListener('change', e => changeLanguage(e.target.value));
    }

    applyTranslations();
    renderOrders();

    const modal = document.getElementById('purchase-modal');
    if (modal) {
        modal.addEventListener('click', e => {
            if (e.target === modal) closeModal();
        });
    }

    const emailInput = document.getElementById('order-email');
    if (emailInput) emailInput.addEventListener('input', validateEmailField);
    const qtyInput = document.getElementById('order-quantity');
    if (qtyInput) qtyInput.addEventListener('input', updateModalPrice);

    // Click outside drawer closes it
    document.addEventListener('click', e => {
        const drawer = document.getElementById('mobile-drawer');
        const toggle = document.getElementById('menu-toggle');
        if (drawer && drawer.classList.contains('active') && !drawer.contains(e.target) && !toggle.contains(e.target)) {
            drawer.classList.remove('active');
        }
    });
});

// Expose variables globally to prevent ReferenceErrors in inline HTML scripts/handlers
if (typeof navigate !== 'undefined') { window.navigate = navigate; }
if (typeof currentLang !== 'undefined') { window.currentLang = currentLang; }
