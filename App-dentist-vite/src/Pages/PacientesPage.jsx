import React, { useState, useEffect } from "react";

const PacientesPage = () => {
  const [paciente, setPaciente] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaciente = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "https://app-dentist.onrender.com/api/pacientes/miperfil",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) {
          const text = await response.text();
          console.error("Error en fetch:", response.status, text);
          setPaciente(null);
          return;
        }

        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          setPaciente(data);
        } else {
          const text = await response.text();
          console.error("Respuesta inesperada (no JSON):", text);
          setPaciente(null);
        }
      } catch (error) {
        console.error("Error al cargar perfil:", error);
        setPaciente(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPaciente();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        Cargando perfil...
      </div>
    );
  }

  if (!paciente) {
    return (
      <div className="text-center p-6 text-gray-600">
        No se pudo cargar la información del paciente.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Mi Perfil</h1>

      {/* Foto y datos principales */}
      <div className="flex flex-col md:flex-row items-center bg-white p-6 rounded-lg shadow-md">
        {paciente.foto ? (
          <img
            src={paciente.foto}
            alt={paciente.nombre}
            className="w-32 h-32 rounded-full object-cover mb-4 md:mb-0 md:mr-6"
          />
        ) : (
          <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 mb-4 md:mb-0 md:mr-6">
            Sin Foto
          </div>
        )}

        <div>
          <p className="text-xl font-semibold">{paciente.nombre}</p>
          {paciente.email && <p className="text-gray-600">{paciente.email}</p>}
          <p className="text-gray-600">Teléfono: {paciente.telefono}</p>
          {paciente.proximaCita && (
            <p className="text-gray-600">
              Próxima cita: {new Date(paciente.proximaCita).toLocaleDateString()}
            </p>
          )}
          {paciente.tratamiento && (
            <p className="text-gray-600">Tratamiento: {paciente.tratamiento}</p>
          )}
        </div>
      </div>

      {/* Historial de tratamientos */}
      {paciente.historial && paciente.historial.length > 0 && (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Historial de Tratamientos</h2>
          <ul className="space-y-3">
            {paciente.historial.map((item, index) => (
              <li key={index} className="border-b pb-2">
                <p className="text-gray-700">
                  <span className="font-semibold">
                    {new Date(item.fecha).toLocaleDateString()}:
                  </span>{" "}
                  {item.descripcion}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {!paciente.historial || paciente.historial.length === 0 ? (
        <p className="mt-6 text-gray-600 text-center">No hay historial de tratamientos.</p>
      ) : null}
    </div>
  );
};

export default PacientesPage;
