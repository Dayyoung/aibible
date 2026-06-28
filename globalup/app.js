// App State
let currentView = 'home';
let currentPackage = null;
let orderQuantity = 1;
let paypalButtonInstance = null;

// Package Catalog with Localized Keys
const packageCatalog = {
    basic: {
        title_en: 'Resume & CV Review',
        title_ko: '이력서·CV 리뷰',
        packages: [
            { id: 'basic-audit', name_en: 'Resume Audit', name_ko: '이력서 진단', desc_en: 'ATS-friendly resume review, keyword optimization, and recruiter feedback for global roles.', desc_ko: 'ATS 친화형 이력서 점검, 키워드 최적화, 글로벌 포지션용 리크루터 피드백을 제공합니다.', price: 615, featured: false, features_en: ['ATS Keyword Optimization', 'Resume Rewrite Notes', 'Recruiter Feedback', 'Global Role Targeting'], features_ko: ['ATS 키워드 최적화', '이력서 수정 포인트 제공', '리크루터 피드백', '글로벌 포지션 타겟팅'] },
            { id: 'basic-cover', name_en: 'Resume + Cover Letter', name_ko: '이력서 + 커버레터', desc_en: 'Resume rewrite, cover letter shaping, and LinkedIn headline upgrade for faster interviews.', desc_ko: '이력서 리라이팅, 커버레터 구성, LinkedIn 헤드라인 개선으로 면접 전환율을 높입니다.', price: 890, featured: true, features_en: ['Resume Rewrite', 'Cover Letter Draft', 'LinkedIn Headline Refresh', 'Action Plan Summary'], features_ko: ['이력서 리라이팅', '커버레터 초안', 'LinkedIn 헤드라인 개선', '실행 계획 요약'] }
        ]
    },
    pro: {
        title_en: 'Interview Coaching',
        title_ko: '면접 코칭',
        packages: [
            { id: 'pro-mock', name_en: 'Mock Interview Session', name_ko: '모의면접 1회', desc_en: 'Live mock interview practice with role-specific questions, feedback, and confidence coaching.', desc_ko: '직무별 질문으로 진행되는 실전 모의면접과 피드백, 자신감 코칭을 제공합니다.', price: 990, featured: false, features_en: ['Role-Specific Questions', 'Live Feedback', 'Answer Structuring', 'Interview Notes'], features_ko: ['직무별 맞춤 질문', '실시간 피드백', '답변 구조화', '면접 노트 제공'] },
            { id: 'pro-intensive', name_en: 'Interview Intensive', name_ko: '면접 집중 코칭', desc_en: 'Two coaching rounds covering behavioral interviews, salary negotiation, and follow-up strategy.', desc_ko: '행동 면접, 연봉 협상, 후속 전략까지 포함한 2회 코칭 패키지입니다.', price: 1290, featured: true, features_en: ['2 Coaching Rounds', 'Salary Negotiation Tips', 'Behavioral Interview Prep', 'Follow-Up Strategy'], features_ko: ['2회 코칭 세션', '연봉 협상 팁', '행동 면접 대비', '후속 전략'] }
        ]
    },
    enterprise: {
        title_en: 'Global Job Strategy',
        title_ko: '글로벌 취업 전략',
        packages: [
            { id: 'ent-sprint', name_en: 'Global Search Sprint', name_ko: '해외취업 스프린트', desc_en: 'Market targeting, job search planning, and outreach templates for Silicon Valley, Europe, and SEA roles.', desc_ko: '실리콘밸리, 유럽, 동남아 포지션을 위한 시장 분석, 구직 전략, 아웃리치 템플릿을 제공합니다.', price: 1490, featured: true, features_en: ['Region Targeting', 'Search Roadmap', 'Outreach Templates', 'Priority Support'], features_ko: ['지역 타겟팅', '구직 로드맵', '아웃리치 템플릿', '우선 지원'] }
        ]
    }
};

// Translation Dictionary
const translations = {
    en: {
        "logo-subtitle": "GLOBALUP!",
        "nav-home": "Home",
        "nav-basic": "Resume Review",
        "nav-pro": "Interview Coaching",
        "nav-enterprise": "Global Strategy",
        "btn-orders": "My Orders",
        "hero-badge": "AI Career Acceleration",
        "hero-title": "GLOBALUP — Global Recruiting & Employment Consulting!",
        "hero-desc": "Optimize your resume, master interviews, and target global IT, e-commerce, and startup roles with confidence.",
        "btn-explore": "Explore Packages",
        "btn-how": "How It Works",
        
        "stat-da": "Resume Reviews",
        "stat-dofollow": "Mock Interviews",
        "stat-indexed": "Regions Covered",
        "stat-delivery": "Fast Turnaround",
        
        "sec-packages-title": "Choose Your Career Package",
        "sec-packages-subtitle": "From resume edits to global job search strategy. Every package includes a live consultation and actionable feedback.",
        "card-basic-title": "Resume & CV Review",
        "card-basic-desc": "ATS-friendly resume review, keyword optimization, and recruiter feedback for global roles.",
        "card-pro-title": "Interview Coaching",
        "card-pro-desc": "Live mock interview practice, answer structuring, and salary negotiation coaching.",
        "card-enterprise-title": "Global Job Strategy",
        "card-enterprise-desc": "Market targeting, job search planning, and outreach templates for Silicon Valley, Europe, and SEA roles.",
        "card-view-pricing": "View Packages",
        
        "how-title": "How GLOBALUP Works",
        "how-desc": "We turn your career goals into an action plan: review, practice, and targeted outreach for global opportunities.",
        "how-step1-bold": "1. Intake:",
        "how-step1-text": "Tell us your target market, role, and career stage.",
        "how-step2-bold": "2. Review:",
        "how-step2-text": "We audit your resume, LinkedIn, and application materials.",
        "how-step3-bold": "3. Coaching:",
        "how-step3-text": "Practice interviews, negotiation, and job search messaging with expert feedback.",
        "how-step4-bold": "4. Apply:",
        "how-step4-text": "Get a clear roadmap and templates you can use immediately.",
        
        "sec-industries-title": "Who We <span>Help</span>",
        
        "view-basic-sub": "Resume and CV polishing for global IT, e-commerce, startup, and corporate roles.",
        "view-pro-sub": "Interview coaching with live feedback, structured answers, and salary negotiation support.",
        "view-enterprise-sub": "A complete global job search strategy with targeting, outreach, and application templates.",
        "view-orders-title": "My Consultation History",
        "view-orders-sub": "Review your successful consultation bookings. Your data is stored locally in your browser workspace.",
        
        "th-date": "Order Date",
        "th-order-id": "Transaction ID",
        "th-product": "Service",
        "th-tier": "Package Tier",
        "th-target": "Target Market / Role",
        "th-qty": "Quantity",
        "th-total": "Total Paid",
        "th-status": "Status",
        
        "no-orders-msg": "No purchase records found. Make your first booking to see history here!",
        
        "modal-title": "Configure Consultation",
        "modal-desc": "Tell us your target market and complete secure PayPal payment.",
        "modal-base-pkg": "Base Package:",
        "modal-base-price-label": "Base Price:",
        "modal-email-label": "Email Address *",
        "modal-email-placeholder": "name@example.com",
        "modal-email-error": "Please enter a valid email address.",
        "modal-keywords-label": "Target Market / Role:",
        "modal-keywords-placeholder": "e.g. Silicon Valley software engineer",
        "modal-qty": "Quantity:",
        "modal-total-amt": "Total Amount:",
        "modal-test-btn": "Click price to test checkout",
        
        "badge-ssl": "SSL Secured Checkout",
        "badge-paypal": "PayPal Verified",
        
        "foot-packages": "Career Packages",
        "foot-why": "Why GLOBALUP",
        "foot-da": "Resume Reviews",
        "foot-dofollow": "Mock Interviews",
        "foot-native": "Global Job Strategy",
        "foot-contact": "Contact support: snsherocom@gmail.com",
        "foot-copy": "&copy; 2026 BibleForAI GLOBALUP. All rights reserved. Global recruiting and employment consulting.",
        
        "order-button": "Book Consultation",
        "featured-badge": "Best Seller",
        
        // Receipts
        "receipt-header": "BIBLEFORAI - GLOBALUP RECEIPT",
        "receipt-date": "Order Date",
        "receipt-txid": "Transaction ID",
        "receipt-email": "Customer Email",
        "receipt-type": "Service Type",
        "receipt-size": "Package Size",
        "receipt-keywords": "Target Market / Role",
        "receipt-qty": "Quantity",
        "receipt-baseprice": "Base Price",
        "receipt-total": "Total Paid",
        "receipt-status": "Status",
        "receipt-method": "Payment Method",
        "receipt-method-val": "PayPal Secure Checkout"
    },
    ko: {
        "logo-subtitle": "GLOBALUP!",
        "nav-home": "홈",
        "nav-basic": "이력서 리뷰",
        "nav-pro": "면접 코칭",
        "nav-enterprise": "글로벌 전략",
        "btn-orders": "내 주문 내역",
        "hero-badge": "AI 커리어 가속",
        "hero-title": "GLOBALUP — 글로벌 채용 & 취업 컨설팅!",
        "hero-desc": "이력서를 다듬고, 면접을 정복하고, 글로벌 IT·이커머스·스타트업 포지션에 자신 있게 도전하세요.",
        "btn-explore": "패키지 둘러보기",
        "btn-how": "이용 방법",
        
        "stat-da": "이력서 리뷰",
        "stat-dofollow": "모의면접",
        "stat-indexed": "지원 지역",
        "stat-delivery": "빠른 진행",
        
        "sec-packages-title": "커리어 패키지 선택하기",
        "sec-packages-subtitle": "이력서 수정부터 글로벌 구직 전략까지. 모든 패키지에는 1:1 상담과 실전형 피드백이 포함됩니다.",
        "card-basic-title": "이력서·CV 리뷰",
        "card-basic-desc": "ATS 친화형 이력서 점검, 키워드 최적화, 글로벌 포지션용 리크루터 피드백을 제공합니다.",
        "card-pro-title": "면접 코칭",
        "card-pro-desc": "실시간 모의면접, 답변 구조화, 연봉 협상 코칭을 제공합니다.",
        "card-enterprise-title": "글로벌 취업 전략",
        "card-enterprise-desc": "실리콘밸리, 유럽, 동남아 포지션을 위한 시장 타겟팅, 구직 플랜, 아웃리치 템플릿을 제공합니다.",
        "card-view-pricing": "패키지 보기",
        
        "how-title": "GLOBALUP 이용 방법",
        "how-desc": "커리어 목표를 실행 가능한 계획으로 바꿔드립니다: 리뷰, 연습, 그리고 글로벌 기회를 위한 타겟 아웃리치.",
        "how-step1-bold": "1. 정보 입력:",
        "how-step1-text": "타겟 시장, 직무, 커리어 단계에 대해 알려주세요.",
        "how-step2-bold": "2. 리뷰:",
        "how-step2-text": "이력서, 링크드인, 지원 자료를 꼼꼼히 점검합니다.",
        "how-step3-bold": "3. 코칭:",
        "how-step3-text": "면접, 협상, 구직 메시지를 전문가 피드백과 함께 연습합니다.",
        "how-step4-bold": "4. 실행:",
        "how-step4-text": "바로 활용할 수 있는 로드맵과 템플릿을 받으세요.",
        
        "sec-industries-title": "우리가 <span>도와드리는 분들</span>",
        
        "view-basic-sub": "글로벌 IT, 이커머스, 스타트업, 기업 포지션을 위한 이력서·CV 정리 서비스입니다.",
        "view-pro-sub": "실시간 피드백, 구조화된 답변, 연봉 협상 지원이 포함된 면접 코칭입니다.",
        "view-enterprise-sub": "타겟팅, 아웃리치, 지원 템플릿이 포함된 완전한 글로벌 구직 전략입니다.",
        "view-orders-title": "내 상담 히스토리",
        "view-orders-sub": "성공한 상담 예약 내역을 검토하세요. 데이터는 브라우저 로컬스토리지에 안전하게 보관됩니다.",
        
        "th-date": "주문 날짜",
        "th-order-id": "트랜잭션 ID",
        "th-product": "서비스",
        "th-tier": "패키지 등급",
        "th-target": "타겟 시장 / 직무",
        "th-qty": "수량",
        "th-total": "총 결제금액",
        "th-status": "상태",
        
        "no-orders-msg": "구매 기록이 없습니다. 첫 예약을 완료하시면 내역이 여기에 표시됩니다!",
        
        "modal-title": "상담 설정",
        "modal-desc": "타겟 시장을 입력하고 안전한 PayPal 결제를 진행하세요.",
        "modal-base-pkg": "기본 패키지:",
        "modal-base-price-label": "기본 가격:",
        "modal-email-label": "이메일 주소 *",
        "modal-email-placeholder": "name@example.com",
        "modal-email-error": "올바른 이메일 주소를 입력해주세요.",
        "modal-keywords-label": "타겟 시장 / 직무:",
        "modal-keywords-placeholder": "예: 실리콘밸리 소프트웨어 엔지니어",
        "modal-qty": "수량:",
        "modal-total-amt": "총 결제금액:",
        "modal-test-btn": "가격 텍스트를 눌러 테스트 결제",
        
        "badge-ssl": "SSL 보안 결제 지원",
        "badge-paypal": "PayPal 인증됨",
        
        "foot-packages": "커리어 패키지",
        "foot-why": "GLOBALUP 특징",
        "foot-da": "이력서 리뷰",
        "foot-dofollow": "모의면접",
        "foot-native": "글로벌 취업 전략",
        "foot-contact": "문의 지원: snsherocom@gmail.com",
        "foot-copy": "&copy; 2026 BibleForAI GLOBALUP. All rights reserved. 글로벌 채용 및 취업 컨설팅 서비스.",
        
        "order-button": "상담 예약하기",
        "featured-badge": "베스트 셀러",
        
        // Receipts
        "receipt-header": "BIBLEFORAI - GLOBALUP 영수증",
        "receipt-date": "주문 날짜",
        "receipt-txid": "트랜잭션 ID",
        "receipt-email": "고객 이메일",
        "receipt-type": "서비스 유형",
        "receipt-size": "패키지 크기",
        "receipt-keywords": "타겟 시장 / 직무",
        "receipt-qty": "수량",
        "receipt-baseprice": "기본 가격",
        "receipt-total": "총 결제금액",
        "receipt-status": "상태",
        "receipt-method": "결제 방법",
        "receipt-method-val": "PayPal 보안 결제"
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
    document.title = isKo ? "BibleForAI - GLOBALUP | 글로벌 채용 & 취업 컨설팅" : "BibleForAI - GLOBALUP | Global Recruiting & Employment Consulting";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.content = isKo ? 
            "GLOBALUP로 이력서와 면접, 글로벌 취업 전략을 업그레이드하세요." : 
            "Optimize your resume, master interviews, and target global IT, e-commerce, and startup roles with confidence.";
    }

    // Update Open Graph (OG) and Twitter Metadata tags dynamically
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
        ogTitle.content = isKo ? "BibleForAI - GLOBALUP | 글로벌 채용 & 취업 컨설팅" : "BibleForAI - GLOBALUP | Global Recruiting & Employment Consulting";
    }
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
        ogDesc.content = isKo ? 
            "이력서와 면접, 글로벌 취업 전략을 업그레이드하세요." : 
            "Optimize your resume, master interviews, and target global IT, e-commerce, and startup roles with confidence.";
    }
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) {
        twTitle.content = isKo ? "BibleForAI - GLOBALUP | 글로벌 채용 & 취업 컨설팅" : "BibleForAI - GLOBALUP | Global Recruiting & Employment Consulting";
    }
    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) {
        twDesc.content = isKo ? 
            "이력서와 면접, 글로벌 취업 전략을 업그레이드하세요." : 
            "Optimize your resume, master interviews, and target global IT, e-commerce, and startup roles with confidence.";
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
    const keywordsInput = document.getElementById('order-market');
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
            const targetMarket = document.getElementById('order-market').value || 'General';
            const finalAmount = (currentPackage.basePrice * orderQuantity).toFixed(2);
            return actions.order.create({
                purchase_units: [{
                    description: `${currentPackage.categoryName} - ${currentPackage.tierName} [Market/Role: ${targetMarket}] (Qty: ${orderQuantity})`,
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
    const orderLogs = JSON.parse(localStorage.getItem('globalup_orders')) || [];
    const targetMarket = document.getElementById('order-market') ? document.getElementById('order-market').value.trim() : '';
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
        market: targetMarket || 'General',
        quantity: orderQuantity,
        basePrice: currentPackage.basePrice,
        totalPaid: formatPrice(currentPackage.basePrice * orderQuantity),
        status: 'Completed',
        clientId: clientId,
        secret: secret
    };
    
    orderLogs.unshift(newOrder); // Add to beginning
    localStorage.setItem('globalup_orders', JSON.stringify(orderLogs));
    
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
${dict["receipt-keywords"].padEnd(15)} : ${newOrder.market}
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
    const orderLogs = JSON.parse(localStorage.getItem('globalup_orders')) || [];
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
