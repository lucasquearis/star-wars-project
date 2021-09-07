import React from 'react';
import Home from './pages/Home';
import StarWarsProvider from './context/StarWarsProvider';
import './App.css';

function App() {
  return (
    <StarWarsProvider>
      <Home />
    </StarWarsProvider>

  );
}

export default App;
