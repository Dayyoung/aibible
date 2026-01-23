import os
import datetime
import re
from moviepy import *

def merge_todays_shorts():
    short_dir = os.path.join(os.getcwd(), "short")
    if not os.path.exists(short_dir):
        print(f"Directory not found: {short_dir}")
        return

    today = datetime.date.today()
    todays_files = []
    output_filename = f"{today.strftime('%Y_%m_%d')}.mp4"

    print(f"Scanning for videos in {short_dir} modified on {today}...")

    # Find files
    for f in os.listdir(short_dir):
        if f.lower().endswith(('.mp4', '.mov', '.avi', '.mkv')):
            # Skip the output file if it's already there
            if f == output_filename:
                continue
                
            filepath = os.path.join(short_dir, f)
            mtime = datetime.date.fromtimestamp(os.path.getmtime(filepath))
            
            if mtime == today:
                todays_files.append(filepath)

    if not todays_files:
        print("No video files found modified today.")
        return

    # Sort by numerical value in filename
    def extract_number(filename):
        numbers = re.findall(r'\d+', filename)
        return int(numbers[0]) if numbers else 0

    todays_files.sort(key=lambda x: extract_number(os.path.basename(x)))
    print(f"Found {len(todays_files)} videos to merge:")
    for tf in todays_files:
        print(f" - {os.path.basename(tf)}")

    # Load clips
    clips = []
    try:
        for tf in todays_files:
            clip = VideoFileClip(tf)
            clips.append(clip)
            
        if clips:
            final_clip = concatenate_videoclips(clips)
            
            output_filename = f"{today.strftime('%Y_%m_%d')}.mp4"
            output_path = os.path.join(short_dir, output_filename)
            
            print(f"Merging into {output_path}...")
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
