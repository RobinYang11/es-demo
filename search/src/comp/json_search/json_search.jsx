
import React from 'react';
import Editor from '@monaco-editor/react';
import './json_search.css';
import { useState } from 'react';
import axios from 'axios';

export default function JsonSearch() {

  const search = `{
    "query": {
      "bool": {
        "must": [
          {
            "match": {
              "name": "香蕉"
            }
          },
          {
            "match": {
              "desc": "苹果"
            }
          }
        ]
      }
    },
    "highlight": {
      "fields": {
        "name": {
          "force_source": true
        },
        "desc": {}
      }
    },
    "from": 0,
    "size": 20,
    "track_total_hits": true
}`


  const [result,setResult] =useState('')
  const [data, setData] = useState([])
  const [total, setTotal] = useState(0)

  const handleChange = (value, ev) => {

    let source = null

    try {
      source = JSON.stringify(JSON.parse(value))
    } catch (err) {
      return;
    }

    axios("/api/food/fruit/_search", {
      method: "GET",
      params: {
        source_content_type: 'application/json',
        source,
      }
    }).then(res => {
      setResult(JSON.stringify(res))
      setTotal(res.data?.hits?.total.value)
      setData(res?.data?.hits?.hits)
    }).catch(err => {
      console.log(err)
    })
  }

  return <div id="json-search">
    <div className="left">
      <Editor
        options={{
          fontSize: '20px',
          fontWeight: "bold",
          autoIndent: true,
          renderLineHighlightOnlyWhenFocus: false,
        }}
        theme='vs-dark'
        height="90vh"
        defaultLanguage='json'
        onChange={handleChange}
        defaultValue={search}
      />
    </div>
    <div className="right">
      <Editor
        height="90vh"
        options={{
          fontSize: '14px',
          automaticLayout:true, 
          fontWeight: "bold",
          autoIndent: true,
          renderLineHighlightOnlyWhenFocus: false,
        }}
        theme='vs-dark'
        defaultLanguage='json'
        value={result}
      />
      {/* <h3>{total}</h3>
      <ul>
        {
          data?.map(i => {
            return <li key={i._id}>
              <span>name:{i._source.name}</span>
              <span>address:{i._source.address}</span>
              <span>desc:{i._source.desc}</span>
              <span>price:{i._source.price}</span>
            </li>
          })
        }
      </ul> */}
    </div>
  </div>
}