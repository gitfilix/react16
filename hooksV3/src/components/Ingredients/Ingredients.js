import React, { useState } from 'react';
import IngredientList from './IngredientList'
import IngredientForm from './IngredientForm';
import Search from './Search';


const Ingredients= () => {
  const [userIngedients, setUserIngredients] = useState([])

  // update Ingr List and store it into array
  const addIngredientHandler = ingredient => {
      setUserIngredients(prevIngredients => [...prevIngredients, {
            id: Math.random().toString(), 
            ...ingredient
          }
      ])
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
