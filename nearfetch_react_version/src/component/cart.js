import { useState } from 'react';
import {Table} from 'react-bootstrap';
import {useDispatch,useSelector} from 'react-redux';
import {addItem,removeItem,increaseItem,decreaseItem} from '../store.js';


function Cart(){
    let state=useSelector((state)=>state)
    let dispatch=useDispatch()
  
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
                <th>삭제</th>
            </tr>
        </thead>
        <tbody>

            {state.cartlist.map((a,i)=>{
               

                return <tr key={i}>
                    <td>{i}</td>
                    <td>
                        <img className="itemImg" src={state.cartlist[i].itemImg[0]}/>
                    </td>
                    <td>
                        {state.cartlist[i].itemBrand}<br/>
                        {state.cartlist[i].itemName}
                    </td>
                    <td>{state.cartlist[i].itemOption}</td>
                    <td>
                        <div className='price'>
                           {state.cartlist[i].price*(state.cartlist[i].count)}
                        </div>
                      
                    </td>
                    <td className='itemqt'>
                        <button onClick={()=>{
                           dispatch(decreaseItem(i))
                        }}>-</button>
                        <span>
                        {state.cartlist[i].count}
                        </span>
                        <button onClick={()=>{
                           dispatch(increaseItem(i))
                        }}>+</button>
                    </td>
                    <td>
                        <button onClick={(e)=>{
                            dispatch(removeItem(i))
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