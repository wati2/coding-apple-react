import './App.css';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useState } from 'react';
import data from './data.js'


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

      <div className="main-bg"></div>
      <div className="container">
        <div className="row">
          {shoes.map((shoe,i)=>(<ItemCard title={shoe.title} price={shoe.price} imageNum={i+1} />))}
        </div>
      </div>
    </div>
  );
}

function ItemCard(props) {
  return (
    <div className="ItemCard">
      <div className="col-md-4">
        <img src={`https://codingapple1.github.io/shop/shoes${props.imageNum}.jpg`} alt='shoeImg' width='80%' />
        <h4>{props.title}</h4>
        <p>{props.price}원</p>
      </div>
    </div>
  );
}

export default App;
