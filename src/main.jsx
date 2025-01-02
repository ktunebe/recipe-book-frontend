import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Recipe from './Recipe';
import Header from './Header';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/recipes/:id" element={<Recipe />} />
    </Routes>
  </Router>
);
