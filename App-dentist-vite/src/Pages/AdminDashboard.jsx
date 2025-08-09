// src/pages/AdminDashboard.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAdminData = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch("http://localhost:5000/api/admin/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setAdminData(data);
        } else {
          setError(data.message);
          navigate("/login");
        }
      } catch {
        setError("Error de conexión con el servidor.");
      }
    };

    fetchAdminData();
  }, [navigate]);

  if (error) {
    return <p className="text-red-500 text-center mt-10">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Panel de Administración</h1>
      {adminData ? (
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Resumen</h2>
          <p>👤 Cantidad de usuarios registrados: {adminData.totalUsuarios}</p>
          <p>🗓️ Total de citas agendadas: {adminData.totalCitas}</p>
          <p>📅 Próxima cita: {adminData.proximaCita || "No hay citas futuras"}</p>
        </div>
      ) : (
        <p>Cargando datos de administrador...</p>
      )}
    </div>
  );
};

export default AdminDashboard;
