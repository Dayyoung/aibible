// App State
let currentView = 'home';
let currentPackage = null;
let orderQuantity = 1;
let paypalButtonInstance = null;

// Package Catalog with Doubled Prices
const packageCatalog = {
    phone: {
        title: 'Phone Number Data',
        packages: [
            { id: 'phone-trial', name: 'Trial Package (10K)', desc: 'Test leads for small scale marketing outreach.', price: 160, featured: false, features: ['Excel/CSV Formats', 'Worldwide Country Lists', 'Opt-In Verified', '24/7 Support'] },
            { id: 'phone-100k', name: '100K Package', desc: 'Targeted database for cold calling and SMS.', price: 200, featured: false, features: ['Excel/CSV Formats', 'Opt-in Verified Leads', 'Real-time Scrubbed', 'Priority Support'] },
            { id: 'phone-500k', name: '500K Package', desc: 'Standard business leads package for medium teams.', price: 500, featured: false, features: ['Excel/CSV Formats', 'GDPR Compliant Logs', 'Scrubbed for DNC Lists', 'Dedicated Account Manager'] },
            { id: 'phone-mid', name: '1 Million Package', desc: 'High-volume scrubbing for enterprise scale telemarketing.', price: 800, featured: true, features: ['Excel/CSV Formats', 'High Volume Scrubbed', 'GDPR Compliant', 'VIP Delivery Manager'] },
            { id: 'phone-max', name: '3 Million Package', desc: 'Full country directories for global campaigns and CRM import.', price: 2200, featured: false, features: ['Excel/CSV Formats', 'Full Country Directory', 'Continuous Updates', 'Dedicated Lead Architect'] }
        ]
    },
    whatsapp: {
        title: 'WhatsApp Number Data',
        packages: [
            { id: 'whatsapp-100k', name: '100K Package', desc: 'Clean lists tested for active WhatsApp messenger accounts.', price: 200, featured: false, features: ['WhatsApp Active Checked', 'Profile Pictures Scraped', 'Excel/CSV Format', 'Instant Delivery'] },
            { id: 'whatsapp-500k', name: '500K Package', desc: 'Standard WhatsApp database for message automation campaigns.', price: 480, featured: false, features: ['Active Status Checked', 'Targeted Country Codes', 'GDPR Opt-In Logs', 'Support Included'] },
            { id: 'whatsapp-mid', name: '1 Million Package', desc: 'Global country lists optimized for digital advertising.', price: 900, featured: true, features: ['Global Country Coverage', 'GDPR Opt-In Logs', 'Scrubbed Dead Accounts', 'VIP Delivery Manager'] },
            { id: 'whatsapp-max', name: '3 Million Package', desc: 'Unlimited geographic filtering for ultimate sales pipelines.', price: 2400, featured: false, features: ['Unlimited Geo Filters', 'Custom CRM Schema', 'Weekly Freshness Checks', 'Dedicated Account Executive'] }
        ]
    },
    telegram: {
        title: 'Telegram Number Data',
        packages: [
            { id: 'telegram-trial', name: 'Trial Package (10K)', desc: 'Target crypto users, trading groups, and tech-savvy leads.', price: 180, featured: false, features: ['Telegram Username Lists', 'Crypto & Forex Focus', 'CSV Format', 'Active within 7 days'] },
            { id: 'telegram-100k', name: '100K Package', desc: 'Extract target group members and channels for marketing.', price: 300, featured: false, features: ['Country Filter Option', 'Group Member Extraction', 'Highly Active Users Only', 'Support Included'] },
            { id: 'telegram-500k', name: '500K Package', desc: 'Standard Telegram database for community building.', price: 600, featured: false, features: ['Active Community Members', 'Bio & Username Fields', 'CSV Format', 'Priority Support'] },
            { id: 'telegram-mid', name: '1 Million Package', desc: 'High-volume list of highly active users and user bios.', price: 1000, featured: true, features: ['Bulk Channel Leads', 'Job Details & Bios', 'Daily Freshness Checks', 'VIP Delivery Manager'] },
            { id: 'telegram-max', name: '3 Million Package', desc: 'Full global directory of active Telegram phone records.', price: 2800, featured: false, features: ['Full Global Directory', 'Monthly Verification Checks', 'Custom Geo Filtering', 'Dedicated Account Executive'] }
        ]
    },
    email: {
        title: 'Country Email Data',
        packages: [
            { id: 'email-1m', name: '1 Million Package', desc: 'Clean lists compiled by region for clean deliverability.', price: 300, featured: false, features: ['GDPR Consent Records', 'Zero Spam Traps', 'Excel/CSV Format', 'Instant Download'] },
            { id: 'email-10m', name: '10 Million Package', desc: 'Standard countrywide B2C email marketing database.', price: 1200, featured: false, features: ['Corporate & Personal Emails', 'Bounce Checker Cleared', 'Verified Opt-In Consent', 'Priority Delivery Support'] },
            { id: 'email-20m', name: '20 Million Package', desc: 'High-volume corporate and consumer address databases.', price: 2000, featured: true, features: ['Global Lead Coverage', 'Monthly Freshness Updates', 'Full Contact Bio Data', 'VIP Delivery Manager'] },
            { id: 'email-30m', name: '30 Million Package', desc: 'Massive global lead directory with complete metadata.', price: 2400, featured: false, features: ['Unlimited Geo Filters', 'Company & Bio Fields', 'Weekly Scrubbing Cleared', 'Dedicated Lead Architect'] }
        ]
    },
    clevel: {
        title: 'C-Level Executive Data',
        packages: [
            { id: 'clevel-trial', name: '50K Package', desc: 'High-value executive leads across various corporate divisions.', price: 400, featured: false, features: ['CEO, CFO, CMO Directories', 'Corporate Direct Phone', 'Excel/CSV Formats', 'GDPR Audited Logs'] },
            { id: 'clevel-mid', name: '100K Package', desc: 'Direct access to Founders, CTOs, and Directors worldwide.', price: 600, featured: true, features: ['CTO, CIO, Founder Listings', 'Direct Corporate Emails', 'Company Size & Revenue Filters', 'Priority Support Manager'] },
            { id: 'clevel-max', name: '500K Package', desc: 'Massive global boardroom directory containing validated profiles.', price: 1200, featured: false, features: ['Complete Global Directory', 'Corporate & Board Members', 'Monthly Verification', 'Dedicated Account Executive'] }
        ]
    }
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
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
    Object.keys(packageCatalog).forEach(categoryKey => {
        const categoryData = packageCatalog[categoryKey];
        const container = document.getElementById(`${categoryKey}-packages`);
        if (!container) return;

        container.innerHTML = categoryData.packages.map(pkg => {
            const featuredClass = pkg.featured ? 'featured' : '';
            const badgeIcon = getCategoryIcon(categoryKey);
            
            return `
                <div class="package-card ${featuredClass}">
                    <h3>${pkg.name}</h3>
                    <p class="package-desc">${pkg.desc}</p>
                    <div class="package-price-box">
                        <span class="price">$${pkg.price}</span>
                        <span class="currency">USD</span>
                    </div>
                    <ul class="package-features">
                        ${pkg.features.map(feat => `<li><i class="fa-solid fa-circle-check"></i> ${feat}</li>`).join('')}
                    </ul>
                    <button class="btn-buy" onclick="openPurchaseModal('${categoryKey}', '${pkg.id}')">
                        <i class="${badgeIcon}"></i> Order Package
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
    
    currentPackage = {
        categoryKey: categoryKey,
        categoryName: category.title,
        tierName: pkg.name,
        basePrice: pkg.price
    };
    
    orderQuantity = 1;
    
    // Fill Modal elements
    document.getElementById('modal-product-title').innerText = `${category.title}`;
    document.getElementById('modal-package-name').innerText = pkg.name;
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
        secret = 'EK11QteIhpnSRe3e9F0sXElkrvK0hW8UAu9_PJAd6jw-Y7Xo5Awc5OkUGCztudtazWhr-KU6imgm1Glg';
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
    const receiptText = 
`===================================
   BIBLEFORAI - B2C DATABASE RECEIPT
===================================
Order Date     : ${newOrder.date}
Transaction ID : ${newOrder.id}
Customer Email : ${newOrder.email}
Product Type   : ${newOrder.category}
Package Size   : ${newOrder.package}
Target Country : ${newOrder.country}
Quantity       : ${newOrder.quantity}
Base Price     : $${newOrder.basePrice.toLocaleString()} USD
Total Paid     : ${newOrder.totalPaid}
Status         : ${newOrder.status}
-----------------------------------
Payment Method : PayPal Secure Checkout
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
            <td><span class="status-badge">${order.status}</span></td>
        </tr>
    `).join('');
}
