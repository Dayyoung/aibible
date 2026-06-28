// App State
let currentView = 'home';
let currentPackage = null;
let orderQuantity = 1;
let paypalButtonInstance = null;

// Package Catalog with Localized Keys
const packageCatalog = {
    email: {
        title_en: 'Email Marketing & Newsletter',
        title_ko: '이메일 마케팅 & 뉴스레터',
        packages: [
            { id: 'mail-starter', name_en: 'Starter — Single Campaign', name_ko: '스타터 — 단일 캠페인', desc_en: 'Professional responsive newsletter template + one-time send with tracking.', desc_ko: '전문 반응형 뉴스레터 템플릿 + 1회 발송 및 트래킹.', price: 49, featured: false, features_en: ['Responsive HTML Template', 'One Campaign Send', 'Basic Open Tracking', 'Email Support'], features_ko: ['반응형 HTML 템플릿', '1회 캠페인 발송', '기본 오픈 추적', '이메일 지원'] },
            { id: 'mail-growth', name_en: 'Growth — Full Automation', name_ko: '그로스 — 풀 자동화', desc_en: 'Complete email marketing setup with automation workflows, SPF/DKIM, and analytics.', desc_ko: '자동화 워크플로우, SPF/DKIM 설정, 분석이 포함된 완벽한 이메일 마케팅 셋업.', price: 126, featured: true, features_en: ['3 Responsive Templates', 'Automation Workflows', 'SPF/DKIM/DMARC Setup', 'A/B Testing', 'Advanced Analytics Dashboard', 'Priority Support'], features_ko: ['반응형 템플릿 3종', '자동화 워크플로우', 'SPF/DKIM/DMARC 설정', 'A/B 테스트', '고급 분석 대시보드', '우선 고객 지원'] },
            { id: 'mail-enterprise', name_en: 'Enterprise — Custom Integration', name_ko: '엔터프라이즈 — 커스텀 통합', desc_en: 'Tailored enterprise email solution with CRM integration, dedicated IP warmup, and custom API.', desc_ko: 'CRM 연동, 전용 IP 웜업, 커스텀 API가 포함된 기업 맞춤형 이메일 솔루션.', price: 249, featured: false, features_en: ['Unlimited Templates', 'CRM/API Integration', 'Dedicated IP Warmup', 'Custom Automation Flows', 'Real-time Analytics', 'Dedicated Account Manager'], features_ko: ['무제한 템플릿', 'CRM/API 연동', '전용 IP 웜업', '맞춤 자동화 플로우', '실시간 분석', '전담 어카운트 매니저'] }
        ]
    }
};

// Translation Dictionary
const translations = {
    en: {
        "logo-subtitle": "MAILBOOST",
        "nav-home": "Home",
        "nav-pricing": "Pricing",
        "btn-orders": "My Orders",
        "hero-badge": "Email Marketing Automation",
        "hero-title": "MAILBOOST — Email Marketing",
        "hero-desc": "Professional email campaigns, newsletters & automation. Boost engagement with AI-powered email solutions.",
        "btn-explore": "View Packages",
        "btn-compliance": "Learn About Deliverability",
        
        "stat-templates": "Templates Built",
        "stat-deliverability": "Deliverability",
        "stat-automation": "Automation Rate",
        "stat-delivery": "Setup Time",
        
        "sec-channels-title": "Complete Email Marketing Solutions",
        "sec-channels-subtitle": "From responsive newsletter design to full automation workflows — everything you need for professional email campaigns.",
        "card-newsletter-title": "Newsletter Design",
        "card-newsletter-desc": "Beautiful, responsive HTML email templates optimized for all devices and email clients. Custom branding included.",
        "card-automation-title": "Automation Workflows",
        "card-automation-desc": "Set up drip campaigns, welcome sequences, and behavioral triggers that run on autopilot 24/7.",
        "card-analytics-title": "Performance Analytics",
        "card-analytics-desc": "Track opens, clicks, conversions, and ROI with real-time dashboards and detailed campaign reports.",
        "card-deliverability-title": "Deliverability Setup",
        "card-deliverability-desc": "SPF, DKIM, DMARC authentication setup to ensure your emails land in inboxes — not spam folders.",
        "card-view-pricing": "View Pricing",
        
        "comp-title": "Email Deliverability & Best Practices",
        "comp-desc": "Our email marketing system follows global best practices with proper authentication protocols, list hygiene, and compliance with CAN-SPAM and GDPR regulations.",
        "comp-bullet1-bold": "SPF/DKIM/DMARC:",
        "comp-bullet1-text": "Full email authentication setup to maximize inbox placement and domain reputation.",
        "comp-bullet2-bold": "CAN-SPAM & GDPR:",
        "comp-bullet2-text": "All campaigns include unsubscribe links and comply with global privacy regulations.",
        "comp-bullet3-bold": "List Hygiene:",
        "comp-bullet3-text": "Automatic bounce handling, spam trap detection, and inactive subscriber cleaning.",
        
        "view-email-sub": "Choose the perfect email marketing package for your business. All plans include responsive templates and deliverability setup.",
        "view-orders-title": "My Purchase History",
        "view-orders-sub": "Review your successful orders. Your data is stored locally in your browser workspace.",
        
        "th-date": "Order Date",
        "th-order-id": "Transaction ID",
        "th-product": "Product",
        "th-tier": "Package Tier",
        "th-industry": "Industry / Niche",
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
        "modal-industry-label": "Industry / Niche:",
        "modal-qty": "Quantity:",
        "modal-total-amt": "Total Amount:",
        "modal-test-btn": "Click price to test checkout",
        
        "badge-ssl": "SSL Secured Checkout",
        "badge-paypal": "PayPal Verified",
        
        "foot-channels": "Services",
        "foot-legal": "Compliance",
        "foot-gdpr": "GDPR Compliant",
        "foot-canspam": "CAN-SPAM Verified",
        "foot-match": "99.9% Uptime",
        "foot-contact": "Contact support: snsherocom@gmail.com",
        "foot-copy": "&copy; 2026 BibleForAI MAILBOOST. All rights reserved. Email marketing & automation.",
        
        "order-button": "Order Package",
        "featured-badge": "Best Seller",
        
        // Receipts
        "receipt-header": "BIBLEFORAI - MAILBOOST RECEIPT",
        "receipt-date": "Order Date",
        "receipt-txid": "Transaction ID",
        "receipt-email": "Customer Email",
        "receipt-type": "Product Type",
        "receipt-size": "Package Size",
        "receipt-industry": "Industry/Niche",
        "receipt-qty": "Quantity",
        "receipt-baseprice": "Base Price",
        "receipt-total": "Total Paid",
        "receipt-status": "Status",
        "receipt-method": "Payment Method",
        "receipt-method-val": "PayPal Secure Checkout"
    },
    ko: {
        "logo-subtitle": "메일부스트",
        "nav-home": "홈",
        "nav-pricing": "가격",
        "btn-orders": "내 주문 내역",
        "hero-badge": "이메일 마케팅 자동화",
        "hero-title": "메일부스트 — 이메일 마케팅",
        "hero-desc": "전문 이메일 캠페인, 뉴스레터 및 자동화. AI 기반 이메일 솔루션으로 고객 참여를 높이세요.",
        "btn-explore": "패키지 보기",
        "btn-compliance": "전달률 최적화 알아보기",
        
        "stat-templates": "제작 템플릿",
        "stat-deliverability": "이메일 도달률",
        "stat-automation": "자동화 비율",
        "stat-delivery": "설치 소요 시간",
        
        "sec-channels-title": "완벽한 이메일 마케팅 솔루션",
        "sec-channels-subtitle": "반응형 뉴스레터 디자인부터 완전 자동화 워크플로우까지 — 전문 이메일 캠페인에 필요한 모든 것.",
        "card-newsletter-title": "뉴스레터 디자인",
        "card-newsletter-desc": "모든 디바이스와 이메일 클라이언트에 최적화된 아름답고 반응형인 HTML 이메일 템플릿. 브랜딩 커스터마이징 포함.",
        "card-automation-title": "자동화 워크플로우",
        "card-automation-desc": "드립 캠페인, 웰컴 시퀀스, 행동 기반 트리거를 24/7 자동으로 실행하는 시스템을 구축하세요.",
        "card-analytics-title": "성과 분석",
        "card-analytics-desc": "실시간 대시보드와 상세 캠페인 리포트로 오픈율, 클릭률, 전환율, ROI를 추적하세요.",
        "card-deliverability-title": "전달률 최적화",
        "card-deliverability-desc": "SPF, DKIM, DMARC 인증 설정으로 이메일이 스팸함이 아닌 받은편지함에 도착하도록 보장합니다.",
        "card-view-pricing": "가격 확인하기",
        
        "comp-title": "이메일 전달률 & 모범 사례",
        "comp-desc": "당사의 이메일 마케팅 시스템은 적절한 인증 프로토콜, 리스트 위생 관리, CAN-SPAM 및 GDPR 규정 준수를 통해 글로벌 모범 사례를 따릅니다.",
        "comp-bullet1-bold": "SPF/DKIM/DMARC:",
        "comp-bullet1-text": "받은편지함 도달률과 도메인 평판을 극대화하는 완벽한 이메일 인증 설정.",
        "comp-bullet2-bold": "CAN-SPAM 및 GDPR:",
        "comp-bullet2-text": "모든 캠페인에 수신거부 링크가 포함되며 글로벌 개인정보 보호 규정을 준수합니다.",
        "comp-bullet3-bold": "리스트 위생 관리:",
        "comp-bullet3-text": "자동 반송 처리, 스팸 트랩 감지, 비활성 구독자 정리 기능.",
        
        "view-email-sub": "비즈니스에 딱 맞는 이메일 마케팅 패키지를 선택하세요. 모든 플랜에 반응형 템플릿과 전달률 설정이 포함됩니다.",
        "view-orders-title": "내 구매 히스토리",
        "view-orders-sub": "성공한 주문 내역을 검토하세요. 데이터는 브라우저 로컬스토리지에 안전하게 보관됩니다.",
        
        "th-date": "주문 날짜",
        "th-order-id": "트랜잭션 ID",
        "th-product": "상품명",
        "th-tier": "패키지 등급",
        "th-industry": "산업/니치",
        "th-qty": "수량",
        "th-total": "총 결제금액",
        "th-status": "상태",
        
        "no-orders-msg": "구매 기록이 없습니다. 첫 주문을 완료하시면 내역이 여기에 표시됩니다!",
        
        "modal-title": "주문 설정",
        "modal-desc": "상세 정보를 설정하고 안전한 PayPal 결제를 진행하세요.",
        "modal-base-pkg": "기본 패키지:",
        "modal-base-price-label": "기본 가격:",
        "modal-email-label": "이메일 주소 *",
        "modal-email-placeholder": "name@example.com",
        "modal-email-error": "올바른 이메일 주소를 입력해주세요.",
        "modal-industry-label": "산업/니치:",
        "modal-qty": "수량:",
        "modal-total-amt": "총 결제금액:",
        "modal-test-btn": "가격 텍스트를 눌러 테스트 결제",
        
        "badge-ssl": "SSL 보안 결제 지원",
        "badge-paypal": "PayPal 인증됨",
        
        "foot-channels": "서비스",
        "foot-legal": "규정 준수",
        "foot-gdpr": "GDPR 규정 준수",
        "foot-canspam": "CAN-SPAM 인증",
        "foot-match": "99.9% 가동률",
        "foot-contact": "문의 지원: snsherocom@gmail.com",
        "foot-copy": "&copy; 2026 BibleForAI MAILBOOST. All rights reserved. 이메일 마케팅 & 자동화.",
        
        "order-button": "패키지 주문하기",
        "featured-badge": "베스트 셀러",
        
        // Receipts
        "receipt-header": "BIBLEFORAI - 메일부스트 영수증",
        "receipt-date": "주문 날짜",
        "receipt-txid": "거래 ID",
        "receipt-email": "고객 이메일",
        "receipt-type": "상품 종류",
        "receipt-size": "패키지 크기",
        "receipt-industry": "산업/니치",
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
    document.title = isKo ? "BibleForAI - 메일부스트 | 이메일 마케팅 & 뉴스레터 자동화" : "BibleForAI - MAILBOOST | Email Marketing & Newsletter Automation";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.content = isKo ? 
            "전문 이메일 마케팅, 뉴스레터 디자인, SPF/DKIM 설정 및 자동화 워크플로우. AI 기반 이메일 솔루션으로 비즈니스 성장을 가속화하세요." : 
            "Professional email marketing, newsletter design, SPF/DKIM setup, and automation workflows. Accelerate your business growth with AI-powered email solutions.";
    }

    // Update Open Graph (OG) and Twitter Metadata tags dynamically
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
        ogTitle.content = isKo ? "BibleForAI - 메일부스트 | 이메일 마케팅 & 뉴스레터" : "BibleForAI - MAILBOOST | Email Marketing & Newsletter";
    }
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
        ogDesc.content = isKo ? 
            "전문 이메일 마케팅, 뉴스레터 디자인, SPF/DKIM 설정 및 자동화 워크플로우. AI 기반 솔루션으로 비즈니스 성장을 가속화하세요." : 
            "Professional email marketing, newsletter design, SPF/DKIM setup, and automation workflows. AI-powered solutions for business growth.";
    }
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) {
        twTitle.content = isKo ? "BibleForAI - 메일부스트 | 이메일 마케팅 & 뉴스레터" : "BibleForAI - MAILBOOST | Email Marketing & Newsletter";
    }
    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) {
        twDesc.content = isKo ? 
            "전문 이메일 마케팅, 뉴스레터 디자인, SPF/DKIM 설정 및 자동화 워크플로우. AI 기반 솔루션으로 비즈니스 성장을 가속화하세요." : 
            "Professional email marketing, newsletter design, SPF/DKIM setup, and automation workflows. AI-powered solutions for business growth.";
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
        case 'email': return 'fa-solid fa-envelope';
        default: return 'fa-solid fa-envelope';
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
            const selectedIndustry = document.getElementById('order-industry').value;
            const finalAmount = (currentPackage.basePrice * orderQuantity).toFixed(2);
            return actions.order.create({
                purchase_units: [{
                    description: `${currentPackage.categoryName} - ${currentPackage.tierName} [Industry: ${selectedIndustry}] (Qty: ${orderQuantity})`,
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
    const orderLogs = JSON.parse(localStorage.getItem('mailboost_orders')) || [];
    const selectedIndustry = document.getElementById('order-industry').value;
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
        industry: selectedIndustry,
        quantity: orderQuantity,
        basePrice: currentPackage.basePrice,
        totalPaid: formatPrice(currentPackage.basePrice * orderQuantity),
        status: 'Completed',
        clientId: clientId,
        secret: secret
    };
    
    orderLogs.unshift(newOrder); // Add to beginning
    localStorage.setItem('mailboost_orders', JSON.stringify(orderLogs));
    
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
${dict["receipt-industry"].padEnd(15)} : ${newOrder.industry}
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
    const orderLogs = JSON.parse(localStorage.getItem('mailboost_orders')) || [];
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
            <td>${order.industry || 'General'}</td>
            <td>${order.quantity}</td>
            <td><strong>${order.totalPaid}</strong></td>
            <td><span class="status-badge">${isKo ? "완료됨" : order.status}</span></td>
        </tr>
    `).join('');
}
