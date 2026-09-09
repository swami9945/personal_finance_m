import { Link } from "react-router-dom";

function Header({ title, subtitle }) {
  return (
    <header className="header">

      {/* =========================
          PAGE TITLE
      ========================= */}

      <div className="header-title">

        <h1>{title}</h1>

        {subtitle && (
          <p>{subtitle}</p>
        )}

      </div>


      {/* =========================
          HEADER ACTIONS
      ========================= */}

      <div className="header-actions">

        <Link
          to="/login"
          className="header-login"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="header-signup"
        >
          Sign Up
        </Link>

        <button
          className="icon-button"
          type="button"
          title="Search"
        >
          ⌕
        </button>

        <button
          className="icon-button"
          type="button"
          title="Notifications"
        >
          🔔
        </button>

      </div>

    </header>
  );
}

export default Header;