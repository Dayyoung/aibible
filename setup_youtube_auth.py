import os
import time
from playwright.sync_api import sync_playwright

USER_DATA_DIR = os.path.join(os.getcwd(), "chrome_user_data")

def setup_auth():
    print(f"Launching browser with user data dir: {USER_DATA_DIR}")
    print("Please log in to YouTube/Google in the opened browser window.")
    print("Navigate to https://studio.youtube.com and ensure you can see the dashboard.")
    print("Do NOT close the browser window immediately after login. Wait a few seconds.")
    print("When you are fully logged in and can see YouTube Studio, close the browser window to save the session.")
    
    if not os.path.exists(USER_DATA_DIR):
        os.makedirs(USER_DATA_DIR)
        
    with sync_playwright() as p:
        # Launch persistent context
        browser = p.chromium.launch_persistent_context(
            user_data_dir=USER_DATA_DIR,
            headless=False,
            viewport={'width': 1280, 'height': 720}
        )
        
        page = browser.pages[0]
        page.goto("https://studio.youtube.com")
        
        # Keep alive until closed
        try:
            print("Browser is open. Waiting for you to close it...")
            page.wait_for_event("close", timeout=0) # Wait indefinitely until page is closed
        except KeyboardInterrupt:
            print("Closing browser...")
            browser.close()
        except Exception as e:
            # If page is closed by user, it might throw, or just finish.
            print("Browser closed.")
            
if __name__ == "__main__":
    setup_auth()
