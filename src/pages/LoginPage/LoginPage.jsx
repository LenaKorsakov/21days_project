import './LoginPage.css';

import HeaderWithoutNav from '../../components/Header/HeaderWithoutNav';
import LoginForm from '../../components/LoginForm/LoginForm';
import { appRoutes } from '../../const/app-routes';
import { Link } from 'react-router-dom';

function LoginPage() {
  return (
    <>
      <HeaderWithoutNav />
      <main className="LoginPage">
        <div className="page__container">
          <div className="page__decoration">
            <h1 className="subtitle">Log in</h1>
            <LoginForm />
           
          </div>
        </div>
      </main>
    </>
  );
}

export default LoginPage;
