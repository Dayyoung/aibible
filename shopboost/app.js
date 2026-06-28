// App State
let currentView = 'home';
let currentPackage = null;
let orderQuantity = 1;
let paypalButtonInstance = null;

// Package Catalog with Localized Keys
const packageCatalog = {
    shop: {
        title_en: 'E-Commerce Marketplace Entry',
        title_ko: '이커머스 마켓플레이스 입점',
        packages: [
            { id: 'shop-starter', name_en: 'Starter (Single Marketplace)', name_ko: '스타터 (단일 마켓플레이스)', desc_en: 'Entry-level marketplace setup for one platform. Registration, basic store configuration, and product listing guidance.', desc_ko: '단일 플랫폼 입점 기본 설정. 회원가입, 기본 스토어 구성 및 상품 등록 가이드.', price: 199, featured: false, features_en: ['Single Marketplace Registration', 'Basic Store Configuration', 'Product Listing Template', 'Platform Guideline Review', '5-Day Turnaround'], features_ko: ['단일 마켓플레이스 가입', '기본 스토어 설정', '상품 등록 템플릿', '플랫폼 가이드 검토', '5일 이내 완료'] },
            { id: 'shop-growth', name_en: 'Growth (3 Marketplaces)', name_ko: '그로스 (3개 마켓플레이스)', desc_en: 'Multi-platform launch across Amazon, Shopee & Lazada. Brand registration, multi-country payment setup, and product optimization.', desc_ko: '아마존, 쇼피, 라자다 3개 플랫폼 동시 입점. 브랜드 등록, 국가별 정산 계좌 연동, 상품 최적화.', price: 499, featured: true, features_en: ['3 Marketplace Registration', 'Brand Registration Support', 'Multi-Country Payment Setup', 'Product Listing Optimization', '7-Day Post-Launch Support', 'Currency & Tax Guidance'], features_ko: ['3개 마켓플레이스 가입', '브랜드 등록 지원', '국가별 정산 계좌 연동', '상품 등록 최적화', '출시 후 7일 지원', '환전 및 세금 가이드'] },
            { id: 'shop-enterprise', name_en: 'Enterprise (Global Expansion)', name_ko: '엔터프라이즈 (글로벌 확장)', desc_en: 'Full global e-commerce expansion. All major platforms, custom storefront design, marketing strategy, logistics setup, and dedicated account manager.', desc_ko: '완전한 글로벌 이커머스 확장. 모든 주요 플랫폼, 맞춤형 스토어 디자인, 마케팅 전략, 물류 설정 및 전담 매니저.', price: 899, featured: false, features_en: ['All Major Platforms (Amazon, eBay, Shopee, Lazada, Rakuten, Qoo10)', 'Custom Storefront Banner Design (3pc)', 'Marketing Strategy Blueprint', 'Logistics & Fulfillment Setup', 'Dedicated Account Manager', '30-Day Post-Launch Support', 'Monthly Performance Review'], features_ko: ['모든 주요 플랫폼 (아마존, 이베이, 쇼피, 라자다, 라쿠텐, 큐텐)', '맞춤형 스토어 배너 디자인 (3종)', '마케팅 전략 청사진', '물류 및 배송 설정', '전담 어카운트 매니저', '출시 후 30일 지원', '월간 성과 리뷰'] }
        ]
    }
};

// Translation Dictionary
const translations = {
    en: {
        "logo-subtitle": "SHOPBOOST!",
        "nav-home": "Home",
        "nav-shop": "Marketplace Entry",
        "btn-orders": "My Orders",
        "hero-badge": "AI-Powered E-Commerce",
        "hero-title": "BibleForAI - SHOPBOOST!",
        "hero-desc": "Launch your products on Amazon, Shopee, Lazada & global marketplaces with expert setup and support.",
        "btn-explore": "Explore Marketplaces",
        "btn-compliance": "How It Works",
        
        "stat-marketplaces": "Marketplaces",
        "stat-countries": "Countries Covered",
        "stat-rating": "Success Rate",
        "stat-delivery": "Avg Setup Time",
        
        "sec-channels-title": "Access Global E-Commerce Platforms",
        "sec-channels-subtitle": "Enter the world's largest online marketplaces with professional setup, brand registration, and optimized storefronts.",
        "card-amazon-title": "Amazon Global",
        "card-amazon-desc": "Launch on Amazon.com, Amazon Japan, and regional Amazon marketplaces with A+ content and brand registry.",
        "card-shopee-title": "Shopee (SEA)",
        "card-shopee-desc": "Enter Southeast Asia's #1 marketplace across Singapore, Malaysia, Thailand, Indonesia, Philippines & Vietnam.",
        "card-lazada-title": "Lazada (SEA)",
        "card-lazada-desc": "Alibaba-backed platform covering Indonesia, Malaysia, Philippines, Singapore, Thailand & Vietnam.",
        "card-rakuten-title": "Rakuten & Qoo10 Japan",
        "card-rakuten-desc": "Expand into the Japanese market with Rakuten Ichiba and Qoo10 Japan storefront setup and localization.",
        "card-global-title": "Global Expansion",
        "card-global-desc": "Multi-marketplace strategy including eBay, Joom, Jumia, and emerging markets across Europe, Africa & Middle East.",
        "card-view-pricing": "View Pricing",
        
        "comp-title": "End-to-End E-Commerce Integration",
        "comp-desc": "Our marketplace entry service covers everything from platform registration and brand setup to product optimization and logistics planning — ensuring you're ready to sell from day one.",
        "comp-bullet1-bold": "Platform Registration:",
        "comp-bullet1-text": "Complete account setup with platform-specific verification and seller central configuration.",
        "comp-bullet2-bold": "Brand & Product Setup:",
        "comp-bullet2-text": "Brand registry, product listing optimization, keyword research, and competitive pricing strategy.",
        "comp-bullet3-bold": "Logistics & Payments:",
        "comp-bullet3-text": "Fulfillment method selection (FBA/FBM), multi-currency payment accounts, and tax compliance guidance.",
        
        "view-shop-sub": "Expand your business to global marketplaces with expert setup and optimization. Choose from our flexible packages designed for sellers at every stage.",
        "view-orders-title": "My Purchase History",
        "view-orders-sub": "Review your successful orders. Your data is stored locally in your browser workspace.",
        
        "th-date": "Order Date",
        "th-order-id": "Transaction ID",
        "th-product": "Product",
        "th-tier": "Package Tier",
        "th-marketplace": "Target Marketplace",
        "th-qty": "Quantity",
        "th-total": "Total Paid",
        "th-status": "Status",
        
        "no-orders-msg": "No purchase records found. Make your first order to see history here!",
        
        "modal-title": "Configure Order",
        "modal-desc": "Select your target marketplace and complete secure PayPal payment.",
        "modal-base-pkg": "Base Package:",
        "modal-base-price-label": "Base Price:",
        "modal-email-label": "Email Address *",
        "modal-email-placeholder": "name@example.com",
        "modal-email-error": "Please enter a valid email address.",
        "modal-marketplace-label": "Target Marketplace:",
        "modal-qty": "Quantity:",
        "modal-total-amt": "Total Amount:",
        "modal-test-btn": "Click price to test checkout",
        
        "badge-ssl": "SSL Secured Checkout",
        "badge-paypal": "PayPal Verified",
        
        "foot-channels": "Marketplaces",
        "foot-legal": "Service & Support",
        "foot-gdpr": "Business License Verified",
        "foot-canspam": "Platform Policy Compliant",
        "foot-match": "100% Satisfaction Guarantee",
        "foot-contact": "Contact support: snsherocom@gmail.com",
        "foot-copy": "&copy; 2026 BibleForAI SHOPBOOST. All rights reserved. Global E-Commerce Marketplace Entry.",
        
        "order-button": "Order Package",
        "featured-badge": "Best Seller",
        
        // Receipts
        "receipt-header": "BIBLEFORAI - SHOPBOOST RECEIPT",
        "receipt-date": "Order Date",
        "receipt-txid": "Transaction ID",
        "receipt-email": "Customer Email",
        "receipt-type": "Product Type",
        "receipt-size": "Package Size",
        "receipt-marketplace": "Target Marketplace",
        "receipt-qty": "Quantity",
        "receipt-baseprice": "Base Price",
        "receipt-total": "Total Paid",
        "receipt-status": "Status",
        "receipt-method": "Payment Method",
        "receipt-method-val": "PayPal Secure Checkout"
    },
    ko: {
        "logo-subtitle": "SHOPBOOST!",
        "nav-home": "홈",
        "nav-shop": "마켓플레이스 입점",
        "btn-orders": "내 주문 내역",
        "hero-badge": "AI 기반 이커머스",
        "hero-title": "BibleForAI - SHOPBOOST!",
        "hero-desc": "아마존, 쇼피, 라자다 등 글로벌 마켓플레이스에서 전문가의 설정 및 지원으로 제품을 판매하세요.",
        "btn-explore": "마켓플레이스 둘러보기",
        "btn-compliance": "진행 방식 보기",
        
        "stat-marketplaces": "마켓플레이스",
        "stat-countries": "커버 국가",
        "stat-rating": "성공률",
        "stat-delivery": "평균 설정 기간",
        
        "sec-channels-title": "글로벌 이커머스 플랫폼에 접근하세요",
        "sec-channels-subtitle": "전문적인 설정, 브랜드 등록 및 최적화된 스토어로 세계 최대 온라인 마켓플레이스에 입점하세요.",
        "card-amazon-title": "아마존 글로벌",
        "card-amazon-desc": "Amazon.com, 아마존 재팬 및 지역 아마존 마켓플레이스에 A+ 콘텐츠와 브랜드 레지스트리로 입점하세요.",
        "card-shopee-title": "쇼피 (동남아)",
        "card-shopee-desc": "싱가포르, 말레이시아, 태국, 인도네시아, 필리핀, 베트남 등 동남아 1위 마켓플레이스에 진출하세요.",
        "card-lazada-title": "라자다 (동남아)",
        "card-lazada-desc": "알리바바가 운영하는 인도네시아, 말레이시아, 필리핀, 싱가포르, 태국, 베트남 커버 플랫폼입니다.",
        "card-rakuten-title": "라쿠텐 & 큐텐 재팬",
        "card-rakuten-desc": "라쿠텐 이치바와 큐텐 재팬 스토어 설정 및 현지화로 일본 시장에 진출하세요.",
        "card-global-title": "글로벌 확장",
        "card-global-desc": "이베이, 줌, 주미아 및 유럽, 아프리카, 중동 신흥 시장을 포함한 멀티 마켓플레이스 전략.",
        "card-view-pricing": "가격 확인하기",
        
        "comp-title": "올인원 이커머스 통합 서비스",
        "comp-desc": "플랫폼 등록부터 브랜드 설정, 상품 최적화, 물류 계획까지 — 첫날부터 판매 준비가 완료되도록 모든 것을 지원합니다.",
        "comp-bullet1-bold": "플랫폼 등록:",
        "comp-bullet1-text": "플랫폼별 인증 및 셀러 센트럴 구성을 포함한 완전한 계정 설정.",
        "comp-bullet2-bold": "브랜드 및 상품 설정:",
        "comp-bullet2-text": "브랜드 레지스트리, 상품 리스팅 최적화, 키워드 리서치 및 경쟁력 있는 가격 전략.",
        "comp-bullet3-bold": "물류 및 결제:",
        "comp-bullet3-text": "풀필먼트 방식 선택(FBA/FBM), 다중 통화 결제 계좌 및 세금 규정 준수 가이드.",
        
        "view-shop-sub": "전문가의 설정과 최적화로 글로벌 마켓플레이스로 비즈니스를 확장하세요. 모든 단계의 셀러를 위한 유연한 패키지를 선택하세요.",
        "view-orders-title": "내 구매 히스토리",
        "view-orders-sub": "성공한 주문 내역을 검토하세요. 데이터는 브라우저 로컬스토리지에 안전하게 보관됩니다.",
        
        "th-date": "주문 날짜",
        "th-order-id": "트랜잭션 ID",
        "th-product": "상품명",
        "th-tier": "패키지 등급",
        "th-marketplace": "대상 마켓플레이스",
        "th-qty": "수량",
        "th-total": "총 결제금액",
        "th-status": "상태",
        
        "no-orders-msg": "구매 기록이 없습니다. 첫 주문을 완료하시면 내역이 여기에 표시됩니다!",
        
        "modal-title": "주문 설정",
        "modal-desc": "대상 마켓플레이스를 선택하고 안전한 PayPal 결제를 진행하세요.",
        "modal-base-pkg": "기본 패키지:",
        "modal-base-price-label": "기본 가격:",
        "modal-email-label": "이메일 주소 *",
        "modal-email-placeholder": "name@example.com",
        "modal-email-error": "올바른 이메일 주소를 입력해주세요.",
        "modal-marketplace-label": "대상 마켓플레이스:",
        "modal-qty": "수량:",
        "modal-total-amt": "총 결제금액:",
        "modal-test-btn": "가격 텍스트를 눌러 테스트 결제",
        
        "badge-ssl": "SSL 보안 결제 지원",
        "badge-paypal": "PayPal 인증됨",
        
        "foot-channels": "마켓플레이스",
        "foot-legal": "서비스 및 지원",
        "foot-gdpr": "사업자 등록 검증 완료",
        "foot-canspam": "플랫폼 정책 준수",
        "foot-match": "100% 만족 보장",
        "foot-contact": "문의 지원: snsherocom@gmail.com",
        "foot-copy": "&copy; 2026 BibleForAI SHOPBOOST. All rights reserved. 글로벌 이커머스 마켓플레이스 입점.",
        
        "order-button": "패키지 주문하기",
        "featured-badge": "베스트 셀러",
        
        // Receipts
        "receipt-header": "BIBLEFORAI - SHOPBOOST 영수증",
        "receipt-date": "주문 날짜",
        "receipt-txid": "거래 ID",
        "receipt-email": "고객 이메일",
        "receipt-type": "상품 종류",
        "receipt-size": "패키지 크기",
        "receipt-marketplace": "대상 마켓플레이스",
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
    
    document.title = isKo ? "BibleForAI - SHOPBOOST | 글로벌 이커머스 마켓플레이스 입점" : "BibleForAI - SHOPBOOST | Global E-Commerce Marketplace Entry";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.content = isKo ? 
            "아마존, 쇼피, 라자다, 라쿠텐 등 글로벌 마켓플레이스 입점 대행. 전문가의 브랜드 등록, 상품 최적화, 물류 설정으로 해외 시장에 진출하세요." : 
            "Launch your products on Amazon, Shopee, Lazada, Rakuten & global marketplaces. Professional brand registration, product optimization, and logistics setup for international expansion.";
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
        ogTitle.content = isKo ? "BibleForAI - SHOPBOOST | 글로벌 이커머스 마켓플레이스 입점" : "BibleForAI - SHOPBOOST | Global E-Commerce Marketplace Entry";
    }
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
        ogDesc.content = isKo ? 
            "전문가의 설정 및 지원으로 아마존, 쇼피, 라자다 등 글로벌 마켓플레이스에서 제품을 판매하세요." : 
            "Launch your products on Amazon, Shopee, Lazada & global marketplaces with expert setup and support.";
    }
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) {
        twTitle.content = isKo ? "BibleForAI - SHOPBOOST | 글로벌 이커머스 마켓플레이스 입점" : "BibleForAI - SHOPBOOST | Global E-Commerce Marketplace Entry";
    }
    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) {
        twDesc.content = isKo ? 
            "전문가의 설정 및 지원으로 아마존, 쇼피, 라자다 등 글로벌 마켓플레이스에서 제품을 판매하세요." : 
            "Launch your products on Amazon, Shopee, Lazada & global marketplaces with expert setup and support.";
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
        case 'shop': return 'fa-solid fa-store';
        default: return 'fa-solid fa-store';
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
            const selectedMarketplace = document.getElementById('order-marketplace').value;
            const finalAmount = (currentPackage.basePrice * orderQuantity).toFixed(2);
            return actions.order.create({
                purchase_units: [{
                    description: `${currentPackage.categoryName} - ${currentPackage.tierName} [Marketplace: ${selectedMarketplace}] (Qty: ${orderQuantity})`,
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
    const orderLogs = JSON.parse(localStorage.getItem('shopboost_orders')) || [];
    const selectedMarketplace = document.getElementById('order-marketplace').value;
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
        marketplace: selectedMarketplace,
        quantity: orderQuantity,
        basePrice: currentPackage.basePrice,
        totalPaid: formatPrice(currentPackage.basePrice * orderQuantity),
        status: 'Completed',
        clientId: clientId,
        secret: secret
    };
    
    orderLogs.unshift(newOrder);
    localStorage.setItem('shopboost_orders', JSON.stringify(orderLogs));
    
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
${dict["receipt-marketplace"].padEnd(15)} : ${newOrder.marketplace}
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
    const orderLogs = JSON.parse(localStorage.getItem('shopboost_orders')) || [];
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
            <td>${order.marketplace || 'Global'}</td>
            <td>${order.quantity}</td>
            <td><strong>${order.totalPaid}</strong></td>
            <td><span class="status-badge">${isKo ? "완료됨" : order.status}</span></td>
        </tr>
    `).join('');
}
