// component 파일은 대문자 로 시작하는것이 암묵적인룰같은? 이미만들었으니 그냥 함
import { Table } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { addCount } from './../store.js'
import { changeName, chageAge } from './../store/userSlice.js'

function Cart(){

  // redux Store 가져와줌
  // 전체 state에서 user만 꺼내서 return 가능
  let cart = useSelector((state)=> state.cart )
  let user = useSelector((state)=> state.user)
  let dispatch = useDispatch() // store.js로 요청보내주는 함수임

  return (
    <div>

      <span><strong>{user.name}</strong>의 장바구니, {user.age}
      </span>
      <div>
        <button onClick={()=>{
          dispatch(changeName())
        }}>name</button>
        <button onClick={()=>{
          dispatch(chageAge())
        }}>age</button>
      </div>

      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((info,idx) =>{return (
            <tr key={idx}>
              <td>{info.id}</td>
              <td>{info.name}</td>
              <td>{info.count}</td>
              <td>
                <button onClick={()=>{
                  dispatch(addCount(info.id))
                }}>+</button>
              </td>
            </tr>)
          })}
        </tbody>
      </Table> 
    </div>
  )
}

export default Cart