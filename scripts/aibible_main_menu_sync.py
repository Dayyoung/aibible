#!/usr/bin/env python3
from pathlib import Path
import re
import subprocess

ROOT = Path('/Users/dayyoung/project/aibible')

CATALOG = [
    {'id': 'smm', 'cat': 'marketing', 'link': '/boostsm/', 'icon': 'fa-solid fa-arrow-up-right-dots', 'popularity': 95},
    {'id': 'b2c', 'cat': 'database', 'link': '/b2cdb/', 'icon': 'fa-solid fa-database', 'popularity': 90},
    {'id': 'b2b', 'cat': 'database', 'link': '/b2bdb/', 'icon': 'fa-solid fa-building-user', 'popularity': 92},
    {'id': 'land', 'cat': 'design-dev', 'link': '/landPage/', 'icon': 'fa-solid fa-code', 'popularity': 88},
    {'id': 'mvp', 'cat': 'design-dev', 'link': '/mvpboost/', 'icon': 'fa-solid fa-rocket', 'popularity': 91},
    {'id': 'aideploy', 'cat': 'design-dev', 'link': '/aideploy/', 'icon': 'fa-solid fa-cloud-arrow-up', 'popularity': 93},
    {'id': 'autoboost', 'cat': 'design-dev', 'link': '/autoboost/', 'icon': 'fa-solid fa-arrows-rotate', 'popularity': 89},
    {'id': 'webcreate', 'cat': 'design-dev', 'link': '/webcreate/', 'icon': 'fa-solid fa-globe', 'popularity': 84},
    {'id': 'pr', 'cat': 'marketing', 'link': '/prboost/', 'icon': 'fa-solid fa-globe', 'popularity': 82},
    {'id': 'amzboost', 'cat': 'marketing', 'link': '/amzboost/', 'icon': 'fa-solid fa-store', 'popularity': 88},
    {'id': 'tikshop', 'cat': 'marketing', 'link': '/tikshop/', 'icon': 'fa-brands fa-tiktok', 'popularity': 89},
    {'id': 'rfp', 'cat': 'strategy', 'link': '/rfpboost/', 'icon': 'fa-solid fa-file-signature', 'popularity': 84},
    {'id': 'globalup', 'cat': 'strategy', 'link': '/globalup/', 'icon': 'fa-solid fa-user-tie', 'popularity': 81},
    {'id': 'eventboost', 'cat': 'strategy', 'link': '/eventboost/', 'icon': 'fa-solid fa-microphone-lines', 'popularity': 82},
    {'id': 'alicat', 'cat': 'marketing', 'link': '/alicat/', 'icon': 'fa-solid fa-box-open', 'popularity': 83},
    {'id': 'app', 'cat': 'marketing', 'link': '/appboost/', 'icon': 'fa-solid fa-mobile-screen-button', 'popularity': 83},
    {'id': 'ustax', 'cat': 'strategy', 'link': '/ustaxboost/', 'icon': 'fa-solid fa-file-invoice-dollar', 'popularity': 81},
    {'id': 'ustax2', 'cat': 'strategy', 'link': '/ustax/', 'icon': 'fa-solid fa-file-invoice-dollar', 'popularity': 80},
    {'id': 'clip', 'cat': 'media', 'link': '/clipboost/', 'icon': 'fa-solid fa-clapperboard', 'popularity': 85},
    {'id': 'mail', 'cat': 'marketing', 'link': '/mailboost/', 'icon': 'fa-solid fa-envelope', 'popularity': 80},
    {'id': 'chat', 'cat': 'strategy', 'link': '/chatboost/', 'icon': 'fa-solid fa-robot', 'popularity': 87},
    {'id': 'search', 'cat': 'marketing', 'link': '/searchboost/', 'icon': 'fa-solid fa-magnifying-glass', 'popularity': 84},
    {'id': 'mk', 'cat': 'marketing', 'link': '/mkboost/', 'icon': 'fa-solid fa-magnifying-glass-chart', 'popularity': 78},
    {'id': 'data', 'cat': 'database', 'link': '/databoost/', 'icon': 'fa-solid fa-spider', 'popularity': 86},
    {'id': 'img', 'cat': 'design-dev', 'link': '/imgboost/', 'icon': 'fa-solid fa-camera-retro', 'popularity': 83},
    {'id': 'flow', 'cat': 'design-dev', 'link': '/flowboost/', 'icon': 'fa-solid fa-diagram-project', 'popularity': 81},
    {'id': 'ai', 'cat': 'strategy', 'link': '/aiboost/', 'icon': 'fa-solid fa-brain', 'popularity': 89},
    {'id': 'voice', 'cat': 'media', 'link': '/voiceboost/', 'icon': 'fa-solid fa-microphone', 'popularity': 77},
    {'id': 'trans', 'cat': 'media', 'link': '/transboost/', 'icon': 'fa-solid fa-language', 'popularity': 76},
    {'id': 'medboost', 'cat': 'media', 'link': '/medboost/', 'icon': 'fa-solid fa-stethoscope', 'popularity': 77},
    {'id': 'pitch', 'cat': 'media', 'link': '/pitchboost/', 'icon': 'fa-solid fa-chart-line', 'popularity': 79},
    {'id': 'insight', 'cat': 'strategy', 'link': '/insightboost/', 'icon': 'fa-solid fa-chart-bar', 'popularity': 75},
    {'id': 'opencode', 'cat': 'design-dev', 'link': '/opencode/', 'icon': 'fa-solid fa-code', 'popularity': 94},
    {'id': 'shop', 'cat': 'strategy', 'link': '/shopboost/', 'icon': 'fa-solid fa-store', 'popularity': 77},
    {'id': 'buyer', 'cat': 'strategy', 'link': '/buyerboost/', 'icon': 'fa-solid fa-handshake', 'popularity': 80},
    {'id': 'research', 'cat': 'strategy', 'link': '/researchboost/', 'icon': 'fa-solid fa-chart-line', 'popularity': 78},
    {'id': 'rep', 'cat': 'strategy', 'link': '/repboost/', 'icon': 'fa-solid fa-comments', 'popularity': 80},
    {'id': 'content', 'cat': 'marketing', 'link': '/contentboost/', 'icon': 'fa-solid fa-newspaper', 'popularity': 86},
    {'id': 'sales', 'cat': 'strategy', 'link': '/salesboost/', 'icon': 'fa-solid fa-receipt', 'popularity': 77},
    {'id': 'law', 'cat': 'strategy', 'link': '/lawboost/', 'icon': 'fa-solid fa-scale-balanced', 'popularity': 76},
    {'id': 'aiweb', 'cat': 'design-dev', 'link': '/aiweb/', 'icon': 'fa-solid fa-globe', 'popularity': 83},
    {'id': 'cert', 'cat': 'strategy', 'link': '/certboost/', 'icon': 'fa-solid fa-certificate', 'popularity': 75},
    {'id': 'apost', 'cat': 'strategy', 'link': '/apostboost/', 'icon': 'fa-solid fa-stamp', 'popularity': 79},
    {'id': 'ip', 'cat': 'strategy', 'link': '/ipboost/', 'icon': 'fa-solid fa-shield-halved', 'popularity': 82},
    {'id': 'hr', 'cat': 'strategy', 'link': '/hrboost/', 'icon': 'fa-solid fa-user-tie', 'popularity': 80},
    {'id': 'sys', 'cat': 'design-dev', 'link': '/sysboost/', 'icon': 'fa-solid fa-network-wired', 'popularity': 80},
    {'id': 'loyalty', 'cat': 'strategy', 'link': '/loyaltyboost/', 'icon': 'fa-solid fa-gift', 'popularity': 80},
    {'id': 'book', 'cat': 'design-dev', 'link': '/bookboost/', 'icon': 'fa-solid fa-calendar-check', 'popularity': 80},
    {'id': 'eduooost', 'cat': 'strategy', 'link': '/eduooost/', 'icon': 'fa-solid fa-graduation-cap', 'popularity': 80},
    {'id': 'sourcboost', 'cat': 'strategy', 'link': '/sourcboost/', 'icon': 'fa-solid fa-file-shield', 'popularity': 80},
    {'id': 'map', 'cat': 'marketing', 'link': '/mapboost/', 'icon': 'fa-solid fa-map-location-dot', 'popularity': 80},
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
        '            <li><a href="/repboost/"><i class="fa-solid fa-circle"></i> REPBOOST</a></li>\n',
        '            <li><a href="/sysboost/"><i class="fa-solid fa-circle"></i> SYSBOOST</a></li>\n',
        '            <li><a href="/ustaxboost/"><i class="fa-solid fa-circle"></i> USTAXBOOST</a></li>\n',
        '            <li><a href="/ustax/"><i class="fa-solid fa-circle"></i> USTAX</a></li>\n',
        '            <li><a href="/aideploy/"><i class="fa-solid fa-circle"></i> AIDEPLOY</a></li>\n',
        '            <li><a href="/autoboost/"><i class="fa-solid fa-circle"></i> AUTOBOOST</a></li>\n',
        '            <li><a href="/webcreate/"><i class="fa-solid fa-circle"></i> WEBCREATE</a></li>\n',
        '            <li><a href="/rfpboost/"><i class="fa-solid fa-file-signature"></i> RFPBOOST — Proposal Writing</a></li>\n',
        '            <li><a href="/globalup/"><i class="fa-solid fa-user-tie"></i> GLOBALUP — Global Recruiting</a></li>\n',
        '            <li><a href="/eventboost/"><i class="fa-solid fa-microphone-lines"></i> EVENTBOOST — Global Event MC</a></li>\n',
        '            <li><a href="/medboost/"><i class="fa-solid fa-stethoscope"></i> MEDBOOST — Clinical Translation</a></li>\n',
        '            <li><a href="/amzboost/"><i class="fa-solid fa-store"></i> AMZBOOST — Amazon FBA PPC</a></li>\n',
        '            <li><a href="/alicat/"><i class="fa-solid fa-box-open"></i> ALICAT — Alibaba & B2B Catalog</a></li>\n',
        '            <li><a href="/apostboost/"><i class="fa-solid fa-stamp"></i> APOSTBOOST — Apostille & Notarization</a></li>\n',
    ]
    for path in ROOT.rglob('index.html'):
        if path == ROOT / 'index.html':
            continue
        text = path.read_text()
        if 'unified-service-menu' not in text:
            continue
        updated = False
        for item in new_items:
            slug = item.split('"')[1].split('/')[1]
            if slug in text:
                continue
            # Insert just before the first closing UL after the unified menu starts
            menu_start = text.index('unified-service-menu')
            ul_end = text.index('</ul>', menu_start)
            text = text[:ul_end] + item + text[ul_end:]
            updated = True
        if updated:
            path.write_text(text)

if __name__ == '__main__':
    patch_index_html()
    validate_translations()
    audit_catalog_dirs()
    patch_all_service_pages()
    print('synced')
