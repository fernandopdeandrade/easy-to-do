import { screen } from '@testing-library/react';
import RecipeDetails from '../pages/RecipeDetails';
import { renderWithRouter } from './helpers/renderWith';

describe('Testes da page Recipes', () => {
  it('Testa se quando a url é meals, renderiza meals', async () => {
    const { history } = renderWithRouter(<RecipeDetails />);
    history.push('/meals/52977');
    const recipePhoto = await screen.findByTestId('recipe-photo');
    expect(recipePhoto).toBeInTheDocument();
  });
  it('Testa se quando a url é drinks, renderiza drinks', async () => {
    const { history } = renderWithRouter(<RecipeDetails />);
    history.push('/drinks/15997');
    const recipePhoto = await screen.findByTestId('recipe-photo');
    expect(recipePhoto).toBeInTheDocument();
  });
});
