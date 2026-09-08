import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

export default function MainLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="app-shell">
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
      <main className="main-content">
        <Navbar
          onMenu={() => setMenuOpen((open) => !open)}
          onAdd={() => navigate("/app/expense")}
        />
        <div className="page-content">
          <Outlet />
        </div>
        <Footer />
      </main>
    </div>
  );
}
