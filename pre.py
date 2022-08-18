
import json
from random import Random
import requests ;
from bs4 import BeautifulSoup;
import urllib.request
import uuid;
import json

host="https://www.guo68.com"

res = requests.get("https://www.guo68.com/sell?page=5",{})

soup = BeautifulSoup(res.text,features="html.parser")
divs =soup.find_all("li",class_="fruit")

for div in divs:
  # print(div)
  name_tag =div.find("p","text")
  name = name_tag.get_text()

  address_tag =div.find("p","address")
  address = address_tag.get_text()

  price_tag =div.find("p","address")
  price = price_tag.get_text()

  desc_tag =div.find("p","describe")
  desc = desc_tag.get_text()

  img_tag =div.find("img")
  img = img_tag.get("src")
  data ={
    "name":name,
    "address":address,
    "desc":desc,
    "img":img   
  }
  json_data= json.dumps(data)
  result =requests.post('http://localhost:9200/food/friut',json=data,headers={"Content-Type":"application/json"})
  print(result)
  # onNet = img.__contains__("http") 
  # if not onNet:
  #   print(img)
  #   local_img =host+im
  #   r = uuid.uuid4() 
  #   fname = "./image" + str(r) + ".jpg"
  #   urllib.request.urlretrieve(local_img,filename=fname)

  # if onNet:
  #   r = uuid.uuid4() 
  #   fname = "./image/" + str(r) + ".jpg"
  #   urllib.request.urlretrieve(img,filename=fname)





  # print(name)
  # print(address)
  # print(price)


  # print(name_tag.get_text())

# soup.get
# print(res.text)
# print("hello robin")

# for i in range(100):
#   print(i)
