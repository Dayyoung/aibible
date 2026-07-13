import json
import os
import re
import sys

INPUT_DIR = "/Users/dayyoung/project/aibible/chrome_extension/json"
OUTPUT_DIR = "/Users/dayyoung/project/aibible/chrome_extension/forkid"
CACHE_DIR = os.path.join(OUTPUT_DIR, "cache")

BIBLE_MAP = {
    'genesis': '창세기',
    'exodus': '출애굽기',
    'leviticus': '레위기',
    'numbers': '민수기',
    'deuteronomy': '신명기',
    'joshua': '여호수아',
    'judges': '사사기',
    'ruth': '룻기',
    '1samuel': '사무엘상',
    '2samuel': '사무엘하',
    '1kings': '열왕기상',
    '2kings': '열왕기하'
}

def assemble_file(filename):
    file_key = filename.replace(".json", "")
    bible_ko = BIBLE_MAP.get(file_key)
    if not bible_ko:
        print(f"Skipping unknown file: {filename}")
        return
        
    input_path = os.path.join(INPUT_DIR, filename)
    output_path = os.path.join(OUTPUT_DIR, filename)
    
    if not os.path.exists(input_path):
        print(f"Input file not found: {input_path}")
        return
        
    with open(input_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    # Group by chapter and verse to easily map the modifications
    chapters = {}
    for idx, item in enumerate(data):
        if item.get('type') == 'paragraph text' and 'chapterNumber' in item and 'verseNumber' in item:
            ch = item['chapterNumber']
            vs = item['verseNumber']
            if ch not in chapters:
                chapters[ch] = {}
            if vs not in chapters[ch]:
                chapters[ch][vs] = []
            chapters[ch][vs].append(idx)
            
    # Modify data based on cache files
    for ch_num in sorted(chapters.keys()):
        cache_path = os.path.join(CACHE_DIR, f"{file_key}_ch{ch_num}.json")
        if not os.path.exists(cache_path):
            print(f"Warning: Cache file not found for {bible_ko} {ch_num}장 -> {cache_path}")
            continue
            
        with open(cache_path, 'r', encoding='utf-8') as f:
            summaries = json.load(f)
            
        for vs_num, indices in chapters[ch_num].items():
            # Get summary text (keys in JSON might be strings)
            val = summaries.get(str(vs_num), summaries.get(vs_num, ""))
            if val is None:
                val = ""
            val = val.strip()
            
            # Apply chapter 1st verse rule
            if vs_num == 1:
                prefix = f"{bible_ko} {ch_num}장 1절. "
                if not val.startswith(prefix):
                    # Clean up existing prefix if any to avoid duplication
                    clean_text = re.sub(rf"^{re.escape(bible_ko)}\s*{ch_num}장\s*1절\.\s*", "", val)
                    val = prefix + clean_text
                    
            # Update values
            for i, idx in enumerate(indices):
                if i == 0:
                    data[idx]['value'] = val
                else:
                    data[idx]['value'] = ""
                    
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)
    print(f"Successfully assembled {bible_ko} -> {output_path}")

if __name__ == "__main__":
    files = sys.argv[1:] if len(sys.argv) > 1 else [f + ".json" for f in BIBLE_MAP.keys()]
    for f in files:
        if not f.endswith(".json"):
            f += ".json"
        assemble_file(f)
    print("Assembly complete.")
