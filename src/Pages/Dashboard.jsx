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
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <h2 className="text-2xl font-bold text-gray-800">DentistApp</h2>
        </div>
        <nav className="mt-4">
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-md ${
                    isActive ? "bg-gray-200 text-gray-900 font-semibold" : "text-gray-700 hover:bg-gray-200 hover:text-gray-900"
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
                    isActive ? "bg-gray-200 text-gray-900 font-semibold" : "text-gray-700 hover:bg-gray-200 hover:text-gray-900"
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
                    isActive ? "bg-gray-200 text-gray-900 font-semibold" : "text-gray-700 hover:bg-gray-200 hover:text-gray-900"
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
                    isActive ? "bg-gray-200 text-gray-900 font-semibold" : "text-gray-700 hover:bg-gray-200 hover:text-gray-900"
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
