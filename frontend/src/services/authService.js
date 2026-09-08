import api from "./api";

export async function login(credentials) {
  const response = await api.post("/auth/login", credentials);
  return response.data;
}

export async function register(payload) {
  const response = await api.post("/auth/register", payload);
  return response.data;
}

export function saveAuthSession(account) {
  localStorage.setItem("pocketful_user", JSON.stringify(account));
  localStorage.setItem("pocketful_token", account.token);
}
