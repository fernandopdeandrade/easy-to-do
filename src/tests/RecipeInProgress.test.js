import { screen } from '@testing-library/react';
import RecipeInProgress from '../pages/RecipeInProgress';
import { renderWithRouter } from './helpers/renderWith';

describe('Testes da page Recipes', () => {
  it('Testa se quando a url é meals, renderiza meals', async () => {
    const { history } = renderWithRouter(<RecipeInProgress />);
    history.push('/meals/52977/in-progress');
    const recipePhoto = await screen.findByTestId('recipe-photo');
    expect(recipePhoto).toBeInTheDocument();
  });
  it('Testa se quando a url é drinks, renderiza drinks', async () => {
    const { history } = renderWithRouter(<RecipeInProgress />);
    history.push('/drinks/15997/in-progress');
    const recipePhoto = await screen.findByTestId('recipe-photo');
    expect(recipePhoto).toBeInTheDocument();
  });
});
