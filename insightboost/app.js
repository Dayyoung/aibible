// App State
let currentView = 'home';
let currentPackage = null;
let orderQuantity = 1;
let paypalButtonInstance = null;

// Package Catalog with Localized Keys
const packageCatalog = {
    basic: {
        title_en: 'Basic Analysis',
        title_ko: '베이직 분석',
        packages: [
            { id: 'basic-starter', name_en: 'Starter Report (1 Dataset)', name_ko: '스타터 리포트 (1개 데이터셋)', desc_en: 'One dataset analysis with key insights summary. Ideal for testing our AI-powered analytics.', desc_ko: '1개 데이터셋 분석 및 핵심 인사이트 요약. AI 기반 분석을 테스트하기에 최적.', price: 99, featured: false, features_en: ['1 Dataset Analysis', 'Executive Summary PDF', 'Key Metrics & Trends', '2 Business Days Delivery', '1 Revision Round'], features_ko: ['1개 데이터셋 분석', '경영진 요약 PDF', '핵심 지표 및 트렌드', '영업일 2일 배송', '1회 수정 포함'] },
            { id: 'basic-standard', name_en: 'Standard Report (3 Datasets)', name_ko: '스탠다드 리포트 (3개 데이터셋)', desc_en: 'Multi-dataset analysis with comparative insights and visual charts.', desc_ko: '다중 데이터셋 분석, 비교 인사이트 및 시각화 차트 포함.', price: 199, featured: false, features_en: ['3 Dataset Analysis', 'Comparative Insights', 'Data Visualizations', 'Trend Forecasting', '3 Business Days Delivery', '2 Revision Rounds'], features_ko: ['3개 데이터셋 분석', '비교 인사이트', '데이터 시각화', '트렌드 예측', '영업일 3일 배송', '2회 수정 포함'] },
            { id: 'basic-pro', name_en: 'Pro Report (5 Datasets)', name_ko: '프로 리포트 (5개 데이터셋)', desc_en: 'Comprehensive analysis suite with deep-dive insights and strategy recommendations.', desc_ko: '심층 인사이트와 전략 제안을 포함한 종합 분석 패키지.', price: 349, featured: true, features_en: ['5 Dataset Analysis', 'Deep-Dive Insights', 'Interactive Dashboards', 'Strategy Recommendations', '5 Business Days Delivery', '3 Revision Rounds', 'Dedicated Analyst'], features_ko: ['5개 데이터셋 분석', '심층 인사이트', '인터랙티브 대시보드', '전략 제안', '영업일 5일 배송', '3회 수정 포함', '전담 분석가'] }
        ]
    },
    pro: {
        title_en: 'Professional BI',
        title_ko: '프로페셔널 BI',
        packages: [
            { id: 'pro-bi', name_en: 'BI Dashboard Suite', name_ko: 'BI 대시보드 스위트', desc_en: 'Custom interactive BI dashboard with real-time data connectors and KPI tracking.', desc_ko: '실시간 데이터 커넥터와 KPI 추적 기능이 포함된 맞춤형 인터랙티브 BI 대시보드.', price: 499, featured: false, features_en: ['Custom BI Dashboard', 'Real-Time Connectors', 'KPI Tracking System', 'Automated Data Refresh', '7 Business Days Delivery', 'Dedicated BI Engineer'], features_ko: ['맞춤형 BI 대시보드', '실시간 데이터 커넥터', 'KPI 추적 시스템', '자동 데이터 갱신', '영업일 7일 배송', '전담 BI 엔지니어'] },
            { id: 'pro-automation', name_en: 'Report Automation Pipeline', name_ko: '리포트 자동화 파이프라인', desc_en: 'End-to-end automated reporting pipeline. Schedule recurring reports with AI-generated narratives.', desc_ko: '엔드투엔드 자동 보고 파이프라인. AI 생성 내러티브가 포함된 정기 리포트를 스케줄링하세요.', price: 799, featured: true, features_en: ['Automated Report Pipeline', 'AI Narrative Generation', 'Scheduled Delivery', 'Multi-Format Export (PDF/PPT/HTML)', '10 Business Days Setup', '3 Months Support'], features_ko: ['자동 보고 파이프라인', 'AI 내러티브 생성', '스케줄 배송', '다중 포맷 출력 (PDF/PPT/HTML)', '영업일 10일 설정', '3개월 기술 지원'] },
            { id: 'pro-enterprise', name_en: 'Enterprise Data Platform', name_ko: '엔터프라이즈 데이터 플랫폼', desc_en: 'Full-stack data analytics platform with ML models, predictive analytics, and executive dashboards.', desc_ko: 'ML 모델, 예측 분석, 경영진 대시보드를 갖춘 풀스택 데이터 분석 플랫폼.', price: 1499, featured: false, features_en: ['Full-Stack Platform', 'ML Predictive Models', 'Executive Dashboards', 'Custom API Integration', '20 Business Days Delivery', '6 Months Support', 'Dedicated Data Architect'], features_ko: ['풀스택 플랫폼', 'ML 예측 모델', '경영진 대시보드', '맞춤형 API 통합', '영업일 20일 배송', '6개월 기술 지원', '전담 데이터 아키텍트'] }
        ]
    },
    enterprise: {
        title_en: 'Enterprise Solutions',
        title_ko: '엔터프라이즈 솔루션',
        packages: [
            { id: 'ent-strategy', name_en: 'Data Strategy Consulting', name_ko: '데이터 전략 컨설팅', desc_en: 'End-to-end data strategy: audit, roadmap, implementation plan, and KPI framework design.', desc_ko: '엔드투엔드 데이터 전략: 감사, 로드맵, 구현 계획, KPI 프레임워크 설계.', price: 999, featured: false, features_en: ['Data Maturity Audit', 'Strategic Roadmap', 'Implementation Plan', 'KPI Framework Design', 'Stakeholder Workshop', '15 Business Days'], features_ko: ['데이터 성숙도 감사', '전략 로드맵', '구현 계획', 'KPI 프레임워크 설계', '이해관계자 워크숍', '영업일 15일'] },
            { id: 'ent-ml', name_en: 'ML Model Development', name_ko: 'ML 모델 개발', desc_en: 'Custom machine learning model development: from data prep to production deployment.', desc_ko: '맞춤형 머신러닝 모델 개발: 데이터 준비부터 프로덕션 배포까지.', price: 2499, featured: true, features_en: ['Custom ML Model', 'Data Pipeline Setup', 'Model Training & Tuning', 'Production Deployment', 'Monitoring Dashboard', '3 Months Maintenance'], features_ko: ['맞춤형 ML 모델', '데이터 파이프라인 구축', '모델 학습 및 튜닝', '프로덕션 배포', '모니터링 대시보드', '3개월 유지보수'] },
            { id: 'ent-fullstack', name_en: 'Full AI Analytics Suite', name_ko: '풀 AI 분석 스위트', desc_en: 'Complete AI analytics transformation: ML, NLP, computer vision, and real-time analytics.', desc_ko: '완전한 AI 분석 전환: ML, NLP, 컴퓨터 비전, 실시간 분석 포함.', price: 4999, featured: false, features_en: ['ML + NLP + CV Pipeline', 'Real-Time Analytics Engine', 'Data Lake Architecture', 'Custom AI Model Suite', 'Staff Training Program', '12 Months Partnership'], features_ko: ['ML + NLP + CV 파이프라인', '실시간 분석 엔진', '데이터 레이크 아키텍처', '맞춤형 AI 모델 스위트', '직원 교육 프로그램', '12개월 파트너십'] }
        ]
    }
};

// Translation Dictionary
const translations = {
    en: {
        "logo-subtitle": "AI DATA ANALYTICS",
        "nav-home": "Home",
        "nav-basic": "Basic",
        "nav-pro": "Professional BI",
        "nav-enterprise": "Enterprise",
        "btn-orders": "My Orders",
        "hero-badge": "AI-Powered Analytics",
        "hero-title": "INSIGHTBOOST — AI Data Analysis & BI Reports!",
        "hero-desc": "Turn raw data into actionable insights with AI-powered analysis, interactive dashboards, and professional business intelligence reports.",
        "btn-explore": "Explore Packages",
        "btn-howitworks": "How It Works",

        "stat-datasets": "Datasets Analyzed",
        "stat-accuracy": "AI Accuracy",
        "stat-clients": "Happy Clients",
        "stat-delivery": "Avg. Delivery",

        "sec-channels-title": "Choose Your Analytics Package",
        "sec-channels-subtitle": "From single dataset reports to full enterprise AI analytics platforms. Every package includes professional deliverables and dedicated support.",
        "card-basic-title": "Basic Analysis",
        "card-basic-desc": "Single to multi-dataset analysis with executive summaries, data visualizations, and actionable insights for data-driven decisions.",
        "card-pro-title": "Professional BI",
        "card-pro-desc": "Custom interactive BI dashboards, automated reporting pipelines, and end-to-end analytics automation for growing businesses.",
        "card-enterprise-title": "Enterprise Solutions",
        "card-enterprise-desc": "Full-stack data platforms, ML model development, and complete AI analytics transformation for large organizations.",
        "card-view-pricing": "View Pricing",

        "comp-title": "AI-Powered Analytics Process",
        "comp-desc": "Our AI analytics pipeline combines machine learning, statistical analysis, and natural language generation to deliver professional-grade insights from your raw data.",
        "comp-bullet1-bold": "1. Data Upload:",
        "comp-bullet1-text": "Share your raw data files (CSV, Excel, SQL, or API) — we handle messy data with AI-powered cleaning.",
        "comp-bullet2-bold": "2. AI Analysis:",
        "comp-bullet2-text": "Our ML models identify patterns, trends, anomalies, and correlations across your datasets.",
        "comp-bullet3-bold": "3. Visualization:",
        "comp-bullet3-text": "Interactive dashboards and publication-ready charts with automated narrative generation.",
        "comp-bullet4-bold": "4. Delivery:",
        "comp-bullet4-text": "Receive your professional report (PDF, PPT, or interactive dashboard) with strategy recommendations.",

        "view-basic-sub": "Single to multi-dataset analysis with executive summaries. Ideal for startups and small businesses starting their data journey.",
        "view-pro-sub": "Custom BI dashboards and automated reporting pipelines. Perfect for growing businesses needing scalable analytics.",
        "view-enterprise-sub": "Full-stack data platforms and ML solutions. Designed for enterprises undergoing digital transformation.",
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
        "modal-desc": "Select your industry focus and complete secure PayPal payment.",
        "modal-base-pkg": "Base Package:",
        "modal-base-price-label": "Base Price:",
        "modal-email-label": "Email Address *",
        "modal-email-placeholder": "name@example.com",
        "modal-email-error": "Please enter a valid email address.",
        "modal-industry-label": "Target Industry / Data Source:",
        "modal-qty": "Quantity:",
        "modal-total-amt": "Total Amount:",
        "modal-test-btn": "Run Sandbox Test Checkout",

        "badge-ssl": "SSL Secured Checkout",
        "badge-paypal": "PayPal Verified",

        "foot-channels": "Analytics Packages",
        "foot-legal": "Why INSIGHTBOOST",
        "foot-gdpr": "AI-Powered Analysis",
        "foot-canspam": "99% Data Accuracy",
        "foot-match": "Interactive Dashboards",
        "foot-contact": "Contact support: snsherocom@gmail.com",
        "foot-copy": "&copy; 2026 BibleForAI INSIGHTBOOST. All rights reserved. AI Data Analytics & BI Reports.",

        "order-button": "Order Package",
        "featured-badge": "Best Seller",

        // Receipts
        "receipt-header": "BIBLEFORAI - INSIGHTBOOST RECEIPT",
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
        "logo-subtitle": "AI 데이터 분석",
        "nav-home": "홈",
        "nav-basic": "베이직",
        "nav-pro": "프로페셔널 BI",
        "nav-enterprise": "엔터프라이즈",
        "btn-orders": "내 주문 내역",
        "hero-badge": "AI 기반 분석",
        "hero-title": "인사이트부스트 — AI 데이터 분석 & BI 리포트!",
        "hero-desc": "AI 기반 분석, 인터랙티브 대시보드, 전문 비즈니스 인텔리전스 리포트로 원시 데이터를 실행 가능한 인사이트로 전환하세요.",
        "btn-explore": "패키지 둘러보기",
        "btn-howitworks": "이용 방법",

        "stat-datasets": "분석 데이터셋",
        "stat-accuracy": "AI 정확도",
        "stat-clients": "만족 고객",
        "stat-delivery": "평균 배송일",

        "sec-channels-title": "분석 패키지 선택하기",
        "sec-channels-subtitle": "단일 데이터셋 리포트부터 풀 엔터프라이즈 AI 분석 플랫폼까지. 모든 패키지에 전문 결과물과 전담 지원이 포함됩니다.",
        "card-basic-title": "베이직 분석",
        "card-basic-desc": "경영진 요약, 데이터 시각화, 실행 가능한 인사이트가 포함된 단일/다중 데이터셋 분석. 데이터 기반 의사결정을 시작하세요.",
        "card-pro-title": "프로페셔널 BI",
        "card-pro-desc": "맞춤형 인터랙티브 BI 대시보드, 자동 보고 파이프라인, 엔드투엔드 분석 자동화. 성장하는 비즈니스를 위한 솔루션.",
        "card-enterprise-title": "엔터프라이즈 솔루션",
        "card-enterprise-desc": "풀스택 데이터 플랫폼, ML 모델 개발, 완전한 AI 분석 전환. 대규모 조직을 위한 엔터프라이즈급 서비스.",
        "card-view-pricing": "가격 확인하기",

        "comp-title": "AI 기반 분석 프로세스",
        "comp-desc": "당사의 AI 분석 파이프라인은 머신러닝, 통계 분석, 자연어 생성을 결합하여 원시 데이터에서 전문가 수준의 인사이트를 제공합니다.",
        "comp-bullet1-bold": "1. 데이터 업로드:",
        "comp-bullet1-text": "원시 데이터 파일(CSV, Excel, SQL, API)을 공유하세요. AI 기반 클렌징으로 복잡한 데이터도 처리합니다.",
        "comp-bullet2-bold": "2. AI 분석:",
        "comp-bullet2-text": "ML 모델이 데이터셋 전반에서 패턴, 트렌드, 이상치, 상관관계를 식별합니다.",
        "comp-bullet3-bold": "3. 시각화:",
        "comp-bullet3-text": "인터랙티브 대시보드와 출판 가능한 차트, 자동 내러티브 생성이 포함됩니다.",
        "comp-bullet4-bold": "4. 결과물 전달:",
        "comp-bullet4-text": "전략 제안이 포함된 전문 리포트(PDF, PPT, 인터랙티브 대시보드)를 받아보세요.",

        "view-basic-sub": "경영진 요약이 포함된 단일~다중 데이터셋 분석. 데이터 여정을 시작하는 스타트업과 소규모 비즈니스에 이상적입니다.",
        "view-pro-sub": "맞춤형 BI 대시보드와 자동 보고 파이프라인. 확장 가능한 분석이 필요한 성장 비즈니스에 완벽합니다.",
        "view-enterprise-sub": "풀스택 데이터 플랫폼과 ML 솔루션. 디지털 전환을 진행 중인 기업을 위해 설계되었습니다.",
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
        "modal-desc": "산업 분야를 선택하고 안전한 PayPal 결제를 진행하세요.",
        "modal-base-pkg": "기본 패키지:",
        "modal-base-price-label": "기본 가격:",
        "modal-email-label": "이메일 주소 *",
        "modal-email-placeholder": "name@example.com",
        "modal-email-error": "올바른 이메일 주소를 입력해주세요.",
        "modal-industry-label": "대상 산업 / 데이터 소스:",
        "modal-qty": "수량:",
        "modal-total-amt": "총 결제금액:",
        "modal-test-btn": "샌드박스 테스트 결제 진행",

        "badge-ssl": "SSL 보안 결제 지원",
        "badge-paypal": "PayPal 인증됨",

        "foot-channels": "분석 패키지",
        "foot-legal": "INSIGHTBOOST 특징",
        "foot-gdpr": "AI 기반 분석",
        "foot-canspam": "99% 데이터 정확도",
        "foot-match": "인터랙티브 대시보드",
        "foot-contact": "문의 지원: snsherocom@gmail.com",
        "foot-copy": "&copy; 2026 BibleForAI INSIGHTBOOST. All rights reserved. AI Data Analytics & BI Reports.",

        "order-button": "패키지 주문하기",
        "featured-badge": "베스트 셀러",

        // Receipts
        "receipt-header": "BIBLEFORAI - 인사이트부스트 영수증",
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
    const lang = currentLang;
    const isKo = lang === 'ko';
    
    document.documentElement.lang = lang;
    
    document.title = isKo ? "BibleForAI - INSIGHTBOOST | AI 데이터 분석 & BI 리포트" : "BibleForAI - INSIGHTBOOST | AI Data Analysis & BI Reports";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.content = isKo ? 
            "AI 기반 데이터 분석, 인터랙티브 대시보드, 비즈니스 인텔리전스 리포트. 원시 데이터를 실행 가능한 인사이트로 전환하세요." : 
            "AI-powered data analysis, interactive dashboards, and business intelligence reports. Turn raw data into actionable insights.";
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
        ogTitle.content = isKo ? "BibleForAI - INSIGHTBOOST | AI 데이터 분석 & BI 리포트" : "BibleForAI - INSIGHTBOOST | AI Data Analysis & BI Reports";
    }
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
        ogDesc.content = isKo ? 
            "AI 기반 데이터 분석, 인터랙티브 대시보드, 비즈니스 인텔리전스 리포트. 원시 데이터를 실행 가능한 인사이트로 전환하세요." : 
            "AI-powered data analysis, interactive dashboards, and business intelligence reports. Turn raw data into actionable insights.";
    }
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) {
        twTitle.content = isKo ? "BibleForAI - INSIGHTBOOST | AI 데이터 분석 & BI 리포트" : "BibleForAI - INSIGHTBOOST | AI Data Analysis & BI Reports";
    }
    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) {
        twDesc.content = isKo ? 
            "AI 기반 데이터 분석, 인터랙티브 대시보드, 비즈니스 인텔리전스 리포트. 원시 데이터를 실행 가능한 인사이트로 전환하세요." : 
            "AI-powered data analysis, interactive dashboards, and business intelligence reports. Turn raw data into actionable insights.";
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
                </div>
            `;
        }).join('');
    });
}

function getCategoryIcon(category) {
    switch (category) {
        case 'basic': return 'fa-solid fa-chart-simple';
        case 'pro': return 'fa-solid fa-chart-line';
        case 'enterprise': return 'fa-solid fa-building-columns';
        default: return 'fa-solid fa-chart-bar';
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
    
    document.getElementById('purchase-modal').classList.add('active');
    
    setTimeout(() => {
        const modalCard = document.querySelector('.modal-card');
        const totalBox = document.querySelector('.total-price-box');
        if (modalCard && totalBox) {
            modalCard.scrollTop = totalBox.offsetTop - 10;
        }
    }, 800);
    
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
    // Developer sandbox: auto-fill mock email if field is empty
    const emailInput = document.getElementById('order-email');
    if (emailInput && !emailInput.value.trim()) {
        emailInput.value = 'sandbox@test.dev';
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
    const orderLogs = JSON.parse(localStorage.getItem('insightboost_orders')) || [];
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
    localStorage.setItem('insightboost_orders', JSON.stringify(orderLogs));
    
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
    const orderLogs = JSON.parse(localStorage.getItem('insightboost_orders')) || [];
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
