import sys
sys.path.append("/Users/dayyoung/project/aibible/chrome_extension/ollama")
from helper_ollama_summarizer import process_book_via_ollama

books = [
  ("1chronicles.json", "역대기상"), ("2chronicles.json", "역대기하"), ("ezra.json", "에스라"),
  ("nehemiah.json", "느헤미야"), ("esther.json", "에스더"), ("job.json", "욥기"),
  ("psalms.json", "시편"), ("proverbs.json", "잠언"), ("ecclesiastes.json", "전도서"),
  ("songofsolomon.json", "아가")
]

for filename, kor_name in books:
    try:
        process_book_via_ollama(filename, kor_name)
    except Exception as e:
        print(f"Error on {filename}: {e}")
