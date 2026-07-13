import json
import os
import re
import sys
import time
import requests

# 1조 배정 성경 파일 목록
BIBLE_FILES = [
    'genesis.json', 'exodus.json', 'leviticus.json', 'numbers.json', 'deuteronomy.json',
    'joshua.json', 'judges.json', 'ruth.json', '1samuel.json', '2samuel.json',
    '1kings.json', '2kings.json'
]

BIBLE_MAP = {
    'genesis.json': '창세기',
    'exodus.json': '출애굽기',
    'leviticus.json': '레위기',
    'numbers.json': '민수기',
    'deuteronomy.json': '신명기',
    'joshua.json': '여호수아',
    'judges.json': '사사기',
    'ruth.json': '룻기',
    '1samuel.json': '사무엘상',
    '2samuel.json': '사무엘하',
    '1kings.json': '열왕기상',
    '2kings.json': '열왕기하'
}

INPUT_DIR = "/Users/dayyoung/project/aibible/chrome_extension/json"
OUTPUT_DIR = "/Users/dayyoung/project/aibible/chrome_extension/forkid"
CACHE_DIR = os.path.join(OUTPUT_DIR, "cache")

os.makedirs(OUTPUT_DIR, exist_ok=True)
os.makedirs(CACHE_DIR, exist_ok=True)

SYSTEM_PROMPT = """당신은 성경 번역 및 아동용 각색 전문가입니다.
주어진 영어 성경 구절들을 어린이들이 이해하기 아주 쉬운 '쉬운 키즈 성경' 나레이션 본으로 번역하고 요약/각색해 주세요.

[요구 사항]
1. 톤앤매너: 성우가 구연동화나 다정한 나레이션을 들려주는 듯한 존댓말 구어체(~했어요, ~했답니다, ~란다, ~했지요 등)로 작성하세요.
2. 단순화: 어린이 눈높이에 맞게 어렵고 복잡한 표현, 이름 나열(족보), 치수 규격(예: 규빗, 성막의 세부 규격), 중복 율법 조항 등은 과감하게 요약/압축해 주세요.
3. 시각적 묘사: 나중에 삽화나 이미지를 생성할 수 있도록 장면 묘사성은 풍부하게 유지해 주세요.
4. 출력 형식: 입력받은 JSON의 키(절 번호)를 그대로 유지하여, 각 키에 해당하는 요약된 한글 나레이션을 값으로 가지는 순수한 JSON 객체 하나만 반환하세요.
   - 예: {"1": "요약 1절 내용...", "2": "요약 2절 내용..."}
   - 절대로 마크다운 코드 블록(```json)을 제외한 다른 설명이나 인사말 등을 붙이지 말고 오직 JSON만 반환하세요.
   - 만약 족보나 복잡한 절들이 뭉쳐 있어서 여러 절을 합쳐 요약하고 싶다면, 대표적인 하나의 절(예: 10절)에 요약 내용을 넣고 나머지 절(예: 11~15절)의 값은 빈 문자열("")로 반환하여 절의 개수나 절 구분을 유지할 수 있도록 하세요.
"""

def call_ollama(prompt, system_prompt=SYSTEM_PROMPT, max_retries=5):
    url = "http://localhost:11434/api/chat"
    payload = {
        "model": "gemma4:12b-mlx",
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": prompt}
        ],
        "stream": False,
        "options": {
            "temperature": 0.3
        }
    }
    
    for attempt in range(max_retries):
        try:
            response = requests.post(url, json=payload, timeout=120)
            if response.status_code == 200:
                result = response.json()
                return result['message']['content']
            else:
                print(f"\nOllama API error (status {response.status_code}): {response.text}")
        except Exception as e:
            print(f"\nOllama API exception: {e}")
        
        print(f"\nRetry {attempt + 1}/{max_retries} after 5 seconds...")
        time.sleep(5)
    
    raise Exception("Failed to call Ollama API after multiple retries.")

def extract_json(text):
    # Try finding JSON block
    match = re.search(r'```(?:json)?\s*(\{.*?\})\s*```', text, re.DOTALL)
    if match:
        return match.group(1)
    match = re.search(r'(\{.*\})', text, re.DOTALL)
    if match:
        return match.group(1)
    return text.strip()

def summarize_chapter(bible_ko, file_key, chapter_num, verses_dict):
    # 캐시 파일 경로
    cache_file = os.path.join(CACHE_DIR, f"{file_key}_ch{chapter_num}.json")
    
    # 캐시가 이미 존재하면 로드
    if os.path.exists(cache_file):
        try:
            with open(cache_file, 'r', encoding='utf-8') as f:
                cached_data = json.load(f)
                # 키가 정수로 변환 가능한지 확인하여 반환
                return {int(k): str(v) for k, v in cached_data.items()}
        except Exception as e:
            print(f"\n캐시 읽기 실패 ({cache_file}), API 재호출 진행: {e}")

    # API 호출
    prompt = f"성경: {bible_ko}, 장: {chapter_num}장\n입력 데이터:\n{json.dumps(verses_dict, ensure_ascii=False, indent=2)}"
    
    raw_response = call_ollama(prompt)
    json_str = extract_json(raw_response)
    
    try:
        summarized_dict = json.loads(json_str)
        result = {int(k): str(v) for k, v in summarized_dict.items()}
        
        # 결과를 캐시에 저장
        with open(cache_file, 'w', encoding='utf-8') as f:
            json.dump(result, f, ensure_ascii=False, indent=4)
            
        return result
    except Exception as e:
        print(f"\nJSON parsing failed for Chapter {chapter_num}. Raw response:\n{raw_response}")
        raise e

def process_bible_file(filename):
    file_key = filename.replace(".json", "")
    bible_ko = BIBLE_MAP[filename]
    input_path = os.path.join(INPUT_DIR, filename)
    output_path = os.path.join(OUTPUT_DIR, filename)
    
    print(f"\n==========================================")
    print(f"시작: {bible_ko} ({filename})")
    print(f"==========================================")
    
    if not os.path.exists(input_path):
        print(f"에러: 입력 파일이 존재하지 않습니다: {input_path}")
        return
        
    with open(input_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    # 원래 요소들을 장별로 그룹화
    chapters = {}
    for idx, item in enumerate(data):
        if 'chapterNumber' in item and 'verseNumber' in item:
            ch = item['chapterNumber']
            vs = item['verseNumber']
            val = item.get('value', '').strip()
            
            if ch not in chapters:
                chapters[ch] = {}
            if vs not in chapters[ch]:
                chapters[ch][vs] = []
            
            # 나중에 수정하기 위해 원래 리스트의 인덱스 저장
            chapters[ch][vs].append((idx, val))

    total_chapters = len(chapters)
    # 각 장에 대해 요약 수행
    for idx_ch, ch_num in enumerate(sorted(chapters.keys()), 1):
        print(f"[{bible_ko}] {ch_num}장 요약 중 ({idx_ch}/{total_chapters})... ", end="", flush=True)
        
        # LLM에 제공할 영어 텍스트 준비
        verses_dict = {}
        for vs_num, items in chapters[ch_num].items():
            # 같은 절에 여러 텍스트가 있을 경우 병합
            combined_val = " ".join([val for idx, val in items if val])
            verses_dict[vs_num] = combined_val
            
        # 번역 및 각색 진행 (캐시 지원)
        retries = 3
        summarized_dict = None
        while retries > 0:
            try:
                summarized_dict = summarize_chapter(bible_ko, file_key, ch_num, verses_dict)
                break
            except Exception as e:
                retries -= 1
                print(f"\n[오류] {ch_num}장 처리 실패, 남은 재시도 횟수: {retries}. 에러: {e}")
                if retries == 0:
                    print(f"결국 {ch_num}장 처리에 실패했습니다. 중단합니다.")
                    sys.exit(1)
                time.sleep(3)
        
        # 원래 리스트 구조에 덮어쓰기
        for vs_num, items in chapters[ch_num].items():
            summary_text = summarized_dict.get(vs_num, "").strip()
            
            # 장의 1절 시작 부분 접두사 적용 규칙
            if vs_num == 1:
                # 1절 앞에 항상 접두사를 붙임
                prefix = f"{bible_ko} {ch_num}장 1절. "
                if not summary_text.startswith(prefix):
                    # 중복 방지를 위해 기존 접두사 제거 후 재추가
                    clean_text = re.sub(rf"^{re.escape(bible_ko)}\s*{ch_num}장\s*1절\.\s*", "", summary_text)
                    summary_text = prefix + clean_text
            
            # 원본 데이터 구조에 분배
            # 동일 절 번호의 첫 번째 요소에만 요약을 넣고 나머지는 빈 문자열 처리
            for i, (orig_idx, _) in enumerate(items):
                if i == 0:
                    data[orig_idx]['value'] = summary_text
                else:
                    data[orig_idx]['value'] = ""
                    
        print("완료!")
        # API 과부하 방지를 위해 잠깐 대기 (캐시인 경우는 즉시 처리되므로 딜레이 최소화 가능)
        time.sleep(0.1)

    # 출력 파일 저장
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)
    print(f"성공: {bible_ko} 저장 완료 -> {output_path}")

if __name__ == "__main__":
    # 특정 파일들만 인자로 넘겨 처리 가능하게 설정
    files_to_process = sys.argv[1:] if len(sys.argv) > 1 else BIBLE_FILES
    
    for filename in files_to_process:
        process_bible_file(filename)
    print("\n모든 작업이 완료되었습니다!")
