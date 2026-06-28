// App State
let currentView = 'home';
let currentPackage = null;
let orderQuantity = 1;
let paypalButtonInstance = null;

// Package Catalog with Localized Keys
const packageCatalog = {
    workflow: {
        title_en: 'AI Workflow Automation',
        title_ko: 'AI 업무 자동화',
        packages: [
            { id: 'flow-starter', name_en: 'Starter — Single Workflow', name_ko: '스타터 — 단일 워크플로우', desc_en: 'One automation workflow built with n8n, Make, or Zapier. Includes email notifications and basic data sync.', desc_ko: 'n8n, Make, Zapier 중 하나로 구축하는 단일 자동화 워크플로우. 이메일 알림과 기본 데이터 동기화 포함.', price: 500, featured: false, features_en: ['1 Automation Workflow', 'n8n / Make / Zapier', 'Email Notifications', 'Basic Data Sync', '14-Day Support'], features_ko: ['자동화 워크플로우 1개', 'n8n / Make / Zapier 선택', '이메일 알림 연동', '기본 데이터 동기화', '14일 기술 지원'] },
            { id: 'flow-business', name_en: 'Business — 3 Workflows', name_ko: '비즈니스 — 워크플로우 3개', desc_en: 'Three interconnected workflows for CRM sync, lead capture, and reporting. Perfect for small businesses.', desc_ko: 'CRM 연동, 리드 수집, 보고서 자동화를 위한 연계 워크플로우 3종. 소규모 비즈니스에 최적.', price: 1200, featured: true, features_en: ['3 Interconnected Workflows', 'CRM Integration', 'Lead Capture & Enrichment', 'Dashboard Reporting', '30-Day Support'], features_ko: ['연계 워크플로우 3종', 'CRM 연동 지원', '리드 수집 및 데이터 보강', '대시보드 리포트 자동화', '30일 기술 지원'] },
            { id: 'flow-enterprise', name_en: 'Enterprise — Full Automation Suite', name_ko: '엔터프라이즈 — 전체 자동화', desc_en: 'Complete business process automation. Multi-department workflows, custom API integrations, and AI decision nodes.', desc_ko: '전사 비즈니스 프로세스 자동화. 부서간 워크플로우, 커스텀 API 통합, AI 의사결정 노드 포함.', price: 2500, featured: false, features_en: ['Unlimited Workflows', 'Custom API Integration', 'AI Decision Nodes', 'Multi-Department Sync', 'Dedicated Solutions Architect'], features_ko: ['무제한 워크플로우', '커스텀 API 통합', 'AI 의사결정 노드', '부서간 데이터 동기화', '전담 솔루션 아키텍트'] },
            { id: 'flow-custom', name_en: 'Custom — Tailored Solution', name_ko: '커스텀 — 맞춤형 솔루션', desc_en: 'Fully tailored automation system. Custom development, on-premise deployment, and white-label solutions for agencies.', desc_ko: '완전 맞춤형 자동화 시스템. 커스텀 개발, 온프레미스 배포, 에이전시용 화이트라벨 솔루션.', price: 5000, featured: false, features_en: ['White-Label Ready', 'On-Premise Deployment', 'Custom Coding (Python/JS)', 'API Gateway Setup', 'Lifetime Maintenance'], features_ko: ['화이트라벨 제공', '온프레미스 배포', '커스텀 코딩 (Python/JS)', 'API 게이트웨이 구축', '평생 유지보수'] }
        ]
    }
};

// Translation Dictionary
const translations = {
    en: {
        "logo-subtitle": "WORKFLOW AUTOMATION!",
        "nav-home": "Home",
        "nav-workflow": "Workflows",
        "btn-orders": "My Orders",
        "hero-badge": "AI-Powered Automation",
        "hero-title": "BibleForAI - FLOWBOOST!",
        "hero-desc": "Automate repetitive business tasks with n8n, Make & Zapier workflows powered by AI.",
        "btn-explore": "Explore Workflows",
        "btn-compliance": "How It Works",
        
        "stat-automations": "Automations Built",
        "stat-time-saved": "Avg. Time Saved",
        "stat-accuracy": "Execution Accuracy",
        "stat-support": "Post-Launch Support",
        
        "sec-channels-title": "Our Workflow Automation Solutions",
        "sec-channels-subtitle": "From simple email triggers to enterprise-grade multi-department process automation — built with leading no-code and low-code platforms.",
        "card-workflow-title": "Workflow Automation",
        "card-workflow-desc": "End-to-end automation workflows connecting your CRM, email, spreadsheets, and 2000+ apps with n8n, Make, and Zapier.",
        "card-integration-title": "API & Custom Integration",
        "card-integration-desc": "Custom API development and third-party integrations for proprietary systems, legacy software, and enterprise tools.",
        "card-ai-title": "AI Decision Automation",
        "card-ai-desc": "Embed AI-powered decision nodes into your workflows with OpenAI, Claude, and custom ML models for intelligent process routing.",
        "card-reporting-title": "Automated Reporting",
        "card-reporting-desc": "Real-time dashboards, scheduled reports, and KPI tracking delivered to Slack, email, or Google Sheets automatically.",
        "card-scaling-title": "Scaling & Maintenance",
        "card-scaling-desc": "Ongoing workflow optimization, error handling, monitoring, and scaling as your business processes grow in complexity.",
        "card-view-pricing": "View Pricing",
        
        "comp-title": "Enterprise-Grade Workflow Infrastructure",
        "comp-desc": "Our AI workflow automation system uses battle-tested platforms (n8n, Make, Zapier) combined with custom code nodes to create resilient, scalable business process automation.",
        "comp-bullet1-bold": "Platform Agnostic:",
        "comp-bullet1-text": "Works across n8n, Make (Integromat), and Zapier — choose the best tool for each workflow.",
        "comp-bullet2-bold": "Error-Proof Design:",
        "comp-bullet2-text": "Every workflow includes error handling, retry logic, and Slack/email alerting for failed executions.",
        "comp-bullet3-bold": "Enterprise Security:",
        "comp-bullet3-text": "SOC 2 compliant platforms, encrypted credential storage, and role-based access controls.",
        
        "view-workflow-sub": "Browse pre-built and custom workflow automation packages. From single process automation to full enterprise suites.",
        "view-orders-title": "My Purchase History",
        "view-orders-sub": "Review your successful orders. Your data is stored locally in your browser workspace.",
        
        "th-date": "Order Date",
        "th-order-id": "Transaction ID",
        "th-product": "Product",
        "th-tier": "Package Tier",
        "th-platform": "Platform",
        "th-qty": "Quantity",
        "th-total": "Total Paid",
        "th-status": "Status",
        
        "no-orders-msg": "No purchase records found. Make your first order to see history here!",
        
        "modal-title": "Configure Order",
        "modal-desc": "Select your preferred automation platform and complete secure PayPal payment.",
        "modal-base-pkg": "Base Package:",
        "modal-base-price-label": "Base Price:",
        "modal-email-label": "Email Address *",
        "modal-email-placeholder": "name@example.com",
        "modal-email-error": "Please enter a valid email address.",
        "modal-platform-label": "Preferred Platform:",
        "modal-qty": "Quantity:",
        "modal-total-amt": "Total Amount:",
        "modal-test-btn": "Click price to test checkout",
        
        "badge-ssl": "SSL Secured Checkout",
        "badge-paypal": "PayPal Verified",
        
        "foot-channels": "Workflow Solutions",
        "foot-legal": "Platform & Security",
        "foot-gdpr": "n8n / Make / Zapier Experts",
        "foot-canspam": "Custom API Integrations",
        "foot-match": "99.9% Uptime SLA",
        "foot-contact": "Contact support: snsherocom@gmail.com",
        "foot-copy": "&copy; 2026 BibleForAI FLOWBOOST. All rights reserved. AI Workflow Automation.",
        
        "order-button": "Order Package",
        "featured-badge": "Best Seller",
        
        // Receipts
        "receipt-header": "BIBLEFORAI - FLOWBOOST RECEIPT",
        "receipt-date": "Order Date",
        "receipt-txid": "Transaction ID",
        "receipt-email": "Customer Email",
        "receipt-type": "Product Type",
        "receipt-size": "Package Size",
        "receipt-platform": "Platform",
        "receipt-qty": "Quantity",
        "receipt-baseprice": "Base Price",
        "receipt-total": "Total Paid",
        "receipt-status": "Status",
        "receipt-method": "Payment Method",
        "receipt-method-val": "PayPal Secure Checkout"
    },
    ko: {
        "logo-subtitle": "업무 자동화!",
        "nav-home": "홈",
        "nav-workflow": "워크플로우",
        "btn-orders": "내 주문 내역",
        "hero-badge": "AI 기반 자동화",
        "hero-title": "BibleForAI - FLOWBOOST!",
        "hero-desc": "n8n, Make, Zapier로 반복적인 업무를 AI 기반 워크플로우로 자동화하세요.",
        "btn-explore": "워크플로우 둘러보기",
        "btn-compliance": "작동 방식",
        
        "stat-automations": "구축 자동화 수",
        "stat-time-saved": "평균 시간 절감",
        "stat-accuracy": "실행 정확도",
        "stat-support": "사후 기술 지원",
        
        "sec-channels-title": "워크플로우 자동화 솔루션",
        "sec-channels-subtitle": "간단한 이메일 트리거부터 전사적 멀티부서 프로세스 자동화까지 — 검증된 노코드 및 로우코드 플랫폼으로 구축합니다.",
        "card-workflow-title": "워크플로우 자동화",
        "card-workflow-desc": "CRM, 이메일, 스프레드시트, 2000개 이상의 앱을 연결하는 엔드투엔드 자동화 워크플로우를 n8n, Make, Zapier로 구축합니다.",
        "card-integration-title": "API 및 커스텀 통합",
        "card-integration-desc": "독자 시스템, 레거시 소프트웨어, 엔터프라이즈 도구를 위한 맞춤형 API 개발 및 서드파티 통합.",
        "card-ai-title": "AI 의사결정 자동화",
        "card-ai-desc": "OpenAI, Claude, 커스텀 ML 모델을 활용한 AI 의사결정 노드를 워크플로우에 탑재하여 지능형 프로세스 라우팅을 구현합니다.",
        "card-reporting-title": "자동화 보고서",
        "card-reporting-desc": "실시간 대시보드, 예약 보고서, KPI 추적을 Slack, 이메일, Google Sheets로 자동 전달합니다.",
        "card-scaling-title": "확장 및 유지보수",
        "card-scaling-desc": "비즈니스 프로세스가 복잡해짐에 따라 지속적인 워크플로우 최적화, 오류 처리, 모니터링 및 확장을 지원합니다.",
        "card-view-pricing": "가격 확인하기",
        
        "comp-title": "엔터프라이즈급 워크플로우 인프라",
        "comp-desc": "당사의 AI 워크플로우 자동화 시스템은 검증된 플랫폼(n8n, Make, Zapier)과 커스텀 코드 노드를 결합하여 복원력 있고 확장 가능한 비즈니스 프로세스 자동화를 구현합니다.",
        "comp-bullet1-bold": "플랫폼 독립적:",
        "comp-bullet1-text": "n8n, Make(Integromat), Zapier 등 모든 플랫폼에서 작동 — 워크플로우별 최적의 도구를 선택합니다.",
        "comp-bullet2-bold": "오류 방지 설계:",
        "comp-bullet2-text": "모든 워크플로우에 오류 처리, 재시도 로직, 실패 알림(Slack/이메일)이 내장되어 있습니다.",
        "comp-bullet3-bold": "기업용 보안:",
        "comp-bullet3-text": "SOC 2 규격 준수 플랫폼, 암호화된 자격증명 저장소, 역할 기반 접근 제어를 지원합니다.",
        
        "view-workflow-sub": "사전 구축된 템플릿과 커스텀 워크플로우 자동화 패키지를 둘러보세요. 단일 프로세스 자동화부터 전사적 솔루션까지.",
        "view-orders-title": "내 구매 히스토리",
        "view-orders-sub": "성공한 주문 내역을 검토하세요. 데이터는 브라우저 로컬스토리지에 안전하게 보관됩니다.",
        
        "th-date": "주문 날짜",
        "th-order-id": "트랜잭션 ID",
        "th-product": "상품명",
        "th-tier": "패키지 등급",
        "th-platform": "플랫폼",
        "th-qty": "수량",
        "th-total": "총 결제금액",
        "th-status": "상태",
        
        "no-orders-msg": "구매 기록이 없습니다. 첫 주문을 완료하시면 내역이 여기에 표시됩니다!",
        
        "modal-title": "주문 설정",
        "modal-desc": "선호하는 자동화 플랫폼을 선택하고 안전한 PayPal 결제를 진행하세요.",
        "modal-base-pkg": "기본 패키지:",
        "modal-base-price-label": "기본 가격:",
        "modal-email-label": "이메일 주소 *",
        "modal-email-placeholder": "name@example.com",
        "modal-email-error": "올바른 이메일 주소를 입력해주세요.",
        "modal-platform-label": "선호 플랫폼:",
        "modal-qty": "수량:",
        "modal-total-amt": "총 결제금액:",
        "modal-test-btn": "가격 텍스트를 눌러 테스트 결제",
        
        "badge-ssl": "SSL 보안 결제 지원",
        "badge-paypal": "PayPal 인증됨",
        
        "foot-channels": "워크플로우 솔루션",
        "foot-legal": "플랫폼 및 보안",
        "foot-gdpr": "n8n / Make / Zapier 전문가",
        "foot-canspam": "커스텀 API 통합",
        "foot-match": "99.9% 가동률 SLA",
        "foot-contact": "문의 지원: snsherocom@gmail.com",
        "foot-copy": "&copy; 2026 BibleForAI FLOWBOOST. All rights reserved. AI 업무 자동화.",
        
        "order-button": "패키지 주문하기",
        "featured-badge": "베스트 셀러",
        
        // Receipts
        "receipt-header": "BIBLEFORAI - FLOWBOOST 영수증",
        "receipt-date": "주문 날짜",
        "receipt-txid": "거래 ID",
        "receipt-email": "고객 이메일",
        "receipt-type": "상품 종류",
        "receipt-size": "패키지 크기",
        "receipt-platform": "플랫폼",
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
    
    document.documentElement.lang = lang;
    
    document.title = isKo ? "BibleForAI - FLOWBOOST | AI 업무 자동화" : "BibleForAI - FLOWBOOST | AI Workflow Automation";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.content = isKo ? 
            "n8n, Make, Zapier를 활용한 AI 기반 비즈니스 워크플로우 자동화. 반복 업무, CRM 연동, 보고서 자동화를 전문가가 구축해드립니다." : 
            "AI-powered business workflow automation with n8n, Make & Zapier. Automate repetitive tasks, CRM sync, and reporting built by experts.";
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
        ogTitle.content = isKo ? "BibleForAI - FLOWBOOST | AI 업무 자동화" : "BibleForAI - FLOWBOOST | AI Workflow Automation";
    }
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
        ogDesc.content = isKo ? 
            "n8n, Make, Zapier로 반복 업무를 AI 기반 워크플로우로 자동화하세요. CRM 연동, API 통합, 보고서 자동화 전문가 구축." : 
            "Automate repetitive business tasks with n8n, Make & Zapier. CRM integration, API development, and reporting automation by experts.";
    }
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) {
        twTitle.content = isKo ? "BibleForAI - FLOWBOOST | AI 업무 자동화" : "BibleForAI - FLOWBOOST | AI Workflow Automation";
    }
    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) {
        twDesc.content = isKo ? 
            "n8n, Make, Zapier로 반복 업무를 AI 기반 워크플로우로 자동화하세요. CRM 연동, API 통합, 보고서 자동화 전문가 구축." : 
            "Automate repetitive business tasks with n8n, Make & Zapier. CRM integration, API development, and reporting automation by experts.";
    }

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

document.addEventListener('DOMContentLoaded', () => {
    applyTranslations();
    renderAllPackages();
    renderOrders();
    setupHeaderScroll();
});

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

function navigate(viewId) {
    currentView = viewId;
    
    document.querySelectorAll('.view-section').forEach(sec => {
        sec.classList.remove('active');
    });
    
    const activeSection = document.getElementById(`${viewId}-view`);
    if (activeSection) {
        activeSection.classList.add('active');
    }
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.id === `nav-${viewId}`) {
            link.classList.add('active');
        }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleMobileMenu() {
    const drawer = document.getElementById('mobile-drawer');
    drawer.classList.toggle('active');
}

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
        case 'workflow': return 'fa-solid fa-diagram-project';
        default: return 'fa-solid fa-gears';
    }
}

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
    
    document.getElementById('modal-product-title').innerText = `${catTitle}`;
    document.getElementById('modal-package-name').innerText = pkgName;
    document.getElementById('modal-base-price').innerText = formatPrice(pkg.price);
    document.getElementById('order-quantity').value = orderQuantity;
    
    const emailInput = document.getElementById('order-email');
    if (emailInput) {
        emailInput.value = '';
        emailInput.style.borderColor = 'var(--border)';
    }
    const emailError = document.getElementById('email-error');
    if (emailError) {
        emailError.style.display = 'none';
    }
    
    const testBtn = document.getElementById('paypal-test-button');
    if (testBtn) {
        testBtn.style.display = 'block';
    }
    
    updateModalPrice();
    
    document.getElementById('purchase-modal').classList.add('active');
    
    // Auto-scroll to show PayPal button
    setTimeout(() => {
        const modalCard = document.querySelector('.modal-card');
        const totalBox = document.querySelector('.total-price-box');
        if (modalCard && totalBox) {
            modalCard.scrollTop = totalBox.offsetTop - 10;
        }
    }, 800);
    
    initPayPalButtons();
}

function closeModal() {
    document.getElementById('purchase-modal').classList.remove('active');
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
            const selectedPlatform = document.getElementById('order-platform').value;
            const finalAmount = (currentPackage.basePrice * orderQuantity).toFixed(2);
            return actions.order.create({
                purchase_units: [{
                    description: `${currentPackage.categoryName} - ${currentPackage.tierName} [Platform: ${selectedPlatform}] (Qty: ${orderQuantity})`,
                    amount: {
                        currency_code: 'USD',
                        value: finalAmount
                    }
                }]
            });
        },
        onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
                saveLocalOrder(details);
                closeModal();
            });
        },
        onError: function(err) {
            console.error('PayPal Checkout error:', err);
            alert('An error occurred during payment processing. Please try again.');
        }
    }).render('#paypal-button-container');
}

function saveLocalOrder(details) {
    const orderLogs = JSON.parse(localStorage.getItem('flowboost_orders')) || [];
    const selectedPlatform = document.getElementById('order-platform').value;
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
        platform: selectedPlatform,
        quantity: orderQuantity,
        basePrice: currentPackage.basePrice,
        totalPaid: formatPrice(currentPackage.basePrice * orderQuantity),
        status: 'Completed',
        clientId: clientId,
        secret: secret
    };
    
    orderLogs.unshift(newOrder);
    localStorage.setItem('flowboost_orders', JSON.stringify(orderLogs));
    
    renderOrders();
    
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
${dict["receipt-platform"].padEnd(15)} : ${newOrder.platform}
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

function renderOrders() {
    const orderLogs = JSON.parse(localStorage.getItem('flowboost_orders')) || [];
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
            <td>${order.platform || 'n8n'}</td>
            <td>${order.quantity}</td>
            <td><strong>${order.totalPaid}</strong></td>
            <td><span class="status-badge">${isKo ? "완료됨" : order.status}</span></td>
        </tr>
    `).join('');
}
