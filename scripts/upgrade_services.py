#!/usr/bin/env python3
import os
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

def upgrade_file(html_path: Path):
    if not html_path.exists():
        return False
        
    text = html_path.read_text(errors='ignore')
    modified = False
    
    # 1. Strip hardcoded PayPal SDK scripts
    paypal_pattern = r'<\s*script\s+src="https://www\.paypal\.com/sdk/js[^>]*>\s*<\s*/\s*script\s*>'
    if re.search(paypal_pattern, text):
        text = re.sub(paypal_pattern, '', text)
        modified = True
        
    # 2. Inject common.css inside </head>
    css_link = '    <link rel="stylesheet" href="/shared/common.css">\n'
    if '/shared/common.css' not in text and '</head>' in text:
        text = text.replace('</head>', f'{css_link}</head>')
        modified = True
        
    # 3. Inject common.js inside </body>
    js_script = '    <script src="/shared/common.js"></script>\n'
    if '/shared/common.js' not in text and '</body>' in text:
        text = text.replace('</body>', f'{js_script}</body>')
        modified = True
        
    if modified:
        html_path.write_text(text)
        return True
    return False

def main():
    print("Upgrading service sub-pages...")
    count = 0
    
    for item in os.listdir(ROOT):
        item_path = ROOT / item
        if not item_path.is_dir() or item.startswith('.') or item == 'shared' or item == 'scripts':
            continue
            
        # Look for index.html files
        for html_file in [item_path / 'index.html', item_path / 'kr' / 'index.html']:
            if html_file.exists():
                if upgrade_file(html_file):
                    print(f"   Upgraded: {html_file.relative_to(ROOT)}")
                    count += 1
                    
    print(f"Total service pages upgraded: {count}")

if __name__ == '__main__':
    main()
