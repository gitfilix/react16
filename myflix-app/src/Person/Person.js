import React from 'react';


// es6 fn: argument-list, arrow, funcion-body
const person = (props) => {
    return (
        <div>
            <p>I am {props.name} and I am {props.age} years old. </p>
        </div>
    )
}


export default person;
