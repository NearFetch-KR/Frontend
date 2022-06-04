import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Navbar,Container,Nav,Row} from 'react-bootstrap';
import axios from 'axios'
import { useState } from 'react';
import {BrowserRouter,Routes,Route,Link,useNavigate,Outlet,NavDropdown,Form,FormControl} from 'react-router-dom'
import Detail from './Detail.js';
import {data,Hotdealdata} from './component/fetch.js';
import Footer from './component/footer.js';
import Cart from './component/cart.js'
import ShowSalePrice from './component/etc.js'



function App() {
  let [hotdeal_item,sethotdeal_item]=useState(Hotdealdata);//핫딜상룸 2개
  let [item,setItem]=useState(data);//추천상품 40개
  let navigate=useNavigate(); 
  return (
    
    <div className="App">

    <Navbar expand="lg">
      <Container fluid>
        <div className='infoMenu'>
          <Nav.Link onClick={()=>{navigate("/register")}} className="register">회원가입</Nav.Link>
          <Nav.Link onClick={()=>{navigate("/myinfo")}} className="myinfo">내정보</Nav.Link>  
          <Nav.Link onClick={()=>{navigate("/cart")}} className="cart">장바구니</Nav.Link>
        </div>
     
        <Navbar.Brand onClick={()=>{navigate("/")}} >NEARFETCH</Navbar.Brand>
        <br/>
        {/* <Navbar.Toggle aria-controls="navbarScroll" /> */}
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


      {/* 페이지 */}
      <Routes>
        {/* 메인페이지 */}
        <Route path="/" element={
          <>
          <div className='main-bg'></div>

    
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

              axios.get('http://172.30.1.111:8000/products/main/recommend')
              .then((a)=>{
                let copyResult=[...item,...a.data.result]
                setItem(copyResult)
              })
              .catch(()=>{
                console.log("상품 불러오기 실패")
              })
              //할인 가격 함께 보여주기
               ShowSalePrice()
              }}>더 많은 BAGS 보기</button>
            </div>
           
          </div>
          
          </>
        }/>
        
      
        <Route path="/detail/:product_id" element={
          <Detail item={item}/>
        }/>

        <Route path="/cart" element={
          <Cart/>
        }/>

   
        {/* <Route path="/about" element={<About/>}>
          <Route path="member" element={'멤버정보'}/>
          <Route path="location" element={'위치정보'}/>
        </Route> */}
        <Route path="*" element={<div>없는 페이지(404)</div>}/> 
      </Routes>


      <Footer/>
        

    </div>
  );
}

{/* 특가 상품 */}
function HotdealItem(props){
  let navigate=useNavigate(); 
    return ( 
    <div className='col-md-3 itemWrapper'>
      <img className="itemImg" onClick={()=>{navigate('/detail/'+props.hotdeal_item.product_id)}} src={props.hotdeal_item.itemImg[0]}/> 
      <div className='itemDesWrapper'>
      <div className='itemBrand'>{props.hotdeal_item.itemBrand}</div>
        <div className='itemName'>{props.hotdeal_item.itemName}</div>
        <span>{Math.ceil((props.hotdeal_item.price-props.hotdeal_item.sale_price)/props.hotdeal_item.price*100)}% DISCOUNT</span>
        <div className='price'>{props.hotdeal_item.price}</div>
        <div className='sale_price'>{props.hotdeal_item.sale_price}</div>
      </div>
    </div>
    )
}

// 최하단 추천 상품 리스트보기
function Item(props){
  let navigate=useNavigate(); 
  //할인 가격 함께 보여주기
{ShowSalePrice()}
    return (<div className='col-md-3 itemWrapper'>
      <img className="itemImg" onClick={()=>{navigate('/detail/'+props.item.product_id)}} src={props.item.itemImg[0]}/> 
      <div className='itemName'>{props.item.itemName}</div>
      <div className='itemBrand'>{props.item.itemBrand}</div>
      <div className='price'>{props.item.price}</div>
      <div className='sale_price'>{props.item.sale_price}</div>
    </div>
    )
}

function About(){
  return(
    <>
    <h1>회사정보</h1>
    <Outlet>이 안에는 상세 정보</Outlet>
    </>
  )
}



export default App;