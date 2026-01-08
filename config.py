import os

def get_api_key():
    """
    폴더 외부(~/.gemini/google_api_key.txt) 또는 환경 변수에서 API 키를 읽어옵니다.
    """
    # 1. 환경 변수 확인
    env_key = os.getenv("GOOGLE_API_KEY")
    if env_key:
        return env_key

    # 2. 폴더 외부 파일 확인 (~/.gemini/google_api_key.txt)
    key_path = os.path.expanduser("~/.gemini/google_api_key.txt")
    if os.path.exists(key_path):
        with open(key_path, "r", encoding="utf-8") as f:
            return f.read().strip()

    return None
