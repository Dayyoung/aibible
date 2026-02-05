import os
import time
from playwright.sync_api import sync_playwright

USER_DATA_DIR = os.path.join(os.getcwd(), "chrome_user_data")
EDIT_URL = "https://studio.youtube.com/channel/UC0N9ISVWel4h4pUHLKcDyhQ/editing/hometab"

def debug_search():
    with sync_playwright() as p:
        browser = p.chromium.launch_persistent_context(
            user_data_dir=USER_DATA_DIR,
            headless=False,
            viewport={'width': 1280, 'height': 800}
        )
        page = browser.pages[0]
        try:
            page.goto(EDIT_URL)
            time.sleep(10)
            page.locator("#add-section-button").click()
            time.sleep(2)
            page.get_by_text("여러 재생목록").last.click()
            time.sleep(5)
            
            # Switch to Public Search Tab
            page.evaluate('''() => {
                const tabs = Array.from(document.querySelectorAll('tp-yt-paper-tab'));
                const target = tabs.find(t => t.textContent.includes('YouTube') || t.textContent.includes('유튜브'));
                if (target) target.click();
            }''')
            time.sleep(3)
            
            search_input = page.locator("input#owned-entity-search-query").first
            search_input.click()
            search_input.fill("Genesis")
            time.sleep(1)
            page.keyboard.press("Enter")
            print("Typed Genesis and pressed Enter. Waiting 10s...")
            time.sleep(10)
            
            page.screenshot(path="debug_public_search_genesis.png")
            
            items = page.locator("ytcp-playlist-drawer-item").all()
            print(f"Found {len(items)} items.")
            for i, item in enumerate(items):
                print(f"[{i}] {item.inner_text().split('\\n')[0]}")
                
        except Exception as e:
            print(e)
        finally:
            browser.close()

if __name__ == "__main__":
    debug_search()
