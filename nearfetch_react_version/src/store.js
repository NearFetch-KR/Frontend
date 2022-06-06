//redux
import { configureStore, createSlice } from '@reduxjs/toolkit';


let name=createSlice({
    name:"name",
    initialState:{name:"koni"},
})



let cartlist=createSlice({
    name:"cartlist",
    initialState:[],
    reducers:{

    // 장바구니 추가
    addItem(state, action){
        state.push(action.payload)
    },

    // 장바구니 상품 수량 증가
    increaseItem(state,action){
        state[action.payload].count++
    },

    // 장바구니 상품 수량 감소
    decreaseItem(state,action){
        if(state[action.payload].count>1){
            state[action.payload].count--
        }
    },

    // 장바구니 삭세
    removeItem(state,action){
        state.splice(action.payload,1)
    } 
    }
})

export let {addItem,removeItem,increaseItem,decreaseItem}=cartlist.actions

export default configureStore({
  reducer: { 
      name: name.reducer,
      cartlist:cartlist.reducer
  }
}) 


