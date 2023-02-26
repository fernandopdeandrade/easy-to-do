import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import HeaderNoSearch from '../components/HeaderNoSearch';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../styles/FavoriteRecipe.css';

function FavoriteRecipes() {
  const [redirectIdDrink, setRedirectIdDrink] = useState(false);
  const [redirectIdMeal, setRedirectIdMeal] = useState(false);
  const [idRecipe, setIdRecipe] = useState('');
  const [btnShare, setBtnShare] = useState(false);

  const getFavoritesLocalStorage = localStorage
    .getItem('favoriteRecipes') ? JSON
      .parse(localStorage.getItem('favoriteRecipes')) : [];

  const [getFavorites, setGetFavorites] = useState(getFavoritesLocalStorage);
  const [filters, setFilters] = useState('');

  if (redirectIdMeal) return <Redirect to={ `/meals/${idRecipe}` } />;
  if (redirectIdDrink) return <Redirect to={ `/drinks/${idRecipe}` } />;

  const arrayFavorites = getFavorites
    .filter((favoriteFiltered) => favoriteFiltered.type !== filters);

  const unfavorite = ({ target }) => {
    const newFavorites = getFavorites
      .filter((_recipe, index) => index !== parseInt(target.name, 10));
    setGetFavorites(newFavorites);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
  };

  const allFilter = () => setFilters('');

  const mealsFilter = () => setFilters('drink');

  const drinksFilter = () => setFilters('meal');

  const imgTeste = ({ target }) => {
    const { id, type } = arrayFavorites[target.name];
    setIdRecipe(id);
    if (type === 'meal') setRedirectIdMeal(true);
    if (type === 'drink') setRedirectIdDrink(true);
  };

  const linkCopied = ({ target }) => {
    const oneThousand = 1000;
    setBtnShare(true);
    navigator.clipboard.writeText(`http://localhost:3000/${target.name}`);
    setTimeout(() => {
      setBtnShare(false);
    }, oneThousand);
  };

  return (
    <div className="favorite-recipes">
      <HeaderNoSearch title="Favorite Recipes" />

      <div className="filters">
        <button type="button" data-testid="filter-by-all-btn" onClick={ allFilter }>
          Todos
        </button>
        <button type="button" data-testid="filter-by-meal-btn" onClick={ mealsFilter }>
          Comidas
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ drinksFilter }
        >
          Bebidas
        </button>
      </div>
      <ul>
        { arrayFavorites && (arrayFavorites.map((favoriteMeal, indexMeal) => (
          <li key={ indexMeal }>
            <button type="button" onClick={ imgTeste } className="btnRecipes">
              <img
                className="imgRecipes"
                src={ favoriteMeal.image }
                alt="recipe"
                data-testid={ `${indexMeal}-horizontal-image` }
                name={ indexMeal }
              />
            </button>
            <p data-testid={ `${indexMeal}-horizontal-top-text` }>
              {favoriteMeal.type === 'meal' ? (
                `${favoriteMeal.nationality} - ${favoriteMeal.category}`
              ) : `${favoriteMeal.alcoholicOrNot}` }
            </p>
            <button
              name={ indexMeal }
              type="button"
              onClick={ imgTeste }
              data-testid={ `${indexMeal}-horizontal-name` }
            >
              { favoriteMeal.name }
            </button>
            <div className="buttons">
              <button
                type="button"
                data-testid={ `${indexMeal}-horizontal-share-btn` }
                src={ shareIcon }
                onClick={ linkCopied }
              >
                <img
                  src={ shareIcon }
                  alt="icon share"
                  className="imgBtn"
                  name={ `${favoriteMeal.type}s/${favoriteMeal.id}` }
                />
              </button>
              <button
                type="button"
                data-testid={ `${indexMeal}-horizontal-favorite-btn` }
                src={ blackHeartIcon }
                onClick={ (event) => unfavorite(event) }
              >
                <img
                  name={ indexMeal }
                  src={ blackHeartIcon }
                  alt="icon black heart"
                  className="imgBtn"
                />
              </button>
            </div>
            {btnShare && <span>Link copiado!</span>}
          </li>
        )))}
      </ul>
    </div>
  );
}

export default FavoriteRecipes;
