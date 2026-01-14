import os
import json
import time
import random
import logging
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from upload_youtube import get_authenticated_service

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

HISTORY_FILE = "video_history.json"

# Bible Book Order for sorting (Reuse from upload_youtube if needed, or just sort by chapter)
# Since we group by book, we just need to sort chapters within a book.

def get_playlists(youtube):
    """Retrieves all playlists on the channel."""
    playlists = {}
    next_page_token = None
    
    try:
        while True:
            request = youtube.playlists().list(
                part="snippet,id",
                mine=True,
                maxResults=50,
                pageToken=next_page_token
            )
            response = request.execute()
            
            for item in response.get("items", []):
                title = item["snippet"]["title"]
                playlists[title] = item["id"]
            
            next_page_token = response.get("nextPageToken")
            if not next_page_token:
                break
                
        return playlists
    except HttpError as e:
        logging.error(f"Error fetching playlists: {e}")
        check_quota_error(e)
        return {}

def create_playlist(youtube, title, description):
    """Creates a new playlist."""
    try:
        request = youtube.playlists().insert(
            part="snippet,status",
            body={
                "snippet": {
                    "title": title,
                    "description": description
                },
                "status": {
                    "privacyStatus": "public" # or unlisted/private
                }
            }
        )
        response = request.execute()
        logging.info(f"Created playlist: {title}")
        return response["id"]
    except HttpError as e:
        logging.error(f"Error creating playlist {title}: {e}")
        check_quota_error(e)
        return None

def get_playlist_items(youtube, playlist_id):
    """Retrieves all video IDs in a playlist."""
    video_ids = set()
    next_page_token = None
    
    try:
        while True:
            request = youtube.playlistItems().list(
                part="snippet,contentDetails",
                playlistId=playlist_id,
                maxResults=50,
                pageToken=next_page_token
            )
            response = request.execute()
            
            for item in response.get("items", []):
                vid = item["contentDetails"]["videoId"]
                video_ids.add(vid)
            
            next_page_token = response.get("nextPageToken")
            if not next_page_token:
                break
                
        return video_ids
    except HttpError as e:
        logging.error(f"Error fetching playlist items for {playlist_id}: {e}")
        check_quota_error(e)
        return set()

def add_video_to_playlist(youtube, playlist_id, video_id):
    """Adds a video to a playlist."""
    try:
        request = youtube.playlistItems().insert(
            part="snippet",
            body={
                "snippet": {
                    "playlistId": playlist_id,
                    "resourceId": {
                        "kind": "youtube#video",
                        "videoId": video_id
                    }
                }
            }
        )
        request.execute()
        logging.info(f"Added video {video_id} to playlist {playlist_id}")
        return True
    except HttpError as e:
        logging.error(f"Error adding video {video_id} to playlist {playlist_id}: {e}")
        check_quota_error(e)
        return False

def check_quota_error(e):
    """Checks for quota errors and exits if found."""
    error_str = str(e)
    if "quotaExceeded" in error_str or "uploadLimitExceeded" in error_str or "403" in error_str:
        logging.critical("QUOTA/LIMIT ERROR DETECTED. Stopping script.")
        exit("Quota/Limit Exceeded")

def fetch_all_channel_videos(youtube):
    """Fetches all videos from the channel to map Title -> Video ID."""
    video_map = {}
    logging.info("Fetching all channel videos to sync IDs...")
    
    try:
        # 1. Get Uploads Playlist ID
        channels_response = youtube.channels().list(
            mine=True,
            part="contentDetails"
        ).execute()
        
        uploads_playlist_id = channels_response["items"][0]["contentDetails"]["relatedPlaylists"]["uploads"]
        
        # 2. Fetch all videos from Uploads playlist
        next_page_token = None
        while True:
            request = youtube.playlistItems().list(
                part="snippet",
                playlistId=uploads_playlist_id,
                maxResults=50,
                pageToken=next_page_token
            )
            response = request.execute()
            
            for item in response.get("items", []):
                title = item["snippet"]["title"]
                video_id = item["snippet"]["resourceId"]["videoId"]
                video_map[title] = video_id
            
            next_page_token = response.get("nextPageToken")
            if not next_page_token:
                break
                
        logging.info(f"Fetched {len(video_map)} videos from channel.")
        return video_map
        
    except HttpError as e:
        logging.error(f"Error fetching channel videos: {e}")
        check_quota_error(e)
        return {}

def load_history():
    if not os.path.exists(HISTORY_FILE):
        return []
    with open(HISTORY_FILE, 'r', encoding='utf-8') as f:
        return json.load(f)

def run_playlist_manager():
    logging.info("Starting Playlist Manager...")
    youtube = get_authenticated_service()
    
    # 0. Sync History with Channel Videos (Backfill Video IDs)
    history = load_history()
    channel_videos = fetch_all_channel_videos(youtube)
    
    updated_history = False
    for video in history:
        if video.get('uploaded') and not video.get('video_id'):
            # Construct Title to match
            book = video.get('book')
            chapter = video.get('chapter')
            title = f"{book} Chapter {chapter} (NIRV)"
            
            if title in channel_videos:
                video['video_id'] = channel_videos[title]
                logging.info(f"Matched Video ID for {title}: {video['video_id']}")
                updated_history = True
            else:
                # logging.warning(f"Could not find video on channel: {title}")
                pass
    
    if updated_history:
        logging.info("Updating video_history.json with found Video IDs...")
        with open(HISTORY_FILE, 'w', encoding='utf-8') as f:
            json.dump(history, f, indent=2)
    
    # 1. Get existing playlists
    logging.info("Fetching existing playlists...")
    existing_playlists = get_playlists(youtube)
    logging.info(f"Found {len(existing_playlists)} playlists.")
    
    # 2. Load uploaded videos from history (now with IDs)
    uploaded_videos = [v for v in history if v.get('uploaded') and v.get('video_id')]
    
    # 3. Group by Book
    videos_by_book = {}
    for vid in uploaded_videos:
        book = vid.get('book')
        if book not in videos_by_book:
            videos_by_book[book] = []
        videos_by_book[book].append(vid)
        
    # Sort videos in each book by chapter
    for book in videos_by_book:
        videos_by_book[book].sort(key=lambda x: x.get('chapter'))

    # 4. Process each book
    for book, videos in videos_by_book.items():
        logging.info(f"Processing Book: {book} ({len(videos)} videos)")
        
        # Get or Create Playlist
        playlist_title = f"{book} (Bible Reading)" # Standardized Title
        playlist_id = existing_playlists.get(playlist_title)
        
        # Checking flexible match if standardized not found
        if not playlist_id:
             for title, pid in existing_playlists.items():
                 if book in title and "Bible" in title:
                     playlist_id = pid
                     break

        if not playlist_id:
            logging.info(f"Playlist for {book} not found. Creating...")
            desc = f"Audio bible reading of the book of {book} (NIRV)."
            playlist_id = create_playlist(youtube, playlist_title, desc)
            if playlist_id:
                existing_playlists[playlist_title] = playlist_id # Cache it
                time.sleep(2) # Avoid aggressive creation
            else:
                logging.error(f"Failed to create playlist for {book}. Skipping.")
                continue
        else:
            logging.info(f"Found playlist: {book} -> ID: {playlist_id}")

        # Get existing items in playlist to avoid duplicates
        existing_video_ids = get_playlist_items(youtube, playlist_id)
        
        # Add new videos
        for vid in videos:
            video_id = vid.get('video_id')
            if video_id not in existing_video_ids:
                success = add_video_to_playlist(youtube, playlist_id, video_id)
                if success:
                    time.sleep(1.5) # Rate limit friendly
            else:
                # logging.info(f"Video {video_id} already in playlist.")
                pass

    logging.info("Playlist management completed.")

if __name__ == '__main__':
    run_playlist_manager()
