
import React from 'react'
import { useState } from 'react'
import './search.css'
import axios from 'axios'

export default function Search() {
  const [data, setData] = useState([])
  const onSearch = (e) => {
    axios('/api/food/fruit/_search', {
      method: "GET",
      params: {
        source_content_type: 'application/json',
        source: JSON.stringify(
          {
            "query": {
              "match_phrase_prefix": {
                "name": e.target.value
              }
            },
            from: 0,
            size: 20
          }
        )
      }
    })
      .then(res => {
        setData(res.data.hits.hits)
      }).catch(err => {
        console.log(err)
      })
  }

  return <div id="search">
    <input
      onInput={onSearch}
      placeholder="please input "
    />
    <ul className="data-list">
      {data?.map(i => {
        return <li key={Math.random()}>
          <p>{i?._source.name}</p>
          <p>{i?._source.address}</p>
          <p>{i?._source.desc}</p>
          <p><img src={i?._source.img} /></p>
        </li>
      })}
    </ul>
  </div>
}


