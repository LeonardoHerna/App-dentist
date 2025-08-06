import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import Indicadores from "./Indicadores";
import GraficaCitas from "./GraficaCitas";
import CalendarioCitas from "./CalendarioCitas";
import Notificaciones from "./Notificaciones";
import AccesosRapidos from "./AccesosRapidos";
import PacientesPage from "./PacientesPage";
import CitasPage from "./CitasPage";
import ConfiguracionPage from "./ConfiguracionPage";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
    <aside className="w-64 md:w-56 sm:w-full bg-white shadow-md sm:fixed sm:top-0 sm:left-0 sm:h-screen sm:z-50 sm:overflow-y-auto">
  <div className="p-4 border-b sm:border-none sm:bg-blue-500 sm:text-white">
    <h2 className="text-2xl font-bold text-gray-800 sm:text-white sm:text-xl">DentistApp</h2>
  </div>
  <nav className="mt-4 sm:mt-0">
    <ul className="space-y-2 sm:flex sm:flex-col sm:px-4 sm:py-2">
      <li>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `block px-4 py-2 rounded-md ${
              isActive
                ? "bg-gray-200 text-gray-900 font-semibold sm:bg-blue-100"
                : "text-gray-700 hover:bg-gray-200 hover:text-gray-900 sm:text-white sm:hover:bg-blue-600"
            }`
          }
        >
          Panel principal
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/pacientes"
          className={({ isActive }) =>
            `block px-4 py-2 rounded-md ${
              isActive
                ? "bg-gray-200 text-gray-900 font-semibold sm:bg-blue-100"
                : "text-gray-700 hover:bg-gray-200 hover:text-gray-900 sm:text-white sm:hover:bg-blue-600"
            }`
          }
        >
          Pacientes
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/citas"
          className={({ isActive }) =>
            `block px-4 py-2 rounded-md ${
              isActive
                ? "bg-gray-200 text-gray-900 font-semibold sm:bg-blue-100"
                : "text-gray-700 hover:bg-gray-200 hover:text-gray-900 sm:text-white sm:hover:bg-blue-600"
            }`
          }
        >
          Citas
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/configuracion"
          className={({ isActive }) =>
            `block px-4 py-2 rounded-md ${
              isActive
                ? "bg-gray-200 text-gray-900 font-semibold sm:bg-blue-100"
                : "text-gray-700 hover:bg-gray-200 hover:text-gray-900 sm:text-white sm:hover:bg-blue-600"
            }`
          }
        >
          Configuración
        </NavLink>
      </li>
    </ul>
  </nav>
</aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Routes>
          <Route path="/" element={
            <div>
              <Indicadores />
              <AccesosRapidos />
              <CalendarioCitas />
              <GraficaCitas />
            </div>
          } />
          <Route path="pacientes" element={<PacientesPage />} />
          <Route path="citas" element={<CitasPage />} />
          <Route path="configuracion" element={<ConfiguracionPage />} />
          <Route path="AccesosRapidos" element={<AccesosRapidos />} />
          <Route path="notificaciones" element={<Notificaciones />} />
          <Route path="CalendarioCitas" element={<CalendarioCitas />} />
          <Route path="grafica-citas" element={<GraficaCitas />} />
        </Routes>
      </main>
    </div>
  );
};

export default Dashboard;
