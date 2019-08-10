import React, { Component } from 'react';
import './App.css';
import Persons from '../components/Persons/Persons.js';
import Cockpit from '../components/Cockpit/Cockpit.js';

// classBased component because state mutation
class App extends Component {
    constructor(props) {
        super(props);
        console.log('App.js constructor');
    }

    // data comming from the 'feed'
    // here state initialising modern will be executed in constructor
    state = {
        persons: [
            {id: 'gasa', name: 'Max', age: 28},
            {id: '3232', name: 'Manuel', age: 27},
            {id: '04', name: 'Stephanie', age: 37}
        ],
        otherState: 'some other string-values',
        showPersons: false
    }

    static getDerivedStateFromProps(props, state) {
        console.log('App.js: getDerivedStateFromProps', props);
        return state;

    }

    componentDidMount() {
        console.log('App.js: componentDidMount');
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

        personToRename.name = event.target.value;

        const persons = [...this.state.persons];
        persons[personIndex] = personToRename;

        this.setState( {persons: persons} );
    }

    //show or hide
    togglePersonsHandler = () => {
        // console.log("clicked toggler");
        // current state: true or false
        const doesShow = this.state.showPersons;
        // convert true to false and vice versa
        this.setState({showPersons: !doesShow});
    }


  render() {
    console.log('App.js render');
    // toggle view of this
    let persons = null;
    if (this.state.showPersons) {
        persons = (
            <Persons persons={this.state.persons}
                     clicked={this.deletePersonHandler}
                     changed={this.nameChangedHandler} />
        );
    }
    return (
      <div className="App">
        <Cockpit
            title={this.props.appTitle}
            showPersons={this.state.showPersons}
            persons={this.state.persons}
            clicked={this.togglePersonsHandler} />
        {persons}
      </div>
    );
  }
}

export default App;
