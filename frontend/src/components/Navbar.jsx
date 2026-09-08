import {
  Bell,
  CheckCircle2,
  Menu,
  Moon,
  Plus,
  Search,
  Sun,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar({ onMenu, onAdd }) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("pocketful_theme") === "dark",
  );
  const location = useLocation();
  const label = location.pathname.split("/").pop().replaceAll("-", " ");
  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? "dark" : "light";
    localStorage.setItem("pocketful_theme", darkMode ? "dark" : "light");
  }, [darkMode]);
  return (
    <header className="topbar">
      <button className="mobile-menu" aria-label="Open menu" onClick={onMenu}>
        <Menu size={21} />
      </button>
      <div className="breadcrumb">
        Workspace <span>/</span> {label === "dashboard" ? "Overview" : label}
      </div>
      <div className="top-actions">
        <label className="search-box">
          <Search size={16} />
          <input
            placeholder="Search activity"
            aria-label="Search activity"
            onChange={(event) =>
              window.dispatchEvent(
                new CustomEvent("transaction-search", {
                  detail: event.target.value,
                }),
              )
            }
          />
        </label>
        <button
          className="icon-button theme-toggle"
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <div className="notification-wrap">
          <button
            className="icon-button notification"
            aria-label="Notifications"
            onClick={() => setNotificationsOpen(!notificationsOpen)}
          >
            <Bell size={19} />
            <i />
          </button>
          {notificationsOpen && (
            <div className="notification-popover">
              <div className="popover-heading">
                <strong>Notifications</strong>
                <span>2 new</span>
              </div>
              <Link
                to="/app/notifications"
                onClick={() => setNotificationsOpen(false)}
              >
                <span className="notification-icon coral">
                  <Bell size={14} />
                </span>
                <span>
                  <strong>Budget check-in</strong>
                  <small>Essentials is 73% used</small>
                </span>
              </Link>
              <Link
                to="/app/notifications"
                onClick={() => setNotificationsOpen(false)}
              >
                <span className="notification-icon mint">
                  <CheckCircle2 size={14} />
                </span>
                <span>
                  <strong>Goal milestone</strong>
                  <small>Emergency fund crossed 68%</small>
                </span>
              </Link>
              <Link
                className="popover-footer"
                to="/app/notifications"
                onClick={() => setNotificationsOpen(false)}
              >
                View all notifications
              </Link>
            </div>
          )}
        </div>
        <button className="add-button" onClick={onAdd}>
          <Plus size={18} /> Add transaction
        </button>
      </div>
    </header>
  );
}
