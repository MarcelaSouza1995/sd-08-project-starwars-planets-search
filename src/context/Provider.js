import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SWContext from './SWContext';
import getAPI from '../services';

const INITIAL_STATE = {
  filterByName: {
    name: '',
  },
  filterByNumericValues: [
    {
      column: '',
      comparison: '',
      value: '',
    },
  ],

};

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [filters, setFilters] = useState(INITIAL_STATE);

  useEffect(() => {
    getAPI().then((response) => setData(response));
  }, []);

  useEffect(() => {
    const { filterByName: { name } } = filters;
    const filterPlanet = data.filter((element) => element.name.includes(name));
    setPlanets(filterPlanet);
  }, [data, filters]);

  const context = { planets, setPlanets, filters, setFilters, data };
  console.log(filters);
  return (
    <SWContext.Provider value={ context }>
      {children}
    </SWContext.Provider>
  );
}
Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Provider;
