import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { register } from "../services/authService";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  function submit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    register({ name, email, password })
      .then((account) => {
        signIn(account);
        navigate("/app/dashboard", { replace: true });
      })
      .catch((requestError) =>
        setError(
          requestError.response?.data?.message ||
            "Unable to create your account.",
        ),
      )
      .finally(() => setLoading(false));
  }
  return (
    <section className="auth-card">
      <p className="eyebrow">Start fresh</p>
      <h1>Build a better money habit.</h1>
      <p className="auth-copy">
        Set up your private workspace in under a minute.
      </p>
      <form className="form-grid" onSubmit={submit}>
        <label>
          Your name
          <input
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Jamie Smith"
          />
        </label>
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
          Create password
          <input
            required
            minLength={8}
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="At least 8 characters"
          />
        </label>
        {error && <p className="form-error">{error}</p>}
        <button className="primary-button" type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create workspace"}
        </button>
      </form>
      <p className="auth-switch">
        Already have an account? <Link to="/login">Sign in</Link>
      </p>
    </section>
  );
}
