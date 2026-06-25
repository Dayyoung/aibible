from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import time

def open_gemini_and_run_loop():
    print("브라우저를 실행하고 있습니다...")
    
    # 요청된 이메일 (변경됨)
    EMAIL = "youdayyoung@gmail.com"

    options = webdriver.ChromeOptions()
    options.add_experimental_option("detach", True) 
    options.add_argument("--disable-blink-features=AutomationControlled")
    options.add_experimental_option("excludeSwitches", ["enable-automation"])
    options.add_experimental_option('useAutomationExtension', False)

    try:
        service = Service(ChromeDriverManager().install())
        driver = webdriver.Chrome(service=service, options=options)
        
        # 스토리북 Gem URL
        url = "https://gemini.google.com/gem/storybook"
        print(f"Gemini로 이동 중: {url}")
        driver.get(url)
        
        wait = WebDriverWait(driver, 10)
        
        # ---------------------------------------------------------
        # 0. 로그인 처리 (이메일 입력 후 비밀번호는 수동)
        # ---------------------------------------------------------
        try:
            print("로그인 버튼 확인 중...")
            login_btn_selectors = [
                (By.XPATH, "//*[contains(text(), '로그인')]"),
                (By.XPATH, "//*[contains(text(), 'Sign in')]"),
                (By.CSS_SELECTOR, "a[href*='accounts.google.com']"),
                (By.CSS_SELECTOR, "button[aria-label*='Sign in']"),
                (By.CSS_SELECTOR, "button[aria-label*='로그인']")
            ]
            
            for by, pattern in login_btn_selectors:
                try:
                    login_btn = WebDriverWait(driver, 3).until(EC.element_to_be_clickable((by, pattern)))
                    if login_btn:
                        print(f"로그인 버튼 발견! ({pattern})")
                        login_btn.click()
                        break
                except:
                    continue
        except:
            pass

        try:
            print("이메일/로그인 화면 체크...")
            email_field = WebDriverWait(driver, 5).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, "input[type='email']"))
            )
            print(f"이메일 입력: {EMAIL}")
            email_field.click()
            email_field.send_keys(EMAIL)
            email_field.send_keys(Keys.RETURN)
            
            print("\n>>> **중요** 브라우저에서 비밀번호를 입력하고 로그인을 완료해주세요! <<<")
            print(">>> 로그인이 완료되면 자동으로 작업이 시작됩니다. <<<\n")
            
        except:
            print("로그인 화면이 아니거나 이미 로그인 상태일 수 있습니다.")

        # ---------------------------------------------------------
        # 1. 반복 작업 설정
        # ---------------------------------------------------------
        
        # Gemini 입력창 선택자들
        chat_input_selectors = [
            (By.CSS_SELECTOR, "div[contenteditable='true']"),
            (By.CSS_SELECTOR, "div[role='textbox']"),
            (By.TAG_NAME, "textarea")
        ]
        
        PROMPT = """Https://www.biblegateway.com/versions/New-International-Readers-Version-NIRV-Bible
그림스타일: Classic Oil Painting Style
위에 링크에서 성경 레퍼런스와 동일한 내용의 스토리북으로 만들어줘.
성경의 첫장부터 끝장까지 진행할꺼야.
기존에 작업한 장 다음장을 진행해줘.
한페이지에 최소5개의 절을 각절마다 시작할떄 절숫자를 포함해서 표시해줘.
각 절수는 각색하지말고 성경 레퍼런스 그대로 표시해줘.
각 페이지에는 해당페이지에 포함된 절들을 표현하는 그림삽화를 그려줘.
성경내용에 나오는 이름 이나 단어 또는 표현을 각색하지 말아줘.
스토리북은 성인을 위한 교육목적으로 생성해줘.
글쓴이는 AI Bible 로 표시해줘.
스토리에 나오는 하나님은 푸근한 할아버지으로 해줘.
스토리에 나오는 하나님의 국적은 백인사람으로 해줘.
스토리에 나오는 케릭터의 몸매를 부각시키지 말아줘.
스토리에 나오는 케릭터의 국적은 중동사람으로 해줘.
내용은 영문버전으로 만들어줘."""

        wait_long = WebDriverWait(driver, 1800) # 30분 대기

        iteration = 0
        while True:
            iteration += 1
            print(f"\n======== [ Loop {iteration} ] 실행 시작 ========")
            
            try:
                # 2.1 입력창 찾기 Loop (로그인 완료 대기)
                print("Gemini 입력창 찾는 중...")
                input_element = None
                
                # 최대 30분간 입력창이 나타날 때까지 대기
                start_login_wait = time.time()
                while time.time() - start_login_wait < 1800:
                    for by, pattern in chat_input_selectors:
                        try:
                            # 1) 요소 찾기
                            el = driver.find_element(by, pattern)
                            # 2) 보이는지, 활성화되었는지 확인
                            if el.is_displayed() and el.is_enabled():
                                input_element = el
                                break
                        except:
                            pass
                    
                    if input_element:
                        break
                        
                    time.sleep(2)
                
                if not input_element:
                    print("오류: 입력창을 찾을 수 없습니다. (시간 초과)")
                    break

                # UI 안정화
                time.sleep(2)
                
                # 2.2 프롬프트 입력 및 전송
                print(f"프롬프트 입력 및 전송...")
                try:
                    input_element.click()
                    time.sleep(1)
                    input_element.send_keys(PROMPT)
                    time.sleep(1)
                    input_element.send_keys(Keys.RETURN)
                except Exception as e:
                    print(f"입력 중 오류 발생 (재시도): {e}")
                    time.sleep(3)
                    continue 
                
                # 2.3 **단순 대기 로직** (요청사항 반영)
                # "제출하고 최소 1분은 아무동작도 하지말고 기다려줘."
                print("1분간 무조건 대기합니다... (Waiting 60s)")
                time.sleep(60)
                
                print("1분 대기 완료. 바로 다음 반복을 시작합니다.")
                # "1분이 지나면 해당내용을 입력하고 다시 제출해줘."
                # 루프의 처음으로 돌아가서 다시 입력창 찾고 -> 프롬프트 입력 -> 전송 -> 1분 대기 반복
                
                time.sleep(2)

            except Exception as e:
                print(f"루프 실행 중 예외 처리: {e}")
                time.sleep(10)

    except Exception as e:
        print(f"메인 프로세스 오류: {e}")

if __name__ == "__main__":
    open_gemini_and_run_loop()
