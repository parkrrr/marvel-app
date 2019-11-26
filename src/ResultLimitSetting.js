import React from 'react';
import {
    InputGroup,
    InputGroupAddon,
    Input
} from 'reactstrap';

// This component contains logic for the search bar
// It maintains the search text state and handles input-related events
class ResultLimitSetting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchLimit: props.value
        };
    }

    componentDidMount() {
        // When the component has been rendered, grab the state if it exists
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