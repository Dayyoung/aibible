// App State
let currentView = 'home';
let currentPackage = null;
let orderQuantity = 1;
let paypalButtonInstance = null;

// Package Catalog with Localized Keys
const packageCatalog = {
    basic: {
        title_en: 'Standard Listing',
        title_ko: '스탠다드 리스팅',
        packages: [
            { id: 'basic-single', name_en: 'Single Marketplace Listing', name_ko: '단일 마켓플레이스 리스팅', desc_en: '1 optimized Alibaba or Global Sources listing with buyer keywords, title rewrite, and image tuning.', desc_ko: '바이어 키워드, 상품명 재작성, 이미지 튜닝이 포함된 Alibaba 또는 Global Sources 최적화 리스팅 1건.', price: 1021, featured: false, features_en: ['1 Product Listing', 'Target Keyword Research', 'Title Localization', 'Image Tuning', 'Buyer-Friendly Copy', 'Results Report Included'], features_ko: ['상품 리스팅 1건', '타겟 키워드 리서치', '상품명 현지화', '이미지 튜닝', '바이어 친화적 카피', '결과 리포트 제공'] },
            { id: 'basic-double', name_en: 'Dual Listing Pack', name_ko: '2건 리스팅 패키지', desc_en: '2 optimized listings for product launches and catalog refreshes.', desc_ko: '제품 런칭과 카탈로그 리프레시를 위한 최적화 리스팅 2건.', price: 1430, featured: true, features_en: ['2 Product Listings', 'Competitor Scan', 'SEO Copywriting', 'Image Localization', 'Priority Support', 'Results Report Included'], features_ko: ['상품 리스팅 2건', '경쟁사 스캔', 'SEO 카피라이팅', '이미지 현지화', '우선 지원', '결과 리포트 제공'] }
        ]
    },
    pro: {
        title_en: 'Deluxe Listing',
        title_ko: '딜럭스 리스팅',
        packages: [
            { id: 'pro-triple', name_en: 'Triple Optimization Package', name_ko: '3건 최적화 패키지', desc_en: '3 listings with marketplace SEO audit and expanded keyword sets.', desc_ko: '마켓플레이스 SEO 진단과 확장 키워드 세트가 포함된 3건 리스팅.', price: 1980, featured: false, features_en: ['3 Product Listings', 'Marketplace SEO Audit', 'Keyword Set Expansion', 'Visual Fine-Tuning', 'Priority Delivery', 'Results Report Included'], features_ko: ['상품 리스팅 3건', '마켓플레이스 SEO 진단', '확장 키워드 세트', '비주얼 미세조정', '우선 전달', '결과 리포트 제공'] },
            { id: 'pro-premium', name_en: 'Catalog Growth Pack', name_ko: '카탈로그 성장 패키지', desc_en: '5 listings plus competitor benchmarking and catalog cleanup.', desc_ko: '경쟁사 벤치마킹과 카탈로그 정리가 포함된 5건 리스팅 패키지.', price: 2140, featured: true, features_en: ['5 Product Listings', 'Competitor Benchmarking', 'Catalog Cleanup', 'Image Optimization', 'Dedicated Strategist', 'Results Report Included'], features_ko: ['상품 리스팅 5건', '경쟁사 벤치마킹', '카탈로그 정리', '이미지 최적화', '전담 전략가', '결과 리포트 제공'] }
        ]
    },
    enterprise: {
        title_en: 'Premium Listing',
        title_ko: '프리미엄 리스팅',
        packages: [
            { id: 'ent-scale', name_en: 'Full Catalog Strategy', name_ko: '풀 카탈로그 전략', desc_en: 'Complete marketplace positioning for large inventories and global wholesale teams.', desc_ko: '대량 상품군과 글로벌 도매팀을 위한 완전한 마켓플레이스 포지셔닝.', price: 3210, featured: true, features_en: ['10+ Product Listings', 'Full Catalog Strategy', 'Global Buyer Positioning', 'Monthly Support', 'Dedicated Team', 'Custom Report'], features_ko: ['10건 이상 리스팅', '전체 카탈로그 전략', '글로벌 바이어 포지셔닝', '월간 지원', '전담 팀', '맞춤 리포트'] }
        ]
    }
};

// Translation Dictionary
const translations = {
    en: {
        "logo-subtitle": "ALICAT!",
        "nav-home": "Home",
        "nav-basic": "Standard",
        "nav-pro": "Deluxe",
        "nav-enterprise": "Premium",
        "btn-orders": "My Orders",
        "hero-badge": "AI-Powered Marketplace Growth",
        "hero-title": "ALICAT — Alibaba & B2B Catalog Listing!",
        "hero-desc": "Optimize Alibaba and Global Sources listings with keyword research, localized copy, and image tuning.",
        "btn-explore": "Explore Packages",
        "btn-how": "How It Works",

        "stat-da": "Product Listings",
        "stat-dofollow": "Catalog Optimization",
        "stat-indexed": "Buyer Reach",
        "stat-delivery": "Fast Delivery",

        "sec-packages-title": "Choose Your Catalog Package",
        "sec-packages-subtitle": "From a single product listing to a full catalog refresh. Every package includes research, copy optimization, and buyer-focused formatting.",
        "card-basic-title": "Standard Listing",
        "card-basic-desc": "One optimized product listing for Alibaba or Global Sources with keyword localization and image tuning.",
        "card-pro-title": "Deluxe Listing",
        "card-pro-desc": "Three listings with competitor research, SEO copy, and detailed reporting.",
        "card-enterprise-title": "Premium Listing",
        "card-enterprise-desc": "Full catalog optimization with strategy, visual tuning, and dedicated support.",
        "card-view-pricing": "View Pricing",

        "how-title": "How ALICAT Works",
        "how-desc": "Our 4-step process turns product pages into buyer-ready listings that rank better and convert more international wholesale traffic.",
        "how-step1-bold": "1. Audit:",
        "how-step1-text": "We review your current listings, keywords, and competitors.",
        "how-step2-bold": "2. Copy Optimization:",
        "how-step2-text": "We rewrite titles, bullets, and descriptions for the target marketplace.",
        "how-step3-bold": "3. Visual Tuning:",
        "how-step3-text": "We localize images and formatting for stronger click-through rates.",
        "how-step4-bold": "4. Report:",
        "how-step4-text": "Receive the optimized listing files and improvement notes within the delivery window.",

        "sec-industries-title": "Best For <span>B2B Buyers</span>",

        "view-basic-sub": "Perfect for one product listing that needs clean keyword targeting and market-fit copy.",
        "view-pro-sub": "Ideal for expanding catalogs and testing multiple product listings in a competitive niche.",
        "view-enterprise-sub": "Best for brands with large catalogs that need complete marketplace positioning.",
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
        "modal-desc": "Configure keywords and complete secure PayPal payment.",
        "modal-base-pkg": "Base Package:",
        "modal-base-price-label": "Base Price:",
        "modal-email-label": "Email Address *",
        "modal-email-placeholder": "name@example.com",
        "modal-email-error": "Please enter a valid email address.",
        "modal-keywords-label": "Target Keywords:",
        "modal-keywords-placeholder": "e.g. bamboo table, wholesale supplier",
        "modal-qty": "Quantity:",
        "modal-total-amt": "Total Amount:",
        "modal-test-btn": "Click price to test checkout",

        "badge-ssl": "SSL Secured Checkout",
        "badge-paypal": "PayPal Verified",

        "foot-packages": "Packages",
        "foot-why": "Why ALICAT",
        "foot-da": "Alibaba & Global Sources",
        "foot-dofollow": "Keyword Research",
        "foot-native": "Image Localization",
        "foot-contact": "Contact support: snsherocom@gmail.com",
        "foot-copy": "&copy; 2026 BibleForAI ALICAT. All rights reserved. Alibaba & B2B catalog optimization services.",

        "order-button": "Order Package",
        "featured-badge": "Best Seller",

        // Receipts
        "receipt-header": "BIBLEFORAI - ALICAT RECEIPT",
        "receipt-date": "Order Date",
        "receipt-txid": "Transaction ID",
        "receipt-email": "Customer Email",
        "receipt-type": "Product Type",
        "receipt-size": "Listing Tier",
        "receipt-keywords": "Target Keywords",
        "receipt-qty": "Quantity",
        "receipt-baseprice": "Base Price",
        "receipt-total": "Total Paid",
        "receipt-status": "Status",
        "receipt-method": "Payment Method",
        "receipt-method-val": "PayPal Secure Checkout"
    },
    ko: {
        "logo-subtitle": "ALICAT!",
        "nav-home": "홈",
        "nav-basic": "스탠다드",
        "nav-pro": "딜럭스",
        "nav-enterprise": "프리미엄",
        "btn-orders": "내 주문 내역",
        "hero-badge": "AI 기반 마켓플레이스 성장",
        "hero-title": "ALICAT — 알리바바 & B2B 카탈로그 리스팅!",
        "hero-desc": "키워드 리서치, 현지화된 카피, 이미지 튜닝으로 Alibaba와 Global Sources 리스팅을 최적화하세요.",
        "btn-explore": "패키지 둘러보기",
        "btn-how": "이용 방법",

        "stat-da": "상품 리스팅",
        "stat-dofollow": "카탈로그 최적화",
        "stat-indexed": "바이어 도달",
        "stat-delivery": "빠른 전달",

        "sec-packages-title": "카탈로그 패키지 선택",
        "sec-packages-subtitle": "단일 상품 리스팅부터 전체 카탈로그 리프레시까지. 모든 패키지에 리서치, 카피 최적화, 바이어 중심 포맷 정리가 포함됩니다.",
        "card-basic-title": "스탠다드 리스팅",
        "card-basic-desc": "Alibaba 또는 Global Sources용 상품 리스팅 1건을 키워드 현지화와 이미지 튜닝으로 최적화합니다.",
        "card-pro-title": "딜럭스 리스팅",
        "card-pro-desc": "3건의 리스팅에 경쟁사 리서치, SEO 카피, 상세 리포트를 제공합니다.",
        "card-enterprise-title": "프리미엄 리스팅",
        "card-enterprise-desc": "전략 수립, 비주얼 튜닝, 전담 지원을 포함한 전체 카탈로그 최적화 서비스입니다.",
        "card-view-pricing": "가격 확인하기",

        "how-title": "ALICAT 이용 방법",
        "how-desc": "4단계 프로세스로 상품 페이지를 바이어 친화적인 리스팅으로 바꾸어 순위와 국제 도매 트래픽 전환을 높입니다.",
        "how-step1-bold": "1. 진단:",
        "how-step1-text": "현재 리스팅, 키워드, 경쟁사를 검토합니다.",
        "how-step2-bold": "2. 카피 최적화:",
        "how-step2-text": "타겟 마켓플레이스에 맞게 제목, 불릿, 설명을 다시 작성합니다.",
        "how-step3-bold": "3. 비주얼 튜닝:",
        "how-step3-text": "이미지와 포맷을 현지화하여 클릭률을 높입니다.",
        "how-step4-bold": "4. 리포트:",
        "how-step4-text": "전달 기간 내에 최적화 파일과 개선 노트를 받아보세요.",

        "sec-industries-title": "추천 대상 <span>B2B 바이어</span>",

        "view-basic-sub": "깔끔한 키워드 타겟팅과 시장 적합형 카피가 필요한 단일 상품 리스팅에 적합합니다.",
        "view-pro-sub": "경쟁이 치열한 분야에서 여러 상품 리스팅을 확장하고 테스트하기에 이상적입니다.",
        "view-enterprise-sub": "대형 카탈로그의 마켓플레이스 포지셔닝이 필요한 브랜드에 가장 적합합니다.",
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
        "modal-desc": "키워드를 설정하고 안전한 PayPal 결제를 진행하세요.",
        "modal-base-pkg": "기본 패키지:",
        "modal-base-price-label": "기본 가격:",
        "modal-email-label": "이메일 주소 *",
        "modal-email-placeholder": "name@example.com",
        "modal-email-error": "올바른 이메일 주소를 입력해주세요.",
        "modal-keywords-label": "타겟 키워드:",
        "modal-keywords-placeholder": "예: bamboo table, wholesale supplier",
        "modal-qty": "수량:",
        "modal-total-amt": "총 결제금액:",
        "modal-test-btn": "가격 텍스트를 눌러 테스트 결제",

        "badge-ssl": "SSL 보안 결제 지원",
        "badge-paypal": "PayPal 인증됨",

        "foot-packages": "패키지",
        "foot-why": "ALICAT 특징",
        "foot-da": "Alibaba & Global Sources",
        "foot-dofollow": "키워드 리서치",
        "foot-native": "이미지 현지화",
        "foot-contact": "문의 지원: snsherocom@gmail.com",
        "foot-copy": "&copy; 2026 BibleForAI ALICAT. All rights reserved. Alibaba & B2B 카탈로그 최적화 서비스.",

        "order-button": "패키지 주문하기",
        "featured-badge": "베스트 셀러",

        // Receipts
        "receipt-header": "BIBLEFORAI - ALICAT 영수증",
        "receipt-date": "주문 날짜",
        "receipt-txid": "거래 ID",
        "receipt-email": "고객 이메일",
        "receipt-type": "상품 종류",
        "receipt-size": "리스팅 등급",
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
    const lang = currentLang;
    const isKo = lang === 'ko';
    
    // Set document lang attribute
    document.documentElement.lang = lang;
    
    // Update document title and metadata
    document.title = isKo ? "BibleForAI - ALICAT | 알리바바 & B2B 카탈로그 리스팅" : "BibleForAI - ALICAT | Alibaba & B2B Catalog Listing";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.content = isKo ? 
            "ALICAT로 Alibaba와 Global Sources 카탈로그를 최적화하세요. 바이어 키워드와 이미지 튜닝을 확보하세요." :
            "Optimize Alibaba and Global Sources listings with keyword research, localized copy, and image tuning.";
    }

    // Update Open Graph (OG) and Twitter Metadata tags dynamically
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
        ogTitle.content = isKo ? "BibleForAI - ALICAT | 알리바바 & B2B 카탈로그 리스팅" : "BibleForAI - ALICAT | Alibaba & B2B Catalog Listing";
    }
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
        ogDesc.content = isKo ? 
            "Alibaba와 Global Sources 상품 리스팅을 최적화하세요. 키워드 리서치와 이미지 튜닝으로 바이어 노출을 높이세요." :
            "Optimize Alibaba and Global Sources listings with keyword research and image tuning.";
    }
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) {
        twTitle.content = isKo ? "BibleForAI - ALICAT | 알리바바 & B2B 카탈로그 리스팅" : "BibleForAI - ALICAT | Alibaba & B2B Catalog Listing";
    }
    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) {
        twDesc.content = isKo ? 
            "Alibaba와 Global Sources 상품 리스팅을 최적화하세요. 키워드 리서치와 이미지 튜닝으로 바이어 노출을 높이세요." :
            "Optimize Alibaba and Global Sources listings with keyword research and image tuning.";
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
        case 'basic': return 'fa-solid fa-box-open';
        case 'pro': return 'fa-solid fa-magnifying-glass-chart';
        case 'enterprise': return 'fa-solid fa-building';
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
            modalCard.scrollTop = Math.max(0, paymentArea.offsetTop - 80);
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
    const orderLogs = JSON.parse(localStorage.getItem('alicat_orders')) || [];
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
    localStorage.setItem('alicat_orders', JSON.stringify(orderLogs));
    
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
    const orderLogs = JSON.parse(localStorage.getItem('alicat_orders')) || [];
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
