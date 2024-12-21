import React from "react";

const Notificaciones = () => (
  <div className="bg-white shadow-md p-4 rounded-lg">
    <h3 className="text-xl font-semibold text-gray-800">Notificaciones Recientes</h3>
    <ul className="mt-2 space-y-2">
      <li className="bg-gray-100 p-2 rounded">📅 Recordatorio: Cita con Juan Pérez hoy a las 10:00 AM.</li>
      <li className="bg-gray-100 p-2 rounded">⚠️ Alerta: María López no asistió a su cita programada.</li>
      <li className="bg-gray-100 p-2 rounded">✅ Confirmación: Cita de Ana Torres reprogramada.</li>
    </ul>
  </div>
);

export default Notificaciones;
