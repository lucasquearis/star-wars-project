import { node } from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import useThreeValues from '../hooks/useThreeValues';
import fetchApi from '../services/fetchApi';
import StarWarsContext from './StarWarsContext';

const Provider = ({ children }) => {
  const [data, setData] = useState([]);
  const [filterName, setFilterByName] = useState('');
  const [column, comparison, value, setSelect] = useThreeValues();
  const filterData = useRef(data);

  useEffect(() => {
    const fetchPlanets = async () => {
      const { results } = await fetchApi();
      setData(results);
      filterData.current = results;
    };
    fetchPlanets();
  }, [setData]);

  useEffect(() => {
    const newData = filterData.current.filter(({ name }) => name.includes(filterName));
    setData(newData);
  }, [filterData, filterName]);

  useEffect(() => {
    const newData = filterData.current
      .filter((obj) => {
        if (comparison === 'maior que') return +obj[column] > +value;
        if (comparison === 'menor que') return +obj[column] < +value;
        if (comparison === 'igual a') return +obj[column] === +value;
        return true;
      });
    setData(newData);
  }, [column, comparison, value]);

  const context = {
    data,
    filters: {
      filterByName: { name: filterName },
      filterByNumericValues: [
        {
          column,
          comparison,
          value,
        },
      ],
    },
    setFilterByName,
    setSelect,
  };

  return (
    <StarWarsContext.Provider value={ context }>
      { children }
    </StarWarsContext.Provider>
  );
};

Provider.propTypes = {
  children: node.isRequired,
};

export default Provider;
