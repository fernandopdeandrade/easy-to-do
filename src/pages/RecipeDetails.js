import React from 'react';
import { useLocation } from 'react-router-dom';
import RecipeDetailsDrinks from '../components/RecipeDetailsDrink';
import RecipeDetailsMeals from '../components/RecipeDetailsMeal';
import '../styles/RecipeDetails.css';

export default function RecipeDetails() {
  const location = useLocation();
  const seven = 7;
  const type = location.pathname.slice(0, seven);
  if (type === '/meals/') {
    return <RecipeDetailsMeals />;
  }
  if (type === '/drinks') {
    return (
      <RecipeDetailsDrinks />
    );
  }
}
