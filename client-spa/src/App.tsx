import React from 'react';

import './App.css';

import { Route, Routes } from 'react-router';
import DashboardPage from './pages/DashboardPage';
import LandingPage from './pages/LandingPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import APT from './components/Dashboard/APT';
import Test from './components/Dashboard/Test';

function App() {
  return (
      <Routes>
        <Route path = '/' element={<LandingPage/>}/>
        <Route path = 'Demo/*' element={<DashboardPage/>}/>
        <Route path = "sign-in" element = {<SignIn/>}/>
        <Route path = "sign-up" element = {<SignUp/>}/>
        <Route path = "practice-tests" element = {<APT/>}/>
        <Route path = "test" element = {<Test/>}/>
      </Routes>
  );
}

export default App;
