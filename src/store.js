import { configureStore, createSlice } from '@reduxjs/toolkit'
import user from './store/userSlice.js'

let cart = createSlice({
  name : 'cart',
  initialState : [
    {id : 0, name : 'White and Black', count : 2},
    {id : 2, name : 'Grey Yordan', count : 1}
  ],
  reducers : {
    addCount(state,id){
      state.find(state=>state.id === id.payload).count += 1
    },
  }
})

// 만든 함수 export 해야함
// Destructuring 문법, 오른쪽 자료를 변수로 빼는 문법일 뿐
export let { addCount } = cart.actions


// 정확한 규격을 지키자
export default configureStore({
  reducer: {
    user : user.reducer,
    cart : cart.reducer
  }
})