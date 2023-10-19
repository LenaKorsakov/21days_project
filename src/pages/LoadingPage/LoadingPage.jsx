import { SpinnerCircular } from 'spinners-react';
import './LoadingPage.css';

function LoadingPage() {
  return (
    <main className="LoadingPage">
      <div className="container">
        <div className="loader">
          <SpinnerCircular color="#000" size="80" />
        </div>
      </div>
    </main>
  );
}

export default LoadingPage;
