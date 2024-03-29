import { useEffect, useState } from 'react';
import { Nav, Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { addItem } from './../store.js'

// 전달할 수 있는 데이터는 props에서 전달 상위에서 한번에 관리하기 좋음
function DetailPage(props) {

  // use어쩌고는 Hook임
  // mount, update 될 때 코드 실행해주는 useEffect
  // update 시? 재 렌더링 되는 경우에
  // useEffect 안에 있는 코드는 html 렌더링 이후에 동작합니다
  // 먼저 html을 보여줘서 빠른 페이지 로딩느낌을 줄 수 있음, 사용자에게 중요하지 않은 연산인 경우도 있으니
  // 서버에서 데이터 가져오는 작업, 타이머 장착하는 것 등
  // 왜 이름이 Effect 어쩌구? Side Effect에서 따옴: 함수의 핵심기능과 상관없는 기능, 부가기능
  // 지금 보니까 Destrucuturing 쓰는 이유도 뭐랄까.. 어느정도 디버깅역할을 해주는 듯 함
  let [count, setCount] = useState(0)
  let [hidden, setHidden] = useState(false)
  let [탭, 탭변경] = useState(0)

  let cart = useSelector((state)=> state.cart)
  let dispatch = useDispatch() // store.js로 요청보내주는 함수임
  const { id } = useParams();
  const found = props.shoes.find(item => item.id.toString() === id);

  useEffect(() => {
    let timer = setTimeout(() => (setHidden(true)), 2000)
    let timerFade = setTimeout(()=>{ setFade('end') }, 100)
    let watched = JSON.parse(localStorage.getItem('watched'))
    watched ? watched.push(parseInt(found.id)) : watched = [parseInt(found.id)]
    watched = [...new Set(watched)]
    localStorage.setItem('watched', JSON.stringify(watched))
    console.log(watched)

    // return 사용가능
    // useEffect 동작 전에 실행되는 return()=>{}
    // 까먹고 초기화 하면 타이머 몇백개 생길 수 있음
    return () => {
      // 기존 타이머는 제거해주세요 ( clean up function)
      // or 기존 데이터 요청은 제거해 주세요
      // 버그완화 방지용
      clearTimeout(timer)
      clearTimeout(timerFade)
      setFade('')
    }
  },
    // useEffect 실행조건을 넣을 수 있는곳, Dependency
    // [count] 면 count가 변경 될 때만 실행 함
    // 편법: 컴포넌트 mount시 1회만 실행하고 싶으면 이렇게 []
  [])

  let [fade, setFade] = useState('')

  return (
    <div className={`container start ${fade}`}>
      {hidden ? null : <div className="alert alert-warning">
        2초 이내 구매시 할인
      </div>}
      <button onClick={() => setCount(++count)}>count:{count}</button>
      
      <div className="row">
        <div className="col-md-6">
          <img src={`https://codingapple1.github.io/shop/shoes${1 + parseInt(id)}.jpg`} alt='ShoeImg' width="100%" />
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5">{found.title}</h4>
          <p>{found.content}</p>
          <p>{found.price}원</p>
          {/* 음 주문시, 항목없으면 새로 추가 있으면 add count */}
          <button className="btn btn-danger" onClick={()=>{
            dispatch(addItem(found))
          }}>주문하기</button>
        </div>
      </div>

      <Nav variant="tabs"  defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link onClick={()=>(탭변경(0))} eventKey="link0">버튼0</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={()=>(탭변경(1))} eventKey="link1">버튼1</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={()=>(탭변경(2))} eventKey="link2">버튼2</Nav.Link>
        </Nav.Item>
      </Nav>
      
      <TabContent 탭={탭} />
      <br></br>
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
            </tr>)
          })}
        </tbody>
      </Table> 
    </div>
  )
}

// props보다 사용할 변수를 미리 알수 있어서 훨씬 직관적임
function TabContent({탭}){

  let [fade,setFade] = useState('')

  useEffect(()=>{

    // 부가설명: v18부터 리액트의 automatic batching 기능
    // 마지막에 재랜더링 한번 해줌 (미리 결과를 OR 연한 해서 수행해버림, 그래서 타이머 넣어줌)
    // 그리고 타이머니까 클린업 해도됌
    let forCleanUp = setTimeout(()=>{ setFade('end') }, 100)

    // CleanUp function
    // useEffect 실행전에 뭐 특정 코드 실행하고 싶을때 사용하면 됨.
    return ()=>{
      clearTimeout(forCleanUp)
      setFade('')
    }
  }, [탭])

  return (
    <div className={`start ${fade}`}>
      { [<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][탭] }
    </div>
  )
}


export default DetailPage