// App State
let currentView = 'home';
let currentPackage = null;
let orderQuantity = 1;
let paypalButtonInstance = null;

// Package Catalog with Localized Keys
const packageCatalog = {
    phone: {
        title_en: 'Phone Number Data',
        title_ko: '전화번호 데이터',
        packages: [
            { id: 'phone-trial', name_en: 'Trial Package (10K)', name_ko: '체험용 패키지 (1만건)', desc_en: 'Test leads for small scale marketing outreach.', desc_ko: '소규모 마케팅 도달테스트를 위한 체험용 데이터 리스트.', price: 160, featured: false, features_en: ['Excel/CSV Formats', 'Worldwide Country Lists', 'Opt-In Verified', '24/7 Support'], features_ko: ['Excel/CSV 포맷 제공', '전세계 국가 리스트 지원', 'Opt-in 마케팅 동의 완료', '24시간 지원'] },
            { id: 'phone-100k', name_en: '100K Package', name_ko: '10만건 패키지', desc_en: 'Targeted database for cold calling and SMS.', desc_ko: '텔레마케팅 및 SMS 문자 마케팅에 최적화된 데이터 리스트.', price: 200, featured: false, features_en: ['Excel/CSV Formats', 'Opt-in Verified Leads', 'Real-time Scrubbed', 'Priority Support'], features_ko: ['Excel/CSV 포맷 제공', 'Opt-in 마케팅 동의 완료', '실시간 검증 및 정제', '우선 고객 지원'] },
            { id: 'phone-500k', name_en: '500K Package', name_ko: '50만건 패키지', desc_en: 'Standard business leads package for medium teams.', desc_ko: '중소 규모 마케팅 팀을 위한 표준 비즈니스 리드 패키지.', price: 500, featured: false, features_en: ['Excel/CSV Formats', 'GDPR Compliant Logs', 'Scrubbed for DNC Lists', 'Dedicated Account Manager'], features_ko: ['Excel/CSV 포맷 제공', 'GDPR 규정 준수 로그', 'DNC 스팸 번호 거부 검증', '전담 어카운트 매니저'] },
            { id: 'phone-mid', name_en: '1 Million Package', name_ko: '100만건 패키지', desc_en: 'High-volume scrubbing for enterprise scale telemarketing.', desc_ko: '대규모 마케팅 및 기업형 텔레마케팅을 위한 고효율 리스트.', price: 800, featured: true, features_en: ['Excel/CSV Formats', 'High Volume Scrubbed', 'GDPR Compliant', 'VIP Delivery Manager'], features_ko: ['Excel/CSV 포맷 제공', '대용량 정밀 필터링', 'GDPR 글로벌 규정 준수', 'VIP 전담 기술 매니저'] },
            { id: 'phone-max', name_en: '3 Million Package', name_ko: '300만건 패키지', desc_en: 'Full country directories for global campaigns and CRM import.', desc_ko: '글로벌 캠페인 및 대형 CRM 시스템 구축을 위한 전체 국가 디렉토리.', price: 2200, featured: false, features_en: ['Excel/CSV Formats', 'Full Country Directory', 'Continuous Updates', 'Dedicated Lead Architect'], features_ko: ['Excel/CSV 포맷 제공', '전국가 디렉토리 포함', '주기적인 최신 데이터 업데이트', '데이터 엔지니어 기술 설계'] }
        ]
    },
    whatsapp: {
        title_en: 'WhatsApp Number Data',
        title_ko: '왓츠앱 데이터',
        packages: [
            { id: 'whatsapp-100k', name_en: '100K Package', name_ko: '10만건 패키지', desc_en: 'Clean lists tested for active WhatsApp messenger accounts.', desc_ko: '활성 상태가 검증된 왓츠앱 메신저 계정 정보 목록.', price: 200, featured: false, features_en: ['WhatsApp Active Checked', 'Profile Pictures Scraped', 'Excel/CSV Format', 'Instant Delivery'], features_ko: ['메신저 실시간 활성 검증', '프로필 사진 스크래핑 포함', 'Excel/CSV 포맷 제공', '즉시 파일 다운로드'] },
            { id: 'whatsapp-500k', name_en: '500K Package', name_ko: '50만건 패키지', desc_en: 'Standard WhatsApp database for message automation campaigns.', desc_ko: '자동화 메시지 발송 캠페인에 적합한 표준 왓츠앱 데이터베이스.', price: 480, featured: false, features_en: ['Active Status Checked', 'Targeted Country Codes', 'GDPR Opt-In Logs', 'Support Included'], features_ko: ['활성 상태 검증 완료', '타겟 국가 코드 세분화', 'GDPR 동의 로그 제공', '고객 기술 지원 포함'] },
            { id: 'whatsapp-mid', name_en: '1 Million Package', name_ko: '100만건 패키지', desc_en: 'Global country lists optimized for digital advertising.', desc_ko: '온라인 디지털 광고 타겟 마케팅에 최적화된 글로벌 국가 리스트.', price: 900, featured: true, features_en: ['Global Country Coverage', 'GDPR Opt-In Logs', 'Scrubbed Dead Accounts', 'VIP Delivery Manager'], features_ko: ['전세계 국가 리스트 포함', 'GDPR 동의 로그 제공', '비활성/유령 계정 제거', 'VIP 전담 기술 매니저'] },
            { id: 'whatsapp-max', name_en: '3 Million Package', name_ko: '300만건 패키지', desc_en: 'Unlimited geographic filtering for ultimate sales pipelines.', desc_ko: '영업 파이프라인의 고도화를 위한 무제한 지리적 타겟 필터링 리스트.', price: 2400, featured: false, features_en: ['Unlimited Geo Filters', 'Custom CRM Schema', 'Weekly Freshness Checks', 'Dedicated Account Executive'], features_ko: ['무제한 국가 필터링 지원', '맞춤형 CRM 데이터 구조화', '매주 데이터 신선도 교차검증', '전담 고객 성공 파트너'] }
        ]
    },
    telegram: {
        title_en: 'Telegram Number Data',
        title_ko: '텔레그램 데이터',
        packages: [
            { id: 'telegram-trial', name_en: 'Trial Package (10K)', name_ko: '체험용 패키지 (1만건)', desc_en: 'Target crypto users, trading groups, and tech-savvy leads.', desc_ko: '가상자산 유저, 트레이딩 그룹 및 IT 친화적 리드 타겟.', price: 180, featured: false, features_en: ['Telegram Username Lists', 'Crypto & Forex Focus', 'CSV Format', 'Active within 7 days'], features_ko: ['텔레그램 유저네임 포함', '가상자산 및 주식 관심사', 'Excel/CSV 포맷 제공', '최근 7일내 활성 유저'] },
            { id: 'telegram-100k', name_en: '100K Package', name_ko: '10만건 패키지', desc_en: 'Extract target group members and channels for marketing.', desc_ko: '타겟 그룹 및 활성 채널 유저 데이터 추출 리스트.', price: 300, featured: false, features_en: ['Country Filter Option', 'Group Member Extraction', 'Highly Active Users Only', 'Support Included'], features_ko: ['국가별 필터링 옵션', '특정 그룹 맴버 추출 데이터', '실시간 활성 유저 전용', '고객 기술 지원 포함'] },
            { id: 'telegram-500k', name_en: '500K Package', name_ko: '50만건 패키지', desc_en: 'Standard Telegram database for community building.', desc_ko: '대형 커뮤니티 빌딩 및 바이럴 홍보를 위한 표준 데이터베이스.', price: 600, featured: false, features_en: ['Active Community Members', 'Bio & Username Fields', 'CSV Format', 'Priority Support'], features_ko: ['활성 커뮤니티 멤버 포함', '유저 자기소개(Bio) 데이터', 'Excel/CSV 포맷 제공', '우선 고객 지원 제공'] },
            { id: 'telegram-mid', name_en: '1 Million Package', name_ko: '100만건 패키지', desc_en: 'High-volume list of highly active users and user bios.', desc_ko: '프로필 자기소개 분석 및 대규모 타겟 발송용 고활성 리드.', price: 1000, featured: true, features_en: ['Bulk Channel Leads', 'Job Details & Bios', 'Daily Freshness Checks', 'VIP Delivery Manager'], features_ko: ['대량 채널 유저 목록', '직업 및 상세 정보 수록', '매일 데이터 신선도 체크', 'VIP 전담 기술 매니저'] },
            { id: 'telegram-max', name_en: '3 Million Package', name_ko: '300만건 패키지', desc_en: 'Full global directory of active Telegram phone records.', desc_ko: '전세계의 텔레그램 연동 활성 전화번호 전체 디렉토리.', price: 2800, featured: false, features_en: ['Full Global Directory', 'Monthly Verification Checks', 'Custom Geo Filtering', 'Dedicated Account Executive'], features_ko: ['전세계 디렉토리 전체 제공', '매월 활성 데이터 전수조사', '사용자 정의 국가 필터링', '전담 고객 성공 파트너'] }
        ]
    },
    email: {
        title_en: 'Country Email Data',
        title_ko: '이메일 데이터',
        packages: [
            { id: 'email-1m', name_en: '1 Million Package', name_ko: '100만건 패키지', desc_en: 'Clean lists compiled by region for clean deliverability.', desc_ko: '높은 메일 도달율을 보장하는 지역별 정제된 이메일 주소 목록.', price: 300, featured: false, features_en: ['GDPR Consent Records', 'Zero Spam Traps', 'Excel/CSV Format', 'Instant Download'], features_ko: ['GDPR 마케팅 동의 완료', '스팸 트랩 주소 완전 제거', 'Excel/CSV 포맷 제공', '즉시 파일 다운로드'] },
            { id: 'email-10m', name_en: '10 Million Package', name_ko: '1000만건 패키지', desc_en: 'Standard countrywide B2C email marketing database.', desc_ko: '대량 B2C 이메일 마케팅 캠페인을 위한 표준 국가별 데이터베이스.', price: 1200, featured: false, features_en: ['Corporate & Personal Emails', 'Bounce Checker Cleared', 'Verified Opt-In Consent', 'Priority Delivery Support'], features_ko: ['기업 및 개인 이메일 제공', '바운스 오류 검증 통과', '검증된 마케팅 동의 포함', '우선 배송 기술 지원'] },
            { id: 'email-20m', name_en: '20 Million Package', name_ko: '2000만건 패키지', desc_en: 'High-volume corporate and consumer address databases.', desc_ko: '글로벌 기업 임직원 및 일반 소비자의 고정밀 주소 정보.', price: 2000, featured: true, features_en: ['Global Lead Coverage', 'Monthly Freshness Updates', 'Full Contact Bio Data', 'VIP Delivery Manager'], features_ko: ['글로벌 리드 정보 커버리지', '매월 최신 메일 주소 갱신', '상세 유저 바이오 데이터', 'VIP 전담 기술 매니저'] },
            { id: 'email-30m', name_en: '30 Million Package', name_ko: '3000만건 패키지', desc_en: 'Massive global lead directory with complete metadata.', desc_ko: '완벽한 인적 정보가 포함된 초대형 글로벌 이메일 디렉토리.', price: 2400, featured: false, features_en: ['Unlimited Geo Filters', 'Company & Bio Fields', 'Weekly Scrubbing Cleared', 'Dedicated Lead Architect'], features_ko: ['무제한 국가 필터링 지원', '회사명 및 이력 항목 수록', '매주 데이터 실시간 정제', '데이터 엔지니어 기술 설계'] }
        ]
    },
    clevel: {
        title_en: 'C-Level Executive Data',
        title_ko: 'C-레벨 경영진 데이터',
        packages: [
            { id: 'clevel-trial', name_en: '50K Package', name_ko: '5만건 패키지', desc_en: 'High-value executive leads across various corporate divisions.', desc_ko: '각 기업 내 고부가 임원 및 부서장 리드 정보.', price: 400, featured: false, features_en: ['CEO, CFO, CMO Directories', 'Corporate Direct Phone', 'Excel/CSV Formats', 'GDPR Audited Logs'], features_ko: ['CEO, CFO, CMO 주소록', '기업 및 직통 전화번호', 'Excel/CSV 포맷 제공', 'GDPR 보안 감사 완료'] },
            { id: 'clevel-mid', name_en: '100K Package', name_ko: '10만건 패키지', desc_en: 'Direct access to Founders, CTOs, and Directors worldwide.', desc_ko: '창립자, CTO 및 주요 이사진의 검증된 연락처 목록.', price: 600, featured: true, features_en: ['CTO, CIO, Founder Listings', 'Direct Corporate Emails', 'Company Size & Revenue Filters', 'Priority Support Manager'], features_ko: ['CTO, CIO, 설립자 명부', '기업 직통 이메일 수록', '회사 규모 및 매출 필터', '우선 고객 지원 제공'] },
            { id: 'clevel-max', name_en: '500K Package', name_ko: '50만건 패키지', desc_en: 'Massive global boardroom directory containing validated profiles.', desc_ko: '전세계 이사진 및 의사결정권자들을 망라한 고품질 데이터베이스.', price: 1200, featured: false, features_en: ['Complete Global Directory', 'Corporate & Board Members', 'Monthly Verification', 'Dedicated Account Executive'], features_ko: ['완벽한 글로벌 디렉토리', '기업 이사진 및 임원 정보', '매월 활성 데이터 전수조사', '전담 고객 성공 파트너'] }
        ]
    }
};

// Translation Dictionary
const translations = {
    en: {
        "logo-subtitle": "B2C DATABASE!",
        "nav-home": "Home",
        "nav-phone": "Phone Data",
        "nav-whatsapp": "WhatsApp Data",
        "nav-telegram": "Telegram Data",
        "nav-email": "Email Data",
        "nav-clevel": "C-Level Leads",
        "btn-orders": "My Orders",
        "hero-badge": "AI-Powered Compliance",
        "hero-title": "BibleForAI - B2C DATABASE!",
        "hero-desc": "Acquire compliant & accurate customer data using AI services.",
        "btn-explore": "Explore Databases",
        "btn-compliance": "Check Compliance",
        
        "stat-global-numbers": "Global Numbers",
        "stat-accuracy-rate": "Accuracy Rate",
        "stat-opt-in": "Opt-in Consent",
        "stat-delivery": "Instant Delivery",
        
        "sec-channels-title": "Discover Our Premium Data Channels",
        "sec-channels-subtitle": "Target users on their preferred messaging platforms and networks with clean, verified directories.",
        "card-phone-title": "Phone Number Data",
        "card-phone-desc": "Fully compliant mobile lists suitable for high-conversion SMS marketing and cold calling campaigns.",
        "card-whatsapp-title": "WhatsApp Number Data",
        "card-whatsapp-desc": "Active WhatsApp databases checked for profile verification and status activity to boost delivery.",
        "card-telegram-title": "Telegram Number Data",
        "card-telegram-desc": "Filtered Telegram accounts targeting active users, crypto investors, and tech-savvy audiences.",
        "card-email-title": "Country Email Data",
        "card-email-desc": "High deliverability country-specific B2B and B2C email lists verified against bounce triggers.",
        "card-clevel-title": "C-Level Executive Data",
        "card-clevel-desc": "Enterprise decisions makers contact info including CEOs, CMOs, CTOs, corporate phone, and email.",
        "card-view-pricing": "View Pricing",
        
        "comp-title": "Legal Compliance & Data Protection",
        "comp-desc": "Our lead generation system uses sophisticated AI filters to cross-reference consent logs, public records, and opt-in databases ensuring 100% legal compliance with global standards.",
        "comp-bullet1-bold": "GDPR Compliant:",
        "comp-bullet1-text": "Fully audited opt-in records for all European Union leads.",
        "comp-bullet2-bold": "CAN-SPAM Ready:",
        "comp-bullet2-text": "Domain checking prevents bounces and spam traps.",
        "comp-bullet3-bold": "Real-time verification:",
        "comp-bullet3-text": "All database queries are scrubbed before delivery.",
        
        "view-phone-sub": "Buy worldwide cell phone database lists to engage directly. High-precision filters by country and network provider.",
        "view-whatsapp-sub": "Maximize direct outreach. Get active WhatsApp phone records verified for messenger engagement and profile pictures.",
        "view-telegram-sub": "Target active group members, crypto communities, and specific country demographics on Telegram.",
        "view-email-sub": "Deploy cold email campaigns with high deliverability. Direct marketing verified list segments by country.",
        "view-clevel-sub": "B2B contacts of high-value business decision makers (CEO, CFO, CTO, owners) targeting accurate business leads.",
        "view-orders-title": "My Purchase History",
        "view-orders-sub": "Review your successful orders. Your data is stored locally in your browser workspace.",
        
        "th-date": "Order Date",
        "th-order-id": "Transaction ID",
        "th-product": "Product",
        "th-tier": "Package Tier",
        "th-country": "Target Country",
        "th-qty": "Quantity",
        "th-total": "Total Paid",
        "th-status": "Status",
        
        "no-orders-msg": "No purchase records found. Make your first order to see history here!",
        
        "modal-title": "Configure Order",
        "modal-desc": "Configure quantity and complete secure PayPal payment.",
        "modal-base-pkg": "Base Package:",
        "modal-base-price-label": "Base Price:",
        "modal-email-label": "Email Address *",
        "modal-email-placeholder": "name@example.com",
        "modal-email-error": "Please enter a valid email address.",
        "modal-country-label": "Target Country:",
        "modal-qty": "Quantity:",
        "modal-total-amt": "Total Amount:",
        "modal-test-btn": "Run Sandbox Test Checkout",
        
        "badge-ssl": "SSL Secured Checkout",
        "badge-paypal": "PayPal Verified",
        
        "foot-channels": "Data Channels",
        "foot-legal": "Legal & Compliance",
        "foot-gdpr": "GDPR Consent Records",
        "foot-canspam": "CAN-SPAM Verified",
        "foot-match": "98% Quality Match",
        "foot-contact": "Contact support: snsherocom@gmail.com",
        "foot-copy": "&copy; 2026 BibleForAI B2C DATABASE. All rights reserved. Secure SMM & Lead databases.",
        
        "order-button": "Order Package",
        "featured-badge": "Best Seller",
        
        // Receipts
        "receipt-header": "BIBLEFORAI - B2C DATABASE RECEIPT",
        "receipt-date": "Order Date",
        "receipt-txid": "Transaction ID",
        "receipt-email": "Customer Email",
        "receipt-type": "Product Type",
        "receipt-size": "Package Size",
        "receipt-country": "Target Country",
        "receipt-qty": "Quantity",
        "receipt-baseprice": "Base Price",
        "receipt-total": "Total Paid",
        "receipt-status": "Status",
        "receipt-method": "Payment Method",
        "receipt-method-val": "PayPal Secure Checkout"
    },
    ko: {
        "logo-subtitle": "B2C 데이터베이스!",
        "nav-home": "홈",
        "nav-phone": "전화번호 데이터",
        "nav-whatsapp": "왓츠앱 데이터",
        "nav-telegram": "텔레그램 데이터",
        "nav-email": "이메일 데이터",
        "nav-clevel": "C-레벨 리드",
        "btn-orders": "내 주문 내역",
        "hero-badge": "AI 기반 규정 준수",
        "hero-title": "BibleForAI - B2C 데이터베이스!",
        "hero-desc": "AI 서비스를 사용하여 합법적이고 정확한 고객 데이터를 확보하세요.",
        "btn-explore": "데이터베이스 둘러보기",
        "btn-compliance": "적합성 확인",
        
        "stat-global-numbers": "글로벌 번호",
        "stat-accuracy-rate": "정확도 비율",
        "stat-opt-in": "마케팅 동의",
        "stat-delivery": "즉시 다운로드",
        
        "sec-channels-title": "프리미엄 데이터 채널 둘러보기",
        "sec-channels-subtitle": "인증된 깨끗한 주소록을 통해 고객들이 선호하는 메시징 플랫폼과 네트워크로 접근하세요.",
        "card-phone-title": "전화번호 데이터",
        "card-phone-desc": "높은 전환율의 SMS 마케팅 및 콜드콜 캠페인에 적합한 규정 준수 모바일 목록입니다.",
        "card-whatsapp-title": "왓츠앱 데이터",
        "card-whatsapp-desc": "메시지 도달율을 높이기 위해 프로필 사진 및 활성 상태가 검증된 활성 왓츠앱 데이터베이스입니다.",
        "card-telegram-title": "텔레그램 데이터",
        "card-telegram-desc": "활성 사용자, 크립토 투자자 및 기술 친화적 고객을 타겟팅하는 필터링된 텔레그램 계정입니다.",
        "card-email-title": "국가별 이메일 데이터",
        "card-email-desc": "바운스 트리거 검증을 마친 고전달율 국가별 B2B 및 B2C 이메일 리스트입니다.",
        "card-clevel-title": "C-Level 경영진 데이터",
        "card-clevel-desc": "CEO, CMO, CTO 등 기업 의사결정권자들의 직통 전화번호 및 이메일을 포함한 정보입니다.",
        "card-view-pricing": "가격 확인하기",
        
        "comp-title": "법률 준수 및 개인정보 보호",
        "comp-desc": "당사의 리드 생성 시스템은 정교한 AI 필터를 사용하여 마케팅 동의 로그, 공공 기록 및 옵트인 데이터베이스를 교차 검증함으로써 글로벌 표준 법률을 100% 준수합니다.",
        "comp-bullet1-bold": "GDPR 준수:",
        "comp-bullet1-text": "모든 EU 지역 리드에 대해 완벽히 검증된 마케팅 동의 기록 제공.",
        "comp-bullet2-bold": "CAN-SPAM 대응:",
        "comp-bullet2-text": "도메인 실시간 확인으로 바운스 및 스팸 트랩 방지.",
        "comp-bullet3-bold": "실시간 필터링:",
        "comp-bullet3-text": "모든 데이터베이스 쿼리는 전달 직전에 실시간 검증 및 정제됩니다.",
        
        "view-phone-sub": "전세계 휴대폰 번호 데이터베이스 리스트를 구매하여 직접 소통하세요. 국가 및 통신사별 고정밀 필터링을 지원합니다.",
        "view-whatsapp-sub": "다이렉트 도달율을 극대화하세요. 메신저 활성 여부와 프로필 사진이 검증된 활성 왓츠앱 번호 레코드를 확보합니다.",
        "view-telegram-sub": "텔레그램의 활성 그룹 멤버, 크립토 커뮤니티 및 국가별 세부 고객을 타겟팅하세요.",
        "view-email-sub": "높은 도달율의 콜드 이메일 캠페인을 집행하세요. 국가별 다이렉트 마케팅 검증 완료 리스트 세그먼트를 제공합니다.",
        "view-clevel-sub": "기업 핵심 의사결정권자(CEO, CFO, CTO, 설립자 등)의 B2B 연락처 정보로 정확한 비즈니스 성장을 설계하세요.",
        "view-orders-title": "내 구매 히스토리",
        "view-orders-sub": "성공한 주문 내역을 검토하세요. 데이터는 브라우저 로컬스토리지에 안전하게 보관됩니다.",
        
        "th-date": "주문 날짜",
        "th-order-id": "트랜잭션 ID",
        "th-product": "상품명",
        "th-tier": "패키지 등급",
        "th-country": "대상 국가",
        "th-qty": "수량",
        "th-total": "총 결제금액",
        "th-status": "상태",
        
        "no-orders-msg": "구매 기록이 없습니다. 첫 주문을 완료하시면 내역이 여기에 표시됩니다!",
        
        "modal-title": "주문 설정",
        "modal-desc": "수량을 선택하고 안전한 PayPal 결제를 진행하세요.",
        "modal-base-pkg": "기본 패키지:",
        "modal-base-price-label": "기본 가격:",
        "modal-email-label": "이메일 주소 *",
        "modal-email-placeholder": "name@example.com",
        "modal-email-error": "올바른 이메일 주소를 입력해주세요.",
        "modal-country-label": "대상 국가:",
        "modal-qty": "수량:",
        "modal-total-amt": "총 결제금액:",
        "modal-test-btn": "샌드박스 테스트 결제 진행",
        
        "badge-ssl": "SSL 보안 결제 지원",
        "badge-paypal": "PayPal 인증됨",
        
        "foot-channels": "데이터 채널",
        "foot-legal": "법률 및 규정 준수",
        "foot-gdpr": "GDPR 마케팅 동의 완료",
        "foot-canspam": "CAN-SPAM 법률 준수",
        "foot-match": "98% 품질 검증 일치",
        "foot-contact": "문의 지원: snsherocom@gmail.com",
        "foot-copy": "&copy; 2026 BibleForAI B2C DATABASE. All rights reserved. Secure SMM & Lead databases.",
        
        "order-button": "패키지 주문하기",
        "featured-badge": "베스트 셀러",
        
        // Receipts
        "receipt-header": "BIBLEFORAI - B2C 데이터베이스 영수증",
        "receipt-date": "주문 날짜",
        "receipt-txid": "거래 ID",
        "receipt-email": "고객 이메일",
        "receipt-type": "상품 종류",
        "receipt-size": "패키지 크기",
        "receipt-country": "대상 국가",
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

function applyTranslations() {
    const lang = currentLang;
    const isKo = lang === 'ko';
    
    // Set document lang attribute
    document.documentElement.lang = lang;
    
    // Update document title and metadata
    document.title = isKo ? "BibleForAI - B2C 데이터베이스 | 합법적 B2B & B2C 고객 데이터" : "BibleForAI - B2C DATABASE | Compliant B2B & B2C Customer Data";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.content = isKo ? 
            "AI 서비스를 사용하여 합법적이고 GDPR을 준수하며 98% 정확한 전화번호, 왓츠앱, 텔레그램 및 B2B 이메일 고객 데이터 리스트를 확보하세요." : 
            "Acquire legal, GDPR-compliant, and 98% accurate customer data lists including phone numbers, WhatsApp, Telegram, and B2B email lists powered by AI services.";
    }

    // Update Open Graph (OG) and Twitter Metadata tags dynamically
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
        ogTitle.content = isKo ? "BibleForAI - B2C 데이터베이스 | 합법적 고객 데이터" : "BibleForAI - B2C DATABASE | Compliant Customer Data";
    }
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
        ogDesc.content = isKo ? 
            "AI 서비스를 사용하여 합법적이고 GDPR을 준수하며 98% 정확한 고객 데이터를 확보하세요. 전화번호, 이메일, 왓츠앱, 텔레그램 리드 생성." : 
            "Acquire legal, GDPR-compliant, and 98% accurate customer data using AI services. Phone, email, WhatsApp, and Telegram lead generation.";
    }
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) {
        twTitle.content = isKo ? "BibleForAI - B2C 데이터베이스 | 합법적 고객 데이터" : "BibleForAI - B2C DATABASE | Compliant Customer Data";
    }
    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) {
        twDesc.content = isKo ? 
            "AI 서비스를 사용하여 합법적이고 GDPR을 준수하며 98% 정확한 고객 데이터를 확보하세요. 전화번호, 이메일, 왓츠앱, 텔레그램 리드 생성." : 
            "Acquire legal, GDPR-compliant, and 98% accurate customer data using AI services. Phone, email, WhatsApp, and Telegram lead generation.";
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
                        <span class="price">$${pkg.price}</span>
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
        case 'phone': return 'fa-solid fa-phone';
        case 'whatsapp': return 'fa-brands fa-whatsapp';
        case 'telegram': return 'fa-solid fa-paper-plane';
        case 'email': return 'fa-solid fa-envelope';
        case 'clevel': return 'fa-solid fa-user-tie';
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
    document.getElementById('modal-base-price').innerText = `$${pkg.price.toLocaleString()} USD`;
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
    document.getElementById('modal-total-price').innerText = `$${totalPrice.toLocaleString()} USD`;
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

// Sandbox Test Checkout Trigger
function triggerTestCheckout() {
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
        totalPaid: `$${(currentPackage.basePrice * orderQuantity).toLocaleString()} USD`,
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
${dict["receipt-baseprice"].padEnd(15)} : $${newOrder.basePrice.toLocaleString()} USD
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
