// App State
let currentView = 'home';
let currentPackage = null;
let orderQuantity = 1;
let paypalButtonInstance = null;

// Package Catalog with Localized Keys
const packageCatalog = {
    basic: {
        title_en: 'App Launch Starter',
        title_ko: '앱 런치 스타터',
        packages: [
            { id: 'basic-single', name_en: 'Launch Starter', name_ko: '런치 스타터', desc_en: 'A starter app marketing package for installs, reviews, and launch visibility.', desc_ko: '앱 설치, 리뷰, 런칭 노출을 위한 스타터 마케팅 패키지입니다.', price: 57, featured: false, features_en: ['App Store / Google Play Focus', 'Keyword Setup', 'Organic Review Boost', '3-Day Delivery'], features_ko: ['앱스토어 / 구글플레이 중심', '키워드 세팅', '자연 리뷰 부스트', '3일 내 전달'] },
            { id: 'basic-double', name_en: 'Launch Plus', name_ko: '런치 플러스', desc_en: 'A stronger starter package for early traction and category ranking.', desc_ko: '초기 트래픽과 카테고리 랭킹을 강화하는 패키지입니다.', price: 97, featured: true, features_en: ['Keyword Research', 'Install Growth Plan', 'Review Guidance', 'Priority Support'], features_ko: ['키워드 리서치', '설치 성장 플랜', '리뷰 운영 가이드', '우선 지원'] }
        ]
    },
    pro: {
        title_en: 'App Growth Booster',
        title_ko: '앱 성장 부스터',
        packages: [
            { id: 'pro-triple', name_en: 'Growth Pro', name_ko: '그로스 프로', desc_en: 'Ideal for funded startups that need installs, keyword ranking, and retention signals.', desc_ko: '설치 수, 키워드 랭킹, 유지율 신호가 필요한 스타트업에 적합합니다.', price: 143, featured: false, features_en: ['ASO Keywords', 'Launch Analytics', 'App Store Optimization', '7-Day Delivery'], features_ko: ['ASO 키워드', '런칭 분석', '앱스토어 최적화', '7일 내 전달'] },
            { id: 'pro-premium', name_en: 'Growth Elite', name_ko: '그로스 엘리트', desc_en: 'A premium package for aggressive app store growth and market expansion.', desc_ko: '앱스토어 성장과 시장 확장을 적극적으로 추진하는 프리미엄 패키지입니다.', price: 197, featured: true, features_en: ['App Store / Google Play', 'Ranking Support', 'Review Campaign Plan', 'Competitive Analysis'], features_ko: ['앱스토어 / 구글플레이', '랭킹 지원', '리뷰 캠페인 플랜', '경쟁 분석'] }
        ]
    },
    enterprise: {
        title_en: 'App Scale Campaign',
        title_ko: '앱 스케일 캠페인',
        packages: [
            { id: 'ent-scale', name_en: 'Scale Dominator', name_ko: '스케일 도미네이터', desc_en: 'For apps that want full-funnel growth across installs, reviews, keywords, and monetization.', desc_ko: '설치, 리뷰, 키워드, 수익화까지 전반적인 성장 퍼널을 원하는 앱을 위한 패키지입니다.', price: 285, featured: true, features_en: ['Full-Funnel Growth', 'Custom ASO Plan', 'Market Expansion Strategy', 'VIP 48-Hour Delivery'], features_ko: ['풀 퍼널 성장', '맞춤형 ASO 플랜', '시장 확장 전략', 'VIP 48시간 전달'] }
        ]
    }
};

// Translation Dictionary
const translations = {
    en: {
        "logo-subtitle": "APPBOOST!",
        "nav-home": "Home",
        "nav-basic": "Launch",
        "nav-pro": "Growth",
        "nav-enterprise": "Scale",
        "btn-orders": "My Orders",
        "hero-badge": "AI-Powered App Growth",
        "hero-title": "APPBOOST — Global App Marketing & ASO!",
        "hero-desc": "Grow installs, reviews, and keyword ranking with app marketing built for global mobile apps.",
        "btn-explore": "Explore Packages",
        "btn-how": "How It Works",
        
        "stat-da": "App Visibility",
        "stat-dofollow": "Install Signals",
        "stat-indexed": "Keyword Ranking",
        "stat-delivery": "Fast Delivery",
        
        "sec-packages-title": "Choose Your App Growth Package",
        "sec-packages-subtitle": "From app launch support to full-scale app store growth. Every package includes ranking, review, and optimization guidance.",
        "card-basic-title": "Launch Starter",
        "card-basic-desc": "A starter app marketing package for installs, reviews, and launch visibility.",
        "card-pro-title": "Growth Booster",
        "card-pro-desc": "Ideal for funded startups that need installs, keyword ranking, and retention signals.",
        "card-enterprise-title": "Scale Campaign",
        "card-enterprise-desc": "For apps that want full-funnel growth across installs, reviews, keywords, and monetization.",
        "card-view-pricing": "View Pricing",
        
        "how-title": "How APPBOOST Works",
        "how-desc": "We optimize your app growth using a practical 4-step workflow focused on installs, search visibility, and trustworthy social proof.",
        "how-step1-bold": "1. Audit:",
        "how-step1-text": "We review your app store listing, keywords, and current ranking gaps.",
        "how-step2-bold": "2. Strategy:",
        "how-step2-text": "We build an ASO and launch plan tailored to your app category.",
        "how-step3-bold": "3. Execution:",
        "how-step3-text": "We activate growth support for installs, reviews, and keyword visibility.",
        "how-step4-bold": "4. Report:",
        "how-step4-text": "Receive a clear growth report and next-step recommendations.",
        
        "sec-industries-title": "Best For <span>Apps & Teams</span>",
        
        "view-basic-sub": "App launch starter package for installs, reviews, and visibility. Ideal for new mobile apps and indie developers entering the market.",
        "view-pro-sub": "Growth package for apps that need keyword ranking, install momentum, and competitive positioning.",
        "view-enterprise-sub": "Scale campaign for teams that want full-funnel app marketing across installs, reviews, ASO, and monetization.",
        "view-orders-title": "My Purchase History",
        "view-orders-sub": "Review your successful orders. Your data is stored locally in your browser workspace.",
        
        "th-date": "Order Date",
        "th-order-id": "Transaction ID",
        "th-product": "Product",
        "th-tier": "Package Tier",
        "th-app-url": "App URL",
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
        "modal-app-url-label": "App URL *",
        "modal-app-url-placeholder": "https://example.com/app",
        "modal-app-url-error": "Please enter a valid app URL.",
        "modal-keywords-label": "Target Keywords:",
        "modal-keywords-placeholder": "e.g. app marketing, ASO, install growth",
        "modal-qty": "Quantity:",
        "modal-total-amt": "Total Amount:",
        "modal-test-btn": "Click price to payment checkout",
        
        "badge-ssl": "SSL Secured Checkout",
        "badge-paypal": "PayPal Verified",
        
        "foot-packages": "App Growth Packages",
        "foot-why": "Why APPBOOST",
        "foot-da": "App Store / Google Play",
        "foot-dofollow": "Install & Review Growth",
        "foot-native": "ASO Strategy Support",
        "foot-contact": "Contact support: snsherocom@gmail.com",
        "foot-copy": "&copy; 2026 BibleForAI APPBOOST. All rights reserved. Global App Marketing & ASO Services.",
        
        "order-button": "Order Package",
        "featured-badge": "Best Seller",
        
        // Receipts
        "receipt-header": "BIBLEFORAI - APPBOOST RECEIPT",
        "receipt-date": "Order Date",
        "receipt-txid": "Transaction ID",
        "receipt-email": "Customer Email",
        "receipt-type": "Product Type",
        "receipt-size": "Package Size",
        "receipt-app-url": "App URL",
        "receipt-keywords": "Target Keywords",
        "receipt-qty": "Quantity",
        "receipt-baseprice": "Base Price",
        "receipt-total": "Total Paid",
        "receipt-status": "Status",
        "receipt-method": "Payment Method",
        "receipt-method-val": "PayPal Secure Checkout"
    },
    ko: {
        "logo-subtitle": "APPBOOST!",
        "nav-home": "홈",
        "nav-basic": "런치",
        "nav-pro": "그로스",
        "nav-enterprise": "스케일",
        "btn-orders": "내 주문 내역",
        "hero-badge": "AI 기반 앱 성장",
        "hero-title": "APPBOOST — 글로벌 앱 마케팅 & ASO!",
        "hero-desc": "글로벌 모바일 앱을 위한 설치 수, 리뷰, 키워드 랭킹 성장을 지원합니다.",
        "btn-explore": "패키지 둘러보기",
        "btn-how": "이용 방법",
        
        "stat-da": "앱 노출도",
        "stat-dofollow": "설치 신호",
        "stat-indexed": "키워드 랭킹",
        "stat-delivery": "빠른 전달",
        
        "sec-packages-title": "앱 성장 패키지 선택하기",
        "sec-packages-subtitle": "앱 런치 지원부터 전체 앱스토어 성장까지. 모든 패키지에는 랭킹, 리뷰, 최적화 가이드가 포함됩니다.",
        "card-basic-title": "런치 스타터",
        "card-basic-desc": "앱 설치, 리뷰, 런칭 노출을 위한 스타터 마케팅 패키지입니다.",
        "card-pro-title": "그로스 부스터",
        "card-pro-desc": "설치 수, 키워드 랭킹, 유지 신호가 필요한 성장형 앱에 적합합니다.",
        "card-enterprise-title": "스케일 캠페인",
        "card-enterprise-desc": "설치, 리뷰, 키워드, 수익화까지 전반적인 성장 퍼널을 원하는 앱을 위한 패키지입니다.",
        "card-view-pricing": "가격 확인하기",
        
        "how-title": "APPBOOST 이용 방법",
        "how-desc": "설치, 검색 노출, 신뢰도 높은 사회적 증거에 집중한 실용적인 4단계 워크플로로 앱 성장을 최적화합니다.",
        "how-step1-bold": "1. 진단:",
        "how-step1-text": "앱스토어 등록 정보, 키워드, 현재 랭킹 격차를 점검합니다.",
        "how-step2-bold": "2. 전략:",
        "how-step2-text": "앱 카테고리에 맞는 ASO 및 런치 플랜을 수립합니다.",
        "how-step3-bold": "3. 실행:",
        "how-step3-text": "설치, 리뷰, 키워드 노출을 위한 성장 지원을 진행합니다.",
        "how-step4-bold": "4. 리포트:",
        "how-step4-text": "명확한 성장 리포트와 다음 단계 제안을 제공합니다.",
        
        "sec-industries-title": "<span>앱 & 팀</span>에 적합",
        
        "view-basic-sub": "설치, 리뷰, 노출을 위한 앱 런치 스타터 패키지입니다. 시장에 진입하는 신규 모바일 앱과 인디 개발자에게 적합합니다.",
        "view-pro-sub": "키워드 랭킹, 설치 모멘텀, 경쟁 포지셔닝이 필요한 앱을 위한 그로스 패키지입니다.",
        "view-enterprise-sub": "설치, 리뷰, ASO, 수익화까지 앱 마케팅 전 과정을 원하는 팀을 위한 스케일 캠페인입니다.",
        "view-orders-title": "내 구매 히스토리",
        "view-orders-sub": "성공한 주문 내역을 검토하세요. 데이터는 브라우저 로컬스토리지에 안전하게 보관됩니다.",
        
        "th-date": "주문 날짜",
        "th-order-id": "트랜잭션 ID",
        "th-product": "상품명",
        "th-tier": "패키지 등급",
        "th-app-url": "앱 URL",
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
        "modal-app-url-label": "앱 URL *",
        "modal-app-url-placeholder": "https://example.com/app",
        "modal-app-url-error": "올바른 앱 URL을 입력해주세요.",
        "modal-keywords-label": "타겟 키워드:",
        "modal-keywords-placeholder": "예: 앱 마케팅, ASO, 설치 증가",
        "modal-qty": "수량:",
        "modal-total-amt": "총 결제금액:",
        "modal-test-btn": "가격 텍스트를 눌러 결제 진행",
        
        "badge-ssl": "SSL 보안 결제 지원",
        "badge-paypal": "PayPal 인증됨",
        
        "foot-packages": "앱 성장 패키지",
        "foot-why": "APPBOOST 특징",
        "foot-da": "앱스토어 / 구글플레이",
        "foot-dofollow": "설치 및 리뷰 성장",
        "foot-native": "ASO 전략 지원",
        "foot-contact": "문의 지원: snsherocom@gmail.com",
        "foot-copy": "&copy; 2026 BibleForAI APPBOOST. All rights reserved. Global App Marketing & ASO Services.",
        
        "order-button": "패키지 주문하기",
        "featured-badge": "베스트 셀러",
        
        // Receipts
        "receipt-header": "BIBLEFORAI - APPBOOST 영수증",
        "receipt-date": "주문 날짜",
        "receipt-txid": "거래 ID",
        "receipt-email": "고객 이메일",
        "receipt-type": "상품 종류",
        "receipt-size": "패키지 크기",
        "receipt-app-url": "앱 URL",
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
    document.title = isKo ? "BibleForAI - APPBOOST | 글로벌 앱 마케팅 & ASO" : "BibleForAI - APPBOOST | Global App Marketing & ASO";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.content = isKo ? 
            "APPBOOST로 글로벌 앱 마케팅과 ASO 성과를 높이세요. App Store와 Google Play에서 설치, 리뷰, 키워드 노출을 지원합니다." : 
            "Grow installs, reviews, and keyword visibility with app marketing support for App Store and Google Play.";
    }

    // Update Open Graph (OG) and Twitter Metadata tags dynamically
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
        ogTitle.content = isKo ? "BibleForAI - APPBOOST | 글로벌 앱 마케팅 & ASO" : "BibleForAI - APPBOOST | Global App Marketing & ASO";
    }
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
        ogDesc.content = isKo ? 
            "글로벌 SEO와 브랜드 권위를 높이세요. 고권위 해외 매거진에서 DoFollow 백링크를 확보하세요." : 
            "Boost your global SEO and brand authority. Get DoFollow backlinks from high-authority overseas magazines.";
    }
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) {
        twTitle.content = isKo ? "BibleForAI - APPBOOST | 글로벌 앱 마케팅 & ASO" : "BibleForAI - APPBOOST | Global App Marketing & ASO";
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
        case 'basic': return 'fa-solid fa-mobile-screen-button';
        case 'pro': return 'fa-solid fa-chart-line';
        case 'enterprise': return 'fa-solid fa-rocket';
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
    const appUrlInput = document.getElementById('order-app-url');
    if (emailInput) {
        emailInput.value = '';
        emailInput.style.borderColor = 'var(--border)';
    }
    const emailError = document.getElementById('email-error');
    if (emailError) {
        emailError.style.display = 'none';
    }
    if (appUrlInput) {
        appUrlInput.value = '';
        appUrlInput.style.borderColor = 'var(--border)';
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
    
    // Open Modal
    document.getElementById('purchase-modal').classList.add('active');
    
    // Auto-scroll to show PayPal button
    setTimeout(() => {
        const paymentArea = document.getElementById('paypal-button-container') || document.getElementById('paypal-test-button');
        if (paymentArea && typeof paymentArea.scrollIntoView === 'function') {
            paymentArea.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, 300);
    
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
    const appUrlInput = document.getElementById('order-app-url');
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
        const appUrl = appUrlInput ? appUrlInput.value.trim() : '';
        const appUrlError = document.getElementById('app-url-error');
        if (!appUrl) {
            if (appUrlInput) appUrlInput.style.borderColor = '#ef4444';
            if (appUrlError) {
                const isKo = currentLang === 'ko';
                appUrlError.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> ${isKo ? '올바른 앱 URL을 입력해주세요.' : 'Please enter a valid app URL.'}`;
                appUrlError.style.display = 'block';
            }
            return false;
        }
        if (appUrlInput) appUrlInput.style.borderColor = 'var(--border)';
        if (appUrlError) appUrlError.style.display = 'none';
        return true;
    }
}

// Click price to payment checkout Trigger
function triggerTestCheckout() {
    // Auto-fill mock email if field is empty
    const emailInput = document.getElementById('order-email');
    const appUrlInput = document.getElementById('order-app-url');
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
        isTest: true,
        appUrl: document.getElementById('order-app-url')?.value || 'https://example.com/app',
        keywords: document.getElementById('order-keywords')?.value || 'General'
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
            const appUrl = document.getElementById('order-app-url').value || 'https://example.com/app';
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
    const orderLogs = JSON.parse(localStorage.getItem('appboost_orders')) || [];
    const targetKeywords = document.getElementById('order-keywords') ? document.getElementById('order-keywords').value.trim() : '';
    const appUrl = document.getElementById('order-app-url') ? document.getElementById('order-app-url').value.trim() : '';
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
        appUrl: appUrl,
        keywords: targetKeywords || 'General',
        quantity: orderQuantity,
        basePrice: currentPackage.basePrice,
        totalPaid: formatPrice(currentPackage.basePrice * orderQuantity),
        status: 'Completed',
        clientId: clientId,
        secret: secret
    };
    
    orderLogs.unshift(newOrder); // Add to beginning
    localStorage.setItem('appboost_orders', JSON.stringify(orderLogs));
    
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
${dict["receipt-app-url"].padEnd(15)} : ${newOrder.appUrl}
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
    const orderLogs = JSON.parse(localStorage.getItem('appboost_orders')) || [];
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
            <td>${order.appUrl || '—'}</td>
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
