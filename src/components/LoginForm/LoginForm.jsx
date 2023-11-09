import './LoginForm.css';

import { useRef } from 'react';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from '../AuthContextWrapper/AuthContextWrapper';
import { myApi } from '../../service/api';

import { appRoutes } from '../../const/app-routes';

function LoginForm() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();

  const { authenticateUser } = useAuth();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      const response = await myApi.login({ email, password });

      localStorage.setItem('authToken', response.authToken);

      await authenticateUser();

      if (location.state?.from) {
        const { pathname } = location.state.from;

        navigate(pathname);
      } else {
        navigate(appRoutes.Main);
      }
    } catch (error) {
      toast.warning(error);
    }
  };

  return (
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
  );
}

export default LoginForm;
