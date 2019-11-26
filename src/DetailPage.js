import React from 'react';
import $ from 'jquery';
import {
  Button, Row, Col, Table
} from 'reactstrap';

class DetailPage extends React.Component {
  constructor(props) {
    super(props);

    this.goBack = this.goBack.bind(this)
    this.state = { result: {} };
  }

  get(id) {
    // Request details from the API middleware
    let request = `${process.env.REACT_APP_API_URL}/detail/${id}`;
    $.getJSON(request, (results) => {
      let result = results.data.results[0];

      this.setState({
        result: result
      });
    });
  }

  componentDidMount() {
    // Grab the ID object from the URL parameters
    const { id } = this.props.match.params
    this.get(id);
  }

  goBack() {
    this.props.history.goBack();
  }

  renderCreators() {
    // If the creator names are available, pull them out and add their role to a list
    if (!this.state.result.creators || !this.state.result.creators.available) return 'n/a';

    const creators = this.state.result.creators.items.slice();
    let creatorNames = creators.map((c) => <li key={c.name + c.role}>{c.name} - {c.role}</li>);
    return creatorNames
  }
  
  getCharacters() {
    // If the character names are available, pull them out and add them to a comma-separated list
    if (!this.state.result.characters || this.state.result.characters.available === 0) return 'n/a';
    const characters = this.state.result.characters.items.slice();
    let characterNames = characters.map(c => c.name);
    return characterNames.join(', ');
  }

  getPrintPrice() {
    // If a print price is available, show it.
    if (!this.state.result.prices) return 'n/a';

    let prices = this.state.result.prices;
    let priceObj = prices.find(p => p.type === 'printPrice');
    if (priceObj) return priceObj.price;
    else return 'n/a';
  }

  getThumbnail() {
    if (!this.state.result.images) return;
    let image = this.state.result.images[0];
    let thumbnail = `${image.path}/portrait_uncanny.${image.extension}`
    return thumbnail;
  }

  render() {
    return (
      <>
        <Row>
          <Col xs='1'>
            <Button color="primary" onClick={this.goBack}>Back</Button>
          </Col>
          <Col><h3>{this.state.result.title}</h3></Col>
        </Row>
        <Row>
          <Col xs='4'>
            <img className='rounded float-left' src={this.getThumbnail()} alt='Cover'></img></Col>
          <Col>
            <Table borderless size='sm'>
              <tbody>
                <tr>
                  <th scope="row">Characters</th>
                  <td>{this.getCharacters()}</td>
                </tr>
                <tr>
                  <th scope="row">Creators</th>
                  <td>              <ul>
                    {this.renderCreators()}
                  </ul></td>
                </tr>
                <tr>
                  <th scope="row">Pages</th>
                  <td>{this.state.result.pageCount}</td>
                </tr>
                <tr>
                  <th scope="row">Price</th>
                  <td>{this.getPrintPrice()}</td>
                </tr>
                <tr>
                  <th scope="row">Description</th>
                  <td>{this.state.result.description || 'n/a'}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </>
    )
  }
}

export default DetailPage;