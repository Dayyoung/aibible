// IndiaBoost - Market Entry Advisory
let currentView = 'home';
let currentPackage = null;
let orderQuantity = 1;
let paypalButtonInstance = null;

const packageCatalog = {
    india: {
        title_en: 'India Market Entry Advisory',
        title_ko: '인도 시장진출 자문',
        packages: [
            {
                id: 'india-standard',
                name_en: 'STANDARD',
                name_ko: 'STANDARD',
                desc_en: '60-minute advisory for first-step India launch planning, documentation checklists, and localization priorities.',
                desc_ko: '인도 진출의 첫 단계인 런칭 계획, 서류 체크리스트, 현지화 우선순위를 정리하는 60분 자문.',
                price: 286,
                featured: false,
                features_en: ['1× 60-min online advisory', 'Market entry checklist', 'Compliance & setup overview', 'Email follow-up summary'],
                features_ko: ['60분 온라인 자문 1회', '시장 진출 체크리스트', '법인 설립 및 규정 개요', '이메일 요약 정리 제공']
            },
            {
                id: 'india-deluxe',
                name_en: 'DELUXE',
                name_ko: 'DELUXE',
                desc_en: '3-session support for company setup, operating risk review, and India market implementation details.',
                desc_ko: '법인 설립, 운영 리스크 검토, 인도 시장 실행 세부사항을 포함한 3회 지원 패키지.',
                price: 4286,
                featured: true,
                features_en: ['3× 60-min sessions', 'Setup support roadmap', 'Risk review & mitigation', 'Document/action templates'],
                features_ko: ['60분 자문 3회', '설립 지원 로드맵', '리스크 검토 및 대응', '실행 템플릿 제공']
            },
            {
                id: 'india-premium',
                name_en: 'PREMIUM',
                name_ko: 'PREMIUM',
                desc_en: '5-session premium consulting with long-term support for expansion, sourcing, and operating structure design.',
                desc_ko: '확장, 소싱, 운영 구조 설계까지 포함하는 장기 지원용 5회 프리미엄 컨설팅.',
                price: 8572,
                featured: false,
                features_en: ['5× 60-min sessions', 'Expansion strategy pack', 'Long-term support window', 'Priority response channel'],
                features_ko: ['60분 자문 5회', '확장 전략 자료', '장기 지원 기간 포함', '우선 응답 채널 제공']
            }
        ]
    }
};

const translations = {
    en: {
        'logo-subtitle': 'INDIA MARKET ENTRY',
        'nav-home': 'Home',
        'nav-packages': 'Packages',
        'nav-faq': 'FAQ',
        'nav-orders': 'Orders',
        'btn-orders': 'My Orders',
        'hero-badge': 'Global Expansion Advisory',
        'hero-title': 'INDIABOOST — India Market Entry Advisory',
        'hero-desc': 'Practical India business setup guidance for founders, operators, and cross-border teams.',
        'btn-explore': 'Explore Packages',
        'stat-one-title': 'Launch Strategy',
        'stat-one-desc': 'Step-by-step India market entry planning',
        'stat-two-title': 'Risk Review',
        'stat-two-desc': 'Operational and compliance checks',
        'stat-three-title': 'Fast Delivery',
        'stat-three-desc': 'Instant booking after secure payment',
        'section-packages-title': 'Consulting Packages',
        'section-packages-desc': 'Choose the support level that fits your India expansion stage.',
        'section-faq-title': 'Frequently Asked Questions',
        'section-faq-desc': 'A quick overview of how the advisory package works.',
        'section-orders-title': 'My Purchase History',
        'section-orders-desc': 'View your completed orders stored locally in your browser.',
        'view-home': 'Home',
        'view-packages': 'Packages',
        'view-faq': 'FAQ',
        'view-orders': 'Orders',
        'view-packages-short': 'Packages',
        'order-button': 'Order Package',
        'featured-badge': 'Most Popular',
        'modal-title': 'Configure Order',
        'modal-desc': 'Select your package and complete secure PayPal checkout.',
        'modal-base-pkg': 'Package:',
        'modal-base-price-label': 'Base Price:',
        'modal-email-label': 'Email Address *',
        'modal-email-placeholder': 'name@example.com',
        'modal-email-error': 'Please enter a valid email address.',
        'modal-focus-label': 'Business Focus:',
        'modal-qty': 'Quantity:',
        'modal-total-amt': 'Total Amount:',
        
        'badge-ssl': 'SSL Secured Checkout',
        'badge-paypal': 'PayPal Verified',
        'foot-copy': '&copy; 2026 BibleForAI. India market entry support for cross-border businesses.',
        'receipt-header': 'BIBLEFORAI - INDIABOOST RECEIPT',
        'receipt-date': 'Order Date',
        'receipt-txid': 'Transaction ID',
        'receipt-email': 'Customer Email',
        'receipt-type': 'Service Type',
        'receipt-size': 'Package Size',
        'receipt-focus': 'Business Focus',
        'receipt-qty': 'Quantity',
        'receipt-baseprice': 'Base Price',
        'receipt-total': 'Total Paid',
        'receipt-status': 'Status',
        'receipt-method': 'Payment Method',
        'receipt-method-val': 'PayPal Secure Checkout',
        'faq-q1': 'Who is this advisory for?',
        'faq-a1': 'Founders, operators, exporters, and teams that want a realistic roadmap for entering the Indian market.',
        'faq-q2': 'What do I receive after purchase?',
        'faq-a2': 'You get the booked consulting session(s), a practical action plan, and a follow-up summary based on your needs.',
        'faq-q3': 'Can you help with company setup and risk review?',
        'faq-a3': 'Yes. The packages cover setup planning, operating risks, and implementation guidance for India expansion.',
        'faq-q4': 'How does the test checkout work?',
        'faq-a4': 'Click the visible total price in the modal to trigger the sandbox test checkout flow used for verification.'
    },
    ko: {
        'logo-subtitle': '인도 시장진출',
        'nav-home': '홈',
        'nav-packages': '패키지',
        'nav-faq': 'FAQ',
        'nav-orders': '주문내역',
        'btn-orders': '내 주문',
        'hero-badge': '글로벌 확장 자문',
        'hero-title': 'INDIABOOST — 인도 시장진출 자문',
        'hero-desc': '창업자, 운영 담당자, 크로스보더 팀을 위한 실전형 인도 진출 가이드.',
        'btn-explore': '패키지 보기',
        'stat-one-title': '진출 전략',
        'stat-one-desc': '인도 시장 진출 단계별 계획',
        'stat-two-title': '리스크 검토',
        'stat-two-desc': '운영 및 규정 점검',
        'stat-three-title': '빠른 진행',
        'stat-three-desc': '안전 결제 후 즉시 예약',
        'section-packages-title': '컨설팅 패키지',
        'section-packages-desc': '인도 확장 단계에 맞는 지원 수준을 선택하세요.',
        'section-faq-title': '자주 묻는 질문',
        'section-faq-desc': '자문 패키지 진행 방식에 대한 간단한 안내입니다.',
        'section-orders-title': '구매 내역',
        'section-orders-desc': '브라우저에 저장된 완료 주문을 확인하세요.',
        'view-home': '홈',
        'view-packages': '패키지',
        'view-faq': 'FAQ',
        'view-orders': '주문내역',
        'view-packages-short': '패키지',
        'order-button': '패키지 주문',
        'featured-badge': '가장 인기',
        'modal-title': '주문 설정',
        'modal-desc': '패키지를 선택하고 안전한 PayPal 결제를 진행하세요.',
        'modal-base-pkg': '패키지:',
        'modal-base-price-label': '기본 가격:',
        'modal-email-label': '이메일 주소 *',
        'modal-email-placeholder': 'name@example.com',
        'modal-email-error': '올바른 이메일 주소를 입력해주세요.',
        'modal-focus-label': '비즈니스 목적:',
        'modal-qty': '수량:',
        'modal-total-amt': '총 결제금액:',
        
        'badge-ssl': 'SSL 보안 결제',
        'badge-paypal': 'PayPal 인증됨',
        'foot-copy': '&copy; 2026 BibleForAI. 인도 시장진출을 위한 크로스보더 비즈니스 지원.',
        'receipt-header': 'BIBLEFORAI - INDIABOOST 영수증',
        'receipt-date': '주문 날짜',
        'receipt-txid': '거래 ID',
        'receipt-email': '고객 이메일',
        'receipt-type': '서비스 종류',
        'receipt-size': '패키지 크기',
        'receipt-focus': '비즈니스 목적',
        'receipt-qty': '수량',
        'receipt-baseprice': '기본 가격',
        'receipt-total': '총 결제금액',
        'receipt-status': '상태',
        'receipt-method': '결제 방법',
        'receipt-method-val': 'PayPal 안전 결제',
        'faq-q1': '이 자문은 누구를 위한 서비스인가요?',
        'faq-a1': '인도 시장에 진입하려는 창업자, 운영 담당자, 수출 기업, 크로스보더 팀을 위한 서비스입니다.',
        'faq-q2': '구매 후 무엇을 받나요?',
        'faq-a2': '예약된 자문 세션과 함께, 상황에 맞는 실행 계획과 후속 요약을 받게 됩니다.',
        'faq-q3': '법인 설립과 리스크 검토도 도와주나요?',
        'faq-a3': '네. 패키지에는 설립 계획, 운영 리스크, 인도 확장 실행 가이드가 포함됩니다.',
        'faq-q4': '테스트 결제는 어떻게 동작하나요?',
        'faq-a4': '모달의 총 결제금액 텍스트를 클릭하면 검증용 샌드박스 테스트 결제가 실행됩니다.'
    }
};

let currentLang = localStorage.getItem('bibleforai_lang') || (() => {
    const browserLang = (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage || '';
    return browserLang.toLowerCase().startsWith('ko') ? 'ko' : 'en';
})();

function formatPrice(usdPrice, includeUnit = true) {
    const formatted = Number.isInteger(usdPrice) ? usdPrice.toLocaleString() : usdPrice.toFixed(2);
    return includeUnit ? `$${formatted} USD` : `$${formatted}`;
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
        ? 'BibleForAI - INDIABOOST | 인도 시장진출 자문'
        : 'BibleForAI - INDIABOOST | India Market Entry Advisory';

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.content = isKo
            ? '인도 시장 진출, 법인 설립, 리스크 검토, 현지화 전략을 지원하는 글로벌 비즈니스 자문 서비스입니다.'
            : 'India market entry, company setup, risk review, and localization guidance for global businesses.';
    }
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.content = document.title;
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.content = metaDesc ? metaDesc.content : '';
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.content = document.title;
    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) twDesc.content = metaDesc ? metaDesc.content : '';

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

function setupHeaderScroll() {
    const header = document.getElementById('app-header');
    if (!header) return;
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
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
    const drawer = document.getElementById('mobile-drawer');
    if (drawer) drawer.classList.toggle('active');
}

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
            const btnText = translations[currentLang]['order-button'];

            return `
                <div class="package-card ${featuredClass}">
                    ${pkg.featured ? `<div class="featured-badge"><i class="fa-solid fa-star"></i> ${translations[currentLang]['featured-badge']}</div>` : ''}
                    <div class="card-icon"><i class="${badgeIcon}"></i></div>
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
        case 'india': return 'fa-solid fa-earth-asia';
        default: return 'fa-solid fa-briefcase';
    }
}

function openPurchaseModal(categoryKey, packageId) {
    const category = packageCatalog[categoryKey];
    const pkg = category.packages.find(p => p.id === packageId);
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
    const modalDesc = document.getElementById('modal-product-desc');
    const modalPackageName = document.getElementById('modal-package-name');
    const modalBasePrice = document.getElementById('modal-base-price');
    const qtyInput = document.getElementById('order-quantity');
    const emailInput = document.getElementById('order-email');
    const focusInput = document.getElementById('order-focus');

    if (modalTitle) modalTitle.innerText = translations[currentLang]['modal-title'];
    if (modalDesc) modalDesc.innerText = translations[currentLang]['modal-desc'];
    if (modalPackageName) modalPackageName.innerText = pkgName;
    if (modalBasePrice) modalBasePrice.innerText = formatPrice(pkg.price);
    if (qtyInput) qtyInput.value = orderQuantity;
    if (emailInput) {
        emailInput.value = '';
        emailInput.style.borderColor = 'var(--border)';
    }
    if (focusInput) focusInput.value = 'General India market entry';
    const emailError = document.getElementById('email-error');
    if (emailError) emailError.style.display = 'none';

    updateModalPrice();
    document.getElementById('purchase-modal').classList.add('active');

    setTimeout(() => {
        const totalBox = document.querySelector('.total-price-box');
        if (totalBox) totalBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 250);

    initPayPalButtons();
}

function closeModal() {
    const modal = document.getElementById('purchase-modal');
    if (modal) modal.classList.remove('active');
    const container = document.getElementById('paypal-button-container');
    if (container) container.innerHTML = '';
}

function adjustQty(amount) {
    const qtyInput = document.getElementById('order-quantity');
    if (!qtyInput) return;
    let val = parseInt(qtyInput.value, 10) || 1;
    val += amount;
    if (val < 1) val = 1;
    qtyInput.value = val;
    orderQuantity = val;
    updateModalPrice();
}

function updateModalPrice() {
    const qtyInput = document.getElementById('order-quantity');
    let val = parseInt(qtyInput?.value, 10);
    if (Number.isNaN(val) || val < 1) val = 1;
    orderQuantity = val;
    if (!currentPackage) return;
    const totalPrice = currentPackage.basePrice * orderQuantity;
    const totalEl = document.getElementById('modal-total-price');
    if (totalEl) totalEl.innerText = formatPrice(totalPrice);
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
    if (emailInput && !emailInput.value.trim()) {
        emailInput.value = 'sandbox@test.dev';
        emailInput.style.borderColor = 'var(--border)';
    }
    if (!validateEmailField()) return;
    const mockDetails = {
        id: 'TEST-PAYID-' + Math.random().toString(36).slice(2, 11).toUpperCase(),
        isTest: true
    };
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
    if (paypalButtonInstance) {
        container.innerHTML = '';
        paypalButtonInstance = null;
    }

    paypalButtonInstance = paypal.Buttons({
        style: { layout: 'vertical', color: 'blue', shape: 'rect', label: 'checkout' },
        onClick(data, actions) {
            if (!validateEmailField()) return actions.reject();
            return actions.resolve();
        },
        createOrder(data, actions) {
            const focusValue = document.getElementById('order-focus')?.value || 'General India market entry';
            const finalAmount = (currentPackage.basePrice * orderQuantity).toFixed(2);
            return actions.order.create({
                purchase_units: [{
                    description: `${currentPackage.categoryName} - ${currentPackage.tierName} [Focus: ${focusValue}] (Qty: ${orderQuantity})`,
                    amount: { currency_code: 'USD', value: finalAmount }
                }]
            });
        },
        onApprove(data, actions) {
            return actions.order.capture().then(details => {
                saveLocalOrder(details);
                closeModal();
            });
        },
        onError(err) {
            console.error('PayPal Checkout error:', err);
            alert('An error occurred during payment processing. Please try again.');
        }
    }).render('#paypal-button-container');
}

function saveLocalOrder(details) {
    const orderLogs = JSON.parse(localStorage.getItem('indiaboost_orders')) || [];
    const emailVal = document.getElementById('order-email') ? document.getElementById('order-email').value.trim() : '';
    const focusVal = document.getElementById('order-focus') ? document.getElementById('order-focus').value : 'General India market entry';
    const isTest = !!details.isTest;

    const newOrder = {
        date: new Date().toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
        }),
        id: details.id,
        email: emailVal,
        category: currentPackage.categoryName,
        package: currentPackage.tierName,
        focus: focusVal,
        quantity: orderQuantity,
        basePrice: currentPackage.basePrice,
        totalPaid: formatPrice(currentPackage.basePrice * orderQuantity),
        status: isTest ? 'Test Completed' : 'Completed'
    };

    orderLogs.unshift(newOrder);
    localStorage.setItem('indiaboost_orders', JSON.stringify(orderLogs));
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
${dict['receipt-focus'].padEnd(15)} : ${newOrder.focus}
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
    const orderLogs = JSON.parse(localStorage.getItem('indiaboost_orders')) || [];
    const tbody = document.getElementById('orders-tbody');
    const noOrdersMsg = document.getElementById('no-orders-msg');
    if (!tbody) return;

    if (orderLogs.length === 0) {
        tbody.innerHTML = '';
        if (noOrdersMsg) noOrdersMsg.style.display = 'block';
        return;
    }

    if (noOrdersMsg) noOrdersMsg.style.display = 'none';
    tbody.innerHTML = orderLogs.map(order => `
        <tr>
            <td>${order.date}</td>
            <td class="tx-id">${order.id}</td>
            <td>${order.category}</td>
            <td>${order.package}</td>
            <td>${order.focus || '-'}</td>
            <td>${order.quantity}</td>
            <td><strong>${order.totalPaid}</strong></td>
            <td><span class="status-badge">${order.status}</span></td>
        </tr>
    `).join('');
}

window.addEventListener('DOMContentLoaded', () => {
    applyTranslations();
    renderAllPackages();
    renderOrders();
    setupHeaderScroll();
    const lang = localStorage.getItem('bibleforai_lang');
    if (!lang) {
        localStorage.setItem('bibleforai_lang', currentLang);
    }
});

// Expose variables globally to prevent ReferenceErrors in inline HTML scripts/handlers
if (typeof navigate !== 'undefined') { window.navigate = navigate; }
if (typeof currentLang !== 'undefined') { window.currentLang = currentLang; }

window.openPurchaseModal = openPurchaseModal;
window.closeModal = closeModal;
window.adjustQty = adjustQty;
window.changeLanguage = changeLanguage;
