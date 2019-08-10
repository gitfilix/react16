//functional component only
import React, { Component } from 'react';
import Person from './Person/Person';

// now: classBased: with capital P
class Persons extends Component {

    render() {
        console.log('PersonS.js: rendering... ');
        return this.props.persons.map( (person, index) => {
            return (
                <Person
                click={ () =>this.props.clicked(index)}
                name={person.name}
                age={person.age}
                key={person.id}
                changed={( event ) => this.props.changed(event, person.id)} />
            );
        });
    }
}

export default Persons;
