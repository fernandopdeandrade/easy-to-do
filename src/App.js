import React from 'react';
import './App.css';
import { createBrowserHistory } from 'history';
import Routes from './Routes';
import { FilterProvider } from './context/InfoContext';

const history = createBrowserHistory();

function App() {
  return (
    <FilterProvider>
      <div className="App">
        <Routes history={ history } />
      </div>
    </FilterProvider>
  );
}

export default App;
