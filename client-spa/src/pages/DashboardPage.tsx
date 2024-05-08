import React, { useContext, useEffect } from 'react';
import {  Outlet, useNavigate } from 'react-router-dom'
import NavBarDash from '../components/Dashboard/NavBarDash';
import  AuthContext  from '../components/utils/AuthContext';

interface DashboardPageProps {
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}

const DashboardPage:React.FC<DashboardPageProps> = ({
  toggleDarkMode, 
  isDarkMode, 
}) => {
  const { isAuthenticated, loading, checkAuthenticated, loadUser } = useContext(AuthContext);
  const darkModeClass = isDarkMode ? 'grid-background-dark' : 'grid-background-light';
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthenticated().then(loadUser);
  }, [checkAuthenticated, loadUser]);
  
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login');
    }
  }, [loading, isAuthenticated, navigate]);
  
  if (loading) {
    return <div>Loading...</div>;  // Or any other loading indicator
  }

  return (
        <div className={`w-full h-full ${darkModeClass} font-montserrat`}>
            <NavBarDash toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode}/>
            <div>
              <Outlet/>
            </div>
        </div>
  )
}
export default DashboardPage;
