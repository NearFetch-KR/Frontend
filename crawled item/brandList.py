
from bs4 import BeautifulSoup 
from urllib.request import urlopen
response=urlopen('http://www.nibbuns.co.kr')
soup = BeautifulSoup(response, 'html.parser')

i=1
f = open("nibbunsData.txt", 'w')

for anchor in soup.select("img.MS_prod_img_l"):
    image = "http://www.nibbuns.co.kr"+anchor['src']

for anchor in soup.select("p.name a"):
    title = anchor.get_text()+"\n"
    
for anchor in soup.select("p.price_origin strike"):
    originalPrice = anchor.get_text()+"\n"

for anchor in soup.select("p.price_sell"):
    discountPrice = anchor.get_text()
print(title)
    # print(title,image,originalPrice,discountPrice)
    i=i+1
    f.write(title)
#     f.write(image)
#     f.write(originalPrice)
#     f.write(discountPrice)
    
f.close()
    

