import React from 'react';
import { Alert } from 'reactstrap'

function Error(props) {
    return (<>
        {props.visible ?
            <Alert color="danger">
                {props.value}
            </Alert> : null}
    </>
    )
}

export default Error;