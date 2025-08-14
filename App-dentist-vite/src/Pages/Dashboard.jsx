import React, { useState } from "react";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import Indicadores from "./Indicadores";
import GraficaCitas from "./GraficaCitas";
import CalendarioCitas from "./CalendarioCitas";
import Notificaciones from "./Notificaciones";
import AccesosRapidos from "./AccesosRapidos";
import PacientesPage from "./PacientesPage";
import CitasPage from "./CitasPage";
import ConfiguracionPage from "./ConfiguracionPage";
import logo from "../assets/Logo.png";

const Dashboard = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-gray-100 relative">
      {/* Botón hamburguesa (hasta lg inclusive) */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white shadow-md rounded-md"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
      </button>

      {/* Overlay claro */}
      {menuOpen && (
        <div
          className="fixed inset-0 shadow-lg bg-transparent lg:hidden"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out w-64 bg-white shadow-md flex flex-col z-40`}
      >
        <div className="p-4 border-b flex flex-col justify-center items-center">
          <img
            src={logo}
            alt="Logo"
            className="h-12 w-auto object-contain rounded-lg"
          />
          <h2 className="text-2xl font-bold text-gray-800">AgenDent</h2>
        </div>

        <nav className="mt-4 flex-1">
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/dashboard"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-md ${
                    isActive
                      ? "bg-gray-200 text-gray-900 font-semibold"
                      : "text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                  }`
                }
              >
                Panel principal
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/pacientes"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-md ${
                    isActive
                      ? "bg-gray-200 text-gray-900 font-semibold"
                      : "text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                  }`
                }
              >
                Pacientes
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/citas"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-md ${
                    isActive
                      ? "bg-gray-200 text-gray-900 font-semibold"
                      : "text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                  }`
                }
              >
                Citas
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/configuracion"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-md ${
                    isActive
                      ? "bg-gray-200 text-gray-900 font-semibold"
                      : "text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                  }`
                }
              >
                Configuración
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="p-4 border-t">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition cursor-pointer"
          >
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:ml-64">
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <Indicadores />
                <AccesosRapidos />
                <CalendarioCitas />
                <GraficaCitas />
              </div>
            }
          />
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
