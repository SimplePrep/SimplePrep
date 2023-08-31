import React from 'react';

import './App.css';

import { Route, Routes } from 'react-router';
import DashboardPage from './pages/DashboardPage';
import LandingPage from './pages/LandingPage';
import APT from './components/Dashboard/APT';
import Contents from './components/Dashboard/Contents';
import Tutorials from './components/Dashboard/Tutorials';
import Blogs from './components/Dashboard/Blogs';

function App() {
  return (
    <Routes>
      <Route path = '/' element={<LandingPage/>}/>
      <Route path = 'Demo' element={<DashboardPage/>}>
        <Route path = "contents" element = {<Contents/>}/>
        <Route path = "tutorials" element = {<Tutorials/>}/> 
        <Route path = "blogs" element = {<Blogs/>}/>
      </Route> 
      <Route path ='practice-tests' element ={<APT/>}/>     
    </Routes>
  );
}

export default App;
