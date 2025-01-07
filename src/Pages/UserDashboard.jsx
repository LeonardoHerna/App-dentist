import React from "react";
import CalendarioCitas from "./CalendarioCitas";

const UserDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-500 text-white py-4 px-6">
        <h1 className="text-2xl font-bold">¡Bienvenido, [Nombre del Usuario]!</h1>
      </header>
      <main className="p-6">
        <section className="mb-6">
          <CalendarioCitas />
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Historial de Citas</h2>
          <table className="w-full bg-white shadow-md rounded-lg">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2">Fecha</th>
                <th className="px-4 py-2">Hora</th>
                <th className="px-4 py-2">Descripción</th>
              </tr>
            </thead>
            <tbody>
              {/* Aquí se mapearán las citas del historial */}
              <tr>
                <td className="px-4 py-2">2024-12-25</td>
                <td className="px-4 py-2">10:00 AM</td>
                <td className="px-4 py-2">Limpieza Dental</td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default UserDashboard;
