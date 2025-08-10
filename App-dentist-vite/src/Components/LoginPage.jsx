import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../Services/api";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  if (!email || !password) {
    setError("Por favor, completa todos los campos.");
    return;
  }

  try {
    const { data } = await API.post("/auth/login", { email, password });

    const { token, rol, message } = data;

    if (token && rol) {
      localStorage.setItem("token", token);
      localStorage.setItem("rol", rol);

      alert("Inicio de sesión exitoso");

      // Redirección según rol
      if (rol.toLowerCase() === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } else {
      setError(message || "No se recibió un token o rol válido.");
    }
  } catch (error) {
    console.error("Error:", error);

    if (error.response) {
      // El servidor respondió con un código de error
      setError(error.response.data?.message || "Error en el inicio de sesión.");
    } else {
      // El error ocurrió antes de recibir respuesta (conexión, CORS, etc.)
      setError("Error al conectarse con el servidor.");
    }
  }
};
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
          <span className="text-blue-500">AgenDent</span>
        </h1>
        <p className="text-gray-600 mt-2 text-lg">
          ¡Organiza tus citas fácilmente y con confianza!
        </p>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-medium">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="example@correo.com"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-medium">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="********"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-200"
          >
            Iniciar Sesión
          </button>
          {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
        </form>

        <div className="text-center mt-4">
          <p className="text-gray-600">
            ¿No tienes una cuenta?{" "}
            <Link to="/registro" className="text-blue-500 hover:underline">
              Regístrate
            </Link>
          </p>
        </div>
      </div>
         <Link
        to="/"
        className="inline-flex items-center px-4 py-2 mt-4 font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
      >
        ← Volver al inicio
      </Link>
    </div>
  );
};

export default LoginPage;
