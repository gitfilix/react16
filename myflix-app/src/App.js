import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person.js';


class App extends Component {
    state = {
        persons: [
            {name: 'Max', age: 28},
            {name: 'Manuel', age: 27},
            {name: 'Stephanie', age: 37}
        ],
        otherState: 'some other string-values',
        showPersons: false
    }

    deletePersonHandler = (personIndex) => {
        const personsNew = this.state.persons;
        personsNew.splice(personIndex, 1);
        this.setState({persons: personsNew})
    }

    // take the value of the onchange handler and put it into the updated state
    nameChangedHandler = (event) => {
        this.setState({
            persons :[
                {name: 'maxime', age: 18},
                {name: event.target.value, age: 77},
                {name: 'Steven', age: 33}
            ]
        })
    }

    //
    togglePersonsHandler = () => {
        console.log("clicked");
        // current state: true or false
        const doesShow = this.state.showPersons;
        // convert true to false and vice versa
        this.setState({showPersons: !doesShow});
    }


  render() {
    const style = {
          backgroundColor: 'white',
          font: 'inherit',
          border: '1px solid green',
          padding: '4px',
          borderRadius: '3px',
          cursor: 'pointer'
    };
    // toggle view of this
    let persons = null;

    if (this.state.showPersons) {
        persons = (
            <div>
                {this.state.persons.map((person, index) => {
                    return <Person
                        click={ () =>this.deletePersonHandler(index)}
                        name={person.name}
                        age={person.age}  />
                })}
            </div>
        );
    }

    return (
      <div className="App">
        <h2>Hi! I am Flix React App</h2>

        <button
            style={style}
            onClick={ ()=> this.togglePersonsHandler()}>Toggle Persons</button>

            var obj persons:
            {persons}

      </div>
    );
  }
}

export default App;
