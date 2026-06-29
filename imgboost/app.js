// App State
let currentView = 'home';
let currentPackage = null;
let orderQuantity = 1;
let paypalButtonInstance = null;

// Package Catalog with Localized Keys
const packageCatalog = {
    product: {
        title_en: 'Product Photography',
        title_ko: '제품 사진 촬영',
        packages: [
            { id: 'product-trial', name_en: 'Trial (5 Images)', name_ko: '체험용 (5장)', desc_en: 'Test our AI product photography quality with 5 studio-grade images.', desc_ko: '스튜디오급 AI 제품 사진 5장으로 품질을 테스트해보세요.', price: 14, featured: false, features_en: ['5 Studio-Quality Images', 'White/Custom Background', '2000px+ Resolution', '1 Revision Round', '24h Delivery'], features_ko: ['스튜디오급 이미지 5장', '화이트/맞춤 배경', '2000px+ 고해상도', '1회 수정 가능', '24시간 내 전달'] },
            { id: 'product-standard', name_en: 'Standard (20 Images)', name_ko: '스탠다드 (20장)', desc_en: 'Complete product catalog with consistent style, lighting, and multiple angles.', desc_ko: '일관된 스타일, 조명, 다양한 앵글의 완성도 높은 제품 카탈로그.', price: 22, featured: true, features_en: ['20 Studio-Quality Images', 'Multiple Angles', 'Consistent Lighting', 'Unlimited Revisions', '48h Delivery'], features_ko: ['스튜디오급 이미지 20장', '다양한 앵글', '일관된 조명', '무제한 수정', '48시간 내 전달'] },
            { id: 'product-pro', name_en: 'Professional (50 Images)', name_ko: '프로페셔널 (50장)', desc_en: 'Full e-commerce product line with lifestyle contexts and creative compositions.', desc_ko: '라이프스타일 연출과 크리에이티브 구도를 포함한 풀 이커머스 제품 라인.', price: 50, featured: false, features_en: ['50 Professional Images', 'Lifestyle & Studio Mix', 'Background Variations', 'Priority Turnaround', 'Commercial License'], features_ko: ['프로페셔널 이미지 50장', '라이프스타일+스튜디오 혼합', '배경 다양화', '우선 빠른 처리', '상업적 이용 라이선스'] },
            { id: 'product-enterprise', name_en: 'Enterprise (100+ Images)', name_ko: '엔터프라이즈 (100장+)', desc_en: 'Complete brand visual system with product, model, lifestyle, and social content bundle.', desc_ko: '제품, 모델, 라이프스타일, SNS 콘텐츠를 포함한 완전한 브랜드 비주얼 시스템.', price: 90, featured: false, features_en: ['100+ Brand Images', 'Multi-Category Bundle', '4K Upscale Included', 'Dedicated Creative Lead', 'Brand Style Guide'], features_ko: ['100장+ 브랜드 이미지', '다중 카테고리 번들', '4K 업스케일 포함', '전담 크리에이티브 리드', '브랜드 스타일 가이드'] }
        ]
    },
    model: {
        title_en: 'AI Model Photos',
        title_ko: 'AI 모델 사진',
        packages: [
            { id: 'model-trial', name_en: 'Trial (5 Images)', name_ko: '체험용 (5장)', desc_en: 'Try AI fashion models showcasing your products with natural poses.', desc_ko: '자연스러운 포즈로 제품을 소화하는 AI 패션 모델을 체험해보세요.', price: 14, featured: false, features_en: ['5 AI Model Images', '1 Model Style', 'Product Integration', '1 Revision Round', '24h Delivery'], features_ko: ['AI 모델 이미지 5장', '1가지 모델 스타일', '제품 통합 연출', '1회 수정 가능', '24시간 내 전달'] },
            { id: 'model-standard', name_en: 'Standard (20 Images)', name_ko: '스탠다드 (20장)', desc_en: 'Professional AI model photos with diverse poses, expressions, and product styling.', desc_ko: '다양한 포즈, 표정, 제품 스타일링이 포함된 전문 AI 모델 사진.', price: 22, featured: true, features_en: ['20 AI Model Images', 'Multiple Model Options', 'Various Poses & Angles', 'Unlimited Revisions', '48h Delivery'], features_ko: ['AI 모델 이미지 20장', '다양한 모델 옵션', '다양한 포즈와 앵글', '무제한 수정', '48시간 내 전달'] },
            { id: 'model-pro', name_en: 'Professional (50 Images)', name_ko: '프로페셔널 (50장)', desc_en: 'Full lookbook with multiple AI models, settings, and mood variations.', desc_ko: '여러 AI 모델, 세팅, 무드 배리에이션을 포함한 풀 룩북.', price: 50, featured: false, features_en: ['50 AI Model Images', '5+ Model Styles', 'Scene & Mood Variations', 'Priority Turnaround', 'Lookbook Format'], features_ko: ['AI 모델 이미지 50장', '5가지 이상 모델 스타일', '장면 및 무드 다양화', '우선 빠른 처리', '룩북 형식 제공'] },
            { id: 'model-enterprise', name_en: 'Enterprise (100+ Images)', name_ko: '엔터프라이즈 (100장+)', desc_en: 'Complete fashion campaign with diverse models, scenes, and brand-consistent visual identity.', desc_ko: '다양한 모델, 장면, 브랜드 일관성을 갖춘 완전한 패션 캠페인.', price: 90, featured: false, features_en: ['100+ Campaign Images', 'Unlimited Model Diversity', 'Brand Consistency Guide', '4K Upscale Included', 'Dedicated Art Director'], features_ko: ['100장+ 캠페인 이미지', '무제한 모델 다양성', '브랜드 일관성 가이드', '4K 업스케일 포함', '전담 아트 디렉터'] }
        ]
    },
    lifestyle: {
        title_en: 'Lifestyle Scenes',
        title_ko: '라이프스타일 연출',
        packages: [
            { id: 'lifestyle-trial', name_en: 'Trial (5 Images)', name_ko: '체험용 (5장)', desc_en: 'Beautiful lifestyle settings with your products in curated real-world environments.', desc_ko: '엄선된 실제 환경에서 제품이 돋보이는 아름다운 라이프스타일 연출.', price: 14, featured: false, features_en: ['5 Lifestyle Images', '1 Scene Setting', 'Product Integration', '1 Revision Round', '24h Delivery'], features_ko: ['라이프스타일 이미지 5장', '1가지 장면 설정', '제품 통합 연출', '1회 수정 가능', '24시간 내 전달'] },
            { id: 'lifestyle-standard', name_en: 'Standard (20 Images)', name_ko: '스탠다드 (20장)', desc_en: 'Multiple lifestyle settings — home, office, outdoor — telling your product story.', desc_ko: '홈, 오피스, 아웃도어 등 다양한 라이프스타일 설정으로 제품 스토리를 전달합니다.', price: 22, featured: true, features_en: ['20 Lifestyle Images', '3+ Scene Settings', 'Home/Office/Outdoor Mix', 'Unlimited Revisions', '48h Delivery'], features_ko: ['라이프스타일 이미지 20장', '3가지 이상 장면', '홈/오피스/아웃도어 믹스', '무제한 수정', '48시간 내 전달'] },
            { id: 'lifestyle-pro', name_en: 'Professional (50 Images)', name_ko: '프로페셔널 (50장)', desc_en: 'Full brand storytelling with aspirational settings, seasonal themes, and creative direction.', desc_ko: '열망을 자극하는 설정, 시즌 테마, 크리에이티브 디렉션을 포함한 풀 브랜드 스토리텔링.', price: 50, featured: false, features_en: ['50 Lifestyle Images', 'Seasonal Theme Options', 'Creative Direction', 'Priority Turnaround', 'Instagram-Ready Format'], features_ko: ['라이프스타일 이미지 50장', '시즌 테마 옵션', '크리에이티브 디렉션', '우선 빠른 처리', '인스타그램 최적화 포맷'] },
            { id: 'lifestyle-enterprise', name_en: 'Enterprise (100+ Images)', name_ko: '엔터프라이즈 (100장+)', desc_en: 'Complete visual campaign with full creative production, seasonal collections, and multi-platform assets.', desc_ko: '풀 크리에이티브 프로덕션, 시즌 컬렉션, 멀티 플랫폼 에셋을 포함한 완전한 비주얼 캠페인.', price: 90, featured: false, features_en: ['100+ Campaign Images', 'Full Creative Production', 'Seasonal Collections', 'Multi-Platform Assets', 'Dedicated Creative Director'], features_ko: ['100장+ 캠페인 이미지', '풀 크리에이티브 프로덕션', '시즌 컬렉션', '멀티 플랫폼 에셋', '전담 크리에이티브 디렉터'] }
        ]
    },
    social: {
        title_en: 'Social Media Content',
        title_ko: 'SNS 콘텐츠',
        packages: [
            { id: 'social-trial', name_en: 'Trial (5 Images)', name_ko: '체험용 (5장)', desc_en: 'Platform-optimized social graphics for Instagram, Facebook, and Pinterest.', desc_ko: '인스타그램, 페이스북, 핀터레스트에 최적화된 SNS 그래픽.', price: 14, featured: false, features_en: ['5 Social Graphics', '1 Platform Format', 'Brand Colors Applied', '1 Revision Round', '24h Delivery'], features_ko: ['SNS 그래픽 5장', '1가지 플랫폼 포맷', '브랜드 컬러 적용', '1회 수정 가능', '24시간 내 전달'] },
            { id: 'social-standard', name_en: 'Standard (20 Images)', name_ko: '스탠다드 (20장)', desc_en: 'Multi-format social content pack with carousel posts, stories, and feed graphics.', desc_ko: '캐러셀, 스토리, 피드 그래픽을 포함한 멀티 포맷 SNS 콘텐츠 팩.', price: 22, featured: true, features_en: ['20 Social Graphics', 'Carousel + Story + Feed', '3 Platform Formats', 'Unlimited Revisions', '48h Delivery'], features_ko: ['SNS 그래픽 20장', '캐러셀+스토리+피드', '3가지 플랫폼 포맷', '무제한 수정', '48시간 내 전달'] },
            { id: 'social-pro', name_en: 'Professional (50 Images)', name_ko: '프로페셔널 (50장)', desc_en: 'Complete monthly social content calendar with campaign themes and engagement-focused designs.', desc_ko: '캠페인 테마와 참여 유도형 디자인의 완성된 월간 SNS 콘텐츠 캘린더.', price: 50, featured: false, features_en: ['50 Social Graphics', 'Monthly Content Calendar', 'Campaign Theme Bundle', 'Engagement-Optimized', 'Priority Turnaround'], features_ko: ['SNS 그래픽 50장', '월간 콘텐츠 캘린더', '캠페인 테마 번들', '참여 최적화 디자인', '우선 빠른 처리'] },
            { id: 'social-enterprise', name_en: 'Enterprise (100+ Images)', name_ko: '엔터프라이즈 (100장+)', desc_en: 'Full social media management kit with 3-month content calendar, ad creatives, and performance assets.', desc_ko: '3개월 콘텐츠 캘린더, 광고 크리에이티브, 퍼포먼스 에셋을 포함한 풀 SNS 관리 키트.', price: 90, featured: false, features_en: ['100+ Social Assets', '3-Month Calendar', 'Ad Creative Variants', 'A/B Test Versions', 'Dedicated Social Strategist'], features_ko: ['100장+ SNS 에셋', '3개월 콘텐츠 캘린더', '광고 크리에이티브 변형', 'A/B 테스트 버전', '전담 SNS 전략가'] }
        ]
    }
};

// Translation Dictionary
const translations = {
    en: {
        "logo-subtitle": "IMGBOOST!",
        "nav-home": "Home",
        "nav-product": "Product Photos",
        "nav-model": "AI Model Photos",
        "nav-lifestyle": "Lifestyle Images",
        "nav-social": "Social Content",
        "btn-orders": "My Orders",
        "hero-badge": "AI-Powered Visual Content",
        "hero-title": "IMGBOOST — AI Product Photography",
        "hero-desc": "Studio-quality product images without the expensive photoshoot.",
        "btn-explore": "Explore Services",
        "btn-quality": "View Quality Standards",
        
        "stat-resolution": "High Resolution",
        "stat-turnaround": "Fast Turnaround",
        "stat-commercial": "Commercial Rights",
        "stat-savings": "Cost Savings",
        
        "sec-channels-title": "AI Visual Content Services",
        "sec-channels-subtitle": "From product photography to AI model images, generate professional visuals for e-commerce, social media, and advertising.",
        "card-product-title": "Product Photography",
        "card-product-desc": "Studio-quality product images with perfect lighting, backgrounds, and composition for e-commerce listings.",
        "card-model-title": "AI Model Photos",
        "card-model-desc": "Realistic AI fashion models wearing your products. Perfect for apparel, beauty, and accessories brands.",
        "card-lifestyle-title": "Lifestyle Scenes",
        "card-lifestyle-desc": "Contextual lifestyle imagery placing your products in beautiful real-world settings and environments.",
        "card-social-title": "Social Media Content",
        "card-social-desc": "Eye-catching social media visuals, banner ads, and promotional graphics optimized for each platform.",
        "card-view-pricing": "View Pricing",
        
        "comp-title": "Professional Quality Standards",
        "comp-desc": "Every image generated through IMGBOOST meets professional commercial standards. We use advanced AI models fine-tuned for product photography, ensuring consistent quality across all deliverables.",
        "comp-bullet1-bold": "High Resolution:",
        "comp-bullet1-text": "All images delivered at 2000px+ with optional 4000px upscaling for print use.",
        "comp-bullet2-bold": "Commercial License:",
        "comp-bullet2-text": "Full commercial usage rights included — use on any platform, indefinitely.",
        "comp-bullet3-bold": "Unlimited Revisions:",
        "comp-bullet3-text": "We refine until you're satisfied — every image comes with revision rounds included.",
        
        "view-product-sub": "Get studio-quality product images with perfect lighting, clean backgrounds, and professional composition for your e-commerce store.",
        "view-model-sub": "Realistic AI-generated fashion models showcasing your apparel, beauty products, and accessories. Diverse model options available.",
        "view-lifestyle-sub": "Beautiful contextual imagery that places your products in aspirational real-world settings — home, office, outdoor, and luxury environments.",
        "view-social-sub": "Create scroll-stopping visuals for Instagram, Facebook, TikTok, and Pinterest. Banner ads, carousel posts, and story graphics.",
        "view-orders-title": "My Purchase History",
        "view-orders-sub": "Review your successful orders. Your data is stored locally in your browser workspace.",
        
        "th-date": "Order Date",
        "th-order-id": "Transaction ID",
        "th-product": "Product",
        "th-tier": "Package Tier",
        "th-style": "Image Style",
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
        "modal-style-label": "Image Style:",
        "modal-qty": "Quantity:",
        "modal-total-amt": "Total Amount:",
        "modal-test-btn": "Click price to test checkout",
        
        "badge-ssl": "SSL Secured Checkout",
        "badge-paypal": "PayPal Verified",
        
        "foot-services": "Image Services",
        "foot-legal": "Quality & Support",
        "foot-resolution": "2000px+ High Resolution",
        "foot-commercial": "Full Commercial License",
        "foot-revisions": "Unlimited Revisions",
        "foot-contact": "Contact support: snsherocom@gmail.com",
        "foot-copy": "&copy; 2026 BibleForAI IMGBOOST. All rights reserved. AI Product Photography & Visual Content.",
        
        "order-button": "Order Package",
        "featured-badge": "Best Seller",
        
        // Receipts
        "receipt-header": "BIBLEFORAI - IMGBOOST RECEIPT",
        "receipt-date": "Order Date",
        "receipt-txid": "Transaction ID",
        "receipt-email": "Customer Email",
        "receipt-type": "Product Type",
        "receipt-size": "Package Size",
        "receipt-style": "Image Style",
        "receipt-qty": "Quantity",
        "receipt-baseprice": "Base Price",
        "receipt-total": "Total Paid",
        "receipt-status": "Status",
        "receipt-method": "Payment Method",
        "receipt-method-val": "PayPal Secure Checkout"
    },
    ko: {
        "logo-subtitle": "IMGBOOST!",
        "nav-home": "홈",
        "nav-product": "제품 사진",
        "nav-model": "AI 모델 사진",
        "nav-lifestyle": "라이프스타일 연출",
        "nav-social": "SNS 콘텐츠",
        "btn-orders": "내 주문 내역",
        "hero-badge": "AI 기반 비주얼 콘텐츠",
        "hero-title": "IMGBOOST — AI 제품 사진",
        "hero-desc": "고비용 촬영 없이 스튜디오급 제품 이미지를 생성합니다.",
        "btn-explore": "서비스 둘러보기",
        "btn-quality": "품질 기준 확인",
        
        "stat-resolution": "고해상도",
        "stat-turnaround": "빠른 처리",
        "stat-commercial": "상업적 권리",
        "stat-savings": "비용 절감",
        
        "sec-channels-title": "AI 비주얼 콘텐츠 서비스",
        "sec-channels-subtitle": "제품 사진부터 AI 모델 이미지까지, 이커머스, SNS, 광고를 위한 전문 비주얼을 생성합니다.",
        "card-product-title": "제품 사진 촬영",
        "card-product-desc": "이커머스 리스팅을 위한 완벽한 조명, 배경, 구도의 스튜디오급 제품 이미지입니다.",
        "card-model-title": "AI 모델 사진",
        "card-model-desc": "실제 같은 AI 패션 모델이 제품을 착용한 이미지. 의류, 뷰티, 액세서리 브랜드에 최적입니다.",
        "card-lifestyle-title": "라이프스타일 연출",
        "card-lifestyle-desc": "실제 같은 아름다운 환경 속에 제품을 배치한 콘텍스트 기반 라이프스타일 이미지입니다.",
        "card-social-title": "SNS 콘텐츠",
        "card-social-desc": "플랫폼별 최적화된 시선을 사로잡는 SNS 비주얼, 배너 광고, 프로모션 그래픽입니다.",
        "card-view-pricing": "가격 확인하기",
        
        "comp-title": "전문 품질 기준",
        "comp-desc": "IMGBOOST로 생성된 모든 이미지는 전문 상업 기준을 충족합니다. 제품 사진에 특화된 고급 AI 모델을 사용하여 모든 결과물에서 일관된 품질을 보장합니다.",
        "comp-bullet1-bold": "고해상도:",
        "comp-bullet1-text": "모든 이미지는 2000px+로 제공되며, 인쇄용 4000px 업스케일 옵션을 제공합니다.",
        "comp-bullet2-bold": "상업적 라이선스:",
        "comp-bullet2-text": "완전한 상업적 이용 권리가 포함되어 있어 모든 플랫폼에서 무기한 사용 가능합니다.",
        "comp-bullet3-bold": "무제한 수정:",
        "comp-bullet3-text": "만족하실 때까지 수정해 드립니다 — 모든 이미지에 수정 라운드가 포함되어 있습니다.",
        
        "view-product-sub": "이커머스 스토어를 위한 완벽한 조명, 깨끗한 배경, 전문적인 구도의 스튜디오급 제품 이미지를 받아보세요.",
        "view-model-sub": "실제 같은 AI 생성 패션 모델이 의류, 뷰티 제품, 액세서리를 소화합니다. 다양한 모델 옵션 제공.",
        "view-lifestyle-sub": "가정, 오피스, 아웃도어, 럭셔리 환경 등 열망을 불러일으키는 실제 배경에 제품을 배치한 아름다운 이미지입니다.",
        "view-social-sub": "인스타그램, 페이스북, 틱톡, 핀터레스트를 위한 시선을 사로잡는 비주얼. 배너 광고, 캐러셀, 스토리 그래픽.",
        "view-orders-title": "내 구매 히스토리",
        "view-orders-sub": "성공한 주문 내역을 검토하세요. 데이터는 브라우저 로컬스토리지에 안전하게 보관됩니다.",
        
        "th-date": "주문 날짜",
        "th-order-id": "트랜잭션 ID",
        "th-product": "상품명",
        "th-tier": "패키지 등급",
        "th-style": "이미지 스타일",
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
        "modal-style-label": "이미지 스타일:",
        "modal-qty": "수량:",
        "modal-total-amt": "총 결제금액:",
        "modal-test-btn": "가격 텍스트를 눌러 테스트 결제",
        
        "badge-ssl": "SSL 보안 결제 지원",
        "badge-paypal": "PayPal 인증됨",
        
        "foot-services": "이미지 서비스",
        "foot-legal": "품질 및 지원",
        "foot-resolution": "2000px+ 고해상도",
        "foot-commercial": "완전한 상업적 라이선스",
        "foot-revisions": "무제한 수정",
        "foot-contact": "문의 지원: snsherocom@gmail.com",
        "foot-copy": "&copy; 2026 BibleForAI IMGBOOST. All rights reserved. AI 제품 사진 및 비주얼 콘텐츠.",
        
        "order-button": "패키지 주문하기",
        "featured-badge": "베스트 셀러",
        
        // Receipts
        "receipt-header": "BIBLEFORAI - IMGBOOST 영수증",
        "receipt-date": "주문 날짜",
        "receipt-txid": "거래 ID",
        "receipt-email": "고객 이메일",
        "receipt-type": "상품 종류",
        "receipt-size": "패키지 크기",
        "receipt-style": "이미지 스타일",
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
    
    // Set document lang attribute
    document.documentElement.lang = lang;
    
    // Update document title and metadata
    document.title = isKo ? "BibleForAI - IMGBOOST | AI 제품 사진 및 비주얼 콘텐츠" : "BibleForAI - IMGBOOST | AI Product Photography & Visual Content";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.content = isKo ? 
            "AI 기반 제품 사진 및 비주얼 콘텐츠 생성 서비스. 고비용 촬영 없이 스튜디오급 제품 이미지, AI 모델 사진, 이커머스 비주얼을 받아보세요." : 
            "AI-powered product photography and visual content generation. Get studio-quality product images, AI model photos, and e-commerce visuals without expensive photoshoots.";
    }

    // Update Open Graph (OG) and Twitter Metadata tags dynamically
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
        ogTitle.content = isKo ? "BibleForAI - IMGBOOST | AI 제품 사진 및 비주얼 콘텐츠" : "BibleForAI - IMGBOOST | AI Product Photography & Visual Content";
    }
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
        ogDesc.content = isKo ? 
            "AI 기반 제품 사진 및 비주얼 콘텐츠. 고비용 촬영 없이 스튜디오급 품질의 이미지, AI 모델 사진, 이커머스 비주얼을 획기적인 비용으로 받아보세요." : 
            "AI-powered product photography and visual content. Get studio-quality images, AI model photos, and e-commerce visuals at a fraction of traditional photoshoot costs.";
    }
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) {
        twTitle.content = isKo ? "BibleForAI - IMGBOOST | AI 제품 사진 및 비주얼 콘텐츠" : "BibleForAI - IMGBOOST | AI Product Photography & Visual Content";
    }
    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) {
        twDesc.content = isKo ? 
            "AI 기반 제품 사진 및 비주얼 콘텐츠. 고비용 촬영 없이 스튜디오급 품질의 이미지, AI 모델 사진, 이커머스 비주얼을 획기적인 비용으로 받아보세요." : 
            "AI-powered product photography and visual content. Get studio-quality images, AI model photos, and e-commerce visuals at a fraction of traditional photoshoot costs.";
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
function renderAllPackages() {
    const isKo = currentLang === 'ko';
    
    Object.keys(packageCatalog).forEach(categoryKey => {
        const categoryData = packageCatalog[categoryKey];
        const container = document.getElementById(`${categoryKey}-packages`);
        if (!container) return;

        container.innerHTML = categoryData.packages.map(pkg => {
            const featuredClass = pkg.featured ? 'featured' : '';
            const badgeIcon = getCategoryIcon(categoryKey);
            const featuredLabel = isKo ? translations.ko['featured-badge'] : translations.en['featured-badge'];
            
            const name = isKo ? pkg.name_ko : pkg.name_en;
            const desc = isKo ? pkg.desc_ko : pkg.desc_en;
            const features = isKo ? pkg.features_ko : pkg.features_en;
            const btnText = translations[currentLang]['order-button'] || 'Order Package';
            
            const featuredBadge = pkg.featured ? `data-featured-label="${featuredLabel}"` : '';
            
            return `
                <div class="package-card ${featuredClass}" ${featuredBadge}>
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
        case 'product': return 'fa-solid fa-box';
        case 'model': return 'fa-solid fa-user';
        case 'lifestyle': return 'fa-solid fa-house';
        case 'social': return 'fa-solid fa-hashtag';
        default: return 'fa-solid fa-image';
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

// Click price to test checkout Trigger
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
            const selectedStyle = document.getElementById('order-style').value;
            const finalAmount = (currentPackage.basePrice * orderQuantity).toFixed(2);
            return actions.order.create({
                purchase_units: [{
                    description: `${currentPackage.categoryName} - ${currentPackage.tierName} [Style: ${selectedStyle}] (Qty: ${orderQuantity})`,
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
    const orderLogs = JSON.parse(localStorage.getItem('imgboost_orders')) || [];
    const selectedStyle = document.getElementById('order-style').value;
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
        style: selectedStyle,
        quantity: orderQuantity,
        basePrice: currentPackage.basePrice,
        totalPaid: formatPrice(currentPackage.basePrice * orderQuantity),
        status: 'Completed',
        clientId: clientId,
        secret: secret
    };
    
    orderLogs.unshift(newOrder); // Add to beginning
    localStorage.setItem('imgboost_orders', JSON.stringify(orderLogs));
    
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
${dict["receipt-style"].padEnd(15)} : ${newOrder.style}
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
    const orderLogs = JSON.parse(localStorage.getItem('imgboost_orders')) || [];
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
            <td>${order.style || 'Studio'}</td>
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
