import os
import json
import re

TXT_PATH = "/Users/dayyoung/project/aibible/bible-kids-web.txt"
KIDBIBLE_DIR = "/Users/dayyoung/project/aibible/kidbible"
DATA_DIR = os.path.join(KIDBIBLE_DIR, "data")

os.makedirs(DATA_DIR, exist_ok=True)

BIBLE_BOOKS = [
    # 구약 (39권)
    {"id": "Genesis", "name": "창세기", "testament": "OT", "category": "율법서", "chapters": 50, "icon": "🌱"},
    {"id": "Exodus", "name": "출애굽기", "testament": "OT", "category": "율법서", "chapters": 40, "icon": "🌊"},
    {"id": "Leviticus", "name": "레위기", "testament": "OT", "category": "율법서", "chapters": 27, "icon": "🕊️"},
    {"id": "Numbers", "name": "민수기", "testament": "OT", "category": "율법서", "chapters": 36, "icon": "⛺"},
    {"id": "Deuteronomy", "name": "신명기", "testament": "OT", "category": "율법서", "chapters": 34, "icon": "📜"},
    {"id": "Joshua", "name": "여호수아", "testament": "OT", "category": "역사서", "chapters": 24, "icon": "⚔️"},
    {"id": "Judges", "name": "사사기", "testament": "OT", "category": "역사서", "chapters": 21, "icon": "🎺"},
    {"id": "Ruth", "name": "룻기", "testament": "OT", "category": "역사서", "chapters": 4, "icon": "🌾"},
    {"id": "1Samuel", "name": "사무엘상", "testament": "OT", "category": "역사서", "chapters": 31, "icon": "👑"},
    {"id": "2Samuel", "name": "사무엘하", "testament": "OT", "category": "역사서", "chapters": 24, "icon": "🏰"},
    {"id": "1Kings", "name": "열왕기상", "testament": "OT", "category": "역사서", "chapters": 22, "icon": "🏛️"},
    {"id": "2Kings", "name": "열왕기하", "testament": "OT", "category": "역사서", "chapters": 25, "icon": "🛡️"},
    {"id": "1Chronicles", "name": "역대기상", "testament": "OT", "category": "역사서", "chapters": 29, "icon": "📖"},
    {"id": "2Chronicles", "name": "역대기하", "testament": "OT", "category": "역사서", "chapters": 36, "icon": "🕌"},
    {"id": "Ezra", "name": "에스라", "testament": "OT", "category": "역사서", "chapters": 10, "icon": "✍️"},
    {"id": "Nehemiah", "name": "느헤미야", "testament": "OT", "category": "역사서", "chapters": 13, "icon": "🧱"},
    {"id": "Esther", "name": "에스더", "testament": "OT", "category": "역사서", "chapters": 10, "icon": "👸"},
    {"id": "Job", "name": "욥기", "testament": "OT", "category": "시가서", "chapters": 42, "icon": "🌤️"},
    {"id": "Psalms", "name": "시편", "testament": "OT", "category": "시가서", "chapters": 150, "icon": "🎵"},
    {"id": "Proverbs", "name": "잠언", "testament": "OT", "category": "시가서", "chapters": 31, "icon": "💡"},
    {"id": "Ecclesiastes", "name": "전도서", "testament": "OT", "category": "시가서", "chapters": 12, "icon": "⏳"},
    {"id": "SongofSolomon", "name": "아가", "testament": "OT", "category": "시가서", "chapters": 8, "icon": "❤️"},
    {"id": "Isaiah", "name": "이사야", "testament": "OT", "category": "선지서", "chapters": 66, "icon": "🦅"},
    {"id": "Jeremiah", "name": "예레미야", "testament": "OT", "category": "선지서", "chapters": 52, "icon": "💧"},
    {"id": "Lamentations", "name": "예레미야 애가", "testament": "OT", "category": "선지서", "chapters": 5, "icon": "🕯️"},
    {"id": "Ezekiel", "name": "에스겔", "testament": "OT", "category": "선지서", "chapters": 48, "icon": "🔥"},
    {"id": "Daniel", "name": "다니엘", "testament": "OT", "category": "선지서", "chapters": 12, "icon": "🦁"},
    {"id": "Hosea", "name": "호세아", "testament": "OT", "category": "선지서", "chapters": 14, "icon": "🌻"},
    {"id": "Joel", "name": "요엘", "testament": "OT", "category": "선지서", "chapters": 3, "icon": "🦗"},
    {"id": "Amos", "name": "아모스", "testament": "OT", "category": "선지서", "chapters": 9, "icon": "⚖️"},
    {"id": "Obadiah", "name": "오바디야", "testament": "OT", "category": "선지서", "chapters": 1, "icon": "🏔️"},
    {"id": "Jonah", "name": "요나", "testament": "OT", "category": "선지서", "chapters": 4, "icon": "🐳"},
    {"id": "Micah", "name": "미가", "testament": "OT", "category": "선지서", "chapters": 7, "icon": "⭐"},
    {"id": "Nahum", "name": "나훔", "testament": "OT", "category": "선지서", "chapters": 3, "icon": "⚡"},
    {"id": "Habakkuk", "name": "하박국", "testament": "OT", "category": "선지서", "chapters": 3, "icon": "🎺"},
    {"id": "Zephaniah", "name": "스바냐", "testament": "OT", "category": "선지서", "chapters": 3, "icon": "🌅"},
    {"id": "Haggai", "name": "학개", "testament": "OT", "category": "선지서", "chapters": 2, "icon": "🛠️"},
    {"id": "Zechariah", "name": "스가랴", "testament": "OT", "category": "선지서", "chapters": 14, "icon": "🌿"},
    {"id": "Malachi", "name": "말라기", "testament": "OT", "category": "선지서", "chapters": 4, "icon": "☀️"},

    # 신약 (27권)
    {"id": "Matthew", "name": "마태복음", "testament": "NT", "category": "복음서", "chapters": 28, "icon": "🌟"},
    {"id": "Mark", "name": "마가복음", "testament": "NT", "category": "복음서", "chapters": 16, "icon": "✝️"},
    {"id": "Luke", "name": "누가복음", "testament": "NT", "category": "복음서", "chapters": 24, "icon": "🩺"},
    {"id": "John", "name": "요한복음", "testament": "NT", "category": "복음서", "chapters": 21, "icon": "💡"},
    {"id": "Acts", "name": "사도행전", "testament": "NT", "category": "역사서", "chapters": 28, "icon": "⛵"},
    {"id": "Romans", "name": "로마서", "testament": "NT", "category": "서신서", "chapters": 16, "icon": "💌"},
    {"id": "1Corinthians", "name": "고린도전서", "testament": "NT", "category": "서신서", "chapters": 16, "icon": "💖"},
    {"id": "2Corinthians", "name": "고린도후서", "testament": "NT", "category": "서신서", "chapters": 13, "icon": "✉️"},
    {"id": "Galatians", "name": "갈라디아서", "testament": "NT", "category": "서신서", "chapters": 6, "icon": "🕊️"},
    {"id": "Ephesians", "name": "에베소서", "testament": "NT", "category": "서신서", "chapters": 6, "icon": "🛡️"},
    {"id": "Philippians", "name": "빌립보서", "testament": "NT", "category": "서신서", "chapters": 4, "icon": "😊"},
    {"id": "Colossians", "name": "골로새서", "testament": "NT", "category": "서신서", "chapters": 4, "icon": "🌿"},
    {"id": "1Thessalonians", "name": "데살로니가전서", "testament": "NT", "category": "서신서", "chapters": 5, "icon": "🔔"},
    {"id": "2Thessalonians", "name": "데살로니가후서", "testament": "NT", "category": "서신서", "chapters": 3, "icon": "✨"},
    {"id": "1Timothy", "name": "디모데전서", "testament": "NT", "category": "서신서", "chapters": 6, "icon": "📜"},
    {"id": "2Timothy", "name": "디모데후서", "testament": "NT", "category": "서신서", "chapters": 4, "icon": "🏆"},
    {"id": "Titus", "name": "디도서", "testament": "NT", "category": "서신서", "chapters": 3, "icon": "⚓"},
    {"id": "Philemon", "name": "빌레몬서", "testament": "NT", "category": "서신서", "chapters": 1, "icon": "🤝"},
    {"id": "Hebrews", "name": "히브리서", "testament": "NT", "category": "서신서", "chapters": 13, "icon": "🌈"},
    {"id": "James", "name": "야고보서", "testament": "NT", "category": "서신서", "chapters": 5, "icon": "🌲"},
    {"id": "1Peter", "name": "베드로전서", "testament": "NT", "category": "서신서", "chapters": 5, "icon": "⚓"},
    {"id": "2Peter", "name": "베드로후서", "testament": "NT", "category": "서신서", "chapters": 3, "icon": "🕯️"},
    {"id": "1John", "name": "요한일서", "testament": "NT", "category": "서신서", "chapters": 5, "icon": "❤️"},
    {"id": "2John", "name": "요한이서", "testament": "NT", "category": "서신서", "chapters": 1, "icon": "💌"},
    {"id": "3John", "name": "요한삼서", "testament": "NT", "category": "서신서", "chapters": 1, "icon": "🤝"},
    {"id": "Jude", "name": "유다서", "testament": "NT", "category": "서신서", "chapters": 1, "icon": "🛡️"},
    {"id": "Revelation", "name": "요한계시록", "testament": "NT", "category": "예언서", "chapters": 22, "icon": "👑"}
]

# Map Korean book name to Book Info
BOOK_MAP = {b["name"]: b for b in BIBLE_BOOKS}

def parse_bible_text():
    with open(TXT_PATH, "r", encoding="utf-8") as f:
        lines = [l.strip() for l in f if l.strip()]

    structured_bible = {}
    current_book = None
    current_chapter = 1

    # Pattern matching like "창세기 1장 1절. ..." or "시편 119장 105절. ..."
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

            if current_book:
                if current_book not in structured_bible:
                    structured_bible[current_book] = {}
                if current_chapter not in structured_bible[current_book]:
                    structured_bible[current_book][current_chapter] = []

                structured_bible[current_book][current_chapter].append({
                    "verse": v_num,
                    "text": content
                })
        else:
            # Continuation line for current book & chapter
            if current_book and current_chapter in structured_bible.get(current_book, {}):
                current_ch_verses = structured_bible[current_book][current_chapter]
                if current_ch_verses:
                    current_ch_verses[-1]["text"] += " " + line
                else:
                    current_ch_verses.append({"verse": 1, "text": line})

    # Chunk chapters into Storybook Pages (2-3 verses per storybook page)
    bible_storybook = {}

    for book_info in BIBLE_BOOKS:
        b_id = book_info["id"]
        bible_storybook[b_id] = {
            "info": book_info,
            "chapters": {}
        }

        if b_id in structured_bible:
            for ch_num, verses in structured_bible[b_id].items():
                pages = []
                chunk = []
                chunk_char_count = 0

                for v in verses:
                    chunk.append(v)
                    chunk_char_count += len(v["text"])

                    # If page chunk exceeds 220 chars or contains 3 verses, seal the storybook page
                    if chunk_char_count >= 200 or len(chunk) >= 3:
                        pages.append({
                            "page_num": len(pages) + 1,
                            "verses": chunk,
                            "full_text": " ".join([item["text"] for item in chunk]),
                            "start_verse": chunk[0]["verse"],
                            "end_verse": chunk[-1]["verse"]
                        })
                        chunk = []
                        chunk_char_count = 0

                if chunk:
                    pages.append({
                        "page_num": len(pages) + 1,
                        "verses": chunk,
                        "full_text": " ".join([item["text"] for item in chunk]),
                        "start_verse": chunk[0]["verse"],
                        "end_verse": chunk[-1]["verse"]
                    })

                bible_storybook[b_id]["chapters"][str(ch_num)] = pages

    # Output manifest JSON (metadata for Table of Contents)
    manifest = []
    for b in BIBLE_BOOKS:
        b_id = b["id"]
        ch_data = bible_storybook.get(b_id, {}).get("chapters", {})
        manifest.append({
            "id": b["id"],
            "name": b["name"],
            "testament": b["testament"],
            "category": b["category"],
            "icon": b["icon"],
            "total_chapters": b["chapters"],
            "available_chapters": len(ch_data)
        })

    with open(os.path.join(DATA_DIR, "manifest.json"), "w", encoding="utf-8") as f:
        json.dump(manifest, f, ensure_ascii=False, indent=2)

    with open(os.path.join(DATA_DIR, "kidbible_storybook.json"), "w", encoding="utf-8") as f:
        json.dump(bible_storybook, f, ensure_ascii=False, indent=2)

    print(f"Successfully generated KidBible storybook JSON data in {DATA_DIR}!")

if __name__ == "__main__":
    parse_bible_text()
