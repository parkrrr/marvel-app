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
            <Media className="thumbnail" object src="http://placekitten.com/128/128" alt="Generic placeholder image" />
          </Media>
          <Media body>
            <Media heading>
              Media heading
                    </Media>
            Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                </Media>
        </Media>
      </Col>
    </Row>
  )
}

export default SearchResult;