import React from 'react';
import './App.css';
import { Container, Row, Col } from 'reactstrap';
import SearchBar from './SearchBar';
import SearchResult from './SearchResult'

function App() {
  return (
    <Container className="container">
     <Row>
      <Col>
       <SearchBar></SearchBar>
      </Col>
     </Row>
     <Row>
       <Col xs="3">
         <SearchResult title="Comic Title 1" desc="A comic for a thing"></SearchResult>
       </Col>
     </Row>
    </Container>
  );
}

export default App;