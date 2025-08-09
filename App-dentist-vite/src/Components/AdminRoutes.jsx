// components/AdminRoute.jsx
import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.rol === "admin" ? children : <Navigate to="/usuario" />;
}
