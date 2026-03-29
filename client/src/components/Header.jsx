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
        <NavLink to="/">Homes</NavLink>
        <NavLink to="/bookings">Trips</NavLink>
        {user ? (
          <>
            <span className="user-chip">{user.name}</span>
            <button className="ghost-button" onClick={logout} type="button">
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Sign up</NavLink>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
