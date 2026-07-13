import sys
sys.path.append("/Users/dayyoung/project/aibible/chrome_extension/ollama")
from helper_ollama_summarizer import process_book_via_ollama

books = [
  ("titus.json", "디도서"), ("philemon.json", "빌레몬서"), ("hebrews.json", "히브리서"),
  ("james.json", "야고보서"), ("1peter.json", "베드로전서"), ("2peter.json", "베드로후서"),
  ("1john.json", "요한일서"), ("2john.json", "요한이서"), ("3john.json", "요한삼서"),
  ("jude.json", "유다서"), ("revelation.json", "요한계시록")
]

for filename, kor_name in books:
    try:
        process_book_via_ollama(filename, kor_name)
    except Exception as e:
        print(f"Error on {filename}: {e}")
