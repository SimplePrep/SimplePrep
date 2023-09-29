import React from 'react';

import './App.css';

import { Route, Routes } from 'react-router';
import DashboardPage from './pages/DashboardPage';
import {LandingPage, Layout} from './pages/LandingPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import APT from './components/Dashboard/APT';
import Test from './components/Dashboard/Test';
import BlogPostDetails from './components/Landing/features/BlogPostDetails';
import Blogs from './components/Landing/Blogs';

function App() {
  return (
      <Routes>
        <Route path = '/' element={<Layout/>}>
          <Route index element = {<LandingPage/>}/>
          <Route path = "blogs" element = {<Blogs/>} />
          <Route path = "blogs/:id" element = {<BlogPostDetails/>}/>
        </Route>
        <Route path = 'Demo/*' element={<DashboardPage/>}/>
        <Route path = "sign-in" element = {<SignIn/>}/>
        <Route path = "sign-up" element = {<SignUp/>}/>
        <Route path = "practice-tests" element = {<APT/>}/>
        <Route path = "test" element = {<Test/>}/>
      </Routes>
  );
}

export default App;
