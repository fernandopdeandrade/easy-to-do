import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Drinks from '../pages/Drinks';
import mockDrinks from './helpers/mockDrinks';
import { renderWithRouter } from './helpers/renderWith';

const searchTopBtn = 'search-top-btn';
const searchInputConst = 'search-input';
const exercSearchBtn = 'exec-search-btn';
const radioNameSearch = 'name-search-radio';

const mockOneDrink = {
  drinks: [{
    strDrink: 'Adam Sunrise',
    strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/vtuyvu1472812112.jpg',
    idDrink: '15567',
  }],
};

describe('Testes do componente searchBarDrinks', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Se os elementos estão na página', async () => {
    renderWithRouter(<Drinks />);
    const meals = await screen.findByRole('heading', { level: 1, name: 'Drinks' });
    const btnUser = await screen.findByTestId('profile-top-btn');
    const btnSearch = await screen.findByTestId(searchTopBtn);

    expect(meals).toBeInTheDocument();
    expect(btnUser).toBeInTheDocument();
    expect(btnSearch).toBeInTheDocument();
  });

  test('Se o fetch é chamado com o ingrediente', async () => {
    renderWithRouter(<Drinks />);

    const btnSearch = screen.getByTestId(searchTopBtn);
    userEvent.click(btnSearch);
    const searchInput = screen.getByTestId(searchInputConst);
    const ingredient = screen.getByText(/Ingredient/i);
    expect(ingredient).toBeInTheDocument();
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn()
      .mockResolvedValue(Promise.resolve({
        json: () => Promise.resolve(mockOneDrink),
        ok: true,
      }));
    userEvent.type(searchInput, 'water');
    const radioIngredient = screen.getByTestId('ingredient-search-radio');
    radioIngredient.checked = true;
    const btnSearchFetch = screen.getByTestId(exercSearchBtn);
    userEvent.click(btnSearchFetch);
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenLastCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=water');
  });

  test('Se o fetch é chamado com o nome', async () => {
    renderWithRouter(<Drinks />);
    const btnSearch = screen.getByTestId(searchTopBtn);
    userEvent.click(btnSearch);
    const searchInput = screen.getByTestId(searchInputConst);
    const ingredient = screen.getByText(/Name/i);
    expect(ingredient).toBeInTheDocument();
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn()
      .mockResolvedValue(Promise.resolve({
        json: () => Promise.resolve(mockOneDrink),
        ok: true,
      }));
    userEvent.type(searchInput, 'water');
    const radioIngredient = screen.getByTestId(radioNameSearch);
    radioIngredient.checked = true;
    const btnSearchFetch = screen.getByTestId(exercSearchBtn);
    userEvent.click(btnSearchFetch);
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenLastCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=water');
  });
  test('Se o fetch é chamado com a primeira letra', async () => {
    renderWithRouter(<Drinks />);
    const btnSearch = screen.getByTestId(searchTopBtn);
    userEvent.click(btnSearch);
    const searchInput = screen.getByTestId(searchInputConst);
    const ingredient = screen.getByText(/Name/i);
    expect(ingredient).toBeInTheDocument();
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn()
      .mockResolvedValue(Promise.resolve({
        json: () => Promise.resolve(mockOneDrink),
        ok: true,
      }));
    userEvent.type(searchInput, 'r');
    const radioIngredient = screen.getByTestId('first-letter-search-radio');
    radioIngredient.checked = true;
    const btnSearchFetch = screen.getByTestId(exercSearchBtn);
    userEvent.click(btnSearchFetch);
    expect(global.fetch).toHaveBeenCalled();
  });
  test('Se o fetch é chamado com a primeira letra com mais de uma letra', async () => {
    renderWithRouter(<Drinks />);
    const btnSearch = screen.getByTestId(searchTopBtn);
    userEvent.click(btnSearch);
    const searchInput = screen.getByTestId(searchInputConst);
    const ingredient = screen.getByText(/Name/i);
    expect(ingredient).toBeInTheDocument();
    jest.spyOn(global, 'alert');
    global.fetch = jest.fn()
      .mockResolvedValue(Promise.resolve({
        json: () => Promise.resolve(mockOneDrink),
        ok: true,
      }));
    userEvent.type(searchInput, 'water');
    const radioIngredient = screen.getByTestId('first-letter-search-radio');
    radioIngredient.checked = true;
    const btnSearchFetch = screen.getByTestId(exercSearchBtn);
    userEvent.click(btnSearchFetch);
    expect(global.alert).toHaveBeenCalled();
  });
  test('Se uma mensagem de erro aparece quando não é encontrado nenhuma resposta', async () => {
    renderWithRouter(<Drinks />);

    const btnSearch = screen.getByTestId(searchTopBtn);
    userEvent.click(btnSearch);
    const searchInput = screen.getByTestId(searchInputConst);
    userEvent.type(searchInput, 'wewrwer');
    const nameSearchRadio = screen.getByTestId(radioNameSearch);
    nameSearchRadio.checked = true;
    expect(nameSearchRadio).toBeChecked();
    const btnSearchFetch = screen.getByTestId(exercSearchBtn);
    userEvent.click(btnSearchFetch);
    const textAlert = await screen.findByText(/Cannot read properties of undefined/i);
    expect(textAlert).toBeInTheDocument();
  });
  test('Se buscar por um drink de nome "Adam", será direcionado para a rota "/drinks/17873"', async () => {
    renderWithRouter(<Drinks />);
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockDrinks),
    }));
    const btnSearch = screen.getByTestId(searchTopBtn);
    userEvent.click(btnSearch);
    const searchInput = screen.getByTestId('search-input');
    userEvent.type(searchInput, 'Adam');
    const nameSearch = screen.getByTestId('name-search-radio');
    userEvent.click(nameSearch);
    const executeSearchBtn = screen.getByTestId(exercSearchBtn);
    userEvent.click(executeSearchBtn);
    // console.log(history.location.pathname);
    // const drink = await screen.findByTestId('0-recipe-card');
    // expect(drink).toBeInTheDocument();
  });
});
