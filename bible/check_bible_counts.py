import os
import json
import logging
from googleapiclient.discovery import build
from upload_youtube import get_authenticated_service

logging.basicConfig(level=logging.INFO)

BIBLE_BOOKS_CHAPTERS = {
    "Genesis": 50, "Exodus": 40, "Leviticus": 27, "Numbers": 36, "Deuteronomy": 34,
    "Joshua": 24, "Judges": 21, "Ruth": 4, "1 Samuel": 31, "2 Samuel": 24,
    "1 Kings": 22, "2 Kings": 25, "1 Chronicles": 29, "2 Chronicles": 36,
    "Ezra": 10, "Nehemiah": 13, "Esther": 10, "Job": 42, "Psalms": 150,
    "Proverbs": 31, "Ecclesiastes": 12, "Song of Solomon": 8, "Isaiah": 66,
    "Jeremiah": 52, "Lamentations": 5, "Ezekiel": 48, "Daniel": 12,
    "Hosea": 14, "Joel": 3, "Amos": 9, "Obadiah": 1, "Jonah": 4,
    "Micah": 7, "Nahum": 3, "Habakkuk": 3, "Zephaniah": 3, "Haggai": 2,
    "Zechariah": 14, "Malachi": 4, "Matthew": 28, "Mark": 16, "Luke": 24,
    "John": 21, "Acts": 28, "Romans": 16, "1 Corinthians": 16, "2 Corinthians": 13,
    "Galatians": 6, "Ephesians": 6, "Philippians": 4, "Colossians": 4,
    "1 Thessalonians": 5, "2 Thessalonians": 3, "1 Timothy": 6, "2 Timothy": 4,
    "Titus": 3, "Philemon": 1, "Hebrews": 13, "James": 5, "1 Peter": 5,
    "2 Peter": 3, "1 John": 5, "2 John": 1, "3 John": 1, "Jude": 1,
    "Revelation": 22
}

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

def check_bible_playlists():
    youtube = get_authenticated_service()
    
    playlists = []
    next_page_token = None
    
    while True:
        request = youtube.playlists().list(
            part="snippet,contentDetails",
            mine=True,
            maxResults=50,
            pageToken=next_page_token
        )
        response = request.execute()
        
        for item in response.get("items", []):
            title = item["snippet"]["title"]
            item_count = item["contentDetails"]["itemCount"]
            playlists.append({
                "title": title,
                "id": item["id"],
                "itemCount": item_count
            })
            
        next_page_token = response.get("nextPageToken")
        if not next_page_token:
            break
            
    print(f"\nChecking 66 Bible Book Playlists...\n")
    
    missing_books = []
    incorrect_counts = []
    correct_books = []
    
    for book in BIBLE_ORDER:
        expected_chapters = BIBLE_BOOKS_CHAPTERS[book]
        # Match playlist title (e.g. "Genesis (NIRV)")
        match = None
        for p in playlists:
            if p["title"].startswith(book + " (NIRV)"):
                match = p
                break
        
        if not match:
            # Try plain match
            for p in playlists:
                if p["title"] == book:
                    match = p
                    break
                    
        if match:
            if match["itemCount"] == expected_chapters:
                correct_books.append((book, match["itemCount"]))
            else:
                incorrect_counts.append({
                    "book": book,
                    "actual": match["itemCount"],
                    "expected": expected_chapters,
                    "id": match["id"]
                })
        else:
            missing_books.append(book)
            
    print(f"Correct: {len(correct_books)}/66")
    
    if missing_books:
        print(f"\nMissing Playlists ({len(missing_books)}):")
        for b in missing_books:
            print(f" - {b}")
            
    if incorrect_counts:
        print(f"\nIncorrect Chapter Counts ({len(incorrect_counts)}):")
        for ic in incorrect_counts:
            print(f" - {ic['book']}: {ic['actual']} (Expected: {ic['expected']})")

if __name__ == "__main__":
    check_bible_playlists()
