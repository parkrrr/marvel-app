import React from 'react';
import { Link } from "react-router-dom";
import {
  Media, Row, Col
} from 'reactstrap';
import './SearchResult.css'

function SearchResult(props) {
  // Grab the appropriately sized thumbnail
  let thumbnail = `${props.result.thumbnail.path}/standard_medium.${props.result.thumbnail.extension}`

  return (
    <Row className="resultRow">
      <Col>
        <Media>
          <Media left>
            <Media className="thumbnail" object src={thumbnail}/>
          </Media>
          <Media body>
            <Media heading>
              <Link to={`/${props.result.id}`}>
                {props.result.title}
              </Link>
            </Media>
            {props.result.description}
          </Media>
        </Media>
      </Col>
    </Row>
  )
}

export default SearchResult;