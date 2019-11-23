import React from 'react';
import {
  InputGroup,
  InputGroupAddon,
  Input,
  Button
} from 'reactstrap';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ''
    };
  }

  updateSearchText(e) {
    this.setState({ searchText: e.target.value });
  }

  handleKeyPress(e) {
    if (e.charCode === 13) {
      this.submit();
    }
  }

  submit() {
    this.props.onSubmit(this.state.searchText);
  }

  render() {
    return (
      <InputGroup>
        <Input value={this.state.searchText} onKeyPress={e => { this.handleKeyPress(e) }} onChange={e => this.updateSearchText(e)} /><InputGroupAddon addonType="append"><Button onClick={() => this.submit()}>Search</Button> </InputGroupAddon>
      </InputGroup>
    )
  }
}

export default SearchBar;