import React, { useEffect } from 'react';
import './App.css';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import Layout, { LandingPage } from './pages/LandingPage';
import Login from './pages/Authentication/Login';
import BlogPostDetails from './components/Landing/features/BlogPostDetails';
import Blogs from './components/Landing/Blogs';
import TestPageUI from './components/Dashboard/utils/test_components/TestPageUI';
import ResetPassword from './pages/Authentication/ResetPassword';
import Contents from './components/Dashboard/Contents';
import TutorialPage from './components/Dashboard/TutorialPage';
import SectionContent from './components/Dashboard/SectionContent';
import Analytics from './components/Dashboard/Analytics';
import SignUpComponent from './pages/Authentication/SignUp';
import Tutorials from './components/Dashboard/Tutorials';
import NotFoundPage from './pages/404NotFoundPage';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './components/store';
import { setTheme } from './components/auth_utils/reducers/authReducer';

const App = () => {
  const { theme } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleDarkMode = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    dispatch(setTheme(newTheme));
  };

  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="blogs/:id" element={<BlogPostDetails />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route
          path="demo"
          element={<DashboardPage toggleDarkMode={toggleDarkMode} isDarkMode={theme === 'dark'} />}
        >
          <Route index element={<Contents isDarkMode={theme === 'dark'} />} />
          <Route path="dashboard" element={<Contents isDarkMode={theme === 'dark'} />} />
          <Route path="tutorials" element={<Tutorials isDarkMode={theme === 'dark'} />} />
          <Route path="tutorials/:tutorialId" element={<TutorialPage isDarkMode={theme === 'dark'} />}>
            <Route path=":chapterId/:sectionSlug" element={<SectionContent isDarkMode={theme === 'dark'} />} />
          </Route>
          <Route path="analytics" element={<Analytics isDarkMode={theme === 'dark'} />} />
        </Route>
        {/* Authentication Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUpComponent />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="practice-tests/:testId/sections/:sectionId/:sectionName" element={<TestPageUI />} />
        <Route path="/test/:testId/module/:moduleId" element={<TestPageUI />} />
      </Routes>
  );
};

export default App;
