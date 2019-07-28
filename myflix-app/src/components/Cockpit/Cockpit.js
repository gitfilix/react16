//functional component
import React from 'react';
import classes from './Cockpit.css';

const cockpit = (props) => {
    const assignedClasses = [];
    let btnClass = '';
    btnClass = classes.Red;
    if (props.persons.length <=2) {
        assignedClasses.push( classes.red);
    }
    if (props.persons.length <=1) {
        assignedClasses.push( classes.red);
    }

    if (props.showPersons) {
        btnClass = classes.Red;
    }

    const style = {
          backgroundColor: 'white',
          font: 'inherit',
          // border: '1px solid green',
          padding: '4px',
          borderRadius: '3px',
          cursor: 'pointer'
    };


    return (
        <div className={classes.Cockpit}>
            <h2>Hi! I am Flix ToggleButton App</h2>
            <p className={assignedClasses.join ( ' ')}>Hi paragraph</p>
            <button
                className={btnClass}
                onClick={props.clicked}>Toggle Persons</button>
        </div>
    );
}

export default cockpit;
