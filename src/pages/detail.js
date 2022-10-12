import { useEffect, useState } from 'react';
import { Nav } from 'react-bootstrap';
import { useParams } from 'react-router-dom';


// 전달할 수 있는 데이터는 props에서 전달 상위에서 한번에 관리하기 좋음
function DetailPage(props) {

  // use어쩌고는 Hook임
  // mount, update 될 때 코드 실행해주는 useEffect
  // update 시? 재 렌더링 되는 경우에
  // useEffect 안에 있는 코드는 html 렌더링 이후에 동작합니다
  // 먼저 html을 보여줘서 빠른 페이지 로딩느낌을 줄 수 있음, 사용자에게 중요하지 않은 연산인 경우도 있으니
  // 서버에서 데이터 가져오는 작업, 타이머 장착하는 것 등
  // 왜 이름이 Effect 어쩌구? Side Effect에서 따옴: 함수의 핵심기능과 상관없는 기능, 부가기능
  let [count, setCount] = useState(0)
  let [hidden, setHidden] = useState(false)
  let [탭, 탭변경] = useState(0)

  useEffect(() => {
    let a = setTimeout(() => (setHidden(true)), 2000)
    console.log(2)

    // return 사용가능
    // useEffect 동작 전에 실행되는 return()=>{}
    // 까먹고 초기화 하면 타이머 몇백개 생길 수 있음
    return () => {
      // 기존 타이머는 제거해주세요 ( clean up function)
      // or 기존 데이터 요청은 제거해 주세요
      // 버그완화 방지용
      console.log(1)
      clearTimeout(a)
    }
  },
    // useEffect 실행조건을 넣을 수 있는곳, Dependency
    // [count] 면 count가 변경 될 때만 실행 함
    // 편법: 컴포넌트 mount시 1회만 실행하고 싶으면 이렇게 []
    [])


  const { id } = useParams();

  const found = props.shoes.find(item => item.id == id);


  return (
    <div className="container">
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
          <button className="btn btn-danger">주문하기</button>
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
    </div>
  )
}

function TabContent(props){
  if (props.탭 == 0){
    return <div>내용0 {props.탭}</div>
  }
  if (props.탭 == 1){
    return <div>내용1</div>
  }
  if (props.탭 == 2){
    return <div>내용2</div>
  }
}


export default DetailPage