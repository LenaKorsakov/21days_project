import './NotFoundPage.css';
import { Link } from 'react-router-dom';

import { appRoutes } from '../../const/app-routes';

function NotFoundPage() {
  return (
    <>
      <main className="NotFoundPage">
        <div className="container">
          <h1>Page not found</h1>
          <Link className="btn" title="To the main page" to={appRoutes.Main}>
            <div>Back to the main page</div>
          </Link>
        </div>
      </main>
    </>
  );
}

export default NotFoundPage;
