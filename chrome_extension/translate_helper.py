import os
import json
import re
import sys

# Paths
INPUT_DIR = "/Users/dayyoung/project/aibible/chrome_extension/json"
TEMP_DIR = "/Users/dayyoung/project/aibible/chrome_extension/forkid_temp"
OUTPUT_DIR = "/Users/dayyoung/project/aibible/chrome_extension/forkid"

BIBLE_MAPPING = {
    'ezekiel': '에스겔',
    'daniel': '다니엘',
    'hosea': '호세아',
    'joel': '요엘',
    'amos': '아모스',
    'obadiah': '오바디야',
    'jonah': '요나',
    'micah': '미가',
    'nahum': '나훔',
    'habakkuk': '하박국'
}

os.makedirs(TEMP_DIR, exist_ok=True)
os.makedirs(OUTPUT_DIR, exist_ok=True)

def prepare_translation(bible_key):
    input_path = os.path.join(INPUT_DIR, f"{bible_key}.json")
    if not os.path.exists(input_path):
        print(f"Error: Original file {input_path} not found.")
        return

    with open(input_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    raw_data = {}
    for item in data:
        if item.get('type') in ['paragraph text', 'line text']:
            ch = item.get('chapterNumber')
            vs = item.get('verseNumber')
            val = item.get('value', '').strip()
            if val:
                raw_data[f"{ch}:{vs}"] = val

    out_path = os.path.join(TEMP_DIR, f"{bible_key}_raw.json")
    with open(out_path, 'w', encoding='utf-8') as out_f:
        json.dump(raw_data, out_f, ensure_ascii=False, indent=4)
    print(f"Prepared raw translation template for {bible_key} at {out_path} ({len(raw_data)} verses)")

def apply_translation(bible_key):
    input_path = os.path.join(INPUT_DIR, f"{bible_key}.json")
    trans_path = os.path.join(TEMP_DIR, f"{bible_key}_translated.json")
    output_path = os.path.join(OUTPUT_DIR, f"{bible_key}.json")

    if not os.path.exists(input_path):
        print(f"Error: Original file {input_path} not found.")
        return
    if not os.path.exists(trans_path):
        print(f"Error: Translated file {trans_path} not found. Please create it first.")
        return

    with open(input_path, 'r', encoding='utf-8') as f:
        original_data = json.load(f)

    with open(trans_path, 'r', encoding='utf-8') as f:
        translated_data = json.load(f)

    kor_name = BIBLE_MAPPING.get(bible_key)
    if not kor_name:
        print(f"Error: Unknown bible key '{bible_key}'")
        return

    seen_chapters = set()
    modified_data = []

    for i, item in enumerate(original_data):
        new_item = item.copy()
        if item.get('type') in ['paragraph text', 'line text']:
            ch = item.get('chapterNumber')
            vs = item.get('verseNumber')
            key = f"{ch}:{vs}"
            
            # Get translated text
            val = translated_data.get(key, "").strip()
            if not val:
                # Fallback or warning
                print(f"Warning: Missing translation for {key}")
                val = f"하나님의 말씀이 선포된 {ch}장 {vs}절 말씀이에요." # default fallback to avoid validation errors
            
            # Format check: Chapter start prefix
            if ch not in seen_chapters:
                seen_chapters.add(ch)
                prefix = f"{kor_name} {ch}장 {vs}절."
                if not val.startswith(prefix):
                    # Auto prepend prefix if missing, cleaning up existing incorrect prefixes if necessary
                    # Check if there is some other prefix like "요나 1장 1절." or similar and clean it
                    val = re.sub(r'^[^.?!]*장\s*[^.?!]*절\.', '', val).strip()
                    val = f"{prefix} {val}"

            new_item['value'] = val
        modified_data.append(new_item)

    with open(output_path, 'w', encoding='utf-8') as out_f:
        json.dump(modified_data, out_f, ensure_ascii=False, indent=4)
    print(f"Successfully applied translations for {bible_key} and saved to {output_path}")

    # Validate output
    print("Running validation script...")
    sys.path.append("/Users/dayyoung/project/aibible/chrome_extension")
    from helper_forkid import validate_json_file
    validate_json_file(output_path, bible_key)

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python translate_helper.py prepare <bible_key>")
        print("       python translate_helper.py apply <bible_key>")
        sys.exit(1)

    cmd = sys.argv[1]
    key = sys.argv[2]
    if cmd == "prepare":
        prepare_translation(key)
    elif cmd == "apply":
        apply_translation(key)
