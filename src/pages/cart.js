// component 파일은 대문자 로 시작하는것이 암묵적인룰같은? 이미만들었으니 그냥 함
import { Table } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { addCount } from './../store.js'
import { changeName, chageAge } from './../store/userSlice.js'
import { memo, useState } from 'react'

// 꼭 필요할때만 재렌더링 하기위한 memo, 무거운 컴포넌트 재렌더링 방지
// memo의 원리 props가 변할때만 재렌더링해줌
// 무조건 쓰는건 문제가 있음, 기존 props, 신규props 계속 비교할듯 성능에 영향을 줌
let Child = memo(function(){
  console.log('재렌더링됨')
  return <div>자식임</div>
})




function Cart(){

  // redux Store 가져와줌
  // 전체 state에서 user만 꺼내서 return 가능
  let cart = useSelector((state)=> state.cart)
  let user = useSelector((state)=> state.user)
  let dispatch = useDispatch() // store.js로 요청보내주는 함수임
  let [count, setCount] = useState(0)

  return (
    <div>
      <Child></Child>
      <button onClick={()=>{ setCount(count+1) }}>+</button>
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
                  dispatch(addCount(info))
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