// App State
let currentView = 'home';
let currentPackage = null;
let orderQuantity = 1;

const STORAGE_KEY = 'aideploy_orders';
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
            window.location.href = '/aideploy/kr/';
        }
    } else {
        if (isKrPage) {
            window.location.href = '/aideploy/';
        }
    }
}

// Open Purchase Modal
function openPurchaseModal(packageName, price, productId) {
    currentPackage = {
        name: packageName,
        price: parseFloat(price),
        id: productId
    };
    
    // Set UI elements
    const nameEl = document.getElementById('form-package-name');
    const priceEl = document.getElementById('form-package-price');
    const qtyEl = document.getElementById('form-qty');
    const totalEl = document.getElementById('form-total');
    
    if (nameEl) nameEl.textContent = packageName.toUpperCase();
    if (priceEl) priceEl.textContent = `$${price.toFixed(2)}`;
    if (qtyEl) qtyEl.value = 1;
    
    orderQuantity = 1;
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
    const qtyEl = document.getElementById('form-qty');
    if (qtyEl) {
        orderQuantity = parseInt(qtyEl.value) || 1;
        if (orderQuantity < 1) orderQuantity = 1;
    }
    
    if (currentPackage) {
        const total = currentPackage.price * orderQuantity;
        const totalEl = document.getElementById('form-total');
        if (totalEl) {
            totalEl.textContent = `$${total.toFixed(2)}`;
        }
    }
}

// Trigger Test Checkout (Sandbox Checkout via Price Click)
function triggerTestCheckout() {
    // Fill default values if empty
    const emailInput = document.getElementById('form-email');
    if (emailInput && !emailInput.value.trim()) {
        emailInput.value = 'sandbox@test.dev';
    }
    
    const targetInput = document.getElementById('form-deployment-target');
    const targetVal = targetInput ? targetInput.value : 'AWS ECS';
    
    const txId = 'DEP-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    const totalPaid = currentPackage ? (currentPackage.price * orderQuantity) : 0;
    
    const orderData = {
        date: new Date().toISOString().split('T')[0],
        id: txId,
        product: `AIDEPLOY - ${currentPackage ? currentPackage.name.toUpperCase() : 'AI DEPLOYMENT'}`,
        tier: currentPackage ? currentPackage.name.toUpperCase() : '-',
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
   BIBLEFORAI - AIDEPLOY RECEIPT
===================================
Order Date     : ${orderData.date}
Transaction ID : ${orderData.id}
Customer Email : ${orderData.email}
Product Name   : ${orderData.product}
Deployment     : ${targetVal}
Quantity       : ${orderData.qty}
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

// Handle Form Submission
function handlePurchaseSubmit(event) {
    if (event) event.preventDefault();
    
    const emailInput = document.getElementById('form-email');
    const emailError = document.getElementById('form-email-error');
    
    if (emailInput) {
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            if (emailError) emailError.style.display = 'block';
            return;
        }
    }
    
    if (emailError) emailError.style.display = 'none';
    triggerTestCheckout();
}

// Render Orders History
function renderOrders() {
    const tbody = document.getElementById('orders-tbody');
    if (!tbody) return;
    
    const orders = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    if (orders.length === 0) {
        tbody.innerHTML = `
            <tr id="no-orders-row">
                <td colspan="8" data-i18n="no-orders-msg">
                    ${currentLang === 'ko' ? '구매 기록이 없습니다. 첫 주문을 완료하면 여기에서 확인할 수 있습니다.' : 'No purchase records found. Make your first order to see history here!'}
                </td>
            </tr>
        `;
        return;
    }
    
    tbody.innerHTML = orders.map(order => `
        <tr>
            <td>${order.date}</td>
            <td><code>${order.id}</code></td>
            <td>${order.product}</td>
            <td>${order.tier}</td>
            <td>${order.email}</td>
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
    
    // Bind input events
    const qtyInput = document.getElementById('form-qty');
    if (qtyInput) {
        qtyInput.addEventListener('input', updateModalPrice);
        qtyInput.addEventListener('change', updateModalPrice);
    }
    
    // Bind form submit
    const form = document.getElementById('purchase-form');
    if (form) {
        form.removeAttribute('action');
        form.addEventListener('submit', handlePurchaseSubmit);
    }

    // Add pointer styles to form total for sandbox checkout trigger
    const formTotal = document.getElementById('form-total');
    if (formTotal) {
        formTotal.style.cursor = 'pointer';
        formTotal.addEventListener('click', triggerTestCheckout);
    }
    
    renderOrders();
});
