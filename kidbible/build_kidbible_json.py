import os
import json
import re

TXT_PATH = "/Users/dayyoung/project/aibible/bible-kids-web.txt"
KIDBIBLE_DIR = "/Users/dayyoung/project/aibible/kidbible"
DATA_DIR = os.path.join(KIDBIBLE_DIR, "data")
BOOKS_ASSETS_DIR = os.path.join(KIDBIBLE_DIR, "assets", "books")

os.makedirs(DATA_DIR, exist_ok=True)
os.makedirs(BOOKS_ASSETS_DIR, exist_ok=True)

BIBLE_BOOKS = [
    # 구약 39권 (권별 대표 스토리 키워드 및 고유 일러스트 파일명)
    {"id": "Genesis", "name": "창세기", "testament": "OT", "category": "율법서", "chapters": 50, "icon": "🌱", "story": "창조와 에덴동산 이야기", "illust": "assets/books/Genesis.jpg"},
    {"id": "Exodus", "name": "출애굽기", "testament": "OT", "category": "율법서", "chapters": 40, "icon": "🌊", "story": "홍해의 기적과 광야 이야기", "illust": "assets/books/Exodus.jpg"},
    {"id": "Leviticus", "name": "레위기", "testament": "OT", "category": "율법서", "chapters": 27, "icon": "🕊️", "story": "거룩한 성막과 사랑 이야기", "illust": "assets/books/Leviticus.jpg"},
    {"id": "Numbers", "name": "민수기", "testament": "OT", "category": "율법서", "chapters": 36, "icon": "⛺", "story": "구름기둥과 약속의 땅 이야기", "illust": "assets/books/Numbers.jpg"},
    {"id": "Deuteronomy", "name": "신명기", "testament": "OT", "category": "율법서", "chapters": 34, "icon": "📜", "story": "모세의 사랑의 축복 이야기", "illust": "assets/books/Deuteronomy.jpg"},
    {"id": "Joshua", "name": "여호수아", "testament": "OT", "category": "역사서", "chapters": 24, "icon": "⚔️", "story": "요단강과 여리고성 이야기", "illust": "assets/books/Joshua.jpg"},
    {"id": "Judges", "name": "사사기", "testament": "OT", "category": "역사서", "chapters": 21, "icon": "🎺", "story": "기드온 횃불과 용사 이야기", "illust": "assets/books/Judges.jpg"},
    {"id": "Ruth", "name": "룻기", "testament": "OT", "category": "역사서", "chapters": 4, "icon": "🌾", "story": "따스한 추수밭과 사랑 이야기", "illust": "assets/books/Ruth.jpg"},
    {"id": "1Samuel", "name": "사무엘상", "testament": "OT", "category": "역사서", "chapters": 31, "icon": "👑", "story": "다윗과 골리앗 물맷돌 이야기", "illust": "assets/books/1Samuel.jpg"},
    {"id": "2Samuel", "name": "사무엘하", "testament": "OT", "category": "역사서", "chapters": 24, "icon": "🏰", "story": "다윗 왕과 찬양 이야기", "illust": "assets/books/2Samuel.jpg"},
    {"id": "1Kings", "name": "열왕기상", "testament": "OT", "category": "역사서", "chapters": 22, "icon": "🏛️", "story": "솔로몬의 지혜와 성전 이야기", "illust": "assets/books/1Kings.jpg"},
    {"id": "2Kings", "name": "열왕기하", "testament": "OT", "category": "역사서", "chapters": 25, "icon": "🛡️", "story": "엘리야 불전차와 기적 이야기", "illust": "assets/books/2Kings.jpg"},
    {"id": "1Chronicles", "name": "역대기상", "testament": "OT", "category": "역사서", "chapters": 29, "icon": "📖", "story": "하나님의 역사와 감사 이야기", "illust": "assets/books/1Chronicles.jpg"},
    {"id": "2Chronicles", "name": "역대기하", "testament": "OT", "category": "역사서", "chapters": 36, "icon": "🕌", "story": "성전 기도와 축복 이야기", "illust": "assets/books/2Chronicles.jpg"},
    {"id": "Ezra", "name": "에스라", "testament": "OT", "category": "역사서", "chapters": 10, "icon": "✍️", "story": "성전을 다시 세우는 기쁨 이야기", "illust": "assets/books/Ezra.jpg"},
    {"id": "Nehemiah", "name": "느헤미야", "testament": "OT", "category": "역사서", "chapters": 13, "icon": "🧱", "story": "성벽을 함께 쌓는 기적 이야기", "illust": "assets/books/Nehemiah.jpg"},
    {"id": "Esther", "name": "에스더", "testament": "OT", "category": "역사서", "chapters": 10, "icon": "👸", "story": "용감한 에스더 왕비 이야기", "illust": "assets/books/Esther.jpg"},
    {"id": "Job", "name": "욥기", "testament": "OT", "category": "시가서", "chapters": 42, "icon": "🌤️", "story": "끝까지 믿음을 지킨 욥 이야기", "illust": "assets/books/Job.jpg"},
    {"id": "Psalms", "name": "시편", "testament": "OT", "category": "시가서", "chapters": 150, "icon": "🎵", "story": "여호와는 나의 목자시니 이야기", "illust": "assets/books/Psalms.jpg"},
    {"id": "Proverbs", "name": "잠언", "testament": "OT", "category": "시가서", "chapters": 31, "icon": "💡", "story": "반짝반짝 지혜의 보석 이야기", "illust": "assets/books/Proverbs.jpg"},
    {"id": "Ecclesiastes", "name": "전도서", "testament": "OT", "category": "시가서", "chapters": 12, "icon": "⏳", "story": "아름다운 때와 감사 이야기", "illust": "assets/books/Ecclesiastes.jpg"},
    {"id": "SongofSolomon", "name": "아가", "testament": "OT", "category": "시가서", "chapters": 8, "icon": "❤️", "story": "향기로운 포도원과 사랑 이야기", "illust": "assets/books/SongofSolomon.jpg"},
    {"id": "Isaiah", "name": "이사야", "testament": "OT", "category": "선지서", "chapters": 66, "icon": "🦅", "story": "평화의 왕 메시아 예언 이야기", "illust": "assets/books/Isaiah.jpg"},
    {"id": "Jeremiah", "name": "예레미야", "testament": "OT", "category": "선지서", "chapters": 52, "icon": "💧", "story": "생수의 샘이신 하나님 이야기", "illust": "assets/books/Jeremiah.jpg"},
    {"id": "Lamentations", "name": "예레미야 애가", "testament": "OT", "category": "선지서", "chapters": 5, "icon": "🕯️", "story": "새 아침의 긍휼과 소망 이야기", "illust": "assets/books/Lamentations.jpg"},
    {"id": "Ezekiel", "name": "에스겔", "testament": "OT", "category": "선지서", "chapters": 48, "icon": "🔥", "story": "생기의 바람과 회복 이야기", "illust": "assets/books/Ezekiel.jpg"},
    {"id": "Daniel", "name": "다니엘", "testament": "OT", "category": "선지서", "chapters": 12, "icon": "🦁", "story": "사자굴과 세 친구의 기적 이야기", "illust": "assets/books/Daniel.jpg"},
    {"id": "Hosea", "name": "호세아", "testament": "OT", "category": "선지서", "chapters": 14, "icon": "🌻", "bg_theme": "love", "story": "끝없는 사랑과 회복 이야기", "illust": "assets/books/Hosea.jpg"},
    {"id": "Joel", "name": "요엘", "testament": "OT", "category": "선지서", "chapters": 3, "icon": "🦗", "story": "이른 비와 늦은 비의 축복 이야기", "illust": "assets/books/Joel.jpg"},
    {"id": "Amos", "name": "아모스", "testament": "OT", "category": "선지서", "chapters": 9, "icon": "⚖️", "story": "마르지 않는 정의의 강 이야기", "illust": "assets/books/Amos.jpg"},
    {"id": "Obadiah", "name": "오바디야", "testament": "OT", "category": "선지서", "chapters": 1, "icon": "🏔️", "story": "시온산의 구원 이야기", "illust": "assets/books/Obadiah.jpg"},
    {"id": "Jonah", "name": "요나", "testament": "OT", "category": "선지서", "chapters": 4, "icon": "🐳", "story": "큰 물고기와 니느웨 이야기", "illust": "assets/books/Jonah.jpg"},
    {"id": "Micah", "name": "미가", "testament": "OT", "category": "선지서", "chapters": 7, "icon": "⭐", "story": "베들레헴 작은 마을 이야기", "illust": "assets/books/Micah.jpg"},
    {"id": "Nahum", "name": "나훔", "testament": "OT", "category": "선지서", "chapters": 3, "icon": "⚡", "story": "위로자이신 하나님 이야기", "illust": "assets/books/Nahum.jpg"},
    {"id": "Habakkuk", "name": "하박국", "testament": "OT", "category": "선지서", "chapters": 3, "icon": "🎺", "story": "무화과나무 잎이 말라도 기뻐해 이야기", "illust": "assets/books/Habakkuk.jpg"},
    {"id": "Zephaniah", "name": "스바냐", "testament": "OT", "category": "선지서", "chapters": 3, "icon": "🌅", "story": "기쁨으로 노래하시는 하나님 이야기", "illust": "assets/books/Zephaniah.jpg"},
    {"id": "Haggai", "name": "학개", "testament": "OT", "category": "선지서", "chapters": 2, "icon": "🛠️", "story": "영광스러운 성전 이야기", "illust": "assets/books/Haggai.jpg"},
    {"id": "Zechariah", "name": "스가랴", "testament": "OT", "category": "선지서", "chapters": 14, "icon": "🌿", "story": "나귀 타고 오시는 겸손한 왕 이야기", "illust": "assets/books/Zechariah.jpg"},
    {"id": "Malachi", "name": "말라기", "testament": "OT", "category": "선지서", "chapters": 4, "icon": "☀️", "story": "치료하는 의로운 태양 이야기", "illust": "assets/books/Malachi.jpg"},

    # 신약 27권
    {"id": "Matthew", "name": "마태복음", "testament": "NT", "category": "복음서", "chapters": 28, "icon": "🌟", "story": "아기 예수님과 동방박사 별 이야기", "illust": "assets/books/Matthew.jpg"},
    {"id": "Mark", "name": "마가복음", "testament": "NT", "category": "복음서", "chapters": 16, "icon": "✝️", "story": "풍랑을 잠잠하게 하신 기적 이야기", "illust": "assets/books/Mark.jpg"},
    {"id": "Luke", "name": "누가복음", "testament": "NT", "category": "복음서", "chapters": 24, "icon": "🩺", "story": "선한 사마리아인과 잃어버린 양 이야기", "illust": "assets/books/Luke.jpg"},
    {"id": "John", "name": "요한복음", "testament": "NT", "category": "복음서", "chapters": 21, "icon": "💡", "story": "나는 세상의 빛이요 선한 목자 이야기", "illust": "assets/books/John.jpg"},
    {"id": "Acts", "name": "사도행전", "testament": "NT", "category": "역사서", "chapters": 28, "icon": "⛵", "story": "오순절 성령님과 복음 항해 이야기", "illust": "assets/books/Acts.jpg"},
    {"id": "Romans", "name": "로마서", "testament": "NT", "category": "서신서", "chapters": 16, "icon": "💌", "story": "하나님의 끊을 수 없는 사랑 이야기", "illust": "assets/books/Romans.jpg"},
    {"id": "1Corinthians", "name": "고린도전서", "testament": "NT", "category": "서신서", "chapters": 16, "icon": "💖", "story": "사랑은 오래 참도 온유하며 이야기", "illust": "assets/books/1Corinthians.jpg"},
    {"id": "2Corinthians", "name": "고린도후서", "testament": "NT", "category": "서신서", "chapters": 13, "icon": "✉️", "story": "질그릇에 담긴 보배 이야기", "illust": "assets/books/2Corinthians.jpg"},
    {"id": "Galatians", "name": "갈라디아서", "testament": "NT", "category": "서신서", "chapters": 6, "icon": "🕊️", "story": "성령의 아름다운 9가지 열매 이야기", "illust": "assets/books/Galatians.jpg"},
    {"id": "Ephesians", "name": "에베소서", "testament": "NT", "category": "서신서", "chapters": 6, "icon": "🛡️", "story": "하나님의 전신갑주와 방패 이야기", "illust": "assets/books/Ephesians.jpg"},
    {"id": "Philippians", "name": "빌립보서", "testament": "NT", "category": "서신서", "chapters": 4, "icon": "😊", "story": "항상 기뻐하라 내가 다시 말하노니 이야기", "illust": "assets/books/Philippians.jpg"},
    {"id": "Colossians", "name": "골로새서", "testament": "NT", "category": "서신서", "chapters": 4, "icon": "🌿", "story": "믿음에 뿌리를 박으며 늘 감사해 이야기", "illust": "assets/books/Colossians.jpg"},
    {"id": "1Thessalonians", "name": "데살로니가전서", "testament": "NT", "category": "서신서", "chapters": 5, "icon": "🔔", "story": "쉬지 말고 기도하라 감사하라 이야기", "illust": "assets/books/1Thessalonians.jpg"},
    {"id": "2Thessalonians", "name": "데살로니가후서", "testament": "NT", "category": "서신서", "chapters": 3, "icon": "✨", "story": "평강의 주님이 함께하시는 이야기", "illust": "assets/books/2Thessalonians.jpg"},
    {"id": "1Timothy", "name": "디모데전서", "testament": "NT", "category": "서신서", "chapters": 6, "icon": "📜", "story": "믿음의 선한 싸움을 싸우라 이야기", "illust": "assets/books/1Timothy.jpg"},
    {"id": "2Timothy", "name": "디모데후서", "testament": "NT", "category": "서신서", "chapters": 4, "icon": "🏆", "story": "의로운 면류관이 예비된 이야기", "illust": "assets/books/2Timothy.jpg"},
    {"id": "Titus", "name": "디도서", "testament": "NT", "category": "서신서", "chapters": 3, "icon": "⚓", "story": "선한 일을 힘쓰는 소망 이야기", "illust": "assets/books/Titus.jpg"},
    {"id": "Philemon", "name": "빌레몬서", "testament": "NT", "category": "서신서", "chapters": 1, "icon": "🤝", "story": "용서와 용납의 아름다운 이야기", "illust": "assets/books/Philemon.jpg"},
    {"id": "Hebrews", "name": "히브리서", "testament": "NT", "category": "서신서", "chapters": 13, "icon": "🌈", "story": "믿음은 바라는 것들의 실상이요 이야기", "illust": "assets/books/Hebrews.jpg"},
    {"id": "James", "name": "야고보서", "testament": "NT", "category": "서신서", "chapters": 5, "icon": "🌲", "story": "행함이 있는 실천하는 믿음 이야기", "illust": "assets/books/James.jpg"},
    {"id": "1Peter", "name": "베드로전서", "testament": "NT", "category": "서신서", "chapters": 5, "icon": "⚓", "story": "산 돌이신 예수님과 왕 같은 제사장 이야기", "illust": "assets/books/1Peter.jpg"},
    {"id": "2Peter", "name": "베드로후서", "testament": "NT", "category": "서신서", "chapters": 3, "icon": "🕯️", "story": "샛별이 마음에 떠오르기까지 이야기", "illust": "assets/books/2Peter.jpg"},
    {"id": "1John", "name": "요한일서", "testament": "NT", "category": "서신서", "chapters": 5, "icon": "❤️", "story": "하나님은 사랑이심이라 이야기", "illust": "assets/books/1John.jpg"},
    {"id": "2John", "name": "요한이서", "testament": "NT", "category": "서신서", "chapters": 1, "icon": "💌", "story": "진리와 사랑 안에서 행하는 이야기", "illust": "assets/books/2John.jpg"},
    {"id": "3John", "name": "요한삼서", "testament": "NT", "category": "서신서", "chapters": 1, "icon": "🤝", "story": "영혼이 잘됨 같이 범사에 강건해 이야기", "illust": "assets/books/3John.jpg"},
    {"id": "Jude", "name": "유다서", "testament": "NT", "category": "서신서", "chapters": 1, "icon": "🛡️", "story": "지극히 거룩한 믿음 위에 세우라 이야기", "illust": "assets/books/Jude.jpg"},
    {"id": "Revelation", "name": "요한계시록", "testament": "NT", "category": "예언서", "chapters": 22, "icon": "👑", "story": "새 하늘과 새 땅 새 예루살렘 이야기", "illust": "assets/books/Revelation.jpg"}
]

BOOK_MAP = {b["name"]: b for b in BIBLE_BOOKS}

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
                
                # 66 Unique Storybook Illustration Assets
                book_illust_path = f"assets/books/{b_id}.jpg"
                
                bible_storybook[b_id]["chapters"][str(ch_num)] = {
                    "chapter": ch_num,
                    "cover_title": f"{book_info['name']} {ch_num}장 이야기",
                    "chapter_illust_url": book_illust_path,
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
            "story": b.get("story", "어린이 성경 이야기"),
            "illust": f"assets/books/{b['id']}.jpg",
            "bg_theme": b.get("bg_theme", "nature"),
            "total_chapters": b["chapters"],
            "available_chapters": len(ch_data)
        })

    with open(os.path.join(DATA_DIR, "manifest.json"), "w", encoding="utf-8") as f:
        json.dump(manifest, f, ensure_ascii=False, indent=2)

    with open(os.path.join(DATA_DIR, "kidbible_storybook.json"), "w", encoding="utf-8") as f:
        json.dump(bible_storybook, f, ensure_ascii=False, indent=2)

    print(f"Successfully generated 66 Unique Storybook Illustrations mapping in {DATA_DIR}!")

if __name__ == "__main__":
    parse_bible_text()
