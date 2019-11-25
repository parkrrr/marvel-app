import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Container } from 'reactstrap';
import SearchPage from './SearchPage'
import DetailPage from './DetailPage'

function App() {
    return (
        <Container className="container">
            <Switch>
                <Route exact path="/" component={SearchPage} />
                <Route path="/:id" component={DetailPage} />
            </Switch>
        </Container>
    )
}

export default App;