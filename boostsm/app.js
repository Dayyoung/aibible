/* Web Application logic for BibleForAI - Boost Your Social Media! */

// Application State
const state = {
    products: [],
    reviews: [],
    cart: [],
    user: null,
    orders: [],
    currentView: 'home',
    currentCategory: 'Instagram',
    currentFilter: 'all',
    currentPage: 1,
    selectedProduct: null,
    selectedOption: null,
    paypalSdkLoaded: false,
    language: (() => {
        const saved = localStorage.getItem('boostsm_lang');
        if (saved) return saved;
        
        let defaultLang = 'en';
        const userLangs = navigator.languages || [navigator.language || navigator.userLanguage || ''];
        for (const lang of userLangs) {
            if (lang && lang.toLowerCase().startsWith('ko')) {
                defaultLang = 'ko';
                break;
            }
        }
        return defaultLang;
    })()
};

const translations = {
    en: {
        "logo-subtitle": "Boost Your Social Media!",
        "nav-home": "Home",
        "nav-instagram": "Instagram",
        "nav-youtube": "YouTube",
        "nav-tiktok": "TikTok & X",
        "nav-facebook": "Threads & FB",
        "nav-seo": "SEO & Spotify",
        "btn-signin": "Sign In",
        "hero-title": "Boost Your Social Media<br>with <span>AI-Powered</span> Growth!",
        "hero-desc": "Optimize your channels, get active organic engagement, and gain immediate social presence. Safe, automated, and 100% password-free.",
        "btn-getstarted": "Get Started Now",
        "btn-seereviews": "See Reviews",
        "sec-featured-title": "Best Selling <span>Packages</span>",
        "sec-reviews-title": "Trusted By <span>Social Creators</span>",
        "sec-faq-title": "Frequently Asked <span>Questions</span>",
        "faq-q1": "Will buying SMM services suspend my account?",
        "faq-a1": "Absolutely not. BibleForAI processes your orders organically using active, real-profile networks without violating the policies of Instagram, YouTube, or TikTok. We have processed millions of orders with zero account suspensions.",
        "faq-q2": "Do you require my account password?",
        "faq-a2": "No, we never ask for your account password. We only require your public account username (e.g. @yourname) or the specific post link to process the growth. Your personal account safety is fully guaranteed.",
        "faq-q3": "What is your Refill Policy if counts drop?",
        "faq-a3": "Although our network is stable, organic drops can occasionally happen. We support a 30-day Free Refill guarantee. If your count decreases within 30 days of purchase, simply go to your My Page dashboard and click the \"Refill\" button for a free top-up.",
        "faq-q4": "How fast is the delivery?",
        "faq-a4": "Delivery typically begins within 5 to 30 minutes after successful payment. In some cases, to ensure organic growth safety, delivery is paced naturally over 24 to 48 hours.",
        "dash-title": "Your <span>Dashboard</span>",
        "dash-desc": "Manage your purchase records and refill active tasks.",
        "btn-signout": "Sign Out",
        "dash-col-profile": "User Profile",
        "dash-col-wallet": "Wallet Balance",
        "dash-wallet-val": "$0",
        "dash-col-purchases": "Purchases",
        "dash-profile-sub": "Please sign in to save records permanently.",
        "dash-wallet-sub": "Points balance for fast checkouts",
        "dash-purchases-sub": "Active and completed history",
        "dash-history-title": "Purchase History & Status",
        "th-order-id": "Order ID",
        "th-date": "Date",
        "th-product": "Product / Service",
        "th-target": "Target Link",
        "th-amount": "Amount",
        "th-status": "Status",
        "th-action": "Action",
        "footer-desc": "Leading provider of AI-powered SMM organic growth and social channel optimizations. Boost your digital presence instantly.",
        "footer-services": "Services",
        "footer-support": "Support",
        "footer-help": "Help Center",
        "footer-faq": "FAQs",
        "footer-refill": "AS Refill Policy",
        "footer-copyright": "&copy; 2026 BibleForAI. All Rights Reserved.",
        "footer-terms": "Terms of Service &bull; Privacy Policy",
        "modal-title-details": "Product Details",
        "modal-select-options": "Select Options / Quantity",
        "modal-price-label": "Total Price (USD)",
        "modal-paypal-loading": "Loading PayPal Checkout...",
        "modal-cart-title": "Shopping Cart",
        "modal-cart-subtotal": "Subtotal",
        "modal-cart-checkout": "Checkout All",
        "modal-auth-title": "Welcome Back",
        "modal-auth-desc": "Sign in with Google to sync your purchase history and access support tickets.",
        "modal-auth-btn": "Sign In with Google Mock",
        "modal-auth-agree": "By signing in, you agree to our Terms and Service.",
        "success-toast-msg": "Order placed successfully! Redirecting...",
        "promo-tag-insta": "Instagram",
        "promo-tag-youtube": "YouTube",
        "promo-tag-combo": "TikTok & X",
        "promo-title-insta": "Boost Instagram Followers & Likes",
        "promo-title-youtube": "YouTube Subs, Views & Watch Time",
        "promo-title-combo": "TikTok & X Viral Booster",
        "promo-text-insta": "Stable domestic-only Korean users provision!",
        "promo-text-youtube": "Custom management for partner monetization prerequisites!",
        "promo-text-combo": "Explode short-form video views, retweets, and post likes!",
        "promo-btn-text": "Go to Service →",
        "sec-intro-title": "Why SMM Growth is <span>Essential</span>",
        "sec-intro-desc": "Don't struggle with algorithms alone. Here's how we help you reach your goals.",
        "seg-creator-title": "Creators & Youtubers",
        "seg-creator-text": "Fast-track your monetization path (1k subs & 4k watch hours) and start earning ad revenue early.",
        "seg-influencer-title": "Aspiring Influencers",
        "seg-influencer-text": "Boost post engagement, likes, and comments organically to catch the eyes of advertisers and sponsor brands.",
        "seg-owner-title": "Business Owners",
        "seg-owner-text": "Land on hashtag top searches and explore feeds to drive traffic and increase sales conversions for your products.",
        "seg-marketer-title": "Brand Marketers",
        "seg-marketer-text": "Establish social proof and brand authority instantly for product launches, events, and official business channels.",
        "stat-years": "11 Years",
        "stat-years-lbl": "SMM Expertise (Since 2015)",
        "stat-rate": "96% +",
        "stat-rate-lbl": "Customer Repurchase Rate",
        "stat-clients": "50,000+",
        "stat-clients-lbl": "Corporate & Individual Clients",
        "stat-rating": "4.9 / 5.0",
        "stat-rating-lbl": "Average Customer Rating",
        "trust-active-title": "100% Real Active Users",
        "trust-active-desc": "We never use dangerous bot scripts that suspend your channel. All interactions come from high-quality active user profiles.",
        "trust-privacy-title": "Absolute Privacy Shield",
        "trust-privacy-desc": "No password required. Your orders are processed completely anonymously, ensuring your personal security.",
        "trust-refill-title": "30-Day Refill Guarantee",
        "trust-refill-desc": "Any organic drops are covered. Simply click the Refill button in your dashboard, and we'll restore your counts for free.",
        "stats-badge": "11 Years of SMM Leadership, BibleForAI",
        "stats-title": "Trust Built Over 11 Years, Adding Confidence to Your Choice",
        "stats-desc": "Since our service launched, order volume has steadily increased, surpassing a 96% repurchase rate in 2026.",
        "chart-order-label": "Cumulative Orders",
        "chart-since-label": "Since 2015",
        "chart-badge-repurchase": "Repurchase Rate 96%"
    },
    ko: {
        "logo-subtitle": "소셜미디어 성장의 시작!",
        "nav-home": "홈",
        "nav-instagram": "인스타그램",
        "nav-youtube": "유튜브",
        "nav-tiktok": "틱톡 & X",
        "nav-facebook": "Threads & 페이스북",
        "nav-seo": "SEO & Spotify",
        "btn-signin": "로그인",
        "hero-title": "<span>AI 기반</span>으로<br>소셜미디어를 성장시키세요!",
        "hero-desc": "채널을 최적화하고, 실제 유기적 참여를 얻고, 즉각적인 소셜 입지를 확보하세요. 안전하고 자동화되었으며, 비밀번호가 필요 없는 100% 안심 서비스입니다.",
        "btn-getstarted": "지금 시작하기",
        "btn-seereviews": "리뷰 보기",
        "sec-featured-title": "베스트셀러 <span>패키지</span>",
        "sec-reviews-title": "소셜 크리에이터들이 <span>신뢰하는 서비스</span>",
        "sec-faq-title": "자주 묻는 <span>질문 (FAQ)</span>",
        "faq-q1": "SMM 서비스를 구매하면 계정이 정지되나요?",
        "faq-a1": "절대 아닙니다. BibleForAI는 인스타그램, 유튜브, 틱톡 등의 정책을 위반하지 않고 실제 활성 프로필 네트워크를 사용하여 유기적으로 주문을 처리합니다. 당사는 계정 정지 없이 수백만 건의 주문을 안전하게 처리해 왔습니다.",
        "faq-q2": "제 계정 비밀번호가 필요한가요?",
        "faq-a2": "아니요, 계정 비밀번호는 절대 요구하지 않습니다. 서비스를 처리하기 위해 대상 계정의 공개 프로필 링크나 사용자명(예: @아이디)만 입력해 주시면 되며, 개인정보는 안전하게 보호됩니다.",
        "faq-q3": "수량이 감소할 경우의 리필 규정은 어떻게 되나요?",
        "faq-a3": "제공하는 네트워크는 매우 안정적이지만, 플랫폼 로직상 미세한 수량 감소가 발생할 수 있습니다. 이를 대비하여 30일 무료 리필 보장 정책을 운영하고 있습니다. 구매 후 30일 이내에 수량이 감소하면 마이페이지 대시보드에서 '리필(Refill)' 버튼을 클릭해 무료 충전을 받으실 수 있습니다.",
        "faq-q4": "작업 시작 및 처리 속도는 얼마나 걸리나요?",
        "faq-a4": "결제가 성공적으로 완료되면 일반적으로 5분에서 30분 이내에 작업이 시작됩니다. 단, 플랫폼 알고리즘상 더욱 안전하고 유기적인 성장을 위하여 일부 주문은 24시간에서 48시간에 걸쳐 분할 지급되기도 합니다.",
        "dash-title": "마이 <span>대시보드</span>",
        "dash-desc": "구매 내역을 관리하고 진행 중인 작업에 대해 리필을 요청하세요.",
        "btn-signout": "로그아웃",
        "dash-col-profile": "유저 프로필",
        "dash-col-wallet": "지갑 잔액",
        "dash-wallet-val": "₩0",
        "dash-col-purchases": "총 구매 횟수",
        "dash-profile-sub": "로그인하시면 구매 내역을 영구히 저장 및 관리할 수 있습니다.",
        "dash-wallet-sub": "간편 결제를 위한 충전 포인트",
        "dash-purchases-sub": "활성 및 완료된 구매 히스토리",
        "dash-history-title": "구매 내역 및 진행 상태",
        "th-order-id": "주문 ID",
        "th-date": "날짜",
        "th-product": "서비스 / 옵션",
        "th-target": "대상 링크",
        "th-amount": "결제액",
        "th-status": "상태",
        "th-action": "작업",
        "footer-desc": "AI 기반의 유기적 SMM 성장 및 소셜 미디어 채널 최적화를 제공하는 선두 플랫폼입니다. 당신의 디지털 가치를 즉시 높여보세요.",
        "footer-services": "제공 서비스",
        "footer-support": "고객 지원",
        "footer-help": "헬프 센터",
        "footer-faq": "자주 묻는 질문",
        "footer-refill": "AS 리필 정책",
        "footer-copyright": "&copy; 2026 BibleForAI. All Rights Reserved.",
        "footer-terms": "이용약관 &bull; 개인정보처리방침",
        "modal-title-details": "상품 상세 정보",
        "modal-select-options": "옵션 / 수량 선택",
        "modal-price-label": "총 금액 (KRW)",
        "modal-paypal-loading": "PayPal 결제 로딩 중...",
        "modal-cart-title": "장바구니",
        "modal-cart-subtotal": "소계",
        "modal-cart-checkout": "전체 결제하기",
        "modal-auth-title": "환영합니다",
        "modal-auth-desc": "Google로 로그인하여 구매 내역을 동기화하고 고객지원을 이용하세요.",
        "modal-auth-btn": "Google로 로그인 (Mock)",
        "modal-auth-agree": "로그인하면 이용약관 및 개인정보 처리방침에 동의하게 됩니다.",
        "success-toast-msg": "주문이 성공적으로 완료되었습니다! 잠시 후 이동합니다...",
        "promo-tag-insta": "인스타그램",
        "promo-tag-youtube": "유튜브",
        "promo-tag-combo": "틱톡 & X",
        "promo-title-insta": "인스타그램 팔로워, 좋아요 늘리기",
        "promo-title-youtube": "유튜브 구독자·조회수·시청시간까지",
        "promo-title-combo": "틱톡 & X 바이럴 부스터",
        "promo-text-insta": "국내 유일 한국인 구매 안정적 제공!",
        "promo-text-youtube": "수익화 조건 맞춤 관리!",
        "promo-text-combo": "틱톡 숏폼 영상 조회수 및 X 트윗 리트윗·좋아요 급증!",
        "promo-btn-text": "서비스 바로 가기 →",
        "sec-intro-title": "소셜미디어가 <span>자연스럽게 성장</span>해야 하는 이유",
        "sec-intro-desc": "플랫폼 알고리즘과 혼자 외롭게 싸우지 마세요. 검증된 SMM 솔루션이 목표 달성을 돕습니다.",
        "seg-creator-title": "초보 크리에이터 & 유튜버",
        "seg-creator-text": "유튜브 수익 창출 승인 조건(구독자 1천 명, 시청 4천 시간)을 빠르게 통과하여 초기 수익화를 실현하세요.",
        "seg-influencer-title": "인플루언서 / 협찬 지망생",
        "seg-influencer-text": "피드의 조회수와 게시글 좋아요를 자연스럽게 높여 광고주와 협찬사들의 신뢰도 높은 관심을 유도합니다.",
        "seg-owner-title": "소상공인 & 쇼핑몰 사장님",
        "seg-owner-text": "해시태그 상위 노출과 인기 피드 유입을 유기적으로 강화하여 쇼핑몰 방문자 수와 실제 구매 문의를 늘려줍니다.",
        "seg-marketer-title": "기업 브랜드 마케터",
        "seg-marketer-text": "신제품 런칭 초기 반응 및 오피셜 채널의 신뢰성 높은 통계를 단기간에 구축하여 디지털 영향력을 선점하세요.",
        "stat-years": "11년 업력",
        "stat-years-lbl": "2015년부터 축적된 SMM 전문 노하우",
        "stat-rate": "96% +",
        "stat-rate-lbl": "평균 고객 재구매율 (2025년 기준)",
        "stat-clients": "50,000+",
        "stat-clients-lbl": "개인 크리에이터 및 기업 파트너사",
        "stat-rating": "4.9 / 5.0",
        "stat-rating-lbl": "고객 평균 서비스 평점 만족도",
        "trust-active-title": "100% 실제 활성 사용자 계정",
        "trust-active-desc": "계정 정지 위험이 있는 불법 매크로나 허위 봇은 배제합니다. 고품질 실사용자 프로필을 통해 유기적인 속도로 안전하게 도달합니다.",
        "trust-privacy-title": "완벽한 프라이버시 보호",
        "trust-privacy-desc": "계정 비밀번호를 요구하지 않습니다. 모든 서비스는 100% 철저한 익명성과 강력한 보안 환경에서 비밀리에 안전하게 수행됩니다.",
        "trust-refill-title": "30일 무상 A/S 리필 보장",
        "trust-refill-desc": "서비스 이용 후 플랫폼 자체 필터링 등으로 미세한 이탈 발생 시 마이페이지에서 단 한 번의 클릭으로 신속하게 무상 리필해 드립니다.",
        "stats-badge": "서비스 업력 11년차, BibleForAI",
        "stats-title": "11년 동안 쌓아온 믿음, 당신의 선택에 신뢰를 더합니다.",
        "stats-desc": "서비스 오픈 이후 꾸준히 주문량이 증가하며 2026년에는 재구매율 96% 돌파하였습니다.",
        "chart-order-label": "누적 주문량",
        "chart-since-label": "Since 2015",
        "chart-badge-repurchase": "재구매율 96%"
    }
};

// Fallback Mockup Data (in case JSON fetch fails)
const fallbackProducts = [
    {
        "id": "99",
        "name": "Real Korean Instagram Followers Booster",
        "category": "Instagram",
        "price": 13.85,
        "options": [
            { "id": "P00000DU000B", "label": "50 Users", "usd": 13.85 },
            { "id": "P00000DU000C", "label": "250 Users", "usd": 68.46 },
            { "id": "P00000DU000D", "label": "500 Users", "usd": 135.38 },
            { "id": "P00000DU000E", "label": "1000 Users", "usd": 269.23 }
        ]
    },
    {
        "id": "108",
        "name": "Real Korean Instagram Likes Booster",
        "category": "Instagram",
        "price": 2.77,
        "options": [
            { "id": "P00000DV000B", "label": "50 Likes", "usd": 2.77 },
            { "id": "P00000DV000C", "label": "100 Likes", "usd": 5.38 },
            { "id": "P00000DV000D", "label": "500 Likes", "usd": 26.15 }
        ]
    },
    {
        "id": "115",
        "name": "YouTube High Quality Views Growth",
        "category": "YouTube",
        "price": 10.00,
        "options": [
            { "id": "P00000DW000B", "label": "1,000 Views", "usd": 10.00 },
            { "id": "P00000DW000C", "label": "5,000 Views", "usd": 48.00 },
            { "id": "P00000DW000D", "label": "10,000 Views", "usd": 92.31 }
        ]
    },
    {
        "id": "116",
        "name": "YouTube Organic Subscribers Booster",
        "category": "YouTube",
        "price": 10.77,
        "options": [
            { "id": "P00000DX000B", "label": "100 Subscribers", "usd": 10.77 },
            { "id": "P00000DX000C", "label": "500 Subscribers", "usd": 52.31 },
            { "id": "P00000DX000D", "label": "1000 Subscribers", "usd": 99.99 }
        ]
    },
    {
        "id": "162",
        "name": "Global Instagram Followers - Fast Delivery",
        "category": "Instagram",
        "price": 1.54,
        "options": [
            { "id": "P00000DY000B", "label": "100 Users", "usd": 1.54 },
            { "id": "P00000DY000C", "label": "500 Users", "usd": 7.38 },
            { "id": "P00000DY000D", "label": "1000 Users", "usd": 13.85 }
        ]
    },
    {
        "id": "169",
        "name": "Real Korean Instagram Reels Views",
        "category": "Instagram",
        "price": 2.77,
        "options": [
            { "id": "P00000DZ000B", "label": "100 Views", "usd": 2.77 },
            { "id": "P00000DZ000C", "label": "500 Views", "usd": 12.31 },
            { "id": "P00000DZ000D", "label": "1000 Views", "usd": 23.08 }
        ]
    },
    {
        "id": "233",
        "name": "All-in-One Instagram Followers Growth Pack",
        "category": "Instagram",
        "price": 46.15,
        "options": [
            { "id": "P00000E0000B", "label": "Starter Package", "usd": 46.15 },
            { "id": "P00000E0000C", "label": "Growth Package", "usd": 89.23 },
            { "id": "P00000E0000D", "label": "Viral Agency Package", "usd": 178.46 }
        ]
    },
    {
        "id": "228",
        "name": "Daily YouTube Views & Watch Hours",
        "category": "YouTube",
        "price": 76.62,
        "options": [
            { "id": "P00000E1000B", "label": "Weekly Plan", "usd": 76.62 },
            { "id": "P00000E1000C", "label": "Monthly Plan", "usd": 289.23 }
        ]
    },
    {
        "id": "138",
        "name": "TikTok Fast Followers & Fans",
        "category": "TikTok_X",
        "price": 3.85,
        "options": [
            { "id": "P00000E2000B", "label": "100 Followers", "usd": 3.85 },
            { "id": "P00000E2000C", "label": "500 Followers", "usd": 18.46 },
            { "id": "P00000E2000D", "label": "1000 Followers", "usd": 34.62 }
        ]
    },
    {
        "id": "178",
        "name": "X (Twitter) Active Followers",
        "category": "TikTok_X",
        "price": 4.62,
        "options": [
            { "id": "P00000E3000B", "label": "100 Followers", "usd": 4.62 },
            { "id": "P00000E3000C", "label": "500 Followers", "usd": 21.54 },
            { "id": "P00000E3000D", "label": "1000 Followers", "usd": 39.99 }
        ]
    },
    {
        "id": "199",
        "name": "Active Facebook Page Likes & Followers",
        "category": "Threads_Facebook",
        "price": 6.15,
        "options": [
            { "id": "P00000E4000B", "label": "100 Fans", "usd": 6.15 },
            { "id": "P00000E4000C", "label": "500 Fans", "usd": 29.23 },
            { "id": "P00000E4000D", "label": "1000 Fans", "usd": 55.38 }
        ]
    },
    {
        "id": "234",
        "name": "Spotify Playlist Saves & Tracks Streams",
        "category": "SEO_Spotify",
        "price": 5.38,
        "options": [
            { "id": "P00000E5000B", "label": "1,000 Streams", "usd": 5.38 },
            { "id": "P00000E5000C", "label": "5,000 Streams", "usd": 24.62 },
            { "id": "P00000E5000D", "label": "10,000 Streams", "usd": 46.15 }
        ]
    }
];

const fallbackReviews = [
    { "product": "Real Korean Instagram Followers Booster", "title": "Thank you for the safe delivery! Organic flow is perfect.", "rating": 5, "author": "L***", "date": "26.06.22" },
    { "product": "YouTube High Quality Views Growth", "title": "Highly recommended, my channel has finally revived!", "rating": 5, "author": "K***", "date": "26.06.21" },
    { "product": "TikTok Fast Followers & Fans", "title": "Incredibly fast and very satisfying results. Buying again.", "rating": 5, "author": "P***", "date": "26.06.19" },
    { "product": "Global Instagram Followers - Fast Delivery", "title": "Very practical and reliable service, looks totally organic.", "rating": 5, "author": "S***", "date": "26.06.18" }
];

// Router Implementation
const router = {
    navigate: function(view, params = null) {
        state.currentView = view;
        
        // Close mobile menu
        ui.closeMobileMenu();
        
        // Hide all views
        document.querySelectorAll('.view-section').forEach(el => el.style.display = 'none');
        
        // Remove active GNB status
        document.querySelectorAll('.nav-links a').forEach(el => el.classList.remove('active'));
        
        // Handle view routing
        if (view === 'home') {
            document.getElementById('home-view').style.display = 'block';
            document.getElementById('nav-home').classList.add('active');
            window.scrollTo(0, 0);
        } else if (view === 'category') {
            document.getElementById('category-view').style.display = 'block';
            const catKey = params || 'Instagram';
            state.currentCategory = catKey;
            state.currentFilter = 'all';
            state.currentPage = 1;
            
            // Set active GNB state
            const slug = catKey.split('_')[0].toLowerCase();
            const navEl = document.getElementById(`nav-${slug}`);
            if (navEl) navEl.classList.add('active');
            
            ui.renderCategory(catKey);
            window.scrollTo(0, 0);
        } else if (view === 'dashboard') {
            if (!state.user) {
                ui.openAuthModal();
                router.navigate('home');
                return;
            }
            document.getElementById('dashboard-view').style.display = 'block';
            ui.renderDashboard();
            window.scrollTo(0, 0);
        }
    }
};

// Filter configurations per category
const filterCategories = {
    "Instagram": [
        { id: "all", name_en: "All", name_ko: "전체" },
        { id: "followers", name_en: "Followers", name_ko: "팔로워" },
        { id: "likes", name_en: "Likes", name_ko: "좋아요" },
        { id: "views_comments", name_en: "Views/Comments", name_ko: "조회수/도달노출/댓글" },
        { id: "recommended", name_en: "Explore Booster", name_ko: "추천게시물" },
        { id: "repost_story", name_en: "Repost & Story", name_ko: "리포스트/스토리 몰래보기" }
    ],
    "YouTube": [
        { id: "all", name_en: "All", name_ko: "전체" },
        { id: "subscribers", name_en: "Subscribers", name_ko: "구독자" },
        { id: "views", name_en: "Views", name_ko: "조회수" },
        { id: "likes", name_en: "Likes", name_ko: "좋아요" },
        { id: "comments_shares", name_en: "Comments & Shares", name_ko: "댓글/공유" },
        { id: "package", name_en: "Packages", name_ko: "패키지" }
    ],
    "TikTok_X": [
        { id: "all", name_en: "All", name_ko: "전체" },
        { id: "tiktok", name_en: "TikTok", name_ko: "틱톡" },
        { id: "x_twitter", name_en: "X (Twitter)", name_ko: "엑스/트위터" }
    ],
    "Threads_Facebook": [
        { id: "all", name_en: "All", name_ko: "전체" },
        { id: "threads", name_en: "Threads", name_ko: "스레드" },
        { id: "facebook", name_en: "Facebook", name_ko: "페이스북" }
    ],
    "SEO_Spotify": [
        { id: "all", name_en: "All", name_ko: "전체" },
        { id: "seo", name_en: "SEO & Traffic", name_ko: "SEO/트래픽" },
        { id: "spotify", name_en: "Spotify", name_ko: "스포티파이" }
    ]
};

function productMatchesFilter(prod, filterId) {
    if (!filterId || filterId === 'all') return true;
    
    const cat = prod.category;
    const pid = prod.id;
    const nameKo = prod.name_ko || '';
    const nameEn = prod.name_en || '';
    const nameLower = (nameKo + ' ' + nameEn).toLowerCase();
    
    if (cat === 'Instagram') {
        if (filterId === 'followers') {
            return ['99', '199', '100', '162', '90'].includes(pid) || nameLower.includes('follower') || nameLower.includes('팔로워');
        }
        if (filterId === 'likes') {
            return ['108', '201', '102', '132', '101', '176', '227', '224'].includes(pid) || nameLower.includes('like') || nameLower.includes('좋아요');
        }
        if (filterId === 'views_comments') {
            return ['169', '179', '183', '217', '163', '177', '178', '220', '224', '235', '236', '226', '225', '216'].includes(pid) || 
                   nameLower.includes('view') || nameLower.includes('조회수') || 
                   nameLower.includes('comment') || nameLower.includes('댓글') || 
                   nameLower.includes('reach') || nameLower.includes('도달') || 
                   nameLower.includes('save') || nameLower.includes('저장') || 
                   nameLower.includes('share') || nameLower.includes('공유');
        }
        if (filterId === 'recommended') {
            return ['226', '225', '100', '102', '183', '217', '90', '101', '176'].includes(pid) || nameLower.includes('상위노출') || nameLower.includes('explore') || nameLower.includes('recommended');
        }
        if (filterId === 'repost_story') {
            return ['216', '237'].includes(pid) || nameLower.includes('repost') || nameLower.includes('리포스트') || nameLower.includes('스토리') || nameLower.includes('story');
        }
    } else if (cat === 'YouTube') {
        if (filterId === 'subscribers') {
            return pid === '116' || nameLower.includes('subscriber') || nameLower.includes('구독자');
        }
        if (filterId === 'views') {
            return ['115', '228', '154', '164'].includes(pid) || nameLower.includes('view') || nameLower.includes('조회수') || nameLower.includes('watch') || nameLower.includes('시청시간');
        }
        if (filterId === 'likes') {
            return ['114', '222'].includes(pid) || nameLower.includes('like') || nameLower.includes('좋아요');
        }
        if (filterId === 'comments_shares') {
            return ['218', '202', '171'].includes(pid) || nameLower.includes('comment') || nameLower.includes('댓글') || nameLower.includes('share') || nameLower.includes('공유');
        }
        if (filterId === 'package') {
            return ['212', '229'].includes(pid) || nameLower.includes('package') || nameLower.includes('패키지');
        }
    } else if (cat === 'TikTok_X') {
        if (filterId === 'tiktok') {
            return ['136', '138', '137', '213'].includes(pid) || nameLower.includes('tiktok') || nameLower.includes('틱톡');
        }
        if (filterId === 'x_twitter') {
            return ['159', '158', '160'].includes(pid) || nameLower.includes('twitter') || nameLower.includes('트위터') || nameLower.includes('x') || nameLower.includes('리트윗');
        }
    } else if (cat === 'Threads_Facebook') {
        if (filterId === 'threads') {
            return ['191', '190'].includes(pid) || nameLower.includes('threads') || nameLower.includes('스레드');
        }
        if (filterId === 'facebook') {
            return ['120', '118', '117', '161', '165'].includes(pid) || nameLower.includes('facebook') || nameLower.includes('페이스북');
        }
    } else if (cat === 'SEO_Spotify') {
        if (filterId === 'seo') {
            return ['185', '184'].includes(pid) || nameLower.includes('seo') || nameLower.includes('검색') || nameLower.includes('트래픽') || nameLower.includes('traffic');
        }
        if (filterId === 'spotify') {
            return pid === '234' || nameLower.includes('spotify') || nameLower.includes('스포티파이');
        }
    }
    
    return false;
}

// UI rendering functions
const ui = {
    init: function() {
        applyTranslations();
        this.renderHomeFeatured();
        this.renderReviews();
        this.updateCartBadge();
        this.checkAuthStatus();
        this.setupHeaderScroll();
        this.setupFAQ();
        this.setupMobileMenuEvents();
    },

    toggleMobileMenu: function() {
        const nav = document.querySelector('.header-container nav');
        const toggleBtn = document.getElementById('menu-toggle');
        if (nav && toggleBtn) {
            nav.classList.toggle('active');
            toggleBtn.classList.toggle('active');
        }
    },

    closeMobileMenu: function() {
        const nav = document.querySelector('.header-container nav');
        const toggleBtn = document.getElementById('menu-toggle');
        if (nav && nav.classList.contains('active')) {
            nav.classList.remove('active');
        }
        if (toggleBtn && toggleBtn.classList.contains('active')) {
            toggleBtn.classList.remove('active');
        }
    },

    setupMobileMenuEvents: function() {
        document.addEventListener('click', (e) => {
            const nav = document.querySelector('.header-container nav');
            const toggleBtn = document.getElementById('menu-toggle');
            if (nav && nav.classList.contains('active') && toggleBtn) {
                if (!nav.contains(e.target) && !toggleBtn.contains(e.target)) {
                    this.closeMobileMenu();
                }
            }
        });
    },

    setupHeaderScroll: function() {
        const header = document.getElementById('app-header');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    },

    setupFAQ: function() {
        document.querySelectorAll('.faq-question').forEach(el => {
            el.addEventListener('click', () => {
                const item = el.parentElement;
                const isActive = item.classList.contains('active');
                
                // close all
                document.querySelectorAll('.faq-item').forEach(f => f.classList.remove('active'));
                
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
    },

    openFAQ: function() {
        router.navigate('home');
        setTimeout(() => {
            document.getElementById('reviews-anchor').scrollIntoView({ behavior: 'smooth' });
        }, 300);
    },

    renderHomeFeatured: function() {
        const container = document.getElementById('featured-products-container');
        container.innerHTML = '';
        
        // Take first 4 items as featured
        const featured = state.products.slice(0, 4);
        featured.forEach(prod => {
            container.appendChild(this.createProductCard(prod));
        });
    },

    renderCategory: function(catName) {
        // Set category title
        const titleEl = document.getElementById('category-title');
        const descEl = document.getElementById('category-desc');
        
        const isKorean = state.language === 'ko';
        
        const catTitles = isKorean ? {
            "Instagram": "인스타그램 성장 부스터 패키지",
            "YouTube": "유튜브 채널 크리에이터 성장",
            "TikTok_X": "틱톡 & X(트위터) 바이럴 부스터",
            "Threads_Facebook": "스레드 & 페이스북 활성화 패키지",
            "SEO_Spotify": "검색엔진 최적화(SEO) 및 스포티파이"
        } : {
            "Instagram": "Instagram Growth Booster Packs",
            "YouTube": "YouTube Channel Creator Growth",
            "TikTok_X": "TikTok & X (Twitter) Viral Growth",
            "Threads_Facebook": "Threads & Facebook Engagement Packs",
            "SEO_Spotify": "Search Engine Traffic & Spotify Streams"
        };
        
        const catDescs = isKorean ? {
            "Instagram": "안전하고 실제 유효한 한국인 및 글로벌 팔로워, 좋아요, 릴스 조회수로 인스타그램 채널의 도달 범위를 확장하세요.",
            "YouTube": "조회수, 구독자, 시청 시간을 안전하고 안정적으로 증가시켜 유튜브 채널 수익창출 조건을 완벽히 대비하세요.",
            "TikTok_X": "숏폼 영상 조회수와 팔로워, 포스트 좋아요, 리트윗을 빠르게 늘려 소셜 바이럴 효과를 극대화하세요.",
            "Threads_Facebook": "비즈니스 활성화를 위해 스레드 및 페이스북 페이지 좋아요, 팔로워, 게시글 도달을 안정적으로 증가시키세요.",
            "SEO_Spotify": "스포티파이 스트리밍/팔로우 증가 및 구글/네이버 실사용자 트래픽 검색 최적화(SEO) 마케팅을 지원합니다."
        } : {
            "Instagram": "Elevate your feed presence with safe, organic Korean & global followers, likes, and Reels views.",
            "YouTube": "Get subscribers, views, and watch hours automatically. Perfect for channel monetization prerequisites.",
            "TikTok_X": "Increase your short-form visibility. Gain followers, post likes, retweets, and views instantly.",
            "Threads_Facebook": "Grow your Threads and Facebook business presence. Establish active, authentic followers and likes.",
            "SEO_Spotify": "Secure playlist saves, artist followers, and USA/Global Spotify streams. Boost Naver & Google organic web traffic."
        };
        
        titleEl.innerHTML = catTitles[catName] || (isKorean ? "소셜 미디어 부스터 패키지" : "Social Media Booster Packs");
        descEl.innerHTML = catDescs[catName] || (isKorean ? "아래에서 성장 옵션을 선택하여 최적화하세요." : "Customize your growth parameters below.");
        
        // 1. Render Filter Tabs
        const filterContainer = document.getElementById('category-filter-container');
        filterContainer.innerHTML = '';
        
        const categoryProducts = state.products.filter(p => p.category === catName);
        const filters = filterCategories[catName] || [{ id: "all", name_en: "All", name_ko: "전체" }];
        
        filters.forEach(f => {
            // Count products matching this filter
            const count = categoryProducts.filter(p => productMatchesFilter(p, f.id)).length;
            
            // Create tab button
            const tab = document.createElement('div');
            tab.className = `filter-tab ${state.currentFilter === f.id ? 'active' : ''}`;
            const label = isKorean ? f.name_ko : f.name_en;
            tab.innerHTML = `${label} (${count})`;
            tab.onclick = () => {
                state.currentFilter = f.id;
                state.currentPage = 1;
                ui.renderCategory(catName);
            };
            filterContainer.appendChild(tab);
        });
        
        // 2. Filter products based on active filter
        const filtered = categoryProducts.filter(p => productMatchesFilter(p, state.currentFilter));
        
        const container = document.getElementById('category-products-container');
        container.innerHTML = '';
        
        if (filtered.length === 0) {
            container.innerHTML = isKorean ? 
                `<div style="grid-column: 1/-1; text-align:center; padding:3rem; color:var(--text-muted);">이 필터에 해당하는 상품이 없습니다. 다른 필터를 선택해 주세요!</div>` : 
                `<div style="grid-column: 1/-1; text-align:center; padding:3rem; color:var(--text-muted);">No products found matching this filter. Please select another filter!</div>`;
            document.getElementById('category-pagination-container').innerHTML = '';
            return;
        }
        
        // 3. Paginate products (12 items per page)
        const itemsPerPage = 12;
        const totalItems = filtered.length;
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        
        // Adjust current page if it goes out of bounds
        if (state.currentPage > totalPages) {
            state.currentPage = totalPages;
        }
        if (state.currentPage < 1) {
            state.currentPage = 1;
        }
        
        const startIndex = (state.currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const pageItems = filtered.slice(startIndex, endIndex);
        
        pageItems.forEach(prod => {
            container.appendChild(this.createProductCard(prod));
        });
        
        // 4. Render Pagination Buttons
        const paginationContainer = document.getElementById('category-pagination-container');
        paginationContainer.innerHTML = '';
        
        if (totalPages > 1) {
            // Previous button
            const prevBtn = document.createElement('button');
            prevBtn.className = `pagination-btn ${state.currentPage === 1 ? 'disabled' : ''}`;
            prevBtn.innerHTML = isKorean ? '이전' : 'Prev';
            if (state.currentPage > 1) {
                prevBtn.onclick = () => {
                    state.currentPage--;
                    ui.renderCategory(catName);
                    window.scrollTo({ top: filterContainer.offsetTop - 100, behavior: 'smooth' });
                };
            }
            paginationContainer.appendChild(prevBtn);
            
            // Page numbers
            for (let i = 1; i <= totalPages; i++) {
                const pageBtn = document.createElement('button');
                pageBtn.className = `pagination-btn ${state.currentPage === i ? 'active' : ''}`;
                pageBtn.innerHTML = i;
                pageBtn.onclick = () => {
                    state.currentPage = i;
                    ui.renderCategory(catName);
                    window.scrollTo({ top: filterContainer.offsetTop - 100, behavior: 'smooth' });
                };
                paginationContainer.appendChild(pageBtn);
            }
            
            // Next button
            const nextBtn = document.createElement('button');
            nextBtn.className = `pagination-btn ${state.currentPage === totalPages ? 'disabled' : ''}`;
            nextBtn.innerHTML = isKorean ? '다음' : 'Next';
            if (state.currentPage < totalPages) {
                nextBtn.onclick = () => {
                    state.currentPage++;
                    ui.renderCategory(catName);
                    window.scrollTo({ top: filterContainer.offsetTop - 100, behavior: 'smooth' });
                };
            }
            paginationContainer.appendChild(nextBtn);
        }
    },

    createProductCard: function(prod) {
        const card = document.createElement('div');
        card.className = 'product-card';
        
        const isKorean = state.language === 'ko';
        const name = isKorean ? (prod.name_ko || prod.name) : (prod.name_en || prod.name);
        const desc = isKorean ? (prod.description_ko || '') : (prod.description_en || '');
        const priceLabel = isKorean ? '시작 가격' : 'Starting from';
        const price = isKorean ? `₩${(prod.price_krw || 0).toLocaleString()}` : `$${Math.round(prod.price_usd || prod.price || 0)}`;
        const buyBtnText = isKorean ? '구매하기' : 'Buy Now';

        card.innerHTML = `
            <div class="product-info">
                <div class="product-cat">${prod.category.replace('_', ' & ')}</div>
                <h3 class="product-title">${name}</h3>
                <p class="product-desc" title="${desc}">${desc}</p>
                <div class="product-rating">
                    &#9733;&#9733;&#9733;&#9733;&#9733; <span>5.0 (${prod.options ? prod.options.length * 12 : 36})</span>
                </div>
            </div>
            <div class="product-footer">
                <div>
                    <span class="product-price-label">${priceLabel}</span>
                    <div class="product-price">${price}</div>
                </div>
                <button class="btn-primary" onclick="ui.openProductModal('${prod.id}')" style="padding: 0.5rem 1rem; font-size: 0.85rem;">${buyBtnText}</button>
            </div>
        `;
        return card;
    },

    renderReviews: function() {
        const container = document.getElementById('reviews-carousel-container');
        container.innerHTML = '';
        
        const isKorean = state.language === 'ko';
        
        state.reviews.forEach(rev => {
            const card = document.createElement('div');
            card.className = 'review-card';
            
            const title = isKorean ? (rev.raw_title || rev.title) : rev.title;
            let productDisplayName = rev.product;
            if (isKorean && state.products && state.products.length > 0) {
                // Try to find the matching product in the list to get its Korean name
                const cleanRevProd = rev.product.toLowerCase().replace(/growth|booster|pack/g, '').trim();
                const matchedProd = state.products.find(p => {
                    const cleanPNameEn = p.name_en.toLowerCase().replace(/growth|booster|pack/g, '').trim();
                    return cleanPNameEn.includes(cleanRevProd) || cleanRevProd.includes(cleanPNameEn);
                });
                if (matchedProd) {
                    productDisplayName = matchedProd.name_ko;
                }
            }

            card.innerHTML = `
                <div class="review-header">
                    <span class="review-author">${rev.author}</span>
                    <span class="review-date">${rev.date}</span>
                </div>
                <div class="review-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                <p class="review-text">"${title}"</p>
                <span class="review-product">${productDisplayName}</span>
            `;
            container.appendChild(card);
        });
    },

    openProductModal: function(productId) {
        const prod = state.products.find(p => p.id === productId);
        if (!prod) return;
        
        state.selectedProduct = prod;
        
        const isKorean = state.language === 'ko';
        const name = isKorean ? (prod.name_ko || prod.name) : (prod.name_en || prod.name);
        const desc = isKorean ? (prod.description_ko || '') : (prod.description_en || '');
        
        document.getElementById('modal-product-name').innerText = name;
        
        const descEl = document.getElementById('modal-product-desc');
        if (descEl) {
            descEl.innerText = desc;
        }
        
        // Customize target placeholder/label depending on category
        const inputLabel = document.getElementById('modal-input-label');
        const inputEl = document.getElementById('modal-target-input');
        
        inputEl.value = '';
        inputEl.classList.remove('is-invalid');
        
        if (isKorean) {
            if (prod.category === 'Instagram') {
                inputLabel.innerText = "인스타그램 아이디 [필수]";
                inputEl.placeholder = "예: @사용자명";
            } else if (prod.category === 'YouTube') {
                inputLabel.innerText = "유튜브 동영상 / 채널 URL [필수]";
                inputEl.placeholder = "예: https://www.youtube.com/watch?v=... 또는 채널 링크";
            } else if (prod.category === 'TikTok_X') {
                inputLabel.innerText = "틱톡 아이디 또는 트위터(X) 게시물 링크 [필수]";
                inputEl.placeholder = "예: @틱톡아이디 또는 트위터 링크";
            } else {
                inputLabel.innerText = "대상 계정 / 링크 URL [필수]";
                inputEl.placeholder = "https://...";
            }
        } else {
            if (prod.category === 'Instagram') {
                inputLabel.innerText = "Instagram Username [Required]";
                inputEl.placeholder = "e.g. @username";
            } else if (prod.category === 'YouTube') {
                inputLabel.innerText = "YouTube Video / Channel URL [Required]";
                inputEl.placeholder = "https://www.youtube.com/watch?v=... or channel link";
            } else if (prod.category === 'TikTok_X') {
                inputLabel.innerText = "TikTok Username or X Post Link [Required]";
                inputEl.placeholder = "e.g. @tiktok_handle or post URL";
            } else {
                inputLabel.innerText = "Target Account / Link URL [Required]";
                inputEl.placeholder = "https://...";
            }
        }

        // Render options select list
        const select = document.getElementById('modal-options-select');
        select.innerHTML = '';
        
        prod.options.forEach(opt => {
            const option = document.createElement('option');
            option.value = opt.id;
            const label = isKorean ? (opt.label_ko || opt.label) : (opt.label_en || opt.label);
            const price = isKorean ? `₩${(opt.krw || 0).toLocaleString()}` : `$${Math.round(opt.usd || 0)}`;
            option.innerText = `${label} - ${price}`;
            select.appendChild(option);
        });

        // Set default price
        this.updateProductModalPrice();

        // Show Modal
        document.getElementById('product-modal').classList.add('active');

        // Load PayPal buttons dynamically
        this.initPayPalButtons();
    },

    closeProductModal: function() {
        document.getElementById('product-modal').classList.remove('active');
        // Clear PayPal button area to prevent duplicates
        document.getElementById('paypal-button-container').innerHTML = '';
    },

    updateProductModalPrice: function() {
        const select = document.getElementById('modal-options-select');
        const selectedId = select.value;
        const opt = state.selectedProduct.options.find(o => o.id === selectedId);
        
        if (opt) {
            state.selectedOption = opt;
            const isKorean = state.language === 'ko';
            const price = isKorean ? `₩${(opt.krw || 0).toLocaleString()}` : `$${Math.round(opt.usd || 0)}`;
            document.getElementById('modal-price-display').innerText = price;
        }
    },

    initPayPalButtons: function() {
        const container = document.getElementById('paypal-button-container');
        container.innerHTML = '';
        
        const loader = document.getElementById('modal-paypal-loading');
        loader.style.display = 'block';

        const loadButtons = () => {
            loader.style.display = 'none';
            paypal.Buttons({
                style: {
                    layout: 'vertical',
                    color:  'gold',
                    shape:  'rect',
                    label:  'paypal'
                },
                createOrder: function(data, actions) {
                    // Link verification before payment popup
                    const linkInput = document.getElementById('modal-target-input');
                    const linkVal = linkInput.value.trim();
                    if (!linkVal) {
                        linkInput.classList.add('is-invalid');
                        document.getElementById('modal-input-error').innerText = "Please enter your username or post link to proceed.";
                        throw new Error("Missing link parameter.");
                    }
                    linkInput.classList.remove('is-invalid');

                    return actions.order.create({
                        purchase_units: [{
                            amount: {
                                currency_code: 'USD',
                                value: Math.round(state.selectedOption.usd || 0).toString()
                            },
                            description: `${state.selectedProduct.name} - ${state.selectedOption.label}`
                        }]
                    });
                },
                onApprove: function(data, actions) {
                    return actions.order.capture().then(function(details) {
                        const linkInput = document.getElementById('modal-target-input').value.trim();
                        // Order success callback
                        const isKorean = state.language === 'ko';
                        const name = isKorean ? (state.selectedProduct.name_ko || state.selectedProduct.name) : (state.selectedProduct.name_en || state.selectedProduct.name);
                        const label = isKorean ? (state.selectedOption.label_ko || state.selectedOption.label) : (state.selectedOption.label_en || state.selectedOption.label);
                        const amount = isKorean ? `₩${(state.selectedOption.krw || 0).toLocaleString()}` : `$${Math.round(state.selectedOption.usd || 0)}`;

                        const orderData = {
                            id: details.id,
                            product: `${name} - ${label}`,
                            amount: amount,
                            link: linkInput,
                            status: "Completed",
                            date: new Date().toLocaleDateString()
                        };
                        
                        orders.add(orderData);
                        ui.closeProductModal();
                        
                        // Show success alert
                        const toast = document.getElementById('success-toast');
                        toast.classList.add('active');
                        
                        setTimeout(() => {
                            toast.classList.remove('active');
                            window.location.href = "https://forms.gle/zd98tg6UvK6A5FUs8";
                        }, 2200);
                    });
                },
                onError: function(err) {
                    console.error("PayPal integration error: ", err);
                }
            }).render('#paypal-button-container');
        };

        if (state.paypalSdkLoaded) {
            loadButtons();
        } else {
            // Load PayPal SDK script
            const script = document.createElement('script');
            script.src = "https://www.paypal.com/sdk/js?client-id=Ae_xg2SjogcseJVcjXldc_TEnVWBzmPw8aNimrSncYBb0Wrn_m93w_PkMgdxWTQ2fJExV8QKWHR2-7hK&currency=USD";
            script.onload = () => {
                state.paypalSdkLoaded = true;
                loadButtons();
            };
            document.head.appendChild(script);
        }
    },

    openCartModal: function() {
        document.getElementById('cart-modal').classList.add('active');
        this.renderCartItems();
    },

    closeCartModal: function() {
        document.getElementById('cart-modal').classList.remove('active');
    },

    renderCartItems: function() {
        const container = document.getElementById('cart-items-container');
        container.innerHTML = '';
        
        const isKorean = state.language === 'ko';

        if (state.cart.length === 0) {
            container.innerHTML = isKorean ? `<p style="text-align:center; color:var(--text-muted); padding:2rem;">장바구니가 비어 있습니다.</p>` : `<p style="text-align:center; color:var(--text-muted); padding:2rem;">Your cart is empty.</p>`;
            document.getElementById('cart-subtotal').innerText = isKorean ? "₩0" : "$0.00";
            return;
        }

        let total = 0;
        state.cart.forEach((item, index) => {
            const priceVal = isKorean ? (item.krw || item.price * 1300) : Math.round(item.usd || item.price);
            total += priceVal;
            const priceStr = isKorean ? `₩${priceVal.toLocaleString()}` : `$${priceVal}`;
            
            const row = document.createElement('div');
            row.className = 'price-display-box';
            row.style.background = 'rgba(255,255,255,0.03)';
            row.style.border = '1px solid var(--border)';
            row.style.padding = '1rem';
            row.innerHTML = `
                <div style="text-align:left;">
                    <div style="font-weight:600; font-size:0.95rem;">${item.name}</div>
                    <div style="font-size:0.8rem; color:var(--text-muted); margin-top:2px;">Target: ${item.link}</div>
                </div>
                <div style="display:flex; align-items:center; gap:1rem;">
                    <span style="font-family:var(--font-heading); font-weight:700;">${priceStr}</span>
                    <button onclick="cart.remove(${index})" style="background:none; border:none; color:#ef4444; font-size:1.25rem; cursor:pointer;">&times;</button>
                </div>
            `;
            container.appendChild(row);
        });

        document.getElementById('cart-subtotal').innerText = isKorean ? `₩${total.toLocaleString()}` : `$${total}`;
    },

    updateCartBadge: function() {
        const badge = document.getElementById('cart-badge');
        if (state.cart.length > 0) {
            badge.innerText = state.cart.length;
            badge.style.display = 'flex';
        } else {
            badge.style.display = 'none';
        }
    },

    checkoutCart: function() {
        if (state.cart.length === 0) return;
        
        // In static client SPA checkout, we prompt PayPal button inside modal or order singly.
        // For simplicity in SMM panels, we check out cart by placing orders.
        // Let's redirect to PayPal purchase or pay through wallet points.
        alert("To complete your checkout, please purchase via individual product page buttons. Wallet point purchases will be enabled soon!");
        this.closeCartModal();
    },

    openAuthModal: function() {
        document.getElementById('auth-modal').classList.add('active');
    },

    closeAuthModal: function() {
        document.getElementById('auth-modal').classList.remove('active');
    },

    checkAuthStatus: function() {
        const user = localStorage.getItem('boostsm_user');
        const container = document.getElementById('auth-status-container');
        
        if (user) {
            state.user = JSON.parse(user);
            // Render user profile UI in header
            container.innerHTML = `
                <div class="user-profile" onclick="router.navigate('dashboard')">
                    <span class="user-avatar">${state.user.name[0]}</span>
                    <span style="font-size:0.85rem; font-weight:600;">${state.user.name}</span>
                </div>
            `;
            
            // Sync orders from storage
            orders.load();
        } else {
            state.user = null;
            container.innerHTML = '';
        }
    },

    renderDashboard: function() {
        if (!state.user) return;
        
        document.getElementById('profile-name').innerText = state.user.name;
        document.getElementById('profile-email').innerText = state.user.email;
        document.getElementById('user-email-display').innerText = `Manage SMM tasks associated with ${state.user.email}`;
        document.getElementById('profile-orders-count').innerText = `${state.orders.length} Orders`;
        
        const listBody = document.getElementById('orders-list-body');
        listBody.innerHTML = '';
        
        if (state.orders.length === 0) {
            listBody.innerHTML = `<tr><td colspan="7" style="text-align:center; color:var(--text-muted); padding:3rem;">No purchases found. Visit category pages to make your first order!</td></tr>`;
            return;
        }

        state.orders.forEach(order => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><code style="background:rgba(255,255,255,0.05); padding:2px 6px; border-radius:4px;">${order.id.slice(0, 10)}...</code></td>
                <td>${order.date}</td>
                <td style="font-weight:600;">${order.product}</td>
                <td><span style="color:var(--accent); font-family:monospace;">${order.link}</span></td>
                <td>${order.amount}</td>
                <td><span class="status-badge completed">Completed</span></td>
                <td>
                    <button class="btn-primary" onclick="orders.refill('${order.id}')" style="padding: 0.35rem 0.8rem; font-size: 0.75rem; border-radius: 6px; background:var(--accent); box-shadow:none;">Refill</button>
                </td>
            `;
            listBody.appendChild(tr);
        });
    }
};

// Cart Operation Handler
const cart = {
    add: function(name, link, price, usd, krw) {
        state.cart.push({ name, link, price, usd, krw });
        ui.updateCartBadge();
        ui.renderCartItems();
    },
    remove: function(index) {
        state.cart.splice(index, 1);
        ui.updateCartBadge();
        ui.renderCartItems();
    }
};

// Authentication Handler
const auth = {
    mockSignIn: function(name, email) {
        const userObj = { name, email };
        localStorage.setItem('boostsm_user', JSON.stringify(userObj));
        ui.closeAuthModal();
        ui.checkAuthStatus();
        
        // Navigate to dashboard automatically
        setTimeout(() => {
            router.navigate('dashboard');
        }, 100);
    },

    signOut: function() {
        localStorage.removeItem('boostsm_user');
        ui.checkAuthStatus();
        router.navigate('home');
    }
};

// Orders Manager
const orders = {
    load: function() {
        const records = localStorage.getItem('boostsm_orders');
        if (records) {
            state.orders = JSON.parse(records);
        } else {
            state.orders = [];
        }
    },

    add: function(order) {
        state.orders.unshift(order); // push to top
        localStorage.setItem('boostsm_orders', JSON.stringify(state.orders));
        
        // Sync to mock user dashboard if logged in
        if (state.user) {
            ui.renderDashboard();
        }
    },

    refill: function(orderId) {
        alert(`AS Refill task has been successfully triggered for Order ${orderId.slice(0, 10)}. Our AI agent will process the drop replenishment shortly!`);
    }
};

// Translation Engine
function applyTranslations() {
    const lang = state.language || 'en';
    const isKo = lang === 'ko';
    
    // Set document lang attribute
    document.documentElement.lang = lang;
    
    // Update head elements
    document.title = isKo ? "BibleForAI - 소셜미디어 성장의 시작!" : "BibleForAI - Boost Your Social Media!";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.content = isKo ? 
            "AI 기반 SMM 부스터 서비스로 인스타그램, 유튜브, 틱톡, X 등 소셜미디어를 유기적으로 성장시키세요." : 
            "Boost your social media organically with AI-powered SMM booster services for Instagram, YouTube, TikTok, X, and more.";
    }

    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const translation = translations[lang] && translations[lang][key];
        if (translation) {
            // Check if element is an input placeholder
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
    state.language = lang;
    localStorage.setItem('boostsm_lang', lang);
    
    applyTranslations();
    
    // Re-render views with new language
    if (state.currentView === 'home') {
        ui.renderHomeFeatured();
    } else if (state.currentView === 'category') {
        ui.renderCategory(state.currentCategory);
    } else if (state.currentView === 'dashboard') {
        ui.renderDashboard();
    }
    ui.renderReviews();
    ui.renderCartItems();
    ui.updateCartBadge();
}

// Load initial databases
async function initDatabase() {
    try {
        const prodRes = await fetch('products.json');
        if (prodRes.ok) {
            state.products = await prodRes.json();
        } else {
            state.products = fallbackProducts;
        }
    } catch (e) {
        console.warn("Could not fetch products.json, using fallback data: ", e);
        state.products = fallbackProducts;
    }

    try {
        const revRes = await fetch('reviews.json');
        if (revRes.ok) {
            state.reviews = await revRes.json();
        } else {
            state.reviews = fallbackReviews;
        }
    } catch (e) {
        console.warn("Could not fetch reviews.json, using fallback data: ", e);
        state.reviews = fallbackReviews;
    }

    // Initialize UI elements
    ui.init();
}

// Start
window.addEventListener('DOMContentLoaded', () => {
    initDatabase();
});
