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
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        ➕ Registrar Paciente
      </button>
      <button
        onClick={handleAgregarCita}
        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
      >
        📅 Agregar Cita
      </button>
      <button
        onClick={handleVerListaCitas}
        className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
      >
        📜 Ver Lista de Citas
      </button>
    </div>
  );
};

export default AccesosRapidos;


