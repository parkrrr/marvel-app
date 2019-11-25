import React from 'react';
import {
  InputGroup,
  InputGroupAddon,
  Input,
  Button
} from 'reactstrap';

// This component contains logic for the search bar
// It maintains the search text state and handles input-related events
class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ''
    };
  }

  componentDidMount() {
    // When the component has been rendered, grab the state if it exists
    let text = localStorage.getItem('searchText');
    if (text) {
      this.setState({ searchText: text });
    }
  }

  updateSearchText(e) {
    // Update the state as often as possible
    // This will help if the user actually navigates away
    let text = e.target.value;
    localStorage.setItem('searchText', text)
    this.setState({ searchText: text });
  }

  handleKeyPress(e) {
    // Specifically handles the user hitting 'enter' while focused in the input field
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