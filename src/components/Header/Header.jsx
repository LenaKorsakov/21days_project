import { NavLink, Outlet, Link } from "react-router-dom";
import "./Header.css";
import { appRoutes } from "../../const/app-routes";

function Header() {
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
                <p> It takes 21 days to make a habit...</p>
              </Link>
            </div>
          </div>

          <ul className="page-header-nav__list">
            <li>
              <NavLink
                to={appRoutes.Main}
                end
                className={({ isActive }) =>
                  isActive ? "link active" : "link"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "link active" : "link"
                }
                to={appRoutes.Explore}
              >
                Explore
              </NavLink>
            </li>
          </ul>
        </div>
      </header>
      <Outlet />
    </>
  );
}

export default Header;
