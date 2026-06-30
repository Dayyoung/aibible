// App State
let currentView = 'home';
let currentPackage = null;
let orderQuantity = 1;
let paypalButtonInstance = null;

// Package Catalog with Localized Keys
const packageCatalog = {
    websites: {
        title_en: 'AI Website Creation',
        title_ko: 'AI 웹사이트 제작',
        packages: [
            { id: 'web-lp', name_en: 'Landing Page', name_ko: '랜딩페이지', desc_en: 'AI-generated single-page landing site with modern layout, copy blocks, and PayPal contact form.', desc_ko: 'AI가 생성하는 모던한 레이아웃의 싱글페이지 랜딩사이트 + 컨택트/결제 연동.', price: 149, featured: false, features_en: ['1 Page', 'AI Copy & Layout', 'Mobile Responsive', 'PayPal Contact Form', '2 Revisions'], features_ko: ['1페이지', 'AI 카피/레이아웃', '반응형', 'PayPal 문의 양식', '2회 수정'] },
            { id: 'web-biz', name_en: 'Business Site', name_ko: '비즈니스 사이트', desc_en: 'Multi-page corporate site with About/Services/Contact pages and SEO metadata.', desc_ko: '소개/서비스/문의 페이지가 포함된 기업형 사이트 + SEO 메타데이터.', price: 349, featured: true, features_en: ['Up to 5 Pages', 'SEO Metadata & OG', 'Contact/Booking Form', 'Analytics Ready', 'Email Handoff'], features_ko: ['최대 5페이지', 'SEO/OG 메타', '문의/예약 폼', '애널리틱스 연동', '이메일 인수인계'] },
            { id: 'web-ai', name_en: 'AI Platform Site', name_ko: 'AI 플랫폼 사이트', desc_en: 'Full AI product landing with API docs, pricing table, CTA flows, and integrations.', desc_ko: 'API 문서, 가격표, CTA 흐름, 연동 구조가 포함된 AI 플랫폼용 랜딩/사이트.', price: 599, featured: false, features_en: ['Up to 10 Pages', 'API Docs Section', 'Pricing & CTA Flows', '3rd-Party Integrations', 'Launch Checklist'], features_ko: ['최대 10페이지', 'API 문서 섹션', '가격/CTA 흐름', '외부 서비스 연동', '런칭 체크리스트'] },
            { id: 'web-enterprise', name_en: 'Enterprise Web', name_ko: '엔터프라이즈 웹', desc_en: 'Scalable web app foundation with SSR-ready framework and hardened security config.', desc_ko: 'SSR 지원 프레임워크와 보안 설정이 포함된 확장형 웹앱 기반.', price: 1199, featured: false, features_en: ['Custom Web Architecture', 'SSR/SSG Ready', 'Security Baseline', 'Dedicated PM', '30-Day Support'], features_ko: ['커스텀 웹 아키텍처', 'SSR/SSG 지원', '보안 기준 적용', '전담 PM', '30일 지원'] }
        ]
    }
};

// Translation Dictionary
const translations = {
    en: {
        "logo-subtitle": "AI WEBSITE CREATION",
        "nav-home": "Home",
        "nav-websites": "Website Packages",
        "btn-orders": "My Orders",
        "hero-badge": "AI-Powered Web Design",
        "hero-title": "BibleForAI - AIWEB!",
        "hero-desc": "Launch modern, conversion-optimized websites with AI — from landing pages to enterprise web platforms.",
        "btn-explore": "Explore Packages",
        "btn-compliance": "How It Works",

        "stat-projects": "Websites Shipped",
        "stat-performance": "Core Web Vitals",
        "stat-conversion": "Conversion Lift",
        "stat-delivery": "Delivery Time",

        "sec-channels-title": "Choose Your Website Package",
        "sec-channels-subtitle": "Select a package matched to your business stage. We handle wireframes, copy, design, and launch-ready code.",
        "card-websites-title": "AI Website Creation",
        "card-websites-desc": "Modern, responsive websites built with AI-assisted design and copy to help you convert visitors into customers.",
        "card-view-pricing": "View Pricing",

        "comp-title": "Built for Launch",
        "comp-desc": "Every delivery is production-ready: responsive layouts, SEO metadata, performance budgets, and clean deployable code.",
        "comp-bullet1-bold": "AI-First Workflow:",
        "comp-bullet1-text": "Wireframes, copy, and layouts generated and iterated with AI.",
        "comp-bullet2-bold": "Performance-First:",
        "comp-bullet2-text": "Optimized for loading speed and conversions with measurable targets.",
        "comp-bullet3-bold": "Launch-Ready:",
        "comp-bullet3-text": "Delivered as deployable assets with clear handoff instructions.",

        "view-websites-sub": "Pick the package that fits your launch goal. From quick landing pages to full AI product platforms.",
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
        "modal-test-btn": "Click price to payment checkout",

        "badge-ssl": "SSL Secured Checkout",
        "badge-paypal": "PayPal Verified",

        "foot-channels": "Website Packages",
        "foot-legal": "Service Quality",
        "foot-gdpr": "Launch-Ready Delivery",
        "foot-canspam": "Performance Optimized",
        "foot-match": "AI-Assisted Design",
        "foot-contact": "Contact support: snsherocom@gmail.com",
        "foot-copy": "&copy; 2026 BibleForAI AIWEB. All rights reserved. AI-powered website creation.",

        "order-button": "Order Package",
        "featured-badge": "Best Seller",

        // Receipts
        "receipt-header": "BIBLEFORAI - AIWEB RECEIPT",
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
        "logo-subtitle": "AI 웹사이트 제작",
        "nav-home": "홈",
        "nav-websites": "웹사이트 패키지",
        "btn-orders": "내 주문 내역",
        "hero-badge": "AI 기반 웹 디자인",
        "hero-title": "BibleForAI - AIWEB!",
        "hero-desc": "AI로 모던하고 전환 최적화된 웹사이트를 제작합니다. 랜딩페이지부터 엔터프라이즈 웹 플랫폼까지.",
        "btn-explore": "패키지 둘러보기",
        "btn-compliance": "제작 프로세스",

        "stat-projects": "완료 프로젝트",
        "stat-performance": "코어 웹 바이탈",
        "stat-conversion": "전환율 개선",
        "stat-delivery": "평균 납기",

        "sec-channels-title": "원하는 웹사이트 패키지 선택",
        "sec-channels-subtitle": "비즈니스 단계에 맞춰 패키지를 선택하세요. 와이어프레임, 카피, 디자인, 배포 코드까지 지원합니다.",
        "card-websites-title": "AI 웹사이트 제작",
        "card-websites-desc": "AI가 지원하는 디자인과 카피로 모던한 반응형 웹사이트를 구축해 방문자를 고객으로 전환합니다.",
        "card-view-pricing": "가격 확인하기",

        "comp-title": "런칭 준비 완료",
        "comp-desc": "모든 결과물은 즉시 배포 가능한 수준으로 제공됩니다: 반응형 레이아웃, SEO 메타, 성능 기준, 정리된 코드.",
        "comp-bullet1-bold": "AI 우선 워크플로우:",
        "comp-bullet1-text": "와이어프레임, 카피, 레이아웃을 AI로 생성하고 반복합니다.",
        "comp-bullet2-bold": "성능 중심 설계:",
        "comp-bullet2-text": "로딩 속도와 전환율을 측정 가능한 기준으로 최적화합니다.",
        "comp-bullet3-bold": "런칭 가능 상태:",
        "comp-bullet3-text": "배포 가능한 산출물과 명확한 인수인계 가이드를 제공합니다.",

        "view-websites-sub": "런칭 목적에 맞는 패키지를 선택하세요. 간단 랜딩페이지부터 AI 플랫폼 사이트까지.",
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
        "modal-test-btn": "가격 텍스트를 눌러 결제 진행",

        "badge-ssl": "SSL 보안 결제 지원",
        "badge-paypal": "PayPal 인증됨",

        "foot-channels": "웹사이트 패키지",
        "foot-legal": "서비스 품질",
        "foot-gdpr": "런칭 준비 완료",
        "foot-canspam": "성능 최적화",
        "foot-match": "AI 지원 디자인",
        "foot-contact": "문의 지원: snsherocom@gmail.com",
        "foot-copy": "&copy; 2026 BibleForAI AIWEB. All rights reserved. AI-powered website creation.",

        "order-button": "패키지 주문하기",
        "featured-badge": "베스트 셀러",

        // Receipts
        "receipt-header": "BIBLEFORAI - AIWEB 영수증",
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
    const dict = translations[lang] || translations['en'];

    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const translation = dict[key];
        if (!translation) return;
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT') {
            el.placeholder = translation;
        } else {
            el.innerHTML = translation;
        }
    });

    document.querySelectorAll('.i18n-attr').forEach(el => {
        const key = el.getAttribute('data-i18n-attr');
        if (!key) return;
        const translation = dict[key];
        if (translation) el.setAttribute('title', translation);
    });

    renderAllPackages();
    renderOrders();

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (!key) return;
        if (!translations['en'][key]) translations['en'][key] = key;
        if (!translations['ko'][key]) translations['ko'][key] = key;
    });
}

function changeLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('bibleforai_lang', lang);
    applyTranslations();
    renderServicesMenu?.();
}

function navigate(view) {
    currentView = view;
    document.querySelectorAll('.view-section').forEach(section => section.classList.remove('active'));
    const viewId = view.endsWith('-view') ? `${view}` : `${view}-view`;
    const target = document.getElementById(viewId);
    if (target) target.classList.add('active');
    else document.getElementById('home-view')?.classList.add('active');

    document.querySelectorAll('.nav-links a').forEach(link => link.classList.remove('active'));
    const navLink = document.getElementById(`nav-${view}`);
    if (navLink) navLink.classList.add('active');

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderAllPackages() {
    const category = Object.keys(packageCatalog)[0];
    const data = packageCatalog[category];
    const container = document.getElementById('packages-container');
    if (!container) return;

    container.innerHTML = data.packages.map(pkg => {
        const priceLabel = formatPrice(pkg.price);
        const features = currentLang === 'ko' ? pkg.features_ko : pkg.features_en;
        const featured = pkg.featured ? '<span class="badge-best">Best Seller</span>' : '';
        const featureItems = features.map(f => `<li><i class="fa-solid fa-circle-check"></i> ${escapeHtml(f)}</li>`).join('');
        return `
            <div class="package-card ${pkg.featured ? 'featured' : ''}">
                <div class="package-header">
                    <div class="package-title">${featured} ${currentLang === 'ko' ? pkg.name_ko : pkg.name_en}</div>
                    <div class="package-price">${priceLabel}</div>
                </div>
                <div class="package-desc">${currentLang === 'ko' ? pkg.desc_ko : pkg.desc_en}</div>
                <ul class="feature-list">${featureItems}</ul>
                <button class="btn-primary" onclick="openPurchaseModal('${pkg.id}')">
                    <span data-i18n="order-button">Order Package</span> <i class="fa-solid fa-cart-shopping"></i>
                </button>
            </div>
        `;
    }).join('');
}

function renderOrders() {
    const orders = JSON.parse(localStorage.getItem('aiweb_orders') || '[]');
    const tbody = document.getElementById('orders-tbody');
    const empty = document.getElementById('no-orders-msg');
    if (!tbody) return;

    if (!orders.length) {
        tbody.innerHTML = '';
        empty.style.display = 'block';
        return;
    }

    empty.style.display = 'none';
    tbody.innerHTML = orders.map(order => {
        return `
            <tr>
                <td>${escapeHtml(order.date)}</td>
                <td>${escapeHtml(order.transactionId)}</td>
                <td>${escapeHtml(order.product)}</td>
                <td>${escapeHtml(order.tier)}</td>
                <td>${escapeHtml(order.platform)}</td>
                <td>${order.quantity}</td>
                <td>${escapeHtml(order.total)}</td>
                <td>${escapeHtml(order.status)}</td>
            </tr>
        `;
    }).join('');
}

function escapeHtml(str) {
    return String(str || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function getSelectedPkg() {
    if (currentPackage && packageCatalog.websites) {
        return packageCatalog.websites.packages.find(p => p.id === currentPackage) || null;
    }
    return Object.values(packageCatalog)[0].packages[0];
}

function updateModalPrice() {
    const pkg = getSelectedPkg();
    const qty = parseInt(document.getElementById('order-quantity')?.value || '1', 10);
    orderQuantity = Math.max(1, isNaN(qty) ? 1 : qty);
    const total = pkg ? (pkg.price * orderQuantity) : 0;
    const totalEl = document.getElementById('modal-total-price');
    if (totalEl) totalEl.textContent = formatPrice(total);
}

function triggerTestCheckout() {
    const pkg = getSelectedPkg();
    if (!pkg) return;
    const qty = orderQuantity || 1;
    const total = pkg.price * qty;
    const fakeTx = `TEST-${Date.now()}`;
    const record = {
        date: new Date().toISOString(),
        transactionId: fakeTx,
        product: currentLang === 'ko' ? 'AI 웹사이트 제작' : 'AI Website Creation',
        tier: currentLang === 'ko' ? pkg.name_ko : pkg.name_en,
        platform: currentLang === 'ko' ? '테스트' : 'Test',
        quantity: qty,
        total: formatPrice(total),
        status: 'secure checkout Tested'
    };
    const orders = JSON.parse(localStorage.getItem('aiweb_orders') || '[]');
    orders.unshift(record);
    localStorage.setItem('aiweb_orders', JSON.stringify(orders));
    closeModal();
    navigate('orders');
}

function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

function openPurchaseModal(pkgId) {
    currentPackage = pkgId;
    const pkg = getSelectedPkg();
    if (!pkg) return;

    document.getElementById('modal-package-name').textContent = currentLang === 'ko' ? pkg.name_ko : pkg.name_en;
    document.getElementById('modal-base-price').textContent = formatPrice(pkg.price);
    document.getElementById('order-quantity').value = 1;
    orderQuantity = 1;
    document.getElementById('modal-total-price').textContent = formatPrice(pkg.price);

    document.getElementById('purchase-modal').classList.add('active');
    document.body.style.overflow = 'hidden';
    document.getElementById('order-email').value = '';
    document.getElementById('email-error').style.display = 'none';
    document.getElementById('order-country').value = 'Global';

    setTimeout(() => {
        document.getElementById('purchase-modal').scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 80);

    setTimeout(() => {
        try {
            if (typeof paypal !== 'undefined') {
                renderPayPal(pkg.price);
            }
        } catch (err) {
            console.warn('PayPal render pending SDK load');
        }
    }, 180);
}

function closeModal() {
    document.getElementById('purchase-modal').classList.remove('active');
    document.body.style.overflow = '';
    if (paypalButtonInstance && typeof paypalButtonInstance.close === 'function') {
        try { paypalButtonInstance.close(); } catch (e) { /* ignore */ }
    }
    document.getElementById('paypal-button-container').innerHTML = '';
}

function renderPayPal(basePrice) {
    const container = document.getElementById('paypal-button-container');
    if (!container) return;

    if (typeof paypal === 'undefined') {
        container.innerHTML = '<p style="color:#ef4444;">Payment service is loading. Please try again in a moment.</p>';
        setTimeout(() => renderPayPal(basePrice), 600);
        return;
    }

    container.innerHTML = '';

    paypalButtonInstance = paypal.Buttons({
        style: {
            layout: 'vertical',
            color: 'black',
            shape: 'pill',
            label: 'paypal'
        },
        createOrder: function(data, actions) {
            const qty = parseInt(document.getElementById('order-quantity').value || '1', 10);
            const total = Math.max(1, qty) * basePrice;
            return actions.order.create({
                purchase_units: [{
                    description: `${currentLang === 'ko' ? 'AI 웹사이트 제작' : 'AI Website Creation'} - ${currentLang === 'ko' ? getSelectedPkg()?.name_ko : getSelectedPkg()?.name_en}`,
                    amount: { currency_code: 'USD', value: Number(total).toFixed(2) }
                }]
            });
        },
        onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
                const pkg = getSelectedPkg();
                const order = {
                    date: new Date().toLocaleString(),
                    transactionId: details.id,
                    payer: details.payer?.email_address || (document.getElementById('order-email').value || ''),
                    product: currentLang === 'ko' ? 'AI 웹사이트 제작' : 'AI Website Creation',
                    tier: currentLang === 'ko' ? pkg?.name_ko || '' : pkg?.name_en || '',
                    platform: document.getElementById('order-country').value,
                    quantity: parseInt(document.getElementById('order-quantity').value || '1', 10),
                    total: formatPrice((pkg?.price || 0) * (parseInt(document.getElementById('order-quantity').value || '1', 10))),
                    status: currentLang === 'ko' ? '결제 완료' : 'Payment Complete'
                };
                const orders = JSON.parse(localStorage.getItem('aiweb_orders') || '[]');
                orders.unshift(order);
                localStorage.setItem('aiweb_orders', JSON.stringify(orders));

                const formData = new URLSearchParams({
                    entry_12345: order.transactionId,
                    entry_67890: order.product,
                    entry_24680: order.tier,
                    entry_13579: order.total,
                    entry_99999: order.payer || order.date
                });
                const receiptUrl = `https://docs.google.com/forms/d/e/1FAIpQLScMPqbEWWttS5mb1m_krsO_kco24ImpgvYVSbc7zO0nEVmYFw/viewform?${formData.toString()}&submit=Submit`;
                window.open(receiptUrl, '_blank');
                closeModal();
                alert(currentLang === 'ko' ? '결제가 완료되었습니다.' : 'Payment completed successfully.');
                navigate('orders');
            });
        },
        onError: function(err) {
            console.error('PayPal Error', err);
            alert('Payment failed. Please try again.');
        }
    }).render(container);
}

function adjustQty(delta) {
    const input = document.getElementById('order-quantity');
    const next = Math.max(1, (parseInt(input.value || '1', 10) || 1) + delta);
    input.value = next;
    orderQuantity = next;
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
}

function toggleMobileMenu() {
    document.getElementById('mobile-drawer').classList.toggle('active');
}

function renderServicesMenu() {
    
    const labels = { '/b2bdb/': 'B2B Core Database', '/b2cdb/': 'B2C Lead Database', '/databoost/': 'DATABOOST — Web Scraping', '/landPage/': 'AI Landing Page', '/opencode/': 'OpenCode AI', '/shopboost/': 'SHOPBOOST — E-Commerce Entry', '/flowboost/': 'FLOWBOOST — Workflow Automation', '/imgboost/': 'IMGBOOST — Product Photography', '/pitchboost/': 'PITCHBOOST — AI Presentations', '/boostsm/': 'SMM Growth Booster', '/prboost/': 'PRBOOST — Global PR', '/mailboost/': 'MAILBOOST — Email Marketing', '/searchboost/': 'SEARCHBOOST — AI SEO', '/mkboost/': 'MKBOOST — Market Research', '/contentboost/': 'CONTENTBOOST — AI Publishing', '/clipboost/': 'CLIPBOOST — Short-Form Video', '/voiceboost/': 'VOICEBOOST — AI Voice', '/transboost/': 'TRANSBOOST — Translation', '/aiboost/': 'AIBOOST — AI Consulting', '/insightboost/': 'INSIGHTBOOST — Data Analytics', '/chatboost/': 'CHATBOOST — AI Chatbot', '/buyerboost/': 'BUYERBOOST — Buyer Discovery', '/salesboost/': 'SALESBOOST — Sales Enablement', '/researchboost/': 'RESEARCHBOOST — Market Research', '/aiweb/': 'AIWEBSITE — AI Website' };

    const links = Object.entries(labels).map(([href, text]) => `<li><a href="${href}"><i class="fa-solid fa-globe"></i> ${text}</a></li>`).join('');
    document.querySelectorAll('.unified_service_menu_links').forEach(el => el.innerHTML = links);
}

document.getElementById('menu-toggle')?.addEventListener('click', toggleMobileMenu);

document.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem('bibleforai_lang')) {
        const browserLang = (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage || '';
        const defaultLang = browserLang.toLowerCase().startsWith('ko') ? 'ko' : 'en';
        localStorage.setItem('bibleforai_lang', defaultLang);
        currentLang = defaultLang;
    } else {
        currentLang = localStorage.getItem('bibleforai_lang');
    }

    const langSelect = document.getElementById('language-selector');
    if (langSelect) langSelect.value = currentLang;

    applyTranslations();

    const svcMenuEl = document.getElementById('svc-menu');
    if (svcMenuEl) renderServicesMenu();
});

// Automated seamless reload on re-entry after PayPal capture
window.addEventListener('pageshow', function (event) {
    if (event.persisted || performance.getEntriesByType('navigation')[0]?.type === 'back_forward') {
        location.reload();
    }
});

// Expose variables globally to prevent ReferenceErrors in inline HTML scripts/handlers
if (typeof navigate !== 'undefined') { window.navigate = navigate; }
if (typeof currentLang !== 'undefined') { window.currentLang = currentLang; }

window.openPurchaseModal = openPurchaseModal;
window.closeModal = closeModal;
window.adjustQty = adjustQty;
window.changeLanguage = changeLanguage;
