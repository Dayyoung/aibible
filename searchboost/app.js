// App State
let currentView = 'home';
let currentPackage = null;
let orderQuantity = 1;
let paypalButtonInstance = null;

// Package Catalog with Localized Keys
const packageCatalog = {
    seo: {
        title_en: 'AI SEO & Content Marketing',
        title_ko: 'AI SEO & 콘텐츠 마케팅',
        packages: [
            { id: 'seo-starter', name_en: 'Starter — Blog Post + SEO', name_ko: '스타터 — 블로그 포스트 + SEO', desc_en: 'One AI-optimized blog post with keyword research, on-page SEO, and meta tags for a single URL.', desc_ko: '키워드 리서치, 온페이지 SEO, 메타 태그가 포함된 AI 최적화 블로그 포스트 1건.', price: 69, featured: false, features_en: ['1 AI-Optimized Blog Post', 'Keyword Research Report', 'On-Page SEO Setup', 'Meta Title & Description', 'Email Support'], features_ko: ['AI 최적화 블로그 1건', '키워드 리서치 리포트', '온페이지 SEO 설정', '메타 타이틀 및 설명', '이메일 지원'] },
            { id: 'seo-growth', name_en: 'Growth — Full Site Audit', name_ko: '그로스 — 전체 사이트 감사', desc_en: 'Complete SEO audit + 5 blog posts + content strategy. Technical SEO fixes and rank tracking included.', desc_ko: '전체 SEO 감사 + 블로그 5건 + 콘텐츠 전략. 기술적 SEO 수정 및 순위 추적 포함.', price: 279, featured: true, features_en: ['Complete Site SEO Audit', '5 AI Blog Posts', 'Technical SEO Fixes', 'Content Strategy Plan', 'Rank Tracking Dashboard', 'Priority Support'], features_ko: ['전체 사이트 SEO 감사', 'AI 블로그 포스트 5건', '기술적 SEO 수정', '콘텐츠 전략 플랜', '순위 추적 대시보드', '우선 고객 지원'] },
            { id: 'seo-enterprise', name_en: 'Enterprise — Full SEO Suite', name_ko: '엔터프라이즈 — 풀 SEO 스위트', desc_en: 'Ongoing SEO optimization with 20 blog posts/month, backlink building, competitor analysis, and dedicated strategist.', desc_ko: '월 20건 블로그, 백링크 구축, 경쟁사 분석, 전담 전략가가 포함된 지속적인 SEO 최적화.', price: 699, featured: false, features_en: ['20 Blog Posts/Month', 'Backlink Building', 'Competitor Analysis', 'Monthly Strategy Calls', 'Custom Analytics Reports', 'Dedicated SEO Strategist'], features_ko: ['월 20건 블로그 포스트', '백링크 구축', '경쟁사 분석', '월간 전략 미팅', '맞춤 분석 리포트', '전담 SEO 전략가'] }
        ]
    }
};

// Translation Dictionary
const translations = {
    en: {
        "logo-subtitle": "SEARCHBOOST",
        "nav-home": "Home",
        "nav-pricing": "Pricing",
        "btn-orders": "My Orders",
        "hero-badge": "AI-Powered SEO & Content",
        "hero-title": "SEARCHBOOST — AI SEO & Content",
        "hero-desc": "Dominate search rankings with AI-powered SEO optimization, keyword research, blog content writing, and data-driven content strategy.",
        "btn-explore": "View Packages",
        "btn-compliance": "SEO Best Practices",
        
        "stat-keywords": "Keywords Ranked",
        "stat-traffic": "Avg Traffic Boost",
        "stat-content": "Content Pieces",
        "stat-delivery": "Delivery Time",
        
        "sec-channels-title": "Complete SEO & Content Solutions",
        "sec-channels-subtitle": "From AI-powered blog writing to full technical SEO audits — everything you need to rank higher and attract organic traffic.",
        "card-audit-title": "SEO Site Audit",
        "card-audit-desc": "Comprehensive technical and on-page SEO analysis identifying issues that hold your site back from top rankings.",
        "card-content-title": "AI Blog Writing",
        "card-content-desc": "SEO-optimized blog posts and articles created by AI with keyword integration, headers, and meta optimization.",
        "card-keyword-title": "Keyword Research",
        "card-keyword-desc": "Data-driven keyword discovery with search volume, competition analysis, and content gap identification.",
        "card-analytics-title": "Rank Tracking & Analytics",
        "card-analytics-desc": "Real-time search position monitoring with detailed traffic analytics and ROI performance reports.",
        "card-view-pricing": "View Pricing",
        
        "comp-title": "White-Hat SEO & Google Best Practices",
        "comp-desc": "Our SEO strategies follow Google's Webmaster Guidelines with ethical, sustainable techniques that build long-term organic growth without risking penalties.",
        "comp-bullet1-bold": "Google E-E-A-T Compliant:",
        "comp-bullet1-text": "Content optimized for Experience, Expertise, Authoritativeness, and Trustworthiness signals.",
        "comp-bullet2-bold": "White-Hat Only:",
        "comp-bullet2-text": "No black-hat tactics. We use sustainable SEO methods that comply with search engine guidelines.",
        "comp-bullet3-bold": "Data-Driven:",
        "comp-bullet3-text": "All strategies backed by real keyword data, competitor analysis, and performance metrics.",
        
        "view-seo-sub": "Choose the perfect SEO package for your business. All plans include keyword research and on-page optimization.",
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
        "foot-gdpr": "Google E-E-A-T Compliant",
        "foot-canspam": "White-Hat SEO Methods",
        "foot-match": "99% Client Retention",
        "foot-contact": "Contact support: snsherocom@gmail.com",
        "foot-copy": "&copy; 2026 BibleForAI SEARCHBOOST. All rights reserved. AI SEO & content marketing.",
        
        "order-button": "Order Package",
        "featured-badge": "Best Seller",
        
        // Receipts
        "receipt-header": "BIBLEFORAI - SEARCHBOOST RECEIPT",
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
        "logo-subtitle": "서치부스트",
        "nav-home": "홈",
        "nav-pricing": "가격",
        "btn-orders": "내 주문 내역",
        "hero-badge": "AI 기반 SEO 및 콘텐츠",
        "hero-title": "서치부스트 — AI SEO & 콘텐츠",
        "hero-desc": "AI 기반 SEO 최적화, 키워드 리서치, 블로그 콘텐츠 작성 및 데이터 중심 콘텐츠 전략으로 검색 순위를 정복하세요.",
        "btn-explore": "패키지 보기",
        "btn-compliance": "SEO 모범 사례",
        
        "stat-keywords": "키워드 랭킹",
        "stat-traffic": "평균 트래픽 증가",
        "stat-content": "콘텐츠 제작",
        "stat-delivery": "제작 기간",
        
        "sec-channels-title": "완벽한 SEO 및 콘텐츠 솔루션",
        "sec-channels-subtitle": "AI 기반 블로그 작성부터 전체 기술 SEO 감사까지 — 검색 순위 상승과 유기적 트래픽 유입에 필요한 모든 것.",
        "card-audit-title": "SEO 사이트 감사",
        "card-audit-desc": "사이트의 상위 랭킹을 저해하는 요소들을 식별하는 종합적인 기술 및 온페이지 SEO 분석.",
        "card-content-title": "AI 블로그 작성",
        "card-content-desc": "키워드 통합, 헤더 구조화 및 메타 최적화가 완료된 AI 기반 SEO 최적화 블로그 포스트.",
        "card-keyword-title": "키워드 리서치",
        "card-keyword-desc": "검색량, 경쟁 분석 및 콘텐츠 갭 식별을 포함한 데이터 기반 키워드 발굴.",
        "card-analytics-title": "순위 추적 및 분석",
        "card-analytics-desc": "실시간 검색 포지션 모니터링과 상세 트래픽 분석 및 ROI 성과 리포트.",
        "card-view-pricing": "가격 확인하기",
        
        "comp-title": "화이트햇 SEO 및 Google 모범 사례",
        "comp-desc": "당사의 SEO 전략은 Google 웹마스터 가이드라인을 준수하며, 페널티 위험 없이 장기적인 유기적 성장을 구축하는 윤리적이고 지속 가능한 기법을 사용합니다.",
        "comp-bullet1-bold": "Google E-E-A-T 준수:",
        "comp-bullet1-text": "경험, 전문성, 권위, 신뢰성 시그널에 최적화된 콘텐츠.",
        "comp-bullet2-bold": "화이트햇 전용:",
        "comp-bullet2-text": "블랙햇 기법을 사용하지 않습니다. 검색 엔진 가이드라인을 준수하는 지속 가능한 SEO 방법을 사용합니다.",
        "comp-bullet3-bold": "데이터 기반:",
        "comp-bullet3-text": "실제 키워드 데이터, 경쟁사 분석 및 성과 지표에 기반한 전략 수립.",
        
        "view-seo-sub": "비즈니스에 딱 맞는 SEO 패키지를 선택하세요. 모든 플랜에 키워드 리서치와 온페이지 최적화가 포함됩니다.",
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
        "foot-gdpr": "Google E-E-A-T 준수",
        "foot-canspam": "화이트햇 SEO 방식",
        "foot-match": "99% 고객 유지율",
        "foot-contact": "문의 지원: snsherocom@gmail.com",
        "foot-copy": "&copy; 2026 BibleForAI 서치부스트. All rights reserved. AI SEO 및 콘텐츠 마케팅.",
        
        "order-button": "패키지 주문하기",
        "featured-badge": "베스트 셀러",
        
        // Receipts
        "receipt-header": "BIBLEFORAI - 서치부스트 영수증",
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
    document.title = isKo ? "BibleForAI - 서치부스트 | AI SEO 및 콘텐츠 마케팅" : "BibleForAI - SEARCHBOOST | AI SEO & Content Marketing";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.content = isKo ? 
            "AI 기반 SEO 최적화, 키워드 리서치, 블로그 콘텐츠 작성 및 검색 순위 개선 서비스. 글로벌 비즈니스를 위한 데이터 중심 SEO 솔루션." : 
            "AI-powered SEO optimization, keyword research, blog content writing, and search ranking improvement. Data-driven SEO solutions for global businesses.";
    }

    // Update Open Graph (OG) and Twitter Metadata tags dynamically
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
        ogTitle.content = isKo ? "BibleForAI - 서치부스트 | AI SEO 및 콘텐츠 마케팅" : "BibleForAI - SEARCHBOOST | AI SEO & Content Marketing";
    }
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
        ogDesc.content = isKo ? 
            "AI 기반 SEO 최적화, 키워드 리서치, 블로그 콘텐츠 작성 및 검색 순위 개선. 글로벌 비즈니스를 위한 데이터 중심 SEO 솔루션." : 
            "AI-powered SEO optimization, keyword research, blog content writing, and search ranking improvement. Data-driven SEO solutions for global businesses.";
    }
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) {
        twTitle.content = isKo ? "BibleForAI - 서치부스트 | AI SEO 및 콘텐츠 마케팅" : "BibleForAI - SEARCHBOOST | AI SEO & Content Marketing";
    }
    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) {
        twDesc.content = isKo ? 
            "AI 기반 SEO 최적화, 키워드 리서치, 블로그 콘텐츠 작성 및 검색 순위 개선. 글로벌 비즈니스를 위한 데이터 중심 SEO 솔루션." : 
            "AI-powered SEO optimization, keyword research, blog content writing, and search ranking improvement. Data-driven SEO solutions for global businesses.";
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
        case 'seo': return 'fa-solid fa-magnifying-glass';
        default: return 'fa-solid fa-magnifying-glass';
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
    const orderLogs = JSON.parse(localStorage.getItem('searchboost_orders')) || [];
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
    localStorage.setItem('searchboost_orders', JSON.stringify(orderLogs));
    
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
    const orderLogs = JSON.parse(localStorage.getItem('searchboost_orders')) || [];
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

// Expose variables globally to prevent ReferenceErrors in inline HTML scripts/handlers
if (typeof navigate !== 'undefined') { window.navigate = navigate; }
if (typeof currentLang !== 'undefined') { window.currentLang = currentLang; }

window.openPurchaseModal = openPurchaseModal;
window.closeModal = closeModal;
window.adjustQty = adjustQty;
window.changeLanguage = changeLanguage;
