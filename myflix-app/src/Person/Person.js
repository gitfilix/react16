import React from 'react';
import './Person.css';
// this is a functional component - stateless and dump for presentational reason only

// es6 fn: argument-list, arrow, funcion-body
const person = (props) => {

    // throw an random error
    const rnd = Math.random();
    if (rnd > 0.7) {
        throw new Error( 'Something terrible happend! ');
    }
    return (
        <div className="Person">
            <p onClick={props.click}>I am {props.name} and I am {props.age} years old. </p>
            <input type="text" onChange={props.changed} value={props.name} />
        </div>
    )
}


export default person;
