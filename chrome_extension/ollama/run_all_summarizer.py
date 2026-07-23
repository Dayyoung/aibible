import os
import sys
import time
import subprocess

sys.path.append("/Users/dayyoung/project/aibible/chrome_extension/ollama")
from helper_ollama_summarizer import process_book_via_ollama

BIBLE_ORDER = [
    # 구약 (Old Testament)
    ("genesis.json", "창세기"), ("exodus.json", "출애굽기"), ("leviticus.json", "레위기"), ("numbers.json", "민수기"), ("deuteronomy.json", "신명기"),
    ("joshua.json", "여호수아"), ("judges.json", "사사기"), ("ruth.json", "룻기"), ("1samuel.json", "사무엘상"), ("2samuel.json", "사무엘하"),
    ("1kings.json", "열왕기상"), ("2kings.json", "열왕기하"), ("1chronicles.json", "역대기상"), ("2chronicles.json", "역대기하"), ("ezra.json", "에스라"),
    ("nehemiah.json", "느헤미야"), ("esther.json", "에스더"), ("job.json", "욥기"), ("psalms.json", "시편"), ("proverbs.json", "잠언"),
    ("ecclesiastes.json", "전도서"), ("songofsolomon.json", "아가"), ("isaiah.json", "이사야"), ("jeremiah.json", "예레미야"), ("lamentations.json", "예레미야 애가"),
    ("ezekiel.json", "에스겔"), ("daniel.json", "다니엘"), ("hosea.json", "호세아"), ("joel.json", "요엘"), ("amos.json", "아모스"),
    ("obadiah.json", "오바디야"), ("jonah.json", "요나"), ("micah.json", "미가"), ("nahum.json", "나훔"), ("habakkuk.json", "하박국"),
    ("zephaniah.json", "스바냐"), ("haggai.json", "학개"), ("zechariah.json", "스가랴"), ("malachi.json", "말라기"),
    # 신약 (New Testament)
    ("matthew.json", "마태복음"), ("mark.json", "마가복음"), ("luke.json", "누가복음"), ("john.json", "요한복음"), ("acts.json", "사도행전"),
    ("romans.json", "로마서"), ("1corinthians.json", "고린도전서"), ("2corinthians.json", "고린도후서"), ("galatians.json", "갈라디아서"), ("ephesians.json", "에베소서"),
    ("philippians.json", "빌립보서"), ("colossians.json", "골로새서"), ("1thessalonians.json", "데살로니가전서"), ("2thessalonians.json", "데살로니가후서"), ("1timothy.json", "디모데전서"),
    ("2timothy.json", "디모데후서"), ("titus.json", "디도서"), ("philemon.json", "빌레몬서"), ("hebrews.json", "히브리서"), ("james.json", "야고보서"),
    ("1peter.json", "베드로전서"), ("2peter.json", "베드로후서"), ("1john.json", "요한일서"), ("2john.json", "요한이서"), ("3john.json", "요한삼서"),
    ("jude.json", "유다서"), ("revelation.json", "요한계시록")
]

def rebuild_pdf():
    print("[Sync] Rebuilding latest kids PDF...")
    try:
        subprocess.run(["python3", "/Users/dayyoung/project/aibible/chrome_extension/ollama/generate_kids_pdf.py"], check=True)
    except Exception as e:
        print(f"[Sync] Error rebuilding PDF: {e}")

def main():
    print("=== Bible Ollama Summarization Orchestrator ===")
    print("This script runs sequentially through 66 books, utilizing caching to resume seamlessly.")
    
    start_time = time.time()
    
    for filename, kor_name in BIBLE_ORDER:
        try:
            # process_book_via_ollama 는 이미 파일이 있다면 스킵하고 True를 반환함
            # 새로 생성할 때만 요약 로직이 돌고 끝난 후 True 반환
            original_target_path = os.path.join("/Users/dayyoung/project/aibible/chrome_extension/ollama", filename)
            forkid_target_path = os.path.join("/Users/dayyoung/project/aibible/chrome_extension/forkid", filename)
            
            # 둘 중 하나라도 정상 완료본이 이미 존재하는지 체크
            already_done = False
            for p in [original_target_path, forkid_target_path]:
                if os.path.exists(p) and os.path.getsize(p) > 0:
                    already_done = True
                    break
            
            if already_done:
                print(f"[{kor_name}] Already summarized. Skipping.")
                continue
                
            # 요약 실행
            success = process_book_via_ollama(filename, kor_name)
            if success:
                # PDF 업데이트
                rebuild_pdf()
                
        except Exception as e:
            print(f"Error processing {kor_name} ({filename}): {e}")
            print("Sleeping for 5 seconds and resuming next book...")
            time.sleep(5)
            
    total_min = (time.time() - start_time) / 60
    print(f"\nAll operations completed! Total execution time: {total_min:.2f} minutes.")

if __name__ == "__main__":
    main()
