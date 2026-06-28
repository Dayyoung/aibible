// App State
let currentView = 'home';
let currentPackage = null;
let orderQuantity = 1;
let paypalButtonInstance = null;

// Package Catalog with Localized Keys
const packageCatalog = {
    basic: {
        title_en: 'Basic PR',
        title_ko: '베이직 PR',
        packages: [
            { id: 'basic-single', name_en: 'Single Guest Post', name_ko: '단일 게스트 포스트', desc_en: '1 guest post on VentsMagazine with 2 DoFollow backlinks. Perfect for startups testing global SEO.', desc_ko: 'VentsMagazine에 1개의 게스트 포스트와 2개의 DoFollow 백링크. 글로벌 SEO를 테스트하는 스타트업에 적합.', price: 99, featured: false, features_en: ['1 Guest Post on VentsMagazine', '2 DoFollow Backlinks', 'Native English Content', 'SEO-Optimized Article', 'Results Report Included', '3-5 Day Delivery'], features_ko: ['VentsMagazine 게스트 포스트 1건', 'DoFollow 백링크 2개', '원어민 영어 콘텐츠', 'SEO 최적화 기사', '결과 리포트 제공', '3-5일 내 전달'] },
            { id: 'basic-double', name_en: 'Double Guest Post', name_ko: '더블 게스트 포스트', desc_en: '2 guest posts on high-authority outlets. 4 DoFollow backlinks total.', desc_ko: '고권위 매체에 2개의 게스트 포스트. 총 4개의 DoFollow 백링크.', price: 179, featured: true, features_en: ['2 Guest Posts on High-DA Sites', '4 DoFollow Backlinks', 'Native English Content', 'SEO-Optimized Articles', 'Results Report Included', '3-5 Day Delivery'], features_ko: ['고권위 매체 게스트 포스트 2건', 'DoFollow 백링크 4개', '원어민 영어 콘텐츠', 'SEO 최적화 기사', '결과 리포트 제공', '3-5일 내 전달'] }
        ]
    },
    pro: {
        title_en: 'Pro PR',
        title_ko: '프로 PR',
        packages: [
            { id: 'pro-triple', name_en: 'Triple Outreach Package', name_ko: '트리플 아웃리치 패키지', desc_en: '3 guest posts across multiple high-DA outlets. 6 DoFollow backlinks. Best for growing brands.', desc_ko: '여러 고권위 매체에 3개의 게스트 포스트. 6개의 DoFollow 백링크. 성장 중인 브랜드에 최적.', price: 249, featured: false, features_en: ['3 Guest Posts on High-DA Sites', '6 DoFollow Backlinks', 'Custom Content Strategy', 'Multi-Outlet Distribution', 'Detailed Analytics Report', 'Priority 3-Day Delivery'], features_ko: ['고권위 매체 게스트 포스트 3건', 'DoFollow 백링크 6개', '맞춤형 콘텐츠 전략', '다중 매체 배포', '상세 분석 리포트', '우선 3일 내 전달'] },
            { id: 'pro-premium', name_en: 'Premium PR Package', name_ko: '프리미엄 PR 패키지', desc_en: '5 guest posts + 10 DoFollow backlinks + dedicated PR strategist.', desc_ko: '5개의 게스트 포스트 + 10개의 DoFollow 백링크 + 전담 PR 전략가.', price: 349, featured: true, features_en: ['5 Guest Posts on High-DA Sites', '10 DoFollow Backlinks', 'Dedicated PR Strategist', 'Custom Content Strategy', 'Monthly Performance Report', 'Express 2-Day Delivery'], features_ko: ['고권위 매체 게스트 포스트 5건', 'DoFollow 백링크 10개', '전담 PR 전략가 배정', '맞춤형 콘텐츠 전략', '월간 성과 리포트', '익스프레스 2일 내 전달'] }
        ]
    },
    enterprise: {
        title_en: 'Enterprise PR',
        title_ko: '엔터프라이즈 PR',
        packages: [
            { id: 'ent-scale', name_en: 'Scale-Up Campaign', name_ko: '스케일업 캠페인', desc_en: '10 guest posts + custom content strategy. 20 DoFollow backlinks. For global brands wanting dominance.', desc_ko: '10개의 게스트 포스트 + 맞춤 콘텐츠 전략. 20개의 DoFollow 백링크. 글로벌 시장 지배를 원하는 브랜드용.', price: 399, featured: true, features_en: ['10 Guest Posts on High-DA Sites', '20 DoFollow Backlinks', 'Custom Content Strategy', 'Dedicated PR Team', 'Quarterly Performance Review', 'VIP 48-Hour Delivery'], features_ko: ['고권위 매체 게스트 포스트 10건', 'DoFollow 백링크 20개', '맞춤형 콘텐츠 전략', '전담 PR 팀 배정', '분기별 성과 리뷰', 'VIP 48시간 내 전달'] }
        ]
    }
};

// Translation Dictionary
const translations = {
    en: {
        "logo-subtitle": "PRBOOST!",
        "nav-home": "Home",
        "nav-basic": "Basic PR",
        "nav-pro": "Pro PR",
        "nav-enterprise": "Enterprise",
        "btn-orders": "My Orders",
        "hero-badge": "AI-Powered Global PR",
        "hero-title": "PRBOOST — Global PR & Guest Posting!",
        "hero-desc": "Get DoFollow backlinks from high-authority overseas magazines. Boost your SEO, brand trust, and global visibility.",
        "btn-explore": "Explore Packages",
        "btn-how": "How It Works",
        
        "stat-da": "Domain Authority",
        "stat-dofollow": "SEO Backlinks",
        "stat-indexed": "Google Indexed",
        "stat-delivery": "Fast Delivery",
        
        "sec-packages-title": "Choose Your PR Package",
        "sec-packages-subtitle": "From a single guest post to a full-scale global PR campaign. Every package includes DoFollow backlinks and a results report.",
        "card-basic-title": "Basic PR",
        "card-basic-desc": "1 guest post on VentsMagazine with 2 DoFollow backlinks. Perfect for startups testing global SEO.",
        "card-pro-title": "Pro PR",
        "card-pro-desc": "3 guest posts across multiple high-DA outlets. 6 DoFollow backlinks total. Best for growing brands.",
        "card-enterprise-title": "Enterprise PR",
        "card-enterprise-desc": "10 guest posts + custom content strategy. 20 DoFollow backlinks. For global brands wanting dominance.",
        "card-view-pricing": "View Pricing",
        
        "how-title": "How PRBOOST Works",
        "how-desc": "Our proven 4-step process delivers high-quality guest posts on authoritative overseas media with powerful DoFollow backlinks that search engines love.",
        "how-step1-bold": "1. Consultation:",
        "how-step1-text": "We discuss your keywords, target audience, and PR goals.",
        "how-step2-bold": "2. Content Creation:",
        "how-step2-text": "Native English writers craft a SEO-optimized article with your DoFollow links.",
        "how-step3-bold": "3. Publication:",
        "how-step3-text": "Your article goes live on high-DA magazines like VentsMagazine.",
        "how-step4-bold": "4. Report:",
        "how-step4-text": "Receive the published URL and a detailed results report within 3–5 days.",
        
        "sec-industries-title": "Industries We <span>Serve</span>",
        
        "view-basic-sub": "One high-quality guest post on VentsMagazine with 2 DoFollow backlinks. Ideal for startups and small businesses entering global SEO.",
        "view-pro-sub": "Three guest posts across multiple high-DA outlets with 6 DoFollow backlinks. Perfect for growing brands looking to dominate search results.",
        "view-enterprise-sub": "Ten guest posts with a custom content strategy and 20 DoFollow backlinks. Designed for global brands seeking maximum SEO authority and visibility.",
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
        "modal-keywords-placeholder": "e.g. AI marketing, SEO tools",
        "modal-qty": "Quantity:",
        "modal-total-amt": "Total Amount:",
        "modal-test-btn": "Click price to test checkout",
        
        "badge-ssl": "SSL Secured Checkout",
        "badge-paypal": "PayPal Verified",
        
        "foot-packages": "PR Packages",
        "foot-why": "Why PRBOOST",
        "foot-da": "DA 60+ Media Outlets",
        "foot-dofollow": "DoFollow Backlinks",
        "foot-native": "Native English Writers",
        "foot-contact": "Contact support: snsherocom@gmail.com",
        "foot-copy": "&copy; 2026 BibleForAI PRBOOST. All rights reserved. Global PR & Guest Posting Services.",
        
        "order-button": "Order Package",
        "featured-badge": "Best Seller",
        
        // Receipts
        "receipt-header": "BIBLEFORAI - PRBOOST RECEIPT",
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
        "logo-subtitle": "PRBOOST!",
        "nav-home": "홈",
        "nav-basic": "베이직 PR",
        "nav-pro": "프로 PR",
        "nav-enterprise": "엔터프라이즈",
        "btn-orders": "내 주문 내역",
        "hero-badge": "AI 기반 글로벌 PR",
        "hero-title": "PRBOOST — 글로벌 PR & 게스트 포스팅!",
        "hero-desc": "고권위 해외 매거진에서 DoFollow 백링크를 확보하세요. SEO, 브랜드 신뢰도, 글로벌 가시성을 높여드립니다.",
        "btn-explore": "패키지 둘러보기",
        "btn-how": "이용 방법",
        
        "stat-da": "도메인 권위",
        "stat-dofollow": "SEO 백링크",
        "stat-indexed": "구글 인덱싱",
        "stat-delivery": "빠른 전달",
        
        "sec-packages-title": "PR 패키지 선택하기",
        "sec-packages-subtitle": "단일 게스트 포스트부터 풀스케일 글로벌 PR 캠페인까지. 모든 패키지에 DoFollow 백링크와 결과 리포트가 포함됩니다.",
        "card-basic-title": "베이직 PR",
        "card-basic-desc": "VentsMagazine에 1개의 게스트 포스트와 2개의 DoFollow 백링크. 글로벌 SEO를 테스트하는 스타트업에 적합.",
        "card-pro-title": "프로 PR",
        "card-pro-desc": "여러 고권위 매체에 3개의 게스트 포스트. 총 6개의 DoFollow 백링크. 성장 중인 브랜드에 최적.",
        "card-enterprise-title": "엔터프라이즈 PR",
        "card-enterprise-desc": "10개의 게스트 포스트 + 맞춤 콘텐츠 전략. 20개의 DoFollow 백링크. 글로벌 시장을 지배하려는 브랜드용.",
        "card-view-pricing": "가격 확인하기",
        
        "how-title": "PRBOOST 이용 방법",
        "how-desc": "검증된 4단계 프로세스로 검색 엔진이 선호하는 강력한 DoFollow 백링크가 포함된 고품질 게스트 포스트를 해외 권위 매체에 게재합니다.",
        "how-step1-bold": "1. 상담:",
        "how-step1-text": "키워드, 타겟 고객, PR 목표에 대해 논의합니다.",
        "how-step2-bold": "2. 콘텐츠 제작:",
        "how-step2-text": "원어민 영어 작가가 DoFollow 링크가 포함된 SEO 최적화 기사를 작성합니다.",
        "how-step3-bold": "3. 게재:",
        "how-step3-text": "귀하의 기사가 VentsMagazine과 같은 고권위 매체에 게재됩니다.",
        "how-step4-bold": "4. 리포트:",
        "how-step4-text": "게재된 URL과 상세 결과 리포트를 3-5일 내에 받아보세요.",
        
        "sec-industries-title": "지원 <span>산업 분야</span>",
        
        "view-basic-sub": "VentsMagazine에 1개의 고품질 게스트 포스트와 2개의 DoFollow 백링크. 글로벌 SEO에 진입하는 스타트업과 소규모 비즈니스에 이상적입니다.",
        "view-pro-sub": "여러 고권위 매체에 3개의 게스트 포스트와 6개의 DoFollow 백링크. 검색 결과를 장악하려는 성장 브랜드에 완벽합니다.",
        "view-enterprise-sub": "맞춤 콘텐츠 전략이 포함된 10개의 게스트 포스트와 20개의 DoFollow 백링크. 최대 SEO 권위와 가시성을 원하는 글로벌 브랜드를 위해 설계되었습니다.",
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
        "modal-keywords-placeholder": "예: AI 마케팅, SEO 도구",
        "modal-qty": "수량:",
        "modal-total-amt": "총 결제금액:",
        "modal-test-btn": "가격 텍스트를 눌러 테스트 결제",
        
        "badge-ssl": "SSL 보안 결제 지원",
        "badge-paypal": "PayPal 인증됨",
        
        "foot-packages": "PR 패키지",
        "foot-why": "PRBOOST 특징",
        "foot-da": "DA 60+ 미디어 매체",
        "foot-dofollow": "DoFollow 백링크",
        "foot-native": "원어민 영어 작가",
        "foot-contact": "문의 지원: snsherocom@gmail.com",
        "foot-copy": "&copy; 2026 BibleForAI PRBOOST. All rights reserved. Global PR & Guest Posting Services.",
        
        "order-button": "패키지 주문하기",
        "featured-badge": "베스트 셀러",
        
        // Receipts
        "receipt-header": "BIBLEFORAI - PRBOOST 영수증",
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
    const lang = currentLang;
    const isKo = lang === 'ko';
    
    // Set document lang attribute
    document.documentElement.lang = lang;
    
    // Update document title and metadata
    document.title = isKo ? "BibleForAI - PRBOOST | 글로벌 PR & 게스트 포스팅" : "BibleForAI - PRBOOST | Global PR & Guest Posting";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.content = isKo ? 
            "PRBOOST로 글로벌 SEO와 브랜드 권위를 높이세요. 고권위 해외 매거진에서 DoFollow 백링크를 확보하세요." : 
            "Boost your global SEO and brand authority with PRBOOST. Get DoFollow backlinks from high-authority overseas magazines and media outlets.";
    }

    // Update Open Graph (OG) and Twitter Metadata tags dynamically
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
        ogTitle.content = isKo ? "BibleForAI - PRBOOST | 글로벌 PR & 게스트 포스팅" : "BibleForAI - PRBOOST | Global PR & Guest Posting";
    }
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
        ogDesc.content = isKo ? 
            "글로벌 SEO와 브랜드 권위를 높이세요. 고권위 해외 매거진에서 DoFollow 백링크를 확보하세요." : 
            "Boost your global SEO and brand authority. Get DoFollow backlinks from high-authority overseas magazines.";
    }
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) {
        twTitle.content = isKo ? "BibleForAI - PRBOOST | 글로벌 PR & 게스트 포스팅" : "BibleForAI - PRBOOST | Global PR & Guest Posting";
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
    const orderLogs = JSON.parse(localStorage.getItem('prboost_orders')) || [];
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
    localStorage.setItem('prboost_orders', JSON.stringify(orderLogs));
    
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
    const orderLogs = JSON.parse(localStorage.getItem('prboost_orders')) || [];
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
