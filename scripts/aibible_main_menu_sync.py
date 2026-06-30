#!/usr/bin/env python3
from pathlib import Path
import re
import subprocess

ROOT = Path('/Users/dayyoung/project/aibible')

CATALOG = [
    {'id': 'land', 'cat': 'design-dev', 'link': '/landPage/', 'icon': 'fa-solid fa-code', 'popularity': 88},
    {'id': 'pdp', 'cat': 'design-dev', 'link': '/pdpboost/', 'icon': 'fa-solid fa-box-open', 'popularity': 86},
    {'id': 'mvp', 'cat': 'design-dev', 'link': '/mvpboost/', 'icon': 'fa-solid fa-rocket', 'popularity': 91},
    {'id': 'aideploy', 'cat': 'design-dev', 'link': '/aideploy/', 'icon': 'fa-solid fa-cloud-arrow-up', 'popularity': 93},
    {'id': 'autoboost', 'cat': 'design-dev', 'link': '/autoboost/', 'icon': 'fa-solid fa-arrows-rotate', 'popularity': 89},
    {'id': 'fdaboost', 'cat': 'strategy', 'link': '/fdaboost/', 'icon': 'fa-solid fa-vial-circle-check', 'popularity': 78},
    {'id': 'globalbank', 'cat': 'strategy', 'link': '/globalbank/', 'icon': 'fa-solid fa-building-columns', 'popularity': 79},
    {'id': 'webcreate', 'cat': 'design-dev', 'link': '/webcreate/', 'icon': 'fa-solid fa-globe', 'popularity': 84},
    {'id': 'logoboost', 'cat': 'design-dev', 'link': '/logoboost/', 'icon': 'fa-solid fa-pen-nib', 'popularity': 90},
    {'id': 'adsboost', 'cat': 'marketing', 'link': '/adsboost/', 'icon': 'fa-solid fa-bullhorn', 'popularity': 83},
    {'id': 'linkboost', 'cat': 'marketing', 'link': '/linkboost/', 'icon': 'fa-brands fa-linkedin', 'popularity': 83},
    {'id': 'careerlink', 'cat': 'marketing', 'link': '/careerlink/', 'icon': 'fa-brands fa-linkedin', 'popularity': 84},
    {'id': 'atsresume', 'cat': 'marketing', 'link': '/atsresume/', 'icon': 'fa-solid fa-file-lines', 'popularity': 85},
    {'id': 'globalweb', 'cat': 'design-dev', 'link': '/globalweb/', 'icon': 'fa-solid fa-globe', 'popularity': 87},
    {'id': 'cloudinfra', 'cat': 'design-dev', 'link': '/cloudinfra/', 'icon': 'fa-solid fa-cloud', 'popularity': 84},
    {'id': 'japanbiz', 'cat': 'strategy', 'link': '/japanbiz/', 'icon': 'fa-solid fa-earth-asia', 'popularity': 83},
    {'id': 'webseo', 'cat': 'design-dev', 'link': '/webseo/', 'icon': 'fa-solid fa-globe', 'popularity': 88},
    {'id': 'influboost', 'cat': 'marketing', 'link': '/influboost/', 'icon': 'fa-solid fa-bullhorn', 'popularity': 88},
    {'id': 'localize', 'cat': 'strategy', 'link': '/localize/', 'icon': 'fa-solid fa-language', 'popularity': 86},
    {'id': 'engtranslate', 'cat': 'strategy', 'link': '/engtranslate/', 'icon': 'fa-solid fa-language', 'popularity': 88},
    {'id': 'tradeboost', 'cat': 'strategy', 'link': '/tradeboost/', 'icon': 'fa-solid fa-ship', 'popularity': 85},
    {'id': 'amzboost', 'cat': 'marketing', 'link': '/amzboost/', 'icon': 'fa-solid fa-store', 'popularity': 88},
    {'id': 'amzbrand', 'cat': 'marketing', 'link': '/amzbrand/', 'icon': 'fa-brands fa-amazon', 'popularity': 87},
    {'id': 'amzfba', 'cat': 'marketing', 'link': '/amzfba/', 'icon': 'fa-solid fa-truck-fast', 'popularity': 94},
    {'id': 'tikshop', 'cat': 'marketing', 'link': '/tikshop/', 'icon': 'fa-brands fa-tiktok', 'popularity': 89},
    {'id': 'rfp', 'cat': 'strategy', 'link': '/rfpboost/', 'icon': 'fa-solid fa-file-signature', 'popularity': 84},
    {'id': 'complianceboost', 'cat': 'strategy', 'link': '/complianceboost/', 'icon': 'fa-solid fa-shield-halved', 'popularity': 82},
    {'id': 'globalup', 'cat': 'strategy', 'link': '/globalup/', 'icon': 'fa-solid fa-user-tie', 'popularity': 81},
    {'id': 'eventboost', 'cat': 'strategy', 'link': '/eventboost/', 'icon': 'fa-solid fa-microphone-lines', 'popularity': 82},
    {'id': 'micemc', 'cat': 'strategy', 'link': '/micemc/', 'icon': 'fa-solid fa-microphone-lines', 'popularity': 83},
    {'id': 'alicat', 'cat': 'marketing', 'link': '/alicat/', 'icon': 'fa-solid fa-box-open', 'popularity': 83},
    {'id': 'etsyboost', 'cat': 'strategy', 'link': '/etsyboost/', 'icon': 'fa-brands fa-etsy', 'popularity': 91},
    {'id': 'clip', 'cat': 'media', 'link': '/clipboost/', 'icon': 'fa-solid fa-clapperboard', 'popularity': 85},
    {'id': 'mail', 'cat': 'marketing', 'link': '/mailboost/', 'icon': 'fa-solid fa-envelope', 'popularity': 80},
    {'id': 'chat', 'cat': 'strategy', 'link': '/chatboost/', 'icon': 'fa-solid fa-robot', 'popularity': 87},
    {'id': 'search', 'cat': 'marketing', 'link': '/searchboost/', 'icon': 'fa-solid fa-magnifying-glass', 'popularity': 84},
    {'id': 'aso', 'cat': 'marketing', 'link': '/aso/', 'icon': 'fa-solid fa-chart-line', 'popularity': 86},
    {'id': 'mk', 'cat': 'marketing', 'link': '/mkboost/', 'icon': 'fa-solid fa-magnifying-glass-chart', 'popularity': 78},
    {'id': 'img', 'cat': 'design-dev', 'link': '/imgboost/', 'icon': 'fa-solid fa-camera-retro', 'popularity': 83},
    {'id': 'flow', 'cat': 'design-dev', 'link': '/flowboost/', 'icon': 'fa-solid fa-diagram-project', 'popularity': 81},
    {'id': 'ai', 'cat': 'strategy', 'link': '/aiboost/', 'icon': 'fa-solid fa-brain', 'popularity': 89},
    {'id': 'voice', 'cat': 'media', 'link': '/voiceboost/', 'icon': 'fa-solid fa-microphone', 'popularity': 77},
    {'id': 'trans', 'cat': 'media', 'link': '/transboost/', 'icon': 'fa-solid fa-language', 'popularity': 76},
    {'id': 'medboost', 'cat': 'media', 'link': '/medboost/', 'icon': 'fa-solid fa-stethoscope', 'popularity': 77},
    {'id': 'pitch', 'cat': 'media', 'link': '/pitchboost/', 'icon': 'fa-solid fa-chart-line', 'popularity': 79},
    {'id': 'insight', 'cat': 'strategy', 'link': '/insightboost/', 'icon': 'fa-solid fa-chart-bar', 'popularity': 75},
    {'id': 'shop', 'cat': 'strategy', 'link': '/shopboost/', 'icon': 'fa-solid fa-store', 'popularity': 77},
    {'id': 'buyer', 'cat': 'strategy', 'link': '/buyerboost/', 'icon': 'fa-solid fa-handshake', 'popularity': 80},
    {'id': 'research', 'cat': 'strategy', 'link': '/researchboost/', 'icon': 'fa-solid fa-chart-line', 'popularity': 78},
    {'id': 'content', 'cat': 'marketing', 'link': '/contentboost/', 'icon': 'fa-solid fa-newspaper', 'popularity': 86},
    {'id': 'affboost', 'cat': 'marketing', 'link': '/affboost/', 'icon': 'fa-solid fa-rocket', 'popularity': 92},
    {'id': 'sales', 'cat': 'strategy', 'link': '/salesboost/', 'icon': 'fa-solid fa-receipt', 'popularity': 77},
    {'id': 'law', 'cat': 'strategy', 'link': '/lawboost/', 'icon': 'fa-solid fa-scale-balanced', 'popularity': 76},
    {'id': 'aiweb', 'cat': 'design-dev', 'link': '/aiweb/', 'icon': 'fa-solid fa-globe', 'popularity': 83},
    {'id': 'cert', 'cat': 'strategy', 'link': '/certboost/', 'icon': 'fa-solid fa-certificate', 'popularity': 75},
    {'id': 'hr', 'cat': 'strategy', 'link': '/hrboost/', 'icon': 'fa-solid fa-user-tie', 'popularity': 80},
    {'id': 'sys', 'cat': 'design-dev', 'link': '/sysboost/', 'icon': 'fa-solid fa-network-wired', 'popularity': 80},
    {'id': 'loyalty', 'cat': 'strategy', 'link': '/loyaltyboost/', 'icon': 'fa-solid fa-gift', 'popularity': 80},
    {'id': 'book', 'cat': 'design-dev', 'link': '/bookboost/', 'icon': 'fa-solid fa-calendar-check', 'popularity': 80},
    {'id': 'eduooost', 'cat': 'strategy', 'link': '/eduooost/', 'icon': 'fa-solid fa-graduation-cap', 'popularity': 80},
    {'id': 'chinaboost', 'cat': 'strategy', 'link': '/chinaboost/', 'icon': 'fa-solid fa-earth-asia', 'popularity': 87},
    {'id': 'surveyboost', 'cat': 'strategy', 'link': '/surveyboost/', 'icon': 'fa-solid fa-square-poll-vertical', 'popularity': 84},
    {'id': 'shopglobal', 'cat': 'strategy', 'link': '/shopglobal/', 'icon': 'fa-brands fa-shopify', 'popularity': 86},
    {'id': 'indiaboost', 'cat': 'strategy', 'link': '/indiaboost/', 'icon': 'fa-solid fa-earth-asia', 'popularity': 88},
    {'id': 'ip', 'cat': 'strategy', 'link': '/ipboost/', 'icon': 'fa-solid fa-shield-halved', 'popularity': 82},
    {'id': 'map', 'cat': 'marketing', 'link': '/mapboost/', 'icon': 'fa-solid fa-map-location-dot', 'popularity': 80},
    {'id': 'growthconsult', 'cat': 'marketing', 'link': '/growthconsult/', 'icon': 'fa-solid fa-newspaper', 'popularity': 90},
    {'id': 'usllc', 'cat': 'strategy', 'link': '/usllc/', 'icon': 'fa-solid fa-building-columns', 'popularity': 91},
    {'id': 'sbvi', 'cat': 'strategy', 'link': '/sbvi/', 'icon': 'fa-solid fa-building-columns', 'popularity': 92},
    {'id': 'prboost', 'cat': 'marketing', 'link': '/prboost/', 'icon': 'fa-solid fa-newspaper', 'popularity': 89},
    {'id': 'foreigncare', 'cat': 'marketing', 'link': '/foreigncare/', 'icon': 'fa-solid fa-user-doctor', 'popularity': 90},
    {'id': 'aicash', 'cat': 'marketing', 'link': '/aicash/', 'icon': 'fa-solid fa-wand-magic-sparkles', 'popularity': 92},
    {'id': 'dbmigrate', 'cat': 'strategy', 'link': '/dbmigrate/', 'icon': 'fa-solid fa-database', 'popularity': 93},
]


def service_added_at(service_link: str) -> int:
    rel = service_link.strip('/')
    candidates = [
        ROOT / rel / 'index.html',
        ROOT / rel / 'app.js',
        ROOT / rel / 'style.css',
    ]
    for candidate in candidates:
        if not candidate.exists():
            continue
        result = subprocess.run(
            ['git', 'log', '--reverse', '--format=%ct', '--', str(candidate.relative_to(ROOT))],
            cwd=ROOT,
            capture_output=True,
            text=True,
            check=False,
        )
        ts = result.stdout.strip().splitlines()
        if result.returncode == 0 and ts and ts[0].isdigit():
            return int(ts[0])
    target = ROOT / rel / 'index.html'
    if target.exists():
        return int(target.stat().st_mtime)
    return 0


def build_catalog_entries():
    added_map = {s['id']: service_added_at(s['link']) for s in CATALOG}
    max_added = max(added_map.values(), default=0)
    lines = []
    for s in CATALOG:
        added_at = added_map[s['id']]
        if s['id'] in ('globalup', 'eventboost'):
            added_at = max(added_at, max_added + 1)
        if s['id'] == 'growthconsult':
            added_at = max(added_at, max_added + 3)
        if s['id'] == 'prboost':
            added_at = max(added_at, max_added + 2)
        if s['id'] == 'foreigncare':
            added_at = max(added_at, max_added + 4)
        if s['id'] == 'aicash':
            added_at = max(added_at, max_added + 5)
        if s['id'] == 'dbmigrate':
            added_at = max(added_at, max_added + 6)
        if s['id'] == 'usllc':
            added_at = max(added_at, max_added + 7)
        if s['id'] == 'sbvi':
            added_at = max(added_at, max_added + 8)
        lines.append(
            f"            {{ id: '{s['id']}', category: '{s['cat']}', link: '{s['link']}', icon: '{s['icon']}', cardClass: 'card-active-{s['id']}', btnClass: 'btn-{s['id']}', iconBoxClass: 'icon-{s['id']}', popularity: {s['popularity']}, addedAt: {added_at} }}"
        )
    return ',\n'.join(lines) + '\n'


def patch_index_html():
    p = ROOT / 'index.html'
    text = p.read_text()
    
    marker_start = "        const servicesCatalog = [\n"
    # Match correct 8-space indentation
    marker_end = "        ];\n        let activeCategory = 'all';\n"
    
    start = text.index(marker_start)
    end = text.index(marker_end)
    
    entries = build_catalog_entries()
    new_block = f"{marker_start}{entries}{marker_end}"
    text = text[:start] + new_block + text[end + len(marker_end):]
    p.write_text(text)


def validate_translations():
    text = (ROOT / 'index.html').read_text()

    def block_after(marker_start: str, marker_end: str) -> str:
        start_idx = text.index(marker_start)
        end_idx = text.index(marker_end, start_idx)
        return text[start_idx:end_idx]

    en_block = block_after('            en: {', '            ko: {')
    ko_block = block_after('            ko: {', '        };\n\n        // Initialize Language based on system or local storage')

    missing = []
    for lang, block in (('en', en_block), ('ko', ko_block)):
        for s in CATALOG:
            for suffix in ('title', 'desc', 'btn'):
                key = f"{s['id']}-{suffix}"
                if f'"{key}"' not in block:
                    missing.append(f"{lang}:{key}")
    if missing:
        raise SystemExit('missing translation keys: ' + ', '.join(missing))


def audit_catalog_dirs():
    catalog_dirs = {item['link'].strip('/').split('/')[0] for item in CATALOG}
    ignored = {'bible', '_salesboost_tmp_src'}
    service_dirs = {
        p.parent.name for p in ROOT.glob('*/index.html')
        if p.parent.name not in {'kr'} and p.parent.name not in ignored
    }
    missing = sorted(service_dirs - catalog_dirs)
    if missing:
        raise SystemExit('missing catalog entries for service dirs: ' + ', '.join(missing))


def patch_all_service_pages():
    new_items = [
        '            <li><a href="/tikshop/"><i class="fa-brands fa-tiktok"></i> TIKSHOP — TikTok Shop Setup</a></li>\n',
        '            <li><a href="/tradeboost/"><i class="fa-solid fa-ship"></i> TRADEBOOST — Global Trade Agency</a></li>\n',
        '            <li><a href="/linkboost/"><i class="fa-brands fa-linkedin"></i> LINKBOOST — LinkedIn Growth</a></li>\n',
        '            <li><a href="/careerlink/"><i class="fa-brands fa-linkedin"></i> CAREERLINK — LinkedIn Optimization</a></li>\n',
        '            <li><a href="/atsresume/"><i class="fa-solid fa-file-lines"></i> ATSRESUME — Resume & Cover Letter Optimization</a></li>\n',
        '            <li><a href="/influboost/"><i class="fa-solid fa-bullhorn"></i> INFLUBOOST — Global Influencer Seeding</a></li>\n',
        '            <li><a href="/fdaboost/"><i class="fa-solid fa-vial-circle-check"></i> FDABOOST — FDA Labeling & Certification</a></li>\n',
        '            <li><a href="/globalbank/"><i class="fa-solid fa-building-columns"></i> GLOBALBANK — Overseas Business Bank Account Setup</a></li>\n',
        '            <li><a href="/sysboost/"><i class="fa-solid fa-circle"></i> SYSBOOST</a></li>\n',
        '            <li><a href="/aideploy/"><i class="fa-solid fa-circle"></i> AIDEPLOY</a></li>\n',
        '            <li><a href="/autoboost/"><i class="fa-solid fa-circle"></i> AUTOBOOST</a></li>\n',
        '            <li><a href="/webcreate/"><i class="fa-solid fa-circle"></i> WEBCREATE</a></li>\n',
        '            <li><a href="/adsboost/"><i class="fa-solid fa-bullhorn"></i> ADSBOOST — Google Ads Optimization</a></li>\n',
        '            <li><a href="/rfpboost/"><i class="fa-solid fa-file-signature"></i> RFPBOOST — Proposal Writing</a></li>\n',
        '            <li><a href="/globalup/"><i class="fa-solid fa-user-tie"></i> GLOBALUP — Global Recruiting</a></li>\n',
        '            <li><a href="/eventboost/"><i class="fa-solid fa-microphone-lines"></i> EVENTBOOST — Global Event MC</a></li>\n',
        '            <li><a href="/micemc/"><i class="fa-solid fa-microphone-lines"></i> MICEMC — International MC & Interpretation</a></li>\n',
        '            <li><a href="/indiaboost/"><i class="fa-solid fa-earth-asia"></i> INDIABOOST — India Market Entry Advisory</a></li>\n',
        '            <li><a href="/medboost/"><i class="fa-solid fa-stethoscope"></i> MEDBOOST — Clinical Translation</a></li>\n',
        '            <li><a href="/amzboost/"><i class="fa-solid fa-store"></i> AMZBOOST — Amazon FBA PPC</a></li>\n',
        '            <li><a href="/amzbrand/"><i class="fa-brands fa-amazon"></i> AMZBRAND — Amazon Brand Registry & Storefront</a></li>\n',
        '            <li><a href="/amzfba/"><i class="fa-solid fa-truck-fast"></i> AMZFBA — Amazon FBA & 3PL Logistics Optimization</a></li>\n',
        '            <li><a href="/alicat/"><i class="fa-solid fa-box-open"></i> ALICAT — Alibaba & B2B Catalog</a></li>\n',
        '            <li><a href="/chinaboost/"><i class="fa-solid fa-earth-asia"></i> CHINABOOST — China Market Entry</a></li>\n',
        '            <li><a href="/surveyboost/"><i class="fa-solid fa-square-poll-vertical"></i> SURVEYBOOST — Market Validation Surveys</a></li>\n',
        '            <li><a href="/shopglobal/"><i class="fa-brands fa-shopify"></i> SHOPGLOBAL — Shopify Global Expansion</a></li>\n',
        '            <li><a href="/complianceboost/"><i class="fa-solid fa-shield-halved"></i> COMPLIANCEBOOST — Compliance Docs & Audit Prep</a></li>\n',
        '            <li><a href="/aicash/"><i class="fa-solid fa-wand-magic-sparkles"></i> AICASH — Global AI Content Monetization</a></li>\n',
    ]
    tradeboost_item_en = '            <li><a href="/tradeboost/"><i class="fa-solid fa-ship"></i> TRADEBOOST — Global Trade Agency</a></li>\n'
    globalweb_item_en = '            <li><a href="/globalweb/"><i class="fa-solid fa-globe"></i> GLOBALWEB — Multilingual Website & Global SEO</a></li>\n'
    globalweb_item_ko = '            <li><a href="/globalweb/"><i class="fa-solid fa-globe"></i> GLOBALWEB — 다국어 웹사이트 &amp; 글로벌 SEO</a></li>\n'
    webseo_item_en = '            <li><a href="/webseo/"><i class="fa-solid fa-globe"></i> WEBSEO — Global Website Development & SEO</a></li>\n'
    webseo_item_ko = '            <li><a href="/webseo/"><i class="fa-solid fa-globe"></i> WEBSEO — 글로벌 웹사이트 개발 &amp; SEO</a></li>\n'
    logoboost_item_en = '            <li><a href="/logoboost/"><i class="fa-solid fa-pen-nib"></i> LOGOBOOST — Global Logo Design</a></li>\n'
    logoboost_item_ko = '            <li><a href="/logoboost/"><i class="fa-solid fa-pen-nib"></i> LOGOBOOST — 글로벌 로고 디자인</a></li>\n'
    influboost_item_en = '            <li><a href="/influboost/"><i class="fa-solid fa-bullhorn"></i> INFLUBOOST — Global Influencer Seeding</a></li>\n'
    influboost_item_ko = '            <li><a href="/influboost/"><i class="fa-solid fa-bullhorn"></i> INFLUBOOST — 글로벌 인플루언서 시딩</a></li>\n'
    fdaboost_item_en = '            <li><a href="/fdaboost/"><i class="fa-solid fa-vial-circle-check"></i> FDABOOST — FDA Labeling & Certification</a></li>\n'
    fdaboost_item_ko = '            <li><a href="/fdaboost/"><i class="fa-solid fa-vial-circle-check"></i> FDABOOST — FDA 라벨링 &amp; 인증</a></li>\n'
    globalbank_item_en = '            <li><a href="/globalbank/"><i class="fa-solid fa-building-columns"></i> GLOBALBANK — Overseas Business Bank Account Setup</a></li>\n'
    globalbank_item_ko = '            <li><a href="/globalbank/"><i class="fa-solid fa-building-columns"></i> GLOBALBANK — 해외 비즈니스 은행 계좌 개설</a></li>\n'
    tradeboost_item_ko = '            <li><a href="/tradeboost/"><i class="fa-solid fa-ship"></i> TRADEBOOST — 글로벌 무역대행</a></li>\n'
    micemc_item_en = '            <li><a href="/micemc/"><i class="fa-solid fa-microphone-lines"></i> MICEMC — International MC & Interpretation</a></li>\n'
    micemc_item_ko = '            <li><a href="/micemc/"><i class="fa-solid fa-microphone-lines"></i> MICEMC — 국제행사 영어 MC & 통역</a></li>\n'
    indiaboost_item_en = '            <li><a href="/indiaboost/"><i class="fa-solid fa-earth-asia"></i> INDIABOOST — India Market Entry Advisory</a></li>\n'
    indiaboost_item_ko = '            <li><a href="/indiaboost/"><i class="fa-solid fa-earth-asia"></i> INDIABOOST — 인도 시장진출 자문</a></li>\n'
    affboost_item_en = '            <li><a href="/affboost/"><i class="fa-solid fa-rocket"></i> AFFBOOST — AI Affiliate Website Builder</a></li>\n'
    affboost_item_ko = '            <li><a href="/affboost/"><i class="fa-solid fa-rocket"></i> AFFBOOST — AI 제휴 웹사이트 빌더</a></li>\n'
    sbvi_item_en = '            <li><a href="/sbvi/"><i class="fa-solid fa-building-columns"></i> SBVI — Singapore, Hong Kong & BVI Incorporation</a></li>\n'
    sbvi_item_ko = '            <li><a href="/sbvi/"><i class="fa-solid fa-building-columns"></i> SBVI — 싱가포르, 홍콩 &amp; BVI 법인설립</a></li>\n'
    pdp_item_en = '            <li><a href="/pdpboost/"><i class="fa-solid fa-box-open"></i> PDPBOOST — Product Detail Page Design</a></li>\n'
    pdp_item_ko = '            <li><a href="/pdpboost/"><i class="fa-solid fa-box-open"></i> PDPBOOST — 상세페이지 디자인</a></li>\n'
    usllc_item_en = '            <li><a href="/usllc/"><i class="fa-solid fa-building-columns"></i> USLLC — US LLC & EIN Setup</a></li>\n'
    usllc_item_ko = '            <li><a href="/usllc/"><i class="fa-solid fa-building-columns"></i> USLLC — 미국 LLC &amp; EIN 설립</a></li>\n'
    prboost_item_en = '            <li><a href="/prboost/"><i class="fa-solid fa-newspaper"></i> PRBOOST — Global Press Release Distribution</a></li>\n'
    prboost_item_ko = '            <li><a href="/prboost/"><i class="fa-solid fa-newspaper"></i> PRBOOST — 글로벌 보도자료 배포</a></li>\n'
    foreigncare_item_en = '            <li><a href="/foreigncare/"><i class="fa-solid fa-user-doctor"></i> FOREIGNCARE — Foreign Customer & Patient Acquisition</a></li>\n'
    aicash_item_en = '            <li><a href="/aicash/"><i class="fa-solid fa-wand-magic-sparkles"></i> AICASH — Global AI Content Monetization</a></li>\n'
    aicash_item_ko = '            <li><a href="/aicash/"><i class="fa-solid fa-wand-magic-sparkles"></i> AICASH — 글로벌 AI 콘텐츠 수익화</a></li>\n'
    dbmigrate_item_en = '            <li><a href="/dbmigrate/"><i class="fa-solid fa-database"></i> DBMIGRATE — Database Migration & Transfer</a></li>\n'
    dbmigrate_item_ko = '            <li><a href="/dbmigrate/"><i class="fa-solid fa-database"></i> DBMIGRATE — 데이터베이스 이전 & 전환</a></li>\n'
    foreigncare_item_ko = '            <li><a href="/foreigncare/"><i class="fa-solid fa-user-doctor"></i> FOREIGNCARE — 외국인 고객·환자 유치</a></li>\n'
    for path in ROOT.rglob('index.html'):
        if path == ROOT / 'index.html':
            continue
        if '/affboost/' in str(path):
            continue
        text = path.read_text()
        if 'unified-service-menu' not in text:
            continue
        updated = False
        extra_items = [
            tradeboost_item_ko if '/kr/' in str(path) else tradeboost_item_en,
            globalweb_item_ko if '/kr/' in str(path) else globalweb_item_en,
            influboost_item_ko if '/kr/' in str(path) else influboost_item_en,
            fdaboost_item_ko if '/kr/' in str(path) else fdaboost_item_en,
            globalbank_item_ko if '/kr/' in str(path) else globalbank_item_en,
            micemc_item_ko if '/kr/' in str(path) else micemc_item_en,
            indiaboost_item_ko if '/kr/' in str(path) else indiaboost_item_en,
            affboost_item_ko if '/kr/' in str(path) else affboost_item_en,
            sbvi_item_ko if '/kr/' in str(path) else sbvi_item_en,
            pdp_item_ko if '/kr/' in str(path) else pdp_item_en,
            usllc_item_ko if '/kr/' in str(path) else usllc_item_en,
            prboost_item_ko if '/kr/' in str(path) else prboost_item_en,
            foreigncare_item_ko if '/kr/' in str(path) else foreigncare_item_en,
            aicash_item_ko if '/kr/' in str(path) else aicash_item_en,
            dbmigrate_item_ko if '/kr/' in str(path) else dbmigrate_item_en,
            webseo_item_ko if '/kr/' in str(path) else webseo_item_en,
            logoboost_item_ko if '/kr/' in str(path) else logoboost_item_en,
        ]
        for item in (new_items + extra_items):
            slug = item.split('"')[1].split('/')[1]
            if slug in text:
                continue
            # Insert just before the first closing UL after the unified menu starts
            menu_start = text.index('unified-service-menu')
            ul_end = text.index('</ul>', menu_start)
            text = text[:ul_end] + item + text[ul_end:]
            updated = True
        if '/kr/' in str(path):
            text = text.replace('ATSRESUME — Resume & Cover Letter Optimization', 'ATSRESUME — 이력서 &amp; 커버레터 최적화')
        if updated:
            path.write_text(text)

if __name__ == '__main__':
    patch_index_html()
    validate_translations()
    audit_catalog_dirs()
    patch_all_service_pages()
    print('synced')
