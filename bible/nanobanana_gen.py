import os
import sys
import json
import base64
import requests
from datetime import datetime
from config import get_api_key

# --------------------------------------------------------------------------------
# NanoBanana (Gemini/Imagen) REST API Image Generator
# 
# 이 스크립트는 Python 라이브러리 호환성 문제를 피하기 위해
# Google Gemini API(REST)를 직접 호출하여 이미지를 생성합니다.
# --------------------------------------------------------------------------------

# API 키 설정 (폴더 외부 ~/.gemini/google_api_key.txt 에서 읽어옵니다)
API_KEY = get_api_key()

# 모델 설정
# 사용자의 요청에 따라 다시 'gemini-2.5-flash-image' (NanoBanana) 모델을 사용합니다.
MODEL_NAME = "nano-banana-pro-preview"
MODEL_NAME = "gemini-2.5-flash-image"

def generate_image_rest(prompt, output_file="output.png"):
    if not API_KEY or "YOUR_API_KEY" in API_KEY:
        print("오류: API Key가 설정되지 않았습니다.")
        return

    print(f"\n--- NanoBanana (Pro Preview) 이미지 생성 ---")
    print(f"모델: {MODEL_NAME}")
    print(f"프롬프트: {prompt}")

    # Gemini generateContent REST API 엔드포인트
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL_NAME}:generateContent?key={API_KEY}"
    
    # 요청 페이로드 (Gemini Chat 포맷)
    payload = {
        "contents": [
            {
                "parts": [
                    {"text": prompt}
                ]
            }
        ]
    }
    
    headers = {
        "Content-Type": "application/json"
    }

    try:
        print("API 요청 보내는 중...")
        response = requests.post(url, headers=headers, data=json.dumps(payload))
        
        if response.status_code != 200:
            print(f"API 요청 실패: {response.status_code}")
            if response.status_code == 429:
                print("\n[중요] 429 Resource Exhausted 오류 발생")
                print("이 오류는 현재 API 키(Free Tier)로 해당 모델을 사용할 수 없거나 할당량이 초과되었음을 의미합니다.")
                print("Google Cloud Console에서 결제가 활성화된 프로젝트를 사용하거나, 지원되는 다른 모델을 확인해야 합니다.")
            else:
                print(response.text)
            return

        result = response.json()
        
        # 응답 처리 (Gemini 구조)
        # { "candidates": [ { "content": { "parts": [ { "inlineData": { "mimeType": "image/png", "data": "..." } } ] } } ] }
        try:
            candidates = result.get("candidates", [])
            if candidates:
                parts = candidates[0].get("content", {}).get("parts", [])
                for part in parts:
                    inline_data = part.get("inlineData")
                    if inline_data:
                        b64_data = inline_data.get("data")
                        mime_type = inline_data.get("mimeType", "image/png")
                        
                        if b64_data:
                            img_data = base64.b64decode(b64_data)
                            with open(output_file, "wb") as f:
                                f.write(img_data)
                            print(f"\n성공! 이미지가 저장되었습니다: {os.path.abspath(output_file)}")
                            return

            print(f"이미지가 생성되지 않았습니다. 응답: {str(result)[:500]}")
            
        except Exception as parse_error:
            print(f"응답 데이터 처리 중 오류: {parse_error}")
            print(f"전체 응답: {result}")

    except Exception as e:
        print(f"\n[오류 발생]: {e}")
        print("라이브러리 'requests'가 설치되어 있는지 확인하세요 (pip install requests)")

if __name__ == "__main__":
    # 명령어 인자 처리
    if len(sys.argv) > 1:
        # 파일 경로가 첫번째 인자로 들어오는 경우가 있으므로(실행 방식에 따라), 
        # python script.py "prompt" 형태라면 sys.argv[1]이 prompt
        user_prompt = " ".join(sys.argv[1:])
    else:
        user_prompt = input("생성하고 싶은 이미지를 설명해주세요: ")
    
    if user_prompt:
        generate_image_rest(user_prompt)
    else:
        print("설명이 입력되지 않았습니다.")
