// App State
let currentView = 'home';
let currentPackage = null;
let orderQuantity = 1;
let paypalButtonInstance = null;

// Package Catalog with Localized Keys
const packageCatalog = {
    company: {
        title_en: 'Company Formation',
        title_ko: '회사 설립',
        packages: [
            { id: 'company-basic', name_en: 'Consultation & Filing', name_ko: '상담 및 법인 등록', desc_en: 'Basic registered agent setup and filing guidance.', desc_ko: '기본 등록 대리인 구성 및 등록 가이드.', price: 79, featured: false, features_en: ['Registered Agent Setup', 'State Selection Guidance', 'Filing Document Kit', 'Priority Support'], features_ko: ['등록 대리인 구성', '주 선택 가이드', '등록 서류 키트', '우선 고객 지원'] },
            { id: 'company-standard', name_en: 'Full Incorporation', name_ko: '풀 법인 설립', desc_en: 'Full incorporation package including IRS/EIN filing and operating agreement.', desc_ko: 'IRS/EIN 신청과 운영 계약서 포함 풀 법인 설립 패키지.', price: 129, featured: true, features_en: ['Incorporation Filing', 'EIN Registration', 'Operating Agreement Draft', 'Mailbox + Phone Support'], features_ko: ['법인 등록 신청', 'EIN 등록', '운영 계약서 초안', '메일박스 + 전화 지원'] },
            { id: 'company-premium', name_en: 'US / EU Expansion', name_ko: '미국/유럽 진출 패키지', desc_en: 'Multi-state or multi-country complex entity structuring with compliance review.', desc_ko: '복수 국가 복잡한 법인 구조화와 규정 준수 검토.', price: 249, featured: false, features_en: ['Multi-Jurisdiction Review', 'Compliance Checklist', 'Virtual Office Setup', 'Dedicated Legal Coordinator'], features_ko: ['다중 국가 검토', '규정 준수 체크리스트', '가상 오피스 구성', '전담 법률 코디네이터'] }
        ]
    },
    trademark: {
        title_en: 'Trademark Registration',
        title_ko: '상표 등록',
        packages: [
            { id: 'trademark-standard', name_en: 'Single Jurisdiction', name_ko: '단일 국가 등록', desc_en: 'USPTO or EUIPO filing with one jurisdiction examination support.', desc_ko: 'USPTO 또는 EUIPO 단일 권리 심사 지원 신청.', price: 149, featured: false, features_en: ['Clearance Search', 'Filing Submission', 'Examiner Response', 'Status Updates'], features_ko: ['등록 가능성 조사', '출원 제출', '심사관 응답 처리', '진행 상태 업데이트'] },
            { id: 'trademark-multi', name_en: 'Global Filing', name_ko: '글로벌 출원', desc_en: 'Coordinated filings across multiple countries with unified strategy.', desc_ko: '통합 전략 기반 다수 국가 동시 출원.', price: 349, featured: true, features_en: ['Multi-Country Applications', 'CPOA/Letters of Request', 'Renewal Planning', 'Trademark Portfolio Map'], features_ko: ['다수 국가 출원', 'CPOA/요청 서신', '갱신 계획', '상표 포트폴리오 맵'] },
            { id: 'trademark-watch', name_en: 'Watch & Enforcement', name_ko: '모니터링 및 집행', desc_en: 'Continuous monitoring and enforcement support for registered marks.', desc_ko: '등록 상표의 지속적 모니터링 및 집행 지원.', price: 199, featured: false, features_en: ['Global Watch Alerts', 'Infringement Report', 'Cease-and-Desist Draft', 'Counsel Introduction'], features_ko: ['글로벌 모니터링 알림', '침해 보고서', '중지 요청서 초안', '변호사 매칭'] }
        ]
    },
    corporate: {
        title_en: 'Corporate Advisory',
        title_ko: '기업 자문',
        packages: [
            { id: 'corporate-basic', name_en: 'Governance Review', name_ko: '거버넌스 검토', desc_en: 'Board minutes, caps review, and compliance workflow review.', desc_ko: '이사회 의사록, 주식 한도, 규정 준수 프로세스 검토.', price: 109, featured: false, features_en: ['Governance Audit', 'Policy Alignment', 'Resolution Drafting', 'Regulatory Gap Analysis'], features_ko: ['거버넌스 감사', '정책 정렬', '의사록 작성', '규제 공백 분석'] },
            { id: 'corporate-standard', name_en: 'Compliance Program', name_ko: '준법 프로그램', desc_en: 'Full compliance program design with periodic reporting.', desc_ko: '정기 보고가 포함된 전체 준법 프로그램 설계.', price: 179, featured: true, features_en: ['Compliance Manual', 'Periodic Reporting', 'Annual Review', 'Training Materials'], features_ko: ['준법 매뉴얼', '정기 보고', '연례 검토', '교육 자료'] },
            { id: 'corporate-premium', name_en: 'M&A Advisory', name_ko: '인수합병 자문', desc_en: 'Legal due diligence, risk analysis, and deal structure review.', desc_ko: '실사, 리스크 분석, 거래 구조 검토.', price: 499, featured: false, features_en: ['Legal Due Diligence', 'Risk Assessment', 'Deal Structure Review', 'Regulatory Consent Help'], features_ko: ['법적 실사', '리스크 평가', '거래 구조 검토', '규제 동의 지원'] }
        ]
    },
    tax: {
        title_en: 'International Tax',
        title_ko: '국제 세무',
        packages: [
            { id: 'tax-planning', name_en: 'Structure Planning', name_ko: '구조 기획', desc_en: 'Entity location and ownership structure recommendations.', desc_ko: '법인 위치 및 지분구조 추천.', price: 159, featured: false, features_en: ['Entity Location Review', 'Ownership Structure', 'Treaty Map', 'Implementation Checklist'], features_ko: ['법인 위치 검토', '지분 구조', '조세 조약 맵', '구현 체크리스트'] },
            { id: 'tax-filing', name_en: 'Filing & Reporting', name_ko: '신고 및 보고', desc_en: 'International tax filing coordination and documentation.', desc_ko: '국제 세무 신고 조정 및 서류 준비.', price: 199, featured: true, features_en: ['Tax Return Prep', 'Transfer Pricing Docs', 'Regulatory Reporting', 'Review Cycle'], features_ko: ['세무 신고 준비', '이전 가격 문서', '규제 신고', '검토 사이클'] },
            { id: 'tax-dispute', name_en: 'Dispute Resolution', name_ko: '분쟁 해결', desc_en: 'Dispute strategy and negotiation with tax authorities.', desc_ko: '세무 당국과의 분쟁 전략 및 협상 지원.', price: 399, featured: false, features_en: ['Authority Response', 'Evidence Package', 'Settlement Strategy', 'Appeal Support'], features_ko: ['당국 응답 대응', '증거 패키지', '합의 전략', '항소 지원'] }
        ]
    },
    litigation: {
        title_en: 'Litigation Support',
        title_ko: '소송 지원',
        packages: [
            { id: 'litigation-basic', name_en: 'Legal Strategy', name_ko: '법률 전략', desc_en: 'Cross-border dispute strategy and roadmap.', desc_ko: '국경간 분쟁 전략 및 로드맵.', price: 149, featured: false, features_en: ['Jurisdiction Comparison', 'Claim Scope Review', 'Stages Map', 'Cost Estimate'], features_ko: ['관할 비교', '청구 범위 검토', '단계 맵', '비용 추정'] },
            { id: 'litigation-standard', name_en: 'Case Coordination', name_ko: '사례 조율', desc_en: 'Local counsel matching, evidence handling and status tracking.', desc_ko: '현지 변호사 매칭, 증거 관리, 진행 추적.', price: 249, featured: true, features_en: ['Counsel Matching', 'Evidence Log', 'Status Tracking', 'Communication Hub'], features_ko: ['변호사 매칭', '증거 기록', '진행 추적', '커뮤니케이션 허브'] },
            { id: 'litigation-enforcement', name_en: 'Judgment Enforcement', name_ko: '판결 집행', desc_en: 'Cross-border enforcement strategy and asset tracing.', desc_ko: '국경간 집행 전략 및 자산 추적.', price: 459, featured: false, features_en: ['Asset Trace', 'Treaty Enforcement', 'Local Procedure', 'Recovery Planning'], features_ko: ['자산 추적', '조약 집행', '지역 절차', '회수 계획'] }
        ]
    }
};

// Translation Dictionary
const translations = {
    en: {
        "logo-subtitle": "LAWBOOST!",
        "nav-home": "Home",
        "nav-company": "Company Formation",
        "nav-trademark": "Trademark Registration",
        "nav-corporate": "Corporate Advisory",
        "nav-tax": "International Tax",
        "nav-litigation": "Litigation Support",
        "btn-orders": "My Orders",
        "hero-badge": "Cross-Border Legal Advisory",
        "hero-title": "BibleForAI - LAWBOOST!",
        "hero-desc": "Global legal support for company formation, trademarks, corporate governance, international tax, and cross-border litigation.",
        "btn-explore": "Explore Legal Services",
        "btn-compliance": "Check Compliance",
        
        "stat-countries": "Jurisdictions",
        "stat-cases": "Cases Delivered",
        "stat-compliance": "Compliance Score",
        "stat-experience": "Senior Attorneys",
        
        "sec-channels-title": "Comprehensive Global Legal Services",
        "sec-channels-subtitle": "Cross-border legal support matched to your target markets and regulatory requirements.",
        "card-company-title": "Company Formation",
        "card-company-desc": "US, EU, and APAC company incorporation, registered agent setup, and corporate documentation review.",
        "card-trademark-title": "Trademark Registration",
        "card-trademark-desc": "International trademark filing via Madrid Protocol and USPTO, with examiner response support and renewals.",
        "card-corporate-title": "Corporate Advisory",
        "card-corporate-desc": "Governance frameworks, board minutes, compliance workflows, and cross-border merger review.",
        "card-tax-title": "International Tax",
        "card-tax-desc": "Transfer pricing, double-tax treaty analysis, repatriation planning, and regulatory tax filings.",
        "card-litigation-title": "Litigation Support",
        "card-litigation-desc": "Cross-border dispute strategy, local counsel matching, evidence handling, and contract enforcement.",
        "card-view-pricing": "View Pricing",
        
        "comp-title": "Legal Compliance & Regulatory Coverage",
        "comp-desc": "Our global legal network manages jurisdiction-specific requirements, filing rules, and confidentiality protocols for safe and enforceable outcomes.",
        "comp-bullet1-bold": "Local Counsel Network:",
        "comp-bullet1-text": "Licensed attorneys matched to your target jurisdiction.",
        "comp-bullet2-bold": "Confidentiality Protocols:",
        "comp-bullet2-text": "Secure document handling and attorney-client compliant workflows.",
        "comp-bullet3-bold": "Multi-Jurisdiction Support:",
        "comp-bullet3-text": "Coordinated filings across multiple legal systems when needed.",
        
        "view-company-sub": "Incorporate in target markets with a licensed formation team, registered agent support, and compliant corporate documents.",
        "view-trademark-sub": "File, respond, and renew trademarks internationally through coordinated jurisdiction-specific applications.",
        "view-corporate-sub": "Governance, compliance, and board documentation services for global corporate structures.",
        "view-tax-sub": "Tax structure planning, treaty analysis, and filing support for international operations.",
        "view-litigation-sub": "Dispute strategy, local counsel matching, and cross-border enforcement support.",
        "view-orders-title": "My Purchase History",
        "view-orders-sub": "Review your successful orders. Your data is stored locally in your browser workspace.",
        
        "th-date": "Order Date",
        "th-order-id": "Transaction ID",
        "th-product": "Product",
        "th-tier": "Package Tier",
        "th-country": "Target Country",
        "th-qty": "Quantity",
        "th-total": "Total Paid",
        "th-status": "Status",
        
        "no-orders-msg": "No purchase records found. Make your first order to see history here!",
        
        "modal-title": "Configure Order",
        "modal-desc": "Configure quantity and complete secure PayPal payment.",
        "modal-base-pkg": "Base Package:",
        "modal-base-price-label": "Base Price:",
        "modal-email-label": "Email Address *",
        "modal-email-placeholder": "name@example.com",
        "modal-email-error": "Please enter a valid email address.",
        "modal-country-label": "Target Jurisdiction:",
        "modal-qty": "Quantity:",
        "modal-total-amt": "Total Amount:",
        "modal-test-btn": "Run Sandbox Test Checkout",
        
        "badge-ssl": "SSL Secured Checkout",
        "badge-paypal": "PayPal Verified",
        
        "foot-channels": "Legal Services",
        "foot-legal": "Legal & Compliance",
        "foot-gdpr": "Local Counsel Network",
        "foot-canspam": "Confidentiality Protocols",
        "foot-match": "Multi-Jurisdiction Coverage",
        "foot-contact": "Contact support: counsel@bibleforai.com",
        "foot-copy": "&copy; 2026 BibleForAI LAWBOOST. All rights reserved. Global Legal Advisory & Compliance Solutions.",
        
        "order-button": "Order Package",
        "featured-badge": "Best Seller",
        
        // Receipts
        "receipt-header": "BIBLEFORAI - LAWBOOST RECEIPT",
        "receipt-date": "Order Date",
        "receipt-txid": "Transaction ID",
        "receipt-email": "Customer Email",
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
        "logo-subtitle": "LAWBOOST!",
        "nav-home": "홈",
        "nav-company": "회사 설립",
        "nav-trademark": "상표 등록",
        "nav-corporate": "기업 자문",
        "nav-tax": "국제 세무",
        "nav-litigation": "소송 지원",
        "btn-orders": "내 주문 내역",
        "hero-badge": "국경간 법률 자문",
        "hero-title": "BibleForAI - LAWBOOST!",
        "hero-desc": "글로벌 법률 지원: 회사 설립, 상표, 기업거버넌스, 국제 세무, 국경간 소송.",
        "btn-explore": "법률 서비스 둘러보기",
        "btn-compliance": "규정 준수 확인",
        
        "stat-countries": "관할 지역",
        "stat-cases": "완료 사건",
        "stat-compliance": "준수 점수",
        "stat-experience": "시니어 변호사",
        
        "sec-channels-title": "종합 글로벌 법률 서비스",
        "sec-channels-subtitle": "타겟 시장과 규제 요건에 맞춘 국경간 법률 지원.",
        "card-company-title": "회사 설립",
        "card-company-desc": "미국, 유럽, 아시아 태평양 지역 법인 설립, 등록 대리인 구성, 기업 서류 검토.",
        "card-trademark-title": "상표 등록",
        "card-trademark-desc": "마드리드 의정서와 USPTO 기반 국제 상표 출원, 심사 대응 및 갱신 지원.",
        "card-corporate-title": "기업 자문",
        "card-corporate-desc": "거버넌스 프레임워크, 이사회 의사록, 준법 워크플로우, 국경간 합병 검토.",
        "card-tax-title": "국제 세무",
        "card-tax-desc": "이전 가격, 이중과세 조약 분석, 송금 계획, 규제 세무 신고.",
        "card-litigation-title": "소송 지원",
        "card-litigation-desc": "국경간 분쟁 전략, 현지 변호사 매칭, 증거 관리, 계약 집행.",
        "card-view-pricing": "가격 확인하기",
        
        "comp-title": "법률 준수 및 규제 커버리지",
        "comp-desc": "글로벌 법률 네트워크가 관할별 요건, 신고 규칙, 기밀성 프로토콜을 관리하여 안전하고 집행 가능한 결과를 제공합니다.",
        "comp-bullet1-bold": "현지 변호사 네트워크:",
        "comp-bullet1-text": "대상 관할에 매칭된 라이선스 보유 변호사.",
        "comp-bullet2-bold": "기밀성 프로토콜:",
        "comp-bullet2-text": "안전한 문서 관리와 변호사-고객 준수 워크플로우.",
        "comp-bullet3-bold": "다중 관할 지원:",
        "comp-bullet3-text": "필요시 여러 법체계에 걸친 조정 신고.",
        
        "view-company-sub": "타겟 시장에 라이선스 법인 설립 팀, 등록 대리인 지원, 준법 기업 서비스로 설립하세요.",
        "view-trademark-sub": "다국가에 걸쳐 상표를 출원, 대응, 갱신하는 통합 전략을 제공합니다.",
        "view-corporate-sub": "글로벌 기업 구조를 위한 거버넌스, 준법, 이사회 문서 서비스.",
        "view-tax-sub": "국제 운영을 위한 세무 구조 기획, 조약 분석, 신고 지원.",
        "view-litigation-sub": "분쟁 전략, 현지 변호사 매칭, 국경간 집행 지원.",
        "view-orders-title": "내 구매 히스토리",
        "view-orders-sub": "성공한 주문 내역을 검토하세요. 데이터는 브라우저 로컬스토리지에 안전하게 보관됩니다.",
        
        "th-date": "주문 날짜",
        "th-order-id": "트랜잭션 ID",
        "th-product": "상품명",
        "th-tier": "패키지 등급",
        "th-country": "대상 국가",
        "th-qty": "수량",
        "th-total": "총 결제금액",
        "th-status": "상태",
        
        "no-orders-msg": "구매 기록이 없습니다. 첫 주문을 완료하시면 내역이 여기에 표시됩니다!",
        
        "modal-title": "주문 설정",
        "modal-desc": "수량을 선택하고 안전한 PayPal 결제를 진행하세요.",
        "modal-base-pkg": "기본 패키지:",
        "modal-base-price-label": "기본 가격:",
        "modal-email-label": "이메일 주소 *",
        "modal-email-placeholder": "name@example.com",
        "modal-email-error": "올바른 이메일 주소를 입력해주세요.",
        "modal-country-label": "대상 관할:",
        "modal-qty": "수량:",
        "modal-total-amt": "총 결제금액:",
        "modal-test-btn": "샌드박스 테스트 결제 진행",
        
        "badge-ssl": "SSL 보안 결제 지원",
        "badge-paypal": "PayPal 인증됨",
        
        "foot-channels": "법률 서비스",
        "foot-legal": "법률 및 규정 준수",
        "foot-gdpr": "현지 변호사 네트워크",
        "foot-canspam": "기밀성 프로토콜",
        "foot-match": "다중 관할 커버리지",
        "foot-contact": "문의 지원: counsel@bibleforai.com",
        "foot-copy": "&copy; 2026 BibleForAI LAWBOOST. All rights reserved. Global Legal Advisory & Compliance Solutions.",
        
        "order-button": "패키지 주문하기",
        "featured-badge": "베스트 셀러",
        
        // Receipts
        "receipt-header": "BIBLEFORAI - LAWBOOST 영수증",
        "receipt-date": "주문 날짜",
        "receipt-txid": "트랜잭션 ID",
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
    
    // Set document lang attribute
    document.documentElement.lang = lang;
    
    // Update document title and metadata
    document.title = isKo ? "BibleForAI - LAWBOOST | 글로벌 법률 자문 및 규정 준수 솔루션" : "BibleForAI - LAWBOOST | Global Legal Advisory & Compliance Solutions";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.content = isKo ? 
            "국경간 법률 서비스: 회사 설립, 상표 등록, 기업 자문, 국제 세무, 소송 지원, 컴플라이언스 검증, 60+ 관할 지역 라이선스 변호사." : 
            "Cross-border legal services including company formation, trademark filing, corporate governance, international tax advisory, and litigation support across 60+ jurisdictions.";
    }

    // Update Open Graph (OG) and Twitter Metadata tags dynamically
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
        ogTitle.content = isKo ? "BibleForAI - LAWBOOST | 글로벌 법률 자문" : "BibleForAI - LAWBOOST | Global Legal Advisory";
    }
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
        ogDesc.content = isKo ? 
            "글로벌 확장을 위한 준법 기반 법률 자문. 회사 설립, 상표, 세무, 국경간 소송 지원." : 
            "Global legal support for company formation, trademarks, tax, and cross-border litigation with compliant corporate advisory across 60+ jurisdictions.";
    }
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) {
        twTitle.content = isKo ? "BibleForAI - LAWBOOST | 글로벌 법률 자문" : "BibleForAI - LAWBOOST | Global Legal Advisory";
    }
    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) {
        twDesc.content = isKo ? 
            "글로벌 확장을 위한 준법 기반 법률 자문: 회사 설립, 상표, 세무, 국경간 소송 지원." : 
            "Global legal support for company formation, trademarks, tax, and cross-border litigation across 60+ jurisdictions.";
    }

    // Update all elements with data-i18n attribute
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

    // Update language selector value
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

// Setup Scroll Effect on Header
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
    
    // Toggle View Sections Visibility
    document.querySelectorAll('.view-section').forEach(sec => {
        sec.classList.remove('active');
    });
    
    const activeSection = document.getElementById(`${viewId}-view`);
    if (activeSection) {
        activeSection.classList.add('active');
    }
    
    // Toggle Header Menu Active States
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.id === `nav-${viewId}`) {
            link.classList.add('active');
        }
    });

    // Scroll to top of the view
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Mobile Menu Toggle
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
        case 'company': return 'fa-solid fa-building-columns';
        case 'trademark': return 'fa-solid fa-certificate';
        case 'corporate': return 'fa-solid fa-scale-balanced';
        case 'tax': return 'fa-solid fa-coins';
        case 'litigation': return 'fa-solid fa-gavel';
        default: return 'fa-solid fa-scale-balanced';
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
    
    // Fill Modal elements
    document.getElementById('modal-product-title').innerText = `${catTitle}`;
    document.getElementById('modal-package-name').innerText = pkgName;
    document.getElementById('modal-base-price').innerText = formatPrice(pkg.price);
    document.getElementById('order-quantity').value = orderQuantity;
    
    // Reset Email inputs
    const emailInput = document.getElementById('order-email');
    if (emailInput) {
        emailInput.value = '';
        emailInput.style.borderColor = 'var(--border)';
    }
    const emailError = document.getElementById('email-error');
    if (emailError) {
        emailError.style.display = 'none';
    }
    
    // Ensure Developer Test Button is visible
    const testBtn = document.getElementById('paypal-test-button');
    if (testBtn) {
        testBtn.style.display = 'block';
    }
    
    updateModalPrice();
    
    // Open Modal
    document.getElementById('purchase-modal').classList.add('active');
    
    // Auto-scroll to payment area
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
    // Clear PayPal buttons to prevent duplicates
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

// Email Address Validation
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

// Sandbox Test Checkout Trigger
function triggerTestCheckout() {
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

// PayPal checkout integration
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
            const selectedCountry = document.getElementById('order-country').value;
            const finalAmount = (currentPackage.basePrice * orderQuantity).toFixed(2);
            return actions.order.create({
                purchase_units: [{
                    description: `${currentPackage.categoryName} - ${currentPackage.tierName} [Country: ${selectedCountry}] (Qty: ${orderQuantity})`,
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

// LocalStorage Order Logging & Form Redirect
function saveLocalOrder(details) {
    const orderLogs = JSON.parse(localStorage.getItem('lawboost_orders')) || [];
    const selectedCountry = document.getElementById('order-country').value;
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
        country: selectedCountry,
        quantity: orderQuantity,
        basePrice: currentPackage.basePrice,
        totalPaid: formatPrice(currentPackage.basePrice * orderQuantity),
        status: 'Completed',
        clientId: clientId,
        secret: secret
    };
    
    orderLogs.unshift(newOrder);
    localStorage.setItem('lawboost_orders', JSON.stringify(orderLogs));
    
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
${dict["receipt-country"].padEnd(15)} : ${newOrder.country}
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

// Render Orders Tab Table
function renderOrders() {
    const orderLogs = JSON.parse(localStorage.getItem('lawboost_orders')) || [];
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
            <td>${order.country || 'Global'}</td>
            <td>${order.quantity}</td>
            <td><strong>${order.totalPaid}</strong></td>
            <td><span class="status-badge">${isKo ? "완료됨" : order.status}</span></td>
        </tr>
    `).join('');
}
