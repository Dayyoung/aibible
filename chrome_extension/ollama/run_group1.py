import sys
sys.path.append("/Users/dayyoung/project/aibible/chrome_extension/ollama")
from helper_ollama_summarizer import process_book_via_ollama

books = [
  ("genesis.json", "창세기"), ("exodus.json", "출애굽기"), ("leviticus.json", "레위기"),
  ("numbers.json", "민수기"), ("deuteronomy.json", "신명기"), ("joshua.json", "여호수아"),
  ("judges.json", "사사기"), ("ruth.json", "룻기"), ("1samuel.json", "사무엘상"),
  ("2samuel.json", "사무엘하"), ("1kings.json", "열왕기상"), ("2kings.json", "열왕기하")
]

for filename, kor_name in books:
    try:
        process_book_via_ollama(filename, kor_name)
    except Exception as e:
        print(f"Error on {filename}: {e}")
