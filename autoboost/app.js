// App State
let currentView = 'home';
let currentPackage = null;
let orderQuantity = 1;

const STORAGE_KEY = 'autoboost_orders';
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
    const pathParts = window.location.pathname.split('/');
    // Check if the last part is empty (trailing slash)
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
        id: 'auto-starter',
        name_en: 'Starter — API Integration',
        name_ko: '스타터 — API 통합',
        desc_en: 'Connect one core system to OpenAI/Gemini/Claude API. Ideal for simple automated copy or classification.',
        desc_ko: '하나의 핵심 시스템을 OpenAI/Gemini/Claude API에 연결합니다. 간단한 자동 카피 또는 분류에 이상적.',
        price: 199,
        featured: false,
        features_en: ['Single AI API Connection', 'Standard Error Handling', '1 workflow automation', 'Email notification support', '7-day support SLA'],
        features_ko: ['단일 AI API 연결', '표준 에러 핸들링', '1개 워크플로우 자동화', '이메일 알림 지원', '7일 기술 지원 SLA']
    },
    {
        id: 'auto-business',
        name_en: 'Business — Workflow Sync',
        name_ko: '비즈니스 — 워크플로우 동기화',
        desc_en: 'Multi-step process automation connecting CRM, sheets, and AI agents. Perfect for marketing and operations teams.',
        desc_ko: 'CRM, 시트, AI 에이전트를 연결하는 다단계 프로세스 자동화. 마케팅 및 운영 팀에 최적.',
        price: 499,
        featured: true,
        features_en: ['Up to 3 Automated Workflows', 'Multi-model routing setup', 'PII redaction safeguards', 'Custom webhooks & API keys', '15-day priority support'],
        features_ko: ['최대 3개 워크플로우 자동화', '멀티 모델 라우팅 구성', '개인정보 비식별화 처리', '커스텀 웹훅 및 API 키', '15일 우선 기술 지원']
    },
    {
        id: 'auto-enterprise',
        name_en: 'Enterprise — Full Operations Suite',
        name_ko: '엔터프라이즈 — 비즈니스 자동화',
        desc_en: 'End-to-end intelligent orchestration of business operations with database sync, custom rules, and human escalation gates.',
        desc_ko: '데이터베이스 동기화, 커스텀 규칙, 사람 검수 단계를 결합한 전사적 비즈니스 프로세스 지능형 자동화.',
        price: 999,
        featured: false,
        features_en: ['Unlimited Orchestrated Steps', 'Database Sync & Backup', 'Custom AI Agent development', 'Security auditing & keys vaulting', '30-day dedicated engineer support'],
        features_ko: ['무제한 오케스트레이션 단계', '데이터베이스 동기화 및 백업', '전용 AI 에이전트 개발', '보안 감사 및 키 보관', '30일 전담 엔지니어 지원']
    }
];

// Page Navigation
function navigate(viewId) {
    currentView = viewId;
    
    // Toggle active sections
    document.querySelectorAll('.view-section').forEach(section => {
        section.classList.remove('active');
    });
    const targetSection = document.getElementById(`${viewId}-view`);
    if (targetSection) {
        targetSection.classList.add('active');
    }

    // Toggle active nav links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
    });
    const activeLink = document.getElementById(`nav-${viewId}`);
    if (activeLink) {
        activeLink.classList.add('active');
    }

    // Close mobile drawer if open
    const drawer = document.getElementById('mobile-drawer');
    if (drawer) {
        drawer.classList.remove('active');
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
        if (!isKrPage) {
            window.location.href = '/autoboost/kr/';
        }
    } else {
        if (isKrPage) {
            window.location.href = '/autoboost/';
        }
    }
}

// Render Packages Tiers
function renderPackages() {
    const grid = document.getElementById('packages-grid');
    if (!grid) return;
    
    grid.innerHTML = packageCatalog.map(pkg => {
        const name = currentLang === 'ko' ? pkg.name_ko : pkg.name_en;
        const desc = currentLang === 'ko' ? pkg.desc_ko : pkg.desc_en;
        const features = currentLang === 'ko' ? pkg.features_ko : pkg.features_en;
        const buyBtnText = currentLang === 'ko' ? '주문 시작' : 'Order Now';
        const bestSellerBadge = (pkg.featured && currentLang === 'ko') ? '<span class="featured-badge">인기 상품</span>' : (pkg.featured ? '<span class="featured-badge">Best Seller</span>' : '');
        
        return `
            <div class="package-card ${pkg.featured ? 'featured' : ''}">
                ${bestSellerBadge}
                <div class="package-header">
                    <h3>${name}</h3>
                    <div class="package-price"><span class="price-value">$${pkg.price}</span> <span class="price-period">/ setup</span></div>
                    <div class="package-desc">${desc}</div>
                </div>
                <ul class="feature-list">
                    ${features.map(feat => `<li><i class="fa-solid fa-check"></i> <span>${feat}</span></li>`).join('')}
                </ul>
                <button class="btn-buy" onclick="openPurchaseModal('${pkg.id}')">
                    <span>${buyBtnText}</span> <i class="fa-solid fa-cart-shopping"></i>
                </button>
            </div>
        `;
    }).join('');
}

// Open Purchase Modal
function openPurchaseModal(packageId) {
    const pkg = packageCatalog.find(p => p.id === packageId);
    if (!pkg) return;
    
    currentPackage = pkg;
    orderQuantity = 1;
    
    // Set UI elements
    const nameEl = document.getElementById('modal-package-name');
    const priceEl = document.getElementById('modal-base-price');
    const qtyEl = document.getElementById('order-quantity');
    
    if (nameEl) nameEl.textContent = currentLang === 'ko' ? pkg.name_ko : pkg.name_en;
    if (priceEl) priceEl.textContent = `$${pkg.price.toFixed(2)}`;
    if (qtyEl) qtyEl.value = 1;
    
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

// Adjust Quantity (+1 / -1 buttons)
function adjustQty(amount) {
    const qtyEl = document.getElementById('order-quantity');
    if (qtyEl) {
        let val = parseInt(qtyEl.value) || 1;
        val += amount;
        if (val < 1) val = 1;
        qtyEl.value = val;
        updateModalPrice();
    }
}

// Update Modal Total Price
function updateModalPrice() {
    const qtyEl = document.getElementById('order-quantity');
    if (qtyEl) {
        orderQuantity = parseInt(qtyEl.value) || 1;
        if (orderQuantity < 1) orderQuantity = 1;
    }
    
    if (currentPackage) {
        const total = currentPackage.price * orderQuantity;
        const totalEl = document.getElementById('modal-total-price');
        if (totalEl) {
            totalEl.textContent = `$${total.toFixed(2)}`;
        }
    }
}

// Trigger Test Checkout (Sandbox Checkout via Price Click)
function triggerTestCheckout() {
    // Fill default values if empty
    const emailInput = document.getElementById('order-email');
    if (emailInput && !emailInput.value.trim()) {
        emailInput.value = 'sandbox@test.dev';
    }
    
    const scopeInput = document.getElementById('order-scope');
    const scopeVal = scopeInput ? scopeInput.value : 'Customer Support Automation';
    
    const txId = 'AUT-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    const totalPaid = currentPackage ? (currentPackage.price * orderQuantity) : 0;
    const pkgName = currentPackage ? (currentLang === 'ko' ? currentPackage.name_ko : currentPackage.name_en) : 'AI AUTOMATION';
    
    const orderData = {
        date: new Date().toISOString().split('T')[0],
        id: txId,
        product: `AUTOBOOST - ${pkgName.toUpperCase()}`,
        tier: currentPackage ? currentPackage.id.replace('auto-', '').toUpperCase() : '-',
        scope: scopeVal,
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
   BIBLEFORAI - AUTOBOOST RECEIPT
===================================
Order Date     : ${orderData.date}
Transaction ID : ${orderData.id}
Customer Email : ${orderData.email}
Product Name   : ${orderData.product}
Workflow Scope : ${orderData.scope}
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
            <td>${order.scope}</td>
            <td>${order.qty}</td>
            <td><strong>${order.total}</strong></td>
            <td><span class="status-badge active">${order.status}</span></td>
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
    
    renderPackages();
    renderOrders();
});

// Expose variables globally to prevent ReferenceErrors in inline HTML scripts/handlers
if (typeof navigate !== 'undefined') { window.navigate = navigate; }
if (typeof currentLang !== 'undefined') { window.currentLang = currentLang; }
