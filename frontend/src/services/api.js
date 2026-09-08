import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8081/api",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("pocketful_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 &&
      window.location.pathname.startsWith("/app")
    ) {
      localStorage.removeItem("pocketful_user");
      localStorage.removeItem("pocketful_token");
      window.location.assign("/login?session=expired");
    }
    return Promise.reject(error);
  },
);

export default api;
