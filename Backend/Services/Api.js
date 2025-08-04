import axios from "axios";

const API_URL = "https://app-dentist.onrender.com"; 

const api = axios.create({
  baseURL: API_URL,
});

export const registerUser = (userData) => api.post("/api/citas/register", userData);

export const loginUser = (credentials) => api.post("/api/citas/login", credentials);

export const getUserCitas = (token) =>
  api.get("/api/citas/citas", {
    headers: { Authorization: `Bearer ${token}` },
  });
