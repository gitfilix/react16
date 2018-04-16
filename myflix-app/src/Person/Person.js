import React from 'react';
// this is a functional component - stateless and dump for presentational reason only

// es6 fn: argument-list, arrow, funcion-body
const person = (props) => {
    return (
        <div>
            <p onClick={props.click}>I am {props.name} and I am {props.age} years old. </p>
        </div>
    )
}


export default person;
