import sys
sys.path.append("/Users/dayyoung/project/aibible/chrome_extension/ollama")
from helper_ollama_summarizer import process_book_via_ollama

books = [
  ("isaiah.json", "이사야"), ("jeremiah.json", "예레미야"), ("lamentations.json", "예레미야 애가"),
  ("ezekiel.json", "에스겔"), ("daniel.json", "다니엘"), ("hosea.json", "호세아"),
  ("joel.json", "요엘"), ("amos.json", "아모스"), ("obadiah.json", "오바디야"),
  ("jonah.json", "요나")
]

for filename, kor_name in books:
    try:
        process_book_via_ollama(filename, kor_name)
    except Exception as e:
        print(f"Error on {filename}: {e}")
