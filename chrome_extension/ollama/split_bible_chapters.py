import os
import json
import glob

JSON_DIR = "/Users/dayyoung/project/aibible/chrome_extension/json"
TARGET_DIR = "/Users/dayyoung/project/aibible/bible"

def main():
    print("=== Splitting Bible JSONs into Chapter TXT files ===")
    
    # 생성할 폴더가 없으면 자동 생성
    os.makedirs(TARGET_DIR, exist_ok=True)
    
    # 기존 txt 파일 제거하여 깔끔하게 정리
    existing_txts = glob.glob(os.path.join(TARGET_DIR, "*.txt"))
    for f in existing_txts:
        try:
            os.remove(f)
        except:
            pass
            
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
                
        # 장(Chapter)별로 구절을 모음
        chapters = {}
        for item in data:
            if item.get("type") in ["paragraph text", "line text"]:
                ch = item.get("chapterNumber")
                if ch is None:
                    continue
                if ch not in chapters:
                    chapters[ch] = []
                chapters[ch].append(item)
                
        # 각 장별 파일 쓰기
        for ch, verses in chapters.items():
            # 구절 번호 순으로 정렬
            sorted_verses = sorted(verses, key=lambda x: x.get("verseNumber", 0))
            
            file_name = f"{book_name}_{ch}.txt"
            file_path = os.path.join(TARGET_DIR, file_name)
            
            lines = []
            for v in sorted_verses:
                v_num = v.get("verseNumber", "")
                val = v.get("value", "").strip()
                if val:
                    lines.append(f"{v_num} {val}")
                    
            with open(file_path, 'w', encoding='utf-8') as out_f:
                out_f.write("\n".join(lines) + "\n")
                
            total_files_created += 1
            
    print(f"Completed! Created {total_files_created} chapter text files in {TARGET_DIR}.")

if __name__ == "__main__":
    main()
