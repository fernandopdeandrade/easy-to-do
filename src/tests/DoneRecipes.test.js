import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DoneRecipes from '../pages/DoneRecipes';
import { renderWithRouter } from './helpers/renderWith';

const mockDoneRecipes = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: [
      'Pasta',
      'Curry',
    ],
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
];

describe('Testes da page DoneRecipes', () => {
  beforeEach(() => {
    navigator.clipboard = {
      writeText: jest.fn(),
    };
  });
  localStorage.setItem('doneRecipes', JSON.stringify(mockDoneRecipes));
  it('Componentes do localStorage estão sendo renderizados', () => {
    renderWithRouter(<DoneRecipes />);
    const penne = screen.getByText('Spicy Arrabiata Penne');
    expect(penne).toBeInTheDocument();
  });
  it('Link copiado', async () => {
    renderWithRouter(<DoneRecipes />);
    const btnShare = screen.getByTestId('0-horizontal-share-btn');
    userEvent.click(btnShare);
    const linkCopied = screen.getAllByTestId('link-copied');
    expect(linkCopied[0]).toBeInTheDocument();
    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
      // return 1;
    });
    expect(linkCopied[0]).not.toBeInTheDocument();
    expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(1);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost:3000/meals/52771');
  });
  it('Deve ter um titulo Done Recipes e um botão para ir ao profile', async () => {
    localStorage.clear();
    const { history } = renderWithRouter(<DoneRecipes />);
    const doneRecipesTitle = screen.getByRole('heading', { level: 1, name: 'Done Recipes' });
    expect(doneRecipesTitle).toBeInTheDocument();
    const profileButton = screen.getByRole('link', { href: '/profile' });
    expect(profileButton).toBeInTheDocument();
    const profileImage = screen.getByTestId('profile-top-btn');
    expect(profileImage).toBeInTheDocument();
    userEvent.click(profileButton);
    await waitFor(() => expect(history.location.pathname).toBe('/profile'));
  });
  it('Filtros funcionam', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(mockDoneRecipes));
    renderWithRouter(<DoneRecipes />);
    const namePenne = screen.getByTestId('0-horizontal-name');
    const nameAquamarine = screen.getByTestId('1-horizontal-name');
    expect(namePenne).toBeInTheDocument();
    expect(nameAquamarine).toBeInTheDocument();

    const btnMeal = screen.getByTestId('filter-by-meal-btn');
    userEvent.click(btnMeal);

    expect(namePenne).toBeInTheDocument();
    expect(nameAquamarine).not.toBeInTheDocument();

    const btnDrinks = screen.getByTestId('filter-by-drink-btn');
    userEvent.click(btnDrinks);

    expect(namePenne.textContent).toBe('Aquamarine');

    const btnAll = screen.getByTestId('filter-by-all-btn');
    userEvent.click(btnAll);

    const nameAquamarine2 = screen.getByTestId('1-horizontal-name');
    expect(namePenne).toBeInTheDocument();
    expect(nameAquamarine2).toBeInTheDocument();
  });
});
