import os
import json
import logging
from googleapiclient.discovery import build
from upload_youtube import get_authenticated_service

logging.basicConfig(level=logging.INFO)

def list_psalms_playlists():
    youtube = get_authenticated_service()
    next_page_token = None
    psalms_playlists = []
    
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
            if "Psalms" in title or "시편" in title:
                psalms_playlists.append({
                    "title": title,
                    "id": item["id"]
                })
        
        next_page_token = response.get("nextPageToken")
        if not next_page_token:
            break
            
    print(f"Found {len(psalms_playlists)} Psalms-related playlists:")
    for p in psalms_playlists:
        print(f" - {p['title']} (ID: {p['id']})")

if __name__ == "__main__":
    list_psalms_playlists()
