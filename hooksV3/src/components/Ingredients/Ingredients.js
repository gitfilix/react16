import React, { useState, useEffect, useCallback, useReducer } from 'react'
import IngredientList from './IngredientList'
import IngredientForm from './IngredientForm'
import Search from './Search'
import ErrorModal from '../UI/ErrorModal'

const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {
    case 'SET':
      return action.ingredients
    case 'ADD':
      return [...currentIngredients, action.ingredient]
    case 'DELETE':
      // return all ing exept the one specified - that one is deleted.
      return currentIngredients.filter(ing => ing.id !== action.id)
    default:
      throw new Error('reducer: no action defined')
  }
}

const Ingredients= () => {
  // initialize useReducer with data (userIngredients)
  const [userIngredients, dispatch] = useReducer(ingredientReducer, [])

  // const [userIngredients, setUserIngredients] = useState([])
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
      //setUserIngredients(prevIngredients => [
      //  ...prevIngredients, 
      //  { id: responseData.name, ...ingredient }
      //])
      dispatch({
        type: 'ADD',
        ingredient: { 
          id: responseData.name, 
          ...ingredient 
        }
      })
    }).catch(error => {
      setError('an error occured!')
      setIsLoading(false)
    })
  }
  
  // filteredIngredients on search component with useCallback wrapper
  const filteredIngredientsHandler = useCallback((filteredIngredients) => {
    //  setUserIngredients(filteredIngredients)
    dispatch({
      type: 'SET',
      ingredients: filteredIngredients
    })
  }, [])

  // delete item
  const removeIngredientHandler = ingredientId => {
    setIsLoading(true)
    // fetch from hooky3 firebase 
    fetch(`https://hooky3-88cbd.firebaseio.com/ingredients/${ingredientId}.json`, {
      method: 'DELETE'
    }).then(response => {
      setIsLoading(false)
      // setUserIngredients((prevIngredients) => 
        // prevIngredients.filter((ingredient) => (ingredient.id !== ingredientId) ))
      dispatch({
        type: 'DELETE',
        id: ingredientId
      })  
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
