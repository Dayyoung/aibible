#!/usr/bin/env python3
from pathlib import Path

ROOT = Path('/Users/dayyoung/project/aibible')

CATALOG = [
    {'id': 'smm', 'cat': 'marketing'},
    {'id': 'b2c', 'cat': 'database'},
    {'id': 'b2b', 'cat': 'database'},
    {'id': 'land', 'cat': 'design-dev'},
    {'id': 'pr', 'cat': 'marketing'},
    {'id': 'clip', 'cat': 'media'},
    {'id': 'mail', 'cat': 'marketing'},
    {'id': 'chat', 'cat': 'strategy'},
    {'id': 'search', 'cat': 'marketing'},
    {'id': 'mk', 'cat': 'marketing'},
    {'id': 'data', 'cat': 'database'},
    {'id': 'img', 'cat': 'design-dev'},
    {'id': 'flow', 'cat': 'design-dev'},
    {'id': 'ai', 'cat': 'strategy'},
    {'id': 'voice', 'cat': 'media'},
    {'id': 'trans', 'cat': 'media'},
    {'id': 'pitch', 'cat': 'media'},
    {'id': 'insight', 'cat': 'strategy'},
    {'id': 'opencode', 'cat': 'design-dev'},
    {'id': 'shop', 'cat': 'strategy'},
    {'id': 'buyer', 'cat': 'strategy'},
    {'id': 'research', 'cat': 'strategy'},
    {'id': 'rep', 'cat': 'strategy'},
    {'id': 'content', 'cat': 'marketing'},
    {'id': 'sales', 'cat': 'strategy'},
    {'id': 'law', 'cat': 'strategy'},
    {'id': 'cert', 'cat': 'strategy'},
    {'id': 'hr', 'cat': 'strategy'},
]


def build_catalog_entries():
    return [
        f"        {{ id: '{s['id']}', category: '{s['cat']}', link: '/{s['id']}boost/', icon: 'fa-solid fa-circle', cardClass: 'card-active-{s['id']}', btnClass: 'btn-{s['id']}', iconBoxClass: 'icon-{s['id']}', popularity: 80 }},\n"
        for s in CATALOG
    ]


def patch_index_html():
    p = ROOT / 'index.html'
    text = p.read_text()
    # servicesCatalog block
    marker_start = "        const servicesCatalog = [\n"
    marker_end = "        let activeCategory = 'all';\n"
    start = text.index(marker_start)
    end = text.index(marker_end)
    entries = ''.join(build_catalog_entries())
    new_block = f"{marker_start}{entries}{marker_end}"
    text = text[:start] + new_block + text[end:]
    p.write_text(text)


def patch_all_service_pages():
    new_item = '            <li><a href="/repboost/"><i class=\"fa-solid fa-circle\"></i> REPBOOST</a></li>\n'
    for path in ROOT.rglob('index.html'):
        if path == ROOT / 'index.html':
            continue
        text = path.read_text()
        if 'repboost' in text:
            continue
        # Insert after last existing *boost link if possible
        marker = '            <li><a href="/salesboost/"><i class="fa-solid fa-circle"></i> SALESBOOST</a></li>\n'
        if marker in text:
            text = text.replace(marker, marker + new_item, 1)
        else:
            # Fallback: append before </ul>
            text = text.replace('</ul>', new_item + '</ul>', 1)
        path.write_text(text)


if __name__ == '__main__':
    patch_index_html()
    patch_all_service_pages()
    print('synced')
