import React from 'react';
import './App.css';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';

import Login from './pages/Authentication/Login';
import BlogPostDetails from './components/Landing/features/BlogPostDetails';
import Blogs from './components/Landing/Blogs';
import TestPageUI from './components/Dashboard/utils/test_components/TestPageUI';
import ResetPassword from './pages/Authentication/ResetPassword';
import Contents from './components/Dashboard/Contents';
import SectionContent from './components/Dashboard/SectionContent';
import Analytics from './components/Dashboard/Analytics';
import SignUpComponent from './pages/Authentication/SignUp';
import Tutorials from './components/Dashboard/Tutorials';
import NotFoundPage from './pages/404NotFoundPage';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './components/store';
import { setTheme } from './components/auth_utils/reducers/authReducer';
import AuthenticatedComponent from './components/auth_utils/AuthenticatedComponent';
import TutorialPath from './components/Dashboard/TutorialPath';
import Layout, { LandingPage } from './pages/LandingPage';
import LearningSectionSpace from './components/Dashboard/utils/learningspace/LearningSectionSpace';
import LearningLayout from './components/Dashboard/utils/learningspace/LearningSpaceLayout';

const App = () => {
  const { theme } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

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
          element={
            <AuthenticatedComponent>
              <DashboardPage toggleDarkMode={toggleDarkMode} isDarkMode={theme === 'dark'} />
            </AuthenticatedComponent>
        }
        >
          <Route index element={<Contents isDarkMode={theme === 'dark'} />} />
          <Route path="dashboard" element={<Contents isDarkMode={theme === 'dark'} />} />
          <Route path="tutorials" element={<Tutorials isDarkMode={theme === 'dark'} />} />
          <Route path="tutorials/course-paths/:tutorialId" element={<TutorialPath isDarkMode={theme === 'dark'} userId={1} userSubscription='free'/>}/>
          {/* <Route path="tutorials/:tutorialId" element={<TutorialPage isDarkMode={theme === 'dark'} />}>
            <Route path=":chapterId/:sectionSlug" element={<SectionContent isDarkMode={theme === 'dark'} />} />
          </Route> */}
          <Route path="analytics" element={<Analytics isDarkMode={theme === 'dark'} />} />
        </Route>
        <Route
        path="tutorials/section-space"
        element={
          <AuthenticatedComponent>
            <LearningLayout isDarkMode={theme === 'dark'} />
          </AuthenticatedComponent>
        }
      >
        <Route path=":sectionSlug" element={<LearningSectionSpace />} />
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
