import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router';
import DashboardPage from './pages/DashboardPage';
import Layout, {LandingPage} from './pages/LandingPage';
import Login from './pages/Authentication/Login';
import SignUp from './pages/Authentication/SignUp';
import APT from './components/Dashboard/Tests/APT';
import BlogPostDetails from './components/Landing/features/BlogPostDetails';
import Blogs from './components/Landing/Blogs';
import TestSections from './components/Dashboard/Tests/TestSections';
import TestPageUI from './components/Dashboard/Tests/TestPageUI';
import ResetPassword from './pages/Authentication/ResetPassword';
import Activate from './pages/Authentication/Activate';
import ResetPasswordConfirm from './pages/Authentication/ResetPasswordConfirm';
import {Provider} from 'react-redux';
import store from './components/store';



function App() {
  return (
    <Provider store={store}>
        <Routes>
            <Route path = '/' element={<Layout/>}>
              <Route index element = {<LandingPage/>}/>
              <Route path = "blogs" element = {<Blogs/>} />
              <Route path = "blogs/:id" element = {<BlogPostDetails/>}/>
            </Route>
            <Route path = 'Demo/*' element={<DashboardPage/>}/>
            {/* Authentication Routes */}
            <Route path = "/login" element = {<Login/>}/>
            <Route path = "/sign-up" element = {<SignUp/>}/>
            <Route path = "/reset-password" element = {<ResetPassword/>}/>
            <Route path = "/password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm/>} />
            <Route path = "/activate/:uid/:token" element = {<Activate/>} />

            <Route path = "practice-tests" element = {<APT/>}/>
            <Route path = "practice-tests/:testId/sections" element={<TestSections/>}/>
            <Route path = "practice-tests/:testId/sections/:sectionId/:sectionName" element={<TestPageUI/>}/>
            <Route path = "test" element = {<TestPageUI/>}/>
        </Routes>
    </Provider>
  );
}

export default App;
