import './App.css';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useState } from 'react';
import data from './data.js'
import { Routes, Route, Link } from 'react-router-dom'

function App() {

  let [shoes] = useState(data)

  return (
    <div className="App">

      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">TMITEM</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
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
              {shoes.map((shoe,i)=>(<ItemCard title={shoe.title} price={shoe.price} imageNum={i} />))}
            </div>
            </div>
          </>
        } />

        {/* Detail 페이지 */}
        <Route path="/detail" element={<div>상세페이지임</div>} />
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

export default App;
