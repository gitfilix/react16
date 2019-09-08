import React, { useState, useEffect } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  // obj destruturing
  const { onLoadIngredients } = props;
  console.log('onLoadIngredients props:', props);
  //hooks
  const [enteredFilter, setEnteredFilter] = useState('');

  // will be executed when enteredFilter changed
  useEffect(() => {
    // query
    const query = enteredFilter.length === 0
                    ? ''
                    : `?orderBy="title"&equalTo="${enteredFilter}"`;

    fetch('https://react-hooks-5b94f.firebaseio.com/ingredients.json' + query)
      .then(response => response.json())
      .then(responseData => {
        // helper const
        const loadedIngredients = [];
        for (const key in responseData) {
          loadedIngredients.push({
            id: key,
            title: responseData[key].title,
            amount: responseData[key].amount
          });
        }
        onLoadIngredients(loadedIngredients);
      });
  }, [enteredFilter, onLoadIngredients]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input type="text" value={enteredFilter} onChange={event => setEnteredFilter(event.target.value)} />
        </div>
      </Card>
    </section>
  );
});

export default Search;
