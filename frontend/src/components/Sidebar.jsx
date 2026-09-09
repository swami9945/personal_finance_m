import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">

      {/* =========================
          LOGO
      ========================= */}

      <div className="logo">

        <div className="logo-icon">
          ₹
        </div>

        <div>
          <h2>FinTrack</h2>
          <span>Personal Finance</span>
        </div>

      </div>


      {/* =========================
          NAVIGATION
      ========================= */}

      <nav className="navigation">

        <NavLink to="/dashboard">
          <span>⌂</span>
          Dashboard
        </NavLink>

        <NavLink to="/transactions">
          <span>⇄</span>
          Transactions
        </NavLink>

        <NavLink to="/income">
          <span>↗</span>
          Income
        </NavLink>

        <NavLink to="/expenses">
          <span>↘</span>
          Expenses
        </NavLink>

        <NavLink to="/budget">
          <span>◫</span>
          Budget
        </NavLink>

        <NavLink to="/reports">
          <span>▥</span>
          Reports
        </NavLink>

        <NavLink to="/calculator">
          <span>🧮</span>
          Calculator
        </NavLink>

        <NavLink to="/savings-goals">
          <span>🎯</span>
          Savings Goals
        </NavLink>

      </nav>


      {/* =========================
          USER SECTION
      ========================= */}

      <div className="sidebar-bottom">

        <div className="user-placeholder">

          <div className="avatar">
            U
          </div>

          <div>
            <strong>User</strong>
            <small>Personal Account</small>
          </div>

        </div>

      </div>

    </aside>
  );
}

export default Sidebar;