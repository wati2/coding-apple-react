import { createSlice} from '@reduxjs/toolkit'

// useState와 비슷한 역할
let user = createSlice({
  name : 'user',
  initialState : {name : 'kim', age : 20},
  reducers : {
    changeName(state){
      state.name = 'park'
    },
    chageAge(state){
      state.age += 1
    }
  }
})


export let { changeName, chageAge } = user.actions
export default user
