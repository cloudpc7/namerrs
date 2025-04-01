// App.jsx
import React from 'react';
import { Routes, Route} from 'react-router-dom';
import './styles/main.scss'
import HomePage from './pages//home/HomePage';
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}/>
    </Routes>
  );
}

export default App;