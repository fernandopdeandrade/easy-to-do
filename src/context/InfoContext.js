import { PropTypes } from 'prop-types';
import { useMemo, createContext, useState } from 'react';

const FilterContextState = createContext();

function FilterProvider({ children }) {
  const [filterDrinks, setFilterDrinks] = useState([]);
  const [filterMeals, setFilterMeals] = useState([]);
  const value = useMemo(() => ({
    filterDrinks,
    setFilterDrinks,
    filterMeals,
    setFilterMeals,
  }), [filterDrinks, filterMeals]);
  return (
    <FilterContextState.Provider value={ value }>
      {children}
    </FilterContextState.Provider>
  );
}

FilterProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { FilterContextState, FilterProvider };
