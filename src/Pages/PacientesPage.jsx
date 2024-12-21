import React, { useState } from "react";
import SearchAndFilter from "./SearchAndFilter";

const PacientesPage = () => {
  // Estado para los pacientes
  const [pacientes, setPacientes] = useState([
    { id: 1, nombre: "Juan Pérez", telefono: "123456789", proximaCita: "2024-12-23" },
    { id: 2, nombre: "María López", telefono: "987654321", proximaCita: "2024-12-30" },
  ]);

  const [search, setSearch] = useState("");
  const [nuevoPaciente, setNuevoPaciente] = useState({
    nombre: "",
    telefono: "",
    proximaCita: "",
  });

  const filteredPacientes = pacientes.filter((paciente) =>
    paciente.nombre.toLowerCase().includes(search.toLowerCase())
  );

  // Función para agregar un paciente
  const agregarPaciente = () => {
    if (nuevoPaciente.nombre && nuevoPaciente.telefono && nuevoPaciente.proximaCita) {
      const nuevo = {
        id: Date.now(1), // Genera un ID único
        ...nuevoPaciente,
      };
      setPacientes((prev) => [...prev, nuevo]);
      setNuevoPaciente({ nombre: "", telefono: "", proximaCita: "" }); // Limpiar formulario
    } else {
      alert("Todos los campos son obligatorios");
    }
  };

  // Función para eliminar un paciente
  const eliminarPaciente = (id) => {
    setPacientes((prev) => prev.filter((paciente) => paciente.id !== id));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800">Pacientes</h1>
      <SearchAndFilter search={search} setSearch={setSearch} />
      
      {/* Formulario para agregar un nuevo paciente */}
      <div className="my-4 p-4 bg-gray-100 rounded-lg shadow">
        <h2 className="text-lg font-bold">Agregar Nuevo Paciente</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Nombre"
            value={nuevoPaciente.nombre}
            onChange={(e) => setNuevoPaciente({ ...nuevoPaciente, nombre: e.target.value })}
            className="border rounded p-2"
          />
          <input
            type="text"
            placeholder="Teléfono"
            value={nuevoPaciente.telefono}
            onChange={(e) => setNuevoPaciente({ ...nuevoPaciente, telefono: e.target.value })}
            className="border rounded p-2"
          />
          <input
            type="date"
            value={nuevoPaciente.proximaCita}
            onChange={(e) => setNuevoPaciente({ ...nuevoPaciente, proximaCita: e.target.value })}
            className="border rounded p-2"
          />
        </div>
        <button
          onClick={agregarPaciente}
          className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          ➕ Agregar Paciente
        </button>
      </div>
      
      {/* Tabla de pacientes */}
      <table className="table-auto w-full mt-4 bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Nombre</th>
            <th className="px-4 py-2">Teléfono</th>
            <th className="px-4 py-2">Próxima Cita</th>
            <th className="px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredPacientes.map((paciente) => (
            <tr key={paciente.id} className="border-b">
              <td className="px-4 py-2">{paciente.id}</td>
              <td className="px-4 py-2">{paciente.nombre}</td>
              <td className="px-4 py-2">{paciente.telefono}</td>
              <td className="px-4 py-2">{paciente.proximaCita}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => eliminarPaciente(paciente.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  🗑️ Eliminar
                </button>
              </td>
            </tr>
          ))}
          {filteredPacientes.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center text-gray-500 py-4">
                No se encontraron resultados.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PacientesPage;

