import './SignupPage.css';

import HeaderWithoutNav from '../../components/Header/HeaderWithoutNav';
import SignupForm from '../../components/SignupForm/SignupForm';

function SignupPage() {
  return (
    <>
      <HeaderWithoutNav />
      <main className="SignupPage">
        <div className="page__container">
          <div className="page__decoration">
            <h1 className="subtitle">Sign Up</h1>
            <SignupForm />
          </div>
        </div>
      </main>
    </>
  );
}

export default SignupPage;
