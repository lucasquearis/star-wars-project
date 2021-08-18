import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetContext from './PlanetContext';

const PlanetProvider = ({ children }) => {
  const [data, SetNewData] = useState();
  const [filterByName, SetNewFilterByName] = useState({ name: '' });

  useEffect(() => {
    const URL = 'https://swapi-trybe.herokuapp.com/api/planets/';
    const GetPlanets = async () => {
      const GetAPI = await fetch(URL)
        .then((response) => response.json())
        .then((res) => res.results);
      SetNewData(GetAPI);
    };
    GetPlanets();
  }, []);

  const handleChange = ({ target }) => {
    SetNewFilterByName({ name: target.value });
  };

  const context = {
    data,
    filters: {
      filterByName,
    },
    handleChange,
  };

  return (
    <PlanetContext.Provider value={ context }>
      <main>
        {children}
      </main>
    </PlanetContext.Provider>
  );
};

PlanetProvider.propTypes = {
  children: PropTypes.func,
}.isRequired;

export default PlanetProvider;