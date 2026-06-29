// App State
let currentView = 'home';
let currentPackage = null;
let orderQuantity = 1;
let paypalButtonInstance = null;

// Package Catalog with Localized Keys
const packageCatalog = {
    ecommerce: {
        title_en: 'E-Commerce Scraping',
        title_ko: '이커머스 스크래핑',
        packages: [
            { id: 'ecom-trial', name_en: 'Trial (10K Products)', name_ko: '체험용 (1만건)', desc_en: 'Test extraction of up to 10,000 products with prices, images, and basic metadata.', desc_ko: '최대 1만개 상품의 가격, 이미지, 기본 메타데이터 추출 테스트.', price: 70, featured: false, features_en: ['Up to 10,000 Records', 'Product Names & Prices', 'Image URLs', 'Excel/CSV Output', '24h Delivery'], features_ko: ['최대 1만건 레코드', '상품명 및 가격', '이미지 URL', 'Excel/CSV 출력', '24시간 내 전달'] },
            { id: 'ecom-standard', name_en: 'Standard (100K Products)', name_ko: '스탠다드 (10만건)', desc_en: 'Full catalog extraction including variants, descriptions, ratings, and stock status.', desc_ko: '옵션, 설명, 평점, 재고 상태를 포함한 전체 카탈로그 추출.', price: 140, featured: false, features_en: ['Up to 100,000 Records', 'Variants & Options', 'Ratings & Reviews', 'Multi-Page Crawling', '2-3 Business Days'], features_ko: ['최대 10만건 레코드', '옵션 및 변형 정보', '평점 및 리뷰', '다중 페이지 크롤링', '영업일 2-3일'] },
            { id: 'ecom-pro', name_en: 'Professional (500K Products)', name_ko: '프로페셔널 (50만건)', desc_en: 'Enterprise catalog scraping with competitor monitoring dashboard and price history tracking.', desc_ko: '경쟁사 모니터링 대시보드 및 가격 변동 추적을 포함한 엔터프라이즈 카탈로그 스크래핑.', price: 350, featured: true, features_en: ['Up to 500,000 Records', 'Price History Tracking', 'Competitor Dashboard', 'Scheduled Weekly Updates', '5-7 Business Days'], features_ko: ['최대 50만건 레코드', '가격 변동 추적', '경쟁사 대시보드', '주간 정기 업데이트', '영업일 5-7일'] },
            { id: 'ecom-enterprise', name_en: 'Enterprise (Unlimited)', name_ko: '엔터프라이즈 (무제한)', desc_en: 'Full-scale e-commerce data pipeline with API integration, real-time monitoring, and custom analytics.', desc_ko: 'API 연동, 실시간 모니터링, 맞춤 분석을 포함한 풀스케일 이커머스 데이터 파이프라인.', price: 700, featured: false, features_en: ['Unlimited Records', 'Real-time API Feed', 'Custom Dashboard', 'Database Integration', 'Dedicated Support'], features_ko: ['무제한 레코드', '실시간 API 피드', '맞춤형 대시보드', '데이터베이스 연동', '전담 기술 지원'] }
        ]
    },
    business: {
        title_en: 'Business Directory Scraping',
        title_ko: '비즈니스 디렉토리 스크래핑',
        packages: [
            { id: 'biz-trial', name_en: 'Trial (5K Listings)', name_ko: '체험용 (5천건)', desc_en: 'Quick extraction of basic business info from a single directory source.', desc_ko: '단일 디렉토리 소스에서 기본 비즈니스 정보 빠른 추출.', price: 70, featured: false, features_en: ['Up to 5,000 Listings', 'Name & Phone & Address', 'Single Directory Source', 'Excel/CSV Output', '24h Delivery'], features_ko: ['최대 5천건 리스팅', '업체명, 전화, 주소', '단일 디렉토리 소스', 'Excel/CSV 출력', '24시간 내 전달'] },
            { id: 'biz-standard', name_en: 'Standard (50K Listings)', name_ko: '스탠다드 (5만건)', desc_en: 'Multi-directory scraping with email, website, and social media profile extraction.', desc_ko: '이메일, 웹사이트, SNS 프로필 추출을 포함한 다중 디렉토리 스크래핑.', price: 140, featured: false, features_en: ['Up to 50,000 Listings', 'Email & Website URLs', 'Social Media Profiles', 'Multi-Source Aggregation', '2-3 Business Days'], features_ko: ['최대 5만건 리스팅', '이메일 및 웹사이트 URL', 'SNS 프로필', '다중 소스 통합', '영업일 2-3일'] },
            { id: 'biz-pro', name_en: 'Professional (250K Listings)', name_ko: '프로페셔널 (25만건)', desc_en: 'Comprehensive B2B lead list with industry categorization and company size filtering.', desc_ko: '산업 분류 및 회사 규모 필터링이 포함된 종합 B2B 리드 리스트.', price: 350, featured: true, features_en: ['Up to 250,000 Listings', 'Industry Categorization', 'Company Size & Revenue', 'Google Maps Scraping', '5-7 Business Days'], features_ko: ['최대 25만건 리스팅', '산업 분류', '회사 규모 및 매출', '구글 지도 스크래핑', '영업일 5-7일'] },
            { id: 'biz-enterprise', name_en: 'Enterprise (Unlimited)', name_ko: '엔터프라이즈 (무제한)', desc_en: 'Full B2B data pipeline with automated enrichment, CRM integration, and scheduled updates.', desc_ko: '자동 데이터 보강, CRM 연동, 정기 업데이트를 포함한 풀 B2B 데이터 파이프라인.', price: 700, featured: false, features_en: ['Unlimited Listings', 'CRM Integration Ready', 'Auto Data Enrichment', 'Monthly Refresh', 'Dedicated Support'], features_ko: ['무제한 리스팅', 'CRM 연동 지원', '자동 데이터 보강', '월간 데이터 갱신', '전담 기술 지원'] }
        ]
    },
    content: {
        title_en: 'Content & News Scraping',
        title_ko: '콘텐츠 및 뉴스 스크래핑',
        packages: [
            { id: 'content-trial', name_en: 'Trial (10K Articles)', name_ko: '체험용 (1만건)', desc_en: 'Extract up to 10,000 articles or posts with title, date, and text content.', desc_ko: '제목, 날짜, 본문을 포함한 최대 1만건의 기사 또는 게시물 추출.', price: 70, featured: false, features_en: ['Up to 10,000 Articles', 'Title & Date & Body', 'Single Source', 'Excel/CSV/JSON', '24h Delivery'], features_ko: ['최대 1만건 기사', '제목, 날짜, 본문', '단일 소스', 'Excel/CSV/JSON', '24시간 내 전달'] },
            { id: 'content-standard', name_en: 'Standard (100K Articles)', name_ko: '스탠다드 (10만건)', desc_en: 'Multi-source content aggregation with author, tags, images, and sentiment metadata.', desc_ko: '작성자, 태그, 이미지, 감성 메타데이터를 포함한 다중 소스 콘텐츠 통합.', price: 140, featured: false, features_en: ['Up to 100,000 Articles', 'Author & Tags & Images', 'Multi-Source Aggregation', 'Sentiment Analysis', '2-3 Business Days'], features_ko: ['최대 10만건 기사', '작성자, 태그, 이미지', '다중 소스 통합', '감성 분석', '영업일 2-3일'] },
            { id: 'content-pro', name_en: 'Professional (500K Articles)', name_ko: '프로페셔널 (50만건)', desc_en: 'Large-scale content monitoring with keyword alerts, trend analysis, and scheduled crawls.', desc_ko: '키워드 알림, 트렌드 분석, 정기 크롤링을 포함한 대규모 콘텐츠 모니터링.', price: 350, featured: true, features_en: ['Up to 500,000 Articles', 'Keyword Alert System', 'Trend Analysis Report', 'Scheduled Weekly Crawls', '5-7 Business Days'], features_ko: ['최대 50만건 기사', '키워드 알림 시스템', '트렌드 분석 보고서', '주간 정기 크롤링', '영업일 5-7일'] },
            { id: 'content-enterprise', name_en: 'Enterprise (Unlimited)', name_ko: '엔터프라이즈 (무제한)', desc_en: 'Real-time news monitoring API, custom NLP enrichment, database pipeline, and analytics dashboard.', desc_ko: '실시간 뉴스 모니터링 API, 맞춤 NLP 보강, 데이터베이스 파이프라인, 분석 대시보드.', price: 700, featured: false, features_en: ['Unlimited Articles', 'Real-time Monitoring API', 'Custom NLP Enrichment', 'Analytics Dashboard', 'Dedicated Support'], features_ko: ['무제한 기사', '실시간 모니터링 API', '맞춤 NLP 데이터 보강', '분석 대시보드', '전담 기술 지원'] }
        ]
    },
    custom: {
        title_en: 'Custom Scraping Solutions',
        title_ko: '맞춤형 스크래핑 솔루션',
        packages: [
            { id: 'custom-basic', name_en: 'Basic Custom (Single Site)', name_ko: '기본 맞춤형 (단일 사이트)', desc_en: 'Custom scraper built for one specific website with your defined data fields and output format.', desc_ko: '지정된 데이터 필드와 출력 형식으로 단일 웹사이트 전용 맞춤 스크래퍼 구축.', price: 140, featured: false, features_en: ['Single Target Website', 'Custom Data Fields', 'Login Support', 'Excel/CSV/JSON Output', '3-5 Business Days'], features_ko: ['단일 타겟 웹사이트', '맞춤 데이터 필드', '로그인 지원', 'Excel/CSV/JSON 출력', '영업일 3-5일'] },
            { id: 'custom-pro', name_en: 'Professional Custom', name_ko: '프로페셔널 맞춤형', desc_en: 'Multi-site scraper with rotating proxies, CAPTCHA solving, and automated scheduling system.', desc_ko: '로테이션 프록시, CAPTCHA 해결, 자동 스케줄링 시스템을 갖춘 다중 사이트 스크래퍼.', price: 350, featured: true, features_en: ['Multiple Target Sites', 'Rotating Proxies Included', 'CAPTCHA Bypass', 'Scheduled Automation', 'Admin Dashboard', '7 Business Days'], features_ko: ['다중 타겟 사이트', '로테이션 프록시 포함', 'CAPTCHA 우회', '자동화 스케줄링', '관리자 대시보드', '영업일 7일'] },
            { id: 'custom-enterprise', name_en: 'Enterprise Pipeline', name_ko: '엔터프라이즈 파이프라인', desc_en: 'Full data infrastructure with REST API, database ingestion, monitoring, and dedicated DevOps support.', desc_ko: 'REST API, 데이터베이스 연동, 모니터링, 전담 DevOps 지원을 포함한 풀 데이터 인프라.', price: 700, featured: false, features_en: ['REST API Endpoints', 'Database Ingestion', 'Real-time Monitoring', 'Auto-scaling Infrastructure', 'SLA Guarantee', '14 Business Days'], features_ko: ['REST API 엔드포인트', '데이터베이스 연동', '실시간 모니터링', '오토스케일링 인프라', 'SLA 보장', '영업일 14일'] }
        ]
    }
};

// Translation Dictionary
const translations = {
    en: {
        "logo-subtitle": "WEB SCRAPING!",
        "nav-home": "Home",
        "nav-ecommerce": "E-Commerce",
        "nav-business": "Business Data",
        "nav-content": "Content",
        "nav-custom": "Custom",
        "btn-orders": "My Orders",
        "hero-badge": "AI-Powered Data Extraction",
        "hero-title": "BibleForAI - DATABOOST!",
        "hero-desc": "Custom web scraping & data extraction. Turn any website into clean, structured data ready for analysis.",
        "btn-explore": "Explore Scraping Services",
        "btn-compliance": "Our Process",
        
        "stat-global-numbers": "Website Supported",
        "stat-accuracy-rate": "Data Accuracy",
        "stat-opt-in": "Fast Delivery",
        "stat-delivery": "Output Formats",
        
        "sec-channels-title": "Discover Our Data Extraction Services",
        "sec-channels-subtitle": "From e-commerce product catalogs to business directories and news content — scrape any web data into structured Excel, CSV, or JSON.",
        "card-ecommerce-title": "E-Commerce Scraping",
        "card-ecommerce-desc": "Extract products, prices, images, reviews, and inventory from Amazon, Shopify, eBay, and other online stores.",
        "card-business-title": "Business Directory Scraping",
        "card-business-desc": "Scrape Google Maps, Yelp, Yellow Pages, and industry directories for company names, phones, emails, and addresses.",
        "card-content-title": "Content & News Scraping",
        "card-content-desc": "Collect articles, blog posts, job listings, real estate data, and social media content with full metadata extraction.",
        "card-custom-title": "Custom Scraping Solutions",
        "card-custom-desc": "Tailored scraping systems with API integration, scheduled crawls, database pipelines, and anti-bot bypass for complex targets.",
        "card-view-pricing": "View Pricing",
        
        "comp-title": "Our Scraping Process & Quality Assurance",
        "comp-desc": "We use enterprise-grade Python scraping infrastructure with rotating proxies, browser automation, and multi-layer validation to deliver accurate, clean data every time.",
        "comp-bullet1-bold": "Anti-Bot Bypass:",
        "comp-bullet1-text": "Rotating residential proxies, fingerprint randomization, and CAPTCHA solving for protected websites.",
        "comp-bullet2-bold": "Data Validation:",
        "comp-bullet2-text": "Multi-pass deduplication, format normalization, and error checking ensure 100% clean output.",
        "comp-bullet3-bold": "Flexible Delivery:",
        "comp-bullet3-text": "Get your data in Excel, CSV, JSON, Google Sheets, or direct database/API integration.",
        
        "view-ecommerce-sub": "Extract product catalogs, pricing data, customer reviews, and inventory levels from any online store. Perfect for competitor monitoring, price comparison, and market analysis.",
        "view-business-sub": "Build targeted B2B lead lists by scraping Google Maps, industry directories, and review platforms for verified company contact details.",
        "view-content-sub": "Monitor media coverage, aggregate job postings, collect real estate listings, or archive social media content with full metadata and timestamps.",
        "view-custom-sub": "Enterprise-grade scraping infrastructure. We build custom crawlers with API endpoints, scheduled jobs, and database pipelines for ongoing data needs.",
        "view-orders-title": "My Purchase History",
        "view-orders-sub": "Review your successful orders. Your data is stored locally in your browser workspace.",
        
        "th-date": "Order Date",
        "th-order-id": "Transaction ID",
        "th-product": "Product",
        "th-tier": "Package Tier",
        "th-site": "Target Site",
        "th-qty": "Quantity",
        "th-total": "Total Paid",
        "th-status": "Status",
        
        "no-orders-msg": "No purchase records found. Make your first order to see history here!",
        
        "modal-title": "Configure Order",
        "modal-desc": "Enter the target website URL and configure your scraping order.",
        "modal-base-pkg": "Base Package:",
        "modal-base-price-label": "Base Price:",
        "modal-email-label": "Email Address *",
        "modal-email-placeholder": "name@example.com",
        "modal-email-error": "Please enter a valid email address.",
        "modal-site-label": "Target Website URL:",
        "modal-site-placeholder": "https://example.com",
        "modal-qty": "Quantity:",
        "modal-total-amt": "Total Amount:",
        "modal-test-btn": "Click price to test checkout",
        
        "badge-ssl": "SSL Secured Checkout",
        "badge-paypal": "PayPal Verified",
        
        "foot-channels": "Scraping Services",
        "foot-legal": "Process & Quality",
        "foot-gdpr": "Anti-Bot Bypass Technology",
        "foot-canspam": "Multi-Pass Data Validation",
        "foot-match": "Multiple Output Formats",
        "foot-contact": "Contact support: snsherocom@gmail.com",
        "foot-copy": "© 2026 BibleForAI DATABOOST. All rights reserved. Web Scraping & Data Extraction Services.",
        
        "order-button": "Order Package",
        "featured-badge": "Best Seller",
        
        // Receipts
        "receipt-header": "BIBLEFORAI - DATABOOST RECEIPT",
        "receipt-date": "Order Date",
        "receipt-txid": "Transaction ID",
        "receipt-email": "Customer Email",
        "receipt-type": "Product Type",
        "receipt-size": "Package Size",
        "receipt-site": "Target URL",
        "receipt-qty": "Quantity",
        "receipt-baseprice": "Base Price",
        "receipt-total": "Total Paid",
        "receipt-status": "Status",
        "receipt-method": "Payment Method",
        "receipt-method-val": "PayPal Secure Checkout"
    },
    ko: {
        "logo-subtitle": "웹 스크래핑!",
        "nav-home": "홈",
        "nav-ecommerce": "이커머스",
        "nav-business": "비즈니스 데이터",
        "nav-content": "콘텐츠",
        "nav-custom": "맞춤형",
        "btn-orders": "내 주문 내역",
        "hero-badge": "AI 기반 데이터 추출",
        "hero-title": "BibleForAI - DATABOOST!",
        "hero-desc": "맞춤형 웹 스크래핑 및 데이터 추출. 모든 웹사이트를 분석 가능한 구조화된 데이터로 변환하세요.",
        "btn-explore": "스크래핑 서비스 둘러보기",
        "btn-compliance": "작업 프로세스",
        
        "stat-global-numbers": "웹사이트 지원",
        "stat-accuracy-rate": "데이터 정확도",
        "stat-opt-in": "신속한 전달",
        "stat-delivery": "출력 포맷",
        
        "sec-channels-title": "데이터 추출 서비스 살펴보기",
        "sec-channels-subtitle": "이커머스 상품 카탈로그부터 비즈니스 디렉토리, 뉴스 콘텐츠까지 — 모든 웹 데이터를 구조화된 Excel, CSV, JSON으로 추출하세요.",
        "card-ecommerce-title": "이커머스 스크래핑",
        "card-ecommerce-desc": "아마존, 쇼피파이, 이베이 등 온라인 스토어에서 상품, 가격, 이미지, 리뷰, 재고 정보를 추출합니다.",
        "card-business-title": "비즈니스 디렉토리 스크래핑",
        "card-business-desc": "구글 지도, 옐프, 옐로우페이지 등에서 업체명, 전화번호, 이메일, 주소를 수집합니다.",
        "card-content-title": "콘텐츠 및 뉴스 스크래핑",
        "card-content-desc": "기사, 블로그, 채용 공고, 부동산 매물, SNS 콘텐츠를 전체 메타데이터와 함께 수집합니다.",
        "card-custom-title": "맞춤형 스크래핑 솔루션",
        "card-custom-desc": "API 연동, 정기 크롤링, DB 파이프라인, 안티봇 우회를 포함한 맞춤형 스크래핑 시스템을 구축합니다.",
        "card-view-pricing": "가격 확인하기",
        
        "comp-title": "스크래핑 프로세스 및 품질 보증",
        "comp-desc": "로테이션 프록시, 브라우저 자동화, 다중 검증을 갖춘 엔터프라이즈급 Python 스크래핑 인프라로 매번 정확하고 깨끗한 데이터를 제공합니다.",
        "comp-bullet1-bold": "안티봇 우회:",
        "comp-bullet1-text": "로테이션 주거용 프록시, 핑거프린트 랜덤화, CAPTCHA 해결로 보호된 웹사이트 접근.",
        "comp-bullet2-bold": "데이터 검증:",
        "comp-bullet2-text": "다중 패스 중복 제거, 형식 정규화, 오류 검사로 100% 깨끗한 출력 보장.",
        "comp-bullet3-bold": "유연한 전달:",
        "comp-bullet3-text": "Excel, CSV, JSON, Google Sheets 또는 직접 데이터베이스/API 연동으로 데이터 수령.",
        
        "view-ecommerce-sub": "모든 온라인 스토어에서 상품 카탈로그, 가격 데이터, 고객 리뷰, 재고 수준을 추출합니다. 경쟁사 모니터링, 가격 비교, 시장 분석에 최적화되어 있습니다.",
        "view-business-sub": "구글 지도, 산업별 디렉토리, 리뷰 플랫폼에서 검증된 기업 연락처를 스크래핑하여 타겟 B2B 리드 리스트를 구축하세요.",
        "view-content-sub": "미디어 보도 모니터링, 채용 공고 수집, 부동산 매물 정리, SNS 콘텐츠 아카이빙을 전체 메타데이터와 함께 제공합니다.",
        "view-custom-sub": "엔터프라이즈급 스크래핑 인프라. API 엔드포인트, 스케줄 작업, 데이터베이스 파이프라인을 갖춘 맞춤형 크롤러를 구축해 드립니다.",
        "view-orders-title": "내 구매 히스토리",
        "view-orders-sub": "성공한 주문 내역을 검토하세요. 데이터는 브라우저 로컬스토리지에 안전하게 보관됩니다.",
        
        "th-date": "주문 날짜",
        "th-order-id": "트랜잭션 ID",
        "th-product": "상품명",
        "th-tier": "패키지 등급",
        "th-site": "대상 사이트",
        "th-qty": "수량",
        "th-total": "총 결제금액",
        "th-status": "상태",
        
        "no-orders-msg": "구매 기록이 없습니다. 첫 주문을 완료하시면 내역이 여기에 표시됩니다!",
        
        "modal-title": "주문 설정",
        "modal-desc": "대상 웹사이트 URL을 입력하고 스크래핑 주문을 설정하세요.",
        "modal-base-pkg": "기본 패키지:",
        "modal-base-price-label": "기본 가격:",
        "modal-email-label": "이메일 주소 *",
        "modal-email-placeholder": "name@example.com",
        "modal-email-error": "올바른 이메일 주소를 입력해주세요.",
        "modal-site-label": "대상 웹사이트 URL:",
        "modal-site-placeholder": "https://example.com",
        "modal-qty": "수량:",
        "modal-total-amt": "총 결제금액:",
        "modal-test-btn": "가격 텍스트를 눌러 테스트 결제",
        
        "badge-ssl": "SSL 보안 결제 지원",
        "badge-paypal": "PayPal 인증됨",
        
        "foot-channels": "스크래핑 서비스",
        "foot-legal": "프로세스 및 품질",
        "foot-gdpr": "안티봇 우회 기술",
        "foot-canspam": "다중 패스 데이터 검증",
        "foot-match": "다양한 출력 포맷",
        "foot-contact": "문의 지원: snsherocom@gmail.com",
        "foot-copy": "© 2026 BibleForAI DATABOOST. All rights reserved. 웹 스크래핑 및 데이터 추출 서비스.",
        
        "order-button": "패키지 주문하기",
        "featured-badge": "베스트 셀러",
        
        // Receipts
        "receipt-header": "BIBLEFORAI - DATABOOST 영수증",
        "receipt-date": "주문 날짜",
        "receipt-txid": "거래 ID",
        "receipt-email": "고객 이메일",
        "receipt-type": "상품 종류",
        "receipt-size": "패키지 크기",
        "receipt-site": "대상 URL",
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
    const lang = currentLang;
    const isKo = lang === 'ko';
    
    document.documentElement.lang = lang;
    
    document.title = isKo ? "BibleForAI - DATABOOST | 웹 스크래핑 및 데이터 추출" : "BibleForAI - DATABOOST | Web Scraping & Data Extraction";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.content = isKo ? 
            "맞춤형 웹 스크래핑 및 자동화 데이터 추출 서비스. 이커머스 상품, 비즈니스 디렉토리, 뉴스 기사 등 모든 웹 데이터를 Excel/CSV로 추출합니다." : 
            "Custom web scraping and automated data extraction services. Scrape e-commerce products, business directories, news articles, and more into clean Excel/CSV format.";
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
        ogTitle.content = isKo ? "BibleForAI - DATABOOST | 웹 스크래핑 및 데이터 추출" : "BibleForAI - DATABOOST | Web Scraping & Data Extraction";
    }
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
        ogDesc.content = isKo ? 
            "맞춤형 웹 스크래핑 및 자동화 데이터 추출. AI 기반 크롤링 기술로 모든 웹사이트를 구조화된 Excel/CSV 데이터로 변환합니다." : 
            "Custom web scraping and automated data extraction. Convert any website into structured Excel/CSV data with AI-powered crawling technology.";
    }
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) {
        twTitle.content = isKo ? "BibleForAI - DATABOOST | 웹 스크래핑 및 데이터 추출" : "BibleForAI - DATABOOST | Web Scraping & Data Extraction";
    }
    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) {
        twDesc.content = isKo ? 
            "맞춤형 웹 스크래핑 및 자동화 데이터 추출. AI 기반 크롤링 기술로 모든 웹사이트를 구조화된 Excel/CSV 데이터로 변환합니다." : 
            "Custom web scraping and automated data extraction. Convert any website into structured Excel/CSV data with AI-powered crawling technology.";
    }

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

function navigate(viewId) {
    currentView = viewId;
    
    document.querySelectorAll('.view-section').forEach(sec => {
        sec.classList.remove('active');
    });
    
    const activeSection = document.getElementById(`${viewId}-view`);
    if (activeSection) {
        activeSection.classList.add('active');
    }
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.id === `nav-${viewId}`) {
            link.classList.add('active');
        }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleMobileMenu() {
    const drawer = document.getElementById('mobile-drawer');
    drawer.classList.toggle('active');
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
            const btnText = translations[currentLang]['order-button'] || 'Order Package';
            
            return `
                <div class="package-card ${featuredClass}" data-badge="${translations[currentLang]['featured-badge'] || 'Best Seller'}">
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
        case 'ecommerce': return 'fa-solid fa-cart-shopping';
        case 'business': return 'fa-solid fa-building';
        case 'content': return 'fa-solid fa-newspaper';
        case 'custom': return 'fa-solid fa-gears';
        default: return 'fa-solid fa-spider';
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
    
    document.getElementById('modal-product-title').innerText = `${catTitle}`;
    document.getElementById('modal-package-name').innerText = pkgName;
    document.getElementById('modal-base-price').innerText = formatPrice(pkg.price);
    document.getElementById('order-quantity').value = orderQuantity;
    
    const emailInput = document.getElementById('order-email');
    if (emailInput) {
        emailInput.value = '';
        emailInput.style.borderColor = 'var(--border)';
    }
    const emailError = document.getElementById('email-error');
    if (emailError) {
        emailError.style.display = 'none';
    }
    
    const siteInput = document.getElementById('order-site');
    if (siteInput) {
        siteInput.value = '';
    }
    
    const testBtn = document.getElementById('paypal-test-button');
    if (testBtn) {
        testBtn.style.display = 'block';
    }
    
    updateModalPrice();
    
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
            const targetSite = document.getElementById('order-site') ? document.getElementById('order-site').value : '';
            const finalAmount = (currentPackage.basePrice * orderQuantity).toFixed(2);
            return actions.order.create({
                purchase_units: [{
                    description: `${currentPackage.categoryName} - ${currentPackage.tierName} [Site: ${targetSite}] (Qty: ${orderQuantity})`,
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
    }).render('#paypal-button-container');
}

function saveLocalOrder(details) {
    const orderLogs = JSON.parse(localStorage.getItem('databoost_orders')) || [];
    const targetSite = document.getElementById('order-site') ? document.getElementById('order-site').value : '';
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
        site: targetSite || 'N/A',
        quantity: orderQuantity,
        basePrice: currentPackage.basePrice,
        totalPaid: formatPrice(currentPackage.basePrice * orderQuantity),
        status: 'Completed',
        clientId: clientId,
        secret: secret
    };
    
    orderLogs.unshift(newOrder);
    localStorage.setItem('databoost_orders', JSON.stringify(orderLogs));
    
    renderOrders();
    
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
${dict["receipt-site"].padEnd(15)} : ${newOrder.site}
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
    const orderLogs = JSON.parse(localStorage.getItem('databoost_orders')) || [];
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
            <td>${order.site || 'N/A'}</td>
            <td>${order.quantity}</td>
            <td><strong>${order.totalPaid}</strong></td>
            <td><span class="status-badge">${isKo ? "완료됨" : order.status}</span></td>
        </tr>
    `).join('');
}

// Expose variables globally to prevent ReferenceErrors in inline HTML scripts/handlers
if (typeof navigate !== 'undefined') { window.navigate = navigate; }
if (typeof currentLang !== 'undefined') { window.currentLang = currentLang; }
