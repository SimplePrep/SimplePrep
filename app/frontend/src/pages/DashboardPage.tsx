import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import NavBarDash from '../components/Dashboard/NavBarDash';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../components/store';
import { checkAuthenticated, loadUser } from '../components/auth_utils/actions/Actions';
import LoaderWrapper from '../components/Dashboard/utils/tools/LoaderWrapper';
import { setTheme } from '../components/auth_utils/reducers/authReducer';

interface DashboardPageProps {
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}

const DashboardPage: React.FC<DashboardPageProps> = ({
  toggleDarkMode,
  isDarkMode,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, loading, theme } = useSelector((state: RootState) => state.auth);
  const [isLoading, setIsLoading] = useState(true);
  const darkModeClass = isDarkMode ? 'dark-background' : 'light-background';
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = async () => {
      await dispatch(checkAuthenticated());
      await dispatch(loadUser());
    };
    checkAuthStatus();
  }, [dispatch]);

  useEffect(() => {
    if (!loading && !isAuthenticated && !isLoading) {
      navigate('/login');
    }
  }, [loading, isAuthenticated, isLoading, navigate]);

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    // Set the initial theme based on the persisted value in Redux state
    if (theme) {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [theme]);

  const handleToggleDarkMode = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    dispatch(setTheme(newTheme));
    toggleDarkMode(); // This updates the local state in the App component
  };

  if (isLoading) {
    return (
      <LoaderWrapper
        size='35px'
        minLoadTime={2000}
        onLoadComplete={handleLoadComplete}
        text="Loading Dashboard..."
        isDarkMode={isDarkMode}
      />
    );
  }

  return (
    <div className={`w-full h-full ${darkModeClass} font-opensans`}>
      <NavBarDash toggleDarkMode={handleToggleDarkMode} isDarkMode={isDarkMode} />
      <Outlet />
    </div>
  );
};

export default DashboardPage;
