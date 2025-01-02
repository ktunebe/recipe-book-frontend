import React from 'react';
import { Link } from 'react-router-dom';

function RecipeList({ recipes }) {
  return (
    <ul>
      {recipes.map((recipe) => {
        console.log('Recipe:', recipe); // Log the recipe object
        const recipeId = recipe.id.toString(); // Ensure recipe.id is converted to a string
        return (
          <li key={recipeId}>
            <Link to={`/recipes/${recipeId}`}>{recipe.title}</Link>
          </li>
        );
      })}
    </ul>
  );
}

export default RecipeList;