import React, { useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router';
import DashboardPage from './pages/DashboardPage';
import Layout, {LandingPage} from './pages/LandingPage';
import Login from './pages/Authentication/Login';
import SignUp from './pages/Authentication/SignUp';
import BlogPostDetails from './components/Landing/features/BlogPostDetails';
import Blogs from './components/Landing/Blogs';
import TestPageUI from './components/Dashboard/Tests/TestPageUI';
import ResetPassword from './pages/Authentication/ResetPassword';
import Activate from './pages/Authentication/Activate';
import ResetPasswordConfirm from './pages/Authentication/ResetPasswordConfirm';
import {Provider} from 'react-redux';
import store from './components/store';
import Contents from './components/Dashboard/Contents';
import Tutorials from './components/Dashboard/Tutorials';
import TutorialPage from './components/Dashboard/TutorialPage';
import Section, { sections } from './components/Dashboard/Section';
import { Navigate , BrowserRouter as Router} from 'react-router-dom';


const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <Provider store={store}>
        <Routes>
            <Route path="/" element={<Layout/>}>
              <Route index element={<LandingPage/>}/>
              <Route path="blogs" element={<Blogs/>} />
              <Route path="blogs/:id" element={<BlogPostDetails/>}/>
            </Route>
              <Route path="demo" element={<DashboardPage toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode}/>}>
                <Route index element={<Contents/>}/>
                <Route path="dashboard" element={<Contents/>}/>
                <Route path="tutorials" element={<Tutorials/>}/>
                <Route path="tutorials/:tutorialId" element={<TutorialPage />}>
                <Route index element={<Navigate to={`${sections[0].id.replaceAll(' ', '-')}`} replace />} />
                  {sections.map(({ id }) => (
                    <Route
                      key={id}
                      path={id.replaceAll(' ', '-')}
                      element={<Section sectionId={id} />}
                    />
                  ))}
                </Route>
              </Route>
            {/* Authentication Routes */}
            <Route path="/login" element={<Login/>}/>
            <Route path="/sign-up" element={<SignUp/>}/>
            <Route path="/reset-password" element={<ResetPassword/>}/>
            <Route path="/password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm/>} />
            <Route path="/activate/:uid/:token" element={<Activate/>} />

            <Route path="practice-tests/:testId/sections/:sectionId/:sectionName" element={<TestPageUI/>}/>
            <Route path="test" element={<TestPageUI/>}/>
        </Routes>
    </Provider>
  );
}

export default App;
