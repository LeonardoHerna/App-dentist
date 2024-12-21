import React from "react";

const Indicadores = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div className="bg-white shadow-md p-4 rounded-lg">
      <h3 className="text-xl font-semibold text-gray-800">Pacientes Activos</h3>
      <p className="text-3xl font-bold text-blue-600 mt-2">120</p>
    </div>
    <div className="bg-white shadow-md p-4 rounded-lg">
      <h3 className="text-xl font-semibold text-gray-800">Citas Hoy</h3>
      <p className="text-3xl font-bold text-green-600 mt-2">8</p>
    </div>
    <div className="bg-white shadow-md p-4 rounded-lg">
      <h3 className="text-xl font-semibold text-gray-800">Citas Canceladas</h3>
      <p className="text-3xl font-bold text-red-600 mt-2">2</p>
    </div>
  </div>
);

export default Indicadores;
