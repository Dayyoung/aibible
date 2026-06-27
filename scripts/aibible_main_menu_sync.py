#!/usr/bin/env python3
from pathlib import Path

ROOT = Path('/Users/dayyoung/project/aibible')

CATALOG = [
    {'id': 'smm', 'cat': 'marketing', 'link': '/boostsm/', 'icon': 'fa-solid fa-arrow-up-right-dots', 'popularity': 95},
    {'id': 'b2c', 'cat': 'database', 'link': '/b2cdb/', 'icon': 'fa-solid fa-database', 'popularity': 90},
    {'id': 'b2b', 'cat': 'database', 'link': '/b2bdb/', 'icon': 'fa-solid fa-building-user', 'popularity': 92},
    {'id': 'land', 'cat': 'design-dev', 'link': '/landPage/', 'icon': 'fa-solid fa-code', 'popularity': 88},
    {'id': 'pr', 'cat': 'marketing', 'link': '/prboost/', 'icon': 'fa-solid fa-globe', 'popularity': 82},
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
    {'id': 'ip', 'cat': 'strategy', 'link': '/ipboost/', 'icon': 'fa-solid fa-shield-halved', 'popularity': 82},
    {'id': 'hr', 'cat': 'strategy', 'link': '/hrboost/', 'icon': 'fa-solid fa-user-tie', 'popularity': 80},
    {'id': 'sys', 'cat': 'design-dev', 'link': '/sysboost/', 'icon': 'fa-solid fa-network-wired', 'popularity': 80},
    {'id': 'loyalty', 'cat': 'strategy', 'link': '/loyaltyboost/', 'icon': 'fa-solid fa-gift', 'popularity': 80},
    {'id': 'book', 'cat': 'design-dev', 'link': '/bookboost/', 'icon': 'fa-solid fa-calendar-check', 'popularity': 80},
    {'id': 'eduooost', 'cat': 'strategy', 'link': '/eduooost/', 'icon': 'fa-solid fa-graduation-cap', 'popularity': 80},
    {'id': 'sourcboost', 'cat': 'strategy', 'link': '/sourcboost/', 'icon': 'fa-solid fa-file-shield', 'popularity': 80},
    {'id': 'map', 'cat': 'marketing', 'link': '/mapboost/', 'icon': 'fa-solid fa-map-location-dot', 'popularity': 80},
]


def build_catalog_entries():
    lines = []
    for s in CATALOG:
        lines.append(
            f"            {{ id: '{s['id']}', category: '{s['cat']}', link: '{s['link']}', icon: '{s['icon']}', cardClass: 'card-active-{s['id']}', btnClass: 'btn-{s['id']}', iconBoxClass: 'icon-{s['id']}', popularity: {s['popularity']} }}"
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


def patch_all_service_pages():
    new_items = [
        '            <li><a href=\"/repboost/\"><i class=\"fa-solid fa-circle\"></i> REPBOOST</a></li>\n',
        '            <li><a href=\"/sysboost/\"><i class=\"fa-solid fa-circle\"></i> SYSBOOST</a></li>\n',
    ]
    marker = '            <li><a href=\"/salesboost/\"><i class=\"fa-solid fa-circle\"></i> SALESBOOST</a></li>\n'
    for path in ROOT.rglob('index.html'):
        if path == ROOT / 'index.html':
            continue
        text = path.read_text()
        updated = False
        for item in new_items:
            if item.split('"')[1].split('/')[1] in text:
                continue
            if marker in text:
                text = text.replace(marker, marker + item, 1)
                updated = True
        if updated:
            path.write_text(text)


if __name__ == '__main__':
    patch_index_html()
    patch_all_service_pages()
    print('synced')
