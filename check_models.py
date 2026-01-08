import os
import requests
import json
from config import get_api_key

# API 키를 폴더 외부에서 읽어옵니다.
API_KEY = get_api_key()

if not API_KEY:
    print("Error: API_KEY를 찾을 수 없습니다. ~/.gemini/google_api_key.txt 파일을 확인해주세요.")
    exit(1)

url = f"https://generativelanguage.googleapis.com/v1beta/models?key={API_KEY}"

print("Checking available models...")
try:
    response = requests.get(url)
    if response.status_code == 200:
        models = response.json().get('models', [])
        found_image_model = False
        print(f"\nFound {len(models)} models.")
        for model in models:
            # 이미지 생성 능력이 있는지 확인 (이름이나 지원하는 방식 등으로 유추)
            name = model.get('name')
            methods = model.get('supportedGenerationMethods', [])
            
            # 출력 줄이기: 이미지 관련 모델만 자세히 보거나, 전체 리스트를 간략히 봅니다.
            print(f"- {name} ({methods})")
            
            if 'image' in name.lower() or 'generateContent' in methods: 
                # Note: generateContent is usually text/multimodal input, not necessarily outputting images directly 
                # via the standard endpoint unless it's the specific image generation model.
                pass

    else:
        print(f"Error: {response.status_code}")
        print(response.text)
except Exception as e:
    print(f"Exception: {e}")
