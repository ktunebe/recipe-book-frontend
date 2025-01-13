import React from 'react'

function IngredientPopup({ name, description }) {
  const shopURL = `https://www.google.com/search?tbm=shop&q=${name}`

  return (
    <>
    <div className='bg-white p-2 w-[75vw] md:w-[50vw] xl:w-[30vw]'>
      <p className='text-wrap'>{description}</p>
      <a href={shopURL} target='_blank' className='hover:underline'>Shop for {name}</a>
    </div>
    </>
  )
}

export default IngredientPopup