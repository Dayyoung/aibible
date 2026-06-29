// App State
let currentView = 'home';
let currentPackage = null;
let orderQuantity = 1;
let paypalButtonInstance = null;

// Package Catalog with Localized Keys
const packageCatalog = {
    pitch: {
        title_en: 'Pitch Deck & Presentation Design',
        title_ko: '피치덱 & 프레젠테이션 디자인',
        packages: [
            { id: 'pitch-starter', name_en: 'Starter (Up to 10 Slides)', name_ko: '스타터 (최대 10슬라이드)', desc_en: 'Professional presentation for startups and small businesses. Up to 10 slides with AI-generated layouts, custom branding, and data visualization.', desc_ko: '스타트업과 소규모 비즈니스를 위한 전문 프레젠테이션. AI 생성 레이아웃, 맞춤형 브랜딩, 데이터 시각화가 포함된 최대 10슬라이드.', price: 49, featured: false, features_en: ['Up to 10 Slides', 'AI Layout Generation', 'Custom Branding', 'Basic Charts & Graphs', 'PPTX + PDF Formats', '72h Delivery'], features_ko: ['최대 10슬라이드', 'AI 레이아웃 생성', '맞춤형 브랜딩', '기본 차트 & 그래프', 'PPTX + PDF 포맷', '72시간 내 전달'] },
            { id: 'pitch-growth', name_en: 'Growth (Up to 20 Slides)', name_ko: '그로스 (최대 20슬라이드)', desc_en: 'Investor-ready pitch deck for growing companies. Up to 20 slides with strategic storytelling, advanced data visualization, and investor narrative consulting.', desc_ko: '성장 기업을 위한 투자자용 피치덱. 전략적 스토리텔링, 고급 데이터 시각화, 투자자 내러티브 컨설팅이 포함된 최대 20슬라이드.', price: 149, featured: true, features_en: ['Up to 20 Slides', 'Strategic Storytelling', 'Advanced Data Viz', 'Investor Narrative', 'Google Slides + PPTX', '48h Express Delivery', '2 Revision Rounds'], features_ko: ['최대 20슬라이드', '전략적 스토리텔링', '고급 데이터 시각화', '투자자 내러티브', 'Google Slides + PPTX', '48시간 익스프레스 전달', '2회 수정 포함'] },
            { id: 'pitch-enterprise', name_en: 'Enterprise (Up to 40 Slides)', name_ko: '엔터프라이즈 (최대 40슬라이드)', desc_en: 'Full corporate presentation suite. Up to 40 slides with master template, animation, interactive elements, and dedicated presentation designer for full deck ownership.', desc_ko: '완전한 기업용 프레젠테이션 스위트. 마스터 템플릿, 애니메이션, 인터랙티브 요소, 전담 디자이너가 포함된 최대 40슬라이드.', price: 349, featured: false, features_en: ['Up to 40 Slides', 'Master Slide Template', 'Animations & Transitions', 'Interactive Elements', 'Keynote + All Formats', 'Dedicated Designer', 'Unlimited Revisions'], features_ko: ['최대 40슬라이드', '마스터 슬라이드 템플릿', '애니메이션 & 트랜지션', '인터랙티브 요소', 'Keynote + 전체 포맷', '전담 디자이너', '무제한 수정'] }
        ]
    }
};

// Translation Dictionary
const translations = {
    en: {
        "logo-subtitle": "PITCH DECKS",
        "nav-home": "Home",
        "nav-pitch": "Packages",
        "btn-orders": "My Orders",
        "hero-badge": "AI-Powered Presentations",
        "hero-title": "BibleForAI - PITCHBOOST!",
        "hero-desc": "Professional AI-powered presentation and pitch deck design. Win clients and investors with stunning decks, company profiles, and business proposals.",
        "btn-explore": "Explore Packages",
        "btn-compliance": "How It Works",
        
        "stat-decks": "Decks Designed",
        "stat-satisfaction": "Client Satisfaction",
        "stat-funding": "Funding Raised",
        "stat-delivery": "Delivery Time",
        
        "sec-channels-title": "Choose Your Presentation Package",
        "sec-channels-subtitle": "From basic pitch decks to full investor-ready presentations. AI-powered design with expert human polish for every slide.",
        "card-pitch-title": "Pitch Deck & Presentation Design",
        "card-pitch-desc": "Professional AI-powered pitch decks, investor presentations, company profiles, and business proposals. Stunning design with data visualization and strategic storytelling.",
        "card-view-pricing": "View Pricing",
        
        "comp-title": "AI + Expert Design That Wins Clients",
        "comp-desc": "Our presentation design system combines AI layout engines with professional designers to create decks that captivate audiences, communicate clearly, and close deals.",
        "comp-bullet1-bold": "AI Layout Generation:",
        "comp-bullet1-text": "AI-powered layout engines create optimized slide designs, data visualizations, and typography pairings in seconds.",
        "comp-bullet2-bold": "Human Designer Polish:",
        "comp-bullet2-text": "Every deck is refined by expert presentation designers for visual impact, brand consistency, and persuasive storytelling.",
        "comp-bullet3-bold": "Multi-Format Delivery:",
        "comp-bullet3-text": "Fully editable PowerPoint (PPTX), Google Slides, and PDF. Enterprise includes Keynote and master slide templates.",
        
        "view-pitch-sub": "Professional AI-powered pitch deck and presentation design packages. From startup investor decks to full corporate presentations with dedicated designer support.",
        "view-orders-title": "My Purchase History",
        "view-orders-sub": "Review your successful orders. Your data is stored locally in your browser workspace.",
        
        "th-date": "Order Date",
        "th-order-id": "Transaction ID",
        "th-product": "Product",
        "th-tier": "Package Tier",
        "th-deck-type": "Deck Type",
        "th-qty": "Quantity",
        "th-total": "Total Paid",
        "th-status": "Status",
        
        "no-orders-msg": "No purchase records found. Make your first order to see history here!",
        
        "modal-title": "Configure Order",
        "modal-desc": "Select your deck type and complete secure PayPal payment.",
        "modal-base-pkg": "Base Package:",
        "modal-base-price-label": "Base Price:",
        "modal-email-label": "Email Address *",
        "modal-email-placeholder": "name@example.com",
        "modal-email-error": "Please enter a valid email address.",
        "modal-deck-label": "Deck Type:",
        "modal-qty": "Quantity:",
        "modal-total-amt": "Total Amount:",
        "modal-test-btn": "Click price to test checkout",
        
        "badge-ssl": "SSL Secured Checkout",
        "badge-paypal": "PayPal Verified",
        
        "foot-channels": "Packages",
        "foot-legal": "Our Technology",
        "foot-gdpr": "AI Layout Generation",
        "foot-canspam": "Human Designer Polish",
        "foot-match": "Multi-Format Delivery",
        "foot-contact": "Contact support: snsherocom@gmail.com",
        "foot-copy": "&copy; 2026 BibleForAI PITCHBOOST. All rights reserved. AI-powered pitch deck & presentation design.",
        
        "order-button": "Order Package",
        "featured-badge": "Best Seller",
        
        // Receipts
        "receipt-header": "BIBLEFORAI - PITCHBOOST RECEIPT",
        "receipt-date": "Order Date",
        "receipt-txid": "Transaction ID",
        "receipt-email": "Customer Email",
        "receipt-type": "Product Type",
        "receipt-size": "Package Tier",
        "receipt-deck": "Deck Type",
        "receipt-qty": "Quantity",
        "receipt-baseprice": "Base Price",
        "receipt-total": "Total Paid",
        "receipt-status": "Status",
        "receipt-method": "Payment Method",
        "receipt-method-val": "PayPal Secure Checkout"
    },
    ko: {
        "logo-subtitle": "피치 덱",
        "nav-home": "홈",
        "nav-pitch": "패키지",
        "btn-orders": "내 주문 내역",
        "hero-badge": "AI 기반 프레젠테이션",
        "hero-title": "BibleForAI - PITCHBOOST!",
        "hero-desc": "전문 AI 기반 프레젠테이션 및 피치덱 디자인. 멋진 덱, 회사 소개서, 비즈니스 제안서로 고객과 투자자의 마음을 사로잡으세요.",
        "btn-explore": "패키지 둘러보기",
        "btn-compliance": "작동 방식",
        
        "stat-decks": "제작된 덱",
        "stat-satisfaction": "고객 만족도",
        "stat-funding": "투자 유치액",
        "stat-delivery": "제작 기간",
        
        "sec-channels-title": "프레젠테이션 패키지 선택",
        "sec-channels-subtitle": "기본 피치덱부터 투자자용 완성 프레젠테이션까지. AI 기반 디자인과 전문가의 폴리시가 더해진 모든 슬라이드.",
        "card-pitch-title": "피치덱 & 프레젠테이션 디자인",
        "card-pitch-desc": "전문 AI 기반 피치덱, 투자자 프레젠테이션, 회사 소개서, 비즈니스 제안서. 데이터 시각화와 전략적 스토리텔링이 돋보이는 멋진 디자인.",
        "card-view-pricing": "가격 확인하기",
        
        "comp-title": "고객을 사로잡는 AI + 전문가 디자인",
        "comp-desc": "당사의 프레젠테이션 디자인 시스템은 AI 레이아웃 엔진과 전문 디자이너를 결합하여 청중을 사로잡고, 명확하게 소통하며, 거래를 성사시키는 덱을 제작합니다.",
        "comp-bullet1-bold": "AI 레이아웃 생성:",
        "comp-bullet1-text": "AI 기반 레이아웃 엔진이 최적화된 슬라이드 디자인, 데이터 시각화, 타이포그래피 조합을 수 초 내에 생성합니다.",
        "comp-bullet2-bold": "디자이너 폴리시:",
        "comp-bullet2-text": "모든 덱은 시각적 임팩트, 브랜드 일관성, 설득력 있는 스토리텔링을 위해 전문 프레젠테이션 디자이너가 다듬습니다.",
        "comp-bullet3-bold": "멀티 포맷 전달:",
        "comp-bullet3-text": "완전 편집 가능한 PowerPoint(PPTX), Google Slides, PDF. 엔터프라이즈는 Keynote와 마스터 슬라이드 템플릿을 포함합니다.",
        
        "view-pitch-sub": "전문 AI 기반 피치덱 및 프레젠테이션 디자인 패키지. 스타트업 투자자 덱부터 전담 디자이너가 지원하는 완전한 기업용 프레젠테이션까지.",
        "view-orders-title": "내 구매 히스토리",
        "view-orders-sub": "성공한 주문 내역을 검토하세요. 데이터는 브라우저 로컬스토리지에 안전하게 보관됩니다.",
        
        "th-date": "주문 날짜",
        "th-order-id": "트랜잭션 ID",
        "th-product": "상품명",
        "th-tier": "패키지 등급",
        "th-deck-type": "덱 유형",
        "th-qty": "수량",
        "th-total": "총 결제금액",
        "th-status": "상태",
        
        "no-orders-msg": "구매 기록이 없습니다. 첫 주문을 완료하시면 내역이 여기에 표시됩니다!",
        
        "modal-title": "주문 구성",
        "modal-desc": "덱 유형을 선택하고 안전한 PayPal 결제를 진행하세요.",
        "modal-base-pkg": "기본 패키지:",
        "modal-base-price-label": "기본 가격:",
        "modal-email-label": "이메일 주소 *",
        "modal-email-placeholder": "name@example.com",
        "modal-email-error": "올바른 이메일 주소를 입력해주세요.",
        "modal-deck-label": "덱 유형:",
        "modal-qty": "수량:",
        "modal-total-amt": "총 결제금액:",
        "modal-test-btn": "가격 텍스트를 눌러 테스트 결제",
        
        "badge-ssl": "SSL 보안 결제 지원",
        "badge-paypal": "PayPal 인증됨",
        
        "foot-channels": "패키지",
        "foot-legal": "우리의 기술",
        "foot-gdpr": "AI 레이아웃 생성",
        "foot-canspam": "디자이너 폴리시",
        "foot-match": "멀티 포맷 전달",
        "foot-contact": "문의 지원: snsherocom@gmail.com",
        "foot-copy": "&copy; 2026 BibleForAI PITCHBOOST. All rights reserved. AI 기반 피치덱 & 프레젠테이션 디자인.",
        
        "order-button": "패키지 주문하기",
        "featured-badge": "베스트 셀러",
        
        // Receipts
        "receipt-header": "BIBLEFORAI - PITCHBOOST 영수증",
        "receipt-date": "주문 날짜",
        "receipt-txid": "거래 ID",
        "receipt-email": "고객 이메일",
        "receipt-type": "상품 종류",
        "receipt-size": "패키지 크기",
        "receipt-deck": "덱 유형",
        "receipt-qty": "수량",
        "receipt-baseprice": "기본 가격",
        "receipt-total": "총 결제금액",
        "receipt-status": "진행 상태",
        "receipt-method": "결제 방법",
        "receipt-method-val": "PayPal 안전 결제"
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
    } else {
        const formatted = (usdPrice % 1 === 0) ? usdPrice.toLocaleString() : usdPrice.toFixed(2);
        return includeUnit ? `$${formatted} USD` : `$${formatted}`;
    }
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
    
    document.title = isKo ? "BibleForAI - PITCHBOOST | AI 프레젠테이션 & 피치덱 디자인" : "BibleForAI - PITCHBOOST | AI-Powered Presentation & Pitch Deck Design";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.content = isKo ? 
            "전문 AI 기반 프레젠테이션 및 피치덱 디자인 서비스. 멋진 투자자 덱, 회사 소개서, 비즈니스 제안서로 고객을 사로잡으세요." : 
            "Professional AI-powered presentation and pitch deck design services. Win clients with stunning investor decks, company profiles, and business proposals crafted by AI and expert designers.";
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.content = isKo ? "BibleForAI - PITCHBOOST | AI 프레젠테이션 디자인" : "BibleForAI - PITCHBOOST | AI-Powered Presentation Design";
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.content = isKo ? "전문 AI 기반 프레젠테이션 및 피치덱 디자인. 고객을 사로잡는 덱과 제안서." : "Professional AI-powered presentation and pitch deck design. Win clients with stunning decks and proposals.";
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.content = isKo ? "BibleForAI - PITCHBOOST | AI 프레젠테이션 디자인" : "BibleForAI - PITCHBOOST | AI-Powered Presentation Design";
    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) twDesc.content = isKo ? "전문 AI 기반 프레젠테이션 및 피치덱 디자인. 고객을 사로잡는 덱과 제안서." : "Professional AI-powered presentation and pitch deck design. Win clients with stunning decks and proposals.";

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

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    applyTranslations();
    renderAllPackages();
    renderOrders();
    setupHeaderScroll();
});

function setupHeaderScroll() {
    const header = document.getElementById('app-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
    });
}

function navigate(viewId) {
    currentView = viewId;
    document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
    const activeSection = document.getElementById(`${viewId}-view`);
    if (activeSection) activeSection.classList.add('active');
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.id === `nav-${viewId}`) link.classList.add('active');
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleMobileMenu() {
    const drawer = document.getElementById('mobile-drawer');
    drawer.classList.toggle('active');
}

function renderAllPackages() {
    const isKo = currentLang === 'ko';
    Object.keys(packageCatalog).forEach(categoryKey => {
        const categoryData = packageCatalog[categoryKey];
        const container = document.getElementById(`${categoryKey}-packages`);
        if (!container) return;

        container.innerHTML = categoryData.packages.map(pkg => {
            const featuredClass = pkg.featured ? 'featured' : '';
            const name = isKo ? pkg.name_ko : pkg.name_en;
            const desc = isKo ? pkg.desc_ko : pkg.desc_en;
            const features = isKo ? pkg.features_ko : pkg.features_en;
            const btnText = translations[currentLang]['order-button'] || 'Order Package';
            
            return `
                <div class="package-card ${featuredClass}">
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
                        <i class="fa-solid fa-chart-line"></i> ${btnText}
                    </button>
                </div>
            `;
        }).join('');
    });
}

function getCategoryIcon(category) {
    return 'fa-solid fa-chart-line';
}

function openPurchaseModal(categoryKey, packageId) {
    const category = packageCatalog[categoryKey];
    const pkg = category.packages.find(p => p.id === packageId);
    if (!pkg) return;
    
    const isKo = currentLang === 'ko';
    const catTitle = isKo ? category.title_ko : category.title_en;
    const pkgName = isKo ? pkg.name_ko : pkg.name_en;
    
    currentPackage = { categoryKey, categoryName: catTitle, tierName: pkgName, basePrice: pkg.price };
    orderQuantity = 1;
    
    document.getElementById('modal-product-title').innerText = catTitle;
    document.getElementById('modal-package-name').innerText = pkgName;
    document.getElementById('modal-base-price').innerText = formatPrice(pkg.price);
    document.getElementById('order-quantity').value = orderQuantity;
    
    const emailInput = document.getElementById('order-email');
    if (emailInput) { emailInput.value = ''; emailInput.style.borderColor = 'var(--border)'; }
    const emailError = document.getElementById('email-error');
    if (emailError) emailError.style.display = 'none';
    
    const testBtn = document.getElementById('paypal-test-button');
    if (testBtn) testBtn.style.display = 'block';
    
    updateModalPrice();
    document.getElementById('purchase-modal').classList.add('active');
    
    setTimeout(() => {
        const modalCard = document.querySelector('.modal-card');
        const totalBox = document.querySelector('.total-price-box');
        if (modalCard && totalBox) modalCard.scrollTop = totalBox.offsetTop - 10;
    }, 800);
    
    renderPayPalButton();
}

function closeModal() {
    document.getElementById('purchase-modal').classList.remove('active');
    if (paypalButtonInstance) paypalButtonInstance.close();
    paypalButtonInstance = null;
}

function updateModalPrice() {
    orderQuantity = parseInt(document.getElementById('order-quantity').value) || 1;
    if (orderQuantity < 1) { orderQuantity = 1; document.getElementById('order-quantity').value = 1; }
    const total = currentPackage ? currentPackage.basePrice * orderQuantity : 0;
    document.getElementById('modal-total-price').innerText = formatPrice(total);
}

function adjustQty(delta) {
    orderQuantity = Math.max(1, orderQuantity + delta);
    document.getElementById('order-quantity').value = orderQuantity;
    updateModalPrice();
}

function renderPayPalButton() {
    const container = document.getElementById('paypal-button-container');
    if (!container || !currentPackage) return;
    container.innerHTML = '';
    if (paypalButtonInstance) { paypalButtonInstance.close(); paypalButtonInstance = null; }
    
    const total = currentPackage.basePrice * orderQuantity;
    const deckType = document.getElementById('order-deck') ? document.getElementById('order-deck').value : 'Custom';
    
    paypal.Buttons({
        style: { layout: 'vertical', color: 'gold', shape: 'rect', label: 'paypal' },
        createOrder: (data, actions) => {
            return actions.order.create({
                purchase_units: [{
                    amount: { value: total.toFixed(2) },
                    description: `${currentPackage.tierName} - ${deckType}`
                }]
            });
        },
        onApprove: (data, actions) => {
            return actions.order.capture().then(details => {
                const email = document.getElementById('order-email').value;
                const order = {
                    date: new Date().toISOString(),
                    txid: details.id,
                    email: email,
                    product: currentPackage.categoryName,
                    tier: currentPackage.tierName,
                    deckType: deckType,
                    qty: orderQuantity,
                    basePrice: currentPackage.basePrice,
                    total: total,
                    status: 'Completed',
                    method: 'PayPal'
                };
                saveOrder(order);
                closeModal();
                navigate('orders');
                redirectToGoogleForm(order);
            });
        },
        onError: (err) => { console.error('PayPal Error:', err); }
    }).render(container).then(instance => { paypalButtonInstance = instance; });
}

function saveOrder(order) {
    const orders = JSON.parse(localStorage.getItem('pitchboost_orders') || '[]');
    orders.unshift(order);
    localStorage.setItem('pitchboost_orders', JSON.stringify(orders));
}

function renderOrders() {
    const tbody = document.getElementById('orders-tbody');
    const noOrders = document.getElementById('no-orders-msg');
    if (!tbody) return;
    const orders = JSON.parse(localStorage.getItem('pitchboost_orders') || '[]');
    
    if (orders.length === 0) {
        if (noOrders) noOrders.style.display = 'block';
        tbody.innerHTML = '';
        return;
    }
    if (noOrders) noOrders.style.display = 'none';
    
    const isKo = currentLang === 'ko';
    tbody.innerHTML = orders.map(o => `
        <tr>
            <td>${new Date(o.date).toLocaleDateString()}</td>
            <td><code>${(o.txid || '').slice(0, 16)}...</code></td>
            <td>${o.product || '-'}</td>
            <td>${o.tier || '-'}</td>
            <td>${o.deckType || '-'}</td>
            <td>${o.qty || 1}</td>
            <td><strong>${o.total}</strong></td>
            <td><span class="status-badge status-ok">${o.status || 'Completed'}</span></td>
        </tr>
    `).join('');
}

function triggerTestCheckout() {
    if (!currentPackage) return;
    // Auto-fill mock email if field is empty
    const emailInput = document.getElementById('order-email');
    if (emailInput && !emailInput.value.trim()) {
        emailInput.value = 'sandbox@test.dev';
        const err = document.getElementById('email-error');
        if (err) err.style.display = 'none';
    }
    const email = document.getElementById('order-email').value;
    if (!email || !email.includes('@')) {
        const err = document.getElementById('email-error');
        if (err) err.style.display = 'block';
        return;
    }
    const total = currentPackage.basePrice * orderQuantity;
    const txid = 'TEST-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    const deckType = document.getElementById('order-deck') ? document.getElementById('order-deck').value : 'Custom';
    const order = {
        date: new Date().toISOString(),
        txid: txid,
        email: email,
        product: currentPackage.categoryName,
        tier: currentPackage.tierName,
        deckType: deckType,
        qty: orderQuantity,
        basePrice: currentPackage.basePrice,
        total: total,
        status: 'Test Completed',
        method: 'Sandbox'
    };
    saveOrder(order);
    closeModal();
    navigate('orders');
    redirectToGoogleForm(order);
}

function redirectToGoogleForm(order) {
    const isKo = currentLang === 'ko';
    const dict = translations[currentLang];
    const receiptText = 
`===================================
   ${dict["receipt-header"]}
===================================
${dict["receipt-date"].padEnd(15)} : ${order.date}
${dict["receipt-txid"].padEnd(15)} : ${order.txid}
${dict["receipt-email"].padEnd(15)} : ${order.email}
${dict["receipt-type"].padEnd(15)} : ${order.product}
${dict["receipt-size"].padEnd(15)} : ${order.tier}
${dict["receipt-deck"].padEnd(15)} : ${order.deckType}
${dict["receipt-qty"].padEnd(15)} : ${order.qty}
${dict["receipt-baseprice"].padEnd(15)} : ${formatPrice(order.basePrice)}
${dict["receipt-total"].padEnd(15)} : ${formatPrice(order.total)}
${dict["receipt-status"].padEnd(15)} : ${isKo ? "완료됨" : order.status}
-----------------------------------
${dict["receipt-method"].padEnd(15)} : ${dict["receipt-method-val"]}
===================================`;
    const encodedReceipt = encodeURIComponent(receiptText);
    const url = `https://docs.google.com/forms/d/e/1FAIpQLScMPqbEWWttS5mb1m_krsO_kco24ImpgvYVSbc7zO0nEVmYFw/viewform?entry.1059822061=${encodedReceipt}`;
    setTimeout(() => { window.open(url, '_blank'); }, 500);
}

// Expose variables globally to prevent ReferenceErrors in inline HTML scripts/handlers
if (typeof navigate !== 'undefined') { window.navigate = navigate; }
if (typeof currentLang !== 'undefined') { window.currentLang = currentLang; }

window.openPurchaseModal = openPurchaseModal;
window.closeModal = closeModal;
window.adjustQty = adjustQty;
window.changeLanguage = changeLanguage;
