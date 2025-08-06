import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


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
    const response = await fetch("https://app-dentist.onrender.com/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    // Intentamos parsear el cuerpo de la respuesta
    let data;
    try {
      data = await response.json();
    } catch {
      setError("Respuesta inesperada del servidor.");
      return;
    }

    if (response.ok) {
      if (data.token) {
        localStorage.setItem("token", data.token);
        alert("Inicio de sesión exitoso");
        navigate("/dashboard");
      } else {
        setError("No se recibió un token válido.");
      }
    } else {
      setError(data.message || "Error en el inicio de sesión.");
    }
  } catch (error) {
    console.error("Error:", error);
    setError("Error al conectarse con el servidor.");
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
    </div>
  );
};

export default LoginPage;



