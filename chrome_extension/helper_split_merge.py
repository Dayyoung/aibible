import os
import json

TEMP_DIR = "/Users/dayyoung/project/aibible/chrome_extension/forkid_temp"
OUTPUT_DIR = "/Users/dayyoung/project/aibible/chrome_extension/forkid"
INPUT_DIR = "/Users/dayyoung/project/aibible/chrome_extension/json"

os.makedirs(TEMP_DIR, exist_ok=True)
os.makedirs(OUTPUT_DIR, exist_ok=True)

def split_bible(filename, chapters_per_chunk=10):
    input_path = os.path.join(INPUT_DIR, filename)
    if not os.path.exists(input_path):
        print(f"Error: {input_path} not found.")
        return []

    with open(input_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    # Group items by chapter
    chapters = {}
    current_chapter = None
    
    # We will preserve paragraph start/end markers in context, but to split cleanly,
    # we can associate them with the nearest chapter.
    # A simple way: track the active chapter number. 
    # If an item doesn't have chapterNumber (like paragraph start/end), 
    # we attribute it to the current active chapter.
    active_chapter = 1
    for item in data:
        if 'chapterNumber' in item:
            active_chapter = item['chapterNumber']
        
        if active_chapter not in chapters:
            chapters[active_chapter] = []
        chapters[active_chapter].append(item)

    sorted_chapters = sorted(chapters.keys())
    chunks = []
    
    for i in range(0, len(sorted_chapters), chapters_per_chunk):
        chunk_chaps = sorted_chapters[i:i+chapters_per_chunk]
        chunk_data = []
        for ch in chunk_chaps:
            chunk_data.extend(chapters[ch])
        
        start_ch = chunk_chaps[0]
        end_ch = chunk_chaps[-1]
        
        base_name = os.path.splitext(filename)[0]
        chunk_filename = f"{base_name}_ch_{start_ch}_{end_ch}.json"
        chunk_path = os.path.join(TEMP_DIR, chunk_filename)
        
        with open(chunk_path, 'w', encoding='utf-8') as out_f:
            json.dump(chunk_data, out_f, ensure_ascii=False, indent=4)
        
        chunks.append({
            "filename": chunk_filename,
            "start": start_ch,
            "end": end_ch,
            "path": chunk_path
        })
        print(f"Split: {chunk_filename} (Chapters {start_ch} to {end_ch})")
        
    return chunks

def merge_bible(filename, chunk_filenames):
    merged_data = []
    
    for chunk_name in chunk_filenames:
        # Check both TEMP_DIR and OUTPUT_DIR
        chunk_path = os.path.join(TEMP_DIR, chunk_name)
        if not os.path.exists(chunk_path):
            chunk_path = os.path.join(OUTPUT_DIR, chunk_name)
            if not os.path.exists(chunk_path):
                print(f"Warning: Chunk file {chunk_name} not found. Skipping.")
                continue
                
        with open(chunk_path, 'r', encoding='utf-8') as f:
            try:
                chunk_data = json.load(f)
                merged_data.extend(chunk_data)
            except Exception as e:
                print(f"Error reading {chunk_path}: {e}")
                
    output_path = os.path.join(OUTPUT_DIR, filename)
    with open(output_path, 'w', encoding='utf-8') as out_f:
        json.dump(merged_data, out_f, ensure_ascii=False, indent=4)
    print(f"Merged into: {output_path}")

if __name__ == "__main__":
    import sys
    if len(sys.argv) < 3:
        print("Usage: python helper_split_merge.py split <filename> [chapters_per_chunk]")
        print("       python helper_split_merge.py merge <filename> <chunk1> <chunk2> ...")
        sys.exit(1)
        
    action = sys.argv[1]
    if action == "split":
        fn = sys.argv[2]
        cpp = int(sys.argv[3]) if len(sys.argv) > 3 else 10
        split_bible(fn, cpp)
    elif action == "merge":
        fn = sys.argv[2]
        chunks = sys.argv[3:]
        merge_bible(fn, chunks)
