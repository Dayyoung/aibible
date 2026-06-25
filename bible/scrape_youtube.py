import asyncio
from playwright.async_api import async_playwright
import json
import time

async def scrape_youtube_videos(channel_url):
    async with async_playwright() as p:
        # Try to use chromium if installed
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        
        print(f"Navigating to {channel_url}...")
        await page.goto(f"{channel_url}/videos")
        
        # Wait for videos to load
        await page.wait_for_selector('ytd-rich-grid-media')
        
        videos = []
        last_count = 0
        scroll_count = 0
        
        while True:
            # Scroll down
            await page.evaluate("window.scrollTo(0, document.documentElement.scrollHeight)")
            await asyncio.sleep(2)  # Wait for content to load
            
            # Extract video titles and URLs
            video_elements = await page.query_selector_all('#video-title-link')
            current_videos = []
            for el in video_elements:
                title = await el.inner_text()
                url = await el.get_attribute('href')
                if url:
                    if not url.startswith('http'):
                        url = f"https://www.youtube.com{url}"
                    current_videos.append({"title": title, "url": url})
            
            new_count = len(current_videos)
            print(f"Loaded {new_count} videos...")
            
            if new_count == last_count:
                # Try scrolling a few more times to be sure
                scroll_count += 1
                if scroll_count > 5:
                    videos = current_videos
                    break
            else:
                last_count = new_count
                scroll_count = 0
                
            # Limit for safety
            if new_count > 2000:
                videos = current_videos
                break
                
        await browser.close()
        return videos

if __name__ == "__main__":
    channel_url = "https://www.youtube.com/@bibleForAI"
    videos = asyncio.run(scrape_youtube_videos(channel_url))
    
    output_file = "all_youtube_videos.json"
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(videos, f, indent=2, ensure_ascii=False)
    
    print(f"Success! Saved {len(videos)} videos to {output_file}")
