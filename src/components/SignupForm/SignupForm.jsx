import './SignupForm.css';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { myApi } from '../../service/api';

import { apiRoutes } from '../../const/api-routes';
import { appRoutes } from '../../const/app-routes';
import { messageForUser } from '../../const/const';

function SignupForm() {
  const userNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

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
          Alredy have an account?{' '}
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
          <label className="form__label">User name</label>
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
          <input ref={emailRef} className="form__item" name="email" required />
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
          SIGN UP
        </button>
      </form>
      {showMessageElement()}
    </>
  );
}

export default SignupForm;
