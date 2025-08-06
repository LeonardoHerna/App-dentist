import React from "react";
import CalendarioCitas from "./CalendarioCitas";

const UserDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
  <header className="bg-blue-500 text-white py-4 px-4 sm:px-6">
    <h1 className="text-xl sm:text-2xl font-bold">
      ¡Bienvenido, [Nombre del Usuario]!
    </h1>
  </header>

 <div className="min-h-screen bg-gray-100 flex flex-col">
  {/* Header */}
  <header className="bg-blue-600 text-white py-4 px-4 sm:px-6 shadow">
    <h1 className="text-lg sm:text-xl md:text-2xl font-semibold">
      ¡Bienvenido, [Nombre del Usuario]!
    </h1>
  </header>

  {/* Main */}
  <main className="flex-grow p-4 sm:p-6">
    {/* Calendario */}
    <section className="mb-8">
      <CalendarioCitas />
    </section>

    {/* Historial de citas */}
    <section>
      <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">
        Historial de Citas
      </h2>

      {/* Tabla responsiva */}
      <div className="w-full overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white text-sm sm:text-base">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="text-left px-4 py-2 whitespace-nowrap">Fecha</th>
              <th className="text-left px-4 py-2 whitespace-nowrap">Hora</th>
              <th className="text-left px-4 py-2 whitespace-nowrap">Descripción</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="px-4 py-2 whitespace-nowrap">2024-12-25</td>
              <td className="px-4 py-2 whitespace-nowrap">10:00 AM</td>
              <td className="px-4 py-2 whitespace-nowrap">Limpieza Dental</td>
            </tr>
            {/* Más citas... */}
          </tbody>
        </table>
      </div>
    </section>
  </main>

  {/* Footer opcional */}
  {/* <footer className="bg-gray-200 text-center text-sm p-4 text-gray-600">
    © 2025 Tu Clínica Dental
  </footer> */}
</div>

</div>

  )};

export default UserDashboard;
