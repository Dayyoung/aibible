// App State
let currentView = 'home';
let currentPackage = null;
let orderQuantity = 1;
let paypalButtonInstance = null;

// Package Catalog with Localized Keys
const packageCatalog = {
    shortform: {
        title_en: 'Short-Form Video Content',
        title_ko: '숏폼 영상 콘텐츠',
        packages: [
            { id: 'sf-starter', name_en: 'Starter (3 Videos)', name_ko: '스타터 (3개 영상)', desc_en: '3 short-form videos, 30s each, basic editing with captions. Perfect for testing short-form content.', desc_ko: '30초 길이의 숏폼 영상 3개, 기본 편집 및 자막 포함. 숏폼 콘텐츠 테스트에 최적.', price: 59, featured: false, features_en: ['3 Short-Form Videos', '30-Second Duration', 'Basic Editing & Captions', 'TikTok / Reels / Shorts Ready', '1 Revision Round'], features_ko: ['숏폼 영상 3개 제작', '30초 길이', '기본 편집 및 자막', '틱톡 / 릴스 / 쇼츠 최적화', '1회 수정 제공'] },
            { id: 'sf-growth', name_en: 'Growth (10 Videos)', name_ko: '그로스 (10개 영상)', desc_en: '10 short-form videos, 45s each, advanced editing with motion graphics and trending audio sync.', desc_ko: '45초 길이의 숏폼 영상 10개, 모션 그래픽과 트렌드 오디오 싱크를 포함한 고급 편집.', price: 149, featured: true, features_en: ['10 Short-Form Videos', '45-Second Duration', 'Motion Graphics & Effects', 'Trending Audio Sync', 'Caption Styling', '2 Revision Rounds'], features_ko: ['숏폼 영상 10개 제작', '45초 길이', '모션 그래픽 및 효과', '트렌드 오디오 싱크', '스타일 자막', '2회 수정 제공'] },
            { id: 'sf-scale', name_en: 'Scale (20 Videos)', name_ko: '스케일 (20개 영상)', desc_en: '20 short-form videos, 60s each, full production with strategy consulting, A/B testing, and performance analytics.', desc_ko: '60초 길이의 숏폼 영상 20개, 전략 컨설팅, A/B 테스트 및 성과 분석을 포함한 풀 프로덕션.', price: 219, featured: false, features_en: ['20 Short-Form Videos', '60-Second Duration', 'Full Production Suite', 'Content Strategy Consulting', 'A/B Testing Variants', 'Performance Analytics Report', 'Unlimited Revisions'], features_ko: ['숏폼 영상 20개 제작', '60초 길이', '풀 프로덕션 제작', '콘텐츠 전략 컨설팅', 'A/B 테스트 변형', '성과 분석 리포트', '무제한 수정'] }
        ]
    }
};

// Translation Dictionary
const translations = {
    en: {
        "logo-subtitle": "SHORT-FORM VIDEO",
        "nav-home": "Home",
        "nav-shortform": "Video Packages",
        "btn-orders": "My Orders",
        "hero-badge": "AI-Powered Video Content",
        "hero-title": "BibleForAI - CLIPBOOST!",
        "hero-desc": "AI-powered short-form video content for TikTok, Instagram Reels & YouTube Shorts. Boost engagement with professional vertical videos.",
        "btn-explore": "Explore Packages",
        "btn-compliance": "How It Works",
        
        "stat-videos": "Videos Delivered",
        "stat-platforms": "Platforms",
        "stat-satisfaction": "Satisfaction",
        "stat-delivery": "Delivery Time",
        
        "sec-channels-title": "Choose Your Video Package",
        "sec-channels-subtitle": "Professional short-form videos optimized for TikTok, Instagram Reels, and YouTube Shorts. Grow your brand with scroll-stopping content.",
        "card-shortform-title": "Short-Form Video Content",
        "card-shortform-desc": "High-conversion short-form videos designed for social media algorithms. From basic edits to full production suites with strategy consulting.",
        "card-view-pricing": "View Pricing",
        
        "comp-title": "AI-Enhanced Video Production",
        "comp-desc": "Our AI-powered production pipeline combines trend analysis, automated captioning, and smart editing to create videos that stop the scroll and drive engagement across all short-form platforms.",
        "comp-bullet1-bold": "Multi-Platform Ready:",
        "comp-bullet1-text": "Videos optimized for TikTok, Instagram Reels, and YouTube Shorts simultaneously.",
        "comp-bullet2-bold": "Trend-Aligned Content:",
        "comp-bullet2-text": "AI trend analysis ensures your content matches current viral patterns and audio trends.",
        "comp-bullet3-bold": "Performance Tracking:",
        "comp-bullet3-text": "Built-in analytics help you understand what content drives the most engagement.",
        
        "view-shortform-sub": "Professional short-form video production for social media growth. Select your package and get scroll-stopping content delivered fast.",
        "view-orders-title": "My Purchase History",
        "view-orders-sub": "Review your successful orders. Your data is stored locally in your browser workspace.",
        
        "th-date": "Order Date",
        "th-order-id": "Transaction ID",
        "th-product": "Product",
        "th-tier": "Package Tier",
        "th-platform": "Target Platform",
        "th-qty": "Quantity",
        "th-total": "Total Paid",
        "th-status": "Status",
        
        "no-orders-msg": "No purchase records found. Make your first order to see history here!",
        
        "modal-title": "Configure Order",
        "modal-desc": "Choose your target platform and complete secure PayPal payment.",
        "modal-base-pkg": "Base Package:",
        "modal-base-price-label": "Base Price:",
        "modal-email-label": "Email Address *",
        "modal-email-placeholder": "name@example.com",
        "modal-email-error": "Please enter a valid email address.",
        "modal-platform-label": "Target Platform:",
        "modal-qty": "Quantity:",
        "modal-total-amt": "Total Amount:",
        "modal-test-btn": "Click price to test checkout",
        
        "badge-ssl": "SSL Secured Checkout",
        "badge-paypal": "PayPal Verified",
        
        "foot-channels": "Video Packages",
        "foot-legal": "Production Quality",
        "foot-gdpr": "AI-Enhanced Editing",
        "foot-canspam": "Multi-Platform Ready",
        "foot-match": "Trend-Aligned Content",
        "foot-contact": "Contact support: snsherocom@gmail.com",
        "foot-copy": "&copy; 2026 BibleForAI CLIPBOOST. All rights reserved. AI-powered short-form video content.",
        
        "order-button": "Order Package",
        "featured-badge": "Best Seller",
        
        // Receipts
        "receipt-header": "BIBLEFORAI - CLIPBOOST RECEIPT",
        "receipt-date": "Order Date",
        "receipt-txid": "Transaction ID",
        "receipt-email": "Customer Email",
        "receipt-type": "Product Type",
        "receipt-size": "Package Size",
        "receipt-platform": "Target Platform",
        "receipt-qty": "Quantity",
        "receipt-baseprice": "Base Price",
        "receipt-total": "Total Paid",
        "receipt-status": "Status",
        "receipt-method": "Payment Method",
        "receipt-method-val": "PayPal Secure Checkout"
    },
    ko: {
        "logo-subtitle": "숏폼 영상",
        "nav-home": "홈",
        "nav-shortform": "영상 패키지",
        "btn-orders": "내 주문 내역",
        "hero-badge": "AI 기반 영상 콘텐츠",
        "hero-title": "BibleForAI - CLIPBOOST!",
        "hero-desc": "틱톡, 인스타그램 릴스, 유튜브 쇼츠를 위한 AI 기반 숏폼 영상 콘텐츠. 전문적인 세로형 영상으로 참여도를 높이세요.",
        "btn-explore": "패키지 둘러보기",
        "btn-compliance": "제작 과정",
        
        "stat-videos": "제작 영상",
        "stat-platforms": "지원 플랫폼",
        "stat-satisfaction": "고객 만족도",
        "stat-delivery": "제작 기간",
        
        "sec-channels-title": "영상 패키지 선택하기",
        "sec-channels-subtitle": "틱톡, 인스타그램 릴스, 유튜브 쇼츠에 최적화된 전문 숏폼 영상. 스크롤을 멈추게 하는 콘텐츠로 브랜드를 성장시키세요.",
        "card-shortform-title": "숏폼 영상 콘텐츠",
        "card-shortform-desc": "소셜 미디어 알고리즘에 최적화된 고전환율 숏폼 영상. 기본 편집부터 전략 컨설팅이 포함된 풀 프로덕션까지.",
        "card-view-pricing": "가격 확인하기",
        
        "comp-title": "AI 기반 영상 제작",
        "comp-desc": "당사의 AI 기반 제작 파이프라인은 트렌드 분석, 자동 자막 생성, 스마트 편집을 결합하여 모든 숏폼 플랫폼에서 스크롤을 멈추고 참여를 유도하는 영상을 제작합니다.",
        "comp-bullet1-bold": "멀티 플랫폼 최적화:",
        "comp-bullet1-text": "틱톡, 인스타그램 릴스, 유튜브 쇼츠에 동시에 최적화된 영상.",
        "comp-bullet2-bold": "트렌드 반영 콘텐츠:",
        "comp-bullet2-text": "AI 트렌드 분석으로 현재 바이럴 패턴과 오디오 트렌드에 맞춘 콘텐츠 제작.",
        "comp-bullet3-bold": "성과 추적:",
        "comp-bullet3-text": "내장된 분석 도구로 어떤 콘텐츠가 가장 높은 참여도를 이끌어내는지 파악.",
        
        "view-shortform-sub": "소셜 미디어 성장을 위한 전문 숏폼 영상 제작. 패키지를 선택하고 스크롤을 멈추는 콘텐츠를 빠르게 받아보세요.",
        "view-orders-title": "내 구매 히스토리",
        "view-orders-sub": "성공한 주문 내역을 검토하세요. 데이터는 브라우저 로컬스토리지에 안전하게 보관됩니다.",
        
        "th-date": "주문 날짜",
        "th-order-id": "트랜잭션 ID",
        "th-product": "상품명",
        "th-tier": "패키지 등급",
        "th-platform": "대상 플랫폼",
        "th-qty": "수량",
        "th-total": "총 결제금액",
        "th-status": "상태",
        
        "no-orders-msg": "구매 기록이 없습니다. 첫 주문을 완료하시면 내역이 여기에 표시됩니다!",
        
        "modal-title": "주문 설정",
        "modal-desc": "대상 플랫폼을 선택하고 안전한 PayPal 결제를 진행하세요.",
        "modal-base-pkg": "기본 패키지:",
        "modal-base-price-label": "기본 가격:",
        "modal-email-label": "이메일 주소 *",
        "modal-email-placeholder": "name@example.com",
        "modal-email-error": "올바른 이메일 주소를 입력해주세요.",
        "modal-platform-label": "대상 플랫폼:",
        "modal-qty": "수량:",
        "modal-total-amt": "총 결제금액:",
        "modal-test-btn": "가격 텍스트를 눌러 테스트 결제",
        
        "badge-ssl": "SSL 보안 결제 지원",
        "badge-paypal": "PayPal 인증됨",
        
        "foot-channels": "영상 패키지",
        "foot-legal": "제작 품질",
        "foot-gdpr": "AI 고급 편집",
        "foot-canspam": "멀티 플랫폼 지원",
        "foot-match": "트렌드 최적화",
        "foot-contact": "문의 지원: snsherocom@gmail.com",
        "foot-copy": "&copy; 2026 BibleForAI CLIPBOOST. All rights reserved. AI 기반 숏폼 영상 콘텐츠.",
        
        "order-button": "패키지 주문하기",
        "featured-badge": "베스트 셀러",
        
        // Receipts
        "receipt-header": "BIBLEFORAI - CLIPBOOST 영수증",
        "receipt-date": "주문 날짜",
        "receipt-txid": "거래 ID",
        "receipt-email": "고객 이메일",
        "receipt-type": "상품 종류",
        "receipt-size": "패키지 크기",
        "receipt-platform": "대상 플랫폼",
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
    document.title = isKo ? "BibleForAI - CLIPBOOST | AI 숏폼 영상 콘텐츠 제작" : "BibleForAI - CLIPBOOST | AI Short-Form Video Content";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.content = isKo ? 
            "틱톡, 인스타그램 릴스, 유튜브 쇼츠를 위한 AI 기반 전문 숏폼 영상 콘텐츠 제작 서비스. 트렌드에 최적화된 영상으로 브랜드를 성장시키세요." : 
            "AI-powered professional short-form video content for TikTok, Instagram Reels & YouTube Shorts. Trend-optimized videos to grow your brand.";
    }

    // Update Open Graph (OG) and Twitter Metadata tags dynamically
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
        ogTitle.content = isKo ? "BibleForAI - CLIPBOOST | AI 숏폼 영상 콘텐츠" : "BibleForAI - CLIPBOOST | AI Short-Form Video Content";
    }
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
        ogDesc.content = isKo ? 
            "틱톡, 인스타그램 릴스, 유튜브 쇼츠를 위한 AI 기반 전문 숏폼 영상 콘텐츠 제작 서비스." : 
            "AI-powered professional short-form video content for TikTok, Instagram Reels & YouTube Shorts.";
    }
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) {
        twTitle.content = isKo ? "BibleForAI - CLIPBOOST | AI 숏폼 영상 콘텐츠" : "BibleForAI - CLIPBOOST | AI Short-Form Video Content";
    }
    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) {
        twDesc.content = isKo ? 
            "틱톡, 인스타그램 릴스, 유튜브 쇼츠를 위한 AI 기반 전문 숏폼 영상 콘텐츠 제작 서비스." : 
            "AI-powered professional short-form video content for TikTok, Instagram Reels & YouTube Shorts.";
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
        case 'shortform': return 'fa-solid fa-clapperboard';
        default: return 'fa-solid fa-video';
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
            const selectedPlatform = document.getElementById('order-platform').value;
            const finalAmount = (currentPackage.basePrice * orderQuantity).toFixed(2);
            return actions.order.create({
                purchase_units: [{
                    description: `${currentPackage.categoryName} - ${currentPackage.tierName} [Platform: ${selectedPlatform}] (Qty: ${orderQuantity})`,
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
    const orderLogs = JSON.parse(localStorage.getItem('clipboost_orders')) || [];
    const selectedPlatform = document.getElementById('order-platform').value;
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
        platform: selectedPlatform,
        quantity: orderQuantity,
        basePrice: currentPackage.basePrice,
        totalPaid: formatPrice(currentPackage.basePrice * orderQuantity),
        status: 'Completed',
        clientId: clientId,
        secret: secret
    };
    
    orderLogs.unshift(newOrder); // Add to beginning
    localStorage.setItem('clipboost_orders', JSON.stringify(orderLogs));
    
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
${dict["receipt-platform"].padEnd(15)} : ${newOrder.platform}
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
    const orderLogs = JSON.parse(localStorage.getItem('clipboost_orders')) || [];
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
            <td>${order.platform || 'All Platforms'}</td>
            <td>${order.quantity}</td>
            <td><strong>${order.totalPaid}</strong></td>
            <td><span class="status-badge">${isKo ? "완료됨" : order.status}</span></td>
        </tr>
    `).join('');
}

// Expose variables globally to prevent ReferenceErrors in inline HTML scripts/handlers
if (typeof navigate !== 'undefined') { window.navigate = navigate; }
if (typeof currentLang !== 'undefined') { window.currentLang = currentLang; }
