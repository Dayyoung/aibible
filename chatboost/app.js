// App State
let currentView = 'home';
let currentPackage = null;
let orderQuantity = 1;
let paypalButtonInstance = null;

// Package Catalog with Localized Keys
const packageCatalog = {
    chatbot: {
        title_en: 'AI Chatbot & Support Automation',
        title_ko: 'AI 챗봇 & 고객응대 자동화',
        packages: [
            { id: 'cb-starter', name_en: 'Starter (1 Platform)', name_ko: '스타터 (1개 플랫폼)', desc_en: 'Basic AI chatbot setup for 1 platform — Website, WhatsApp, or Messenger. 50 FAQ responses, basic branding, 1-week deployment.', desc_ko: '1개 플랫폼(웹사이트, 왓츠앱 또는 메신저)용 기본 AI 챗봇 구축. 50개 FAQ 응답, 기본 브랜딩, 1주일 배포.', price: 99, featured: false, features_en: ['1 Platform Integration', '50 FAQ Responses', 'Basic Branding', 'Email Ticket Fallback', '1-Week Deployment', '30-Day Support'], features_ko: ['1개 플랫폼 연동', '50개 FAQ 응답', '기본 브랜딩', '이메일 티켓 폴백', '1주일 배포', '30일 지원'] },
            { id: 'cb-growth', name_en: 'Growth (3 Platforms)', name_ko: '그로스 (3개 플랫폼)', desc_en: 'Multi-platform AI chatbot across Website, WhatsApp & Messenger. 150 FAQ responses, analytics dashboard, multilingual support, 2-week deployment.', desc_ko: '웹사이트, 왓츠앱, 메신저 3개 플랫폼 연동 AI 챗봇. 150개 FAQ 응답, 분석 대시보드, 다국어 지원, 2주 배포.', price: 249, featured: true, features_en: ['3 Platform Integration', '150 FAQ Responses', 'Analytics Dashboard', 'Multilingual (EN/KO/JP)', 'Custom Branding', 'Live Chat Handoff', '2-Week Deployment', '60-Day Support'], features_ko: ['3개 플랫폼 연동', '150개 FAQ 응답', '분석 대시보드', '다국어 지원 (한/영/일)', '맞춤형 브랜딩', '실시간 상담 전환', '2주 배포', '60일 지원'] },
            { id: 'cb-scale', name_en: 'Scale (Enterprise)', name_ko: '스케일 (엔터프라이즈)', desc_en: 'Full enterprise AI chatbot suite — unlimited platforms, CRM/API integration, 500+ FAQ, AI training on your docs, custom workflows, dedicated support.', desc_ko: '풀 엔터프라이즈 AI 챗봇 — 무제한 플랫폼, CRM/API 연동, 500+ FAQ, 자사 문서 기반 AI 학습, 맞춤 워크플로우, 전담 지원.', price: 499, featured: false, features_en: ['Unlimited Platforms', 'CRM & API Integration', '500+ FAQ Responses', 'Custom AI Training (Your Docs)', 'Advanced Analytics & Reports', 'Custom Workflow Builder', 'Priority Deployment (1 Week)', 'Dedicated Account Manager', '90-Day Premium Support'], features_ko: ['무제한 플랫폼', 'CRM 및 API 연동', '500+ FAQ 응답', '자사 문서 기반 AI 학습', '고급 분석 및 리포트', '맞춤 워크플로우 빌더', '우선 배포 (1주)', '전담 어카운트 매니저', '90일 프리미엄 지원'] }
        ]
    }
};

// Translation Dictionary
const translations = {
    en: {
        "logo-subtitle": "AI CHATBOT",
        "nav-home": "Home",
        "nav-chatbot": "Chatbot Packages",
        "btn-orders": "My Orders",
        "hero-badge": "AI-Powered Customer Support",
        "hero-title": "BibleForAI - CHATBOOST!",
        "hero-desc": "AI-powered chatbot & customer support automation for your business. Deploy intelligent chatbots across your website, WhatsApp, and Messenger to serve customers 24/7.",
        "btn-explore": "Explore Packages",
        "btn-compliance": "How It Works",
        
        "stat-chatbots": "Chatbots Deployed",
        "stat-platforms": "Supported Platforms",
        "stat-satisfaction": "Customer Satisfaction",
        "stat-delivery": "Deployment Time",
        
        "sec-channels-title": "Choose Your Chatbot Package",
        "sec-channels-subtitle": "Deploy AI-powered chatbots on your website, WhatsApp, and Messenger. Automate customer support, qualify leads, and reduce response time by 90%.",
        "card-chatbot-title": "AI Chatbot & Support Automation",
        "card-chatbot-desc": "Intelligent chatbots that understand your business. From basic FAQ automation to full enterprise suites with CRM integration and custom AI training.",
        "card-view-pricing": "View Pricing",
        
        "comp-title": "AI-Powered Customer Engagement",
        "comp-desc": "Our AI chatbot platform combines natural language understanding, automated ticket routing, and real-time analytics to deliver seamless customer experiences across all your digital channels.",
        "comp-bullet1-bold": "24/7 Availability:",
        "comp-bullet1-text": "Your chatbot serves customers around the clock, handling inquiries, qualifying leads, and booking appointments while you sleep.",
        "comp-bullet2-bold": "Multi-Platform Ready:",
        "comp-bullet2-text": "Deploy once and serve customers on your website, WhatsApp Business, Facebook Messenger, and more — all from a unified dashboard.",
        "comp-bullet3-bold": "AI That Learns:",
        "comp-bullet3-text": "Train the chatbot on your own documents, product catalogs, and support guides so it speaks your brand language fluently.",
        
        "view-chatbot-sub": "Select a chatbot package that fits your business needs. From basic FAQ bots to full enterprise AI suites with custom training and API integration.",
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
        "modal-test-btn": "Run Sandbox Test Checkout",
        
        "badge-ssl": "SSL Secured Checkout",
        "badge-paypal": "PayPal Verified",
        
        "foot-channels": "Chatbot Packages",
        "foot-legal": "Service Quality",
        "foot-gdpr": "24/7 Automated Support",
        "foot-canspam": "Multi-Platform Integration",
        "foot-match": "Custom AI Training",
        "foot-contact": "Contact support: snsherocom@gmail.com",
        "foot-copy": "&copy; 2026 BibleForAI CHATBOOST. All rights reserved. AI-powered chatbot & support automation.",
        
        "order-button": "Order Package",
        "featured-badge": "Best Seller",
        
        // Receipts
        "receipt-header": "BIBLEFORAI - CHATBOOST RECEIPT",
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
        "logo-subtitle": "AI 챗봇",
        "nav-home": "홈",
        "nav-chatbot": "챗봇 패키지",
        "btn-orders": "내 주문 내역",
        "hero-badge": "AI 기반 고객 응대",
        "hero-title": "BibleForAI - CHATBOOST!",
        "hero-desc": "비즈니스를 위한 AI 기반 챗봇 및 고객 응대 자동화 서비스. 웹사이트, 왓츠앱, 메신저에 지능형 챗봇을 배포하여 24시간 고객을 응대하세요.",
        "btn-explore": "패키지 둘러보기",
        "btn-compliance": "작동 방식",
        
        "stat-chatbots": "배포된 챗봇",
        "stat-platforms": "지원 플랫폼",
        "stat-satisfaction": "고객 만족도",
        "stat-delivery": "배포 기간",
        
        "sec-channels-title": "챗봇 패키지 선택하기",
        "sec-channels-subtitle": "AI 기반 챗봇을 웹사이트, 왓츠앱, 메신저에 배포하세요. 고객 응대를 자동화하고, 리드를 선별하며, 응답 시간을 90% 단축합니다.",
        "card-chatbot-title": "AI 챗봇 & 고객응대 자동화",
        "card-chatbot-desc": "비즈니스를 이해하는 지능형 챗봇. 기본 FAQ 자동화부터 CRM 연동 및 맞춤형 AI 학습이 포함된 풀 엔터프라이즈 제품군까지.",
        "card-view-pricing": "가격 확인하기",
        
        "comp-title": "AI 기반 고객 참여",
        "comp-desc": "당사의 AI 챗봇 플랫폼은 자연어 이해, 자동 티켓 라우팅, 실시간 분석을 결합하여 모든 디지털 채널에서 원활한 고객 경험을 제공합니다.",
        "comp-bullet1-bold": "24시간 운영:",
        "comp-bullet1-text": "챗봇이 24시간 내내 고객 문의를 처리하고, 리드를 선별하며, 예약을 접수합니다.",
        "comp-bullet2-bold": "멀티 플랫폼 지원:",
        "comp-bullet2-text": "한 번 구축으로 웹사이트, 왓츠앱 비즈니스, 페이스북 메신저 등에서 통합 대시보드를 통해 고객을 응대합니다.",
        "comp-bullet3-bold": "학습하는 AI:",
        "comp-bullet3-text": "자사 문서, 제품 카탈로그, 지원 가이드를 기반으로 챗봇을 학습시켜 브랜드 언어를 유창하게 구사하도록 합니다.",
        
        "view-chatbot-sub": "비즈니스에 맞는 챗봇 패키지를 선택하세요. 기본 FAQ 봇부터 맞춤형 학습과 API 연동을 갖춘 풀 엔터프라이즈 AI 제품군까지.",
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
        "modal-test-btn": "샌드박스 테스트 결제 진행",
        
        "badge-ssl": "SSL 보안 결제 지원",
        "badge-paypal": "PayPal 인증됨",
        
        "foot-channels": "챗봇 패키지",
        "foot-legal": "서비스 품질",
        "foot-gdpr": "24시간 자동 응대",
        "foot-canspam": "멀티 플랫폼 연동",
        "foot-match": "맞춤형 AI 학습",
        "foot-contact": "문의 지원: snsherocom@gmail.com",
        "foot-copy": "&copy; 2026 BibleForAI CHATBOOST. All rights reserved. AI 기반 챗봇 및 고객응대 자동화.",
        
        "order-button": "패키지 주문하기",
        "featured-badge": "베스트 셀러",
        
        // Receipts
        "receipt-header": "BIBLEFORAI - CHATBOOST 영수증",
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
    document.title = isKo ? "BibleForAI - CHATBOOST | AI 챗봇 & 고객응대 자동화" : "BibleForAI - CHATBOOST | AI Chatbot & Support Automation";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.content = isKo ? 
            "비즈니스를 위한 AI 기반 챗봇 및 고객 응대 자동화 서비스. 웹사이트, 왓츠앱, 메신저에 지능형 챗봇을 배포하여 24시간 고객을 응대하세요." : 
            "AI-powered chatbot & customer support automation for your business. Deploy intelligent chatbots across your website, WhatsApp, and Messenger to serve customers 24/7.";
    }

    // Update Open Graph (OG) and Twitter Metadata tags dynamically
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
        ogTitle.content = isKo ? "BibleForAI - CHATBOOST | AI 챗봇 & 고객응대 자동화" : "BibleForAI - CHATBOOST | AI Chatbot & Support Automation";
    }
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
        ogDesc.content = isKo ? 
            "비즈니스를 위한 AI 기반 챗봇 및 고객 응대 자동화 서비스. 웹사이트, 왓츠앱, 메신저에 지능형 챗봇을 배포하세요." : 
            "AI-powered chatbot & customer support automation for your business. Deploy intelligent chatbots across your website, WhatsApp, and Messenger.";
    }
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) {
        twTitle.content = isKo ? "BibleForAI - CHATBOOST | AI 챗봇 & 고객응대 자동화" : "BibleForAI - CHATBOOST | AI Chatbot & Support Automation";
    }
    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) {
        twDesc.content = isKo ? 
            "비즈니스를 위한 AI 기반 챗봇 및 고객 응대 자동화 서비스." : 
            "AI-powered chatbot & customer support automation for your business.";
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
            const badgeText = translations[currentLang]['featured-badge'] || 'Best Seller';
            
            return `
                <div class="package-card ${featuredClass}"${pkg.featured ? ` data-badge="${badgeText}"` : ''}>
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
        case 'chatbot': return 'fa-solid fa-robot';
        default: return 'fa-solid fa-comments';
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
            color: 'silver',
            shape: 'rect',
            label: 'paypal'
        },
        createOrder: function(data, actions) {
            if (!validateEmailField()) {
                return actions.reject();
            }
            
            const qtyInput = document.getElementById('order-quantity');
            let qty = parseInt(qtyInput.value) || 1;
            if (qty < 1) qty = 1;
            
            const total = (currentPackage.basePrice * qty).toFixed(2);
            
            return actions.order.create({
                purchase_units: [{
                    description: `${currentPackage.categoryName} - ${currentPackage.tierName}`,
                    amount: {
                        currency_code: 'USD',
                        value: total,
                        breakdown: {
                            item_total: {
                                currency_code: 'USD',
                                value: total
                            }
                        }
                    },
                    items: [{
                        name: `${currentPackage.tierName}`,
                        description: currentPackage.categoryName,
                        unit_amount: {
                            currency_code: 'USD',
                            value: currentPackage.basePrice.toFixed(2)
                        },
                        quantity: qty.toString(),
                        category: 'DIGITAL_GOODS'
                    }]
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
            console.error('PayPal Checkout Error:', err);
        }
    }).render('#paypal-button-container');
}

// Local Order Storage & Receipt Management
function saveLocalOrder(paypalDetails) {
    const isKo = currentLang === 'ko';
    const orders = JSON.parse(localStorage.getItem('bibleforai_chatboost_orders') || '[]');
    
    const emailInput = document.getElementById('order-email');
    const platformSelect = document.getElementById('order-platform');
    const customerEmail = emailInput ? emailInput.value.trim() : '';
    const targetPlatform = platformSelect ? platformSelect.value : 'Website';
    
    const order = {
        date: new Date().toLocaleDateString(isKo ? 'ko-KR' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
        transactionId: paypalDetails.id || 'N/A',
        isTest: paypalDetails.isTest || false,
        product: currentPackage.categoryName,
        tier: currentPackage.tierName,
        platform: targetPlatform,
        email: customerEmail,
        quantity: orderQuantity,
        basePrice: currentPackage.basePrice,
        total: formatPrice(currentPackage.basePrice * orderQuantity),
        status: paypalDetails.isTest ? 'Test Completed' : 'Completed',
        method: 'PayPal Secure Checkout'
    };
    
    orders.unshift(order);
    localStorage.setItem('bibleforai_chatboost_orders', JSON.stringify(orders));
    renderOrders();
    redirectToGoogleForm(order);
}

function redirectToGoogleForm(order) {
    const isKo = currentLang === 'ko';
    const dict = translations[currentLang];
    const receiptText = 
`===================================
   ${dict["receipt-header"]}
===================================
${dict["receipt-date"].padEnd(15)} : ${order.date}
${dict["receipt-txid"].padEnd(15)} : ${order.transactionId}
${dict["receipt-email"].padEnd(15)} : ${order.email}
${dict["receipt-type"].padEnd(15)} : ${order.product}
${dict["receipt-size"].padEnd(15)} : ${order.tier}
${dict["receipt-platform"].padEnd(15)} : ${order.platform}
${dict["receipt-qty"].padEnd(15)} : ${order.quantity}
${dict["receipt-baseprice"].padEnd(15)} : ${formatPrice(Number(order.basePrice))}
${dict["receipt-total"].padEnd(15)} : ${formatPrice(Number(order.total))}
${dict["receipt-status"].padEnd(15)} : ${isKo ? "완료됨" : order.status}
-----------------------------------
${dict["receipt-method"].padEnd(15)} : ${dict["receipt-method-val"]}
===================================`;
    const encodedReceipt = encodeURIComponent(receiptText);
    const url = `https://docs.google.com/forms/d/e/1FAIpQLScMPqbEWWttS5mb1m_krsO_kco24ImpgvYVSbc7zO0nEVmYFw/viewform?entry.1059822061=${encodedReceipt}`;
    setTimeout(() => { window.open(url, '_blank'); }, 500);
}

function renderOrders() {
    const isKo = currentLang === 'ko';
    const orders = JSON.parse(localStorage.getItem('bibleforai_chatboost_orders') || '[]');
    const tbody = document.getElementById('orders-tbody');
    const noOrdersMsg = document.getElementById('no-orders-msg');
    
    if (!tbody) return;
    
    if (orders.length === 0) {
        tbody.innerHTML = '';
        if (noOrdersMsg) noOrdersMsg.style.display = 'block';
        return;
    }
    
    if (noOrdersMsg) noOrdersMsg.style.display = 'none';
    
    tbody.innerHTML = orders.map(order => `
        <tr>
            <td>${order.date}</td>
            <td style="font-family: monospace; font-size: 0.8rem; color: var(--accent);">${order.transactionId}</td>
            <td>${order.product}</td>
            <td>${order.tier}</td>
            <td>${order.platform}</td>
            <td>${order.quantity}</td>
            <td style="font-weight: 700; color: var(--accent);">${order.total}</td>
            <td><span style="background: rgba(20,184,166,0.15); color: #14b8a6; padding: 0.2rem 0.6rem; border-radius: 20px; font-size: 0.78rem; font-weight: 600;">${order.status}</span></td>
        </tr>
    `).join('');
}
