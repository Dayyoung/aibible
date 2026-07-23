import os
import json
import glob

JSON_DIR = "/Users/dayyoung/project/aibible/chrome_extension/json"
TARGET_DIR = "/Users/dayyoung/project/aibible/bible"

def main():
    print("=== Splitting Bible JSONs into Book TXT files (66 files total) ===")
    
    # 폴더가 없으면 생성
    os.makedirs(TARGET_DIR, exist_ok=True)
    
    # 기존 장별 파일들(*.txt)을 모두 청소하여 깔끔하게 정리
    existing_txts = glob.glob(os.path.join(TARGET_DIR, "*.txt"))
    for f in existing_txts:
        try:
            os.remove(f)
        except Exception as e:
            print(f"[Error] Failed to remove {f}: {e}")
            
    json_files = glob.glob(os.path.join(JSON_DIR, "*.json"))
    
    total_files_created = 0
    
    for json_path in json_files:
        book_name = os.path.splitext(os.path.basename(json_path))[0]
        
        with open(json_path, 'r', encoding='utf-8') as f:
            try:
                data = json.load(f)
            except Exception as e:
                print(f"[Error] Failed to parse {json_path}: {e}")
                continue
                
        # paragraph text 또는 line text 형식 구절만 추출하여 정렬
        verses = []
        for item in data:
            if item.get("type") in ["paragraph text", "line text"]:
                verses.append(item)
                
        # 장 번호, 절 번호 순으로 정렬
        sorted_verses = sorted(verses, key=lambda x: (x.get("chapterNumber", 0), x.get("verseNumber", 0)))
        
        lines = []
        for v in sorted_verses:
            ch = v.get("chapterNumber", "")
            vs = v.get("verseNumber", "")
            val = v.get("value", "").strip()
            if val:
                lines.append(f"{ch}:{vs} {val}")
                
        if lines:
            file_name = f"{book_name}.txt"
            file_path = os.path.join(TARGET_DIR, file_name)
            
            with open(file_path, 'w', encoding='utf-8') as out_f:
                out_f.write("\n".join(lines) + "\n")
                
            total_files_created += 1
            
    print(f"Completed! Created {total_files_created} book text files in {TARGET_DIR}.")

if __name__ == "__main__":
    main()
