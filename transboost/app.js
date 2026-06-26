// App State
let currentView = 'home';
let currentPackage = null;
let orderQuantity = 1;
let paypalButtonInstance = null;

// Package Catalog with Localized Keys
const packageCatalog = {
    translation: {
        title_en: 'Translation & Localization',
        title_ko: '번역 및 현지화',
        packages: [
            { id: 'trans-starter', name_en: 'Starter (1K Words)', name_ko: '스타터 (1,000단어)', desc_en: 'Basic document translation for personal or small business needs. Up to 1,000 words in 2 languages with 48-hour delivery.', desc_ko: '개인 및 소규모 비즈니스를 위한 기본 문서 번역. 최대 1,000단어, 2개 언어 지원, 48시간 내 전달.', price: 29, featured: false, features_en: ['Up to 1,000 words', '2 language pair', '48-hour delivery', 'Basic proofreading', 'Email support'], features_ko: ['최대 1,000단어', '2개 언어 지원', '48시간 내 전달', '기본 교정 포함', '이메일 지원'] },
            { id: 'trans-growth', name_en: 'Growth (5K Words)', name_ko: '그로스 (5,000단어)', desc_en: 'Professional business translation for growing companies. Up to 5,000 words, 5 languages, certified proofreading, and 24-hour express delivery.', desc_ko: '성장하는 기업을 위한 전문 비즈니스 번역. 최대 5,000단어, 5개 언어, 인증된 교정, 24시간 익스프레스 전달.', price: 79, featured: true, features_en: ['Up to 5,000 words', '5 language pairs', '24-hour express delivery', 'Certified proofreading', 'Priority support'], features_ko: ['최대 5,000단어', '5개 언어 지원', '24시간 익스프레스 전달', '인증된 전문 교정', '우선 고객 지원'] },
            { id: 'trans-enterprise', name_en: 'Enterprise (20K Words)', name_ko: '엔터프라이즈 (20,000단어)', desc_en: 'Full localization suite for enterprises. Up to 20,000 words, unlimited languages, cultural adaptation, SEO localization, and dedicated project manager.', desc_ko: '기업을 위한 풀 현지화 서비스. 최대 20,000단어, 무제한 언어, 문화적 각색, SEO 현지화, 전담 프로젝트 매니저.', price: 199, featured: false, features_en: ['Up to 20,000 words', 'Unlimited languages', 'Cultural adaptation', 'SEO localization', 'Dedicated PM'], features_ko: ['최대 20,000단어', '무제한 언어 지원', '문화적 각색 포함', 'SEO 현지화', '전담 PM 배정'] },
            { id: 'trans-ultimate', name_en: 'Ultimate (50K Words)', name_ko: '얼티밋 (50,000단어)', desc_en: 'Global enterprise suite with 50,000+ words, unlimited languages, full cultural adaptation, SEO & ASO localization, API access, and dedicated linguist team.', desc_ko: '50,000단어 이상, 무제한 언어, 완전한 문화적 각색, SEO 및 ASO 현지화, API 접근, 전담 언어학자 팀이 포함된 글로벌 기업용 스위트.', price: 499, featured: false, features_en: ['50,000+ words', 'Unlimited languages', 'Full cultural adaptation', 'SEO + ASO localization', 'API access & linguist team'], features_ko: ['50,000단어 이상', '무제한 언어 지원', '완전한 문화적 각색', 'SEO + ASO 현지화', 'API 접근 및 언어학자 팀'] }
        ]
    }
};

// Translation Dictionary
const translations = {
    en: {
        "logo-subtitle": "TRANSBOOST",
        "nav-home": "Home",
        "nav-translation": "Packages",
        "btn-orders": "My Orders",
        "hero-badge": "AI-Powered Translation",
        "hero-title": "BibleForAI - TRANSBOOST!",
        "hero-desc": "Professional AI-powered translation and global localization for your business. Reach every market in any language.",
        "btn-explore": "Explore Packages",
        "btn-compliance": "How It Works",
        
        "stat-words": "Words Translated",
        "stat-languages": "Languages Supported",
        "stat-accuracy": "Translation Accuracy",
        "stat-delivery": "Express Delivery",
        
        "sec-channels-title": "Choose Your Translation Package",
        "sec-channels-subtitle": "From basic document translation to full enterprise localization suites. AI-powered accuracy with human expert review.",
        "card-translation-title": "Translation & Localization",
        "card-translation-desc": "Professional translation services covering documents, websites, apps, marketing materials, and technical content. AI-powered with certified human proofreading.",
        "card-view-pricing": "View Pricing",
        
        "comp-title": "AI + Expert Human Review",
        "comp-desc": "Our translation pipeline combines cutting-edge AI language models with certified human linguists to deliver accurate, culturally adapted translations that resonate with your target audience.",
        "comp-bullet1-bold": "AI Translation Engine:",
        "comp-bullet1-text": "Powered by state-of-the-art neural machine translation for speed and consistency.",
        "comp-bullet2-bold": "Human Expert Review:",
        "comp-bullet2-text": "Every translation is reviewed by native-speaking certified linguists.",
        "comp-bullet3-bold": "Cultural Adaptation:",
        "comp-bullet3-text": "Content is adapted for local cultural context, idioms, and market expectations.",
        
        "view-translation-sub": "Select a package and get your content translated by our AI-powered system with expert human review. Fast, accurate, and culturally adapted.",
        "view-orders-title": "My Purchase History",
        "view-orders-sub": "Review your successful orders. Your data is stored locally in your browser workspace.",
        
        "th-date": "Order Date",
        "th-order-id": "Transaction ID",
        "th-product": "Product",
        "th-tier": "Package Tier",
        "th-language": "Target Language",
        "th-qty": "Quantity",
        "th-total": "Total Paid",
        "th-status": "Status",
        
        "no-orders-msg": "No purchase records found. Make your first order to see history here!",
        
        "modal-title": "Configure Order",
        "modal-desc": "Select your target language and complete secure PayPal payment.",
        "modal-base-pkg": "Base Package:",
        "modal-base-price-label": "Base Price:",
        "modal-email-label": "Email Address *",
        "modal-email-placeholder": "name@example.com",
        "modal-email-error": "Please enter a valid email address.",
        "modal-language-label": "Target Language:",
        "modal-qty": "Quantity:",
        "modal-total-amt": "Total Amount:",
        "modal-test-btn": "Run Sandbox Test Checkout",
        
        "badge-ssl": "SSL Secured Checkout",
        "badge-paypal": "PayPal Verified",
        
        "foot-channels": "Packages",
        "foot-legal": "Quality Assurance",
        "foot-gdpr": "AI-Powered Translation",
        "foot-canspam": "Human Expert Review",
        "foot-match": "Cultural Adaptation",
        "foot-contact": "Contact support: snsherocom@gmail.com",
        "foot-copy": "&copy; 2026 BibleForAI TRANSBOOST. All rights reserved. AI-powered translation and localization services.",
        
        "order-button": "Order Package",
        "featured-badge": "Best Seller",
        
        // Receipts
        "receipt-header": "BIBLEFORAI - TRANSBOOST RECEIPT",
        "receipt-date": "Order Date",
        "receipt-txid": "Transaction ID",
        "receipt-email": "Customer Email",
        "receipt-type": "Product Type",
        "receipt-size": "Package Size",
        "receipt-language": "Target Language",
        "receipt-qty": "Quantity",
        "receipt-baseprice": "Base Price",
        "receipt-total": "Total Paid",
        "receipt-status": "Status",
        "receipt-method": "Payment Method",
        "receipt-method-val": "PayPal Secure Checkout"
    },
    ko: {
        "logo-subtitle": "TRANSBOOST",
        "nav-home": "홈",
        "nav-translation": "패키지",
        "btn-orders": "내 주문 내역",
        "hero-badge": "AI 기반 번역 서비스",
        "hero-title": "BibleForAI - TRANSBOOST!",
        "hero-desc": "비즈니스를 위한 전문 AI 기반 번역 및 글로벌 현지화. 모든 언어로 모든 시장에 도달하세요.",
        "btn-explore": "패키지 둘러보기",
        "btn-compliance": "서비스 소개",
        
        "stat-words": "번역 단어 수",
        "stat-languages": "지원 언어",
        "stat-accuracy": "번역 정확도",
        "stat-delivery": "익스프레스 전달",
        
        "sec-channels-title": "번역 패키지 선택하기",
        "sec-channels-subtitle": "기본 문서 번역부터 기업용 풀 현지화 스위트까지. AI 정확도와 전문가 검토가 결합된 서비스.",
        "card-translation-title": "번역 및 현지화",
        "card-translation-desc": "문서, 웹사이트, 앱, 마케팅 자료, 기술 콘텐츠를 아우르는 전문 번역 서비스. AI 기반 번역과 인증된 전문가 교정이 함께합니다.",
        "card-view-pricing": "가격 확인하기",
        
        "comp-title": "AI + 전문가 검토 시스템",
        "comp-desc": "당사의 번역 파이프라인은 최첨단 AI 언어 모델과 인증된 언어학자를 결합하여 타겟 고객에게 진정으로 와닿는 정확하고 문화적으로 각색된 번역을 제공합니다.",
        "comp-bullet1-bold": "AI 번역 엔진:",
        "comp-bullet1-text": "최신 신경망 기계 번역 기술로 속도와 일관성을 보장합니다.",
        "comp-bullet2-bold": "전문가 검토:",
        "comp-bullet2-text": "모든 번역은 원어민 인증 언어학자가 직접 검토합니다.",
        "comp-bullet3-bold": "문화적 각색:",
        "comp-bullet3-text": "현지 문화적 맥락, 관용구, 시장 기대치에 맞게 콘텐츠를 각색합니다.",
        
        "view-translation-sub": "패키지를 선택하고 AI 기반 번역 시스템과 전문가 검토를 통해 콘텐츠를 번역받으세요. 빠르고 정확하며 문화적으로 각색됩니다.",
        "view-orders-title": "내 구매 히스토리",
        "view-orders-sub": "성공한 주문 내역을 검토하세요. 데이터는 브라우저 로컬스토리지에 안전하게 보관됩니다.",
        
        "th-date": "주문 날짜",
        "th-order-id": "트랜잭션 ID",
        "th-product": "상품명",
        "th-tier": "패키지 등급",
        "th-language": "대상 언어",
        "th-qty": "수량",
        "th-total": "총 결제금액",
        "th-status": "상태",
        
        "no-orders-msg": "구매 기록이 없습니다. 첫 주문을 완료하시면 내역이 여기에 표시됩니다!",
        
        "modal-title": "주문 설정",
        "modal-desc": "대상 언어를 선택하고 안전한 PayPal 결제를 진행하세요.",
        "modal-base-pkg": "기본 패키지:",
        "modal-base-price-label": "기본 가격:",
        "modal-email-label": "이메일 주소 *",
        "modal-email-placeholder": "name@example.com",
        "modal-email-error": "올바른 이메일 주소를 입력해주세요.",
        "modal-language-label": "대상 언어:",
        "modal-qty": "수량:",
        "modal-total-amt": "총 결제금액:",
        "modal-test-btn": "샌드박스 테스트 결제 진행",
        
        "badge-ssl": "SSL 보안 결제 지원",
        "badge-paypal": "PayPal 인증됨",
        
        "foot-channels": "패키지",
        "foot-legal": "품질 보증",
        "foot-gdpr": "AI 기반 번역",
        "foot-canspam": "전문가 검토",
        "foot-match": "문화적 각색",
        "foot-contact": "문의 지원: snsherocom@gmail.com",
        "foot-copy": "&copy; 2026 BibleForAI TRANSBOOST. All rights reserved. AI 기반 번역 및 현지화 서비스.",
        
        "order-button": "패키지 주문하기",
        "featured-badge": "베스트 셀러",
        
        // Receipts
        "receipt-header": "BIBLEFORAI - TRANSBOOST 영수증",
        "receipt-date": "주문 날짜",
        "receipt-txid": "거래 ID",
        "receipt-email": "고객 이메일",
        "receipt-type": "상품 종류",
        "receipt-size": "패키지 크기",
        "receipt-language": "대상 언어",
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
    document.title = isKo ? "BibleForAI - TRANSBOOST | AI 번역 및 글로벌 현지화" : "BibleForAI - TRANSBOOST | AI Translation & Global Localization";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.content = isKo ? 
            "비즈니스를 위한 전문 AI 기반 번역 및 글로벌 현지화 서비스. 모든 언어로 모든 시장에 도달하세요. AI 정확도와 전문가 검토가 결합된 번역." : 
            "Professional AI-powered translation and global localization services for your business. Reach every market in any language with AI accuracy and expert human review.";
    }

    // Update Open Graph (OG) and Twitter Metadata tags dynamically
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
        ogTitle.content = isKo ? "BibleForAI - TRANSBOOST | AI 번역 및 글로벌 현지화" : "BibleForAI - TRANSBOOST | AI Translation & Global Localization";
    }
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
        ogDesc.content = isKo ? 
            "비즈니스를 위한 전문 AI 기반 번역 및 글로벌 현지화 서비스. 모든 언어로 모든 시장에 도달하세요." : 
            "Professional AI-powered translation and global localization services for your business. Reach every market in any language.";
    }
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) {
        twTitle.content = isKo ? "BibleForAI - TRANSBOOST | AI 번역 및 글로벌 현지화" : "BibleForAI - TRANSBOOST | AI Translation & Global Localization";
    }
    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) {
        twDesc.content = isKo ? 
            "비즈니스를 위한 전문 AI 기반 번역 및 글로벌 현지화 서비스. 모든 언어로 모든 시장에 도달하세요." : 
            "Professional AI-powered translation and global localization services for your business. Reach every market in any language.";
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
            const featuredBadge = translations[currentLang]['featured-badge'] || 'Best Seller';
            
            return `
                <div class="package-card ${featuredClass}">
                    ${pkg.featured ? `<div class="featured-ribbon">${featuredBadge}</div>` : ''}
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
        case 'translation': return 'fa-solid fa-language';
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
    
    // Auto-scroll to show PayPal button
    setTimeout(() => {
        const modalCard = document.querySelector('.modal-card');
        const totalBox = document.querySelector('.total-price-box');
        if (modalCard && totalBox) {
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

// Sandbox Test Checkout Trigger
function triggerTestCheckout() {
    // Developer sandbox: auto-fill mock email if field is empty
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
            const selectedLanguage = document.getElementById('order-language').value;
            const finalAmount = (currentPackage.basePrice * orderQuantity).toFixed(2);
            return actions.order.create({
                purchase_units: [{
                    description: `${currentPackage.categoryName} - ${currentPackage.tierName} [Language: ${selectedLanguage}] (Qty: ${orderQuantity})`,
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
    const orderLogs = JSON.parse(localStorage.getItem('transboost_orders')) || [];
    const selectedLanguage = document.getElementById('order-language').value;
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
        language: selectedLanguage,
        quantity: orderQuantity,
        basePrice: currentPackage.basePrice,
        totalPaid: formatPrice(currentPackage.basePrice * orderQuantity),
        status: 'Completed',
        clientId: clientId,
        secret: secret
    };
    
    orderLogs.unshift(newOrder); // Add to beginning
    localStorage.setItem('transboost_orders', JSON.stringify(orderLogs));
    
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
${dict["receipt-language"].padEnd(15)} : ${newOrder.language}
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
    const orderLogs = JSON.parse(localStorage.getItem('transboost_orders')) || [];
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
            <td>${order.language || 'Global'}</td>
            <td>${order.quantity}</td>
            <td><strong>${order.totalPaid}</strong></td>
            <td><span class="status-badge">${isKo ? "완료됨" : order.status}</span></td>
        </tr>
    `).join('');
}
