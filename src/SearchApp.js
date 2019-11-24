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
      results: null,
      resultsCount: 0,
      resultsTotal: 0
    };
  }

  search(value) {
    console.debug(process.env.REACT_APP_API_URL);
    console.debug('Search value: ' + value);

    let request = process.env.REACT_APP_API_URL + '/search/' + value;
    $.getJSON(request, (results) => {
      console.debug(results);
      this.setState({
        results: results.data.results,
        resultsCount: results.data.count,
        resultsTotal: results.data.total
      });
    });


  }

  renderResults() {
    if (!this.state.results) return;

    const r = this.state.results.slice();
    const styledResults = r.map((result, i) => {
      return (
        <SearchResult key={result.id} result={result}></SearchResult>
      )
    });

    return (
      <div>
        {styledResults}
      </div>
    )
  }

  renderStats() {
    if (!this.state.results) return;
    return (
      <Row className="statsRow">
        <Col>
          <div>
            Showing {this.state.resultsCount} results of {this.state.resultsTotal}
          </div>
        </Col>
      </Row>
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
        {this.renderStats()}
        <div id="resultsPane">

        </div>
        {this.renderResults()}

      </Container>
    )
  }
}

export default SearchApp;