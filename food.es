

/**创建food 索引 */
PUT /food
{}

// 删除索引
DELETE /food

/**创建friut type */
POST /food/friut
{}


/**创建一个文档 */
POST /food/friut/
{
  "name":"water",
  "price":1324.4,
  "cname":"香瓜",
  "rest":2343,
  "brand":"陕西红富士"
}

GET /food/_search
{
  "query": {
    "match": {
      "name": "apple"
    }
  }
}

/** 前缀查询 */
GET /food/_search
{
  "query" :{
    "match_phrase_prefix":{
      "name":"香"
    }
  }
}

GET /food/_search
{
  "query":{
    "multi_match":{
      "query":"香",
      "fields":["name","cname"]
    }
  }
}

GET /food/_search
{
  
}












