import React, { Component } from 'react';
import './Person.css';
// deprecated: this is a functional component - stateless and dump for presentational reason only
// now its a ClassBased component
// es6 fn: argument-list, arrow, funcion-body
class Person extends Component {
    render() {
        console.log('person.js: rendering');
        return (
            <div className="Person">
            <p onClick={this.props.click}>I am {this.props.name} and I am {this.props.age} years old. </p>
            <input type="text" onChange={this.props.changed} value={this.props.name} />
            </div>
        )
    }
}


export default Person;
