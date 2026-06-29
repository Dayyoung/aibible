// App State
let currentView = 'home';
let currentPackage = null;
let orderQuantity = 1;
let paypalButtonInstance = null;

// Package Catalog with Localized Keys
const packageCatalog = {
    platform: {
        title_en: 'Platform Setup',
        title_ko: '플랫폼 구축',
        packages: [
            { id: 'platform-basic', name_en: 'Basic Setup', name_ko: '기본 구축', desc_en: 'Foundational course structure and configuration on a single platform.', desc_ko: '단일 플랫폼 기초 강의 구조 및 설정 구축.', price: 19, featured: false, features_en: ['Platform selection', 'Single course setup', 'Checkout + login setup', 'Email support'], features_ko: ['플랫폼 추천 및 선정', '단일 강의 기본 세팅', '결제 및 회원가입 연동', '이메일 고객 지원'] },
            { id: 'platform-pro', name_en: 'Pro Setup', name_ko: '프로 구축', desc_en: 'Multi-course academy with quizzes, drip content, and completion features.', desc_ko: '퀴즈, drip 콘텐츠, 수료 기능을 지원하는 멀티 코스 아카데미.', price: 99, featured: false, features_en: ['Up to 5 courses', 'Quizzes + assignments', 'Drip release', 'Priority support'], features_ko: ['최대 5개 강의', '퀴즈 및 과제', 'Drip 공개 설정', '우선 기술 지원'] },
            { id: 'platform-starter', name_en: 'Starter', name_ko: '스타터', desc_en: 'Starter plan for author accounts and course launch basics.', desc_ko: '작성자 계정 및 강의 런칭 입문용 스타터 플랜.', price: 29, featured: false, features_en: ['Author setup', 'Publish support', 'Basic settings', 'Email support'], features_ko: ['작성자 계정 세팅', '출판 지원', '기본 설정', '이메일 지원'] },
            { id: 'platform-plus', name_en: 'Plus Setup', name_ko: '플러스 구축', desc_en: 'Expanded setup with advanced modules and guidance for up to 15 courses.', desc_ko: '고급 모듈 및 최대 15개 강의 가이드를 제공하는 확장 구축.', price: 249, featured: false, features_en: ['Up to 15 courses', 'Advanced modules', 'Analytics setup', 'Priority support'], features_ko: ['최대 15개 강의', '고급 모듈', '분석 대시보드 구성', '우선 기술 지원'] },
            { id: 'platform-pro-max', name_en: 'Pro Max', name_ko: '프로 맥스', desc_en: 'Priority launch with brand academy flow and dedicated support.', desc_ko: '브랜드 아카데미 흐름 및 전담 지원 우선 런칭.', price: 499, featured: true, features_en: ['Priority launch', 'Brand academy flow', 'Dedicated onboarding', 'VIP support'], features_ko: ['우선 런칭', '브랜드 아카데미 흐름', '전담 온보딩', 'VIP 지원'] },
            { id: 'platform-custom', name_en: 'Custom LMS', name_ko: '커스텀 LMS', desc_en: 'Fully custom LMS implementation with tailored course loading and integrations.', desc_ko: '커스텀 LMS 구현 및 맞춤형 강의 로딩과 통합.', price: 899, featured: false, features_en: ['Custom LMS', 'Bespoke integrations', 'Advanced SSO', 'Account manager'], features_ko: ['커스텀 LMS', '맞춤 통합', '고급 SSO', '전담 매니저'] }
        ]
    },
    content: {
        title_en: 'Course Content',
        title_ko: '강의 콘텐츠',
        packages: [
            { id: 'content-outline', name_en: 'Curriculum Outline', name_ko: '커리큘럼 기획', desc_en: 'Learning goals, modules, lesson storyboards, and assessment design.', desc_ko: '학습 목표, 모듈, 레슨 스토리보드 및 평가 설계.', price: 29, featured: false, features_en: ['Curriculum design', 'Module breakdown', 'Assessment framework', 'Files delivery'], features_ko: ['커리큘럼 설계', '모듈 분석', '평가 프레임워크', '파일 전달'] },
            { id: 'content-video', name_en: 'Video Production', name_ko: '영상 제작', desc_en: 'Scriptwriting, recording coaching, editing, subtitles, and thumbnail design.', desc_ko: '대본 작성, 촬영 코칭, 편집, 자막 및 썸네일 디자인.', price: 399, featured: false, features_en: ['Script + storyboard', 'Recording setup guidance', 'Editing + subtitles', 'Thumbnails'], features_ko: ['대본 및 스토리보드', '촬영 세팅 가이드', '편집 및 자막', '썸네일 디자인'] }
        ]
    },
    instructor: {
        title_en: 'Instructor Recruiting',
        title_ko: '강사 채용',
        packages: [
            { id: 'recruit-basic', name_en: 'Talent Search', name_ko: '인재 검색', desc_en: 'Engage subject experts for shortlist and interviews.', desc_ko: '주제 전문가를 섭외하고 서류/인터뷰를 진행합니다.', price: 49, featured: false, features_en: ['Requirements intake', 'Candidate search', 'Shortlist review', 'Intro coordination'], features_ko: ['요구사항 접수', '후보 검색', '숏리스트 리뷰', '협업 소개'] }
        ]
    },
    funnel: {
        title_en: 'Enrollment Funnel',
        title_ko: '수강 전환 퍼널',
        packages: [
            { id: 'funnel-boost', name_en: 'Launch Funnel', name_ko: '런칭 퍼널', desc_en: 'Conversion-focused landing pages, checkout flows, and email sequences for launches.', desc_ko: '전환 중심 랜딩, 결제 플로우, 런칭용 이메일 시퀀스.', price: 279, featured: false, features_en: ['Landing page', 'Checkout flow', 'Email sequence', 'A/B support'], features_ko: ['랜딩 페이지', '결제 플로우', '이메일 시퀀스', 'A/B 테스트 지원'] }
        ]
    },
    live: {
        title_en: 'Live Class Ops',
        title_ko: '라이브 수업 운영',
        packages: [
            { id: 'live-basic', name_en: 'Live Setup', name_ko: '라이브 세팅', desc_en: 'Zoom/webinar setup, scheduling, attendance, replay publishing, and support.', desc_ko: '줌/웨비나 세팅, 일정, 출석, 리플레이 게시 및 지원.', price: 79, featured: false, features_en: ['Zoom/webinar setup', 'Scheduling', 'Replay publishing', 'Support included'], features_ko: ['줌/웨비나 세팅', '일정 관리', '리플레이 게시', '기본 지원 포함'] }
        ]
    },
    analytics: {
        title_en: 'Growth Analytics',
        title_ko: '성장 분석',
        packages: [
            { id: 'analytics-basic', name_en: 'Analytics Basic', name_ko: '기본 분석', desc_en: 'Core reporting: enrollments, completion, refunds, and basic landing A/B test support.', desc_ko: '등록, 완료율, 환불, 기본 랜딩 A/B 테스트 리포트.', price: 49, featured: false, features_en: ['Enrollment tracking', 'Completion rate', 'Refund analysis', 'A/B report'], features_ko: ['등록 추적', '완료율 분석', '환불 리포팅', 'A/B 리포트'] }
        ]
    }
};

const translations = {
    en: {
        'logo-subtitle': 'EDUOOST!',
        'nav-home': 'Home',
        'nav-platform': 'Platform Setup',
        'nav-content': 'Course Content',
        'nav-enrollment': 'Enrollment',
        'btn-orders': 'My Orders',
        'hero-badge': 'Managed Online Course Platform',
        'hero-title': 'EDUOOST — Launch & Grow Academies',
        'hero-desc': 'From course structure and production to global enrollment funnels, we turn expertise into sellable online academies.',
        'btn-explore': 'Explore Setup Options',
        'btn-how': 'How It Works',
        'stat-platforms': 'Core Platforms',
        'stat-instructors': 'Managed Matching',
        'stat-global': 'Enrollment Reach',
        'stat-delivery': 'Setup Speed',
        'overview-title': 'What EDUOOST Handles End to End',
        'overview-subtitle': 'We manage your course infrastructure so you can focus on content and audience.',
        'step-curriculum': 'Curriculum Design',
        'step-curriculum-desc': 'Outline modules, lesson flows, assessments, and learning outcomes tailored to your expertise.',
        'step-production': 'Course Production',
        'step-production-desc': 'Professional video setup, editing, subtitles, and worksheets for polished final courses.',
        'step-instructor': 'Instructor Matching',
        'step-instructor-desc': 'Recruit qualified instructors and support staff to scale delivery without hiring overhead.',
        'step-enrollment': 'Enrollment Funnel',
        'step-enrollment-desc': 'Landing pages, checkout flows, email automation, and paid acquisition funnels across regions.',
        'step-analytics': 'Analytics & Optimization',
        'step-analytics-desc': 'Track course performance, completion rates, and iterate content for higher conversions.',
        'packages-title': 'Course Platform Services',
        'packages-subtitle': 'Choose a setup tier based on your platform and growth goals.',
        'cat-platform-title': 'Platform Setup',
        'cat-platform-desc': 'Full academy setup on Udemy, Teachable, Thinkific, Coursera, Podia, or a custom LMS.',
        'cat-content-title': 'Course Content',
        'cat-content-desc': 'Course structure, lecture design, video, quizzes, assets, and instructor scripts.',
        'cat-instructor-title': 'Instructor Recruiting',
        'cat-instructor-desc': 'Source and vet instructors, coaches, and subject matter experts for your catalog.',
        'cat-funnel-title': 'Enrollment Funnel',
        'cat-funnel-desc': 'Audience-specific landing pages, checkout, upsells, and retargeting for new students.',
        'cat-live-title': 'Live Class Ops',
        'cat-live-desc': 'Zoom and webinar setup, scheduling, attendance, replay publishing, and support.',
        'cat-analytics-title': 'Growth Analytics',
        'cat-analytics-desc': 'Track enrollments, completion rates, refunds, A/B test pages, and content ROI.',
        'how-title': 'How EDUOOST Works',
        'hw-step1-title': 'Discovery Call',
        'hw-step1-desc': 'Share your course topic, target students, goals, and platform preference.',
        'hw-step2-title': 'Blueprint',
        'hw-step2-desc': 'We design the curriculum outline, platform flow, and content production plan.',
        'hw-step3-title': 'Build & Launch',
        'hw-step3-desc': 'Course setup, content upload, checkout configuration, and QA before go-live.',
        'hw-step4-title': 'Growth Engine',
        'hw-step4-desc': 'Enrollment funnels, email nurture, paid ads, and optimization for scaling.',
        'comp-title': 'Trust & Delivery Standards',
        'comp-desc': 'We follow course platform terms of service and maintain transparent delivery milestones.',
        'comp-bullet1-bold': 'Platform Compliance:',
        'comp-bullet1-text': 'Udemy, Teachable, Thinkific, Coursera, Podia, and custom LMS-compatible setup and guidance.',
        'comp-bullet2-bold': 'Secure Payments:',
        'comp-bullet2-text': 'PayPal, Stripe, or native platform checkout with buyer protection and receipts.',
        'comp-bullet3-bold': 'Support SLA:',
        'comp-bullet3-text': 'Clear milestones, scope controls, and ongoing optimization support included.',
        'faq-title': 'Frequently Asked Questions',
        'view-orders-title': 'My Purchase History',
        'view-orders-sub': 'Review your successful orders. Your data is stored locally in your browser workspace.',
        'th-date': 'Order Date',
        'th-order-id': 'Transaction ID',
        'th-product': 'Product',
        'th-tier': 'Package Tier',
        'th-platform': 'Platform',
        'th-qty': 'Quantity',
        'th-total': 'Total Paid',
        'th-status': 'Status',
        'no-orders-msg': 'No purchase records found. Make your first order to see history here!',
        'modal-title': 'Configure Order',
        'modal-desc': 'Select a package and complete your secure PayPal checkout.',
        'modal-base-pkg': 'Base Package:',
        'modal-base-price-label': 'Base Price:',
        'modal-email-label': 'Email Address *',
        'modal-email-placeholder': 'name@example.com',
        'modal-email-error': 'Please enter a valid email address.',
        'modal-platform-label': 'Preferred Platform',
        'modal-qty': 'Quantity:',
        'modal-total-amt': 'Total Amount:',
        'modal-test-btn': 'Click price to test checkout',
        'badge-ssl': 'SSL Secured Checkout',
        'badge-paypal': 'PayPal Verified',
        'foot-faq': 'FAQ',
        'foot-home': 'Home',
        'foot-contact-link': 'Contact',
        'foot-copy': '© 2026 BibleForAI EDUOOST. All rights reserved. Managed online course platform service.',
        'order-button': 'Order Package',
        'featured-badge': 'Best Seller',
        'receipt-header': 'BIBLEFORAI - EDUOOST RECEIPT',
        'receipt-date': 'Order Date',
        'receipt-txid': 'Transaction ID',
        'receipt-email': 'Customer Email',
        'receipt-type': 'Product Type',
        'receipt-size': 'Package Size',
        'receipt-platform': 'Platform',
        'receipt-qty': 'Quantity',
        'receipt-baseprice': 'Base Price',
        'receipt-total': 'Total Paid',
        'receipt-status': 'Status',
        'receipt-method': 'Payment Method',
        'receipt-method-val': 'PayPal Secure Checkout'
    },
    ko: {
        'logo-subtitle': 'EDUOOST!',
        'nav-home': '홈',
        'nav-platform': '플랫폼 구축',
        'nav-content': '강의 콘텐츠',
        'nav-enrollment': '수강 전환',
        'btn-orders': '내 주문 내역',
        'hero-badge': '관리형 온라인 강의 플랫폼',
        'hero-title': 'EDUOOST — 아카데미 런칭 및 성장',
        'hero-desc': '강의 구조 설계, 콘텐츠 제작, 글로벌 수강 전환 퍼널까지 관리형으로 지원합니다.',
        'btn-explore': '설정 옵션 보기',
        'btn-how': '작동 방식',
        'stat-platforms': '핵심 플랫폼',
        'stat-instructors': '강사 매칭',
        'stat-global': '글로벌 수강',
        'stat-delivery': '구축 속도',
        'overview-title': 'EDUOOST가 엔드투엔드로 관리하는 영역',
        'overview-subtitle': '강의 인프라는 저희가 관리하므로 콘텐츠와 수강생 성장에 집중할 수 있습니다.',
        'step-curriculum': '커리큘럼 설계',
        'step-curriculum-desc': '모듈, 레슨 흐름, 평가, 학습 성과를 전문가 수준으로 설계합니다.',
        'step-production': '콘텐츠 제작',
        'step-production-desc': '전문 영상 촬영, 편집, 자막, 워크시트 등 완성도 높은 강의 콘텐츠를 제작합니다.',
        'step-instructor': '강사 채용',
        'step-instructor-desc': '자격을 갖춘 강사와 운영 스태프를 선발해 규모 확장을 지원합니다.',
        'step-enrollment': '수강 전환 퍼널',
        'step-enrollment-desc': '지역별 랜딩페이지, 결제 플로우, 이메일 자동화, 유료 광고 퍼널을 구축합니다.',
        'step-analytics': '분석 및 최적화',
        'step-analytics-desc': '수강 성과, 완료율, 환불 데이터를 추적하고 전환을 높이기 위해 개선합니다.',
        'packages-title': '강의 플랫폼 서비스',
        'packages-subtitle': '플랫폼과 성장 목표에 맞는 구축 단계를 선택하세요.',
        'cat-platform-title': '플랫폼 구축',
        'cat-platform-desc': 'Udemy, Teachable, Thinkific, Coursera, Podia, 커스텀 LMS 등 아카데미 구축을 지원합니다.',
        'cat-content-title': '강의 콘텐츠',
        'cat-content-desc': '강의 구조, 강의 설계, 영상, 퀴즈, 자료, 강사 대본까지 제작합니다.',
        'cat-instructor-title': '강사 채용',
        'cat-instructor-desc': '카탈로그용 강사, 코치, 도메인 전문가를 발굴하고 검증합니다.',
        'cat-funnel-title': '수강 전환 퍼널',
        'cat-funnel-desc': '대상별 랜딩페이지, 결제, upsell, 리타겟팅을 설계합니다.',
        'cat-live-title': '라이브 수업 운영',
        'cat-live-desc': '줌/웨비나 세팅, 일정, 출석, 리플레이 게시 및 지원을 제공합니다.',
        'cat-analytics-title': '성장 분석',
        'cat-analytics-desc': '등록, 완료율, 환불, A/B 테스트, 콘텐츠 ROI를 추적합니다.',
        'how-title': 'EDUOOST 작동 방식',
        'hw-step1-title': '발견 상담',
        'hw-step1-desc': '강의 주제, 대상 수강생, 목표, 선호 플랫폼을 공유해 주세요.',
        'hw-step2-title': '청사진 설계',
        'hw-step2-desc': '커리큘럼 개요, 플랫폼 흐름, 콘텐츠 제작 계획을 설계합니다.',
        'hw-step3-title': '빌드 & 런칭',
        'hw-step3-desc': '강의 세팅, 콘텐츠 업로드, 결제 구성, QA 테스트를 거쳐 런칭합니다.',
        'hw-step4-title': '성장 엔진',
        'hw-step4-desc': '수강 퍼널, 이메일 육성, 유료 광고, 최적화로 확장합니다.',
        'comp-title': '신뢰 및 전달 기준',
        'comp-desc': '강의 플랫폼 약관을 준수하고 투명한 전달 마일스톤을 유지합니다.',
        'comp-bullet1-bold': '플랫폼 준수:',
        'comp-bullet1-text': 'Udemy, Teachable, Thinkific, Coursera, Podia, 커스텀 LMS 호환 구축 및 가이드.',
        'comp-bullet2-bold': '안전 결제:',
        'comp-bullet2-text': 'PayPal, Stripe, 플랫폼 기본 결제를 지원하며 구매자 보호 및 영수증을 제공합니다.',
        'comp-bullet3-bold': '지원 SLA:',
        'comp-bullet3-text': '명확한 마일스톤, 범위 관리, 지속적인 최적화 지원을 포함합니다.',
        'faq-title': '자주 묻는 질문',
        'view-orders-title': '내 구매 히스토리',
        'view-orders-sub': '성공한 주문 내역을 검토하세요. 데이터는 브라우저 로컬스토리지에 안전하게 보관됩니다.',
        'th-date': '주문 날짜',
        'th-order-id': '거래 ID',
        'th-product': '상품명',
        'th-tier': '패키지 등급',
        'th-platform': '플랫폼',
        'th-qty': '수량',
        'th-total': '총 결제금액',
        'th-status': '상태',
        'no-orders-msg': '구매 기록이 없습니다. 첫 주문을 완료하시면 내역이 여기에 표시됩니다!',
        'modal-title': '주문 설정',
        'modal-desc': '패키지를 선택하고 안전한 PayPal 결제를 진행하세요.',
        'modal-base-pkg': '기본 패키지:',
        'modal-base-price-label': '기본 가격:',
        'modal-email-label': '이메일 주소 *',
        'modal-email-placeholder': 'name@example.com',
        'modal-email-error': '올바른 이메일 주소를 입력해주세요.',
        'modal-platform-label': '선호 플랫폼',
        'modal-qty': '수량:',
        'modal-total-amt': '총 결제금액:',
        'modal-test-btn': '가격 텍스트를 눌러 테스트 결제',
        'badge-ssl': 'SSL 보안 결제 지원',
        'badge-paypal': 'PayPal 인증됨',
        'foot-faq': 'FAQ',
        'foot-home': '홈',
        'foot-contact-link': '문의',
        'foot-copy': '© 2026 BibleForAI EDUOOST. All rights reserved. Managed online course platform service.',
        'order-button': '패키지 주문하기',
        'featured-badge': '베스트 셀러',
        'receipt-header': 'BIBLEFORAI - EDUOOST 영수증',
        'receipt-date': '주문 날짜',
        'receipt-txid': '거래 ID',
        'receipt-email': '고객 이메일',
        'receipt-type': '상품 종류',
        'receipt-size': '패키지 크기',
        'receipt-platform': '플랫폼',
        'receipt-qty': '수량',
        'receipt-baseprice': '기본 가격',
        'receipt-total': '총 결제금액',
        'receipt-status': '진행 상태',
        'receipt-method': '결제 방법',
        'receipt-method-val': 'PayPal 안전 결제'
    }
};

let currentLang = localStorage.getItem('bibleforai_lang') || 'en';

function formatPrice(usdPrice, includeUnit = true) {
    const krw = Math.round(usdPrice * 1400);
    if (currentLang === 'ko') {
        return includeUnit ? `₩${krw.toLocaleString()} KRW` : `₩${krw.toLocaleString()}`;
    }
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
    const dict = translations[lang] || translations['en'];
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const text = dict[key];
        if (text) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = text;
            } else {
                el.innerHTML = text;
            }
        }
    });
    const selector = document.getElementById('language-selector');
    if (selector) selector.value = lang;
    document.documentElement.lang = lang;
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
});

function navigate(viewId) {
    currentView = viewId;
    const target = document.getElementById(`${viewId}-view`);

    if (target) {
        document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
        target.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }

    const homeView = document.getElementById('home-view');
    const ordersView = document.getElementById('orders-view');
    if (viewId === 'orders') {
        if (homeView) homeView.classList.remove('active');
        if (ordersView) ordersView.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }

    if (homeView) homeView.classList.add('active');
    if (ordersView) ordersView.classList.remove('active');

    const anchorMap = {
        platform: 'packages-section',
        content: 'how-it-works',
        enrollment: 'faq-title'
    };
    const anchor = anchorMap[viewId];
    if (anchor) {
        const el = document.getElementById(anchor);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            return;
        }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleMobileMenu() {
    const drawer = document.getElementById('mobile-drawer');
    if (drawer) drawer.classList.toggle('active');
}

function renderAllPackages() {
    const lang = currentLang;
    Object.keys(packageCatalog).forEach(cat => {
        const section = document.getElementById(`${cat}-packages`);
        if (!section) return;
        const catalog = packageCatalog[cat];
        section.innerHTML = catalog.packages.map(pkg => {
            const badgeIcon = getCategoryIcon(cat);
            const title = lang === 'ko' ? pkg.name_ko : pkg.name_en;
            const desc = lang === 'ko' ? pkg.desc_ko : pkg.desc_en;
            const features = lang === 'ko' ? pkg.features_ko : pkg.features_en;
            const btnText = translations[lang]['order-button'] || 'Order Package';
            return `
                <div class=\"package-card ${pkg.featured ? 'featured' : ''}\">
                    <h3>${title}</h3>
                    <p class=\"package-desc\">${desc}</p>
                    <div class=\"package-price-box\">
                        <span class=\"price\">${formatPrice(pkg.price, false)}</span>
                        <span class=\"currency\">${lang === 'ko' ? 'KRW' : 'USD'}</span>
                    </div>
                    <ul class=\"package-features\">
                        ${features.map(f => `<li><i class=\"fa-solid fa-circle-check\"></i> ${f}</li>`).join('')}
                    </ul>
                    <button class=\"btn-buy\" onclick=\"openPurchaseModal('${cat}','${pkg.id}')\">
                        <i class=\"${badgeIcon}\"></i> ${btnText}
                    </button>
                </div>
            `;
        }).join('');
    });
}

function getCategoryIcon(category) {
    const map = {
        platform: 'fa-solid fa-rocket',
        content: 'fa-solid fa-film',
        instructor: 'fa-solid fa-user-tie',
        funnel: 'fa-solid fa-bullhorn',
        live: 'fa-solid fa-tower-broadcast',
        analytics: 'fa-solid fa-chart-pie'
    };
    return map[category] || 'fa-solid fa-check';
}

function openPurchaseModal(categoryKey, packageId) {
    const category = packageCatalog[categoryKey];
    const pkg = category.packages.find(item => item.id === packageId);
    if (!pkg) return;
    const lang = currentLang;
    const catTitle = lang === 'ko' ? category.title_ko : category.title_en;
    const pkgName = lang === 'ko' ? pkg.name_ko : pkg.name_en;
    currentPackage = { categoryKey, categoryName: catTitle, tierName: pkgName, basePrice: pkg.price };
    orderQuantity = 1;
    document.getElementById('modal-product-title').innerText = catTitle;
    document.getElementById('modal-package-name').innerText = pkgName;
    document.getElementById('modal-base-price').innerText = formatPrice(pkg.price);
    document.getElementById('order-quantity').value = orderQuantity;
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
        const totalBox = document.querySelector('.total-price-box');
        if (totalBox) totalBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 120);
    initPayPalButtons();
}

function closeModal() {
    document.getElementById('purchase-modal').classList.remove('active');
    const container = document.getElementById('paypal-button-container');
    if (container) container.innerHTML = '';
}

function adjustQty(amount) {
    const input = document.getElementById('order-quantity');
    let value = parseInt(input.value) || 1;
    value += amount;
    if (value < 1) value = 1;
    input.value = value;
    orderQuantity = value;
    updateModalPrice();
}

function updateModalPrice() {
    const raw = document.getElementById('order-quantity').value;
    let qty = parseInt(raw, 10);
    if (isNaN(qty) || qty < 1) qty = 1;
    orderQuantity = qty;
    const total = currentPackage.basePrice * qty;
    const el = document.getElementById('modal-total-price');
    if (el) el.innerText = formatPrice(total);
}

function validateEmailField() {
    const emailInput = document.getElementById('order-email');
    const emailError = document.getElementById('email-error');
    if (!emailInput) return true;
    const email = emailInput.value.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!valid) {
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
    const emailError = document.getElementById('email-error');
    if (emailError) emailError.style.display = 'none';
    if (!validateEmailField()) return;
    const mockDetails = { id: 'TEST-PAYID-' + Math.random().toString(36).substr(2, 9).toUpperCase(), isTest: true };
    saveLocalOrder(mockDetails);
    closeModal();
}

function initPayPalButtons() {
    const container = document.getElementById('paypal-button-container');
    if (!container) return;
    if (typeof paypal === 'undefined') {
        container.innerHTML = '<p style="color:#ef4444;text-align:center;padding:1rem;font-weight:600;">PayPal is currently unavailable. Please reload.</p>';
        return;
    }
    container.innerHTML = '';
    paypal.Buttons({
        style: { layout: 'vertical', color: 'blue', shape: 'rect', label: 'checkout' },
        onClick(data, actions) {
            if (!validateEmailField()) return actions.reject();
            return actions.resolve();
        },
        createOrder(data, actions) {
            const platform = document.getElementById('order-platform').value;
            const amount = (currentPackage.basePrice * orderQuantity).toFixed(2);
            return actions.order.create({
                purchase_units: [{
                    description: `${currentPackage.categoryName} - ${currentPackage.tierName} [Platform: ${platform}] (Qty: ${orderQuantity})`,
                    amount: { currency_code: 'USD', value: amount }
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
    }).render(container);
}

function saveLocalOrder(details) {
    const key = 'eduooost_orders';
    const orders = JSON.parse(localStorage.getItem(key) || '[]');
    const platform = document.getElementById('order-platform') ? document.getElementById('order-platform').value : 'N/A';
    const email = document.getElementById('order-email') ? document.getElementById('order-email').value.trim() : '';
    const order = {
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
        id: details.id, email, category: currentPackage.categoryName, package: currentPackage.tierName,
        platform, quantity: orderQuantity, basePrice: currentPackage.basePrice,
        totalPaid: formatPrice(currentPackage.basePrice * orderQuantity), status: 'Completed'
    };
    orders.unshift(order);
    localStorage.setItem(key, JSON.stringify(orders));
    renderOrders();
    const dict = translations[currentLang];
    const receipt = `===================================\n   ${dict['receipt-header']}\n===================================\n${dict['receipt-date'].padEnd(15)} : ${order.date}\n${dict['receipt-txid'].padEnd(15)} : ${order.id}\n${dict['receipt-email'].padEnd(15)} : ${order.email}\n${dict['receipt-type'].padEnd(15)} : ${order.category}\n${dict['receipt-size'].padEnd(15)} : ${order.package}\n${dict['receipt-platform'].padEnd(15)} : ${order.platform}\n${dict['receipt-qty'].padEnd(15)} : ${order.quantity}\n${dict['receipt-baseprice'].padEnd(15)} : ${formatPrice(order.basePrice)}\n${dict['receipt-total'].padEnd(15)} : ${order.totalPaid}\n${dict['receipt-status'].padEnd(15)} : ${currentLang === 'ko' ? '완료됨' : order.status}\n-----------------------------------\n${dict['receipt-method'].padEnd(15)} : ${dict['receipt-method-val']}\n===================================`;
    const encoded = encodeURIComponent(receipt);
    window.location.href = `https://docs.google.com/forms/d/e/1FAIpQLScMPqbEWWttS5mb1m_krsO_kco24ImpgvYVSbc7zO0nEVmYFw/viewform?entry.1059822061=${encoded}`;
}

function renderOrders() {
    const key = 'eduooost_orders';
    const orders = JSON.parse(localStorage.getItem(key) || '[]');
    const tbody = document.getElementById('orders-tbody');
    const noOrders = document.getElementById('no-orders-msg');
    if (!tbody) return;
    tbody.innerHTML = orders.map(order => {
        const status = currentLang === 'ko' ? '완료됨' : order.status;
        return `<tr>
            <td>${order.date}</td>
            <td class="tx-id">${order.id}</td>
            <td>${order.category}</td>
            <td>${order.package}</td>
            <td>${order.platform || 'N/A'}</td>
            <td>${order.quantity}</td>
            <td><strong>${order.totalPaid}</strong></td>
            <td><span class="status-badge">${status}</span></td>
        </tr>`;
    }).join('');
    if (noOrders) noOrders.style.display = orders.length ? 'none' : 'block';
}

function toggleFaq(el) {
    const answer = el.nextElementSibling;
    if (!answer) return;
    const open = answer.classList.toggle('open');
    el.querySelector('i').style.transform = open ? 'rotate(180deg)' : 'rotate(0deg)';
}

// Expose variables globally to prevent ReferenceErrors in inline HTML scripts/handlers
if (typeof navigate !== 'undefined') { window.navigate = navigate; }
if (typeof currentLang !== 'undefined') { window.currentLang = currentLang; }

window.openPurchaseModal = openPurchaseModal;
window.closeModal = closeModal;
window.adjustQty = adjustQty;
window.changeLanguage = changeLanguage;
