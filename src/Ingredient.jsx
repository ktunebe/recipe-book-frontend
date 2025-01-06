import React, { useState } from 'react';
import IngredientPopup from './IngredientPopup';
import { fractify } from './utils/fractify';
import { pluralize } from './utils/pluralize';
import { capitalize } from './utils/capitalize';

function Ingredient({ ingredientInstance }) {
  const [isChecked, setIsChecked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsPopupVisible(false); // Hide popup when mouse leaves
  };

  const handleSpanClick = () => {
    setIsPopupVisible(!isPopupVisible); // Show popup when span is clicked
  };

  const { ingredientId, ingredientName, quantity, measurement, additionalInfo, prepMethod, ingredient } = ingredientInstance;
  const { whole, fraction } = fractify(quantity);

  // ingredientInstance.quantity *= 2

  return (
    <li key={ingredientId} className='flex items-center my-2'>
      <input
        type="checkbox"
        className="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <div className={`ml-2 ${isChecked ? 'italic text-gray-500' : ''}`}>
      {quantity ? (
          <>
            {whole !== 0 && `${whole} `}
            {`${fraction} `}
          </>
        ) : ''}
        {measurement ? 
          `${quantity > 1  ? `${pluralize(measurement)} ` : `${measurement} `}` 
          : ''}
        {additionalInfo ? `${additionalInfo} ` : ''}
        <span
          onClick={handleSpanClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className='relative cursor-help underline decoration-dotted decoration-1 underline-offset-4'
        >
          {quantity || measurement || additionalInfo
            ? `${quantity > 1 && !measurement ? pluralize(ingredientName) : ingredientName}`
            : capitalize(ingredientName) || 'Loading...'}
          {isPopupVisible && (
            <div
              className='absolute bottom-1 left-0 z-10 text-red-500 border-8 border-transparent p-4 shadow-md w-auto whitespace-nowrap'
            >
              <IngredientPopup
                name={ingredientName}
                description={ingredient.description}
              />
            </div>
          )}
        </span>
        {prepMethod ? `, ${prepMethod}` : ''}
      </div>
    </li>
  );
}

export default Ingredient;