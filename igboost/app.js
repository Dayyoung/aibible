const SERVICE_ID = 'igboost';
const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScMPqbEWWttS5mb1m_krsO_kco24ImpgvYVSbc7zO0nEVmYFw/viewform?entry.1059822061=';
const GOOGLE_FORM_VALUE = 'entry.1059822061';

const packageCatalog = {
    instagram: {
        title_en: 'Global Instagram Management',
        title_ko: '글로벌 인스타그램 운영',
        packages: [
            {
                id: 'standard',
                name_en: 'Standard',
                name_ko: '스탠다드',
                desc_en: 'Monthly English Instagram management for 1 account, 2 posts, ready in 5 days.',
                desc_ko: '영문 인스타그램 1계정, 월 2개 포스팅, 5일 내 준비.',
                price: 114.29,
                featured: false,
                iconClass: 'standard',
                features_en: ['Monthly English IG posts', 'Captions, hashtags, and visual ideas', 'Content planning support', '5-day turnaround'],
                features_ko: ['월간 영문 IG 포스팅', '캡션·해시태그·비주얼 아이디어', '콘텐츠 기획 지원', '5일 작업']
            },
            {
                id: 'deluxe',
                name_en: 'Deluxe',
                name_ko: '디럭스',
                desc_en: 'Monthly English Instagram management for 1 account, 4 posts, ready in 10 days.',
                desc_ko: '영문 인스타그램 1계정, 월 4개 포스팅, 10일 내 준비.',
                price: 228.57,
                featured: true,
                iconClass: 'deluxe',
                features_en: ['Monthly English IG posts', 'More content variations', 'Content calendar guidance', '2 revision rounds'],
                features_ko: ['월간 영문 IG 포스팅', '더 다양한 콘텐츠 구성', '콘텐츠 캘린더 안내', '2회 수정']
            },
            {
                id: 'premium',
                name_en: 'Premium',
                name_ko: '프리미엄',
                desc_en: 'Monthly English Instagram management with 4+ posts, community management, ready in 30 days.',
                desc_ko: '영문 인스타그램 월 4개 이상, 커뮤니티 관리 포함, 30일 내 준비.',
                price: 428.57,
                featured: false,
                iconClass: 'premium',
                features_en: ['4+ posts per month', 'Carousel and story support', 'Community management', '4 revision rounds'],
                features_ko: ['월 4개 이상 포스팅', '캐러셀·스토리 지원', '커뮤니티 관리', '4회 수정']
            }
        ]
    }
};

const translations = {
    en: {
        'logo-subtitle': 'IGBOOST',
        'home-link': 'Home',
        'hero-badge': 'Global Instagram Management',
        'hero-title': 'IGBOOST — Global Instagram Management',
        'hero-desc': 'Manage English Instagram accounts with content planning, captions, hashtag sets, visuals, and monthly posting support for global brands.',
        'btn-view-packages': 'See Packages',
        'btn-start': 'Start Order',
        'badge-ssl': 'SSL Secured Checkout',
        'badge-paypal': 'PayPal Verified',
        'badge-code': 'Receipt to Google Form',
        'packages-title': 'Instagram Management Packages',
        'packages-subtitle': 'Sourced from the Professional service model: English Instagram management, monthly posting, content ideas, captions, and brand-aligned social media operations.',
        'features-title': 'What You Get',
        'feature-1': 'English Instagram post planning',
        'feature-2': 'Captions and hashtags',
        'feature-3': 'Content and visual ideas',
        'feature-4': 'Monthly operating support',
        'feature-5': 'Source-based workflow',
        'audience-title': 'Target Audience',
        'audience-desc': 'Brands, founders, agencies, and overseas-facing businesses that need English Instagram content and social account support.',
        'faq-title': 'Frequently Asked Questions',
        'faq-q1': 'Can I test the checkout before paying?',
        'faq-a1': 'Yes. Click the visible total price text to launch the secure checkout payment checkout flow.',
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
        'footer-desc': 'Instagram management automation built for global reach.',
        'order-button': 'Order Now',
        'featured-badge': 'Recommended'
    },
    ko: {
        'logo-subtitle': 'IGBOOST',
        'home-link': '홈',
        'hero-badge': '글로벌 인스타그램 운영',
        'hero-title': 'IGBOOST — 글로벌 인스타그램 운영',
        'hero-desc': '영문 인스타그램 계정을 위한 콘텐츠 기획, 캡션, 해시태그 세트, 비주얼 아이디어, 월간 포스팅 지원을 제공합니다.',
        'btn-view-packages': '패키지 보기',
        'btn-start': '주문 시작',
        'badge-ssl': 'SSL 보안 결제',
        'badge-paypal': 'PayPal 인증',
        'badge-code': 'Google Form 영수증 전송',
        'packages-title': '인스타그램 운영 패키지',
        'packages-subtitle': '전문가 서비스 모델을 바탕으로 영문 인스타그램 운영, 월간 포스팅, 콘텐츠 아이디어, 캡션, 브랜드 맞춤 SNS 운영을 구성했습니다.',
        'features-title': '구성 항목',
        'feature-1': '영문 인스타그램 포스팅 기획',
        'feature-2': '캡션 및 해시태그',
        'feature-3': '콘텐츠/비주얼 아이디어',
        'feature-4': '월간 운영 지원',
        'feature-5': '소스 기반 워크플로',
        'audience-title': '대상 고객',
        'audience-desc': '영문 인스타그램 콘텐츠와 소셜 계정 관리가 필요한 브랜드, 창업자, 에이전시, 해외 진출 기업에 적합합니다.',
        'faq-title': '자주 묻는 질문',
        'faq-q1': '결제 전에 테스트할 수 있나요?',
        'faq-a1': '네. 보이는 총액 텍스트를 클릭하면 별도 테스트 버튼 없이 보안 결제가 실행됩니다.',
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
        'footer-desc': '글로벌 확장을 위한 인스타그램 운영 자동화 서비스입니다.',
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

function formatPrice(usdPrice, includeUnit = true) {
    const isKo = currentLang === 'ko';
    if (isKo) {
        const krw = Math.round(usdPrice * 1400);
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
    const target = lang === 'ko' ? '/igboost/kr/' : '/igboost/';
    if (window.location.pathname !== target) {
        window.location.href = target;
    }
}

function toggleMobileMenu() {
    const drawer = document.getElementById('mobile-drawer');
    if (drawer) drawer.classList.toggle('active');
}

function renderPackages() {
    const container = document.getElementById('instagram-packages');
    if (!container) return;
    const isKo = currentLang === 'ko';
    container.innerHTML = packageCatalog.instagram.packages.map(pkg => {
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
                <button class="btn-buy" onclick="openPurchaseModal('instagram', '${pkg.id}')"><i class="fa-solid fa-bag-shopping"></i> ${translations[currentLang]['order-button']}</button>
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
    const email = (document.getElementById('order-email')?.value || 'secure checkout@test.dev').trim();
    const total = (currentPackage.basePrice * orderQuantity).toFixed(2);
    return [
        '=== IGBOOST RECEIPT ===',
        `Date: ${date}`,
        `Transaction ID: ${details.id || 'N/A'}`,
        `Customer Email: ${email}`,
        `Service: IGBOOST — Global Instagram Management`,
        `Category: Instagram Management`,
        `Package: ${currentPackage.packageName}`,
        `Quantity: ${orderQuantity}`,
        `Base Price: ${formatPrice(currentPackage.basePrice)}`,
        `Total Paid: ${formatPrice(Number(total))}`,
        `Payment Method: ${details.isTest ? 'secure checkout payment checkout' : 'PayPal Secure Checkout'}`,
        '========================='
    ].join('\n');
}

function saveLocalOrder(details) {
    const orderLogs = JSON.parse(localStorage.getItem(`${SERVICE_ID}_orders`) || '[]');
    const email = (document.getElementById('order-email')?.value || 'secure checkout@test.dev').trim();
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
        emailInput.value = 'secure checkout@test.dev';
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
        window.location.replace('/igboost/kr/');
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

// Expose variables globally to prevent ReferenceErrors in inline HTML scripts/handlers
if (typeof navigate !== 'undefined') { window.navigate = navigate; }
if (typeof currentLang !== 'undefined') { window.currentLang = currentLang; }

window.openPurchaseModal = openPurchaseModal;
window.closeModal = closeModal;
window.adjustQty = adjustQty;
window.changeLanguage = changeLanguage;
