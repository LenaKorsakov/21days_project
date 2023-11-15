import './LandingPage.css';

import { Link } from 'react-router-dom';

import HeaderWithoutNav from '../../components/Header/HeaderWithoutNav';

import { appRoutes } from '../../const/app-routes';

function LandingPage() {
  return (
    <>
      <HeaderWithoutNav />
      <main className="LandingPage">
        <div className="logo">
          <img alt="logo" src="/image/turtle.png" />
        </div>
        <h1>It seems like you want to start building habits!</h1>
        <p>What a great opportunity for it!</p>
        <p>You can now Sign Up to create your own habits or just Log In:</p>

        <div className="Landing-page__buttons-wrapper">
          <div className="button__container">
            <Link to={appRoutes.Signup}>
              <div className="btn btn--nav">Sign Up</div>
            </Link>
            <Link to={appRoutes.Login}>
              <p className="login-link link">Already have an account? Login</p>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

export default LandingPage;
