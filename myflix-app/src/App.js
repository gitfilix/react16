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
        ]
    }

    switchNameHandler = () => {
        console.log("clicked dude!");
    }

  render() {
    return (
      <div className="App">
        <h2>Hi! I am Flix React App</h2>
        <button onClick={this.switchNameHandler}>Switch Name</button>
        <Person name={this.state.persons[0].name} age={this.state.persons[0].age}>and I have no hobbies</Person>
        <Person name={this.state.persons[1].name} age={this.state.persons[1].age}/>
        <Person name={this.state.persons[2].name} age={this.state.persons[2].age} />
      </div>
    );
  }
}

export default App;
