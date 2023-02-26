import React from 'react';
import { useLocation } from 'react-router-dom';
import ProgressDetailsDrinks from '../components/ProgressDetailDrinks';
import ProgressDetailsMeals from '../components/ProgressDetailMeals';
import '../styles/RecipeDetails.css';

export default function RecipeInProgress() {
  const location = useLocation();
  const seven = 7;
  const type = location.pathname.slice(0, seven);
  if (type === '/meals/') {
    return <ProgressDetailsMeals />;
  }
  if (type === '/drinks') {
    return (
      <ProgressDetailsDrinks />
    );
  }
}
