import os
import time
from playwright.sync_api import sync_playwright

USER_DATA_DIR = os.path.join(os.getcwd(), "chrome_user_data")
EDIT_URL = "https://studio.youtube.com/channel/UC0N9ISVWel4h4pUHLKcDyhQ/editing/hometab"

def inspect_sections():
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
            time.sleep(5)
            
            # Check for permission error
            if page.get_by_text("Permission denied").is_visible() or page.get_by_text("권한이 없습니다").is_visible():
                print("Permission denied at " + page.url)
                # Check channel name in corner
                avatar = page.locator("#avatar-btn")
                if avatar.is_visible():
                    avatar.click()
                    time.sleep(2)
                    account_name = page.locator("#account-name").inner_text()
                    print(f"Currently logged in as: {account_name}")
                return
                
            print("Successfully accessed Studio.")
            sections = page.locator("ytcp-featured-section-item").all()
            print(f"Found {len(sections)} featured sections:")
            for s in sections:
                title = s.locator("#section-title").inner_text()
                print(f" - {title}")
                
            page.screenshot(path="studio_inspect.png")
            
        except Exception as e:
            print(f"An error occurred: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    inspect_sections()
