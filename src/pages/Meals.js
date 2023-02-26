import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Loading from '../components/Loading';
import useDataInfos from '../hooks/useDataInfos';
import mealIcon from '../images/mealIcon.svg';
import '../styles/Meals.css';

export default function Meals() {
  const {
    dataMeals,
    dataMealsCategory,
    isLoading,
    categoryFilterMeals,
    setFilterMeals,
  } = useDataInfos();

  const [toggle, setToggle] = useState(false);
  const history = useHistory();

  const forty = 40;
  const theFirstForty = dataMeals.slice(0, forty);

  const five = 5;
  const theFirstFive = dataMealsCategory.slice(0, five);

  const imageBeef = 'https://cdn-icons-png.flaticon.com/512/2537/2537216.png';
  const imageBreakfast = 'https://cdn-icons-png.flaticon.com/512/985/985505.png';
  const imageChicken = 'https://iconarchive.com/download/i87569/icons8/ios7/Animals-Chicken.ico';
  const imageDessert = 'https://img.icons8.com/ios/500/dessert.png';
  const imageGoat = 'https://cdn-icons-png.flaticon.com/512/1886/1886905.png';

  const selectSrc = (category) => {
    if (category === 'Beef') {
      return imageBeef;
    }
    if (category === 'Breakfast') {
      return imageBreakfast;
    }
    if (category === 'Chicken') {
      return imageChicken;
    }
    if (category === 'Dessert') {
      return imageDessert;
    }
    if (category === 'Goat') {
      return imageGoat;
    }
  };

  const setCategoryFilterMeals = (meal) => {
    categoryFilterMeals(meal);
    setToggle(!toggle);
  };

  const returnToDefaultMeals = () => {
    setFilterMeals();
    setToggle(!toggle);
  };

  const redirectToDetails = (id) => {
    history.push(`/meals/${id}`);
  };

  const teenCaracters = (strMeal) => {
    const teen = 10;
    if (strMeal.length > teen) {
      return `${strMeal.slice(0, teen)}...`;
    }
    return strMeal;
  };

  return (
    <>
      <Header title="Meals" />
      <div className="meals-page">
        <div className="meal-icon">
          <img src={ mealIcon } alt="meal-icon" />
        </div>
        <div className="meals-container">
          <div className="meals-categories">
            <div className="meals-categories-list">
              {theFirstFive.map((meal, index) => (
                <button
                  type="button"
                  key={ index }
                  data-testid={ `${meal.strCategory}-category-filter` }
                  onClick={ () => (!toggle
                    ? setCategoryFilterMeals(meal.strCategory)
                    : returnToDefaultMeals()) }
                >
                  <img
                    className="meals-categories-list-img"
                    src={ selectSrc(meal.strCategory) }
                    alt={ meal.strCategory }
                  />
                </button>
              ))}
            </div>
            <button
              className="all-categories"
              data-testid="All-category-filter"
              type="button"
              onClick={ () => setFilterMeals() }
            >
              Todos
            </button>
          </div>
          <div className="meals-list-image">
            {isLoading && <Loading />}
            {theFirstForty.map((meal, index) => (
              <button
                className="meal-card"
                type="button"
                onClick={ () => redirectToDetails(meal.idMeal) }
                key={ index }
              >
                <div
                  className="meals-card-img"
                  data-testid={ `${index}-recipe-card` }
                >
                  <p data-testid={ `${index}-card-name` }>
                    {teenCaracters(meal.strMeal)}
                  </p>
                  <img
                    src={ meal.strMealThumb }
                    alt={ meal.strMeal }
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
