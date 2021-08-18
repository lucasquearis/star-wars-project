import React, { useContext, useState, useEffect } from 'react';
import FilterContext from '../context/FilterContext';

function Header() {
  const columnOptions = ['population', 'orbital_period', 'diameter',
    'rotation_period', 'surface_water'];
  const comparisonOptions = ['maior que', 'menor que', 'igual a'];

  const { handleChangeName, addFilter, rmvFilter,
    filters: { filterByNumericValues } } = useContext(FilterContext);
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [number, setNumber] = useState('');
  const [uniqueColumns, setUniqueColumns] = useState(columnOptions);

  const teste = columnOptions.filter((option) => !filterByNumericValues
    .map((item) => item.column).includes(option));

  const handleFilter = () => {
    if (number) {
      addFilter({ column, comparison, value: number });
      setUniqueColumns(...[uniqueColumns.filter((item) => item !== column)]);
    }
  };

  useEffect(() => setColumn(uniqueColumns[0]), [uniqueColumns]);

  return (
    <header>
      <input
        type="text"
        placeholder="Digite um planeta"
        data-testid="name-filter"
        onChange={ handleChangeName }
      />
      <select
        data-testid="column-filter"
        onChange={ ({ target: { value } }) => setColumn(value) }
      >
        {teste.map((option) => (
          <option value={ option } key={ option }>{option}</option>
        ))}
      </select>
      <select
        data-testid="comparison-filter"
        onChange={ ({ target: { value } }) => setComparison(value) }
      >
        {comparisonOptions.map((option) => (
          <option value={ option } key={ option }>{option}</option>
        ))}
      </select>
      <input
        type="number"
        min="0"
        data-testid="value-filter"
        onChange={ ({ target: { value } }) => setNumber(value) }
      />
      <button type="button" data-testid="button-filter" onClick={ handleFilter }>
        Filtrar
      </button>
      {filterByNumericValues.map((filter, index) => (
        <button
          type="button"
          data-testid="filter"
          key={ index }
          onClick={ () => rmvFilter(filter) }
        >
          X
        </button>
      ))}
    </header>
  );
}

export default Header;
