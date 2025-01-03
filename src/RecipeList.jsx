import React from 'react';
import { Link } from 'react-router-dom';

function RecipeList({ recipes }) {
  const salads = [];
  const appetizers = [];

  recipes.forEach((recipe) => {
    switch (recipe.category) {
      case 'salad':
        salads.push(recipe);
        break;
      case 'appetizer':
        appetizers.push(recipe);
        break;
      default:
        break;
    }
  });

  return (
    <div>
      <h2>Salads</h2>
      <ul>
        {salads.map((recipe) => {
          // const recipeId = recipe._id.toString(); // Ensure recipeId is correctly defined
          return (
            <li key={recipe.id}>
              <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
            </li>
          );
        })}
      </ul>

      <h2>Appetizers</h2>
      <ul>
        {appetizers.map((recipe) => {
          // const recipeId = recipe._id.toString(); // Ensure recipeId is correctly defined
          return (
            <li key={recipe.id}>
              <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default RecipeList;