import './App.css';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useState } from 'react';
import data from './data.js'
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import DetailPage from './pages/detail'
import axios from 'axios'
import Cart from './pages/cart.js'

// context는 그냥 state 보관함


function App() {

  let [shoes,setShoes] = useState(data);
  let [countClick, setCountClick] = useState(0);
  let [loadingTextVisible, setLoadingTextVisible] = useState(false)

  let navigate = useNavigate(); // hook
  

  return (
    <div className="App">

      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">TMITEM</Navbar.Brand>
          <Nav className="me-auto">
            {/* navigate(1) 앞으로한페이지, navigate(-1) 뒤로한페이지 */}
            <Nav.Link onClick={ ()=>{navigate('/')} }>Home</Nav.Link>
            <Nav.Link onClick={ ()=>{navigate('/detail')} }>Detail</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Link to="/">홈</Link>
      <Link to="/detail">상세</Link>

      <Routes>
        {/* Route로 페이지 나눔 */}
        {/* Main 페이지, 페이지도 Component로 만들면 좋음, 가독성 올라감 */}
        <Route path="/" element={
          <>
            <div className="main-bg"></div>
            <div className="container">
              <div className="row">
                {/* return 생략 case */}
                {shoes.map((shoe,i)=>(<ItemCard key={i} title={shoe.title} price={shoe.price} imageNum={i} />))}
              </div>
            </div>
            {loadingTextVisible ? <LoadingText /> : null}
            <button onClick={()=>{
              setCountClick(++countClick);
              // 로딩중UI 띄우기~
              console.log(countClick);
              setLoadingTextVisible(true)
              axios.get(`https://codingapple1.github.io/shop/data${(countClick+1).toString()}.json`)
              .then((response)=>{
                console.log(response.data)
                let copy = [...shoes, ...response.data]
                setShoes(copy);
                // 로딩중UI 숨기기~
                setLoadingTextVisible(false)
              })
              .catch(()=>{
                // 로딩중UI 숨기기~
                console.log('실패함ㅅㄱ')
              })
            }}>Btn</button>
          </>
        } />

        {/* Detail 페이지, URL 파라미터 */}
        <Route path="/detail/:id" element={
            <DetailPage shoes={shoes} />
        }/>

        <Route path='/cart' element={<Cart />} />


        {/* About */}
        <Route path='/about' element={<About/>}>
          <Route path='member' element={<div>멤버임</div>} />
          <Route path='location' element={<div>위치정보임</div>} />
        </Route>
        <Route path='/event' element={<DailyEvent/>}>
          <Route path='one' element={<div>첫 주문시 양배추즙 서비스</div>} />
          <Route path='two' element={<div>생일기념 쿠폰받기</div>} />
        </Route>
        <Route path='*' element={<div>** Nothing **</div>} />
      </Routes>
      
    </div>
  );
}

function ItemCard(props) {
  return (
    <div className="ItemCard">
      <div className="col-md-4">
        <img src={`https://codingapple1.github.io/shop/shoes${props.imageNum + 1}.jpg`} alt='shoeImg' width='80%' />
        <h4>{props.title}</h4>
        <p>{props.price}원</p>
      </div>
    </div>
  );
}

function About() {
  return (
    <div>
      <h4>회사정보임</h4>
      {/* 어디보여줄지 정하는 곳 */}
      <Outlet></Outlet>
    </div>
  )
}

function DailyEvent() {
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  )
}

function LoadingText() {
  return (
    <div>
      <p>로딩중 입니다</p>
    </div>
  )
}

export default App;
