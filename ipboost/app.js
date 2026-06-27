// App State
let currentView = 'home';
let currentPackage = null;
let orderQuantity = 1;
let paypalButtonInstance = null;

// Package Catalog with Localized Keys
const packageCatalog = {
    trademark: {
        title_en: 'TradeMark Filing',
        title_ko: '상표 출원',
        packages: [
            { id: 'trademark-basic', name_en: 'Basic Filing', name_ko: '베이직 출원', desc_en: 'Standard trademark filing support for single class jurisdictions.', desc_ko: '단일 클래스 국가 상표 출원 기본 지원 패키지.', price: 320, featured: false, features_en: ['Clearance Check', 'Class Strategy', 'Filing Draft', ' office Action Response'], features_ko: ['상표 검색', '클래스 전략', '출원 서류 작성', 'Office Action 대응'] },
            { id: 'trademark-standard', name_en: 'Standard Filing', name_ko: '스탠다드 출원', desc_en: 'Enhanced filing support with signature preparation and monitoring.', desc_ko: '서명 준비, 제출 및 모니터링이 포함된 향상된 출원 패키지.', price: 520, featured: false, features_en: ['Clearance Report', 'Class Selection', 'Filing Monitoring', 'Status Updates'], features_ko: ['선검색 리포트', '클래스 선정', '출원 진행 모니터링', '상태 업데이트'] },
            { id: 'trademark-premium', name_en: 'Premium Filing', name_ko: '프리미엄 출원', desc_en: 'Priority filing and proactive compliance tracking for multi-class brands.', desc_ko: '다중 클래스 브랜드를 위한 우선 출원 및 규정 준수 추적.', price: 980, featured: true, features_en: ['Multi-Class Support', 'Expedited Filing', 'Opposition Watch', 'Renewal Reminders'], features_ko: ['다중 클래스 지원', '우선 출원', '이의신청 감시', '갱신 알림'] }
        ]
    },
    patent: {
        title_en: 'Patent Strategy',
        title_ko: '특허 전략',
        packages: [
            { id: 'patent-prior-art', name_en: 'Prior Art Check', name_ko: '선행기술 조사', desc_en: 'Focused novelty and prior art analysis to assess patentability.', desc_ko: '신규성 및 선행기술 분석으로 특허성 평가.', price: 560, featured: false, features_en: ['Search Report', 'Patentability Review', 'Claims Guidance', 'Written Summary'], features_ko: ['검색 리포트', '특허성 검토', '청구항 가이드', '작성 요약서'] },
            { id: 'patent-drafting', name_en: 'Drafting Support', name_ko: '출원서 작성 지원', desc_en: 'Drafting assistance for utility or design patent applications.', desc_ko: '실용신안 또는 디자인 특허 출원서 초안 작성 지원.', price: 960, featured: false, features_en: ['Claims Drafting', 'Drawing Checklist', 'Specification Outline', ' filing QA'], features_ko: ['청구항 작성', '도면 체크리스트', '명세서 개요', '출원 전 검증 QA'] },
            { id: 'patent-prosecution', name_en: 'Prosecution Support', name_ko: '심사 단계 지원', desc_en: 'Full support for examination, Office Actions, and final grant.', desc_ko: '심사, OA 대응 및 등록 결정까지 전 과정 지원.', price: 1500, featured: true, features_en: ['Response Drafts', 'Amendment Support', 'Hearing Prep', 'Grant Tracking'], features_ko: ['OA 응답서 작성', '정정 신청 지원', '심문 준비', '등록 추적'] }
        ]
    },
    copyright: {
        title_en: 'Copyright & IP Audit',
        title_ko: '저작권 및 IP 감사',
        packages: [
            { id: 'copyright-basic', name_en: 'Audit Lite', name_ko: '라이트 감사', desc_en: 'Basic portfolio audit with prioritized registration action list.', desc_ko: '기본 포트폴리오 감사 및 우선 등록 액션 리스트.', price: 260, featured: false, features_en: ['Asset Inventory', 'Risk Summary', 'Action List', 'Basic Templates'], features_ko: ['자산 인벤토리', '리스크 요약', '액션 리스트', '기본 템플릿'] },
            { id: 'copyright-audit', name_en: 'Full Audit', name_ko: '전체 감사', desc_en: 'Detailed copyright and IP portfolio review with licensing guidance.', desc_ko: '상세한 저작권 및 IP 포트폴리오 검토와 라이선싱 가이드.', price: 620, featured: false, features_en: ['Audit Report', 'Territory Mapping', 'License Templates', 'Priority Roadmap'], features_ko: ['감사 보고서', '지역별 매핑', '라이선스 템플릿', '우선 로드맵'] },
            { id: 'copyright-register', name_en: 'Registration Package', name_ko: '등록 패키지', desc_en: 'Prepare and file registration with proof and certificate handling.', desc_ko: '등록 준비 및 접수, 증명서 수령 처리 패키지.', price: 980, featured: true, features_en: ['Application Drafting', 'Docs Checklist', 'Submission Tracking', 'Certificate Handling'], features_ko: ['출원서 작성', '서류 체크리스트', '접수 추적', '증명서 처리'] }
        ]
    },
    outsourcing: {
        title_en: 'Local Counsel Outsourcing',
        title_ko: '로컬 특허법률사무소 외부화',
        packages: [
            { id: 'counsel-review', name_en: 'Document Review', name_ko: '서류 검토', desc_en: 'Local counsel review for filing documents and supports.', desc_ko: '출원 서류 및 증빙에 대한 현지 법률가 검토.', price: 680, featured: false, features_en: ['Counsel Assignment', 'Review Report', 'Annotated Docs', 'Call Summary'], features_ko: ['법률가 배정', '검토 리포트', '주석 포함 문서', '통화 요약'] },
            { id: 'counsel-prosecution', name_en: 'Prosecution Counsel', name_ko: '심사 대리', desc_en: 'Local counsel representation during prosecution and hearings.', desc_ko: '심사 및 심문 기간 동안 현지 대리 대응.', price: 1400, featured: false, features_en: ['Local Representation', 'OA Handling', 'Hearing Prep', 'Status Reports'], features_ko: ['현지 대리', 'OA 대응', '심문 준비', '상태 보고'] },
            { id: 'counsel-portfolio', name_en: 'Portfolio Counsel', name_ko: '포트폴리오 관리', desc_en: 'Ongoing portfolio management and renewal coordination.', desc_ko: '지속적인 IP 포트폴리오 관리 및 갱신 조율.', price: 2600, featured: true, features_en: ['Portfolio Review', 'Renewal Calendar', 'Watch Service', 'Enforcement Support'], features_ko: ['포트폴리오 검토', '갱신 캘린더', '모니터링 서비스', '권리행사 지원'] }
        ]
    }
};

// Translation Dictionary
const translations = {
    en: {
        "logo-subtitle": "IPBOOST",
        "nav-home": "Home",
        "nav-trademark": "Trademark",
        "nav-patent": "Patent",
        "nav-copyright": "Copyright",
        "nav-outsourcing": "Local Counsel",
        "btn-orders": "My Orders",
        "hero-badge": "AI-Powered Brand Defense",
        "hero-title": "BibleForAI - IPBOOST",
        "hero-desc": "File trademarks, patents, and copyrights with AI-guided workflows and local counsel networks across 100+ jurisdictions.",
        "btn-explore": "Explore IP Services",
        "btn-compliance": "Global Coverage",
        
        "stat-jurisdictions": "Jurisdictions",
        "stat-accuracy-rate": "Filing Readiness",
        "stat-faster": "Faster Preparation",
        "stat-delivery": "Initial Review",
        
        "sec-channels-title": "Select Your IP Protection Path",
        "sec-channels-subtitle": "Choose trademark, patent, copyright, or local counsel support. Each engagement is tailored to your jurisdiction and timeline.",
        "card-trademark-title": "TradeMark Filing",
        "card-trademark-desc": "Clearance searches, class selection, and filing for brand names, logos, and slogans worldwide.",
        "card-patent-title": "Patent Strategy",
        "card-patent-desc": "Prior art checks, claim drafting, and filing support across utility and design patent tracks.",
        "card-copyright-title": "Copyright & IP Audit",
        "card-copyright-desc": "Registration support, licensing templates, and portfolio audits for digital and physical assets.",
        "card-counsel-title": "Local Counsel Outsourcing",
        "card-counsel-desc": "Connect with vetted local IP counsel for filings, oppositions, and portfolio management.",
        "card-view-pricing": "View Pricing",
        
        "comp-title": "Global Compliance & Counsel Standards",
        "comp-desc": "Our network verifies credentials and compliance logs across jurisdictions, ensuring accurate and timely IP protection.",
        "comp-bullet1-bold": "Multi-Jurisdiction Coverage:",
        "comp-bullet1-text": "USPTO, EU IPO, KIPO, WIPO, and more than 100 jurisdictions.",
        "comp-bullet2-bold": "Pre-Filing Checks:",
        "comp-bullet2-text": "Clearance analysis reduces refusal risk and opposition exposure.",
        "comp-bullet3-bold": "Document Integrity:",
        "comp-bullet3-text": "Structured filing packages validated before submission.",
        
        "view-trademark-sub": "Select a jurisdiction and package for trademark filing support.",
        "view-patent-sub": "Choose a review depth and filing tier for your invention.",
        "view-copyright-sub": "Get a structured portfolio review or registration-ready package.",
        "view-outsourcing-sub": "Engage certified local IP advisors for review, filing, and disputes.",
        "view-orders-title": "My Purchase History",
        "view-orders-sub": "Review your successful orders. Your data is stored locally in your browser workspace.",
        
        "th-date": "Order Date",
        "th-order-id": "Transaction ID",
        "th-product": "Product",
        "th-tier": "Package Tier",
        "th-country": "Jurisdiction",
        "th-qty": "Quantity",
        "th-total": "Total Paid",
        "th-status": "Status",
        
        "no-orders-msg": "No purchase records found. Make your first order to see history here!",
        
        "modal-title": "Configure Order",
        "modal-desc": "Select jurisdiction and complete secure PayPal payment.",
        "modal-base-pkg": "Package:",
        "modal-base-price-label": "Base Price:",
        "modal-country-label": "Jurisdiction:",
        "modal-qty": "Quantity:",
        "modal-total-amt": "Total Amount:",
        "modal-test-btn": "Run Sandbox Test Checkout",
        
        "badge-ssl": "SSL Secured Checkout",
        "badge-paypal": "PayPal Verified",
        
        "foot-services": "Services",
        "foot-legal": "Compliance",
        "foot-jurisdiction": "Multi-Jurisdiction Support",
        "foot-review": "Pre-Filing Review",
        "foot-quality": "Document Quality Check",
        "foot-contact": "Contact: snsherocom@gmail.com",
        "foot-copy": "&copy; 2026 BibleForAI IPBOOST. All rights reserved. Trademark and IP consulting services.",
        
        "order-button": "Start Filing",
        "featured-badge": "Best Value",
        
        // Receipts
        "receipt-header": "BIBLEFORAI - IPBOOST RECEIPT",
        "receipt-date": "Order Date",
        "receipt-txid": "Transaction ID",
        "receipt-email": "Customer Email",
        "receipt-type": "Product Type",
        "receipt-size": "Package Size",
        "receipt-country": "Jurisdiction",
        "receipt-qty": "Quantity",
        "receipt-baseprice": "Base Price",
        "receipt-total": "Total Paid",
        "receipt-status": "Status",
        "receipt-method": "Payment Method",
        "receipt-method-val": "PayPal Secure Checkout"
    },
    ko: {
        "logo-subtitle": "IPBOOST",
        "nav-home": "홈",
        "nav-trademark": "상표",
        "nav-patent": "특허",
        "nav-copyright": "저작권",
        "nav-outsourcing": "로컬 특허법률사무소",
        "btn-orders": "내 주문 내역",
        "hero-badge": "AI 기반 브랜드 보호",
        "hero-title": "BibleForAI - IPBOOST",
        "hero-desc": "100개 이상 국가에서 AI 가이드 워크플로와 현지 특허법률사무소 네트워크를 통해 상표·특허·저작권을 출원하세요.",
        "btn-explore": "IP 서비스 시작하기",
        "btn-compliance": "글로벌 커버리지",
        
        "stat-jurisdictions": "지원 지역",
        "stat-accuracy-rate": "출원 준비도",
        "stat-faster": "빠른 준비",
        "stat-delivery": "초기 검토",
        
        "sec-channels-title": "IP 보호 경로 선택",
        "sec-channels-subtitle": "상표, 특허, 저작권, 현지 대응 중 하나를 선택하면 관할국과 일정에 맞춰 지원됩니다.",
        "card-trademark-title": "상표 출원",
        "card-trademark-desc": "브랜드명, 로고, 슬로건의 검색, 클래스 지정 및 글로벌 출원 지원.",
        "card-patent-title": "특허 전략",
        "card-patent-desc": "선행기술 조사, 청구항 작성, 실용신안/디자인 특허 출원 지원.",
        "card-copyright-title": "저작권 및 IP 감사",
        "card-copyright-desc": "등록 준비, 라이선스 템플릿, 포트폴리오 감사 지원.",
        "card-counsel-title": "로컬 특허법률사무소 외부화",
        "card-counsel-desc": "검증된 현지 특허법률사무소와 협업해 출원과 포트폴리오 관리를 진행합니다.",
        "card-view-pricing": "가격 확인하기",
        
        "comp-title": "글로벌 규정 준수 및 대리 기준",
        "comp-desc": "관할별 자격과 준수 로그를 검증하여 정확하고 신속한 IP 보호를 지원합니다.",
        "comp-bullet1-bold": "다중 관할 지원:",
        "comp-bullet1-text": "USPTO, EU IPO, KIPO, WIPO 등 100개 이상 관할覆盖.",
        "comp-bullet2-bold": "출원 전 검증:",
        "comp-bullet2-text": " clearance 분석으로 거절 위험과 이의 노출을 낮춥니다.",
        "comp-bullet3-bold": "서류 무결성:",
        "comp-bullet3-text": "제출 전 structured package를 자동 검증합니다.",
        
        "view-trademark-sub": "관할국과 패키지를 선택하여 상표 출원을 시작하세요.",
        "view-patent-sub": "발명에 맞는 조사 범위와 출원 단계를 선택하세요.",
        "view-copyright-sub": "포트폴리오 감사 또는 등록 준비 패키지를 선택하세요.",
        "view-outsourcing-sub": "검증된 현지 특허법률사무소와 검토, 출원, 분쟁을 진행하세요.",
        "view-orders-title": "내 구매 히스토리",
        "view-orders-sub": "성공한 주문 내역을 검토하세요. 데이터는 브라우저 로컬스토리지에 안전하게 보관됩니다.",
        
        "th-date": "주문 날짜",
        "th-order-id": "트랜잭션 ID",
        "th-product": "상품명",
        "th-tier": "패키지 등급",
        "th-country": "관할",
        "th-qty": "수량",
        "th-total": "총 결제금액",
        "th-status": "상태",
        
        "no-orders-msg": "구매 기록이 없습니다. 첫 주문을 완료하시면 내역이 여기에 표시됩니다!",
        
        "modal-title": "주문 설정",
        "modal-desc": "관할을 선택하고 안전한 PayPal 결제를 진행하세요.",
        "modal-base-pkg": "패키지:",
        "modal-base-price-label": "기본 가격:",
        "modal-country-label": "관할:",
        "modal-qty": "수량:",
        "modal-total-amt": "총 결제금액:",
        "modal-test-btn": "샌드박스 테스트 결제 진행",
        
        "badge-ssl": "SSL 보안 결제 지원",
        "badge-paypal": "PayPal 인증됨",
        
        "foot-services": "서비스",
        "foot-legal": "규정 준수",
        "foot-jurisdiction": "다중 관할 지원",
        "foot-review": "출원 전 검증",
        "foot-quality": "서류 품질 검사",
        "foot-contact": "문의: snsherocom@gmail.com",
        "foot-copy": "&copy; 2026 BibleForAI IPBOOST. All rights reserved. 상표 및 IP 컨설팅 서비스.",
        
        "order-button": "출원 시작",
        "featured-badge": "추천",
        
        // Receipts
        "receipt-header": "BIBLEFORAI - IPBOOST 영수증",
        "receipt-date": "주문 날짜",
        "receipt-txid": "트랜잭션 ID",
        "receipt-email": "고객 이메일",
        "receipt-type": "상품 종류",
        "receipt-size": "패키지 크기",
        "receipt-country": "관할",
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
    
    // Update document title
    document.title = isKo ? "BibleForAI - IPBOOST | 글로벌 상표 및 IP 출원" : "BibleForAI - IPBOOST | Global TradeMark & IP Registration";

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.content = isKo ? "AI 기반 글로벌 상표, 특허, 저작권 출원 및 IP 컨설팅" : "AI-powered global trademark, patent, and IP registration consulting.";
    }

    // Update Open Graph / Twitter
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.content = isKo ? "BibleForAI - IPBOOST | 글로벌 상표 및 IP 출원" : "BibleForAI - IPBOOST | Global TradeMark & IP Registration";
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.content = isKo ? "100+ 국가에서 AI 기반 IP 보호 및 상표·특허 출원" : "Protect your brand worldwide with AI-powered IP consulting.";
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.content = ogTitle.content;
    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) twDesc.content = ogDesc.content;

    // Update text
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
    if (selector) selector.value = lang;
}

function changeLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('bibleforai_lang', lang);
    applyTranslations();
    renderAllPackages();
    renderOrders();
}

document.addEventListener('DOMContentLoaded', () => {
    applyTranslations();
    renderAllPackages();
    renderOrders();
    setupHeaderScroll();
});

function setupHeaderScroll() {
    const header = document.getElementById('app-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
    });
}

function navigate(viewId) {
    currentView = viewId;
    document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
    const activeSection = document.getElementById(`${viewId}-view`);
    if (activeSection) activeSection.classList.add('active');
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.id === `nav-${viewId}`) link.classList.add('active');
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleMobileMenu() {
    document.getElementById('mobile-drawer').classList.toggle('active');
}

function renderAllPackages() {
    const isKo = currentLang === 'ko';
    Object.keys(packageCatalog).forEach(categoryKey => {
        const categoryData = packageCatalog[categoryKey];
        const container = document.getElementById(`${categoryKey}-packages`);
        if (!container) return;
        container.innerHTML = categoryData.packages.map(pkg => {
            const featuredClass = pkg.featured ? 'featured' : '';
            const name = isKo ? pkg.name_ko : pkg.name_en;
            const desc = isKo ? pkg.desc_ko : pkg.desc_en;
            const features = isKo ? pkg.features_ko : pkg.features_en;
            const btnText = translations[currentLang]['order-button'] || 'Start Filing';
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
                        ${btnText}
                    </button>
                </div>
            `;
        }).join('');
    });
}

function openPurchaseModal(categoryKey, packageId) {
    const category = packageCatalog[categoryKey];
    const pkg = category.packages.find(p => p.id === packageId);
    if (!pkg) return;
    const isKo = currentLang === 'ko';
    const catTitle = isKo ? category.title_ko : category.title_en;
    const pkgName = isKo ? pkg.name_ko : pkg.name_en;
    currentPackage = { categoryKey, categoryName: catTitle, tierName: pkgName, basePrice: pkg.price };
    orderQuantity = 1;
    document.getElementById('modal-product-title').innerText = `${catTitle}`;
    document.getElementById('modal-package-name').innerText = pkgName;
    document.getElementById('modal-base-price').innerText = formatPrice(pkg.price);
    document.getElementById('order-quantity').value = 1;
    const emailInput = document.getElementById('order-email');
    if (emailInput) { emailInput.value = ''; emailInput.style.borderColor = 'var(--border)'; }
    document.getElementById('email-error').style.display = 'none';
    updateModalPrice();
    document.getElementById('purchase-modal').classList.add('active');
    setTimeout(() => { const modalCard = document.querySelector('.modal-card'); const totalBox = document.querySelector('.total-price-box'); if (modalCard && totalBox) modalCard.scrollTop = totalBox.offsetTop - 10; }, 800);
    initPayPalButtons();
}

function closeModal() {
    document.getElementById('purchase-modal').classList.remove('active');
    const container = document.getElementById('paypal-button-container');
    if (container) container.innerHTML = '';
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
    if (isNaN(val) || val < 1) val = 1;
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
    }
    emailInput.style.borderColor = 'var(--border)';
    if (emailError) emailError.style.display = 'none';
    return true;
}

function triggerTestCheckout() {
    const emailInput = document.getElementById('order-email');
    if (emailInput && !emailInput.value.trim()) {
        emailInput.value = 'sandbox@test.dev';
        emailInput.style.borderColor = 'var(--border)';
        document.getElementById('email-error').style.display = 'none';
    }
    if (!validateEmailField()) return;
    const mockDetails = { id: 'TEST-PAYID-' + Math.random().toString(36).substr(2, 9).toUpperCase(), isTest: true };
    saveLocalOrder(mockDetails);
    closeModal();
}

function initPayPalButtons() {
    const container = document.getElementById('paypal-button-container');
    if (!container) return;
    if (typeof paypal === 'undefined') {
        container.innerHTML = '<p style="color:#ef4444;text-align:center;font-size:0.9rem;padding:1rem;font-weight:600;"><i class="fa-solid fa-triangle-exclamation"></i> PayPal system is currently unavailable.</p>';
        return;
    }
    paypal.Buttons({
        style: { layout: 'vertical', color: 'blue', shape: 'rect', label: 'checkout' },
        onClick: function(data, actions) { if (!validateEmailField()) return actions.reject(); return actions.resolve(); },
        createOrder: function(data, actions) {
            const selectedCountry = document.getElementById('order-country').value;
            const finalAmount = (currentPackage.basePrice * orderQuantity).toFixed(2);
            return actions.order.create({
                purchase_units: [{
                    description: `${currentPackage.categoryName} - ${currentPackage.tierName} [${selectedCountry}] (Qty: ${orderQuantity})`,
                    amount: { currency_code: 'USD', value: finalAmount }
                }]
            });
        },
        onApprove: function(data, actions) { return actions.order.capture().then(function(details) { saveLocalOrder(details); closeModal(); }); },
        onError: function(err) { console.error('PayPal error:', err); alert('Payment error. Try again.'); }
    }).render('#paypal-button-container');
}

function saveLocalOrder(details) {
    const orderLogs = JSON.parse(localStorage.getItem('ipboost_orders')) || [];
    const selectedCountry = document.getElementById('order-country').value;
    const emailVal = document.getElementById('order-email') ? document.getElementById('order-email').value.trim() : '';
    const newOrder = {
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
        id: details.id,
        email: emailVal,
        category: currentPackage.categoryName,
        package: currentPackage.tierName,
        country: selectedCountry,
        quantity: orderQuantity,
        basePrice: currentPackage.basePrice,
        totalPaid: formatPrice(currentPackage.basePrice * orderQuantity),
        status: 'Completed'
    };
    orderLogs.unshift(newOrder);
    localStorage.setItem('ipboost_orders', JSON.stringify(orderLogs));
    renderOrders();
    const isKo = currentLang === 'ko';
    const dict = translations[currentLang];
    const receiptText = `===================================\n   ${dict["receipt-header"]}\n===================================\n${dict["receipt-date"].padEnd(15)} : ${newOrder.date}\n${dict["receipt-txid"].padEnd(15)} : ${newOrder.id}\n${dict["receipt-email"].padEnd(15)} : ${newOrder.email}\n${dict["receipt-type"].padEnd(15)} : ${newOrder.category}\n${dict["receipt-size"].padEnd(15)} : ${newOrder.package}\n${dict["receipt-country"].padEnd(15)} : ${newOrder.country}\n${dict["receipt-qty"].padEnd(15)} : ${newOrder.quantity}\n${dict["receipt-baseprice"].padEnd(15)} : ${formatPrice(newOrder.basePrice)}\n${dict["receipt-total"].padEnd(15)} : ${newOrder.totalPaid}\n${dict["receipt-status"].padEnd(15)} : ${isKo ? "완료됨" : newOrder.status}\n-----------------------------------\n${dict["receipt-method"].padEnd(15)} : ${dict["receipt-method-val"]}\n===================================`;
    const encodedReceipt = encodeURIComponent(receiptText);
    const redirectUrl = `https://docs.google.com/forms/d/e/1FAIpQLScMPqbEWWttS5mb1m_krsO_kco24ImpgvYVSbc7zO0nEVmYFw/viewform?entry.1059822061=${encodedReceipt}`;
    window.location.href = redirectUrl;
}

function renderOrders() {
    const orderLogs = JSON.parse(localStorage.getItem('ipboost_orders')) || [];
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
            <td>${order.country || 'Global'}</td>
            <td>${order.quantity}</td>
            <td><strong>${order.totalPaid}</strong></td>
            <td><span class="status-badge">${isKo ? "완료됨" : order.status}</span></td>
        </tr>
    `).join('');
}
