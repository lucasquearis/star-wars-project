import React from 'react';
import './App.css';
import { ContextProvider } from './context/PlanetsContext';
import Home from './pages/Home';

function App() {
  return (
    <ContextProvider>
      <Home />
    </ContextProvider>
  );
}

export default App;
