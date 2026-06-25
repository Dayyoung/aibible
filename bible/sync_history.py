import json
import os
import re

HISTORY_FILE = "video_history.json"
SCRAPED_FILE = "all_youtube_videos.json"

def normalize_title(title):
    return re.sub(r'[^a-zA-Z0-9]', '', title).lower()

def sync():
    if not os.path.exists(HISTORY_FILE):
        print(f"Error: {HISTORY_FILE} not found.")
        return
    
    if not os.path.exists(SCRAPED_FILE):
        print(f"Error: {SCRAPED_FILE} not found. Run scraper first.")
        return

    with open(HISTORY_FILE, 'r', encoding='utf-8') as f:
        history = json.load(f)
    
    with open(SCRAPED_FILE, 'r', encoding='utf-8') as f:
        scraped = json.load(f)

    # Map titles and IDs from scraped data
    # We want to extract video ID from URL: https://www.youtube.com/watch?v=XXXX
    title_to_id = {}
    for item in scraped:
        title = item['title']
        url = item['url']
        video_id = None
        if 'v=' in url:
            video_id = url.split('v=')[1].split('&')[0]
        elif 'youtu.be/' in url:
            video_id = url.split('youtu.be/')[1].split('?')[0]
        
        if video_id:
            title_to_id[title] = video_id

    # Deduplicate history
    # Keep the entry with video_id, then latest created_at
    unique_history = {}
    duplicates_removed = 0
    for entry in history:
        key = (entry['book'], entry['chapter'])
        if key not in unique_history:
            unique_history[key] = entry
        else:
            existing = unique_history[key]
            # Replace if existing has no ID but new one does
            if not existing.get('video_id') and entry.get('video_id'):
                unique_history[key] = entry
                duplicates_removed += 1
            # Or if both have/don't have ID, keep the one marked uploaded
            elif not existing.get('uploaded') and entry.get('uploaded'):
                unique_history[key] = entry
                duplicates_removed += 1
            else:
                duplicates_removed += 1
    
    new_history = list(unique_history.values())
    print(f"Removed {duplicates_removed} duplicates from history.")

    # Match IDs
    matched_count = 0
    for entry in new_history:
        if entry.get('uploaded') and not entry.get('video_id'):
            book = entry['book']
            chapter = entry['chapter']
            
            # Possible formats
            formats = [
                f"{book} Chapter {chapter} (NIRV)",
                f"AI Bible - {book} {chapter}",
                f"{book} {chapter}",
                f"AI Bible - {book} Chapter {chapter}",
                f"{book} Chapter {chapter}"
            ]
            
            for fmt in formats:
                if fmt in title_to_id:
                    entry['video_id'] = title_to_id[fmt]
                    matched_count += 1
                    break
            
            # If still not matched, try fuzzy match (case insensitive, remove spaces)
            if not entry.get('video_id'):
                norm_book = normalize_title(book)
                for sc_title, sc_id in title_to_id.items():
                    norm_sc = normalize_title(sc_title)
                    # Check if book and chapter are in title
                    if norm_book in norm_sc and str(chapter) in sc_title:
                        # Extra check: make sure chapter is matched exactly (not 1 in 10)
                        if re.search(rf'\b{chapter}\b', sc_title):
                            entry['video_id'] = sc_id
                            matched_count += 1
                            break

    print(f"Matched {matched_count} missing video IDs.")

    # Save history
    with open(HISTORY_FILE, 'w', encoding='utf-8') as f:
        json.dump(new_history, f, indent=2, ensure_ascii=False)
    
    print(f"Updated {HISTORY_FILE} successfully.")

if __name__ == "__main__":
    sync()
