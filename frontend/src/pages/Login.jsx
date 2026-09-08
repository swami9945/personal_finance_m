import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { login } from "../services/authService";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const sessionExpired =
    new URLSearchParams(location.search).get("session") === "expired";
  function submit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    login({ email, password })
      .then((account) => {
        signIn(account);
        navigate(location.state?.from?.pathname || "/app/dashboard", {
          replace: true,
        });
      })
      .catch((requestError) =>
        setError(
          requestError.response?.data?.message ||
            "Unable to sign in. Check your details.",
        ),
      )
      .finally(() => setLoading(false));
  }
  return (
    <section className="auth-card">
      <p className="eyebrow">Welcome back</p>
      <h1>Make money feel simple.</h1>
      <p className="auth-copy">
        Your calm, clear view of everything you earn, spend, and save.
      </p>
      {sessionExpired && (
        <p className="form-error">
          Your session expired. Please sign in again.
        </p>
      )}
      <form className="form-grid" onSubmit={submit}>
        <label>
          Email address
          <input
            required
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
          />
        </label>
        <label>
          Password
          <input
            required
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="••••••••"
          />
        </label>
        {error && <p className="form-error">{error}</p>}
        <button className="primary-button" type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
      <p className="auth-switch">
        New to pocketful? <Link to="/register">Create an account</Link>
      </p>
    </section>
  );
}
