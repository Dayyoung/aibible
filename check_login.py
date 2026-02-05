import os
import time
from playwright.sync_api import sync_playwright

USER_DATA_DIR = os.path.join(os.getcwd(), "chrome_user_data")
EDIT_URL = "https://studio.youtube.com/channel/UC0N9ISVWel4h4pUHLKcDyhQ/editing/hometab"

def check_login():
    with sync_playwright() as p:
        browser = p.chromium.launch_persistent_context(
            user_data_dir=USER_DATA_DIR,
            headless=False,
            viewport={'width': 1280, 'height': 800}
        )
        page = browser.pages[0]
        try:
            print(f"Checking {EDIT_URL}...")
            page.goto(EDIT_URL)
            time.sleep(10)
            print(f"Title: {page.title()}")
            page.screenshot(path="login_check.png")
            
            # Check for Add Section button
            btn = page.locator("#add-section-button")
            print(f"Add Section button visible: {btn.is_visible()}")
            
        except Exception as e:
            print(e)
        finally:
            browser.close()

if __name__ == "__main__":
    check_login()
