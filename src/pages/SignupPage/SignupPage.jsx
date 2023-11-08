import './SignupPage.css';

import HeaderWithoutNav from '../../components/Header/HeaderWithoutNav';
import SignupForm from '../../components/SignupForm/SignupForm';
import { Link } from 'react-router-dom';
import { appRoutes } from '../../const/app-routes';

function SignupPage() {
  return (
    <>
      <HeaderWithoutNav />
      <main className="SignupPage">
        <div className="page__container">
          <div className="page__decoration">
            <h1 className="subtitle">Sign Up</h1>
            <SignupForm />
            <Link to={appRoutes.Login}>
              <p className="login-link">Already have an account? Login</p>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

export default SignupPage;
