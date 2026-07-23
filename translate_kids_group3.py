import json
import os
import re
import sys
import time
import subprocess
from google import genai
from google.genai import errors

# API Key 설정 (환경변수 사용)
client = genai.Client()

BIBLE_BOOKS = [
    ("ezekiel", "에스겔"),
    ("daniel", "다니엘"),
    ("hosea", "호세아")
]

SYSTEM_PROMPT = """당신은 성경 번역 및 아동용 각색 전문가입니다.
주어진 영어 성경 구절들을 어린이들이 이해하기 아주 쉬운 '쉬운 키즈 성경' 나레이션 본으로 번역하고 요약/각색해 주세요.

[요구 사항]
1. 톤앤매너: 성우가 구연동화나 다정한 나레이션을 들려주는 듯한 존댓말 구어체(~했어요, ~했답니다, ~란다, ~했지요 등)로 작성하세요.
2. 단순화: 어린이 눈높이에 맞게 어렵고 복잡한 표현, 이름 나열(족보), 치수 규격(예: 규빗, 성막의 세부 규격), 중복 율법 조항 등은 과감하게 요약/압축해 주세요.
3. 시각적 묘사: 나중에 삽화나 이미지를 생성할 수 있도록 장면 묘사성은 풍부하게 유지해 주세요.
4. 출력 형식: 입력받은 JSON의 키(예: "1:1", "1:2")를 100% 동일하게 유지하여, 각 키에 해당하는 요약된 한글 나레이션을 값으로 가지는 순수한 JSON 객체 하나만 반환하세요.
   - 예: {"1:1": "요약 1절 내용...", "1:2": "요약 2절 내용..."}
   - 절대로 다른 설명이나 인사말 등을 붙이지 말고 오직 순수한 JSON 객체만 반환하세요.
   - 족보나 복잡한 절들이 모여 있을 때는 대표 구절에 요약 내용을 넣고 나머지 절들의 값도 비워두지 말고, 자연스럽게 이어지도록 한 문장 내외의 부드러운 연결 멘트로 반드시 값을 채워주세요. (값은 절대 빈 문자열이면 안 됩니다.)
"""

def summarize_chapter(book_ko, chapter_num, raw_chapter_data, max_retries=5):
    prompt = f"성경: {book_ko}, 장: {chapter_num}장\n입력 데이터:\n{json.dumps(raw_chapter_data, ensure_ascii=False, indent=2)}"
    
    for attempt in range(max_retries):
        try:
            # API 과부하 방지 및 Rate Limit 준수
            time.sleep(1.0)
            
            response = client.models.generate_content(
                model='gemini-1.5-flash',
                contents=prompt,
                config={
                    'system_instruction': SYSTEM_PROMPT,
                    'temperature': 0.3,
                    'response_mime_type': 'application/json'
                }
            )
            
            if response.text:
                # JSON 파싱 검증
                parsed_data = json.loads(response.text)
                # 입력 키들이 모두 결과에 포함되어 있는지 검증
                missing_keys = [k for k in raw_chapter_data.keys() if k not in parsed_data]
                if missing_keys:
                    print(f"\nWarning: Missing keys in LLM response: {missing_keys}. Retrying...")
                    # 누락된 키가 있으면 에러 발생시켜 재시도 유도
                    raise ValueError("Missing keys in response")
                return parsed_data
            else:
                raise Exception("Empty response text")
                
        except errors.APIError as e:
            if e.code == 429:
                wait_time = (2 ** attempt) * 10
                print(f"\n[API 429 Quota] Too Many Requests. Waiting {wait_time} seconds before retry...", flush=True)
                time.sleep(wait_time)
            else:
                print(f"\n[API Error] Code {e.code}: {e.message}. Retrying...", flush=True)
                time.sleep(3)
        except Exception as e:
            print(f"\n[Error] {e}. Retrying...", flush=True)
            time.sleep(3)
            
    raise Exception(f"Failed to summarize chapter {chapter_num} after {max_retries} retries.")

def process_book(bible_key, book_ko):
    raw_path = f"/Users/dayyoung/project/aibible/chrome_extension/forkid_temp/{bible_key}_raw.json"
    translated_path = f"/Users/dayyoung/project/aibible/chrome_extension/forkid_temp/{bible_key}_translated.json"
    
    print(f"\n==========================================")
    print(f"시작: {book_ko} ({bible_key})")
    print(f"==========================================")
    
    if not os.path.exists(raw_path):
        print(f"에러: {raw_path} 파일이 존재하지 않습니다.")
        return False
        
    with open(raw_path, 'r', encoding='utf-8') as f:
        raw_data = json.load(f)
        
    # 장별로 그룹핑
    chapters = {}
    for key, val in raw_data.items():
        ch = int(key.split(':')[0])
        if ch not in chapters:
            chapters[ch] = {}
        chapters[ch][key] = val
        
    translated_data = {}
    total_chapters = len(chapters)
    
    for idx, ch_num in enumerate(sorted(chapters.keys()), 1):
        print(f"[{book_ko}] {ch_num}장 요약 중 ({idx}/{total_chapters})... ", end="", flush=True)
        
        raw_chapter_data = chapters[ch_num]
        
        # 캐시가 이미 존재하여 translated_data를 일부 복구 가능한지 확인
        # (중간에 에러나서 멈췄을 때 이어하기를 지원하기 위해 translated_path 확인)
        if os.path.exists(translated_path):
            try:
                with open(translated_path, 'r', encoding='utf-8') as tf:
                    temp_translated = json.load(tf)
                    # 현재 장의 모든 키가 이미 번역되어 있는지 체크
                    if all(k in temp_translated for k in raw_chapter_data.keys()):
                        print("이미 존재함 (스킵)")
                        for k in raw_chapter_data.keys():
                            translated_data[k] = temp_translated[k]
                        continue
            except Exception as cache_err:
                pass
                
        try:
            summarized_chapter = summarize_chapter(book_ko, ch_num, raw_chapter_data)
            translated_data.update(summarized_chapter)
            print("완료!")
            
            # 매 챕터 끝날 때마다 중간 백업 저장
            with open(translated_path, 'w', encoding='utf-8') as out_f:
                json.dump(translated_data, out_f, ensure_ascii=False, indent=4)
                
        except Exception as e:
            print(f"\n[오류 발생] {book_ko} {ch_num}장 진행 중 에러: {e}")
            return False
            
    # 최종 번역 파일 쓰기
    with open(translated_path, 'w', encoding='utf-8') as out_f:
        json.dump(translated_data, out_f, ensure_ascii=False, indent=4)
        
    print(f"[{book_ko}] 임시 번역본 저장 완료 -> {translated_path}")
    
    # translate_helper.py apply 실행
    print(f"[{book_ko}] 최종본 적용 및 검증 진행...")
    try:
        res = subprocess.run(
            ["python3", "/Users/dayyoung/project/aibible/chrome_extension/translate_helper.py", "apply", bible_key],
            capture_output=True, text=True, check=True
        )
        print(res.stdout)
        return True
    except subprocess.CalledProcessError as sub_err:
        print(f"[{book_ko}] 최종본 적용 실패: {sub_err.stderr}")
        return False

if __name__ == "__main__":
    for bible_key, book_ko in BIBLE_BOOKS:
        success = process_book(bible_key, book_ko)
        if not success:
            print(f"오류: {book_ko} 요약 진행 중 실패했습니다.")
            sys.exit(1)
            
    print("\n[전체 완료] 모든 성경의 요약 및 적용이 완료되었습니다!")
