import { useState } from 'react';
import {Table} from 'react-bootstrap';
import {useDispatch,useSelector} from 'react-redux';
import {increaseCart} from '../store.js';


function Cart(){
    let state=useSelector((state)=>state)
    let dispatch=useDispatch()
    let [min_qt,setmin_qt]=useState(1)
        
    return(
    <main>
    <h6 className="customerName">{state.name.name}님의 장바구니</h6>
    <Table>
        <thead>
            <tr>
                <th>#</th>
                <th>사진</th>
                <th>상품정보</th>
                <th>옵션</th>
                <th>가격</th>
                <th>수량</th>
                <th>추가</th>
                <th>삭제</th>
            </tr>
        </thead>
        <tbody>
            {state.cartlist.map((a,i)=>{
                return <tr key={i}>
                    <td>{i}</td>
                    <td>
                        <img src={state.cartlist[i].itemImg[0]}/>
                    </td>
                    <td>
                        {state.cartlist[i].itemBrand}<br/>
                        {state.cartlist[i].itemName}
                    </td>
                    <td>{state.cartlist[i].itemOption}</td>
                    <td>
                        {state.cartlist[i].price}<br/>
                        {state.cartlist[i].sale_price}
                    </td>
                    <td>{min_qt}</td>
               
                    <td>
                        <button onClick={()=>{
                            setmin_qt(min_qt+1)
                        }}>+</button>
                    </td>
                    <td>
                        <button onClick={()=>{
                            console.log('삭제')
                        }}>x</button>
                    </td>
                </tr>
            })}
        </tbody>
    </Table> 
    </main>
    )
}

export default Cart