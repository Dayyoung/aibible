import os
import json
import time
import re
from playwright.sync_api import sync_playwright
# from gtts import gTTS # Removed for Edge TTS
import subprocess # Added for Edge TTS
from moviepy import *
from datetime import datetime

# Configuration
BASE_URL = "http://localhost:8080"
OUTPUT_DIR = "video_assets"
MOVIES_DIR = "movies"
JSON_PATH = "json/en_kjv.json"

if not os.path.exists(MOVIES_DIR):
    os.makedirs(MOVIES_DIR)

# Bible Names Mapping
BIBLE_NAMES = {
    "gn": "Genesis", "ex": "Exodus", "lv": "Leviticus", "nm": "Numbers", "dt": "Deuteronomy",
    "js": "Joshua", "jud": "Judges", "rt": "Ruth", "1sm": "1 Samuel", "2sm": "2 Samuel",
    "1kgs": "1 Kings", "2kgs": "2 Kings", "1ch": "1 Chronicles", "2ch": "2 Chronicles",
    "ezr": "Ezra", "ne": "Nehemiah", "et": "Esther", "job": "Job", "ps": "Psalms",
    "prv": "Proverbs", "ec": "Ecclesiastes", "so": "Song of Solomon", "is": "Isaiah", "jr": "Jeremiah",
    "lm": "Lamentations", "ez": "Ezekiel", "dn": "Daniel", "ho": "Hosea", "jl": "Joel",
    "am": "Amos", "ob": "Obadiah", "jn": "Jonah", "mi": "Micah", "na": "Nahum",
    "hk": "Habakkuk", "zp": "Zephaniah", "hg": "Haggai", "zc": "Zechariah", "ml": "Malachi",
    "mt": "Matthew", "mk": "Mark", "lk": "Luke", "jo": "John",
    "act": "Acts", "rm": "Romans", "1co": "1 Corinthians", "2co": "2 Corinthians",
    "gl": "Galatians", "eph": "Ephesians", "ph": "Philippians", "cl": "Colossians",
    "1ts": "1 Thessalonians", "2ts": "2 Thessalonians", "1tm": "1 Timothy",
    "2tm": "2 Timothy", "tt": "Titus", "phm": "Philemon", "hb": "Hebrews",
    "jm": "James", "1pe": "1 Peter", "2pe": "2 Peter", "1jo": "1 John",
    "2jo": "2 John", "3jo": "3 John", "jd": "Jude", "re": "Revelation"
}

def format_time(seconds):
    millis = int((seconds - int(seconds)) * 1000)
    seconds = int(seconds)
    minutes, seconds = divmod(seconds, 60)
    hours, minutes = divmod(minutes, 60)
    return f"{hours:02}:{minutes:02}:{seconds:02},{millis:03}"

def load_bible_data():
    with open(JSON_PATH, 'r', encoding='utf-8-sig') as f:
        data = json.load(f)
    return data

def clean_verse_text(text):
    if isinstance(text, str):
        text = text.replace("&#x27;", "'").replace("&quot;", '"')
        text = re.sub(r'\{[^}]*Heb\.[^}]*\}', '', text)
        text = re.sub(r'\{|\}', '', text)
        text = text.strip()
    return text

def process_chapter_video(book_idx, book_abbrev, book_name, chapter_idx, verses):
    chapter_num = chapter_idx + 1
    safe_book_name = book_name.replace(" ", "_")
    
    final_video_name = f"{safe_book_name}_Chapter_{chapter_num}.mp4"
    final_video_path = os.path.join(MOVIES_DIR, final_video_name)
    srt_path = os.path.join(MOVIES_DIR, f"{safe_book_name}_Chapter_{chapter_num}.srt")
    
    # Check if exists
    if os.path.exists(final_video_path):
        print(f"Skipping {final_video_name} (Exists)")
        return final_video_path, True # Path, Skipped

    print(f"--- Generating {book_name} Chapter {chapter_num} ---")
    
    assets = []
    if not os.path.exists(OUTPUT_DIR):
        os.makedirs(OUTPUT_DIR)
        
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={'width': 1920, 'height': 1080})
        
        page.goto(BASE_URL)
        page.wait_for_timeout(2000)

        # State Injection for Navigation
        print(f"Navigating to {book_name} {chapter_num}...")
        testament = 'old' if book_idx < 39 else 'new'
        
        page.evaluate(f"""
            window.state.view = 'reader';
            window.state.currentBookIndex = {book_idx};
            window.state.currentChapterIndex = {chapter_idx};
            window.state.currentTestament = '{testament}';
            window.state.uiLang = 'en';
            render();
            // Force image update
            tryUpdateImage(window.state.bibleData[{book_idx}], {chapter_idx}, 0);
        """)
        page.wait_for_timeout(3000) # Wait for render and image load

        for i, verse_text in enumerate(verses):
            print(f"Processing Verse {i+1}/{len(verses)}...")
            cleaned_text = clean_verse_text(verse_text)
            
            page.evaluate(f"""
                document.querySelectorAll('.verse-item').forEach(e => e.classList.remove('verse-highlight'));
                const el = document.getElementById('verse-{i}');
                if(el) {{
                    el.classList.add('verse-highlight');
                    el.scrollIntoView({{behavior: 'instant', block: 'center'}});
                }}
            """)
            page.wait_for_timeout(500)
            
            img_path = os.path.join(OUTPUT_DIR, f"v{i}.png")
            page.screenshot(path=img_path)
            
            audio_path = os.path.join(OUTPUT_DIR, f"v{i}.mp3")
            if os.path.exists(audio_path): os.remove(audio_path)
            
            # Edge TTS via subprocess
            # Voice: en-US-ChristopherNeural (Male) or en-US-AriaNeural (Female)
            edge_tts_cmd = [
                "/Users/dayyoung/Library/Python/3.9/bin/edge-tts",
                "--text", cleaned_text,
                "--write-media", audio_path,
                "--voice", "en-US-ChristopherNeural"
            ]
            
            try:
                import subprocess
                subprocess.run(edge_tts_cmd, check=True)
            except Exception as e:
                print(f"Edge TTS Error: {e}")
                # Fallback or retry? usually reliable.
                pass

            assets.append({
                'image': img_path, 
                'audio': audio_path,
                'text': cleaned_text 
            })

            # Rate limit protection (Edge TTS is lenient but good to have small delay)
            time.sleep(0.5) 
            
        browser.close()

    # Combine Video
    print(f"Combining video for {book_name} {chapter_num}...")
    clips = []
    srt_content = ""
    current_time = 0.0
    
    for i, item in enumerate(assets):
        audio_clip = AudioFileClip(item['audio'])
        duration = audio_clip.duration
        
        img_clip = ImageClip(item['image']).with_duration(duration)
        img_clip = img_clip.with_audio(audio_clip)
        clips.append(img_clip)
        
        start_fmt = format_time(current_time)
        end_fmt = format_time(current_time + duration)
        
        srt_content += f"{i+1}\n"
        srt_content += f"{start_fmt} --> {end_fmt}\n"
        srt_content += f"{item['text']}\n\n"
        
        current_time += duration
        
    final_clip = concatenate_videoclips(clips)
    final_clip.write_videofile(final_video_path, fps=24, codec='libx264', audio_codec='aac')
    
    with open(srt_path, 'w', encoding='utf-8') as f:
        f.write(srt_content)
        
    return final_video_path, False

def update_history(book, chapter, file_path):
    history_file = 'video_history.json'
    try:
        if os.path.exists(history_file):
            with open(history_file, 'r') as f:
                history = json.load(f)
        else:
            history = []
    except json.JSONDecodeError:
        history = []
        
    file_name = os.path.basename(file_path)
    file_size_mb = os.path.getsize(file_path) / (1024 * 1024)
    
    entry = {
        "book": book,
        "chapter": chapter,
        "file_name": file_name,
        "size_mb": round(file_size_mb, 2),
        "created_at": datetime.now().isoformat(),
        "uploaded": False
    }
    
    history.append(entry)
    
    with open(history_file, 'w') as f:
        json.dump(history, f, indent=2)
    print(f"Added {file_name} to history.")

def main():
    try:
        from upload_youtube import upload_video
    except ImportError:
        print("Upload module not found.")
        upload_video = None

    bible_data = load_bible_data()
    
    # Process from 1 Kings (index 10) to End
    start_index = 0 
    
    for book_idx in range(start_index, len(bible_data)):
        book = bible_data[book_idx]
        abbrev = book['abbrev']
        book_name = BIBLE_NAMES.get(abbrev, abbrev)
        chapters = book['chapters']
        
        print(f"\n========== Processing Book: {book_name} ({len(chapters)} Chapters) ==========")
        
        for chapter_idx, verses in enumerate(chapters):
            while True:  # Retry loop for the chapter
                try:
                    # verses is a list of strings
                    video_path, skipped = process_chapter_video(book_idx, abbrev, book_name, chapter_idx, verses)
                    
                    if not skipped:
                        update_history(book_name, chapter_idx + 1, video_path)
                        print("Chapter done. Sleeping 10s...")
                        time.sleep(10)
                    
                    break # Success, move to next chapter
                                
                except Exception as e:
                    print(f"Critical Error processing {book_name} Ch {chapter_idx+1}: {e}")
                    # import traceback
                    # traceback.print_exc()
                    
                    # On critical error (likely TTS), wait effectively and retry SAME chapter
                    print("Waiting 5 minutes before retrying same chapter...")
                    time.sleep(300)

if __name__ == "__main__":
    main()
