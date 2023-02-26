import { useState, useEffect } from 'react';
import fetchData from '../services/fetchRecipes';

export default function useDataInfos() {
  const [dataDrinks, setDataDrinks] = useState([]);
  const [dataMeals, setDataMeals] = useState([]);
  const [dataDrinksCategory, setDataDrinksCategory] = useState([]);
  const [dataMealsCategory, setDataMealsCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const categoryFilterMeals = (category) => {
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
    fetchData(url)
      .then((response) => setDataMeals(response.meals))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  };

  const categoryFilterDrinks = (category) => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
    fetchData(url)
      .then((response) => setDataDrinks(response.drinks))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  };

  const setFilterDrinks = () => {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    fetchData(url)
      .then((response) => setDataDrinks(response.drinks))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  };

  const setFilterMeals = () => {
    const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    fetchData(url)
      .then((response) => setDataMeals(response.meals))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    const urlDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    fetchData(urlDrinks)
      .then((response) => setDataDrinks(response.drinks))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));

    const urlMeals = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    fetchData(urlMeals)
      .then((response) => setDataMeals(response.meals))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));

    const urlDrinksCategory = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
    fetchData(urlDrinksCategory)
      .then((response) => setDataDrinksCategory(response.drinks))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));

    const urlMealsCategory = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
    fetchData(urlMealsCategory)
      .then((response) => setDataMealsCategory(response.meals))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  return {
    // data,
    dataDrinks,
    dataMeals,
    dataDrinksCategory,
    dataMealsCategory,
    isLoading,
    error,
    fetchData,
    categoryFilterMeals,
    categoryFilterDrinks,
    setFilterDrinks,
    setFilterMeals,
  };
}
