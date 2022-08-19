
import json
from random import Random
import requests
from bs4 import BeautifulSoup
import urllib.request
import uuid
import time

host = "https://www.guo68.com"


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

        data = {
            "name": name,
            "address": address,
            "desc": desc,
            "img": img,
            "price": price
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
        grabPageData(i)
        print("Finished page:" + str(i))
    print("Oh! Finished download!")

start()
