import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person.js';


class App extends Component {
    state = {
        persons: [
            {name: 'Max', age: 28},
            {name: 'Manuel', age: 27},
            {name: 'Stephanie', age: 37},
            {animal: 'dog', color: 'black'}
        ],
        otherState: 'some other string-values',
        showPersons: false
    }

    switchNameHandler = (newName) => {
        console.log("switchNameHandler newName", newName);
        this.setState( {
            persons : [
                {name: newName, age: 28},
                {name: 'Emanuelle', age: 17},
                {name: 'Stephanie', age: 47},
                {animal: 'dog', color: 'black'}
            ]
        })
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

    let persons = null;
    if (this.state.showPersons) {
        persons = (
            <div>
                <Person
                name={this.state.persons[0].name}
                age={this.state.persons[0].age}>and I have no hobbies</Person>
                <Person
                name={this.state.persons[1].name}
                age={this.state.persons[1].age}
                // pass a function or method as props to the function component- nice
                click={this.switchNameHandler.bind(this, 'Max!')}
                changed={this.nameChangedHandler}>and I like to click</Person>
                <Person
                name={this.state.persons[2].name}
                age={this.state.persons[2].age} />
            </div>
        );
    }

    return (
      <div className="App">
        <h2>Hi! I am Flix React App</h2>

        <button
            style={style}
            onClick={ ()=> this.togglePersonsHandler()}>Toggle Persons</button>
            // var persons
            {persons}
        {
            // is showPersons true? show it o
            // this.state.showPersons === true ?


        }

      </div>
    );
  }
}

export default App;
