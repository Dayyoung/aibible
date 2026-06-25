
import logging
from manage_playlists import get_authenticated_service

logging.basicConfig(level=logging.INFO)

def search_genesis():
    youtube = get_authenticated_service()
    
    try:
        # Search for Genesis videos
        request = youtube.search().list(
            q="Genesis",
            part="snippet",
            type="video",
            forMine=True,
            maxResults=50
        )
        response = request.execute()
        
        print("Genesis search results on channel:")
        for item in response.get("items", []):
            print(f"- {item['snippet']['title']}")
            
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    search_genesis()
