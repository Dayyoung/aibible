import os
import json
import time
import re
from playwright.sync_api import sync_playwright
from gtts import gTTS
from moviepy import *

# Configuration
BASE_URL = "http://localhost:8080"
OUTPUT_DIR = "video_assets"
MOVIES_DIR = "movies"
JSON_PATH = "json/en_kjv.json"

if not os.path.exists(MOVIES_DIR):
    os.makedirs(MOVIES_DIR)

def format_time(seconds):
    """Convert seconds to SRT time format HH:MM:SS,mmm"""
    millis = int((seconds - int(seconds)) * 1000)
    seconds = int(seconds)
    minutes, seconds = divmod(seconds, 60)
    hours, minutes = divmod(minutes, 60)
    return f"{hours:02}:{minutes:02}:{seconds:02},{millis:03}"

def load_bible_data():
    with open(JSON_PATH, 'r', encoding='utf-8-sig') as f:
        data = json.load(f)
    
    genesis = None
    for book in data:
        if book.get('abbrev') == 'gn':
            genesis = book
            break
            
    if not genesis:
        raise Exception("Genesis not found in JSON")
    
    return genesis

def get_chapter_verses(genesis_data, chapter_index):
    chapter = genesis_data['chapters'][chapter_index]
    cleaned_verses = []
    for v in chapter:
        if isinstance(v, str):
            v = v.replace("&#x27;", "'").replace("&quot;", '"')
            # 1. Remove { ... Heb. ... } blocks
            v = re.sub(r'\{[^}]*Heb\.[^}]*\}', '', v)
            # 2. Remove remaining { and }
            v = re.sub(r'\{|\}', '', v)
            # Trim extra spaces if any
            v = v.strip()
        cleaned_verses.append(v)
    return cleaned_verses

def process_chapter(chapter_num, verses):
    """Generates assets and video for a single chapter"""
    print(f"--- Generating Chapter {chapter_num} ---")
    
    assets = []
    
    if not os.path.exists(OUTPUT_DIR):
        os.makedirs(OUTPUT_DIR)
        
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={'width': 1920, 'height': 1080})
        
        print(f"Navigating to App for Chapter {chapter_num}...")
        page.goto(BASE_URL)
        page.wait_for_timeout(2000)

        print("Clicking through UI...")
        try:
            if page.locator("text=Open Bible").is_visible():
                page.click("text=Open Bible")
                page.wait_for_timeout(500)
            if page.locator("text=Old Testament").is_visible():
                page.click("text=Old Testament")
                page.wait_for_timeout(500)
            
            # Genesis
            # The button might be just an icon or box, but "Genesis" text should adhere
            page.click("text=Genesis")
            page.wait_for_timeout(1000)
            
            # Chapter Selection
            print(f"Selecting Chapter {chapter_num}...")
            # Use specific selector to find exact chapter number
            page.click(f"button:text-is('{chapter_num}')")
            page.wait_for_timeout(2000)
            
        except Exception as e:
            print(f"Navigation error: {e}")
            page.screenshot(path="video_assets/debug_nav.png")
            raise e

        for i, verse_text in enumerate(verses):
            print(f"Processing Verse {i+1}/{len(verses)}...")
            
            page.evaluate(f"""
                document.querySelectorAll('.verse-item').forEach(e => e.classList.remove('verse-highlight'));
                const el = document.getElementById('verse-{i}');
                if(el) {{
                    el.classList.add('verse-highlight');
                    el.scrollIntoView({{behavior: 'instant', block: 'center'}});
                }}
            """)
            page.wait_for_timeout(500)
            
            img_path = os.path.join(OUTPUT_DIR, f"verse_{i}.png")
            page.screenshot(path=img_path)
            
            audio_path = os.path.join(OUTPUT_DIR, f"verse_{i}.mp3")
            # Always remove old audio to ensure clean state
            if os.path.exists(audio_path):
                os.remove(audio_path)
            
            tts = gTTS(text=verse_text, lang='en', slow=False)
            tts.save(audio_path)
            
            assets.append({
                'image': img_path, 
                'audio': audio_path,
                'text': verse_text 
            })
            
        browser.close()

    # Create Video
    create_video_file(assets, chapter_num)

def create_video_file(assets, chapter_num):
    print(f"Combining video for Chapter {chapter_num}...")
    final_video_path = os.path.join(MOVIES_DIR, f"genesis_chapter_{chapter_num}.mp4")
    srt_path = os.path.join(MOVIES_DIR, f"genesis_chapter_{chapter_num}.srt")
    
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
    print(f"Saved: {os.path.abspath(final_video_path)}")
    
    with open(srt_path, 'w', encoding='utf-8') as f:
        f.write(srt_content)
    print(f"Saved: {os.path.abspath(srt_path)}")

def main():
    try:
        genesis_data = load_bible_data()
        
        # Process Chapter 6 only
        chapter_num = 6
        ch_idx = 5 # 0-indexed
        verses = get_chapter_verses(genesis_data, ch_idx)
        process_chapter(chapter_num, verses)
            
    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()
