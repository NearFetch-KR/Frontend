import {useState } from 'react';
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



function App() {
  let [hotdeal_item,sethotdeal_item]=useState(Hotdealdata);//핫딜상룸 2개
  let [item,setItem]=useState(data);//추천상품 40개
  let navigate=useNavigate(); 

  return (
    
    <div className="App">
      <Navbar expand="lg">
        <Container fluid>
          <div className='infoMenu'>
            <Nav.Link onClick={()=>{navigate("/myinfo")}} className="myinfo">내정보</Nav.Link>  
            <Nav.Link onClick={()=>{navigate("/cart")}} className="cart">장바구니</Nav.Link>
          </div>
      
          <Navbar.Brand onClick={()=>{navigate("/")}} >NEARFETCH</Navbar.Brand>
          <br/>
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
              >
              <Nav.Link onClick={()=>{navigate("/designers")}}>DESIGNERS</Nav.Link>
              <Nav.Link onClick={()=>{navigate("/women")}}>WOMEN</Nav.Link>
              <Nav.Link onClick={()=>{navigate("/men")}}>MEN</Nav.Link>
              <Nav.Link onClick={()=>{navigate("/sale")}}>SALE</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>


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
                axios.get('http://192.168.0.172:8000/products/main/recommend')
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
            </>
          }/>
   
      
          
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
          <Route path="*" element={<div>없는 페이지입니다(error code:404)</div>}/> 
        </Routes>
      <Footer/>
    </div>
  );
}



export default App;