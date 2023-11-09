import './LoginForm.css';

import { useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { myApi } from '../../service/api';
import { useAuth } from '../AuthContextWrapper/AuthContextWrapper';

import { apiRoutes } from '../../const/api-routes';
import { appRoutes } from '../../const/app-routes';
import { messageForUser, serverResponse } from '../../const/const';

function LoginForm() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();

  const [error, setError] = useState('');

  const { authenticateUser } = useAuth();

  const navigateUser = () => {
    if (location.state?.from) {
      const { pathname } = location.state.from;

      navigate(pathname);
    } else {
      navigate(appRoutes.Main);
    }
  };

  const resetPassword = () => {
    passwordRef.current.value = '';
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setError('');
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      const { data } = await myApi.post(apiRoutes.Login, { email, password });
      localStorage.setItem('authToken', data.token);

      await authenticateUser();
      navigateUser();
    } catch (error) {
      const errorMessage = error.response.data.message;
      if (
        errorMessage === serverResponse.NotFound ||
        errorMessage === serverResponse.WrongPassword
      ) {
        setError(errorMessage);
        resetPassword();
        setTimeout(() => {
          setError('');
        }, 6000);
      } else {
        toast.error(`${error.message}. ${errorMessage.Reload}`);
      }
    }
  };

  return (
    <>
      <form
        className="LoginForm"
        action=""
        method="post"
        onSubmit={handleFormSubmit}
      >
        <div className="container login__input-wrapper">
          <label className="form__label">E-mail</label>
          <input
            ref={emailRef}
            // autoComplete="off"
            className="form__item"
            name="email"
            autoFocus
            required
          />
        </div>
        <div className="container login__input-wrapper">
          <label className="form__label">Password</label>
          <input
            ref={passwordRef}
            className="form__item"
            type="password"
            name="password"
            autoComplete="off"
            required
          />
        </div>
        <button className="btn btn--login" type="submit">
          LOG IN
        </button>
      </form>
      {error ? (
        <p>
          {messageForUser.WrongCredentials}{' '}
          <Link className="login-link" to={appRoutes.Signup}>
            Sign up
          </Link>
        </p>
      ) : (
        <p>
          You don't have an account?{' '}
          <Link className="login-link" to={appRoutes.Signup}>
            Sign up
          </Link>
        </p>
      )}
    </>
  );
}

export default LoginForm;
