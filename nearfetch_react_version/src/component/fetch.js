import { render } from "react-dom";
import { useParams } from "react-router-dom";
let data=[];
  fetch("http://172.30.1.111:8000/products/main/recommend", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      data.push(...response.result)
    })


let Hotdealdata=[];
  fetch("http://172.30.1.111:8000/products/main/hotdeal", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) => response.json())
  .then((response) => { 
    Hotdealdata.push(...response.result)
  })


export {data,Hotdealdata}
  