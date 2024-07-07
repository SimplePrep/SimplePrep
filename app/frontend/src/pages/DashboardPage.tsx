import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import NavBarDash from '../components/Dashboard/NavBarDash';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../components/store';
import { checkAuthenticated, loadUser } from '../components/auth_utils/actions/authActions';
import BookLoader from '../components/Dashboard/utils/bookLoader';

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
  const [initialLoad, setInitialLoad] = useState(true);
  const darkModeClass = isDarkMode ? 'grid-background-dark' : 'grid-background-light';
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = async () => {
      await dispatch(checkAuthenticated());
      await dispatch(loadUser());
      setInitialLoad(false);
    };
    checkAuthStatus();
  }, [dispatch]);

  useEffect(() => {
    if (!loading && !isAuthenticated && !initialLoad) {
      navigate('/login');
    }
  }, [loading, isAuthenticated, initialLoad, navigate]);

  return (
    <div className={`w-full h-full ${darkModeClass} font-opensans relative`}>
      {(initialLoad || loading) && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50">
          <BookLoader
            background="linear-gradient(135deg, #6066FA, #4645F6)"
            desktopSize="100px"
            mobileSize="80px"
            textColor="#4645F6"
            duration="5s"
          />
        </div>
      )}
      <NavBarDash toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
      <Outlet />
    </div>
  );
};

export default DashboardPage;