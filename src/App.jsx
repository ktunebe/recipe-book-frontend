import './App.css';
import { useState, useEffect } from 'react';
import axiosInstance from './api/axios';
import RecipeList from './RecipeList';
import Header from './Header';

function App() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axiosInstance.get('/recipes'); // Adjust the endpoint as needed
        setRecipes(response.data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <>
      <h1>Recipes</h1>
      <RecipeList recipes={recipes} />
    </>
  );
}

export default App;
