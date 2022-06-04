import { useParams,useLocation,useNavigate } from "react-router-dom";
import {useEffect, useState} from 'react';
import { PageItem,Nav } from "react-bootstrap";
import {addItem} from './store.js'
import {useDispatch} from 'react-redux';
import ShowSalePrice from './component/etc.js';


//예상 수령일 계산
function DeliveryDate(){
    let now = new Date(); // 오늘 날짜
    let arrival = new Date(now.setDate(now.getDate() + 7)); // 7일 뒤 날짜

    //7일 뒤 날짜에서 월,일 가져오기
    const month = arrival.getMonth() + 1;
    const date = arrival.getDate();
    const arrivalMonth = document.querySelector(
      ".expectedArrival .arrivalMonth"
    );
    const arrivalDate = document.querySelector(
      ".expectedArrival .arrivalDate"
    );
    arrivalMonth.innerText = month;
    arrivalDate.innerText = date;

}

//아이템 상세보기
function Detail(props){
    let {product_id}=useParams();
    let selectedItem = props.item.find(item=> 
        item.product_id == product_id);
    const [tab,setTab]=useState(0)
    const [currentItem,setcurrentItem]=useState(selectedItem)
    const [pp,setpp]=useState(Recommdata)
    let navigate=useNavigate(); 
    let dispatch=useDispatch()
   
    return (
    <div className="itemDetailWrapper">
        <div className="buy">
            <div className="itemDetail">
                {currentItem.itemImg.map((a,i)=>{
                    return <img src={currentItem.itemImg[i]}/> 
                     {ShowSalePrice()}

                })}
            </div>

            <div className="itemBuy">
                <div className="itemDes">
                    <div className='itemBrand'>{currentItem.itemBrand}</div>
                    <div className='itemName'>{currentItem.itemName}</div>
                    <div className='price'>{currentItem.price}</div>
                    <div className='sale_price'>{currentItem.sale_price}</div>

                </div> 
            <div className="itemBuyBtn">
            <select className="option">
                {currentItem.itemOption.map((a,i)=>{
                    return <option>{currentItem.itemOption[i]}</option>
                })}
            </select>
            <button className="proceedNow">바로 구매</button>
            <button className="goCart" onClick={()=>{
                dispatch(addItem(currentItem))
                alert('장바구니 담기 성공!')
            }}>장바구니 담기</button>
            </div>
            </div>
        </div>

        {/* 배송 및 반품 안내 */}
        <div className="moreInfo">
            <Nav justify variant="tabs" defaultActiveKey="link-1">   
            <Nav.Item>
                <Nav.Link eventKey="link-1" onClick={()=>{setTab(0)}}>상품 설명</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-2" onClick={()=>{setTab(1)}}>배송</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-3" onClick={()=>{setTab(2)}}>반품</Nav.Link>
            </Nav.Item>
            </Nav>
            <ShowTab tab={tab} currentItem={currentItem} />
        </div>

        {/* 하단 추천 상품 */}
        <div className="section sideRecommend">
            <div className="row">
                <h2>비슷한 상품도 만나보세요</h2>
                {/* <!-- 추천상품 리스트--> */}
                <GetRecommItem currentItem={currentItem} />
                <div className="row__inner">  
                    {pp.map((a,i)=>{
                        return (
                        <>
                        <div className="RecomItem" key={i}>
                            <div className="RecomItem__content">
                                <a className="imgWrapAtag">
                                <img className="RecomItem__img" onClick={()=>{navigate('/detail/'+pp[i].product_id)}} src={pp[i].itemImg[0]}/>
                                </a>
                            </div>
                            <div className="RecomItem__details">
                                <div className="itemBrand">{pp[i].itemBrand}</div>
                                <div className="itemName">{pp[i].itemName}</div>
                                <div className="price">{pp[i].price}</div>
                                <div className="sale_price">{pp[i].sale_price}</div>
                            </div>
                        </div>
                        </>
                        )
                    })}
                </div>
            </div>
        </div>
    </div>
    )    
}


let Recommdata=[];
function GetRecommItem(props){
    fetch(`http://172.30.1.111:8000/products/detail/${props.currentItem.skuNum}`, {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
      },
      })
      .then((response) => response.json())
      .then((response) => { 
        Recommdata.push(...response.recommend)
        console.log(Recommdata)
})}
    

function ShowTab(props){
        let [fade,setFade]=useState('')
    useEffect(()=>{
        setTimeout(() => {
            setFade('end')
        }, 100);
       
        return ()=>{
            setFade('')
        }
    },[props.tab])

    if(props.tab==0){
        return <div className={`start ${fade}`}>
            <div className="skuNum">{"SKU Number:"+props.currentItem.skuNum}</div>
            <div className="product_id">{"PRODUCT ID:"+props.currentItem.product_id}</div>
            <div className="materials">{"MATERIALS:"+props.currentItem.materials}</div>
        </div>
    }else if(props.tab==1){
        return <div className={`start ${fade}`}>
            {DeliveryDate()}
             <div className="expectedArrival">
              *오늘 주문 시 <span className="arrivalMonth"></span>월
              <span className="arrivalDate"></span>일 에 수령 가능
              
            </div>
        </div>
    }else if(props.tab==2){
        return <div className={`start ${fade}`}>수령한 날을 포함 7일 내 무료 반품 가능</div>
    }
}




export default Detail;