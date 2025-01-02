import React from 'react'

function IngredientPopup({ name, description }) {
  const shopURL = `https://www.google.com/search?tbm=shop&q=${name}`

  return (
    <>
    <div className='bg-white p-2'>
      <p className=''>{description}</p>
      <a href={shopURL} target='_blank' className='hover:underline'>Shop for {name}</a>
    </div>
    </>
  )
}

export default IngredientPopup