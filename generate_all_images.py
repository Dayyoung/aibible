from nanobanana_gen import generate_image_rest
import os
import time
import json
import re

# Load Bible Data
JSON_PATH = "json/en_kjv.json"
with open(JSON_PATH, 'r', encoding='utf-8-sig') as f:
    bible_data = json.load(f)

# Find Genesis
genesis = next((b for b in bible_data if b['abbrev'] == 'gn'), None)
if not genesis:
    print("Genesis data not found.")
    exit(1)

# Ensure directory
os.makedirs("images/genesis", exist_ok=True)

# Generate for Chapters 11 to 50
for i in range(11, 51):
    output_file = f"images/genesis/ch{i}.png"
    
    # Get chapter text (index i-1)
    # Chapter 11 is index 10.
    if i-1 < len(genesis['chapters']):
        chapter_verses = genesis['chapters'][i-1]
        # Combine verses to form a narrative summary
        # Clean text
        full_text = " ".join([str(v).replace("&#x27;", "'").replace("&quot;", '"') for v in chapter_verses])
        # Truncate to first 800 chars to avoid prompt limit but catch main context
        summary_text = full_text[:800] + "..."
    else:
        summary_text = f"Genesis Chapter {i}"

    # New Prompt Strategy
    prompt = (
        f"A dramatic biblical oil painting in the High Renaissance style of Michelangelo. "
        f"Depict the scene described here: \"{summary_text}\". "
        f"Focus on the specific narrative details. "
        f"Do NOT reuse the composition of 'The Creation of Adam'. "
        f"Avoid touching fingers pose. Make the scene unique to this story."
    )
    
    max_retries = 3
    for attempt in range(max_retries):
        # Remove existing to verify new generation
        if os.path.exists(output_file):
             try: os.remove(output_file)
             except: pass
        
        print(f"--- Generating Ch {i} (Attempt {attempt+1}) ---")
        try:
            generate_image_rest(prompt, output_file)
        except Exception as e:
            print(f"Error calling gen: {e}")

        if os.path.exists(output_file) and os.path.getsize(output_file) > 0:
            print(f"Ch {i} Success.")
            break
        else:
            print(f"Ch {i} Failed or Rate Limited. Waiting 30s...")
            time.sleep(30)
            
    time.sleep(10) # Base delay
