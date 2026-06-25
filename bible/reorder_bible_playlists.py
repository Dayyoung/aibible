import os
import time
from playwright.sync_api import sync_playwright

USER_DATA_DIR = os.path.join(os.getcwd(), "chrome_user_data")
EDIT_URL = "https://studio.youtube.com/channel/UC0N9ISVWel4h4pUHLKcDyhQ/editing/hometab"

BIBLE_ORDER = [
    "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy",
    "Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel",
    "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles",
    "Ezra", "Nehemiah", "Esther", "Job", "Psalms",
    "Proverbs", "Ecclesiastes", "Song of Solomon", "Isaiah",
    "Jeremiah", "Lamentations", "Ezekiel", "Daniel",
    "Hosea", "Joel", "Amos", "Obadiah", "Jonah",
    "Micah", "Nahum", "Habakkuk", "Zephaniah", "Haggai",
    "Zechariah", "Malachi", "Matthew", "Mark", "Luke",
    "John", "Acts", "Romans", "1 Corinthians",
    "2 Corinthians", "Galatians", "Ephesians", "Philippians",
    "Colossians", "1 Thessalonians", "2 Thessalonians",
    "1 Timothy", "2 Timothy", "Titus", "Philemon",
    "Hebrews", "James", "1 Peter", "2 Peter",
    "1 John", "2 John", "3 John", "Jude", "Revelation"
]

def reorder_bible():
    with sync_playwright() as p:
        browser = p.chromium.launch_persistent_context(
            user_data_dir=USER_DATA_DIR,
            headless=False,
            viewport={'width': 1280, 'height': 800},
            args=["--disable-blink-features=AutomationControlled"]
        )
        page = browser.pages[0] if browser.pages else browser.new_page()
        
        try:
            print(f"Navigating...")
            page.goto(EDIT_URL, timeout=90000)
            time.sleep(20) # Very long wait for full load
            
            # 1. DELETE EXISTING SECTIONS
            print("Cleaning up existing sections...")
            shelves = page.locator("ytcp-shelf-list-item").all()
            found_any = False
            for shelf in shelves:
                txt = shelf.inner_text()
                if "여러 재생목록" in txt or "성경" in txt:
                    print(f"Deleting shelf: {txt.splitlines()[0]}")
                    shelf.hover()
                    time.sleep(1)
                    shelf.locator("#shelf-actions-menu").first.click()
                    time.sleep(2)
                    page.locator("ytcp-text-menu-item:has-text('삭제')").first.click()
                    time.sleep(5)
                    found_any = True
            
            if not found_any: print("No matching sections found to delete.")

            # 2. ADD SECTION
            print("Adding section...")
            add_btn = page.locator("#add-section-button")
            if not add_btn.is_visible():
                add_btn = page.get_by_text("섹션 추가")
            
            add_btn.scroll_into_view_if_needed()
            time.sleep(1)
            add_btn.click()
            time.sleep(2)
            
            # Select Multiple Playlists
            page.get_by_text("여러 재생목록").click()
            time.sleep(10)
            
            # 3. SET TITLE
            print("Configuring modal...")
            title_input = page.locator("#title-input input").first
            title_input.fill("성경 66권 (NIRV)")
            
            # 4. SEARCH AND ADD
            added = 0
            for book in BIBLE_ORDER:
                print(f"[{added+1}/66] {book}...", end=" ", flush=True)
                
                search_box = page.locator("input#owned-entity-search-query, ytcp-playlist-drawer input[type='text']").first
                search_box.click()
                page.keyboard.press("Meta+A")
                page.keyboard.press("Backspace")
                search_box.type(book, delay=100)
                time.sleep(1)
                page.keyboard.press("Enter")
                time.sleep(8) # Wait for search results
                
                # Check My Playlists first
                items = page.locator("ytcp-playlist-drawer-item").all()
                found = False
                for item in items:
                    t = item.inner_text().lower()
                    if book.lower() in t and "(nirv)" in t:
                        item.locator("#checkbox").click()
                        added += 1
                        print("OK")
                        found = True
                        break
                
                if not found:
                    # Switch to Public Tab
                    print("(YouTube tab)...", end=" ", flush=True)
                    page.evaluate('''() => {
                        const tabs = Array.from(document.querySelectorAll('tp-yt-paper-tab'));
                        const target = tabs.find(t => t.textContent.includes('YouTube') || t.textContent.includes('유튜브'));
                        if (target) target.click();
                    }''')
                    time.sleep(3)
                    
                    # Re-search
                    search_box.click()
                    page.keyboard.press("Meta+A")
                    page.keyboard.press("Backspace")
                    search_box.type(book, delay=100)
                    time.sleep(1)
                    page.keyboard.press("Enter")
                    time.sleep(10)
                    
                    items = page.locator("ytcp-playlist-drawer-item").all()
                    for item in items:
                        t = item.inner_text().lower()
                        if book.lower() in t and "(nirv)" in t:
                            item.locator("#checkbox").click()
                            added += 1
                            print("OK")
                            found = True
                            break
                    
                    # Switch Back (important)
                    page.evaluate('''() => {
                        const tabs = Array.from(document.querySelectorAll('tp-yt-paper-tab'));
                        const target = tabs.find(t => t.textContent.includes('내 재생목록') || t.textContent.includes('My playlists'));
                        if (target) target.click();
                    }''')
                    time.sleep(2)
                    
                    if not found: print("NOT FOUND")
                
                time.sleep(0.5)

            print(f"Total added: {added}/66")
            
            # 5. DONE AND PUBLISH
            print("Finishing...")
            page.get_by_text("완료").click()
            time.sleep(5)
            
            publish_btn = page.locator("#publish-button")
            if publish_btn.is_visible() and not publish_btn.is_disabled():
                publish_btn.click()
                print("SUCCESSFUL PUBLISH")
                time.sleep(10)
            else:
                print("Publish skipped.")

        except Exception as e:
            print(f"ERROR: {e}")
            page.screenshot(path="last_error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    reorder_bible()
