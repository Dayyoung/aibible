import os
import json
import re
import time
import subprocess
import urllib.request
import urllib.parse

ORIGINAL_DIR = "/Users/dayyoung/project/aibible/chrome_extension/json"
FORKID_DIR = "/Users/dayyoung/project/aibible/chrome_extension/forkid"

REPORT_PATH = "/Users/dayyoung/project/aibible/chrome_extension/forkid/final_usage_report.json"

# 사용자가 제공한 구글 API Key (환경변수 사용)
API_KEY = os.getenv("GEMINI_API_KEY", "")
# 쿼터 한도 우회를 위해 극도의 경량 모델인 gemini-flash-lite-latest 로 변경
MODEL_NAME = "gemini-flash-lite-latest"

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

stats = {
    "total_input_tokens": 0,
    "total_output_tokens": 0,
    "processed_books": []
}

if os.path.exists(REPORT_PATH) and os.path.getsize(REPORT_PATH) > 0:
    try:
        with open(REPORT_PATH, 'r', encoding='utf-8') as rf:
            stats = json.load(rf)
    except:
        pass

def clean_json_string(text):
    match = re.search(r'\[\s*\{.*\}\s*\]', text, re.DOTALL)
    if match:
        return match.group(0)
    match = re.search(r'(\{.*\})', text, re.DOTALL)
    if match:
        return match.group(1)
    return text.strip()

def call_gemini_api(prompt):
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL_NAME}:generateContent?key={API_KEY}"
    
    headers = {
        "Content-Type": "application/json; charset=utf-8"
    }
    
    payload = {
        "contents": {
            "role": "user",
            "parts": [
                {
                    "text": prompt
                }
            ]
        },
        "generationConfig": {
            "temperature": 0.3,
            "responseMimeType": "application/json"
        }
    }
    
    req_body = json.dumps(payload).encode('utf-8')
    
    # 429 우회를 위해 호출 시마다 넉넉한 딜레이(15초) 적용
    time.sleep(15)
    
    for retry in range(5):
        try:
            req = urllib.request.Request(url, data=req_body, headers=headers, method='POST')
            with urllib.request.urlopen(req, timeout=90) as response:
                res_body = response.read().decode('utf-8')
                res_json = json.loads(res_body)
                
                usage = res_json.get("usageMetadata", {})
                in_tokens = usage.get("promptTokenCount", 0)
                out_tokens = usage.get("candidatesTokenCount", 0)
                stats["total_input_tokens"] += in_tokens
                stats["total_output_tokens"] += out_tokens
                
                candidates = res_json.get("candidates", [])
                if candidates:
                    parts = candidates[0].get("content", {}).get("parts", [])
                    if parts:
                        text = parts[0].get("text", "")
                        return text
        except Exception as e:
            wait_sec = (retry + 1) * 30
            print(f"      [API Error - 429/Other Retry {retry+1}] {e}. Waiting {wait_sec} seconds...")
            time.sleep(wait_sec)
            
    return None

def summarize_chapter(book_kor, chapter_num, verses):
    verses_text = "\n".join([f"{v['verseNumber']}절: {v['value']}" for v in verses if v.get('value')])
    
    prompt = f"""
당신은 성경 번역 및 아동용 각색 전문가입니다.
주어진 영어 성경 구절들을 어린이들이 이해하기 아주 쉬운 '쉬운 키즈 성경' 나레이션 본으로 번역하고 요약/각색해 주세요.

성경: {book_kor}, 장: {chapter_num}장
[입력 구절 데이터]
{verses_text}

[요약 원칙]
1. 문체는 성우가 구연동화를 읽어주듯이 친근한 존댓말 구어체(~했어요, ~했답니다, ~란다 등)여야 합니다.
2. 이야기 전개에 맞춰 분량을 적당히 콤팩트하게 압축/요약해 주세요. 단, 나중에 그림 생성 프롬프트로 쓰이므로 구체적인 장면 묘사나 시각적 요소는 풍부해야 합니다.
3. 복잡한 족보나 수치, 제사 세부 규정은 1~2절로 과감히 축약합니다.
4. 1절의 내용 시작 부분에는 무조건 '{book_kor} {chapter_num}장 1절. '으로 시작해야 합니다.
5. 결과는 반드시 JSON 배열 형식이어야 하며, 아래 형식을 엄격히 지켜주세요. JSON 외에 다른 설명글은 일절 출력하지 마세요.

[결과 포맷 예시]
[
  {{
    "type": "paragraph text",
    "chapterNumber": {chapter_num},
    "verseNumber": 1,
    "value": "{book_kor} {chapter_num}장 1절. 옛날에 하나님께서..."
  }},
  {{
    "type": "paragraph text",
    "chapterNumber": {chapter_num},
    "verseNumber": 2,
    "value": "그때 빛이 환하게 비췄어요."
  }}
]
"""
    
    for retry in range(3):
        try:
            response_text = call_gemini_api(prompt)
            if response_text:
                cleaned = clean_json_string(response_text)
                parsed = json.loads(cleaned)
                if isinstance(parsed, list) and len(parsed) > 0:
                    return parsed
        except Exception as e:
            print(f"      [Retry {retry+1}] Parse Error: {e}")
            time.sleep(2)
            
    return None

def process_book_via_gemini(filename, kor_name):
    original_path = os.path.join(ORIGINAL_DIR, filename)
    target_path = os.path.join(FORKID_DIR, filename)
    
    if os.path.exists(target_path) and os.path.getsize(target_path) > 0:
        try:
            with open(target_path, 'r', encoding='utf-8') as f:
                existing = json.load(f)
                if isinstance(existing, list) and len(existing) > 0:
                    has_fallback = any("[Original Fallback]" in v.get("value", "") for v in existing if v.get("type") in ["paragraph text", "line text"])
                    if not has_fallback:
                        print(f"[{kor_name}] Valid summary exists in forkid folder. Skipping.")
                        return True
        except:
            pass
            
    print(f"[{kor_name}] Starting Gemini Flash-Lite summarization...")
    
    with open(original_path, 'r', encoding='utf-8') as f:
        original_data = json.load(f)
        
    chapters = {}
    for item in original_data:
        if item.get("type") in ["paragraph text", "line text"]:
            ch = item["chapterNumber"]
            if ch not in chapters:
                chapters[ch] = []
            chapters[ch].append(item)
            
    summarized_data = []
    summarized_data.append({"type": "paragraph start"})
    
    sorted_chapters = sorted(chapters.keys())
    for index, ch in enumerate(sorted_chapters):
        print(f"   - Processing {kor_name} Chapter {ch}...")
        chapter_verses = chapters[ch]
        
        summarized_chapter = summarize_chapter(kor_name, ch, chapter_verses)
        
        if summarized_chapter:
            summarized_data.extend(summarized_chapter)
        else:
            print(f"      [Warning] Chapter {ch} failed. Using original fallback.")
            for v in chapter_verses:
                orig_val = v.get("value", "")
                val_mod = f"{kor_name} {ch}장 {v['verseNumber']}절. " + orig_val if v['verseNumber'] == 1 else orig_val
                summarized_data.append({
                    "type": "paragraph text",
                    "chapterNumber": ch,
                    "verseNumber": v["verseNumber"],
                    "value": val_mod
                })
                
        if index < len(sorted_chapters) - 1:
            summarized_data.append({"type": "paragraph end"})
            summarized_data.append({"type": "paragraph start"})
            
    summarized_data.append({"type": "paragraph end"})
    
    os.makedirs(FORKID_DIR, exist_ok=True)
    with open(target_path, 'w', encoding='utf-8') as f:
        json.dump(summarized_data, f, ensure_ascii=False, indent=4)
        
    print(f"[{kor_name}] Completed and saved to {target_path}.")
    
    if kor_name not in stats["processed_books"]:
        stats["processed_books"].append(kor_name)
    save_usage_report()
    
    return True

def save_usage_report():
    # Flash Lite는 Flash에 비해서 단가가 훨씬 더 저렴합니다.
    # (Lite 요율: 1M 토큰당 Input $0.03, Output $0.06)
    input_cost = (stats["total_input_tokens"] / 1000000) * 0.030
    output_cost = (stats["total_output_tokens"] / 1000000) * 0.060
    total_cost_usd = input_cost + output_cost
    total_cost_krw = total_cost_usd * 1350
    
    stats["calculated_costs"] = {
        "input_cost_usd": round(input_cost, 6),
        "output_cost_usd": round(output_cost, 6),
        "total_cost_usd": round(total_cost_usd, 6),
        "total_cost_krw": round(total_cost_krw, 2)
    }
    
    with open(REPORT_PATH, 'w', encoding='utf-8') as f:
        json.dump(stats, f, ensure_ascii=False, indent=4)

def rebuild_pdf():
    print("[Sync] Rebuilding latest kids PDF...")
    try:
        subprocess.run(["python3", "/Users/dayyoung/project/aibible/chrome_extension/ollama/generate_kids_pdf.py"], check=True)
    except Exception as e:
        print(f"[Sync] Error rebuilding PDF: {e}")

def main():
    print("=== Bible Gemini Developer API Summarization Orchestrator ===")
    print(f"Using {MODEL_NAME} for ultra-fast, high-quota, and lowest-cost summarization.")
    
    start_time = time.time()
    
    for filename, kor_name in BIBLE_ORDER:
        try:
            success = process_book_via_gemini(filename, kor_name)
            if success:
                rebuild_pdf()
        except Exception as e:
            print(f"Error processing {kor_name}: {e}")
            time.sleep(5)
            
    total_min = (time.time() - start_time) / 60
    print(f"\nAll operations completed! Total execution time: {total_min:.2f} minutes.")
    
    save_usage_report()
    print(f"=== Usage Summary ===")
    print(f"Total Books: {len(stats['processed_books'])}")
    print(f"Total Input Tokens: {stats['total_input_tokens']}")
    print(f"Total Output Tokens: {stats['total_output_tokens']}")
    print(f"Estimated Total Cost: ${stats['calculated_costs']['total_cost_usd']:.4f} USD ({stats['calculated_costs']['total_cost_krw']:,} KRW)")

if __name__ == "__main__":
    main()
