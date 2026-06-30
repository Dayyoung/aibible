// App State
let currentView = 'home';
let currentPackage = null;
let orderQuantity = 1;
let paypalButtonInstance = null;

// Package Catalog with Localized Keys
const packageCatalog = {
    phone: {
        title_en: 'Discovery Sprint',
        title_ko: '디스커버리 스프린트',
        packages: [
            { id: 'phone-trial', name_en: 'Workshop Sprint', name_ko: '워크숍 스프린트', desc_en: 'Clarify the problem, audience, and success metrics before building anything.', desc_ko: '무엇을 만들지 전에 문제, 타깃, 성공 지표를 먼저 정리합니다.', price: 398, featured: false, features_en: ['Scope Workshop', 'User Interviews', 'Competitive Scan', 'MVP Specification'], features_ko: ['범위 워크숍', '사용자 인터뷰', '경쟁사 분석', 'MVP 명세서'] },
            { id: 'phone-100k', name_en: 'Market Validation', name_ko: '시장 검증', desc_en: 'Test product demand, positioning, and pricing with a lean validation sprint.', desc_ko: '가벼운 검증 스프린트로 제품 수요, 포지셔닝, 가격을 점검합니다.', price: 598, featured: false, features_en: ['Landing Test Plan', 'Buyer Persona Map', 'Offer Positioning', 'Validation Summary'], features_ko: ['랜딩 테스트 플랜', '바이어 페르소나 맵', '오퍼 포지셔닝', '검증 요약본'] },
            { id: 'phone-500k', name_en: 'Product Brief', name_ko: '제품 브리프', desc_en: 'A founder-friendly brief that turns a rough idea into a build-ready product story.', desc_ko: '막연한 아이디어를 바로 개발 가능한 제품 스토리로 정리하는 창업자용 브리프입니다.', price: 998, featured: true, features_en: ['Feature Prioritization', 'User Flow Outline', 'MVP Backlog', 'Stakeholder Notes'], features_ko: ['기능 우선순위', '사용자 흐름 개요', 'MVP 백로그', '스테이크홀더 노트'] }
        ]
    },
    whatsapp: {
        title_en: 'UX Prototype',
        title_ko: 'UX 프로토타입',
        packages: [
            { id: 'whatsapp-100k', name_en: 'Wireframe Set', name_ko: '와이어프레임 세트', desc_en: 'Map the user journey with clean wireframes and interaction notes.', desc_ko: '깔끔한 와이어프레임과 상호작용 노트로 사용자 여정을 설계합니다.', price: 498, featured: false, features_en: ['User Journey Map', 'Low-Fidelity Screens', 'Interaction Notes', 'Responsive Layout Plan'], features_ko: ['사용자 여정 맵', '로우파이 화면', '인터랙션 노트', '반응형 레이아웃 계획'] },
            { id: 'whatsapp-500k', name_en: 'Clickable Prototype', name_ko: '클릭형 프로토타입', desc_en: 'A testable prototype for demos, validation calls, and investor feedback.', desc_ko: '데모, 검증 미팅, 투자자 피드백에 활용 가능한 테스트형 프로토타입입니다.', price: 798, featured: false, features_en: ['Figma Handoff', 'Clickable Flow', 'Feedback Checklist', 'Rapid Iteration'], features_ko: ['피그마 전달', '클릭 가능한 흐름', '피드백 체크리스트', '빠른 수정'] },
            { id: 'whatsapp-mid', name_en: 'Design System', name_ko: '디자인 시스템', desc_en: 'Reusable UI foundations for a consistent SaaS product experience.', desc_ko: '일관된 SaaS 제품 경험을 위한 재사용 가능한 UI 기반을 구축합니다.', price: 1198, featured: true, features_en: ['Component Library', 'Color Tokens', 'Typography Scale', 'Usage Rules'], features_ko: ['컴포넌트 라이브러리', '컬러 토큰', '타이포 스케일', '사용 가이드'] }
        ]
    },
    telegram: {
        title_en: 'MVP Build',
        title_ko: 'MVP 개발',
        packages: [
            { id: 'telegram-trial', name_en: 'Starter MVP', name_ko: '스타터 MVP', desc_en: 'Fast build for a single core feature and a production-ready landing flow.', desc_ko: '핵심 기능 1개와 배포 가능한 랜딩 흐름을 빠르게 구축합니다.', price: 998, featured: false, features_en: ['Core Feature', 'Responsive UI', 'Basic Auth', 'Deployment Setup'], features_ko: ['핵심 기능', '반응형 UI', '기본 인증', '배포 설정'] },
            { id: 'telegram-100k', name_en: 'Launch MVP', name_ko: '런치 MVP', desc_en: 'A practical product build with onboarding, dashboard, and user management.', desc_ko: '온보딩, 대시보드, 사용자 관리를 포함한 실전형 제품을 구축합니다.', price: 1498, featured: true, features_en: ['Onboarding Flow', 'Dashboard', 'Admin Tools', 'Usage Metrics'], features_ko: ['온보딩 흐름', '대시보드', '관리 도구', '사용 지표'] },
            { id: 'telegram-500k', name_en: 'Growth MVP', name_ko: '그로스 MVP', desc_en: 'Add growth-ready features like subscriptions, notifications, and analytics.', desc_ko: '구독, 알림, 분석 등 성장에 필요한 기능을 추가합니다.', price: 1998, featured: false, features_en: ['Subscriptions', 'Notifications', 'Analytics Events', 'Growth Hooks'], features_ko: ['구독 기능', '알림', '분석 이벤트', '그로스 훅'] }
        ]
    },
    email: {
        title_en: 'API Integrations',
        title_ko: 'API 연동',
        packages: [
            { id: 'email-1m', name_en: 'Auth & Billing', name_ko: '인증 & 결제', desc_en: 'Connect login, subscriptions, and payment flows with clean webhooks.', desc_ko: '로그인, 구독, 결제 흐름을 깔끔한 웹훅 구조로 연결합니다.', price: 698, featured: false, features_en: ['OAuth Setup', 'Billing Flow', 'Webhook Mapping', 'Test Mode'], features_ko: ['OAuth 설정', '결제 흐름', '웹훅 매핑', '테스트 모드'] },
            { id: 'email-10m', name_en: 'CRM Sync', name_ko: 'CRM 동기화', desc_en: 'Keep leads, customers, and deals synchronized across your stack.', desc_ko: '리드, 고객, 딜 정보를 전체 스택에서 일관되게 동기화합니다.', price: 998, featured: true, features_en: ['Lead Mapping', 'Deal Sync', 'Pipeline Rules', 'Duplicate Guard'], features_ko: ['리드 매핑', '딜 동기화', '파이프라인 규칙', '중복 방지'] },
            { id: 'email-20m', name_en: 'Analytics Stack', name_ko: '분석 스택', desc_en: 'Wire product events into dashboards for usage and revenue tracking.', desc_ko: '제품 이벤트를 대시보드에 연결해 사용량과 매출을 추적합니다.', price: 1298, featured: false, features_en: ['Event Schema', 'Dashboard Metrics', 'Revenue Funnel', 'Alerts'], features_ko: ['이벤트 스키마', '대시보드 지표', '매출 퍼널', '알림'] }
        ]
    },
    clevel: {
        title_en: 'Launch Support',
        title_ko: '런치 지원',
        packages: [
            { id: 'clevel-trial', name_en: 'Go-Live Support', name_ko: '출시 지원', desc_en: 'Stay with the team during launch week for fixes, checks, and guidance.', desc_ko: '출시 주간 동안 수정, 점검, 가이드를 함께 진행합니다.', price: 598, featured: false, features_en: ['Launch Checklist', 'Bug Triage', 'Support Calls', 'Checklist Handoff'], features_ko: ['런칭 체크리스트', '버그 분류', '지원 콜', '인수인계 자료'] },
            { id: 'clevel-mid', name_en: 'Bug Fix Pack', name_ko: '버그 수정 팩', desc_en: 'Rapid post-launch cleanup for stability, UX issues, and edge cases.', desc_ko: '안정성, UX 이슈, 예외 케이스를 빠르게 정리하는 사후 수정 팩입니다.', price: 898, featured: true, features_en: ['Hotfix Sprint', 'QA Review', 'Issue Log', 'Release Notes'], features_ko: ['핫픽스 스프린트', 'QA 검토', '이슈 로그', '릴리즈 노트'] },
            { id: 'clevel-max', name_en: 'Scale Plan', name_ko: '스케일 플랜', desc_en: 'Prepare for team growth, infrastructure expansion, and next funding rounds.', desc_ko: '팀 확장, 인프라 확대, 다음 투자 라운드를 준비합니다.', price: 1598, featured: false, features_en: ['Scale Budget', 'Infra Forecast', 'Hiring Map', 'Next-Round Readiness'], features_ko: ['확장 예산', '인프라 예측', '채용 맵', '다음 투자 대비'] }
        ]
    }
};

// Translation Dictionary
const translations = {
    en: {
        "logo-subtitle": "SAAS MVP",
        "nav-home": "Home",
        "nav-phone": "Discovery Sprint",
        "nav-whatsapp": "UX Prototype",
        "nav-telegram": "MVP Build",
        "nav-email": "API Integrations",
        "nav-clevel": "Launch Support",
        "btn-orders": "My Orders",
        "hero-badge": "From Idea to Launch",
        "hero-title": "BibleForAI - MVPBOOST!",
        "hero-desc": "Turn ideas into investor-ready SaaS MVPs with product strategy, design, integrations, and launch support.",
        "btn-explore": "Explore Packages",
        "btn-compliance": "See Process",
        "stat-global-numbers": "Discovery Calls",
        "stat-accuracy-rate": "Build Quality",
        "stat-opt-in": "Lean Scope",
        "stat-delivery": "Fast Delivery",
        "sec-channels-title": "Build Your SaaS MVP in Clear Stages",
        "sec-channels-subtitle": "Move from strategy to prototype to launch with a structured product delivery pipeline.",
        "card-phone-title": "Discovery Sprint",
        "card-phone-desc": "Clarify the problem, users, and business model before the first line of code is written.",
        "card-whatsapp-title": "UX Prototype",
        "card-whatsapp-desc": "Validate the product flow with wireframes, clickable screens, and a polished design system.",
        "card-telegram-title": "MVP Build",
        "card-telegram-desc": "Ship the first production-ready SaaS version with auth, dashboard, and core workflows.",
        "card-email-title": "API Integrations",
        "card-email-desc": "Connect payments, CRM, analytics, and automation tools into one scalable stack.",
        "card-clevel-title": "Launch Support",
        "card-clevel-desc": "Fix issues, refine retention, and prepare the product for real users and investors.",
        "card-view-pricing": "View Pricing",
        "comp-title": "Lean Product Strategy, Design, and Engineering",
        "comp-desc": "We build SaaS MVPs with a lean scope, modern UI, secure auth, payments, analytics, and handoff documentation so teams can launch quickly and confidently.",
        "comp-bullet1-bold": "Lean Scope Planning:",
        "comp-bullet1-text": "Prioritize only the features that validate the business idea and reduce time-to-market.",
        "comp-bullet2-bold": "Modern UX System:",
        "comp-bullet2-text": "Deliver responsive layouts, reusable components, and clear user journeys for every device.",
        "comp-bullet3-bold": "Launch-Ready Engineering:",
        "comp-bullet3-text": "Ship with secure login, billing, analytics, and clean deployment handoff.",
        "view-phone-sub": "Structure your idea before development with product discovery, market validation, and a founder-friendly brief.",
        "view-whatsapp-sub": "Turn concepts into clickable prototypes, polished flows, and user-tested design systems.",
        "view-telegram-sub": "Build the first SaaS version with core workflows, dashboards, and production-ready foundations.",
        "view-email-sub": "Connect your product to payments, CRM, analytics, and automation systems with clean APIs.",
        "view-clevel-sub": "Add launch support, bug fixes, growth iterations, and scaling plans after the MVP goes live.",
        "view-orders-title": "My Project History",
        "view-orders-sub": "Review completed MVP delivery orders. Data is stored locally in your browser workspace.",
        "th-date": "Order Date",
        "th-order-id": "Transaction ID",
        "th-product": "Product",
        "th-tier": "Package Tier",
        "th-country": "Project Focus",
        "th-qty": "Quantity",
        "th-total": "Total Paid",
        "th-status": "Status",
        "no-orders-msg": "No project records found. Start with a discovery sprint or MVP build to see history here!",
        "modal-title": "Configure MVP Delivery",
        "modal-desc": "Choose the scope and complete secure PayPal payment to start your build.",
        "modal-base-pkg": "Base Package:",
        "modal-base-price-label": "Base Price:",
        "modal-email-label": "Email Address *",
        "modal-email-placeholder": "name@example.com",
        "modal-email-error": "Please enter a valid email address.",
        "modal-country-label": "Project Focus:",
        "modal-qty": "Quantity:",
        "modal-total-amt": "Total Amount:",
        "modal-test-btn": "Click price to payment checkout",
        "badge-ssl": "SSL Secured Checkout",
        "badge-paypal": "PayPal Verified",
        "foot-channels": "MVP Stages",
        "foot-legal": "Build Principles",
        "foot-gdpr": "Lean Scope",
        "foot-canspam": "Modern UX",
        "foot-match": "Launch Ready",
        "foot-contact": "Contact support: snsherocom@gmail.com",
        "foot-copy": "&copy; 2026 BibleForAI MVPBOOST. All rights reserved. SaaS MVP development & launch support.",
        "order-button": "Order Package",
        "featured-badge": "Best Value",
        "receipt-header": "BIBLEFORAI - MVPBOOST RECEIPT",
        "receipt-date": "Order Date",
        "receipt-txid": "Transaction ID",
        "receipt-email": "Customer Email",
        "receipt-type": "Product Type",
        "receipt-size": "Package Size",
        "receipt-country": "Project Focus",
        "receipt-qty": "Quantity",
        "receipt-baseprice": "Base Price",
        "receipt-total": "Total Paid",
        "receipt-status": "Status",
        "receipt-method": "Payment Method",
        "receipt-method-val": "PayPal Secure Checkout"
    },
    ko: {
        "logo-subtitle": "SAAS MVP",
        "nav-home": "홈",
        "nav-phone": "디스커버리 스프린트",
        "nav-whatsapp": "UX 프로토타입",
        "nav-telegram": "MVP 개발",
        "nav-email": "API 연동",
        "nav-clevel": "런치 지원",
        "btn-orders": "내 주문 내역",
        "hero-badge": "아이디어에서 출시까지",
        "hero-title": "BibleForAI - MVPBOOST!",
        "hero-desc": "제품 전략, 디자인, 연동, 출시 지원까지 포함해 아이디어를 투자자 대응이 가능한 SaaS MVP로 바꿔드립니다.",
        "btn-explore": "패키지 둘러보기",
        "btn-compliance": "진행 방식 보기",
        "stat-global-numbers": "디스커버리 상담",
        "stat-accuracy-rate": "빌드 품질",
        "stat-opt-in": "린 스코프",
        "stat-delivery": "빠른 납품",
        "sec-channels-title": "명확한 단계로 SaaS MVP를 구축하세요",
        "sec-channels-subtitle": "전략에서 프로토타입, 출시까지 체계적인 제품 전달 파이프라인으로 진행합니다.",
        "card-phone-title": "디스커버리 스프린트",
        "card-phone-desc": "첫 코딩 전에 문제, 사용자, 비즈니스 모델을 명확하게 정리합니다.",
        "card-whatsapp-title": "UX 프로토타입",
        "card-whatsapp-desc": "와이어프레임, 클릭형 화면, 정교한 디자인 시스템으로 제품 흐름을 검증합니다.",
        "card-telegram-title": "MVP 개발",
        "card-telegram-desc": "인증, 대시보드, 핵심 워크플로를 갖춘 첫 프로덕션 버전을 출시합니다.",
        "card-email-title": "API 연동",
        "card-email-desc": "결제, CRM, 분석, 자동화 도구를 하나의 확장 가능한 스택으로 연결합니다.",
        "card-clevel-title": "런치 지원",
        "card-clevel-desc": "문제 수정, 리텐션 개선, 실사용자 및 투자자 대응 준비까지 돕습니다.",
        "card-view-pricing": "가격 보기",
        "comp-title": "린 제품 전략 · 디자인 · 엔지니어링",
        "comp-desc": "린 스코프, 현대적인 UI, 안전한 인증, 결제, 분석, 인수인계 문서까지 포함해 팀이 빠르고 자신 있게 출시할 수 있는 SaaS MVP를 제작합니다.",
        "comp-bullet1-bold": "린 스코프 계획:",
        "comp-bullet1-text": "비즈니스 아이디어를 검증하고 시장 진입 시간을 줄이는 핵심 기능만 우선순위화합니다.",
        "comp-bullet2-bold": "모던 UX 시스템:",
        "comp-bullet2-text": "모든 기기에서 반응형 레이아웃, 재사용 가능한 컴포넌트, 명확한 사용자 흐름을 제공합니다.",
        "comp-bullet3-bold": "출시 준비 엔지니어링:",
        "comp-bullet3-text": "안전한 로그인, 결제, 분석, 깔끔한 배포 인수인계까지 포함해 제공합니다.",
        "view-phone-sub": "제품 디스커버리, 시장 검증, 창업자용 브리프로 개발 전 아이디어를 구조화하세요.",
        "view-whatsapp-sub": "클릭형 프로토타입, 정교한 흐름, 사용자 테스트용 디자인 시스템으로 컨셉을 구체화하세요.",
        "view-telegram-sub": "핵심 워크플로, 대시보드, 프로덕션 기반을 갖춘 첫 SaaS 버전을 구축하세요.",
        "view-email-sub": "깔끔한 API로 결제, CRM, 분석, 자동화 시스템을 제품에 연결하세요.",
        "view-clevel-sub": "MVP 출시 후 런치 지원, 버그 수정, 성장 반복, 확장 계획까지 추가하세요.",
        "view-orders-title": "내 프로젝트 기록",
        "view-orders-sub": "완료된 MVP 제작 주문 내역을 확인하세요. 데이터는 브라우저 로컬 작업공간에 저장됩니다.",
        "th-date": "주문 날짜",
        "th-order-id": "트랜잭션 ID",
        "th-product": "상품명",
        "th-tier": "패키지 등급",
        "th-country": "프로젝트 포커스",
        "th-qty": "수량",
        "th-total": "총 결제금액",
        "th-status": "상태",
        "no-orders-msg": "프로젝트 기록이 없습니다. 디스커버리 스프린트나 MVP 개발부터 시작해보세요!",
        "modal-title": "MVP 제작 설정",
        "modal-desc": "범위를 선택하고 안전한 PayPal 결제를 완료하면 제작을 시작합니다.",
        "modal-base-pkg": "기본 패키지:",
        "modal-base-price-label": "기본 가격:",
        "modal-email-label": "이메일 주소 *",
        "modal-email-placeholder": "name@example.com",
        "modal-email-error": "올바른 이메일 주소를 입력해주세요.",
        "modal-country-label": "프로젝트 포커스:",
        "modal-qty": "수량:",
        "modal-total-amt": "총 결제금액:",
        "modal-test-btn": "가격 텍스트를 눌러 결제 진행",
        "badge-ssl": "SSL 보안 결제",
        "badge-paypal": "PayPal 인증됨",
        "foot-channels": "MVP 단계",
        "foot-legal": "제작 원칙",
        "foot-gdpr": "린 스코프",
        "foot-canspam": "모던 UX",
        "foot-match": "출시 준비 완료",
        "foot-contact": "문의 지원: snsherocom@gmail.com",
        "foot-copy": "&copy; 2026 BibleForAI MVPBOOST. All rights reserved. SaaS MVP development & launch support.",
        "order-button": "패키지 주문하기",
        "featured-badge": "가장 인기",
        "receipt-header": "BIBLEFORAI - MVPBOOST 영수증",
        "receipt-date": "주문 날짜",
        "receipt-txid": "거래 ID",
        "receipt-email": "고객 이메일",
        "receipt-type": "상품 종류",
        "receipt-size": "패키지 등급",
        "receipt-country": "프로젝트 포커스",
        "receipt-qty": "수량",
        "receipt-baseprice": "기본 가격",
        "receipt-total": "총 결제금액",
        "receipt-status": "상태",
        "receipt-method": "결제 방식",
        "receipt-method-val": "PayPal 안전 결제"
    }
};

let currentLang = window.location.pathname.includes('/kr/')
    ? 'ko'
    : (localStorage.getItem('bibleforai_lang') || (() => {
        const browserLang = (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage || '';
        return browserLang.toLowerCase().startsWith('ko') ? 'ko' : 'en';
    })());

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
    document.title = isKo ? "BibleForAI - MVPBOOST | SaaS MVP 개발" : "BibleForAI - MVPBOOST | SaaS MVP Development";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.content = isKo ?
            "제품 전략, 디자인, 연동, 출시 지원까지 포함해 아이디어를 SaaS MVP로 전환하세요." :
            "Turn ideas into investor-ready SaaS MVPs with product strategy, design, integrations, and launch support.";
    }

    // Update Open Graph (OG) and Twitter Metadata tags dynamically
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
        ogTitle.content = isKo ? "BibleForAI - MVPBOOST | SaaS MVP 개발" : "BibleForAI - MVPBOOST | SaaS MVP Development";
    }
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
        ogDesc.content = isKo ?
            "제품 전략, 디자인, 연동, 출시 지원까지 포함해 아이디어를 SaaS MVP로 전환하세요." :
            "Turn ideas into investor-ready SaaS MVPs with product strategy, design, integrations, and launch support.";
    }
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) {
        twTitle.content = isKo ? "BibleForAI - MVPBOOST | SaaS MVP 개발" : "BibleForAI - MVPBOOST | SaaS MVP Development";
    }
    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) {
        twDesc.content = isKo ?
            "제품 전략, 디자인, 연동, 출시 지원까지 포함해 아이디어를 SaaS MVP로 전환하세요." :
            "Turn ideas into investor-ready SaaS MVPs with product strategy, design, integrations, and launch support.";
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
        case 'phone': return 'fa-solid fa-compass-drafting';
        case 'whatsapp': return 'fa-solid fa-pencil-ruler';
        case 'telegram': return 'fa-solid fa-gears';
        case 'email': return 'fa-solid fa-plug';
        case 'clevel': return 'fa-solid fa-rocket';
        default: return 'fa-solid fa-database';
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
    
    // Auto-scroll to show PayPal button
    setTimeout(() => {
        const modalCard = document.querySelector('.modal-card');
        const totalBox = document.querySelector('.total-price-box');
        if (modalCard && totalBox) {
            modalCard.scrollTop = totalBox.offsetTop - 10;
        }
    }, 800);
    
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

// Click price to payment checkout Trigger
function triggerTestCheckout() {
    // Auto-fill mock email if field is empty
    const emailInput = document.getElementById('order-email');
    if (emailInput && !emailInput.value.trim()) {
        emailInput.value = 'secure checkout@test.dev';
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
            const selectedCountry = document.getElementById('order-country').value;
            const finalAmount = (currentPackage.basePrice * orderQuantity).toFixed(2);
            return actions.order.create({
                purchase_units: [{
                    description: `${currentPackage.categoryName} - ${currentPackage.tierName} [Country: ${selectedCountry}] (Qty: ${orderQuantity})`,
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
    const orderLogs = JSON.parse(localStorage.getItem('b2cdb_orders')) || [];
    const selectedCountry = document.getElementById('order-country').value;
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
        country: selectedCountry,
        quantity: orderQuantity,
        basePrice: currentPackage.basePrice,
        totalPaid: formatPrice(currentPackage.basePrice * orderQuantity),
        status: 'Completed',
        clientId: clientId,
        secret: secret
    };
    
    orderLogs.unshift(newOrder); // Add to beginning
    localStorage.setItem('b2cdb_orders', JSON.stringify(orderLogs));
    
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
${dict["receipt-country"].padEnd(15)} : ${newOrder.country}
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
    const orderLogs = JSON.parse(localStorage.getItem('b2cdb_orders')) || [];
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
            <td>${order.country || 'Global'}</td>
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
