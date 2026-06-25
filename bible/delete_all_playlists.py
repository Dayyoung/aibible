import os
import time
import logging
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from upload_youtube import get_authenticated_service

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

def delete_all_playlists():
    logging.info("Starting Playlist Deletion Task...")
    youtube = get_authenticated_service()
    
    deleted_count = 0
    items = None
    
    try:
        while True:
            # 1. Fetch current playlists (limit 50 per page)
            # We don't bother with pagination because as we delete, the "next page" becomes the current page
            request = youtube.playlists().list(
                part="snippet,id",
                mine=True,
                maxResults=50
            )
            response = request.execute()
            
            items = response.get("items", [])
            if not items:
                logging.info("No more playlists found to delete.")
                break
            
            for item in items:
                playlist_id = item["id"]
                playlist_title = item["snippet"]["title"]
                
                try:
                    logging.info(f"Deleting playlist: {playlist_title} ({playlist_id})")
                    youtube.playlists().delete(id=playlist_id).execute()
                    deleted_count += 1
                    time.sleep(0.5) # Slight delay to avoid aggressive rate limiting (not quota)
                except HttpError as e:
                    if e.resp.status == 403:
                        logging.error(f"Quota exceeded or Permission denied while deleting {playlist_title}: {e}")
                        return
                    else:
                        logging.error(f"Error deleting {playlist_title}: {e}")
            
    except HttpError as e:
        logging.error(f"General error: {e}")

    if items is not None and not items: # Loop exited normally because no more playlists were found
        with open(".playlists_deleted", "w") as f:
            f.write(f"Deleted at {time.ctime()}")
        logging.info("All playlists deleted. Flag file '.playlists_deleted' created.")

    logging.info(f"Finished. Total deleted: {deleted_count}")

if __name__ == "__main__":
    delete_all_playlists()
