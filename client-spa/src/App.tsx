import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AuthProvider from './components/utils/AuthProvider';
import Layout, { LandingPage } from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import Login from './pages/Authentication/Login';
import SignUp from './pages/Authentication/SignUp';
import BlogPostDetails from './components/Landing/features/BlogPostDetails';
import Blogs from './components/Landing/Blogs';
import TestPageUI from './components/Dashboard/utils/test_components/TestPageUI';
import ResetPassword from './pages/Authentication/ResetPassword';
import Contents from './components/Dashboard/Contents';
import Tutorials from './components/Dashboard/Tutorials';
import TutorialPage from './components/Dashboard/TutorialPage';
import Section from './components/Dashboard/Section';
import Analytics from './components/Dashboard/Analytics';
import './App.css';



const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <AuthProvider>
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
            <Route path='analytics' element={<Analytics isDarkMode={isDarkMode} />} />
          </Route>
          {/* Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="practice-tests/:testId/sections/:sectionId/:sectionName" element={<TestPageUI />} />
          <Route path="test" element={<TestPageUI />} />
        </Routes>
      </Router>
    </AuthProvider>
    
  );
}

export default App;
