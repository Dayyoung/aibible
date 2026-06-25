import json
import re

SCRAPED_FILE = "all_youtube_videos.json"

def check_titles():
    with open(SCRAPED_FILE, 'r', encoding='utf-8') as f:
        videos = json.load(f)

    # Standard pattern: "Book Name Chapter X (NIRV)"
    # Note: Book name can have spaces/numbers (e.g., 1 Samuel)
    standard_pattern = re.compile(r'^.+ Chapter \d+ \(NIRV\)$')
    
    different_format = []
    missing_nirv = []

    for vid in videos:
        title = vid['title']
        
        # Check for missing NIRV (user said NVR, likely typo for NIRV)
        if "NIRV" not in title:
            missing_nirv.append(title)
            continue
            
        # Check for non-standard format
        if not standard_pattern.match(title):
            different_format.append(title)

    # Group by Book
    groups = {}
    for t in missing_nirv:
        # Extract book and chapter from "AI Bible - Book X"
        match = re.search(r'AI Bible - (.*?) (\d+)$', t)
        if match:
            book = match.group(1)
            chapter = int(match.group(2))
            if book not in groups:
                groups[book] = []
            groups[book].append(chapter)
        else:
            if "Other" not in groups:
                groups["Other"] = []
            groups["Other"].append(t)

    print(f"Total videos checked: {len(videos)}")
    print(f"\n[비디오 제목에 'NIRV'가 포함되지 않은 챕터 요약]")
    for book in sorted(groups.keys()):
        chapters = sorted(groups[book])
        if isinstance(chapters[0], int):
            # Print as ranges if helpful, or just list
            print(f"- {book}: total {len(chapters)} chapters {chapters}")
        else:
            print(f"- {book}: {chapters}")

    if different_format:
        print(f"\n[포맷이 다른 챕터 (NIRV는 포함됨)]")
        for t in sorted(different_format):
            print(f"  - {t}")
    else:
        print("\n* 모든 NIRV 포함 비디오는 표준 포맷('{Book} Chapter {Number} (NIRV)')을 따릅니다.")

if __name__ == "__main__":
    check_titles()
