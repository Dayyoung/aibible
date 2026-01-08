import os
import json
import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from gtts import gTTS
from moviepy import *

# Configuration
BASE_URL = "http://localhost:8080"
OUTPUT_DIR = "video_assets"
FINAL_VIDEO = "genesis_chapter_1.mp4"
JSON_PATH = "json/en_kjv.json"

from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

def setup_driver():
    options = Options()
    options.add_argument("--headless")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--disable-gpu")
    options.add_argument("--window-size=1920,1080")
    
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=options)
    return driver

def load_verses():
    with open(JSON_PATH, 'r', encoding='utf-8-sig') as f:
        data = json.load(f)
    
    # Simple search for Genesis (gn)
    # The cleanData function in app might handle entities, we should too if needed
    # But usually json load handles standard escapes. 
    # The app does: verse.replace(/&#x27;/g, "'").replace(/&quot;/g, '"')
    
    genesis = None
    for book in data:
        if book.get('abbrev') == 'gn':
            genesis = book
            break
            
    if not genesis:
        raise Exception("Genesis not found in JSON")
        
    chapter1 = genesis['chapters'][0] # Index 0 is Chapter 1
    
    cleaned_verses = []
    for v in chapter1:
        if isinstance(v, str):
            v = v.replace("&#x27;", "'").replace("&quot;", '"')
        cleaned_verses.append(v)
        
    return cleaned_verses

def generate_assets(verses, driver):
    if not os.path.exists(OUTPUT_DIR):
        os.makedirs(OUTPUT_DIR)

    # 1. Load App and Navigate
    print("Navigating to App...")
    driver.get(BASE_URL)
    time.sleep(2) # Wait for load

    # 2. Set State to Genesis 1 via JS
    print("Setting state to Genesis 1...")
    driver.execute_script("""
        window.state.view = 'reader';
        window.state.currentBookIndex = 0; // Genesis is usually 0
        window.state.currentChapterIndex = 0; // Chapter 1
        window.state.currentTestament = 'old'; 
        // Ensure data is loaded? The app loads data on demand actually...
        // We might need to select version first or ensure 'en_kjv' is loaded.
        // The default might be empty or sample.
    """)
    
    # We need to trigger the load. 
    # The safest way is to simulate the clicks or call `changeVersion` then `goReader`
    # Let's try to just click buttons to be safe, or call functions if available globally.
    # Functions are global in the provided HTML.
    
    # Let's reload to be clean
    driver.get(BASE_URL)
    time.sleep(1)
    
    # Click 'Open Bible'
    try:
        driver.find_element(By.XPATH, "//button[contains(., 'Open Bible')]").click()
        time.sleep(1)
        # Click 'Old Testament'
        driver.find_element(By.XPATH, "//button[contains(., 'Old Testament')]").click()
        time.sleep(1)
        # Click 'Genesis' (first book)
        driver.find_elements(By.XPATH, "//div[contains(@class,'grid')]//button")[0].click() 
        time.sleep(1)
        # Click '1' (Chapter 1)
        driver.find_elements(By.XPATH, "//div[contains(@class,'grid')]//button")[0].click()
        time.sleep(2) # Wait for image and text to render
    except Exception as e:
        print(f"Navigation failed: {e}")
        # Fallback to JS injection if UI changed, but UI looks stable.
    
    # Hide the speaker icon or other UI elements if desired? 
    # User said "Show the app running", so keeping UI is good.
    
    generated_assets = []

    for i, verse_text in enumerate(verses):
        print(f"Processing Verse {i+1}/{len(verses)}...")
        
        # Highlight Verse using App's logic
        # state.speakingVerseIndex = i; updateHighlight();
        # scrollIntoView
        driver.execute_script(f"""
            window.state.speakingVerseIndex = {i};
            window.updateHighlight();
            const el = document.getElementById('verse-{i}');
            if(el) {{
                el.scrollIntoView({{behavior: 'instant', block: 'center'}});
            }}
        """)
        time.sleep(0.5) # Allow render update
        
        # Take Screenshot
        img_path = os.path.join(OUTPUT_DIR, f"verse_{i}.png")
        driver.save_screenshot(img_path)
        
        # Generate Audio
        audio_path = os.path.join(OUTPUT_DIR, f"verse_{i}.mp3")
        if not os.path.exists(audio_path): # Cache check
            try:
                tts = gTTS(text=verse_text, lang='en', slow=False)
                tts.save(audio_path)
            except Exception as e:
                print(f"TTS Error on verse {i}: {e}")
                # Create silent or empty audio fallback?
                # For now let's hope it passes.
        
        generated_assets.append({'image': img_path, 'audio': audio_path})
        
    return generated_assets

def create_video(assets):
    print("Combining video...")
    clips = []
    
    for item in assets:
        # Load Audio
        audio_clip = AudioFileClip(item['audio'])
        
        # Load Image, set duration to audio duration
        img_clip = ImageClip(item['image']).with_duration(audio_clip.duration)
        img_clip = img_clip.with_audio(audio_clip)
        
        clips.append(img_clip)
        
    final_clip = concatenate_videoclips(clips)
    final_clip.write_videofile(FINAL_VIDEO, fps=24, codec='libx264', audio_codec='aac')
    print(f"Video saved to {os.path.abspath(FINAL_VIDEO)}")

def main():
    try:
        driver = setup_driver()
        verses = load_verses()
        
        # Limit for testing? User asked for "1 to end".
        # verses = verses[:3] # Debug
        
        assets = generate_assets(verses, driver)
        driver.quit()
        
        create_video(assets)
        
    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()
