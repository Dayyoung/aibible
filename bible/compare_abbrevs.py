import json

def get_json_abbrevs(filename):
    try:
        with open(filename, 'r', encoding='utf-8-sig') as f:
            data = json.load(f)
            return [book.get('abbrev') for book in data]
    except Exception as e:
        print(f"Error reading {filename}: {e}")
        return []

en_abbrevs = get_json_abbrevs('json/en_kjv.json')
ko_abbrevs = get_json_abbrevs('json/ko_ko.json')

if en_abbrevs == ko_abbrevs:
    print("Abbreviations MATCH exactly.")
else:
    print("Abbreviations DO NOT MATCH.")
    print("EN:", en_abbrevs)
    print("KO:", ko_abbrevs)
