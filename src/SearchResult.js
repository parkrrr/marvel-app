import React from 'react';
import {
  Media, Row, Col
} from 'reactstrap';
import './SearchResult.css'

// TODO see https://developer.marvel.com/documentation/images
function SearchResult(props) {
  return (
    <Row>
      <Col>
        <Media>
          <Media left href="#">
            <Media className="thumbnail" object src="{props.thumbnail}" alt="Generic placeholder image" />
          </Media>
          <Media body>
            <Media heading>
              {props.title}
            </Media>
            {props.desc}
          </Media>
        </Media>
      </Col>
    </Row>
  )
}

export default SearchResult;