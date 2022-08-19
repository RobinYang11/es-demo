

/**创建food 索引 */
PUT /food
{}

// 删除索引
DELETE /food

/**创建friut type */
POST /food/fruit
{}


/**创建一个文档 */
POST /food/fruit/
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
 "query" :{
   "match":{
    "name":"伦夜"
   }
 }
}


// 文本的精确查找 
GET /food/fruit/_search
{
  "query": {
    "term": {
      "name.keyword": "苹果"
    }
  },
  "from": 0,
  "size": 10
}


// 数字的精确查找  

GET /food/fruit/_search
{
  "query":{
    "term":{
      "exp_day":"30"
    }
  }
}

//  数字范围查询

GET /food/fruit/_search
{
  "query": {
    "range": {
      "exp_day": {
        "gt": "28",
        "lt": "30"
      }
    }
  }
}

// bool 查询
// name匹配 "苹果"且 exp_day 不在 30-35 范围之内 ,
//  再从结果中筛选出 tag 为"塞上江南"的数据.

GET /food/fruit/_search
{
  "query":{
    "bool":{
      "must":{
        "match":{
          "name":"苹果"
        }
      },
      "must_not":{
        "range":{
          "exp_day":{
            "gt":30,
            "lt":35
          }
        }
      },
      "filter":{
        "term":{
          "tag.keyword" :"塞上江南"
        }
      },
      "should":[
        {
          "match":{
           "address.keyword":"聊城市"
          }
        }
      ],
      // 设置should 条件的比重 0 为必须匹配， 1为不必匹配
      "minimum_should_match" : 0,
      "boost":1.0
    }
  },
  "from":0,
  "size":4
}


























