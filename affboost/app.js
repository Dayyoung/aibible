const SERVICE_ID = 'affboost';
const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScMPqbEWWttS5mb1m_krsO_kco24ImpgvYVSbc7zO0nEVmYFw/viewform?entry.1059822061=';
const GOOGLE_FORM_VALUE = 'entry.1059822061';

const packageCatalog = {
    affiliate: {
        title_en: 'AI Affiliate Website Builder',
        title_ko: 'AI 제휴 웹사이트 빌더',
        packages: [
            {
                id: 'standard',
                name_en: 'Standard',
                name_ko: '스탠다드',
                desc_en: '2 affiliate sites, up to 30 pages, ready in 7 days.',
                desc_ko: '제휴 사이트 2개, 최대 30페이지, 7일 내 제작.',
                price: 2143,
                featured: false,
                iconClass: 'standard',
                features_en: ['Automatic affiliate site build', '15 pages per site', 'Responsive layout', 'Source code delivery'],
                features_ko: ['자동 제휴 사이트 제작', '사이트당 15페이지', '반응형 레이아웃', '소스 코드 제공']
            },
            {
                id: 'deluxe',
                name_en: 'Deluxe',
                name_ko: '디럭스',
                desc_en: '5 affiliate sites, up to 75 pages, ready in 10 days.',
                desc_ko: '제휴 사이트 5개, 최대 75페이지, 10일 내 제작.',
                price: 4286,
                featured: true,
                iconClass: 'deluxe',
                features_en: ['Automatic content upload', 'Conversion-focused layout', 'SEO-ready structure', 'Priority delivery'],
                features_ko: ['자동 콘텐츠 업로드', '전환 중심 레이아웃', 'SEO 대응 구조', '우선 납품']
            },
            {
                id: 'premium',
                name_en: 'Premium',
                name_ko: '프리미엄',
                desc_en: '10 affiliate sites, up to 150 pages, ready in 14 days.',
                desc_ko: '제휴 사이트 10개, 최대 150페이지, 14일 내 제작.',
                price: 7857,
                featured: false,
                iconClass: 'premium',
                features_en: ['Best for scaling campaigns', 'Custom niche structure', 'Global audience focus', 'Dedicated support'],
                features_ko: ['확장형 캠페인에 적합', '맞춤 니치 구조 설계', '글로벌 타깃 최적화', '전담 지원']
            }
        ]
    }
};

const translations = {
    en: {
        'logo-subtitle': 'AFFBOOST',
        'home-link': 'Home',
        'hero-badge': 'Affiliate Growth Automation',
        'hero-title': 'AFFBOOST — AI Affiliate Website Builder',
        'hero-desc': 'Turn keywords into revenue-ready affiliate sites with automatic content upload, responsive layouts, source code delivery, and sandbox checkout testing.',
        'btn-view-packages': 'See Packages',
        'btn-start': 'Start Order',
        'badge-ssl': 'SSL Secured Checkout',
        'badge-paypal': 'PayPal Verified',
        'badge-code': 'Source Code Included',
        'packages-title': 'Affiliate Website Packages',
        'packages-subtitle': 'Built from the kmong service model: automatic affiliate websites, 15 pages per site, auto content upload, responsive web, and source code delivery.',
        'features-title': 'What You Get',
        'feature-1': 'Automatic affiliate website creation',
        'feature-2': '15 pages per site',
        'feature-3': 'Automatic content upload',
        'feature-4': 'Responsive web design',
        'feature-5': 'Source code delivery',
        'audience-title': 'Target Audience',
        'audience-desc': 'Affiliate marketers, niche site builders, content publishers, and founders who want an internationally usable traffic asset.',
        'faq-title': 'Frequently Asked Questions',
        'faq-q1': 'Can I test the checkout before paying?',
        'faq-a1': 'Yes. Click the visible total price text to launch the sandbox test checkout flow.',
        'faq-q2': 'What happens after payment?',
        'faq-a2': 'Your receipt is encoded and redirected to a Google Form for order tracking and follow-up.',
        'faq-q3': 'Do you support Korean and English?',
        'faq-a3': 'Yes. Use the language selector to switch between English and Korean pages.',
        'modal-title': 'Configure Order',
        'modal-desc': 'Choose a package, confirm quantity, and complete secure PayPal payment.',
        'modal-base-pkg': 'Base Package',
        'modal-base-price-label': 'Base Price',
        'modal-email-label': 'Email Address *',
        'modal-email-placeholder': 'name@example.com',
        'modal-email-error': 'Please enter a valid email address.',
        'modal-qty': 'Quantity',
        'modal-total-amt': 'Total Amount',
        'modal-price-note': 'Click the price to run the sandbox test checkout.',
        'footer-desc': 'Affiliate website automation built for global reach.',
        'order-button': 'Order Now',
        'featured-badge': 'Recommended'
    },
    ko: {
        'logo-subtitle': 'AFFBOOST',
        'home-link': '홈',
        'hero-badge': '제휴 성장 자동화',
        'hero-title': 'AFFBOOST — AI 제휴 웹사이트 빌더',
        'hero-desc': '키워드를 매출형 제휴 사이트로 전환합니다. 자동 콘텐츠 업로드, 반응형 레이아웃, 소스 코드 제공, 샌드박스 결제를 지원합니다.',
        'btn-view-packages': '패키지 보기',
        'btn-start': '주문 시작',
        'badge-ssl': 'SSL 보안 결제',
        'badge-paypal': 'PayPal 인증',
        'badge-code': '소스 코드 포함',
        'packages-title': '제휴 웹사이트 패키지',
        'packages-subtitle': '크몽 서비스 모델을 기반으로 자동 제휴 사이트, 사이트당 15페이지, 자동 콘텐츠 업로드, 반응형 웹, 소스 코드 제공을 구성했습니다.',
        'features-title': '구성 항목',
        'feature-1': '자동 제휴 웹사이트 제작',
        'feature-2': '사이트당 15페이지',
        'feature-3': '자동 콘텐츠 업로드',
        'feature-4': '반응형 웹 디자인',
        'feature-5': '소스 코드 제공',
        'audience-title': '대상 고객',
        'audience-desc': '제휴 마케터, 니치 사이트 운영자, 콘텐츠 발행자, 글로벌 트래픽 자산을 만들고 싶은 창업자에게 적합합니다.',
        'faq-title': '자주 묻는 질문',
        'faq-q1': '결제 전에 테스트할 수 있나요?',
        'faq-a1': '네. 보이는 총액 텍스트를 클릭하면 별도 테스트 버튼 없이 샌드박스 테스트 결제가 실행됩니다.',
        'faq-q2': '결제 후에는 어떻게 되나요?',
        'faq-a2': 'PayPal 승인 후 영수증 데이터가 인코딩되어 Google Form으로 이동합니다.',
        'faq-q3': '영어와 한국어를 모두 지원하나요?',
        'faq-a3': '네. 언어 선택기를 사용해 영어/한국어 페이지를 전환할 수 있습니다.',
        'modal-title': '주문 설정',
        'modal-desc': '패키지를 선택하고 수량을 확인한 뒤 안전한 PayPal 결제를 진행하세요.',
        'modal-base-pkg': '기본 패키지',
        'modal-base-price-label': '기본 가격',
        'modal-email-label': '이메일 주소 *',
        'modal-email-placeholder': 'name@example.com',
        'modal-email-error': '올바른 이메일 주소를 입력해주세요.',
        'modal-qty': '수량',
        'modal-total-amt': '총 결제금액',
        'modal-price-note': '가격 텍스트를 클릭하면 샌드박스 테스트 결제가 실행됩니다.',
        'footer-desc': '글로벌 확장을 위한 제휴 웹사이트 자동화 서비스입니다.',
        'order-button': '주문하기',
        'featured-badge': '추천'
    }
};

let currentLang = (() => {
    const saved = localStorage.getItem('bibleforai_lang');
    if (saved === 'ko' || saved === 'en') return saved;
    const browserLang = (navigator.languages && navigator.languages[0]) || navigator.language || '';
    return browserLang.toLowerCase().startsWith('ko') ? 'ko' : 'en';
})();

if (window.location.pathname.includes('/kr/')) {
    currentLang = 'ko';
    localStorage.setItem('bibleforai_lang', 'ko');
}

let currentPackage = null;
let orderQuantity = 1;
let paypalButtonsRendered = false;

function formatPrice(value) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
}

function applyTranslations() {
    document.documentElement.lang = currentLang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang] && translations[currentLang][key]) {
            el.textContent = translations[currentLang][key];
        }
    });
    const selector = document.getElementById('language-selector');
    if (selector) selector.value = currentLang;
}

function changeLanguage(lang) {
    localStorage.setItem('bibleforai_lang', lang);
    const target = lang === 'ko' ? '/affboost/kr/' : '/affboost/';
    if (window.location.pathname !== target) {
        window.location.href = target;
    }
}

function toggleMobileMenu() {
    const drawer = document.getElementById('mobile-drawer');
    if (drawer) drawer.classList.toggle('active');
}

function renderPackages() {
    const container = document.getElementById('affiliate-packages');
    if (!container) return;
    const isKo = currentLang === 'ko';
    container.innerHTML = packageCatalog.affiliate.packages.map(pkg => {
        const title = isKo ? pkg.name_ko : pkg.name_en;
        const desc = isKo ? pkg.desc_ko : pkg.desc_en;
        const features = isKo ? pkg.features_ko : pkg.features_en;
        const badge = pkg.featured ? `<div class="package-badge"><i class="fa-solid fa-sparkles"></i> ${translations[currentLang]['featured-badge']}</div>` : '';
        return `
            <article class="package-card ${pkg.featured ? 'featured' : ''}">
                ${badge}
                <div class="card-icon ${pkg.iconClass}"><i class="fa-solid fa-rocket"></i></div>
                <h3>${title}</h3>
                <p class="package-desc">${desc}</p>
                <div class="package-price-box">
                    <span class="price">${formatPrice(pkg.price)}</span>
                    <span class="currency">USD</span>
                </div>
                <ul class="package-features">
                    ${features.map(item => `<li><i class="fa-solid fa-circle-check"></i><span>${item}</span></li>`).join('')}
                </ul>
                <button class="btn-buy" onclick="openPurchaseModal('affiliate', '${pkg.id}')"><i class="fa-solid fa-bag-shopping"></i> ${translations[currentLang]['order-button']}</button>
            </article>
        `;
    }).join('');
}

function openPurchaseModal(categoryKey, packageId) {
    const category = packageCatalog[categoryKey];
    const pkg = category && category.packages.find(item => item.id === packageId);
    if (!pkg) return;

    currentPackage = {
        categoryKey,
        categoryTitle: currentLang === 'ko' ? category.title_ko : category.title_en,
        packageName: currentLang === 'ko' ? pkg.name_ko : pkg.name_en,
        basePrice: pkg.price,
        packageId: pkg.id
    };
    orderQuantity = 1;

    document.getElementById('modal-product-title').textContent = currentPackage.categoryTitle;
    document.getElementById('modal-package-name').textContent = currentPackage.packageName;
    document.getElementById('modal-base-price').textContent = formatPrice(pkg.price);
    document.getElementById('order-quantity').value = '1';
    const emailInput = document.getElementById('order-email');
    const emailError = document.getElementById('email-error');
    if (emailInput) emailInput.value = '';
    if (emailError) emailError.textContent = '';

    updateModalPrice();
    document.getElementById('purchase-modal').classList.add('active');
    document.getElementById('purchase-modal').setAttribute('aria-hidden', 'false');

    setTimeout(() => {
        const modal = document.querySelector('.modal-card');
        const payment = document.querySelector('.paypal-wrapper');
        if (modal && payment) modal.scrollTo({ top: Math.max(0, payment.offsetTop - 24), behavior: 'smooth' });
    }, 180);

    initPayPalButtons();
}

function closeModal() {
    const modal = document.getElementById('purchase-modal');
    if (modal) {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
    }
    const container = document.getElementById('paypal-button-container');
    if (container) container.innerHTML = '';
    paypalButtonsRendered = false;
}

function adjustQty(delta) {
    const input = document.getElementById('order-quantity');
    const next = Math.max(1, (parseInt(input.value, 10) || 1) + delta);
    input.value = String(next);
    orderQuantity = next;
    updateModalPrice();
}

function updateModalPrice() {
    const input = document.getElementById('order-quantity');
    const qty = Math.max(1, parseInt(input.value, 10) || 1);
    orderQuantity = qty;
    const total = (currentPackage ? currentPackage.basePrice : 0) * qty;
    const totalEl = document.getElementById('modal-total-price');
    if (totalEl) totalEl.textContent = formatPrice(total);
}

function validateEmailField() {
    const emailInput = document.getElementById('order-email');
    const emailError = document.getElementById('email-error');
    if (!emailInput) return true;
    const value = emailInput.value.trim();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    if (!ok) {
        emailInput.style.borderColor = '#f87171';
        if (emailError) emailError.textContent = translations[currentLang]['modal-email-error'];
        return false;
    }
    emailInput.style.borderColor = 'var(--border)';
    if (emailError) emailError.textContent = '';
    return true;
}

function buildReceipt(details) {
    const date = new Date().toISOString();
    const email = (document.getElementById('order-email')?.value || 'sandbox@test.dev').trim();
    const total = (currentPackage.basePrice * orderQuantity).toFixed(2);
    return [
        '=== AFFBOOST RECEIPT ===',
        `Date: ${date}`,
        `Transaction ID: ${details.id || 'N/A'}`,
        `Customer Email: ${email}`,
        `Service: AFFBOOST — AI Affiliate Website Builder`,
        `Package: ${currentPackage.packageName}`,
        `Quantity: ${orderQuantity}`,
        `Base Price: ${formatPrice(currentPackage.basePrice)}`,
        `Total Paid: ${formatPrice(Number(total))}`,
        `Payment Method: ${details.isTest ? 'Sandbox Test Checkout' : 'PayPal Secure Checkout'}`,
        '========================='
    ].join('\n');
}

function saveLocalOrder(details) {
    const orderLogs = JSON.parse(localStorage.getItem(`${SERVICE_ID}_orders`) || '[]');
    const email = (document.getElementById('order-email')?.value || 'sandbox@test.dev').trim();
    const total = currentPackage.basePrice * orderQuantity;
    orderLogs.unshift({
        id: details.id || `TX-${Date.now()}`,
        date: new Date().toISOString(),
        packageId: currentPackage.packageId,
        packageName: currentPackage.packageName,
        quantity: orderQuantity,
        total,
        email,
        test: !!details.isTest
    });
    localStorage.setItem(`${SERVICE_ID}_orders`, JSON.stringify(orderLogs));

    const encoded = encodeURIComponent(buildReceipt(details));
    window.location.href = `${GOOGLE_FORM_URL}${encoded}`;
}

function triggerTestCheckout() {
    const emailInput = document.getElementById('order-email');
    if (emailInput && !emailInput.value.trim()) {
        emailInput.value = 'sandbox@test.dev';
    }
    if (!validateEmailField()) return;
    saveLocalOrder({ id: `TEST-${Math.random().toString(36).slice(2, 10).toUpperCase()}`, isTest: true });
    closeModal();
}

function initPayPalButtons() {
    const container = document.getElementById('paypal-button-container');
    if (!container || paypalButtonsRendered) return;
    if (typeof paypal === 'undefined') {
        container.innerHTML = '<p class="error-text" style="margin:0;text-align:center;">PayPal is unavailable right now.</p>';
        return;
    }
    paypalButtonsRendered = true;
    container.innerHTML = '';
    paypal.Buttons({
        style: { layout: 'vertical', color: 'blue', shape: 'rect', label: 'paypal' },
        createOrder: (_, actions) => {
            if (!validateEmailField()) {
                throw new Error('Invalid email');
            }
            const total = (currentPackage.basePrice * orderQuantity).toFixed(2);
            return actions.order.create({
                purchase_units: [{ amount: { value: total, currency_code: 'USD' } }]
            });
        },
        onApprove: async (_, actions) => {
            const details = await actions.order.capture();
            saveLocalOrder({ id: details.id || `PAY-${Date.now()}`, isTest: false });
            closeModal();
        },
        onError: (err) => {
            console.error('PayPal error', err);
            paypalButtonsRendered = false;
        }
    }).render('#paypal-button-container').catch(err => {
        console.error(err);
        paypalButtonsRendered = false;
        container.innerHTML = '<p class="error-text" style="margin:0;text-align:center;">PayPal failed to load.</p>';
    });
}

function initLanguageRedirect() {
    if (window.location.pathname.includes('/kr/')) {
        currentLang = 'ko';
        localStorage.setItem('bibleforai_lang', 'ko');
    } else if (currentLang === 'ko') {
        window.location.replace('/affboost/kr/');
        return false;
    }
    return true;
}

document.addEventListener('DOMContentLoaded', () => {
    if (!initLanguageRedirect()) return;
    applyTranslations();
    renderPackages();
    updateModalPrice();
});
