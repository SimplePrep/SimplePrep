import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import NavBarDash from '../components/Dashboard/NavBarDash';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../components/store';
import { checkAuthenticated, loadUser } from '../components/utils/actions/authActions';

interface DashboardPageProps {
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}

const DashboardPage: React.FC<DashboardPageProps> = ({
  toggleDarkMode,
  isDarkMode,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, loading } = useSelector((state: RootState) => state.auth);
  const darkModeClass = isDarkMode ? 'grid-background-dark' : 'grid-background-light';
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(checkAuthenticated()).then(() => {
      dispatch(loadUser());
    });
  }, [dispatch]);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login');
    }
  }, [loading, isAuthenticated, navigate]);

  if (loading) {
    return <div>Loading...</div>;  // Or any other loading indicator
  }

  return (
    <div className={`w-full h-full ${darkModeClass} font-opensans`}>
      <NavBarDash toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardPage;
