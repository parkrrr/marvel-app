import React from 'react';
import {
    InputGroup,
    InputGroupAddon,
    Input
} from 'reactstrap';

// This component is similar to the SearchBar component, in that it stores its own state 
// and exposes its properties as well as a callback
class ResultLimitSetting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchLimit: props.value
        };
    }

    componentDidMount() {
        let limit = localStorage.getItem('searchLimit');
        if (!limit) {
            limit = 10;
        }
        this.setState({ searchLimit: limit });
    }

    updateLimit(e) {
        let limit = e.target.value;
        localStorage.setItem('searchLimit', limit)
        this.setState({ searchLimit: limit });

        // expose this change to other components
        this.props.onChange(limit);
    }

    render() {
        return (
            <InputGroup>
                <InputGroupAddon addonType="prepend">Limit</InputGroupAddon>
                <Input value={this.state.searchLimit} onChange={e => this.updateLimit(e)} />
            </InputGroup>
        )
    }
}

export default ResultLimitSetting;