import json
import os
import re

BIBLE_MAPPING = {
    'micah': '미가',
    'nahum': '나훔',
    'habakkuk': '하박국',
    'zephaniah': '스바냐',
    'haggai': '학개',
    'zechariah': '스가랴',
    'malachi': '말라기',
    'matthew': '마태복음',
    'mark': '마가복음',
    'luke': '누가복음',
    'john': '요한복음',
    'acts': '사도행전'
}

def extract_chapters(bible_key, start_ch, end_ch, src_dir='/Users/dayyoung/project/aibible/chrome_extension/json'):
    file_name = f"{bible_key}.json"
    file_path = os.path.join(src_dir, file_name)
    if not os.path.exists(file_path):
        print(f"Error: {file_path} does not exist.")
        return None
        
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    output = []
    current_chapter = None
    
    for item in data:
        item_type = item.get('type')
        if item_type in ['paragraph text', 'line text']:
            ch = item.get('chapterNumber')
            vs = item.get('verseNumber')
            val = item.get('value', '').strip()
            
            if not val:
                continue
                
            if start_ch <= ch <= end_ch:
                if ch != current_chapter:
                    current_chapter = ch
                    output.append(f"\n=== CHAPTER {current_chapter} ===")
                output.append(f"[{ch}:{vs}] {val}")
                
    return "\n".join(output)

def save_extracted(bible_key, start_ch, end_ch, dest_path):
    text = extract_chapters(bible_key, start_ch, end_ch)
    if text:
        os.makedirs(os.path.dirname(dest_path), exist_ok=True)
        with open(dest_path, 'w', encoding='utf-8') as f:
            f.write(text)
        print(f"Extracted {bible_key} Ch {start_ch}-{end_ch} to {dest_path}")
        return True
    return False

def validate_json_file(file_path, bible_key):
    if not os.path.exists(file_path):
        print(f"Error: File {file_path} does not exist.")
        return False
        
    kor_name = BIBLE_MAPPING.get(bible_key)
    if not kor_name:
        print(f"Error: Unknown bible key '{bible_key}'")
        return False
        
    with open(file_path, 'r', encoding='utf-8') as f:
        try:
            data = json.load(f)
        except Exception as e:
            print(f"JSON Decode Error in {file_path}: {e}")
            return False
            
    if not isinstance(data, list):
        print(f"Error: Root element is not a list in {file_path}")
        return False
        
    errors = []
    last_chapter = None
    seen_chapters = set()
    
    # 한국어 어미 체크 정규식 (~해요, ~했어요, ~했답니다, ~했죠, ~단다, ~란다, ~바랍니다 등 존댓말/친근한 말투)
    # 아이들을 위한 구어체 어미들
    allowed_endings = re.compile(r'(요|니다|단다|란다|죠|군요|네요|해요|과요|나와요|가요|마요|거예요|의요|때문이죠|때문이에요|줄게요|할게요|대요|이래요|돼요|대요|네요|마세요|할까요|봐요)\.?$')
    
    for i, item in enumerate(data):
        item_type = item.get('type')
        if not item_type:
            errors.append(f"Index {i}: Missing 'type'")
            continue
            
        # 원본 구조 유지를 위해 paragraph start/end 등도 허용할 수 있지만,
        # value가 있는 텍스트 타입에 대해 검증
        if item_type in ['paragraph text', 'line text']:
            ch = item.get('chapterNumber')
            vs = item.get('verseNumber')
            val = item.get('value')
            
            if ch is None or vs is None or val is None:
                errors.append(f"Index {i}: chapterNumber, verseNumber, or value is missing")
                continue
                
            val = val.strip()
            if not val:
                errors.append(f"Index {i} ({ch}:{vs}): value is empty")
                continue
                
            # 챕터의 첫 구절(시작 절) 확인.
            # 장이 새로 시작될 때 (해당 장에서 처음 나오는 텍스트 구절)
            if ch not in seen_chapters:
                seen_chapters.add(ch)
                # 시작 절의 번호가 1이 아닐 수도 있으므로 (요약/압축으로 인해), 해당 장의 첫 텍스트 구절이 시작 부분임.
                prefix = f"{kor_name} {ch}장 {vs}절."
                if not val.startswith(prefix):
                    errors.append(f"Index {i} (Chapter {ch} Verse {vs} - Chapter Start): Expected prefix '{prefix}', but got '{val[:40]}...'")
            
            # 어미 체크 (존댓말 구어체 검증)
            # 마침표나 물음표, 느낌표 제거 후 마지막 글자 확인
            clean_val = re.sub(r'[\.\?\!\s]+$', '', val)
            if clean_val:
                last_char = clean_val[-1]
                # 간단히 '요', '다', '죠', '다', '가', '마', '요', '까' 등으로 끝나는지 검사
                if last_char not in ['요', '다', '죠', '아', '어', '래', '대', '해', '까', '마', '라', '체', '이', '구', '네', '가', '지', '마']:
                    # 좀 더 유연하게, 대화체나 구어체 문체인지 경고 수준으로 표시
                    print(f"Warning: Index {i} ({ch}:{vs}) may not end with child-friendly polite ending: '{val[-20:]}'")

    if errors:
        print(f"Validation failed with {len(errors)} errors:")
        for err in errors[:15]:
            print(err)
        if len(errors) > 15:
            print(f"... and {len(errors) - 15} more errors.")
        return False
        
    print(f"Validation passed for {file_path}! Verified {len(seen_chapters)} chapters.")
    return True

if __name__ == '__main__':
    import sys
    if len(sys.argv) > 1:
        cmd = sys.argv[1]
        if cmd == 'extract' and len(sys.argv) >= 5:
            save_extracted(sys.argv[2], int(sys.argv[3]), int(sys.argv[4]), sys.argv[5])
        elif cmd == 'validate' and len(sys.argv) >= 4:
            validate_json_file(sys.argv[3], sys.argv[2])
