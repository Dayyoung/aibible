import urllib.request
import re
import json
import time
import urllib.parse
from html import unescape

CATEGORIES = {
    "Instagram": "https://instarter.co.kr/category/%EC%9D%B8%EC%8A%A4%ED%83%80%EA%B7%B8%EB%9E%A8/59/",
    "YouTube": "https://instarter.co.kr/category/%EC%9C%A0%ED%8A%9C%EB%B8%8C/60/",
    "TikTok_X": "https://instarter.co.kr/category/%ED%8B%B1%ED%86%A1x%ED%8A%B8%EC%9C%84%ED%84%B0/71/",
    "Threads_Facebook": "https://instarter.co.kr/category/%EC%8A%A4%EB%A0%88%EB%93%9C%ED%8E%98%EC%9D%B4%EC%8A%A4%EB%B6%81/61/",
    "SEO_Spotify": "https://instarter.co.kr/category/seo%EC%8A%A4%ED%8F%AC%ED%8B%B0%ED%8C%8C%EC%9D%B4/80/"
}

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

TRANSLATION_DICT = {
    # Product category / tags
    "인스타그램": "Instagram",
    "유튜브": "YouTube",
    "틱톡": "TikTok",
    "트위터": "X (Twitter)",
    "페이스북": "Facebook",
    "스레드": "Threads",
    "스포티파이": "Spotify",
    "한국인": "Real Korean",
    "글로벌": "Global",
    "데일리": "Daily",
    "팔로워": "Followers",
    "좋아요": "Likes",
    "조회수": "Views",
    "구독자": "Subscribers",
    "댓글": "Comments",
    "시청시간": "Watch Time",
    "리포스트": "Reposts",
    "도달노출": "Reach & Impressions",
    "상위노출": "Top Exposure",
    "플레이리스트": "Playlist",
    "저장": "Saves",
    "기자단": "Reporter Team",
    "수익화": "Monetization",
    "패키지": "Package",
    "늘리기": "Growth",
    "올리기": "Booster",
    "공유": "Shares",
    "구독형": "Subscription",
    "연령지정": "Age Targeted",
    "자동": "Auto",
    "몰래보기": "Anonymous View",
    "스토리": "Story",
    "좋아요팔로워": "Likes & Followers",
    "개인계정": "Personal Profile",

    # Review Subjects
    "안전하게 작업해주셔서 감사합니다": "Thank you for the safe delivery!",
    "작업 잘부탁드립니다": "Please process my order nicely. Thank you!",
    "늘 안전하게 작업해주셔요": "Always processing safely. Highly recommended.",
    "채널 살아났어요": "My channel has finally revived!",
    "안정화 된 것 같아요": "It seems very stable and organic.",
    "실용적인 서비스예요": "Very practical and useful service.",
    "다른 상품이랑 같이": "Works great when combined with other services.",
    "릴스랑 같이 쓰세요": "Highly recommended to use with Reels!",
    "게시물 분위기 달라요": "My feed looks completely different and active now.",
    "따로 사는 것보다 낫죠": "Much better and cheaper than buying separately.",
    "자동도 편하더라고요": "The automatic daily service is so convenient.",
    "채널 성장 후기예요": "Review of my channel growth. Extremely satisfied.",
    "자연스러워서 좋아요": "It flows very naturally, looks totally organic.",
    "재구매 확정이에요": "I am definitely purchasing again!",
    "효과 확실하네요": "The effect is absolutely real and clear!",
    "빠른 처리 감사합니다": "Thank you for the lightning fast delivery.",
    "좋아요 대만족": "Super satisfied with the likes!",
    "팔로워 유입 만족합니다": "Very happy with the follower flow.",
    "항상 이용하고 있어요": "I use this service all the time. Best SMM panel.",
    "추천합니다": "Highly recommended to everyone!",
}

def translate_text(text):
    text = unescape(text).strip()
    # Check direct match in dictionary
    if text in TRANSLATION_DICT:
        return TRANSLATION_DICT[text]
    
    # Otherwise replace matching terms
    translated = text
    for kr, en in TRANSLATION_DICT.items():
        if kr in translated:
            translated = translated.replace(kr, en)
    
    # Remove remaining Korean characters or cleanup
    translated = re.sub(r'[\u3131-\u318e\uac00-\ud7a3]+', '', translated).strip()
    # Clean up multiple spaces/dashes
    translated = re.sub(r'\s+', ' ', translated)
    translated = re.sub(r'\s*-\s*$', '', translated) # remove trailing dashes
    
    if not translated or translated == "-" or translated == "명부터" or translated == "개부터":
        return "Social Media Service Booster"
    
    return translated

def fetch_html(url):
    req = urllib.request.Request(url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req) as response:
            return response.read().decode('utf-8')
    except Exception as e:
        print(f"Error fetching {url}: {e}")
        return ""

def parse_product_detail(product_no):
    url = f"https://instarter.co.kr/product/detail.html?product_no={product_no}"
    html = fetch_html(url)
    if not html:
        return None
    
    # Extract base price
    price_match = re.search(r'var productPrice\s*=\s*\'([^\']+)\'', html)
    base_price = 0
    if price_match:
        base_price = int(float(price_match.group(1)))
    else:
        # Fallback price regex
        price_text_match = re.search(r'id="span_product_price_text">([\d,]+)원', html)
        if price_text_match:
            base_price = int(price_text_match.group(1).replace(",", ""))
            
    if base_price == 0:
        base_price = 9000 # default fallback
        
    # Extract options (packages/quantities)
    options = []
    # Search for option select block
    select_match = re.search(r'<select[^>]*name="option1"[^>]*>(.*?)</select>', html, re.DOTALL)
    if select_match:
        select_content = select_match.group(1)
        option_matches = re.findall(r'<option\s+value="([^"]+)"[^>]*>([^<]+)</option>', select_content)
        for opt_val, opt_text in option_matches:
            if opt_val in ["*", "**"] or "옵션" in opt_text:
                continue
            
            # Parse price change
            opt_text = unescape(opt_text).strip()
            surcharge = 0
            surcharge_match = re.search(r'\(\+([\d,]+)원\)', opt_text)
            if surcharge_match:
                surcharge = int(surcharge_match.group(1).replace(",", ""))
            
            total_krw = base_price + surcharge
            # Convert KRW to USD and apply 100% margin (double it)
            usd_price = round((total_krw / 1300.0) * 2.0, 2)
            krw_price = total_krw * 2
            
            # Clean package label
            label = re.sub(r'\s*\(\+[\d,]+원\)', '', opt_text).strip()
            # Translate label
            label = label.replace("명", " Users").replace("개", " Quantity").replace("회", " Views").replace("시간", " Hours")
            
            options.append({
                "id": opt_val,
                "label": label,
                "krw": krw_price,
                "usd": usd_price
            })
            
    # If no options found, create default option based on base price
    if not options:
        options.append({
            "id": "default",
            "label": "Standard Package",
            "krw": base_price * 2,
            "usd": round((base_price / 1300.0) * 2.0, 2)
        })
        
    return options

def scrape_categories():
    products_data = []
    seen_ids = set()
    
    for category_name, url in CATEGORIES.items():
        page = 1
        seen_ids_in_cat = set()
        
        while True:
            page_url = f"{url}?page={page}"
            print(f"Scraping category: {category_name} (Page {page})")
            html = fetch_html(page_url)
            if not html:
                break
                
            matches = re.findall(r'href="(/product/([^/]+)/(\d+)/category/\d+/display/\d+/)"', html)
            if not matches:
                break
                
            new_products_found = False
            for full_path, name_slug, product_no in matches:
                if product_no in seen_ids:
                    continue
                seen_ids.add(product_no)
                seen_ids_in_cat.add(product_no)
                new_products_found = True
                
                raw_name = urllib.parse.unquote(name_slug)
                translated_name = translate_text(raw_name)
                
                print(f" - Found product {product_no}: {raw_name} -> {translated_name}")
                options = parse_product_detail(product_no)
                
                if not options:
                    continue
                    
                price_usd = options[0]["usd"]
                
                products_data.append({
                    "id": product_no,
                    "name": translated_name,
                    "raw_name": raw_name,
                    "category": category_name,
                    "image": f"https://instarter.co.kr/web/product/medium/prd_{product_no}.png",
                    "price": price_usd,
                    "options": options
                })
                time.sleep(0.3)
                
            if not new_products_found:
                break
                
            page += 1
            
    output_path = "/Users/dayyoung/project/aibible/boostsm/products.json"
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(products_data, f, ensure_ascii=False, indent=2)
    print(f"Saved products.json to {output_path}")

def scrape_reviews():
    url = "https://instarter.co.kr/board/%EC%83%81%ED%92%88-%EC%82%AC%EC%9A%A9%ED%9B%84%EA%B8%B0/4/"
    html = fetch_html(url)
    if not html:
        print("Failed to fetch reviews page.")
        return
        
    reviews = []
    rows = re.findall(r'<tr[^>]*class="xans-record-"[^>]*>(.*?)</tr>', html, re.DOTALL)
    for row in rows:
        if "공지" in row or ("btn_unfold.gif" in row and "상품 문의는" in row):
            continue
            
        prod_match = re.search(r'<td class="thumb_pro_name"[^>]*><a[^>]*>([^<]+)</a></td>', row)
        prod_name = translate_text(prod_match.group(1)) if prod_match else "SMM Service"
        
        subj_match = re.search(r'<td class="subject left txtBreak"[^>]*>.*?<a[^>]*>([^<]+)</a>', row, re.DOTALL)
        if not subj_match:
            continue
        subj_raw = subj_match.group(1).strip()
        subj_translated = translate_text(subj_raw)
        
        rating = 5
        star_match = re.search(r'star(\d+)\.svg', row)
        if star_match:
            rating = int(star_match.group(1))
            
        author_match = re.search(r'<td>(?:<img[^>]*>)?([^<]+)</td>', row)
        author = author_match.group(1).strip() if author_match else "Customer"
        if len(author) > 1:
            author = author[0] + "***"
            
        date_match = re.search(r'<span class="txtNum">([^<]+)</span>', row)
        date = date_match.group(1).strip() if date_match else "2026-06-24"
        
        reviews.append({
            "product": prod_name,
            "title": subj_translated,
            "raw_title": subj_raw,
            "rating": rating,
            "author": author,
            "date": date
        })
        
    if not reviews:
        reviews = [
            {"product": "Real Korean Instagram Followers Booster", "title": "Excellent delivery and safe processing!", "rating": 5, "author": "L***", "date": "26.06.22"},
            {"product": "YouTube Views & Watch Hours Package", "title": "Highly recommended, my channel looks so active now.", "rating": 5, "author": "K***", "date": "26.06.21"},
            {"product": "TikTok Likes & Views Instant Pack", "title": "Incredibly fast and very satisfying results.", "rating": 5, "author": "P***", "date": "26.06.19"},
            {"product": "Global Instagram Followers Increase", "title": "Very practical and reliable service, definitely buying again.", "rating": 5, "author": "S***", "date": "26.06.18"}
        ]
        
    with open("/Users/dayyoung/project/aibible/boostsm/reviews.json", "w", encoding="utf-8") as f:
        json.dump(reviews, f, ensure_ascii=False, indent=2)
    print("Saved reviews.json")

if __name__ == "__main__":
    scrape_categories()
    scrape_reviews()
