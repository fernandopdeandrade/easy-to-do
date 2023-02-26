import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { FilterContextState } from '../context/InfoContext';

function SearchBar({ title }) {
  const { setFilterDrinks, setFilterMeals } = useContext(FilterContextState) || {};
  const [redirectIdDrink, setRedirectIdDrink] = useState(false);
  const [redirectIdMeal, setRedirectIdMeal] = useState(false);

  const [redirectSearchDrink, setRedirectSearchDrink] = useState(false);
  const [redirectSearchMeal, setRedirectSearchMeal] = useState(false);

  const [idMeal, setIdMeal] = useState('');
  const [idDrink, setIdDrink] = useState('');

  if (redirectIdMeal) return <Redirect to={ `/meals/${idMeal}` } />;
  if (redirectIdDrink) return <Redirect to={ `/drinks/${idDrink}` } />;
  if (redirectSearchDrink) return <Redirect to={ `/search/drinks/${idDrink}` } />;
  if (redirectSearchMeal) return <Redirect to={ `/search/meals/${idMeal}` } />;

  const fetchApiMeals = async () => {
    let http = '';
    const radios = document.getElementsByName('type');
    const input = document.getElementsByTagName('input')[0].value;
    if (radios[0].checked) {
      http = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${input}`;
    }
    if (radios[1].checked) {
      http = `https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`;
    }
    if ((radios[2].checked) && (input.length === 1)) {
      http = `https://www.themealdb.com/api/json/v1/1/search.php?f=${input}`;
    }
    try {
      if (http.length > 0) {
        const response = await fetch(http);
        const repos = await response.json();
        if (repos.meals.length === 1) {
          setIdMeal(repos.meals[0].idMeal);
          setRedirectIdMeal(true);
        } if (repos.meals.length > 1) {
          setIdMeal(repos.meals[0].idMeal);
          setRedirectSearchMeal(true);
        }
        setFilterMeals(repos.meals);
      } else {
        global.alert('Sua pesquisa deve ter apenas 1 (um) caractere');
      }
    } catch (error) {
      global.alert('Desculpe, não encontramos nenhuma receita para esses filtros.');
    }
  };

  const fetchApiDrinks = async () => {
    let http = '';
    const radios = document.getElementsByName('type');
    const input = document.getElementsByTagName('input')[0].value;
    if (radios[0].checked) {
      http = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${input}`;
    }
    if (radios[1].checked) {
      http = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${input}`;
    }
    if ((radios[2].checked) && (input.length === 1)) {
      http = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${input}`;
    }
    try {
      if (http.length > 0) {
        const response = await fetch(http);
        const repos = await response.json();
        if (repos.drinks.length === 1) {
          setIdDrink(repos.drinks[0].idDrink);
          setRedirectIdDrink(true);
        } if (repos.drinks.length > 1) {
          setIdDrink(repos.drinks[0].idDrink);
          setRedirectSearchDrink(true);
        }
        setFilterDrinks(repos.drinks);
      } else {
        global.alert('Sua pesquisa deve ter apenas 1 (um) caractere');
      }
    } catch (error) {
      global.alert('Desculpe, não encontramos nenhuma receita para esses filtros.');
    }
  };

  const fetchApi = async (titleFetch) => {
    if (titleFetch === 'Meals') {
      await fetchApiMeals();
    }
    if (titleFetch === 'Drinks') {
      await fetchApiDrinks();
    }
  };

  return (
    <div className="search-radios">
      <label htmlFor="type">
        <input name="type" type="radio" data-testid="ingredient-search-radio" />
        <span>Ingredientes</span>
        <input name="type" type="radio" data-testid="name-search-radio" />
        <span>Nome</span>
        <input name="type" type="radio" data-testid="first-letter-search-radio" />
        <span>Primeira letra</span>
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => fetchApi(title) }
      >
        Vamos lá
      </button>
    </div>
  );
}

SearchBar.propTypes = {
  title: PropTypes.string.isRequired,
}.isRequired;

export default SearchBar;
