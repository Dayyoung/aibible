// App State
let currentView = 'home';
let currentPackage = null;
let orderQuantity = 1;
let paypalButtonInstance = null;

// Selected Filters for B2B Builder
const selectedFilters = {
    job: 'all',
    industry: 'all',
    country: 'all',
    size: 'all',
    senior: 'all'
};

// Available B2B Credits Packages (Prices are 2x Cost)
const creditPackages = [
    { id: 'b2b-trial', name_en: 'Trial Package (100 Credits)', name_ko: '체험용 패키지 (100크레딧)', desc_en: 'Excellent for testing small targeted sales campaigns.', desc_ko: '소규모 영업 메일 발송 테스트에 적합한 패키지.', price: 80, featured: false, features_en: ['100 Verified B2B Leads', 'CSV/Excel Export Formats', 'Real-time Verification', 'GDPR Compliant Logs'], features_ko: ['100개 검증된 B2B 리드 제공', 'CSV/Excel 파일 형식 지원', '다운로드 시 실시간 메일 검증', 'GDPR 준수 로그 제공'] },
    { id: 'b2b-starter', name_en: 'Starter Package (500 Credits)', name_ko: '스타터 패키지 (500크레딧)', desc_en: 'Ideal for small outreach teams and pilot campaigns.', desc_ko: '소규모 아웃바운드 팀 및 테스트 캠페인용 패키지.', price: 250, featured: false, features_en: ['500 Verified B2B Leads', 'Targeted Filter Matching', 'CRM-Ready Schema Export', 'Priority Email Support'], features_ko: ['500개 검증된 B2B 리드 제공', '타겟 세그먼트 필터 연동', 'CRM 업로드용 데이터 구성', '이메일 우선 고객 지원'] },
    { id: 'b2b-pro', name_en: 'Professional Package (2.5K Credits)', name_ko: '프로페셔널 패키지 (2,500크레딧)', desc_en: 'Best value for standard sales prospecting teams.', desc_ko: '영업 마케팅 팀 및 비즈니스 표준 권장 패키지.', price: 700, featured: true, features_en: ['2,500 Verified B2B Leads', 'High Volume Filtering', 'Weekly Freshness Updates', 'Dedicated Account Manager'], features_ko: ['2,500개 검증된 B2B 리드 제공', '대용량 정밀 필터 지원', '매주 데이터 신선도 체크 제공', '전담 어카운트 매니저 배정'] },
    { id: 'b2b-growth', name_en: 'Growth Package (10K Credits)', name_ko: '성장형 패키지 (10,000크레딧)', desc_en: 'Designed for aggressive sales pipelines and automation.', desc_ko: '공격적인 영업 파이프라인 및 자동화 캠페인용.', price: 2000, featured: false, features_en: ['10,000 Verified B2B Leads', 'Full Custom Export Profiles', 'DNC & Opt-out Check Cleared', 'VIP Dedicated Support'], features_ko: ['10,000개 검증된 B2B 리드 제공', '완벽한 맞춤형 데이터 구조화', 'DNC 스팸/수신거부 완벽 정제', 'VIP 전담 기술 지원 제공'] },
    { id: 'b2b-enterprise', name_en: 'Enterprise Package (50K Credits)', name_ko: '엔터프라이즈 패키지 (50,000크레딧)', desc_en: 'Unlimited directories for corporate expansion.', desc_ko: '글로벌 기업 영업망 확장 및 대규모 데이터용.', price: 7000, featured: false, features_en: ['50,000 Verified B2B Leads', 'Full Global Segment Unlock', 'Custom Webhook / Data Delivery', 'Dedicated Lead Architect Support'], features_ko: ['50,000개 검증된 B2B 리드 제공', '전세계 국가 세그먼트 전체 해제', '커스텀 데이터 배송 지원', '전담 데이터 엔지니어 상담 지원'] }
];

// Base Available Lead Count
const BASE_LEADS = 248500000;

// Translation Dictionaries
const translations = {
    en: {
        "logo-subtitle": "B2B DATABASE!",
        "nav-home": "Home",
        "nav-builder": "Lead Builder",
        "nav-pricing": "Credit Packages",
        "btn-orders": "My Orders",
        "hero-badge": "AI-Powered B2B Directories",
        "hero-title": "BibleForAI - B2B DATABASE!",
        "hero-desc": "Access 250M+ verified corporate decision makers. Build targeted B2B contact lists instantly.",
        "btn-launch-builder": "Launch Lead Builder",
        "btn-compliance": "GDPR & CAN-SPAM Compliance",
        
        "stat-contacts": "B2B Contacts",
        "stat-accuracy": "Accuracy Guarantee",
        "stat-compliant": "GDPR Compliant",
        "stat-contract": "No Monthly Fees",

        "sec-features-title": "Why B2B Teams Choose BibleForAI",
        "sec-features-subtitle": "Save budgets with pay-as-you-go credits. Download clean, direct-dial B2B directories in seconds.",
        "feat-filters-title": "Granular Filters",
        "feat-filters-desc": "Segment leads by job function, industry, technology, company headcount, and exact geographic codes.",
        "feat-scrub-title": "Real-Time Verification",
        "feat-scrub-desc": "We clean emails at the precise moment of download, purging bounces, spam traps, and dead mail servers.",
        "feat-export-title": "CRM-Ready Formats",
        "feat-export-desc": "Direct CSV and Excel outputs formatted perfectly to import into Salesforce, HubSpot, or cold email tools.",

        "comp-title": "100% Legal & Compliant B2B Data",
        "comp-desc": "Our cold email directories are compiled using strict professional public records and opt-in databases, fully audited for data privacy regulations.",
        "comp-bullet1-bold": "GDPR Legitimate Interest:",
        "comp-bullet1-text": "Fully aligned with EU laws for business-to-business outreach.",
        "comp-bullet2-bold": "CAN-SPAM Ready:",
        "comp-bullet2-text": "Includes headers, corporate domains, and physical verification checks.",
        "comp-bullet3-bold": "97% Deliverability:",
        "comp-bullet3-text": "Any bounce rate exceeding 3% is fully reimbursed in credits.",

        "builder-sub": "Configure your target prospect audience. Filter in real-time and export corporate directories.",
        "f-job-title": "Job Title / Function",
        "f-industry-title": "Industry Sector",
        "f-country-title": "Geography",
        "f-size-title": "Company Size",
        "f-senior-title": "Seniority Level",
        "lbl-estimations": "Prospect Estimations",
        "lbl-counter-sub": "matching corporate email and phone contacts available under current filters.",
        "btn-purchase-segment": "Purchase Lead Package",

        "o-all": "All Roles / Sectors",
        "o-c-level": "C-Level Executives",
        "o-marketing": "Sales & Marketing",
        "o-it": "Information Tech (IT)",
        "o-eng": "Engineering & DevOps",
        "o-ops": "Operations & HR",
        "o-finance": "Finance & Accounting",
        "o-health": "Healthcare & Medical",
        
        "o-tech": "Tech & SaaS",
        "o-finance-sec": "Financial & Banking",
        "o-medical-sec": "Medical & Biotech",
        "o-mfg": "Manufacturing",
        "o-retail": "Retail & E-commerce",
        "o-re": "Real Estate",
        "o-edu": "Education & Learning",

        "o-global": "Global (All)",
        "o-us": "United States",
        "o-uk": "United Kingdom",
        "o-ca": "Canada",
        "o-au": "Australia",
        "o-de": "Germany",
        "o-sg": "Singapore",
        "o-kr": "South Korea",

        "o-size1": "1 - 10 employees",
        "o-size2": "11 - 50 employees",
        "o-size3": "51 - 200 employees",
        "o-size4": "201 - 500 employees",
        "o-size5": "501+ employees",

        "o-founder": "Founder / Owner",
        "o-exec": "Executive (C-Level/VP)",
        "o-director": "Director",
        "o-manager": "Manager",
        "o-specialist": "Specialist",

        "pricing-sub": "Pay-as-you-go. Pricing includes 97% delivery guarantee and verified records exports. (2x Original Cost applied)",
        "view-orders-title": "My Purchase History",
        "view-orders-sub": "Review your successful orders. Your data is stored locally in your browser workspace.",
        "th-date": "Order Date",
        "th-order-id": "Transaction ID",
        "th-product": "Product",
        "th-tier": "Package Tier",
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
        "modal-qty": "Quantity:",
        "modal-total-amt": "Total Amount:",
        "modal-test-btn": "Run Sandbox Test Checkout",
        "badge-ssl": "SSL Secured Checkout",
        "badge-paypal": "PayPal Verified",
        
        "lbl-criteria": "Target Lead Filters",
        "lbl-job": "Job Title",
        "lbl-industry": "Industry",
        "lbl-country": "Geography",
        "lbl-size": "Company Size",
        "lbl-senior": "Seniority",

        "foot-channels": "Data Directory",
        "foot-legal": "Legal & Compliance",
        "foot-gdpr": "GDPR Consent Records",
        "foot-canspam": "CAN-SPAM Verified",
        "foot-match": "97% Quality Match",
        "foot-copy": "&copy; 2026 BibleForAI B2B DATABASE. All rights reserved. Secure SMM & Lead databases.",
        "featured-badge": "Best Seller",
        "order-button": "Order Credits",
        
        // Receipts
        "receipt-header": "BIBLEFORAI - B2B DATABASE RECEIPT",
        "receipt-date": "Order Date",
        "receipt-txid": "Transaction ID",
        "receipt-email": "Customer Email",
        "receipt-type": "Product Type",
        "receipt-size": "Package Size",
        "receipt-qty": "Quantity",
        "receipt-baseprice": "Base Price",
        "receipt-total": "Total Paid",
        "receipt-filters": "Applied Target Filters",
        "receipt-status": "Status",
        "receipt-method": "Payment Method",
        "receipt-method-val": "PayPal Secure Checkout"
    },
    ko: {
        "logo-subtitle": "B2B 데이터베이스!",
        "nav-home": "홈",
        "nav-builder": "리드 빌더",
        "nav-pricing": "크레딧 패키지",
        "btn-orders": "내 주문 내역",
        "hero-badge": "AI 기반 B2B 디렉토리",
        "hero-title": "BibleForAI - B2B 데이터베이스!",
        "hero-desc": "검증된 2억 5천만 명 이상의 기업 의사결정권자 연락처를 탐색하세요. 맞춤형 타겟 영업 리스트를 실시간으로 구축할 수 있습니다.",
        "btn-launch-builder": "리드 빌더 시작하기",
        "btn-compliance": "GDPR 및 CAN-SPAM 규정 준수",
        
        "stat-contacts": "B2B 연락처",
        "stat-accuracy": "정확도 보장",
        "stat-compliant": "GDPR 마케팅 준수",
        "stat-contract": "월간 약정 없음",

        "sec-features-title": "성공적인 B2B 영업팀의 선택",
        "sec-features-subtitle": "약정 요금제 없이 필요한 크레딧만 충전하여 합법적으로 수집된 양질의 B2B 연락처를 즉시 다운로드하세요.",
        "feat-filters-title": "다차원 필터링",
        "feat-filters-desc": "직책, 업종, 기술 스택, 회사 규모, 지리적 위치 등의 세부 코드로 정밀 타겟팅을 수행합니다.",
        "feat-scrub-title": "실시간 데이터 검증",
        "feat-scrub-desc": "파일 다운로드 직전 메일 서버의 활성화 포트를 교차 확인하여 스팸 트랩과 바운스 메일을 완전히 제거합니다.",
        "feat-export-title": "CRM 자동 임포트",
        "feat-export-desc": "세일즈포스, 허브스팟 등 주요 세일즈 툴에 오류 없이 업로드할 수 있는 검증된 CSV/Excel 포맷으로 내보냅니다.",

        "comp-title": "글로벌 비즈니스 법률 준수",
        "comp-desc": "BibleForAI가 공급하는 아웃바운드용 디렉토리는 마케팅 동의 필터 및 합법적인 데이터 수집 가이드를 통해 글로벌 규정을 준수합니다.",
        "comp-bullet1-bold": "GDPR legitimate interest 규정:",
        "comp-bullet1-text": "유럽 기업 대상의 비즈니스 제안 활동을 지원하는 정당한 이해관계 기준 준수.",
        "comp-bullet2-bold": "CAN-SPAM 법률 부합:",
        "comp-bullet2-text": "수신거부 및 발송인 신원 확인을 위한 도메인 및 주소 교차검사 통과.",
        "comp-bullet3-bold": "97% 도달율 보장:",
        "comp-bullet3-text": "메일 도달 실패율이 3%를 초과할 경우 해당 바운스 데이터 건은 크레딧으로 100% 보상합니다.",

        "builder-sub": "타겟 잠재 고객을 설정하세요. 필터 적용에 따라 전체 가용 고객 목록이 실시간으로 집계됩니다.",
        "f-job-title": "직책 및 직무 영역",
        "f-industry-title": "비즈니스 업종",
        "f-country-title": "대상 국가 위치",
        "f-size-title": "회사 규모 (직원수)",
        "f-senior-title": "직급 및 권한 레벨",
        "lbl-estimations": "가용 리드 집계",
        "lbl-counter-sub": "현재 적용된 타겟 필터 조건에 부합하는 검증된 이메일 및 전화번호 연락처의 수입니다.",
        "btn-purchase-segment": "리드 데이터 패키지 구매하기",

        "o-all": "전체 보기",
        "o-c-level": "C-Level 경영진",
        "o-marketing": "영업 및 마케팅",
        "o-it": "IT 및 정보 기술",
        "o-eng": "엔지니어링 & DevOps",
        "o-ops": "운영 및 인사(HR)",
        "o-finance": "재무 및 회계",
        "o-health": "의료 및 헬스케어",
        
        "o-tech": "기술 및 SaaS",
        "o-finance-sec": "금융 및 은행업",
        "o-medical-sec": "의료 및 바이오",
        "o-mfg": "제조 및 물류",
        "o-retail": "리테일 및 커머스",
        "o-re": "부동산 및 건설",
        "o-edu": "교육 및 e-러닝",

        "o-global": "글로벌 (전체)",
        "o-us": "미국",
        "o-uk": "영국",
        "o-ca": "캐나다",
        "o-au": "호주",
        "o-de": "독일",
        "o-sg": "싱가포르",
        "o-kr": "대한민국",

        "o-size1": "1 - 10 명 (스타트업)",
        "o-size2": "11 - 50 명 (소기업)",
        "o-size3": "51 - 200 명 (중기업)",
        "o-size4": "201 - 500 명 (중견기업)",
        "o-size5": "501명 이상 (대기업)",

        "o-founder": "창립자 / 소유주",
        "o-exec": "임원진 (C-Level/VP)",
        "o-director": "디렉터 / 부서장",
        "o-manager": "매니저 / 관리자",
        "o-specialist": "실무 담당자",

        "pricing-sub": "필요할 때 충전하여 사용하는 종량제 방식입니다. 97% 도달 보장 및 실시간 데이터 추출 비용이 포함되어 있습니다. (원가의 2배 금액 적용)",
        "view-orders-title": "내 구매 히스토리",
        "view-orders-sub": "성공한 주문 및 충전 내역을 검토하세요. 결제 데이터는 브라우저 로컬저장소에 안전하게 보관됩니다.",
        "th-date": "주문 날짜",
        "th-order-id": "거래 ID",
        "th-product": "상품 종류",
        "th-tier": "패키지 등급",
        "th-qty": "수량",
        "th-total": "결제 총액",
        "th-status": "진행 상태",
        "no-orders-msg": "구매 기록이 없습니다. 리드 빌더나 패키지 상점을 통해 첫 리드를 확보해보세요!",

        "modal-title": "주문 설정 및 결제",
        "modal-desc": "수량을 선택하고 안전한 PayPal 결제를 진행하세요.",
        "modal-base-pkg": "선택 패키지:",
        "modal-base-price-label": "기본 단가:",
        "modal-email-label": "이메일 주소 *",
        "modal-email-placeholder": "name@example.com",
        "modal-email-error": "올바른 이메일 주소를 입력해 주십시오.",
        "modal-qty": "주문 수량:",
        "modal-total-amt": "총 결제금액:",
        "modal-test-btn": "샌드박스 테스트 결제 진행",
        "badge-ssl": "SSL 보안 결제 적용",
        "badge-paypal": "PayPal 보안 인증됨",
        
        "lbl-criteria": "선택 타겟 필터 조건",
        "lbl-job": "직책/직무",
        "lbl-industry": "산업군",
        "lbl-country": "대상 국가",
        "lbl-size": "직원 규모",
        "lbl-senior": "직급 레벨",

        "foot-channels": "데이터 카탈로그",
        "foot-legal": "법률 및 규정 준수",
        "foot-gdpr": "GDPR 마케팅 동의 완료",
        "foot-canspam": "CAN-SPAM 규정 부합",
        "foot-match": "97% 도달 품질 검증",
        "foot-copy": "&copy; 2026 BibleForAI B2B DATABASE. All rights reserved. Secure SMM & Lead databases.",
        "featured-badge": "가장 인기있음",
        "order-button": "크레딧 충전하기",
        
        // Receipts
        "receipt-header": "BIBLEFORAI - B2B 데이터베이스 결제 영수증",
        "receipt-date": "주문 날짜",
        "receipt-txid": "거래 ID",
        "receipt-email": "고객 이메일",
        "receipt-type": "상품 분류",
        "receipt-size": "패키지 규격",
        "receipt-qty": "수량",
        "receipt-baseprice": "기본 가격",
        "receipt-total": "총 결제금액",
        "receipt-filters": "적용된 타겟 필터 목록",
        "receipt-status": "상태",
        "receipt-method": "결제 방식",
        "receipt-method-val": "PayPal 안전 결제"
    }
};

// Fetch current active language from unified key 'bibleforai_lang'
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

// Document Ready
document.addEventListener('DOMContentLoaded', () => {
    // Set initial active views
    applyTranslations();
    renderPackages();
    renderOrders();
    updateLeadEstimates();

    // Hook up filter option clicks
    const filterContainers = ['f-job', 'f-industry', 'f-country', 'f-size', 'f-senior'];
    filterContainers.forEach(containerId => {
        const container = document.getElementById(containerId);
        if (container) {
            container.addEventListener('click', (e) => {
                const button = e.target.closest('.filter-opt');
                if (!button) return;

                // Remove active from siblings
                container.querySelectorAll('.filter-opt').forEach(btn => btn.classList.remove('active'));
                // Make current active
                button.classList.add('active');

                // Map key
                const filterKey = containerId.replace('f-', '');
                selectedFilters[filterKey] = button.getAttribute('data-val');

                updateLeadEstimates();
            });
        }
    });

    // Close modal on backdrop click
    const backdrop = document.getElementById('purchase-modal');
    if (backdrop) {
        backdrop.addEventListener('click', (e) => {
            if (e.target === backdrop) {
                closeModal();
            }
        });
    }
});

// Calculate and update lead estimates dynamically
function updateLeadEstimates() {
    // Ratios logic
    let jobRatio = 1.0;
    let indRatio = 1.0;
    let countryRatio = 1.0;
    let sizeRatio = 1.0;
    let seniorRatio = 1.0;

    // Get active ratios from DOM buttons
    const activeJob = document.querySelector('#f-job .filter-opt.active');
    if (activeJob) jobRatio = parseFloat(activeJob.getAttribute('data-ratio')) || 1.0;

    const activeInd = document.querySelector('#f-industry .filter-opt.active');
    if (activeInd) indRatio = parseFloat(activeInd.getAttribute('data-ratio')) || 1.0;

    const activeCountry = document.querySelector('#f-country .filter-opt.active');
    if (activeCountry) countryRatio = parseFloat(activeCountry.getAttribute('data-ratio')) || 1.0;

    const activeSize = document.querySelector('#f-size .filter-opt.active');
    if (activeSize) sizeRatio = parseFloat(activeSize.getAttribute('data-ratio')) || 1.0;

    const activeSenior = document.querySelector('#f-senior .filter-opt.active');
    if (activeSenior) seniorRatio = parseFloat(activeSenior.getAttribute('data-ratio')) || 1.0;

    // Compute estimate
    const calculatedLeads = Math.round(BASE_LEADS * jobRatio * indRatio * countryRatio * sizeRatio * seniorRatio);
    
    // Animate Counter
    animateCounter(calculatedLeads);

    // Update selections list summary
    renderSelectionSummary();
}

function animateCounter(targetVal) {
    const el = document.getElementById('lead-counter');
    if (!el) return;

    const currentText = el.innerText.replace(/,/g, '');
    let startVal = parseInt(currentText) || 0;
    
    if (startVal === targetVal) {
        el.innerText = targetVal.toLocaleString();
        return;
    }

    const duration = 400; // ms
    const startTime = performance.now();

    function step(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3); // easeOutCubic
        const currentVal = Math.round(startVal + ease * (targetVal - startVal));
        el.innerText = currentVal.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(step);
        } else {
            el.innerText = targetVal.toLocaleString();
        }
    }
    requestAnimationFrame(step);
}

// Render selection criteria summary box
function renderSelectionSummary() {
    const container = document.getElementById('selections-summary');
    if (!container) return;

    const lang = currentLang;
    const isKo = lang === 'ko';
    
    const activeJobText = document.querySelector('#f-job .filter-opt.active').innerText;
    const activeIndText = document.querySelector('#f-industry .filter-opt.active').innerText;
    const activeCountryText = document.querySelector('#f-country .filter-opt.active').innerText;
    const activeSizeText = document.querySelector('#f-size .filter-opt.active').innerText;
    const activeSeniorText = document.querySelector('#f-senior .filter-opt.active').innerText;

    container.innerHTML = `
        <div class="summary-item">
            <span class="summary-label">${translations[lang]['lbl-job']}:</span>
            <span class="summary-val">${activeJobText}</span>
        </div>
        <div class="summary-item">
            <span class="summary-label">${translations[lang]['lbl-industry']}:</span>
            <span class="summary-val">${activeIndText}</span>
        </div>
        <div class="summary-item">
            <span class="summary-label">${translations[lang]['lbl-country']}:</span>
            <span class="summary-val">${activeCountryText}</span>
        </div>
        <div class="summary-item">
            <span class="summary-label">${translations[lang]['lbl-size']}:</span>
            <span class="summary-val">${activeSizeText}</span>
        </div>
        <div class="summary-item">
            <span class="summary-label">${translations[lang]['lbl-senior']}:</span>
            <span class="summary-val">${activeSeniorText}</span>
        </div>
    `;
}

// Dynamic Packages Grid
function renderPackages() {
    const grid = document.getElementById('pricing-packages');
    if (!grid) return;

    grid.innerHTML = '';
    const lang = currentLang;

    creditPackages.forEach(pkg => {
        const name = lang === 'ko' ? pkg.name_ko : pkg.name_en;
        const desc = lang === 'ko' ? pkg.desc_ko : pkg.desc_en;
        const features = lang === 'ko' ? pkg.features_ko : pkg.features_en;
        
        let featuresHtml = '';
        features.forEach(f => {
            featuresHtml += `<li><i class="fa-solid fa-circle-check"></i> ${f}</li>`;
        });

        const isPro = pkg.featured;
        const cardClass = isPro ? 'package-card featured' : 'package-card';
        const badgeHtml = isPro ? `<span class="featured-badge" data-i18n="featured-badge">${translations[lang]['featured-badge']}</span>` : '';

        const card = document.createElement('div');
        card.className = cardClass;
        card.innerHTML = `
            ${badgeHtml}
            <h3 class="package-name">${name}</h3>
            <p class="package-desc">${desc}</p>
            <div class="price-box">
                <span class="price-amt">${formatPrice(pkg.price, false)}</span>
            </div>
            <ul class="features-list">
                ${featuresHtml}
            </ul>
            <button onclick="openPurchaseModal('${pkg.id}')" data-i18n="order-button">${translations[lang]['order-button']}</button>
        `;
        grid.appendChild(card);
    });
}

// Open modal for buying credits
function openPurchaseModal(packageId) {
    const pkg = creditPackages.find(p => p.id === packageId);
    if (!pkg) return;

    currentPackage = pkg;
    orderQuantity = 1;

    const lang = currentLang;
    const isKo = lang === 'ko';

    // Set fields
    document.getElementById('modal-package-name').innerText = isKo ? pkg.name_ko : pkg.name_en;
    document.getElementById('modal-base-price').innerText = formatPrice(pkg.price);
    document.getElementById('order-quantity').value = orderQuantity;
    document.getElementById('order-email').value = '';
    document.getElementById('email-error').style.display = 'none';

    // Show criteria snapshot block if they triggered it from builder
    const criteriaBox = document.getElementById('modal-criteria-box');
    const criteriaDetails = document.getElementById('modal-criteria-details');
    
    if (currentView === 'builder') {
        criteriaBox.style.display = 'block';
        
        const activeJobText = document.querySelector('#f-job .filter-opt.active').innerText;
        const activeIndText = document.querySelector('#f-industry .filter-opt.active').innerText;
        const activeCountryText = document.querySelector('#f-country .filter-opt.active').innerText;
        const activeSizeText = document.querySelector('#f-size .filter-opt.active').innerText;
        const activeSeniorText = document.querySelector('#f-senior .filter-opt.active').innerText;

        criteriaDetails.innerHTML = `
            <div><strong>${translations[lang]['lbl-job']}:</strong> ${activeJobText}</div>
            <div><strong>${translations[lang]['lbl-industry']}:</strong> ${activeIndText}</div>
            <div><strong>${translations[lang]['lbl-country']}:</strong> ${activeCountryText}</div>
            <div><strong>${translations[lang]['lbl-size']}:</strong> ${activeSizeText}</div>
            <div><strong>${translations[lang]['lbl-senior']}:</strong> ${activeSeniorText}</div>
        `;
    } else {
        criteriaBox.style.display = 'none';
        criteriaDetails.innerHTML = '';
    }

    updateModalPrice();

    // Toggle backdrop visibility
    document.getElementById('purchase-modal').classList.add('active');

    // Load PayPal
    initPayPalSdk();
}

function updateModalPrice() {
    if (!currentPackage) return;
    const qtyInput = document.getElementById('order-quantity');
    orderQuantity = parseInt(qtyInput.value) || 1;
    if (orderQuantity < 1) {
        orderQuantity = 1;
        qtyInput.value = 1;
    }

    const total = currentPackage.price * orderQuantity;
    document.getElementById('modal-total-price').innerText = formatPrice(total);

    // Re-render PayPal buttons with new total amount
    if (window.paypal && paypalButtonInstance) {
        paypalButtonInstance.close();
        renderPayPalButtons();
    }
}

function adjustQty(amount) {
    const qtyInput = document.getElementById('order-quantity');
    let val = parseInt(qtyInput.value) || 1;
    val += amount;
    if (val < 1) val = 1;
    qtyInput.value = val;
    updateModalPrice();
}

function closeModal() {
    document.getElementById('purchase-modal').classList.remove('active');
    if (paypalButtonInstance) {
        paypalButtonInstance.close();
        paypalButtonInstance = null;
    }
    currentPackage = null;
}

// Validate Email Address Format
function validateEmailField() {
    const emailInput = document.getElementById('order-email');
    const errorSpan = document.getElementById('email-error');
    const emailVal = emailInput.value.trim();

    // Standard RFC 5322 regex validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValid = emailRegex.test(emailVal);

    if (!isValid) {
        errorSpan.style.display = 'block';
        emailInput.style.borderColor = '#ef4444';
        return false;
    } else {
        errorSpan.style.display = 'none';
        emailInput.style.borderColor = 'rgba(255,255,255,0.06)';
        return true;
    }
}

// PayPal checkout init
function initPayPalSdk() {
    if (window.paypal) {
        renderPayPalButtons();
    }
}

function renderPayPalButtons() {
    const container = document.getElementById('paypal-button-container');
    if (!container) return;

    container.innerHTML = '';
    
    paypalButtonInstance = window.paypal.Buttons({
        style: {
            layout: 'vertical',
            color:  'gold',
            shape:  'rect',
            label:  'paypal'
        },
        onClick: function(data, actions) {
            // Check email before loading payment flow
            const emailValid = validateEmailField();
            if (!emailValid) {
                return actions.reject();
            }
            return actions.resolve();
        },
        createOrder: function(data, actions) {
            const totalAmount = (currentPackage.price * orderQuantity).toFixed(2);
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        currency_code: 'USD',
                        value: totalAmount
                    },
                    description: `${currentPackage.name_en} x${orderQuantity}`
                }]
            });
        },
        onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
                // Log and process successful PayPal transaction
                processOrderCompleted(details.id);
            });
        },
        onError: function(err) {
            console.error('PayPal Checkout error: ', err);
        }
    });

    paypalButtonInstance.render('#paypal-button-container');
}

// Trigger developer sandbox test checkout
function triggerTestCheckout() {
    // Developer sandbox: auto-fill mock email if field is empty
    const emailInput = document.getElementById('order-email');
    if (emailInput && !emailInput.value.trim()) {
        emailInput.value = 'sandbox@test.dev';
        emailInput.style.borderColor = 'rgba(255,255,255,0.06)';
        const emailError = document.getElementById('email-error');
        if (emailError) emailError.style.display = 'none';
    }
    const emailValid = validateEmailField();
    if (!emailValid) return;

    const mockTxId = 'SANDBOX-B2B-' + Math.random().toString(36).substring(2, 11).toUpperCase();
    processOrderCompleted(mockTxId);
}

// Order completed process: Save to LocalStorage, Generate plain receipt, Redirect parameters to Google Form
function processOrderCompleted(txId) {
    const email = document.getElementById('order-email').value.trim();
    const pkg = currentPackage;
    const qty = orderQuantity;
    const total = pkg.price * qty;

    // Filters snapshot text
    let filtersSnapshot = "N/A";
    if (currentView === 'builder') {
        const activeJobText = document.querySelector('#f-job .filter-opt.active').innerText;
        const activeIndText = document.querySelector('#f-industry .filter-opt.active').innerText;
        const activeCountryText = document.querySelector('#f-country .filter-opt.active').innerText;
        const activeSizeText = document.querySelector('#f-size .filter-opt.active').innerText;
        const activeSeniorText = document.querySelector('#f-senior .filter-opt.active').innerText;
        
        filtersSnapshot = `Role: ${activeJobText} | Industry: ${activeIndText} | Geo: ${activeCountryText} | Size: ${activeSizeText} | Seniority: ${activeSeniorText}`;
    }

    const orderData = {
        date: new Date().toLocaleDateString(currentLang === 'ko' ? 'ko-KR' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
        transactionId: txId,
        product: 'B2B Lead Database',
        tier: currentLang === 'ko' ? pkg.name_ko : pkg.name_en,
        filters: filtersSnapshot,
        qty: qty,
        total: formatPrice(total),
        status: 'Completed'
    };

    // Save locally
    const existingOrders = JSON.parse(localStorage.getItem('bibleforai_orders')) || [];
    existingOrders.unshift(orderData);
    localStorage.setItem('bibleforai_orders', JSON.stringify(existingOrders));

    // Generate plain-text readable receipt for Google Form submission
    const lang = currentLang;
    const receiptText = `
=============================================
${translations[lang]['receipt-header']}
=============================================
${translations[lang]['receipt-date']}: ${orderData.date}
${translations[lang]['receipt-txid']}: ${orderData.transactionId}
${translations[lang]['receipt-email']}: ${email}
${translations[lang]['receipt-type']}: ${orderData.product}
${translations[lang]['receipt-size']}: ${orderData.tier}
${translations[lang]['receipt-filters']}: ${orderData.filters}
${translations[lang]['receipt-qty']}: ${orderData.qty}
${translations[lang]['receipt-baseprice']}: ${formatPrice(pkg.price)}
${translations[lang]['receipt-total']}: ${orderData.total}
${translations[lang]['receipt-status']}: ${orderData.status}
${translations[lang]['receipt-method']}: ${translations[lang]['receipt-method-val']}
=============================================
`;

    // Construct JSON object parameter to pass via GET query parameter
    const submissionData = {
        transaction_id: txId,
        email: email,
        product_name: orderData.product,
        package_size: orderData.tier,
        filters_applied: filtersSnapshot,
        quantity: qty,
        unit_price: '$' + pkg.price.toFixed(2),
        total_paid: orderData.total,
        purchase_date: orderData.date,
        receipt_invoice: receiptText
    };

    // Encode JSON and build Google Form redirect target URL
    const jsonString = JSON.stringify(submissionData);
    const encodedJson = encodeURIComponent(jsonString);
    const formUrl = `https://docs.google.com/forms/d/e/1FAIpQLScMPqbEWWttS5mb1m_krsO_kco24ImpgvYVSbc7zO0nEVmYFw/viewform?entry.1059822061=${encodedJson}`;

    // Close modal, re-render, and redirect
    closeModal();
    renderOrders();
    
    // Redirect customer
    window.location.href = formUrl;
}

// Render local storage purchase logs
function renderOrders() {
    const tbody = document.getElementById('orders-tbody');
    const msg = document.getElementById('no-orders-msg');
    if (!tbody) return;

    tbody.innerHTML = '';
    const orders = JSON.parse(localStorage.getItem('bibleforai_orders')) || [];
    
    // Filter only B2B Lead Database records (since other tools share bibleforai_orders key)
    const b2bOrders = orders.filter(o => o.product === 'B2B Lead Database');

    if (b2bOrders.length === 0) {
        msg.style.display = 'flex';
        return;
    }

    msg.style.display = 'none';
    b2bOrders.forEach(o => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${o.date}</td>
            <td class="tx-link">${o.transactionId}</td>
            <td>${o.product}</td>
            <td>${o.tier}</td>
            <td>${o.qty}</td>
            <td style="font-weight:700; color:var(--primary);">${o.total}</td>
            <td><span class="badge-status badge-completed">${o.status}</span></td>
        `;
        tbody.appendChild(row);
    });
}

// Router Navigation
function navigate(viewName) {
    currentView = viewName;

    // Toggle active link tags
    document.querySelectorAll('.nav-links a').forEach(el => el.classList.remove('active'));
    const navLink = document.getElementById('nav-' + viewName);
    if (navLink) navLink.classList.add('active');

    // Toggle active view sections
    document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
    const section = document.getElementById(viewName + '-view');
    if (section) section.classList.add('active');

    // Re-evaluate counter animations on entering builder view
    if (viewName === 'builder') {
        updateLeadEstimates();
    }
}

// Change language state and persist in 'bibleforai_lang'
function changeLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('bibleforai_lang', lang);
    applyTranslations();
    renderPackages();
    renderOrders();
    updateLeadEstimates();
}

function applyTranslations() {
    const lang = currentLang;
    const isKo = lang === 'ko';
    
    // Set lang parameter
    document.documentElement.lang = lang;

    // Dynamic Header SEO properties
    document.title = isKo ? 
        "BibleForAI - B2B 데이터베이스 | 타겟 기업 이메일 리스트 및 연락처 추출" : 
        "BibleForAI - B2B DATABASE | Target Corporate Email Lists & B2B Contacts";
    
    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) {
        descMeta.content = isKo ?
            "합법적이고 검증된 고정밀 B2B 이메일 리스트를 구축하고 크레딧 요금제로 즉시 다운로드하세요. 의사결정권자의 직책, 산업군, 직원수 및 국가 필터 제공." :
            "Build and download highly accurate, GDPR-compliant B2B email lists. Segment corporate decision makers by industry, job title, company size, and geography.";
    }

    // Dynamic OG and Twitter attributes update
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.content = isKo ? "BibleForAI - B2B 데이터베이스 | 타겟 B2B 고객 리스트" : "BibleForAI - B2B DATABASE | Targeted B2B Contacts";
    
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.content = isKo ? "검증된 2억 5천만 명 이상의 기업 의사결정권자 타겟 고객 데이터를 확보하세요. 크레딧 종량제 제공." : "Access over 250M+ verified corporate contacts. Build customized, GDPR-compliant email lists filtered by industry and seniority.";

    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.content = isKo ? "BibleForAI - B2B 데이터베이스" : "BibleForAI - B2B DATABASE | Target Corporate Email Lists";
    
    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) twDesc.content = isKo ? "검증된 B2B 연락처 리스트를 97% 이상의 도달율 보장 혜택과 함께 구축 및 추출하세요." : "Build targeted B2B prospect lists with 97%+ accuracy guarantee. Real-time verification on export.";

    // Translate statically tagged DOM segments
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const text = translations[lang][key];
        
        if (text) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = text;
            } else {
                el.innerHTML = text;
            }
        }
    });

    // Update language select box index value
    const selector = document.getElementById('language-selector');
    if (selector) {
        selector.value = lang;
    }
}

// Mobile Slide Menu drawer toggle
function toggleMobileMenu() {
    const drawer = document.getElementById('mobile-drawer');
    drawer.classList.toggle('active');
}

// Order current builder segment
function orderCurrentSegment() {
    // Open modal with Growth/Pro Package as default base for custom builder exports
    openPurchaseModal('b2b-pro');
}
