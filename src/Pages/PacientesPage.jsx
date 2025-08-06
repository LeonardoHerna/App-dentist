import React, { useState, useEffect } from "react";
import SearchAndFilter from "./SearchAndFilter";

const PacientesPage = () => {
  const [pacientes, setPacientes] = useState([]);
  const [search, setSearch] = useState("");
  const [nuevoPaciente, setNuevoPaciente] = useState({
    nombre: "",
    telefono: "",
    proximaCita: "",
  });

  // Cargar pacientes al montar el componente
  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const response = await fetch("https://app-dentist.onrender.com/api/pacientes");
        const data = await response.json();
        setPacientes(data);
      } catch (error) {
        console.error("Error al cargar pacientes:", error);
      }
    };
    fetchPacientes();
  }, []);

  // Función para agregar un paciente
  const agregarPaciente = async () => {
    if (nuevoPaciente.nombre && nuevoPaciente.telefono && nuevoPaciente.proximaCita) {
      try {
        const response = await fetch("http://localhost:5000/api/pacientes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(nuevoPaciente),
        });
        const data = await response.json();
        setPacientes((prev) => [...prev, data]);
        setNuevoPaciente({ nombre: "", telefono: "", proximaCita: "" }); // Limpiar formulario
      } catch (error) {
        console.error("Error al agregar paciente:", error);
      }
    } else {
      alert("Todos los campos son obligatorios");
    }
  };

  // Función para eliminar un paciente
  const eliminarPaciente = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/pacientes/${id}`, { method: "DELETE" });
      setPacientes((prev) => prev.filter((paciente) => paciente._id !== id));
    } catch (error) {
      console.error("Error al eliminar paciente:", error);
    }
  };

  // Filtrar pacientes por nombre
  const filteredPacientes = pacientes.filter((paciente) =>
    paciente.nombre.toLowerCase().includes(search.toLowerCase())
  );

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
            <tr key={paciente._id} className="border-b">
              <td className="px-4 py-2">{paciente._id}</td>
              <td className="px-4 py-2">{paciente.nombre}</td>
              <td className="px-4 py-2">{paciente.telefono}</td>
              <td className="px-4 py-2">{paciente.proximaCita}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => eliminarPaciente(paciente._id)}
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


