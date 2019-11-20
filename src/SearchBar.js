import React from 'react';
import {
    InputGroup,
    InputGroupAddon,
    Input,
    Button
   } from 'reactstrap';

class SearchBar extends React.Component {
    render() {
        return (
            <InputGroup>
                <Input /><InputGroupAddon addonType="append"><Button>Search</Button> </InputGroupAddon>
            </InputGroup>
        )
    }
}

export default SearchBar;