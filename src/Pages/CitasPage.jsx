import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchAndFilter from "./SearchAndFilter";

const CitasPage = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [citas, setCitas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newCita, setNewCita] = useState({
    paciente: "",
    fecha: "",
    hora: "",
    estado: "Pendiente",
  });

  const citasEstados = [
    { value: "Confirmada", label: "Confirmadas" },
    { value: "Pendiente", label: "Pendientes" },
    { value: "Cancelada", label: "Canceladas" },
  ];

  // Cargar citas desde el backend
useEffect(() => {
  const fetchCitas = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.warn("No se encontró un token. El usuario no está autenticado.");
        return;
      }

      const response = await axios.get("https://app-dentist.onrender.com/api/citas", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setCitas(response.data);
    } catch (error) {
      console.error("Error al cargar citas:", error);
    }
  };

  fetchCitas();
}, []);


  const filteredCitas = citas.filter(
    (cita) =>
      cita.paciente.toLowerCase().includes(search.toLowerCase()) &&
      (!filter || cita.estado === filter)
  );

  
const handleAddCita = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.warn("No hay token. El usuario no está autenticado.");
      return;
    }

    const response = await axios.post(
      "https://app-dentist.onrender.com/api/citas",
      newCita,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setCitas((prev) => [...prev, response.data]);
    setShowModal(false);
    setNewCita({ paciente: "", fecha: "", hora: "", estado: "Pendiente" });

  } catch (error) {
    console.error("Error al agregar cita:", error);
  }
};


  return (
  <div>
  <h1 className="text-2xl font-bold text-gray-800">Citas</h1>
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-4">
    <SearchAndFilter
      search={search}
      setSearch={setSearch}
      filter={filter}
      setFilter={setFilter}
      filters={citasEstados}
    />
    <button
      onClick={() => setShowModal(true)}
      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-full sm:w-auto"
    >
      ➕ Agregar Cita
    </button>
  </div>

  {/* Tabla solo visible en pantallas md o más grandes */}
  <div className="hidden md:block overflow-x-auto">
    <table className="table-auto w-full mt-4 bg-white shadow-md rounded-lg">
      <thead className="bg-gray-200">
        <tr>
          <th className="px-4 py-2">Paciente</th>
          <th className="px-4 py-2">Fecha</th>
          <th className="px-4 py-2">Hora</th>
          <th className="px-4 py-2">Estado</th>
        </tr>
      </thead>
      <tbody>
        {filteredCitas.map((cita) => (
          <tr key={cita._id} className="border-b">
            <td className="px-4 py-2">{cita.paciente}</td>
            <td className="px-4 py-2">{cita.fecha}</td>
            <td className="px-4 py-2">{cita.hora}</td>
            <td className="px-4 py-2">
              <span
                className={`px-2 py-1 rounded ${
                  cita.estado === "Confirmada"
                    ? "bg-green-200 text-green-800"
                    : cita.estado === "Pendiente"
                    ? "bg-yellow-200 text-yellow-800"
                    : "bg-red-200 text-red-800"
                }`}
              >
                {cita.estado}
              </span>
            </td>
          </tr>
        ))}
        {filteredCitas.length === 0 && (
          <tr>
            <td colSpan="4" className="text-center text-gray-500 py-4">
              No se encontraron citas.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>

  {/* Tarjetas para pantallas pequeñas */}
  <div className="block md:hidden space-y-4 mt-4">
    {filteredCitas.map((cita) => (
      <div key={cita._id} className="bg-white shadow-md rounded-lg p-4">
        <p className="text-sm"><strong>Paciente:</strong> {cita.paciente}</p>
        <p className="text-sm"><strong>Fecha:</strong> {cita.fecha}</p>
        <p className="text-sm"><strong>Hora:</strong> {cita.hora}</p>
        <p className="text-sm">
          <strong>Estado:</strong>{" "}
          <span
            className={`px-2 py-1 rounded inline-block mt-1 ${
              cita.estado === "Confirmada"
                ? "bg-green-200 text-green-800"
                : cita.estado === "Pendiente"
                ? "bg-yellow-200 text-yellow-800"
                : "bg-red-200 text-red-800"
            }`}
          >
            {cita.estado}
          </span>
        </p>
      </div>
    ))}
    {filteredCitas.length === 0 && (
      <p className="text-center text-gray-500">No se encontraron citas.</p>
    )}
  </div>

  {/* Modal para agregar cita */}
  {showModal && (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Agregar Nueva Cita</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium">Paciente</label>
            <input
              type="text"
              value={newCita.paciente}
              onChange={(e) => setNewCita({ ...newCita, paciente: e.target.value })}
              className="border p-2 w-full rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Fecha</label>
            <input
              type="date"
              value={newCita.fecha}
              onChange={(e) => setNewCita({ ...newCita, fecha: e.target.value })}
              className="border p-2 w-full rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Hora</label>
            <input
              type="time"
              value={newCita.hora}
              onChange={(e) => setNewCita({ ...newCita, hora: e.target.value })}
              className="border p-2 w-full rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Estado</label>
            <select
              value={newCita.estado}
              onChange={(e) => setNewCita({ ...newCita, estado: e.target.value })}
              className="border p-2 w-full rounded"
            >
              {citasEstados.map((estado) => (
                <option key={estado.value} value={estado.value}>
                  {estado.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col sm:flex-row justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 w-full sm:w-auto"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleAddCita}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-full sm:w-auto"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  )}
</div>

  );
};

export default CitasPage;



