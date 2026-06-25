import os
import json
import time
import logging
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from upload_youtube import get_authenticated_service

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

HISTORY_FILE = "video_history.json"

def fix_titles():
    logging.info("Starting title correction process...")
    youtube = get_authenticated_service()
    
    if not os.path.exists(HISTORY_FILE):
        logging.error(f"{HISTORY_FILE} not found.")
        return

    with open(HISTORY_FILE, 'r', encoding='utf-8') as f:
        history = json.load(f)
    
    # Target books and chapter ranges based on previous analysis
    targets = {
        "Genesis": range(1, 51),
        "Exodus": range(1, 41),
        "Leviticus": range(1, 13)
    }
    
    total_to_fix = 102
    fixed_count = 0
    
    for entry in history:
        book = entry.get('book')
        chapter = entry.get('chapter')
        video_id = entry.get('video_id')
        
        if book in targets and chapter in targets[book] and entry.get('uploaded') and video_id:
            target_title = f"{book} Chapter {chapter} (NIRV)"
            
            try:
                # 1. Fetch current snippet to preserve other metadata (description, tags, etc.)
                request = youtube.videos().list(
                    part="snippet",
                    id=video_id
                )
                response = request.execute()
                
                if not response.get("items"):
                    logging.warning(f"Video {video_id} not found on YouTube. Skipping.")
                    continue
                    
                video_data = response["items"][0]
                snippet = video_data["snippet"]
                current_title = snippet.get("title")
                
                if current_title == target_title:
                    logging.info(f"[{book} {chapter}] Already updated: {current_title}")
                    continue
                
                logging.info(f"[{book} {chapter}] Updating title: '{current_title}' -> '{target_title}'")
                
                # 2. Prepare update body
                snippet["title"] = target_title
                
                update_request = youtube.videos().update(
                    part="snippet",
                    body={
                        "id": video_id,
                        "snippet": snippet
                    }
                )
                update_request.execute()
                
                fixed_count += 1
                logging.info(f"Successfully updated {fixed_count}/{total_to_fix}")
                
                # Sleep briefly to be respectful
                time.sleep(1)
                
            except HttpError as e:
                error_str = str(e)
                if "quotaExceeded" in error_str or "403" in error_str:
                    logging.critical("QUOTA EXCEEDED. Stopping title correction.")
                    return
                logging.error(f"Error updating {book} {chapter} ({video_id}): {e}")
                
    logging.info(f"Title correction process finished. Total updated: {fixed_count}")

if __name__ == "__main__":
    fix_titles()
