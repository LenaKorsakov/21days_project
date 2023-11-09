import { useContext, useEffect, useState } from 'react';
import { createContext } from 'react';
import { myApi } from '../../service/api';
import { toast } from 'react-toastify';
import { authorizationStatus } from '../../const/const';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

function AuthContentWrapper({ children }) {
  const [user, setUser] = useState(null);
  const [authStatus, setAuthStatus] = useState(authorizationStatus.Unknown);
  const [isLoading, setIsLoading] = useState(true);

  const authenticateUser = async () => {
    const token = localStorage.getItem('authToken');

    if (!token) {
      console.log('111111111');
      setUser(null);
      setAuthStatus(authorizationStatus.NoAuth);
      setIsLoading(false);

      return;
    }

    try {
      const user = await myApi.getUserInfo();
      console.log(user);

      setUser(user);
      setAuthStatus(authorizationStatus.Auth);
      setIsLoading(false);
    } catch (error) {
      setUser(null);
      setAuthStatus(authorizationStatus.Unknown);
      setIsLoading(false);
      toast.warning(
        `Something is going wrong. Try to reload this page or log in.`
      );
    }
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        authStatus,
        isLoading,
        authenticateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContentWrapper;
