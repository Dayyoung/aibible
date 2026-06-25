import os
import time
from playwright.sync_api import sync_playwright

USER_DATA_DIR = os.path.join(os.getcwd(), "chrome_user_data")
EDIT_URL = "https://studio.youtube.com/channel/UC0N9ISVWel4h4pUHLKcDyhQ/editing/hometab"

def debug_reorder():
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
            print(f"Navigating to {EDIT_URL}...")
            page.goto(EDIT_URL)
            time.sleep(10)
            
            # Add section
            print("Clicking Add Section...")
            page.locator("#add-section-button").click()
            time.sleep(2)
            page.get_by_text("여러 재생목록").last.click()
            time.sleep(5)
            
            # Modal
            print("In Modal. Finding search input...")
            search_input = page.locator("input#owned-entity-search-query").first
            if not search_input.is_visible():
                search_input = page.locator("ytcp-playlist-drawer input").first
            
            print(f"Search input visible: {search_input.is_visible()}")
            
            # Try Genesis
            query = "Genesis (NIRV)"
            print(f"Typing '{query}'...")
            search_input.click()
            search_input.fill(query)
            time.sleep(5)
            
            page.screenshot(path="debug_search_results.png")
            
            print("Listing all ytcp-playlist-drawer-item contents:")
            items = page.locator("ytcp-playlist-drawer-item").all()
            print(f"Found {len(items)} items.")
            for i, item in enumerate(items):
                text = item.inner_text().replace('\n', ' ')
                print(f"  [{i}] {text}")
                # Try to find checkbox
                chk = item.locator("#checkbox")
                print(f"    Checkbox visible: {chk.is_visible()}")
                
        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    debug_reorder()
