import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import fetchData from '../services/fetchRecipes';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../styles/RecipeDetails.css';
import ReturnButton from './ReturnButton';

export default function RecipeDetailsDrink() {
  const [isLoading, setIsLoading] = useState(true);
  const [dataDrinks, setDataDrinks] = useState([]);
  const [recomendation, setRecomendation] = useState([]);
  const [btnInProgress, setBtnInProgress] = useState(false);
  const [btnShare, setBtnShare] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const location = useLocation();
  let dataRecipe = [];
  let ingredients = [];
  const SIX = 6;
  const oito = 8;
  const id = location.pathname.slice(oito);
  const errorMessage = 'Um erro inesperado ocorreu';

  useEffect(() => {
    let recipe = {};
    const inProgressRecipes = localStorage.getItem('inProgressRecipes');
    if (inProgressRecipes) {
      recipe = JSON.parse(inProgressRecipes);
    }
    const keysInProgress = Object.keys(recipe);

    if (keysInProgress.includes('drinks')) {
      const keysDrinks = Object.keys(recipe.drinks);
      setBtnInProgress(keysDrinks.includes(`${id}`));
    }
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    const urlRecom = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    fetchData(url)
      .then((response) => setDataDrinks(response.drinks))
      // .catch(() => console.log(errorMessage))
      .finally(() => setIsLoading(false));

    fetchData(urlRecom)
      .then((response) => setRecomendation(response.meals.slice(0, SIX)))
      .catch(() => console.log(errorMessage));

    const favoriteRecipes = localStorage.getItem('favoriteRecipes');
    const getFavoritesLocalStorage = favoriteRecipes ? JSON.parse(favoriteRecipes) : [];

    if (getFavoritesLocalStorage.length > 0) {
      const keysDrinks = getFavoritesLocalStorage.filter(
        (favorite) => favorite.type === 'drink',
      );

      if (keysDrinks.length > 0) {
        const isFav = keysDrinks.find((drink) => drink.id === id);
        setIsFavorite(isFav);
      }
    }
  }, [id, location.pathname]);

  if (dataDrinks.length > 0) {
    dataRecipe = dataDrinks;
    const keysData = Object.keys(dataDrinks[0]);
    const ingredientsFilter = keysData.filter((key) => key.includes('strIngredient'));
    const meansureFilter = keysData.filter((key) => key.includes('strMeasure'));
    const valuesIng = ingredientsFilter.filter(
      (ingre) => dataDrinks[0][ingre] !== null && dataDrinks[0][ingre] !== '',
    );
    const valuesMen = meansureFilter.filter(
      (ingre) => dataDrinks[0][ingre] !== null,
    );
    valuesIng.forEach((add, index) => {
      let newValue = '';
      if (dataDrinks[0][valuesMen[index]] !== undefined) {
        newValue = `${dataDrinks[0][add]} - ${dataDrinks[0][valuesMen[index]]}`;
      } else {
        newValue = `${dataDrinks[0][add]}`;
      }
      ingredients = [...ingredients, newValue];
    });
  }

  const linkCopied = () => {
    const mil = 1000;
    setBtnShare(true);
    navigator.clipboard.writeText(`http://localhost:3000${location.pathname}`);
    setTimeout(() => {
      setBtnShare(false);
    }, mil);
  };

  const favorite = () => {
    const favoriteRecipes = localStorage.getItem('favoriteRecipes');
    const getFavoritesLocalStorage = favoriteRecipes
      ? JSON.parse(favoriteRecipes)
      : [];

    let allFavorites = [];
    if (isFavorite) {
      allFavorites = getFavoritesLocalStorage.filter(
        (getFav) => getFav.id !== id,
      );
      setIsFavorite(false);
    }
    if (dataDrinks.length > 0 && !isFavorite) {
      const newFavorite = {
        id: dataDrinks[0].idDrink,
        type: 'drink',
        nationality: '',
        category: dataDrinks[0].strCategory,
        alcoholicOrNot: dataDrinks[0].strAlcoholic,
        name: dataDrinks[0].strDrink,
        image: dataDrinks[0].strDrinkThumb,
      };
      setIsFavorite(true);
      allFavorites = [...getFavoritesLocalStorage, newFavorite];
    }
    localStorage.setItem('favoriteRecipes', JSON.stringify(allFavorites));
  };

  return (
    <div className="recipe-details">
      <ReturnButton location="/drinks" />
      <h1>Detalhes da receita</h1>
      {dataRecipe.length > 0 && (
        <div className="ingredients-info">
          {!isLoading && (
            <>
              <h2 data-testid="recipe-title">{dataRecipe[0].strDrink}</h2>
              <img
                data-testid="recipe-photo"
                src={ dataRecipe[0].strDrinkThumb }
                alt={ dataRecipe[0].idDrink }
                height="150px"
              />
              <h2 data-testid="recipe-category">
                {`${dataRecipe[0].strCategory} - ${dataRecipe[0].strAlcoholic}`}
              </h2>
            </>
          )}

          <ol>
            {ingredients.map((ing, index) => (
              <li
                key={ index }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {ing}
              </li>
            ))}
          </ol>
          <p data-testid="instructions">{dataRecipe[0].strInstructions}</p>
        </div>
      )}
      <button
        className="share-button"
        type="button"
        data-testid="share-btn"
        onClick={ linkCopied }
      >
        Compartilhar
      </button>
      {btnShare && <span className="copied-link">Link copied!</span>}
      <button
        className="favorite-button"
        type="button"
        data-testid="favorite-btn"
        onClick={ favorite }
        src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
      >
        <img src={ isFavorite ? blackHeartIcon : whiteHeartIcon } alt="heart" />
      </button>
      {recomendation.length === SIX && (
        <div className="allRecomendation">
          {recomendation.map((ele, ind) => (
            <div
              key={ ind }
              data-testid={ `${ind}-recommendation-card` }
              className="cardRecomendation"
            >
              <img
                className="imgRecomendation"
                src={ ele.strMealThumb }
                alt={ ele.strMeal }
              />
              <p data-testid={ `${ind}-recommendation-title` }>{ele.strMeal}</p>
            </div>
          ))}
        </div>
      )}
      <Link to={ `${location.pathname}/in-progress` }>
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="btnStart"
        >
          {!btnInProgress ? 'Iniciar receita' : ' Continuar Receita'}
        </button>
      </Link>
    </div>
  );
}
