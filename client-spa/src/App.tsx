import React from 'react';

import './App.css';

import { Route, Routes } from 'react-router';
import DashboardPage from './pages/DashboardPage';
import LandingPage from './pages/LandingPage';
import SignIn from './pages/SignIn';

function App() {
  return (
      <Routes>
        <Route path = '/' element={<LandingPage/>}/>
        <Route path = 'Demo/*' element={<DashboardPage/>}/>
        <Route path = "sign-in" element = {<SignIn/>}/>
      </Routes>
  );
}

export default App;
