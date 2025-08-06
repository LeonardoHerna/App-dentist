import axios from "axios";

const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://app-dentist.onrender.com"
    : "http://localhost:5000";

const api = axios.create({
  baseURL: API_URL,
});

export const registerUser = (userData) => api.post("/api/citas/register", userData);

export const loginUser = (credentials) => api.post("/api/citas/login", credentials);

export const getUserCitas = (token) =>
  api.get("/api/citas/citas", {
    headers: { Authorization: `Bearer ${token}` },
  });

