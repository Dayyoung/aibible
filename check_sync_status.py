
import json

def check_ids():
    with open('video_history.json', 'r', encoding='utf-8') as f:
        history = json.load(f)
    
    missing_details = {}
    for entry in history:
        if entry.get('uploaded') and not entry.get('video_id'):
            book = entry.get('book')
            chapter = entry.get('chapter')
            if book not in missing_details:
                missing_details[book] = []
            missing_details[book].append(chapter)
            
    print(f"Total entries: {len(history)}")
    print(f"Uploaded without ID: {sum(len(ch) for ch in missing_details.values())}")
    print("\nMissing Details:")
    for book in sorted(missing_details.keys()):
        ch_list = sorted(missing_details[book])
        print(f"{book} ({len(ch_list)}): {ch_list}")

if __name__ == "__main__":
    check_ids()
