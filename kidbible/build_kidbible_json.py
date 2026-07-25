import os
import json
import re

TXT_PATH = "/Users/dayyoung/project/aibible/bible-kids-web.txt"
KIDBIBLE_DIR = "/Users/dayyoung/project/aibible/kidbible"
DATA_DIR = os.path.join(KIDBIBLE_DIR, "data")

os.makedirs(DATA_DIR, exist_ok=True)

BIBLE_BOOKS = [
    # 구약 (39권)
    {"id": "Genesis", "name": "창세기", "testament": "OT", "category": "율법서", "chapters": 50, "icon": "🌱", "bg_theme": "nature"},
    {"id": "Exodus", "name": "출애굽기", "testament": "OT", "category": "율법서", "chapters": 40, "icon": "🌊", "bg_theme": "miracle"},
    {"id": "Leviticus", "name": "레위기", "testament": "OT", "category": "율법서", "chapters": 27, "icon": "🕊️", "bg_theme": "worship"},
    {"id": "Numbers", "name": "민수기", "testament": "OT", "category": "율법서", "chapters": 36, "icon": "⛺", "bg_theme": "nature"},
    {"id": "Deuteronomy", "name": "신명기", "testament": "OT", "category": "율법서", "chapters": 34, "icon": "📜", "bg_theme": "wisdom"},
    {"id": "Joshua", "name": "여호수아", "testament": "OT", "category": "역사서", "chapters": 24, "icon": "⚔️", "bg_theme": "kingdom"},
    {"id": "Judges", "name": "사사기", "testament": "OT", "category": "역사서", "chapters": 21, "icon": "🎺", "bg_theme": "kingdom"},
    {"id": "Ruth", "name": "룻기", "testament": "OT", "category": "역사서", "chapters": 4, "icon": "🌾", "bg_theme": "love"},
    {"id": "1Samuel", "name": "사무엘상", "testament": "OT", "category": "역사서", "chapters": 31, "icon": "👑", "bg_theme": "kingdom"},
    {"id": "2Samuel", "name": "사무엘하", "testament": "OT", "category": "역사서", "chapters": 24, "icon": "🏰", "bg_theme": "kingdom"},
    {"id": "1Kings", "name": "열왕기상", "testament": "OT", "category": "역사서", "chapters": 22, "icon": "🏛️", "bg_theme": "kingdom"},
    {"id": "2Kings", "name": "열왕기하", "testament": "OT", "category": "역사서", "chapters": 25, "icon": "🛡️", "bg_theme": "kingdom"},
    {"id": "1Chronicles", "name": "역대기상", "testament": "OT", "category": "역사서", "chapters": 29, "icon": "📖", "bg_theme": "wisdom"},
    {"id": "2Chronicles", "name": "역대기하", "testament": "OT", "category": "역사서", "chapters": 36, "icon": "🕌", "bg_theme": "wisdom"},
    {"id": "Ezra", "name": "에스라", "testament": "OT", "category": "역사서", "chapters": 10, "icon": "✍️", "bg_theme": "wisdom"},
    {"id": "Nehemiah", "name": "느헤미야", "testament": "OT", "category": "역사서", "chapters": 13, "icon": "🧱", "bg_theme": "kingdom"},
    {"id": "Esther", "name": "에스더", "testament": "OT", "category": "역사서", "chapters": 10, "icon": "👸", "bg_theme": "love"},
    {"id": "Job", "name": "욥기", "testament": "OT", "category": "시가서", "chapters": 42, "icon": "🌤️", "bg_theme": "nature"},
    {"id": "Psalms", "name": "시편", "testament": "OT", "category": "시가서", "chapters": 150, "icon": "🎵", "bg_theme": "worship"},
    {"id": "Proverbs", "name": "잠언", "testament": "OT", "category": "시가서", "chapters": 31, "icon": "💡", "bg_theme": "wisdom"},
    {"id": "Ecclesiastes", "name": "전도서", "testament": "OT", "category": "시가서", "chapters": 12, "icon": "⏳", "bg_theme": "wisdom"},
    {"id": "SongofSolomon", "name": "아가", "testament": "OT", "category": "시가서", "chapters": 8, "icon": "❤️", "bg_theme": "love"},
    {"id": "Isaiah", "name": "이사야", "testament": "OT", "category": "선지서", "chapters": 66, "icon": "🦅", "bg_theme": "miracle"},
    {"id": "Jeremiah", "name": "예레미야", "testament": "OT", "category": "선지서", "chapters": 52, "icon": "💧", "bg_theme": "nature"},
    {"id": "Lamentations", "name": "예레미야 애가", "testament": "OT", "category": "선지서", "chapters": 5, "icon": "🕯️", "bg_theme": "worship"},
    {"id": "Ezekiel", "name": "에스겔", "testament": "OT", "category": "선지서", "chapters": 48, "icon": "🔥", "bg_theme": "miracle"},
    {"id": "Daniel", "name": "다니엘", "testament": "OT", "category": "선지서", "chapters": 12, "icon": "🦁", "bg_theme": "miracle"},
    {"id": "Hosea", "name": "호세아", "testament": "OT", "category": "선지서", "chapters": 14, "icon": "🌻", "bg_theme": "love"},
    {"id": "Joel", "name": "요엘", "testament": "OT", "category": "선지서", "chapters": 3, "icon": "🦗", "bg_theme": "nature"},
    {"id": "Amos", "name": "아모스", "testament": "OT", "category": "선지서", "chapters": 9, "icon": "⚖️", "bg_theme": "wisdom"},
    {"id": "Obadiah", "name": "오바디야", "testament": "OT", "category": "선지서", "chapters": 1, "icon": "🏔️", "bg_theme": "nature"},
    {"id": "Jonah", "name": "요나", "testament": "OT", "category": "선지서", "chapters": 4, "icon": "🐳", "bg_theme": "miracle"},
    {"id": "Micah", "name": "미가", "testament": "OT", "category": "선지서", "chapters": 7, "icon": "⭐", "bg_theme": "love"},
    {"id": "Nahum", "name": "나훔", "testament": "OT", "category": "선지서", "chapters": 3, "icon": "⚡", "bg_theme": "miracle"},
    {"id": "Habakkuk", "name": "하박국", "testament": "OT", "category": "선지서", "chapters": 3, "icon": "🎺", "bg_theme": "worship"},
    {"id": "Zephaniah", "name": "스바냐", "testament": "OT", "category": "선지서", "chapters": 3, "icon": "🌅", "bg_theme": "nature"},
    {"id": "Haggai", "name": "학개", "testament": "OT", "category": "선지서", "chapters": 2, "icon": "🛠️", "bg_theme": "kingdom"},
    {"id": "Zechariah", "name": "스가랴", "testament": "OT", "category": "선지서", "chapters": 14, "icon": "🌿", "bg_theme": "nature"},
    {"id": "Malachi", "name": "말라기", "testament": "OT", "category": "선지서", "chapters": 4, "icon": "☀️", "bg_theme": "love"},

    # 신약 (27권)
    {"id": "Matthew", "name": "마태복음", "testament": "NT", "category": "복음서", "chapters": 28, "icon": "🌟", "bg_theme": "jesus"},
    {"id": "Mark", "name": "마가복음", "testament": "NT", "category": "복음서", "chapters": 16, "icon": "✝️", "bg_theme": "jesus"},
    {"id": "Luke", "name": "누가복음", "testament": "NT", "category": "복음서", "chapters": 24, "icon": "🩺", "bg_theme": "jesus"},
    {"id": "John", "name": "요한복음", "testament": "NT", "category": "복음서", "chapters": 21, "icon": "💡", "bg_theme": "jesus"},
    {"id": "Acts", "name": "사도행전", "testament": "NT", "category": "역사서", "chapters": 28, "icon": "⛵", "bg_theme": "miracle"},
    {"id": "Romans", "name": "로마서", "testament": "NT", "category": "서신서", "chapters": 16, "icon": "💌", "bg_theme": "love"},
    {"id": "1Corinthians", "name": "고린도전서", "testament": "NT", "category": "서신서", "chapters": 16, "icon": "💖", "bg_theme": "love"},
    {"id": "2Corinthians", "name": "고린도후서", "testament": "NT", "category": "서신서", "chapters": 13, "icon": "✉️", "bg_theme": "love"},
    {"id": "Galatians", "name": "갈라디아서", "testament": "NT", "category": "서신서", "chapters": 6, "icon": "🕊️", "bg_theme": "worship"},
    {"id": "Ephesians", "name": "에베소서", "testament": "NT", "category": "서신서", "chapters": 6, "icon": "🛡️", "bg_theme": "worship"},
    {"id": "Philippians", "name": "빌립보서", "testament": "NT", "category": "서신서", "chapters": 4, "icon": "😊", "bg_theme": "love"},
    {"id": "Colossians", "name": "골로새서", "testament": "NT", "category": "서신서", "chapters": 4, "icon": "🌿", "bg_theme": "nature"},
    {"id": "1Thessalonians", "name": "데살로니가전서", "testament": "NT", "category": "서신서", "chapters": 5, "icon": "🔔", "bg_theme": "worship"},
    {"id": "2Thessalonians", "name": "데살로니가후서", "testament": "NT", "category": "서신서", "chapters": 3, "icon": "✨", "bg_theme": "worship"},
    {"id": "1Timothy", "name": "디모데전서", "testament": "NT", "category": "서신서", "chapters": 6, "icon": "📜", "bg_theme": "wisdom"},
    {"id": "2Timothy", "name": "디모데후서", "testament": "NT", "category": "서신서", "chapters": 4, "icon": "🏆", "bg_theme": "wisdom"},
    {"id": "Titus", "name": "디도서", "testament": "NT", "category": "서신서", "chapters": 3, "icon": "⚓", "bg_theme": "wisdom"},
    {"id": "Philemon", "name": "빌레몬서", "testament": "NT", "category": "서신서", "chapters": 1, "icon": "🤝", "bg_theme": "love"},
    {"id": "Hebrews", "name": "히브리서", "testament": "NT", "category": "서신서", "chapters": 13, "icon": "🌈", "bg_theme": "miracle"},
    {"id": "James", "name": "야고보서", "testament": "NT", "category": "서신서", "chapters": 5, "icon": "🌲", "bg_theme": "wisdom"},
    {"id": "1Peter", "name": "베드로전서", "testament": "NT", "category": "서신서", "chapters": 5, "icon": "⚓", "bg_theme": "worship"},
    {"id": "2Peter", "name": "베드로후서", "testament": "NT", "category": "서신서", "chapters": 3, "icon": "🕯️", "bg_theme": "worship"},
    {"id": "1John", "name": "요한일서", "testament": "NT", "category": "서신서", "chapters": 5, "icon": "❤️", "bg_theme": "love"},
    {"id": "2John", "name": "요한이서", "testament": "NT", "category": "서신서", "chapters": 1, "icon": "💌", "bg_theme": "love"},
    {"id": "3John", "name": "요한삼서", "testament": "NT", "category": "서신서", "chapters": 1, "icon": "🤝", "bg_theme": "love"},
    {"id": "Jude", "name": "유다서", "testament": "NT", "category": "서신서", "chapters": 1, "icon": "🛡️", "bg_theme": "worship"},
    {"id": "Revelation", "name": "요한계시록", "testament": "NT", "category": "예언서", "chapters": 22, "icon": "👑", "bg_theme": "miracle"}
]

BOOK_MAP = {b["name"]: b for b in BIBLE_BOOKS}

# High-quality storybook illustration CDN URLs for 1,189 chapters
UNSPLASH_STORYBOOK_GALLERY = [
    "https://images.unsplash.com/photo-1509021436468-8f07ef35a707?auto=format&fit=crop&w=1000&q=80", # Light & Creation
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80", # Sea & Waters
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1000&q=80", # Mountain & Nature
    "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80", # Stars & Sky
    "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1000&q=80", # Forest & Trees
    "https://images.unsplash.com/photo-1511497584788-8767611136f6?auto=format&fit=crop&w=1000&q=80", # Sunrise & Hope
    "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1000&q=80", # Rainbow & Miracle
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80"  # Golden Fields
]

def parse_bible_text():
    with open(TXT_PATH, "r", encoding="utf-8") as f:
        lines = [l.strip() for l in f if l.strip()]

    structured_bible = {}
    current_book = None
    current_chapter = 1
    current_verse = 0

    header_pattern = re.compile(r'^([가-힣\s\d]+?)\s*(\d+)장\s*(\d+)절\.\s*(.*)$')

    for line in lines:
        match = header_pattern.match(line)
        if match:
            book_name = match.group(1).strip()
            ch_num = int(match.group(2))
            v_num = int(match.group(3))
            content = match.group(4).strip()

            if book_name in BOOK_MAP:
                current_book = BOOK_MAP[book_name]["id"]
                current_chapter = ch_num
                current_verse = v_num
            else:
                current_verse += 1

            if current_book:
                if current_book not in structured_bible:
                    structured_bible[current_book] = {}
                if current_chapter not in structured_bible[current_book]:
                    structured_bible[current_book][current_chapter] = []

                structured_bible[current_book][current_chapter].append({
                    "verse": current_verse,
                    "text": content
                })
        else:
            if current_book and current_chapter in structured_bible.get(current_book, {}):
                current_verse += 1
                structured_bible[current_book][current_chapter].append({
                    "verse": current_verse,
                    "text": line
                })

    bible_storybook = {}

    for b_idx, book_info in enumerate(BIBLE_BOOKS):
        b_id = book_info["id"]
        bible_storybook[b_id] = {
            "info": book_info,
            "chapters": {}
        }

        if b_id in structured_bible:
            for ch_num, verses in structured_bible[b_id].items():
                pages = []
                for p_idx, v in enumerate(verses):
                    pages.append({
                        "page_num": p_idx + 1,
                        "verse": v["verse"],
                        "text": v["text"]
                    })
                
                # Assign 100% Reliable High-Quality Storybook CDN URL for all 1,189 chapters!
                gallery_img = UNSPLASH_STORYBOOK_GALLERY[(b_idx + ch_num) % len(UNSPLASH_STORYBOOK_GALLERY)]
                
                bible_storybook[b_id]["chapters"][str(ch_num)] = {
                    "chapter": ch_num,
                    "cover_title": f"{book_info['name']} {ch_num}장 이야기",
                    "chapter_illust_url": gallery_img,
                    "pages": pages
                }

    # Output manifest JSON
    manifest = []
    for b in BIBLE_BOOKS:
        b_id = b["id"]
        ch_data = bible_storybook.get(b_id, {}).get("chapters", {})
        manifest.append({
            "id": b["id"],
            "name": b["name"],
            "testament": b["testament"],
            "category": b["category"],
            "icon": b.get("icon", "📖"),
            "bg_theme": b.get("bg_theme", "nature"),
            "total_chapters": b["chapters"],
            "available_chapters": len(ch_data)
        })

    with open(os.path.join(DATA_DIR, "manifest.json"), "w", encoding="utf-8") as f:
        json.dump(manifest, f, ensure_ascii=False, indent=2)

    with open(os.path.join(DATA_DIR, "kidbible_storybook.json"), "w", encoding="utf-8") as f:
        json.dump(bible_storybook, f, ensure_ascii=False, indent=2)

    print(f"Successfully mapped High-Quality Storybook Gallery CDN URLs in {DATA_DIR}!")

if __name__ == "__main__":
    parse_bible_text()
