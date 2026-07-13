import json
import os
import sys

INPUT_DIR = "/Users/dayyoung/project/aibible/chrome_extension/json"
OUTPUT_DIR = "/Users/dayyoung/project/aibible/chrome_extension/forkid/raw_chapters"

os.makedirs(OUTPUT_DIR, exist_ok=True)

def extract_chapters(filename):
    file_path = os.path.join(INPUT_DIR, filename)
    if not os.path.exists(file_path):
        print(f"File not found: {file_path}")
        return
        
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    chapters = {}
    for item in data:
        if item.get('type') == 'paragraph text' and 'chapterNumber' in item and 'verseNumber' in item:
            ch = item['chapterNumber']
            vs = item['verseNumber']
            val = item.get('value', '').strip()
            
            if ch not in chapters:
                chapters[ch] = {}
            if vs not in chapters[ch]:
                chapters[ch][vs] = []
            chapters[ch][vs].append(val)
            
    book_name = filename.replace(".json", "")
    for ch_num, verses in chapters.items():
        ch_data = {}
        for vs_num, vals in verses.items():
            ch_data[vs_num] = " ".join([v for v in vals if v])
            
        out_path = os.path.join(OUTPUT_DIR, f"{book_name}_ch{ch_num}.json")
        with open(out_path, 'w', encoding='utf-8') as f:
            json.dump(ch_data, f, ensure_ascii=False, indent=4)

if __name__ == "__main__":
    files = sys.argv[1:] if len(sys.argv) > 1 else []
    for f in files:
        extract_chapters(f)
    print("Extraction complete.")
