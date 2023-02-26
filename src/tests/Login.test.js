import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Login from '../pages/Login';
import { renderWithRouter } from './helpers/renderWith';

describe('Testes da page Login', () => {
  const emailDataTestId = 'email-input';
  const passwordDataTestId = 'password-input';
  const submitDataTestId = 'login-submit-btn';
  it('Deve existir um input para email e senha e um botão submit', async () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId(emailDataTestId);
    expect(emailInput).toBeInTheDocument();
    const passwordInput = screen.getByTestId(passwordDataTestId);
    expect(passwordInput).toBeInTheDocument();
    const submitBtn = screen.getByTestId(submitDataTestId);
    expect(submitBtn).toBeInTheDocument();
    expect(submitBtn).toBeDisabled();
  });
  it('O formulário só deve ser válido após um email e senha válidos', () => {
    renderWithRouter(<Login />);
    const emailInput = screen.getByTestId(emailDataTestId);
    const passwordInput = screen.getByTestId(passwordDataTestId);
    const submitBtn = screen.getByTestId(submitDataTestId);
    userEvent.type(emailInput, 'teste@gmail.com');
    expect(submitBtn).toBeDisabled();
    userEvent.type(passwordInput, '1234567');
    expect(submitBtn).not.toBeDisabled();
  });
  it('Após clicar no botão submit o email deve ser salvo no localStorage e o usuário deve ser redirecionado para a tela principal de receitas de comidas', async () => {
    renderWithRouter(<Login />);
    const mockUser = '{"email":"teste@gmail.com"}';
    const emailInput = screen.getByTestId(emailDataTestId);
    const passwordInput = screen.getByTestId(passwordDataTestId);
    const submitBtn = screen.getByTestId(submitDataTestId);
    userEvent.type(emailInput, 'teste@gmail.com');
    userEvent.type(passwordInput, '1234567');
    userEvent.click(submitBtn);
    expect(localStorage.getItem('user')).toBe(mockUser);
  });
});
