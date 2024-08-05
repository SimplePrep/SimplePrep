import React, { useEffect, ReactNode, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, RouteProps, Route, useLocation } from 'react-router-dom';
import { RootState, AppDispatch } from '../store';
import { checkAuthenticated } from './actions/Actions';
import LoaderWrapper from '../Dashboard/utils/tools/LoaderWrapper';

interface AuthenticatedRouteProps {
  children: ReactNode;
}

const AuthenticatedRoute: React.FC<AuthenticatedRouteProps> = ({ children }) => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const loading = useSelector((state: RootState) => state.auth.loading);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    dispatch(checkAuthenticated());
  }, [dispatch]);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login', { state: { from: location } });
    }
  }, [loading, isAuthenticated, navigate, location]);

  const handleLoadComplete = () => {
    setShowLoader(false);
  };

  if (loading || showLoader) {
    return (
      <LoaderWrapper
        minLoadTime={2000}
        onLoadComplete={handleLoadComplete}
        size="35px"
        text="Checking Authentication..."
        isDarkMode={false}
      />
    );
  }

  return <>{isAuthenticated ? children : null}</>;
};

export default AuthenticatedRoute;
