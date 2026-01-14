import os
import time
import random
import google_auth_oauthlib.flow
import googleapiclient.discovery
import googleapiclient.errors
from googleapiclient.http import MediaFileUpload

from google.oauth2.credentials import Credentials
from google.auth.transport.requests import Request
from google_auth_oauthlib.flow import InstalledAppFlow

# Configurations
CLIENT_SECRETS_FILE = os.path.join("secret", "client_secret.json")
TOKEN_FILE = os.path.join("secret", "token.json")
SCOPES = [
    "https://www.googleapis.com/auth/youtube.upload",
    "https://www.googleapis.com/auth/youtube"
]
API_SERVICE_NAME = "youtube"
API_VERSION = "v3"

def get_authenticated_service():
    creds = None
    if os.path.exists(TOKEN_FILE):
        creds = Credentials.from_authorized_user_file(TOKEN_FILE, SCOPES)
    
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                CLIENT_SECRETS_FILE, SCOPES)
            creds = flow.run_local_server(port=0)
        
        with open(TOKEN_FILE, 'w') as token:
            token.write(creds.to_json())
            
    return googleapiclient.discovery.build(
        API_SERVICE_NAME, API_VERSION, credentials=creds)

def upload_video(file_path, title, description, tags=None, privacy="public"):
    if not os.path.exists(file_path):
        print(f"Error: {file_path} not found.")
        return

    youtube = get_authenticated_service()
    
    body = dict(
        snippet=dict(
            title=title,
            description=description,
            tags=tags or [],
            categoryId="22"
        ),
        status=dict(
            privacyStatus=privacy
        )
    )

    insert_request = youtube.videos().insert(
        part=",".join(body.keys()),
        body=body,
        media_body=MediaFileUpload(file_path, chunksize=-1, resumable=True)
    )

    return resumable_upload(insert_request)

def resumable_upload(insert_request):
    response = None
    error = None
    retry = 0
    while response is None:
        try:
            print("Uploading file...")
            status, response = insert_request.next_chunk()
            if response is not None:
                if 'id' in response:
                    print(f"Video id '{response['id']}' was successfully uploaded.")
                    return response['id']
                else:
                    exit(f"The upload failed with an unexpected response: {response}")
        except googleapiclient.errors.HttpError as e:
            if e.resp.status in [500, 502, 503, 504]:
                error = f"A retriable HTTP error {e.resp.status} occurred:\n{e.content}"
            else:
                raise
        except Exception as e:
            error = f"A retriable error occurred: {e}"

        if error is not None:
            print(error)
            retry += 1
            if retry > 10:
                exit("No longer attempting to retry.")
            max_sleep = 2 ** retry
            sleep_seconds = random.random() * max_sleep
            print(f"Sleeping {sleep_seconds} seconds and then retrying...")
            time.sleep(sleep_seconds)

def process_pending_uploads():
    import json
    
    history_file = "video_history.json"
    if not os.path.exists(history_file):
        print(f"Error: {history_file} not found.")
        return

    with open(history_file, 'r', encoding='utf-8') as f:
        history = json.load(f)

    print(f"Loaded {len(history)} videos from history.")

# Bible Book Order for sorting
BIBLE_ORDER = [
    "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy",
    "Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel",
    "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles",
    "Ezra", "Nehemiah", "Esther", "Job", "Psalms",
    "Proverbs", "Ecclesiastes", "Song of Solomon", "Isaiah",
    "Jeremiah", "Lamentations", "Ezekiel", "Daniel",
    "Hosea", "Joel", "Amos", "Obadiah", "Jonah",
    "Micah", "Nahum", "Habakkuk", "Zephaniah", "Haggai",
    "Zechariah", "Malachi", "Matthew", "Mark", "Luke",
    "John", "Acts", "Romans", "1 Corinthians",
    "2 Corinthians", "Galatians", "Ephesians", "Philippians",
    "Colossians", "1 Thessalonians", "2 Thessalonians",
    "1 Timothy", "2 Timothy", "Titus", "Philemon",
    "Hebrews", "James", "1 Peter", "2 Peter",
    "1 John", "2 John", "3 John", "Jude", "Revelation"
]

def get_bible_sort_key(video):
    book = video.get('book')
    chapter = video.get('chapter')
    try:
        book_index = BIBLE_ORDER.index(book)
    except ValueError:
        book_index = 999
    return (book_index, chapter)

def process_pending_uploads():
    import json
    
    history_file = "video_history.json"
    if not os.path.exists(history_file):
        print(f"Error: {history_file} not found.")
        return

    with open(history_file, 'r', encoding='utf-8') as f:
        history = json.load(f)

    print(f"Loaded {len(history)} videos from history.")

    # Filter and Sort pending videos
    pending_videos = [v for v in history if not v.get('uploaded', False)]
    pending_videos.sort(key=get_bible_sort_key)
    
    print(f"Found {len(pending_videos)} pending uploads (Sorted by Bible Order).")

    for video in pending_videos:
        file_name = video.get('file_name')
        print(f"Processing pending upload: {file_name}")
            
        # Construct file path
        file_path = os.path.join("movies", file_name)
            
        # Construct Title and Description
        book = video.get('book')
        chapter = video.get('chapter')
        title = f"{book} Chapter {chapter} (NIRV)"
        description = f"{book} Chapter {chapter} reading from the New International Reader's Version (NIRV) Bible."
        
        print(f"Starting upload for: {title}")
        try:
            video_id = upload_video(file_path, title, description)
            
            # Update history immediately after success
            video['uploaded'] = True
            if video_id:
                video['video_id'] = video_id
                
            with open(history_file, 'w', encoding='utf-8') as f:
                json.dump(history, f, indent=2)
            print(f"Successfully uploaded and updated history for: {file_name}")
            
        except Exception as e:
            print(f"Failed to upload {file_name}: {e}")
            
            # Check for Quota or Limit Error
            error_str = str(e)
            if "quotaExceeded" in error_str or "uploadLimitExceeded" in error_str or "403" in error_str:
                print("QUOTA/LIMIT ERROR DETECTED. Stopping uploads.")
                exit("Quota/Limit Exceeded")
            
            pass

def sync_history_with_movies():
    import json
    from datetime import datetime
    
    history_file = "video_history.json"
    movies_dir = "movies"
    
    if not os.path.exists(movies_dir):
        print(f"Error: {movies_dir} not found.")
        return

    # Load existing history
    if os.path.exists(history_file):
        with open(history_file, 'r', encoding='utf-8') as f:
            try:
                history = json.load(f)
            except json.JSONDecodeError:
                history = []
    else:
        history = []
        
    existing_files = {item.get('file_name') for item in history}
    
    # helper to get file size in MB
    def get_size_mb(path):
        return round(os.path.getsize(path) / (1024 * 1024), 2)

    new_entries = []
    
    # Scan movies directory
    for f in os.listdir(movies_dir):
        if f.endswith(".mp4") and f not in existing_files:
            # Parse filename
            # Expected format: Book_Chapter_Num.mp4 or similar containing "_Chapter_"
            if "_Chapter_" in f:
                parts = f.split("_Chapter_")
                book_part = parts[0].replace("_", " ") # e.g. "1_Kings" -> "1 Kings"
                try:
                    chapter_part = parts[1].replace(".mp4", "")
                    chapter_num = int(chapter_part)
                    
                    full_path = os.path.join(movies_dir, f)
                    
                    new_entry = {
                        "book": book_part,
                        "chapter": chapter_num,
                        "file_name": f,
                        "size_mb": get_size_mb(full_path),
                        "created_at": datetime.now().isoformat(),
                        "uploaded": False
                    }
                    new_entries.append(new_entry)
                    print(f"Adding new video to history: {f}")
                except ValueError:
                    print(f"Skipping file with unexpected format (chapter not int): {f}")
            else:
                print(f"Skipping file not matching format: {f}")

    if new_entries:
        history.extend(new_entries)
        # Sort history by book and chapter could be nice, but simple append is enough for now.
        # Maybe sorting makes it easier to track? 
        # But existing history might rely on order? Not strictly.
        
        with open(history_file, 'w', encoding='utf-8') as f:
            json.dump(history, f, indent=2)
        print(f"Added {len(new_entries)} new videos to {history_file}.")
    else:
        print("No new videos found in movies folder.")

if __name__ == '__main__':
    if not os.path.exists(CLIENT_SECRETS_FILE):
        print(f"Error: {CLIENT_SECRETS_FILE} not found.")
        exit(1)
    
    sync_history_with_movies()
    process_pending_uploads()
