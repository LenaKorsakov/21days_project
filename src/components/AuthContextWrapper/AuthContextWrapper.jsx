import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { authorizationStatus, messageForUser } from '../../const/const';
import { myApi } from '../../service/api';

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
      setUser(null);
      setAuthStatus(authorizationStatus.NoAuth);
      setIsLoading(false);

      return;
    }

    try {
      const user = await myApi.getUserInfo();

      setUser(user);
      setAuthStatus(authorizationStatus.Auth);
      setIsLoading(false);
    } catch (error) {
      setUser(null);
      setAuthStatus(authorizationStatus.Unknown);
      setIsLoading(false);
      toast.warning(messageForUser.ErrorSignIn);
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
