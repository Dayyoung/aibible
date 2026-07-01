// App State
let currentView = 'home';
let currentPackage = null;
let orderQuantity = 1;
let paypalButtonInstance = null;

// Package Catalog with Localized Keys
const packageCatalog = {
    market: {
        title_en: 'Market Size & TAM Analysis',
        title_ko: '시장 규모 & TAM 분석',
        packages: [
            { id: 'market-starter', name_en: 'Starter (Market Snapshot)', name_ko: '스타터 (시장 현황)', desc_en: 'Quick overview of target market size, TAM/SAM/SOM estimates, and CAGR trends.', desc_ko: '타겟 시장 규모, TAM/SAM/SOM 추정치, CAGR 트렌드에 대한 빠른 개요.', price: 297, featured: false, features_en: ['Market Sizing (TAM/SAM/SOM)', 'CAGR Growth Forecast', 'Executive Summary PDF', '3 Business Days Delivery'], features_ko: ['시장 규모 추정 (TAM/SAM/SOM)', 'CAGR 성장 예측', '요약 보고서 PDF', '영업일 3일 내 전달'] }
        ]
    },
    competitor: {
        title_en: 'Competitive Intelligence',
        title_ko: '경쟁사 인텔리전스',
        packages: [
            { id: 'comp-professional', name_en: 'Professional (Deep Dive)', name_ko: '프로페셔널 (심층 분석)', desc_en: 'In-depth competitor benchmarking, business model analysis, and customer acquisition strategy breakdown.', desc_ko: '심층 경쟁사 벤치마킹, 비즈니스 모델 분석, 고객 확보 전략 분석.', price: 597, featured: true, features_en: ['Top 5 Competitor Profiling', 'Business Model Canvas', 'Marketing Channel Audit', 'SWOT Analysis Report', '7 Business Days Delivery'], features_ko: ['주요 5개 경쟁사 프로파일링', '비즈니스 모델 캔버스', '마케팅 채널 감사', 'SWOT 분석 보고서', '영업일 7일 내 전달'] }
        ]
    },
    industry: {
        title_en: 'Industry Trend Research',
        title_ko: '산업 트렌드 리서치',
        packages: [
            { id: 'industry-enterprise', name_en: 'Enterprise (Full Suite)', name_ko: '엔터프라이즈 (풀 스위트)', desc_en: 'Comprehensive market intelligence covering global trends, regulatory landscape, technology disruption, and consumer insights.', desc_ko: '글로벌 트렌드, 규제 환경, 기술 혁신, 소비자 인사이트를 아우르는 종합 시장 인텔리전스.', price: 1497, featured: false, features_en: ['Global Trend Analysis', 'Regulatory & Policy Review', 'Technology Disruption Map', 'Consumer Behavior Deep Dive', 'Actionable Strategy Playbook', '14 Business Days Delivery'], features_ko: ['글로벌 트렌드 분석', '규제 및 정책 검토', '기술 혁신 맵', '소비자 행동 심층 분석', '실행 가능한 전략 플레이북', '영업일 14일 내 전달'] }
        ]
    }
};

// Translation Dictionary
const translations = {
    en: {
        "logo-subtitle": "MARKET RESEARCH!",
        "nav-home": "Home",
        "nav-market": "Market Size",
        "nav-competitor": "Competitor Intel",
        "nav-industry": "Industry Trends",
        "btn-orders": "My Orders",
        "hero-badge": "AI-Powered Market Intelligence",
        "hero-title": "BibleForAI - MKBOOST!",
        "hero-desc": "Data-driven global market research and competitive intelligence for smarter business decisions.",
        "btn-explore": "Explore Research Services",
        "btn-compliance": "Our Methodology",
        
        "stat-global-numbers": "Markets Analyzed",
        "stat-accuracy-rate": "Data Accuracy",
        "stat-opt-in": "Cross-Verified Sources",
        "stat-delivery": "Delivery Time",
        
        "sec-channels-title": "Discover Our Market Research Services",
        "sec-channels-subtitle": "Gain actionable insights with AI-enhanced market intelligence, competitor benchmarking, and industry trend forecasting.",
        "card-market-title": "Market Size & TAM Analysis",
        "card-market-desc": "Quantify your target market with TAM/SAM/SOM sizing, CAGR projections, and macroeconomic trend assessments.",
        "card-competitor-title": "Competitive Intelligence",
        "card-competitor-desc": "Deep-dive competitor profiling, business model dissection, and marketing strategy audits to outpace rivals.",
        "card-industry-title": "Industry Trend Research",
        "card-industry-desc": "Global trend monitoring, regulatory landscape mapping, technology disruption analysis, and consumer behavior insights.",
        "card-view-pricing": "View Pricing",
        
        "comp-title": "Research Methodology & Quality Assurance",
        "comp-desc": "Our market intelligence system uses multi-source cross-verification, eliminating subjective bias and delivering data-driven actionable insights.",
        "comp-bullet1-bold": "Multi-Source Verification:",
        "comp-bullet1-text": "Cross-reference data from global databases, industry reports, government filings, and on-ground surveys.",
        "comp-bullet2-bold": "Objective Analysis:",
        "comp-bullet2-text": "Zero subjective forecasting — every insight is backed by verifiable data points and statistical models.",
        "comp-bullet3-bold": "Action-Ready Deliverables:",
        "comp-bullet3-text": "Reports include concrete action plans, not just data dumps. Ready for boardroom presentation.",
        
        "view-market-sub": "Quantify your addressable market with precision. Get TAM/SAM/SOM estimates, growth forecasts, and market entry assessments.",
        "view-competitor-sub": "Understand your competitive landscape. Comprehensive profiling, strategy audits, and benchmarking against industry leaders.",
        "view-industry-sub": "Stay ahead of disruption. Global trend monitoring, emerging technology mapping, and consumer behavior forecasting.",
        "view-orders-title": "My Purchase History",
        "view-orders-sub": "Review your successful orders. Your data is stored locally in your browser workspace.",
        
        "th-date": "Order Date",
        "th-order-id": "Transaction ID",
        "th-product": "Product",
        "th-tier": "Package Tier",
        "th-industry": "Target Industry",
        "th-qty": "Quantity",
        "th-total": "Total Paid",
        "th-status": "Status",
        
        "no-orders-msg": "No purchase records found. Make your first order to see history here!",
        
        "modal-title": "Configure Order",
        "modal-desc": "Select your target industry and complete secure PayPal payment.",
        "modal-base-pkg": "Base Package:",
        "modal-base-price-label": "Base Price:",
        "modal-email-label": "Email Address *",
        "modal-email-placeholder": "name@example.com",
        "modal-email-error": "Please enter a valid email address.",
        "modal-industry-label": "Target Industry:",
        "modal-qty": "Quantity:",
        "modal-total-amt": "Total Amount:",
        "modal-test-btn": "Click price to payment checkout",
        
        "badge-ssl": "SSL Secured Checkout",
        "badge-paypal": "PayPal Verified",
        
        "foot-channels": "Research Services",
        "foot-legal": "Methodology & Quality",
        "foot-gdpr": "Multi-Source Data Verification",
        "foot-canspam": "Statistical Model Validation",
        "foot-match": "99% Cross-Verified Accuracy",
        "foot-contact": "Contact support: snsherocom@gmail.com",
        "foot-copy": "&copy; 2026 BibleForAI MKBOOST. All rights reserved. Global Market Research & Competitive Intelligence.",
        
        "order-button": "Order Package",
        "featured-badge": "Best Seller",
        
        // Receipts
        "receipt-header": "BIBLEFORAI - MKBOOST RECEIPT",
        "receipt-date": "Order Date",
        "receipt-txid": "Transaction ID",
        "receipt-email": "Customer Email",
        "receipt-type": "Product Type",
        "receipt-size": "Package Size",
        "receipt-industry": "Target Industry",
        "receipt-qty": "Quantity",
        "receipt-baseprice": "Base Price",
        "receipt-total": "Total Paid",
        "receipt-status": "Status",
        "receipt-method": "Payment Method",
        "receipt-method-val": "PayPal Secure Checkout"
    },
    ko: {
        "logo-subtitle": "마켓 리서치!",
        "nav-home": "홈",
        "nav-market": "시장 규모",
        "nav-competitor": "경쟁사 분석",
        "nav-industry": "산업 트렌드",
        "btn-orders": "내 주문 내역",
        "hero-badge": "AI 기반 마켓 인텔리전스",
        "hero-title": "BibleForAI - MKBOOST!",
        "hero-desc": "데이터 기반 글로벌 시장 조사 및 경쟁사 분석으로 더 스마트한 비즈니스 결정을 내리세요.",
        "btn-explore": "리서치 서비스 둘러보기",
        "btn-compliance": "리서치 방법론",
        
        "stat-global-numbers": "분석 시장 수",
        "stat-accuracy-rate": "데이터 정확도",
        "stat-opt-in": "교차 검증 소스",
        "stat-delivery": "납품 기간",
        
        "sec-channels-title": "마켓 리서치 서비스 살펴보기",
        "sec-channels-subtitle": "AI로 강화된 시장 인텔리전스, 경쟁사 벤치마킹, 산업 트렌드 예측으로 실행 가능한 인사이트를 확보하세요.",
        "card-market-title": "시장 규모 & TAM 분석",
        "card-market-desc": "TAM/SAM/SOM 규모 측정, CAGR 예측, 거시경제 트렌드 평가로 목표 시장을 정량화합니다.",
        "card-competitor-title": "경쟁사 인텔리전스",
        "card-competitor-desc": "심층 경쟁사 프로파일링, 비즈니스 모델 분석, 마케팅 전략 감사로 경쟁 우위를 확보하세요.",
        "card-industry-title": "산업 트렌드 리서치",
        "card-industry-desc": "글로벌 트렌드 모니터링, 규제 환경 매핑, 기술 혁신 분석, 소비자 행동 인사이트를 제공합니다.",
        "card-view-pricing": "가격 확인하기",
        
        "comp-title": "연구 방법론 및 품질 보증",
        "comp-desc": "당사의 시장 인텔리전스 시스템은 다중 소스 교차 검증을 통해 주관적 편향을 배제하고 데이터 기반의 실행 가능한 인사이트를 제공합니다.",
        "comp-bullet1-bold": "다중 소스 검증:",
        "comp-bullet1-text": "글로벌 데이터베이스, 산업 보고서, 정부 자료, 현장 조사를 교차 참조합니다.",
        "comp-bullet2-bold": "객관적 분석:",
        "comp-bullet2-text": "모든 인사이트는 검증 가능한 데이터 포인트와 통계 모델로 뒷받침됩니다.",
        "comp-bullet3-bold": "실행 중심 결과물:",
        "comp-bullet3-text": "보고서에는 구체적인 실행 계획이 포함되어 있으며 이사회 발표에 즉시 사용 가능합니다.",
        
        "view-market-sub": "목표 시장을 정밀하게 측정하세요. TAM/SAM/SOM 추정, 성장 예측, 시장 진입 평가를 제공합니다.",
        "view-competitor-sub": "경쟁 환경을 완벽히 이해하세요. 종합적인 프로파일링, 전략 감사, 업계 리더 벤치마킹을 제공합니다.",
        "view-industry-sub": "혁신의 최전선에 서세요. 글로벌 트렌드 모니터링, 신기술 매핑, 소비자 행동 예측을 제공합니다.",
        "view-orders-title": "내 구매 히스토리",
        "view-orders-sub": "성공한 주문 내역을 검토하세요. 데이터는 브라우저 로컬스토리지에 안전하게 보관됩니다.",
        
        "th-date": "주문 날짜",
        "th-order-id": "트랜잭션 ID",
        "th-product": "상품명",
        "th-tier": "패키지 등급",
        "th-industry": "대상 산업",
        "th-qty": "수량",
        "th-total": "총 결제금액",
        "th-status": "상태",
        
        "no-orders-msg": "구매 기록이 없습니다. 첫 주문을 완료하시면 내역이 여기에 표시됩니다!",
        
        "modal-title": "주문 설정",
        "modal-desc": "대상 산업을 선택하고 안전한 PayPal 결제를 진행하세요.",
        "modal-base-pkg": "기본 패키지:",
        "modal-base-price-label": "기본 가격:",
        "modal-email-label": "이메일 주소 *",
        "modal-email-placeholder": "name@example.com",
        "modal-email-error": "올바른 이메일 주소를 입력해주세요.",
        "modal-industry-label": "대상 산업:",
        "modal-qty": "수량:",
        "modal-total-amt": "총 결제금액:",
        "modal-test-btn": "가격 텍스트를 눌러 결제 진행",
        
        "badge-ssl": "SSL 보안 결제 지원",
        "badge-paypal": "PayPal 인증됨",
        
        "foot-channels": "리서치 서비스",
        "foot-legal": "방법론 및 품질",
        "foot-gdpr": "다중 소스 데이터 검증",
        "foot-canspam": "통계 모델 검증",
        "foot-match": "99% 교차 검증 정확도",
        "foot-contact": "문의 지원: snsherocom@gmail.com",
        "foot-copy": "&copy; 2026 BibleForAI MKBOOST. All rights reserved. 글로벌 시장 조사 및 경쟁사 분석.",
        
        "order-button": "패키지 주문하기",
        "featured-badge": "베스트 셀러",
        
        // Receipts
        "receipt-header": "BIBLEFORAI - MKBOOST 영수증",
        "receipt-date": "주문 날짜",
        "receipt-txid": "거래 ID",
        "receipt-email": "고객 이메일",
        "receipt-type": "상품 종류",
        "receipt-size": "패키지 크기",
        "receipt-industry": "대상 산업",
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
    
    document.title = isKo ? "BibleForAI - MKBOOST | 글로벌 시장 조사 및 경쟁사 분석" : "BibleForAI - MKBOOST | Global Market Research & Competitive Intelligence";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.content = isKo ? 
            "AI 기반 글로벌 시장 조사, 경쟁사 분석, 산업 트렌드 리서치 서비스. TAM/SAM/SOM 분석, SWOT, 비즈니스 인텔리전스 보고서." : 
            "AI-powered global market research, competitive intelligence, and industry trend analysis. TAM/SAM/SOM sizing, SWOT, and business intelligence reports.";
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
        ogTitle.content = isKo ? "BibleForAI - MKBOOST | 글로벌 시장 조사" : "BibleForAI - MKBOOST | Global Market Research & Competitive Intelligence";
    }
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
        ogDesc.content = isKo ? 
            "AI 기반 글로벌 시장 조사, 경쟁사 분석, 산업 트렌드 리서치. 데이터 기반 비즈니스 인텔리전스." : 
            "AI-powered global market research, competitive intelligence, and industry trend analysis. Data-driven business intelligence.";
    }
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) {
        twTitle.content = isKo ? "BibleForAI - MKBOOST | 글로벌 시장 조사" : "BibleForAI - MKBOOST | Global Market Research & Competitive Intelligence";
    }
    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) {
        twDesc.content = isKo ? 
            "AI 기반 글로벌 시장 조사, 경쟁사 분석, 산업 트렌드 리서치. 데이터 기반 비즈니스 인텔리전스." : 
            "AI-powered global market research, competitive intelligence, and industry trend analysis. Data-driven business intelligence.";
    }

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
    if (selector) {
        selector.value = lang;
    }
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
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Navigation (SPA Views Router)
function navigate(viewId) {
    currentView = viewId;
    
    document.querySelectorAll('.view-section').forEach(sec => {
        sec.classList.remove('active');
    });
    
    const activeSection = document.getElementById(`${viewId}-view`);
    if (activeSection) {
        activeSection.classList.add('active');
    }
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.id === `nav-${viewId}`) {
            link.classList.add('active');
        }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleMobileMenu() {
    const drawer = document.getElementById('mobile-drawer');
    drawer.classList.toggle('active');
}

// Dynamic Rendering of Product Packages
function renderAllPackages() {
    window.packageCatalog = packageCatalog;
    if (typeof initStandardPricingTable === 'function') {
        initStandardPricingTable();
    }
}

function getCategoryIcon(category) {
    switch (category) {
        case 'market': return 'fa-solid fa-chart-pie';
        case 'competitor': return 'fa-solid fa-chess-king';
        case 'industry': return 'fa-solid fa-chart-line';
        default: return 'fa-solid fa-magnifying-glass-chart';
    }
}

// Purchase Modal Management
function openPurchaseModal(categoryKey, packageId) {
    const category = packageCatalog[categoryKey];
    const pkg = category.packages.find(p => p.id === packageId);
    
    if (!pkg) return;
    
    const isKo = currentLang === 'ko';
    const catTitle = isKo ? category.title_ko : category.title_en;
    const pkgName = isKo ? pkg.name_ko : pkg.name_en;
    
    currentPackage = {
        categoryKey: categoryKey,
        categoryName: catTitle,
        tierName: pkgName,
        basePrice: pkg.price
    };
    
    orderQuantity = 1;
    
    document.getElementById('modal-product-title').innerText = `${catTitle}`;
    document.getElementById('modal-package-name').innerText = pkgName;
    document.getElementById('modal-base-price').innerText = formatPrice(pkg.price);
    document.getElementById('order-quantity').value = orderQuantity;
    
    const emailInput = document.getElementById('order-email');
    if (emailInput) {
        emailInput.value = '';
        emailInput.style.borderColor = 'var(--border)';
    }
    const emailError = document.getElementById('email-error');
    if (emailError) {
        emailError.style.display = 'none';
    }
    
    const testBtn = document.getElementById('paypal-test-button');
    if (testBtn) {
        testBtn.style.display = 'block';
    }
    
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
    
    document.getElementById('purchase-modal').classList.add('active');
    
    // Auto-scroll to show PayPal button
    setTimeout(() => {
        const modalCard = document.querySelector('.modal-card');
        const totalBox = document.querySelector('.total-price-box');
        if (modalCard && totalBox) {
            modalCard.scrollTop = totalBox.offsetTop - 10;
        }
    }, 800);
    
    // Load PayPal Buttons
    initPayPalButtons();
}

function closeModal() {
    document.getElementById('purchase-modal').classList.remove('active');
    const container = document.getElementById('paypal-button-container');
    if (container) {
        container.innerHTML = '';
    }
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
    let val = parseInt(qtyInput.value);
    if (isNaN(val) || val < 1) {
        val = 1;
    }
    orderQuantity = val;
    
    const totalPrice = currentPackage.basePrice * orderQuantity;
    document.getElementById('modal-total-price').innerText = formatPrice(totalPrice);
}

function validateEmailField() {
    const emailInput = document.getElementById('order-email');
    const emailError = document.getElementById('email-error');
    if (!emailInput) return true;
    
    const email = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email || !emailPattern.test(email)) {
        emailInput.style.borderColor = '#ef4444';
        if (emailError) {
            const isKo = currentLang === 'ko';
            emailError.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> ${isKo ? "올바른 이메일 주소를 입력해주세요." : "Please enter a valid email address."}`;
            emailError.style.display = 'block';
        }
        return false;
    } else {
        emailInput.style.borderColor = 'var(--border)';
        if (emailError) {
            emailError.style.display = 'none';
        }
        return true;
    }
}

function triggerTestCheckout() {
    // Auto-fill mock email if field is empty
    const emailInput = document.getElementById('order-email');
    if (emailInput && !emailInput.value.trim()) {
        emailInput.value = 'secure checkout@test.dev';
        emailInput.style.borderColor = 'var(--border)';
        const emailError = document.getElementById('email-error');
        if (emailError) emailError.style.display = 'none';
    }
    if (!validateEmailField()) {
        return;
    }
    
    const mockDetails = {
        id: 'TEST-PAYID-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        isTest: true
    };
    
    saveLocalOrder(mockDetails);
    closeModal();
}

function initPayPalButtons() {
    const container = document.getElementById('paypal-button-container');
    if (!container) return;
    if (typeof paypal === 'undefined') {
        container.innerHTML = '<p style="color:#ef4444;text-align:center;font-size:0.9rem;padding:1rem;font-weight:600;"><i class="fa-solid fa-triangle-exclamation"></i> PayPal system is currently unavailable. Please reload the page.</p>';
        return;
    }
    
    paypal.Buttons({
        style: {
            layout: 'vertical',
            color:  'blue',
            shape:  'rect',
            label:  'checkout'
        },
        onClick: function(data, actions) {
            if (!validateEmailField()) {
                return actions.reject();
            }
            return actions.resolve();
        },
        createOrder: function(data, actions) {
            const selectedIndustry = document.getElementById('order-industry').value;
            const finalAmount = (currentPackage.basePrice * orderQuantity).toFixed(2);
            return actions.order.create({
                purchase_units: [{
                    description: `${currentPackage.categoryName} - ${currentPackage.tierName} [Industry: ${selectedIndustry}] (Qty: ${orderQuantity})`,
                    amount: {
                        currency_code: 'USD',
                        value: finalAmount
                    }
                }]
            });
        },
        onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
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
    const orderLogs = JSON.parse(localStorage.getItem('mkboost_orders')) || [];
    const selectedIndustry = document.getElementById('order-industry').value;
    const emailVal = document.getElementById('order-email') ? document.getElementById('order-email').value.trim() : '';
    
    let clientId = 'Ae_xg2SjogcseJVcjXldc_TEnVWBzmPw8aNimrSncYBb0Wrn_m93w_PkMgdxWTQ2fJExV8QKWHR2-7hK';
    let secret = '';
    
    if (details.isTest) {
        clientId = 'AeZhTof6R4GGZ8tp2dz1l1tIt970_y_G1uTufgjs-7_rYxRNsre2GKd5LUaiAqDmdOlYzABi-_HgSpe4';
        secret = '[REDACTED]';
    }
    
    const newOrder = {
        date: new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }),
        id: details.id,
        email: emailVal,
        category: currentPackage.categoryName,
        package: currentPackage.tierName,
        industry: selectedIndustry,
        quantity: orderQuantity,
        basePrice: currentPackage.basePrice,
        totalPaid: formatPrice(currentPackage.basePrice * orderQuantity),
        status: 'Completed',
        clientId: clientId,
        secret: secret
    };
    
    orderLogs.unshift(newOrder);
    localStorage.setItem('mkboost_orders', JSON.stringify(orderLogs));
    
    renderOrders();
    
    const isKo = currentLang === 'ko';
    const dict = translations[currentLang];
    const receiptText = 
`===================================
   ${dict["receipt-header"]}
===================================
${dict["receipt-date"].padEnd(15)} : ${newOrder.date}
${dict["receipt-txid"].padEnd(15)} : ${newOrder.id}
${dict["receipt-email"].padEnd(15)} : ${newOrder.email}
${dict["receipt-type"].padEnd(15)} : ${newOrder.category}
${dict["receipt-size"].padEnd(15)} : ${newOrder.package}
${dict["receipt-industry"].padEnd(15)} : ${newOrder.industry}
${dict["receipt-qty"].padEnd(15)} : ${newOrder.quantity}
${dict["receipt-baseprice"].padEnd(15)} : ${formatPrice(newOrder.basePrice)}
${dict["receipt-total"].padEnd(15)} : ${newOrder.totalPaid}
${dict["receipt-status"].padEnd(15)} : ${isKo ? "완료됨" : newOrder.status}
-----------------------------------
${dict["receipt-method"].padEnd(15)} : ${dict["receipt-method-val"]}
===================================`;
    const encodedReceipt = encodeURIComponent(receiptText);
    const redirectUrl = `https://docs.google.com/forms/d/e/1FAIpQLScMPqbEWWttS5mb1m_krsO_kco24ImpgvYVSbc7zO0nEVmYFw/viewform?entry.1059822061=${encodedReceipt}`;
    
    window.location.href = redirectUrl;
}

function renderOrders() {
    const orderLogs = JSON.parse(localStorage.getItem('mkboost_orders')) || [];
    const tbody = document.getElementById('orders-tbody');
    const noOrdersMsg = document.getElementById('no-orders-msg');
    
    if (!tbody) return;

    if (orderLogs.length === 0) {
        tbody.innerHTML = '';
        noOrdersMsg.style.display = 'block';
        return;
    }
    
    const isKo = currentLang === 'ko';
    noOrdersMsg.style.display = 'none';
    tbody.innerHTML = orderLogs.map(order => `
        <tr>
            <td>${order.date}</td>
            <td class="tx-id">${order.id}</td>
            <td>${order.category}</td>
            <td>${order.package}</td>
            <td>${order.industry || 'General'}</td>
            <td>${order.quantity}</td>
            <td><strong>${order.totalPaid}</strong></td>
            <td><span class="status-badge">${isKo ? "완료됨" : order.status}</span></td>
        </tr>
    `).join('');
}

// Expose variables globally to prevent ReferenceErrors in inline HTML scripts/handlers
if (typeof navigate !== 'undefined') { window.navigate = navigate; }
if (typeof currentLang !== 'undefined') { window.currentLang = currentLang; }

window.openPurchaseModal = openPurchaseModal;
window.closeModal = closeModal;
window.adjustQty = adjustQty;
window.changeLanguage = changeLanguage;
