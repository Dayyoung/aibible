/* Web Application logic for BibleForAI - Boost Your Social Media! */

// Application State
const state = {
    products: [],
    reviews: [],
    cart: [],
    user: null,
    orders: [],
    currentView: 'home',
    selectedProduct: null,
    selectedOption: null,
    paypalSdkLoaded: false
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

// UI rendering functions
const ui = {
    init: function() {
        this.renderHomeFeatured();
        this.renderReviews();
        this.updateCartBadge();
        this.checkAuthStatus();
        this.setupHeaderScroll();
        this.setupFAQ();
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
        
        const catTitles = {
            "Instagram": "Instagram Growth Booster Packs",
            "YouTube": "YouTube Channel Creator Growth",
            "TikTok_X": "TikTok & X (Twitter) Viral Growth",
            "Threads_Facebook": "Threads & Facebook Engagement Packs",
            "SEO_Spotify": "Search Engine Traffic & Spotify Streams"
        };
        
        const catDescs = {
            "Instagram": "Elevate your feed presence with safe, organic Korean & global followers, likes, and Reels views.",
            "YouTube": "Get subscribers, views, and watch hours automatically. Perfect for channel monetization prerequisites.",
            "TikTok_X": "Increase your short-form visibility. Gain followers, post likes, retweets, and views instantly.",
            "Threads_Facebook": "Grow your Threads and Facebook business presence. Establish active, authentic followers and likes.",
            "SEO_Spotify": "Secure playlist saves, artist followers, and USA/Global Spotify streams. Boost Naver & Google organic web traffic."
        };
        
        titleEl.innerHTML = catTitles[catName] || "Social Media Booster Packs";
        descEl.innerHTML = catDescs[catName] || "Customize your growth parameters below.";
        
        const container = document.getElementById('category-products-container');
        container.innerHTML = '';
        
        const filtered = state.products.filter(p => p.category === catName);
        if (filtered.length === 0) {
            container.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding:3rem; color:var(--text-muted);">No products found in this category yet. Please check back soon!</div>`;
            return;
        }
        
        filtered.forEach(prod => {
            container.appendChild(this.createProductCard(prod));
        });
    },

    createProductCard: function(prod) {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-info">
                <div class="product-cat">${prod.category.replace('_', ' & ')}</div>
                <h3 class="product-title">${prod.name}</h3>
                <div class="product-rating">
                    &#9733;&#9733;&#9733;&#9733;&#9733; <span>5.0 (${prod.options ? prod.options.length * 12 : 36})</span>
                </div>
            </div>
            <div class="product-footer">
                <div>
                    <span class="product-price-label">Starting from</span>
                    <div class="product-price">$${prod.price.toFixed(2)}</div>
                </div>
                <button class="btn-primary" onclick="ui.openProductModal('${prod.id}')" style="padding: 0.5rem 1rem; font-size: 0.85rem;">Buy Now</button>
            </div>
        `;
        return card;
    },

    renderReviews: function() {
        const container = document.getElementById('reviews-carousel-container');
        container.innerHTML = '';
        
        state.reviews.forEach(rev => {
            const card = document.createElement('div');
            card.className = 'review-card';
            card.innerHTML = `
                <div class="review-header">
                    <span class="review-author">${rev.author}</span>
                    <span class="review-date">${rev.date}</span>
                </div>
                <div class="review-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                <p class="review-text">"${rev.title}"</p>
                <span class="review-product">${rev.product}</span>
            `;
            container.appendChild(card);
        });
    },

    openProductModal: function(productId) {
        const prod = state.products.find(p => p.id === productId);
        if (!prod) return;
        
        state.selectedProduct = prod;
        document.getElementById('modal-product-name').innerText = prod.name;
        
        // Customize target placeholder/label depending on category
        const inputLabel = document.getElementById('modal-input-label');
        const inputEl = document.getElementById('modal-target-input');
        
        inputEl.value = '';
        inputEl.classList.remove('is-invalid');
        
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

        // Render options select list
        const select = document.getElementById('modal-options-select');
        select.innerHTML = '';
        
        prod.options.forEach(opt => {
            const option = document.createElement('option');
            option.value = opt.id;
            option.innerText = `${opt.label} - $${opt.usd.toFixed(2)}`;
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
            document.getElementById('modal-price-display').innerText = `$${opt.usd.toFixed(2)}`;
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
                                value: state.selectedOption.usd.toString()
                            },
                            description: `${state.selectedProduct.name} - ${state.selectedOption.label}`
                        }]
                    });
                },
                onApprove: function(data, actions) {
                    return actions.order.capture().then(function(details) {
                        const linkInput = document.getElementById('modal-target-input').value.trim();
                        // Order success callback
                        const orderData = {
                            id: details.id,
                            product: `${state.selectedProduct.name} - ${state.selectedOption.label}`,
                            amount: `$${state.selectedOption.usd.toFixed(2)}`,
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
        
        if (state.cart.length === 0) {
            container.innerHTML = `<p style="text-align:center; color:var(--text-muted); padding:2rem;">Your cart is empty.</p>`;
            document.getElementById('cart-subtotal').innerText = "$0.00";
            return;
        }

        let total = 0;
        state.cart.forEach((item, index) => {
            total += item.price;
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
                    <span style="font-family:var(--font-heading); font-weight:700;">$${item.price.toFixed(2)}</span>
                    <button onclick="cart.remove(${index})" style="background:none; border:none; color:#ef4444; font-size:1.25rem; cursor:pointer;">&times;</button>
                </div>
            `;
            container.appendChild(row);
        });

        document.getElementById('cart-subtotal').innerText = `$${total.toFixed(2)}`;
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
            container.innerHTML = `
                <button class="btn-primary" onclick="ui.openAuthModal()">Sign In</button>
            `;
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
    add: function(name, link, price) {
        state.cart.push({ name, link, price });
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
