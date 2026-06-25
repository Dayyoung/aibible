import os
import time
from playwright.sync_api import sync_playwright

USER_DATA_DIR = os.path.join(os.getcwd(), "chrome_user_data")
PLAYLIST_URL = "https://www.youtube.com/playlist?list=PL0wY0Ytc50f8yiwjOO46O_wfSeVbg8x6b"

def cleanup_psalms():
    print(f"Launching browser with user data dir: {USER_DATA_DIR}")
    
    with sync_playwright() as p:
        # Launch persistent context
        browser = p.chromium.launch_persistent_context(
            user_data_dir=USER_DATA_DIR,
            headless=False,
            viewport={'width': 1280, 'height': 800},
            args=["--disable-blink-features=AutomationControlled"]
        )
        
        page = browser.pages[0]
        
        try:
            page.goto(PLAYLIST_URL)
            time.sleep(5)
            
            # Scroll to bottom to load all videos
            print("Scrolling to load all videos...")
            last_height = page.evaluate("document.documentElement.scrollHeight")
            while True:
                page.evaluate("window.scrollTo(0, document.documentElement.scrollHeight)")
                time.sleep(2)
                new_height = page.evaluate("document.documentElement.scrollHeight")
                if new_height == last_height:
                    break
                last_height = new_height
                
            # Get all video items
            # Each video item is usually inside ytd-playlist-video-renderer
            print("Identifying duplicates...")
            video_items = page.locator("ytd-playlist-video-renderer").all()
            print(f"Found {len(video_items)} videos total.")
            
            seen_titles = set()
            to_remove_indices = []
            
            for i, item in enumerate(video_items):
                title_elem = item.locator("#video-title")
                title = title_elem.inner_text().strip()
                
                if title in seen_titles:
                    to_remove_indices.append(i)
                else:
                    seen_titles.add(title)
            
            print(f"Ready to remove {len(to_remove_indices)} duplicate videos.")
            
            # Remove from the bottom up to avoid index shift issues if we were doing it by index
            # But we are using locator or we can just find them again
            
            # Actually, removing one by one is slow and the list might refresh.
            # Let's try to remove them one by one and re-evaluate if needed.
            
            removed_count = 0
            for index in reversed(to_remove_indices):
                # Re-locate the item to be sure
                current_items = page.locator("ytd-playlist-video-renderer").all()
                if index >= len(current_items):
                    print(f"Index {index} out of range, maybe already refreshed.")
                    continue
                    
                target_item = current_items[index]
                title = target_item.locator("#video-title").inner_text().strip()
                print(f"Removing duplicate: {title} (Index {index})")
                
                # Click the menu button (three dots)
                menu_button = target_item.locator("button[aria-label='작업 메뉴']")
                if not menu_button.is_visible():
                     # try English just in case
                     menu_button = target_item.locator("button[aria-label='Action menu']")
                
                menu_button.click()
                time.sleep(1)
                
                # Click "Remove from Psalms (NIRV)"
                # In Korean: "재생목록에서 삭제" (Remove from playlist)
                remove_option = page.locator("ytd-menu-service-item-renderer:has-text('삭제')")
                if remove_option.is_visible():
                    remove_option.click()
                    removed_count += 1
                    print(f"Successfully removed {removed_count}/{len(to_remove_indices)}")
                    time.sleep(2) # Wait for removal animation/request
                else:
                    print(f"Could not find 'Remove from' option for {title}")
                    # Click somewhere else to close menu
                    page.mouse.click(0, 0)
                    time.sleep(1)

            print(f"Cleanup finished. Total removed: {removed_count}")
            
        except Exception as e:
            print(f"An error occurred: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    cleanup_psalms()
