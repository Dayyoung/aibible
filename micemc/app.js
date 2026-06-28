// App State
let currentView = 'home';
let currentPackage = null;
let orderQuantity = 1;
let paypalButtonInstance = null;

// Package Catalog with Localized Keys
const packageCatalog = {
    basic: {
        title_en: 'Event MC Essentials',
        title_ko: '이벤트 MC 기본',
        packages: [
            { id: 'basic-standard', name_en: 'Standard Event MC', name_ko: '표준 이벤트 MC', desc_en: '2-hour bilingual event MC for webinars, meetups, and product launches. Includes opening script, cue handling, and closing remarks.', desc_ko: '웨비나, 밋업, 제품 런칭을 위한 2시간 양언어 이벤트 MC. 오프닝 스크립트, 현장 큐 진행, 클로징 멘트 포함.', price: 286, featured: false, features_en: ['Bilingual MC Hosting', 'Opening & Closing Script', 'Live Cue Handling', '2-Hour Session Support'], features_ko: ['양언어 MC 진행', '오프닝/클로징 스크립트', '현장 큐 진행', '2시간 세션 지원'] },
            { id: 'basic-plus', name_en: 'Standard + Prep Call', name_ko: '표준 + 사전 미팅', desc_en: '2-hour event MC with one rehearsal call and bilingual handoff notes for smoother execution.', desc_ko: '1회 리허설 미팅과 양언어 진행 노트를 포함한 2시간 이벤트 MC 서비스.', price: 357, featured: true, features_en: ['1 Rehearsal Call', 'Bilingual Handoff Notes', 'Agenda Timing Check', '2-Hour Live Support'], features_ko: ['리허설 미팅 1회', '양언어 진행 노트', '아젠다 타이밍 점검', '2시간 현장 지원'] }
        ]
    },
    pro: {
        title_en: 'Conference Hosting',
        title_ko: '컨퍼런스 진행',
        packages: [
            { id: 'pro-deluxe', name_en: 'International Conference MC', name_ko: '국제행사 영어 MC', desc_en: 'International event MC and English presentation support for conferences, forums, and official ceremonies.', desc_ko: '컨퍼런스, 포럼, 공식 행사에 적합한 국제행사 영어 MC 및 영어 PT 대행 서비스.', price: 500, featured: false, features_en: ['Conference Moderation', 'English Presentation Support', 'VIP/Guest Coordination', '1-Day Delivery'], features_ko: ['컨퍼런스 진행', '영어 PT 지원', 'VIP/게스트 조율', '1일 작업 완료'] },
            { id: 'pro-bilingual', name_en: 'Bilingual Moderator Pack', name_ko: '양언어 사회 패키지', desc_en: 'Bilingual MC, moderator support, and structured run-of-show for business summits and partner meetings.', desc_ko: '비즈니스 서밋과 파트너 미팅을 위한 양언어 MC, 좌장 지원, 진행표 구성 패키지.', price: 643, featured: true, features_en: ['Moderator Support', 'Run-of-Show Planning', 'Bilingual Host Script', 'Priority Response'], features_ko: ['좌장 지원', '진행표 구성', '양언어 호스트 스크립트', '우선 응답'] }
        ]
    },
    enterprise: {
        title_en: 'Premium Live Event Coverage',
        title_ko: '프리미엄 행사 진행',
        packages: [
            { id: 'ent-premium', name_en: 'Full-Day Event Lead', name_ko: '풀데이 행사 리드', desc_en: 'Up to 4+ hours of live MC and interpretation with rehearsal support for large-scale international events.', desc_ko: '대형 국제행사를 위한 리허설 포함 4시간 이상 라이브 MC 및 통역 패키지.', price: 1000, featured: true, features_en: ['4+ Hour Coverage', 'Rehearsal Included', 'Live Interpretation', 'Dedicated Pre-Event Briefing'], features_ko: ['4시간 이상 진행', '리허설 포함', '현장 통역', '사전 브리핑 전담'] }
        ]
    }
};

// Translation Dictionary
const translations = {
    en: {
        "hero-title": "International Event MC, English PT & Interpretation",
        "sidebar-title": "BibleForAI Services",
        "search-placeholder": "Search services...",
        "sort-popularity": "🔥 Popularity",
        "sort-name-asc": "🔠 Name (A-Z)",
        "sort-name-desc": "🔠 Name (Z-A)",
        "sort-newest": "📅 Recently Added",
        "results-count-text": "Found <span>{count}</span> services",
        "cat-all": "All",
        "cat-database": "Database & Scraping",
        "cat-designdev": "Design & Coding",
        "cat-marketing": "Marketing & SEO",
        "cat-media": "Media & Audio",
        "cat-strategy": "Strategy & Analytics",
        "hero-desc": "Host conferences, global events, business summits, and bilingual presentations with a seasoned international MC and interpreter.",
        "sec-label": "Our Service Catalog",
        "badge-active": "Active",
        "badge-soon": "Coming Soon",

        "basic-title": "Event MC Essentials",
        "basic-desc": "Affordable bilingual event MC support for webinars, launches, and small international meetups.",
        "basic-btn": "Open Essentials",
        "pro-title": "Conference Hosting",
        "pro-desc": "Professional international conference MC, bilingual moderation, and English presentation support.",
        "pro-btn": "Open Conference Pack",
        "enterprise-title": "Premium Live Event Coverage",
        "enterprise-desc": "Full-day MC, interpretation, and rehearsal support for large-scale global events.",
        "enterprise-btn": "Open Premium Pack",

        "modal-title": "Configure Order",
        "modal-desc": "Configure details and complete secure PayPal payment.",
        "modal-base-pkg": "Base Package:",
        "modal-base-price-label": "Base Price:",
        "modal-email-label": "Email Address *",
        "modal-email-placeholder": "name@example.com",
        "modal-email-error": "Please enter a valid email address.",
        "modal-keywords-label": "Event Type / Topic:",
        "modal-keywords-placeholder": "e.g. conference, summit, workshop",
        "modal-qty": "Quantity:",
        "modal-total-amt": "Total Amount:",
        "modal-test-btn": "Click price to test checkout",

        "badge-ssl": "SSL Secured Checkout",
        "badge-paypal": "PayPal Verified",

        "receipt-header": "BIBLEFORAI - MICEMC RECEIPT",
        "receipt-date": "Order Date",
        "receipt-txid": "Transaction ID",
        "receipt-email": "Customer Email",
        "receipt-type": "Product Type",
        "receipt-size": "Package Size",
        "receipt-keywords": "Event Type",
        "receipt-qty": "Quantity",
        "receipt-baseprice": "Base Price",
        "receipt-total": "Total Paid",
        "receipt-status": "Status",
        "receipt-method": "Payment Method",
        "receipt-method-val": "PayPal Secure Checkout"
    },
    ko: {
        "hero-title": "국제행사 영어 MC, 영어 PT 대행, 한영순차통역",
        "sidebar-title": "BibleForAI 서비스",
        "search-placeholder": "서비스 검색...",
        "sort-popularity": "🔥 인기순",
        "sort-name-asc": "🔠 이름 (가→하)",
        "sort-name-desc": "🔠 이름 (하→가)",
        "sort-newest": "📅 최근 추가",
        "results-count-text": "<span>{count}</span>개 서비스 찾음",
        "cat-all": "전체",
        "cat-database": "데이터베이스 & 스크래핑",
        "cat-designdev": "디자인 & 코딩",
        "cat-marketing": "마케팅 & SEO",
        "cat-media": "미디어 & 오디오",
        "cat-strategy": "전략 & 분석",
        "hero-desc": "경력 있는 국제행사 MC와 통역 전문가가 컨퍼런스, 글로벌 이벤트, 비즈니스 서밋, 양언어 프레젠테이션을 안정적으로 진행합니다.",
        "sec-label": "서비스 카탈로그",
        "badge-active": "운영중",
        "badge-soon": "준비중",

        "basic-title": "이벤트 MC 기본",
        "basic-desc": "웨비나, 론칭, 소규모 국제행사를 위한 합리적인 양언어 MC 지원.",
        "basic-btn": "기본 패키지 열기",
        "pro-title": "컨퍼런스 진행",
        "pro-desc": "국제 컨퍼런스 MC, 양언어 진행, 영어 PT 대행을 위한 전문 패키지.",
        "pro-btn": "컨퍼런스 패키지 열기",
        "enterprise-title": "프리미엄 행사 진행",
        "enterprise-desc": "대형 글로벌 행사를 위한 풀데이 MC, 통역, 리허설 지원 패키지.",
        "enterprise-btn": "프리미엄 패키지 열기",

        "modal-title": "주문 설정",
        "modal-desc": "세부사항을 설정하고 안전한 PayPal 결제를 진행하세요.",
        "modal-base-pkg": "기본 패키지:",
        "modal-base-price-label": "기본 가격:",
        "modal-email-label": "이메일 주소 *",
        "modal-email-placeholder": "name@example.com",
        "modal-email-error": "올바른 이메일 주소를 입력해주세요.",
        "modal-keywords-label": "행사 유형 / 주제:",
        "modal-keywords-placeholder": "예: 컨퍼런스, 서밋, 워크숍",
        "modal-qty": "수량:",
        "modal-total-amt": "총 결제금액:",
        "modal-test-btn": "가격을 클릭하면 테스트 결제",

        "badge-ssl": "SSL 보안 결제",
        "badge-paypal": "PayPal 인증",

        "receipt-header": "BIBLEFORAI - MICEMC 영수증",
        "receipt-date": "주문 날짜",
        "receipt-txid": "거래 ID",
        "receipt-email": "고객 이메일",
        "receipt-type": "상품 종류",
        "receipt-size": "패키지 크기",
        "receipt-keywords": "행사 유형",
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
    
    // Set document lang attribute
    document.documentElement.lang = lang;
    
    // Update document title and metadata
    document.title = isKo ? "BibleForAI - PRBOOST | 글로벌 PR & 게스트 포스팅" : "BibleForAI - PRBOOST | Global PR & Guest Posting";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.content = isKo ? 
            "PRBOOST로 글로벌 SEO와 브랜드 권위를 높이세요. 고권위 해외 매거진에서 DoFollow 백링크를 확보하세요." : 
            "Boost your global SEO and brand authority with PRBOOST. Get DoFollow backlinks from high-authority overseas magazines and media outlets.";
    }

    // Update Open Graph (OG) and Twitter Metadata tags dynamically
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
        ogTitle.content = isKo ? "BibleForAI - PRBOOST | 글로벌 PR & 게스트 포스팅" : "BibleForAI - PRBOOST | Global PR & Guest Posting";
    }
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
        ogDesc.content = isKo ? 
            "글로벌 SEO와 브랜드 권위를 높이세요. 고권위 해외 매거진에서 DoFollow 백링크를 확보하세요." : 
            "Boost your global SEO and brand authority. Get DoFollow backlinks from high-authority overseas magazines.";
    }
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) {
        twTitle.content = isKo ? "BibleForAI - PRBOOST | 글로벌 PR & 게스트 포스팅" : "BibleForAI - PRBOOST | Global PR & Guest Posting";
    }
    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) {
        twDesc.content = isKo ? 
            "글로벌 SEO와 브랜드 권위를 높이세요. 고권위 해외 매거진에서 DoFollow 백링크를 확보하세요." : 
            "Boost your global SEO and brand authority. Get DoFollow backlinks from high-authority overseas magazines.";
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
        case 'basic': return 'fa-solid fa-newspaper';
        case 'pro': return 'fa-solid fa-rocket';
        case 'enterprise': return 'fa-solid fa-building-columns';
        default: return 'fa-solid fa-globe';
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
    
    // Reset inputs
    const emailInput = document.getElementById('order-email');
    if (emailInput) {
        emailInput.value = '';
        emailInput.style.borderColor = 'var(--border)';
    }
    const emailError = document.getElementById('email-error');
    if (emailError) {
        emailError.style.display = 'none';
    }
    const keywordsInput = document.getElementById('order-keywords');
    if (keywordsInput) {
        keywordsInput.value = '';
    }
    
    updateModalPrice();
    
    // Open Modal
    document.getElementById('purchase-modal').classList.add('active');
    
    // Auto-scroll to payment area
    setTimeout(() => {
        const modalCard = document.querySelector('.modal-card');
        const paymentArea = document.querySelector('.paypal-wrapper') || document.querySelector('.payment-badges');
        if (modalCard && paymentArea) {
            modalCard.scrollTop = Math.max(0, paymentArea.offsetTop - 24);
        }
    }, 180);
    
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
            const targetKeywords = document.getElementById('order-keywords').value || 'General';
            const finalAmount = (currentPackage.basePrice * orderQuantity).toFixed(2);
            return actions.order.create({
                purchase_units: [{
                    description: `${currentPackage.categoryName} - ${currentPackage.tierName} [Event Type: ${targetKeywords}] (Qty: ${orderQuantity})`,
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
    const orderLogs = JSON.parse(localStorage.getItem('micemc_orders')) || [];
    const targetKeywords = document.getElementById('order-keywords') ? document.getElementById('order-keywords').value.trim() : '';
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
        keywords: targetKeywords || 'General',
        quantity: orderQuantity,
        basePrice: currentPackage.basePrice,
        totalPaid: formatPrice(currentPackage.basePrice * orderQuantity),
        status: 'Completed',
        clientId: clientId,
        secret: secret
    };
    
    orderLogs.unshift(newOrder); // Add to beginning
    localStorage.setItem('micemc_orders', JSON.stringify(orderLogs));
    
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
${dict["receipt-keywords"].padEnd(15)} : ${newOrder.keywords}
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
    const orderLogs = JSON.parse(localStorage.getItem('micemc_orders')) || [];
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
            <td>${order.keywords || 'General'}</td>
            <td>${order.quantity}</td>
            <td><strong>${order.totalPaid}</strong></td>
            <td><span class="status-badge">${isKo ? "완료됨" : order.status}</span></td>
        </tr>
    `).join('');
}
