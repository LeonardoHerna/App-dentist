import React, { useState, useEffect } from "react";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import { HiMenu, HiX, HiOutlineCalendar, HiOutlineUser, HiOutlineCog, HiOutlineBell } from "react-icons/hi";
import PacientesPage from "./PacientesPage";
import CitasPage from "./CitasPage";
import ConfiguracionPage from "./ConfiguracionPage";
import Notificaciones from "./Notificaciones";
import logo from "../assets/Logo.png";
import API from "../Services/api";


const Dashboard = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  // Estado para info del usuario
  const [usuario, setUsuario] = useState(null);
  const [proximaCita, setProximaCita] = useState(null);
  const [historial, setHistorial] = useState([]);

  // 🔹 Cargar datos del backend
  useEffect(() => {


const fetchData = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/"); // si no hay token vuelve al login
    return;
  }

  try {
    // 1. Datos del usuario
    const { data: userData } = await API.get("/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUsuario(userData);

    // 2. Próxima cita
    const { data: citaData } = await API.get("/citas", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setProximaCita(citaData);

    // 3. Historial de citas
    const { data: historialData } = await API.get("/citas/historial", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setHistorial(historialData);

  } catch (error) {
    console.error("Error al cargar datos:", error);
  }
};


    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-gray-100 relative">
      {/* Botón hamburguesa (mobile y tablets) */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white shadow-md rounded-md"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
      </button>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/20 lg:hidden"
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
                  `flex items-center gap-2 px-4 py-2 rounded-md ${
                    isActive
                      ? "bg-gray-200 text-gray-900 font-semibold"
                      : "text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                  }`
                }
              >
                <HiOutlineCalendar /> Inicio
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/pacientes"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-md ${
                    isActive
                      ? "bg-gray-200 text-gray-900 font-semibold"
                      : "text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                  }`
                }
              >
                <HiOutlineUser /> Perfil
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/citas"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-md ${
                    isActive
                      ? "bg-gray-200 text-gray-900 font-semibold"
                      : "text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                  }`
                }
              >
                <HiOutlineCalendar /> Mis citas
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/notificaciones"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-md ${
                    isActive
                      ? "bg-gray-200 text-gray-900 font-semibold"
                      : "text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                  }`
                }
              >
                <HiOutlineBell /> Notificaciones
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/configuracion"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-md ${
                    isActive
                      ? "bg-gray-200 text-gray-900 font-semibold"
                      : "text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                  }`
                }
              >
                <HiOutlineCog /> Configuración
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

      {/* Contenido principal */}
      <main className="flex-1 p-6 lg:ml-64">
        <Routes>
          <Route
            path="/"
            element={
              <div className="space-y-6">
                {/* Bienvenida */}
                <div className="bg-white p-6 shadow-md rounded-xl">
                  <h2 className="text-2xl font-bold text-gray-800">
                    ¡Bienvenido, {usuario?.nombre || "Usuario"} 👋
                  </h2>
                  <p className="text-gray-600">Aquí encontrarás tu información y citas.</p>
                </div>

                {/* Próxima cita + Accesos rápidos */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Próxima cita */}
                  <div className="col-span-2 bg-white shadow-md rounded-xl p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Tu próxima cita</h3>
                    {proximaCita ? (
                      <>
                        <p>🗓️ <span className="font-semibold">{proximaCita.fecha}</span> - {proximaCita.hora}</p>
                        <p>👨‍⚕️ {proximaCita.doctor}</p>
                        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                          Ver detalles
                        </button>
                      </>
                    ) : (
                      <p className="text-gray-600">No tienes citas próximas.</p>
                    )}
                  </div>

                  {/* Accesos rápidos */}
                  <div className="bg-white shadow-md rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Accesos rápidos</h3>
                    <ul className="space-y-2">
                      <li><button className="w-full px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">Agendar cita</button></li>
                      <li><button className="w-full px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">Ver historial</button></li>
                      <li><button className="w-full px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">Actualizar datos</button></li>
                    </ul>
                  </div>
                </div>

                {/* Historial breve */}
                <div className="bg-white shadow-md rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Últimas citas</h3>
                  {historial.length > 0 ? (
                    <ul className="divide-y divide-gray-200">
                      {historial.slice(0, 3).map((cita, index) => (
                        <li key={index} className="py-2 flex justify-between">
                          <span>{cita.fecha} - {cita.tratamiento}</span>
                          <span
                            className={`font-semibold ${
                              cita.estado === "Completada"
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {cita.estado}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-600">No tienes historial de citas aún.</p>
                  )}
                </div>
              </div>
            }
          />
          <Route path="pacientes" element={<PacientesPage />} />
          <Route path="citas" element={<CitasPage />} />
          <Route path="configuracion" element={<ConfiguracionPage />} />
          <Route path="notificaciones" element={<Notificaciones />} />
        </Routes>
      </main>
    </div>
  );
};

export default Dashboard;
