import React, { useState } from 'react';
import IngredientList from './IngredientList'
import IngredientForm from './IngredientForm';
import Search from './Search';


const Ingredients= () => {
  const [userIngedients, setUserIngredients] = useState([])

  // update Ingr List and store it into array
  const addIngredientHandler = ingredient => {
      // fetch from hooky3 firebase 
    fetch('https://hooky3-88cbd.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: {
        'Content-Type' : 'application/json' 
      }
      // parse body response
    }).then(response => {
      return response.json()
      // exexutes if fetch-promise is resolved
      // responseData is Firebase convention
    }).then(responseData => {
      setUserIngredients(prevIngredients => [
        ...prevIngredients, 
        { id: responseData.name, ...ingredient }
      ])
    })
  }

  //delete item
  const removeIngredientHandler = ingredientId => {
    setUserIngredients(prevIngredients => prevIngredients.filter((ingredient) => (ingredient.id !== ingredientId) ))
  }

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search />
        <IngredientList ingredients={userIngedients} onRemoveItem={removeIngredientHandler} />
      </section>
    </div>
  );
}

export default Ingredients;
