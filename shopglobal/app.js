// AIBible - SHOPGLOBAL service app
let currentLang = localStorage.getItem('bibleforai_lang') || ((navigator.language || 'en').toLowerCase().startsWith('ko') ? 'ko' : 'en');
let currentPackage = null;
let orderQuantity = 1;
let paypalButtonInstance = null;

const GOOGLE_FORM_ID = '1FAIpQLScMPqbEWWttS5mb1m_krsO_kco24ImpgvYVSbc7zO0nEVmYFw';
const ORDERS_KEY = 'shopglobal_orders';

const packageCatalog = {
    shopglobal: {
        title_en: 'Shopify Global Expansion',
        title_ko: '쇼피파이 글로벌 확장',
        packages: [
            {
                id: 'audit',
                name_en: 'Launch Audit',
                name_ko: '런치 진단',
                desc_en: 'A fast strategy review for brands deciding whether Shopify is the right global launch path.',
                desc_ko: '쇼피파이로 글로벌 진출이 적합한지 빠르게 판단하는 전략 진단 패키지입니다.',
                price: 315,
                featured: false,
                features_en: ['Store readiness score', 'Market fit checklist', 'Action plan PDF', '30-minute review call'],
                features_ko: ['스토어 준비도 점검', '시장 적합성 체크리스트', '실행 계획 PDF', '30분 리뷰 콜']
            },
            {
                id: 'setup',
                name_en: 'Store Setup',
                name_ko: '스토어 세팅',
                desc_en: 'Setup support for themes, payments, shipping, taxes, and core store structure.',
                desc_ko: '테마, 결제, 배송, 세금, 핵심 스토어 구조 설정을 지원합니다.',
                price: 590,
                featured: false,
                features_en: ['Payment setup', 'Shipping rules', 'Tax basics', 'Theme structure guide'],
                features_ko: ['결제 설정', '배송 규칙', '세금 기본 구성', '테마 구조 가이드']
            },
            {
                id: 'apps',
                name_en: 'App Stack',
                name_ko: '앱 스택',
                desc_en: 'Recommended apps and automation stack for conversion, reviews, email, and analytics.',
                desc_ko: '전환, 리뷰, 이메일, 분석을 위한 추천 앱과 자동화 스택을 제공합니다.',
                price: 890,
                featured: true,
                features_en: ['App shortlist', 'Automation map', 'Conversion tools', 'Retention setup'],
                features_ko: ['앱 쇼트리스트', '자동화 맵', '전환 도구', '리텐션 설정']
            },
            {
                id: 'seo',
                name_en: 'Localization & SEO',
                name_ko: '현지화 & SEO',
                desc_en: 'Localization planning for market pages, keywords, hreflang, and international search growth.',
                desc_ko: '마켓 페이지, 키워드, hreflang, 글로벌 검색 성장을 위한 현지화 전략입니다.',
                price: 1290,
                featured: false,
                features_en: ['Keyword map', 'Market pages', 'SEO checklist', 'Localization notes'],
                features_ko: ['키워드 맵', '마켓 페이지', 'SEO 체크리스트', '현지화 노트']
            },
            {
                id: 'growth',
                name_en: 'Growth Sprint',
                name_ko: '성장 스프린트',
                desc_en: 'A premium execution sprint for brands ready to launch and scale internationally.',
                desc_ko: '해외 런칭과 스케일업을 바로 실행할 브랜드를 위한 프리미엄 스프린트입니다.',
                price: 1890,
                featured: false,
                features_en: ['Launch roadmap', 'Ad account plan', 'Offer positioning', 'Weekly support'],
                features_ko: ['런치 로드맵', '광고 계정 플랜', '오퍼 포지셔닝', '주간 지원']
            }
        ]
    }
};

const translations = {
    en: {
        'logo-subtitle': 'GLOBAL ECOMMERCE',
        'nav-home': 'Home',
        'nav-packages': 'Packages',
        'nav-faq': 'FAQ',
        'nav-orders': 'My Orders',
        'hero-badge': 'KMONG-Sourced Shopify Playbook',
        'hero-title': 'Shopify Global Expansion',
        'hero-desc': 'Strategy, store setup, apps, localization, and growth support for brands entering global markets.',
        'hero-note': 'Kmong base offer starts at ₩220,000. AIBible pricing begins at about $315 after a 2x markup.',
        'hero-cta': 'See Packages',
        'hero-secondary': 'View FAQ',
        'stat-1-value': '5',
        'stat-1-label': 'Expansion Paths',
        'stat-2-value': '24h',
        'stat-2-label': 'Fast Response',
        'stat-3-value': '1:1',
        'stat-3-label': 'Consulting',
        'stat-4-value': 'Global',
        'stat-4-label': 'Market Focus',
        'section-title': 'Choose the Right Shopify Package',
        'section-subtitle': 'Pick the stage that matches your current store and market-entry goals.',
        'card-title': 'Shopify Global Expansion',
        'card-desc': 'International Shopify strategy for sellers who need clear setup, localization, and growth direction.',
        'card-btn': 'View Pricing',
        'why-title': 'What you get',
        'why-subtitle': 'Built for brands that need a practical plan, not just a generic checklist.',
        'why-1': 'Market fit and positioning guidance',
        'why-2': 'Store, theme, app, and payment setup support',
        'why-3': 'Localization, SEO, and launch execution roadmap',
        'packages-title': 'Packages',
        'packages-subtitle': 'All prices are shown in USD. The Korean page displays the converted KRW estimate.',
        'faq-title': 'Frequently Asked Questions',
        'faq-subtitle': 'Quick answers about the service, price, and checkout flow.',
        'faq-q1': 'Who is this service for?',
        'faq-a1': 'It is for sellers, founders, and agencies that want to launch or improve a Shopify store for international markets.',
        'faq-q2': 'What is the original Kmong price?',
        'faq-a2': 'The referenced Kmong Shopify consulting service starts at ₩220,000, and this page uses a 2x markup for AIBible pricing.',
        'faq-q3': 'How does the test checkout work?',
        'faq-a3': 'Click the visible total price inside the payment modal to run the sandbox-style test checkout and generate a receipt.',
        'faq-q4': 'What market information should I prepare?',
        'faq-a4': 'Have your target market, store URL, products, and any existing sales or traffic notes ready for the consultation.',
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
        'modal-total-hint': 'Click the total price to run the sandbox test checkout',
        'badge-ssl': 'SSL Secured Checkout',
        'badge-paypal': 'PayPal Verified',
        'footer-note': 'Shopify consulting, setup, and launch support for global sellers.',
        'footer-copy': '&copy; 2026 BibleForAI SHOPGLOBAL. All rights reserved.'
    },
    ko: {
        'logo-subtitle': '글로벌 이커머스',
        'nav-home': '홈',
        'nav-packages': '패키지',
        'nav-faq': 'FAQ',
        'nav-orders': '내 주문',
        'hero-badge': '크몽 기반 쇼피파이 플레이북',
        'hero-title': '쇼피파이 글로벌 확장',
        'hero-desc': '글로벌 시장에 진출하려는 브랜드를 위한 전략, 스토어 세팅, 앱, 현지화, 성장 지원.',
        'hero-note': '크몽 기준 시작가는 ₩220,000이며, 본 페이지는 2배 마크업 후 약 $315부터 시작합니다.',
        'hero-cta': '패키지 보기',
        'hero-secondary': 'FAQ 보기',
        'stat-1-value': '5',
        'stat-1-label': '확장 경로',
        'stat-2-value': '24h',
        'stat-2-label': '빠른 응답',
        'stat-3-value': '1:1',
        'stat-3-label': '컨설팅',
        'stat-4-value': 'Global',
        'stat-4-label': '글로벌 중심',
        'section-title': '쇼피파이 패키지를 선택하세요',
        'section-subtitle': '현재 스토어 상태와 시장 진출 목표에 맞는 단계를 고르세요.',
        'card-title': '쇼피파이 글로벌 확장',
        'card-desc': '스토어 구조, 현지화, 성장 방향이 필요한 셀러를 위한 글로벌 쇼피파이 전략 서비스입니다.',
        'card-btn': '가격 보기',
        'why-title': '받게 되는 것',
        'why-subtitle': '단순 체크리스트가 아닌, 바로 실행 가능한 실전 플랜에 초점을 맞춥니다.',
        'why-1': '시장 적합성과 포지셔닝 가이드',
        'why-2': '스토어, 테마, 앱, 결제 설정 지원',
        'why-3': '현지화, SEO, 런치 실행 로드맵',
        'packages-title': '패키지',
        'packages-subtitle': '가격은 USD 기준이며, 한국어 페이지에서는 환산 KRW가 표시됩니다.',
        'faq-title': '자주 묻는 질문',
        'faq-subtitle': '서비스, 가격, 결제 흐름에 대한 빠른 답변입니다.',
        'faq-q1': '이 서비스는 누구를 위한 건가요?',
        'faq-a1': '해외 시장용 쇼피파이 스토어를 런칭하거나 개선하려는 셀러, 창업자, 에이전시를 위한 서비스입니다.',
        'faq-q2': '크몽 원본 가격은 얼마였나요?',
        'faq-a2': '참조한 크몽 쇼피파이 컨설팅 서비스는 ₩220,000부터 시작하며, 본 페이지는 AIBible 기준 2배 마크업을 적용했습니다.',
        'faq-q3': '테스트 결제는 어떻게 하나요?',
        'faq-a3': '결제 모달의 보이는 총액을 클릭하면 샌드박스 방식의 테스트 체크아웃과 영수증 생성이 실행됩니다.',
        'faq-q4': '어떤 정보를 준비하면 좋나요?',
        'faq-a4': '타깃 시장, 스토어 URL, 제품 정보, 현재 매출 또는 트래픽 노트를 준비하시면 좋습니다.',
        'orders-title': '내 주문 내역',
        'orders-subtitle': '성공한 주문은 이 브라우저에 로컬로 저장됩니다.',
        'th-date': '주문일',
        'th-order-id': '거래 ID',
        'th-product': '상품',
        'th-tier': '패키지',
        'th-market': '타깃 시장',
        'th-qty': '수량',
        'th-total': '총 결제액',
        'th-status': '상태',
        'no-orders': '아직 주문 내역이 없습니다. 결제를 완료하면 여기에서 영수증 기록을 볼 수 있습니다.',
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
        'modal-total-hint': '총액을 클릭하면 샌드박스 테스트 결제가 실행됩니다',
        'badge-ssl': 'SSL 보안 결제',
        'badge-paypal': 'PayPal 인증',
        'footer-note': '글로벌 셀러를 위한 쇼피파이 컨설팅, 세팅, 런치 지원.',
        'footer-copy': '&copy; 2026 BibleForAI SHOPGLOBAL. All rights reserved.'
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
        ? 'BibleForAI - SHOPGLOBAL | 쇼피파이 글로벌 확장'
        : 'BibleForAI - SHOPGLOBAL | Shopify Global Expansion';

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.content = currentLang === 'ko'
            ? '크몽에서 검증된 쇼피파이 해외 진출 컨설팅을 기반으로, 글로벌 확장 전략과 스토어 세팅을 제공합니다.'
            : 'Shopify global expansion consulting for international sellers, based on a Kmong-sourced service playbook.';
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
    const container = document.getElementById('shopglobal-packages');
    if (!container) return;
    const isKo = currentLang === 'ko';
    const category = packageCatalog.shopglobal;

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
            <button class="btn-buy" onclick="openPurchaseModal('shopglobal', '${pkg.id}')">
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
        case 'shopglobal': return 'fa-brands fa-shopify';
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
        `SERVICE: SHOPGLOBAL`,
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
        '===================================',
    ].join('\n');
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
