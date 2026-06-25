import webbrowser
import sys

def open_gemini():
    url = "https://gemini.google.com/app"
    print(f"브라우저에서 Gemini 열기: {url}")
    
    try:
        # webbrowser 모듈을 사용하여 기본 브라우저에서 URL 열기
        webbrowser.open(url)
        print("완료!")
    except Exception as e:
        print(f"브라우저를 여는 중 오류가 발생했습니다: {e}")

if __name__ == "__main__":
    open_gemini()
