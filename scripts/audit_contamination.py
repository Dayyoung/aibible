#!/usr/bin/env python3
import os
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

# Central service classification (SKU -> Category)
SERVICES = {
    # database
    'b2bdb': 'database', 'b2cdb': 'database', 'databoost': 'database', 'mkboost': 'database',
    # design-dev
    'landPage': 'design-dev', 'pdpboost': 'design-dev', 'mvpboost': 'design-dev', 'aideploy': 'design-dev', 
    'autoboost': 'design-dev', 'webcreate': 'design-dev', 'globalweb': 'design-dev', 'imgboost': 'design-dev', 
    'flowboost': 'design-dev', 'aiweb': 'design-dev', 'bookboost': 'design-dev', 'opencode': 'design-dev',
    # marketing
    'adsboost': 'marketing', 'linkboost': 'marketing', 'careerlink': 'marketing', 'atsresume': 'marketing', 
    'influboost': 'marketing', 'amzboost': 'marketing', 'amzbrand': 'marketing', 'tikshop': 'marketing', 
    'mailboost': 'marketing', 'searchboost': 'marketing', 'contentboost': 'marketing', 'igboost': 'marketing', 
    'repboost': 'marketing', 'prboost': 'marketing', 'foreigncare': 'marketing', 'aicash': 'marketing', 
    'appboost': 'marketing', 'boostsm': 'marketing', 'mapboost': 'marketing', 'growthconsult': 'marketing',
    # media
    'clipboost': 'media', 'voiceboost': 'media', 'transboost': 'media', 'medboost': 'media', 'pitchboost': 'media',
    # strategy
    'fdaboost': 'strategy', 'globalbank': 'strategy', 'localize': 'strategy', 'tradeboost': 'strategy', 
    'rfpboost': 'strategy', 'complianceboost': 'strategy', 'globalup': 'strategy', 'eventboost': 'strategy', 
    'micemc': 'strategy', 'etsyboost': 'strategy', 'chatboost': 'strategy', 'aiboost': 'strategy', 
    'insightboost': 'strategy', 'shopboost': 'strategy', 'buyerboost': 'strategy', 'researchboost': 'strategy', 
    'salesboost': 'strategy', 'lawboost': 'strategy', 'certboost': 'strategy', 'hrboost': 'strategy', 
    'sysboost': 'strategy', 'loyaltyboost': 'strategy', 'eduooost': 'strategy', 'chinaboost': 'strategy', 
    'surveyboost': 'strategy', 'shopglobal': 'strategy', 'indiaboost': 'strategy', 'ipboost': 'strategy', 
    'usllc': 'strategy', 'sbvi': 'strategy', 'dbmigrate': 'strategy', 'apostboost': 'strategy', 
    'sourcboost': 'strategy', 'ustax': 'strategy', 'ustaxboost': 'strategy'
}

KEYWORDS = {
    'database': [r'\b(db|database|scraping|extraction|email\s+list|phone\s+database|whatsapp\s+list|telegram\s+list|leads)\b', '디비', '데이터베이스', '스크래핑', '이메일 리스트'],
    'design-dev': [r'\b(landing\s+page|mvp|saas|deploy|coding|developer|template)\b', '랜딩페이지', '코딩', '개발자'],
    'marketing': [r'\b(ads|seo|traffic|influencer|smm|instagram|youtube|tiktok|follower|views)\b', '광고', '인스타그램', '유튜브', '틱톡', '팔로워'],
    'media': [r'\b(video|audio|voice|translation|presentation|pitch)\b', '비디오', '동영상', '음성', '번역', '프레젠테이션'],
    'strategy': [r'\b(compliance|audit|legal|tax|apostille|fda|notarization)\b', '컴플라이언스', '세무', '법인설립', '아포스티유']
}

def audit_file(file_path: Path, service_name: str, correct_category: str):
    if not file_path.exists():
        return []
    
    content = file_path.read_text(errors='ignore')
    
    # Strip headers, footers, sidebars (where menus live) to avoid false positives in common menus
    # We only scan main content (inside <main></main>)
    main_match = re.search(r'<main>(.*?)</main>', content, re.DOTALL | re.IGNORECASE)
    if main_match:
        content_to_scan = main_match.group(1)
    else:
        content_to_scan = content
        
    # Strip all HTML tags to avoid class names triggering false positives
    content_to_scan = re.sub(r'<[^>]*>', ' ', content_to_scan)
        
    findings = []
    
    # Check for keywords of other categories
    for cat, kw_list in KEYWORDS.items():
        if cat == correct_category:
            continue
        
        for kw in kw_list:
            if isinstance(kw, str) and kw.startswith(r'\b'):
                matches = re.findall(kw, content_to_scan, re.IGNORECASE)
                if matches:
                    findings.append((cat, kw, len(matches)))
            else:
                # String search for non-regex KOR/ENG terms
                count = content_to_scan.count(kw)
                if count > 0:
                    findings.append((cat, kw, count))
                    
    return findings

def main():
    print("Starting Content Contamination Audit...")
    total_violations = 0
    
    for service, cat in SERVICES.items():
        service_dir = ROOT / service
        if not service_dir.exists():
            continue
            
        for html_file in [service_dir / 'index.html', service_dir / 'kr' / 'index.html']:
            if not html_file.exists():
                continue
                
            findings = audit_file(html_file, service, cat)
            # Filter out very minor false positives (e.g. single mention) or check weight
            significant_findings = [f for f in findings if f[2] >= 3] # Threshold of 3+ occurrences
            
            if significant_findings:
                rel_path = html_file.relative_to(ROOT)
                print(f"\n⚠️  Potential Contamination in [{rel_path}] (Correct Cat: {cat}):")
                for found_cat, kw, count in significant_findings:
                    print(f"   - Found {count} occurrences of {found_cat} keyword: '{kw}'")
                    total_violations += 1
                    
    print(f"\nAudit complete. Total potential contamination issues: {total_violations}")

if __name__ == '__main__':
    main()
