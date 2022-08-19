
import json
import random
import requests
from bs4 import BeautifulSoup
import urllib.request
import uuid
import time

seasons = ["冬天", "夏天", "春天", "秋天"]
tags = ["稀有特产", "西域美食", "塞上江南", "鱼米之乡", "舌尖上的中国", "沙漠水果"]
host = "https://www.guo68.com"


# 爬取每页的数据
def grabPageData(page):
    p = str(page)
    res = requests.get("https://www.guo68.com/sell?page="+p, {})
    soup = BeautifulSoup(res.text, features="html.parser")
    divs = soup.find_all("li", class_="fruit")
    for div in divs:
        name_tag = div.find("p", "text")
        name = name_tag.get_text()

        address_tag = div.find("p", "address")
        address = address_tag.get_text()

        price_tag = div.find("span", "price")
        price = price_tag.get_text()

        desc_tag = div.find("p", "describe")
        desc = desc_tag.get_text()

        img_tag = div.find("img")
        img = img_tag.get("src")

        onNet = img.__contains__("http")
        if not onNet:
            img = host+img

        exp_day = random.sample(range(1, 100), 1)[0]

        season = seasons[random.sample(range(0, 3), 1)[0]]
        tag = tags[random.sample(range(0, len(tags)), 1)[0]]

        data = {
            "tag": tag,
            "season": season,
            "name": name,
            "address": address,
            "desc": desc,
            "img": img,
            "price": price,
            "exp_day": exp_day
        }

        result = requests.post('http://localhost:9200/food/fruit',
                               json=data, headers={"Content-Type": "application/json"})
        # onNet = img.__contains__("http")
        # if not onNet:
        #   print(img)
        #   local_img =host+img
        #   r = uuid.uuid4()
        #   fname = "./image" + str(r) + ".jpg"
        #   urllib.request.urlretrieve(local_img,filename=fname)

        # if onNet:
        #   r = uuid.uuid4()
        #   fname = "./image/" + str(r) + ".jpg"
        #   urllib.request.urlretrieve(img,filename=fname)


def create_food_index():

    requests.delete('http://localhost:9200/food')

    res = requests.put("http://localhost:9200/food")
    if (res.status_code == 200):
        print("索引创建成功")


def create_food_type():
    res = requests.put("http://localhost:9200/food/fruit")
    if (res.status_code == 200):
        print("type创建成功")


def start():
    create_food_index()
    create_food_type()

    for i in range(1, 100):
        print("Downloading page:" + str(i))
        # 开始爬取数据
        grabPageData(i)
        print("Finished page:" + str(i))
    print("Oh! Finished download!")


start()
