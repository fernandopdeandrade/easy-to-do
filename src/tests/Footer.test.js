import React from 'react';
import { screen } from '@testing-library/react';
import Meals from '../pages/Meals';
import Drinks from '../pages/Drinks';
import Profile from '../pages/Profile';
import { renderWithRouter } from './helpers/renderWith';

describe('Testes do Footer', () => {
  test('O footer no Meals', () => {
    renderWithRouter(<Meals />);
    const drinksIcons = screen.getByTestId(/drinks-bottom-btn/i);
    const mealsIcons = screen.getByTestId(/meals-bottom-btn/i);
    expect(drinksIcons).toBeInTheDocument();
    expect(mealsIcons).toBeInTheDocument();
  });

  test('O footer no drinks', () => {
    renderWithRouter(<Drinks />);
    const drinksIcons = screen.getByTestId(/drinks-bottom-btn/i);
    const mealsIcons = screen.getByTestId(/meals-bottom-btn/i);
    expect(drinksIcons).toBeInTheDocument();
    expect(mealsIcons).toBeInTheDocument();
  });

  test('O footer no profile', () => {
    renderWithRouter(<Profile />);
    const drinksIcons = screen.getByTestId(/drinks-bottom-btn/i);
    const mealsIcons = screen.getByTestId(/meals-bottom-btn/i);
    expect(drinksIcons).toBeInTheDocument();
    expect(mealsIcons).toBeInTheDocument();
  });
});
