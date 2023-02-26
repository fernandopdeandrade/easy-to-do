import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import fetchData from '../services/fetchRecipes';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../styles/ProgressDetails.css';
import ReturnButton from './ReturnButton';

export default function ProgressDetailsDrinks() {
  const [isLoading, setIsLoading] = useState(true);
  const [dataDrinksInProgress, setDataDrinksInProgress] = useState([]);
  const [btnShare, setBtnShare] = useState(false);
  const [verifiedElements, setVerifiedElements] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [btnInProgress, setBtnInProgress] = useState(false);

  const location = useLocation();
  let dataProgress = [];
  let ingredients = [];

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
    const oito = 8;

    const inProgressRecipes = localStorage.getItem('inProgressRecipes');
    if (inProgressRecipes !== null) recipe = JSON.parse(inProgressRecipes);
    const keysInProgress = Object.keys(recipe);

    const ids = location.pathname.slice(oito);
    const numberCut = ids.indexOf('/');
    const id = ids.slice(0, numberCut);

    if (keysInProgress.includes('drinks')) {
      const keysDrinks = Object.keys(recipe.drinks);
      setBtnInProgress(keysDrinks.includes(`${id}`));
      console.log(btnInProgress);
    }
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    fetchData(url)
      .then((response) => setDataDrinksInProgress(response.drinks))
      .catch(() => console.log(errorMessage))
      .finally(() => setIsLoading(false));

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
    const oito = 8;
    const ids = location.pathname.slice(oito);
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
    if ((dataDrinksInProgress.length > 0) && !isFavorite) {
      newFavorite.id = dataDrinksInProgress[0].idDrink;
      newFavorite.type = 'drink';
      newFavorite.nationality = '';
      newFavorite.category = dataDrinksInProgress[0].strCategory;
      newFavorite.alcoholicOrNot = dataDrinksInProgress[0].strAlcoholic;
      newFavorite.name = dataDrinksInProgress[0].strDrink;
      newFavorite.image = dataDrinksInProgress[0].strDrinkThumb;
      setIsFavorite(true);
      allFavorites = [...getFavoritesLocalStorage, newFavorite];
    }
    localStorage.setItem('favoriteRecipes', JSON.stringify(allFavorites));
  };

  if (dataDrinksInProgress.length > 0) {
    dataProgress = dataDrinksInProgress;
    const keysData = Object.keys(dataDrinksInProgress[0]);
    const ingredientsFilter = keysData.filter((key) => key.includes('strIngredient'));
    const meansureFilter = keysData.filter((key) => key.includes('strMeasure'));
    const valuesIng = ingredientsFilter
      .filter((ingre) => (
        dataDrinksInProgress[0][ingre] !== null)
         && (dataDrinksInProgress[0][ingre] !== ''));
    const valuesMen = meansureFilter
      .filter((ingre) => dataDrinksInProgress[0][ingre] !== null);
    valuesIng.forEach((add, index) => {
      let newValue = '';
      if (dataDrinksInProgress[0][valuesMen[index]] !== undefined) {
        newValue = `${dataDrinksInProgress[0][add]} 
        - ${dataDrinksInProgress[0][valuesMen[index]]}`;
      } else { newValue = `${dataDrinksInProgress[0][add]}`; }
      ingredients = [...ingredients, newValue];
    });
  }

  const saveRecipe = () => {
    let getDoneRecipes = localStorage
      .getItem('doneRecipes') ? JSON
        .parse(localStorage.getItem('doneRecipes')) : [];
    const newDone = {
      id: dataProgress[0].idDrink,
      type: 'drink',
      nationality: '',
      category: dataProgress[0].strCategory,
      alcoholicOrNot: dataProgress[0].strAlcoholic,
      name: dataProgress[0].strDrink,
      image: dataProgress[0].strDrinkThumb,
      doneDate: new Date().toISOString(),
      tags: [],
    };
    getDoneRecipes = [...getDoneRecipes, newDone];
    localStorage.setItem('doneRecipes', JSON.stringify(getDoneRecipes));
  };
  const TREZE = 13;

  return (
    <div className="recipe-details">
      <ReturnButton location={ location.pathname.slice(0, TREZE) } />
      <h1>Hora de fazer</h1>
      { (dataProgress.length > 0) && (
        <div className="ingredients-info">
          {(!isLoading) && (
            <>
              <h2 data-testid="recipe-title">{ dataProgress[0].strDrink }</h2>
              <img
                data-testid="recipe-photo"
                src={ dataProgress[0].strDrinkThumb }
                alt={ dataProgress[0].idDrink }
                height="150px"
              />
              <h2 data-testid="recipe-category">
                { `${dataProgress[0].strCategory} - ${dataProgress[0].strAlcoholic}` }
              </h2>
            </>
          )}

          <ol>
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
                  { ' ' }
                  {ing}
                </label>
              </div>
            ))}
          </ol>
          <p data-testid="instructions">{ dataProgress[0].strInstructions }</p>
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
