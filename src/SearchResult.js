import React from 'react';
import { useHistory  } from "react-router-dom";
import {
  Card, CardImg, CardBody, CardTitle
} from 'reactstrap';
import './SearchResult.css'

function SearchResult(props) {
  // Grab the appropriately sized thumbnail
  let thumbnail = `${props.result.thumbnail.path}/standard_xlarge.${props.result.thumbnail.extension}`

  let history = useHistory();

  // Handle this click manually so the user can click anywhere on the card to navigate to details
  function handleClick(id) {
    history.push(`/${id}`);
  }

  return (
    <Card className="clickable" onClick={() => { handleClick(props.result.id)}}>
      <CardImg top width='100%' src={thumbnail} />
      <CardBody>
        <CardTitle>{props.result.title}</CardTitle>
      </CardBody>
    </Card>

  )
}

export default SearchResult;