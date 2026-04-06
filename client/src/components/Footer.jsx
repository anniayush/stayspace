import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="site-footer">
    <div className="site-footer__inner">
      <div>
        <p className="site-footer__eyebrow">StaySpace</p>
        <h2>Find stays that feel designed, calm, and easy to book.</h2>
      </div>
      <div className="site-footer__links">
        <Link to="/">Homes</Link>
        <Link to="/bookings">Trips</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Sign up</Link>
      </div>
    </div>
    <p className="site-footer__note">Curated homes for weekends away, long stays, and spontaneous escapes.</p>
  </footer>
);

export default Footer;
