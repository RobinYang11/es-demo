
const fetch = (...args)=>import('node-fetch').then(({default:fetch})=> fetch(...args))
// import node_fetch from 'node-fetch'

fetch('http://localhost:9200/food/_search',{
  method:"GET"
})
.then(res=>res.json())
.then(res=>{
  console.log(JSON.stringify(res))
})


function createData(){
  const name =""        
}




