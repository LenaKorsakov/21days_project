import { Navigate, Outlet } from 'react-router-dom';
import { authorizationStatus } from '../../const/const';
import LoadingPage from '../../pages/LoadingPage/LoadingPage';
import { useAuth } from '../AuthContextWrapper/AuthContextWrapper';
import { appRoutes } from '../../const/app-routes';

function PrivateRoute() {
  const { authStatus, isLoading } = useAuth();
  console.log(authStatus);

  if (isLoading || authorizationStatus === authorizationStatus.Unknown) {
    return <LoadingPage />;
  }

  if (authStatus === authorizationStatus.NoAuth) {
    return <Navigate to={appRoutes.Landing} />;
  }

  return <Outlet />;
}

export default PrivateRoute;
