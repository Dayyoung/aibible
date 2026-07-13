import sys
sys.path.append("/Users/dayyoung/project/aibible/chrome_extension/ollama")
from helper_ollama_summarizer import process_book_via_ollama

books = [
  ("romans.json", "로마서"), ("1corinthians.json", "고린도전서"), ("2corinthians.json", "고린도후서"),
  ("galatians.json", "갈라디아서"), ("ephesians.json", "에베소서"), ("philippians.json", "빌립보서"),
  ("colossians.json", "골로새서"), ("1thessalonians.json", "데살로니가전서"), ("2thessalonians.json", "데살로니가후서"),
  ("1timothy.json", "디모데전서"), ("2timothy.json", "디모데후서")
]

for filename, kor_name in books:
    try:
        process_book_via_ollama(filename, kor_name)
    except Exception as e:
        print(f"Error on {filename}: {e}")
