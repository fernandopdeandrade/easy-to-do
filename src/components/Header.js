import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ButtonSearch from './ButtonSearch';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import '../styles/Header.css';

function Header({ title }) {
  const [loadSearch, setLoadSearch] = useState(false);

  const loadSearchButton = () => {
    if (loadSearch === true) {
      setLoadSearch(false);
    } else {
      setLoadSearch(true);
    }
  };

  return (
    <header>
      <h1 data-testid="page-title">{title}</h1>
      <div className="search-profile">
        <div
          className="role-button"
          role="button"
          onClick={ loadSearchButton }
          onKeyDown={ loadSearchButton }
          tabIndex="0"
        >
          <img
            src={ searchIcon }
            alt="Search"
            data-testid="search-top-btn"
          />
        </div>
        <Link to="/profile">
          <img
            type="button"
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="Profile"
          />
        </Link>
      </div>
      {
        loadSearch && (
          <div className="search-button">
            <ButtonSearch />
            <SearchBar title={ title } />
          </div>
        )
      }
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
}.isRequired;

export default Header;
