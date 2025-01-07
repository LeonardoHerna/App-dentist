import React, { useState } from "react";
import { registerUser, loginUser } from "../services/api";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ nombre: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const response = await loginUser({
          email: formData.email,
          password: formData.password,
        });
        localStorage.setItem("token", response.data.token);
        setMessage("Inicio de sesión exitoso");
      } else {
        await registerUser(formData);
        setMessage("Registro exitoso, ahora puedes iniciar sesión");
        setIsLogin(true);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Error en la operación");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          {isLogin ? "Iniciar Sesión" : "Crear Cuenta"}
        </h1>
        {message && <p className="text-center text-red-500 mb-4">{message}</p>}
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Nombre</label>
              <input
                type="text"
                placeholder="Tu Nombre"
                value={formData.nombre}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
                className="w-full border border-gray-300 p-2 rounded-lg"
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              placeholder="tu@correo.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full border border-gray-300 p-2 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Contraseña</label>
            <input
              type="password"
              placeholder="********"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full border border-gray-300 p-2 rounded-lg"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            {isLogin ? "Iniciar Sesión" : "Registrarse"}
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          {isLogin ? "¿No tienes una cuenta?" : "¿Ya tienes una cuenta?"}{" "}
          <button
            className="text-blue-500 hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Regístrate aquí" : "Inicia sesión"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;

