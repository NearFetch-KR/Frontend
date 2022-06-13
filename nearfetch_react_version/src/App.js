import {useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Navbar,Container,Nav,Row} from 'react-bootstrap';
import axios from 'axios'
import {Routes,Route,BrowserRouter as Router,Link,useNavigate,Outlet,NavDropdown,Form,FormControl} from 'react-router-dom'
import Detail from './Detail.js';
import {data,Hotdealdata} from './component/fetch.js';
import Footer from './component/footer.js';
import Cart from './component/cart.js'
import {OrderList,HotdealItem,Item,Myinfo,ShowCarousel} from './component/main.js';
import NavbarSection  from './component/nav.js'



function App() {
  let [hotdeal_item,sethotdeal_item]=useState(Hotdealdata);//핫딜상룸 2개
  let [item,setItem]=useState(data);//추천상품 40개
  let navigate=useNavigate(); 


  // LocalStorage에 저장할 데이터
  useEffect(()=>{
    localStorage.setItem('RecentlyViews',JSON.stringify([])) //최근 본 상품
    // localStorage.setItem('CartLists',JSON.stringify([])) //장바구니 데이터
    localStorage.setItem('UserName','Koni') //유저 정보

},[])

let RecentlyViewsList=JSON.parse(localStorage.getItem('RecentlyViews'))//최근 본 상품
// let CartLists=JSON.parse(localStorage.getItem('CartLists'))//장바구니 데이터



  return (
    
    <div className="App">

    {/* 네비게이션바 */}
     <NavbarSection/>
    
      {/* 페이지  구분*/}
        <Routes>
          {/* 메인페이지 */}
          <Route path="/" element={
            <>
          <ShowCarousel/>

            {/* 특가 상품 */}
            <div className="section HotDeal">
              <h3>오늘만 이 가격, 실화🤫</h3>
              <div className='HotDealContents'>
                {hotdeal_item.map((a,i)=>{
                  return <HotdealItem hotdeal_item={hotdeal_item[i]} i={i} key={i}/>
                })} 
              </div> 
            </div>
            
            
            {/* 상품 목록 */}
            <div className='row'>
              <h3>세상 소중한 당신에게,<br/>
              감히 추천하는 BAGS.</h3>
              {item.map((a,i)=>{
                return <Item item={item[i]} i={i} key={i}/>
              })} 

              <div className='seeMoreWrapper'>
                <button className="seeMore" onClick={()=>{
                axios.get('http://172.30.1.172:8000/products/main/recommend')
                .then((a)=>{
                  let copyResult=[...item,...a.data.result]
                  setItem(copyResult)
                })
                .catch(()=>{
                  console.log("상품 불러오기 실패")
                })
                }}>더 많은 BAGS 보기</button>
              </div>
            </div>

            <div className='recentlyViews'>
              <h3>👀최근 본 상품👀</h3>
                <div className="row">
                  <div className="row__inner">  
                   
                     {RecentlyViewsList.map((a,i)=>{
                          return (
                          <>
                          <div className="RecomItem" key={i}>
                              <div className="RecomItem__content">
                                  <a className="imgWrapAtag">
                                  <img className="RecomItem__img" onClick={()=>{navigate('/detail/'+RecentlyViewsList[i].product_id)}} src={JSON.parse(localStorage.getItem('RecentlyViews'))[i].itemImg[0]}/>
                                  </a>
                              </div>
                              <div className="RecomItem__details">
                                  <div className="itemBrand">{RecentlyViewsList[i].itemBrand}</div>
                                  <div className="itemName">{RecentlyViewsList[i].itemName}</div>
                                  <div className="price">{RecentlyViewsList[i].price}</div>
                              </div>
                          </div>
                          </>
                          )
                      })}
                  </div>
                </div>
            </div>
            </>
          }/>
   
      
          
          {/* -------------------------------------- */}
                      {/* 페이지이동 */}
          {/* -------------------------------------- */}
          {/* 상품 상세 보기 */}
          <Route path="/detail/:product_id" element={
            <Detail item={item}/>
          }/>

          {/* 장바구니 */}
          <Route path="/cart" element={
            <Cart/>
          }/>

          {/* 내 정보 */}
          <Route path="/myinfo" element={<Myinfo/>}>
            <Route path="orderlist" element={<OrderList/>}/>
            <Route path="cart" element={<Cart/>}/>
          </Route> 

          {/* 오류 페이지 */}
          <Route path="*" element={<div>없는 페이지입니다(error code:404)</div>}/> 
        </Routes>
      <Footer/>
    </div>
  );
}



export default App;