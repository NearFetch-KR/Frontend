
from bs4 import BeautifulSoup
import urllib.request

now = datetime.datetime.now()
nowDate = now.strftime('%Y년 %m월 %d일 %H시 %M분 입니다.')

print("\n       ※ Python Webcrawling Project 1 ※ \n ")
print('   환영합니다, ' + nowDate)
print('      오늘의 주요 정보를 요약해 드리겠습니다.\n')