

// 高亮显示搜索关键词
GET /food/_search
{
  "query": {
    "bool": {
      "must": [
        {
          "match": {
              "name": "苹果香蕉 "
          }
        }
      ]
    }
  },
  "highlight": {
    "fields": {
      "name": {
        "force_source": true
      }
    }
  },
  "from": 0,
  "size": 20,
  "track_total_hits": true
}




// 高亮显示搜索关键词
GET /food/_search
{
  "query": {
    "bool": {
      "must": [
        {
          "match": {
              "name": "苹果香蕉 "
          }
        }
      ]
    }
  },
   "highlight" : {
    "require_field_match": false,
    "fields": {
      "name" : { "pre_tags" : ["<font>"], "post_tags" : ["</font>"] }
    }
  },
  "from": 0,
  "size": 20,
  "track_total_hits": true
}