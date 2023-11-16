import './LoginForm.css';

import { useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { myApi } from '../../service/api';
import { useAuth } from '../AuthContextWrapper/AuthContextWrapper';

import { apiRoutes } from '../../const/api-routes';
import { appRoutes } from '../../const/app-routes';
import { messageForUser, serverResponse } from '../../const/const';

const passwordRegex = /^(?=.*?[A-Za-z])(?=.*?[0-9]).{2,}$/;
const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

function LoginForm() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();

  const [error, setError] = useState('');
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);

  const { authenticateUser } = useAuth();

  const validateEmail = (value) => {
    if (!value.match(emailRegex)) {
      setIsEmailError(true);
      return true;
    }
  };

  const validatePassword = (value) => {
    if (!value.match(passwordRegex)) {
      setIsPasswordError(true);
      return true;
    }
  };

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
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const isErrEmail = validateEmail(email);
    const isErrPass = validatePassword(password);

    if (!isErrEmail && !isErrPass) {
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
    } else {
      setError(messageForUser.TryAgain);
      resetPassword();
      setTimeout(() => {
        setIsEmailError(false);
        setIsPasswordError(false);
        setError('');
      }, 3000);
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
            autoComplete="off"
            className={`form__item ${isEmailError ? 'error' : ''}`}
            name="email"
            autoFocus
            required
          />
          {isEmailError && (
            <p className="error-message">{messageForUser.ValidateLogin}</p>
          )}
        </div>
        <div className="container login__input-wrapper">
          <label className="form__label">Password</label>
          <input
            ref={passwordRef}
            type="password"
            name="password"
            className={`form__item ${isPasswordError ? 'error' : ''}`}
            autoComplete="off"
            required
          />
          {isPasswordError && (
            <p className="error-message">{messageForUser.ValidatePassword}</p>
          )}
        </div>
        <button className="btn btn--login" type="submit">
          Log In
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
