import os
import datetime
import re
from moviepy import *

def merge_todays_shorts():
    # Source directory is now the Desktop
    desktop_dir = os.path.expanduser("~/Desktop")
    if not os.path.exists(desktop_dir):
        print(f"Directory not found: {desktop_dir}")
        return

    today = datetime.date.today()
    todays_files = []
    
    print(f"Scanning for videos on Desktop modified on {today}...")

    # Find files modified today on Desktop
    for f in os.listdir(desktop_dir):
        if f.lower().endswith(('.mp4', '.mov', '.avi', '.mkv')):
            filepath = os.path.join(desktop_dir, f)
            mtime_dt = datetime.datetime.fromtimestamp(os.path.getmtime(filepath))
            
            # Check if modified today
            if mtime_dt.date() == today:
                todays_files.append((filepath, mtime_dt))

    if not todays_files:
        print("No video files found modified today on Desktop.")
        return

    # Sort by modification time (oldest first)
    todays_files.sort(key=lambda x: x[1])
    
    sorted_filepaths = [x[0] for x in todays_files]
    
    print(f"Found {len(sorted_filepaths)} videos to merge:")
    for tf in sorted_filepaths:
        print(f" - {os.path.basename(tf)} (Modified: {datetime.datetime.fromtimestamp(os.path.getmtime(tf))})")

    # Output directory
    output_dir = os.path.join(desktop_dir, "bible")
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    # Generate unique output filename: YYYY_MM_DD.mp4, YYYY_MM_DD(1).mp4, etc.
    base_name = today.strftime('%Y_%m_%d')
    output_filename = f"{base_name}.mp4"
    output_path = os.path.join(output_dir, output_filename)
    
    counter = 1
    while os.path.exists(output_path):
        output_filename = f"{base_name}({counter}).mp4"
        output_path = os.path.join(output_dir, output_filename)
        counter += 1

    # Load clips
    clips = []
    try:
        for tf in sorted_filepaths:
            clip = VideoFileClip(tf)
            clips.append(clip)
            
        if clips:
            print(f"Merging into {output_path}...")
            final_clip = concatenate_videoclips(clips)
            final_clip.write_videofile(output_path, codec='libx264', audio_codec='aac')
            print(f"Successfully created: {output_path}")
            
    except Exception as e:
        print(f"An error occurred during merging: {e}")
    finally:
        # Close clips to release resources
        for clip in clips:
            try:
                clip.close()
            except:
                pass

if __name__ == "__main__":
    merge_todays_shorts()
