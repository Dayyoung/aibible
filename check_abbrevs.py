import json
import re

def get_json_abbrevs(filename):
    try:
        with open(filename, 'r', encoding='utf-8-sig') as f:
            data = json.load(f)
            return [book.get('abbrev') for book in data]
    except Exception as e:
        print(f"Error reading {filename}: {e}")
        return []

def get_html_keys(filename):
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
            # Extract BIBLE_NAMES_KO object content
            match = re.search(r'const BIBLE_NAMES_KO = \{([^}]+)\};', content, re.DOTALL)
            if match:
                obj_content = match.group(1)
                # Simple regex to find keys (assuming keys are simple strings or unquoted identifiers)
                # Keys can be "gn": or gn:
                keys = re.findall(r'["\']?(\w+)["\']?\s*:', obj_content)
                # This regex might miss keys like "1sm" if not quoted properly in regex?
                # Actually, in the file they are: gn: "...", "1sm": "..."
                # Let's use a better regex
                keys = re.findall(r'(?:["\']?([\w\d]+)["\']?)\s*:', obj_content)
                return keys
            return []
    except Exception as e:
        print(f"Error reading {filename}: {e}")
        return []

json_abbrevs = get_json_abbrevs('json/ko_ko.json')
# Hardcode the keys observed from index.html (Step 85) since regex on html might be brittle
# I will just print the json abbrevs and validify manually against the `index.html` I viewed.
print("JSON Abbreviations:", json_abbrevs)
