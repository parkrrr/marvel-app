import React from 'react';
import {
  Media, Row, Col
} from 'reactstrap';
import './SearchResult.css'

function SearchResult(props) {
  let thumbnail = props.result.thumbnail.path + "/standard_medium." + props.result.thumbnail.extension;

  return (
    <Row className="resultRow">
      <Col>
        <Media>
          <Media left>
            <Media className="thumbnail" object src={thumbnail}/>
          </Media>
          <Media body>
            <Media heading>
              {props.result.title}
            </Media>
            {props.result.description}
          </Media>
        </Media>
      </Col>
    </Row>
  )
}

export default SearchResult;