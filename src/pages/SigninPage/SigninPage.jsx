import './SigninPage.css';

import HeaderWithoutNav from '../../components/Header/HeaderWithoutNav';
import SigninForm from '../../components/SigninForm/SigninForm';
import { Link } from 'react-router-dom';
import { appRoutes } from '../../const/app-routes';

function SigninPage() {
  return (
    <>
      <HeaderWithoutNav />
      <main className="LogoutPage">
        <div className="page__container">
          <div className="page__decoration">
            <h1 className="subtitle">Login</h1>
            <SigninForm />
            <Link to={appRoutes.Login}>
              <p className="login-link">
              Already have an account? Login
              </p>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

export default SigninPage;
