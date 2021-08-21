import React from 'react';
import './App.css';
import Table from './components/Table';
import Provider from './context/Provider';
import Header from './components/Header';
import FilterSelected from './components/FilterSelected';

function App() {
  return (
    <Provider>
      <Header />
      <FilterSelected />
      <Table />
    </Provider>

  );
}

export default App;
