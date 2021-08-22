import React, { useContext } from 'react';
import myContext from '../context/myContext';

function Table() {
  const { infos, loading, filters } = useContext(myContext);
  const { filterByName, filterByNumericValues } = filters;
  const { data } = useContext(myContext);
  let filteredData = [...data];

  if (filterByName.name) {
    filteredData = filteredData.filter((datas) => datas.name
      .toLowerCase().includes(filterByName.name.toLowerCase()));
  }

  // Agradecimentos à todos os meus colegas que me ajudaram a enxergar e aplicar a lógica nesse filtro
  if (filterByNumericValues.length > 0) {
    console.log(filterByNumericValues);
    filterByNumericValues.forEach(({ column, comparison, value }) => {
      filteredData = filteredData.filter((planet) => {
        if (comparison === 'maior que') {
          return Number(planet[column]) > Number(value);
        }
        if (comparison === 'menor que') {
          return Number(planet[column]) < Number(value);
        }
        return Number(planet[column]) === Number(value);
      });
      return filteredData;
    });
  }

  function tableBody(planets) {
    return (
      planets.map((planet) => (
        <tr key={ planet.name }>
          <td>{planet.name}</td>
          <td>{planet.rotation_period}</td>
          <td>{planet.orbital_period}</td>
          <td>{planet.diameter}</td>
          <td>{planet.climate}</td>
          <td>{planet.gravity}</td>
          <td>{planet.terrain}</td>
          <td>{planet.surface_water}</td>
          <td>{planet.population}</td>
          <td>{planet.films}</td>
          <td>{planet.created}</td>
          <td>{planet.edited}</td>
          <td>{planet.url}</td>
        </tr>
      ))
    );
  }

  return (
    <>
      {loading && 'Carregando...'}
      <table>
        <thead>
          <tr>
            {
              infos.filter((info) => info !== 'residents').map((info) => (
                <th key={ info.name }>
                  {info}
                </th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            tableBody(filteredData)
          }
        </tbody>
      </table>
    </>
  );
}

export default Table;
