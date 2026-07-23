import os
import re

LOG_FILE = "/Users/dayyoung/.gemini/antigravity/brain/d1bae942-c95d-4892-9d67-de7aeb529009/.system_generated/tasks/task-92.log"
SENT_FILE = "/Users/dayyoung/project/aibible/sent_progress.txt"

def main():
    if not os.path.exists(LOG_FILE):
        print("LOG_NOT_FOUND")
        return

    # 로그 읽기
    with open(LOG_FILE, 'r', encoding='utf-8', errors='ignore') as f:
        log_content = f.read()

    # 완료된 책 파싱
    completed_books = re.findall(r'\[PROGRESS\]\s+([a-zA-Z0-9_]+\.json)\s+완료', log_content)
    
    # 이미 보낸 목록 읽기
    sent_books = set()
    if os.path.exists(SENT_FILE):
        with open(SENT_FILE, 'r', encoding='utf-8') as f:
            sent_books = set(line.strip() for line in f if line.strip())

    # 새로 완료된 책들
    newly_completed = [book for book in completed_books if book not in sent_books]

    # 새로 완료된 것이 있으면 기록 업데이트
    if newly_completed:
        with open(SENT_FILE, 'a', encoding='utf-8') as f:
            for book in newly_completed:
                f.write(book + "\n")

    # 결과 출력
    status = "RUNNING"
    if "모든 작업이 완료되었습니다!" in log_content:
        status = "COMPLETED"
    elif "Failed to call Gemini API" in log_content or "결국" in log_content and "중단합니다." in log_content:
        status = "FAILED"

    new_list_str = ",".join(newly_completed)
    print(f"STATUS:{status}|NEW:{new_list_str}")

if __name__ == "__main__":
    main()
