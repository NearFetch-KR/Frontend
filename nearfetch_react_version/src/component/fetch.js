import { render } from "react-dom";
import { useParams } from "react-router-dom";

//메인_추천상품
let data=[];
  fetch("http://192.168.0.172:8000/products/main/recommend", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      data.push(...response.result)
      data.map((a,i)=>{
        data[i].count=1;
      })
    })


// 메인_특가상품
let Hotdealdata=[];
  fetch("http://192.168.0.172:8000/products/main/hotdeal", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) => response.json())
  .then((response) => { 
    Hotdealdata.push(...response.result)
    Hotdealdata.map((a,i)=>{
      Hotdealdata[i].count=1;
    })
  })


export {data,Hotdealdata}
  