import React, { useState } from "react";
import { citas as initialCitas } from "../Data";
import SearchAndFilter from "./SearchAndFilter";

const CitasPage = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [citas, setCitas] = useState(initialCitas);
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

  const filteredCitas = citas.filter(
    (cita) =>
      cita.paciente.toLowerCase().includes(search.toLowerCase()) &&
      (!filter || cita.estado === filter)
  );

  const handleAddCita = () => {
    setCitas([...citas, { id: citas.length + 1, ...newCita }]);
    setShowModal(false);
    setNewCita({ paciente: "", fecha: "", hora: "", estado: "Pendiente" });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800">Citas</h1>
      <div className="flex justify-between items-center mt-4">
        <SearchAndFilter
          search={search}
          setSearch={setSearch}
          filter={filter}
          setFilter={setFilter}
          filters={citasEstados}
        />
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          ➕ Agregar Cita
        </button>
      </div>
      <table className="table-auto w-full mt-4 bg-white shadow-md rounded-lg overflow-hidden">
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
            <tr key={cita.id} className="border-b">
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

      {/* Modal para agregar cita */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Agregar Nueva Cita</h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium">Paciente</label>
                <input
                  type="text"
                  value={newCita.paciente}
                  onChange={(e) =>
                    setNewCita({ ...newCita, paciente: e.target.value })
                  }
                  className="border p-2 w-full rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Fecha</label>
                <input
                  type="date"
                  value={newCita.fecha}
                  onChange={(e) =>
                    setNewCita({ ...newCita, fecha: e.target.value })
                  }
                  className="border p-2 w-full rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Hora</label>
                <input
                  type="time"
                  value={newCita.hora}
                  onChange={(e) =>
                    setNewCita({ ...newCita, hora: e.target.value })
                  }
                  className="border p-2 w-full rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Estado</label>
                <select
                  value={newCita.estado}
                  onChange={(e) =>
                    setNewCita({ ...newCita, estado: e.target.value })
                  }
                  className="border p-2 w-full rounded"
                >
                  {citasEstados.map((estado) => (
                    <option key={estado.value} value={estado.value}>
                      {estado.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleAddCita}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
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


