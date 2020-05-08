import React, { useState, useEffect, useCallback } from 'react';
import IngredientList from './IngredientList'
import IngredientForm from './IngredientForm';
import Search from './Search';
import ErrorModal from '../UI/ErrorModal'

const Ingredients= () => {
  const [userIngredients, setUserIngredients] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState() // no initial value

  useEffect(()=>{
    console.log('Rendering ingredients', userIngredients);
  }, [userIngredients])

  // update Ingr List and store it into array
  const addIngredientHandler = ingredient => {
    setIsLoading(true)
    // fetch from hooky3 firebase 
    fetch('https://hooky3-88cbd.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-Type' : 'application/json' }
      // parse body response
    }).then(response => {
      // set isLoading true
      setIsLoading(false)
      return response.json()
      // exexutes if fetch-promise is resolved
      // responseData is Firebase convention
    }).then(responseData => {
      setUserIngredients(prevIngredients => [
        ...prevIngredients, 
        { id: responseData.name, ...ingredient }
      ])
    }).catch(error => {
      setError('an error occured!')
      setIsLoading(false)
    })
  }
  
  // filteredIngredients on search component with useCallback wrapper
  const filteredIngredientsHandler = useCallback((filteredIngredients) => {
     setUserIngredients(filteredIngredients)
  }, [])

  // delete item
  const removeIngredientHandler = ingredientId => {
    setIsLoading(true)
    // fetch from hooky3 firebase 
    fetch(`https://hooky3-88cbd.firebaseio.com/ingredients/${ingredientId}.json`, {
      method: 'DELETE'
    }).then(response => {
      setIsLoading(false)
      setUserIngredients((prevIngredients) => 
        prevIngredients.filter((ingredient) => (ingredient.id !== ingredientId) ))
    })
  }

  // cleare Errormessage
  const clearError = ()=> {
    setError(null)
  }

  return (
    <div className="App">
      {error && <ErrorModal message={error} onClose={clearError} /> }
      <IngredientForm onAddIngredient={addIngredientHandler} loading={isLoading} />

      <section>
        <Search onLoadingIngredients={filteredIngredientsHandler} />
        <IngredientList 
          ingredients={userIngredients} 
          onRemoveItem={removeIngredientHandler} 
        />
      </section>
    </div>
  );
}

export default Ingredients;
