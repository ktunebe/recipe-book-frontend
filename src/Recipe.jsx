import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from './api/axios';
import Ingredient from './Ingredient';

function Recipe() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axiosInstance.get(`/recipes/${id}`); // Adjust the endpoint as needed
        const recipeData = response.data;

        // Fetch ingredient object for the recipe
        const fetchIngredient = async (ingredientId) => {
          const ingredientResponse = await axiosInstance.get(`/ingredients/${ingredientId}`);
          return ingredientResponse.data;
        };

        // Assign ingredient objects to each ingredientInstance
        const updatedIngredientList = await Promise.all(
          recipeData.ingredientList.map(async (ingredientInstance) => {
            const ingredient = await fetchIngredient(ingredientInstance.ingredientId);
            return { ...ingredientInstance, ingredient };
          })
        );

        setRecipe({ ...recipeData, ingredientList: updatedIngredientList });
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{recipe.title}</h1>
      <h2 className='text-3xl text-red-500 my-4'>Ingredients</h2>
        <ul className='text-left'>
          {recipe.ingredientList.map((ingredientInstance, index) => (
            <Ingredient key={`${recipe.id}-${index}`} ingredientInstance={ingredientInstance} />
          ))}
        </ul>
      <h2 className='text-3xl text-red-500 my-4'>Instructions</h2>
        <ol className='list-decimal list-inside text-left'>
          {recipe.instructions.map((instruction, index) => (
            <li key={`${recipe.id}-${index}`} className='my-2 text-wrap'>{instruction}</li>
          ))}
        </ol>
    </div>
  );
}

export default Recipe;