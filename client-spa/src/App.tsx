import React from 'react';

import './App.css';

import { Route, Routes } from 'react-router';
import DashboardPage from './pages/DashboardPage';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <Routes>
      <Route path = '/' element={<LandingPage/>}/>
      <Route path = '/Demo' element={<DashboardPage/>}/>
    </Routes>
  );
}

export default App;
