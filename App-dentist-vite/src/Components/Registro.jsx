import React , { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import API from "../Services/api";

const Registro = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    telefono: "",
    password: "",
    confirmarPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { name, email, telefono, password, confirmarPassword } = formData;

    if (!name || !email || !telefono || !password || !confirmarPassword) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    if (password !== confirmarPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Por favor, ingresa un correo válido.");
      return;
    }

    if (!/^\d{10}$/.test(telefono)) {
      setError("Por favor, ingresa un número de teléfono válido.");
      return;
    }
try {
  const { data } = await API.post("/auth/register", {
    name,
    email,
    telefono,
    password,
  });
  
  alert(data.message || "Registro exitoso");
  navigate("/login");
 
} catch (error) {
  console.error("Error:", error);

  if (error.response) {
    setError(error.response.data?.message || "Error en el registro.");
  } else {
    setError("Error al conectarse con el servidor.");
  }
}
   
  };

  return (
    <div className="min-h-[60vh] bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md mt-2 mb-5">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">AgenDent</h1>
        <p className="text-gray-600 text-center mb-6">
          Regístrate para comenzar a agendar tus citas.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">
              Teléfono
            </label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="confirmarPassword" className="block text-sm font-medium text-gray-700">
              Confirmar Contraseña
            </label>
            <input
              type="password"
              id="confirmarPassword"
              name="confirmarPassword"
              value={formData.confirmarPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Registrarse
          </button>
          {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
            
        </form>
      </div>
       <Link
        to="/"
        className="inline-flex items-center px-4 py-2  font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition mb-10"
      >
        ← Volver al inicio
      </Link>
    </div>
  );
};

export default Registro;

