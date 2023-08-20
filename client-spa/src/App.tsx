import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar/navbar';
import LandingPage from './pages/LandingPage';
import { Route, Routes } from 'react-router';

function App() {
  return (
    <Routes>
      <Route path = '/' element={<LandingPage/>}/>
    </Routes>
  );
}

export default App;
