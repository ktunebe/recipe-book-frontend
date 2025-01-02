import React from 'react';

function Ingredient({ ingredientInstance }) {
  return (
    <li key={ingredientInstance.ingredientId}>
      {ingredientInstance.quantity ? `${ingredientInstance.quantity} ` : ''}
      {ingredientInstance.measurement ? `${ingredientInstance.measurement} ` : ''}
      {ingredientInstance.ingredientName || 'Loading...'}
      {ingredientInstance.prepMethod ? `, ${ingredientInstance.prepMethod}` : ''}
    </li>
  );
}

export default Ingredient;