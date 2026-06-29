// App State
let currentView = 'home';
let currentPackage = null;
let orderQuantity = 1;
let paypalButtonInstance = null;

// Package Catalog with Localized Keys
const packageCatalog = {
    starter: {
        title_en: 'Starter Plan',
        title_ko: '스타터 플랜',
        packages: [
            { id: 'starter-basic', name_en: 'Basic', name_ko: '베이직', desc_en: 'Single booking page with unlimited appointments and email reminders.', desc_ko: '무제한 예약 수신과 이메일 리마인더가 포함된 단일 예약 페이지.', price: 39, featured: false, features_en: ['1 Booking Page', 'Unlimited Appointments', 'Email Reminders', 'Google Calendar Sync'], features_ko: ['1개 예약 페이지', '무제한 예약', '이메일 리마인더', 'Google 캘린더 연동'] },
            { id: 'starter-plus', name_en: 'Plus', name_ko: '플러스', desc_en: 'Same as Basic plus SMS reminders and custom booking rules.', desc_ko: '베이직에 SMS 리마인더와 커스텀 예약 규칙이 추가된 플랜.', price: 79, featured: false, features_en: ['Starter Features', 'SMS Reminders', 'Custom Hours', 'Basic Analytics'], features_ko: ['스타터 기능 포함', 'SMS 리마인더', '커스텀 운영시간', '기본 분석'] },
            { id: 'starter-pro', name_en: 'Plus Pro', name_ko: '플러스 프로', desc_en: 'Plus plus Outlook sync and weekly booking reports.', desc_ko: 'Outlook 연동과 주간 예약 리포트가 추가된 업그레이드 플랜.', price: 119, featured: true, features_en: ['Plus Features', 'Outlook Sync', 'Weekly Report', '1 Team Member'], features_ko: ['플러스 기능 포함', 'Outlook 연동', '주간 리포트', '1명 팀원 지원'] }
        ]
    },
    growth: {
        title_en: 'Growth Plan',
        title_ko: '성장형 플랜',
        packages: [
            { id: 'growth-team', name_en: 'Team', name_ko: '팀', desc_en: 'Multi-staff scheduling with Google/Outlook sync and SMS reminders.', desc_ko: 'Google/Outlook 연동과 SMS 리마인더가 포함된 다중 직원 스케줄링.', price: 149, featured: false, features_en: ['Multi-Staff', 'Google + Outlook', 'SMS Reminders', 'Group Scheduling'], features_ko: ['다중 직원 스케줄링', 'Google+Outlook 연동', 'SMS 리마인더', '그룹 스케줄링'] },
            { id: 'growth-team-plus', name_en: 'Team Plus', name_ko: '팀 플러스', desc_en: 'Team plus custom workflow automation and priority support.', desc_ko: '팀 플랜에 커스텀 워크플로 자동화와 우선 지원이 포함된 플랜.', price: 199, featured: false, features_en: ['Growth Features', 'Workflow Automation', 'Priority Support', 'Up to 5 Staff'], features_ko: ['그로스 기능 포함', '워크플로 자동화', '우선 지원', '최대 5명 직원'] },
            { id: 'growth-advanced', name_en: 'Advanced', name_ko: '어드밴스드', desc_en: 'Advanced analytics, Zapier integration, and payment collection.', desc_ko: '고급 분석, Zapier 연동, 결제 수집 기능이 포함된 플랜.', price: 249, featured: true, features_en: ['Team Plus Features', 'Zapier Integration', 'Payments', 'Up to 15 Staff'], features_ko: ['팀 플러스 기능 포함', 'Zapier 연동', '결제 수집', '최대 15명 직원'] }
        ]
    },
    pro: {
        title_en: 'Pro Plan',
        title_ko: '프로 플랜',
        packages: [
            { id: 'pro-business', name_en: 'Business', name_ko: '비즈니스', desc_en: 'Full automation suite for growing service companies.', desc_ko: '성장하는 서비스 기업을 위한 전체 자동화 스위트.', price: 99, featured: false, features_en: ['Full Automation', 'Zapier + Webhooks', 'Custom Branding', 'Analytics Dashboard'], features_ko: ['전체 자동화', 'Zapier + 웹훅', '커스텀 브랜딩', '분석 대시보드'] },
            { id: 'pro-scaling', name_en: 'Scaling', name_ko: '스케일링', desc_en: 'Business plus API access and advanced booking logic.', desc_ko: '비즈니스 플랜에 API 액세스와 고급 예약 로직이 포함된 플랜.', price: 199, featured: false, features_en: ['Pro Features', 'API Access', 'Advanced Rules', 'SSO Ready'], features_ko: ['프로 기능 포함', 'API 액세스', '고급 규칙', 'SSO 지원'] }
        ]
    },
    enterprise: {
        title_en: 'Enterprise Plan',
        title_ko: '엔터프라이즈 플랜',
        packages: [
            { id: 'enterprise-white', name_en: 'White Label', name_ko: '화이트라벨', desc_en: 'Full white-label booking experience with your own branding.', desc_ko: '자체 브랜드의 화이트라벨 예약 시스템 전체 제공.', price: 149, featured: false, features_en: ['White Label', 'Unlimited Staff', 'Custom Domain', 'Dedicated Support'], features_ko: ['화이트라벨', '무제한 직원', '커스텀 도메인', '전담 지원'] },
            { id: 'enterprise-custom', name_en: 'Custom Build', name_ko: '커스텀 빌드', desc_en: 'Fully custom calendar logic built for your exact operations.', desc_ko: '귀하의 정확한 운영에 맞춘 완전한 커스텀 캘린더 로직 구축.', price: 299, featured: true, features_en: ['Enterprise UI', 'Custom Logic', 'API + Webhooks', 'Account Manager'], features_ko: ['기업 전용 UI', '커스텀 로직', 'API + 웹훅', '계정 매니저 배정'] }
        ]
    }
};

// Translation Dictionary
const translations = {
    en: {
        "logo-subtitle": "BOOKBOOST!",
        "nav-home": "Home",
        "nav-starter": "Starter",
        "nav-growth": "Growth",
        "nav-pro": "Pro",
        "nav-enterprise": "Enterprise",
        "btn-orders": "My Orders",
        "hero-badge": "AI-Powered Scheduling",
        "hero-title": "BibleForAI — BOOKBOOST",
        "hero-desc": "Automate your bookings with AI smart scheduling, 24/7 automated availability, and calendar sync for service businesses worldwide.",
        "btn-explore": "Explore Packages",
        "btn-compliance": "Why Automated Booking?",

        "stat-bookings": "Zero",
        "stat-bookings-label": "Missed Bookings",
        "stat-uptime": "24/7",
        "stat-uptime-label": "Automated Availability",
        "stat-channels": "3+",
        "stat-channels-label": "Calendar Integrations",
        "stat-time": "60m",
        "stat-time-label": "Setup Time",

        "sec-channels-title": "Smart Booking Plans for Every Stage",
        "sec-channels-subtitle": "From solo consultants to enterprises — automate appointments, eliminate conflicts, and sync with every major calendar platform.",
        "card-starter-title": "Starter — Solo",
        "card-starter-desc": "One booking page, accept unlimited appointments, email reminders.",
        "card-growth-title": "Growth — Small Team",
        "card-growth-desc": "Multi-staff scheduling, SMS reminders, and Google/Outlook sync.",
        "card-pro-title": "Pro — Growing Business",
        "card-pro-desc": "Full automation, Zapier integration, custom workflows, and analytics.",
        "card-enterprise-title": "Enterprise — Organization",
        "card-enterprise-desc": "White-label, API access, dedicated manager, and custom calendar logic.",
        "card-view-pricing": "Get Started",

        "comp-title": "Why Automate Your Booking?",
        "comp-desc": "Manual scheduling wastes time and causes costly missed appointments. BOOKBOOST replaces back-and-forth emails with an always-available, intelligent calendar that syncs in real time.",
        "comp-bullet1-bold": "24/7 Booking:",
        "comp-bullet1-text": "Clients book anytime — no email ping-pong.",
        "comp-bullet2-bold": "Calendar Sync:",
        "comp-bullet2-text": "Two-way sync with Google, Outlook, and Apple calendars.",
        "comp-bullet3-bold": "Auto Reminders:",
        "comp-bullet3-text": "SMS + email reminders cut no-shows by up to 80%.",

        "view-starter-sub": "Perfect for freelancers, coaches, and solo consultants who want an elegant booking page.",
        "view-growth-sub": "Multi-staff scheduling with SMS reminders and calendar integrations.",
        "view-pro-sub": "Full automation, Zapier modules, custom workflows, and booking analytics.",
        "view-enterprise-sub": "White-label booking experience, API access, and dedicated implementation support.",
        "view-orders-title": "My Purchase History",
        "view-orders-sub": "Review your successful orders. Your data is stored locally in your browser workspace.",

        "th-date": "Order Date",
        "th-order-id": "Transaction ID",
        "th-product": "Product",
        "th-tier": "Package Tier",
        "th-service": "Booking Type",
        "th-qty": "Quantity",
        "th-total": "Total Paid",
        "th-status": "Status",

        "no-orders-msg": "No purchase records found. Make your first order to see history here!",

        "modal-title": "Configure Order",
        "modal-desc": "Choose your booking automation plan and complete secure PayPal payment.",
        "modal-base-pkg": "Base Package:",
        "modal-base-price-label": "Base Price:",
        "modal-email-label": "Email Address *",
        "modal-email-placeholder": "name@example.com",
        "modal-email-error": "Please enter a valid email address.",
        "modal-service-label": "Booking Service Type:",
        "modal-qty": "Quantity:",
        "modal-total-amt": "Total Amount:",
        "modal-test-btn": "Click price to test checkout",

        "badge-ssl": "SSL Secured Checkout",
        "badge-paypal": "PayPal Verified",

        "foot-channels": "Booking Plans",
        "foot-legal": "Legal & Support",
        "foot-security": "Secure 24/7 Infrastructure",
        "foot-support": "Lifetime Email Support",
        "foot-delivery": "60-Minute Setup",
        "foot-guarantee": "30-Day Money-Back Guarantee",
        "foot-contact": "Contact support: snsherocom@gmail.com",
        "foot-copy": "&copy; 2026 BibleForAI BOOKBOOST. All rights reserved. Smart Appointment Booking Automation.",

        "order-button": "Order Package",
        "featured-badge": "Best Seller",

        // Receipts
        "receipt-header": "BIBLEFORAI - BOOKBOOST RECEIPT",
        "receipt-date": "Order Date",
        "receipt-txid": "Transaction ID",
        "receipt-email": "Customer Email",
        "receipt-type": "Product Type",
        "receipt-size": "Package Size",
        "receipt-country": "Booking Type",
        "receipt-qty": "Quantity",
        "receipt-baseprice": "Base Price",
        "receipt-total": "Total Paid",
        "receipt-status": "Status",
        "receipt-method": "Payment Method",
        "receipt-method-val": "PayPal Secure Checkout"
    },
    ko: {
        "logo-subtitle": "BOOKBOOST!",
        "nav-home": "홈",
        "nav-starter": "스타터",
        "nav-growth": "성장형",
        "nav-pro": "프로",
        "nav-enterprise": "엔터프라이즈",
        "btn-orders": "내 주문 내역",
        "hero-badge": "AI 기반 예약 자동화",
        "hero-title": "BibleForAI — BOOKBOOST",
        "hero-desc": "AI 스마트 스케줄링으로 예약·일정·알림을 자동화하세요. 전 세계 서비스 비즈니스를 위한 24/7 자동 예약 플랫폼.",
        "btn-explore": "플랜 둘러보기",
        "btn-compliance": "자동 예약의 장점",

        "stat-bookings": "0건",
        "stat-bookings-label": "누락 예약 제로",
        "stat-uptime": "24/7",
        "stat-uptime-label": "자동 예약 운영",
        "stat-channels": "3+",
        "stat-channels-label": "캘린더 연동",
        "stat-time": "60분",
        "stat-time-label": "설치 소요 시간",

        "sec-channels-title": "성장 단계별 예약 자동화 플랜",
        "sec-channels-subtitle": "개인 컨설턴트부터 기업까지 — 스케줄 충돌 없이 모든 주요 캘린더와 실시간 동기화되는 예약 자동화를 경험하세요.",
        "card-starter-title": "스타터 — 개인",
        "card-starter-desc": "1개의 예약 페이지, 무제한 예약 수신, 이메일 리마인더.",
        "card-growth-title": "성장형 — 소규모 팀",
        "card-growth-desc": "멀티 스태프 스케줄링, SMS 리마인더, Google/Outlook 동기화.",
        "card-pro-title": "프로 — 성장 비즈니스",
        "card-pro-desc": "전체 자동화, Zapier 연동, 커스텀 워크플로, 분석 대시보드.",
        "card-enterprise-title": "엔터프라이즈 — 조직",
        "card-enterprise-desc": "화이트라벨, API 액세스, 전담 매니저, 맞춤 캘린더 로직.",
        "card-view-pricing": "시작하기",

        "comp-title": "예약 자동화가 필요한 이유",
        "comp-desc": "수동 스케줄링은 시간 낭비를 초래하고 비싼 놓친 예약을 유발합니다. BOOKBOOST는 항시 가용성 AI 캘린더로 이메일 왕래를 대체합니다.",
        "comp-bullet1-bold": "24/7 예약:",
        "comp-bullet1-text": "고객이 언제든 원할 때 예약할 수 있습니다.",
        "comp-bullet2-bold": "캘린더 동기화:",
        "comp-bullet2-text": "Google, Outlook, Apple 캘린더와 양방향 실시간 연동.",
        "comp-bullet3-bold": "자동 리마인더:",
        "comp-bullet3-text": "SMS + 이메일 알림으로 노쇼율을 최대 80% 감소.",

        "view-starter-sub": "프리랜서, 코치, 개인 컨설턴트를 위한 우아한 예약 페이지.",
        "view-growth-sub": "멀티 스태프 스케줄링, SMS 리마인더, 캘린더 연동.",
        "view-pro-sub": "전체 자동화, Zapier 연동, 커스텀 워크플로, 예약 분석.",
        "view-enterprise-sub": "화이트라벨 예약 시스템, API 액세스, 전담 구현 지원.",
        "view-orders-title": "내 구매 히스토리",
        "view-orders-sub": "성공한 주문 내역을 검토하세요. 데이터는 브라우저 로컬스토리지에 안전하게 보관됩니다.",

        "th-date": "주문 날짜",
        "th-order-id": "트랜잭션 ID",
        "th-product": "상품명",
        "th-tier": "패키지 등급",
        "th-service": "예약 유형",
        "th-qty": "수량",
        "th-total": "총 결제금액",
        "th-status": "상태",

        "no-orders-msg": "구매 기록이 없습니다. 첫 주문을 완료하시면 내역이 여기에 표시됩니다!",

        "modal-title": "주문 설정",
        "modal-desc": "예약 자동화 플랜을 선택하고 안전한 PayPal 결제를 완료하세요.",
        "modal-base-pkg": "기본 플랜:",
        "modal-base-price-label": "기본 가격:",
        "modal-email-label": "이메일 주소 *",
        "modal-email-placeholder": "name@example.com",
        "modal-email-error": "올바른 이메일 주소를 입력해주세요.",
        "modal-service-label": "예약 서비스 유형:",
        "modal-qty": "수량:",
        "modal-total-amt": "총 결제금액:",
        "modal-test-btn": "가격 텍스트를 눌러 테스트 결제",

        "badge-ssl": "SSL 보안 결제 지원",
        "badge-paypal": "PayPal 인증됨",

        "foot-channels": "예약 플랜",
        "foot-legal": "법적 고지 & 지원",
        "foot-security": "24/7 보안 인프라",
        "foot-support": "평생 이메일 지원",
        "foot-delivery": "60분 설치 제공",
        "foot-guarantee": "30일 환불 보장",
        "foot-contact": "문의 지원: snsherocom@gmail.com",
        "foot-copy": "&copy; 2026 BibleForAI BOOKBOOST. All rights reserved. 스마트 예약 자동화 플랫폼.",

        "order-button": "패키지 주문하기",
        "featured-badge": "베스트 셀러",

        // Receipts
        "receipt-header": "BIBLEFORAI - BOOKBOOST 영수증",
        "receipt-date": "주문 날짜",
        "receipt-txid": "트랜잭션 ID",
        "receipt-email": "고객 이메일",
        "receipt-type": "상품 종류",
        "receipt-size": "패키지 크기",
        "receipt-country": "예약 유형",
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

    document.title = isKo ? "BibleForAI - BOOKBOOST | AI 예약 자동화 스케줄링" : "BibleForAI - BOOKBOOST | Smart Appointment Booking Automation";

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.content = isKo ?
            "24/7 자동 예약, 스마트 스케줄링, Google/Outlook 캘린더 동기화로 비즈니스 예약을 자동화하세요. 전 세계 서비스 비즈니스를 위한 AI 기반 예약 관리 시스템." :
            "Automate your booking and appointment scheduling with AI-powered SMART calendars, reminders, and calendar integrations. 24/7 automated booking for service businesses worldwide.";
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.content = isKo ? "BibleForAI - BOOKBOOST | AI 예약 자동화" : "BibleForAI - BOOKBOOST | AI Appointment Booking Automation";

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.content = isKo ?
        "AI 기반 스마트 예약 페이지, 24/7 자동 스케줄링, 캘린더 동기화(Google/Outlook/Apple)로 전 세계 서비스 예약을 자동화하세요." :
        "Automate bookings, scheduling, and reminders with AI-powered booking pages and calendar integrations. 24/7 automated service for service businesses worldwide.";

    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.content = isKo ? "BibleForAI - BOOKBOOST | AI 예약 자동화" : "BibleForAI - BOOKBOOST | AI Appointment Booking Automation";

    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) twDesc.content = isKo ?
        "24/7 자동 예약, 캘린더 연동, 자동 알림으로 서비스 예약을 스마트하게 관리하세요." :
        "Automate bookings, scheduling, and reminders with AI-powered booking pages. 24/7 automated service for service businesses worldwide.";

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
        header.classList.toggle('scrolled', window.scrollY > 50);
    });
}

function navigate(viewId) {
    currentView = viewId;

    document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));

    const target = document.getElementById(`${viewId}-view`);
    if (target) target.classList.add('active');

    document.querySelectorAll('.nav-links a').forEach(link => link.classList.remove('active'));
    const activeLink = document.getElementById(`nav-${viewId}`);
    if (activeLink) activeLink.classList.add('active');

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
            const name = isKo ? pkg.name_ko : pkg.name_en;
            const desc = isKo ? pkg.desc_ko : pkg.desc_en;
            const features = isKo ? pkg.features_ko : pkg.features_en;
            const btnText = translations[currentLang]['order-button'] || 'Order Package';

            return `
                <div class="package-card ${pkg.featured ? 'featured' : ''}">
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
                        <i class="fa-solid fa-calendar-check"></i> ${btnText}
                    </button>
                </div>
            `;
        }).join('');
    });
}

function getCategoryIcon(category) {
    const map = {
        starter: 'fa-solid fa-calendar-day',
        growth: 'fa-solid fa-calendar-week',
        pro: 'fa-solid fa-calendar-plus',
        enterprise: 'fa-solid fa-building'
    };
    return map[category] || 'fa-solid fa-calendar-check';
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
    if (emailInput) {
        emailInput.value = '';
        emailInput.style.borderColor = 'var(--border)';
    }
    const emailError = document.getElementById('email-error');
    if (emailError) emailError.style.display = 'none';

    document.getElementById('paypal-test-button').style.display = 'block';

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
        const emailError = document.getElementById('email-error');
        if (emailError) emailError.style.display = 'none';
    }
    if (!validateEmailField()) return;

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
        style: { layout: 'vertical', color: 'blue', shape: 'rect', label: 'checkout' },
        onClick: function(data, actions) {
            if (!validateEmailField()) return actions.reject();
            return actions.resolve();
        },
        createOrder: function(data, actions) {
            const selectedCountry = document.getElementById('order-country').value;
            const finalAmount = (currentPackage.basePrice * orderQuantity).toFixed(2);
            return actions.order.create({
                purchase_units: [{
                    description: `${currentPackage.categoryName} - ${currentPackage.tierName} [Booking Type: ${selectedCountry}] (Qty: ${orderQuantity})`,
                    amount: { currency_code: 'USD', value: finalAmount }
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
    const orderLogs = JSON.parse(localStorage.getItem('bookboost_orders')) || [];
    const selectedCountry = document.getElementById('order-country').value;
    const emailVal = document.getElementById('order-email') ? document.getElementById('order-email').value.trim() : '';

    let clientId = 'Ae_xg2SjogcseJVcjXldc_TEnVWBzmPw8aNimrSncYBb0Wrn_m93w_PkMgdxWTQ2fJExV8QKWHR2-7hK';
    let secret = '';

    if (details.isTest) {
        clientId = 'AeZhTof6R4GGZ8tp2dz1l1tIt970_y_G1uTufgjs-7_rYxRNsre2GKd5LUaiAqDmdOlYzABi-_HgSpe4';
        secret = '[REDACTED]';
    }

    const newOrder = {
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
        id: details.id,
        email: emailVal,
        category: currentPackage.categoryName,
        package: currentPackage.tierName,
        serviceType: selectedCountry,
        quantity: orderQuantity,
        basePrice: currentPackage.basePrice,
        totalPaid: formatPrice(currentPackage.basePrice * orderQuantity),
        status: 'Completed',
        clientId,
        secret
    };

    orderLogs.unshift(newOrder);
    localStorage.setItem('bookboost_orders', JSON.stringify(orderLogs));

    renderOrders();

    const isKo = currentLang === 'ko';
    const dict = translations[currentLang];
    const receiptText = `
===================================
   ${dict["receipt-header"]}
===================================
${dict["receipt-date"].padEnd(15)} : ${newOrder.date}
${dict["receipt-txid"].padEnd(15)} : ${newOrder.id}
${dict["receipt-email"].padEnd(15)} : ${newOrder.email}
${dict["receipt-type"].padEnd(15)} : ${newOrder.category}
${dict["receipt-size"].padEnd(15)} : ${newOrder.package}
${dict["receipt-country"].padEnd(15)} : ${newOrder.serviceType}
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
    const orderLogs = JSON.parse(localStorage.getItem('bookboost_orders')) || [];
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
            <td>${order.serviceType || 'General Booking'}</td>
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
