import React from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';

 // TODO see https://developer.marvel.com/documentation/images
function SearchResult(props) {
    return (
        <Card>
            <CardImg top width="100%" src="http://placekitten.com/100/150" alt="cat" />
            <CardBody>
                <CardTitle>{props.title}</CardTitle>
                <CardText>{props.desc}</CardText>
            </CardBody>
        </Card>
    )
}

export default SearchResult;