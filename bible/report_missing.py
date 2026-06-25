
import json
import os

BIBLE_NAMES_EN = {
    "gn": "Genesis", "ex": "Exodus", "lv": "Leviticus", "nm": "Numbers", "dt": "Deuteronomy",
    "js": "Joshua", "jud": "Judges", "rt": "Ruth", "1sm": "1 Samuel", "2sm": "2 Samuel",
    "1kgs": "1 Kings", "2kgs": "2 Kings", "1ch": "1 Chronicles", "2ch": "2 Chronicles",
    "ezr": "Ezra", "ne": "Nehemiah", "et": "Esther", "job": "Job", "ps": "Psalms",
    "prv": "Proverbs", "ec": "Ecclesiastes", "so": "Song of Solomon", "is": "Isaiah", "jr": "Jeremiah",
    "lm": "Lamentations", "ez": "Ezekiel", "dn": "Daniel", "ho": "Hosea", "jl": "Joel",
    "am": "Amos", "ob": "Obadiah", "jn": "Jonah", "mi": "Micah", "na": "Nahum",
    "hk": "Habakkuk", "zp": "Zephaniah", "hg": "Haggai", "zc": "Zechariah", "ml": "Malachi",
    "mt": "Matthew", "mk": "Mark", "lk": "Luke", "jo": "John",
    "act": "Acts", "rm": "Romans", "1co": "1 Corinthians", "2co": "2 Corinthians",
    "gl": "Galatians", "eph": "Ephesians", "ph": "Philippians", "cl": "Colossians",
    "1ts": "1 Thessalonians", "2ts": "2 Thessalonians", "1tm": "1 Timothy",
    "2tm": "2 Timothy", "tt": "Titus", "phm": "Philemon", "hb": "Hebrews",
    "jm": "James", "1pe": "1 Peter", "2pe": "2 Peter", "1jo": "1 John",
    "2jo": "2 John", "3jo": "3 John", "jd": "Jude", "re": "Revelation"
}

# Fix some abbreviations if they differ in ko_ko.json
# I'll read ko_ko.json to get the exact abbreviations and chapter counts.

def generate_report():
    with open('ko_ko.json', 'r', encoding='utf-8-sig') as f:
        bible_data = json.load(f)
    
    with open('video_history.json', 'r', encoding='utf-8') as f:
        history = json.load(f)
    
    # Map history for quick lookup: (BookName, Chapter) -> uploaded_status
    uploaded_map = {}
    for entry in history:
        book = entry.get('book')
        chapter = entry.get('chapter')
        if book and chapter:
            uploaded_map[(book, chapter)] = entry.get('uploaded', False)
    
    report = []
    total_chapters = 0
    missing_chapters = 0
    
    for book_data in bible_data:
        abbrev = book_data['abbrev']
        chapters = book_data['chapters']
        book_name_en = BIBLE_NAMES_EN.get(abbrev, abbrev)
        
        num_chapters = len(chapters)
        total_chapters += num_chapters
        
        book_missing = []
        for ch in range(1, num_chapters + 1):
            if (book_name_en, ch) not in uploaded_map or not uploaded_map[(book_name_en, ch)]:
                book_missing.append(ch)
                missing_chapters += 1
        
        if book_missing:
            report.append({
                "book": book_name_en,
                "missing": book_missing
            })
            
    print(f"Total Chapters: {total_chapters}")
    print(f"Missing Chapters: {missing_chapters}")
    print("\nMissing Details:")
    for item in report:
        print(f"{item['book']}: {item['missing']}")

if __name__ == "__main__":
    generate_report()
