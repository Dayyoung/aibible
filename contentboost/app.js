// App State
let currentView = 'home';
let currentPackage = null;
let orderQuantity = 1;
let paypalButtonInstance = null;

// Package Catalog with Localized Keys
const packageCatalog = {
    content: {
        title_en: 'Multilingual AI Content System',
        title_ko: '다국어 AI 콘텐츠 시스템',
        packages: [
            { id: 'content-standard', name_en: 'Standard AI Publishing Setup', name_ko: '스탠다드 AI 발행 셋업', desc_en: 'AI content generation, translation, SEO metadata, and publishing workflow setup. Based on Kmong 4-language AI integrated system originally listed from ₩990,000; marked up 2× and converted at ₩1,400 ≈ $1.', desc_ko: 'AI 콘텐츠 생성, 번역, SEO 메타데이터, 발행 워크플로우 셋업. 크몽 4개국어 AI 통합 시스템 990,000원 기준 ×2 마크업 후 환율 1,400원 기준 산정.', price: 1415, featured: false, features_en: ['1 Content Workflow Component', 'AI Draft Generation', 'SEO Meta / Schema Setup', 'Publishing Checklist', '7 Business Day Delivery'], features_ko: ['콘텐츠 워크플로우 1개 컴포넌트', 'AI 초안 생성', 'SEO 메타/스키마 셋업', '발행 체크리스트', '영업일 7일 납품'] },
            { id: 'content-deluxe', name_en: 'Deluxe 4-Language SEO Pipeline', name_ko: '디럭스 4개국어 SEO 파이프라인', desc_en: 'A multilingual publishing pipeline for Korean, English, Japanese, and Chinese with hreflang, canonical, SEO metadata, and automated social copy.', desc_ko: '한국어·영어·일본어·중국어 다국어 발행 파이프라인. hreflang, canonical, SEO 메타데이터, SNS 카피 자동화를 포함합니다.', price: 3558, featured: true, features_en: ['Korean + EN/JP/CN Translation', 'hreflang / Canonical Setup', 'SEO 100 Workflow Checklist', 'SNS Copy Generator', 'CMS Publishing Guide', '14-Day Optimization Window'], features_ko: ['한국어 + 영/일/중 번역', 'hreflang/canonical 셋업', 'SEO 100 워크플로우 체크리스트', 'SNS 카피 생성기', 'CMS 발행 가이드', '14일 최적화 기간'] },
            { id: 'content-premium', name_en: 'Premium AI Media Engine', name_ko: '프리미엄 AI 미디어 엔진', desc_en: 'Full AI publishing system with multi-language content, SEO automation, social scheduling, analytics notes, and founder/operator handoff.', desc_ko: '다국어 콘텐츠, SEO 자동화, SNS 예약 발행, 분석 노트, 운영자 인수인계까지 포함한 풀 AI 발행 시스템입니다.', price: 8558, featured: false, features_en: ['Full 4-Component System', 'Content + Translation + SEO + SNS', 'Analytics and Tracking Notes', 'Prompt / Workflow Documentation', 'Operator Handoff Session', '30-Day Support Window'], features_ko: ['4개 컴포넌트 풀 시스템', '콘텐츠+번역+SEO+SNS', '분석 및 트래킹 노트', '프롬프트/워크플로우 문서', '운영자 인수인계 세션', '30일 지원 기간'] }
        ]
    }
};

// Translation Dictionary
const translations = {
    en: {
        "logo-subtitle": "CONTENTBOOST!",
        "nav-home": "Home",
        "nav-content": "AI Publishing",
        "btn-orders": "My Orders",
        "hero-badge": "AI-Powered Multilingual Publishing",
        "hero-title": "BibleForAI - CONTENTBOOST!",
        "hero-desc": "Build a multilingual AI content engine that generates, translates, optimizes, and distributes your business content globally.",
        "btn-explore": "Explore Publishing Packages",
        "btn-compliance": "How It Works",
        "stat-markets": "Languages",
        "stat-countries": "Workflow Components",
        "stat-rating": "SEO-Ready",
        "stat-delivery": "Avg Setup",
        "sec-channels-title": "Launch a Global AI Publishing Workflow",
        "sec-channels-subtitle": "Turn Korean content into English, Japanese, and Chinese SEO assets with AI-assisted generation, localization, metadata, and social distribution.",
        "card-amazon-title": "AI Content Generation",
        "card-amazon-desc": "Convert topics, RSS feeds, briefs, or notes into publication-ready drafts with repeatable prompt workflows.",
        "card-shopee-title": "4-Language Localization",
        "card-shopee-desc": "Expand content across Korean, English, Japanese, and Chinese with terminology consistency and tone control.",
        "card-lazada-title": "SEO Metadata Automation",
        "card-lazada-desc": "Prepare titles, descriptions, OG tags, JSON-LD, hreflang, and canonical signals for multilingual search visibility.",
        "card-rakuten-title": "Social Distribution",
        "card-rakuten-desc": "Generate platform-specific social copy and scheduling notes for X, Threads, LinkedIn, newsletters, and blogs.",
        "card-global-title": "Operator Handoff",
        "card-global-desc": "Receive clear workflow documentation, prompt libraries, and handoff guidance so your team can keep publishing.",
        "card-view-pricing": "View Pricing",
        "comp-title": "From Manual Content Work to AI Publishing System",
        "comp-desc": "CONTENTBOOST adapts a Kmong 4-language AI integrated publishing system into an internationally usable workflow for media teams, exporters, SaaS brands, founders, and content-led businesses.",
        "comp-bullet1-bold": "Generation:",
        "comp-bullet1-text": "AI-assisted article, blog, newsletter, and social draft creation from repeatable source inputs.",
        "comp-bullet2-bold": "Global SEO:",
        "comp-bullet2-text": "Multilingual SEO structure includes hreflang/canonical planning, metadata, schema, and localized keyword notes.",
        "comp-bullet3-bold": "Operations:",
        "comp-bullet3-text": "Premium packages include workflow documentation, publishing QA, social distribution notes, and operator handoff.",
        "view-content-sub": "Choose a content automation package. We convert your publishing process into a multilingual AI workflow that is ready for global SEO and social distribution.",
        "view-orders-title": "My Purchase History",
        "view-orders-sub": "Review your successful orders. Your data is stored locally in your browser workspace.",
        "th-date": "Order Date",
        "th-order-id": "Transaction ID",
        "th-product": "Product",
        "th-tier": "Package Tier",
        "th-market": "Content Goal",
        "th-qty": "Quantity",
        "th-total": "Total Paid",
        "th-status": "Status",
        "no-orders-msg": "No purchase records found. Make your first order to see history here!",
        "modal-title": "Configure Order",
        "modal-desc": "Describe your content goal and complete secure PayPal payment.",
        "modal-base-pkg": "Base Package:",
        "modal-base-price-label": "Base Price:",
        "modal-email-label": "Email Address *",
        "modal-email-placeholder": "name@example.com",
        "modal-email-error": "Please enter a valid email address.",
        "modal-market-label": "Content Goal:",
        "modal-qty": "Quantity:",
        "modal-total-amt": "Total Amount:",
        "modal-test-btn": "Click price to test checkout",
        "badge-ssl": "SSL Secured Checkout",
        "badge-paypal": "PayPal Verified",
        "foot-channels": "AI Publishing",
        "foot-legal": "Service and Support",
        "foot-gdpr": "SEO Metadata Ready",
        "foot-canspam": "Multilingual Workflow",
        "foot-match": "Operator Handoff",
        "foot-contact": "Contact support: snsherocom@gmail.com",
        "foot-copy": "BibleForAI CONTENTBOOST. All rights reserved. Multilingual AI Content System.",
        "order-button": "Order Package",
        "featured-badge": "Best Seller",
        "receipt-header": "BIBLEFORAI - CONTENTBOOST RECEIPT",
        "receipt-date": "Order Date",
        "receipt-txid": "Transaction ID",
        "receipt-email": "Customer Email",
        "receipt-type": "Product Type",
        "receipt-size": "Package Size",
        "receipt-market": "Content Goal",
        "receipt-qty": "Quantity",
        "receipt-baseprice": "Base Price",
        "receipt-total": "Total Paid",
        "receipt-status": "Status",
        "receipt-method": "Payment Method",
        "receipt-method-val": "PayPal Secure Checkout"
    },
    ko: {
        "logo-subtitle": "CONTENTBOOST!",
        "nav-home": "홈",
        "nav-content": "AI 발행",
        "btn-orders": "내 주문 내역",
        "hero-badge": "AI 기반 다국어 발행",
        "hero-title": "BibleForAI - CONTENTBOOST!",
        "hero-desc": "생성, 번역, SEO 최적화, 배포까지 연결되는 다국어 AI 콘텐츠 엔진을 구축하세요.",
        "btn-explore": "발행 패키지 보기",
        "btn-compliance": "진행 방식 보기",
        "stat-markets": "지원 언어",
        "stat-countries": "워크플로우 컴포넌트",
        "stat-rating": "SEO 준비",
        "stat-delivery": "평균 셋업",
        "sec-channels-title": "글로벌 AI 발행 워크플로우 구축",
        "sec-channels-subtitle": "한국어 콘텐츠를 영어·일본어·중국어 SEO 자산으로 확장하고 생성, 현지화, 메타데이터, SNS 배포를 자동화합니다.",
        "card-amazon-title": "AI 콘텐츠 생성",
        "card-amazon-desc": "주제, RSS, 브리프, 메모를 반복 가능한 프롬프트 워크플로우로 발행 가능한 초안으로 전환합니다.",
        "card-shopee-title": "4개국어 현지화",
        "card-shopee-desc": "한국어·영어·일본어·중국어 콘텐츠로 확장하며 용어 일관성과 톤을 관리합니다.",
        "card-lazada-title": "SEO 메타데이터 자동화",
        "card-lazada-desc": "타이틀, 설명, OG 태그, JSON-LD, hreflang, canonical 시그널을 준비합니다.",
        "card-rakuten-title": "SNS 배포",
        "card-rakuten-desc": "X, Threads, LinkedIn, 뉴스레터, 블로그용 플랫폼별 SNS 카피와 발행 메모를 생성합니다.",
        "card-global-title": "운영자 인수인계",
        "card-global-desc": "팀이 계속 발행할 수 있도록 워크플로우 문서, 프롬프트 라이브러리, 인수인계 가이드를 제공합니다.",
        "card-view-pricing": "가격 확인하기",
        "comp-title": "수작업 콘텐츠 운영에서 AI 발행 시스템으로",
        "comp-desc": "CONTENTBOOST는 크몽 4개국어 AI 통합 발행 시스템을 미디어팀, 수출기업, SaaS 브랜드, 창업자에게 맞는 글로벌 워크플로우로 재구성합니다.",
        "comp-bullet1-bold": "생성:",
        "comp-bullet1-text": "반복 가능한 입력을 기반으로 기사, 블로그, 뉴스레터, SNS 초안을 AI로 생성합니다.",
        "comp-bullet2-bold": "글로벌 SEO:",
        "comp-bullet2-text": "hreflang/canonical, 메타데이터, 스키마, 현지화 키워드 노트를 포함한 다국어 SEO 구조를 설계합니다.",
        "comp-bullet3-bold": "운영:",
        "comp-bullet3-text": "프리미엄 패키지는 워크플로우 문서, 발행 QA, SNS 배포 노트, 운영자 인수인계를 포함합니다.",
        "view-content-sub": "콘텐츠 자동화 패키지를 선택하세요. 발행 프로세스를 글로벌 SEO와 SNS 배포가 가능한 다국어 AI 워크플로우로 전환합니다.",
        "view-orders-title": "내 구매 히스토리",
        "view-orders-sub": "성공한 주문 내역을 검토하세요. 데이터는 브라우저 로컬스토리지에 안전하게 보관됩니다.",
        "th-date": "주문 날짜",
        "th-order-id": "트랜잭션 ID",
        "th-product": "상품명",
        "th-tier": "패키지 등급",
        "th-market": "콘텐츠 목표",
        "th-qty": "수량",
        "th-total": "총 결제금액",
        "th-status": "상태",
        "no-orders-msg": "구매 기록이 없습니다. 첫 주문을 완료하시면 내역이 여기에 표시됩니다!",
        "modal-title": "주문 설정",
        "modal-desc": "콘텐츠 목표를 입력하고 안전한 PayPal 결제를 진행하세요.",
        "modal-base-pkg": "기본 패키지:",
        "modal-base-price-label": "기본 가격:",
        "modal-email-label": "이메일 주소 *",
        "modal-email-placeholder": "name@example.com",
        "modal-email-error": "올바른 이메일 주소를 입력해주세요.",
        "modal-market-label": "콘텐츠 목표:",
        "modal-qty": "수량:",
        "modal-total-amt": "총 결제금액:",
        "modal-test-btn": "가격 텍스트를 눌러 테스트 결제",
        "badge-ssl": "SSL 보안 결제 지원",
        "badge-paypal": "PayPal 인증됨",
        "foot-channels": "AI 발행",
        "foot-legal": "서비스 및 지원",
        "foot-gdpr": "SEO 메타데이터 준비",
        "foot-canspam": "다국어 워크플로우",
        "foot-match": "운영자 인수인계",
        "foot-contact": "문의 지원: snsherocom@gmail.com",
        "foot-copy": "BibleForAI CONTENTBOOST. All rights reserved. 다국어 AI 콘텐츠 시스템.",
        "order-button": "패키지 주문하기",
        "featured-badge": "베스트 셀러",
        "receipt-header": "BIBLEFORAI - CONTENTBOOST 영수증",
        "receipt-date": "주문 날짜",
        "receipt-txid": "거래 ID",
        "receipt-email": "고객 이메일",
        "receipt-type": "상품 종류",
        "receipt-size": "패키지 크기",
        "receipt-market": "콘텐츠 목표",
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
    
    document.title = isKo ? "BibleForAI - CONTENTBOOST | 다국어 AI 콘텐츠 시스템" : "BibleForAI - CONTENTBOOST | Multilingual AI Content System";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.content = isKo ? 
            "생성, 번역, SEO 메타데이터, SNS 배포를 연결하는 다국어 AI 콘텐츠 발행 시스템을 구축하세요." : 
            "Build a multilingual AI content publishing system with generation, translation, SEO metadata, and social distribution workflows.";
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
        ogTitle.content = isKo ? "BibleForAI - CONTENTBOOST | 다국어 AI 콘텐츠 시스템" : "BibleForAI - CONTENTBOOST | Multilingual AI Content System";
    }
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
        ogDesc.content = isKo ? 
            "AI 생성, 다국어 번역, SEO 메타데이터, SNS 배포를 하나의 발행 워크플로우로 연결하세요." : 
            "Connect AI generation, multilingual translation, SEO metadata, and social distribution in one publishing workflow.";
    }
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) {
        twTitle.content = isKo ? "BibleForAI - CONTENTBOOST | 다국어 AI 콘텐츠 시스템" : "BibleForAI - CONTENTBOOST | Multilingual AI Content System";
    }
    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) {
        twDesc.content = isKo ? 
            "AI 생성, 다국어 번역, SEO 메타데이터, SNS 배포를 하나의 발행 워크플로우로 연결하세요." : 
            "Connect AI generation, multilingual translation, SEO metadata, and social distribution in one publishing workflow.";
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
        case 'content': return 'fa-solid fa-newspaper';
        default: return 'fa-solid fa-newspaper';
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

    const totalEl = document.getElementById('modal-total-price');
    if (totalEl && !totalEl.dataset.checkoutBound) {
        totalEl.style.cursor = 'pointer';
        totalEl.setAttribute('role', 'button');
        totalEl.setAttribute('tabindex', '0');
        totalEl.addEventListener('click', triggerTestCheckout);
        totalEl.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                triggerTestCheckout();
            }
        });
        totalEl.dataset.checkoutBound = '1';
    }
    
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
            const selectedMarket = document.getElementById('order-market').value;
            const finalAmount = (currentPackage.basePrice * orderQuantity).toFixed(2);
            return actions.order.create({
                purchase_units: [{
                    description: `${currentPackage.categoryName} - ${currentPackage.tierName} [Content Goal: ${selectedMarket}] (Qty: ${orderQuantity})`,
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
    const orderLogs = JSON.parse(localStorage.getItem('contentboost_orders')) || [];
    const selectedMarket = document.getElementById('order-market').value;
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
        market: selectedMarket,
        quantity: orderQuantity,
        basePrice: currentPackage.basePrice,
        totalPaid: formatPrice(currentPackage.basePrice * orderQuantity),
        status: 'Completed',
        clientId: clientId,
        secret: secret
    };
    
    orderLogs.unshift(newOrder);
    localStorage.setItem('contentboost_orders', JSON.stringify(orderLogs));
    
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
${dict["receipt-market"].padEnd(15)} : ${newOrder.market}
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
    const orderLogs = JSON.parse(localStorage.getItem('contentboost_orders')) || [];
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

// Expose variables globally to prevent ReferenceErrors in inline HTML scripts/handlers
if (typeof navigate !== 'undefined') { window.navigate = navigate; }
if (typeof currentLang !== 'undefined') { window.currentLang = currentLang; }

window.openPurchaseModal = openPurchaseModal;
window.closeModal = closeModal;
window.adjustQty = adjustQty;
window.changeLanguage = changeLanguage;
