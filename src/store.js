import { configureStore, createSlice } from '@reduxjs/toolkit'

// useState와 비슷한 역할
let user = createSlice({
  name : 'user',
  initialState : 'kim'
})

let stock = createSlice({
  name : 'stock',
  initialState : [11,12,13]
})

let cart = createSlice({
  name : 'cart',
  initialState : [
    {id : 0, name : 'White and Black', count : 2},
    {id : 2, name : 'Grey Yordan', count : 1}
  ]
})

// 정확한 규격을 지키자
export default configureStore({
  reducer: {
    user : user.reducer,
    stock : stock.reducer,
    cart : cart.reducer
  }
})