// App.jsx
import React from 'react';
import { Routes, Route} from 'react-router-dom';
import './styles/main.scss'
import HomePage from './pages//home/HomePage';
import Products from './pages/Products';
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}/>
      <Route path="/products" element={<Products />}/>
    </Routes>
  );
}

export default App;