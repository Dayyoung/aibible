// App State
let currentView = 'home';
let currentPackage = null;
let orderQuantity = 1;

// Package Catalog
const packageCatalog = {
    basic: {
        title_en: 'General Translation',
        title_ko: '일반 번역',
        packages: [
            {
                id: 'basic-doc',
                name_en: 'Starter Translation',
                name_ko: '스타터 번역',
                desc_en: 'Fast, clean translation for simple documents, emails, and short-form business content.',
                desc_ko: '간단한 문서, 이메일, 짧은 비즈니스 콘텐츠를 위한 빠르고 깔끔한 번역입니다.',
                price: 10,
                featured: false,
                features_en: ['1 business day delivery', 'Light editing included', 'EN ↔ KO support', 'Email support'],
                features_ko: ['1영업일 내 전달', '간단한 교정 포함', '영↔한 지원', '이메일 지원']
            }
        ]
    },
    pro: {
        title_en: 'Business Translation',
        title_ko: '비즈니스 번역',
        packages: [
            {
                id: 'pro-business',
                name_en: 'Growth Translation',
                name_ko: '그로스 번역',
                desc_en: 'Translation for websites, brochures, pitch decks, product pages, and sales materials.',
                desc_ko: '웹사이트, 브로슈어, 제안서, 제품 상세페이지, 세일즈 자료 번역에 적합합니다.',
                price: 14,
                featured: true,
                features_en: ['Tone/localization adjustment', 'Terminology consistency', 'SEO-aware copy', 'Priority support'],
                features_ko: ['톤/로컬라이징 조정', '용어 일관성 유지', 'SEO 고려 카피', '우선 지원']
            }
        ]
    },
    enterprise: {
        title_en: 'Native Localization & Proofread',
        title_ko: '원어민 감수 & 로컬라이징',
        packages: [
            {
                id: 'enterprise-native',
                name_en: 'Native Polish',
                name_ko: '네이티브 폴리시',
                desc_en: 'Best for legal, technical, and high-stakes content that needs native-level polish.',
                desc_ko: '법률, 기술, 고부가 콘텐츠처럼 원어민 수준의 정교한 마감이 필요한 경우에 적합합니다.',
                price: 24,
                featured: false,
                features_en: ['Native proofread included', 'Glossary consistency', 'Style adaptation', 'High-priority delivery'],
                features_ko: ['원어민 감수 포함', '용어집 일관성 유지', '문체 현지화', '우선 전달']
            }
        ]
    }
};

// Translation Dictionary
const translations = {
    en: {
        'logo-subtitle': 'LOCALIZE!',
        'nav-home': 'Home',
        'nav-basic': 'General Translation',
        'nav-pro': 'Business Translation',
        'nav-enterprise': 'Native Localization',
        'btn-orders': 'My Orders',
        'hero-badge': 'Native-Level Translation',
        'hero-title': 'LOCALIZE — Native Translation & Localization',
        'hero-desc': 'Get polished English/Korean translation with a smooth PayPal checkout flow.',
        'btn-explore': 'Explore Packages',
        'btn-how': 'How It Works',
        'btn-compliance': 'See Service Scope',
        'stat-global-numbers': 'Languages Covered',
        'stat-accuracy-rate': 'Polish Level',
        'stat-opt-in': 'Localization Ready',
        'stat-delivery': 'Fast Delivery',
        'sec-packages-title': 'Choose Your Translation Package',
        'sec-packages-subtitle': 'From simple documents to native-level localization, choose the package that matches your content.',
        'card-basic-title': 'General Translation',
        'card-basic-desc': 'Simple and clear translation for emails, short docs, and light business materials.',
        'card-pro-title': 'Business Translation',
        'card-pro-desc': 'Business-ready translation for websites, brochures, pitch decks, and product pages.',
        'card-enterprise-title': 'Native Localization & Proofread',
        'card-enterprise-desc': 'Native-level polish for legal, technical, and high-stakes content.',
        'card-view-pricing': 'View Pricing',
        'comp-title': 'What We Handle',
        'comp-desc': 'We help you move from source text to polished target copy with practical translation, localization, and proofreading support.',
        'how-title': 'How LOCALIZE Works',
        'how-desc': 'A simple 4-step workflow takes you from intake to delivery.',
        'how-step1-bold': '1. Consultation:',
        'how-step1-text': 'We review your source text, target audience, and language pair.',
        'how-step2-bold': '2. Translation Plan:',
        'how-step2-text': 'We confirm tone, terminology, and delivery scope before starting.',
        'how-step3-bold': '3. Translation & Proofread:',
        'how-step3-text': 'We translate and polish the content for clarity and native flow.',
        'how-step4-bold': '4. Delivery:',
        'how-step4-text': 'You receive the translated file and a concise completion note.',
        'sec-industries-title': 'Content Types We <span>Serve</span>',
        'comp-bullet1-bold': 'Website Copy:',
        'comp-bullet1-text': 'Landing pages, product pages, and brand messaging.',
        'comp-bullet2-bold': 'Business Documents:',
        'comp-bullet2-text': 'Brochures, pitch decks, emails, and sales materials.',
        'comp-bullet3-bold': 'Technical & Legal:',
        'comp-bullet3-text': 'Contracts, manuals, and high-stakes documents.',
        'view-basic-sub': 'Quick translation for everyday business documents and short-form content.',
        'view-pro-sub': 'Business-focused translation with terminology consistency and tone adjustment.',
        'view-enterprise-sub': 'Native-level localization for technical, legal, and high-stakes content.',
        'view-orders-title': 'My Purchase History',
        'view-orders-sub': 'Review completed orders. Your records are stored locally in this browser.',
        'th-date': 'Order Date',
        'th-order-id': 'Transaction ID',
        'th-product': 'Product',
        'th-tier': 'Package Tier',
        'th-languagepair': 'Language Pair',
        'th-qty': 'Quantity',
        'th-total': 'Total Paid',
        'th-status': 'Status',
        'no-orders-msg': 'No purchase records yet. Complete your first order to see it here.',
        'modal-title': 'Configure Order',
        'modal-desc': 'Choose quantity and complete secure PayPal payment.',
        'modal-base-pkg': 'Base Package:',
        'modal-base-price-label': 'Base Price:',
        'modal-email-label': 'Email Address *',
        'modal-email-placeholder': 'name@example.com',
        'modal-email-error': 'Please enter a valid email address.',
        'modal-languagepair-label': 'Source / Target Language *',
        'modal-languagepair-placeholder': 'e.g. EN → KO website copy, KO → EN contract',
        'modal-qty': 'Quantity:',
        'modal-total-amt': 'Total Amount:',
        'modal-test-hint': 'Click the total price for sandbox test checkout',
        'badge-ssl': 'SSL Secured Checkout',
        'badge-paypal': 'PayPal Verified',
        'foot-packages': 'Packages',
        'foot-why': 'Why LOCALIZE',
        'foot-da': 'Native polish',
        'foot-dofollow': 'Localization support',
        'foot-native': 'Terminology consistency',
        'foot-contact': 'Contact support: snsherocom@gmail.com',
        'foot-copy': '&copy; 2026 BibleForAI LOCALIZE. All rights reserved. Native translation solutions.',
        'order-button': 'Order Package',
        'featured-badge': 'Best Seller',
        'receipt-header': 'BIBLEFORAI - LOCALIZE RECEIPT',
        'receipt-date': 'Order Date',
        'receipt-txid': 'Transaction ID',
        'receipt-email': 'Customer Email',
        'receipt-type': 'Service Type',
        'receipt-size': 'Package Tier',
        'receipt-languagepair': 'Language Pair',
        'receipt-qty': 'Quantity',
        'receipt-baseprice': 'Base Price',
        'receipt-total': 'Total Paid',
        'receipt-status': 'Status',
        'receipt-method': 'Payment Method',
        'receipt-method-val': 'PayPal Secure Checkout'
    },
    ko: {
        'logo-subtitle': 'LOCALIZE!',
        'nav-home': '홈',
        'nav-basic': '일반 번역',
        'nav-pro': '비즈니스 번역',
        'nav-enterprise': '원어민 로컬라이징',
        'btn-orders': '내 주문 내역',
        'hero-badge': '원어민 수준 번역',
        'hero-title': 'LOCALIZE — Native Translation & Localization',
        'hero-desc': '영어/한국어 번역을 깔끔하게 받아보세요. PayPal 결제도 간편합니다.',
        'btn-explore': '패키지 보기',
        'btn-how': '이용 방법',
        'btn-compliance': '서비스 범위 보기',
        'stat-global-numbers': '지원 언어',
        'stat-accuracy-rate': '마감 수준',
        'stat-opt-in': '로컬라이징 준비',
        'stat-delivery': '빠른 전달',
        'sec-packages-title': '번역 패키지를 선택하세요',
        'sec-packages-subtitle': '간단한 문서부터 원어민 수준 로컬라이징까지, 콘텐츠에 맞는 패키지를 선택하세요.',
        'card-basic-title': '일반 번역',
        'card-basic-desc': '이메일, 짧은 문서, 가벼운 비즈니스 자료를 위한 빠르고 명확한 번역입니다.',
        'card-pro-title': '비즈니스 번역',
        'card-pro-desc': '웹사이트, 브로슈어, 제안서, 제품 상세페이지에 적합한 비즈니스 번역입니다.',
        'card-enterprise-title': '원어민 감수 & 로컬라이징',
        'card-enterprise-desc': '법률, 기술, 고부가 콘텐츠에 적합한 원어민 수준 마감입니다.',
        'card-view-pricing': '가격 확인하기',
        'comp-title': '지원 범위',
        'comp-desc': '원문에서 완성된 타겟 카피로 넘어갈 수 있도록 번역, 로컬라이징, 감수까지 함께 지원합니다.',
        'how-title': 'LOCALIZE 이용 방법',
        'how-desc': '간단한 4단계로 접수부터 전달까지 진행됩니다.',
        'how-step1-bold': '1. 상담:',
        'how-step1-text': '원문, 타겟 독자, 언어 조합을 검토합니다.',
        'how-step2-bold': '2. 번역 계획:',
        'how-step2-text': '톤, 용어, 작업 범위를 확인한 뒤 시작합니다.',
        'how-step3-bold': '3. 번역 & 감수:',
        'how-step3-text': '자연스럽고 명확한 문장으로 번역하고 다듬습니다.',
        'how-step4-bold': '4. 전달:',
        'how-step4-text': '번역 파일과 간단한 완료 안내를 전달합니다.',
        'sec-industries-title': '지원 콘텐츠 유형 <span>소개</span>',
        'comp-bullet1-bold': '웹사이트 카피:',
        'comp-bullet1-text': '랜딩페이지, 제품 상세페이지, 브랜드 메시지.',
        'comp-bullet2-bold': '비즈니스 문서:',
        'comp-bullet2-text': '브로슈어, 제안서, 이메일, 세일즈 자료.',
        'comp-bullet3-bold': '기술·법률 문서:',
        'comp-bullet3-text': '계약서, 매뉴얼, 고부가 문서.',
        'view-basic-sub': '일상적인 비즈니스 문서와 짧은 콘텐츠를 위한 빠른 번역.',
        'view-pro-sub': '용어 일관성과 톤 조정이 포함된 비즈니스 번역.',
        'view-enterprise-sub': '기술·법률·고부가 콘텐츠를 위한 원어민 수준 로컬라이징.',
        'view-orders-title': '내 구매 히스토리',
        'view-orders-sub': '성공한 주문 내역을 검토하세요. 데이터는 브라우저 로컬스토리지에 보관됩니다.',
        'th-date': '주문 날짜',
        'th-order-id': '트랜잭션 ID',
        'th-product': '상품명',
        'th-tier': '패키지 등급',
        'th-languagepair': '언어 조합',
        'th-qty': '수량',
        'th-total': '총 결제금액',
        'th-status': '상태',
        'no-orders-msg': '구매 기록이 없습니다. 첫 주문을 완료하시면 내역이 여기에 표시됩니다!',
        'modal-title': '주문 설정',
        'modal-desc': '수량을 선택하고 안전한 PayPal 결제를 진행하세요.',
        'modal-base-pkg': '기본 패키지:',
        'modal-base-price-label': '기본 가격:',
        'modal-email-label': '이메일 주소 *',
        'modal-email-placeholder': 'name@example.com',
        'modal-email-error': '올바른 이메일 주소를 입력해주세요.',
        'modal-languagepair-label': '원문 / 목표 언어 *',
        'modal-languagepair-placeholder': '예: EN → KO 웹사이트 카피, KO → EN 계약서',
        'modal-qty': '수량:',
        'modal-total-amt': '총 결제금액:',
        'modal-test-hint': '가격 텍스트를 눌러 테스트 결제를 진행하세요',
        'badge-ssl': 'SSL 보안 결제 지원',
        'badge-paypal': 'PayPal 인증됨',
        'foot-packages': '패키지',
        'foot-why': 'LOCALIZE를 선택하는 이유',
        'foot-da': '원어민 수준 마감',
        'foot-dofollow': '로컬라이징 지원',
        'foot-native': '용어 일관성',
        'foot-contact': '문의 지원: snsherocom@gmail.com',
        'foot-copy': '&copy; 2026 BibleForAI LOCALIZE. All rights reserved. 원어민 번역 솔루션.',
        'order-button': '패키지 주문하기',
        'featured-badge': '베스트 셀러',
        'receipt-header': 'BIBLEFORAI - LOCALIZE 영수증',
        'receipt-date': '주문 날짜',
        'receipt-txid': '거래 ID',
        'receipt-email': '고객 이메일',
        'receipt-type': '서비스 유형',
        'receipt-size': '패키지 등급',
        'receipt-languagepair': '언어 조합',
        'receipt-qty': '수량',
        'receipt-baseprice': '기본 가격',
        'receipt-total': '총 결제금액',
        'receipt-status': '상태',
        'receipt-method': '결제 수단',
        'receipt-method-val': 'PayPal 보안 결제'
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
    document.title = isKo
        ? 'BibleForAI - LOCALIZE | 원어민 번역 & 로컬라이징'
        : 'BibleForAI - LOCALIZE | Native Translation & Localization';

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.content = isKo
            ? '영어/한국어 번역, 로컬라이징, 원어민 감수를 제공하는 LOCALIZE 서비스입니다.'
            : 'Get polished English/Korean translation, localization, and native proofreading with LOCALIZE.';
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.content = document.title;

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
        ogDesc.content = isKo
            ? '영어/한국어 번역과 로컬라이징을 PayPal 결제로 간편하게 이용하세요.'
            : 'Translate and localize English/Korean content with a smooth PayPal checkout flow.';
    }

    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.content = document.title;

    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) twDesc.content = ogDesc ? ogDesc.content : '';

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const translation = translations[lang] && translations[lang][key];
        if (!translation) return;
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            el.placeholder = translation;
        } else {
            el.innerHTML = translation;
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

function setupHeaderScroll() {
    const header = document.getElementById('app-header');
    window.addEventListener('scroll', () => {
        header?.classList.toggle('scrolled', window.scrollY > 50);
    });
}

function navigate(viewId) {
    currentView = viewId;
    document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
    const activeSection = document.getElementById(`${viewId}-view`);
    if (activeSection) activeSection.classList.add('active');
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.toggle('active', link.id === `nav-${viewId}`);
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleMobileMenu() {
    document.getElementById('mobile-drawer')?.classList.toggle('active');
}

function renderAllPackages() {
    const isKo = currentLang === 'ko';
    Object.keys(packageCatalog).forEach(categoryKey => {
        const categoryData = packageCatalog[categoryKey];
        const container = document.getElementById(`${categoryKey}-packages`);
        if (!container) return;
        container.innerHTML = categoryData.packages.map(pkg => {
            const featuredClass = pkg.featured ? 'featured' : '';
            const icon = getCategoryIcon(categoryKey);
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
                        <i class="${icon}"></i> ${btnText}
                    </button>
                </div>
            `;
        }).join('');
    });
}

function getCategoryIcon(category) {
    switch (category) {
        case 'basic': return 'fa-solid fa-language';
        case 'pro': return 'fa-solid fa-briefcase';
        case 'enterprise': return 'fa-solid fa-pen-fancy';
        default: return 'fa-solid fa-file-lines';
    }
}

function openPurchaseModal(categoryKey, packageId) {
    const category = packageCatalog[categoryKey];
    const pkg = category?.packages.find(p => p.id === packageId);
    if (!pkg) return;

    const isKo = currentLang === 'ko';
    const catTitle = isKo ? category.title_ko : category.title_en;
    const pkgName = isKo ? pkg.name_ko : pkg.name_en;

    currentPackage = {
        categoryKey,
        categoryName: catTitle,
        tierName: pkgName,
        basePrice: pkg.price
    };
    orderQuantity = 1;

    const modalTitle = document.getElementById('modal-product-title');
    const modalPkgName = document.getElementById('modal-package-name');
    const modalBasePrice = document.getElementById('modal-base-price');
    const qtyInput = document.getElementById('order-quantity');
    if (modalTitle) modalTitle.innerText = catTitle;
    if (modalPkgName) modalPkgName.innerText = pkgName;
    if (modalBasePrice) modalBasePrice.innerText = formatPrice(pkg.price);
    if (qtyInput) qtyInput.value = orderQuantity;

    const emailInput = document.getElementById('order-email');
    if (emailInput) {
        emailInput.value = '';
        emailInput.style.borderColor = 'var(--border)';
    }
    const langPairInput = document.getElementById('order-language-pair');
    if (langPairInput) {
        langPairInput.value = '';
        langPairInput.style.borderColor = 'var(--border)';
    }
    const emailError = document.getElementById('email-error');
    if (emailError) emailError.style.display = 'none';

    updateModalPrice();
    document.getElementById('purchase-modal')?.classList.add('active');

    setTimeout(() => {
        const modalCard = document.querySelector('.modal-card');
        const totalBox = document.querySelector('.total-price-box');
        if (modalCard && totalBox) {
            modalCard.scrollTop = Math.max(totalBox.offsetTop - 20, 0);
        }
    }, 150);

    initPayPalButtons();
}

function closeModal() {
    document.getElementById('purchase-modal')?.classList.remove('active');
    const container = document.getElementById('paypal-button-container');
    if (container) container.innerHTML = '';
}

function adjustQty(amount) {
    const qtyInput = document.getElementById('order-quantity');
    let val = parseInt(qtyInput?.value || '1', 10);
    val = Math.max(1, val + amount);
    if (qtyInput) qtyInput.value = val;
    orderQuantity = val;
    updateModalPrice();
}

function updateModalPrice() {
    const qtyInput = document.getElementById('order-quantity');
    let val = parseInt(qtyInput?.value || '1', 10);
    if (Number.isNaN(val) || val < 1) val = 1;
    orderQuantity = val;
    const totalPrice = currentPackage ? currentPackage.basePrice * orderQuantity : 0;
    const totalEl = document.getElementById('modal-total-price');
    if (totalEl) totalEl.innerText = formatPrice(totalPrice);
}

function validateEmailField() {
    const emailInput = document.getElementById('order-email');
    const emailError = document.getElementById('email-error');
    if (!emailInput) return true;
    const email = emailInput.value.trim();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!ok) {
        emailInput.style.borderColor = '#ef4444';
        if (emailError) {
            emailError.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> ${translations[currentLang]['modal-email-error']}`;
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
    if (emailInput && !emailInput.value.trim()) emailInput.value = 'sandbox@test.dev';
    const langPairInput = document.getElementById('order-language-pair');
    if (langPairInput && !langPairInput.value.trim()) langPairInput.value = 'EN → KO';
    if (!validateEmailField()) return;
    saveLocalOrder({ id: 'TEST-PAYID-' + Math.random().toString(36).slice(2, 11).toUpperCase(), isTest: true });
    closeModal();
}

function initPayPalButtons() {
    const container = document.getElementById('paypal-button-container');
    if (!container) return;
    container.innerHTML = '';
    if (typeof paypal === 'undefined') {
        container.innerHTML = '<p style="color:#ef4444;text-align:center;font-size:0.9rem;padding:1rem;font-weight:600;"><i class="fa-solid fa-triangle-exclamation"></i> PayPal is unavailable. Please reload the page.</p>';
        return;
    }

    paypal.Buttons({
        style: { layout: 'vertical', color: 'blue', shape: 'rect', label: 'checkout' },
        onClick: function(data, actions) {
            return validateEmailField() ? actions.resolve() : actions.reject();
        },
        createOrder: function(data, actions) {
            const selectedLanguagePair = document.getElementById('order-language-pair')?.value.trim() || 'General';
            const finalAmount = (currentPackage.basePrice * orderQuantity).toFixed(2);
            return actions.order.create({
                purchase_units: [{
                    description: `${currentPackage.categoryName} - ${currentPackage.tierName} [Language Pair: ${selectedLanguagePair}] (Qty: ${orderQuantity})`,
                    amount: { currency_code: 'USD', value: finalAmount }
                }]
            });
        },
        onApprove: function(data, actions) {
            return actions.order.capture().then(details => {
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
    const orderLogs = JSON.parse(localStorage.getItem('localize_orders')) || [];
    const selectedLanguagePair = document.getElementById('order-language-pair') ? document.getElementById('order-language-pair').value.trim() : 'General';
    const emailVal = document.getElementById('order-email') ? document.getElementById('order-email').value.trim() : '';

    const newOrder = {
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
        id: details.id,
        email: emailVal,
        category: currentPackage.categoryName,
        package: currentPackage.tierName,
        languagePair: selectedLanguagePair,
        quantity: orderQuantity,
        basePrice: currentPackage.basePrice,
        totalPaid: formatPrice(currentPackage.basePrice * orderQuantity),
        status: 'Completed'
    };

    orderLogs.unshift(newOrder);
    localStorage.setItem('localize_orders', JSON.stringify(orderLogs));
    renderOrders();

    const dict = translations[currentLang];
    const receiptText = `===================================
   ${dict['receipt-header']}
===================================
${dict['receipt-date'].padEnd(15)} : ${newOrder.date}
${dict['receipt-txid'].padEnd(15)} : ${newOrder.id}
${dict['receipt-email'].padEnd(15)} : ${newOrder.email}
${dict['receipt-type'].padEnd(15)} : ${newOrder.category}
${dict['receipt-size'].padEnd(15)} : ${newOrder.package}
${dict['receipt-languagepair'].padEnd(15)} : ${newOrder.languagePair}
${dict['receipt-qty'].padEnd(15)} : ${newOrder.quantity}
${dict['receipt-baseprice'].padEnd(15)} : ${formatPrice(newOrder.basePrice)}
${dict['receipt-total'].padEnd(15)} : ${newOrder.totalPaid}
${dict['receipt-status'].padEnd(15)} : ${newOrder.status}
-----------------------------------
${dict['receipt-method'].padEnd(15)} : ${dict['receipt-method-val']}
===================================`;

    const encodedReceipt = encodeURIComponent(receiptText);
    window.location.href = `https://docs.google.com/forms/d/e/1FAIpQLScMPqbEWWttS5mb1m_krsO_kco24ImpgvYVSbc7zO0nEVmYFw/viewform?entry.1059822061=${encodedReceipt}`;
}

function renderOrders() {
    const orderLogs = JSON.parse(localStorage.getItem('localize_orders')) || [];
    const tbody = document.getElementById('orders-tbody');
    const noOrders = document.getElementById('no-orders-msg');
    if (!tbody) return;
    if (orderLogs.length === 0) {
        tbody.innerHTML = '';
        if (noOrders) noOrders.style.display = 'block';
        return;
    }
    const isKo = currentLang === 'ko';
    if (noOrders) noOrders.style.display = 'none';
    tbody.innerHTML = orderLogs.map(order => `
        <tr>
            <td>${order.date}</td>
            <td class="tx-id">${order.id}</td>
            <td>${order.category}</td>
            <td>${order.package}</td>
            <td>${order.languagePair || 'General'}</td>
            <td>${order.quantity}</td>
            <td><strong>${order.totalPaid}</strong></td>
            <td><span class="status-badge">${isKo ? '완료됨' : order.status}</span></td>
        </tr>
    `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
    applyTranslations();
    renderAllPackages();
    renderOrders();
    setupHeaderScroll();
});

// Expose variables globally to prevent ReferenceErrors in inline HTML scripts/handlers
if (typeof navigate !== 'undefined') { window.navigate = navigate; }
if (typeof currentLang !== 'undefined') { window.currentLang = currentLang; }

window.openPurchaseModal = openPurchaseModal;
window.closeModal = closeModal;
window.adjustQty = adjustQty;
window.changeLanguage = changeLanguage;
