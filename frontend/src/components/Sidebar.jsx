import {
  BarChart3,
  CircleHelp,
  LayoutDashboard,
  LogOut,
  Repeat2,
  Settings,
  Target,
  WalletCards,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const links = [
  ["Dashboard", "/app/dashboard", LayoutDashboard],
  ["Transactions", "/app/transactions", WalletCards],
  ["Budgets", "/app/budgets", Target],
  ["Savings goals", "/app/savings-goals", Target],
  ["Recurring", "/app/recurring", Repeat2],
  ["Analytics", "/app/analytics", BarChart3],
  ["Reports", "/app/reports", BarChart3],
];

export default function Sidebar({ open, onClose }) {
  const { user, signOut } = useAuth();
  return (
    <aside className={`sidebar ${open ? "menu-open" : ""}`}>
      <div className="brand">
        <span className="brand-mark">p</span>
        <span>pocketful</span>
      </div>
      <div className="profile">
        <div className="avatar">JS</div>
        <div>
          <strong>{user?.name || "Jamie Smith"}</strong>
          <span>Personal account</span>
        </div>
      </div>
      <nav className="main-nav" aria-label="Main navigation">
        <p className="nav-label">Workspace</p>
        {links.map(([label, path, Icon]) => (
          <NavLink
            key={path}
            to={path}
            onClick={onClose}
            className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
          >
            <Icon size={18} />
            <span>{label}</span>
          </NavLink>
        ))}
        <p className="nav-label nav-label-spaced">Manage</p>
        <NavLink
          to="/app/profile"
          onClick={onClose}
          className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
        >
          <Settings size={18} />
          <span>Profile</span>
        </NavLink>
        <button className="nav-item" onClick={signOut}>
          <LogOut size={18} />
          <span>Log out</span>
        </button>
      </nav>
      <div className="sidebar-footer">
        <div className="tip-icon">
          <CircleHelp size={17} />
        </div>
        <div>
          <strong>Need a hand?</strong>
          <span>Visit the help center</span>
        </div>
      </div>
    </aside>
  );
}
