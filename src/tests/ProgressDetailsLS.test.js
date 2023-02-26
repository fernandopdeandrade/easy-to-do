import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RecipeDetails from '../pages/RecipeDetails';
import { renderWithRouter } from './helpers/renderWith';

describe('Testes da page RecipeDetailsDrinks', () => {
  it('Testa se o botão de continue repice está na tela drinks', async () => {
    const inProgress = { drinks: { 15997: ['Ice', 'Galliano \\n        - 2 1/2 shots '] } };
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
    const { history } = renderWithRouter(<RecipeDetails />);
    history.push('/drinks/15997');

    const continueRecipe = await screen.findByText('Continue Recipe');
    expect(continueRecipe).toBeInTheDocument();
  });
  it('Testa se botão favorite está marcado no drinks', async () => {
    const favorite = [
      {
        id: '15997',
        type: 'drink',
        nationality: '',
        category: 'Ordinary Drink',
        alcoholicOrNot: 'Optional alcohol',
        name: 'GG',
        image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
      },
    ];
    localStorage.setItem('favoriteRecipes', JSON.stringify(favorite));
    const { history } = renderWithRouter(<RecipeDetails />);
    history.push('/drinks/15997');
    const recipeTitle = await screen.findByTestId('recipe-title');
    expect(recipeTitle).toBeInTheDocument();
    const btnHeart = await screen.findByTestId('favorite-btn');
    expect(btnHeart.firstChild.src).toBe('http://localhost/blackHeartIcon.svg');
    userEvent.click(btnHeart);
    expect(btnHeart.firstChild.src).toBe('http://localhost/whiteHeartIcon.svg');
    userEvent.click(btnHeart);
    expect(JSON.parse(localStorage.getItem('favoriteRecipes'))).toEqual(favorite);
    const recomendation0 = await screen.findByTestId('0-recommendation-card');
    expect(recomendation0).toBeInTheDocument();
  });

  it('Testa se o botão de continue repice está na tela meals', async () => {
    const inProgress = { meals: { 52977: ['Lentils \n        - 1 cup ', 'Onion \n        - 1 large'] } };
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
    const { history } = renderWithRouter(<RecipeDetails />);
    history.push('/meals/52977');

    const continueRecipe = await screen.findByText('Continue Recipe');
    expect(continueRecipe).toBeInTheDocument();
  });
  it('Testa se botão favorite está marcado no meals', async () => {
    const favorite = [
      {
        id: '52977',
        type: 'meal',
        nationality: 'Turkish',
        category: 'Side',
        alcoholicOrNot: '',
        name: 'Corba',
        image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
      },
    ];
    localStorage.setItem('favoriteRecipes', JSON.stringify(favorite));
    const { history } = renderWithRouter(<RecipeDetails />);
    history.push('/meals/52977');
    const recipeTitle = await screen.findByTestId('recipe-title');
    expect(recipeTitle).toBeInTheDocument();
    const btnHeart = await screen.findByTestId('favorite-btn');
    expect(btnHeart.firstChild.src).toBe('http://localhost/blackHeartIcon.svg');
    userEvent.click(btnHeart);
    expect(btnHeart.firstChild.src).toBe('http://localhost/whiteHeartIcon.svg');
    userEvent.click(btnHeart);
    expect(JSON.parse(localStorage.getItem('favoriteRecipes'))).toEqual(favorite);
    const recomendation0 = await screen.findByTestId('0-recommendation-card');
    expect(recomendation0).toBeInTheDocument();
  });
});
