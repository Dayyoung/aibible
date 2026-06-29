// App State
let currentView = 'home';
let currentPackage = null;
let orderQuantity = 1;
let paypalButtonInstance = null;

// Package Catalog with Localized Keys
const packageCatalog = {
    phone: {
        title_en: 'Medical Document Translation',
        title_ko: '의료 문서 번역',
        packages: [
            { id: 'phone-basic', name_en: 'Starter Package', name_ko: '스타터 패키지', desc_en: 'Translate patient letters, summaries, and general medical copy with terminology-aware QA.', desc_ko: '환자 안내문, 요약본, 일반 의료 카피를 용어 검수와 함께 번역합니다.', price: 7, featured: false, features_en: ['Terminology-aware QA', 'PDF / DOCX delivery', '2 revision rounds', 'Fast turnaround'], features_ko: ['용어 검수 포함', 'PDF / DOCX 제공', '2회 수정 반영', '빠른 납기'] }
        ]
    },
    whatsapp: {
        title_en: 'Clinical Trial Localization',
        title_ko: '임상시험 현지화',
        packages: [
            { id: 'whatsapp-basic', name_en: 'Study Package', name_ko: '스터디 패키지', desc_en: 'Localize protocols, consent forms, and research materials for global study teams.', desc_ko: '프로토콜, 동의서, 연구 자료를 글로벌 시험팀용으로 현지화합니다.', price: 14, featured: true, features_en: ['Protocol QA', 'IRB-friendly phrasing', 'Glossary management', 'Priority support'], features_ko: ['프로토콜 QA', 'IRB 친화 문구', '용어집 관리', '우선 지원'] }
        ]
    },
    telegram: {
        title_en: 'Regulatory Labeling Translation',
        title_ko: '규제·라벨 번역',
        packages: [
            { id: 'telegram-basic', name_en: 'Label Package', name_ko: '라벨 패키지', desc_en: 'Translate drug labels, IFUs, inserts, and compliance-ready regulatory copy.', desc_ko: '의약품 라벨, IFU, 삽입물, 규제 대응 문안을 번역합니다.', price: 21, featured: false, features_en: ['Regulatory terminology', 'Consistency checks', 'Layout-safe wording', 'Fast delivery'], features_ko: ['규제 용어 검수', '일관성 검증', '레이아웃 안전 문구', '신속 납품'] }
        ]
    },
    email: {
        title_en: 'Medical Website Localization',
        title_ko: '의료 웹사이트 현지화',
        packages: [
            { id: 'email-basic', name_en: 'Web Package', name_ko: '웹 패키지', desc_en: 'Adapt landing pages, product pages, and patient resources for global search.', desc_ko: '랜딩 페이지, 제품 페이지, 환자 자료를 글로벌 검색 환경에 맞게 현지화합니다.', price: 14, featured: false, features_en: ['SEO-aware copy', 'UI text adaptation', 'CTA localization', 'Responsive QA'], features_ko: ['SEO 고려 문구', 'UI 텍스트 적응', 'CTA 현지화', '반응형 QA'] }
        ]
    },
    clevel: {
        title_en: 'Terminology QA & DTP',
        title_ko: '용어 QA & DTP',
        packages: [
            { id: 'clevel-basic', name_en: 'QA Package', name_ko: 'QA 패키지', desc_en: 'Proofread medical terminology, finalize layouts, and deliver publication-ready files.', desc_ko: '의학 용어를 검수하고 레이아웃을 완성해 출판 가능한 파일로 전달합니다.', price: 21, featured: false, features_en: ['Terminology audit', 'Desktop publishing', 'Final formatting', 'Publication-ready handoff'], features_ko: ['용어 감사', 'DTP 작업', '최종 서식 정리', '출판용 전달'] }
        ]
    }
};

// Translation Dictionary
const translations = {
    en: {
        "logo-subtitle": "MEDICAL LOCALIZATION!",
        "nav-home": "Home",
        "nav-phone": "Medical Docs",
        "nav-whatsapp": "Clinical Trials",
        "nav-telegram": "Regulatory",
        "nav-email": "Localization",
        "nav-clevel": "QA & DTP",
        "btn-orders": "My Orders",
        "hero-badge": "KMONG-Sourced Medical Service",
        "hero-title": "MEDBOOST — Clinical Translation & Localization",
        "hero-desc": "Translate medical content with terminology-aware QA for global teams, startups, and regulated brands.",
        "btn-explore": "Explore Services",
        "btn-compliance": "Review QA Flow",
        "stat-global-numbers": "Specialties",
        "stat-accuracy-rate": "Terminology QA",
        "stat-opt-in": "Source Price",
        "stat-delivery": "USD Pricing",
        "sec-channels-title": "Choose Your Medical Localization Path",
        "sec-channels-subtitle": "Select the right medical translation workflow for documents, trials, labeling, websites, and QA deliverables.",
        "card-phone-title": "Medical Document Translation",
        "card-phone-desc": "Translate patient letters, clinical briefs, brochures, and safety notes with terminology-aware QA.",
        "card-whatsapp-title": "Clinical Trial Localization",
        "card-whatsapp-desc": "Localize protocol summaries, consent forms, and investigator materials for global study teams.",
        "card-telegram-title": "Regulatory Labeling",
        "card-telegram-desc": "Translate drug labels, IFUs, package inserts, and compliance-ready regulatory copy.",
        "card-email-title": "Medical Website Localization",
        "card-email-desc": "Adapt landing pages, product pages, and patient resources for search-friendly global markets.",
        "card-clevel-title": "Terminology QA & DTP",
        "card-clevel-desc": "Proofread medical terminology, finalize layouts, and deliver polished publication-ready files.",
        "card-view-pricing": "View Pricing",
        "comp-title": "Medical QA & Content Safety",
        "comp-desc": "Our workflow combines terminology review, human QA, and layout checks to keep regulated medical content accurate and publication-ready.",
        "comp-bullet1-bold": "Terminology QA:",
        "comp-bullet1-text": "Glossary checks for drug names, procedures, and medical terms.",
        "comp-bullet2-bold": "Layout-Safe:",
        "comp-bullet2-text": "Text is adapted to preserve formatting, tables, and callouts.",
        "comp-bullet3-bold": "Human Review:",
        "comp-bullet3-text": "Native review for clarity, compliance, and audience fit.",
        "view-phone-sub": "Translate patient letters, summaries, and general medical copy with terminology-aware QA.",
        "view-whatsapp-sub": "Localize protocols, consent forms, and research materials for global study teams.",
        "view-telegram-sub": "Translate drug labels, IFUs, inserts, and compliance-ready regulatory copy.",
        "view-email-sub": "Adapt landing pages, product pages, and patient resources for global search.",
        "view-clevel-sub": "Proofread terminology, finalize layouts, and deliver publication-ready files.",
        "view-orders-title": "My Purchase History",
        "view-orders-sub": "Review your successful orders. Your data is stored locally in your browser workspace.",
        "th-date": "Order Date",
        "th-order-id": "Transaction ID",
        "th-product": "Product",
        "th-tier": "Package Tier",
        "th-country": "Language Pair",
        "th-qty": "Quantity",
        "th-total": "Total Paid",
        "th-status": "Status",
        "no-orders-msg": "No purchase records found. Make your first order to see history here!",
        "modal-title": "Configure Medical Order",
        "modal-desc": "Choose quantity and complete secure PayPal checkout.",
        "modal-base-pkg": "Service:",
        "modal-base-price-label": "Base Price:",
        "modal-email-label": "Email Address *",
        "modal-email-placeholder": "name@company.com",
        "modal-email-error": "Please enter a valid email address.",
        "modal-country-label": "Target Language Pair:",
        "modal-qty": "Quantity:",
        "modal-total-amt": "Total Amount:",
        "modal-test-btn": "Click price to test checkout",
        "badge-ssl": "SSL Secured Checkout",
        "badge-paypal": "PayPal Verified",
        "foot-channels": "Services",
        "foot-legal": "Medical QA",
        "foot-gdpr": "Terminology Review",
        "foot-canspam": "Layout Checks",
        "foot-match": "Source Price Matched",
        "foot-contact": "Contact support: snsherocom@gmail.com",
        "foot-copy": "&copy; 2026 BibleForAI MEDBOOST. All rights reserved. Medical translation & localization.",
        "order-button": "Order Medical Package",
        "featured-badge": "Recommended",
        "receipt-header": "MEDBOOST RECEIPT",
        "receipt-date": "Order Date",
        "receipt-txid": "Transaction ID",
        "receipt-email": "Customer Email",
        "receipt-type": "Service Type",
        "receipt-size": "Package",
        "receipt-country": "Language Pair",
        "receipt-qty": "Quantity",
        "receipt-baseprice": "Base Price",
        "receipt-total": "Total Paid",
        "receipt-status": "Status",
        "receipt-method": "Payment Method",
        "receipt-method-val": "PayPal Secure Checkout"
    },
    ko: {
        "logo-subtitle": "의료 현지화!",
        "nav-home": "홈",
        "nav-phone": "의료 문서",
        "nav-whatsapp": "임상시험",
        "nav-telegram": "규제",
        "nav-email": "현지화",
        "nav-clevel": "QA & DTP",
        "btn-orders": "내 주문 내역",
        "hero-badge": "KMONG 기반 의료 서비스",
        "hero-title": "MEDBOOST — 의료 번역·현지화",
        "hero-desc": "의료 콘텐츠를 용어 검수와 함께 글로벌 팀, 스타트업, 규제 산업에 맞게 번역·현지화합니다.",
        "btn-explore": "서비스 둘러보기",
        "btn-compliance": "QA 흐름 보기",
        "stat-global-numbers": "전문 분야",
        "stat-accuracy-rate": "용어 QA",
        "stat-opt-in": "원본 가격",
        "stat-delivery": "USD 가격",
        "sec-channels-title": "의료 번역·현지화 경로를 선택하세요",
        "sec-channels-subtitle": "문서, 임상, 라벨링, 웹사이트, QA 작업에 맞는 의료 번역 워크플로를 선택하세요.",
        "card-phone-title": "의료 문서 번역",
        "card-phone-desc": "환자 안내문, 임상 개요서, 브로슈어, 안전 주의사항을 용어 검수와 함께 번역합니다.",
        "card-whatsapp-title": "임상시험 현지화",
        "card-whatsapp-desc": "프로토콜 요약, 동의서, 연구 자료를 글로벌 시험팀용으로 현지화합니다.",
        "card-telegram-title": "규제·라벨 번역",
        "card-telegram-desc": "의약품 라벨, IFU, 패키지 인서트, 규제 대응 문안을 번역합니다.",
        "card-email-title": "의료 웹사이트 현지화",
        "card-email-desc": "랜딩 페이지, 제품 페이지, 환자 자료를 검색 친화적으로 현지화합니다.",
        "card-clevel-title": "용어 QA & DTP",
        "card-clevel-desc": "의학 용어를 검수하고 레이아웃을 완성해 출판 가능한 파일로 전달합니다.",
        "card-view-pricing": "가격 확인",
        "comp-title": "의료 QA 및 콘텐츠 안전",
        "comp-desc": "용어 검수, 사람 검수, 레이아웃 점검을 결합해 규제 의료 콘텐츠를 정확하고 출판 가능하게 유지합니다.",
        "comp-bullet1-bold": "용어 QA:",
        "comp-bullet1-text": "의약품명, 절차, 의료 용어에 대한 용어집 검수.",
        "comp-bullet2-bold": "레이아웃 안전:",
        "comp-bullet2-text": "서식, 표, 주석을 유지하도록 텍스트를 조정합니다.",
        "comp-bullet3-bold": "사람 검수:",
        "comp-bullet3-text": "명확성, 규정 준수, 대상 독자 적합성을 위한 원어민 검수.",
        "view-phone-sub": "환자 안내문, 요약본, 일반 의료 카피를 용어 검수와 함께 번역합니다.",
        "view-whatsapp-sub": "프로토콜, 동의서, 연구 자료를 글로벌 시험팀용으로 현지화합니다.",
        "view-telegram-sub": "의약품 라벨, IFU, 패키지 인서트, 규제 대응 문안을 번역합니다.",
        "view-email-sub": "랜딩 페이지, 제품 페이지, 환자 자료를 글로벌 검색 환경에 맞게 현지화합니다.",
        "view-clevel-sub": "용어를 검수하고 레이아웃을 완성해 출판 가능한 파일로 전달합니다.",
        "view-orders-title": "구매 내역",
        "view-orders-sub": "성공한 주문 내역을 검토하세요. 데이터는 브라우저 로컬스토리지에 보관됩니다.",
        "th-date": "주문 날짜",
        "th-order-id": "거래 ID",
        "th-product": "상품명",
        "th-tier": "패키지 등급",
        "th-country": "언어쌍",
        "th-qty": "수량",
        "th-total": "총 결제금액",
        "th-status": "상태",
        "no-orders-msg": "구매 기록이 없습니다. 첫 주문을 완료하면 여기에서 확인할 수 있습니다.",
        "modal-title": "의료 주문 설정",
        "modal-desc": "수량을 선택하고 안전한 PayPal 결제를 진행하세요.",
        "modal-base-pkg": "서비스:",
        "modal-base-price-label": "기본 가격:",
        "modal-email-label": "이메일 주소 *",
        "modal-email-placeholder": "name@company.com",
        "modal-email-error": "올바른 이메일 주소를 입력해주세요.",
        "modal-country-label": "대상 언어쌍:",
        "modal-qty": "수량:",
        "modal-total-amt": "총 결제금액:",
        "modal-test-btn": "가격 텍스트를 눌러 테스트 결제",
        "badge-ssl": "SSL 보안 결제",
        "badge-paypal": "PayPal 인증됨",
        "foot-channels": "서비스",
        "foot-legal": "의료 QA",
        "foot-gdpr": "용어 검수",
        "foot-canspam": "레이아웃 점검",
        "foot-match": "원본 가격 반영",
        "foot-contact": "문의 지원: snsherocom@gmail.com",
        "foot-copy": "&copy; 2026 BibleForAI MEDBOOST. All rights reserved. 의료 번역·현지화 서비스.",
        "order-button": "의료 패키지 주문",
        "featured-badge": "추천",
        "receipt-header": "MEDBOOST 영수증",
        "receipt-date": "주문 날짜",
        "receipt-txid": "거래 ID",
        "receipt-email": "고객 이메일",
        "receipt-type": "서비스 종류",
        "receipt-size": "패키지",
        "receipt-country": "언어쌍",
        "receipt-qty": "수량",
        "receipt-baseprice": "기본 가격",
        "receipt-total": "총 결제금액",
        "receipt-status": "상태",
        "receipt-method": "결제 수단",
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
    
    // Set document lang attribute
    document.documentElement.lang = lang;
    
    // Update document title and metadata
    document.title = isKo ? "BibleForAI - MEDBOOST | 의료 번역·현지화" : "BibleForAI - MEDBOOST | Medical Translation & Localization";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.content = isKo ? 
            "AI 서비스를 사용하여 합법적이고 GDPR을 준수하며 98% 정확한 전화번호, 왓츠앱, 텔레그램 및 B2B 이메일 고객 데이터 리스트를 확보하세요." : 
            "Medical translation and localization for clinical documents, trial materials, labeling, and patient-facing content with terminology-aware QA.";
    }

    // Update Open Graph (OG) and Twitter Metadata tags dynamically
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
        ogTitle.content = isKo ? "BibleForAI - MEDBOOST | 의료 번역·현지화" : "BibleForAI - MEDBOOST | Medical Translation & Localization";
    }
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
        ogDesc.content = isKo ? 
            "AI 서비스를 사용하여 합법적이고 GDPR을 준수하며 98% 정확한 고객 데이터를 확보하세요. 전화번호, 이메일, 왓츠앱, 텔레그램 리드 생성." : 
            "Clinical document translation, trial localization, labeling QA, and patient-facing medical content for global teams.";
    }
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) {
        twTitle.content = isKo ? "BibleForAI - MEDBOOST | 의료 번역·현지화" : "BibleForAI - MEDBOOST | Medical Translation & Localization";
    }
    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) {
        twDesc.content = isKo ? 
            "AI 서비스를 사용하여 합법적이고 GDPR을 준수하며 98% 정확한 고객 데이터를 확보하세요. 전화번호, 이메일, 왓츠앱, 텔레그램 리드 생성." : 
            "Clinical document translation, trial localization, labeling QA, and patient-facing medical content for global teams.";
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
                        <span class="currency">USD</span>
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
        case 'phone': return 'fa-solid fa-stethoscope';
        case 'whatsapp': return 'fa-solid fa-vial';
        case 'telegram': return 'fa-solid fa-prescription-bottle-medical';
        case 'email': return 'fa-solid fa-globe';
        case 'clevel': return 'fa-solid fa-clipboard-check';
        default: return 'fa-solid fa-database';
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
            const selectedCountry = document.getElementById('order-country').value;
            const finalAmount = (currentPackage.basePrice * orderQuantity).toFixed(2);
            return actions.order.create({
                purchase_units: [{
                    description: `${currentPackage.categoryName} - ${currentPackage.tierName} [Language Pair: ${selectedCountry}] (Qty: ${orderQuantity})`,
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
    const orderLogs = JSON.parse(localStorage.getItem('medboost_orders')) || [];
    const selectedCountry = document.getElementById('order-country').value;
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
        country: selectedCountry,
        quantity: orderQuantity,
        basePrice: currentPackage.basePrice,
        totalPaid: formatPrice(currentPackage.basePrice * orderQuantity),
        status: 'Completed',
        clientId: clientId,
        secret: secret
    };
    
    orderLogs.unshift(newOrder); // Add to beginning
    localStorage.setItem('medboost_orders', JSON.stringify(orderLogs));
    
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
${dict["receipt-country"].padEnd(15)} : ${newOrder.country}
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
    const orderLogs = JSON.parse(localStorage.getItem('medboost_orders')) || [];
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

// Expose variables globally to prevent ReferenceErrors in inline HTML scripts/handlers
if (typeof navigate !== 'undefined') { window.navigate = navigate; }
if (typeof currentLang !== 'undefined') { window.currentLang = currentLang; }

window.openPurchaseModal = openPurchaseModal;
window.closeModal = closeModal;
window.adjustQty = adjustQty;
window.changeLanguage = changeLanguage;
