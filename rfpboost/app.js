const packageCatalog = {
  strategy: {
    title_en: 'RFP Strategy Blueprint',
    title_ko: 'RFP 전략 설계',
    intro_en: 'We map the bid angle, decision criteria, and section outline before you draft a single page.',
    intro_ko: '한 페이지도 쓰기 전에 입찰 포인트, 의사결정 기준, 섹션 구성을 먼저 설계합니다.',
    packages: [
      {
        id: 'strategy-starter',
        name_en: 'Discovery Sprint',
        name_ko: '디스커버리 스프린트',
        desc_en: 'Best for teams that need an urgent bid direction and scope map.',
        desc_ko: '긴급한 입찰 방향과 범위 맵이 필요한 팀을 위한 패키지입니다.',
        price: 180,
        featured: false,
        features_en: ['Bid criteria matrix', 'Outline and section map', 'Global market fit review', '48-hour delivery'],
        features_ko: ['입찰 기준 매트릭스', '목차 및 섹션 맵', '글로벌 시장 적합성 검토', '48시간 내 전달']
      },
      {
        id: 'strategy-growth',
        name_en: 'Bid Map Pro',
        name_ko: '바이드 맵 프로',
        desc_en: 'Balanced strategy package with competitor angle and win themes.',
        desc_ko: '경쟁사 포지셔닝과 승부 포인트까지 포함한 균형형 전략 패키지입니다.',
        price: 360,
        featured: true,
        features_en: ['Win-theme framework', 'Competitive angle analysis', 'Target market positioning', 'Priority support'],
        features_ko: ['승부 포인트 프레임워크', '경쟁사 각도 분석', '타겟 시장 포지셔닝', '우선 지원']
      },
      {
        id: 'strategy-enterprise',
        name_en: 'Go/No-Go Board Pack',
        name_ko: '고/노고 보드 팩',
        desc_en: 'Executive-ready strategy memo for high-value proposals and tenders.',
        desc_ko: '고가치 제안서와 입찰을 위한 경영진 보고용 전략 메모 패키지입니다.',
        price: 720,
        featured: false,
        features_en: ['Board memo', 'Risk & opportunity matrix', 'Section ownership plan', 'Dedicated account manager'],
        features_ko: ['보드 메모', '리스크/기회 매트릭스', '섹션 담당 플랜', '전담 어카운트 매니저']
      }
    ]
  },
  proposal: {
    title_en: 'Executive Proposal Writing',
    title_ko: '제안서 작성',
    intro_en: 'We turn your offer into a sharp business case with a clear value proposition and strong structure.',
    intro_ko: '명확한 가치제안과 강한 구조로 비즈니스 오퍼를 설득력 있는 제안서로 바꿉니다.',
    packages: [
      {
        id: 'proposal-starter',
        name_en: 'Starter Draft',
        name_ko: '스타터 드래프트',
        desc_en: 'A clean first draft for standard business proposals.',
        desc_ko: '표준 비즈니스 제안서를 위한 깔끔한 초안입니다.',
        price: 240,
        featured: false,
        features_en: ['5-8 page draft', 'Executive summary', 'Basic market framing', '2 revision rounds'],
        features_ko: ['5~8페이지 초안', '요약본 포함', '기본 시장 설명', '2회 수정']
      },
      {
        id: 'proposal-pro',
        name_en: 'Professional Proposal',
        name_ko: '프로 제안서',
        desc_en: 'High-conviction proposal with stronger narrative and visuals.',
        desc_ko: '더 강한 내러티브와 시각 자료를 포함한 고설득 제안서입니다.',
        price: 480,
        featured: true,
        features_en: ['10-15 page proposal', 'Value proposition writing', 'Visual hierarchy', 'Fast turnaround'],
        features_ko: ['10~15페이지 제안서', '가치제안 작성', '시각적 위계 구성', '빠른 납기']
      },
      {
        id: 'proposal-elite',
        name_en: 'Boardroom Proposal',
        name_ko: '보드룸 제안서',
        desc_en: 'Executive-grade proposal for enterprise deals and partner pitches.',
        desc_ko: '기업 거래와 파트너 피칭을 위한 임원급 제안서입니다.',
        price: 960,
        featured: false,
        features_en: ['15+ page package', 'Commercial storyline', 'Pricing logic support', 'Senior writer review'],
        features_ko: ['15페이지 이상 패키지', '상업적 스토리라인', '가격 논리 지원', '시니어 검토']
      }
    ]
  },
  tender: {
    title_en: 'Tender Submission Pack',
    title_ko: '입찰 제출 패키지',
    intro_en: 'We prepare submission-ready documents that meet tender logic, format, and compliance expectations.',
    intro_ko: '입찰 논리, 양식, 컴플라이언스 기준에 맞춘 제출용 문서를 준비합니다.',
    packages: [
      {
        id: 'tender-basic',
        name_en: 'Submission Pack',
        name_ko: '제출 팩',
        desc_en: 'Core submission documents and compliance checklist.',
        desc_ko: '핵심 제출 문서와 컴플라이언스 체크리스트를 제공합니다.',
        price: 360,
        featured: false,
        features_en: ['Submission checklist', 'Tender formatting', 'File structure cleanup', '24-hour kick-off'],
        features_ko: ['제출 체크리스트', '입찰 양식 정리', '파일 구조 정돈', '24시간 내 착수']
      },
      {
        id: 'tender-standard',
        name_en: 'Compliance Pack',
        name_ko: '컴플라이언스 팩',
        desc_en: 'Submission pack plus compliance wording and response organization.',
        desc_ko: '제출 팩에 더해 컴플라이언스 문구와 응답 구조를 정리합니다.',
        price: 720,
        featured: true,
        features_en: ['Compliance wording', 'Bid response framework', 'Document QA', 'Priority support'],
        features_ko: ['컴플라이언스 문구', '응답 구조 프레임', '문서 QA', '우선 지원']
      },
      {
        id: 'tender-premium',
        name_en: 'Enterprise Tender Desk',
        name_ko: '엔터프라이즈 입찰 데스크',
        desc_en: 'Full tender desk support for large contracts and cross-border submissions.',
        desc_ko: '대형 계약과 크로스보더 제출을 위한 풀 입찰 데스크 지원입니다.',
        price: 1440,
        featured: false,
        features_en: ['End-to-end submission', 'Bid timeline control', 'Stakeholder messaging', 'Dedicated project lead'],
        features_ko: ['엔드투엔드 제출', '입찰 일정 관리', '이해관계자 메시지', '전담 PM']
      }
    ]
  },
  deck: {
    title_en: 'Executive Pitch Deck',
    title_ko: '임원용 피치덱',
    intro_en: 'We design concise decks that help you sell the proposal in the room, not only on paper.',
    intro_ko: '문서뿐 아니라 회의실에서도 제안을 팔 수 있는 간결한 덱을 설계합니다.',
    packages: [
      {
        id: 'deck-lite',
        name_en: 'Executive Summary Deck',
        name_ko: '임원 요약 덱',
        desc_en: 'A crisp 6-8 slide summary deck for decision makers.',
        desc_ko: '의사결정자를 위한 간결한 6~8장 요약 덱입니다.',
        price: 160,
        featured: false,
        features_en: ['6-8 slides', 'Storyline framing', 'Simple charts', '48-hour delivery'],
        features_ko: ['6~8장 구성', '스토리라인 프레이밍', '간단 차트', '48시간 내 전달']
      },
      {
        id: 'deck-pro',
        name_en: 'Sales Pitch Deck',
        name_ko: '세일즈 피치 덱',
        desc_en: 'A visually stronger deck for partner meetings and client pitches.',
        desc_ko: '파트너 미팅과 고객 피칭에 적합한 시각 중심 덱입니다.',
        price: 320,
        featured: true,
        features_en: ['10-12 slides', 'Visual design polish', 'Messaging cleanup', 'Fast revisions'],
        features_ko: ['10~12장 구성', '비주얼 디자인', '메시지 정리', '빠른 수정']
      },
      {
        id: 'deck-premium',
        name_en: 'Investor Room Deck',
        name_ko: '투자자용 덱',
        desc_en: 'Premium deck with polished graphs and a stronger investment case.',
        desc_ko: '세련된 그래프와 투자 논리를 갖춘 프리미엄 덱입니다.',
        price: 640,
        featured: false,
        features_en: ['12+ slides', 'Data visualization', 'Investment case logic', 'Senior designer review'],
        features_ko: ['12장 이상', '데이터 시각화', '투자 논리 구성', '시니어 디자이너 검토']
      }
    ]
  },
  review: {
    title_en: 'QA, Editing & Localization',
    title_ko: '검수·편집·현지화',
    intro_en: 'We polish grammar, tone, and regional wording so your proposal reads like it was written locally.',
    intro_ko: '문법, 톤, 지역별 표현을 다듬어 현지에서 작성된 문서처럼 보이게 합니다.',
    packages: [
      {
        id: 'review-edit',
        name_en: 'Edit & Proof',
        name_ko: '편집 & 교정',
        desc_en: 'Best for grammar fixes and tone cleanup.',
        desc_ko: '문법 수정과 문체 정리에 적합합니다.',
        price: 120,
        featured: false,
        features_en: ['Grammar and tone', 'Comment cleanup', 'Consistency pass', 'One revision'],
        features_ko: ['문법 및 톤 교정', '주석 정리', '표현 통일', '1회 수정']
      },
      {
        id: 'review-local',
        name_en: 'Localization Pro',
        name_ko: '현지화 프로',
        desc_en: 'Localization for international buyers, partners, and public tenders.',
        desc_ko: '해외 바이어, 파트너, 공공 입찰에 맞춘 현지화 서비스입니다.',
        price: 240,
        featured: true,
        features_en: ['Regional wording', 'Business tone adaptation', 'Terminology alignment', 'Priority support'],
        features_ko: ['지역별 표현', '비즈니스 톤 조정', '용어 정합성', '우선 지원']
      },
      {
        id: 'review-qa',
        name_en: 'Final QA Desk',
        name_ko: '최종 QA 데스크',
        desc_en: 'Final review for submission-ready quality before the deadline.',
        desc_ko: '마감 직전 제출용 품질을 위한 최종 검수 패키지입니다.',
        price: 480,
        featured: false,
        features_en: ['Final quality gate', 'Formatting check', 'Terminology audit', 'Dedicated reviewer'],
        features_ko: ['최종 품질 게이트', '포맷 점검', '용어 감사', '전담 검수']
      }
    ]
  }
};

const translations = {
  en: {
    'logo-subtitle': 'GLOBAL PROPOSALS!',
    'nav-home': 'Home',
    'nav-strategy': 'Strategy',
    'nav-proposal': 'Proposal',
    'nav-tender': 'Tender',
    'nav-deck': 'Deck',
    'nav-review': 'QA',
    'btn-orders': 'My Orders',
    'hero-badge': 'KMONG-Sourced Service',
    'hero-title': 'RFPBOOST — Global Proposal & Tender Writing',
    'hero-desc': 'A business writing service for international bids, proposal decks, and tender submissions with a clean dark UI.',
    'btn-explore': 'Explore Packages',
    'btn-compliance': 'Check Delivery Flow',
    'stat-price': '2x Markup',
    'stat-markets': 'Global Markets',
    'stat-turnaround': 'Fast Turnaround',
    'stat-qa': 'Human QA',
    'sec-cards-title': 'Choose Your Proposal Service Track',
    'sec-cards-subtitle': 'Each track follows the original price × 2 markup rule and is priced in USD.',
    'card-strategy-title': 'RFP Strategy Blueprint',
    'card-strategy-desc': 'Map the bid angle, decision criteria, and outline before you draft.',
    'card-proposal-title': 'Executive Proposal Writing',
    'card-proposal-desc': 'Strong narrative, value proposition, and clear business case writing.',
    'card-tender-title': 'Tender Submission Pack',
    'card-tender-desc': 'Compliance-ready documents, submission structure, and bid logic.',
    'card-deck-title': 'Executive Pitch Deck',
    'card-deck-desc': 'Concise slides that help you sell the proposal in the room.',
    'card-review-title': 'QA, Editing & Localization',
    'card-review-desc': 'Grammar fixes, tone cleanup, and regional wording for local fit.',
    'card-view-pricing': 'View Pricing',
    'view-orders-title': 'My Purchase History',
    'view-orders-sub': 'Review your orders. Records stay in your browser until you clear them.',
    'th-date': 'Order Date',
    'th-order-id': 'Transaction ID',
    'th-product': 'Product',
    'th-tier': 'Package Tier',
    'th-market': 'Target Market',
    'th-qty': 'Quantity',
    'th-total': 'Total Paid',
    'th-status': 'Status',
    'no-orders-msg': 'No purchase records found yet. Place your first order to see it here.',
    'modal-title': 'Configure Order',
    'modal-desc': 'Fill in your details, then pay securely with PayPal.',
    'modal-base-pkg': 'Base Package:',
    'modal-base-price-label': 'Base Price:',
    'modal-email-label': 'Email Address *',
    'modal-email-placeholder': 'name@example.com',
    'modal-email-error': 'Please enter a valid email address.',
    'modal-market-label': 'Target Market:',
    'modal-qty': 'Quantity:',
    'modal-total-amt': 'Total Amount:',
    'modal-test-btn': 'Use test button',
    'badge-ssl': 'SSL Secured Checkout',
    'badge-paypal': 'PayPal Verified',
    'foot-title': 'RFPBOOST — Global Proposal & Tender Writing',
    'foot-copy': '&copy; 2026 BibleForAI. All rights reserved.',
    'foot-contact': 'Contact support: snsherocom@gmail.com',
    'receipt-header': 'RF PBOOST ORDER RECEIPT',
    'receipt-date': 'Order Date',
    'receipt-txid': 'Transaction ID',
    'receipt-email': 'Customer Email',
    'receipt-product': 'Product Type',
    'receipt-size': 'Package Size',
    'receipt-market': 'Target Market',
    'receipt-qty': 'Quantity',
    'receipt-baseprice': 'Base Price',
    'receipt-total': 'Total Paid',
    'receipt-status': 'Status',
    'receipt-method': 'Payment Method',
    'receipt-method-val': 'PayPal'
  },
  ko: {
    'logo-subtitle': '글로벌 제안서!',
    'nav-home': '홈',
    'nav-strategy': '전략',
    'nav-proposal': '제안서',
    'nav-tender': '입찰',
    'nav-deck': '덱',
    'nav-review': 'QA',
    'btn-orders': '내 주문',
    'hero-badge': 'KMONG 기반 서비스',
    'hero-title': 'RFPBOOST — 글로벌 제안서·입찰서 작성',
    'hero-desc': '해외 입찰, 제안서 덱, 제출용 문서를 위한 비즈니스 라이팅 서비스입니다. 다크 UI와 심플한 흐름으로 구성했습니다.',
    'btn-explore': '패키지 보기',
    'btn-compliance': '결제 흐름 확인',
    'stat-price': '2배 마크업',
    'stat-markets': '글로벌 시장',
    'stat-turnaround': '빠른 납기',
    'stat-qa': '사람 검수',
    'sec-cards-title': '원하는 제안서 서비스를 선택하세요',
    'sec-cards-subtitle': '각 서비스는 원가 대비 2배 마크업 규칙을 적용하고 USD로 표시됩니다.',
    'card-strategy-title': 'RFP 전략 설계',
    'card-strategy-desc': '제안 각도, 의사결정 기준, 목차를 먼저 설계합니다.',
    'card-proposal-title': '임원용 제안서 작성',
    'card-proposal-desc': '강한 스토리라인, 가치 제안, 명확한 사업성 문안을 작성합니다.',
    'card-tender-title': '입찰 제출 패키지',
    'card-tender-desc': '제출용 문서, 구조 정리, 입찰 논리를 한 번에 정리합니다.',
    'card-deck-title': '임원용 피치덱',
    'card-deck-desc': '회의실에서 제안을 설득할 수 있는 간결한 슬라이드를 제작합니다.',
    'card-review-title': '검수·편집·현지화',
    'card-review-desc': '문법 교정, 톤 정리, 지역별 표현을 다듬어 현지화합니다.',
    'card-view-pricing': '가격 보기',
    'view-orders-title': '내 구매 내역',
    'view-orders-sub': '주문 내역을 확인하세요. 기록은 브라우저에 저장됩니다.',
    'th-date': '주문 날짜',
    'th-order-id': '거래 ID',
    'th-product': '상품',
    'th-tier': '패키지',
    'th-market': '대상 시장',
    'th-qty': '수량',
    'th-total': '총 결제금액',
    'th-status': '상태',
    'no-orders-msg': '아직 구매 내역이 없습니다. 첫 주문을 진행하면 여기 표시됩니다.',
    'modal-title': '주문 설정',
    'modal-desc': '정보를 입력한 뒤 PayPal로 안전하게 결제하세요.',
    'modal-base-pkg': '기본 패키지:',
    'modal-base-price-label': '기본 가격:',
    'modal-email-label': '이메일 주소 *',
    'modal-email-placeholder': 'name@example.com',
    'modal-email-error': '올바른 이메일 주소를 입력해주세요.',
    'modal-market-label': '대상 시장:',
    'modal-qty': '수량:',
    'modal-total-amt': '총 결제금액:',
    'modal-test-btn': '테스트 버튼 사용',
    'badge-ssl': 'SSL 보안 결제',
    'badge-paypal': 'PayPal 인증',
    'foot-title': 'RFPBOOST — 글로벌 제안서·입찰서 작성',
    'foot-copy': '&copy; 2026 BibleForAI. All rights reserved.',
    'foot-contact': '문의: snsherocom@gmail.com',
    'receipt-header': 'RFPBOOST 주문 영수증',
    'receipt-date': '주문 날짜',
    'receipt-txid': '거래 ID',
    'receipt-email': '고객 이메일',
    'receipt-product': '상품 종류',
    'receipt-size': '패키지 크기',
    'receipt-market': '대상 시장',
    'receipt-qty': '수량',
    'receipt-baseprice': '기본 가격',
    'receipt-total': '총 결제금액',
    'receipt-status': '상태',
    'receipt-method': '결제 수단',
    'receipt-method-val': 'PayPal'
  }
};

let currentLang = (() => {
  const pathLang = window.location.pathname.includes('/kr/') ? 'ko' : null;
  if (pathLang) return pathLang;
  const storedLang = localStorage.getItem('bibleforai_lang');
  if (storedLang) return storedLang;
  return 'en';
})();

let currentPackage = null;
let orderQuantity = 1;

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

function setText(id, text) {
  const el = document.querySelector(`[data-i18n="${id}"]`);
  if (el) el.innerHTML = text;
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

  const dict = translations[currentLang];
  document.documentElement.lang = currentLang === 'ko' ? 'ko' : 'en';
  document.title = currentLang === 'ko'
    ? 'BibleForAI | 글로벌 제안서·입찰서 작성'
    : 'BibleForAI | Global Proposal & Tender Writing';

  document.querySelectorAll('[data-i18n]').forEach(node => {
    const key = node.getAttribute('data-i18n');
    if (dict[key]) node.innerHTML = dict[key];
  });

  const langSelector = document.getElementById('language-selector');
  if (langSelector && langSelector.value !== currentLang) langSelector.value = currentLang;

  const heroDesc = document.querySelector('[data-i18n="hero-desc"]');
  if (heroDesc) heroDesc.innerHTML = dict['hero-desc'];

  const sections = ['strategy', 'proposal', 'tender', 'deck', 'review'];
  sections.forEach(key => {
    const title = document.getElementById(`${key}-title`);
    const sub = document.getElementById(`${key}-sub`);
    if (title) title.textContent = packageCatalog[key][`title_${currentLang}`];
    if (sub) sub.textContent = packageCatalog[key][`intro_${currentLang}`];
  });

  const statMap = {
    'stat-price': 'stat-price',
    'stat-markets': 'stat-markets',
    'stat-turnaround': 'stat-turnaround',
    'stat-qa': 'stat-qa'
  };
  Object.entries(statMap).forEach(([id, key]) => setText(key, dict[key]));

  renderAllPackages();
  renderOrders();
  document.getElementById('modal-product-title') && (document.getElementById('modal-product-title').textContent = dict['modal-title']);
  document.getElementById('modal-product-desc') && (document.getElementById('modal-product-desc').textContent = dict['modal-desc']);
}

function renderAllPackages() {
  Object.keys(packageCatalog).forEach(categoryKey => {
    const categoryData = packageCatalog[categoryKey];
    const container = document.getElementById(`${categoryKey}-packages`);
    if (!container) return;

    container.innerHTML = categoryData.packages.map(pkg => {
      const featuredClass = pkg.featured ? 'featured' : '';
      const features = pkg[`features_${currentLang}`] || pkg.features_en;
      return `
        <div class="package-card ${featuredClass}" onclick="openPurchaseModal('${categoryKey}', '${pkg.id}')">
          ${pkg.featured ? '<div class="featured-badge">Best Value</div>' : ''}
          <h3>${pkg[`name_${currentLang}`]}</h3>
          <p class="package-desc">${pkg[`desc_${currentLang}`]}</p>
          <div class="package-price">${formatPrice(pkg.price)}</div>
          <ul class="package-features">
            ${features.map(item => `<li><i class="fa-solid fa-check"></i> ${item}</li>`).join('')}
          </ul>
          <button class="package-cta">${translations[currentLang]['card-view-pricing']}</button>
        </div>
      `;
    }).join('');
  });
}

function navigate(section) {
  const target = section === 'home' ? document.getElementById('home-section') : document.getElementById(`${section}-section`);
  if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function openPurchaseModal(categoryKey, packageId) {
  const category = packageCatalog[categoryKey];
  const pkg = category.packages.find(item => item.id === packageId);
  if (!pkg) return;

  currentPackage = {
    categoryKey,
    categoryName: category[`title_${currentLang}`],
    tierName: pkg[`name_${currentLang}`],
    basePrice: pkg.price
  };

  orderQuantity = 1;
  document.getElementById('order-quantity').value = '1';
  document.getElementById('modal-package-name').textContent = currentPackage.tierName;
  document.getElementById('modal-base-price').textContent = formatPrice(currentPackage.basePrice);
  document.getElementById('modal-total-price').textContent = formatPrice(currentPackage.basePrice);
  document.getElementById('purchase-modal').classList.add('active');
  initPayPalButtons();
}

function closeModal() {
  document.getElementById('purchase-modal').classList.remove('active');
  const container = document.getElementById('paypal-button-container');
  if (container) container.innerHTML = '';
}

function adjustQty(delta) {
  const qtyInput = document.getElementById('order-quantity');
  orderQuantity = Math.max(1, Number(qtyInput.value || 1) + delta);
  qtyInput.value = String(orderQuantity);
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
}

function updateModalPrice() {
  const qtyInput = document.getElementById('order-quantity');
  orderQuantity = Math.max(1, Number(qtyInput.value || 1));
  qtyInput.value = String(orderQuantity);
  const total = currentPackage ? currentPackage.basePrice * orderQuantity : 0;
  const totalEl = document.getElementById('modal-total-price');
  if (totalEl) totalEl.textContent = formatPrice(total);
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
      emailError.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> ${translations[currentLang]['modal-email-error']}`;
      emailError.style.display = 'block';
    }
    return false;
  }

  emailInput.style.borderColor = 'var(--border)';
  if (emailError) emailError.style.display = 'none';
  return true;
}

function triggerTestCheckout() {
  const emailInput = document.getElementById('order-email');
  if (emailInput && !emailInput.value.trim()) {
    emailInput.value = 'sandbox@test.dev';
  }
  validateEmailField();
  const container = document.getElementById('paypal-button-container');
  if (container) container.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function initPayPalButtons() {
  const container = document.getElementById('paypal-button-container');
  if (!container) return;
  container.innerHTML = '';
  if (typeof paypal === 'undefined') {
    container.innerHTML = '<p style="color:#ef4444;text-align:center;font-size:0.95rem;padding:1rem;font-weight:600;">PayPal system is currently unavailable. Please reload the page.</p>';
    return;
  }

  paypal.Buttons({
    style: { layout: 'vertical', color: 'blue', shape: 'rect', label: 'checkout' },
    onClick: function(data, actions) {
      if (!validateEmailField()) return actions.reject();
      return actions.resolve();
    },
    createOrder: function(data, actions) {
      const selectedMarket = document.getElementById('order-market').value;
      const finalAmount = (currentPackage.basePrice * orderQuantity).toFixed(2);
      return actions.order.create({
        purchase_units: [{
          description: `${currentPackage.categoryName} - ${currentPackage.tierName} [Market: ${selectedMarket}] (Qty: ${orderQuantity})`,
          amount: { currency_code: 'USD', value: finalAmount }
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
  const orderLogs = JSON.parse(localStorage.getItem('rfpboost_orders')) || [];
  const selectedMarket = document.getElementById('order-market').value;
  const emailVal = document.getElementById('order-email') ? document.getElementById('order-email').value.trim() : '';

  const newOrder = {
    date: new Date().toLocaleString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
    }),
    id: details.id,
    email: emailVal,
    category: currentPackage.categoryName,
    package: currentPackage.tierName,
    market: selectedMarket,
    quantity: orderQuantity,
    basePrice: currentPackage.basePrice,
    totalPaid: formatPrice(currentPackage.basePrice * orderQuantity),
    status: 'Completed'
  };

  orderLogs.unshift(newOrder);
  localStorage.setItem('rfpboost_orders', JSON.stringify(orderLogs));
  renderOrders();

  const dict = translations[currentLang];
  const receiptText = `
===================================
   ${dict['receipt-header']}
===================================
${dict['receipt-date'].padEnd(15)} : ${newOrder.date}
${dict['receipt-txid'].padEnd(15)} : ${newOrder.id}
${dict['receipt-email'].padEnd(15)} : ${newOrder.email}
${dict['receipt-product'].padEnd(15)} : ${newOrder.category}
${dict['receipt-size'].padEnd(15)} : ${newOrder.package}
${dict['receipt-market'].padEnd(15)} : ${newOrder.market}
${dict['receipt-qty'].padEnd(15)} : ${newOrder.quantity}
${dict['receipt-baseprice'].padEnd(15)} : ${formatPrice(newOrder.basePrice)}
${dict['receipt-total'].padEnd(15)} : ${newOrder.totalPaid}
${dict['receipt-status'].padEnd(15)} : ${newOrder.status}
-----------------------------------
${dict['receipt-method'].padEnd(15)} : ${dict['receipt-method-val']}
===================================`;

  const encodedReceipt = encodeURIComponent(receiptText);
  const redirectUrl = `https://docs.google.com/forms/d/e/1FAIpQLScMPqbEWWttS5mb1m_krsO_kco24ImpgvYVSbc7zO0nEVmYFw/viewform?entry.1059822061=${encodedReceipt}`;
  window.location.href = redirectUrl;
}

function renderOrders() {
  const orderLogs = JSON.parse(localStorage.getItem('rfpboost_orders')) || [];
  const tbody = document.getElementById('orders-tbody');
  const noOrdersMsg = document.getElementById('no-orders-msg');
  if (!tbody) return;

  if (orderLogs.length === 0) {
    tbody.innerHTML = '';
    if (noOrdersMsg) noOrdersMsg.style.display = 'block';
    return;
  }

  if (noOrdersMsg) noOrdersMsg.style.display = 'none';
  tbody.innerHTML = orderLogs.map(order => `
    <tr>
      <td>${order.date}</td>
      <td class="tx-id">${order.id}</td>
      <td>${order.category}</td>
      <td>${order.package}</td>
      <td>${order.market}</td>
      <td>${order.quantity}</td>
      <td>${order.totalPaid}</td>
      <td><span class="status-completed">${order.status}</span></td>
    </tr>
  `).join('');
}

function changeLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('bibleforai_lang', lang);
  applyTranslations();
}

document.addEventListener('DOMContentLoaded', () => {
  const langSelector = document.getElementById('language-selector');
  if (langSelector) langSelector.value = currentLang;
  applyTranslations();
  renderAllPackages();
  renderOrders();
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeModal();
  });
});

// Expose variables globally to prevent ReferenceErrors in inline HTML scripts/handlers
if (typeof navigate !== 'undefined') { window.navigate = navigate; }
if (typeof currentLang !== 'undefined') { window.currentLang = currentLang; }

window.openPurchaseModal = openPurchaseModal;
window.closeModal = closeModal;
window.adjustQty = adjustQty;
window.changeLanguage = changeLanguage;
