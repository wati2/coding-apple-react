// component 파일은 대문자 로 시작하는것이 암묵적인룰같은? 이미만들었으니 그냥 함
import {Table} from 'react-bootstrap'
import { useSelector } from 'react-redux'

function Cart(){

  // redux Store 가져와줌
  // 전체 state에서 user만 꺼내서 return 가능
  let cart = useSelector((state)=> state.cart )

  return (
    <div>
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
            <tr key={info.id}>
              <td>{info.id}</td>
              <td>{info.name}</td>
              <td>{info.count}</td>
              <td>-</td>
            </tr>)
          })}
        </tbody>
      </Table> 
    </div>
  )
}

export default Cart