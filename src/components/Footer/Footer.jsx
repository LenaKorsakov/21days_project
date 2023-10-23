import { NavLink } from 'react-router-dom';
import './Footer.css';
import { appRoutes } from '../../const/app-routes';

function Footer() {
  return (
    <>
      <footer className="Footer">
        <div className="page-header__container">
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
          <span>
            Made with ❤️ <br /> by Rony and Elena{' '}
          </span>
        </div>
      </footer>
    </>
  );
}

export default Footer;
