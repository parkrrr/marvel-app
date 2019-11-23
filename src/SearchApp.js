import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import SearchBar from './SearchBar'
import SearchResult from './SearchResult'
import './SearchApp.css';
import $ from 'jquery';

class SearchApp extends React.Component {
  constructor(props) {
    super(props);

    this.search = this.search.bind(this)

    this.state = {
      results: []
    };
  }

  search(value) {
    console.debug(process.env.REACT_APP_API_URL);
    console.debug('Search value: ' + value);

    let request = process.env.REACT_APP_API_URL + '/search/' + value;
    $.getJSON(request, (results) => {
      console.debug(results);
      this.setState({ results: results.data.results })
    } );

    
  }

  renderResults() {
    const r = this.state.results.slice();
    const styledResults = r.map((v, i) => {
      return (
        <SearchResult key={v.id} title={v.title} desc={v.description}></SearchResult>
      )
    });

    return (
      <div>
        {styledResults}
      </div>
    )
  }

  render() {
    return (
      <Container className="container">
        <Row>
          <Col>
            <div className="searchBar">
              <SearchBar onSubmit={this.search}></SearchBar>
            </div>
          </Col>
        </Row>
        <div id="resultsPane">

        </div>
        {this.renderResults()}
      </Container>
    )
  }
}

export default SearchApp;