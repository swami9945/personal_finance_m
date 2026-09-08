import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { getProfile, updateProfile } from "../services/profileService";

export default function Profile() {
  const { signIn } = useAuth();
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    getProfile()
      .then((data) => {
        setProfile(data);
        setForm({ name: data.name, email: data.email });
      })
      .catch((requestError) =>
        setError(
          requestError.response?.data?.message || "Profile is unavailable.",
        ),
      )
      .finally(() => setLoading(false));
  }, []);
  function save(event) {
    event.preventDefault();
    setSaving(true);
    updateProfile(form)
      .then((data) => {
        setProfile(data);
        signIn({ ...data, token: localStorage.getItem("pocketful_token") });
      })
      .catch((requestError) =>
        setError(
          requestError.response?.data?.message || "Unable to save profile.",
        ),
      )
      .finally(() => setSaving(false));
  }
  if (loading)
    return (
      <div className="state-panel">
        <div className="loading-spinner" />
        <h2>Loading profile...</h2>
      </div>
    );
  if (error)
    return (
      <div className="state-panel error-state">
        <h2>Profile could not be loaded.</h2>
        <p>{error}</p>
      </div>
    );
  return (
    <>
      <div className="page-title-row">
        <div>
          <p className="eyebrow">Your workspace</p>
          <h1>Profile</h1>
          <p className="subhead">
            Manage your account details and preferences.
          </p>
        </div>
      </div>
      <section className="panel form-panel">
        <div className="profile-large">
          <div className="avatar">{profile.name.slice(0, 2).toUpperCase()}</div>
          <div>
            <h2>{profile.name}</h2>
            <p>{profile.email}</p>
          </div>
        </div>
        <form className="form-grid" onSubmit={save}>
          <label>
            Display name
            <input
              required
              value={form.name}
              onChange={(event) =>
                setForm({ ...form, name: event.target.value })
              }
            />
          </label>
          <label>
            Email address
            <input
              required
              type="email"
              value={form.email}
              onChange={(event) =>
                setForm({ ...form, email: event.target.value })
              }
            />
          </label>
          {error && <p className="form-error">{error}</p>}
          <button className="primary-button" disabled={saving}>
            {saving ? "Saving..." : "Save changes"}
          </button>
        </form>
      </section>
    </>
  );
}
