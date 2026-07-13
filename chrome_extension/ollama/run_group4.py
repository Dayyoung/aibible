import sys
sys.path.append("/Users/dayyoung/project/aibible/chrome_extension/ollama")
from helper_ollama_summarizer import process_book_via_ollama

books = [
  ("micah.json", "미가"), ("nahum.json", "나훔"), ("habakkuk.json", "하박국"),
  ("zephaniah.json", "스바냐"), ("haggai.json", "학개"), ("zechariah.json", "스가랴"),
  ("malachi.json", "말라기"), ("matthew.json", "마태복음"), ("mark.json", "마가복음"),
  ("luke.json", "누가복음"), ("john.json", "요한복음"), ("acts.json", "사도행전")
]

for filename, kor_name in books:
    try:
        process_book_via_ollama(filename, kor_name)
    except Exception as e:
        print(f"Error on {filename}: {e}")
