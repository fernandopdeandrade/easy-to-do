import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Drinks from '../pages/Drinks';
import mockDrinks from './helpers/mockDrinks';
import { renderWithRouter } from './helpers/renderWith';

describe('Testes da page Drinks', () => {
  it('Verificar os elementos do Drink', async () => {
    renderWithRouter(<Drinks />);
    const buttonDrink1 = await screen.findByTestId('Ordinary Drink-category-filter');
    expect(buttonDrink1).toBeInTheDocument();

    const buttonDrink2 = await screen.findByTestId('Cocktail-category-filter');
    expect(buttonDrink2).toBeInTheDocument();

    const buttonDrink3 = await screen.findByTestId('Shake-category-filter');
    expect(buttonDrink3).toBeInTheDocument();

    const buttonDrink4 = await screen.findByTestId('Other / Unknown-category-filter');
    expect(buttonDrink4).toBeInTheDocument();
  });

  it('Testa se renderiza os botões de filtro', async () => {
    renderWithRouter(<Drinks />);
    const buttonDrink3 = await screen.findByTestId('Shake-category-filter');
    userEvent.click(buttonDrink3);

    const drinksType1 = await screen.findByText('151 Florida Bushwacker');
    expect(drinksType1).toBeInTheDocument();

    const drinksType2 = await screen.findByText('Avalanche');
    expect(drinksType2).toBeInTheDocument();

    userEvent.click(buttonDrink3);

    const drinksType3 = await screen.findByText('GG');
    expect(drinksType3).toBeInTheDocument();

    const drinksType4 = await screen.findByText('A1');
    expect(drinksType4).toBeInTheDocument();

    const buttonDrink5 = await screen.findByTestId('All-category-filter');
    userEvent.click(buttonDrink5);
    expect(drinksType3).toBeInTheDocument();
    expect(drinksType4).toBeInTheDocument();
  });

  it('Verificar se ao clicar no item, a páginia é redirecionada para o produto detalhado', async () => {
    const { history } = renderWithRouter(<Drinks />);
    const buttonDrinkDisplay = await screen.findByText('GG');
    userEvent.click(buttonDrinkDisplay);

    expect(history.location.pathname).toBe('/drinks/15997');
  });

  it('Testa se renderiza os 12 recipe-cards', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockDrinks),
    }));
    renderWithRouter(<Drinks />);
    const drinksTitle = await screen.findByTestId('page-title');
    expect(drinksTitle).toBeInTheDocument();
    const recipeCards = await screen.findAllByTestId(/recipe-card/);
    expect(recipeCards.length).toBe(12);
  });
});
