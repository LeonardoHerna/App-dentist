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
        const response = await fetch("https://app-dentist.onrender.com/api/pacientes", {
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
      await fetch(`https://app-dentist.onrender.com/api/pacientes/${id}`, { method: "DELETE" });
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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <input
        type="text"
        placeholder="Nombre"
        value={nuevoPaciente.nombre}
        onChange={(e) => setNuevoPaciente({ ...nuevoPaciente, nombre: e.target.value })}
        className="border rounded p-2 w-full"
      />
      <input
        type="text"
        placeholder="Teléfono"
        value={nuevoPaciente.telefono}
        onChange={(e) => setNuevoPaciente({ ...nuevoPaciente, telefono: e.target.value })}
        className="border rounded p-2 w-full"
      />
      <input
        type="date"
        value={nuevoPaciente.proximaCita}
        onChange={(e) => setNuevoPaciente({ ...nuevoPaciente, proximaCita: e.target.value })}
        className="border rounded p-2 w-full"
      />
    </div>
    <button
      onClick={agregarPaciente}
      className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full sm:w-auto"
    >
      ➕ Agregar Paciente
    </button>
  </div>

  {/* Tabla para pantallas medianas en adelante */}
  <div className="hidden md:block overflow-x-auto">
    <table className="table-auto w-full mt-4 bg-white shadow-md rounded-lg">
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
            <td className="px-4 py-2 break-all">{paciente._id}</td>
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

  {/* Tarjetas para móviles */}
  <div className="block md:hidden space-y-4 mt-4">
    {filteredPacientes.map((paciente) => (
      <div key={paciente._id} className="bg-white shadow-md rounded-lg p-4">
        <p className="text-sm text-gray-600"><strong>ID:</strong> {paciente._id}</p>
        <p className="text-base"><strong>Nombre:</strong> {paciente.nombre}</p>
        <p className="text-base"><strong>Teléfono:</strong> {paciente.telefono}</p>
        <p className="text-base"><strong>Próxima Cita:</strong> {paciente.proximaCita}</p>
        <button
          onClick={() => eliminarPaciente(paciente._id)}
          className="mt-2 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 w-full"
        >
          🗑️ Eliminar
        </button>
      </div>
    ))}
    {filteredPacientes.length === 0 && (
      <p className="text-center text-gray-500">No se encontraron resultados.</p>
    )}
  </div>
</div>

  );
};

export default PacientesPage;


