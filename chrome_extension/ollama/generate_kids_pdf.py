import os
import json
import subprocess

ORIGINAL_DIR = "/Users/dayyoung/project/aibible/chrome_extension/json"
OLLAMA_DIR = "/Users/dayyoung/project/aibible/chrome_extension/ollama"
FORKID_DIR = "/Users/dayyoung/project/aibible/chrome_extension/forkid"

OUTPUT_TXT = "/Users/dayyoung/project/aibible/bible-kids-web.txt"
OUTPUT_PDF = "/Users/dayyoung/project/aibible/bible-kids-web.pdf"

BIBLE_ORDER = [
    ("genesis", "창세기"), ("exodus", "출애굽기"), ("leviticus", "레위기"), ("numbers", "민수기"), ("deuteronomy", "신명기"),
    ("joshua", "여호수아"), ("judges", "사사기"), ("ruth", "룻기"), ("1samuel", "사무엘상"), ("2samuel", "사무엘하"),
    ("1kings", "열왕기상"), ("2kings", "열왕기하"), ("1chronicles", "역대기상"), ("2chronicles", "역대기하"), ("ezra", "에스라"),
    ("nehemiah", "느헤미야"), ("esther", "에스더"), ("job", "욥기"), ("psalms", "시편"), ("proverbs", "잠언"),
    ("ecclesiastes", "전도서"), ("songofsolomon", "아가"), ("isaiah", "이사야"), ("jeremiah", "예레미야"), ("lamentations", "예레미야 애가"),
    ("ezekiel", "에스겔"), ("daniel", "다니엘"), ("hosea", "호세아"), ("joel", "요엘"), ("amos", "아모스"),
    ("obadiah", "오바디야"), ("jonah", "요나"), ("micah", "미가"), ("nahum", "나훔"), ("habakkuk", "하박국"),
    ("zephaniah", "스바냐"), ("haggai", "학개"), ("zechariah", "스가랴"), ("malachi", "말라기"),
    ("matthew", "마태복음"), ("mark", "마가복음"), ("luke", "누가복음"), ("john", "요한복음"), ("acts", "사도행전"),
    ("romans", "로마서"), ("1corinthians", "고린도전서"), ("2corinthians", "고린도후서"), ("galatians", "갈라디아서"), ("ephesians", "에베소서"),
    ("philippians", "빌립보서"), ("colossians", "골로새서"), ("1thessalonians", "데살로니가전서"), ("2thessalonians", "데살로니가후서"), ("1timothy", "디모데전서"),
    ("2timothy", "디모데후서"), ("titus", "디도서"), ("philemon", "빌레몬서"), ("hebrews", "히브리서"), ("james", "야고보서"),
    ("1peter", "베드로전서"), ("2peter", "베드로후서"), ("1john", "요한일서"), ("2john", "요한이서"), ("3john", "요한삼서"),
    ("jude", "유다서"), ("revelation", "요한계시록")
]

def main():
    print("=== Generating Kids Bible Text & PDF ===")
    merged_lines = []
    
    summary_count = 0
    fallback_count = 0
    
    for eng_name, kor_name in BIBLE_ORDER:
        filename = f"{eng_name}.json"
        
        # 1. 요약 폴더들(ollama 또는 forkid) 확인
        summary_path = ""
        for folder in [OLLAMA_DIR, FORKID_DIR]:
            p = os.path.join(folder, filename)
            if os.path.exists(p) and os.path.getsize(p) > 0:
                summary_path = p
                break
                
        # 2. 요약 데이터 로드 시도
        loaded_data = None
        if summary_path:
            try:
                with open(summary_path, 'r', encoding='utf-8') as f:
                    loaded_data = json.load(f)
                summary_count += 1
            except Exception as e:
                print(f"Error reading summary for {kor_name}: {e}")
                
        # 3. 데이터가 존재하지 않는다면 원본 데이터로 폴백 매핑
        if not loaded_data:
            orig_path = os.path.join(ORIGINAL_DIR, filename)
            if os.path.exists(orig_path):
                try:
                    with open(orig_path, 'r', encoding='utf-8') as f:
                        loaded_data = json.load(f)
                    fallback_count += 1
                    # 원본 데이터 구조를 요약본 구조에 맞게 임시 패치 (구절 머리에 1절은 '장' 소개, 나머지는 원문 유지)
                    for item in loaded_data:
                        if item.get("type") in ["paragraph text", "line text"]:
                            ch = item.get("chapterNumber")
                            vs = item.get("verseNumber")
                            val = item.get("value", "").strip()
                            if vs == 1:
                                item["value"] = f"{kor_name} {ch}장 1절. [Original Fallback] {val}"
                            else:
                                item["value"] = f"[Original Fallback] {val}"
                except Exception as e:
                    print(f"Error reading original for {kor_name}: {e}")
                    
        if not loaded_data:
            print(f"Warning: No data found for {kor_name} ({filename})")
            continue
            
        # 4. 데이터 추출 및 병합 (paragraph text 또는 line text 타입 구절 추출)
        for item in loaded_data:
            if item.get("type") in ["paragraph text", "line text"]:
                val = item.get("value", "").strip()
                if val: # 빈 값(압축 생략된 구절)은 제외하고 출력
                    merged_lines.append(val)
                    
    # 5. TXT 쓰기
    print(f"Writing text file to {OUTPUT_TXT}...")
    with open(OUTPUT_TXT, 'w', encoding='utf-8') as f:
        f.write("\n".join(merged_lines) + "\n")
        
    print(f"Stats - Summarized Books used: {summary_count}, Fallback (Original) Books used: {fallback_count}")
    print(f"Total lines in TXT: {len(merged_lines)}")
    
    # 6. PDF 컴파일 (cupsfilter 사용)
    print(f"Compiling PDF to {OUTPUT_PDF}...")
    try:
        cmd = f"cupsfilter {OUTPUT_TXT} > {OUTPUT_PDF} 2>/dev/null"
        result = subprocess.run(cmd, shell=True, check=True)
        if result.returncode == 0:
            size_mb = os.path.getsize(OUTPUT_PDF) / (1024 * 1024)
            print(f"Success! PDF generated at {OUTPUT_PDF} ({size_mb:.2f} MB)")
        else:
            print("Failed to run cupsfilter command.")
    except Exception as e:
        print(f"Error compiling PDF: {e}")

if __name__ == "__main__":
    main()
