import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Profile from '../pages/Profile';
import { renderWithRouter } from './helpers/renderWith';

describe('Testes do Profile', () => {
  localStorage.setItem('user', JSON.stringify({ email: 'teste@trybe.com' }));
  test('Se os elementos estão na página', () => {
    renderWithRouter(<Profile />);
    const email = screen.getByText(/teste@trybe.com/i);
    const doneRecipes = screen.getByText(/Done Recipes/i);
    const favoriteRecipes = screen.getByText(/Favorite Recipes/i);
    const logout = screen.getByText(/Logout/i);
    expect(email).toBeInTheDocument();
    expect(doneRecipes).toBeInTheDocument();
    expect(favoriteRecipes).toBeInTheDocument();
    expect(logout).toBeInTheDocument();
  });
  test('Se ao apertar o botão de Logout o localStorage é limpo', () => {
    renderWithRouter(<Profile />);
    const logout = screen.getByText(/Logout/i);
    expect(logout).toBeInTheDocument();
    userEvent.click(logout);
    expect(localStorage.length).toBe(0);
  });
});
