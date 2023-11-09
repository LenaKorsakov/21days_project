import { Navigate, Outlet } from 'react-router-dom';
import { authorizationStatus } from '../../const/const';
import LoadingPage from '../../pages/LoadingPage/LoadingPage';
import { useAuth } from '../AuthContextWrapper/AuthContextWrapper';
import { appRoutes } from '../../const/app-routes';

function AuthRedirect() {
  const { authStatus, isLoading } = useAuth();

  if (isLoading || authorizationStatus === authorizationStatus.Unknown) {
    return <LoadingPage />;
  }

  if (authStatus === authorizationStatus.Auth) {
    return <Navigate to={appRoutes.Main} />;
  }

  return <Outlet />;
}

export default AuthRedirect;
