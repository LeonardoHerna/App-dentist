import React, { useState, useEffect } from "react";
import axios from "axios";
import { Transition } from "@headlessui/react";
import SearchAndFilter from "./SearchAndFilter";

const CitasPage = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [citas, setCitas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newCita, setNewCita] = useState({ paciente: "", fecha: "", hora: "", estado: "Pendiente" });
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const citasEstados = [
    { value: "Confirmada", label: "Confirmadas" },
    { value: "Pendiente", label: "Pendientes" },
    { value: "Cancelada", label: "Canceladas" },
  ];

  useEffect(() => {
    const fetchCitas = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const response = await axios.get("https://app-dentist.onrender.com/api/citas", { headers: { Authorization: `Bearer ${token}` } });
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

  const totalPages = Math.ceil(filteredCitas.length / itemsPerPage);
  const paginatedCitas = filteredCitas.slice((currentPage-1)*itemsPerPage, currentPage*itemsPerPage);

  const handleAddCita = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const response = await axios.post(
        "https://app-dentist.onrender.com/api/citas",
        newCita,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCitas((prev) => [...prev, response.data]);
      setShowModal(false);
      setNewCita({ paciente: "", fecha: "", hora: "", estado: "Pendiente" });
      setCurrentPage(1);
    } catch (error) {
      console.error("Error al agregar cita:", error);
    }
  };

  const estadoColor = {
    Confirmada: "bg-green-100 text-green-800",
    Pendiente: "bg-yellow-100 text-yellow-800",
    Cancelada: "bg-red-100 text-red-800",
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800">Citas</h1>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-4">
        <SearchAndFilter search={search} setSearch={setSearch} filter={filter} setFilter={setFilter} filters={citasEstados} />
        <button onClick={() => setShowModal(true)} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-full sm:w-auto">
          ➕ Agregar Cita
        </button>
      </div>

      {/* Tabla Desktop */}
      <div className="hidden md:block mt-4">
        <table className="table-auto w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left">Paciente</th>
              <th className="px-4 py-2 text-left">Fecha</th>
              <th className="px-4 py-2 text-left">Hora</th>
              <th className="px-4 py-2 text-left">Estado</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCitas.map(cita => (
              <tr key={cita._id} className="border-b hover:bg-gray-50 transition">
                <td className="px-4 py-2">{cita.paciente}</td>
                <td className="px-4 py-2">{cita.fecha}</td>
                <td className="px-4 py-2">{cita.hora}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded ${estadoColor[cita.estado]}`}>{cita.estado}</span>
                </td>
              </tr>
            ))}
            {filteredCitas.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">No se encontraron citas.</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-4 gap-2">
            {Array.from({length: totalPages}, (_, i) => i + 1).map(page => (
              <button key={page} onClick={() => setCurrentPage(page)} className={`px-3 py-1 rounded ${page===currentPage ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}>
                {page}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Tarjetas móviles */}
      <div className="block md:hidden mt-4 space-y-4">
        {paginatedCitas.length === 0 && <p className="text-center text-gray-500">No se encontraron citas.</p>}
        {paginatedCitas.map(cita => (
          <div key={cita._id} className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition">
            <p className="text-sm"><strong>Paciente:</strong> {cita.paciente}</p>
            <p className="text-sm"><strong>Fecha:</strong> {cita.fecha}</p>
            <p className="text-sm"><strong>Hora:</strong> {cita.hora}</p>
            <p className="text-sm mt-1">
              <strong>Estado:</strong> <span className={`px-2 py-1 rounded ${estadoColor[cita.estado]}`}>{cita.estado}</span>
            </p>
          </div>
        ))}

        {/* Paginación móvil */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-4 gap-2">
            {Array.from({length: totalPages}, (_, i) => i + 1).map(page => (
              <button key={page} onClick={() => setCurrentPage(page)} className={`px-3 py-1 rounded ${page===currentPage ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}>
                {page}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      <Transition show={showModal} enter="transition duration-200" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="transition duration-150" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
        <div className="fixed inset-0 flex items-center justify-center  z-50 px-4">
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Agregar Nueva Cita</h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium">Paciente</label>
                <input type="text" value={newCita.paciente} onChange={(e)=>setNewCita({...newCita, paciente:e.target.value})} className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-400 focus:outline-none"/>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Fecha</label>
                <input type="date" value={newCita.fecha} onChange={(e)=>setNewCita({...newCita, fecha:e.target.value})} className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-400 focus:outline-none"/>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Hora</label>
                <input type="time" value={newCita.hora} onChange={(e)=>setNewCita({...newCita, hora:e.target.value})} className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-400 focus:outline-none"/>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Estado</label>
                <select value={newCita.estado} onChange={(e)=>setNewCita({...newCita, estado:e.target.value})} className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-400 focus:outline-none">
                  {citasEstados.map(estado=> <option key={estado.value} value={estado.value}>{estado.label}</option>)}
                </select>
              </div>
              <div className="flex flex-col sm:flex-row justify-end gap-2">
                <button type="button" onClick={()=>setShowModal(false)} className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 w-full sm:w-auto">Cancelar</button>
                <button type="button" onClick={handleAddCita} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-full sm:w-auto">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default CitasPage;
