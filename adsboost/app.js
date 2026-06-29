// App State
let currentView = 'home';
let currentPackage = null;
let orderQuantity = 1;
let paypalButtonInstance = null;

// Package Catalog with Localized Keys
const packageCatalog = {
    basic: {
        title_en: 'Audit & Plan',
        title_ko: '진단 & 플랜',
        packages: [
            { id: 'basic-audit', name_en: 'Account Audit', name_ko: '계정 진단', desc_en: 'A full Google Ads audit covering keywords, ads, tracking, and account structure for growth opportunities.', desc_ko: '키워드, 광고, 트래킹, 계정 구조를 모두 점검하여 성장 기회를 찾는 Google Ads 진단 서비스입니다.', price: 215, featured: false, features_en: ['Keyword & Search Term Review', 'Tracking & Conversion Check', 'Bid & Budget Feedback', 'Actionable Audit Report', 'Email Support Included', '3-Day Delivery'], features_ko: ['키워드 및 검색어 검토', '트래킹 및 전환 체크', '입찰 및 예산 피드백', '실행 가능한 진단 리포트', '이메일 지원 포함', '3일 내 전달'] },
            { id: 'basic-plan', name_en: 'Keyword Plan', name_ko: '키워드 플랜', desc_en: 'Research-driven keyword and campaign plan for new Google Ads accounts or stalled campaigns.', desc_ko: '신규 Google Ads 계정이나 정체된 캠페인을 위한 리서치 기반 키워드 및 캠페인 플랜입니다.', price: 249, featured: true, features_en: ['Keyword Clusters', 'Negative Keyword Map', 'Audience Notes', 'Ad Copy Suggestions', 'Launch Checklist', '4-Day Delivery'], features_ko: ['키워드 클러스터 구성', '제외 키워드 맵', '오디언스 메모', '광고 카피 제안', '런칭 체크리스트', '4일 내 전달'] }
        ]
    },
    pro: {
        title_en: 'Campaign Setup',
        title_ko: '캠페인 세팅',
        packages: [
            { id: 'pro-search', name_en: 'Search Campaign Setup', name_ko: '검색 캠페인 세팅', desc_en: 'We build a high-intent search campaign with conversion tracking, ad groups, and optimized keywords.', desc_ko: '전환 트래킹, 광고그룹, 최적화 키워드가 포함된 고의도 검색 캠페인을 구축합니다.', price: 357, featured: false, features_en: ['Search Campaign Build', 'Conversion Tracking Setup', 'Ad Group Structure', 'Negative Keywords', 'Responsive Ads', '5-Day Delivery'], features_ko: ['검색 캠페인 구축', '전환 트래킹 세팅', '광고그룹 구조화', '제외 키워드 설정', '반응형 광고 구성', '5일 내 전달'] },
            { id: 'pro-multichannel', name_en: 'Multi-Channel Launch', name_ko: '멀티채널 런치', desc_en: 'Launch Search, Display, and Shopping campaigns with tracking, assets, and basic optimization.', desc_ko: '트래킹, 소재, 기본 최적화가 포함된 검색, 디스플레이, 쇼핑 캠페인을 한 번에 런칭합니다.', price: 419, featured: true, features_en: ['Search + Display + Shopping', 'Conversion & Remarketing Setup', 'Ad Asset Review', 'Landing Page Notes', 'Quick Optimization Pass', '5-Day Delivery'], features_ko: ['검색 + 디스플레이 + 쇼핑', '전환 및 리마케팅 세팅', '광고 소재 검토', '랜딩페이지 피드백', '빠른 최적화 점검', '5일 내 전달'] }
        ]
    },
    enterprise: {
        title_en: 'Monthly Management',
        title_ko: '월간 관리',
        packages: [
            { id: 'enterprise-manage', name_en: 'Monthly Management', name_ko: '월간 운영', desc_en: 'Ongoing Google Ads management with weekly optimization, reporting, and growth strategy.', desc_ko: '주간 최적화, 리포팅, 성장 전략이 포함된 Google Ads 월간 운영 서비스입니다.', price: 714, featured: true, features_en: ['Weekly Optimization', 'Performance Report', 'Budget Pacing', 'Bid Strategy', 'Landing Page Feedback', 'Priority Support'], features_ko: ['주간 최적화', '성과 리포트', '예산 운영 관리', '입찰 전략', '랜딩페이지 피드백', '우선 지원'] }
        ]
    }
};

// Translation Dictionary
const translations = {
    en: {
        "logo-subtitle": "ADSBOOST!",
        "nav-home": "Home",
        "nav-basic": "Audit & Plan",
        "nav-pro": "Campaign Setup",
        "nav-enterprise": "Monthly Management",
        "btn-orders": "My Orders",
        "hero-badge": "AI-Powered Google Ads Optimization",
        "hero-title": "ADSBOOST — Google Ads Optimization!",
        "hero-desc": "Optimize Google Ads campaigns, keywords, and tracking for global growth.",
        "btn-explore": "Explore Packages",
        "btn-how": "How It Works",
        "stat-da": "Account Audit",
        "stat-dofollow": "Keyword Research",
        "stat-indexed": "Tracking Setup",
        "stat-delivery": "Fast Delivery",
        "sec-packages-title": "Choose Your Google Ads Package",
        "sec-packages-subtitle": "From a single account audit to a full-scale monthly management plan. Every package includes keyword strategy, optimization, and a results report.",
        "card-basic-title": "Audit & Plan",
        "card-basic-desc": "A full Google Ads audit covering keywords, ads, tracking, and account structure for growth opportunities.",
        "card-pro-title": "Campaign Setup",
        "card-pro-desc": "Build search, display, and shopping campaigns with conversion tracking and clean ad group structure.",
        "card-enterprise-title": "Monthly Management",
        "card-enterprise-desc": "Ongoing optimization, performance reporting, and budget pacing for long-term growth.",
        "card-view-pricing": "View Pricing",
        "how-title": "How ADSBOOST Works",
        "how-desc": "Our proven 4-step process audits your account, fixes keywords, launches campaigns, and scales results with Google Ads best practices.",
        "how-step1-bold": "1. Audit:",
        "how-step1-text": "We review your keywords, target markets, and conversion goals.",
        "how-step2-bold": "2. Campaign Build:",
        "how-step2-text": "We build search, display, and shopping campaigns with conversion-focused ad copy.",
        "how-step3-bold": "3. Launch:",
        "how-step3-text": "Your campaign goes live with tracking, assets, and clean structure.",
        "how-step4-bold": "4. Optimize:",
        "how-step4-text": "Receive performance notes and a detailed optimization report within 3–5 days.",
        "sec-industries-title": "Industries We <span>Serve</span>",
        "view-basic-sub": "A full Google Ads audit covering keywords, ads, tracking, and account structure for growth opportunities.",
        "view-pro-sub": "We build search, display, and shopping campaigns with conversion tracking and a clean account structure.",
        "view-enterprise-sub": "Ongoing optimization, performance reporting, and budget pacing for long-term Google Ads growth.",
        "view-orders-title": "My Purchase History",
        "view-orders-sub": "Review your successful orders. Your data is stored locally in your browser workspace.",
        "th-date": "Order Date",
        "th-order-id": "Transaction ID",
        "th-product": "Product",
        "th-tier": "Package Tier",
        "th-target": "Target Keywords",
        "th-qty": "Quantity",
        "th-total": "Total Paid",
        "th-status": "Status",
        "no-orders-msg": "No purchase records found. Make your first order to see history here!",
        "modal-title": "Configure Order",
        "modal-desc": "Configure details and complete secure PayPal payment.",
        "modal-base-pkg": "Base Package:",
        "modal-base-price-label": "Base Price:",
        "modal-email-label": "Email Address *",
        "modal-email-placeholder": "name@example.com",
        "modal-email-error": "Please enter a valid email address.",
        "modal-keywords-label": "Target Keywords:",
        "modal-keywords-placeholder": "e.g. Google Ads, PPC, Performance Max",
        "modal-qty": "Quantity:",
        "modal-total-amt": "Total Amount:",
        "modal-test-btn": "Click price to test checkout",
        "badge-ssl": "SSL Secured Checkout",
        "badge-paypal": "PayPal Verified",
        "foot-packages": "Google Ads Packages",
        "foot-why": "Why ADSBOOST",
        "foot-da": "Keyword Strategy",
        "foot-dofollow": "Campaign Setup",
        "foot-native": "Ongoing Optimization",
        "foot-contact": "Contact support: snsherocom@gmail.com",
        "foot-copy": "&copy; 2026 BibleForAI ADSBOOST. All rights reserved. Google Ads Optimization Services.",
        "order-button": "Order Package",
        "featured-badge": "Best Seller",
        "receipt-header": "BIBLEFORAI - ADSBOOST RECEIPT",
        "receipt-date": "Order Date",
        "receipt-txid": "Transaction ID",
        "receipt-email": "Customer Email",
        "receipt-type": "Product Type",
        "receipt-size": "Package Size",
        "receipt-keywords": "Target Keywords",
        "receipt-qty": "Quantity",
        "receipt-baseprice": "Base Price",
        "receipt-total": "Total Paid",
        "receipt-status": "Status",
        "receipt-method": "Payment Method",
        "receipt-method-val": "PayPal Secure Checkout"
    },
    ko: {
        "logo-subtitle": "ADSBOOST!",
        "nav-home": "홈",
        "nav-basic": "진단 & 플랜",
        "nav-pro": "캠페인 세팅",
        "nav-enterprise": "월간 관리",
        "btn-orders": "내 주문 내역",
        "hero-badge": "AI 기반 Google Ads 최적화",
        "hero-title": "ADSBOOST — Google Ads 최적화!",
        "hero-desc": "Google Ads 캠페인, 키워드, 트래킹을 최적화해 글로벌 성장을 지원합니다.",
        "btn-explore": "패키지 둘러보기",
        "btn-how": "이용 방법",
        "stat-da": "계정 진단",
        "stat-dofollow": "키워드 리서치",
        "stat-indexed": "트래킹 세팅",
        "stat-delivery": "빠른 전달",
        "sec-packages-title": "Google Ads 패키지 선택하기",
        "sec-packages-subtitle": "단일 계정 진단부터 풀스케일 월간 운영 플랜까지. 모든 패키지에 키워드 전략, 최적화, 결과 리포트가 포함됩니다.",
        "card-basic-title": "진단 & 플랜",
        "card-basic-desc": "키워드, 광고, 트래킹, 계정 구조를 모두 점검하여 성장 기회를 찾는 Google Ads 진단 서비스입니다.",
        "card-pro-title": "캠페인 세팅",
        "card-pro-desc": "전환 트래킹과 깔끔한 광고그룹 구조가 포함된 검색, 디스플레이, 쇼핑 캠페인을 구축합니다.",
        "card-enterprise-title": "월간 관리",
        "card-enterprise-desc": "장기 성장을 위한 지속적인 최적화, 성과 리포팅, 예산 운영 관리 서비스입니다.",
        "card-view-pricing": "가격 확인하기",
        "how-title": "ADSBOOST 이용 방법",
        "how-desc": "검증된 4단계 프로세스로 계정을 진단하고, 키워드를 정리하고, 캠페인을 런칭하고, Google Ads 모범 사례로 성과를 확장합니다.",
        "how-step1-bold": "1. 진단:",
        "how-step1-text": "키워드, 타겟 시장, 전환 목표를 검토합니다.",
        "how-step2-bold": "2. 캠페인 구축:",
        "how-step2-text": "전환 중심 광고 카피와 함께 검색/디스플레이/쇼핑 캠페인을 구축합니다.",
        "how-step3-bold": "3. 런칭:",
        "how-step3-text": "트래킹, 소재, 깔끔한 구조를 갖춘 상태로 캠페인을 오픈합니다.",
        "how-step4-bold": "4. 최적화:",
        "how-step4-text": "3–5일 내 성과 노트와 상세 최적화 리포트를 받아보세요.",
        "sec-industries-title": "지원 <span>산업 분야</span>",
        "view-basic-sub": "키워드, 광고, 트래킹, 계정 구조를 모두 점검하여 성장 기회를 찾는 Google Ads 진단 서비스입니다.",
        "view-pro-sub": "전환 트래킹과 깔끔한 계정 구조가 포함된 검색, 디스플레이, 쇼핑 캠페인을 구축합니다.",
        "view-enterprise-sub": "장기적인 Google Ads 성장을 위한 지속 최적화, 성과 리포팅, 예산 운영 관리 서비스입니다.",
        "view-orders-title": "내 구매 히스토리",
        "view-orders-sub": "성공한 주문 내역을 검토하세요. 데이터는 브라우저 로컬스토리지에 안전하게 보관됩니다.",
        "th-date": "주문 날짜",
        "th-order-id": "트랜잭션 ID",
        "th-product": "상품명",
        "th-tier": "패키지 등급",
        "th-target": "타겟 키워드",
        "th-qty": "수량",
        "th-total": "총 결제금액",
        "th-status": "상태",
        "no-orders-msg": "구매 기록이 없습니다. 첫 주문을 완료하시면 내역이 여기에 표시됩니다!",
        "modal-title": "주문 설정",
        "modal-desc": "세부사항을 설정하고 안전한 PayPal 결제를 진행하세요.",
        "modal-base-pkg": "기본 패키지:",
        "modal-base-price-label": "기본 가격:",
        "modal-email-label": "이메일 주소 *",
        "modal-email-placeholder": "name@example.com",
        "modal-email-error": "올바른 이메일 주소를 입력해주세요.",
        "modal-keywords-label": "타겟 키워드:",
        "modal-keywords-placeholder": "예: Google Ads, PPC, Performance Max",
        "modal-qty": "수량:",
        "modal-total-amt": "총 결제금액:",
        "modal-test-btn": "가격 텍스트를 눌러 테스트 결제",
        "badge-ssl": "SSL 보안 결제 지원",
        "badge-paypal": "PayPal 인증됨",
        "foot-packages": "Google Ads 패키지",
        "foot-why": "ADSBOOST 특징",
        "foot-da": "키워드 전략",
        "foot-dofollow": "캠페인 세팅",
        "foot-native": "지속 최적화",
        "foot-contact": "문의 지원: snsherocom@gmail.com",
        "foot-copy": "&copy; 2026 BibleForAI ADSBOOST. All rights reserved. Google Ads Optimization Services.",
        "order-button": "패키지 주문하기",
        "featured-badge": "베스트 셀러",
        "receipt-header": "BIBLEFORAI - ADSBOOST 영수증",
        "receipt-date": "주문 날짜",
        "receipt-txid": "거래 ID",
        "receipt-email": "고객 이메일",
        "receipt-type": "상품 종류",
        "receipt-size": "패키지 크기",
        "receipt-keywords": "타겟 키워드",
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
    
    // Set document lang attribute
    document.documentElement.lang = lang;
    
    // Update document title and metadata
    document.title = isKo ? "BibleForAI - ADSBOOST | Google Ads 최적화" : "BibleForAI - ADSBOOST | Google Ads Optimization";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.content = isKo ?
            "ADSBOOST로 Google Ads 캠페인과 전환 성과를 최적화하세요." :
            "Optimize Google Ads campaigns, keywords, and tracking for global growth.";
    }

    // Update Open Graph (OG) and Twitter Metadata tags dynamically
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
        ogTitle.content = isKo ? "BibleForAI - ADSBOOST | Google Ads 최적화" : "BibleForAI - ADSBOOST | Google Ads Optimization";
    }
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
        ogDesc.content = isKo ? 
            "글로벌 SEO와 브랜드 권위를 높이세요. 고권위 해외 매거진에서 DoFollow 백링크를 확보하세요." : 
            "Boost your global SEO and brand authority. Get DoFollow backlinks from high-authority overseas magazines.";
    }
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) {
        twTitle.content = isKo ? "BibleForAI - ADSBOOST | Google Ads 최적화" : "BibleForAI - ADSBOOST | Google Ads Optimization";
    }
    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) {
        twDesc.content = isKo ? 
            "글로벌 SEO와 브랜드 권위를 높이세요. 고권위 해외 매거진에서 DoFollow 백링크를 확보하세요." : 
            "Boost your global SEO and brand authority. Get DoFollow backlinks from high-authority overseas magazines.";
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
        case 'basic': return 'fa-solid fa-newspaper';
        case 'pro': return 'fa-solid fa-rocket';
        case 'enterprise': return 'fa-solid fa-building-columns';
        default: return 'fa-solid fa-globe';
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
    
    // Reset inputs
    const emailInput = document.getElementById('order-email');
    if (emailInput) {
        emailInput.value = '';
        emailInput.style.borderColor = 'var(--border)';
    }
    const emailError = document.getElementById('email-error');
    if (emailError) {
        emailError.style.display = 'none';
    }
    const keywordsInput = document.getElementById('order-keywords');
    if (keywordsInput) {
        keywordsInput.value = '';
    }
    
    // Ensure Developer Test Button is visible
    const testBtn = document.getElementById('paypal-test-button');
    if (testBtn) {
        testBtn.style.display = 'block';
    }
    
    updateModalPrice();
    
    // Open Modal
    document.getElementById('purchase-modal').classList.add('active');
    
    // Auto-scroll to show PayPal button
    setTimeout(() => {
        const modalCard = document.querySelector('.modal-card');
        const totalBox = document.querySelector('.total-price-box');
        if (modalCard && totalBox) {
            // Scroll so the total price box is at the top of the modal
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

// Click price to test checkout Trigger
function triggerTestCheckout() {
    // Auto-fill mock email if field is empty
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
            const targetKeywords = document.getElementById('order-keywords').value || 'General';
            const finalAmount = (currentPackage.basePrice * orderQuantity).toFixed(2);
            return actions.order.create({
                purchase_units: [{
                    description: `${currentPackage.categoryName} - ${currentPackage.tierName} [Keywords: ${targetKeywords}] (Qty: ${orderQuantity})`,
                    amount: {
                        currency_code: 'USD',
                        value: finalAmount
                    }
                }]
            });
        },
        onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
                // Log the order to LocalStorage
                saveLocalOrder(details);
                
                // Close modal
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
    const orderLogs = JSON.parse(localStorage.getItem('adsboost_orders')) || [];
    const targetKeywords = document.getElementById('order-keywords') ? document.getElementById('order-keywords').value.trim() : '';
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
        keywords: targetKeywords || 'General',
        quantity: orderQuantity,
        basePrice: currentPackage.basePrice,
        totalPaid: formatPrice(currentPackage.basePrice * orderQuantity),
        status: 'Completed',
        clientId: clientId,
        secret: secret
    };
    
    orderLogs.unshift(newOrder); // Add to beginning
    localStorage.setItem('adsboost_orders', JSON.stringify(orderLogs));
    
    // Rerender Orders View table
    renderOrders();
    
    // Format order data as a clean, human-readable text receipt instead of raw JSON
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
${dict["receipt-keywords"].padEnd(15)} : ${newOrder.keywords}
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
    const orderLogs = JSON.parse(localStorage.getItem('adsboost_orders')) || [];
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
            <td>${order.keywords || 'General'}</td>
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
