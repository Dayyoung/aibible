// APOSTBOOST App State
let currentView = 'home';
let currentPackage = null;
let orderQuantity = 1;
let paypalButtonInstance = null;

const packageCatalog = {
    apostille: {
        title_en: 'Apostille & Notarization',
        title_ko: '아포스티유·공증 대행',
        packages: [
            {
                id: 'apostille-basic',
                name_en: 'Starter Package',
                name_ko: '스타터 패키지',
                desc_en: 'Best for a single document that needs basic apostille guidance and notarization coordination.',
                desc_ko: '단일 문서의 아포스티유 안내와 공증 연계가 필요한 경우에 적합합니다.',
                price: 14,
                featured: false,
                features_en: ['1 document review', 'Scan-friendly intake', 'Apostille checklist', 'Email support'],
                features_ko: ['문서 1건 검토', '스캔본 접수 가능', '아포스티유 체크리스트', '이메일 지원']
            },
            {
                id: 'apostille-standard',
                name_en: 'Standard Package',
                name_ko: '스탠다드 패키지',
                desc_en: 'For families, students, and small businesses preparing several documents for overseas submission.',
                desc_ko: '유학생, 가족, 소규모 사업자처럼 여러 문서를 해외 제출해야 하는 경우에 적합합니다.',
                price: 28,
                featured: true,
                features_en: ['Up to 3 documents', 'Translation review', 'Notary workflow support', 'Priority response'],
                features_ko: ['최대 3건 문서', '번역 검토 포함', '공증 절차 안내', '우선 응답 지원']
            },
            {
                id: 'apostille-express',
                name_en: 'Express Package',
                name_ko: '익스프레스 패키지',
                desc_en: 'Rush handling for visa, school, or corporate deadlines with coordinated document preparation.',
                desc_ko: '비자, 학교, 기업 마감일이 촉박한 경우를 위한 긴급 문서 준비 패키지입니다.',
                price: 56,
                featured: false,
                features_en: ['Up to 5 documents', 'Rush handling', 'Business submission support', 'Dedicated coordination'],
                features_ko: ['최대 5건 문서', '긴급 처리', '사업자 제출 지원', '전담 조율']
            }
        ]
    }
};

const translations = {
    en: {
        'logo-subtitle': 'APOSTBOOST',
        'nav-home': 'Home',
        'nav-packages': 'Packages',
        'nav-faq': 'FAQ',
        'nav-orders': 'Orders',
        'hero-badge': 'Certified Document Workflow',
        'hero-title': 'APOSTBOOST — Apostille & Notarization',
        'hero-desc': 'Based on a Kmong service starting from ₩10,000, we help students, expats, and companies prepare documents for global submission.',
        'btn-explore': 'Explore Packages',
        'btn-process': 'See Process',
        'stat-origin': 'Kmong starting price',
        'stat-markup': 'Business markup',
        'stat-fast': 'Rush review',
        'stat-global': 'Countries supported',
        'sec-highlights-title': 'What this service covers',
        'sec-highlights-subtitle': 'A practical workflow for internationally usable documents, from scan review to apostille guidance and notarization coordination.',
        'highlight-1-title': 'Academic & visa documents',
        'highlight-1-desc': 'Ideal for transcripts, diplomas, certificates, family registry records, and travel or immigration paperwork.',
        'highlight-2-title': 'Translation + notarization',
        'highlight-2-desc': 'Handles translation review, notarization steps, and apostille checklists so you can submit confidently overseas.',
        'highlight-3-title': 'Business-ready delivery',
        'highlight-3-desc': 'Helpful for company filings, contracts, incorporation docs, and cross-border compliance tasks.',
        'sec-packages-title': 'Package catalog',
        'sec-packages-subtitle': 'Choose the package that matches your document volume and turnaround speed.',
        'card-view-pricing': 'View Pricing',
        'faq-title': 'FAQ',
        'faq-subtitle': 'Common questions before you place an order.',
        'faq-q1': 'What makes this service internationally usable?',
        'faq-a1': 'We focus on documents that foreign schools, embassies, agencies, and business partners typically request, including apostille guidance and notarization coordination.',
        'faq-q2': 'Which documents are the best fit?',
        'faq-a2': 'Academic records, certificates, family documents, passports, employment letters, company registration files, and contracts are all common use cases.',
        'faq-q3': 'Can I start with scans only?',
        'faq-a3': 'In many cases, yes. Clear scans are enough to begin the review, and we will let you know when originals are required for the final step.',
        'faq-q4': 'How does the payment flow work?',
        'faq-a4': 'Select a package, fill in your contact and document details, pay securely through PayPal, and then receive a receipt plus next-step instructions.',
        'view-orders-title': 'My Orders',
        'view-orders-sub': 'Your order history is stored locally in this browser.',
        'th-date': 'Order Date',
        'th-order-id': 'Transaction ID',
        'th-document': 'Document Type',
        'th-destination': 'Destination',
        'th-tier': 'Package Tier',
        'th-qty': 'Quantity',
        'th-total': 'Total Paid',
        'th-status': 'Status',
        'no-orders-msg': 'No purchase records found yet.',
        'modal-title': 'Configure Order',
        'modal-desc': 'Fill in your document details and complete a secure PayPal checkout.',
        'modal-base-pkg': 'Base Package:',
        'modal-base-price-label': 'Base Price:',
        'modal-email-label': 'Email Address *',
        'modal-email-placeholder': 'name@example.com',
        'modal-email-error': 'Please enter a valid email address.',
        'modal-document-label': 'Document Type *',
        'modal-document-placeholder': 'Transcript, passport, contract...',
        'modal-destination-label': 'Destination Country *',
        'modal-destination-placeholder': 'United States, Canada, UAE...',
        'modal-qty': 'Quantity:',
        'modal-total-amt': 'Total Amount:',
        'modal-test-btn': 'Click price to test checkout',
        'badge-ssl': 'SSL Secured Checkout',
        'badge-paypal': 'PayPal Verified',
        'foot-support': 'Support',
        'foot-trust': 'Trust',
        'foot-trust-1': 'SSL secured checkout',
        'foot-trust-2': 'PayPal verified payment',
        'foot-trust-3': 'Google Form receipt handoff',
        'foot-contact': 'Contact: snsherocom@gmail.com',
        'foot-copy': '&copy; 2026 BibleForAI APOSTBOOST. All rights reserved.',
        'order-button': 'Order Package',
        'featured-badge': 'Best Value',
        'receipt-header': 'BIBLEFORAI - APOSTBOOST RECEIPT',
        'receipt-date': 'Order Date',
        'receipt-txid': 'Transaction ID',
        'receipt-email': 'Customer Email',
        'receipt-type': 'Document Type',
        'receipt-size': 'Package Tier',
        'receipt-destination': 'Destination Country',
        'receipt-qty': 'Quantity',
        'receipt-baseprice': 'Base Price',
        'receipt-total': 'Total Paid',
        'receipt-status': 'Status',
        'receipt-method': 'Payment Method',
        'receipt-method-val': 'PayPal Secure Checkout'
    },
    ko: {
        'logo-subtitle': 'APOSTBOOST',
        'nav-home': '홈',
        'nav-packages': '패키지',
        'nav-faq': 'FAQ',
        'nav-orders': '주문 내역',
        'hero-badge': '문서 인증 워크플로',
        'hero-title': 'APOSTBOOST — 아포스티유·공증 대행',
        'hero-desc': '크몽 기준 ₩10,000부터 시작한 서비스 구조를 바탕으로, 학생·해외거주자·기업의 해외 제출 문서를 도와드립니다.',
        'btn-explore': '패키지 보기',
        'btn-process': '진행 방식 보기',
        'stat-origin': '크몽 시작가',
        'stat-markup': '사업자 마진',
        'stat-fast': '긴급 검토',
        'stat-global': '지원 국가',
        'sec-highlights-title': '이 서비스가 다루는 범위',
        'sec-highlights-subtitle': '스캔 검토부터 아포스티유 안내와 공증 연계까지, 해외 제출용 문서를 위한 실무형 프로세스입니다.',
        'highlight-1-title': '학업·비자 서류',
        'highlight-1-desc': '성적증명서, 졸업증명서, 자격증, 가족관계 서류, 여행 및 이민 서류에 적합합니다.',
        'highlight-2-title': '번역 + 공증',
        'highlight-2-desc': '번역 검토, 공증 연계, 아포스티유 체크리스트까지 함께 정리해 해외 제출을 돕습니다.',
        'highlight-3-title': '비즈니스 문서',
        'highlight-3-desc': '법인 서류, 계약서, 설립 관련 서류, 국제 규정 준수 문서에 유용합니다.',
        'sec-packages-title': '패키지 구성',
        'sec-packages-subtitle': '문서 수량과 처리 속도에 맞는 패키지를 선택하세요.',
        'card-view-pricing': '가격 확인하기',
        'faq-title': 'FAQ',
        'faq-subtitle': '주문 전에 많이 묻는 질문입니다.',
        'faq-q1': '이 서비스는 어떤 점에서 해외 제출에 적합한가요?',
        'faq-a1': '해외 학교, 대사관, 기관, 사업 파트너가 자주 요구하는 문서를 중심으로 아포스티유 안내와 공증 연계를 지원합니다.',
        'faq-q2': '어떤 문서가 가장 많이 사용되나요?',
        'faq-a2': '성적증명서, 졸업증명서, 가족관계 서류, 여권, 재직증명서, 법인 등기 및 계약서가 대표적입니다.',
        'faq-q3': '스캔본만으로도 시작할 수 있나요?',
        'faq-a3': '대부분의 경우 가능합니다. 선명한 스캔본으로 검토를 시작하고, 원본이 필요한 단계는 별도로 안내드립니다.',
        'faq-q4': '결제 후 절차는 어떻게 진행되나요?',
        'faq-a4': '패키지 선택 후 연락처와 문서 정보를 입력하고, PayPal로 안전하게 결제하면 영수증과 다음 단계 안내가 전달됩니다.',
        'view-orders-title': '주문 내역',
        'view-orders-sub': '주문 기록은 이 브라우저에 로컬 저장됩니다.',
        'th-date': '주문 날짜',
        'th-order-id': '거래 ID',
        'th-document': '문서 유형',
        'th-destination': '제출 국가',
        'th-tier': '패키지 등급',
        'th-qty': '수량',
        'th-total': '총 결제금액',
        'th-status': '상태',
        'no-orders-msg': '아직 구매 내역이 없습니다.',
        'modal-title': '주문 설정',
        'modal-desc': '문서 정보를 입력하고 안전한 PayPal 결제를 진행하세요.',
        'modal-base-pkg': '기본 패키지:',
        'modal-base-price-label': '기본 가격:',
        'modal-email-label': '이메일 주소 *',
        'modal-email-placeholder': 'name@example.com',
        'modal-email-error': '올바른 이메일 주소를 입력해주세요.',
        'modal-document-label': '문서 유형 *',
        'modal-document-placeholder': '성적증명서, 여권, 계약서...',
        'modal-destination-label': '제출 국가 *',
        'modal-destination-placeholder': '미국, 캐나다, UAE...',
        'modal-qty': '수량:',
        'modal-total-amt': '총 결제금액:',
        'modal-test-btn': '가격 텍스트를 눌러 테스트 결제',
        'badge-ssl': 'SSL 보안 결제',
        'badge-paypal': 'PayPal 인증됨',
        'foot-support': '지원',
        'foot-trust': '신뢰 요소',
        'foot-trust-1': 'SSL 보안 결제',
        'foot-trust-2': 'PayPal 인증 결제',
        'foot-trust-3': 'Google Form 영수증 전달',
        'foot-contact': '문의: snsherocom@gmail.com',
        'foot-copy': '&copy; 2026 BibleForAI APOSTBOOST. All rights reserved.',
        'order-button': '패키지 주문하기',
        'featured-badge': '인기',
        'receipt-header': 'BIBLEFORAI - APOSTBOOST 영수증',
        'receipt-date': '주문 날짜',
        'receipt-txid': '거래 ID',
        'receipt-email': '고객 이메일',
        'receipt-type': '문서 유형',
        'receipt-size': '패키지 등급',
        'receipt-destination': '제출 국가',
        'receipt-qty': '수량',
        'receipt-baseprice': '기본 가격',
        'receipt-total': '총 결제금액',
        'receipt-status': '상태',
        'receipt-method': '결제 방법',
        'receipt-method-val': 'PayPal 안전 결제'
    }
};

let currentLang = localStorage.getItem('bibleforai_lang') || (() => {
    const browserLang = (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage || '';
    return browserLang.toLowerCase().startsWith('ko') ? 'ko' : 'en';
})();

function formatPrice(usdPrice, includeUnit = true) {
    const isKo = currentLang === 'ko';
    if (isKo) {
        const krw = Math.round(usdPrice * 1400);
        return includeUnit ? `₩${krw.toLocaleString()} KRW` : `₩${krw.toLocaleString()}`;
    }
    const formatted = (usdPrice % 1 === 0) ? usdPrice.toLocaleString() : usdPrice.toFixed(2);
    return includeUnit ? `$${formatted} USD` : `$${formatted}`;
}

function applyTranslations() {
    const lang = currentLang;
    const isKo = lang === 'ko';

    document.documentElement.lang = lang;
    document.title = isKo ? 'APOSTBOOST — 아포스티유·공증 대행 | 글로벌 문서 인증' : 'APOSTBOOST — Apostille & Notarization | Global Document Authentication';

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.content = isKo
            ? '해외 제출용 문서의 아포스티유, 공증, 번역 검토를 지원하는 서비스입니다. 크몽 기준 ₩10,000부터 시작한 실전형 문서 인증 워크플로우입니다.'
            : 'Apostille, notarization, and certified document authentication for students, expats, and global businesses. Based on a Kmong service starting from ₩10,000.';
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.content = isKo ? 'APOSTBOOST — 아포스티유·공증 대행' : 'APOSTBOOST — Apostille & Notarization';
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.content = isKo ? '해외 제출용 문서를 위한 아포스티유 안내, 공증 연계, 번역 검토 지원 서비스입니다.' : 'Global document authentication with apostille guidance, notarization, and certified translation support.';
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.content = isKo ? 'APOSTBOOST — 아포스티유·공증 대행' : 'APOSTBOOST — Apostille & Notarization';
    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) twDesc.content = isKo ? '학생, 이민, 비자, 사업용 해외 제출 문서를 위한 인증 워크플로우입니다.' : 'Document authentication for international submissions, visas, schools, and business filings.';

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const translation = translations[lang] && translations[lang][key];
        if (translation === undefined) return;
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
        if (!header) return;
        if (window.scrollY > 50) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
    });
}

function navigate(viewId) {
    currentView = viewId;
    document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
    const activeSection = document.getElementById(`${viewId}-view`);
    if (activeSection) {
        activeSection.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        const target = document.getElementById(viewId);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.id === `nav-${viewId}`) link.classList.add('active');
    });
}

function toggleMobileMenu() {
    const drawer = document.getElementById('mobile-drawer');
    if (drawer) drawer.classList.toggle('active');
}

function renderAllPackages() {
    const isKo = currentLang === 'ko';
    Object.keys(packageCatalog).forEach(categoryKey => {
        const categoryData = packageCatalog[categoryKey];
        const container = document.getElementById('packages-grid');
        if (!container) return;
        container.innerHTML = categoryData.packages.map(pkg => {
            const featuredClass = pkg.featured ? 'featured' : '';
            const badgeIcon = getCategoryIcon(categoryKey);
            const name = isKo ? pkg.name_ko : pkg.name_en;
            const desc = isKo ? pkg.desc_ko : pkg.desc_en;
            const features = isKo ? pkg.features_ko : pkg.features_en;
            const btnText = translations[currentLang]['order-button'] || 'Order Package';
            const tierClass = pkg.id === 'apostille-basic' ? 'basic' : pkg.id === 'apostille-standard' ? 'standard' : 'premium';
            return `
                <div class="package-card ${featuredClass}">
                    <div class="package-card-top">
                        <div class="card-icon ${tierClass}"><i class="${badgeIcon}"></i></div>
                        ${pkg.featured ? `<span class="featured-badge">${translations[currentLang]['featured-badge'] || 'Best Value'}</span>` : ''}
                    </div>
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
        case 'apostille': return 'fa-solid fa-stamp';
        default: return 'fa-solid fa-file-signature';
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
    document.getElementById('modal-product-title').innerText = catTitle;
    document.getElementById('modal-package-name').innerText = pkgName;
    document.getElementById('modal-base-price').innerText = formatPrice(pkg.price);
    document.getElementById('order-quantity').value = orderQuantity;

    const emailInput = document.getElementById('order-email');
    const documentInput = document.getElementById('order-document-type');
    const destinationInput = document.getElementById('order-destination-country');
    [emailInput, documentInput, destinationInput].forEach(input => {
        if (input) {
            input.value = '';
            input.style.borderColor = 'var(--border)';
        }
    });
    const emailError = document.getElementById('email-error');
    if (emailError) emailError.style.display = 'none';

    const testBtn = document.getElementById('paypal-test-button');
    if (testBtn) testBtn.style.display = 'flex';

    updateModalPrice();
    document.getElementById('purchase-modal').classList.add('active');

    setTimeout(() => {
        const modalCard = document.querySelector('.modal-card');
        const paymentAnchor = document.querySelector('.paypal-wrapper');
        if (modalCard && paymentAnchor) {
            modalCard.scrollTop = Math.max(0, paymentAnchor.offsetTop - 140);
        }
    }, 350);

    initPayPalButtons();
}

function closeModal() {
    document.getElementById('purchase-modal').classList.remove('active');
    const container = document.getElementById('paypal-button-container');
    if (container) container.innerHTML = '';
}

function adjustQty(amount) {
    const qtyInput = document.getElementById('order-quantity');
    let val = parseInt(qtyInput.value, 10) || 1;
    val += amount;
    if (val < 1) val = 1;
    qtyInput.value = val;
    orderQuantity = val;
    updateModalPrice();
}

function updateModalPrice() {
    const qtyInput = document.getElementById('order-quantity');
    let val = parseInt(qtyInput.value, 10);
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
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailPattern.test(email)) {
        emailInput.style.borderColor = '#ef4444';
        if (emailError) emailError.style.display = 'block';
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
    container.innerHTML = '';

    if (typeof paypal === 'undefined') {
        container.innerHTML = '<p style="color:#ef4444;text-align:center;font-size:0.9rem;padding:1rem;font-weight:600;"><i class="fa-solid fa-triangle-exclamation"></i> PayPal is unavailable. Please reload the page.</p>';
        return;
    }

    paypalButtonInstance = paypal.Buttons({
        style: {
            layout: 'vertical',
            color: 'blue',
            shape: 'rect',
            label: 'checkout'
        },
        onClick: function(data, actions) {
            if (!validateEmailField()) {
                return actions.reject();
            }
            return actions.resolve();
        },
        createOrder: function(data, actions) {
            const docType = document.getElementById('order-document-type').value.trim() || 'Document';
            const destination = document.getElementById('order-destination-country').value.trim() || 'Global';
            const finalAmount = (currentPackage.basePrice * orderQuantity).toFixed(2);
            return actions.order.create({
                purchase_units: [{
                    description: `${currentPackage.categoryName} - ${currentPackage.tierName} [Doc: ${docType}] [Destination: ${destination}] (Qty: ${orderQuantity})`,
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
    });

    paypalButtonInstance.render('#paypal-button-container');
}

function saveLocalOrder(details) {
    const orderLogs = JSON.parse(localStorage.getItem('apostboost_orders')) || [];
    const emailVal = document.getElementById('order-email') ? document.getElementById('order-email').value.trim() : '';
    const docType = document.getElementById('order-document-type') ? document.getElementById('order-document-type').value.trim() : '';
    const destination = document.getElementById('order-destination-country') ? document.getElementById('order-destination-country').value.trim() : '';

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
        documentType: docType,
        destination: destination,
        category: currentPackage.categoryName,
        package: currentPackage.tierName,
        quantity: orderQuantity,
        basePrice: currentPackage.basePrice,
        totalPaid: formatPrice(currentPackage.basePrice * orderQuantity),
        status: 'Completed',
        clientId,
        secret
    };

    orderLogs.unshift(newOrder);
    localStorage.setItem('apostboost_orders', JSON.stringify(orderLogs));
    renderOrders();

    const dict = translations[currentLang];
    const receiptText = `===================================\n   ${dict['receipt-header']}\n===================================\n${dict['receipt-date'].padEnd(18)} : ${newOrder.date}\n${dict['receipt-txid'].padEnd(18)} : ${newOrder.id}\n${dict['receipt-email'].padEnd(18)} : ${newOrder.email}\n${dict['receipt-type'].padEnd(18)} : ${newOrder.documentType}\n${dict['receipt-destination'].padEnd(18)} : ${newOrder.destination}\n${dict['receipt-size'].padEnd(18)} : ${newOrder.package}\n${dict['receipt-qty'].padEnd(18)} : ${newOrder.quantity}\n${dict['receipt-baseprice'].padEnd(18)} : ${formatPrice(newOrder.basePrice)}\n${dict['receipt-total'].padEnd(18)} : ${newOrder.totalPaid}\n${dict['receipt-status'].padEnd(18)} : ${newOrder.status}\n-----------------------------------\n${dict['receipt-method'].padEnd(18)} : ${dict['receipt-method-val']}\n===================================`;
    const encodedReceipt = encodeURIComponent(receiptText);
    const redirectUrl = `https://docs.google.com/forms/d/e/1FAIpQLScMPqbEWWttS5mb1m_krsO_kco24ImpgvYVSbc7zO0nEVmYFw/viewform?entry.1059822061=${encodedReceipt}`;
    window.location.href = redirectUrl;
}

function renderOrders() {
    const orderLogs = JSON.parse(localStorage.getItem('apostboost_orders')) || [];
    const tbody = document.getElementById('orders-tbody');
    const noOrdersMsg = document.getElementById('no-orders-msg');
    if (!tbody || !noOrdersMsg) return;

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
            <td>${order.documentType || '-'}</td>
            <td>${order.destination || '-'}</td>
            <td>${order.package}</td>
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
