#!/bin/zsh
# Source the zprofile to load environment variables
source ~/.zprofile
# Or source ~/.zshenv if appropriate for non-login shells

cd /Users/dayyoung/bible

for pid in $(pgrep -f "gemini"); do
    //echo "> process detected. kill processing..."
    #kill -15 $pid
	  PID=12345 # 확인하고자 하는 PID
    //echo "> process kill completed!"
done


# Now run your commands
if [ -z "$PID" ]; then
  echo "Gemini is not running. Start Gemini!"
  gemini -p "성경이미지. https://www.biblegateway.com/versions/New-International-Readers-Version-NIRV-Bible/ 링크를 참고해서 nirv 성경을 한절씩 7세 아동용 교육이미지로 생성할꺼야.bible 폴더에 히스토리를 참고해서 현재 읽어야 되는 절수를 확인해.그리고 현재 절수에 해당하는 장을 읽어서 전체 맥락을 파악해.현재 절에 해당하는 해당 영어문구를 화면에 문법 과 철자에 맞게 화면 하단에 표시하고 제목 장:절 을 표시해줘.현재절 외에 어떤 다른 텍스트도 표시하지 말아줘.손에 눈코입을 그리는 표현들은 자제해줘.이전절에 그렸던 그림과 가능하면 똑같은 구성의 그림은 그리지 말아줘.nirv 글자는 제거해줘.현재 성경의장과 절을 표시해줘.전체 이미지 크기는 fhd 16:9 비율로 그려줘.아이들이 쉽게 볼수있게 그림과 글자크기를 크게 표현해줘. 다운로드할때 파일이름은 제목_장_절.png로 bible 폴더에다운받아저ㅜ. 전체이미지톤은 밝게해줘" --yolo -m  gemini-3-pro-preview 
else
  echo "Gemini is running"
fi