import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const Header = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState([]);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      setNotifications([]);
      return;
    }

    const loadNotifications = async () => {
      try {
        const { data } = await api.get("/notifications/mine");
        setNotifications(data);
      } catch (_error) {
        setNotifications([]);
      }
    };

    loadNotifications();
  }, [user]);

  const unreadCount = notifications.filter((notification) => !notification.read).length;

  const toggleNotifications = async () => {
    const nextOpen = !notificationsOpen;
    setNotificationsOpen(nextOpen);

    if (nextOpen && unreadCount) {
      try {
        await api.patch("/notifications/read-all");
        setNotifications((current) => current.map((notification) => ({ ...notification, read: true })));
      } catch (_error) {
        // Ignore notification read errors in the header.
      }
    }
  };

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
            <div className="notification-menu">
              <button
                className="ghost-button notification-toggle"
                onClick={toggleNotifications}
                type="button"
              >
                Notifications {unreadCount ? `(${unreadCount})` : ""}
              </button>
              {notificationsOpen ? (
                <div className="notification-panel">
                  {notifications.length ? (
                    notifications.map((notification) => (
                      <article
                        className={notification.read ? "notification-item" : "notification-item notification-item--new"}
                        key={notification._id}
                      >
                        <strong>{notification.title}</strong>
                        <p>{notification.message}</p>
                      </article>
                    ))
                  ) : (
                    <p className="notification-empty">No notifications yet.</p>
                  )}
                </div>
              ) : null}
            </div>
            <button className="ghost-button theme-toggle" onClick={toggleTheme} type="button">
              {theme === "dark" ? "Light mode" : "Dark mode"}
            </button>
            <button className="ghost-button nav-logout" onClick={logout} type="button">
              Logout
            </button>
          </>
        ) : (
          <>
            <button className="ghost-button theme-toggle" onClick={toggleTheme} type="button">
              {theme === "dark" ? "Light mode" : "Dark mode"}
            </button>
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
