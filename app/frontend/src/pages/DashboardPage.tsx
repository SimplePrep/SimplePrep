import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import NavBarDash from '../components/Dashboard/NavBarDash';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../components/store';
import LoaderWrapper from '../components/Dashboard/utils/tools/LoaderWrapper';
import { checkAuthenticated, loadUser } from '../components/auth_utils/actions/Actions';
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
  const darkModeClass = isDarkMode ? 'dark-background transition-colors duration-300' : 'light-background transition-colors duration-300';
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
        isDarkMode={!isDarkMode}
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
