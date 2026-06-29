// App State
let currentView = 'home';
let currentPackage = null;
let orderQuantity = 1;

const STORAGE_KEY = 'salesboost_orders';
const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScMPqbEWWttS5mb1m_krsO_kco24ImpgvYVSbc7zO0nEVmYFw/viewform?entry.1059822061=';

// Determine language preference and path
const isKrPage = window.location.pathname.includes('/kr/');
let preferredLang = localStorage.getItem('bibleforai_lang');

if (!preferredLang) {
    preferredLang = isKrPage ? 'ko' : 'en';
    localStorage.setItem('bibleforai_lang', preferredLang);
}

// Redirect if path language doesn't match localstorage preference
if (preferredLang === 'ko' && !isKrPage) {
    if (window.location.pathname.endsWith('/')) {
        window.location.href = window.location.pathname + 'kr/';
    } else {
        window.location.href = window.location.pathname + '/kr/';
    }
} else if (preferredLang === 'en' && isKrPage) {
    window.location.href = window.location.pathname.replace('/kr/', '/');
}

const currentLang = isKrPage ? 'ko' : 'en';

// Package Catalog
const packageCatalog = [
    {
        id: 'sales-starter',
        name_en: 'Starter — Appointment Setting',
        name_ko: '스타터 — 어포인트먼트 세팅',
        desc_en: 'SDR-driven booking calls for busy sales teams. Target client sourcing and calendar coordination.',
        desc_ko: '바쁜 영업 팀을 위한 SDR 기반 예약 전화 지원. 대상 고객 발굴 및 캘린더 매칭.',
        price: 499,
        featured: false,
        features_en: ['Target Client List (50 accounts)', 'Bilingual SDR outreach script', '10 Qualified Bookings guaranteed', 'Email templates integration', '7-day setup timeline'],
        features_ko: ['타겟 고객 목록 (50개사)', '한영 SDR 아웃리치 스크립트', '10회 검증된 미팅 보장', '이메일 템플릿 연동', '7일 셋업 완료']
    },
    {
        id: 'sales-business',
        name_en: 'Business — Lead Qualification',
        name_ko: '비즈니스 — 리드 검증',
        desc_en: 'ICP-fit scoring and priority routing automation. CRM data cleansing and enrichment.',
        desc_ko: 'ICP 적합성 스코어링 및 우선순위 라우팅 자동화. CRM 데이터 정제 및 정보 보강.',
        price: 999,
        featured: true,
        features_en: ['CRM Integration Setup', 'ICP Scoring System design', '30 Qualified Bookings guaranteed', 'PII redaction safeguards', '15-day priority setup timeline'],
        features_ko: ['CRM 연동 지원', 'ICP 스코어링 시스템 설계', '30회 검증된 미팅 보장', '개인정보 보호 필터', '15일 우선 셋업 완료']
    },
    {
        id: 'sales-enterprise',
        name_en: 'Enterprise — Full Inside Sales',
        name_ko: '엔터프라이즈 — 통합 인사이드 세일즈',
        desc_en: 'Complete pipeline orchestration: cold campaign outreach, inbound qualification, CRM hygiene, and operations.',
        desc_ko: '아웃바운드 캠페인 발송, 인바운드 검증, CRM 위생 관리 및 운영 지원을 포함한 전체 파이프라인 조율.',
        price: 1999,
        featured: false,
        features_en: ['End-to-End Outreach Orchestration', 'Database Sync & Backup', 'Unlimited Qualified Bookings support', 'Dedicated Revenue Ops analyst', '30-day dedicated launch management'],
        features_ko: ['통합 아웃리치 오케스트레이션', '데이터베이스 동기화 및 백업', '무제한 검증된 미팅 지원', '전담 레비뉴옵스 분석가', '30일 전담 런칭 관리']
    }
];

// Page Navigation
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
            window.location.href = '/salesboost/kr/';
        }
    } else {
        if (window.location.pathname.includes('/kr/')) {
            window.location.href = '/salesboost/';
        }
    }
}

// Render Packages dynamically under the #packages section
function renderPackages() {
    const section = document.getElementById('packages');
    if (!section) return;
    
    const title = currentLang === 'ko' ? '서비스 패키지' : 'Service Packages';
    const subtitle = currentLang === 'ko' ? '글로벌 영업 기회 발굴부터 고전환 파이프라인 구축까지 적합한 솔루션을 선택하세요.' : 'Choose the best inside sales & lead generation package for your expansion target.';
    
    let html = `
        <h2 class="section-title">${title}</h2>
        <p class="section-subtitle">${subtitle}</p>
        <div class="package-grid" style="margin-top: 2rem;">
    `;
    
    packageCatalog.forEach(pkg => {
        const name = currentLang === 'ko' ? pkg.name_ko : pkg.name_en;
        const desc = currentLang === 'ko' ? pkg.desc_ko : pkg.desc_en;
        const buyBtnText = currentLang === 'ko' ? '주문 시작' : 'Order Now';
        const bestSellerBadge = (pkg.featured && currentLang === 'ko') ? '<span class="featured-badge" style="background:var(--primary); color:#fff; padding:3px 8px; border-radius:4px; font-size:0.8rem; display:inline-block; margin-bottom:0.5rem;">인기 상품</span>' : (pkg.featured ? '<span class="featured-badge" style="background:var(--primary); color:#fff; padding:3px 8px; border-radius:4px; font-size:0.8rem; display:inline-block; margin-bottom:0.5rem;">Best Seller</span>' : '');
        
        html += `
            <div class="package-card" style="border: 1px solid var(--border); padding: 1.5rem; border-radius: 12px; display:flex; flex-direction:column; justify-content:space-between; min-height:280px; background:var(--bg-card);">
                <div>
                    ${bestSellerBadge}
                    <h3 style="font-size:1.2rem; font-weight:700; margin-bottom:0.5rem; color:#fff;">${name}</h3>
                    <p style="font-size:0.9rem; color:var(--text-muted); margin-bottom:1rem; line-height:1.5;">${desc}</p>
                </div>
                <div>
                    <div style="font-size: 1.6rem; font-weight: 800; color: var(--primary); margin-bottom: 1rem;">$${pkg.price}</div>
                    <button class="btn-buy" onclick="openPurchaseModal('${pkg.id}')" style="width:100%; border:1px solid var(--primary); background:rgba(249,115,22,0.05); color:#fff; padding:10px; border-radius:8px; cursor:pointer;">
                        <span>${buyBtnText}</span>
                        <i class="fa-solid fa-chevron-right" style="margin-left:5px;"></i>
                    </button>
                </div>
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
    const titleEl = document.getElementById('modal-product-title');
    const priceEl = document.getElementById('modal-total-price');
    const qtyEl = document.getElementById('modal-qty');
    const emailEl = document.getElementById('modal-email');
    
    if (titleEl) {
        titleEl.textContent = currentLang === 'ko' ? pkg.name_ko : pkg.name_en;
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
function closeModal() {
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
    
    const timelineEl = document.getElementById('modal-timeline');
    let multiplier = 1.0;
    if (timelineEl && timelineEl.value === 'Rush') {
        multiplier = 1.5;
    }
    
    if (currentPackage) {
        const total = currentPackage.price * orderQuantity * multiplier;
        const totalEl = document.getElementById('modal-total-price');
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
    
    const txId = 'SAL-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    const multiplier = timelineVal === 'Rush' ? 1.5 : 1.0;
    const totalPaid = currentPackage ? (currentPackage.price * orderQuantity * multiplier) : 0;
    const pkgName = currentPackage ? (currentLang === 'ko' ? currentPackage.name_ko : currentPackage.name_en) : 'SALESBOOST';
    
    const orderData = {
        date: new Date().toISOString().split('T')[0],
        id: txId,
        product: `SALESBOOST - ${pkgName.toUpperCase()}`,
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
   BIBLEFORAI - SALESBOOST RECEIPT
===================================
Order Date     : ${orderData.date}
Transaction ID : ${orderData.id}
Customer Email : ${orderData.email}
Product Name   : ${orderData.product}
Timeline SLA   : ${orderData.timeline}
Quantity       : ${orderData.qty}
Total Paid     : ${orderData.total}
Status         : ${orderData.status}
-----------------------------------
Payment Method : PayPal Secure Checkout
===================================`;

    const encodedReceipt = encodeURIComponent(receiptText);
    const redirectUrl = GOOGLE_FORM_URL + encodedReceipt;
    
    closeModal();
    window.location.href = redirectUrl;
}

// Render Orders History
function renderOrders() {
    const tbody = document.getElementById('orders-tbody');
    const noOrdersMsg = document.getElementById('no-orders-row');
    if (!tbody) return;
    
    const orders = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    if (orders.length === 0) {
        tbody.innerHTML = `
            <tr id="no-orders-row">
                <td colspan="7" style="padding:20px; text-align:center; color:var(--text-muted);">No orders found yet. Select a package to start!</td>
            </tr>
        `;
        return;
    }
    
    tbody.innerHTML = orders.map(order => `
        <tr style="border-bottom:1px solid var(--border);">
            <td style="padding:10px;">${order.date}</td>
            <td style="padding:10px;"><code>${order.id}</code></td>
            <td style="padding:10px;">${order.product}</td>
            <td style="padding:10px;">${order.tier}</td>
            <td style="padding:10px;">${order.qty}</td>
            <td style="padding:10px;"><strong>${order.total}</strong></td>
            <td style="padding:10px;"><span style="background:#10b981; color:#fff; padding:3px 8px; border-radius:4px; font-size:0.8rem;">${order.status}</span></td>
        </tr>
    `).join('');
}

// Dummy translations function called by DOMContentLoaded event listener inline
window.applyTranslations = function() {
    // Keep header & selector state
    const selector = document.getElementById('language-selector');
    if (selector) {
        selector.value = currentLang;
    }
}

// Initial Setup
document.addEventListener('DOMContentLoaded', () => {
    // Bind quantity adjustments
    const qtyInput = document.getElementById('modal-qty');
    if (qtyInput) {
        qtyInput.addEventListener('input', updateModalPrice);
        qtyInput.addEventListener('change', updateModalPrice);
    }
    
    const timelineInput = document.getElementById('modal-timeline');
    if (timelineInput) {
        timelineInput.addEventListener('change', updateModalPrice);
    }
    
    // Bind price total click to test checkout
    const totalVal = document.getElementById('modal-total-price');
    if (totalVal) {
        totalVal.style.cursor = 'pointer';
        totalVal.addEventListener('click', triggerTestCheckout);
    }

    renderPackages();
    renderOrders();
});

// Expose variables globally to prevent ReferenceErrors in inline HTML scripts/handlers
if (typeof navigate !== 'undefined') { window.navigate = navigate; }
if (typeof currentLang !== 'undefined') { window.currentLang = currentLang; }
