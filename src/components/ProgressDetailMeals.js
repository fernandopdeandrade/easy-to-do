import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import fetchData from '../services/fetchRecipes';
import '../styles/ProgressDetails.css';
import ReturnButton from './ReturnButton';

export default function ProgressDetailsMeals() {
  const [isLoading, setIsLoading] = useState(true);
  const [dataMealsInProgress, setDataMealsInProgress] = useState([]);
  const [btnShare, setBtnShare] = useState(false);
  const [verifiedElements, setVerifiedElements] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [btnInProgress, setBtnInProgress] = useState(false);
  console.log(btnInProgress);

  const location = useLocation();
  let dataProgress = [];
  let ingredients = [];
  let a = '';
  const errorMessage = 'Um erro inesperado ocorreu';

  const verifyElement = ({ target: { checked, id } }) => {
    const checkBoxes = document.getElementsByTagName('input', { type: 'checkbox' });
    const allChecks = [...checkBoxes];
    const checkElements = allChecks.filter((element) => element.checked);
    setIsDone(checkElements.length === allChecks.length);

    if (checked) {
      setVerifiedElements([...verifiedElements, id]);
    } else {
      setVerifiedElements(verifiedElements.filter((ele) => ele !== id));
    }
  };

  useEffect(() => {
    const local = localStorage.getItem('inProgressRecipes');
    if (local !== null) {
      setVerifiedElements(JSON.parse(local));
    }
    let recipe = {};
    const sete = 7;

    const inProgressRecipes = localStorage.getItem('inProgressRecipes');
    if (inProgressRecipes !== null) recipe = JSON.parse(inProgressRecipes);
    const keysInProgress = Object.keys(recipe);

    const ids = location.pathname.slice(sete);
    const numberCut = ids.indexOf('/');
    const id = ids.slice(0, numberCut);

    if (keysInProgress.includes('meals')) {
      const keysMeals = Object.keys(recipe.meals);
      setBtnInProgress(keysMeals.includes(`${id}`));
      console.log(btnInProgress);
    }
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    fetchData(url)
      .then((response) => setDataMealsInProgress(response.meals))
      .catch(() => console.log(errorMessage))
      .finally(() => setIsLoading(false));

    const favoriteRecipes = localStorage.getItem('favoriteRecipes');
    const getFavoritesLocalStorage = favoriteRecipes ? JSON.parse(favoriteRecipes) : [];
    console.log(getFavoritesLocalStorage);

    if (getFavoritesLocalStorage.length > 0) {
      const keysMeals = getFavoritesLocalStorage.filter(
        (favorite) => favorite.type === 'meal',
      );

      if (keysMeals.length > 0) {
        const isFav = keysMeals.find((meal) => meal.id === id);
        setIsFavorite(isFav);
      }
    }
  }, [location.pathname, btnInProgress]);

  useEffect(() => {
    if (verifiedElements.length > 0) {
      localStorage.setItem('inProgressRecipes', JSON.stringify(verifiedElements));
    }
  }, [verifiedElements]);

  const linkCopied = () => {
    const mil = 1000;
    setBtnShare(true);
    const inProg = location.pathname.indexOf('/in-progress');
    navigator.clipboard.writeText(`http://localhost:3000${location.pathname.slice(0, inProg)}`);
    setTimeout(() => {
      setBtnShare(false);
    }, mil);
  };

  const favorite = () => {
    const sete = 7;
    const ids = location.pathname.slice(sete);
    const numberCut = ids.indexOf('/');
    const id = ids.slice(0, numberCut);
    const favoriteRecipes = localStorage.getItem('favoriteRecipes');
    const getFavoritesLocalStorage = favoriteRecipes
      ? JSON.parse(favoriteRecipes)
      : [];
    const newFavorite = {};
    let allFavorites = [];

    if (isFavorite) {
      allFavorites = getFavoritesLocalStorage.filter((getFav) => getFav.id !== id);
      setIsFavorite(false);
    }
    if ((dataMealsInProgress.length > 0) && !isFavorite) {
      newFavorite.id = dataMealsInProgress[0].idMeal;
      newFavorite.type = 'meal';
      newFavorite.nationality = dataMealsInProgress[0].strArea;
      newFavorite.category = dataMealsInProgress[0].strCategory;
      newFavorite.alcoholicOrNot = '';
      newFavorite.name = dataMealsInProgress[0].strMeal;
      newFavorite.image = dataMealsInProgress[0].strMealThumb;
      setIsFavorite(true);
      allFavorites = [...getFavoritesLocalStorage, newFavorite];
    }
    localStorage.setItem('favoriteRecipes', JSON.stringify(allFavorites));
  };

  if (dataMealsInProgress.length > 0) {
    dataProgress = dataMealsInProgress;
    const ytVideo = dataProgress[0].strYoutube;
    a = ytVideo.replace('watch?v=', 'embed/');
    const keysData = Object.keys(dataMealsInProgress[0]);
    const ingredientsFilter = keysData.filter((key) => key.includes('strIngredient'));
    const meansureFilter = keysData.filter((key) => key.includes('strMeasure'));
    const valuesIng = ingredientsFilter
      .filter((ingre) => (dataMealsInProgress[0][ingre] !== null)
        && (dataMealsInProgress[0][ingre] !== ''));
    const valuesMen = meansureFilter
      .filter((ingre) => dataMealsInProgress[0][ingre] !== null);
    valuesIng.forEach((add, index) => {
      let newValue = '';
      if (dataMealsInProgress[0][valuesMen[index]] !== undefined) {
        newValue = `${dataMealsInProgress[0][add]} 
        - ${dataMealsInProgress[0][valuesMen[index]]}`;
      } else { newValue = `${dataMealsInProgress[0][add]}`; }
      ingredients = [...ingredients, newValue];
    });
  }

  const saveRecipe = () => {
    const tags = dataProgress[0].strTags.split(',');
    let getDoneRecipes = localStorage
      .getItem('doneRecipes') ? JSON
        .parse(localStorage.getItem('doneRecipes')) : [];
    const newDone = {
      id: dataProgress[0].idMeal,
      type: 'meal',
      nationality: dataProgress[0].strArea,
      category: dataProgress[0].strCategory,
      alcoholicOrNot: '',
      name: dataProgress[0].strMeal,
      image: dataProgress[0].strMealThumb,
      doneDate: new Date().toISOString(),
      tags,
    };
    getDoneRecipes = [...getDoneRecipes, newDone];
    localStorage.setItem('doneRecipes', JSON.stringify(getDoneRecipes));
  };

  const DOZE = 12;

  return (
    <div className="recipe-details">
      <ReturnButton location={ location.pathname.slice(0, DOZE) } />
      <h1>Hora de fazer</h1>
      {(dataProgress.length > 0) && (
        <div className="ingredients-info">
          {(!isLoading) && (
            <>
              <h2 data-testid="recipe-title">{dataProgress[0].strMeal}</h2>
              <img
                data-testid="recipe-photo"
                src={ dataProgress[0].strMealThumb }
                alt={ dataProgress[0].idMeal }
                height="150px"
              />
              <h2 data-testid="recipe-category">{dataProgress[0].strCategory}</h2>
            </>
          )}

          <ol>
            <div className="all-itens">
              {ingredients.map((ing, index) => (
                <div className="itens-list" key={ index }>
                  <label
                    data-testid={ `${index}-ingredient-step` }
                    htmlFor={ ing }
                    className={ verifiedElements
                      .some((element) => element === ing) ? 'checked' : 'noChecked' }
                  >
                    <input
                      onClick={ (event) => verifyElement(event) }
                      type="checkbox"
                      id={ ing }
                      name={ ing }
                      defaultChecked={ verifiedElements
                        .some((element) => element === ing) }
                    />
                    {' '}
                    {ing}
                  </label>
                </div>
              ))}
            </div>
          </ol>
          <p data-testid="instructions">{dataProgress[0].strInstructions}</p>
          <iframe title="video" data-testid="video" src={ a } />
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
      <Link to="/done-recipes">
        <button
          className="finish-recipe-button"
          type="button"
          data-testid="finish-recipe-btn"
          disabled={ !isDone }
          onClick={ saveRecipe }
        >
          Finalizar Receita
        </button>
      </Link>
    </div>
  );
}
