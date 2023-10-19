import { Outlet } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <>
      <div className="Header">Header</div>
      <Outlet />
    </>
  );
}

export default Header;
