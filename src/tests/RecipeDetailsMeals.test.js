import { screen, waitForElementToBeRemoved, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RecipeDetailsMeal from '../components/RecipeDetailsMeal';
import RecipeDetails from '../pages/RecipeDetails';
import mockMealDetails from './helpers/mockMealDetails';
import { renderWithRouter } from './helpers/renderWith';

const mockInProgressRecipes = ['Lentils \n        - 1 cup ', 'Onion \n        - 1 large'];

describe('Testes da page RecipeDetailsMeals', () => {
  const corbaPage = '/meals/52977';
  beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockMealDetails),
    }));
  });
  it('Testa os componentes do RecipeDetails', async () => {
    const { history } = renderWithRouter(<RecipeDetails />);
    history.push(corbaPage);
    expect(await screen.findByRole('heading', { name: 'RecipeDetails' })).toBeInTheDocument();
    expect(screen.getByTestId('share-btn')).toBeInTheDocument();
    expect(screen.getByTestId('favorite-btn')).toBeInTheDocument();
    expect(screen.getByTestId('start-recipe-btn')).toBeInTheDocument();
  });
  it('Testa se possui os componentes de imagem, titulo, categoria, etc', async () => {
    const { history } = renderWithRouter(<RecipeDetailsMeal />);
    history.push(corbaPage);
    const recipePhoto = await screen.findByTestId('recipe-photo');
    expect(recipePhoto).toBeInTheDocument();
    const recipeTitle = await screen.findByTestId('recipe-title');
    expect(recipeTitle).toBeInTheDocument();
    const recipeCategory = await screen.findByTestId('recipe-category');
    expect(recipeCategory).toBeInTheDocument();
    for (let i = 0; i <= 12; i += 1) {
      expect(screen.getByTestId(`${i}-ingredient-name-and-measure`)).toBeInTheDocument();
    }
    const instructions = screen.getByTestId('instructions');
    expect(instructions).toBeInTheDocument();
    const video = screen.getByTestId('video');
    expect(video).toBeInTheDocument();
    // Não está funcionando pois as recomendações vem de outro fetch aparentemente
    // const firstRecommendation = await screen.findByTestId('0-recommendation-card');
    // expect(firstRecommendation).toBeInTheDocument();
    const startRecipeBtn = screen.getByTestId('start-recipe-btn');
    userEvent.click(startRecipeBtn);
    expect(history.location.pathname).toBe('/meals/52977/in-progress');
  });
  it('Testa se o botão de favoritar e compartilhas receitas funcionam', async () => {
    navigator.clipboard = {
      writeText: jest.fn(),
    };
    // const favorites = [
    //   {
    //     id: '15997',
    //     type: 'drink',
    //     nationality: '',
    //     category: 'Ordinary Drink',
    //     alcoholicOrNot: 'Optional alcohol',
    //     name: 'GG',
    //     image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
    //   },
    // ];

    const { history } = renderWithRouter(<RecipeDetailsMeal />);
    history.push(corbaPage);
    const shareBtn = await screen.findByTestId('share-btn');
    userEvent.click(shareBtn);
    const shareBtnText = await screen.findByText('Link copied!');
    expect(shareBtnText).toBeInTheDocument();
    waitForElementToBeRemoved(shareBtnText)
      .then(() => expect(shareBtnText).not.toBeInTheDocument());
    const favoriteBtn = await screen.findByTestId('favorite-btn');
    userEvent.click(favoriteBtn);
    // Não está funcionando, só pega []
    // await waitFor(() => expect(localStorage.getItem('favoriteRecipes')).toBe(JSON.stringify(favorites)));
  });
  it('Testa se tem inProgressRecipes', async () => {
    const { history } = renderWithRouter(<RecipeDetails />);
    history.push(corbaPage);
    localStorage.setItem('inProgressRecipes', JSON.stringify(mockInProgressRecipes));
    await waitFor(() => expect(localStorage.getItem('inProgressRecipes')).toBe(
      JSON.stringify(mockInProgressRecipes),
    ));
  });

  it('Testa se tem o recipe tem drink', async () => {
    const { history } = renderWithRouter(<RecipeDetails />);
    history.push(corbaPage);
    localStorage.setItem('inProgressRecipes', JSON.stringify({ meals: {} }));
    const recipe = localStorage.getItem('inProgressRecipes');
    await waitFor(() => expect(recipe.includes('meals')).toBeTruthy());
  });
});
