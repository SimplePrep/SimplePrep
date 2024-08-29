import React from 'react';
import './App.css';
import { Route, Routes, BrowserRouter as Router, Navigate } from 'react-router-dom';
import Login from './pages/Authentication/Login';
import BlogPostDetails from './components/Landing/features/BlogPostDetails';
import Blogs from './components/Landing/Blogs';
import TestPageUI from './components/ILearnComps/utils/test_components/TestPageUI';
import ResetPassword from './pages/Authentication/ResetPassword';
import Contents from './components/ILearnComps/Contents';
import Analytics from './components/ILearnComps/Analytics';
import SignUpComponent from './pages/Authentication/SignUp';
import Tutorials from './components/ILearnComps/Tutorials';
import NotFoundPage from './pages/404NotFoundPage';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './components/store';
import { setTheme } from './components/auth_utils/reducers/authReducer';
import AuthenticatedComponent from './components/auth_utils/AuthenticatedComponent';
import TutorialPath from './components/ILearnComps/TutorialPath';
import Layout, { LandingPage } from './pages/LandingPage';
import StudySpaceLayout from './components/ILearnComps/utils/study_space/StudySpaceLayout';
import StudySpaceBodyWrapper from './components/ILearnComps/utils/study_space/StudySpaceBodyWrapper';
import ILearnPage from './pages/ILearnPage';
import Dashboard from './components/ILearnComps/Dashboard';
import ReviewSpaceLayout from './components/ILearnComps/utils/review_space/RsLayout';
import ReviewSpacePracticeExercises from './components/ILearnComps/utils/review_space/RsPracticeExercises';
import ReviewSpacePeerInsight from './components/ILearnComps/utils/review_space/RsPeerInsight';
import ReviewSpaceTestApproach from './components/ILearnComps/utils/review_space/RsTestApproach';
import ReviewSpaceCheatSheet from './components/ILearnComps/utils/review_space/RsCheatSheet';

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
              <ILearnPage toggleDarkMode={toggleDarkMode} isDarkMode={theme === 'dark'} />
            </AuthenticatedComponent>
        }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard isDarkMode={theme === 'dark'} />} />
          <Route path="tutorials" element={<Tutorials isDarkMode={theme === 'dark'} />} />
          <Route path="tutorials/course-paths/:tutorialId" element={<TutorialPath isDarkMode={theme === 'dark'} userId={1} userSubscription='Nova Pro'/>}/>
          <Route path="analytics" element={<Analytics isDarkMode={theme === 'dark'} />} />
          <Route path="practice" element ={<Contents isDarkMode={theme === 'dark'} />} />
        </Route>
        <Route
          path="study-space/:tutorialId"
          element={
            <AuthenticatedComponent>
              <StudySpaceLayout
                isDarkMode={theme === 'dark'} 
                toggleDarkMode={toggleDarkMode} 
                userSubscription='Nova Pro'
              />
            </AuthenticatedComponent>
          }
        >
          <Route
            path=":sectionSlug"
            element={
              <StudySpaceBodyWrapper
                isDarkMode={theme === 'dark'} 
              />
            }
          />
        </Route>

        <Route
          path="review-space/:chapterId"
          element={
            <AuthenticatedComponent>
              <ReviewSpaceLayout
                isDarkMode={theme === 'dark'} 
                toggleDarkMode={toggleDarkMode} 
                userSubscription='Nova Pro'
              />
            </AuthenticatedComponent>
          }
        >
          <Route  index element={<Navigate to='cheatsheet' replace />}/>
          <Route path="cheatsheet" element={<ReviewSpaceCheatSheet  isDarkMode={theme === 'dark'}/>}/>
          <Route path="practice-exercises" element={<ReviewSpacePracticeExercises isDarkMode={theme ==='dark'} />}/>
          <Route path="peer-insight" element={<ReviewSpacePeerInsight isDarkMode={theme==='dark'} />} />
          <Route path="test-approach" element={<ReviewSpaceTestApproach isDarkMode={theme==='dark'} />} />
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
