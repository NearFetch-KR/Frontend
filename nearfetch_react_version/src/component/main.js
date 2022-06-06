import {useNavigate,Outlet} from 'react-router-dom'
import {Nav} from 'react-bootstrap';
import {useEffect,useState } from 'react';

  
  {/* 특가 상품 */}
  function HotdealItem(props){
    let navigate=useNavigate(); 
    useEffect(()=>{
        document.querySelector(".carouselBtn1").addEventListener('click',()=>{
        document.querySelector('.carousel').style.transform='translate(0)'
         })

          document.querySelector(".carouselBtn2").addEventListener('click',()=>{
        document.querySelector('.carousel').style.transform='translate(-100vw)'
         })
         
         document.querySelector(".carouselBtn3").addEventListener('click',()=>{
          document.querySelector('.carousel').style.transform='translate(-200vw)'
           })
    })
    
    const [currentItem,setcurrentItem]=useState(props.hotdeal_item)
   
  
      return ( 
      <div className='col-md-3 itemWrapper'>
        {/* <img className="itemImg" onClick={()=>{navigate('/detail/'+currentItem.product_id)}} src={currentItem.itemImg[0]}/>  */}
        <img className="itemImg" onClick={()=>{console.log(currentItem)}} src={currentItem.itemImg[0]}/> 

        <div className='itemDesWrapper'>
        <div className='itemBrand'>{currentItem.itemBrand}</div>
          <div className='itemName'>{currentItem.itemName}</div>
          <span>{Math.ceil((currentItem.price-currentItem.sale_price)/currentItem.price*100)}% DISCOUNT</span>
          <div className='price'>{currentItem.price}</div>
          <div className='sale_price'>{currentItem.sale_price}</div>
        </div>
      </div>
      )
  }
  
  // 최하단 추천 상품 리스트보기
  function Item(props){
    let navigate=useNavigate(); 
      return (<div className='col-md-3 itemWrapper'>
        <img className="itemImg" onClick={()=>{navigate('/detail/'+props.item.product_id)}} src={props.item.itemImg[0]}/> 
        {/* <img className="itemImg" onClick={()=>{console.log(props.item)}} src={props.item.itemImg[0]}/>  */}
        
        <div className='itemName'>{props.item.itemName}</div>
        <div className='itemBrand'>{props.item.itemBrand}</div>
        <div className='price'>{props.item.price}</div>
      </div>
      )
  }

  
//   내 정보
  function Myinfo(){
    let navigate=useNavigate(); 
    return(
      <>
      <div className='myInfoTitle'>내정보</div>
      <div className='myInfoList'>
        <div className="infoBar">
            <ul>
              <li>
                <Nav.Link onClick={()=>{navigate("/myinfo/orderlist")}} >주문내역</Nav.Link>  
              </li>
              <li>
               <Nav.Link onClick={()=>{navigate("/cart")}} >장바구니</Nav.Link>  
              </li>
            </ul>
          </div>
          <div className="infoBarInner">
            <Outlet></Outlet>
          </div>
      </div>
      </>
    )
  }

  function ShowCarousel(){
      return(
        <>
        <div className="carouselWrapper">
            <div className='carousel'>
              <div className="inner">
                <img src="https://assets-proxy.matchesfashion.com/ctf/r34dnfrgyjo9/1rEpuRUCqJRm7Bg47h0sw2/130b1fe5db8007908d303df7a52badae/0504-WW-ACFT-ROW-04.jpg" alt="" />
              </div>
              <div className="inner">
                <img src="https://assets-proxy.matchesfashion.com/ctf/r34dnfrgyjo9/4nrromnj68qKgxT338O5I8/2734cb0e013177ae3789a6cb0012606d/0504-WW-ACFT-ROW-02.jpg" alt="" />
              </div>
              <div className="inner">
                <img src="https://assets-proxy.matchesfashion.com/ctf/r34dnfrgyjo9/pnxXBmzMGegSpbwWMcxvF/30eb0ece9c7f4b8bef3a06f2715b819d/0302-WW-SS-ROW-06_FADE-2.jpg" alt="" />
              </div>
            </div>
          </div>
          <div className='carouselBtnWrapper'>
            <button className='carouselBtn1'> </button>
            <button className='carouselBtn2'> </button>
            <button className='carouselBtn3'> </button>
          </div>
          
        </>
      )
  }

  // 내 정보>주문 정보
function OrderList(){
    return(
      <div>
        주문정보
      </div>
    )
  }
  
  export {OrderList,HotdealItem,Item,Myinfo,ShowCarousel}