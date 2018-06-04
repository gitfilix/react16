import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person.js';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';

class App extends Component {
    // data comming from the feed
    state = {
        persons: [
            {id: 'gasa', name: 'Max', age: 28},
            {id: '3232', name: 'Manuel', age: 27},
            {id: '04', name: 'Stephanie', age: 37}
        ],
        otherState: 'some other string-values',
        showPersons: false
    }

    // delete the clicked
    deletePersonHandler = (personIndex) => {
        // Classic Approach: slice does COPY the array
        // const personsNew = this.state.persons.slice();
        // ES6 fancy Approach: rest operator
        const personsNew = [...this.state.persons];
        personsNew.splice(personIndex, 1);
        this.setState({persons: personsNew})
    }

    // take the value of the onchange handler and put it into the updated state
    nameChangedHandler = (event, id) => {
        // which index
        const personIndex = this.state.persons.findIndex(p => {
            return p.id === id;
        });

        // new object - cause never mutate the state directly
        const personToRename = {
            ...this.state.persons[personIndex]
        };
        // Classic style of this would be:
        //const personToRename = Object.assign({}, this.state.persons[personIndex]);

        personToRename.name = event.target.value; //event.target

        const persons = [...this.state.persons];
        persons[personIndex] = personToRename;

        this.setState( {persons: persons} );
    }

    //show or hide
    togglePersonsHandler = () => {
        console.log("clicked toggler");
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
                    return
                    <ErrorBoundary key={person.id}>
                    <Person
                        click={ () =>this.deletePersonHandler(index)}
                        name={person.name}
                        age={person.age}
                        changed={(event) =>this.nameChangedHandler(event, person.id)} />
                    </ ErrorBoundary>
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
            {persons}

      </div>
    );
  }
}

export default App;
