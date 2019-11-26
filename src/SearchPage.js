import React from 'react';
import { Row, Col } from 'reactstrap';
import SearchBar from './SearchBar'
import SearchResult from './SearchResult'
import ResultLimitSetting from './ResultLimitSetting'
import Spin from './Spin'
import Error from './Error'
import './SearchPage.css';
import $ from 'jquery';

class SearchPage extends React.Component {
  constructor(props) {
    super(props);

    this.search = this.search.bind(this)

    this.state = {
      loading: false,
      results: null,
      resultsLimit: 10,
      resultsCount: 0,
      resultsTotal: 0,
      error: null
    };
  }

  componentDidMount() {
    // Load the previous search results if they exist
    var state = JSON.parse(localStorage.getItem('searchState'));

    if (state) {
      this.setState(state);
    }
  }

  search(value) {
    let limit = this.state.resultsLimit || 10;

    let s = this.state;
    s.loading = true;
    this.setState(s);

    // Call the API middleware to get results based on the search query
    let request = `${process.env.REACT_APP_API_URL}/search/${value}?limit=${limit}`;
    $.getJSON(request, (results) => {
      let state = {
        results: results.data.results,
        resultsCount: results.data.count,
        resultsTotal: results.data.total,
        resultsLimit: limit,
        error: null
      };

      // Save the results and stats to state and local storage
      this.setState(state);

      localStorage.setItem('searchState', JSON.stringify(state));
    })
      .fail((e) => {
        let s = this.state;
        s.error = true;
        this.setState(s);
      })
      .always(() => {
        let s = this.state;
        s.loading = false;
        this.setState(s);
      })


  }

  updateLimit(limit) {
    const parsed = parseInt(limit, 10);
    if (isNaN(parsed)) { return 10; }

    let state = this.state;
    state.resultsLimit = parsed;
    this.setState(state);
  }

  renderRow(set) {
    return set.map((r, i) => {
      return (
        <Col key={i}>
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
        <Row>
          <Col>
            <Error visible={this.state.error} value="Could not fetch search results" />
          </Col>
        </Row>
        <Row className="statsRow">
          <Col xs='2'>
            <ResultLimitSetting value={this.state.resultsLimit} onChange={(l) => this.updateLimit(l)} />
          </Col>
          <Col>
            {this.renderStats()}
          </Col>
          <Col xs='1'>
            {this.state.loading ? <Spin /> : null}
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