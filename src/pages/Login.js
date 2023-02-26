import { Link } from 'react-router-dom';
import { useState } from 'react';
import '../styles/Login.css';
import recipesLogo from '../images/recipesLogo.png';
import restaurante from '../images/restaurante.png';

function Login() {
  const [formEmail, setFormEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const emailValidation = formEmail.match(emailRegex);
  const PASSWORD_LIMIT = 6;
  const passwordValidation = password.length > PASSWORD_LIMIT;

  const saveSubmition = async () => {
    const user = {
      email: formEmail,
    };
    localStorage.setItem('user', JSON.stringify(user));
  };

  return (
    <div className="login-form">
      <img className="recipes_logo" src={ recipesLogo } alt="Logo" />
      <img src={ restaurante } alt="tomate" className="login_image" />
      <div className="formLogin">
        <h1>Login</h1>
        <input
          type="email"
          data-testid="email-input"
          placeholder="Email..."
          onChange={ (event) => setFormEmail(event.target.value) }
        />
        <input
          type="password"
          data-testid="password-input"
          placeholder="Password..."
          onChange={ (event) => setPassword(event.target.value) }
        />
        <Link to="/meals" className="login_button">
          <button
            type="button"
            data-testid="login-submit-btn"
            disabled={ !(emailValidation && passwordValidation) }
            onClick={ saveSubmition }

          >
            Entrar
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Login;
