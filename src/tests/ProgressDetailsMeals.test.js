import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProgressDetailsMeals from '../components/ProgressDetailMeals';
import mockMealDetails from './helpers/mockMealDetails';
import { renderWithRouter } from './helpers/renderWith';

const linkMeals = '/meals/52977/in-progress';
const recipePhotoConst = 'recipe-photo';

const mockPage = () => {
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(mockMealDetails),
  }));
};

describe('Testes da page ProgressDetailsDrink', () => {
  beforeEach(() => {
    navigator.clipboard = {
      writeText: jest.fn(),
    };
  });
  it('Testa os componentes do RecipeDetails', () => {
    const { history } = renderWithRouter(<ProgressDetailsMeals />);
    history.push(linkMeals);
    expect(screen.getByRole('heading', { name: 'ProgressMeals' })).toBeInTheDocument();
    expect(screen.getByTestId('share-btn')).toBeInTheDocument();
    expect(screen.getByTestId('favorite-btn')).toBeInTheDocument();
  });
  it('Testa se possui os componentes de imagem, titulo, categoria, etc', async () => {
    mockPage();
    const { history } = renderWithRouter(<ProgressDetailsMeals />);
    history.push(linkMeals);
    const recipePhoto = await screen.findByTestId(recipePhotoConst);
    expect(recipePhoto).toBeInTheDocument();
    const recipeTitle = await screen.findByTestId('recipe-title');
    expect(recipeTitle).toBeInTheDocument();
    const recipeCategory = await screen.findByTestId('recipe-category');
    expect(recipeCategory).toBeInTheDocument();
    for (let i = 0; i <= 2; i += 1) {
      expect(screen.getByTestId(`${i}-ingredient-step`)).toBeInTheDocument();
    }
    const instructions = screen.getByTestId('instructions');
    expect(instructions).toBeInTheDocument();
  });
  it('Testa o botão de compartilhar link', async () => {
    mockPage();
    const { history } = renderWithRouter(<ProgressDetailsMeals />);
    history.push(linkMeals);
    const recipePhoto = await screen.findByTestId(recipePhotoConst);
    expect(recipePhoto).toBeInTheDocument();
    const recipeTitle = await screen.findByTestId('1-ingredient-step');
    userEvent.click(recipeTitle.firstChild);
    window.location.reload(true);
    expect(recipeTitle.firstChild.checked).toBe(true);
    userEvent.click(recipeTitle.firstChild);
    window.location.reload(true);
    expect(recipeTitle.firstChild.checked).toBe(false);
    const profileImage = screen.getByText('Share');
    userEvent.click(profileImage);
    expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(1);
  });
  it('Testa se o botão de favorito e localStorage', async () => {
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
    mockPage();
    const { history } = renderWithRouter(<ProgressDetailsMeals />);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favorite));
    history.push(linkMeals);
    const recipePhoto = await screen.findByTestId(recipePhotoConst);
    expect(recipePhoto).toBeInTheDocument();
    const btnHeart = await screen.findByTestId('favorite-btn');
    setTimeout(() => expect(btnHeart.firstChild.src).toBe('http://localhost/blackHeartIcon.svg'), 1000);
    userEvent.click(btnHeart);
    setTimeout(() => expect(btnHeart.firstChild.src).toBe('http://localhost/whiteHeartIcon.svg'), 1000);
    userEvent.click(btnHeart);
    setTimeout(() => expect(JSON.parse(localStorage.getItem('favoriteRecipes'))).toEqual(favorite), 1000);
  });
});
