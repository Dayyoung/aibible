import json
import re

def normalize_title(title):
    # Formats seen:
    # "1 Kings Chapter 9 (NIRV)"
    # "AI Bible - Genesis 1"
    # "AI Bible - Leviticus 12"
    
    # Remove "(NIRV)"
    title = title.replace("(NIRV)", "").strip()
    
    # Remove "AI Bible - " prefix
    if title.startswith("AI Bible - "):
        title = title[len("AI Bible - "):].strip()
        
    # Now we should have "<Book> <Chapter>" or "<Book> Chapter <Chapter>"
    # Example: "Genesis 1", "Leviticus 12", "1 Kings Chapter 9"
    
    # regex to extract book and chapter
    # Case 1: "1 Kings Chapter 9"
    match = re.match(r"(.+?)\s+Chapter\s+(\d+)", title, re.IGNORECASE)
    if match:
        return match.group(1).title(), int(match.group(2))
        
    # Case 2: "Genesis 1"
    match = re.match(r"(.+?)\s+(\d+)$", title)
    if match:
        return match.group(1).title(), int(match.group(2))
        
    return title, None
    

def load_local_history(filepath):
    with open(filepath, 'r') as f:
        data = json.load(f)
    
    # return dict: (book, chapter) -> entry
    history = {}
    for entry in data:
        key = (entry['book'], entry['chapter'])
        history[key] = entry
    return history

def load_youtube_titles(filepath):
    with open(filepath, 'r') as f:
        titles = json.load(f)
    
    youtube_videos = set()
    for t in titles:
        book, chapter = normalize_title(t)
        if chapter is not None:
             # Normalize book name specifically? 
             # "1 Kings" vs "1Kings"? formatting seems consistent in json "1 Kings"
             youtube_videos.add((book, chapter))
    return youtube_videos

def main():
    history_file = 'video_history.json'
    youtube_file = 'youtube_titles_scraped.json'
    
    history = load_local_history(history_file)
    youtube = load_youtube_titles(youtube_file)
    
    # 1. Check if everything marked 'uploaded: true' in history is in youtube
    missing_on_youtube = []
    for key, entry in history.items():
        if entry.get('uploaded') == True:
            if key not in youtube:
                # Try simple normalization adjustments if strict match fails?
                # e.g., "1 Kings"
                missing_on_youtube.append(entry)
    
    # 2. Check if things in youtube are not marked uploaded in history
    unmarked_in_history = []
    for key in youtube:
        if key not in history:
            # Maybe book name mismatch?
            pass
        elif history[key].get('uploaded') != True:
            unmarked_in_history.append(history[key])

    print(f"Total History Entries: {len(history)}")
    print(f"Total YouTube Scraped: {len(youtube)}")
    
    print("\n--- Videos marked as Uploaded but NOT found on YouTube ---")
    if missing_on_youtube:
        for entry in missing_on_youtube:
            print(f"{entry['book']} Chapter {entry['chapter']}")
    else:
        print("None. All marked uploads are verified present.")

    print("\n--- Videos found on YouTube but NOT marked as Uploaded in History ---")
    if unmarked_in_history:
        for entry in unmarked_in_history:
            print(f"{entry['book']} Chapter {entry['chapter']}")
    else:
        print("None. All YouTube likely accounted for.")
        
if __name__ == "__main__":
    main()
