import os
import time
from playwright.sync_api import sync_playwright

USER_DATA_DIR = os.path.join(os.getcwd(), "chrome_user_data")
PLAYLISTS_URL = "https://studio.youtube.com/channel/UC0N9ISVWel4h4pUHLKcDyhQ/playlists"

def list_playlists():
    print(f"Launching browser with user data dir: {USER_DATA_DIR}")
    
    with sync_playwright() as p:
        browser = p.chromium.launch_persistent_context(
            user_data_dir=USER_DATA_DIR,
            headless=False,
            viewport={'width': 1280, 'height': 800},
            args=["--disable-blink-features=AutomationControlled"]
        )
        
        page = browser.pages[0]
        
        try:
            print(f"Navigating to {PLAYLISTS_URL}...")
            page.goto(PLAYLISTS_URL)
            time.sleep(10)
            
            print("Listing playlist titles...")
            # Scroll to load all
            for _ in range(5):
                page.mouse.wheel(0, 2000)
                time.sleep(2)
            
            items = page.locator("#playlist-title").all()
            titles = [item.inner_text().strip() for item in items]
            
            with open("my_playlists_titles.txt", "w") as f:
                for t in titles:
                    f.write(t + "\n")
            
            print(f"Saved {len(titles)} titles to my_playlists_titles.txt")
                
        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    list_playlists()
