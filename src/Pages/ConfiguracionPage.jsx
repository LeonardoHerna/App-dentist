import React, { useState, useEffect } from "react";
import { Switch } from "@headlessui/react";

const ConfiguracionPage = () => {
  // Estados para roles, permisos y notificaciones
  const [rolUsuario, setRolUsuario] = useState("Administrador");
  const [rolesPersonalizados, setRolesPersonalizados] = useState([]);
  const [nuevoRol, setNuevoRol] = useState("");
  const [permisos, setPermisos] = useState({
    lectura: true,
    escritura: true,
    administracion: true,
  });
  const [notificaciones, setNotificaciones] = useState({
    correo: true,
    sms: false,
    push: true,
  });

  const rolesPredefinidos = ["Administrador", "Recepcionista", "Dentista"];

  // Cargar configuraciones desde localStorage
  useEffect(() => {
    const rolGuardado = localStorage.getItem("rolUsuario");
    const permisosGuardados = localStorage.getItem("permisos");
    const notificacionesGuardadas = localStorage.getItem("notificaciones");
    const rolesGuardados = localStorage.getItem("rolesPersonalizados");

    if (rolGuardado) setRolUsuario(rolGuardado);
    if (permisosGuardados) setPermisos(JSON.parse(permisosGuardados));
    if (notificacionesGuardadas)
      setNotificaciones(JSON.parse(notificacionesGuardadas));
    if (rolesGuardados) setRolesPersonalizados(JSON.parse(rolesGuardados));
  }, []);

  // Guardar configuraciones en localStorage
  useEffect(() => {
    localStorage.setItem("rolUsuario", rolUsuario);
    localStorage.setItem("permisos", JSON.stringify(permisos));
    localStorage.setItem("notificaciones", JSON.stringify(notificaciones));
    localStorage.setItem("rolesPersonalizados", JSON.stringify(rolesPersonalizados));
  }, [rolUsuario, permisos, notificaciones, rolesPersonalizados]);

  // Cambiar roles predefinidos
  const cambiarRolUsuario = (nuevoRol) => {
    setRolUsuario(nuevoRol);

    switch (nuevoRol) {
      case "Administrador":
        setPermisos({ lectura: true, escritura: true, administracion: true });
        break;
      case "Recepcionista":
        setPermisos({ lectura: true, escritura: true, administracion: false });
        break;
      case "Dentista":
        setPermisos({ lectura: true, escritura: false, administracion: false });
        break;
      default:
        setPermisos({ lectura: true, escritura: false, administracion: false });
    }
  };

  // Agregar un nuevo rol personalizado
  const agregarRolPersonalizado = () => {
    if (nuevoRol && !rolesPersonalizados.includes(nuevoRol)) {
      setRolesPersonalizados([...rolesPersonalizados, nuevoRol]);
      setNuevoRol("");
    }
  };

  const togglePermiso = (permiso) => {
    setPermisos((prev) => ({ ...prev, [permiso]: !prev[permiso] }));
  };

  const toggleNotificacion = (tipo) => {
    setNotificaciones((prev) => ({ ...prev, [tipo]: !prev[tipo] }));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800">Configuración</h1>
      <p className="text-gray-600 mt-2">Gestiona roles, permisos y notificaciones.</p>

      {/* Configuración de roles */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-800">Roles de Usuario</h2>
        <select
          className="mt-2 p-2 border rounded w-full"
          value={rolUsuario}
          onChange={(e) => cambiarRolUsuario(e.target.value)}
        >
          {rolesPredefinidos.concat(rolesPersonalizados).map((rol) => (
            <option key={rol} value={rol}>
              {rol}
            </option>
          ))}
        </select>

        <div className="mt-4">
          <h3 className="text-lg font-medium text-gray-800">Agregar Rol Personalizado</h3>
          <div className="flex items-center gap-2 mt-2">
            <input
              type="text"
              className="border p-2 rounded flex-1"
              placeholder="Nombre del rol"
              value={nuevoRol}
              onChange={(e) => setNuevoRol(e.target.value)}
            />
            <button
              onClick={agregarRolPersonalizado}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Agregar
            </button>
          </div>
        </div>
      </div>

      {/* Configuración de permisos */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-800">Permisos</h2>
        <div className="flex flex-col mt-2 gap-2">
          {Object.keys(permisos).map((permiso) => (
            <label key={permiso} className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={permisos[permiso]}
                onChange={() => togglePermiso(permiso)}
                disabled={rolUsuario !== "Administrador"}
              />
              <span className="capitalize">{permiso}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Configuración de notificaciones */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-800">Notificaciones</h2>
        <div className="flex flex-col mt-2 gap-2">
          {Object.keys(notificaciones).map((tipo) => (
            <div key={tipo} className="flex items-center justify-between">
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
        </div>
      </div>
    </div>
  );
};

export default ConfiguracionPage;

