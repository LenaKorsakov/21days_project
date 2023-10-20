import { NavLink, Outlet } from 'react-router-dom';
import './Header.css';
import { appRoutes } from '../../const/app-routes';

function Header() {
  return (
    <>
      <header className="Header">
        <div className="page-header__container">
          <div className="page-header-logo__container">
            <img
              className="page-header__logo"
              src="../../../public/image/cute-cartoon-turtle-file-with-transparent-background-png.webp"
              alt="21 days logo"
            />

            <div className="container">
              <h3 className="page-header__title">21Days</h3>
              <small> It takes 21 days to make a habit...</small>
            </div>
          </div>

          <ul className="page-header-nav__list">
            <li>
              <NavLink
                to={appRoutes.Main}
                end
                className={({ isActive }) =>
                  isActive ? 'link active' : 'link'
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? 'link active' : 'link'
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
