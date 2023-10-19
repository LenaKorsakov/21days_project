import './ErrorPage.css';
import { Link } from 'react-router-dom';

import { appRoute } from '../../const/app-route';

function NotFoundPage() {
  return (
    <>
      <main className="ErrorPage">
        <div className="container">
          <h1>Page not found</h1>
          <Link className="btn" title="To the main page" to={appRoute.Main}>
            <div>Back to the main page</div>
          </Link>
        </div>
      </main>
    </>
  );
}

export default NotFoundPage;
