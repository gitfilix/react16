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
        otherState: 'some other string-values'
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

  render() {
    const style = {
          backgroundColor: 'white',
          font: 'inherit',
          border: '1px solid green',
          padding: '4px',
          borderRadius: '3px',
          cursor: 'pointer'
    };

    return (
      <div className="App">
        <h2>Hi! I am Flix React App</h2>
        exec handler with bind:
        <button
            style={style}
            onClick={this.switchNameHandler.bind(this, 'filix')}>Switch Name</button>
        <br />
        exec handler with arrow anonimous function & call it !
        <button
            style={style}
            onClick={ ()=> this.switchNameHandler('filix!!')}>Switch Name</button>
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
}

export default App;
