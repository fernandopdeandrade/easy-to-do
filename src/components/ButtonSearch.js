import React from 'react';

function ButtonSearch() {
  return (
    <label htmlFor="search" className="label-search">
      <h3>Pesquisar</h3>
      {' '}
      <input
        id="search"
        type="search"
        name="search"
        data-testid="search-input"
      />
    </label>
  );
}

export default ButtonSearch;
