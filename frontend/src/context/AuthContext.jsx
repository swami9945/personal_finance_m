import { useMemo, useState } from "react";
import AuthContext from "./authContext";
import { saveAuthSession } from "../services/authService";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("pocketful_user");
    return saved ? JSON.parse(saved) : null;
  });

  function signIn(account) {
    saveAuthSession(account);
    setUser(account);
  }

  function signOut() {
    localStorage.removeItem("pocketful_user");
    localStorage.removeItem("pocketful_token");
    setUser(null);
  }

  const value = useMemo(
    () => ({ user, isAuthenticated: Boolean(user), signIn, signOut }),
    [user],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
