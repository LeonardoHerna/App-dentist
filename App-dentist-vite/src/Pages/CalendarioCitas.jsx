import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import es from "date-fns/locale/es";

const locales = { es };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CalendarioCitas = () => {
  // Estado para almacenar las citas
  const [citas, setCitas] = useState([
    { title: "Cita con Juan Pérez", start: new Date(), end: new Date() },
    { title: "Cita con María López", start: new Date(), end: new Date() },
  ]);

  // Función para manejar el clic en un slot (fecha)
  const handleSelectSlot = ({ start, end }) => {
    const title = prompt("Ingrese el título de la cita:");
    if (title) {
      setCitas([
        ...citas,
        {
          title,
          start,
          end,
        },
      ]);
    }
  };

  // Función para manejar el clic en un evento (cita)
  const handleSelectEvent = (event) => {
    const confirmDelete = window.confirm(
      `¿Desea eliminar la cita: ${event.title}?`
    );
    if (confirmDelete) {
      setCitas(citas.filter((cita) => cita !== event));
    }
  };

  return (
    <div className="bg-white shadow-md p-4 rounded-lg mt-20 h-110">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Citas del Día</h3>

      {/* Calendario de citas */}
      <Calendar
        localizer={localizer}
        events={citas}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 300 }}
        selectable={true} // Habilita la selección de fechas
        onSelectSlot={handleSelectSlot} // Agregar cita al hacer clic en una fecha
        onSelectEvent={handleSelectEvent} // Eliminar cita al hacer clic en un evento
      />
    </div>
  );
};

export default CalendarioCitas;

