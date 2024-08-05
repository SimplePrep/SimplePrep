import React, { useEffect, ReactNode, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState, AppDispatch } from '../store';
import { checkAuthenticated } from '../auth_utils/actions/Actions';
import LoaderWrapper from '../Dashboard/utils/tools/LoaderWrapper';

interface AuthenticatedComponentProps {
  children: ReactNode;
}

const AuthenticatedComponent: React.FC<AuthenticatedComponentProps> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const loading = useSelector((state: RootState) => state.auth.loading);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    const initializeAuthCheck = async () => {
      await dispatch(checkAuthenticated());
      setIsInitialLoad(false);
    };

    initializeAuthCheck();
  }, [dispatch]);

  useEffect(() => {
    if (!loading && !isAuthenticated && !isInitialLoad) {
      navigate('/login');
    }
  }, [loading, isAuthenticated, isInitialLoad, navigate]);

  if (loading || isInitialLoad) {
    return <LoaderWrapper size='250px'  minLoadTime={2000} onLoadComplete={() => {}} text="Checking authentication..." />;
  }

  return <>{isAuthenticated && children}</>;
};

export default AuthenticatedComponent;
