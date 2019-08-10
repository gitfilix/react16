//functional component
// noew with react HOOK
import React, { useEffect } from 'react';
import classes from './Cockpit.css';

const cockpit = (props) => {
    // everyLifeCycle

    useEffect(() => {
        console.log('[cockpit.js] use effect');
        // fake http request
        setTimeout(() => {
            alert('loaded data')
        }, 1000)
        // only executes if props of persons changes
    }, [props.persons]);

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

    return (
        <div className={classes.Cockpit}>
            <h2>Hi! I am Flix ToggleButton App called "{props.title}"</h2>
            <p className={assignedClasses.join ( ' ' )}>Hi paragraph</p>
            <button
                className={btnClass}
                onClick={props.clicked}>Toggle Persons</button>
        </div>
    );
}

export default cockpit;
