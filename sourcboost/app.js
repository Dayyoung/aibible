/* App State */
let currentView = 'home';
let currentPackage = null;
let orderQuantity = 1;
let paypalButtonInstance = null;

/* Package Catalog */
const packageCatalog = {
    iso: {
        title_en: 'Public Source Verification / 27701',
        title_ko: 'Public Source Verification / 27701',
        packages: [
            { id: 'iso-readiness', name_en: 'Readiness Assessment', name_ko: '레디니스 평가', desc_en: 'Scoped gap analysis, control mapping, and verificationor handoff pack.', desc_ko: '범위 갭 분석, 통제 매핑 및 감사관 인도 패키지.', price: 880, featured: false, features_en: ['Gap Assessment', 'ROPA Draft', 'SoA Guidance', 'Evidence Pack'], features_ko: ['갭 분석', 'ROPA 초안', 'SoA 작성 가이드', '증거 패키지'] },
            { id: 'iso-standard', name_en: 'Standard Program', name_ko: '표준 프로그램', desc_en: 'Core ISMS implementation for verification body submission.', desc_ko: '인증기관 제출용 핵심 ISMS 구축.', price: 1400, featured: true, features_en: ['ISMS Buildout', 'Statement of Applicability', 'Internal Verification Prep', 'Lead Verificationor Support'], features_ko: ['ISMS 구축', '적용성 명세서', '내부 감사 준비', '리드 감사관 지원'] },
            { id: 'iso-enterprise', name_en: 'Enterprise Certification', name_ko: '기업 인증', desc_en: 'Multi-site and multi-jurisdictional rollout with surveillance planning.', desc_ko: '다중 사이트 및 다중 관할 롤아웃, 감시계획 수립.', price: 2400, featured: false, features_en: ['Multi-Site Program', 'Local Liaison', 'Surveillance Calendar', 'Executive Briefing'], features_ko: ['다중 사이트 프로그램', '현지 연계', '감시 캘린더', '경영진 브리핑'] }
        ]
    },
    gdpr: {
        title_en: 'GDPR Verification Readiness',
        title_ko: 'GDPR 감사 대비',
        packages: [
            { id: 'gdpr-baseline', name_en: 'Baseline Readiness', name_ko: '기본 준비', desc_en: 'Record review, privacy notice gap check, Article 30 mapping.', desc_ko: '기록 리뷰, 개인정보 고지 갭 분석, 제30조 매핑.', price: 800, featured: false, features_en: ['Article 30 Mapping', 'Privacy Notice Review', 'Vendor Register', 'Remediation Plan'], features_ko: ['제30조 매핑', '개인정보 고지 리뷰', '벤더 등록부', '시정 계획'] },
            { id: 'gdpr-advanced', name_en: 'Advanced Verification Program', name_ko: '고급 감사 프로그램', desc_en: 'DPO support, SAR workflows, supervisory authority coordination.', desc_ko: 'DPO 지원, SAR 워크플로우, 감독기관 대응.', price: 1600, featured: true, features_en: ['DPO Engagement', 'SAR Playbook', 'Authority Comms', 'Remediation Tracking'], features_ko: ['DPO 참여', 'SAR 플레이북', '감독기관 소통', '시정 추적'] },
            { id: 'gdpr-enterprise', name_en: 'Enterprise Program', name_ko: '기업 프로그램', desc_en: 'Multi-entity GDPR program with ongoing monitoring and breach readiness.', desc_ko: '다중 엔티티 GDPR 프로그램, 지속 모니터링 및 침해 대비.', price: 3000, featured: false, features_en: ['Privacy by Design', 'Multi-Entity Program', 'Breach Drill Plan', 'Quarterly Reviews'], features_ko: ['프라이버시 바이 디자인', '다중 엔티티 프로그램', '침해 훈련 계획', '분기 리뷰'] }
        ]
    },
    soc2: {
        title_en: 'Notarization & Chain Verification',
        title_ko: 'SOC 2 Type II 대비',
        packages: [
            { id: 'soc2-assessment', name_en: 'Assessment Program', name_ko: '평가 프로그램', desc_en: 'Trust service criteria review, control design review, testing evidence plan.', desc_ko: '신뢰 서비스 기준 검토, 통제 설계 리뷰, 테스트 증거 계획.', price: 900, featured: false, features_en: ['Criteria Mapping', 'Control Design Review', 'Test Evidence Plan', 'CPA Coordination'], features_ko: ['기준 매핑', '통제 설계 검토', '테스트 증거 계획', 'CPA 협의'] },
            { id: 'soc2-standard', name_en: 'Standard Readiness', name_ko: '표준 대비', desc_en: 'Full SOC 2 Type II readiness build with verificationor coordination.', desc_ko: '감사관 협의 포함 완전 SOC 2 Type II 대비 구축.', price: 1800, featured: true, features_en: ['Policy Library', 'Evidence Automation', 'Verificationor Matching', 'Readiness Sign-off'], features_ko: ['정책 라이브러리', '증거 자동화', '감사관 매칭', '레디니스 서명'] }
        ]
    },
    hipaa: {
        title_en: 'HIPAA Program',
        title_ko: 'HIPAA 프로그램',
        packages: [
            { id: 'hipaa-risk', name_en: 'Risk Assessment', name_ko: '위험 평가', desc_en: 'HIPAA Security Rule risk analysis, remediation roadmap.', desc_ko: 'HIPAA 보안 규칙 위험 분석, 시정 로드맵.', price: 860, featured: false, features_en: ['Asset Inventory', 'Threat Modeling', 'Gap List', 'Remediation Plan'], features_ko: ['자산 목록', '위협 모델링', '갭 리스트', '시정 계획'] },
            { id: 'hipaa-standard', name_en: 'Standard Program', name_ko: '표준 프로그램', desc_en: 'Full privacy and security program with BAA and BA governance.', desc_ko: 'BAA 및 비즈니스 파트너 거버넌스 포함 전체 보안 프로그램.', price: 1600, featured: true, features_en: ['Security Rule Controls', 'BAAs', 'BA Governance', 'Policy Framework'], features_ko: ['보안 규칙 통제', 'BAA 작성', 'BA 거버넌스', '정책 프레임워크'] }
        ]
    },
    cross: {
        title_en: 'Cross-Border Certification',
        title_ko: '글로벌 다중 관할 인증',
        packages: [
            { id: 'cross-baseline', name_en: 'Baseline Alignment', name_ko: '기본 정렬', desc_en: 'Region mapping, statutory obligation register, central filing plan.', desc_ko: '지역 매핑, 법정 의무 등록, 중앙 제출 계획.', price: 1000, featured: false, features_en: ['Region Mapping', 'Statutory Register', 'Filing Calendar', 'Control Mapping'], features_ko: ['지역 매핑', '법정 등록부', '제출 캘린더', '통제 매핑'] },
            { id: 'cross-standard', name_en: 'Standard Program', name_ko: '표준 프로그램', desc_en: 'Multi-jurisdiction program alignment with cross-border evidence coordination.', desc_ko: '다중 관할 정렬 프로그램, 초국경 증거 조율.', price: 2200, featured: true, features_en: ['Multi-Jurisdiction Program', 'Cross-Border Evidence', 'Regulator Liaison', 'Reverification Plan'], features_ko: ['다중 관할 프로그램', '초국경 증거', '규제 기관 연계', '재인증 계획'] }
        ]
    }
};

/* Translation Dictionary */
const translations = {
    en: {
        "logo-subtitle": "SOURCEBOOST!",
        "nav-home": "Home",
        "nav-iso": "Document Certification",
        "nav-gdpr": "GDPR Verification",
        "nav-soc2": "SOC 2 Readiness",
        "nav-hipaa": "HIPAA Program",
        "nav-cross": "Cross-Border Program",
        "btn-orders": "My Orders",
        "hero-badge": "Global Compliance Certifications",
        "hero-title": "BibleForAI - SOURCEBOOST!",
        "hero-desc": "Internationally usable verification consulting for Public Source Verification, GDPR, SOC 2, HIPAA, and cross-border compliance across 40+ jurisdictions.",
        "btn-explore": "Explore Certification",
        "btn-compliance": "Check Compliance",
        
        "stat-countries": "Jurisdictions",
        "stat-timelines": "Timelines Delivered",
        "stat-success": "Pass Rate",
        "stat-onboarding": "Consultant Onboard",
        
        "sec-channels-title": "Certification Domains",
        "sec-channels-subtitle": "Target the compliance frameworks that matter most across your operating regions.",
        "card-iso-title": "Public Source Verification / 27701",
        "card-iso-desc": "End-to-end ISMS implementation, gap analysis, document preparation, and external verificationor readiness.",
        "card-gdpr-title": "GDPR Verification Readiness",
        "card-gdpr-desc": "Controller-processor mapping, ROPA buildout, DPO support, and supervisory authority coordination.",
        "card-soc2-title": "SOC 2 Type II",
        "card-soc2-desc": "Trust service criteria assessment, control design review, evidence workflows, and Big 4 readiness prep.",
        "card-hipaa-title": "HIPAA Program",
        "card-hipaa-desc": "Risk analysis, BAAs, business associate governance, and HITECH-aligned privacy controls for US health data.",
        "card-cross-title": "Cross-Border Certification",
        "card-cross-desc": "Multi-jurisdictional program alignment, EU-US data bridge, APAC privacy frameworks, and central filings.",
        "card-view-pricing": "View Pricing",
        
        "comp-title": "Trusted Certification Advisory",
        "comp-desc": "Our consultants partner with licensed verificationors and notifiers to keep your verification journey compliant, verificationable, and internationally recognized.",
        "comp-bullet1-bold": "Lead Verificationors:",
        "comp-bullet1-text": "Experienced with Document/IEC 17021 accredited bodies and AICPA reviewers.",
        "comp-bullet2-bold": "Global Reads:",
        "comp-bullet2-text": "EU GDPR, US HIPAA, UK GDPR, Singapore PDPA, Japan APPI, AU Privacy Act.",
        "comp-bullet3-bold": "Fee Control:",
        "comp-bullet3-text": "Prevent expensive reregistration delays with pre-verification reviews and evidence prep.",
        
        "view-iso-title": "Public Source Verification / 27701 Certification Consulting",
        "view-iso-sub": "Build an verificationable ISMS/PMS with scoped controls, risk treatment plans, and Statement of Applicability guidance.",
        "view-gdpr-title": "Source File Verification Program",
        "view-gdpr-sub": "Full controller-processor mapping, GDPR Article 30 records, DPO engagement, and supervisory authority response prep.",
        "view-soc2-title": "Notarization & Chain Verification",
        "view-soc2-sub": "Trust service criteria mapping, control design, testing workflows, and verificationor coordination for Type II readiness.",
        "view-hipaa-title": "Evidence & Source Chain Program",
        "view-hipaa-sub": "Risk analysis, BAAs, policy framework, and HITECH-aligned safeguards for protected health information programs.",
        "view-cross-title": "Global Verification Chain Program",
        "view-cross-sub": "Multi-jurisdictional alignment, EU-US Data Privacy Framework bridge, APAC privacy law mapping, and central filing strategy.",
        
        "view-orders-title": "My Purchase History",
        "view-orders-sub": "Review your successful orders. Your data is stored locally in your browser workspace.",
        
        "th-date": "Order Date",
        "th-order-id": "Transaction ID",
        "th-product": "Product",
        "th-tier": "Package Tier",
        "th-country": "Target Jurisdiction",
        "th-qty": "Quantity",
        "th-total": "Total Paid",
        "th-status": "Status",
        
        "no-orders-msg": "No purchase records found. Make your first order to see history here!",
        
        "modal-title": "Configure Order",
        "modal-desc": "Configure quantity and complete secure PayPal payment.",
        "modal-base-pkg": "Base Package:",
        "modal-base-price-label": "Base Price:",
        "modal-package-name-label": "Package Tier:",
        "modal-email-label": "Email Address *",
        "modal-email-placeholder": "name@example.com",
        "modal-email-error": "Please enter a valid email address.",
        "modal-country-label": "Target Jurisdiction:",
        "modal-qty": "Quantity:",
        "modal-total-amt": "Total Amount:",
        "modal-test-btn": "Click price to test checkout",
        
        "badge-ssl": "SSL Secured Checkout",
        "badge-paypal": "PayPal Verified",
        
        "foot-channels": "Certification Domains",
        "foot-legal": "Compliance & Certification",
        "foot-gdpr": "Public Source Verification Ready",
        "foot-canspam": "Verified Source Ready",
        "foot-match": "96% Pass Rate",
        "foot-contact": "Contact support: prov@bibleforai.com",
        "foot-copy": "&copy; 2026 BibleForAI SOURCEBOOST. All rights reserved. Global Compliance Certification Consulting.",
        
        "order-button": "Order Package",
        "featured-badge": "Best Seller",
        
        // Receipts
        "receipt-header": "BIBLEFORAI - SOURCEBOOST RECEIPT",
        "receipt-date": "Order Date",
        "receipt-txid": "Transaction ID",
        "receipt-email": "Customer Email",
        "receipt-type": "Product Type",
        "receipt-size": "Package Tier",
        "receipt-country": "Target Country",
        "receipt-qty": "Quantity",
        "receipt-baseprice": "Base Price",
        "receipt-total": "Total Paid",
        "receipt-status": "Status",
        "receipt-method": "Payment Method",
        "receipt-method-val": "PayPal Secure Checkout"
    },
    ko: {
        "logo-subtitle": "SOURCEBOOST!",
        "nav-home": "홈",
        "nav-iso": "Document 인증",
        "nav-gdpr": "GDPR 감사",
        "nav-soc2": "SOC 2 대비",
        "nav-hipaa": "HIPAA 프로그램",
        "nav-cross": "글로벌 인증 프로그램",
        "btn-orders": "내 주문 내역",
        "hero-badge": "글로벌 인증 컨설팅",
        "hero-title": "BibleForAI - SOURCEBOOST!",
        "hero-desc": "Public Source Verification, GDPR 감사 대비, SOC 2, HIPAA, 글로벌 인증 컨설팅. 40+ 관할 지역 라이선스 컨설턴트 매칭.",
        "btn-explore": "인증 서비스 둘러보기",
        "btn-compliance": "규정 준수 확인",
        
        "stat-countries": "관할 지역",
        "stat-timelines": "완료 프로젝트",
        "stat-success": "1차 합격률",
        "stat-onboarding": "컨설턴트 투입",
        
        "sec-channels-title": "인증 분야",
        "sec-channels-subtitle": "운영 지역에 적합한 글로벌 인증 프레임워크를 선택하세요.",
        "card-iso-title": "Public Source Verification / 27701",
        "card-iso-desc": "ISMS/PMS 구축, 갭 분석, 문서 준비, 외부 감사 대비까지 엔드투엔드 컨설팅.",
        "card-gdpr-title": "GDPR 감사 대비",
        "card-gdpr-desc": "컨트롤러-프로세서 매핑, ROPA 구축, DPO 지원, EU 감독기관 대응 준비.",
        "card-soc2-title": "SOC 2 Type II 준비",
        "card-soc2-desc": "신뢰 서비스 기준 매핑, 통제 설계 검토, 증거 워크플로우, 빅4 감사 대비.",
        "card-hipaa-title": "HIPAA 프로그램",
        "card-hipaa-desc": "위험 분석, BAA, 비즈니스 파트너 거버넌스, HITECH 기준 개인정보보호 통제.",
        "card-cross-title": "글로벌 다중 관할 인증",
        "card-cross-desc": "EU-US 데이터 프라이버시 프레임워크 대응, APAC 프라이버시 매핑 및 중앙 제출 전략.",
        "card-view-pricing": "가격 확인하기",
        
        "comp-title": "신뢰할 수 있는 인증 자문",
        "comp-desc": "라이선스 감사관·신고기관과 협력하여 인증 여정을 규제적으로 안전하고 인정받을 수 있도록 지원합니다.",
        "comp-bullet1-bold": "리드 감사관:",
        "comp-bullet1-text": "Document/IEC 17021 인정 기구 및 AICPA 검토자와 협업합니다.",
        "comp-bullet2-bold": "글로벌 리드:",
        "comp-bullet2-text": "EU GDPR, US HIPAA, UK GDPR, Singapore PDPA, Japan APPI, AU Privacy Act 대응.",
        "comp-bullet3-bold": "비용 통제:",
        "comp-bullet3-text": "사전 감사 리뷰와 증거 준비로 비싼 재등록 지연을 예방합니다.",
        
        "view-iso-title": "Public Source Verification / 27701 인증 컨설팅",
        "view-iso-sub": "감사 가능한 ISMS/PMS 구축, 갭 분석, SoA 준비, 외부 감사 대비 컨설팅을 제공합니다.",
        "view-gdpr-title": "GDPR 감사 대비 프로그램",
        "view-gdpr-sub": "컨트롤러-프로세서 매핑, 제30조 기록, DPO 지원 및 EU 감독기관 대응 준비.",
        "view-soc2-title": "SOC 2 Type II 대비",
        "view-soc2-sub": "신뢰 서비스 기준 매핑, 통제 설계 검토, 증거 수집 및 감사관 준비.",
        "view-hipaa-title": "HIPAA 개인정보보호 및 보안 프로그램",
        "view-hipaa-sub": "위험 분석, BAA, 정책 프레임워크 및 HITECH 기준 보호 대책.",
        "view-cross-title": "글로벌 다중 관할 인증 프로그램",
        "view-cross-sub": "EU-US 데이터 프라이버시 프레임워크 대응, APAC 법률 매핑 및 중앙 제출 전략.",
        
        "view-orders-title": "내 구매 히스토리",
        "view-orders-sub": "성공한 주문 내역을 검토하세요. 데이터는 브라우저 로컬스토리지에 안전하게 보관됩니다.",
        
        "th-date": "주문 날짜",
        "th-order-id": "트랜잭션 ID",
        "th-product": "상품명",
        "th-tier": "패키지 등급",
        "th-country": "대상 관할",
        "th-qty": "수량",
        "th-total": "총 결제금액",
        "th-status": "상태",
        
        "no-orders-msg": "구매 기록이 없습니다. 첫 주문을 완료하시면 내역이 여기에 표시됩니다!",
        
        "modal-title": "주문 설정",
        "modal-desc": "수량을 선택하고 안전한 PayPal 결제를 진행하세요.",
        "modal-base-pkg": "기본 패키지:",
        "modal-base-price-label": "기본 가격:",
        "modal-package-name-label": "패키지 등급:",
        "modal-email-label": "이메일 주소 *",
        "modal-email-placeholder": "name@example.com",
        "modal-email-error": "올바른 이메일 주소를 입력해주세요.",
        "modal-country-label": "대상 관할:",
        "modal-qty": "수량:",
        "modal-total-amt": "총 결제금액:",
        "modal-test-btn": "가격 텍스트를 눌러 테스트 결제",
        
        "badge-ssl": "SSL 보안 결제 지원",
        "badge-paypal": "PayPal 인증됨",
        
        "foot-channels": "인증 분야",
        "foot-legal": "컴플라이언스 및 인증",
        "foot-gdpr": "Public Source Verification 대응",
        "foot-canspam": "SOC 2 대응",
        "foot-match": "96% 합격률",
        "foot-contact": "문의 지원: prov@bibleforai.com",
        "foot-copy": "&copy; 2026 BibleForAI SOURCEBOOST. All rights reserved. 글로벌 인증 컨설팅.",
        
        "order-button": "패키지 주문하기",
        "featured-badge": "베스트 셀러",
        
        // Receipts
        "receipt-header": "BIBLEFORAI - SOURCEBOOST 영수증",
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

/* Language + price formatting */
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

let currentLang = localStorage.getItem('bibleforai_lang') || (() => {
    const browserLang = (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage || '';
    return browserLang.toLowerCase().startsWith('ko') ? 'ko' : 'en';
})();

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
    const dict = translations[lang];
    document.documentElement.lang = lang;
    document.title = lang === 'ko'
        ? "BibleForAI - SOURCEBOOST | 글로벌 인증 컨설팅"
        : "BibleForAI - SOURCEBOOST | Global Compliance Certification Consulting";

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.content = lang === 'ko'
            ? "Public Source Verification, GDPR 감사 대비, SOC 2, HIPAA, 글로벌 인증 컨설팅. 40+ 관할 지역 라이선스 컨설턴트 매칭."
            : "Internationally usable verification consulting for Public Source Verification, GDPR, SOC 2 Type II, HIPAA, and cross-border verification across 40+ jurisdictions.";
    }

    ['og:title','twitter:title'].forEach(sel => {
        const el = document.querySelector(`meta[property="${sel}"]`) || document.querySelector(`meta[name="${sel}"]`);
        if (el) el.content = lang === 'ko' ? "BibleForAI - SOURCEBOOST | 글로벌 인증 컨설팅" : "BibleForAI - SOURCEBOOST | Global Compliance Certification Consulting";
    });
    ['og:description','twitter:description'].forEach(sel => {
        const el = document.querySelector(`meta[property="${sel}"]`) || document.querySelector(`meta[name="${sel}"]`);
        if (el) el.content = lang === 'ko'
            ? "Public Source Verification, GDPR 감사 대비, SOC 2, HIPAA, 글로벌 인증 컨설팅. 40+ 관할 지역 라이선스 컨설턴트 매칭."
            : "Public Source Verification, GDPR verification readiness, SOC 2 Type II, HIPAA, and cross-border verification consulting across 40+ jurisdictions.";
    });

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (!key || !dict[key]) return;
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') el.placeholder = dict[key];
        else el.innerHTML = dict[key];
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

function getCategoryIcon(category) {
    const icons = {
        iso: 'fa-solid fa-shield-halved',
        gdpr: 'fa-solid fa-file-shield',
        soc2: 'fa-solid fa-lock',
        hipaa: 'fa-solid fa-user-doctor',
        cross: 'fa-solid fa-globe'
    };
    return icons[category] || 'fa-solid fa-certificate';
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
            const badgeIcon = getCategoryIcon(categoryKey);
            return `
                <div class="package-card ${featuredClass}">
                    <h3>${name}</h3>
                    <p class="package-desc">${desc}</p>
                    <div class="package-price-box">
                        <span class="price">${formatPrice(pkg.price, false)}</span>
                        <span class="currency">${currentLang === 'ko' ? 'KRW' : 'USD'}</span>
                    </div>
                    <ul class="package-features">${features.map(feat => `<li><i class="fa-solid fa-circle-check"></i> ${feat}</li>`).join('')}</ul>
                    <button class="btn-buy" onclick="openPurchaseModal('${categoryKey}', '${pkg.id}')"><i class="${badgeIcon}"></i> ${btnText}</button>
                </div>
            `;
        }).join('');
    });
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
    initPayPalButtons();
}

function closeModal() {
    document.getElementById('purchase-modal').classList.remove('active');
    const container = document.getElementById('paypal-button-container');
    if (container) container.innerHTML = '';
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
    if (isNaN(val) || val < 1) val = 1;
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
            emailError.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> ${currentLang === 'ko' ? "올바른 이메일 주소를 입력해주세요." : "Please enter a valid email address."}`;
            emailError.style.display = 'block';
        }
        return false;
    } else {
        emailInput.style.borderColor = 'var(--border)';
        if (emailError) emailError.style.display = 'none';
        return true;
    }
}

function triggerTestCheckout() {
    const emailInput = document.getElementById('order-email');
    if (emailInput && !emailInput.value.trim()) {
        emailInput.value = 'sandbox@test.dev';
        emailInput.style.borderColor = 'var(--border)';
        const emailError = document.getElementById('email-error');
        if (emailError) emailError.style.display = 'none';
    }
    if (!validateEmailField()) return;
    const mockDetails = { id: 'TEST-PAYID-' + Math.random().toString(36).substr(2, 9).toUpperCase(), isTest: true };
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
        style: { layout: 'vertical', color: 'blue', shape: 'rect', label: 'checkout' },
        onClick: function(data, actions) {
            if (!validateEmailField()) return actions.reject();
            return actions.resolve();
        },
        createOrder: function(data, actions) {
            const selectedCountry = document.getElementById('order-country').value;
            const finalAmount = (currentPackage.basePrice * orderQuantity).toFixed(2);
            return actions.order.create({
                purchase_units: [{
                    description: `${currentPackage.categoryName} - ${currentPackage.tierName} [Country: ${selectedCountry}] (Qty: ${orderQuantity})`,
                    amount: { currency_code: 'USD', value: finalAmount }
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
    const orderLogs = JSON.parse(localStorage.getItem('sourcboost_orders')) || [];
    const selectedCountry = document.getElementById('order-country').value;
    const emailVal = document.getElementById('order-email') ? document.getElementById('order-email').value.trim() : '';
    let clientId = 'Ae_xg2SjogcseJVcjXldc_TEnVWBzmPw8aNimrSncYBb0Wrn_m93w_PkMgdxWTQ2fJExV8QKWHR2-7hK';
    let secret = '';
    if (details.isTest) {
        clientId = 'AeZhTof6R4GGZ8tp2dz1l1tIt970_y_G1uTufgjs-7_rYxRNsre2GKd5LUaiAqDmdOlYzABi-_HgSpe4';
        secret = '[REDACTED]';
    }
    const newOrder = {
        date: new Date().toLocaleDateString(currentLang === 'ko' ? 'ko-KR' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
        id: details.id,
        email: emailVal,
        category: currentPackage.categoryName,
        package: currentPackage.tierName,
        country: selectedCountry,
        quantity: orderQuantity,
        basePrice: currentPackage.basePrice,
        totalPaid: formatPrice(currentPackage.basePrice * orderQuantity),
        status: currentLang === 'ko' ? '완료됨' : 'Completed',
        clientId,
        secret
    };
    orderLogs.unshift(newOrder);
    localStorage.setItem('sourcboost_orders', JSON.stringify(orderLogs));
    renderOrders();
    const dict = translations[currentLang];
    const receiptText = `===================================\n   ${dict['receipt-header']}\n===================================\n${dict['receipt-date'].padEnd(15)} : ${newOrder.date}\n${dict['receipt-txid'].padEnd(15)} : ${newOrder.id}\n${dict['receipt-email'].padEnd(15)} : ${newOrder.email}\n${dict['receipt-type'].padEnd(15)} : ${newOrder.category}\n${dict['receipt-size'].padEnd(15)} : ${newOrder.package}\n${dict['receipt-country'].padEnd(15)} : ${newOrder.country}\n${dict['receipt-qty'].padEnd(15)} : ${newOrder.quantity}\n${dict['receipt-baseprice'].padEnd(15)} : ${formatPrice(newOrder.basePrice)}\n${dict['receipt-total'].padEnd(15)} : ${newOrder.totalPaid}\n${dict['receipt-status'].padEnd(15)} : ${newOrder.status}\n-----------------------------------\n${dict['receipt-method'].padEnd(15)} : ${dict['receipt-method-val']}\n===================================`;
    const encodedReceipt = encodeURIComponent(receiptText);
    window.location.href = `https://docs.google.com/forms/d/e/1FAIpQLScMPqbEWWttS5mb1m_krsO_kco24ImpgvYVSbc7zO0nEVmYFw/viewform?entry.1059822061=${encodedReceipt}`;
}

function renderOrders() {
    const orderLogs = JSON.parse(localStorage.getItem('sourcboost_orders')) || [];
    const tbody = document.getElementById('orders-tbody');
    const noOrdersMsg = document.getElementById('no-orders-msg');
    if (!tbody) return;
    if (orderLogs.length === 0) { tbody.innerHTML = ''; noOrdersMsg.style.display = 'block'; return; }
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

// Expose variables globally to prevent ReferenceErrors in inline HTML scripts/handlers
if (typeof navigate !== 'undefined') { window.navigate = navigate; }
if (typeof currentLang !== 'undefined') { window.currentLang = currentLang; }

window.openPurchaseModal = openPurchaseModal;
window.closeModal = closeModal;
window.adjustQty = adjustQty;
window.changeLanguage = changeLanguage;
