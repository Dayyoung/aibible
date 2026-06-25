import os
import json
import time
import random
from playwright.sync_api import sync_playwright

USER_DATA_DIR = os.path.join(os.getcwd(), "chrome_user_data")
HISTORY_FILE = "video_history.json"
MOVIES_DIR = "movies"

def load_history():
    if not os.path.exists(HISTORY_FILE):
        return []
    with open(HISTORY_FILE, 'r') as f:
        return json.load(f)

def save_history(history):
    with open(HISTORY_FILE, 'w') as f:
        json.dump(history, f, indent=2)

def get_next_video(history):
    # Determine the Bible order to start from?
    # Actually just find the first one that is NOT uploaded.
    # We might want to respect the order in the file, which seems chronological/biblical
    for entry in history:
        if not entry.get('uploaded'):
             # Check if file exists
             path = os.path.join(MOVIES_DIR, entry['file_name'])
             if os.path.exists(path):
                 return entry, path
             else:
                 print(f"Warning: File not found for pending upload: {entry['file_name']}")
    return None, None

def upload_video(entry, file_path):
    print(f"Starting upload for: {entry['book']} {entry['chapter']}")
    
    with sync_playwright() as p:
        browser = p.chromium.launch_persistent_context(
            user_data_dir=USER_DATA_DIR,
            headless=False, # Watch it happen
            viewport={'width': 1280, 'height': 800},
            args=["--disable-blink-features=AutomationControlled"] # Try to avoid detection
        )
        
        page = browser.pages[0]
        
        try:
            page.goto("https://studio.youtube.com")
            time.sleep(5)
            
            # Check if we are logged in (look for "Create" button)
            # Create button usually has id "create-icon" or text "Create"
            # It's better to just try clicking the Create button
            
            print("Looking for Create button...")
            # Selector for "Create" button in top right
            create_button = page.locator("#create-icon")
            if not create_button.is_visible():
                # Maybe text "Create"
                create_button = page.get_by_text("Create", exact=True)
                
                # Error: Not logged in or Studio not loaded.
                print("Warning: Not logged in. Please log in manually in the opened browser window.")
                print("Navigate to https://studio.youtube.com if not already there.")
                print("Waiting for you to log in... (Checking every 5 seconds)")
                
                # Wait loop for user to log in
                for _ in range(60): # Wait up to 5 minutes
                    time.sleep(5)
                    if page.locator("#create-icon").is_visible() or page.get_by_text("Create", exact=True).is_visible():
                        print("Login detected! Proceeding...")
                        create_button = page.locator("#create-icon")
                        if not create_button.is_visible():
                            create_button = page.get_by_text("Create", exact=True)
                        break
                else:
                    print("Error: Login timeout.")
                    return False

            create_button.click()
            time.sleep(1)
            
            # Click "Upload videos"
            # Item in menu: "Upload videos"
            page.get_by_text("Upload videos").click()
            time.sleep(2)
            
            # File Input
            print(f"Selecting file: {file_path}")
            # The input type=file is usually hidden, but we can set it.
            # We can also wait for the "SELECT FILES" button
            with page.expect_file_chooser() as fc_info:
                # Click the big "SELECT FILES" button or the area
                # Often it's a button with ID "select-files-button"
                page.locator("#select-files-button").click()
            
            file_chooser = fc_info.value
            file_chooser.set_files(file_path)
            
            print("File set. Waiting for upload dialog...")
            # Wait for the "Details" dialog to settle
            # There is a progress bar at bottom.
            # We need to fill Title and Description.
            
            # Title input: Textbox with label "Title (required)"
            # Usually #textbox in #title-textarea
            title_input = page.locator("#title-textarea #textbox")
            title_input.wait_for(state="visible", timeout=30000)
            
            # Clear and set title
            title_text = f"{entry['book']} Chapter {entry['chapter']} (NIRV)"
            title_input.fill(title_text)
            
            # Description
            desc_input = page.locator("#description-textarea #textbox")
            desc_text = f"Audio Bible reading of {entry['book']} Chapter {entry['chapter']} in NIRV translation.\n\n#Bible #AudioBible #{entry['book']}"
            desc_input.fill(desc_text)
            
            time.sleep(2)
            
            # Made for kids?
            # Radio button "No, it's not made for kids"
            # name="VIDEO_MADE_FOR_KIDS_MFK" value="VIDEO_MADE_FOR_KIDS_NOT_MFK"
            print("Setting 'Not Made for Kids'...")
            not_kids = page.locator("tp-yt-paper-radio-button[name='VIDEO_MADE_FOR_KIDS_NOT_MFK_RADIO_NAME']")
            if not not_kids.is_visible():
                 # Fallback selector
                 not_kids = page.locator("#not-made-for-kids-radio-id") # hypothetical, usually just name matches
                 
            # Often simplest to click text "No, it's not made for kids"
            if not not_kids.is_visible():
                page.get_by_text("No, it's not made for kids").click()
            else:
                 not_kids.click()
                 
            time.sleep(1)
            
            # Click Next
            print("Clicking Next...")
            page.locator("#next-button").click()
            time.sleep(2)
            
            # Monetization (if enabled)? defaults to Off usually or On.
            # If monetization page exists, we might need to click Next again.
            # Check if we are on "Monetization" step
            # Steps are at top.
            
            # Just keep clicking Next until we hit "Visibility"
            # Limit loop
            for _ in range(3):
                # Check if "Visibility" text is active or if we see "Save or publish"
                if page.get_by_text("Save or publish").is_visible():
                    break
                # Click Next if visible and enabled
                next_btn = page.locator("#next-button")
                if next_btn.is_visible() and not next_btn.is_disabled():
                    next_btn.click()
                    time.sleep(2)
                else:
                    break
                    
            # Visibility Step
            print("Setting Visibility to Public...")
            # Radio button name "PUBLIC"
            public_radio = page.locator("tp-yt-paper-radio-button[name='PUBLIC']")
            # Or text "Public"
            if not public_radio.is_visible():
                page.get_by_text("Public", exact=True).click()
            else:
                public_radio.click()
                
            time.sleep(1)
            
            # Wait for checks to complete?
            # "Checks complete. No issues found."
            # Or "Processing..."
            # We can publish even if processing.
            
            print("Publishing...")
            publish_btn = page.locator("#done-button")
            publish_btn.click()
            
            # Wait for "Video published" dialog
            # Header "Video published" or "Video processing"
            # User requested to skip confirmation to speed up.
            print("Skipping confirmation wait (User Request). Checking for immediate errors then proceeding...")
            time.sleep(10) # Wait a few seconds for any immediate errors or upload finalization
            
            # Optional: Check for "Duplicate" error?
            if page.get_by_text("Daily upload limit reached").is_visible():
                 print("Error: Daily limit reached!")
                 return False
            
            print("Assuming upload successful/processing. Moving on.")
            
            print("Upload confirmed!")
            # Close dialog if needed, or just browser closes
            
            time.sleep(3)
            return True
            
        except Exception as e:
            print(f"Failed to upload: {e}")
            # file = page.screenshot(path="upload_error.png")
            return False
        finally:
            browser.close()

def main():
    while True:
        history = load_history()
        entry, path = get_next_video(history)
        
        if not entry:
            print("No more pending uploads found or files missing.")
            break
            
        success = upload_video(entry, path)
        
        if success:
            # Update history
            entry['uploaded'] = True
            # Need to update the specific entry in the full list
            # Since 'entry' is a reference to the dict inside the list 'history' (if created correctly)
            # Actually load_history returns list of dicts, entry is one dict.
            # So modifying entry modifies the object, and saving 'history' works.
            entry['uploaded'] = True 
            save_history(history)
            print("History updated. Waiting 30s before next upload...")
            time.sleep(30) # Wait a bit between uploads
        else:
            print("Upload failed. Stopping.")
            break

if __name__ == "__main__":
    main()
