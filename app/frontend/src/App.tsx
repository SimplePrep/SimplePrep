import React, { useState } from 'react';
import './App.css';
import { Route, Routes, Navigate, BrowserRouter as Router } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import Layout, { LandingPage } from './pages/LandingPage';
import Login from './pages/Authentication/Login';
import BlogPostDetails from './components/Landing/features/BlogPostDetails';
import Blogs from './components/Landing/Blogs';
import TestPageUI from './components/Dashboard/utils/test_components/TestPageUI';
import ResetPassword from './pages/Authentication/ResetPassword';
import Contents from './components/Dashboard/Contents';
import Tutorials from './components/Dashboard/Tutorials';
import TutorialPage from './components/Dashboard/TutorialPage';
import Section from './components/Dashboard/Section';
import Analytics from './components/Dashboard/Analytics';
import SignUpComponent from './pages/Authentication/SignUp';
const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="blogs/:id" element={<BlogPostDetails />} />
          </Route>
          <Route path="demo" element={<DashboardPage toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />}>
            <Route index element={<Contents />} />
            <Route path="dashboard" element={<Contents />} />
            <Route path="tutorials" element={<Tutorials />} />
            <Route path="tutorials/:tutorialId" element={<TutorialPage isDarkMode={isDarkMode} />}>
              <Route index element={<Navigate to={`command-of-evidence`} replace />} />
              <Route path=":sectionId" element={<Section isDarkMode={isDarkMode} />} />
              <Route path=":sectionId/:subsectionId" element={<Section isDarkMode={isDarkMode} />} />
            </Route>
            <Route path="analytics" element={<Analytics isDarkMode={isDarkMode} />} />
          </Route>
          {/* Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUpComponent />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="practice-tests/:testId/sections/:sectionId/:sectionName" element={<TestPageUI />} />
          <Route path="/test/:testId/module/:moduleId" element={<TestPageUI />} />
        </Routes>
      </Router>
  );
}

export default App;
