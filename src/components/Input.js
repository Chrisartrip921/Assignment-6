import React from 'react'

function Input(props) {
    return(
    <p className="mt-4">
        <strong>Zip Code:</strong>
        <input onChange={props.handleChange} name="zipCode" id="search" type="text"></input>
    </p>
    )
}
 
export default Input