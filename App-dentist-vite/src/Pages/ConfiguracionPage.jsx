import React, { useState, useEffect } from "react";
import { Switch } from "@headlessui/react";

const ConfiguracionPage = () => {
  // Datos del perfil
  const [nombre, setNombre] = useState("Juan Pérez");
  const [email, setEmail] = useState("juan@example.com");
  const [telefono, setTelefono] = useState("123456789");
  const [direccion, setDireccion] = useState("Calle Falsa 123");
  const [temaOscuro, setTemaOscuro] = useState(false);
  const [idioma, setIdioma] = useState("Español");

  // Notificaciones
  const [notificaciones, setNotificaciones] = useState({
    correo: true,
    sms: false,
    push: true,
    recordatorios: true,
  });

  // Cargar datos desde localStorage
  useEffect(() => {
    const perfilGuardado = JSON.parse(localStorage.getItem("perfil"));
    const notificacionesGuardadas = JSON.parse(localStorage.getItem("notificaciones"));
    const preferenciasGuardadas = JSON.parse(localStorage.getItem("preferenciasApp"));

    if (perfilGuardado) {
      setNombre(perfilGuardado.nombre);
      setEmail(perfilGuardado.email);
      setTelefono(perfilGuardado.telefono);
      setDireccion(perfilGuardado.direccion);
    }
    if (notificacionesGuardadas) setNotificaciones(notificacionesGuardadas);
    if (preferenciasGuardadas) {
      setTemaOscuro(preferenciasGuardadas.temaOscuro);
      setIdioma(preferenciasGuardadas.idioma);
    }
  }, []);

  // Guardar cambios en localStorage
  useEffect(() => {
    localStorage.setItem(
      "perfil",
      JSON.stringify({ nombre, email, telefono, direccion })
    );
    localStorage.setItem("notificaciones", JSON.stringify(notificaciones));
    localStorage.setItem(
      "preferenciasApp",
      JSON.stringify({ temaOscuro, idioma })
    );
  }, [nombre, email, telefono, direccion, notificaciones, temaOscuro, idioma]);

  const toggleNotificacion = (tipo) => {
    setNotificaciones((prev) => ({ ...prev, [tipo]: !prev[tipo] }));
  };

  const cambiarContraseña = () => {
    alert("Función para cambiar contraseña (implementación futura)");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Configuración</h1>

      {/* Perfil del usuario */}
      <section className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Perfil del Usuario</h2>
        <div className="flex items-center gap-4 mb-4">
          <img
            src={`https://ui-avatars.com/api/?name=${nombre}`}
            alt="Foto de usuario"
            className="w-20 h-20 rounded-full object-cover"
          />
          <div className="flex flex-col gap-2 flex-1">
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="border p-2 rounded w-full"
              placeholder="Nombre completo"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 rounded w-full"
              placeholder="Correo electrónico"
            />
            <input
              type="text"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              className="border p-2 rounded w-full"
              placeholder="Teléfono"
            />
            <input
              type="text"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              className="border p-2 rounded w-full"
              placeholder="Dirección"
            />
          </div>
        </div>
        <button
          onClick={cambiarContraseña}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Cambiar Contraseña
        </button>
      </section>

      {/* Notificaciones y preferencias */}
      <section className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Notificaciones y Preferencias</h2>
        {Object.keys(notificaciones).map((tipo) => (
          <div key={tipo} className="flex items-center justify-between mb-2">
            <span className="capitalize">{tipo}</span>
            <Switch
              checked={notificaciones[tipo]}
              onChange={() => toggleNotificacion(tipo)}
              className={`${
                notificaciones[tipo] ? "bg-green-500" : "bg-gray-300"
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span
                className={`${
                  notificaciones[tipo] ? "translate-x-6" : "translate-x-1"
                } inline-block h-4 w-4 transform rounded-full bg-white`}
              />
            </Switch>
          </div>
        ))}
      </section>

      {/* Preferencias de la app */}
      <section className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Preferencias de la App</h2>
        <div className="flex items-center justify-between mb-4">
          <span>Tema Oscuro</span>
          <Switch
            checked={temaOscuro}
            onChange={() => setTemaOscuro(!temaOscuro)}
            className={`${
              temaOscuro ? "bg-green-500" : "bg-gray-300"
            } relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span
              className={`${
                temaOscuro ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform rounded-full bg-white`}
            />
          </Switch>
        </div>

        <div className="flex flex-col gap-2">
          <label>Idioma</label>
          <select
            className="border p-2 rounded w-full"
            value={idioma}
            onChange={(e) => setIdioma(e.target.value)}
          >
            <option value="Español">Español</option>
            <option value="Inglés">Inglés</option>
          </select>
        </div>
      </section>

      {/* Sección de ayuda y soporte */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Ayuda y Soporte</h2>
        <div className="flex flex-col gap-2">
          <button className="text-blue-500 hover:underline text-left">
            Preguntas frecuentes (FAQ)
          </button>
          <button className="text-blue-500 hover:underline text-left">
            Contacto con soporte
          </button>
        </div>
      </section>
    </div>
  );
};

export default ConfiguracionPage;


