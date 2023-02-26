import { screen } from '@testing-library/react';
import Recipes from '../pages/Recipes';
import { renderWithRouter } from './helpers/renderWith';

describe('Testes da page Recipes', () => {
  it('Testa se quando a url é meals, renderiza meals', async () => {
    const { history } = renderWithRouter(<Recipes />);
    history.push('/meals');
    const buttonMeals1 = await screen.findByTestId('Beef-category-filter');
    expect(buttonMeals1).toBeInTheDocument();
  });
  it('Testa se quando a url é drinks, renderiza drinks', async () => {
    const { history } = renderWithRouter(<Recipes />);
    history.push('/drinks');
    const buttonDrink1 = await screen.findByTestId('Ordinary Drink-category-filter');
    expect(buttonDrink1).toBeInTheDocument();
  });
});
