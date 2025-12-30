import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from './api/axios'
import Ingredient from './Ingredient'

function Recipe() {
	const { id } = useParams()
	const [recipe, setRecipe] = useState(null)
	const [recipeMultiplier, setRecipeMultiplier] = useState(1)

	const multiplierObjects = [
		{ num: 0.5, string: 'Half Recipe' },
		{ num: 1, string: 'Standard Recipe' },
		{ num: 2, string: 'Double Recipe' },
		{ num: 3, string: 'Triple Recipe' },
	]

	useEffect(() => {
		const fetchRecipe = async () => {
			try {
				const response = await axiosInstance.get(`/recipes/${id}`) // Adjust the endpoint as needed
				const recipeData = response.data

				// Fetch ingredient object for the recipe
				const fetchIngredient = async (ingredientId) => {
					const ingredientResponse = await axiosInstance.get(
						`/ingredients/${ingredientId}`
					)
					return ingredientResponse.data
				}

				// Assign ingredient objects to each ingredientInstance
				const updatedIngredientList = await Promise.all(
					recipeData.ingredientList.map(async (ingredientInstance) => {
						const ingredient = await fetchIngredient(
							ingredientInstance.ingredientId
						)
						return { ...ingredientInstance, ingredient }
					})
				)

				setRecipe({ ...recipeData, ingredientList: updatedIngredientList })
			} catch (error) {
				console.error('Error fetching recipe:', error)
			}
		}

		fetchRecipe()
	}, [id])

	const handleMultiplierChange = (event) => {
		setRecipeMultiplier(Number(event.target.value))
	}

	if (!recipe) {
		return <div>Loading...</div>
	}

	const scaledIngredientList = recipe.ingredientList.map(
		(ingredientInstance) => {
			const { quantity } = ingredientInstance

			// Handle optional quantities (like "to taste")
			if (quantity == null) return ingredientInstance

			return {
				...ingredientInstance,
				quantity: quantity * recipeMultiplier,
			}
		}
	)

	return (
		<div m-0>
			<h1>{recipe.title}</h1>
			<img
				src={recipe.imagePath || '/images/recipes/default.jpg'}
				alt={recipe.title}
				className="w-1/3 h-auto max-w-md my-8 mx-auto rounded-lg"
			/>

			<div className='my-4'>
				<label htmlFor="recipeMultiplier" >Recipe Size: </label>
				<select
					name="multiplier"
					value={recipeMultiplier}
					onChange={handleMultiplierChange}
					className='px-1 py-0.5 rounded-xl'>
					{multiplierObjects.map((multiplierObject, index) => (
						<option key={index} value={multiplierObject.num}>
							{multiplierObject.string}
						</option>
					))}
				</select>
			</div>
			<div className='bg-stone-200 bg-opacity-75 mx-auto p-4 rounded-xl lg:w-1/2 md:w-2/3 w-5/6 mb-8'>
				<h2 className="text-3xl mb-4">Ingredients</h2>
				<ul className="text-left">
					{scaledIngredientList.map((ingredientInstance, index) => (
						<Ingredient
							key={`${recipe.id}-${index}`}
							ingredientInstance={ingredientInstance}
						/>
					))}
				</ul>
			</div>
			<div className='bg-stone-200 bg-opacity-75 mx-auto p-4 rounded-xl lg:w-1/2 md:w-2/3 w-5/6'>
			<h2 className="text-3xl my-4">Instructions</h2>
			<ol className="list-decimal list-inside text-left">
				{recipe.instructions.map((instruction, index) => (
					<li key={`${recipe.id}-${index}`} className="my-2 text-wrap">
						{instruction}
					</li>
				))}
			</ol>
		</div>
		</div>
	)
}

export default Recipe
