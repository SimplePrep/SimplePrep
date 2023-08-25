import React from 'react';

import './App.css';

import { Route, Routes } from 'react-router';
import DashboardPage from './pages/DashboardPage';
import LandingPage from './pages/LandingPage';
import APT from './components/Dashboard/Contents/APT';

function App() {
  return (
    <Routes>
      <Route path = '/' element={<LandingPage/>}/>
      <Route path = '/Demo' element={<DashboardPage/>}/>

      <Route path ='/practice-tests' element ={<APT/>}/>
    </Routes>
  );
}

export default App;
