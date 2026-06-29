// App State
let currentView = 'home';
let currentPackage = null;
let orderQuantity = 1;
let paypalButtonInstance = null;

// Package Catalog with Localized Keys
const packageCatalog = {
    buyer: {
        title_en: 'Global Buyer Discovery',
        title_ko: '해외 바이어 발굴',
        packages: [
            { id: 'buyer-starter', name_en: 'Starter Buyer List', name_ko: '스타터 바이어 리스트', desc_en: 'Validated buyer discovery for one target country or product category. Based on Kmong overseas buyer research services originally listed from ₩89,000; marked up 2× and converted at ₩1,400 ≈ $1.', desc_ko: '단일 국가 또는 제품군에 대한 검증 바이어 발굴. 크몽 해외 바이어 발굴 서비스 89,000원 기준 ×2 마크업 후 환율 1,400원 기준으로 산정.', price: 129, featured: false, features_en: ['30-50 Prospective Buyers', 'Company, Website & Contact Path', 'Import/Distribution Fit Check', 'Excel/CSV Delivery', '3 Business Day Turnaround'], features_ko: ['잠재 바이어 30-50개', '회사/웹사이트/연락 경로', '수입·유통 적합성 검토', 'Excel/CSV 제공', '영업일 3일 납품'] },
            { id: 'buyer-growth', name_en: 'Growth Outreach Pack', name_ko: '그로스 아웃리치 팩', desc_en: 'Larger buyer list plus segmentation and an AI-personalized first outreach script for export sales teams.', desc_ko: '수출 영업팀을 위한 확장 바이어 리스트, 세그먼트 분류, AI 맞춤형 1차 아웃리치 스크립트 제공.', price: 299, featured: true, features_en: ['100-150 Buyers Across 2 Markets', 'Buyer Priority Scoring', 'Decision-Maker Research', 'Cold Email / LinkedIn Script', '7-Day Revision Window', 'Export Channel Notes'], features_ko: ['2개 시장 바이어 100-150개', '바이어 우선순위 점수', '의사결정권자 리서치', '콜드메일/링크드인 스크립트', '7일 수정 기간', '수출 채널 메모'] },
            { id: 'buyer-enterprise', name_en: 'Enterprise Export Pipeline', name_ko: '엔터프라이즈 수출 파이프라인', desc_en: 'Multi-country buyer discovery with competitor/import data signals, outreach materials, and weekly pipeline review.', desc_ko: '다국가 바이어 발굴, 경쟁사/수입 데이터 시그널, 아웃리치 자료, 주간 파이프라인 리뷰까지 포함한 종합 패키지.', price: 699, featured: false, features_en: ['300+ Buyers in 3-5 Countries', 'Import Signal & Competitor Mapping', 'Verified Contact Routes', 'Personalized Outreach Kit', 'CRM-Ready Spreadsheet', '30-Day Pipeline Review'], features_ko: ['3-5개국 바이어 300개 이상', '수입 시그널 및 경쟁사 맵핑', '검증 연락 경로', '맞춤형 아웃리치 키트', 'CRM 연동용 스프레드시트', '30일 파이프라인 리뷰'] }
        ]
    }
};

// Translation Dictionary
const translations = {
    en: {
        "logo-subtitle": "BUYERBOOST!",
        "nav-home": "Home",
        "nav-buyer": "Buyer Discovery",
        "btn-orders": "My Orders",
        "hero-badge": "AI-Powered Export Sales",
        "hero-title": "BibleForAI - BUYERBOOST!",
        "hero-desc": "Find qualified overseas buyers, importers, distributors, and business partners for your export pipeline.",
        "btn-explore": "Explore Buyer Packages",
        "btn-compliance": "How It Works",
        "stat-markets": "Target Markets",
        "stat-countries": "Countries Covered",
        "stat-rating": "Research Accuracy",
        "stat-delivery": "Avg Delivery",
        "sec-channels-title": "Discover Global Buyers with Verified Signals",
        "sec-channels-subtitle": "Turn overseas expansion into a structured sales pipeline with buyer discovery, segmentation, and AI-assisted outreach.",
        "card-amazon-title": "Importer Discovery",
        "card-amazon-desc": "Locate active importers and distributors aligned with your product category and target HS or market keywords.",
        "card-shopee-title": "Distributor Mapping",
        "card-shopee-desc": "Identify wholesalers, distributors, retailers, and local partners by region and business fit.",
        "card-lazada-title": "Decision-Maker Research",
        "card-lazada-desc": "Find contact routes, LinkedIn profiles, company websites, and buyer-facing departments for outreach.",
        "card-rakuten-title": "Export Market Notes",
        "card-rakuten-desc": "Receive market-entry notes including competitor signals, channel preferences, and prospect priority scores.",
        "card-global-title": "Outreach Kit",
        "card-global-desc": "Get concise cold email and LinkedIn scripts tailored to each market and buyer segment.",
        "card-view-pricing": "View Pricing",
        "comp-title": "From Raw Market Leads to Export Pipeline",
        "comp-desc": "BUYERBOOST combines Kmong-style overseas buyer research with AI-assisted validation, segmentation, and outreach assets for globally usable B2B expansion.",
        "comp-bullet1-bold": "Buyer Research:",
        "comp-bullet1-text": "Company lists are filtered by product fit, market relevance, import/distribution role, and public contact availability.",
        "comp-bullet2-bold": "Pipeline Enrichment:",
        "comp-bullet2-text": "Each prospect includes actionable context such as website, contact path, channel role, priority score, and notes.",
        "comp-bullet3-bold": "Outreach Ready:",
        "comp-bullet3-text": "Growth and Enterprise packages include AI-personalized cold email and LinkedIn message templates.",
        "view-buyer-sub": "Choose a buyer discovery package for your target market. We convert overseas market research into a CRM-ready export sales pipeline.",
        "view-orders-title": "My Purchase History",
        "view-orders-sub": "Review your successful orders. Your data is stored locally in your browser workspace.",
        "th-date": "Order Date",
        "th-order-id": "Transaction ID",
        "th-product": "Product",
        "th-tier": "Package Tier",
        "th-market": "Target Market",
        "th-qty": "Quantity",
        "th-total": "Total Paid",
        "th-status": "Status",
        "no-orders-msg": "No purchase records found. Make your first order to see history here!",
        "modal-title": "Configure Order",
        "modal-desc": "Select your target market and complete secure PayPal payment.",
        "modal-base-pkg": "Base Package:",
        "modal-base-price-label": "Base Price:",
        "modal-email-label": "Email Address *",
        "modal-email-placeholder": "name@example.com",
        "modal-email-error": "Please enter a valid email address.",
        "modal-market-label": "Target Market:",
        "modal-qty": "Quantity:",
        "modal-total-amt": "Total Amount:",
        "modal-test-btn": "Click price to test checkout",
        "badge-ssl": "SSL Secured Checkout",
        "badge-paypal": "PayPal Verified",
        "foot-channels": "Buyer Research",
        "foot-legal": "Service & Support",
        "foot-gdpr": "Public Source Research",
        "foot-canspam": "B2B Outreach Ready",
        "foot-match": "Verified Contact Routes",
        "foot-contact": "Contact support: snsherocom@gmail.com",
        "foot-copy": "&copy; 2026 BibleForAI BUYERBOOST. All rights reserved. Global Buyer Discovery.",
        "order-button": "Order Package",
        "featured-badge": "Best Seller",
        "receipt-header": "BIBLEFORAI - BUYERBOOST RECEIPT",
        "receipt-date": "Order Date",
        "receipt-txid": "Transaction ID",
        "receipt-email": "Customer Email",
        "receipt-type": "Product Type",
        "receipt-size": "Package Size",
        "receipt-market": "Target Market",
        "receipt-qty": "Quantity",
        "receipt-baseprice": "Base Price",
        "receipt-total": "Total Paid",
        "receipt-status": "Status",
        "receipt-method": "Payment Method",
        "receipt-method-val": "PayPal Secure Checkout"
    },
    ko: {
        "logo-subtitle": "BUYERBOOST!",
        "nav-home": "홈",
        "nav-buyer": "바이어 발굴",
        "btn-orders": "내 주문 내역",
        "hero-badge": "AI 기반 수출 영업",
        "hero-title": "BibleForAI - BUYERBOOST!",
        "hero-desc": "수출 파이프라인에 필요한 해외 바이어, 수입사, 유통사, 비즈니스 파트너를 발굴하세요.",
        "btn-explore": "바이어 패키지 보기",
        "btn-compliance": "진행 방식 보기",
        "stat-markets": "타겟 시장",
        "stat-countries": "커버 국가",
        "stat-rating": "리서치 정확도",
        "stat-delivery": "평균 납기",
        "sec-channels-title": "검증 시그널 기반 글로벌 바이어 발굴",
        "sec-channels-subtitle": "해외 진출을 바이어 발굴, 세그먼트 분류, AI 아웃리치가 포함된 체계적 영업 파이프라인으로 전환하세요.",
        "card-amazon-title": "수입사 발굴",
        "card-amazon-desc": "제품군과 타겟 키워드 또는 HS 관점에 맞는 활성 수입사와 유통사를 찾습니다.",
        "card-shopee-title": "유통 파트너 맵핑",
        "card-shopee-desc": "지역별 비즈니스 적합도에 맞는 도매상, 유통사, 리테일러, 현지 파트너를 식별합니다.",
        "card-lazada-title": "의사결정권자 리서치",
        "card-lazada-desc": "아웃리치에 필요한 연락 경로, 링크드인, 회사 웹사이트, 담당 부서를 조사합니다.",
        "card-rakuten-title": "수출 시장 메모",
        "card-rakuten-desc": "경쟁사 시그널, 채널 선호도, 우선순위 점수를 포함한 시장 진입 메모를 제공합니다.",
        "card-global-title": "아웃리치 키트",
        "card-global-desc": "시장과 바이어 세그먼트별로 맞춤화된 콜드메일 및 링크드인 메시지 스크립트를 제공합니다.",
        "card-view-pricing": "가격 확인하기",
        "comp-title": "시장 리드에서 수출 파이프라인까지",
        "comp-desc": "BUYERBOOST는 크몽형 해외 바이어 발굴 서비스에 AI 검증, 세그먼트 분류, 아웃리치 자료를 결합한 글로벌 B2B 확장 솔루션입니다.",
        "comp-bullet1-bold": "바이어 리서치:",
        "comp-bullet1-text": "제품 적합도, 시장 관련성, 수입·유통 역할, 공개 연락 가능성을 기준으로 기업 리스트를 필터링합니다.",
        "comp-bullet2-bold": "파이프라인 보강:",
        "comp-bullet2-text": "웹사이트, 연락 경로, 채널 역할, 우선순위 점수, 참고 메모 등 실행 가능한 정보를 제공합니다.",
        "comp-bullet3-bold": "아웃리치 준비:",
        "comp-bullet3-text": "그로스 및 엔터프라이즈 패키지는 AI 맞춤형 콜드메일과 링크드인 메시지 템플릿을 포함합니다.",
        "view-buyer-sub": "타겟 시장에 맞는 바이어 발굴 패키지를 선택하세요. 해외 시장 리서치를 CRM용 수출 영업 파이프라인으로 전환합니다.",
        "view-orders-title": "내 구매 히스토리",
        "view-orders-sub": "성공한 주문 내역을 검토하세요. 데이터는 브라우저 로컬스토리지에 안전하게 보관됩니다.",
        "th-date": "주문 날짜",
        "th-order-id": "트랜잭션 ID",
        "th-product": "상품명",
        "th-tier": "패키지 등급",
        "th-market": "대상 시장",
        "th-qty": "수량",
        "th-total": "총 결제금액",
        "th-status": "상태",
        "no-orders-msg": "구매 기록이 없습니다. 첫 주문을 완료하시면 내역이 여기에 표시됩니다!",
        "modal-title": "주문 설정",
        "modal-desc": "대상 시장을 선택하고 안전한 PayPal 결제를 진행하세요.",
        "modal-base-pkg": "기본 패키지:",
        "modal-base-price-label": "기본 가격:",
        "modal-email-label": "이메일 주소 *",
        "modal-email-placeholder": "name@example.com",
        "modal-email-error": "올바른 이메일 주소를 입력해주세요.",
        "modal-market-label": "대상 시장:",
        "modal-qty": "수량:",
        "modal-total-amt": "총 결제금액:",
        "modal-test-btn": "가격 텍스트를 눌러 테스트 결제",
        "badge-ssl": "SSL 보안 결제 지원",
        "badge-paypal": "PayPal 인증됨",
        "foot-channels": "바이어 리서치",
        "foot-legal": "서비스 및 지원",
        "foot-gdpr": "공개 소스 리서치",
        "foot-canspam": "B2B 아웃리치 준비",
        "foot-match": "검증 연락 경로",
        "foot-contact": "문의 지원: snsherocom@gmail.com",
        "foot-copy": "&copy; 2026 BibleForAI BUYERBOOST. All rights reserved. 글로벌 바이어 발굴.",
        "order-button": "패키지 주문하기",
        "featured-badge": "베스트 셀러",
        "receipt-header": "BIBLEFORAI - BUYERBOOST 영수증",
        "receipt-date": "주문 날짜",
        "receipt-txid": "거래 ID",
        "receipt-email": "고객 이메일",
        "receipt-type": "상품 종류",
        "receipt-size": "패키지 크기",
        "receipt-market": "대상 시장",
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
    
    document.title = isKo ? "BibleForAI - BUYERBOOST | 해외 바이어 발굴" : "BibleForAI - BUYERBOOST | Global Buyer Discovery";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.content = isKo ? 
            "해외 바이어, 수입사, 유통사, 비즈니스 파트너 발굴. AI 기반 검증과 아웃리치 자료로 수출 영업 파이프라인을 구축하세요." : 
            "Find qualified overseas buyers, importers, distributors, and business partners. AI-assisted buyer discovery, market segmentation, and export outreach preparation.";
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
        ogTitle.content = isKo ? "BibleForAI - BUYERBOOST | 해외 바이어 발굴" : "BibleForAI - BUYERBOOST | Global Buyer Discovery";
    }
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
        ogDesc.content = isKo ? 
            "검증 리서치와 AI 아웃리치 자료로 해외 바이어와 수출 파트너를 발굴하세요." : 
            "Find overseas buyers and export partners with verified research and AI-assisted outreach assets.";
    }
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) {
        twTitle.content = isKo ? "BibleForAI - BUYERBOOST | 해외 바이어 발굴" : "BibleForAI - BUYERBOOST | Global Buyer Discovery";
    }
    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) {
        twDesc.content = isKo ? 
            "검증 리서치와 AI 아웃리치 자료로 해외 바이어와 수출 파트너를 발굴하세요." : 
            "Find overseas buyers and export partners with verified research and AI-assisted outreach assets.";
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
        case 'buyer': return 'fa-solid fa-handshake';
        default: return 'fa-solid fa-handshake';
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
            const selectedMarket = document.getElementById('order-market').value;
            const finalAmount = (currentPackage.basePrice * orderQuantity).toFixed(2);
            return actions.order.create({
                purchase_units: [{
                    description: `${currentPackage.categoryName} - ${currentPackage.tierName} [Market: ${selectedMarket}] (Qty: ${orderQuantity})`,
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
    const orderLogs = JSON.parse(localStorage.getItem('buyerboost_orders')) || [];
    const selectedMarket = document.getElementById('order-market').value;
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
        market: selectedMarket,
        quantity: orderQuantity,
        basePrice: currentPackage.basePrice,
        totalPaid: formatPrice(currentPackage.basePrice * orderQuantity),
        status: 'Completed',
        clientId: clientId,
        secret: secret
    };
    
    orderLogs.unshift(newOrder);
    localStorage.setItem('buyerboost_orders', JSON.stringify(orderLogs));
    
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
${dict["receipt-market"].padEnd(15)} : ${newOrder.market}
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
    const orderLogs = JSON.parse(localStorage.getItem('buyerboost_orders')) || [];
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
            <td>${order.market || 'Global'}</td>
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
