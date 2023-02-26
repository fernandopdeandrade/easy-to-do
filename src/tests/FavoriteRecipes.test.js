import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import { renderWithRouter } from './helpers/renderWith';

const mockLocalStorage = [{
  id: '52771',
  type: 'meal',
  nationality: 'Italian',
  category: 'Vegetarian',
  alcoholicOrNot: '',
  name: 'Spicy Arrabiata Penne',
  image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
},
{
  id: '178319',
  type: 'drink',
  nationality: '',
  category: 'Cocktail',
  alcoholicOrNot: 'Alcoholic',
  name: 'Aquamarine',
  image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
}];

describe('Testes da page FavoriteRecipes', () => {
  beforeEach(() => {
    navigator.clipboard = {
      writeText: jest.fn(),
    };
  });
  test('Se é renderizado as receitas com o localStorage com a chave favoriteRecipes', () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(mockLocalStorage));
    renderWithRouter(<FavoriteRecipes />);
    const categoryMeal = screen.getByText(/Italian - Vegetarian/i);
    const nameMeal = screen.getByText(/Spicy Arrabiata Penne/i);
    const imgMeal = screen.getByTestId(/0-horizontal-image/i);
    const categoryDrink = screen.getByText(/Alcoholic/i);
    const nameDrink = screen.getByText(/Aquamarine/i);
    const imgDrink = screen.getByTestId(/1-horizontal-image/i);

    expect(categoryMeal).toBeInTheDocument();
    expect(nameMeal).toBeInTheDocument();
    expect(categoryDrink).toBeInTheDocument();
    expect(nameDrink).toBeInTheDocument();
    expect(imgMeal.src).toBe('https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg');
    expect(imgDrink.src).toBe('https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg');
  });
  test('Se não é renderizado as receitas com o localStorage sem favoriteRecipes', () => {
    localStorage.clear();
    renderWithRouter(<FavoriteRecipes />);
    const favoriteRecipes = screen.getByText(/Favorite Recipes/i);
    const imgProfile = screen.getByTestId(/profile-top-btn/i);

    expect(favoriteRecipes).toBeInTheDocument();
    expect(imgProfile.src).toBe('http://localhost/profileIcon.svg');
  });
  test('Se é removido do localStorage após apertar no desfavoritar', () => {
    window.localStorage.setItem('favoriteRecipes', JSON.stringify(mockLocalStorage));
    renderWithRouter(<FavoriteRecipes />);
    const nameMeal = screen.getByText(/Spicy Arrabiata Penne/i);
    const nameDrink = screen.getByText(/Aquamarine/i);

    expect(nameMeal).toBeInTheDocument();
    expect(nameDrink).toBeInTheDocument();

    const btnUnfavorite = screen.getAllByTestId(/-horizontal-favorite-btn/i);
    userEvent.click(btnUnfavorite[0]);
  });
  test('Se é redirecionado para a página de detalhe ao apertar na imagem', () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(mockLocalStorage));
    const { history } = renderWithRouter(<FavoriteRecipes />);
    const imgMeal = screen.getByTestId(/0-horizontal-image/i);

    expect(imgMeal).toBeInTheDocument();
    userEvent.click(imgMeal);
    expect(history.location.pathname).toBe('/meals/52771');
  });
  test('Se é redirecionado para a página de detalhe ao apertar no nome', () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(mockLocalStorage));
    const { history } = renderWithRouter(<FavoriteRecipes />);
    const imgMeal = screen.getByTestId(/1-horizontal-image/i);

    expect(imgMeal).toBeInTheDocument();
    userEvent.click(imgMeal);
    expect(history.location.pathname).toBe('/drinks/178319');
  });
  test('Se os filtros funcionam', () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(mockLocalStorage));
    renderWithRouter(<FavoriteRecipes />);
    const nameMeal = screen.getByTestId('0-horizontal-name');
    const nameDrink = screen.getByTestId('1-horizontal-name');

    expect(nameMeal).toBeInTheDocument();
    expect(nameDrink).toBeInTheDocument();

    const btnAll = screen.getByTestId('filter-by-all-btn');
    const btnMeal = screen.getByTestId('filter-by-meal-btn');
    const btnDrink = screen.getByTestId('filter-by-drink-btn');

    userEvent.click(btnMeal);
    expect(nameMeal.innerHTML).toBe('Spicy Arrabiata Penne');

    userEvent.click(btnDrink);
    expect(nameMeal.innerHTML).toBe('Aquamarine');

    userEvent.click(btnAll);
    expect(screen.getByTestId('0-horizontal-name')).toBeInTheDocument();
    expect(screen.getByTestId('1-horizontal-name')).toBeInTheDocument();
  });
  it('Deve ter um titulo Favorite Recipes e um botão para ir ao profile', async () => {
    const { history } = renderWithRouter(<FavoriteRecipes />);
    const favoriteTitle = screen.getByRole('heading', { level: 1, name: 'Favorite Recipes' });
    expect(favoriteTitle).toBeInTheDocument();
    const profileButton = screen.getByRole('link', { href: '/profile' });
    expect(profileButton).toBeInTheDocument();
    const profileImage = screen.getAllByRole('img', { src: '/static/media/profileIcon.44eb3608f431845fe2fc2d2a23d758ae.svg' });
    expect(profileImage[0]).toBeInTheDocument();
    userEvent.click(profileButton);
    await waitFor(() => expect(history.location.pathname).toBe('/profile'));
  });
  it('Copia o rota da receita', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(mockLocalStorage));
    renderWithRouter(<FavoriteRecipes />);
    const profileImage = screen.getAllByRole('img');
    userEvent.click(profileImage[2]);
    expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(1);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost:3000/meals/52771');
  });
});
