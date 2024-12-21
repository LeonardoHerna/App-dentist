import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const dataIngresos = {
  labels: ["Completadas", "Canceladas", "Pendientes"],
  datasets: [
    {
      data: [65, 15, 20],
      backgroundColor: ["#4CAF50", "#F44336", "#FFC107"],
    },
  ],
};

const GraficaCitas = () => (
  <div className="bg-white shadow-md p-4 rounded-lg">
    <h3 className="text-xl font-semibold text-gray-800 mb-4">Estado de las Citas</h3>
    <Doughnut data={dataIngresos} />
  </div>
);

export default GraficaCitas;
