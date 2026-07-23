import os
import json
import re
import subprocess
import urllib.request
import urllib.parse
import time
import shutil
from concurrent.futures import ThreadPoolExecutor, as_completed

BIBLE_DOWNLOAD_DIR = "/Users/dayyoung/Downloads/bible"
VIDEO_OUTPUT_DIR = "/Users/dayyoung/Downloads/bible_videos"
OLLAMA_DIR = "/Users/dayyoung/project/aibible/chrome_extension/ollama"
FORKID_DIR = "/Users/dayyoung/project/aibible/chrome_extension/forkid"
ORIGINAL_JSON_DIR = "/Users/dayyoung/project/aibible/chrome_extension/json"

ENGLISH_TO_KOREAN = {
    "genesis": "창세기", "exodus": "출애굽기", "leviticus": "레위기", "numbers": "민수기", "deuteronomy": "신명기",
    "joshua": "여호수아", "judges": "사사기", "ruth": "룻기", "1samuel": "사무엘상", "2samuel": "사무엘하",
    "1kings": "열왕기상", "2kings": "열왕기하", "1chronicles": "역대기상", "2chronicles": "역대기하", "ezra": "에스라",
    "nehemiah": "느헤미야", "esther": "에스더", "job": "욥기", "psalms": "시편", "proverbs": "잠언",
    "ecclesiastes": "전도서", "songofsolomon": "아가", "isaiah": "이사야", "jeremiah": "예레미야", "lamentations": "예레미야 애가",
    "ezekiel": "에스겔", "daniel": "다니엘", "hosea": "호세아", "joel": "요엘", "amos": "아모스",
    "obadiah": "오바디야", "jonah": "요나", "micah": "미가", "nahum": "나훔", "habakkuk": "하박국",
    "zephaniah": "스바냐", "haggai": "학개", "zechariah": "스가랴", "malachi": "말라기", "matthew": "마태복음",
    "mark": "마가복음", "luke": "누가복음", "john": "요한복음", "acts": "사도행전", "romans": "로마서",
    "1corinthians": "고린도전서", "2corinthians": "고린도후서", "galatians": "갈라디아서", "ephesians": "에베소서", "philippians": "빌립보서",
    "colossians": "골로새서", "1thessalonians": "데살로니가전서", "2thessalonians": "데살로니가후서", "1timothy": "디모데전서", "2timothy": "디모데후서",
    "titus": "디도서", "philemon": "빌레몬서", "hebrews": "히브리서", "james": "야고보서", "1peter": "베드로전서",
    "2peter": "베드로후서", "1john": "요한일서", "2john": "요한이서", "3john": "요한삼서", "jude": "유다서",
    "revelation": "요한계시록"
}

def is_korean(text):
    return bool(re.search(r'[ㄱ-ㅎㅏ-ㅣ가-힣]', text))

def clean_existing_videos():
    print("=== Cleaning up old video files ===")
    
    if os.path.exists(BIBLE_DOWNLOAD_DIR):
        removed_sub = 0
        for root, dirs, files in os.walk(BIBLE_DOWNLOAD_DIR):
            for file in files:
                if file.endswith("_video.mp4") or file.endswith("_video.webm"):
                    full_path = os.path.join(root, file)
                    try:
                        os.remove(full_path)
                        removed_sub += 1
                    except:
                        pass
        print(f"   - Removed {removed_sub} old videos from chapter subfolders.")
    print("Cleanup Completed.\n")

def get_tts_file(text, target_path):
    trimmed = text.replace("\n", " ").replace("\r", " ").strip()
    trimmed = re.sub(r'\s+', ' ', trimmed)[:180]
    
    lang = "en"
    url = f"https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl={lang}&q={urllib.parse.quote(trimmed)}"
    headers = {"User-Agent": "Mozilla/5.0"}
    req = urllib.request.Request(url, headers=headers)
    
    for r in range(3):
        try:
            with urllib.request.urlopen(req) as res:
                with open(target_path, 'wb') as f:
                    f.write(res.read())
            return True
        except Exception as e:
            time.sleep(0.5)
    return False

def check_ffmpeg():
    try:
        subprocess.run(["ffmpeg", "-version"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        return True
    except FileNotFoundError:
        return False

def encode_single_clip(img_path, audio_path, clip_path):
    cmd = [
        "ffmpeg", "-loop", "1", "-i", img_path, "-i", audio_path,
        "-c:v", "libx264", "-preset", "ultrafast", "-tune", "stillimage",
        "-c:a", "aac", "-b:a", "192k", "-pix_fmt", "yuv420p", "-shortest",
        clip_path, "-y"
    ]
    res = subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    return clip_path if res.returncode == 0 else None

def build_video_for_chapter(book_name, chapter_num):
    chapter_folder = os.path.join(BIBLE_DOWNLOAD_DIR, book_name, f"Chapter_{chapter_num}")
    if not os.path.exists(chapter_folder):
        return False
        
    final_output_path = os.path.join(VIDEO_OUTPUT_DIR, f"KidBible_{book_name}_Chapter_{chapter_num}.mp4")
    
    # Skip if already exists in output directory
    if os.path.exists(final_output_path) and os.path.getsize(final_output_path) > 0:
        print(f"      [Skip] Video already exists at: {final_output_path}")
        return True
        
    print(f"\n   -> Generating Video for {book_name} Chapter {chapter_num} (Parallel Acceleration)...")
    t0 = time.time()
    
    # 1. Try to load narration texts (ollama -> forkid -> original fallback)
    narration_texts = []
    summary_loaded = False
    kor_book_name = ENGLISH_TO_KOREAN.get(book_name.lower(), book_name)
    
    for folder in [OLLAMA_DIR, FORKID_DIR]:
        json_path = os.path.join(folder, f"{book_name.lower()}.json")
        if os.path.exists(json_path):
            try:
                with open(json_path, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                    ch_items = [item for item in data if item.get("chapterNumber") == int(chapter_num) and item.get("type") == "paragraph text"]
                    if ch_items:
                        narration_texts = [item["value"] for item in ch_items]
                        summary_loaded = True
                        print(f"      - Loaded kids narration summary from: {json_path}")
                        break
            except Exception as e:
                pass

    # Fallback to original text if no summary exists
    if not summary_loaded:
        original_json = os.path.join(ORIGINAL_JSON_DIR, f"{book_name.lower()}.json")
        if os.path.exists(original_json):
            try:
                with open(original_json, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                    ch_items = [item for item in data if item.get("chapterNumber") == int(chapter_num) and item.get("type") in ["paragraph text", "line text"]]
                    
                    # Merge by verse number
                    verse_map = {}
                    for item in ch_items:
                        v = item["verseNumber"]
                        val = item.get("value", "")
                        if v not in verse_map:
                            verse_map[v] = []
                        verse_map[v].append(val)
                        
                    sorted_verses = sorted(verse_map.keys())
                    for idx, v in enumerate(sorted_verses):
                        text = " ".join(verse_map[v]).strip()
                        if idx == 0:
                            prefix = f"{book_name} Chapter {chapter_num} Verse {v}. "
                            narration_texts.append(prefix + text)
                        else:
                            narration_texts.append(text)
                    print("      - Fallback: Loaded original verses as narration.")
            except Exception as e:
                pass
                
    if not narration_texts:
        print("      [Error] No narration text found for this chapter.")
        return False

    temp_dir = os.path.join(chapter_folder, "temp_render")
    os.makedirs(temp_dir, exist_ok=True)
    
    # Locate verse images (e.g. 1.jpg, 2.jpg)
    # Stage 1: Download TTS files in parallel (Max 8 Threads)
    print("      - Downloading TTS audio files in parallel...")
    tts_tasks = []
    for idx, text in enumerate(narration_texts):
        verse_num = idx + 1
        audio_path = os.path.join(temp_dir, f"audio_{verse_num}.mp3")
        tts_tasks.append((text, audio_path))
        
    downloaded_count = 0
    with ThreadPoolExecutor(max_workers=8) as executor:
        futures = {executor.submit(get_tts_file, text, path): verse_idx for verse_idx, (text, path) in enumerate(tts_tasks)}
        for future in as_completed(futures):
            if future.result():
                downloaded_count += 1
                
    # Stage 2: Encode clips in parallel (Max 6 Threads to prevent CPU overflow)
    print(f"      - Rendering {downloaded_count} clips in parallel...")
    encode_tasks = []
    for idx, text in enumerate(narration_texts):
        verse_num = idx + 1
        img_path = os.path.join(chapter_folder, f"{verse_num}.jpg")
        
        # Check image formats
        if not os.path.exists(img_path):
            img_path = os.path.join(chapter_folder, f"{verse_num}.png")
            if not os.path.exists(img_path):
                img_path = os.path.join(chapter_folder, f"{verse_num}.webp")
                if not os.path.exists(img_path):
                    continue
                    
        audio_path = os.path.join(temp_dir, f"audio_{verse_num}.mp3")
        clip_path = os.path.join(temp_dir, f"clip_{verse_num}.mp4")
        
        if os.path.exists(audio_path):
            encode_tasks.append((img_path, audio_path, clip_path, verse_num))

    verse_clips_map = {}
    with ThreadPoolExecutor(max_workers=6) as executor:
        futures = {executor.submit(encode_single_clip, img, aud, clip): v_num for img, aud, clip, v_num in encode_tasks}
        for future in as_completed(futures):
            v_num = futures[future]
            clip_res = future.result()
            if clip_res:
                verse_clips_map[v_num] = clip_res

    # Check clips mapping
    sorted_verse_nums = sorted(verse_clips_map.keys())
    if not sorted_verse_nums:
        print("      [Error] No video clips were successfully encoded.")
        shutil.rmtree(temp_dir, ignore_errors=True)
        return False

    # 3. Concatenate all clips in correct sequential order
    concat_list_path = os.path.join(temp_dir, "concat_list.txt")
    with open(concat_list_path, 'w', encoding='utf-8') as f:
        for v_num in sorted_verse_nums:
            f.write(f"file '{verse_clips_map[v_num]}'\n")
            
    os.makedirs(VIDEO_OUTPUT_DIR, exist_ok=True)
    concat_cmd = [
        "ffmpeg", "-f", "concat", "-safe", "0", "-i", concat_list_path,
        "-c", "copy", final_output_path, "-y"
    ]
    
    concat_res = subprocess.run(concat_cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    
    # Cleanup temp folder
    shutil.rmtree(temp_dir, ignore_errors=True)
    
    t1 = time.time()
    if concat_res.returncode == 0:
        print(f"      [Success] Video generated: {final_output_path} (Time elapsed: {t1 - t0:.2f}s)")
        return True
    else:
        print("      [Error] FFmpeg concat failed.")
        return False

def main():
    print("=== Starting Parallel Auto Batch Bible Video Generator ===")
    if not check_ffmpeg():
        print("[CRITICAL ERROR] 'ffmpeg' is not installed or not in PATH.")
        return

    if not os.path.exists(BIBLE_DOWNLOAD_DIR):
        print(f"[Error] Bible download directory not found: {BIBLE_DOWNLOAD_DIR}")
        return

    # Clean up old videos
    clean_existing_videos()

    generated_count = 0
    skipped_count = 0
    
    # Scan through bible folder structure
    books = [d for d in os.listdir(BIBLE_DOWNLOAD_DIR) if os.path.isdir(os.path.join(BIBLE_DOWNLOAD_DIR, d))]
    
    for book in sorted(books):
        book_path = os.path.join(BIBLE_DOWNLOAD_DIR, book)
        chapters = [c for c in os.listdir(book_path) if os.path.isdir(os.path.join(book_path, c)) and c.startswith("Chapter_")]
        
        # Sort chapters numerically
        chapters = sorted(chapters, key=lambda x: int(x.split("_")[1]) if len(x.split("_")) > 1 and x.split("_")[1].isdigit() else 0)
        
        for chapter in chapters:
            ch_num = chapter.split("_")[1]
            chapter_path = os.path.join(book_path, chapter)
            
            # Check if images exist
            has_images = os.path.exists(os.path.join(chapter_path, "1.jpg")) or \
                         os.path.exists(os.path.join(chapter_path, "1.png")) or \
                         os.path.exists(os.path.join(chapter_path, "1.webp"))
                         
            if not has_images:
                continue
                
            final_video = os.path.join(VIDEO_OUTPUT_DIR, f"KidBible_{book}_Chapter_{ch_num}.mp4")
            if os.path.exists(final_video) and os.path.getsize(final_video) > 0:
                skipped_count += 1
                continue
                
            # Build
            success = build_video_for_chapter(book, ch_num)
            if success:
                generated_count += 1
                
    print("\n=== Video Generator Run Completed ===")
    print(f"Total Videos Skipped (Already existed): {skipped_count}")
    print(f"Total Videos Newly Generated: {generated_count}")
    print(f"All outputs saved to: {VIDEO_OUTPUT_DIR}")

if __name__ == "__main__":
    main()
