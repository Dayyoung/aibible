// App State
let currentView = 'home';
let currentPackage = null;
let orderQuantity = 1;
let paypalButtonInstance = null;

// Package Catalog with Localized Keys
const packageCatalog = {
    voice: {
        title_en: 'AI Voice Cloning & Audio Production',
        title_ko: 'AI 음성 복제 & 오디오 제작',
        packages: [
            { id: 'voice-basic', name_en: 'Basic Voiceover (Up to 250 words)', name_ko: '베이직 음성 (최대 250단어)', desc_en: 'Short AI voiceover for social media ads, product teasers, or intro clips. One language, one voice style, natural delivery.', desc_ko: 'SNS 광고, 제품 티저, 인트로 클립을 위한 짧은 AI 음성. 1개 언어, 1개 음성 스타일, 자연스러운 전달.', price: 50, featured: false, features_en: ['Up to 250 Words Script', '1 Language / 1 Voice Style', 'MP3 & WAV Format', 'Human-like Natural Tone', '24h Delivery'], features_ko: ['최대 250단어 스크립트', '1개 언어 / 1개 음성 스타일', 'MP3 & WAV 포맷', '인간과 유사한 자연스러운 톤', '24시간 내 전달'] },
            { id: 'voice-standard', name_en: 'Standard Voiceover (Up to 1,000 words)', name_ko: '스탠다드 음성 (최대 1,000단어)', desc_en: 'Full explainer video voiceover, podcast intro, or product demo narration. Multiple voice style options with emotion tuning.', desc_ko: '전체 설명 영상 음성, 팟캐스트 인트로, 제품 데모 내레이션. 감정 조절이 가능한 다양한 음성 스타일 옵션.', price: 100, featured: true, features_en: ['Up to 1,000 Words Script', 'Multiple Voice Styles Available', 'Emotion & Tone Tuning', 'MP3/WAV/FLAC Formats', 'Background Music Option', '48h Delivery with Revisions'], features_ko: ['최대 1,000단어 스크립트', '다양한 음성 스타일 선택 가능', '감정 및 톤 조절', 'MP3/WAV/FLAC 포맷', '배경 음악 옵션', '수정 포함 48시간 내 전달'] },
            { id: 'voice-pro', name_en: 'Professional Voice Cloning', name_ko: '프로페셔널 음성 복제', desc_en: 'Clone a specific voice for brand consistency. Perfect for consistent brand voice across all content. Requires voice sample for AI training.', desc_ko: '브랜드 일관성을 위한 특정 음성 복제. 모든 콘텐츠에서 일관된 브랜드 음성을 원하는 경우에 최적. AI 학습용 음성 샘플 필요.', price: 200, featured: false, features_en: ['Custom Voice Model Training', 'Multi-Language Support (5 langs)', 'Unlimited Usage License', 'Emotion Range Control', 'API Access for Integration', 'Priority 72h Delivery'], features_ko: ['맞춤형 음성 모델 학습', '5개 언어 지원', '무제한 사용 라이선스', '감정 범위 조절', 'API 연동 액세스', '우선 72시간 내 전달'] },
            { id: 'voice-enterprise', name_en: 'Enterprise Audio Production', name_ko: '엔터프라이즈 오디오 제작', desc_en: 'Full-scale AI audio production including multi-voice dubbing, AI jingles, custom BGM, and audio for commercials. Complete audio branding suite.', desc_ko: '다중 음성 더빙, AI 징글, 맞춤형 BGM, 광고 오디오를 포함한 풀스케일 AI 오디오 제작. 완전한 오디오 브랜딩 스위트.', price: 400, featured: false, features_en: ['Multi-Voice Dubbing (10+ voices)', 'AI Jingle & BGM Composition', 'Commercial Audio Production', 'Audio Mastering & Mixing', 'Full Commercial License', 'Dedicated Audio Producer', '30-Day Post-Delivery Support'], features_ko: ['다중 음성 더빙 (10개 이상)', 'AI 징글 & BGM 작곡', '광고 오디오 제작', '오디오 마스터링 & 믹싱', '완전 상업 라이선스', '전담 오디오 프로듀서', '30일 사후 지원'] }
        ]
    }
};

// Translation Dictionary
const translations = {
    en: {
        "logo-subtitle": "VOICE CLONING",
        "nav-home": "Home",
        "nav-voice": "Voice Packages",
        "btn-orders": "My Orders",
        "hero-badge": "AI-Powered Voice & Audio",
        "hero-title": "BibleForAI - VOICEBOOST!",
        "hero-desc": "AI voice cloning, professional voiceovers, and audio production. Create studio-quality voice content without a recording studio — perfect for videos, ads, podcasts, and brand audio.",
        "btn-explore": "Explore Voice Packages",
        "btn-compliance": "How It Works",
        
        "stat-cloned": "Voices Cloned",
        "stat-accuracy": "Natural Accuracy",
        "stat-satisfaction": "Client Satisfaction",
        "stat-delivery": "Delivery Time",
        
        "sec-channels-title": "Choose Your Voice Package",
        "sec-channels-subtitle": "From short voiceovers to full enterprise audio production. Select the package that matches your content needs and scale.",
        "card-voice-title": "AI Voice Cloning & Audio",
        "card-voice-desc": "Professional AI voice cloning, multi-language voiceovers, custom BGM, and audio production. From simple narrations to complete audio branding solutions.",
        "card-view-pricing": "View Pricing",
        
        "comp-title": "AI Voice Technology That Sounds Human",
        "comp-desc": "Our AI voice generation system uses state-of-the-art neural TTS and voice cloning models to produce natural, emotionally expressive audio indistinguishable from human recordings.",
        "comp-bullet1-bold": "Neural Voice Synthesis:",
        "comp-bullet1-text": "Deep learning models trained on thousands of hours of professional voice data for natural intonation, pacing, and emotional range.",
        "comp-bullet2-bold": "Custom Voice Cloning:",
        "comp-bullet2-text": "Clone any voice with just 5 minutes of sample audio. Your brand voice, consistent across every piece of content.",
        "comp-bullet3-bold": "Multi-Language Support:",
        "comp-bullet3-text": "Generate voiceovers in 30+ languages with native accent quality. Perfect for global brands and multilingual content needs.",
        
        "view-voice-sub": "Professional AI voice cloning and audio production packages. From short form voiceovers to full enterprise audio branding with dedicated producer support.",
        "view-orders-title": "My Purchase History",
        "view-orders-sub": "Review your successful orders. Your data is stored locally in your browser workspace.",
        
        "th-date": "Order Date",
        "th-order-id": "Transaction ID",
        "th-product": "Product",
        "th-tier": "Package Tier",
        "th-language": "Target Language",
        "th-qty": "Quantity",
        "th-total": "Total Paid",
        "th-status": "Status",
        
        "no-orders-msg": "No purchase records found. Make your first order to see history here!",
        
        "modal-title": "Configure Voice Order",
        "modal-desc": "Select your target language and complete secure PayPal payment.",
        "modal-base-pkg": "Base Package:",
        "modal-base-price-label": "Base Price:",
        "modal-email-label": "Email Address *",
        "modal-email-placeholder": "name@example.com",
        "modal-email-error": "Please enter a valid email address.",
        "modal-language-label": "Target Language:",
        "modal-qty": "Quantity:",
        "modal-total-amt": "Total Amount:",
        "modal-test-btn": "Click price to payment checkout",
        
        "badge-ssl": "SSL Secured Checkout",
        "badge-paypal": "PayPal Verified",
        
        "foot-channels": "Voice Packages",
        "foot-legal": "Our Technology",
        "foot-gdpr": "Neural Voice Synthesis",
        "foot-canspam": "Custom Voice Cloning",
        "foot-match": "30+ Languages Supported",
        "foot-contact": "Contact support: snsherocom@gmail.com",
        "foot-copy": "&copy; 2026 BibleForAI VOICEBOOST. All rights reserved. AI voice cloning & audio production.",
        
        "order-button": "Order Package",
        "featured-badge": "Best Seller",
        
        // Receipts
        "receipt-header": "BIBLEFORAI - VOICEBOOST RECEIPT",
        "receipt-date": "Order Date",
        "receipt-txid": "Transaction ID",
        "receipt-email": "Customer Email",
        "receipt-type": "Product Type",
        "receipt-size": "Package Tier",
        "receipt-language": "Target Language",
        "receipt-qty": "Quantity",
        "receipt-baseprice": "Base Price",
        "receipt-total": "Total Paid",
        "receipt-status": "Status",
        "receipt-method": "Payment Method",
        "receipt-method-val": "PayPal Secure Checkout"
    },
    ko: {
        "logo-subtitle": "AI 음성 복제",
        "nav-home": "홈",
        "nav-voice": "음성 패키지",
        "btn-orders": "내 주문 내역",
        "hero-badge": "AI 기반 음성 & 오디오",
        "hero-title": "BibleForAI - VOICEBOOST!",
        "hero-desc": "AI 음성 복제, 전문 보이스오버, 오디오 제작. 녹음 스튜디오 없이도 스튜디오급 음성 콘텐츠를 제작하세요 — 영상, 광고, 팟캐스트, 브랜드 오디오에 최적입니다.",
        "btn-explore": "음성 패키지 둘러보기",
        "btn-compliance": "작동 방식",
        
        "stat-cloned": "복제된 음성",
        "stat-accuracy": "자연스러운 정확도",
        "stat-satisfaction": "고객 만족도",
        "stat-delivery": "제작 기간",
        
        "sec-channels-title": "음성 패키지 선택",
        "sec-channels-subtitle": "짧은 보이스오버부터 완전한 엔터프라이즈 오디오 제작까지. 콘텐츠 요구사항과 규모에 맞는 패키지를 선택하세요.",
        "card-voice-title": "AI 음성 복제 & 오디오",
        "card-voice-desc": "전문 AI 음성 복제, 다국어 보이스오버, 맞춤형 BGM 및 오디오 제작. 간단한 내레이션부터 완전한 오디오 브랜딩 솔루션까지.",
        "card-view-pricing": "가격 확인하기",
        
        "comp-title": "인간처럼 들리는 AI 음성 기술",
        "comp-desc": "당사의 AI 음성 생성 시스템은 최첨단 신경망 TTS 및 음성 복제 모델을 사용하여 실제 인간 음성과 구별할 수 없는 자연스럽고 감정 표현이 풍부한 오디오를 제작합니다.",
        "comp-bullet1-bold": "신경망 음성 합성:",
        "comp-bullet1-text": "수천 시간의 전문 음성 데이터로 학습된 딥러닝 모델이 자연스러운 억양, 속도, 감정 표현을 구현합니다.",
        "comp-bullet2-bold": "맞춤형 음성 복제:",
        "comp-bullet2-text": "단 5분의 음성 샘플로 어떤 목소리든 복제합니다. 모든 콘텐츠에서 일관된 브랜드 음성을 유지하세요.",
        "comp-bullet3-bold": "다국어 지원:",
        "comp-bullet3-text": "30개 이상의 언어로 원어민 수준의 보이스오버를 생성합니다. 글로벌 브랜드와 다국어 콘텐츠에 최적입니다.",
        
        "view-voice-sub": "전문 AI 음성 복제 및 오디오 제작 패키지. 짧은 보이스오버부터 전담 프로듀서가 지원하는 완전한 엔터프라이즈 오디오 브랜딩까지.",
        "view-orders-title": "내 구매 히스토리",
        "view-orders-sub": "성공한 주문 내역을 검토하세요. 데이터는 브라우저 로컬스토리지에 안전하게 보관됩니다.",
        
        "th-date": "주문 날짜",
        "th-order-id": "트랜잭션 ID",
        "th-product": "상품명",
        "th-tier": "패키지 등급",
        "th-language": "대상 언어",
        "th-qty": "수량",
        "th-total": "총 결제금액",
        "th-status": "상태",
        
        "no-orders-msg": "구매 기록이 없습니다. 첫 주문을 완료하시면 내역이 여기에 표시됩니다!",
        
        "modal-title": "음성 주문 구성",
        "modal-desc": "대상 언어를 선택하고 안전한 PayPal 결제를 진행하세요.",
        "modal-base-pkg": "기본 패키지:",
        "modal-base-price-label": "기본 가격:",
        "modal-email-label": "이메일 주소 *",
        "modal-email-placeholder": "name@example.com",
        "modal-email-error": "올바른 이메일 주소를 입력해주세요.",
        "modal-language-label": "대상 언어:",
        "modal-qty": "수량:",
        "modal-total-amt": "총 결제금액:",
        "modal-test-btn": "가격 텍스트를 눌러 결제 진행",
        
        "badge-ssl": "SSL 보안 결제 지원",
        "badge-paypal": "PayPal 인증됨",
        
        "foot-channels": "음성 패키지",
        "foot-legal": "우리의 기술",
        "foot-gdpr": "신경망 음성 합성",
        "foot-canspam": "맞춤형 음성 복제",
        "foot-match": "30+ 언어 지원",
        "foot-contact": "문의 지원: snsherocom@gmail.com",
        "foot-copy": "&copy; 2026 BibleForAI VOICEBOOST. All rights reserved. AI 음성 복제 & 오디오 제작.",
        
        "order-button": "패키지 주문하기",
        "featured-badge": "베스트 셀러",
        
        // Receipts
        "receipt-header": "BIBLEFORAI - VOICEBOOST 영수증",
        "receipt-date": "주문 날짜",
        "receipt-txid": "거래 ID",
        "receipt-email": "고객 이메일",
        "receipt-type": "상품 종류",
        "receipt-size": "패키지 크기",
        "receipt-language": "대상 언어",
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
    document.title = isKo ? "BibleForAI - VOICEBOOST | AI 음성 복제 & 오디오 제작" : "BibleForAI - VOICEBOOST | AI Voice Cloning & Audio Production";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.content = isKo ? 
            "AI 음성 복제, 전문 보이스오버, 오디오 제작 서비스. 영상, 광고, 팟캐스트, 브랜드 오디오를 위한 스튜디오급 AI 음성 콘텐츠를 제작하세요." : 
            "AI voice cloning, professional voiceovers, and audio production services. Create studio-quality AI voice content for videos, ads, podcasts, and brand audio.";
    }

    // Update Open Graph (OG) and Twitter Metadata tags dynamically
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
        ogTitle.content = isKo ? "BibleForAI - VOICEBOOST | AI 음성 복제 & 오디오 제작" : "BibleForAI - VOICEBOOST | AI Voice Cloning & Audio Production";
    }
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
        ogDesc.content = isKo ? 
            "AI 음성 복제, 전문 보이스오버, 오디오 제작 서비스. 스튜디오급 AI 음성 콘텐츠를 제작하세요." : 
            "AI voice cloning, professional voiceovers, and audio production. Create studio-quality AI voice content for any platform.";
    }
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) {
        twTitle.content = isKo ? "BibleForAI - VOICEBOOST | AI 음성 복제 & 오디오 제작" : "BibleForAI - VOICEBOOST | AI Voice Cloning & Audio Production";
    }
    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) {
        twDesc.content = isKo ? 
            "AI 음성 복제, 전문 보이스오버, 오디오 제작 서비스. 스튜디오급 AI 음성 콘텐츠를 제작하세요." : 
            "AI voice cloning, professional voiceovers, and audio production. Create studio-quality AI voice content for any platform.";
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
        case 'voice': return 'fa-solid fa-microphone';
        default: return 'fa-solid fa-microphone';
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
            color:  'gold',
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
            const selectedLanguage = document.getElementById('order-language').value;
            const finalAmount = (currentPackage.basePrice * orderQuantity).toFixed(2);
            return actions.order.create({
                purchase_units: [{
                    description: `${currentPackage.categoryName} - ${currentPackage.tierName} [Language: ${selectedLanguage}] (Qty: ${orderQuantity})`,
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
    const orderLogs = JSON.parse(localStorage.getItem('voiceboost_orders')) || [];
    const selectedLanguage = document.getElementById('order-language').value;
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
        language: selectedLanguage,
        quantity: orderQuantity,
        basePrice: currentPackage.basePrice,
        totalPaid: formatPrice(currentPackage.basePrice * orderQuantity),
        status: 'Completed',
        clientId: clientId,
        secret: secret
    };
    
    orderLogs.unshift(newOrder); // Add to beginning
    localStorage.setItem('voiceboost_orders', JSON.stringify(orderLogs));
    
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
${dict["receipt-language"].padEnd(15)} : ${newOrder.language}
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
    const orderLogs = JSON.parse(localStorage.getItem('voiceboost_orders')) || [];
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
            <td>${order.language || 'English'}</td>
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
