// App State
let currentView = 'home';
let currentPackage = null;
let orderQuantity = 1;

const STORAGE_KEY = 'webcreate_orders';
const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScMPqbEWWttS5mb1m_krsO_kco24ImpgvYVSbc7zO0nEVmYFw/viewform?entry.1059822061=';

// Determine language
const isKrPage = window.location.pathname.includes('/kr/') || localStorage.getItem('bibleforai_lang') === 'ko';
const currentLang = isKrPage ? 'ko' : 'en';

// Package Catalog
const packageCatalog = [
    {
        id: 'brand',
        name_en: 'Brand Website',
        name_ko: '브랜드 웹사이트',
        desc_en: 'A polished brand presence configured for trust, clarity, and storytelling.',
        desc_ko: '신뢰도, 명확성 및 브랜드 스토리를 전달하도록 최적화된 고급 기업용 웹사이트.',
        price: 799,
        features_en: ['Responsive Design', '5 Pages included', 'Custom Copywriting', 'SEO friendly structure', '14-day post-launch support'],
        features_ko: ['반응형 레이아웃', '기본 5개 페이지 제공', '맞춤형 카피라이팅', '검색 최적화 구조', '14일 사후 관리 지원']
    },
    {
        id: 'landing',
        name_en: 'Landing Page',
        name_ko: '랜딩 페이지',
        desc_en: 'A campaign-focused page built to convert visitors into leads or purchases fast.',
        desc_ko: '방문자를 리드나 구매 고객으로 신속하게 전환하도록 최적화된 캠페인 페이지.',
        price: 299,
        features_en: ['High Conversion Layout', 'Single Page structure', 'Lead capture integration', 'Speed optimized', '7-day support SLA'],
        features_ko: ['고전환율 레이아웃', '단일 페이지 구조', '문의/리드 수집 연동', '속도 최적화', '7일 기술 지원 SLA']
    },
    {
        id: 'redesign',
        name_en: 'Redesign',
        name_ko: '사이트 리디자인',
        desc_en: 'Refresh an outdated website into a modern, mobile-first, high-performing experience.',
        desc_ko: '오래된 웹사이트를 최신 모바일 우선 및 고성능 환경으로 탈바꿈합니다.',
        price: 599,
        features_en: ['UI/UX modernization', 'Mobile-first optimization', 'Visual assets updates', 'Security hardening', 'Content audit'],
        features_ko: ['UI/UX 현대화', '모바일 우선 최적화', '시각 에셋 업데이트', '보안 강화', '콘텐츠 진단']
    },
    {
        id: 'copy',
        name_en: 'Copy & Launch',
        name_ko: '카피 및 런칭',
        desc_en: 'Clear brand copy with optimized page structure for search and conversion.',
        desc_ko: '검색과 전환에 최적화된 명확한 브랜드 카피 및 페이지 레이아웃 구조 설계.',
        price: 399,
        features_en: ['Bilingual copywriting', 'CTA optimization', 'Meta tags & SEO scan', 'Basic analytics setup', 'Fast 5-day delivery'],
        features_ko: ['한영 카피라이팅', 'CTA 행동유도문구 최적화', '메타 태그 및 SEO 스캔', '기본 분석도구 연동', '5일 빠른 납품']
    },
    {
        id: 'mvp',
        name_en: 'MVP Site',
        name_ko: 'MVP 웹사이트',
        desc_en: 'Launch a minimal but professional site fast to validate markets and messaging.',
        desc_ko: '시장성과 비즈니스 메시지를 빠르게 검증할 수 있는 미니멀 전문 웹사이트.',
        price: 199,
        features_en: ['Fast MVP setup', '1-2 Pages structure', 'Essential forms setup', 'No-code maintenance', '3-day express delivery'],
        features_ko: ['빠른 MVP 구축', '기본 1-2페이지 구조', '필수 문의 폼 연동', '노코드 유지보수', '3일 초고속 완료']
    }
];

// Page Navigation / Package Selection Routing
function navigate(viewId) {
    // If viewId matches a package, open purchase modal for it!
    const matchedPkg = packageCatalog.find(p => p.id === viewId);
    if (matchedPkg) {
        openPurchaseModal(matchedPkg.id);
        return;
    }

    if (viewId === 'orders') {
        currentView = 'orders';
        document.getElementById('home-view').classList.remove('active');
        document.getElementById('orders-view').classList.add('active');
    } else {
        currentView = 'home';
        document.getElementById('orders-view').classList.remove('active');
        document.getElementById('home-view').classList.add('active');
    }
}

// Toggle Mobile Menu
function toggleMobileMenu() {
    const drawer = document.getElementById('mobile-drawer');
    if (drawer) {
        drawer.classList.toggle('active');
    }
}

// Change Language Redirect
function changeLanguage(lang) {
    localStorage.setItem('bibleforai_lang', lang);
    if (lang === 'ko') {
        if (!window.location.pathname.includes('/kr/')) {
            window.location.href = '/webcreate/kr/';
        }
    } else {
        if (window.location.pathname.includes('/kr/')) {
            window.location.href = '/webcreate/';
        }
    }
}

// Render Packages dynamically under the #packages section
function renderPackages() {
    const section = document.getElementById('packages');
    if (!section) return;
    
    const title = currentLang === 'ko' ? '서비스 패키지' : 'Service Packages';
    const subtitle = currentLang === 'ko' ? '브랜드 웹사이트부터 고전환 랜딩 페이지까지, 목표와 예산에 맞게 선택하세요.' : 'Choose the best web design & development package for your project requirements.';
    
    let html = `
        <h2 class="section-title">${title}</h2>
        <p class="section-subtitle">${subtitle}</p>
        <div class="card-grid" style="margin-top: 2rem;">
    `;
    
    packageCatalog.forEach(pkg => {
        const name = currentLang === 'ko' ? pkg.name_ko : pkg.name_en;
        const desc = currentLang === 'ko' ? pkg.desc_ko : pkg.desc_en;
        const buyBtnText = currentLang === 'ko' ? '주문 시작' : 'Order Now';
        
        html += `
            <div class="data-card" onclick="openPurchaseModal('${pkg.id}')" style="cursor: pointer; position: relative;">
                <div class="card-icon web-${pkg.id}"><i class="fa-solid fa-laptop-code"></i></div>
                <h3>${name}</h3>
                <p>${desc}</p>
                <div style="font-size: 1.5rem; font-weight: 800; margin: 1rem 0; color: var(--primary-cyan);">$${pkg.price}</div>
                <span class="card-link" style="color: var(--primary-cyan); font-weight:600;">
                    <span>${buyBtnText}</span>
                    <i class="fa-solid fa-chevron-right" style="margin-left:5px;"></i>
                </span>
            </div>
        `;
    });
    
    html += `</div>`;
    section.innerHTML = html;
}

// Open Purchase Modal
function openPurchaseModal(packageId) {
    const pkg = packageCatalog.find(p => p.id === packageId);
    if (!pkg) return;
    
    currentPackage = pkg;
    orderQuantity = 1;
    
    // Set UI elements
    const selectEl = document.getElementById('modal-project');
    const priceEl = document.getElementById('modal-total');
    const qtyEl = document.getElementById('modal-qty');
    const emailEl = document.getElementById('modal-email');
    
    if (selectEl) {
        selectEl.innerHTML = packageCatalog.map(p => {
            const name = currentLang === 'ko' ? p.name_ko : p.name_en;
            return `<option value="${p.id}" ${p.id === packageId ? 'selected' : ''}>${name} ($${p.price})</option>`;
        }).join('');
        
        // Listen for change on project selection
        selectEl.onchange = (e) => {
            const selectedId = e.target.value;
            const newPkg = packageCatalog.find(p => p.id === selectedId);
            if (newPkg) {
                currentPackage = newPkg;
                updateModalPrice();
            }
        };
    }
    
    if (qtyEl) {
        qtyEl.value = 1;
    }
    
    updateModalPrice();
    
    // Show Modal
    const modal = document.getElementById('purchase-modal');
    if (modal) {
        modal.classList.add('active');
    }
}

// Close Purchase Modal
function closePurchaseModal() {
    const modal = document.getElementById('purchase-modal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Update Modal Total Price
function updateModalPrice() {
    const qtyEl = document.getElementById('modal-qty');
    if (qtyEl) {
        orderQuantity = parseInt(qtyEl.value) || 1;
        if (orderQuantity < 1) orderQuantity = 1;
    }
    
    if (currentPackage) {
        const total = currentPackage.price * orderQuantity;
        const totalEl = document.getElementById('modal-total');
        if (totalEl) {
            totalEl.textContent = `$${total.toFixed(2)}`;
        }
    }
}

// Trigger Test Checkout (Sandbox Checkout via Price Click)
function triggerTestCheckout() {
    // Fill default values if empty
    const emailInput = document.getElementById('modal-email');
    if (emailInput && !emailInput.value.trim()) {
        emailInput.value = 'sandbox@test.dev';
    }
    
    const timelineInput = document.getElementById('modal-timeline');
    const timelineVal = timelineInput ? timelineInput.value : 'Standard';
    
    const txId = 'WEB-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    const totalPaid = currentPackage ? (currentPackage.price * orderQuantity) : 0;
    const pkgName = currentPackage ? (currentLang === 'ko' ? currentPackage.name_ko : currentPackage.name_en) : 'WEBCREATE';
    
    const orderData = {
        date: new Date().toISOString().split('T')[0],
        id: txId,
        product: `WEBCREATE - ${pkgName.toUpperCase()}`,
        tier: currentPackage ? currentPackage.id.toUpperCase() : '-',
        timeline: timelineVal,
        email: emailInput ? emailInput.value.trim() : 'sandbox@test.dev',
        qty: orderQuantity,
        total: `$${totalPaid.toFixed(2)}`,
        status: 'Paid (Sandbox)'
    };
    
    // Save order
    const orders = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    orders.unshift(orderData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    
    // Render orders
    renderOrders();
    
    // Redirect to Google Forms
    const receiptText = 
`===================================
   BIBLEFORAI - WEBCREATE RECEIPT
===================================
Order Date     : ${orderData.date}
Transaction ID : ${orderData.id}
Customer Email : ${orderData.email}
Product Name   : ${orderData.product}
Timeline Setup : ${orderData.timeline}
Quantity (Pgs) : ${orderData.qty}
Total Paid     : ${orderData.total}
Status         : ${orderData.status}
-----------------------------------
Payment Method : PayPal Secure Checkout
===================================`;

    const encodedReceipt = encodeURIComponent(receiptText);
    const redirectUrl = GOOGLE_FORM_URL + encodedReceipt;
    
    closePurchaseModal();
    window.location.href = redirectUrl;
}

// Render Orders History
function renderOrders() {
    const tbody = document.getElementById('orders-body');
    const noOrdersMsg = document.getElementById('no-orders-msg');
    if (!tbody) return;
    
    const orders = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    if (orders.length === 0) {
        tbody.innerHTML = '';
        if (noOrdersMsg) noOrdersMsg.style.display = 'block';
        return;
    }
    
    if (noOrdersMsg) noOrdersMsg.style.display = 'none';
    
    tbody.innerHTML = orders.map(order => `
        <tr>
            <td>${order.date}</td>
            <td><code>${order.id}</code></td>
            <td>${order.product}</td>
            <td>${order.tier}</td>
            <td>${order.timeline || 'Standard'}</td>
            <td>${order.qty}</td>
            <td><strong>${order.total}</strong></td>
            <td><span class="status-badge active" style="background:#10b981; color:#fff; padding:3px 8px; border-radius:4px; font-size:0.8rem;">${order.status}</span></td>
        </tr>
    `).join('');
}

// Initial Setup
document.addEventListener('DOMContentLoaded', () => {
    // Set active language dropdown
    const selector = document.getElementById('language-selector');
    if (selector) {
        selector.value = currentLang;
    }
    
    // Bind quantity adjustments
    const qtyInput = document.getElementById('modal-qty');
    if (qtyInput) {
        qtyInput.addEventListener('input', updateModalPrice);
        qtyInput.addEventListener('change', updateModalPrice);
    }
    
    // Bind price total click to test checkout
    const totalVal = document.getElementById('modal-total');
    if (totalVal) {
        totalVal.style.cursor = 'pointer';
        totalVal.addEventListener('click', triggerTestCheckout);
    }

    // Bind Order Now button
    const orderBtn = document.getElementById('btn-order');
    if (orderBtn) {
        orderBtn.onclick = (e) => {
            e.preventDefault();
            triggerTestCheckout();
        };
    }
    
    renderPackages();
    renderOrders();
});
