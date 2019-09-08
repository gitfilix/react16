import React, { useState, useEffect, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

const Ingredients = () => {
    const [ userIngredients, setUserIngredients ] = useState([]);

    // useEffect for manage sideEffect
    // here useEffect acts like a componentDiDUpdate (after ervery component update)
    useEffect(() => {
      fetch('https://react-hooks-5b94f.firebaseio.com/ingredients.json')
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
          setUserIngredients(loadedIngredients);
        });
        // useEffect second argument: dependencies of that function, here empty array
        // useEffect with empty arry useEffect acts like componentDidMount (runs unly once! )
    }, []);

    // test
    // useEffect(()=> {
    //     console.log('rendering ingredients');
    // })

    // filteredIngredientsHandler: useCallback preventing infinite rerendeing
    const filteredIngredientsHandler = useCallback(filteredIngredients => {
      setUserIngredients(filteredIngredients);
    }, []);

    // handler for the form to add some ingr. called by Ing-form submitHandler onAddIngredient.
    const addIngredientHandler = (ingredient) => {
        // firebase connection as POST req with headers config
        fetch('https://react-hooks-5b94f.firebaseio.com/ingredients.json', {
          method: 'POST',
          body: JSON.stringify(ingredient),
          headers: { 'Content-Type' : 'application/json' }
        }).then(response => {
            return response.json();
        }).then(responseData => {
            // get most recent Ingredient('prevIngredients') and
            // responseData comes from firebase .name property is firebase id convention
          setUserIngredients(prevIngredients => [
              // update previous data
              ...prevIngredients,
              { id: responseData.name, ...ingredient }
            ]);
        });
    };

    return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        <IngredientList ingredients={userIngredients} onRemoveItem={() => {}} />
      </section>
    </div>
);
}

export default Ingredients;
