import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Loading from '../components/Loading';
import useDataInfos from '../hooks/useDataInfos';
import drinkIcon from '../images/drinkIcon.svg';
import '../styles/Drinks.css';

export default function Meals() {
  const {
    dataDrinks,
    dataDrinksCategory,
    isLoading,
    error,
    categoryFilterDrinks,
    setFilterDrinks,
  } = useDataInfos();

  const [toggle, setToggle] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (error) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  }, [error]);

  const forty = 40;
  const theFirstForty = dataDrinks.slice(0, forty);

  const five = 5;
  const theFirstFive = dataDrinksCategory.slice(0, five);

  const imageOrdinaryDrink = 'https://www.pikpng.com/pngl/b/89-898322_drinks-coloring-page-champagne-glasses-icon-transparent-background.png';
  const imageCocktail = 'https://cdn-icons-png.flaticon.com/512/37/37815.png';
  const imageShake = 'https://cdn-icons-png.flaticon.com/512/1892/1892185.png';
  const imageOther = 'https://cdn-icons-png.flaticon.com/128/2748/2748602.png';
  const imageCocoa = 'https://cdn-icons-png.flaticon.com/512/292/292853.png';

  const selectSrc = (category) => {
    if (category === 'Ordinary Drink') {
      return imageOrdinaryDrink;
    }
    if (category === 'Cocktail') {
      return imageCocktail;
    }
    if (category === 'Shake') {
      return imageShake;
    }
    if (category === 'Other / Unknown') {
      return imageOther;
    }
    if (category === 'Cocoa') {
      return imageCocoa;
    }
  };

  const setCategoryFilterDrinks = (drink) => {
    categoryFilterDrinks(drink);
    setToggle(!toggle);
  };

  const returnToDefaultDrinks = () => {
    setFilterDrinks();
    setToggle(!toggle);
  };

  const redirectToDetails = (id) => {
    history.push(`/drinks/${id}`);
  };

  const teenCaracters = (strDrink) => {
    const teen = 10;
    if (strDrink.length > teen) {
      return `${strDrink.slice(0, teen)}...`;
    }
    return strDrink;
  };

  return (
    <>
      <Header title="Drinks" />
      <div className="drinks-page">
        <div className="drink-icon">
          <img src={ drinkIcon } alt="drink-icon" />
        </div>
        <div className="drinks-container">
          <div className="drinks-categories">
            <div className="drinks-categories-list">
              {theFirstFive.map((drink, index) => (
                <button
                  type="button"
                  key={ index }
                  data-testid={ `${drink.strCategory}-category-filter` }
                  onClick={ () => (!toggle
                    ? setCategoryFilterDrinks(drink.strCategory)
                    : returnToDefaultDrinks()) }
                >
                  <img
                    className="drinks-categories-list-img"
                    src={ selectSrc(drink.strCategory) }
                    alt={ drink.strCategory }
                  />
                </button>
              ))}
            </div>
            <button
              className="all-categories"
              data-testid="All-category-filter"
              type="button"
              onClick={ () => setFilterDrinks() }
            >
              Todos
            </button>
          </div>
          <div className="drinks-list-image">
            {isLoading && <Loading />}
            {error && <p>{error}</p>}
            {theFirstForty.map((drink, index) => (
              <button
                className="drink-card"
                type="button"
                onClick={ () => redirectToDetails(drink.idDrink) }
                key={ index }
              >
                <div
                  className="drinks-card"
                  data-testid={ `${index}-recipe-card` }
                >
                  <p data-testid={ `${index}-card-name` }>
                    {teenCaracters(drink.strDrink)}
                  </p>
                  <img
                    src={ drink.strDrinkThumb }
                    alt={ drink.strDrink }
                    data-testid={ `${index}-card-img` }
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
