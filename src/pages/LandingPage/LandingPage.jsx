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
        <h1>You haven't built a single habit yet!</h1>
        <p>What a great opportunity to start anew!</p>
        <p>
          You can now Sign Up to create your first habit or Get started to
          explore habits from our selection:
        </p>

        <div className="Landing-page__buttons-wrapper">
          <div className="button__container">
            <Link to={appRoutes.Signup}>
              <div className="btn btn--nav">Sign Up</div>
            </Link>
            <Link to={appRoutes.Login}>
              <p className="login-link link">Already have an account? Login</p>
            </Link>
          </div>

          <Link to={appRoutes.Explore} className="button__container">
            <div className="btn btn--nav">Get started</div>
          </Link>
        </div>
      </main>
    </>
  );
}

export default LandingPage;
