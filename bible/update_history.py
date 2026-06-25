import json
import os

HISTORY_FILE = "video_history.json"

def update_leviticus_11():
    if not os.path.exists(HISTORY_FILE):
        print("Error: History file not found on disk!")
        return

    with open(HISTORY_FILE, 'r') as f:
        data = json.load(f)
    
    found = False
    for entry in data:
        if entry.get('book') == 'Leviticus' and entry.get('chapter') == 11:
            print(f"Found Leviticus 11. Current status: {entry.get('uploaded')}")
            entry['uploaded'] = True
            found = True
            break
    
    if found:
        with open(HISTORY_FILE, 'w') as f:
            json.dump(data, f, indent=2)
        print("Successfully updated Leviticus 11 to uploaded: true")
    else:
        print("Leviticus 11 not found in history.")

if __name__ == "__main__":
    update_leviticus_11()
