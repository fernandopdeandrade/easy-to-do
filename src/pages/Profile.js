import { Link } from 'react-router-dom';
import React from 'react';
import HeaderNoSearch from '../components/HeaderNoSearch';
import Footer from '../components/Footer';
import '../styles/Profile.css';

function Profile() {
  const getEmail = localStorage
    .getItem('user') ? JSON.parse(localStorage.getItem('user')).email : '';

  const clearLocalStorage = () => {
    localStorage.clear();
  };

  return (
    <>
      <HeaderNoSearch title="Profile" />
      <div className="info-user-profile">
        <div className="user">
          <span>Usuário</span>
          <p data-testid="profile-email">{getEmail}</p>
        </div>
        <div className="image-avatar">
          <img
            src="http://cdn.onlinewebfonts.com/svg/img_569204.png"
            alt="avatar"
            data-testid="profile-photo"
          />
        </div>
        <div className="link-user-profile">
          <Link to="/done-recipes">
            <button type="button" data-testid="profile-done-btn">Receitas feitas</button>
          </Link>
          <Link to="/favorite-recipes">
            <button
              type="button"
              data-testid="profile-favorite-btn"
            >
              Receitas favoritas
            </button>
          </Link>
          <Link to="/">
            <button
              type="button"
              data-testid="profile-logout-btn"
              onClick={ clearLocalStorage }
            >
              Sair
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
