import React, { useState, useEffect, useRef } from 'react';
import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  // object-destruct props: onLoad
  const { onLoadingIngredients } = props
  const [ enteredFilter, setEnteredFilter ] = useState('')
  const inputRef = useRef()
  // console.log('onLoadingIngredients', onLoadingIngredients);
  
  // load all data from firebase
  useEffect(()=> {
    // wait 300ms for user has stopped typing
    const timer = setTimeout(()=> {
     // entered text in input field is same as it was 300ms before
     if (enteredFilter === inputRef.current.value) {
        const query = enteredFilter.length === 0 
                    ? '' // nothing
                    : `?orderBy="title"&equalTo="${enteredFilter}"`
        console.log('querystring', query);
         // fetch from hooky3 firebase 
        fetch('https://hooky3-88cbd.firebaseio.com/ingredients.json'+ query)
          .then(response => response.json())
          .then(responseData => {
            const loadedData = []
            for (const key in responseData) {
              loadedData.push({
                id: key,
                title: responseData[key].title,
                amount: responseData[key].amount
              })
            }
            // execute function passed from ingredients.js
            onLoadingIngredients(loadedData)
          })
      }
    }, 300)
    // cleanup timer-function of useEffect hook with return statement 
    return () => {
      clearTimeout(timer)
    }
  }, [enteredFilter, onLoadingIngredients, inputRef])
  
  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
              ref={inputRef} 
              type="text" 
              value={enteredFilter} 
              onChange={event => setEnteredFilter(event.target.value)} 
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
