// src/App.tsx
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import CocktailDetail from './components/CocktailDetails';
import HomePage from './components/Home';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cocktail/:name" element={<CocktailDetail />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
