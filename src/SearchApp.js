import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import SearchBar from './SearchBar'
import SearchResult from './SearchResult'
import './SearchApp.css';


class SearchApp extends React.Component {
  constructor(props) {
    super(props);

    this.search = this.search.bind(this)

    this.state = {
      results: []
    };
  }

  search(value) {
    console.debug('Search value: ' + value);
    this.setState({ results: value.split('') })
  }

  renderResults() {
    const r = this.state.results.slice();
    const styledR = r.map((v, i) => {
      return (
        <SearchResult key={i} title="Comic Title 1" desc="A comic for a thing"></SearchResult>
      )
    });

    return (
      <div>
        {styledR}
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