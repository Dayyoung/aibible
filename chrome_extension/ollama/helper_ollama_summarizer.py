import os
import json
import re
import urllib.request
import time

OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL_NAME = "gemma4:12b-mlx"
ORIGINAL_DIR = "/Users/dayyoung/project/aibible/chrome_extension/json"
OLLAMA_DIR = "/Users/dayyoung/project/aibible/chrome_extension/ollama"

def clean_json_string(text):
    match = re.search(r'\[\s*\{.*\}\s*\]', text, re.DOTALL)
    if match:
        return match.group(0)
    return text.strip()

def summarize_chapter(book_kor, chapter_num, verses):
    verses_text = "\n".join([f"{v['verseNumber']}절: {v['value']}" for v in verses if v.get('value')])
    
    prompt = f"""
성경 {book_kor} {chapter_num}장을 어린이용 쉬운 성경 나레이션으로 요약해주세요.

[입력 구절 데이터]
{verses_text}

[요약 원칙]
1. 문체는 성우가 구연동화를 읽어주듯이 친근한 존댓말 구어체(~했어요, ~했답니다, ~란다 등)여야 합니다.
2. 이야기 전개에 맞춰 분량을 적당히 콤팩트하게 압축/요약해 주세요. 단, 나중에 그림 생성 프롬프트로 쓰이므로 구체적인 장면 묘사나 시각적 요소는 풍부해야 합니다.
3. 복잡한 족보나 수치, 제사 세부 규정은 1~2절로 과감히 축약합니다.
4. 1절의 내용 시작 부분에는 무조건 '{book_kor} {chapter_num}장 1절. '으로 시작해야 합니다.
5. 결과는 반드시 JSON 배열 형식이어야 하며, 아래 형식을 엄격히 지켜주세요. JSON 코드블록 외에 다른 설명글은 일절 출력하지 마세요.

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
    payload = {
        "model": MODEL_NAME,
        "prompt": prompt,
        "stream": False,
        "options": {
            "temperature": 0.3
        }
    }
    
    req_body = json.dumps(payload).encode('utf-8')
    headers = {"Content-Type": "application/json"}
    req = urllib.request.Request(OLLAMA_URL, data=req_body, headers=headers, method='POST')
    
    for retry in range(3):
        try:
            with urllib.request.urlopen(req) as response:
                res_body = response.read().decode('utf-8')
                res_json = json.loads(res_body)
                response_text = res_json.get("response", "")
                
                cleaned = clean_json_string(response_text)
                parsed = json.loads(cleaned)
                if isinstance(parsed, list) and len(parsed) > 0:
                    return parsed
        except Exception as e:
            print(f"      [Ollama-Retry {retry+1}] Error: {e}")
            time.sleep(1)
            
    return None

def process_book_via_ollama(filename, kor_name):
    original_path = os.path.join(ORIGINAL_DIR, filename)
    target_path = os.path.join(OLLAMA_DIR, filename)
    
    # Check if already processed
    if os.path.exists(target_path) and os.path.getsize(target_path) > 0:
        try:
            with open(target_path, 'r', encoding='utf-8') as f:
                existing = json.load(f)
                if isinstance(existing, list) and len(existing) > 0:
                    print(f"[{kor_name}] Already exists in ollama folder. Skipping.")
                    return True
        except:
            pass
            
    print(f"[{kor_name}] Starting Ollama summarization...")
    
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
        
        # Call Local LLM
        summarized_chapter = summarize_chapter(kor_name, ch, chapter_verses)
        
        if summarized_chapter:
            summarized_data.extend(summarized_chapter)
        else:
            # Fallback original mapping
            for v in chapter_verses[:3]:
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
    
    os.makedirs(OLLAMA_DIR, exist_ok=True)
    with open(target_path, 'w', encoding='utf-8') as f:
        json.dump(summarized_data, f, ensure_ascii=False, indent=4)
        
    print(f"[{kor_name}] Completed and saved to {target_path}.")
    return True
