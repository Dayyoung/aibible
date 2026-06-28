// EVENTBOOST app state
let currentView = 'home';
let currentPackage = null;
let orderQuantity = 1;
let paypalButtonInstance = null;
const storageKey = 'eventboost_orders';

const packageCatalog = {
    basic: {
        title_en: 'Event MC Starter',
        title_ko: '이벤트 MC 스타터',
        packages: [
            {
                id: 'basic-opening',
                name_en: 'Opening Remarks Package',
                name_ko: '오프닝 멘트 패키지',
                desc_en: 'Opening remarks, stage cues, and polished hosting for small product launches and webinars.',
                desc_ko: '오프닝 멘트, 무대 큐, 소규모 런칭과 웨비나를 위한 깔끔한 진행을 제공합니다.',
                price: 300,
                featured: false,
                features_en: ['Opening Script', 'Stage Cue Sheet', 'Rehearsal Notes', 'Bilingual Greeting Lines'],
                features_ko: ['오프닝 스크립트', '무대 큐 시트', '리허설 노트', '이중언어 오프닝 문구']
            },
            {
                id: 'basic-runofshow',
                name_en: 'Run-of-Show Polish',
                name_ko: '런오브쇼 정리',
                desc_en: 'A clean run-of-show, speaker order, and timing notes for a smooth live event.',
                desc_ko: '원활한 행사 진행을 위한 런오브쇼, 발표자 순서, 타이밍 노트를 제공합니다.',
                price: 420,
                featured: true,
                features_en: ['Run-of-Show Draft', 'Speaker Order', 'Timing Notes', 'Sponsor Mentions'],
                features_ko: ['런오브쇼 초안', '발표자 순서', '타이밍 노트', '스폰서 멘트']
            }
        ]
    },
    pro: {
        title_en: 'Bilingual MC + Interpretation',
        title_ko: '한영 MC + 통역',
        packages: [
            {
                id: 'pro-mc',
                name_en: 'Conference MC Session',
                name_ko: '컨퍼런스 MC 세션',
                desc_en: 'Bilingual MC support, consecutive interpretation, and Q&A moderation for conferences and panels.',
                desc_ko: '국제행사, 패널, 컨퍼런스에서 영어/한국어 진행과 순차 통역을 제공합니다.',
                price: 550,
                featured: false,
                features_en: ['Bilingual Hosting', 'Consecutive Interpretation', 'Q&A Moderation', 'Speaker Transitions'],
                features_ko: ['이중언어 진행', '순차 통역', 'Q&A 진행', '발표자 연결']
            },
            {
                id: 'pro-live',
                name_en: 'Live Event Relay',
                name_ko: '라이브 이벤트 릴레이',
                desc_en: 'Live event command, bilingual transitions, and on-stage coordination for high-stakes meetings.',
                desc_ko: '중요 회의와 무대 운영을 위한 현장 진행, 이중언어 전환, 무대 조율 서비스를 제공합니다.',
                price: 680,
                featured: true,
                features_en: ['Live Stage Command', 'Bilingual Transitions', 'On-stage Coordination', 'Rehearsal Support'],
                features_ko: ['현장 무대 진행', '이중언어 전환', '무대 조율', '리허설 지원']
            }
        ]
    },
    enterprise: {
        title_en: 'International Summit Coverage',
        title_ko: '국제 서밋 커버리지',
        packages: [
            {
                id: 'enterprise-halfday',
                name_en: 'Half-Day Summit Hosting',
                name_ko: '하프데이 서밋 진행',
                desc_en: 'Half-day summit hosting, sponsor mentions, bilingual transitions, and speaker coordination.',
                desc_ko: '서밋, 투자자 행사, 해외 바이어 미팅을 위한 하프데이 진행, 스폰서 멘트, 진행 조율을 제공합니다.',
                price: 1100,
                featured: true,
                features_en: ['Half-Day Coverage', 'Sponsor Mentions', 'Speaker Coordination', 'Venue Flow Control'],
                features_ko: ['하프데이 진행', '스폰서 멘트', '발표자 조율', '장소 동선 관리']
            }
        ]
    }
};

const translations = {
    en: {
        'logo-subtitle': 'EVENTBOOST!',
        'nav-home': 'Home',
        'nav-basic': 'Event MC Starter',
        'nav-pro': 'Bilingual MC + Interpretation',
        'nav-enterprise': 'Enterprise',
        'btn-orders': 'My Orders',
        'hero-badge': 'Global Event Orchestration',
        'hero-title': 'EVENTBOOST — Global Event MC & Interpretation!',
        'hero-desc': 'Host bilingual events, deliver polished scripts, and keep international audiences in sync.',
        'btn-explore': 'Explore Packages',
        'btn-how': 'How It Works',
        'stat-da': 'Live Events',
        'stat-dofollow': 'Bilingual MC',
        'stat-indexed': 'Languages Covered',
        'stat-delivery': 'Fast Turnaround',
        'sec-packages-title': 'Choose Your Event Package',
        'sec-packages-subtitle': 'From keynote hosting to bilingual interpretation. Every package includes a live consultation and an event run-of-show plan.',
        'card-basic-title': 'Event MC Starter',
        'card-basic-desc': 'Opening remarks, stage cues, and polished hosting for small product launches and webinars.',
        'card-pro-title': 'Bilingual MC + Interpretation',
        'card-pro-desc': 'Bilingual MC support, consecutive interpretation, and Q&A moderation for conferences and panels.',
        'card-enterprise-title': 'International Summit Coverage',
        'card-enterprise-desc': 'Half-day summit hosting, sponsor mentions, bilingual transitions, and speaker coordination.',
        'card-view-pricing': 'View Pricing',
        'how-title': 'How EVENTBOOST Works',
        'how-desc': 'We turn your event goals into a run-of-show plan: scripting, rehearsal, and polished bilingual delivery.',
        'how-step1-bold': '1. Briefing:',
        'how-step1-text': 'Tell us your event format, audience, and stage requirements.',
        'how-step2-bold': '2. Run-of-Show Prep:',
        'how-step2-text': 'We draft your event script, speaker order, and timing plan.',
        'how-step3-bold': '3. Rehearsal & Delivery:',
        'how-step3-text': 'We rehearse cues, transitions, and live bilingual delivery with expert feedback.',
        'how-step4-bold': '4. Handoff:',
        'how-step4-text': 'Get your finalized script, checklist, and next-step handoff materials.',
        'sec-industries-title': 'Who We <span>Help</span>',
        'view-basic-sub': 'Perfect for product launches, webinars, and smaller branded sessions that need polished hosting.',
        'view-pro-sub': 'Perfect for conferences, panels, and corporate sessions that need live bilingual support.',
        'view-enterprise-sub': 'Perfect for summits, investor days, and international events that need end-to-end coverage.',
        'view-orders-title': 'My Order History',
        'view-orders-sub': 'Review your completed event orders. Your data is stored locally in your browser workspace.',
        'th-date': 'Order Date',
        'th-order-id': 'Transaction ID',
        'th-product': 'Service',
        'th-tier': 'Package Tier',
        'th-target': 'Event Type / Audience',
        'th-qty': 'Quantity',
        'th-total': 'Total Paid',
        'th-status': 'Status',
        'no-orders-msg': 'No order records found. Make your first booking to see history here!',
        'modal-title': 'Configure Order',
        'modal-desc': 'Tell us your event details and complete secure PayPal payment.',
        'modal-base-pkg': 'Base Package:',
        'modal-base-price-label': 'Base Price:',
        'modal-email-label': 'Email Address *',
        'modal-email-placeholder': 'name@example.com',
        'modal-email-error': 'Please enter a valid email address.',
        'modal-keywords-label': 'Event Type / Audience:',
        'modal-keywords-placeholder': 'e.g. product launch in Singapore',
        'modal-qty': 'Quantity:',
        'modal-total-amt': 'Total Amount:',
        'badge-ssl': 'SSL Secured Checkout',
        'badge-paypal': 'PayPal Verified',
        'foot-packages': 'Event Packages',
        'foot-why': 'Why EVENTBOOST',
        'foot-da': 'Event MC',
        'foot-dofollow': 'Interpretation',
        'foot-native': 'Summit Coverage',
        'foot-contact': 'Contact support: snsherocom@gmail.com',
        'foot-copy': '&copy; 2026 BibleForAI EVENTBOOST. All rights reserved. Global event MC and interpretation services.',
        'order-button': 'Book Event Service',
        'featured-badge': 'Best Seller',
        'receipt-header': 'BIBLEFORAI - EVENTBOOST RECEIPT',
        'receipt-date': 'Order Date',
        'receipt-txid': 'Transaction ID',
        'receipt-email': 'Customer Email',
        'receipt-type': 'Service Type',
        'receipt-size': 'Package Size',
        'receipt-country': 'Event Type / Audience',
        'receipt-qty': 'Quantity',
        'receipt-baseprice': 'Base Price',
        'receipt-total': 'Total Paid',
        'receipt-status': 'Status',
        'receipt-method': 'Payment Method',
        'receipt-method-val': 'PayPal Secure Checkout'
    },
    ko: {
        'logo-subtitle': 'EVENTBOOST!',
        'nav-home': '홈',
        'nav-basic': '이벤트 MC 스타터',
        'nav-pro': '한영 MC + 통역',
        'nav-enterprise': '엔터프라이즈',
        'btn-orders': '내 주문 내역',
        'hero-badge': '글로벌 이벤트 오케스트레이션',
        'hero-title': 'EVENTBOOST — 글로벌 행사 MC·통역!',
        'hero-desc': '국제행사 진행, 영어 MC, 통역, 런오브쇼를 업그레이드하세요. 글로벌 이벤트를 안정적으로 완성하세요.',
        'btn-explore': '패키지 둘러보기',
        'btn-how': '이용 방법',
        'stat-da': '라이브 행사',
        'stat-dofollow': '한영 MC',
        'stat-indexed': '지원 언어',
        'stat-delivery': '빠른 준비',
        'sec-packages-title': '이벤트 패키지 선택하기',
        'sec-packages-subtitle': '키노트 진행부터 한영 통역까지. 모든 패키지에는 1:1 상담과 런오브쇼 피드백이 포함됩니다.',
        'card-basic-title': '이벤트 MC 스타터',
        'card-basic-desc': '오프닝 멘트, 무대 큐, 소규모 런칭과 웨비나를 위한 깔끔한 진행을 제공합니다.',
        'card-pro-title': '한영 MC + 통역',
        'card-pro-desc': '국제행사, 패널, 컨퍼런스에서 영어/한국어 진행과 순차 통역을 제공합니다.',
        'card-enterprise-title': '국제 서밋 커버리지',
        'card-enterprise-desc': '서밋, 투자자 행사, 해외 바이어 미팅을 위한 하프데이 진행, 스폰서 멘트, 진행 조율을 제공합니다.',
        'card-view-pricing': '가격 확인하기',
        'how-title': 'EVENTBOOST 이용 방법',
        'how-desc': '행사 목표를 실행 가능한 런오브쇼로 바꿔드립니다: 대본, 리허설, 그리고 완성도 높은 이중언어 진행.',
        'how-step1-bold': '1. 브리핑:',
        'how-step1-text': '행사 형식, 청중, 무대 요건을 알려주세요.',
        'how-step2-bold': '2. 런오브쇼 준비:',
        'how-step2-text': '행사 대본, 스피커 순서, 타이밍 플랜을 작성합니다.',
        'how-step3-bold': '3. 리허설 & 진행:',
        'how-step3-text': '큐 전환, 멘트 연결, 실전 이중언어 진행을 전문가 피드백과 함께 리허설합니다.',
        'how-step4-bold': '4. 인수인계:',
        'how-step4-text': '최종 대본, 체크리스트, 후속 운영 자료를 받으세요.',
        'sec-industries-title': '우리가 <span>도와드리는 분들</span>',
        'view-basic-sub': '제품 런칭, 웨비나, 소규모 브랜드 세션처럼 깔끔한 진행이 필요한 분들께 적합합니다.',
        'view-pro-sub': '컨퍼런스, 패널, 기업 세션처럼 현장 이중언어 지원이 필요한 분들께 적합합니다.',
        'view-enterprise-sub': '서밋, 투자자 행사, 국제행사처럼 전담 운영이 필요한 분들께 적합합니다.',
        'view-orders-title': '내 주문 히스토리',
        'view-orders-sub': '완료한 이벤트 주문 내역을 검토하세요. 데이터는 브라우저 로컬스토리지에 안전하게 보관됩니다.',
        'th-date': '주문 날짜',
        'th-order-id': '트랜잭션 ID',
        'th-product': '서비스',
        'th-tier': '패키지 등급',
        'th-target': '이벤트 유형 / 청중',
        'th-qty': '수량',
        'th-total': '총 결제금액',
        'th-status': '상태',
        'no-orders-msg': '주문 기록이 없습니다. 첫 주문을 완료하시면 내역이 여기에 표시됩니다!',
        'modal-title': '주문 설정',
        'modal-desc': '행사 세부사항을 입력하고 안전한 PayPal 결제를 진행하세요.',
        'modal-base-pkg': '기본 패키지:',
        'modal-base-price-label': '기본 가격:',
        'modal-email-label': '이메일 주소 *',
        'modal-email-placeholder': 'name@example.com',
        'modal-email-error': '올바른 이메일 주소를 입력해주세요.',
        'modal-keywords-label': '이벤트 유형 / 청중:',
        'modal-keywords-placeholder': '예: 싱가포르 제품 런칭',
        'modal-qty': '수량:',
        'modal-total-amt': '총 결제금액:',
        'badge-ssl': 'SSL 보안 결제 지원',
        'badge-paypal': 'PayPal 인증됨',
        'foot-packages': '이벤트 패키지',
        'foot-why': 'EVENTBOOST 특징',
        'foot-da': '이벤트 MC',
        'foot-dofollow': '통역',
        'foot-native': '서밋 커버리지',
        'foot-contact': '문의 지원: snsherocom@gmail.com',
        'foot-copy': '&copy; 2026 BibleForAI EVENTBOOST. All rights reserved. 글로벌 행사 MC·통역 서비스.',
        'order-button': '이벤트 서비스 예약',
        'featured-badge': '베스트 셀러',
        'receipt-header': 'BIBLEFORAI - EVENTBOOST 영수증',
        'receipt-date': '주문 날짜',
        'receipt-txid': '트랜잭션 ID',
        'receipt-email': '고객 이메일',
        'receipt-type': '서비스 종류',
        'receipt-size': '패키지 등급',
        'receipt-country': '이벤트 유형 / 청중',
        'receipt-qty': '수량',
        'receipt-baseprice': '기본 가격',
        'receipt-total': '총 결제금액',
        'receipt-status': '상태',
        'receipt-method': '결제 수단',
        'receipt-method-val': 'PayPal 보안 결제'
    }
};

let currentLang = (document.documentElement.lang || 'en').toLowerCase().startsWith('ko') ? 'ko' : 'en';

function getViewFromPath() {
    const p = window.location.pathname;
    return p.includes('/kr/') ? 'ko' : 'en';
}

function formatPrice(usdPrice, includeUnit = true) {
    const formatted = usdPrice % 1 === 0 ? usdPrice.toLocaleString() : usdPrice.toFixed(2);
    return includeUnit ? `$${formatted} USD` : `$${formatted}`;
}

function applyTranslations() {
    const dict = translations[currentLang];
    document.documentElement.lang = currentLang === 'ko' ? 'ko' : 'en';
    document.title = currentLang === 'ko'
        ? 'BibleForAI - EVENTBOOST | 글로벌 행사 MC·통역'
        : 'BibleForAI - EVENTBOOST | Global Event MC & Interpretation';

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.content = currentLang === 'ko'
        ? 'EVENTBOOST로 국제행사 진행, 영어 MC, 한영 통역, 런오브쇼를 업그레이드하세요. 런칭, 컨퍼런스, 서밋에 맞춘 글로벌 이벤트 솔루션.'
        : 'Host bilingual events, deliver polished scripts, and keep international audiences in sync.';

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.content = currentLang === 'ko'
        ? 'BibleForAI - EVENTBOOST | 글로벌 행사 MC·통역'
        : 'BibleForAI - EVENTBOOST | Global Event MC & Interpretation';
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.content = currentLang === 'ko'
        ? '국제행사 진행, 영어 MC, 통역, 런오브쇼를 한 번에 준비하세요. 글로벌 행사 경험을 안정적으로 완성합니다.'
        : 'Host bilingual events, deliver polished scripts, and keep international audiences in sync.';

    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.content = ogTitle ? ogTitle.content : document.title;
    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) twDesc.content = metaDesc ? metaDesc.content : '';

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const value = dict[key];
        if (value !== undefined) {
            if (key === 'sec-industries-title') el.innerHTML = value;
            else el.textContent = value;
        }
    });

    const selector = document.getElementById('language-selector');
    if (selector) selector.value = currentLang;
}

function toggleMobileMenu() {
    const drawer = document.getElementById('mobile-drawer');
    if (drawer) drawer.classList.toggle('active');
}

function changeLanguage(value) {
    const targetLang = value === 'ko' ? 'ko' : 'en';
    const target = targetLang === 'ko' ? '/eventboost/kr/' : '/eventboost/';
    if (window.location.pathname !== target) {
        window.location.href = target;
        return;
    }
    currentLang = targetLang;
    applyTranslations();
    renderCurrentView();
}

function setActiveNav(view) {
    ['nav-home', 'nav-basic', 'nav-pro', 'nav-enterprise'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.remove('active');
    });
    const map = { home: 'nav-home', basic: 'nav-basic', pro: 'nav-pro', enterprise: 'nav-enterprise' };
    const active = document.getElementById(map[view]);
    if (active) active.classList.add('active');
}

function navigate(view) {
    currentView = view;
    ['home-view', 'basic-view', 'pro-view', 'enterprise-view', 'orders-view'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.toggle('active', id === `${view}-view`);
    });
    setActiveNav(view);
    if (view !== 'home') renderPackages(view);
    if (view === 'orders') renderOrders();
    const drawer = document.getElementById('mobile-drawer');
    if (drawer) drawer.classList.remove('active');
}

function renderCurrentView() {
    navigate(currentView);
}

function renderPackages(group) {
    const cat = packageCatalog[group];
    if (!cat) return;
    const grid = document.getElementById(`${group}-packages`);
    if (!grid) return;
    const isKo = currentLang === 'ko';
    grid.innerHTML = cat.packages.map(pkg => {
        const title = isKo ? pkg.name_ko : pkg.name_en;
        const desc = isKo ? pkg.desc_ko : pkg.desc_en;
        const features = isKo ? pkg.features_ko : pkg.features_en;
        return `
            <div class="package-card${pkg.featured ? ' featured' : ''}">
                ${pkg.featured ? `<div class="featured-badge">${translations[currentLang]['featured-badge']}</div>` : ''}
                <h3>${title}</h3>
                <p class="package-desc">${desc}</p>
                <div class="package-price-box">
                    <span class="price">${formatPrice(pkg.price, false)}</span>
                    <span class="currency">USD</span>
                </div>
                <ul class="package-features">
                    ${features.map(f => `<li><i class="fa-solid fa-circle-check"></i> ${f}</li>`).join('')}
                </ul>
                <button class="btn-primary package-order-btn" onclick="openModal('${group}', '${pkg.id}')">${translations[currentLang]['order-button']}</button>
            </div>
        `;
    }).join('');
}

function openModal(group, packageId) {
    const cat = packageCatalog[group];
    const pkg = cat.packages.find(p => p.id === packageId);
    if (!pkg) return;
    currentPackage = { group, ...pkg };
    orderQuantity = 1;

    const isKo = currentLang === 'ko';
    document.getElementById('modal-product-title').innerText = isKo ? '주문 설정' : 'Configure Order';
    document.getElementById('modal-product-desc').innerText = isKo ? translations.ko['modal-desc'] : translations.en['modal-desc'];
    document.getElementById('modal-package-name').innerText = isKo ? pkg.name_ko : pkg.name_en;
    document.getElementById('modal-base-price').innerText = formatPrice(pkg.price);
    document.getElementById('order-quantity').value = 1;
    document.getElementById('order-market').value = '';
    const email = document.getElementById('order-email');
    if (email) email.value = '';
    const emailError = document.getElementById('email-error');
    if (emailError) emailError.style.display = 'none';

    const backdrop = document.getElementById('purchase-modal');
    if (backdrop) backdrop.classList.add('active');
    initPayPalButtons();
    updateModalPrice();
}

function closeModal() {
    const backdrop = document.getElementById('purchase-modal');
    if (backdrop) backdrop.classList.remove('active');
    const container = document.getElementById('paypal-button-container');
    if (container) container.innerHTML = '';
    paypalButtonInstance = null;
}

function adjustQty(amount) {
    const qtyInput = document.getElementById('order-quantity');
    if (!qtyInput) return;
    let value = parseInt(qtyInput.value, 10) || 1;
    value = Math.max(1, value + amount);
    qtyInput.value = value;
    orderQuantity = value;
    updateModalPrice();
}

function updateModalPrice() {
    const qtyInput = document.getElementById('order-quantity');
    const value = Math.max(1, parseInt(qtyInput?.value || '1', 10) || 1);
    orderQuantity = value;
    const total = currentPackage ? currentPackage.price * orderQuantity : 0;
    const totalEl = document.getElementById('modal-total-price');
    if (totalEl) totalEl.innerText = formatPrice(total);
}

function validateEmailField() {
    const emailInput = document.getElementById('order-email');
    const emailError = document.getElementById('email-error');
    if (!emailInput) return true;
    const email = emailInput.value.trim();
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!pattern.test(email)) {
        emailInput.style.borderColor = '#ef4444';
        if (emailError) emailError.style.display = 'block';
        return false;
    }
    emailInput.style.borderColor = 'var(--border)';
    if (emailError) emailError.style.display = 'none';
    return true;
}

function triggerTestCheckout() {
    const emailInput = document.getElementById('order-email');
    if (emailInput && !emailInput.value.trim()) {
        emailInput.value = 'sandbox@test.dev';
    }
    if (!validateEmailField()) return;
    saveLocalOrder({ id: `TEST-${Date.now()}`, isTest: true });
    closeModal();
}

function initPayPalButtons() {
    const container = document.getElementById('paypal-button-container');
    if (!container) return;
    if (typeof paypal === 'undefined') {
        container.innerHTML = '<p style="color:#ef4444;text-align:center;font-size:0.9rem;padding:1rem;font-weight:600;"><i class="fa-solid fa-triangle-exclamation"></i> PayPal system is currently unavailable. Please reload the page.</p>';
        return;
    }
    container.innerHTML = '';
    if (paypalButtonInstance && typeof paypalButtonInstance.close === 'function') {
        try { paypalButtonInstance.close(); } catch (_) {}
    }
    paypalButtonInstance = paypal.Buttons({
        style: { layout: 'vertical', color: 'blue', shape: 'rect', label: 'checkout' },
        onClick: function(data, actions) {
            if (!validateEmailField()) return actions.reject();
            return actions.resolve();
        },
        createOrder: function(data, actions) {
            const audience = document.getElementById('order-market')?.value?.trim() || 'Global';
            const total = (currentPackage.price * orderQuantity).toFixed(2);
            return actions.order.create({
                purchase_units: [{
                    description: `${currentPackage.title_en} - ${currentPackage.name_en} [Audience: ${audience}] (Qty: ${orderQuantity})`,
                    amount: { currency_code: 'USD', value: total }
                }]
            });
        },
        onApprove: function(data, actions) {
            return actions.order.capture().then(details => {
                saveLocalOrder({ id: details.id, isTest: false });
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
    const audience = document.getElementById('order-market')?.value?.trim() || 'Global';
    const email = document.getElementById('order-email')?.value?.trim() || '';
    const orders = JSON.parse(localStorage.getItem(storageKey) || '[]');
    const newOrder = {
        date: new Date().toLocaleString(currentLang === 'ko' ? 'ko-KR' : 'en-US', {
            year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
        }),
        id: details.id,
        email,
        category: currentPackage ? (currentLang === 'ko' ? packageCatalog[currentPackage.group].title_ko : packageCatalog[currentPackage.group].title_en) : '-',
        package: currentPackage ? (currentLang === 'ko' ? currentPackage.name_ko : currentPackage.name_en) : '-',
        country: audience,
        quantity: orderQuantity,
        basePrice: currentPackage ? currentPackage.price : 0,
        totalPaid: formatPrice((currentPackage ? currentPackage.price : 0) * orderQuantity),
        status: 'Completed'
    };
    orders.unshift(newOrder);
    localStorage.setItem(storageKey, JSON.stringify(orders));
    renderOrders();

    const dict = translations[currentLang];
    const receiptText = [
        '===================================',
        `   ${dict['receipt-header']}`,
        '===================================',
        `${dict['receipt-date'].padEnd(15)} : ${newOrder.date}`,
        `${dict['receipt-txid'].padEnd(15)} : ${newOrder.id}`,
        `${dict['receipt-email'].padEnd(15)} : ${newOrder.email}`,
        `${dict['receipt-type'].padEnd(15)} : ${newOrder.category}`,
        `${dict['receipt-size'].padEnd(15)} : ${newOrder.package}`,
        `${dict['receipt-country'].padEnd(15)} : ${newOrder.country}`,
        `${dict['receipt-qty'].padEnd(15)} : ${newOrder.quantity}`,
        `${dict['receipt-baseprice'].padEnd(15)} : ${formatPrice(newOrder.basePrice)}`,
        `${dict['receipt-total'].padEnd(15)} : ${newOrder.totalPaid}`,
        `${dict['receipt-status'].padEnd(15)} : ${newOrder.status}`,
        '-----------------------------------',
        `${dict['receipt-method'].padEnd(15)} : ${dict['receipt-method-val']}`,
        '==================================='
    ].join('\n');

    const encoded = encodeURIComponent(receiptText);
    window.location.href = `https://docs.google.com/forms/d/e/1FAIpQLScMPqbEWWttS5mb1m_krsO_kco24ImpgvYVSbc7zO0nEVmYFw/viewform?entry.1059822061=${encoded}`;
}

function renderOrders() {
    const tbody = document.getElementById('orders-tbody');
    const msg = document.getElementById('no-orders-msg');
    if (!tbody || !msg) return;
    const orders = JSON.parse(localStorage.getItem(storageKey) || '[]');
    if (orders.length === 0) {
        tbody.innerHTML = '';
        msg.style.display = 'block';
        return;
    }
    msg.style.display = 'none';
    tbody.innerHTML = orders.map(order => `
        <tr>
            <td>${order.date}</td>
            <td class="tx-id">${order.id}</td>
            <td>${order.category}</td>
            <td>${order.package}</td>
            <td>${order.country || 'Global'}</td>
            <td>${order.quantity}</td>
            <td><strong>${order.totalPaid}</strong></td>
            <td>${order.status}</td>
        </tr>
    `).join('');
}

function init() {
    currentLang = getViewFromPath();
    applyTranslations();
    renderCurrentView();
    const selector = document.getElementById('language-selector');
    if (selector) selector.value = currentLang;
}

document.addEventListener('DOMContentLoaded', init);
