import {  Link } from "react-router-dom";
import "./Header.css";
import { appRoutes } from "../../const/app-routes";

function HeaderWithoutNav() {
  return (
    <>
      <header className="Header">
        <div className="page-header__container">
          <div className="page-header-logo__container">
            <Link to={appRoutes.Main} title="to the main page">
              <img
                className="page-header__logo"
                src="/image/turtle.png"
                alt="21 days logo"
              />
            </Link>
            <div className="container">
              <Link to={appRoutes.Main} title="to the main page">
                <h3 className="page-header__title">21Days</h3>
                <small> It takes 21 days to make a habit...</small>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default HeaderWithoutNav;
