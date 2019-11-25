import React from 'react';
import $ from 'jquery';
import {
  Button, Row, Col
} from 'reactstrap';

class DetailPage extends React.Component {
  constructor(props) {
    super(props);

    this.goBack = this.goBack.bind(this)
    this.state = { result: {} };
  }

  get(id) {
    let request = `${process.env.REACT_APP_API_URL}/detail/${id}`;
    $.getJSON(request, (results) => {
      let result = results.data.results[0];

      this.setState({
        result: result
      });
    });
  }

  componentDidMount() {
    const { id } = this.props.match.params
    this.get(id);
  }

  goBack() {
    this.props.history.goBack();
  }

  renderCreators() {
    if (!this.state.result.creators || this.state.result.creators.available) return 'n/a';

    const creators = this.state.result.creators.items.slice();
    let creatorNames = creators.map((c) => <li key={c.name + c.role}>{c.name} - {c.role}</li>);
    return creatorNames
  }
  
  getCharacters() {
    if (!this.state.result.characters || this.state.result.characters.available === 0) return 'n/a';
    const characters = this.state.result.characters.items.slice();
    let characterNames = characters.map(c => c.name);
    return characterNames.join(', ');
  }

  getPrintPrice() {
    if (!this.state.result.prices) return 'n/a';

    let prices = this.state.result.prices;
    let priceObj = prices.find(p => p.type === 'printPrice');
    if (priceObj) return priceObj.price;
    else return 'n/a';
  }

  render() {
    return (
      <>
        <Row>
          <Col xs='1'>
            <Button color="primary" onClick={this.goBack}>Back</Button>
          </Col>
          <Col>
            <h3>{this.state.result.title}</h3>
          </Col>
        </Row>
        <Row>
          <Col xs='2'>Pages: {this.state.result.pageCount}</Col>
          <Col xs='2'>Price: {this.getPrintPrice()}</Col>
          <Col>Primary Characters: {this.getCharacters()}</Col>
        </Row>
        <Row>
          <Col xs='2'>
            Creators
          </Col>
          <Col>
          <ul>
          {this.renderCreators()}
          </ul>
          </Col>
        </Row>
        <Row>
          <Col xs='2'>
            Description
        </Col>
          <Col>
            {this.state.result.description || 'n/a'}
          </Col>
        </Row>
      </>
    )
  }
}

export default DetailPage;