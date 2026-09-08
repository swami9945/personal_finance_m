import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <main className="auth-shell">
      <div className="auth-brand">
        <span className="brand-mark">p</span>
        <span>pocketful</span>
      </div>
      <Outlet />
    </main>
  );
}
