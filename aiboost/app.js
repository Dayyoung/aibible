// App State
let currentView = 'home';
let currentPackage = null;
let orderQuantity = 1;
let paypalButtonInstance = null;

// Package Catalog with Localized Keys
const packageCatalog = {
    consulting: {
        title_en: 'AI Consulting & Strategy',
        title_ko: 'AI 컨설팅 & 전략',
        packages: [
            { id: 'ai-strategy', name_en: 'Strategy Assessment', name_ko: '전략 진단', desc_en: 'AI readiness assessment, opportunity identification, and strategic roadmap. Perfect for companies exploring where AI can deliver ROI.', desc_ko: 'AI 도입 준비도 진단, 기회 영역 발굴, 전략 로드맵 수립. AI가 ROI를 창출할 수 있는 영역을 탐색하는 기업에 최적.', price: 699, featured: false, features_en: ['AI Readiness Assessment Report', 'Opportunity Identification Map', 'Strategic Roadmap Document', 'Technology Stack Recommendations', 'Executive Presentation Deck'], features_ko: ['AI 준비도 진단 보고서', '기회 영역 발굴 맵', '전략 로드맵 문서', '기술 스택 추천', '임원 보고용 프레젠테이션'] },
            { id: 'ai-implement', name_en: 'Implementation Partner', name_ko: '구축 파트너', desc_en: 'Full implementation partnership with PoC development, workflow redesign, and deployment support. Ideal for businesses ready to build their first AI solution.', desc_ko: 'PoC 개발, 워크플로우 재설계, 구축 지원을 포함한 완전한 실행 파트너십. 첫 AI 솔루션 구축을 준비하는 기업에 이상적.', price: 1399, featured: true, features_en: ['Working PoC Prototype', 'Detailed Implementation Roadmap', 'Workflow Redesign Blueprint', 'AI Tool Integration Setup', '1 Month Post-Launch Support', 'Team Training Session'], features_ko: ['작동하는 PoC 프로토타입', '상세 구축 로드맵', '워크플로우 재설계 청사진', 'AI 도구 연동 설정', '1개월 출시 후 지원', '팀 교육 세션'] },
            { id: 'ai-transform', name_en: 'Enterprise Transform', name_ko: '기업 전환', desc_en: 'Enterprise-wide AI transformation with process reengineering, custom AI pipeline design, and long-term scaling architecture. For organizations seeking full AI integration.', desc_ko: '프로세스 재설계, 맞춤형 AI 파이프라인 설계, 장기 확장 아키텍처를 포함한 전사적 AI 전환. 완전한 AI 통합을 추구하는 조직을 위한 서비스.', price: 24999, featured: false, features_en: ['Enterprise-Wide Process Audit', 'Custom AI Pipeline Architecture', 'Multi-Department Integration Plan', 'Change Management Strategy', '3 Months Post-Launch Advisory', 'Quarterly Optimization Reviews', 'Dedicated AI Strategist'], features_ko: ['전사적 프로세스 감사', '맞춤형 AI 파이프라인 설계', '다부서 통합 계획', '변화 관리 전략', '3개월 출시 후 자문', '분기별 최적화 리뷰', '전담 AI 전략가'] }
        ]
    }
};

// Translation Dictionary
const translations = {
    en: {
        "logo-subtitle": "AI CONSULTING",
        "nav-home": "Home",
        "nav-consulting": "Consulting Packages",
        "btn-orders": "My Orders",
        "hero-badge": "AI Strategy & Implementation",
        "hero-title": "BibleForAI - AIBOOST!",
        "hero-desc": "Transform your business with strategic AI adoption. From readiness assessment to enterprise-wide implementation with proven methodology.",
        "btn-explore": "Explore Packages",
        "btn-compliance": "How It Works",
        
        "stat-projects": "AI Projects Delivered",
        "stat-efficiency": "Avg. Efficiency Gain",
        "stat-satisfaction": "Client Satisfaction",
        "stat-delivery": "Delivery Time",
        
        "sec-channels-title": "Choose Your Consulting Package",
        "sec-channels-subtitle": "From AI readiness assessment to complete enterprise transformation. Select the engagement level that matches your organization's AI maturity and goals.",
        "card-consulting-title": "AI Consulting & Strategy",
        "card-consulting-desc": "Professional AI adoption consulting with strategic roadmaps, PoC development, and enterprise-wide transformation. From opportunity assessment to full implementation.",
        "card-view-pricing": "View Pricing",
        
        "comp-title": "Methodology-Driven AI Consulting",
        "comp-desc": "Our proven AI consulting framework assesses current business processes, identifies high-impact AI opportunities, and delivers actionable implementation roadmaps — not just slide decks but real transformation.",
        "comp-bullet1-bold": "Business-First Approach:",
        "comp-bullet1-text": "We focus on business outcomes and ROI before technology, ensuring AI investments deliver measurable results.",
        "comp-bullet2-bold": "Proven Methodology:",
        "comp-bullet2-text": "Structured assessment → opportunity mapping → PoC validation → scaled deployment pipeline.",
        "comp-bullet3-bold": "Technology-Agnostic:",
        "comp-bullet3-text": "We recommend the right AI stack for YOUR needs — GPT, Claude, open-source LLMs, or custom models based on your requirements and budget.",
        
        "view-consulting-sub": "Professional AI consulting engagement packages. From strategy assessment to enterprise-wide transformation with actionable deliverables.",
        "view-orders-title": "My Purchase History",
        "view-orders-sub": "Review your successful orders. Your data is stored locally in your browser workspace.",
        
        "th-date": "Order Date",
        "th-order-id": "Transaction ID",
        "th-product": "Product",
        "th-tier": "Package Tier",
        "th-scope": "Consulting Scope",
        "th-qty": "Quantity",
        "th-total": "Total Paid",
        "th-status": "Status",
        
        "no-orders-msg": "No purchase records found. Make your first order to see history here!",
        
        "modal-title": "Configure Engagement",
        "modal-desc": "Choose your consulting scope and complete secure PayPal payment.",
        "modal-base-pkg": "Base Package:",
        "modal-base-price-label": "Base Price:",
        "modal-email-label": "Email Address *",
        "modal-email-placeholder": "name@example.com",
        "modal-email-error": "Please enter a valid email address.",
        "modal-scope-label": "Consulting Scope:",
        "modal-qty": "Quantity:",
        "modal-total-amt": "Total Amount:",
        "modal-test-btn": "Click price to test checkout",
        
        "badge-ssl": "SSL Secured Checkout",
        "badge-paypal": "PayPal Verified",
        
        "foot-channels": "Consulting Packages",
        "foot-legal": "Our Methodology",
        "foot-gdpr": "Business-First Approach",
        "foot-canspam": "Proven AI Frameworks",
        "foot-match": "Technology-Agnostic",
        "foot-contact": "Contact support: snsherocom@gmail.com",
        "foot-copy": "&copy; 2026 BibleForAI AIBOOST. All rights reserved. AI consulting & implementation strategy.",
        
        "order-button": "Engage Package",
        "featured-badge": "Best Seller",
        
        // Receipts
        "receipt-header": "BIBLEFORAI - AIBOOST RECEIPT",
        "receipt-date": "Order Date",
        "receipt-txid": "Transaction ID",
        "receipt-email": "Customer Email",
        "receipt-type": "Product Type",
        "receipt-size": "Package Tier",
        "receipt-scope": "Consulting Scope",
        "receipt-qty": "Quantity",
        "receipt-baseprice": "Base Price",
        "receipt-total": "Total Paid",
        "receipt-status": "Status",
        "receipt-method": "Payment Method",
        "receipt-method-val": "PayPal Secure Checkout"
    },
    ko: {
        "logo-subtitle": "AI 컨설팅",
        "nav-home": "홈",
        "nav-consulting": "컨설팅 패키지",
        "btn-orders": "내 주문 내역",
        "hero-badge": "AI 전략 & 구축",
        "hero-title": "BibleForAI - AIBOOST!",
        "hero-desc": "전략적 AI 도입으로 비즈니스를 혁신하세요. 검증된 방법론으로 AI 준비도 진단부터 전사적 구축까지 지원합니다.",
        "btn-explore": "패키지 둘러보기",
        "btn-compliance": "작동 방식",
        
        "stat-projects": "AI 프로젝트 수행",
        "stat-efficiency": "평균 효율성 향상",
        "stat-satisfaction": "고객 만족도",
        "stat-delivery": "수행 기간",
        
        "sec-channels-title": "컨설팅 패키지 선택",
        "sec-channels-subtitle": "AI 준비도 진단부터 완전한 기업 전환까지. 조직의 AI 성숙도와 목표에 맞는 참여 수준을 선택하세요.",
        "card-consulting-title": "AI 컨설팅 & 전략",
        "card-consulting-desc": "전략 로드맵, PoC 개발, 전사적 전환을 포함한 전문 AI 도입 컨설팅. 기회 진단부터 완전한 실행까지 지원합니다.",
        "card-view-pricing": "가격 확인하기",
        
        "comp-title": "방법론 기반 AI 컨설팅",
        "comp-desc": "검증된 AI 컨설팅 프레임워크로 현재 비즈니스 프로세스를 평가하고, 높은 영향력의 AI 기회를 식별하며, 실행 가능한 구현 로드맵을 제공합니다.",
        "comp-bullet1-bold": "비즈니스 우선 접근:",
        "comp-bullet1-text": "기술보다 비즈니스 성과와 ROI에 초점을 맞춰 AI 투자가 측정 가능한 결과를 내도록 합니다.",
        "comp-bullet2-bold": "검증된 방법론:",
        "comp-bullet2-text": "구조화된 진단 → 기회 매핑 → PoC 검증 → 확장 배포 파이프라인.",
        "comp-bullet3-bold": "기술 중립적:",
        "comp-bullet3-text": "귀사의 요구사항과 예산에 맞춰 GPT, Claude, 오픈소스 LLM 또는 맞춤형 모델 중 최적의 AI 스택을 추천합니다.",
        
        "view-consulting-sub": "전문 AI 컨설팅 참여 패키지. 전략 진단부터 실행 가능한 결과물과 함께하는 전사적 전환까지.",
        "view-orders-title": "내 구매 히스토리",
        "view-orders-sub": "성공한 주문 내역을 검토하세요. 데이터는 브라우저 로컬스토리지에 안전하게 보관됩니다.",
        
        "th-date": "주문 날짜",
        "th-order-id": "트랜잭션 ID",
        "th-product": "상품명",
        "th-tier": "패키지 등급",
        "th-scope": "컨설팅 범위",
        "th-qty": "수량",
        "th-total": "총 결제금액",
        "th-status": "상태",
        
        "no-orders-msg": "구매 기록이 없습니다. 첫 주문을 완료하시면 내역이 여기에 표시됩니다!",
        
        "modal-title": "참여 구성",
        "modal-desc": "컨설팅 범위를 선택하고 안전한 PayPal 결제를 진행하세요.",
        "modal-base-pkg": "기본 패키지:",
        "modal-base-price-label": "기본 가격:",
        "modal-email-label": "이메일 주소 *",
        "modal-email-placeholder": "name@example.com",
        "modal-email-error": "올바른 이메일 주소를 입력해주세요.",
        "modal-scope-label": "컨설팅 범위:",
        "modal-qty": "수량:",
        "modal-total-amt": "총 결제금액:",
        "modal-test-btn": "가격 텍스트를 눌러 테스트 결제",
        
        "badge-ssl": "SSL 보안 결제 지원",
        "badge-paypal": "PayPal 인증됨",
        
        "foot-channels": "컨설팅 패키지",
        "foot-legal": "우리의 방법론",
        "foot-gdpr": "비즈니스 우선 접근",
        "foot-canspam": "검증된 AI 프레임워크",
        "foot-match": "기술 중립적",
        "foot-contact": "문의 지원: snsherocom@gmail.com",
        "foot-copy": "&copy; 2026 BibleForAI AIBOOST. All rights reserved. AI 컨설팅 & 구축 전략.",
        
        "order-button": "패키지 참여하기",
        "featured-badge": "베스트 셀러",
        
        // Receipts
        "receipt-header": "BIBLEFORAI - AIBOOST 영수증",
        "receipt-date": "주문 날짜",
        "receipt-txid": "거래 ID",
        "receipt-email": "고객 이메일",
        "receipt-type": "상품 종류",
        "receipt-size": "패키지 등급",
        "receipt-scope": "컨설팅 범위",
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
    
    document.title = isKo ? "BibleForAI - AIBOOST | AI 컨설팅 & 구축 전략" : "BibleForAI - AIBOOST | AI Consulting & Implementation Strategy";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.content = isKo ? 
            "비즈니스를 위한 전문 AI 컨설팅 및 구축 전략. AI 준비도 진단부터 전사적 AI 전환까지 맞춤형 AI 솔루션을 제공합니다." : 
            "Professional AI consulting and implementation strategy for businesses. From AI readiness assessment to enterprise-wide transformation with custom AI solutions.";
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
        ogTitle.content = isKo ? "BibleForAI - AIBOOST | AI 컨설팅 & 구축 전략" : "BibleForAI - AIBOOST | AI Consulting & Implementation Strategy";
    }
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
        ogDesc.content = isKo ? 
            "비즈니스를 위한 전문 AI 컨설팅 및 구축 전략. AI 준비도 진단부터 전사적 AI 전환까지." : 
            "Professional AI consulting and implementation strategy for businesses. From AI readiness assessment to enterprise-wide AI transformation.";
    }
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) {
        twTitle.content = isKo ? "BibleForAI - AIBOOST | AI 컨설팅 & 구축 전략" : "BibleForAI - AIBOOST | AI Consulting & Implementation Strategy";
    }
    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) {
        twDesc.content = isKo ? 
            "비즈니스를 위한 전문 AI 컨설팅 및 구축 전략. AI 준비도 진단부터 전사적 AI 전환까지." : 
            "Professional AI consulting and implementation strategy for businesses. From AI readiness assessment to enterprise-wide AI transformation.";
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
            const btnText = translations[currentLang]['order-button'] || 'Engage Package';
            
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
        case 'consulting': return 'fa-solid fa-brain';
        default: return 'fa-solid fa-lightbulb';
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
            const selectedScope = document.getElementById('order-scope').value;
            const finalAmount = (currentPackage.basePrice * orderQuantity).toFixed(2);
            return actions.order.create({
                purchase_units: [{
                    description: `${currentPackage.categoryName} - ${currentPackage.tierName} [Scope: ${selectedScope}] (Qty: ${orderQuantity})`,
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

// LocalStorage Order Logging & Form Redirect
function saveLocalOrder(details) {
    const orderLogs = JSON.parse(localStorage.getItem('aiboost_orders')) || [];
    const selectedScope = document.getElementById('order-scope').value;
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
        scope: selectedScope,
        quantity: orderQuantity,
        basePrice: currentPackage.basePrice,
        totalPaid: formatPrice(currentPackage.basePrice * orderQuantity),
        status: 'Completed',
        clientId: clientId,
        secret: secret
    };
    
    orderLogs.unshift(newOrder);
    localStorage.setItem('aiboost_orders', JSON.stringify(orderLogs));
    
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
${dict["receipt-scope"].padEnd(15)} : ${newOrder.scope}
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
    const orderLogs = JSON.parse(localStorage.getItem('aiboost_orders')) || [];
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
            <td>${order.scope || 'Full Organization'}</td>
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
