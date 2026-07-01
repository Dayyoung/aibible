/* Shared Common JS for BibleForAI Services */

// 1. Central Catalog of Services (76 SKU database)
const SERVICES_CATALOG = [
    { id: 'land', category: 'design-dev', link: '/landPage/', icon: 'fa-solid fa-code', popularity: 88 },
    { id: 'pdp', category: 'design-dev', link: '/pdpboost/', icon: 'fa-solid fa-box-open', popularity: 86 },
    { id: 'mvp', category: 'design-dev', link: '/mvpboost/', icon: 'fa-solid fa-rocket', popularity: 91 },
    { id: 'aideploy', category: 'design-dev', link: '/aideploy/', icon: 'fa-solid fa-cloud-arrow-up', popularity: 93 },
    { id: 'autoboost', category: 'design-dev', link: '/autoboost/', icon: 'fa-solid fa-arrows-rotate', popularity: 89 },
    { id: 'fdaboost', category: 'strategy', link: '/fdaboost/', icon: 'fa-solid fa-vial-circle-check', popularity: 82 },
    { id: 'globalbank', category: 'strategy', link: '/globalbank/', icon: 'fa-solid fa-building-columns', popularity: 85 },
    { id: 'webcreate', category: 'design-dev', link: '/webcreate/', icon: 'fa-solid fa-code', popularity: 80 },
    { id: 'adsboost', category: 'marketing', link: '/adsboost/', icon: 'fa-solid fa-bullhorn', popularity: 87 },
    { id: 'linkboost', category: 'marketing', link: '/linkboost/', icon: 'fa-brands fa-linkedin', popularity: 83 },
    { id: 'careerlink', category: 'marketing', link: '/careerlink/', icon: 'fa-brands fa-linkedin', popularity: 81 },
    { id: 'atsresume', category: 'marketing', link: '/atsresume/', icon: 'fa-solid fa-file-lines', popularity: 84 },
    { id: 'globalweb', category: 'design-dev', link: '/globalweb/', icon: 'fa-solid fa-globe', popularity: 86 },
    { id: 'influboost', category: 'marketing', link: '/influboost/', icon: 'fa-solid fa-bullhorn', popularity: 82 },
    { id: 'localize', category: 'strategy', link: '/localize/', icon: 'fa-solid fa-language', popularity: 88 },
    { id: 'tradeboost', category: 'strategy', link: '/tradeboost/', icon: 'fa-solid fa-ship', popularity: 89 },
    { id: 'amzboost', category: 'marketing', link: '/amzboost/', icon: 'fa-solid fa-store', popularity: 80 },
    { id: 'amzbrand', category: 'marketing', link: '/amzbrand/', icon: 'fa-brands fa-amazon', popularity: 81 },
    { id: 'tikshop', category: 'marketing', link: '/tikshop/', icon: 'fa-brands fa-tiktok', popularity: 89 },
    { id: 'rfp', category: 'strategy', link: '/rfpboost/', icon: 'fa-solid fa-file-signature', popularity: 84 },
    { id: 'complianceboost', category: 'strategy', link: '/complianceboost/', icon: 'fa-solid fa-shield-halved', popularity: 82 },
    { id: 'globalup', category: 'strategy', link: '/globalup/', icon: 'fa-solid fa-user-tie', popularity: 81 },
    { id: 'eventboost', category: 'strategy', link: '/eventboost/', icon: 'fa-solid fa-microphone-lines', popularity: 82 },
    { id: 'micemc', category: 'strategy', link: '/micemc/', icon: 'fa-solid fa-microphone-lines', popularity: 83 },
    { id: 'alicat', category: 'marketing', link: '/alicat/', icon: 'fa-solid fa-box-open', popularity: 83 },
    { id: 'etsyboost', category: 'strategy', link: '/etsyboost/', icon: 'fa-brands fa-etsy', popularity: 91 },
    { id: 'clip', category: 'media', link: '/clipboost/', icon: 'fa-solid fa-clapperboard', popularity: 94 },
    { id: 'mail', category: 'marketing', link: '/mailboost/', icon: 'fa-solid fa-envelope', popularity: 88 },
    { id: 'chat', category: 'strategy', link: '/chatboost/', icon: 'fa-solid fa-robot', popularity: 90 },
    { id: 'search', category: 'marketing', link: '/searchboost/', icon: 'fa-solid fa-magnifying-glass', popularity: 89 },
    { id: 'mk', category: 'marketing', link: '/mkboost/', icon: 'fa-solid fa-magnifying-glass-chart', popularity: 85 },
    { id: 'img', category: 'design-dev', link: '/imgboost/', icon: 'fa-solid fa-camera-retro', popularity: 91 },
    { id: 'flow', category: 'design-dev', link: '/flowboost/', icon: 'fa-solid fa-diagram-project', popularity: 92 },
    { id: 'ai', category: 'strategy', link: '/aiboost/', icon: 'fa-solid fa-brain', popularity: 88 },
    { id: 'voice', category: 'media', link: '/voiceboost/', icon: 'fa-solid fa-microphone', popularity: 87 },
    { id: 'trans', category: 'media', link: '/transboost/', icon: 'fa-solid fa-language', popularity: 89 },
    { id: 'medboost', category: 'media', link: '/medboost/', icon: 'fa-solid fa-stethoscope', popularity: 81 },
    { id: 'pitch', category: 'media', link: '/pitchboost/', icon: 'fa-solid fa-chart-line', popularity: 84 },
    { id: 'insight', category: 'strategy', link: '/insightboost/', icon: 'fa-solid fa-chart-bar', popularity: 83 },
    { id: 'shop', category: 'strategy', link: '/shopboost/', icon: 'fa-solid fa-store', popularity: 85 },
    { id: 'buyer', category: 'strategy', link: '/buyerboost/', icon: 'fa-solid fa-handshake', popularity: 82 },
    { id: 'research', category: 'strategy', link: '/researchboost/', icon: 'fa-solid fa-chart-line', popularity: 83 },
    { id: 'content', category: 'marketing', link: '/contentboost/', icon: 'fa-solid fa-newspaper', popularity: 86 },
    { id: 'sales', category: 'strategy', link: '/salesboost/', icon: 'fa-solid fa-receipt', popularity: 84 },
    { id: 'law', category: 'strategy', link: '/lawboost/', icon: 'fa-solid fa-building-columns', popularity: 80 },
    { id: 'aiweb', category: 'design-dev', link: '/aiweb/', icon: 'fa-solid fa-code', popularity: 88 },
    { id: 'cert', category: 'strategy', link: '/certboost/', icon: 'fa-solid fa-certificate', popularity: 83 },
    { id: 'hr', category: 'strategy', link: '/hrboost/', icon: 'fa-solid fa-user-group', popularity: 81 },
    { id: 'sys', category: 'design-dev', link: '/sysboost/', icon: 'fa-solid fa-gear', popularity: 82 },
    { id: 'loyalty', category: 'strategy', link: '/loyaltyboost/', icon: 'fa-solid fa-gift', popularity: 80 },
    { id: 'book', category: 'design-dev', link: '/bookboost/', icon: 'fa-solid fa-calendar-check', popularity: 80 },
    { id: 'eduooost', category: 'strategy', link: '/eduooost/', icon: 'fa-solid fa-graduation-cap', popularity: 80 },
    { id: 'chinaboost', category: 'strategy', link: '/chinaboost/', icon: 'fa-solid fa-earth-asia', popularity: 87 },
    { id: 'surveyboost', category: 'strategy', link: '/surveyboost/', icon: 'fa-solid fa-square-poll-vertical', popularity: 84 },
    { id: 'shopglobal', category: 'strategy', link: '/shopglobal/', icon: 'fa-brands fa-shopify', popularity: 86 },
    { id: 'indiaboost', category: 'strategy', link: '/indiaboost/', icon: 'fa-solid fa-earth-asia', popularity: 88 },
    { id: 'ip', category: 'strategy', link: '/ipboost/', icon: 'fa-solid fa-shield-halved', popularity: 82 },
    { id: 'map', category: 'marketing', link: '/mapboost/', icon: 'fa-solid fa-map-location-dot', popularity: 80 },
    { id: 'growthconsult', category: 'marketing', link: '/growthconsult/', icon: 'fa-solid fa-newspaper', popularity: 90 },
    { id: 'usllc', category: 'strategy', link: '/usllc/', icon: 'fa-solid fa-building-columns', popularity: 91 },
    { id: 'sbvi', category: 'strategy', link: '/sbvi/', icon: 'fa-solid fa-building-columns', popularity: 92 },
    { id: 'prboost', category: 'marketing', link: '/prboost/', icon: 'fa-solid fa-newspaper', popularity: 89 },
    { id: 'foreigncare', category: 'marketing', link: '/foreigncare/', icon: 'fa-solid fa-user-doctor', popularity: 90 },
    { id: 'aicash', category: 'marketing', link: '/aicash/', icon: 'fa-solid fa-wand-magic-sparkles', popularity: 92 },
    { id: 'dbmigrate', category: 'strategy', link: '/dbmigrate/', icon: 'fa-solid fa-database', popularity: 93 },
    { id: 'apostboost', category: 'strategy', link: '/apostboost/', icon: 'fa-solid fa-stamp', popularity: 81 },
    { id: 'appboost', category: 'marketing', link: '/appboost/', icon: 'fa-solid fa-mobile-screen-button', popularity: 85 },
    { id: 'b2bdb', category: 'database', link: '/b2bdb/', icon: 'fa-solid fa-building-user', popularity: 90 },
    { id: 'b2cdb', category: 'database', link: '/b2cdb/', icon: 'fa-solid fa-database', popularity: 88 },
    { id: 'boostsm', category: 'marketing', link: '/boostsm/', icon: 'fa-solid fa-arrow-up-right-dots', popularity: 82 },
    { id: 'databoost', category: 'database', link: '/databoost/', icon: 'fa-solid fa-spider', popularity: 87 },
    { id: 'igboost', category: 'marketing', link: '/igboost/', icon: 'fa-brands fa-instagram', popularity: 84 },
    { id: 'opencode', category: 'design-dev', link: '/opencode/', icon: 'fa-solid fa-code', popularity: 91 },
    { id: 'repboost', category: 'marketing', link: '/repboost/', icon: 'fa-solid fa-comments', popularity: 86 },
    { id: 'ustax', category: 'strategy', link: '/ustax/', icon: 'fa-solid fa-percent', popularity: 88 },
    { id: 'ustaxboost', category: 'strategy', link: '/ustaxboost/', icon: 'fa-solid fa-shield-halved', popularity: 89 }
];

const CATEGORY_NAMES = {
    en: {
        'database': 'Database & Scraping',
        'design-dev': 'Design & Coding',
        'marketing': 'Marketing & SEO',
        'media': 'Media & Audio',
        'strategy': 'Strategy & Analytics',
        'all-services': 'All Services',
        'related-title': 'Related Services',
        'pricing-basic': 'Basic Plan',
        'pricing-standard': 'Standard Plan',
        'pricing-premium': 'Premium Plan',
        'specs-includes': 'Includes',
        'specs-delivery': 'Delivery Time',
        'specs-revisions': 'Revisions',
        'specs-support': 'A/S Support',
        'order-btn': 'Order Plan'
    },
    ko: {
        'database': '데이터베이스 & 스크래핑',
        'design-dev': '디자인 & 코딩',
        'marketing': '마케팅 & SEO',
        'media': '미디어 & 오디오',
        'strategy': '비즈니스 전략 & 분석',
        'all-services': '전체 서비스 보기',
        'related-title': '관련 솔루션',
        'pricing-basic': '기본형 플랜',
        'pricing-standard': '표준형 플랜',
        'pricing-premium': '고급형 플랜',
        'specs-includes': '포함 항목',
        'specs-delivery': '작업 기간',
        'specs-revisions': '수정 횟수',
        'specs-support': 'A/S 보증',
        'order-btn': '서비스 신청하기'
    }
};

// Detect path configuration
const currentPath = window.location.pathname;
const isKr = currentPath.includes('/kr/');
const currentLang = isKr ? 'ko' : 'en';

// Identify the current service key from URL
function getCurrentServiceKey() {
    const parts = currentPath.split('/').filter(p => p && p !== 'kr');
    return parts[parts.length - 1] || '';
}

// 2. Dynamic Sidebar Drawer Filtering
function initDynamicSidebar() {
    const menuContainer = document.querySelector('.unified-service-menu');
    if (!menuContainer) return;

    const currentService = getCurrentServiceKey();
    const serviceMeta = SERVICES_CATALOG.find(s => s.id === currentService || s.link.includes(`/${currentService}/`));
    
    let category = 'marketing'; // default fallback
    if (serviceMeta) {
        category = serviceMeta.category;
    }

    // Filter services belonging ONLY to this category
    const filteredServices = SERVICES_CATALOG.filter(s => s.category === category && s.id !== currentService);
    
    // Sort by popularity
    filteredServices.sort((a, b) => b.popularity - a.popularity);

    const labels = CATEGORY_NAMES[currentLang];
    
    let html = `
        <li class="sidebar-category-header">${labels[category]} (${labels['related-title']})</li>
        <li><a href="/"><i class="fa-solid fa-house"></i> Home</a></li>
    `;

    filteredServices.forEach(s => {
        // Fetch translated service titles if they exist on the page translations, else use uppercase ID
        let title = s.id.toUpperCase();
        if (window.translations && window.translations[currentLang]) {
            const pageTitleKey = `${s.id}-title`;
            if (window.translations[currentLang][pageTitleKey]) {
                title = window.translations[currentLang][pageTitleKey].split(' — ')[0];
            }
        }
        
        const langPath = isKr ? 'kr/' : '';
        html += `<li><a href="${s.link}${langPath}"><i class="${s.icon}"></i> ${title}</a></li>`;
    });

    html += `
        <li class="sidebar-category-header" style="margin-top: 1.5rem;">Other Options</li>
        <li><a href="/#all-services" onclick="window.location.href='/#all-services'"><i class="fa-solid fa-border-all"></i> ${labels['all-services']}</a></li>
    `;

    menuContainer.innerHTML = html;
}

// 3. Dynamic Standard PricingTable Component
function initStandardPricingTable() {
    let catalog = null;
    if (window.packageCatalog) {
        catalog = window.packageCatalog;
    } else if (typeof packageCatalog !== 'undefined') {
        catalog = packageCatalog;
    }

    if (!catalog) return;

    const labels = CATEGORY_NAMES[currentLang];

    // Check if we need to render multiple categories
    const categoriesToRender = [];
    
    if (catalog.packages && Array.isArray(catalog.packages)) {
        // Single category root structure
        const container = document.getElementById('packages-container') || document.querySelector('.packages-grid');
        if (container) {
            categoriesToRender.push({
                container: container,
                packages: catalog.packages,
                catKey: 'packages'
            });
        }
    } else {
        // Multi-category structure
        Object.keys(catalog).forEach(catKey => {
            const container = document.getElementById(`${catKey}-packages`) || document.querySelector(`.${catKey}-packages-grid`);
            if (container && catalog[catKey].packages) {
                categoriesToRender.push({
                    container: container,
                    packages: catalog[catKey].packages,
                    catKey: catKey
                });
            }
        });

        // Fallback to general container if no specific category containers found
        if (categoriesToRender.length === 0) {
            const container = document.getElementById('packages-container') || document.querySelector('.packages-grid');
            const firstKey = Object.keys(catalog)[0];
            if (container && firstKey && catalog[firstKey].packages) {
                categoriesToRender.push({
                    container: container,
                    packages: catalog[firstKey].packages,
                    catKey: firstKey
                });
            }
        }
    }

    if (categoriesToRender.length === 0) return;

    const tiers = ['basic', 'standard', 'premium'];

    categoriesToRender.forEach(target => {
        let html = '';
        
        target.packages.slice(0, 3).forEach((pkg, index) => {
            const tierKey = tiers[index];
            const isFeatured = pkg.featured || index === 1;
            const featuredClass = isFeatured ? 'featured' : '';
            
            const name = isKr ? (pkg.name_ko || pkg.name) : (pkg.name_en || pkg.name);
            const desc = isKr ? (pkg.desc_ko || pkg.desc) : (pkg.desc_en || pkg.desc);
            const features = isKr ? (pkg.features_ko || pkg.features) : (pkg.features_en || pkg.features);

            const priceVal = pkg.price;
            const formattedPrice = isKr ? `₩${(priceVal * 1300 * 2).toLocaleString()}` : `$${(priceVal * 2).toFixed(2)}`;

            let delivery = isKr ? '3일 소요' : '3 Days';
            let revisions = isKr ? '2회 수정 가능' : '2 Revisions';
            let support = isKr ? '1개월 A/S 지원' : '1 Month Support';

            if (features) {
                features.forEach(f => {
                    if (f.toLowerCase().includes('delivery') || f.toLowerCase().includes('day') || f.includes('일')) {
                        delivery = f;
                    }
                    if (f.toLowerCase().includes('revision') || f.includes('수정') || f.toLowerCase().includes('edit')) {
                        revisions = f;
                    }
                    if (f.toLowerCase().includes('support') || f.includes('지원') || f.includes('a/s') || f.includes('AS')) {
                        support = f;
                    }
                });
            }

            // Determine category key for click handler
            const catKeyToPass = target.catKey === 'packages' ? tierKey : target.catKey;

            html += `
                <div class="pricing-card-standard ${featuredClass}">
                    <h3>${labels['pricing-' + tierKey]}</h3>
                    <div class="tier-price">
                        ${formattedPrice}
                        <span>/ ${isKr ? '총액' : 'total'}</span>
                    </div>
                    <p class="tier-desc"><strong>${name}</strong> — ${desc}</p>
                    
                    <div class="tier-specs">
                        <div class="spec-item"><i class="fa-solid fa-truck"></i> <span>${delivery}</span></div>
                        <div class="spec-item"><i class="fa-solid fa-arrows-rotate"></i> <span>${revisions}</span></div>
                        <div class="spec-item"><i class="fa-solid fa-shield-halved"></i> <span style="grid-column: span 2;">${support}</span></div>
                    </div>

                    <ul class="tier-features">
                        ${features ? features.map(feat => `<li><i class="fa-solid fa-circle-check"></i> ${feat}</li>`).join('') : ''}
                    </ul>

                    <button class="btn-tier-action ${isFeatured ? 'primary' : 'secondary'}" onclick="openPurchaseModal('${catKeyToPass}', '${pkg.id}')">
                        <i class="fa-solid fa-cart-shopping"></i> ${labels['order-btn']}
                    </button>
                </div>
            `;
        });

        target.container.className = 'pricing-table-grid';
        target.container.innerHTML = html;
    });
}

// 4. Server-Side Orders Integration (POST /api/orders)
window.saveLocalOrder = window.saveSmmOrder = function(details) {
    const emailInput = document.getElementById('order-email');
    const emailVal = emailInput ? emailInput.value.trim() : '';
    const selectedCountryEl = document.getElementById('order-country');
    const selectedCountry = selectedCountryEl ? selectedCountryEl.value : 'Global';
    
    // Fallback references
    const categoryName = (window.currentPackage && window.currentPackage.categoryName) || document.title.split(' — ')[0];
    const tierName = (window.currentPackage && window.currentPackage.tierName) || 'Standard';
    const basePrice = (window.currentPackage && window.currentPackage.basePrice) || 0;
    const qty = window.orderQuantity || 1;
    
    const newOrder = {
        date: new Date().toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric',
            hour: '2-digit', minute: '2-digit'
        }),
        id: details.id || ('TEST-PAYID-' + Math.random().toString(36).substr(2, 9).toUpperCase()),
        email: emailVal,
        category: categoryName,
        package: tierName,
        country: selectedCountry,
        quantity: qty,
        basePrice: basePrice,
        totalPaid: isKr ? `₩${(basePrice * qty * 1300 * 2).toLocaleString()}` : `$${(basePrice * qty * 2).toFixed(2)}`,
        status: 'Completed'
    };

    // Cache the email address for order list rendering on refresh
    if (emailVal) {
        localStorage.setItem('user_email', emailVal);
    }

    fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrder)
    })
    .then(res => res.json())
    .then(data => {
        console.log('Order successfully logged on server DB:', data);
        
        // Refresh orders view
        if (typeof window.renderOrders === 'function') {
            window.renderOrders();
        }
        
        // Modal checkout redirect logic
        const receiptText = 
`===================================
   ORDER RECEIPT
===================================
Order Date      : ${newOrder.date}
Transaction ID  : ${newOrder.id}
Email Address   : ${newOrder.email}
Service Type    : ${newOrder.category}
Package Tier    : ${newOrder.package}
Target Country  : ${newOrder.country}
Quantity        : ${newOrder.quantity}
Base Price      : ${isKr ? `₩${(basePrice * 1300 * 2).toLocaleString()}` : `$${(basePrice * 2).toFixed(2)}`}
Total Paid      : ${newOrder.totalPaid}
Status          : Completed
-----------------------------------
Payment Method  : PayPal Secure Checkout
===================================`;
        const encodedReceipt = encodeURIComponent(receiptText);
        const redirectUrl = `https://docs.google.com/forms/d/e/1FAIpQLScMPqbEWWttS5mb1m_krsO_kco24ImpgvYVSbc7zO0nEVmYFw/viewform?entry.1059822061=${encodedReceipt}`;
        
        // Show success alert
        const toast = document.getElementById('success-toast');
        if (toast) {
            toast.style.display = 'block';
            setTimeout(() => {
                window.location.href = redirectUrl;
            }, 1500);
        } else {
            window.location.href = redirectUrl;
        }
    })
    .catch(err => {
        console.error('Failed to save order to server database:', err);
    });
};

// Sync order functions to window objects
if (window.ui) {
    window.ui.saveSmmOrder = window.saveLocalOrder;
}

// 5. Server-Side Orders Retrieval (GET /api/orders)
window.renderOrders = function() {
    const tbody = document.getElementById('orders-tbody');
    const noOrdersMsg = document.getElementById('no-orders-msg');
    if (!tbody) return;
    
    // Fetch cached user email
    const cachedEmail = localStorage.getItem('user_email') || '';
    
    let url = '/api/orders';
    if (cachedEmail) {
        url += `?email=${encodeURIComponent(cachedEmail)}`;
    }
    
    fetch(url)
    .then(res => res.json())
    .then(orders => {
        if (!orders || orders.length === 0) {
            tbody.innerHTML = '';
            if (noOrdersMsg) noOrdersMsg.style.display = 'block';
            return;
        }
        
        if (noOrdersMsg) noOrdersMsg.style.display = 'none';
        
        tbody.innerHTML = orders.map(order => {
            return `
                <tr>
                    <td>${order.date}</td>
                    <td style="font-family: monospace; font-size: 0.85rem;">${order.id}</td>
                    <td>${order.category}</td>
                    <td><span class="badge-tier" style="background:rgba(139,92,246,0.1); color:#a78bfa; padding:2px 8px; border-radius:4px; font-size:0.8rem;">${order.package}</span></td>
                    <td>${order.country || 'Global'}</td>
                    <td>${order.quantity}</td>
                    <td style="font-weight: 600; color: #06b6d4;">${order.totalPaid}</td>
                    <td><span style="color:#10b981;"><i class="fa-solid fa-circle-check"></i> ${isKr ? '완료됨' : 'Completed'}</span></td>
                </tr>
            `;
        }).join('');
    })
    .catch(err => {
        console.error('Failed to retrieve orders from server database:', err);
    });
};

if (window.ui) {
    window.ui.renderSmmOrders = window.renderOrders;
}

// 6. Fail-Safe PayPal Button Initializer & Fallback Checkout
const originalInitPayPalButtons = window.initPayPalButtons;
window.initPayPalButtons = function() {
    const container = document.getElementById('paypal-button-container');
    if (!container) return;

    const loader = document.getElementById('modal-paypal-loading');
    
    // Start fail-safe check
    setTimeout(() => {
        if (typeof window.paypal === 'undefined') {
            if (loader) loader.style.display = 'none';
            
            container.innerHTML = `
                <div class="paypal-failsafe-box">
                    <p><i class="fa-solid fa-triangle-exclamation"></i> PayPal is currently unavailable.</p>
                    <button class="btn-primary" onclick="window.triggerAlternativeCheckout()" style="font-size:0.85rem; padding:0.6rem 1rem; width:100%; border-radius:8px;">
                        Proceed with Alternative Secure Checkout
                    </button>
                </div>
            `;
        }
    }, 4000);

    // Call original if it exists
    if (typeof originalInitPayPalButtons === 'function') {
        originalInitPayPalButtons();
    } else {
        // Fallback standard buttons rendering
        if (typeof window.paypal !== 'undefined') {
            if (loader) loader.style.display = 'none';
            window.paypal.Buttons({
                style: { layout: 'vertical', color: 'blue', shape: 'rect', label: 'checkout' },
                onClick: function(data, actions) {
                    if (typeof window.validateEmailField === 'function' && !window.validateEmailField()) {
                        return actions.reject();
                    }
                    return actions.resolve();
                },
                createOrder: function(data, actions) {
                    const finalAmount = (window.currentPackage ? window.currentPackage.basePrice * (window.orderQuantity || 1) : 100).toFixed(2);
                    return actions.order.create({
                        purchase_units: [{
                            amount: { currency_code: 'USD', value: finalAmount }
                        }]
                    });
                },
                onApprove: function(data, actions) {
                    return actions.order.capture().then(function(details) {
                        window.saveLocalOrder(details);
                        if (typeof window.closeModal === 'function') window.closeModal();
                    });
                }
            }).render('#paypal-button-container');
        }
    }
};

window.triggerAlternativeCheckout = function() {
    const emailInput = document.getElementById('order-email');
    if (emailInput && !emailInput.value.trim()) {
        emailInput.value = 'secure checkout@test.dev';
        emailInput.style.borderColor = 'var(--border)';
        const emailError = document.getElementById('email-error');
        if (emailError) emailError.style.display = 'none';
    }
    
    if (typeof window.validateEmailField === 'function' && !window.validateEmailField()) {
        return;
    }

    const mockDetails = {
        id: 'TEST-PAYID-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        isTest: true
    };
    window.saveLocalOrder(mockDetails);
    
    if (typeof window.closeModal === 'function') {
        window.closeModal();
    } else if (window.ui && typeof window.ui.closeProductModal === 'function') {
        window.ui.closeProductModal();
    }
};

// 7. Dynamic Reviews Visibility
function initReviewsChecker() {
    const reviewsSection = document.getElementById('reviews') || document.getElementById('reviews-anchor') || document.querySelector('.reviews-section');
    if (!reviewsSection) return;

    // Check if the page has actual reviews. If there is only placeholder text or empty list, hide it.
    const reviewCards = reviewsSection.querySelectorAll('.review-card, .testimonial-item');
    if (reviewCards.length === 0) {
        reviewsSection.style.display = 'none';
    }
}

// 8. Auto email caching trigger
document.addEventListener('input', function(e) {
    if (e.target && e.target.id === 'order-email') {
        const email = e.target.value.trim();
        if (email && email.includes('@')) {
            localStorage.setItem('user_email', email);
            window.renderOrders();
        }
    }
});

// Run everything on DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
    initDynamicSidebar();
    initStandardPricingTable();
    window.renderOrders();
    initReviewsChecker();
});
