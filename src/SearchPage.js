import React from 'react';
import { Row, Col } from 'reactstrap';
import SearchBar from './SearchBar'
import SearchResult from './SearchResult'
import ResultLimitSetting from './ResultLimitSetting'
import './SearchPage.css';
import $ from 'jquery';

class SearchPage extends React.Component {
  constructor(props) {
    super(props);

    this.search = this.search.bind(this)

    this.state = {
      results: null,
      resultsLimit: 10,
      resultsCount: 0,
      resultsTotal: 0
    };
  }

  componentDidMount() {
    // Load the previous search results if they exist
    var state = JSON.parse(localStorage.getItem('searchState'));

    console.debug('found state: ' + state)
    if (state) {
      this.setState(state);
    }
  }

  search(value) {
    let limit = this.state.resultsLimit || 10;

    // Call the API middleware to get results based on the search query
    let request = `${process.env.REACT_APP_API_URL}/search/${value}?limit=${limit}`;
    $.getJSON(request, (results) => {
      let state = {
        results: results.data.results,
        resultsCount: results.data.count,
        resultsTotal: results.data.total,
        resultsLimit: limit
      };

      // Save the results and stats to state and local storage
      this.setState(state);

      localStorage.setItem('searchState', JSON.stringify(state));
    });


  }

  updateLimit(limit) {
    let state = this.state;
    state.resultsLimit = limit;
    this.setState(state);
  }

  renderRow(set) {
    return set.map((r, i) => {
      return (
        <Col>
          <SearchResult key={r.id} result={r}></SearchResult>
        </Col>
      )
    })
  }

  renderResults() {
    if (!this.state.results) return;

    // Break the results into sets of 5, then render each row 5 at a time
    const r = this.state.results.slice();
    let rows = [];
    for (let i = 0; i < r.length; i += 5) {
      const set = r.slice(i, i + 5);
      rows.push(this.renderRow(set));
    }
    return rows.map((r, i) => <Row className='resultRow' key={i}>{r}</Row>);
  }


  renderStats() {
    // Only show the stats if there are results.
    // This avoids '0 of 0' showing up when the page is loaded for the first time. 
    if (!this.state.results) return;

    const count = this.state.resultsCount;
    const total = this.state.resultsTotal;
    return `Showing ${count} results of ${total}`
  }

  render() {
    return (
      <>
        <Row>
          <Col>
            <div className="searchBar">
              <SearchBar onSubmit={this.search}></SearchBar>
            </div>
          </Col>
        </Row>
        <Row className="statsRow">
          <Col xs='9'>
            {this.renderStats()}
          </Col>
          <Col xs='3'>
            <ResultLimitSetting onChange={(l) => this.updateLimit(l)} />
          </Col>
        </Row>
        <div id="resultsPane">
          {this.renderResults()}
        </div>
      </>
    )
  }
}

export default SearchPage;