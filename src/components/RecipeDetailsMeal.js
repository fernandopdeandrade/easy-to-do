import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import fetchData from '../services/fetchRecipes';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../styles/RecipeDetails.css';
import ReturnButton from './ReturnButton';

export default function RecipeDetailsMeal() {
  const [isLoading, setIsLoading] = useState(true);
  const [dataMeals, setDataMeals] = useState([]);
  const [recomendation, setRecomendation] = useState([]);
  const [btnInProgress, setBtnInProgress] = useState(false);
  const [btnShare, setBtnShare] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const location = useLocation();
  let dataRecipe = [];
  let ingredients = [];
  let a = '';
  const SIX = 6;
  const sete = 7;
  const id = location.pathname.slice(sete);
  const errorMessage = 'Um erro inesperado ocorreu';

  useEffect(() => {
    let recipe = {};
    const inProgressRecipes = localStorage.getItem('inProgressRecipes');
    if (inProgressRecipes !== null) recipe = JSON.parse(inProgressRecipes);
    const keysInProgress = Object.keys(recipe);

    if (keysInProgress.includes('meals')) {
      const keysMeals = Object.keys(recipe.meals);
      setBtnInProgress(keysMeals.includes(`${id}`));
    }
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const urlRecom = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    fetchData(url)
      .then((response) => setDataMeals(response.meals))
      // .catch(() => console.log(errorMessage))
      .finally(() => setIsLoading(false));

    fetchData(urlRecom)
      .then((response) => setRecomendation(response.drinks.slice(0, SIX)))
      .catch(() => console.log(errorMessage));

    const getFavoritesLocalStorage = localStorage
      .getItem('favoriteRecipes') ? JSON
        .parse(localStorage.getItem('favoriteRecipes')) : [];

    if (getFavoritesLocalStorage.length > 0) {
      const keysMeals = getFavoritesLocalStorage
        .filter((favorite) => favorite.type === 'meal');
      if (keysMeals.length > 0) {
        const isFav = keysMeals.find((meal) => meal.id === id);
        setIsFavorite(isFav);
      }
    }
  }, [id, location.pathname]);

  if (dataMeals.length > 0) {
    dataRecipe = dataMeals;
    const ytVideo = dataRecipe[0].strYoutube;
    a = ytVideo.replace('watch?v=', 'embed/');
    const keysData = Object.keys(dataMeals[0]);
    const ingredientsFilter = keysData.filter((key) => key.includes('strIngredient'));
    const meansureFilter = keysData.filter((key) => key.includes('strMeasure'));
    const valuesIng = ingredientsFilter
      .filter((ingre) => (dataMeals[0][ingre] !== null) && (dataMeals[0][ingre] !== ''));
    const valuesMen = meansureFilter.filter((ingre) => (dataMeals[0][ingre] !== null));
    valuesIng.forEach((add, index) => {
      let newValue = '';
      if (dataMeals[0][valuesMen[index]] !== undefined) {
        newValue = `${dataMeals[0][add]} - ${dataMeals[0][valuesMen[index]]}`;
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
    const getFavoritesLocalStorage = localStorage
      .getItem('favoriteRecipes') ? JSON
        .parse(localStorage.getItem('favoriteRecipes')) : [];
    const newFavorite = {};
    let allFavorites = [];
    if (isFavorite) {
      allFavorites = getFavoritesLocalStorage.filter((getFav) => getFav.id !== id);
      setIsFavorite(false);
    }
    if ((dataMeals.length > 0) && !isFavorite) {
      newFavorite.id = dataMeals[0].idMeal;
      newFavorite.type = 'meal';
      newFavorite.nationality = dataMeals[0].strArea;
      newFavorite.category = dataMeals[0].strCategory;
      newFavorite.alcoholicOrNot = '';
      newFavorite.name = dataMeals[0].strMeal;
      newFavorite.image = dataMeals[0].strMealThumb;
      setIsFavorite(true);
      allFavorites = [...getFavoritesLocalStorage, newFavorite];
    }
    localStorage.setItem('favoriteRecipes', JSON.stringify(allFavorites));
  };

  return (
    <div className="recipe-details">
      <ReturnButton location="/meals" />
      <h1>Detalhes da receita</h1>
      { (dataRecipe.length > 0) && (
        <div className="ingredients-info">
          {(!isLoading) && (
            <>
              <h2 data-testid="recipe-title">{ dataRecipe[0].strMeal }</h2>
              <img
                data-testid="recipe-photo"
                src={ dataRecipe[0].strMealThumb }
                alt={ dataRecipe[0].idMeal }
                height="150px"
              />
              <h2 data-testid="recipe-category">{ dataRecipe[0].strCategory }</h2>
            </>
          )}

          <ol>
            {ingredients.map((ing, index) => (
              <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
                {ing}
              </li>
            ))}
          </ol>
          <p data-testid="instructions">{ dataRecipe[0].strInstructions }</p>
          <iframe title="video" data-testid="video" src={ a } />
        </div>
      )}
      { btnInProgress && (
        <button type="button" data-testid="start-recipe-btn">Continue Recipe</button>
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
                src={ ele.strDrinkThumb }
                alt={ ele.strDrink }
              />
              <p data-testid={ `${ind}-recommendation-title` }>{ele.strDrink}</p>
            </div>
          ))}
        </div>
      )}
      <Link to={ `${location.pathname}/in-progress` }>
        <button type="button" data-testid="start-recipe-btn" className="btnStart">
          Iniciar receita
        </button>
      </Link>
    </div>
  );
}
