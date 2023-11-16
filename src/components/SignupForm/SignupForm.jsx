import './SignupForm.css';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { myApi } from '../../service/api';

import { apiRoutes } from '../../const/api-routes';
import { appRoutes } from '../../const/app-routes';
import { messageForUser } from '../../const/const';

const passwordRegex = /^(?=.*?[A-Za-z])(?=.*?[0-9]).{2,}$/;
const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

function SignupForm() {
  const userNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);

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

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const email = emailRef.current.value;
    const name = userNameRef.current.value;
    const password = passwordRef.current.value;

    const formData = {
      email,
      name,
      password,
    };

    const resetPassword = () => {
      passwordRef.current.value = '';
    };

    const resetForm = () => {
      passwordRef.current.value = '';
      emailRef.current.value = '';
      userNameRef.current.value = '';
    };

    const isErrEmail = validateEmail(email);
    const isErrPass = validatePassword(password);

    if (!isErrEmail && !isErrPass && name !== '') {
      try {
        await myApi.post(apiRoutes.Signup, formData);
        setSuccess(true);
        resetForm();
      } catch (error) {
        const errorMessage = error.response.data.message;

        setError(errorMessage);
        resetPassword();
        setTimeout(() => {
          setError('');
        }, 6000);
      }
    } else {
      setError(messageForUser.TryAgain);
      resetPassword();
      setTimeout(() => {
        setIsEmailError(false);
        setIsPasswordError(false);
      }, 3000);
    }
  };

  const showMessageElement = () => {
    if (error) {
      return (
        <p>
          {messageForUser.ErrorSignIn}{' '}
          <Link className="login-link" to={appRoutes.Login}>
            Log in
          </Link>
        </p>
      );
    } else if (success) {
      return (
        <p>
          {messageForUser.SuccessfulSignup}{' '}
          <Link className="login-link" to={appRoutes.Login}>
            Log in
          </Link>{' '}
          and start your jorney!
        </p>
      );
    } else {
      return (
        <p>
          Already have an account?{' '}
          <Link className="login-link" to={appRoutes.Login}>
            Log in
          </Link>
        </p>
      );
    }
  };

  return (
    <>
      <form
        className="SignupForm"
        action=""
        method="post"
        onSubmit={handleFormSubmit}
      >
        <div className="container login__input-wrapper">
          <label className="form__label">User name*</label>
          <input
            ref={userNameRef}
            className="form__item"
            name="name"
            autoFocus
            required
          />
        </div>
        <div className="container login__input-wrapper">
          <label className="form__label">E-mail</label>
          <input
            ref={emailRef}
            className={`form__item ${isEmailError ? 'error' : ''}`}
            name="email"
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
            className={`form__item ${isPasswordError ? 'error' : ''}`}
            type="password"
            name="password"
            autoComplete="off"
            required
          />
          {isPasswordError && (
            <p className="error-message">{messageForUser.ValidatePassword}</p>
          )}
        </div>
        <button className="btn btn--login" type="submit">
          Sign Up
        </button>
      </form>
      {showMessageElement()}
    </>
  );
}

export default SignupForm;
