import React from 'react';

import './App.css';
import { Route, Routes } from 'react-router';
import DashboardPage from './pages/DashboardPage';
import {LandingPage, Layout} from './pages/LandingPage';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import APT from './components/Dashboard/Tests/APT';
import BlogPostDetails from './components/Landing/features/BlogPostDetails';
import Blogs from './components/Landing/Blogs';
import TestSections from './components/Dashboard/Tests/TestSections';
import TestPageUI from './components/Dashboard/Tests/TestPageUI';

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
        <Route path = "practice-tests/:testId/sections" element={<TestSections/>}/>
        <Route path = "practice-tests/:testId/sections/:sectionId/:sectionName" element={<TestPageUI/>}/>
        <Route path = "test" element = {<TestPageUI/>}/>
      </Routes>
  );
}

export default App;
