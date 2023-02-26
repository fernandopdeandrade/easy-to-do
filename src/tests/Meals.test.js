import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Meals from '../pages/Meals';
import mockMeals from './helpers/mockMeals';
import { renderWithRouter } from './helpers/renderWith';

describe('Testes da page Meals', () => {
  it('Verificar os elementos do Meals', async () => {
    renderWithRouter(<Meals />);
    const buttonMeals1 = await screen.findByTestId('Beef-category-filter');
    expect(buttonMeals1).toBeInTheDocument();

    const buttonMeals2 = await screen.findByTestId('Breakfast-category-filter');
    expect(buttonMeals2).toBeInTheDocument();

    const buttonMeals3 = await screen.findByTestId('Chicken-category-filter');
    expect(buttonMeals3).toBeInTheDocument();
  });

  it('Testa se renderiza os botões de filtro', async () => {
    renderWithRouter(<Meals />);
    const buttonMeals3 = await screen.findByTestId('Chicken-category-filter');
    userEvent.click(buttonMeals3);

    const mealsType1 = await screen.findByText('Ayam Percik');
    expect(mealsType1).toBeInTheDocument();

    const mealsType2 = await screen.findByText('Brown Stew Chicken');
    expect(mealsType2).toBeInTheDocument();

    userEvent.click(buttonMeals3);

    const mealsType3 = await screen.findByText('Corba');
    expect(mealsType3).toBeInTheDocument();

    const mealsType4 = await screen.findByText('Burek');
    expect(mealsType4).toBeInTheDocument();

    const buttonMeals5 = await screen.findByTestId('All-category-filter');
    userEvent.click(buttonMeals5);
    expect(mealsType3).toBeInTheDocument();
    expect(mealsType4).toBeInTheDocument();
  });

  it('Verificar se ao clicar no item, a página é redirecionada para o produto detalhado', async () => {
    const { history } = renderWithRouter(<Meals />);
    const buttonMealsDisplay = await screen.findByText('Corba');
    userEvent.click(buttonMealsDisplay);

    expect(history.location.pathname).toBe('/meals/52977');
  });

  it('Testa se renderiza os 12 recipe-cards', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockMeals),
    }));
    renderWithRouter(<Meals />);
    const mealsTitle = await screen.findByTestId('page-title');
    expect(mealsTitle).toBeInTheDocument();
    const recipeCards = await screen.findAllByTestId(/recipe-card/);
    expect(recipeCards.length).toBe(12);
  });
});
