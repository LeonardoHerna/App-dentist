// src/pages/ConfiguracionPage.jsx
import React, { useState } from "react";
import { Switch } from "@headlessui/react";
import API from "../Services/api"; // tu instancia de Axios

const ConfiguracionPage = () => {
  // --- Preferencias ---
  const [modoOscuro, setModoOscuro] = useState(false);
  const [lenguaje, setLenguaje] = useState("es");

  // --- Notificaciones ---
  const [notificaciones, setNotificaciones] = useState({
    correo: true,
    sms: false,
    push: true,
    recordatorios: true,
  });

  // --- Modal cambiar contraseña ---
  const [showModal, setShowModal] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // --- Imagen de perfil ---
  const [profileImage, setProfileImage] = useState(null); // URL actual o null
  const [previewImage, setPreviewImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Cambiar contraseña
  const guardarNuevaPassword = async () => {
    if (newPassword !== confirmPassword) {
      setErrorPassword("Las contraseñas no coinciden ❌");
      return;
    }
    if (newPassword.length < 6) {
      setErrorPassword("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    try {
      setLoading(true);
      setErrorPassword("");

      await API.post("/auth/change-password", { oldPassword, newPassword });

      setShowModal(false);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");

      alert("✅ Contraseña cambiada exitosamente");
    } catch (error) {
      console.error("Error al cambiar contraseña:", error);
      setErrorPassword(
        error.response?.data?.message || "Error al cambiar la contraseña"
      );
    } finally {
      setLoading(false);
    }
  };

  // Subir nueva imagen de perfil
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const guardarImagenPerfil = async () => {
    try {
      setUploading(true);
      const fileInput = document.getElementById("profileImageInput");
      const file = fileInput.files[0];

      if (!file) {
        alert("Selecciona una imagen primero");
        return;
      }

      const formData = new FormData();
      formData.append("image", file);

      const res = await API.post("/auth/change-profile-picture", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setProfileImage(res.data.imageUrl);
      setPreviewImage(null);

      alert("✅ Imagen de perfil actualizada");
    } catch (error) {
      console.error("Error al subir imagen:", error);
      alert("Error al subir la imagen");
    } finally {
      setUploading(false);
    }
  };

  const toggleNotificacion = (tipo) => {
    setNotificaciones((prev) => ({ ...prev, [tipo]: !prev[tipo] }));
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Configuración</h1>

      <div className="space-y-6">
        {/* Imagen de perfil */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Imagen de perfil</h2>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <img
              src={previewImage || profileImage || "/default-avatar.png"}
              alt="Perfil"
              className="w-24 h-24 rounded-full object-cover border shadow-sm"
            />
            <div className="flex flex-col gap-3 w-full sm:w-auto">
              <label
                htmlFor="profileImageInput"
                className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-center"
              >
                Seleccionar imagen
              </label>
              <input
                id="profileImageInput"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              {previewImage && (
                <button
                  onClick={guardarImagenPerfil}
                  disabled={uploading}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
                >
                  {uploading ? "Guardando..." : "Guardar imagen"}
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Notificaciones */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Notificaciones</h2>
          <div className="space-y-3">
            {Object.keys(notificaciones).map((tipo) => (
              <div key={tipo} className="flex items-center justify-between">
                <span className="capitalize">{tipo}</span>
                <Switch
                  checked={notificaciones[tipo]}
                  onChange={() => toggleNotificacion(tipo)}
                  className={`${
                    notificaciones[tipo] ? "bg-blue-600" : "bg-gray-300"
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
        </section>

        {/* Tema oscuro */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Apariencia</h2>
          <div className="flex items-center justify-between">
            <span className="text-lg">Modo oscuro</span>
            <Switch
              checked={modoOscuro}
              onChange={setModoOscuro}
              className={`${
                modoOscuro ? "bg-blue-600" : "bg-gray-300"
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span
                className={`${
                  modoOscuro ? "translate-x-6" : "translate-x-1"
                } inline-block h-4 w-4 transform rounded-full bg-white`}
              />
            </Switch>
          </div>
        </section>

        {/* Lenguaje */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Idioma</h2>
          <select
            value={lenguaje}
            onChange={(e) => setLenguaje(e.target.value)}
            className="w-full border rounded p-2"
          >
            <option value="es">Español</option>
            <option value="en">Inglés</option>
          </select>
        </section>

        {/* Cambiar contraseña */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Seguridad</h2>
          <button
            onClick={() => setShowModal(true)}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Cambiar contraseña
          </button>
        </section>
      </div>

      {/* Modal de cambiar contraseña */}
      {showModal && (
        <div className="fixed inset-0 bg-white bg-opacity-5 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Cambiar Contraseña</h2>
            <div className="flex flex-col gap-3">
              <input
                type="password"
                placeholder="Contraseña actual"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="border p-2 rounded w-full"
              />
              <input
                type="password"
                placeholder="Nueva contraseña"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="border p-2 rounded w-full"
              />
              <input
                type="password"
                placeholder="Confirmar nueva contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border p-2 rounded w-full"
              />
              {errorPassword && (
                <p className="text-red-500 text-sm">{errorPassword}</p>
              )}
            </div>
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={guardarNuevaPassword}
                disabled={loading}
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? "Guardando..." : "Guardar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfiguracionPage;
