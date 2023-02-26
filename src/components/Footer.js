import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import linkdin from '../images/linkedin.png';
import github from '../images/github.png';
import facebook from '../images/facebook.png';
import '../styles/Footer.css';

class Footer extends Component {
  render() {
    return (
      <footer data-testid="footer" className="footer">
        <Link to="/drinks">
          <img src={ drinkIcon } alt="drink-icon" data-testid="drinks-bottom-btn" />
        </Link>
        <div className="redes-sociais">
          <strong>Redes Sociais</strong>
          <div className="icons-sociais">
            <a href="https://www.linkedin.com/in/fernando-pereira-de-andrade-dev/" target="_blank" rel="noreferrer">
              <img src={ linkdin } alt="linkedin" />
            </a>
            <a href="https://github.com/fernandopdea " target="_blank" rel="noreferrer">
              <img src={ github } alt="github" />
            </a>
            <a href="https://www.facebook.com/pupygreen" target="_blank" rel="noreferrer">
              <img src={ facebook } alt="facebook" />
            </a>
          </div>
        </div>
        <Link to="/meals">
          <img src={ mealIcon } alt="meal-icon" data-testid="meals-bottom-btn" />
        </Link>
      </footer>
    );
  }
}

export default Footer;
