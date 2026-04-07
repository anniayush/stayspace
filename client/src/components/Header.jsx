import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="site-header">
      <Link className="brand" to="/">
        <img alt="StaySpace" className="brand__logo" src="/images/branding/stayspace-logo.svg" />
        <span className="brand__text">StaySpace</span>
      </Link>
      <nav className="nav-links">
        <NavLink className="nav-pill" to="/">
          Homes
        </NavLink>
        <NavLink className="nav-pill nav-pill--trip" to="/bookings">
          Trips
        </NavLink>
        {user ? (
          <>
            <span className="user-chip">{user.name}</span>
            <button className="ghost-button nav-logout" onClick={logout} type="button">
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink className="nav-login" to="/login">
              Login
            </NavLink>
            <NavLink to="/register">Sign up</NavLink>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
