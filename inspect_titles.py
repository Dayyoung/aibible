
import logging
from manage_playlists import get_authenticated_service

logging.basicConfig(level=logging.INFO)

def inspect_channel():
    youtube = get_authenticated_service()
    
    try:
        # Get Uploads Playlist ID
        channels_response = youtube.channels().list(
            mine=True,
            part="contentDetails"
        ).execute()
        
        uploads_playlist_id = channels_response["items"][0]["contentDetails"]["relatedPlaylists"]["uploads"]
        
        # Fetch first few videos
        request = youtube.playlistItems().list(
            part="snippet",
            playlistId=uploads_playlist_id,
            maxResults=50
        )
        response = request.execute()
        
        print("Recent 50 videos on channel:")
        for item in response.get("items", []):
            print(f"- {item['snippet']['title']}")
            
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    inspect_channel()
