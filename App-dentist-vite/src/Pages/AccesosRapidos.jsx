import React from "react";
import { useNavigate } from "react-router-dom";

const AccesosRapidos = () => {
  const navigate = useNavigate();

  // Funciones para manejar los clics
  const handleRegistrarPaciente = () => {
    // Redirige a la página de registro de pacientes
    navigate("/pacientes");
  };

  const handleAgregarCita = () => {
    // Redirige a la página de agregar cita
    navigate("./citas");
  };

  const handleVerListaCitas = () => {
    // Redirige a la página de lista de citas
    navigate("./citas");
  };

  return (
  <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
  <button
    onClick={handleRegistrarPaciente}
    className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 transition duration-300"
  >
    <span className="text-xl">➕</span>
    <span>Registrar Paciente</span>
  </button>

  <button
    onClick={handleAgregarCita}
    className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-green-600 text-white font-semibold shadow-md hover:bg-green-700 transition duration-300"
  >
    <span className="text-xl">📅</span>
    <span>Agregar Cita</span>
  </button>

  <button
    onClick={handleVerListaCitas}
    className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-yellow-500 text-white font-semibold shadow-md hover:bg-yellow-600 transition duration-300"
  >
    <span className="text-xl">📜</span>
    <span>Ver Lista de Citas</span>
  </button>
</div>

  );
};

export default AccesosRapidos;


