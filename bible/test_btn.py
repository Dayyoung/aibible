import os
import time
from playwright.sync_api import sync_playwright

USER_DATA_DIR = os.path.join(os.getcwd(), "chrome_user_data")
EDIT_URL = "https://studio.youtube.com/channel/UC0N9ISVWel4h4pUHLKcDyhQ/editing/hometab"

def test_add_btn():
    with sync_playwright() as p:
        browser = p.chromium.launch_persistent_context(
            user_data_dir=USER_DATA_DIR,
            headless=False,
            viewport={'width': 1280, 'height': 800}
        )
        page = browser.pages[0]
        try:
            page.goto(EDIT_URL)
            time.sleep(15)
            print("Page loaded. Searching for button...")
            
            # Print all button texts
            btns = page.locator("button, ytcp-button").all()
            for b in btns:
                try:
                    t = b.inner_text().strip()
                    if t: print(f"Btn: '{t}'")
                except: pass
            
            target = page.locator("#add-section-button")
            print(f"Target ID visible: {target.is_visible()}")
            if target.is_visible():
                target.click()
                print("Clicked ID!")
                time.sleep(5)
                page.screenshot(path="after_click.png")
            
        except Exception as e:
            print(e)
            page.screenshot(path="test_btn_error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    test_add_btn()
