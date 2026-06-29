// App State
let currentView = 'home';
let currentPackage = null;
let orderQuantity = 1;
let paypalButtonInstance = null;

// Package Catalog with Localized Keys
const packageCatalog = {
    setup: {
        title_en: 'Map Listing Setup',
        title_ko: '맵 리스팅 설정',
        packages: [
            { id: 'setup-trial', name_en: 'Starter Package', name_ko: '스타터 패키지', desc_en: 'Single place profile audit and cleanup.', desc_ko: '단일 지역 프로파일 감사 및 정리 패키지.', price: 60, featured: false, features_en: ['Profile Audit', 'Category Cleanup', 'Description Rewrite', 'Email Support'], features_ko: ['프로파일 감사', '카테고리 정리', '설명 문구 최적화', '이메일 지원'] },
            { id: 'setup-mid', name_en: 'Growth Package', name_ko: '성장 패키지', desc_en: 'Multi-property setup with hours and services.', desc_ko: '운영시간 및 서비스 항목 다중 최적화.', price: 160, featured: true, features_en: ['Multi-Profile Setup', 'Hours + Services', 'Photo Strategy', 'Priority Support'], features_ko: ['다중 프로파일 설정', '운영시간 및 서비스', '사진 전략', '우선 고객 지원'] },
            { id: 'setup-max', name_en: 'Authority Package', name_ko: '권위 패키지', desc_en: 'Full brand presence build with map modules.', desc_ko: '브랜드 맵 신뢰성 구축 전체 패키지.', price: 300, featured: false, features_en: ['Brand Authority Setup', 'Map Modules', 'SEO Review', 'Dedicated Manager'], features_ko: ['브랜드 권위 구축', '맵 모듈 구성', 'SEO 액션 리뷰', '전담 매니저'] },
        ]
    },
    platform: {
        title_en: 'Platform Pack',
        title_ko: '플랫폼 팩',
        packages: [
            { id: 'platform-trial', name_en: 'Dual Maps Pack', name_ko: '듀얼 맵 팩', desc_en: 'Setup on Google + Apple Maps for one location.', desc_ko: '구글 + 애플맵 1개 지역 세팅입니다.', price: 120, featured: false, features_en: ['Google Maps Setup', 'Apple Maps Setup', 'Citation Fix', 'Email Support'], features_ko: ['구글맵 세팅', '애플맵 세팅', '인용 정리', '이메일 지원'] },
            { id: 'platform-mid', name_en: 'Triple Maps Pack', name_ko: '트리플 맵 팩', desc_en: 'Add Naver Map and standardize all citations.', desc_ko: '네이버 지도 추가 및 인용 통일 세팅입니다.', price: 220, featured: true, features_en: ['Adds Naver Map', 'Citations Standardized', 'Platform Sync', 'Priority Support'], features_ko: ['네이버 지도 추가', '인용 통일', '플랫폼 동기화', '우선 고객 지원'] },
            { id: 'platform-max', name_en: 'Regional Pack', name_ko: '리전 팩', desc_en: 'Multi-regional directory set for MAP relations.', desc_ko: '리전별 디렉토리 구성으로 지역 관계 확장입니다.', price: 4000, featured: false, features_en: ['Regional Directories', 'Map Relations', 'Review Templates', 'Dedicated Manager'], features_ko: ['리전 디렉토리', '맵 연계성', '리뷰 템플릿', '전담 매니저'] },
        ]
    },
    review: {
        title_en: 'Review & Ranking',
        title_ko: '리뷰 & 랭킹',
        packages: [
            { id: 'review-trial', name_en: 'Basic Rank Watch', name_ko: '베이직 랭크 감시', desc_en: 'Weekly keyword rank check for map surfaces.', desc_ko: '주간 키워드 랭크 확인으로 맵 노출을 감시합니다.', price: 80, featured: false, features_en: ['Rank Check', 'Score Log', 'Weekly Report', 'Email Support'], features_ko: ['랭크 확인', '점수 기록', '주간 리포트', '이메일 지원'] },
            { id: 'review-mid', name_en: 'Rating Ops Package', name_ko: '평점 운영 패키지', desc_en: 'Review playbook + response drafting and monitoring.', desc_ko: '리뷰 플레이북 및 응답 초안 작성과 모니터링입니다.', price: 180, featured: true, features_en: ['Review Playbook', 'Response Drafts', 'Sentiment Tracking', 'Priority Support'], features_ko: ['리뷰 플레이북', '응답 초안', '감성 추적', '우선 고객 지원'] },
            { id: 'review-max', name_en: 'Reputation Retainer', name_ko: '평판 정기 패키지', desc_en: 'Full map reputation support and protection setup.', desc_ko: '맵 평판 보호 및 관리를 위한 정기 운영입니다.', price: 800, featured: false, features_en: ['Reputation Guard', 'Bad Review Protocol', 'Review Analytics', 'Dedicated Manager'], features_ko: ['평판 가드', '부정 리뷰 대응', '리뷰 분석', '전담 매니저'] },
        ]
    },
    seo: {
        title_en: 'Local SEO Extras',
        title_ko: '로컬 SEO 부가서비스',
        packages: [
            { id: 'seo-trial', name_en: 'Near-Me Signal Pack', name_ko: 'Near-Me 시그널 팩', desc_en: 'Low-cost near-me signal strengthening workflow.', desc_ko: '저비용으로 Near-Me 검색 시그널을 강화합니다.', price: 90, featured: false, features_en: ['Near-Me Keywords', 'Schema Fix', 'Landing Signals', 'Email Support'], features_ko: ['Near-Me 키워드', '스키마 정리', '랜딩 시그널', '이메일 지원'] },
            { id: 'seo-mid', name_en: 'Local Anchor Pack', name_ko: '로컬 앵커 팩', desc_en: 'Citation refresh plus local anchor links and pages.', desc_ko: '인용 갱신과 로컬 앵커 링크 및 페이지 구성입니다.', price: 220, featured: true, features_en: ['Citation Refresh', 'Local Anchors', 'Mini Landing Pages', 'Priority Support'], features_ko: ['인용 갱신', '로컬 앵커', '미니 랜딩 페이지', '우선 고객 지원'] },
            { id: 'seo-max', name_en: 'Foundational Pack', name_ko: '파운데이셔널 팩', desc_en: 'End-to-end local ranking stack foundational support.', desc_ko: '엔드투엔드 로컬 랭킹 스택 기반 구성입니다.', price: 700, featured: false, features_en: ['Full Stack Audit', 'Competitor Gap', 'Execution Roadmap', 'Dedicated Manager'], features_ko: ['풀스택 감사', '경쟁사 갭 분석', '실행 로드맵', '전담 매니저'] },
        ]
    }
};

// Translation Dictionary
const translations = {
    en: {
        "logo-subtitle": "MAP BOOST",
        "nav-home": "Home",
        "nav-setup": "Map Setup",
        "nav-platform": "Platform Pack",
        "nav-review": "Review & Ranking",
        "nav-seo": "Local SEO Extras",
        "btn-orders": "My Orders",
        "hero-badge": "Map Discovery & Ranking",
        "hero-title": "MAPBOOST — Local & Map SEO Optimization",
        "hero-desc": "Rank higher on Google Maps, Apple Maps, Naver Map, and regional map listings via verified local signals.",
        "btn-explore": "Start Map Setup",
        "btn-compliance": "Quality Guarantee",

        "stat-platforms": "Platform Types",
        "stat-delivery": "Setup Launch",
        "stat-days": "Ranking Timeline",
        "stat-ethical": "Ethical Tactics",

        "sec-channels-title": "Map Listing Optimization Modules",
        "sec-channels-subtitle": "Each module uses verified map signals, citation consistency, review health, and local ranking best practices by region.",
        "card-setup-title": "Map Listing Setup",
        "card-setup-desc": "Verify and optimize place profiles, categories, services, and description signals for map discoverability.",
        "card-platform-title": "Platform Pack",
        "card-platform-desc": "Multi-platform setup across Google, Apple, Naver, and regional maps with a standardized citation strategy.",
        "card-review-title": "Review & Ranking",
        "card-review-desc": "Monitor ratings, manage review playbooks, and stabilize local rank position with rank-tracking routines.",
        "card-seo-title": "Local SEO Extras",
        "card-seo-desc": "Enhance local search visibility with schema, landing signals, citation refresh, and near-me content workflows.",
        "card-view-pricing": "View Pricing",

        "comp-title": "Ethical Local Ranking Standards",
        "comp-desc": "MAPBOOST follows place-provider guidelines using legitimate citation, profile, and review-quality strategies. No account-risk tactics.",
        "comp-bullet1-bold": "Platform Compliant:",
        "comp-bullet1-text": "Optimization for Google Maps, Apple Maps, Naver Map, and regional directories only.",
        "comp-bullet2-bold": "Verified Local Signals:",
        "comp-bullet2-text": "Uses real place metadata, categories, and citation references for durable ranks.",
        "comp-bullet3-bold": "Review Safeguards:",
        "comp-bullet3-text": "Review health guidance protects listings against suspicious engagement patterns.",

        "view-setup-sub": "Launch a verified optimized listing profile. Fix categories, services, hours, and description accuracy.",
        "view-platform-sub": "Deploy standardized listings across Google, Apple, Naver, and regional maps with citation consistency.",
        "view-review-sub": "Track rank movement, monitor review sentiment, and keep listings in healthy standing.",
        "view-seo-sub": "Boost near-me visibility with schema, local anchor signals, citation refresh, and mini landing content.",
        "view-orders-title": "My Purchase History",
        "view-orders-sub": "Review your successful orders. Your data is stored locally in your browser workspace.",

        "th-date": "Order Date",
        "th-order-id": "Transaction ID",
        "th-product": "Product",
        "th-tier": "Package Tier",
        "th-keyword": "Target Keyword",
        "th-qty": "Quantity",
        "th-total": "Total Paid",
        "th-status": "Status",

        "no-orders-msg": "No purchase records found. Make your first order to see history here!",

        "modal-title": "Configure Order",
        "modal-desc": "Configure keyword strategy and complete secure PayPal payment.",
        "modal-base-pkg": "Base Package:",
        "modal-base-price-label": "Base Price:",
        "modal-email-label": "Email Address *",
        "modal-email-placeholder": "name@example.com",
        "modal-email-error": "Please enter a valid email address.",
        "modal-keyword-label": "Target Keyword *",
        "modal-keyword-placeholder": "e.g. coffee shop",
        "modal-keyword-error": "Please enter a target keyword.",
        "modal-qty": "Quantity:",
        "modal-total-amt": "Total Amount:",
        "modal-test-btn": "Click price to test checkout",

        "badge-ssl": "SSL Secured Checkout",
        "badge-paypal": "PayPal Verified",

        "foot-services": "Services",
        "foot-support": "Support",
        "foot-contact": "Contact support: snsherocom@gmail.com",
        "foot-gdpr": "Ethical local ranking",
        "foot-copy": "&copy; 2026 BibleForAI MAPBOOST. All rights reserved. Local & Map SEO Optimization.",

        "order-button": "Order Package",
        "featured-badge": "Best Seller",

        // Receipts
        "receipt-header": "BIBLEFORAI - MAPBOOST RECEIPT",
        "receipt-date": "Order Date",
        "receipt-txid": "Transaction ID",
        "receipt-email": "Customer Email",
        "receipt-type": "Product Type",
        "receipt-size": "Package Size",
        "receipt-keyword": "Target Keyword",
        "receipt-qty": "Quantity",
        "receipt-baseprice": "Base Price",
        "receipt-total": "Total Paid",
        "receipt-status": "Status",
        "receipt-method": "Payment Method",
        "receipt-method-val": "PayPal Secure Checkout"
    },
    ko: {
        "logo-subtitle": "MAP BOOST",
        "nav-home": "홈",
        "nav-setup": "맵 설정",
        "nav-platform": "플랫폼 팩",
        "nav-review": "리뷰 & 랭킹",
        "nav-seo": "로컬 SEO 부가",
        "btn-orders": "내 주문 내역",
        "hero-badge": "맵 노출 & 랭킹",
        "hero-title": "MAPBOOST — 로컬 & 맵 SEO 최적화",
        "hero-desc": "Google Maps, Apple Maps, Naver Map, 및 지역형 맵 플랫폼 상단 노출을 위한 검증된 로컬 시그널 최적화입니다.",
        "btn-explore": "맵 설정 시작",
        "btn-compliance": "품질 보장",

        "stat-platforms": "플랫폼 종류",
        "stat-delivery": "설정 런칭",
        "stat-days": "랭킹 소요",
        "stat-ethical": "윤리적 방식",

        "sec-channels-title": "맵 리스팅 최적화 모듈",
        "sec-channels-subtitle": "모든 모듈은 지역별 최적 모범 사례로 검증된 맵 시그널, 인용 일관성, 리뷰 헬스, 로컬 랭킹을 다룹니다.",
        "card-setup-title": "맵 리스팅 설정",
        "card-setup-desc": "지역 노출을 위해 플레이스 프로파일, 카테고리, 서비스, 설명 문구 시그널을 검증·최적화합니다.",
        "card-platform-title": "플랫폼 팩",
        "card-platform-desc": "Google, Apple, Naver, 지역형 맵 대상 표준 리스팅 설정 및 인용 일관성 전략을 제공합니다.",
        "card-review-title": "리뷰 & 랭킹",
        "card-review-desc": "평점 및 랭크 추적, 리뷰 플레이북 운영으로 로컬 랭크를 안정화합니다.",
        "card-seo-title": "로컬 SEO 부가서비스",
        "card-seo-desc": "스키마, 랜딩 시그널, 인용 갱신, Near-Me 콘텐츠워크플로우로 노출을 강화합니다.",
        "card-view-pricing": "가격 확인하기",

        "comp-title": "윤리적 로컬 랭킹 기준",
        "comp-desc": "MAPBOOST는 정당한 인용, 프로파일, 리뷰 품질 전략으로 플랫폼 가이드라인을 준수합니다. 계정 리스크 테크닉을 사용하지 않습니다.",
        "comp-bullet1-bold": "플랫폼 준수:",
        "comp-bullet1-text": "Google Maps, Apple Maps, Naver Map, 지역 디렉토리 대상 최적화만 제공합니다.",
        "comp-bullet2-bold": "검증된 로컬 시그널:",
        "comp-bullet2-text": "실제 장소 메타데이터, 카테고리, 인용 참조를 사용하여 안정적 랭킹을 설계합니다.",
        "comp-bullet3-bold": "리뷰 안전장치:",
        "comp-bullet3-text": "이상 장기 패턴을 피하도록 리뷰 헬스 가이드를 운영합니다.",

        "view-setup-sub": "검증된 최적화 리스팅 프로파일을 시작하세요. 카테고리, 서비스, 운영시간, 설명 정확도를 정리합니다.",
        "view-platform-sub": "Google, Apple, Naver, 지역 맵 대상 인용 일관 표준 리스팅을 배포합니다.",
        "view-review-sub": "랭크 변동을 추적하고, 리뷰 응답을 운영하며, 로컬 랭크 상태를 유지합니다.",
        "view-seo-sub": "스키마, 로컬 앵커 시그널, 인용 갱신, 미니 랜딩 콘텐츠로 Near-Me 노출을 강화합니다.",
        "view-orders-title": "내 구매 히스토리",
        "view-orders-sub": "성공한 주문 내역을 검토하세요. 데이터는 브라우저 로컬스토리지에 안전하게 보관됩니다.",

        "th-date": "주문 날짜",
        "th-order-id": "트랜잭션 ID",
        "th-product": "상품명",
        "th-tier": "패키지 등급",
        "th-keyword": "대상 키워드",
        "th-qty": "수량",
        "th-total": "총 결제금액",
        "th-status": "상태",

        "no-orders-msg": "구매 기록이 없습니다. 첫 주문을 완료하시면 내역이 여기에 표시됩니다!",

        "modal-title": "주문 설정",
        "modal-desc": "키워드 전략을 선택하고 안전한 PayPal 결제를 진행하세요.",
        "modal-base-pkg": "기본 패키지:",
        "modal-base-price-label": "기본 가격:",
        "modal-email-label": "이메일 주소 *",
        "modal-email-placeholder": "name@example.com",
        "modal-email-error": "올바른 이메일 주소를 입력해주세요.",
        "modal-keyword-label": "대상 키워드 *",
        "modal-keyword-placeholder": "예: 커피 전문점",
        "modal-keyword-error": "대상 키워드를 입력해주세요.",
        "modal-qty": "수량:",
        "modal-total-amt": "총 결제금액:",
        "modal-test-btn": "가격 텍스트를 눌러 테스트 결제",

        "badge-ssl": "SSL 보안 결제 지원",
        "badge-paypal": "PayPal 인증됨",

        "foot-services": "서비스",
        "foot-support": "지원",
        "foot-contact": "문의 지원: snsherocom@gmail.com",
        "foot-gdpr": "윤리적 로컬 랭킹",
        "foot-copy": "&copy; 2026 BibleForAI MAPBOOST. All rights reserved. Local & Map SEO Optimization.",

        "order-button": "패키지 주문하기",
        "featured-badge": "베스트 셀러",

        // Receipts
        "receipt-header": "BIBLEFORAI - MAPBOOST 영수증",
        "receipt-date": "주문 날짜",
        "receipt-txid": "거래 ID",
        "receipt-email": "고객 이메일",
        "receipt-type": "상품 종류",
        "receipt-size": "패키지 크기",
        "receipt-keyword": "대상 키워드",
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
    document.title = isKo ? "BibleForAI - MAPBOOST | 로컬 & 맵 SEO 최적화" : "BibleForAI - MAPBOOST | Local & Map SEO Optimization";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.content = isKo ?
            "로컬 랭킹과 맵 노출 최적화 서비스. Google Maps, Apple Maps, Naver Map SEO로 지역 검색 상단 노출을 지원합니다." :
            "Local and map SEO optimization for Google Maps, Apple Maps, Naver Map, and regional place listings with verified signals.";
    }
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.content = isKo ? "BibleForAI - MAPBOOST | 로컬 & 맵 SEO" : "BibleForAI - MAPBOOST | Local & Map SEO Optimization";
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.content = isKo ? "로컬 랭킹과 맵 노출 최적화 서비스. 로컬 SEO로 지역 검색 상단 노출을 지원합니다." : "AI-assisted local ranking optimization for Google Maps, Apple Maps, Naver Map, and regional directories.";
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.content = ogTitle.content;
    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) twDesc.content = ogDesc.content;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const translation = translations[lang] && translations[lang][key];
        if (translation) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') el.placeholder = translation;
            else el.innerHTML = translation;
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

document.addEventListener('DOMContentLoaded', () => {
    applyTranslations();
    renderAllPackages();
    renderOrders();
    setupHeaderScroll();
});

function setupHeaderScroll() {
    const header = document.getElementById('app-header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
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
    if (!drawer) return;

    const isOpening = !drawer.classList.contains('active');

    // 최초 열릴 때만 스타일 주입
    if (isOpening && !drawer.dataset.fixed) {
        drawer.style.left = '-320px';
        drawer.style.right = 'auto';
        drawer.style.borderRight = '1px solid var(--border)';
        drawer.dataset.fixed = '1';
    }

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
        case 'setup': return 'fa-solid fa-location-crosshairs';
        case 'platform': return 'fa-solid fa-map';
        case 'review': return 'fa-solid fa-star';
        case 'seo': return 'fa-solid fa-magnifying-glass-location';
        default: return 'fa-solid fa-map-location-dot';
    }
}

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
    if (emailError) emailError.style.display = 'none';
    const keywordInput = document.getElementById('order-keyword');
    if (keywordInput) {
        keywordInput.value = '';
        keywordInput.style.borderColor = 'var(--border)';
    }
    const keywordError = document.getElementById('keyword-error');
    if (keywordError) keywordError.style.display = 'none';
    updateModalPrice();
    document.getElementById('purchase-modal').classList.add('active');
    setTimeout(() => {
        const modalCard = document.querySelector('.modal-card');
        const totalBox = document.querySelector('.total-price-box');
        if (modalCard && totalBox) modalCard.scrollTop = totalBox.offsetTop - 10;
    }, 600);
    initPaypalButtons();
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

function validateKeywordField() {
    const keywordInput = document.getElementById('order-keyword');
    const keywordError = document.getElementById('keyword-error');
    if (!keywordInput) return true;
    const keyword = keywordInput.value.trim();
    if (!keyword) {
        keywordInput.style.borderColor = '#ef4444';
        if (keywordError) {
            keywordError.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> ${translations[currentLang]['modal-keyword-error'] || 'Please enter a target keyword.'}`;
            keywordError.style.display = 'block';
        }
        return false;
    }
    keywordInput.style.borderColor = 'var(--border)';
    if (keywordError) keywordError.style.display = 'none';
    return true;
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
            emailError.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> ${translations[currentLang]['modal-email-error'] || 'Please enter a valid email address.'}`;
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
    if (emailInput && !emailInput.value.trim()) {
        emailInput.value = 'sandbox@test.dev';
        emailInput.style.borderColor = 'var(--border)';
        const emailError = document.getElementById('email-error');
        if (emailError) emailError.style.display = 'none';
    }
    if (!validateEmailField() || !validateKeywordField()) return;
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
            if (!validateEmailField() || !validateKeywordField()) return actions.reject();
            return actions.resolve();
        },
        createOrder: function(data, actions) {
            const keywordValue = (document.getElementById('order-keyword')?.value || '').trim();
            const finalAmount = (currentPackage.basePrice * orderQuantity).toFixed(2);
            return actions.order.create({
                purchase_units: [{
                    description: `${currentPackage.categoryName} - ${currentPackage.tierName} [Keyword: ${keywordValue}] (Qty: ${orderQuantity})`,
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
    const orderLogs = JSON.parse(localStorage.getItem('mapboost_orders')) || [];
    const keywordVal = document.getElementById('order-keyword') ? document.getElementById('order-keyword').value.trim() : '';
    const emailVal = document.getElementById('order-email') ? document.getElementById('order-email').value.trim() : '';
    let clientId = 'Ae_xg2SjogcseJVcjXldc_TEnVWBzmPw8aNimrSncYBb0Wrn_m93w_PkMgdxWTQ2fJExV8QKWHR2-7hK';
    let secret = '';
    if (details.isTest) {
        clientId = 'AeZhTof6R4GGZ8tp2dz1l1tIt970_y_G1uTufgjs-7_rYxRNsre2GKd5LUaiAqDmdOlYzABi-_HgSpe4';
        secret = '[REDACTED]';
    }
    const newOrder = {
        date: new Date().toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric', hour:'2-digit', minute:'2-digit' }),
        id: details.id,
        email: emailVal,
        category: currentPackage.categoryName,
        package: currentPackage.tierName,
        keyword: keywordVal,
        quantity: orderQuantity,
        basePrice: currentPackage.basePrice,
        totalPaid: formatPrice(currentPackage.basePrice * orderQuantity),
        status: 'Completed',
        clientId: clientId,
        secret: secret
    };
    orderLogs.unshift(newOrder);
    localStorage.setItem('mapboost_orders', JSON.stringify(orderLogs));
    renderOrders();
    if (
        typeof window !== 'undefined' &&
        window.location.protocol === 'https:'
    ) {
        try {
            // Use canonical Google Form from skill
            const params = new URLSearchParams({
                order: encodeURIComponent(JSON.stringify(newOrder))
            });
            const googleFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLScMPqbEWWttS5mb1m_krsO_kco24ImpgvYVSbc7zO0nEVmYFw/viewform?' + params.toString();
            // Optional redirect on production; skip in localhost/dev contexts
            const isProd = /(^|\.)bibleforai\.com/.test(window.location.host || 'localhost');
            if (isProd) window.location.href = googleFormUrl;
        } catch (e) {
            // ignore redirect issues
        }
    }
}

function renderOrders() {
    const orderLogs = JSON.parse(localStorage.getItem('mapboost_orders')) || [];
    const tbody = document.getElementById('orders-tbody');
    const noOrders = document.getElementById('no-orders-msg');
    if (!tbody) return;
    if (!orderLogs.length) {
        tbody.innerHTML = '';
        if (noOrders) noOrders.style.display = 'block';
        return;
    }
    if (noOrders) noOrders.style.display = 'none';
    tbody.innerHTML = orderLogs.map(order => `
        <tr>
            <td>${order.date}</td>
            <td>${order.id}</td>
            <td>${order.category}</td>
            <td>${order.package}</td>
            <td>${translations[currentLang]['th-keyword'] || 'Target Keyword'}: ${order.keyword}</td>
            <td>${order.quantity}</td>
            <td>${order.totalPaid}</td>
            <td><span class="status-badge badge-active">${order.status}</span></td>
        </tr>
    `).join('');
}

// Expose variables globally to prevent ReferenceErrors in inline HTML scripts/handlers
if (typeof navigate !== 'undefined') { window.navigate = navigate; }
if (typeof currentLang !== 'undefined') { window.currentLang = currentLang; }
