import { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import drinkIcon from '../images/drinkIcon.svg';
import { FilterContextState } from '../context/InfoContext';
import '../styles/Drinks.css';

export default function RecipeSearchDrinks() {
  const { filterDrinks } = useContext(FilterContextState);

  const forty = 40;
  const theFirstForty = filterDrinks.slice(0, forty);

  return (
    <div className="drinks-page">
      <Header title="Drinks" />
      <div className="drink-icon">
        <img src={ drinkIcon } alt="drink-icon" />
      </div>
      <div className="response-search-drinks">
        {theFirstForty.map((drink, index) => (
          <div
            className="drink-card"
            key={ index }
            data-testid={ `${index}-recipe-card` }
          >
            <p data-testid={ `${index}-card-name` }>{drink.strDrink}</p>
            <img
              src={ drink.strDrinkThumb }
              alt={ drink.strDrink }
              data-testid={ `${index}-card-img` }
            />
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
