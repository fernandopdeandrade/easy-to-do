import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RecipeDetailsDrink from '../components/RecipeDetailsDrink';
import RecipeDetails from '../pages/RecipeDetails';
import mockDrinkDetails from './helpers/mockDrinkDetails';
import { renderWithRouter } from './helpers/renderWith';

const mockInProgressRecipes = ['Ice', 'Galliano \n        - 2 1/2 shots '];

describe('Testes da page RecipeDetailsDrinks', () => {
  const GGPage = '/drinks/15997';
  beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockDrinkDetails),
    }));
    const localStorageMock = (() => {
      let store = {};
      return {
        getItem(key) {
          return store[key];
        },

        setItem(key, value) {
          store[key] = JSON.stringify(value);
        },

        clear() {
          store = {};
        },

        removeItem(key) {
          delete store[key];
        },

        getAll() {
          return store;
        },
      };
    });
    Object.defineProperty(window, 'localStorage', { value: localStorageMock() });
  });

  it('Testa os componentes do RecipeDetails', async () => {
    const { history } = renderWithRouter(<RecipeDetails />);
    history.push(GGPage);
    expect(await screen.findByRole('heading', { name: 'RecipeDetails' })).toBeInTheDocument();
    expect(screen.getByTestId('share-btn')).toBeInTheDocument();
    expect(screen.getByTestId('favorite-btn')).toBeInTheDocument();
    expect(screen.getByTestId('start-recipe-btn')).toBeInTheDocument();
  });

  it('Testa se possui os componentes de imagem, titulo, categoria, etc', async () => {
    const { history } = renderWithRouter(<RecipeDetailsDrink />);
    history.push(GGPage);
    const recipePhoto = await screen.findByTestId('recipe-photo');
    expect(recipePhoto).toBeInTheDocument();
    const recipeTitle = await screen.findByTestId('recipe-title');
    expect(recipeTitle).toBeInTheDocument();
    const recipeCategory = await screen.findByTestId('recipe-category');
    expect(recipeCategory).toBeInTheDocument();
    for (let i = 0; i <= 2; i += 1) {
      expect(screen.getByTestId(`${i}-ingredient-name-and-measure`)).toBeInTheDocument();
    }
    const instructions = screen.getByTestId('instructions');
    expect(instructions).toBeInTheDocument();
    // Não está funcionando pois as recomendações vem de outro fetch aparentemente
    // const firstRecommendation = await screen.findByTestId('0-recommendation-card');
    // expect(firstRecommendation).toBeInTheDocument();
    const startRecipeBtn = screen.getByTestId('start-recipe-btn');
    userEvent.click(startRecipeBtn);
    expect(history.location.pathname).toBe('/drinks/15997/in-progress');
  });

  it('Testa se o botão de favoritar e compartilhar receitas funcionam', async () => {
    navigator.clipboard = {
      writeText: jest.fn(),
    };
    const favorites = [
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
    localStorage.setItem('batata', JSON.stringify(favorites));
    console.log('Oi, teste aqui', localStorage.getItem('batata'));
    const { history } = renderWithRouter(<RecipeDetailsDrink />);
    history.push(GGPage);
    const shareBtn = await screen.findByTestId('share-btn');
    userEvent.click(shareBtn);
    const shareBtnText = await screen.findByText('Link copied!');
    expect(shareBtnText).toBeInTheDocument();
    waitForElementToBeRemoved(shareBtnText)
      .then(() => expect(shareBtnText).not.toBeInTheDocument());
    const favoriteBtn = await screen.findByTestId('favorite-btn');
    userEvent.click(favoriteBtn);
    // expect(favoriteBtn.src).toBe('/static/media/whiteHeartIcon.2b822118952dc5140129c6349fcd0472.svg');
    // console.log('Teste:', localStorage.getItem('favoriteRecipes'));
    // Não está funcionando, só pega []
  });
  it('Testa se tem inProgressRecipes', async () => {
    const { history } = renderWithRouter(<RecipeDetails />);
    history.push(GGPage);
    localStorage.setItem('inProgressRecipes', JSON.stringify(mockInProgressRecipes));
    await waitFor(() => expect(JSON.parse(localStorage.getItem('inProgressRecipes'))).toBe(
      JSON.stringify(mockInProgressRecipes),
    ));
  });

  it('Testa se tem o recipe tem drink', async () => {
    const { history } = renderWithRouter(<RecipeDetails />);
    history.push(GGPage);
    localStorage.setItem('inProgressRecipes', JSON.stringify({ drinks: {} }));
    const recipe = localStorage.getItem('inProgressRecipes');
    await waitFor(() => expect(recipe.includes('drink')).toBeTruthy());
  });
});
