import React from 'react';
import Provider from './context/Provider';
import Table from './components/Table';
import './App.css';

function App() {
  return (
    <Provider>
      <span>Hello, App!</span>
      <Table />
    </Provider>
  );
}

export default App;
