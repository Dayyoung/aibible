import json

# Mapping of English Names to Abbreviations used in index.html
NAME_TO_ABBREV = {
    "Genesis": "gn", "Exodus": "ex", "Leviticus": "lv", "Numbers": "nm", "Deuteronomy": "dt",
    "Joshua": "js", "Judges": "jud", "Ruth": "rt", "1 Samuel": "1sm", "2 Samuel": "2sm",
    "1 Kings": "1kgs", "2 Kings": "2kgs", "1 Chronicles": "1ch", "2 Chronicles": "2ch",
    "Ezra": "ezr", "Nehemiah": "ne", "Esther": "et", "Job": "job", "Psalms": "ps",
    "Proverbs": "prv", "Ecclesiastes": "ec", "Song of Songs": "so", "Isaiah": "is", "Jeremiah": "jr",
    "Lamentations": "lm", "Ezekiel": "ez", "Daniel": "dn", "Hosea": "ho", "Joel": "jl",
    "Amos": "am", "Obadiah": "ob", "Jonah": "jn", "Micah": "mi", "Nahum": "na",
    "Habakkuk": "hk", "Zephaniah": "zp", "Haggai": "hg", "Zechariah": "zc", "Malachi": "ml",
    "Matthew": "mt", "Mark": "mk", "Luke": "lk", "John": "jo",
    "Acts": "act", "Romans": "rm", "1 Corinthians": "1co", "2 Corinthians": "2co",
    "Galatians": "gl", "Ephesians": "eph", "Philippians": "ph", "Colossians": "cl",
    "1 Thessalonians": "1ts", "2 Thessalonians": "2ts", "1 Timothy": "1tm", "2 Timothy": "2tm",
    "Titus": "tt", "Philemon": "phm", "Hebrews": "hb", "James": "jm",
    "1 Peter": "1pe", "2 Peter": "2pe", "1 John": "1jo", "2 John": "2jo", "3 John": "3 John",
    "Jude": "jd", "Revelation": "re"
}

try:
    with open("video_history.json", "r", encoding="utf-8") as f:
        history = json.load(f)
    
    mapping = {}
    for item in history:
        book_name = item.get("book")
        chapter = item.get("chapter")
        video_id = item.get("video_id")
        
        if book_name and chapter and video_id:
            abbrev = NAME_TO_ABBREV.get(book_name)
            if abbrev:
                # index.html uses 0-based index for chapters in some places, 
                # but the query params use 1-based.
                # The state.currentChapterIndex is 0-based.
                # Key: "gn_0" (Genesis Chapter 1)
                key = f"{abbrev}_{chapter-1}"
                mapping[key] = video_id

    print("const YOUTUBE_VIDEOS = " + json.dumps(mapping, indent=4) + ";")
except Exception as e:
    print(f"Error: {e}")
