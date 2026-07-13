import json
import os
import re

def get_bible_mapping():
    return {
        'genesis': '창세기',
        'exodus': '출애굽기',
        'leviticus': '레위기',
        'numbers': '민수기',
        'deuteronomy': '신명기',
        'joshua': '여호수아',
        'judges': '사사기',
        'ruth': '룻기',
        '1samuel': '사무엘상',
        '2samuel': '사무엘하',
        '1kings': '열왕기상',
        '2kings': '열왕기하'
    }

def read_chapters(file_name, start_chapter, end_chapter, src_dir='/Users/dayyoung/project/aibible/chrome_extension/json'):
    """
    원본 JSON에서 특정 장 범위의 텍스트를 사람이 읽기 좋은 포맷으로 추출하여 반환합니다.
    """
    file_path = os.path.join(src_dir, file_name)
    if not os.path.exists(file_path):
        print(f"Error: {file_path} does not exist.")
        return None
    
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    output = []
    current_chapter = None
    
    for item in data:
        if item.get('type') == 'paragraph text':
            ch = item.get('chapterNumber')
            vs = item.get('verseNumber')
            val = item.get('value', '').strip()
            
            if start_chapter <= ch <= end_chapter:
                if ch != current_chapter:
                    current_chapter = ch
                    output.append(f"\n=== CHAPTER {current_chapter} ===")
                output.append(f"[{ch}:{vs}] {val}")
                
    return "\n".join(output)

def save_extracted_text(file_name, start_chapter, end_chapter, output_txt_path, src_dir='/Users/dayyoung/project/aibible/chrome_extension/json'):
    """
    추출된 텍스트를 파일로 저장합니다. 서브 에이전트가 이를 view_file로 읽어서 요약하도록 돕습니다.
    """
    text = read_chapters(file_name, start_chapter, end_chapter, src_dir)
    if text:
        os.makedirs(os.path.dirname(output_txt_path), exist_ok=True)
        with open(output_txt_path, 'w', encoding='utf-8') as f:
            f.write(text)
        print(f"Successfully extracted chapters {start_chapter}-{end_chapter} to {output_txt_path}")
        return True
    return False

def validate_and_merge_json(bible_key, chunk_files, final_output_path):
    """
    여러 JSON 조각들을 순서대로 합쳐 최종 JSON 파일로 만듭니다.
    규칙 검증도 수행합니다.
    """
    mapping = get_bible_mapping()
    kor_name = mapping.get(bible_key, bible_key)
    
    merged_data = []
    
    # 각 청크 파일을 읽어서 합침
    for chunk_file in chunk_files:
        if not os.path.exists(chunk_file):
            print(f"Error: Chunk file {chunk_file} does not exist.")
            return False
        
        with open(chunk_file, 'r', encoding='utf-8') as f:
            try:
                chunk_data = json.load(f)
                if not isinstance(chunk_data, list):
                    print(f"Error: Chunk file {chunk_file} is not a JSON list.")
                    return False
                merged_data.extend(chunk_data)
            except Exception as e:
                print(f"Error reading JSON from {chunk_file}: {e}")
                return False
                
    # 검증 수행
    # 1. 구조 및 필수 필드 검증
    # 2. 챕터 시작 시 '[성경이름] X장 1절.' 접두사 존재 여부 검증
    current_chapter = None
    errors = []
    
    for i, item in enumerate(merged_data):
        item_type = item.get('type')
        if item_type not in ['paragraph start', 'paragraph end', 'paragraph text']:
            errors.append(f"Index {i}: Invalid type '{item_type}'")
            continue
            
        if item_type == 'paragraph text':
            ch = item.get('chapterNumber')
            vs = item.get('verseNumber')
            val = item.get('value', '')
            sec = item.get('sectionNumber', 1)
            
            if ch is None or vs is None:
                errors.append(f"Index {i}: chapterNumber or verseNumber is missing.")
                continue
                
            # 1절 체크
            if vs == 1:
                prefix = f"{kor_name} {ch}장 1절."
                if not val.startswith(prefix):
                    errors.append(f"Index {i} (Chapter {ch} Verse 1): Missing correct prefix '{prefix}'. Actual: '{val[:30]}...'")
    
    if errors:
        print(f"Validation failed with {len(errors)} errors:")
        for err in errors[:10]:
            print(err)
        if len(errors) > 10:
            print("...")
        return False
        
    # 최종 파일 저장
    os.makedirs(os.path.dirname(final_output_path), exist_ok=True)
    with open(final_output_path, 'w', encoding='utf-8') as f:
        json.dump(merged_data, f, ensure_ascii=False, indent=4)
        
    print(f"Successfully validated and merged. Saved to {final_output_path}")
    return True

if __name__ == '__main__':
    # 간단한 CLI 테스트용
    import sys
    if len(sys.argv) > 1:
        cmd = sys.argv[1]
        if cmd == 'extract' and len(sys.argv) >= 6:
            # python bible_helper.py extract genesis.json 1 10 /path/to/output.txt
            file_name = sys.argv[2]
            start_ch = int(sys.argv[3])
            end_ch = int(sys.argv[4])
            out_path = sys.argv[5]
            save_extracted_text(file_name, start_ch, end_ch, out_path)
        elif cmd == 'merge' and len(sys.argv) >= 5:
            # python bible_helper.py merge genesis genesis_part1.json,genesis_part2.json /path/to/final.json
            bible_key = sys.argv[2]
            chunks = sys.argv[3].split(',')
            final_path = sys.argv[4]
            validate_and_merge_json(bible_key, chunks, final_path)
