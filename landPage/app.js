// App State
let currentView = 'home';
let currentPackage = null;
let orderQuantity = 1;
let paypalButtonInstance = null;
let selectedCategory = 'all';

// Design categories metadata
const categories = {
    all: { en: "All Styles", ko: "전체 스타일" },
    ai: { en: "AI & LLM", ko: "AI & LLM 플랫폼" },
    dev: { en: "Dev Tools & IDEs", ko: "개발 툴 & IDE" },
    db: { en: "Backend & DB", ko: "백엔드 & DB" },
    saas: { en: "SaaS & Productivity", ko: "SaaS & 생산성" },
    design: { en: "Design & Creative", ko: "디자인 & 크리에이티브" },
    fintech: { en: "Fintech & Crypto", ko: "핀테크 & 크립토" },
    retail: { en: "E-commerce & Retail", ko: "쇼핑 & 리테일" },
    media: { en: "Tech & Media", ko: "테크 & 미디어" },
    auto: { en: "Automotive", ko: "자동차" },
    retro: { en: "Retro Web", ko: "레트로 웹" }
};

// Design Style Specification templates (benchmarked from VoltAgent/awesome-design-md)
// Dynamic generation is used to create fully detailed DESIGN.md markdown for all 73 brands
const brandStyles = {
    // AI & LLM Platforms
    claude: {
        category: 'ai',
        domain: 'anthropic.com',
        popularity: 95,
        name_en: 'Claude',
        name_ko: 'Claude (클로드)',
        desc_en: "Anthropic's AI assistant. Warm beige/terracotta accent, clean editorial layout.",
        desc_ko: "앤트로픽의 AI 어시스턴트 스타일. 따뜻한 베이지 및 테라코타 색상, 단정하게 정리된 카드 블록.",
        tokens: {
            bg: '#f9f8f6',
            fg: '#191919',
            primary: '#d97706',
            accent: '#f1ede4',
            border: '#e2dfd9',
            fonts: 'Georgia, serif (headings), "Inter", sans-serif (body)',
            layout: 'Warm beige/cream layouts, editorial serif fonts, and structured document blocks.',
            radius: '12px',
            shadow: 'None (flat lines)'
        }
    },
    cohere: {
        category: 'ai',
        domain: 'cohere.com',
        popularity: 80,
        name_en: 'Cohere',
        name_ko: 'Cohere (코히어)',
        desc_en: 'Enterprise AI platform. Vibrant gradients, data-rich dashboard aesthetic.',
        desc_ko: '엔터프라이즈 AI 플랫폼 스타일. 활기찬 그라데이션 및 데이터 밀도가 높은 대시보드 구조.',
        tokens: {
            bg: '#060606',
            fg: '#f9f9f9',
            primary: '#4f46e5',
            accent: '#10b981',
            border: 'rgba(255,255,255,0.08)',
            fonts: '"Space Grotesk", sans-serif',
            layout: 'Vibrant gradients, enterprise AI data-rich dashboard aesthetic.',
            radius: '8px',
            shadow: '0 4px 30px rgba(0, 0, 0, 0.4)'
        }
    },
    elevenlabs: {
        category: 'ai',
        domain: 'elevenlabs.io',
        popularity: 88,
        name_en: 'ElevenLabs',
        name_ko: 'ElevenLabs (일레븐랩스)',
        desc_en: 'AI voice platform. Dark cinematic UI, audio-waveform aesthetics.',
        desc_ko: 'AI 음성 합성 플랫폼 스타일. 어두운 시네마틱 UI, 오디오 웨이브폼 그래픽 비주얼.',
        tokens: {
            bg: '#020306',
            fg: '#f3f4f6',
            primary: '#06b6d4',
            accent: '#6366f1',
            border: 'rgba(255,255,255,0.05)',
            fonts: '"Inter", sans-serif',
            layout: 'Dark cinematic UI, custom audio-waveform visuals.',
            radius: '10px',
            shadow: '0 8px 32px rgba(6, 182, 212, 0.15)'
        }
    },
    minimax: {
        category: 'ai',
        domain: 'minimaxi.com',
        popularity: 65,
        name_en: 'Minimax',
        name_ko: 'Minimax (미니맥스)',
        desc_en: 'AI model provider. Bold dark interface with neon accents.',
        desc_ko: 'AI 인공지능 모델 공급사 스타일. 대담한 다크 인터페이스와 강렬한 네온 보더 포인트.',
        tokens: {
            bg: '#050508',
            fg: '#ffffff',
            primary: '#ec4899',
            accent: '#8b5cf6',
            border: 'rgba(255,255,255,0.07)',
            fonts: '"Outfit", sans-serif',
            layout: 'Bold dark interface, high neon accents, and gaming power layout.',
            radius: '6px',
            shadow: '0 0 15px rgba(236, 72, 153, 0.2)'
        }
    },
    mistral: {
        category: 'ai',
        domain: 'mistral.ai',
        popularity: 85,
        name_en: 'Mistral AI',
        name_ko: 'Mistral AI (미스트랄)',
        desc_en: 'Open-weight LLM provider. French-engineered minimalism, purple-toned.',
        desc_ko: '오픈소스 모델 개발사 스타일. 프랑스풍 미니멀리즘, 은은한 퍼플 톤 보더 라인.',
        tokens: {
            bg: '#0b0a0f',
            fg: '#f5f5f7',
            primary: '#fdba74',
            accent: '#c084fc',
            border: 'rgba(255,255,255,0.06)',
            fonts: '"Geist Mono", monospace',
            layout: 'French-engineered LLM minimalism, clean purple-toned dividers.',
            radius: '4px',
            shadow: '0 2px 10px rgba(192, 132, 252, 0.15)'
        }
    },
    ollama: {
        category: 'ai',
        domain: 'ollama.com',
        popularity: 89,
        name_en: 'Ollama',
        name_ko: 'Ollama (올라마)',
        desc_en: 'Run LLMs locally. Terminal-first, monochrome simplicity.',
        desc_ko: '로컬 AI 모델 구동 툴 스타일. 터미널 기반의 텍스트 배치 및 모노크롬 심플 레이아웃.',
        tokens: {
            bg: '#ffffff',
            fg: '#111111',
            primary: '#000000',
            accent: '#6b7280',
            border: '#e5e7eb',
            fonts: 'monospace, sans-serif',
            layout: 'Terminal-first layout, monochrome simplicity, cute model tags.',
            radius: '6px',
            shadow: 'None (flat border outlines)'
        }
    },
    opencode: {
        category: 'ai',
        domain: 'github.com',
        popularity: 60,
        name_en: 'OpenCode AI',
        name_ko: 'OpenCode AI (오픈코드)',
        desc_en: 'AI coding platform. Developer-centric dark theme.',
        desc_ko: '개발용 AI 플랫폼 스타일. 개발자 중심의 코딩 대시보드 다크 테마 및 코드 블록 에디터.',
        tokens: {
            bg: '#03070a',
            fg: '#e2e8f0',
            primary: '#10b981',
            accent: '#06b6d4',
            border: 'rgba(255,255,255,0.06)',
            fonts: '"Fira Code", monospace',
            layout: 'Developer-centric dark theme, active coding status previews.',
            radius: '8px',
            shadow: '0 4px 20px rgba(16, 185, 129, 0.1)'
        }
    },
    replicate: {
        category: 'ai',
        domain: 'replicate.com',
        popularity: 81,
        name_en: 'Replicate',
        name_ko: 'Replicate (레플리케이트)',
        desc_en: 'Run ML models via API. Clean white canvas, code-forward.',
        desc_ko: '머신러닝 API 배포판 스타일. 깨끗한 화이트 캔버스, 코드 중심의 초정밀 도큐먼트 디자인.',
        tokens: {
            bg: '#ffffff',
            fg: '#000000',
            primary: '#000000',
            accent: '#374151',
            border: '#e5e7eb',
            fonts: '"Courier New", Courier, monospace',
            layout: 'Clean white canvas, code-forward, thin line dividers.',
            radius: '4px',
            shadow: 'None'
        }
    },
    runway: {
        category: 'ai',
        domain: 'runwayml.com',
        popularity: 87,
        name_en: 'Runway',
        name_ko: 'Runway (런웨이)',
        desc_en: 'AI creative-tools. Cinematic dark heroes, paper-white reading bands, pure black pill CTAs.',
        desc_ko: '창작용 AI 툴 스타일. 시네마틱한 다크 히어로 헤더, 본문 읽기용 화이트 밴드, 타원형 필 버튼.',
        tokens: {
            bg: '#000000',
            fg: '#ffffff',
            primary: '#ffffff',
            accent: '#8b949e',
            border: 'rgba(255,255,255,0.1)',
            fonts: '"Inter", sans-serif',
            layout: 'Editorial film-festival aesthetic, cinematic dark heroes, paper-white reading bands, pure black pill CTAs.',
            radius: '30px',
            shadow: '0 20px 40px rgba(0,0,0,0.8)'
        }
    },
    together: {
        category: 'ai',
        domain: 'together.ai',
        popularity: 78,
        name_en: 'Together AI',
        name_ko: 'Together AI (투게더)',
        desc_en: 'Open-source AI infrastructure. Technical, blueprint-style design.',
        desc_ko: '오픈소스 AI 인프라 스타일. 엔지니어링 감성의 설계도면(블루프린트) 그리드 라인 피팅.',
        tokens: {
            bg: '#05070a',
            fg: '#f8fafc',
            primary: '#38bdf8',
            accent: '#818cf8',
            border: 'rgba(56, 189, 248, 0.15)',
            fonts: '"Space Mono", monospace',
            layout: 'Technical, blueprint-style layouts, thin cyan wireframe lines.',
            radius: '0px',
            shadow: 'None'
        }
    },
    voltagent: {
        category: 'ai',
        domain: 'github.com',
        popularity: 70,
        name_en: 'VoltAgent',
        name_ko: 'VoltAgent (볼트에이전트)',
        desc_en: 'AI agent framework. Void-black canvas, emerald accent, terminal-native.',
        desc_ko: 'AI 에이전트 프레임워크 스타일. 칠흑 같은 완전 블랙 캔버스, 에메랄드 그린 터미널 폰트.',
        tokens: {
            bg: '#020202',
            fg: '#f3f4f6',
            primary: '#10b981',
            accent: '#047857',
            border: 'rgba(16, 185, 129, 0.2)',
            fonts: '"Outfit", sans-serif',
            layout: 'Void-black canvas, emerald accent, terminal-native look.',
            radius: '5px',
            shadow: '0 0 20px rgba(16, 185, 129, 0.15)'
        }
    },
    xai: {
        category: 'ai',
        domain: 'x.ai',
        popularity: 91,
        name_en: 'xAI',
        name_ko: 'xAI (엑스에이아이)',
        desc_en: "Elon Musk's AI lab. Stark monochrome, futuristic minimalism.",
        desc_ko: "일론 머스크의 AI 연구소 스타일. 극단적인 모노크롬 구성, 미래지향적 초미니멀 사각형 레이아웃.",
        tokens: {
            bg: '#000000',
            fg: '#ffffff',
            primary: '#ffffff',
            accent: '#9ca3af',
            border: 'rgba(255,255,255,0.15)',
            fonts: '"Helvetica Neue", sans-serif',
            layout: 'Stark monochrome, futuristic minimalism, sharp corners.',
            radius: '0px',
            shadow: 'None'
        }
    },

    // Developer Tools & IDEs
    cursor: {
        category: 'dev',
        domain: 'cursor.com',
        popularity: 92,
        name_en: 'Cursor',
        name_ko: 'Cursor (커서)',
        desc_en: 'AI-first code editor. Sleek dark interface, gradient accents.',
        desc_ko: 'AI 코드 에디터 스타일. 매끄러운 다크 인터페이스, 광택 나는 네온 보더 및 셀렉션 그라데이션.',
        tokens: {
            bg: '#080808',
            fg: '#f3f4f6',
            primary: '#a855f7',
            accent: '#3b82f6',
            border: 'rgba(255,255,255,0.06)',
            fonts: '"Inter", sans-serif',
            layout: 'AI-first code editor, sleek dark interfaces with neon gradient glows.',
            radius: '8px',
            shadow: '0 4px 20px rgba(168, 85, 247, 0.2)'
        }
    },
    expo: {
        category: 'dev',
        domain: 'expo.dev',
        popularity: 82,
        name_en: 'Expo',
        name_ko: 'Expo (엑스포)',
        desc_en: 'React Native platform. Dark theme, tight letter-spacing, code-centric.',
        desc_ko: '크로스플랫폼 앱 빌더 스타일. 깊고 어두운 인디고 블랙, 자간이 좁고 반듯한 코딩용 서체.',
        tokens: {
            bg: '#0a0a0c',
            fg: '#f8fafc',
            primary: '#4f46e5',
            accent: '#f43f5e',
            border: 'rgba(255,255,255,0.07)',
            fonts: '"Inter", sans-serif',
            layout: 'Dark theme mobile builder, tight letter-spacing, code-centric tabs.',
            radius: '6px',
            shadow: '0 4px 25px rgba(0,0,0,0.6)'
        }
    },
    lovable: {
        category: 'dev',
        domain: 'lovable.dev',
        popularity: 84,
        name_en: 'Lovable',
        name_ko: 'Lovable (러버블)',
        desc_en: 'AI full-stack builder. Playful gradients, friendly dev aesthetic.',
        desc_ko: '풀스택 AI 메이커 스타일. 파스텔 톤 핑크-퍼플 그라데이션, 귀엽고 친근한 개발 요소 구성.',
        tokens: {
            bg: '#0d0c15',
            fg: '#f1f1f6',
            primary: '#ec4899',
            accent: '#3b82f6',
            border: 'rgba(255,255,255,0.08)',
            fonts: '"Outfit", sans-serif',
            layout: 'Playful developer aesthetic, soft gradients, rounded cards.',
            radius: '16px',
            shadow: '0 10px 30px rgba(236, 72, 153, 0.15)'
        }
    },
    raycast: {
        category: 'dev',
        domain: 'raycast.com',
        popularity: 90,
        name_en: 'Raycast',
        name_ko: 'Raycast (레이캐스트)',
        desc_en: 'Productivity launcher. Sleek dark chrome, vibrant gradient accents.',
        desc_ko: '생산성 런처 툴 스타일. 메탈릭 다크 크롬 레이어 및 활기찬 마젠타-오렌지 광원 효과.',
        tokens: {
            bg: '#0b0c0f',
            fg: '#f3f4f6',
            primary: '#ff5a1f',
            accent: '#e02424',
            border: 'rgba(255,255,255,0.07)',
            fonts: '"Inter", sans-serif',
            layout: 'Launcher design, sleek dark chrome with vibrant gradient borders.',
            radius: '10px',
            shadow: '0 8px 30px rgba(0, 0, 0, 0.5)'
        }
    },
    superhuman: {
        category: 'dev',
        domain: 'superhuman.com',
        popularity: 86,
        name_en: 'Superhuman',
        name_ko: 'Superhuman (슈퍼휴먼)',
        desc_en: 'Fast email client. Premium dark UI, keyboard-first, purple glow.',
        desc_ko: '초고속 메일 관리 앱 스타일. 하이엔드 퍼플 메탈 컬러, 단축키 위주의 기능 표시 및 퍼플 네온 서광.',
        tokens: {
            bg: '#08080a',
            fg: '#e2e8f0',
            primary: '#8b5cf6',
            accent: '#6d28d9',
            border: 'rgba(255,255,255,0.06)',
            fonts: '"Outfit", sans-serif',
            layout: 'Premium dark UI email, keyboard-first focus, neon purple glow.',
            radius: '8px',
            shadow: '0 5px 25px rgba(139, 92, 246, 0.25)'
        }
    },
    vercel: {
        category: 'dev',
        domain: 'vercel.com',
        popularity: 96,
        name_en: 'Vercel',
        name_ko: 'Vercel (버셀)',
        desc_en: 'Frontend deployment. Black and white precision, Geist font.',
        desc_ko: '프론트엔드 배포 플랫폼 스타일. 극단적인 블랙/화이트 대비, 고도의 지오메트릭 직선 그리드.',
        tokens: {
            bg: '#000000',
            fg: '#ffffff',
            primary: '#ffffff',
            accent: '#888888',
            border: '#333333',
            fonts: '"Geist Sans", sans-serif',
            layout: 'High-contrast monochromatic design, geometric border dividers.',
            radius: '5px',
            shadow: 'None (instant action)'
        }
    },
    warp: {
        category: 'dev',
        domain: 'warp.dev',
        popularity: 83,
        name_en: 'Warp',
        name_ko: 'Warp (워프)',
        desc_en: 'Modern terminal. Dark IDE-like interface, block-based command UI.',
        desc_ko: '모던 터미널 스타일. 블록 단위 명령어 구분 및 터미널 윈도우 스타일의 인풋 가이드.',
        tokens: {
            bg: '#07080a',
            fg: '#f3f4f6',
            primary: '#3b82f6',
            accent: '#10b981',
            border: 'rgba(255,255,255,0.06)',
            fonts: '"Fira Code", monospace',
            layout: 'Modern terminal look, block-based inputs, colored neon borders.',
            radius: '8px',
            shadow: '0 4px 15px rgba(59, 130, 246, 0.15)'
        }
    },

    // Backend, Database & DevOps
    clickhouse: {
        category: 'db',
        domain: 'clickhouse.com',
        popularity: 81,
        name_en: 'ClickHouse',
        name_ko: 'ClickHouse (클릭하우스)',
        desc_en: 'Fast analytics database. Yellow-accented, technical documentation style.',
        desc_ko: '대용량 데이터베이스 스타일. 기술 도큐먼트 느낌의 옐로우 포인트 컬러, 구조화된 인덱스 카드.',
        tokens: {
            bg: '#ffffff',
            fg: '#000000',
            primary: '#f59e0b',
            accent: '#000000',
            border: '#e5e7eb',
            fonts: '"Segoe UI", sans-serif',
            layout: 'Fast database style, bright yellow accents, grid-aligned document fields.',
            radius: '4px',
            shadow: '0 1px 3px rgba(0,0,0,0.05)'
        }
    },
    composio: {
        category: 'db',
        domain: 'composio.dev',
        popularity: 72,
        name_en: 'Composio',
        name_ko: 'Composio (콤포지오)',
        desc_en: 'Tool integration platform. Modern dark with colorful integration icons.',
        desc_ko: '도구 통합 연동사 스타일. 세련된 다크 그레이 캔버스 위의 다채로운 앱 연동 컬러 아이콘.',
        tokens: {
            bg: '#05070a',
            fg: '#e2e8f0',
            primary: '#3b82f6',
            accent: '#f59e0b',
            border: 'rgba(255,255,255,0.06)',
            fonts: '"Inter", sans-serif',
            layout: 'Modern dark UI with colorful integration icons and clear margins.',
            radius: '12px',
            shadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
        }
    },
    hashicorp: {
        category: 'db',
        domain: 'hashicorp.com',
        popularity: 84,
        name_en: 'HashiCorp',
        name_ko: 'HashiCorp (하시코프)',
        desc_en: 'Infrastructure automation. Enterprise-clean, black and white.',
        desc_ko: '인프라 자동화 툴 스타일. 정교한 설계도 스타일의 다크 모노크롬, 격자 기하학 모티프.',
        tokens: {
            bg: '#ffffff',
            fg: '#000000',
            primary: '#000000',
            accent: '#6366f1',
            border: '#e5e7eb',
            fonts: '"Helvetica Neue", sans-serif',
            layout: 'Enterprise infrastructure look, clean lines, black and white logo squares.',
            radius: '4px',
            shadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
        }
    },
    mongodb: {
        category: 'db',
        domain: 'mongodb.com',
        popularity: 89,
        name_en: 'MongoDB',
        name_ko: 'MongoDB (몽고디비)',
        desc_en: 'Document database. Green leaf branding, developer documentation focus.',
        desc_ko: '도큐먼트 DB 스타일. 몽고디비의 상징인 초록 나뭇잎 그린 테마, 화이트/라이트그린 레이아웃.',
        tokens: {
            bg: '#ffffff',
            fg: '#001e2b',
            primary: '#00ed64',
            accent: '#00684a',
            border: '#e1e3e5',
            fonts: '"Inter", sans-serif',
            layout: 'Green leaf branding, developer document structures, clean white panels.',
            radius: '8px',
            shadow: '0 2px 8px rgba(0, 30, 43, 0.05)'
        }
    },
    posthog: {
        category: 'db',
        domain: 'posthog.com',
        popularity: 86,
        name_en: 'PostHog',
        name_ko: 'PostHog (포스트혹)',
        desc_en: 'Product analytics. Playful hedgehog branding, developer-friendly dark UI.',
        desc_ko: '제품 분석 플랫폼 스타일. 귀여운 고슴도치 캐릭터를 모티프로 한 손글씨 및 만화풍의 다크 UI.',
        tokens: {
            bg: '#111111',
            fg: '#f5f5f5',
            primary: '#f59e0b',
            accent: '#ffffff',
            border: '#2d2d2d',
            fonts: '"Space Grotesk", sans-serif',
            layout: 'Playful analytics, funny hedgehog tags, hand-drawn wireframes.',
            radius: '10px',
            shadow: '0 4px 20px rgba(0,0,0,0.4)'
        }
    },
    sanity: {
        category: 'db',
        domain: 'sanity.io',
        popularity: 78,
        name_en: 'Sanity',
        name_ko: 'Sanity (새니티)',
        desc_en: 'Headless content. Dark-first editorial marketing, IBM Plex Mono technical eyebrows, single coral CTA.',
        desc_ko: '헤드리스 콘텐츠 엔진 스타일. 볼드한 헤드라인 서체, 테크니컬 마크다운, 코랄 레드 포인트 CTA.',
        tokens: {
            bg: '#09090b',
            fg: '#ffffff',
            primary: '#f43f5e',
            accent: '#18181b',
            border: '#27272a',
            fonts: '"IBM Plex Mono", monospace (headings), sans-serif (body)',
            layout: 'Dark-first editorial marketing surface, 112px display headers, coral-red CTAs.',
            radius: '6px',
            shadow: 'None'
        }
    },
    sentry: {
        category: 'db',
        domain: 'sentry.io',
        popularity: 88,
        name_en: 'Sentry',
        name_ko: 'Sentry (센트리)',
        desc_en: 'Error monitoring. Dark dashboard, data-dense, pink-purple accent.',
        desc_ko: '에러 모니터링 시스템 스타일. 핑크-퍼플 에러 경보선 포인트, 실시간 로그 데이터 중심의 대시보드.',
        tokens: {
            bg: '#0c0b10',
            fg: '#f3f4f6',
            primary: '#db2777',
            accent: '#7c3aed',
            border: 'rgba(255,255,255,0.07)',
            fonts: '"Inter", sans-serif',
            layout: 'Data-dense logs, purple-pink highlights, real-time warning indicators.',
            radius: '8px',
            shadow: '0 6px 18px rgba(219, 39, 119, 0.15)'
        }
    },
    supabase: {
        category: 'db',
        domain: 'supabase.com',
        popularity: 93,
        name_en: 'Supabase',
        name_ko: 'Supabase (수파베이스)',
        desc_en: 'Open-source Firebase alternative. Dark emerald theme, code-first.',
        desc_ko: '수파베이스 스타일. 깊은 에메랄드 그린과 번개 심볼 로고, 다크 코딩 에디터 느낌의 레이아웃.',
        tokens: {
            bg: '#030303',
            fg: '#ededed',
            primary: '#3ecf8e',
            accent: '#2e7d32',
            border: '#232323',
            fonts: '"Space Grotesk", sans-serif',
            layout: 'Dark emerald themes, code-first interfaces, terminal layouts.',
            radius: '8px',
            shadow: '0 4px 12px rgba(62, 207, 142, 0.1)'
        }
    },

    // Productivity & SaaS
    calcom: {
        category: 'saas',
        domain: 'cal.com',
        popularity: 80,
        name_en: 'Cal.com',
        name_ko: 'Cal.com (칼닷컴)',
        desc_en: 'Open-source scheduling. Clean neutral UI, developer-oriented simplicity.',
        desc_ko: '오픈소스 예약 플래너 스타일. 깔끔한 뉴트럴 그레이와 블랙 조합, 극도의 그리드 달력 프레임.',
        tokens: {
            bg: '#ffffff',
            fg: '#111111',
            primary: '#111111',
            accent: '#6b7280',
            border: '#e5e7eb',
            fonts: '"Inter", sans-serif',
            layout: 'Clean neutral calendar, minimalist date/time forms.',
            radius: '8px',
            shadow: '0 1px 3px rgba(0,0,0,0.05)'
        }
    },
    intercom: {
        category: 'saas',
        domain: 'intercom.com',
        popularity: 87,
        name_en: 'Intercom',
        name_ko: 'Intercom (인터콤)',
        desc_en: 'Customer messaging. Friendly blue palette, conversational UI patterns.',
        desc_ko: '고객 채팅 서비스 스타일. 대화형 말풍선 패턴, 둥근 카드 모서리, 소프트 블루 파스텔 메인.',
        tokens: {
            bg: '#ffffff',
            fg: '#1f2937',
            primary: '#1d4ed8',
            accent: '#60a5fa',
            border: '#e5e7eb',
            fonts: '"Inter", sans-serif',
            layout: 'Conversational messages, friendly blue details, round bubbles.',
            radius: '14px',
            shadow: '0 4px 15px rgba(29, 78, 216, 0.08)'
        }
    },
    linear: {
        category: 'saas',
        domain: 'linear.app',
        popularity: 97,
        name_en: 'Linear',
        name_ko: 'Linear (리니어)',
        desc_en: 'Project management. Ultra-minimal, precise, purple accent.',
        desc_ko: '프로페셔널 개발 협업 툴 스타일. 은은한 보랏빛 도트 네온 및 디테일한 라인 분배.',
        tokens: {
            bg: '#08080a',
            fg: '#f7f8f8',
            primary: '#5e6ad2',
            accent: '#8a8f98',
            border: 'rgba(255,255,255,0.08)',
            fonts: '"Linear Sans", Inter, sans-serif',
            layout: 'Engineers project tracker, ultra-minimal, purple highlight ticks.',
            radius: '6px',
            shadow: '0 10px 40px rgba(0, 0, 0, 0.5)'
        }
    },
    mintlify: {
        category: 'saas',
        domain: 'mintlify.com',
        popularity: 81,
        name_en: 'Mintlify',
        name_ko: 'Mintlify (민틀리파이)',
        desc_en: 'Documentation platform. Clean, green-accented, reading-optimized.',
        desc_ko: '도큐먼트 퍼블리셔 스타일. 가독성을 고려한 편안한 텍스트 배치 및 미들 그린 아이콘 포인트.',
        tokens: {
            bg: '#ffffff',
            fg: '#1f2937',
            primary: '#10b981',
            accent: '#059669',
            border: '#f3f4f6',
            fonts: '"Inter", sans-serif',
            layout: 'Reading-optimized documentation, clean green line icons, sidebar flows.',
            radius: '6px',
            shadow: '0 1px 3px rgba(0,0,0,0.02)'
        }
    },
    notion: {
        category: 'saas',
        domain: 'notion.so',
        popularity: 98,
        name_en: 'Notion',
        name_ko: 'Notion (노션)',
        desc_en: 'All-in-one workspace. Warm minimalism, serif headings, soft surfaces.',
        desc_ko: '생산성 워크스페이스 스타일. 따뜻한 오프화이트 모노크롬, 매력적인 세리프 타이틀 서체.',
        tokens: {
            bg: '#ffffff',
            fg: '#37352f',
            primary: '#37352f',
            accent: '#f1f0ef',
            border: '#e3e2e0',
            fonts: 'Georgia, serif (headings), sans-serif (body)',
            layout: 'Warm minimalism, flat hand-drawn graphics, clean side margins.',
            radius: '4px',
            shadow: 'None'
        }
    },
    resend: {
        category: 'saas',
        domain: 'resend.com',
        popularity: 89,
        name_en: 'Resend',
        name_ko: 'Resend (리센드)',
        desc_en: 'Email API for developers. Minimal dark theme, monospace accents.',
        desc_ko: '개발자 전용 이메일 API 스타일. 미니멀한 블랙 캔버스와 모노스페이스 기술 폰트 조화.',
        tokens: {
            bg: '#000000',
            fg: '#ffffff',
            primary: '#ffffff',
            accent: '#71717a',
            border: '#27272a',
            fonts: 'monospace',
            layout: 'Minimal dark developer emails, clean code snippets.',
            radius: '4px',
            shadow: 'None'
        }
    },
    zapier: {
        category: 'saas',
        domain: 'zapier.com',
        popularity: 88,
        name_en: 'Zapier',
        name_ko: 'Zapier (재피어)',
        desc_en: 'Automation platform. Warm orange, friendly illustration-driven.',
        desc_ko: '워크플로우 오토메이션 스타일. 친근하고 활기찬 주황 오렌지 포인트 및 심플 흐름도 구성.',
        tokens: {
            bg: '#ffffff',
            fg: '#2b2a29',
            primary: '#ff4f00',
            accent: '#ff7a00',
            border: '#d9d8d6',
            fonts: '"Outfit", sans-serif',
            layout: 'Warm orange accents, friendly multi-step automation diagrams.',
            radius: '10px',
            shadow: '0 2px 8px rgba(0,0,0,0.05)'
        }
    },

    // Design & Creative Tools
    airtable: {
        category: 'design',
        domain: 'airtable.com',
        popularity: 87,
        name_en: 'Airtable',
        name_ko: 'Airtable (에어테이블)',
        desc_en: 'Spreadsheet-database. Colorful, friendly, structured data aesthetic.',
        desc_ko: '하이브리드 스프레드시트 스타일. 알록달록한 필터 태그 아이템 및 잘 정렬된 그리드 데이터 표.',
        tokens: {
            bg: '#ffffff',
            fg: '#1f2937',
            primary: '#1890ff',
            accent: '#40a9ff',
            border: '#d9d9d9',
            fonts: '"Inter", sans-serif',
            layout: 'Structured grid database, colorful status tags, clean forms.',
            radius: '6px',
            shadow: '0 1px 2px rgba(0,0,0,0.03)'
        }
    },
    clay: {
        category: 'design',
        domain: 'clay.earth',
        popularity: 75,
        name_en: 'Clay',
        name_ko: 'Clay (클레이)',
        desc_en: 'Creative agency. Organic shapes, soft gradients, art-directed layout.',
        desc_ko: '크리에이티브 에이전시 스타일. 은은한 아이보리 파스텔 샌드톤 및 유려한 곡선 디자인.',
        tokens: {
            bg: '#faf6f0',
            fg: '#272522',
            primary: '#a3704c',
            accent: '#c6a48a',
            border: '#e8e2d9',
            fonts: '"Georgia", serif',
            layout: 'Organic creative agency layout, soft beige textures, warm gradients.',
            radius: '20px',
            shadow: '0 8px 30px rgba(163, 112, 76, 0.08)'
        }
    },
    figma: {
        category: 'design',
        domain: 'figma.com',
        popularity: 98,
        name_en: 'Figma',
        name_ko: 'Figma (피그마)',
        desc_en: 'Collaborative design. Vibrant multi-color, playful yet professional.',
        desc_ko: '피그마 협업 툴 스타일. 메인 툴바 형태의 메뉴, 주황/파랑/초록/보라의 원색 컬러 커서 구성.',
        tokens: {
            bg: '#1e1e1e',
            fg: '#ffffff',
            primary: '#f24e1e',
            accent: '#a259ff',
            border: '#333333',
            fonts: '"Inter", sans-serif',
            layout: 'Vibrant canvas workspace, multi-color user cursors, dark editor panels.',
            radius: '8px',
            shadow: '0 4px 16px rgba(0, 0, 0, 0.4)'
        }
    },
    framer: {
        category: 'design',
        domain: 'framer.com',
        popularity: 92,
        name_en: 'Framer',
        name_ko: 'Framer (프레이머)',
        desc_en: 'Website builder. Bold black and blue, motion-first, design-forward.',
        desc_ko: '프레이머 웹 디자인 빌더 스타일. 볼드한 딥블루 네온, 부드러운 호버 애니메이션 및 트랜지션.',
        tokens: {
            bg: '#000000',
            fg: '#ffffff',
            primary: '#0055ff',
            accent: '#00ccff',
            border: '#222222',
            fonts: '"Inter", sans-serif',
            layout: 'Motion-first website builder, bold blue highlights, animated elements.',
            radius: '12px',
            shadow: '0 12px 40px rgba(0, 85, 255, 0.15)'
        }
    },
    miro: {
        category: 'design',
        domain: 'miro.com',
        popularity: 89,
        name_en: 'Miro',
        name_ko: 'Miro (미로)',
        desc_en: 'Visual collaboration. Bright yellow accent, infinite canvas aesthetic.',
        desc_ko: '디지털 화이트보드 스타일. 비비드한 미로 옐로우, 포스트잇 스티커 테두리 레이아웃 구조.',
        tokens: {
            bg: '#ffffff',
            fg: '#050038',
            primary: '#ffd02b',
            accent: '#050038',
            border: '#e1e0eb',
            fonts: '"Inter", sans-serif',
            layout: 'Infinite canvas feel, post-it note elements, bright yellow badges.',
            radius: '8px',
            shadow: '0 2px 8px rgba(5, 0, 56, 0.08)'
        }
    },
    webflow: {
        category: 'design',
        domain: 'webflow.com',
        popularity: 91,
        name_en: 'Webflow',
        name_ko: 'Webflow (웹플로우)',
        desc_en: 'Visual web builder. Blue-accented, polished marketing site aesthetic.',
        desc_ko: '웹플로우 스타일. 테크니컬한 파란색 포인트 테마와 깔끔한 포트폴리오 스타일 쇼케이스.',
        tokens: {
            bg: '#ffffff',
            fg: '#1c1c1c',
            primary: '#4353ff',
            accent: '#1a237e',
            border: '#e8e8e8',
            fonts: '"Inter", sans-serif',
            layout: 'Polished web builder editor, blue-accented control panels.',
            radius: '6px',
            shadow: '0 1px 4px rgba(0,0,0,0.05)'
        }
    },

    // Fintech & Crypto
    binance: {
        category: 'fintech',
        domain: 'binance.com',
        popularity: 89,
        name_en: 'Binance',
        name_ko: 'Binance (바이낸스)',
        desc_en: 'Crypto exchange. Bold Binance Yellow on monochrome, trading-floor urgency.',
        desc_ko: '가상화폐 거래소 스타일. 강렬한 바이낸스 골드옐로우 테마, 데이터 밀도가 높은 등락 차트.',
        tokens: {
            bg: '#0b0e11',
            fg: '#eaecef',
            primary: '#fcd535',
            accent: '#00c076',
            border: '#2b3139',
            fonts: '"Inter", sans-serif',
            layout: 'Trading dashboard, bold Binance yellow, dense chart flows.',
            radius: '4px',
            shadow: '0 4px 10px rgba(0,0,0,0.3)'
        }
    },
    coinbase: {
        category: 'fintech',
        domain: 'coinbase.com',
        popularity: 91,
        name_en: 'Coinbase',
        name_ko: 'Coinbase (코인베이스)',
        desc_en: 'Crypto exchange. Clean blue identity, trust-focused, institutional feel.',
        desc_ko: '미국 최대 코인 거래소 스타일. 신뢰감을 주는 코발트블루 테마, 직관적인 자산 관리 표 구성.',
        tokens: {
            bg: '#ffffff',
            fg: '#050f19',
            primary: '#0052ff',
            accent: '#0052ff',
            border: '#eceff1',
            fonts: '"Inter", sans-serif',
            layout: 'Trust-focused clean banking, blue highlights, institutional charts.',
            radius: '10px',
            shadow: '0 2px 10px rgba(0, 82, 255, 0.05)'
        }
    },
    kraken: {
        category: 'fintech',
        domain: 'kraken.com',
        popularity: 82,
        name_en: 'Kraken',
        name_ko: 'Kraken (크라켄)',
        desc_en: 'Crypto trading platform. Purple-accented dark UI, data-dense.',
        desc_ko: '크라켄 거래소 스타일. 보랏빛 다크 캔버스 배경과 핫핑크/형광그린 등락 신호 조합.',
        tokens: {
            bg: '#0a051d',
            fg: '#f3f2f9',
            primary: '#8b3cff',
            accent: '#ff007a',
            border: 'rgba(255,255,255,0.06)',
            fonts: '"Outfit", sans-serif',
            layout: 'Dark crypto trading, purple canvas, neon pink tags, data fields.',
            radius: '8px',
            shadow: '0 5px 20px rgba(139, 60, 255, 0.2)'
        }
    },
    mastercard: {
        category: 'fintech',
        domain: 'mastercard.com',
        popularity: 88,
        name_en: 'Mastercard',
        name_ko: 'Mastercard (마스터카드)',
        desc_en: 'Global payments. Warm cream canvas, orbital pill shapes, editorial warmth.',
        desc_ko: '글로벌 결제 네트워크 스타일. 오프화이트 샌드 베이스, 오렌지/레드의 겹친 원형 엠블럼 매칭.',
        tokens: {
            bg: '#fbfaf7',
            fg: '#222222',
            primary: '#ff5f00',
            accent: '#f79e1b',
            border: '#e9e6df',
            fonts: '"Georgia", serif',
            layout: 'Warm cream canvas, orbital pill graphics, elegant credit card rows.',
            radius: '30px',
            shadow: '0 8px 24px rgba(255, 95, 0, 0.06)'
        }
    },
    revolut: {
        category: 'fintech',
        domain: 'revolut.com',
        popularity: 87,
        name_en: 'Revolut',
        name_ko: 'Revolut (레볼루트)',
        desc_en: 'Digital banking. Sleek dark interface, gradient cards, fintech precision.',
        desc_ko: '핀테크 뱅킹 앱 스타일. 세련된 네온 메탈 카드 그래픽 및 메탈 톤 하이그로시 텍스트 연출.',
        tokens: {
            bg: '#070708',
            fg: '#ffffff',
            primary: '#ffffff',
            accent: '#3b82f6',
            border: 'rgba(255,255,255,0.08)',
            fonts: '"Inter", sans-serif',
            layout: 'Sleek dark banking UI, metallic credit cards, custom graphs.',
            radius: '12px',
            shadow: '0 8px 30px rgba(0,0,0,0.5)'
        }
    },
    stripe: {
        category: 'fintech',
        domain: 'stripe.com',
        popularity: 99,
        name_en: 'Stripe',
        name_ko: 'Stripe (스트라이프)',
        desc_en: 'Payment infrastructure. Signature purple gradients, weight-300 elegance.',
        desc_ko: '스트라이프 결제 모듈 스타일. 신뢰도 높은 네온 퍼플 그라데이션 경사 밴드 및 얇고 정교한 타이포.',
        tokens: {
            bg: '#ffffff',
            fg: '#0a2540',
            primary: '#635bff',
            accent: '#00d4ff',
            border: '#f6f9fc',
            fonts: '"Inter", sans-serif',
            layout: 'Signature purple gradients, diagonal background sweeps, weight-300 text.',
            radius: '8px',
            shadow: '0 50px 100px -20px rgba(50,50,93,0.25)'
        }
    },
    wise: {
        category: 'fintech',
        domain: 'wise.com',
        popularity: 86,
        name_en: 'Wise',
        name_ko: 'Wise (와이즈)',
        desc_en: 'International money transfer. Bright green accent, friendly and clear.',
        desc_ko: '해외 송금 플랫폼 스타일. 친근하고 시인성 높은 형광 연두색 테마 및 부드러운 볼드 폰트 구성.',
        tokens: {
            bg: '#ffffff',
            fg: '#163300',
            primary: '#9fe870',
            accent: '#163300',
            border: '#e1e3e0',
            fonts: '"Inter", sans-serif',
            layout: 'Bright neon green money transfer layouts, crisp custom sans labels.',
            radius: '16px',
            shadow: '0 2px 6px rgba(22, 51, 0, 0.04)'
        }
    },

    // E-commerce & Retail
    airbnb: {
        category: 'retail',
        domain: 'airbnb.com',
        popularity: 93,
        name_en: 'Airbnb',
        name_ko: 'Airbnb (에어비앤비)',
        desc_en: 'Travel marketplace. Warm coral accent, photography-driven, rounded UI.',
        desc_ko: '여행 숙박 매칭 플랫폼 스타일. 따뜻한 코랄 핑크 메인 테마, 그리드 이미지 위주의 여행 스토어.',
        tokens: {
            bg: '#ffffff',
            fg: '#222222',
            primary: '#ff385c',
            accent: '#ff385c',
            border: '#dddddd',
            fonts: '"Inter", sans-serif',
            layout: 'Travel marketplace, warm coral accents, photography-heavy grid.',
            radius: '12px',
            shadow: '0 6px 16px rgba(0,0,0,0.12)'
        }
    },
    meta: {
        category: 'retail',
        domain: 'meta.com',
        popularity: 88,
        name_en: 'Meta Store',
        name_ko: 'Meta Store (메타)',
        desc_en: 'Tech retail. Photography-first, binary light/dark surfaces, Meta Blue CTAs.',
        desc_ko: '메타 디바이스 스토어 스타일. 고화질 사진 슬라이더, 깔끔한 흑백 화면 분할 구조.',
        tokens: {
            bg: '#ffffff',
            fg: '#1c1e21',
            primary: '#0064e0',
            accent: '#0080ff',
            border: '#e4e6eb',
            fonts: '"Inter", sans-serif',
            layout: 'Binary light/dark panels, Meta Blue CTAs, hardware showcases.',
            radius: '8px',
            shadow: '0 2px 4px rgba(0,0,0,0.08)'
        }
    },
    nike: {
        category: 'retail',
        domain: 'nike.com',
        popularity: 92,
        name_en: 'Nike',
        name_ko: 'Nike (나이키)',
        desc_en: 'Athletic retail. Monochrome UI, massive uppercase Futura, full-bleed photo.',
        desc_ko: '나이키 스토어 스타일. 화려한 색상을 배제한 칠흑 모노크롬, 거대한 대문자 Futura 타이틀 배너.',
        tokens: {
            bg: '#ffffff',
            fg: '#111111',
            primary: '#000000',
            accent: '#000000',
            border: '#e5e5e5',
            fonts: '"Futura-Bold", sans-serif',
            layout: 'Stark monochrome, massive uppercase headers, full-bleed images.',
            radius: '0px',
            shadow: 'None'
        }
    },
    shopify: {
        category: 'retail',
        domain: 'shopify.com',
        popularity: 94,
        name_en: 'Shopify',
        name_ko: 'Shopify (쇼피파이)',
        desc_en: 'E-commerce. Dark-first cinematic, neon green accent, ultra-light display type.',
        desc_ko: '쇼피파이 스타일. 차분한 다크 그린/블랙 바탕에 은은하게 들어가는 네온 라이트그린 라인.',
        tokens: {
            bg: '#080c0a',
            fg: '#f1f1f1',
            primary: '#00e676',
            accent: '#2e7d32',
            border: 'rgba(255,255,255,0.06)',
            fonts: '"Outfit", sans-serif',
            layout: 'Dark-first cinematic e-commerce, neon green accents, thin text lines.',
            radius: '6px',
            shadow: '0 10px 40px rgba(0,0,0,0.7)'
        }
    },
    starbucks: {
        category: 'retail',
        domain: 'starbucks.com',
        popularity: 87,
        name_en: 'Starbucks',
        name_ko: 'Starbucks (스타벅스)',
        desc_en: 'Coffee retail. Four-tier earth-green system, warm cream canvas, SoDoSans type.',
        desc_ko: '스타벅스 커피 브랜드 스타일. 4단계 녹색 그라데이션, 차분한 오프화이트 크림톤 테두리.',
        tokens: {
            bg: '#f2f0eb',
            fg: '#1e3932',
            primary: '#006241',
            accent: '#1e3932',
            border: '#dedcd8',
            fonts: '"SoDoSans", sans-serif',
            layout: 'Coffee retail flagship, 4-tier earth-greens, warm cream base.',
            radius: '24px',
            shadow: 'None'
        }
    },

    // Media & Consumer Tech
    apple: {
        category: 'media',
        domain: 'apple.com',
        popularity: 99,
        name_en: 'Apple',
        name_ko: 'Apple (애플)',
        desc_en: 'Consumer electronics. Premium white space, SF Pro, cinematic imagery.',
        desc_ko: '애플 스타일. 넓고 시원한 공백 배치, 지극히 고전적이고 세련된 회색 둥근 모서리 패널.',
        tokens: {
            bg: '#ffffff',
            fg: '#1d1d1f',
            primary: '#000000',
            accent: '#0071e3',
            border: '#d2d2d7',
            fonts: '"SF Pro Display", sans-serif',
            layout: 'Premium whitespace, cinematic high-res product photos, gray card grids.',
            radius: '18px',
            shadow: '0 4px 20px rgba(0,0,0,0.05)'
        }
    },
    hp: {
        category: 'media',
        domain: 'hp.com',
        popularity: 80,
        name_en: 'HP',
        name_ko: 'HP (에이치피)',
        desc_en: 'PC maker. Pure white canvas, HP Electric Blue signal CTA, chevron decorations.',
        desc_ko: 'HP 가이드라인 스타일. 화이트 배경에 청량한 일렉트릭 블루 버튼 포인트 및 꺾쇠 데코라인.',
        tokens: {
            bg: '#ffffff',
            fg: '#000000',
            primary: '#0096ff',
            accent: '#0055ff',
            border: '#ececec',
            fonts: '"Forma DJR Micro", sans-serif',
            layout: 'Pure white canvas, HP Electric Blue signals, blue chevrons.',
            radius: '0px',
            shadow: 'None'
        }
    },
    ibm: {
        category: 'media',
        domain: 'ibm.com',
        popularity: 83,
        name_en: 'IBM',
        name_ko: 'IBM (아이비엠)',
        desc_en: 'Enterprise tech. Carbon design system, structured blue palette.',
        desc_ko: 'IBM 카본 디자인 시스템 스타일. 규칙적이고 차분한 블루진 컬러, 그리드 구조 형태의 정렬.',
        tokens: {
            bg: '#f4f4f4',
            fg: '#161616',
            primary: '#0f62fe',
            accent: '#20d6fe',
            border: '#e0e0e0',
            fonts: '"IBM Plex Sans", sans-serif',
            layout: 'Carbon design system, structured blue layouts, developer tables.',
            radius: '0px',
            shadow: 'None'
        }
    },
    nvidia: {
        category: 'media',
        domain: 'nvidia.com',
        popularity: 95,
        name_en: 'NVIDIA',
        name_ko: 'NVIDIA (엔비디아)',
        desc_en: 'GPU computing. Green-black energy, technical power aesthetic.',
        desc_ko: '엔비디아 하드웨어 스타일. 블랙메탈 배경 속 녹색 엔비디아 시그널 램프 컬러 및 각진 다이아몬드 그리드.',
        tokens: {
            bg: '#000000',
            fg: '#ffffff',
            primary: '#76b900',
            accent: '#76b900',
            border: '#222222',
            fonts: '"Outfit", sans-serif',
            layout: 'Green-black GPU energy, sharp angular tech divisions.',
            radius: '4px',
            shadow: '0 0 15px rgba(118, 185, 0, 0.2)'
        }
    },
    pinterest: {
        category: 'media',
        domain: 'pinterest.com',
        popularity: 90,
        name_en: 'Pinterest',
        name_ko: 'Pinterest (핀터레스트)',
        desc_en: 'Visual discovery. Red accent, masonry grid, image-first.',
        desc_ko: '핀터레스트 스타일. 이미지 타일 핀(Masonry) 그리드 배치, 강렬한 레드 포인트 라벨 구성.',
        tokens: {
            bg: '#ffffff',
            fg: '#111111',
            primary: '#e60023',
            accent: '#e60023',
            border: '#efefef',
            fonts: '"Inter", sans-serif',
            layout: 'Masonry image grids, bright red hover tags, round rounded search bars.',
            radius: '32px',
            shadow: '0 4px 12px rgba(0,0,0,0.06)'
        }
    },
    playstation: {
        category: 'media',
        domain: 'playstation.com',
        popularity: 91,
        name_en: 'PlayStation',
        name_ko: 'PlayStation (플레이스테이션)',
        desc_en: 'Gaming console. Three-surface channel layout, cyan hover-scale.',
        desc_ko: 'PS 게임샵 테마 스타일. 3단으로 나뉘는 세부 서페이스 채널 탭 메뉴, 밝은 파랑 불빛 액션.',
        tokens: {
            bg: '#000000',
            fg: '#ffffff',
            primary: '#0072ce',
            accent: '#00aaee',
            border: '#222222',
            fonts: '"SF Pro", sans-serif',
            layout: 'Three-surface game channel layouts, cyan hover-scale cards.',
            radius: '10px',
            shadow: '0 10px 30px rgba(0, 114, 206, 0.3)'
        }
    },
    spacex: {
        category: 'media',
        domain: 'spacex.com',
        popularity: 93,
        name_en: 'SpaceX',
        name_ko: 'SpaceX (스페이스엑스)',
        desc_en: 'Space tech. Stark black and white, full-bleed imagery, futuristic.',
        desc_ko: '스페이스X 우주선 테마. 극도의 블랙 앤 화이트 대비 및 고해상도 대형 메인 우주선 사진 배치.',
        tokens: {
            bg: '#000000',
            fg: '#ffffff',
            primary: '#ffffff',
            accent: '#888888',
            border: 'rgba(255,255,255,0.1)',
            fonts: '"Inter", sans-serif',
            layout: 'Stark aerospace launchpads, massive full-bleed space backdrops.',
            radius: '0px',
            shadow: 'None'
        }
    },
    spotify: {
        category: 'media',
        domain: 'spotify.com',
        popularity: 96,
        name_en: 'Spotify',
        name_ko: 'Spotify (스포티파이)',
        desc_en: 'Music streaming. Vibrant green on dark, bold type, album-art-driven.',
        desc_ko: '스포티파이 테마 스타일. 검정 바탕 속 둥근 연두색 플레이 버튼 및 커다란 정적 앨범 썸네일 카드.',
        tokens: {
            bg: '#121212',
            fg: '#ffffff',
            primary: '#1db954',
            accent: '#191414',
            border: '#282828',
            fonts: '"Montserrat", sans-serif',
            layout: 'Music player panels, album art cards, bright green playback accents.',
            radius: '8px',
            shadow: '0 8px 24px rgba(0,0,0,0.5)'
        }
    },
    theverge: {
        category: 'media',
        domain: 'theverge.com',
        popularity: 84,
        name_en: 'The Verge',
        name_ko: 'The Verge (더버전)',
        desc_en: 'Tech editorial. Acid-mint and ultraviolet accents, Manuka display type.',
        desc_ko: '더 버지 스타일 IT 저널리즘. 하이컨트라스트 민트그린/핫핑크 매칭 및 거대한 고딕 헤드라인.',
        tokens: {
            bg: '#0a0a0a',
            fg: '#ffffff',
            primary: '#e5ff00',
            accent: '#d500f9',
            border: '#222222',
            fonts: '"Manuka", sans-serif',
            layout: 'Tech editorial news, acid-mint and neon magenta highlights.',
            radius: '0px',
            shadow: '0 4px 10px rgba(213, 0, 249, 0.2)'
        }
    },
    uber: {
        category: 'media',
        domain: 'uber.com',
        popularity: 94,
        name_en: 'Uber',
        name_ko: 'Uber (우버)',
        desc_en: 'Mobility platform. Bold black and white, tight type, urban energy.',
        desc_ko: '우버 모빌리티 테마. 화려함을 절제한 블랙 앤 화이트 로고 플레이와 자간이 좁은 현대 도시풍 폰트.',
        tokens: {
            bg: '#ffffff',
            fg: '#000000',
            primary: '#000000',
            accent: '#000000',
            border: '#e2e2e2',
            fonts: '"Uber Move", sans-serif',
            layout: 'Bold black and white transport lines, tight typographic margins.',
            radius: '0px',
            shadow: 'None'
        }
    },
    vodafone: {
        category: 'media',
        domain: 'vodafone.com',
        popularity: 78,
        name_en: 'Vodafone',
        name_ko: 'Vodafone (보다폰)',
        desc_en: 'Global telecom. Monumental uppercase display, Vodafone Red chapter bands.',
        desc_ko: '보다폰 레드 띠 형태의 단락 구분 디자인 및 볼드 대문자 헤드라인.',
        tokens: {
            bg: '#ffffff',
            fg: '#000000',
            primary: '#e60000',
            accent: '#e60000',
            border: '#e5e5e5',
            fonts: '"Inter", sans-serif',
            layout: 'Red telecom chapter banners, sharp borders, bold display headings.',
            radius: '8px',
            shadow: '0 4px 12px rgba(230, 0, 0, 0.05)'
        }
    },
    wired: {
        category: 'media',
        domain: 'wired.com',
        popularity: 85,
        name_en: 'WIRED',
        name_ko: 'WIRED (와이어드)',
        desc_en: 'Tech magazine. Paper-white broadsheet density, custom serif, ink-blue links.',
        desc_ko: '와이어드 잡지사 스타일. 오래된 신문 인쇄용 세리프 서체 및 진한 잉크블루 톤 링크 디자인.',
        tokens: {
            bg: '#ffffff',
            fg: '#111111',
            primary: '#0033aa',
            accent: '#000000',
            border: '#dddddd',
            fonts: '"Georgia", serif',
            layout: 'Paper-white broadsheet columns, ink-blue links, custom editorial borders.',
            radius: '0px',
            shadow: 'None'
        }
    },

    // Automotive
    bmw: {
        category: 'auto',
        domain: 'bmw.com',
        popularity: 91,
        name_en: 'BMW',
        name_ko: 'BMW (비엠더블유)',
        desc_en: 'Luxury automotive. Dark premium surfaces, precise German engineering.',
        desc_ko: 'BMW 럭셔리 쇼룸 스타일. 짙은 회색 and 하이메탈 실버 프레임 테마, 완벽한 균형의 기계식 정렬.',
        tokens: {
            bg: '#111111',
            fg: '#ffffff',
            primary: '#0066b2',
            accent: '#d3d3d3',
            border: '#2c2c2c',
            fonts: '"Outfit", sans-serif',
            layout: 'Dark luxury automotive showrooms, precise metallic borders.',
            radius: '4px',
            shadow: '0 5px 25px rgba(0, 0, 0, 0.7)'
        }
    },
    bmwm: {
        category: 'auto',
        domain: 'bmw-m.com',
        popularity: 88,
        name_en: 'BMW M',
        name_ko: 'BMW M (비엠더블유 M)',
        desc_en: 'Motorsport performance. Contrast layout, M color accents, precision.',
        desc_ko: 'BMW 고성능 M 디비전 스타일. 레이싱 카본 패널, 스포티한 M 컬러(하늘/파랑/빨강)의 보더 포인트.',
        tokens: {
            bg: '#050505',
            fg: '#ffffff',
            primary: '#e02424',
            accent: '#1d4ed8',
            border: '#222',
            fonts: '"Inter", sans-serif',
            layout: 'Motorsport racing stripes, red/blue highlight glow tags.',
            radius: '0px',
            shadow: '0 0 10px rgba(224, 36, 36, 0.2)'
        }
    },
    bugatti: {
        category: 'auto',
        domain: 'bugatti.com',
        popularity: 85,
        name_en: 'Bugatti',
        name_ko: 'Bugatti (부가티)',
        desc_en: 'Luxury hypercar. Cinema-black canvas, monochrome austerity, monumental display.',
        desc_ko: '부가티 수퍼카 스타일. 칠흑 다크 초고급 쇼룸, 기하학적 아치 서페이스 모티프.',
        tokens: {
            bg: '#000000',
            fg: '#ffffff',
            primary: '#002f6c',
            accent: '#002f6c',
            border: '#1a1a1a',
            fonts: '"Outfit", sans-serif',
            layout: 'Monochrome luxury hypercars, cinema-black canvases, monumental titles.',
            radius: '4px',
            shadow: 'None'
        }
    },
    ferrari: {
        category: 'auto',
        domain: 'ferrari.com',
        popularity: 92,
        name_en: 'Ferrari',
        name_ko: 'Ferrari (페라리)',
        desc_en: 'Chiaroscuro black-white editorial, Ferrari Red with extreme sparseness.',
        desc_ko: '페라리 이탈리안 쇼룸 스타일. 흑백 키아로스쿠로(대비) 속 극도로 절제된 페라리 레드 포인트.',
        tokens: {
            bg: '#0d0d0d',
            fg: '#f7f7f7',
            primary: '#ff0000',
            accent: '#ffffff',
            border: '#1f1f1f',
            fonts: '"Georgia", serif',
            layout: 'Chiaroscuro editorial showrooms, rare Ferrari Red highlights.',
            radius: '0px',
            shadow: 'None'
        }
    },
    lamborghini: {
        category: 'auto',
        domain: 'lamborghini.com',
        popularity: 90,
        name_en: 'Lamborghini',
        name_ko: 'Lamborghini (람보르기니)',
        desc_en: 'True black cathedral, gold accent, LamboType custom Neo-Grotesk.',
        desc_ko: '람보르기니 스타일. 어둠 속 다이아몬드 육각 그릴 패턴, 람보 골드 및 전용 헤드라인 배치.',
        tokens: {
            bg: '#020202',
            fg: '#f4f4f4',
            primary: '#d4af37',
            accent: '#000000',
            border: '#1c1c1c',
            fonts: '"LamboType", sans-serif',
            layout: 'True black gold cathedral, sharp geometric layouts.',
            radius: '0px',
            shadow: '0 0 25px rgba(212, 175, 55, 0.15)'
        }
    },
    renault: {
        category: 'auto',
        domain: 'renault.com',
        popularity: 81,
        name_en: 'Renault',
        name_ko: 'Renault (르노)',
        desc_en: 'Vivid aurora gradients, NouvelR typeface, zero-radius buttons.',
        desc_ko: '르노 미래지향 쇼룸 테마. 오로라 빛 흐릿한 그라데이션 광원 배치 및 직각 버튼.',
        tokens: {
            bg: '#ffffff',
            fg: '#000000',
            primary: '#ffcc00',
            accent: '#000000',
            border: '#ececec',
            fonts: '"NouvelR", sans-serif',
            layout: 'Vivid aurora gradients, zero-radius buttons, French automotive style.',
            radius: '0px',
            shadow: 'None'
        }
    },
    tesla: {
        category: 'auto',
        domain: 'tesla.com',
        popularity: 97,
        name_en: 'Tesla',
        name_ko: 'Tesla (테슬라)',
        desc_en: 'Radical design subtraction, cinematic full-viewport photo, Universal Sans.',
        desc_ko: '테슬라 미니멀리즘 스타일. 메인 네비게이션 최소화 및 풀 뷰포트 고품질 차체 실물 사진 연출.',
        tokens: {
            bg: '#ffffff',
            fg: '#171a20',
            primary: '#cc0000',
            accent: '#171a20',
            border: '#e2e2e2',
            fonts: '"Universal Sans", sans-serif',
            layout: 'Radical design subtraction, cinematic full-viewport images.',
            radius: '10px',
            shadow: 'None'
        }
    },

    // Retro Web
    dell1996: {
        category: 'retro',
        domain: 'dell.com',
        popularity: 72,
        name_en: 'Dell (1996)',
        name_ko: 'Dell (1996년 레트로)',
        desc_en: 'Catalog-era enterprise web. Flat color-block ribbon cards, beveled product photos.',
        desc_ko: '90년대 카탈로그 스타일 PC 몰. 회색 투박한 프레임 윈도우, beveled 입체 아이콘 및 GIF 딱지.',
        tokens: {
            bg: '#000000',
            fg: '#ffffff',
            primary: '#0000ff',
            accent: '#ff0000',
            border: '#333333',
            fonts: '"Times New Roman", Times, serif',
            layout: 'Catalog-era web, beveled frames, colorful beveled GIF seals.',
            radius: '0px',
            shadow: 'None'
        }
    },
    nintendo2001: {
        category: 'retro',
        domain: 'nintendo.com',
        popularity: 78,
        name_en: 'Nintendo.com (2001)',
        name_ko: '닌텐도 (2001년 Y2K)',
        desc_en: 'Y2K console chrome web. Carbon nav glowing amber, circuit-board hero fields.',
        desc_ko: 'Y2K 콘솔 크롬 웹 스타일. 서킷보드 패턴 배경, 외곽선이 뚜렷하고 도톰한 박스아키타이포.',
        tokens: {
            bg: '#2b2e3a',
            fg: '#ffffff',
            primary: '#ffcc00',
            accent: '#6366f1',
            border: '#4b5563',
            fonts: '"Arial Black", sans-serif',
            layout: 'Y2K carbon console chrome panels, brushed periwinkle, Mario bubbles.',
            radius: '15px',
            shadow: '0 8px 16px rgba(0,0,0,0.5)'
        }
    }
};

// Premium Page Purchase options (Benchmark package)
const premiumPackage = {
    id: 'premium-landing-page',
    name_en: 'Premium Landing Page Deployed',
    name_ko: '프리미엄 랜딩페이지 구축형',
    price: 100
};

// Translation Dictionaries
const translations = {
    en: {
        "logo-subtitle": "LANDING PAGE!",
        "nav-home": "Home",
        "nav-catalog": "Style Catalog",
        "nav-pricing": "Pricing",
        "btn-orders": "My Orders",
        "hero-badge": "AI Design Blueprints",
        "hero-title": "AI Landing Page Creator!",
        "hero-desc": "Scaffold visual spec templates for free. Request premium custom deployment and hosted builds for $100 per page.",
        "btn-catalog": "Browse Free Styles",
        "btn-order-custom": "Order Custom Page",
        
        "stat-brand-styles": "Brand Styles",
        "stat-md-scaffolds": "Markdown Specs",
        "stat-custom-build": "Premium Custom Build",
        "stat-cdn": "CDN Deployed Ready",

        "sec-prop-title": "Premium Styles, Free Scaffolding",
        "sec-prop-subtitle": "Generate brand-aligned layouts using awesome-design-md specifications. Copy the configurations for free or pay for full hosted setups.",
        "feat-free-title": "Free Markdown Spec",
        "feat-free-desc": "All templates are completely free to extract. Simply copy the DESIGN.md code to direct your AI agent in seconds.",
        "feat-hosted-title": "Fully Managed Hosting",
        "feat-hosted-desc": "Our premium package hooks your landing page to globally optimized edge networks (CDN) for sub-second load times.",
        "feat-domain-title": "Custom Domain Setup",
        "feat-domain-desc": "We configure SSL protocols, DNS registers, and connect your business landing pages directly to your custom domain.",

        "catalog-sub": "Explore popular brand design layouts. Copy the visual codes for free, or launch a premium custom deployment.",
        "btn-get-spec": "Get Free MD Code",
        "btn-order-build": "Order Premium Build",

        "pricing-sub": "Pay per page. Free templates forever. Premium custom hosting and integrations are fully managed.",
        "badge-managed": "Done-For-You Build",
        "lbl-custom-tier": "Premium Custom Deployment",
        "tier-custom-desc": "Fully engineered landing page customized for your business. Deployed on secure CDNs and connected to your custom domain.",
        "p-feat1": "Stripe, Linear, or Notion Layout Customization",
        "p-feat2": "Custom Domain Integration & SSL Setup",
        "p-feat3": "Globally Hosted CDN Edge Network",
        "p-feat4": "SMM / B2C Lead Database Integration",
        "p-feat5": "Mobile Responsive & SEO Validation Checked",

        "view-orders-title": "My Purchase History",
        "view-orders-sub": "Review your successful orders. Your data is stored locally in your browser workspace.",
        "th-date": "Order Date",
        "th-order-id": "Transaction ID",
        "th-product": "Product",
        "th-tier": "Style Selected",
        "th-ref-url": "Reference URL",
        "th-qty": "Pages Count",
        "th-total": "Total Paid",
        "th-status": "Status",
        "no-orders-msg": "No purchase records found. Make your first order to see history here!",

        "modal-title": "Configure Order",
        "modal-desc": "Configure quantity and complete secure PayPal payment.",
        "modal-base-pkg": "Selected Design Style:",
        "modal-base-price-label": "Base Price:",
        "modal-email-label": "Email Address *",
        "modal-email-placeholder": "name@example.com",
        "modal-email-error": "Please enter a valid email address.",
        "modal-refurl-label": "Reference URL / Benchmark Page",
        "modal-refurl-none": "None (Not Selected)",
        "modal-refurl-placeholder": "https://example.com/reference-landing-page",
        "modal-refurl-error": "Please enter a valid URL.",
        "modal-pages-count": "Pages Count:",
        "modal-total-amt": "Total Amount:",
        "modal-test-btn": "Run Sandbox Test Checkout",
        "badge-ssl": "SSL Secured Checkout",
        "badge-paypal": "PayPal Verified",

        "lbl-copy-instructions": "Copy the DESIGN.md visual rules below to guide your AI coding agent.",
        "btn-copy": "Copy Spec",
        "btn-copy-done": "Copied!",
        "btn-scaffold-dfy": "Order Premium CDN Deployment ($100)",
        "lbl-selected-style": "Custom Selection: ",
        "lbl-custom-selection": "Tailor-made Style",
        
        "search-placeholder": "Search brand styles...",
        
        // Receipts
        "receipt-header": "BIBLEFORAI - LANDING PAGE RECEIPT",
        "receipt-date": "Order Date",
        "receipt-txid": "Transaction ID",
        "receipt-email": "Customer Email",
        "receipt-type": "Product Type",
        "receipt-size": "Style Specification",
        "receipt-refurl": "Reference URL",
        "receipt-qty": "Pages Count",
        "receipt-baseprice": "Base Price",
        "receipt-total": "Total Paid",
        "receipt-status": "Status",
        "receipt-method": "Payment Method",
        "receipt-method-val": "PayPal Secure Checkout"
    },
    ko: {
        "logo-subtitle": "랜딩페이지!",
        "nav-home": "홈",
        "nav-catalog": "디자인 카탈로그",
        "nav-pricing": "가격정책",
        "btn-orders": "내 주문 내역",
        "hero-badge": "AI 디자인 블루프린트",
        "hero-title": "AI 랜딩페이지 빌더!",
        "hero-desc": "디자인 사양서 템플릿을 무료로 가져가세요. 글로벌 CDN 배포 및 맞춤 도메인 설정이 완료된 구축형 상품은 페이지당 130,000원에 제공됩니다.",
        "btn-catalog": "무료 스타일 둘러보기",
        "btn-order-custom": "맞춤형 페이지 주문하기",
        
        "stat-brand-styles": "검증된 스타일",
        "stat-md-scaffolds": "무료 명세서",
        "stat-custom-build": "커스텀 빌드 제공",
        "stat-cdn": "글로벌 배포 지원",

        "sec-prop-title": "프리미엄 스타일의 무료 제공",
        "sec-prop-subtitle": "awesome-design-md의 검증된 가이드라인으로 랜딩페이지를 무료로 구상해보세요. 필요하신 경우 전문가의 설계 배포도 가능합니다.",
        "feat-free-title": "무료 마크다운 코드",
        "feat-free-desc": "카탈로그에 포함된 모든 브랜드 가이드는 무료로 복사할 수 있습니다. 마크다운 사양을 복사하여 AI 코딩 에이전트에 지시해보세요.",
        "feat-hosted-title": "글로벌 호스팅 지원",
        "feat-hosted-desc": "프리미엄 플랜 결제 시, 완성된 페이지를 글로벌 엣지 네트워크(CDN)에 업로드하여 가장 빠른 접속 속도를 보장합니다.",
        "feat-domain-title": "보안 도메인 연동",
        "feat-domain-desc": "SSL 보안서 인증, 네임서버 포워딩을 대행하여 귀사만의 개인 도메인 주소로 바로 연결될 수 있게 처리합니다.",

        "catalog-sub": "인기 브랜드 스타일을 확인해 보세요. 디자인 가이드(DESIGN.md) 코드는 무료이며, 구축 대행 주문도 열려있습니다.",
        "btn-get-spec": "가이드 코드 복사",
        "btn-order-build": "구축 대행 신청",

        "pricing-sub": "페이지 수량 기준 가격입니다. 사양 가이드는 항상 무료이며, 배포 대행 서비스는 풀 매니지드로 지원됩니다.",
        "badge-managed": "전문가 대행 빌드",
        "lbl-custom-tier": "프리미엄 커스텀 배포",
        "tier-custom-desc": "당사 전문 AI 에이전트를 통해 맞춤 제작된 비즈니스용 랜딩페이지입니다. 고성능 CDN 호스팅 및 도메인 연동이 모두 제공됩니다.",
        "p-feat1": "Stripe, Linear, Notion 등 원하는 브랜드 스타일 커스텀 조율",
        "p-feat2": "보안인증서(SSL) 무상 연동 및 네임서버 네비게이팅 대행",
        "p-feat3": "지연율이 전혀 없는 글로벌 CDN 에이전트 호스팅 서포트",
        "p-feat4": "소셜 부스터 마케팅(SMM) 및 고객 데이터베이스 연결 가설 지원",
        "p-feat5": "스마트폰 모바일 반응형 디자인 레이아웃 및 SEO 적합성 검증 필",

        "view-orders-title": "내 구매 히스토리",
        "view-orders-sub": "성공한 주문 내역을 검토하세요. 결제 히스토리는 브라우저 로컬스토리지에 안전하게 기록됩니다.",
        "th-date": "주문 날짜",
        "th-order-id": "거래 ID",
        "th-product": "상품 분류",
        "th-tier": "선택 스타일",
        "th-ref-url": "레퍼런스 링크",
        "th-qty": "페이지 수",
        "th-total": "결제 금액",
        "th-status": "진행 상태",
        "no-orders-msg": "구매 기록이 없습니다. 스타일 카탈로그나 가격판에서 빌더 서비스를 구매해 보십시오!",

        "modal-title": "주문 세부 설정",
        "modal-desc": "수량을 선택하고 안전한 PayPal 결제를 진행하세요.",
        "modal-base-pkg": "선택 디자인 스타일:",
        "modal-base-price-label": "기본 단가:",
        "modal-email-label": "이메일 주소 *",
        "modal-email-placeholder": "name@example.com",
        "modal-email-error": "올바른 형식의 이메일 주소를 입력해주세요.",
        "modal-refurl-label": "레퍼런스 웹페이지 링크",
        "modal-refurl-none": "선택 안 함 (없음)",
        "modal-refurl-placeholder": "https://example.com/reference-landing-page",
        "modal-refurl-error": "올바른 URL 주소 형식(http/https 포함)을 입력해 주세요.",
        "modal-pages-count": "페이지 개수:",
        "modal-total-amt": "총 결제금액:",
        "modal-test-btn": "샌드박스 테스트 결제 진행",
        "badge-ssl": "SSL 보안 결제 완료",
        "badge-paypal": "PayPal 공식 연동됨",

        "lbl-copy-instructions": "아래의 DESIGN.md 디자인 가이드 코드를 복사하여 AI 개발 에이전트에 지시어로 입력하세요.",
        "btn-copy": "가이드 복사",
        "btn-copy-done": "복사 완료!",
        "btn-scaffold-dfy": "프리미엄 CDN 배포 및 구축 주문하기 ($100)",
        "lbl-selected-style": "선택 스타일: ",
        "lbl-custom-selection": "비즈니스 맞춤형 디자인",
        
        "search-placeholder": "브랜드 스타일 검색...",
        
        // Receipts
        "receipt-header": "BIBLEFORAI - 랜딩페이지 빌더 결제 영수증",
        "receipt-date": "주문 날짜",
        "receipt-txid": "거래 ID",
        "receipt-email": "고객 이메일",
        "receipt-type": "상품 종류",
        "receipt-size": "디자인 스타일",
        "receipt-refurl": "참조 레퍼런스 URL",
        "receipt-qty": "페이지 수량",
        "receipt-baseprice": "기본 가격",
        "receipt-total": "총 결제금액",
        "receipt-status": "진행 상태",
        "receipt-method": "결제 방식",
        "receipt-method-val": "PayPal 안전 결제"
    }
};

// Fetch current active language from unified key 'bibleforai_lang'
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

// Document Ready
document.addEventListener('DOMContentLoaded', () => {
    applyTranslations();
    renderCategoryTabs();
    renderCatalog();
    renderOrders();

    // Backdrop click handlers
    const buyBackdrop = document.getElementById('purchase-modal');
    if (buyBackdrop) {
        buyBackdrop.addEventListener('click', (e) => {
            if (e.target === buyBackdrop) closeModal();
        });
    }


});

// Render Category Filter Tabs
function renderCategoryTabs() {
    const container = document.getElementById('catalog-category-tabs');
    if (!container) return;
    container.innerHTML = '';
    const lang = currentLang;

    Object.keys(categories).forEach(key => {
        const btn = document.createElement('button');
        btn.className = `tab-btn ${key === selectedCategory ? 'active' : ''}`;
        btn.innerText = categories[key][lang];
        btn.onclick = () => {
            selectedCategory = key;
            renderCategoryTabs();
            renderCatalog();
        };
        container.appendChild(btn);
    });
}



// Render Style Catalog (sorted by popularity score descending)
function renderCatalog() {
    const grid = document.getElementById('catalog-grid-items');
    if (!grid) return;

    grid.innerHTML = '';
    const lang = currentLang;
    const searchTerm = (document.getElementById('catalog-search')?.value || '').toLowerCase().trim();

    // Sort keys based on popularity score descending
    const sortedKeys = Object.keys(brandStyles).sort((a, b) => {
        return (brandStyles[b].popularity || 50) - (brandStyles[a].popularity || 50);
    });

    sortedKeys.forEach(key => {
        const item = brandStyles[key];
        
        // Category filter
        if (selectedCategory !== 'all' && item.category !== selectedCategory) return;

        // Search filter
        const name = lang === 'ko' ? item.name_ko : item.name_en;
        const desc = lang === 'ko' ? item.desc_ko : item.desc_en;
        
        if (searchTerm) {
            const matchName = name.toLowerCase().includes(searchTerm);
            const matchDesc = desc.toLowerCase().includes(searchTerm);
            const matchKey = key.toLowerCase().includes(searchTerm);
            if (!matchName && !matchDesc && !matchKey) return;
        }

        const card = document.createElement('div');
        card.className = 'catalog-card';
        card.innerHTML = `
            <span class="catalog-badge">${categories[item.category][lang]}</span>
            <div class="card-icon" style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: center; width: 64px; height: 64px; border-radius: 16px; margin-bottom: 1.5rem; overflow: hidden; backdrop-filter: blur(5px);">
                <img src="https://www.google.com/s2/favicons?sz=64&domain=${item.domain}" alt="${name}" style="width: 32px; height: 32px; object-fit: contain;" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' width=\'32\' height=\'32\' fill=\'%236366f1\'><path d=\'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.04-.42 1.99-1.07 2.75z\'/></svg>'">
            </div>
            <h3>${name}</h3>
            <p>${desc}</p>
            <div class="catalog-actions">
                <button class="btn-catalog-premium" onclick="openPurchaseModal('${key}')" data-i18n="btn-order-build">${translations[lang]['btn-order-build']}</button>
            </div>
        `;
        grid.appendChild(card);
    });

    if (grid.children.length === 0) {
        grid.innerHTML = `
            <div class="no-data-msg" style="grid-column: 1 / -1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1rem; padding: 4rem 2rem;">
                <i class="fa-solid fa-magnifying-glass" style="font-size: 2.5rem; opacity: 0.3;"></i>
                <p>${lang === 'ko' ? '일치하는 디자인 스타일이 없습니다. 다른 키워드로 검색해 보세요.' : 'No matching design styles found. Try searching with a different keyword.'}</p>
            </div>
        `;
    }
}



// Purchase modal controls
function openPurchaseModal(styleKey) {
    const lang = currentLang;
    const isKo = lang === 'ko';
    
    let styleName = '';
    
    if (styleKey === 'custom') {
        currentPackage = {
            key: 'custom',
            name_en: translations['en']['lbl-custom-selection'],
            name_ko: translations['ko']['lbl-custom-selection'],
            price: premiumPackage.price
        };
        styleName = translations[lang]['lbl-custom-selection'];
    } else {
        const item = brandStyles[styleKey];
        if (item) {
            currentPackage = {
                key: styleKey,
                name_en: item.name_en,
                name_ko: item.name_ko,
                price: premiumPackage.price
            };
            styleName = isKo ? item.name_ko : item.name_en;
        }
    }

    orderQuantity = 1;

    // Reset inputs
    document.getElementById('modal-package-name').innerText = styleName;
    document.getElementById('modal-base-price').innerText = formatPrice(premiumPackage.price);
    document.getElementById('order-quantity').value = orderQuantity;
    document.getElementById('order-email').value = '';
    document.getElementById('email-error').style.display = 'none';
    
    const noneCheckbox = document.getElementById('refurl-none');
    noneCheckbox.checked = false;
    toggleReferenceUrl(false);
    
    document.getElementById('order-refurl').value = '';
    document.getElementById('refurl-error').style.display = 'none';

    updateModalPrice();

    document.getElementById('purchase-modal').classList.add('active');

    // Init PayPal
    initPayPalSdk();
}

function toggleReferenceUrl(isNoneChecked) {
    const urlInput = document.getElementById('order-refurl');
    const errorSpan = document.getElementById('refurl-error');

    if (isNoneChecked) {
        urlInput.disabled = true;
        urlInput.value = '';
        urlInput.style.opacity = 0.45;
        errorSpan.style.display = 'none';
        urlInput.style.borderColor = 'rgba(255,255,255,0.06)';
    } else {
        urlInput.disabled = false;
        urlInput.style.opacity = 1;
        urlInput.placeholder = translations[currentLang]['modal-refurl-placeholder'];
    }
}

function updateModalPrice() {
    if (!currentPackage) return;
    const qtyInput = document.getElementById('order-quantity');
    orderQuantity = parseInt(qtyInput.value) || 1;
    if (orderQuantity < 1) {
        orderQuantity = 1;
        qtyInput.value = 1;
    }

    const total = currentPackage.price * orderQuantity;
    document.getElementById('modal-total-price').innerText = formatPrice(total);

    // Re-render PayPal buttons with new total amount
    if (window.paypal && paypalButtonInstance) {
        paypalButtonInstance.close();
        renderPayPalButtons();
    }
}

function adjustQty(amount) {
    const qtyInput = document.getElementById('order-quantity');
    let val = parseInt(qtyInput.value) || 1;
    val += amount;
    if (val < 1) val = 1;
    qtyInput.value = val;
    updateModalPrice();
}

// Complete order logic
function processOrderCompleted(txId) {
    const email = document.getElementById('order-email').value.trim();
    const noneCheckbox = document.getElementById('refurl-none');
    const urlVal = noneCheckbox.checked ? 'None / Not Selected' : document.getElementById('order-refurl').value.trim();
    const pkg = currentPackage;
    const qty = orderQuantity;
    const total = pkg.price * qty;

    const orderData = {
        date: new Date().toLocaleDateString(currentLang === 'ko' ? 'ko-KR' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
        transactionId: txId,
        product: 'AI Landing Page',
        tier: currentLang === 'ko' ? pkg.name_ko : pkg.name_en,
        refUrl: urlVal,
        qty: qty,
        total: formatPrice(total),
        status: 'Completed'
    };

    // Save locally
    const existingOrders = JSON.parse(localStorage.getItem('bibleforai_orders')) || [];
    existingOrders.unshift(orderData);
    localStorage.setItem('bibleforai_orders', JSON.stringify(existingOrders));

    // Plain-text readable receipt for Google Form parameter
    const lang = currentLang;
    const receiptText = `
=============================================
${translations[lang]['receipt-header']}
=============================================
${translations[lang]['receipt-date']}: ${orderData.date}
${translations[lang]['receipt-txid']}: ${orderData.transactionId}
${translations[lang]['receipt-email']}: ${email}
${translations[lang]['receipt-type']}: ${orderData.product}
${translations[lang]['receipt-size']}: ${orderData.tier}
${translations[lang]['receipt-refurl']}: ${orderData.refUrl}
${translations[lang]['receipt-qty']}: ${orderData.qty}
${translations[lang]['receipt-baseprice']}: ${formatPrice(pkg.price)}
${translations[lang]['receipt-total']}: ${orderData.total}
${translations[lang]['receipt-status']}: ${orderData.status}
${translations[lang]['receipt-method']}: ${translations[lang]['receipt-method-val']}
=============================================
`;

    // Construct GET submission params
    const submissionData = {
        transaction_id: txId,
        email: email,
        product_name: orderData.product,
        design_style: orderData.tier,
        reference_url: orderData.refUrl,
        quantity_pages: qty,
        unit_price: '$' + pkg.price.toFixed(2),
        total_paid: orderData.total,
        purchase_date: orderData.date,
        receipt_invoice: receiptText
    };

    // Encode JSON and build Google Form redirect target URL
    const jsonString = JSON.stringify(submissionData);
    const encodedJson = encodeURIComponent(jsonString);
    const formUrl = `https://docs.google.com/forms/d/e/1FAIpQLScMPqbEWWttS5mb1m_krsO_kco24ImpgvYVSbc7zO0nEVmYFw/viewform?entry.1059822061=${encodedJson}`;

    // Close, refresh and redirect
    closeModal();
    renderOrders();
    
    // Redirect customer
    window.location.href = formUrl;
}

function closeModal() {
    document.getElementById('purchase-modal').classList.remove('active');
    if (paypalButtonInstance) {
        paypalButtonInstance.close();
        paypalButtonInstance = null;
    }
    currentPackage = null;
}

// Validators
function validateInputs() {
    const emailInput = document.getElementById('order-email');
    const emailError = document.getElementById('email-error');
    const emailVal = emailInput.value.trim();

    // Email regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const emailValid = emailRegex.test(emailVal);

    if (!emailValid) {
        emailError.style.display = 'block';
        emailInput.style.borderColor = '#ef4444';
    } else {
        emailError.style.display = 'none';
        emailInput.style.borderColor = 'rgba(255,255,255,0.06)';
    }

    // Ref URL regex
    const noneCheckbox = document.getElementById('refurl-none');
    const urlInput = document.getElementById('order-refurl');
    const urlError = document.getElementById('refurl-error');
    const urlVal = urlInput.value.trim();

    let urlValid = true;

    if (!noneCheckbox.checked) {
        const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
        urlValid = urlRegex.test(urlVal);

        if (!urlValid) {
            urlError.style.display = 'block';
            urlInput.style.borderColor = '#ef4444';
        } else {
            urlError.style.display = 'none';
            urlInput.style.borderColor = 'rgba(255,255,255,0.06)';
        }
    } else {
        urlError.style.display = 'none';
        urlInput.style.borderColor = 'rgba(255,255,255,0.06)';
    }

    return emailValid && urlValid;
}

// PayPal checkout init
function initPayPalSdk() {
    if (window.paypal) {
        renderPayPalButtons();
    }
}

function renderPayPalButtons() {
    const container = document.getElementById('paypal-button-container');
    if (!container) return;

    container.innerHTML = '';
    
    paypalButtonInstance = window.paypal.Buttons({
        style: {
            layout: 'vertical',
            color:  'gold',
            shape:  'rect',
            label:  'paypal'
        },
        onClick: function(data, actions) {
            const inputsValid = validateInputs();
            if (!inputsValid) {
                return actions.reject();
            }
            return actions.resolve();
        },
        createOrder: function(data, actions) {
            const totalAmount = (currentPackage.price * orderQuantity).toFixed(2);
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        currency_code: 'USD',
                        value: totalAmount
                     },
                    description: `AI Landing Page - ${currentPackage.name_en} x${orderQuantity}`
                }]
            });
        },
        onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
                processOrderCompleted(details.id);
            });
        },
        onError: function(err) {
            console.error('PayPal Checkout error: ', err);
        }
    });

    paypalButtonInstance.render('#paypal-button-container');
}

// Sandbox Test trigger
function triggerTestCheckout() {
    // Developer sandbox: auto-fill mock email if field is empty
    const emailInput = document.getElementById('order-email');
    if (emailInput && !emailInput.value.trim()) {
        emailInput.value = 'sandbox@test.dev';
        emailInput.style.borderColor = 'rgba(255,255,255,0.06)';
        const emailError = document.getElementById('email-error');
        if (emailError) emailError.style.display = 'none';
    }
    const urlInput = document.getElementById('order-refurl');
    const noneCheckbox = document.getElementById('refurl-none');
    if (urlInput && !urlInput.value.trim() && noneCheckbox) {
        noneCheckbox.checked = true;
        const urlError = document.getElementById('refurl-error');
        if (urlError) urlError.style.display = 'none';
        urlInput.style.borderColor = 'rgba(255,255,255,0.06)';
    }
    const inputsValid = validateInputs();
    if (!inputsValid) return;

    const mockTxId = 'SANDBOX-LAND-' + Math.random().toString(36).substring(2, 11).toUpperCase();
    processOrderCompleted(mockTxId);
}

// Render local storage purchase history logs
function renderOrders() {
    const tbody = document.getElementById('orders-tbody');
    const msg = document.getElementById('no-orders-msg');
    if (!tbody) return;

    tbody.innerHTML = '';
    const orders = JSON.parse(localStorage.getItem('bibleforai_orders')) || [];
    
    // Prune for AI Landing Page orders
    const landOrders = orders.filter(o => o.product === 'AI Landing Page');

    if (landOrders.length === 0) {
        msg.style.display = 'flex';
        return;
    }

    msg.style.display = 'none';
    landOrders.forEach(o => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${o.date}</td>
            <td class="tx-link">${o.transactionId}</td>
            <td>${o.product}</td>
            <td>${o.tier}</td>
            <td style="word-break: break-all; max-width: 150px;">${o.refUrl}</td>
            <td>${o.qty}</td>
            <td style="font-weight:700; color:var(--primary);">${o.total}</td>
            <td><span class="badge-status badge-completed">${o.status}</span></td>
        `;
        tbody.appendChild(row);
    });
}

// Router navigate
function navigate(viewName) {
    currentView = viewName;

    // Toggle active link tags
    document.querySelectorAll('.nav-links a').forEach(el => el.classList.remove('active'));
    const navLink = document.getElementById('nav-' + viewName);
    if (navLink) navLink.classList.add('active');

    // Toggle active view sections
    document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
    const section = document.getElementById(viewName + '-view');
    if (section) section.classList.add('active');
}

// Change language state and persist in 'bibleforai_lang'
function changeLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('bibleforai_lang', lang);
    applyTranslations();
    renderCategoryTabs();
    renderCatalog();
    renderOrders();
}

function applyTranslations() {
    const lang = currentLang;
    const isKo = lang === 'ko';
    
    // Set lang parameter
    document.documentElement.lang = lang;

    // Dynamic Header SEO properties
    document.title = isKo ? 
        "BibleForAI - AI 랜딩페이지 빌더 | 고성능 홍보용 랜딩화면 설계 대행" : 
        "BibleForAI - AI Landing Page Creator | Build High-Converting Landing Pages";
    
    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) {
        descMeta.content = isKo ?
            "Stripe, Linear, Notion, Vercel 스타일 가이드라인을 기반으로 랜딩화면 사양을 무료로 구상해보세요. CDN 호스팅 배포가 포함된 대행 구축은 페이지당 130,000원입니다." :
            "Scaffold brand-aligned, conversion-optimized landing pages for free. Curated design systems from Stripe, Linear, Notion, Vercel, and Claude. Premium deployment at $100/page.";
    }

    // Dynamic OG and Twitter attributes update
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.content = isKo ? "BibleForAI - AI 랜딩페이지 빌더" : "BibleForAI - AI Landing Page Creator | Free Templates";
    
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.content = isKo ? "마크다운 기반 브랜드 설계 가이드를 무료 복사하고 AI 코딩 도구를 지시해 보세요. 130,000원 대행 호스팅 패키지 제공." : "Access visual spec templates curated from awesome-design-md. Get free Stripe, Linear, Notion styles, or order custom hosted builds.";

    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.content = isKo ? "AI 랜딩페이지 빌더" : "BibleForAI - AI Landing Page Creator";
    
    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) twDesc.content = isKo ? "브랜드 디자인을 규합한 마크다운 가이드를 무료 복사하고 전문가 호스팅 대행을 구매해 보십시오." : "Generate visual specifications for free or deploy custom SEO-optimized pages for $100/page.";

    // Translate statically tagged DOM segments
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const text = translations[lang][key];
        
        if (text) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = text;
            } else {
                el.innerHTML = text;
            }
        }
    });

    // Update language select box index value
    const selector = document.getElementById('language-selector');
    if (selector) {
        selector.value = lang;
    }
}

// Mobile drawer toggle
function toggleMobileMenu() {
    const drawer = document.getElementById('mobile-drawer');
    drawer.classList.toggle('active');
}
