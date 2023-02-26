import { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import mealIcon from '../images/drinkIcon.svg';
import { FilterContextState } from '../context/InfoContext';
import '../styles/Meals.css';

export default function RecipeSearchsMeals() {
  const { filterMeals } = useContext(FilterContextState);

  const forty = 40;
  const theFirstForty = filterMeals.slice(0, forty);

  return (
    <div className="meals-page">
      <Header title="Meals" />
      <div className="meal-icon">
        <img src={ mealIcon } alt="meal-icon" />
      </div>
      <div className="response-search-meals">
        {theFirstForty.map((meal, index) => (
          <div
            className="meal-card"
            key={ index }
            data-testid={ `${index}-recipe-card` }
          >
            <p data-testid={ `${index}-card-name` }>{meal.strMeal}</p>
            <img
              src={ meal.strMealThumb }
              alt={ meal.strMeal }
              data-testid={ `${index}-card-img` }
            />
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
