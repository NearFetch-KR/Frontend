//redux
import { configureStore, createSlice } from '@reduxjs/toolkit';


let name=createSlice({
    name:"name",
    initialState:{name:"koni",age:32},
})


let cartlist=createSlice({
    name:"cartlist",
    initialState:[],
    reducers:{
    increaseCart(state, action){
        let idx = state.findIndex((a)=>{ return a.product_id === action.payload })
        state[idx].count+=1
        },
    addItem(state, action){
    state.push(action.payload)
    }   
    }
})


export let {increaseCart,addItem}=cartlist.actions

export default configureStore({
  reducer: { 
      name: name.reducer,
      cartlist:cartlist.reducer
  }
}) 