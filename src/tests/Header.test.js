import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Drinks from '../pages/Drinks';
import { renderWithRouter } from './helpers/renderWith';

describe('Teste do componente Header', () => {
  it('Verificar os elementos do Header', () => {
    renderWithRouter(<Drinks />);
    const buttonProfile = screen.getByTestId('profile-top-btn');
    expect(buttonProfile).toBeInTheDocument();
    const buttonSearch = screen.getByTestId('search-top-btn');
    expect(buttonSearch).toBeInTheDocument();

    userEvent.click(buttonSearch);

    const InputSearch = screen.getByTestId('search-input');
    expect(InputSearch).toBeInTheDocument();

    userEvent.click(buttonSearch);
    expect(InputSearch).not.toBeInTheDocument();
  });
});
