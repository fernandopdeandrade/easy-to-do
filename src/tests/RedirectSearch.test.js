import React from 'react';
import { screen } from '@testing-library/react';
import RecipeSearchsMeals from '../pages/RedirectSearchMeals';
import RecipeSearchDrinks from '../pages/RedirectSearchDrinks';
import { FilterContextState } from '../context/InfoContext';
import { renderWithRouter } from './helpers/renderWith';
import riceMock from './helpers/mockRice';
import waterMock from './helpers/mockWater';

const valuesMeals = ({
  filterMeals: riceMock.meals,
});

const valuesDrinks = ({
  filterDrinks: waterMock.drinks,
});

describe('Testes do RedirectSearch', () => {
  test('Se é renderizado corretamente o RedirectSearchMeals', () => {
    renderWithRouter(
      <FilterContextState.Provider value={ valuesMeals }>
        <RecipeSearchsMeals />
      </FilterContextState.Provider>,
    );

    const firstCard = screen.getByTestId('0-recipe-card');
    const textO = 'Beef Banh Mi Bowls with Sriracha Mayo, Carrot & Pickled Cucumber';
    expect(firstCard.textContent).toBe(textO);
    const allCards = screen.getAllByTestId(/recipe-card/);
    expect(allCards.length).toBe(10);
  });
  test('Se é renderizado corretamente o RedirectSearchDrinks', () => {
    renderWithRouter(
      <FilterContextState.Provider value={ valuesDrinks }>
        <RecipeSearchDrinks />
      </FilterContextState.Provider>,
    );

    const firstCard = screen.getByTestId('0-recipe-card');
    const textO = 'Adam Sunrise';
    expect(firstCard.textContent).toBe(textO);
    const allCards = screen.getAllByTestId(/recipe-card/);
    expect(allCards.length).toBe(12);
  });
});
