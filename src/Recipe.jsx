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

        // Fetch ingredients for the recipe
        const fetchIngredients = async (ingredientId) => {
          const ingredientResponse = await axiosInstance.get(`/ingredients/${ingredientId}`);
          return ingredientResponse.data.name;
        };

        // Assign ingredient names to each ingredientInstance
        const updatedIngredientList = await Promise.all(
          recipeData.ingredientList.map(async (ingredientInstance) => {
            const ingredientName = await fetchIngredients(ingredientInstance.ingredientId);
            return { ...ingredientInstance, ingredientName };
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
      <ul>
        {recipe.ingredientList.map((ingredientInstance) => (
          <Ingredient key={`${recipe.id}-${ingredientInstance.ingredientId}`} ingredientInstance={ingredientInstance} />
        ))}
      </ul>
    </div>
  );
}

export default Recipe;