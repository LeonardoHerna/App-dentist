const Cita = require("../models/modelsCita");
const Paciente = require("../models/pacientesModels");

// =========================
// Obtener todas las citas del usuario autenticado + tratamientos + historial
// =========================
const getCitas = async (req, res) => {
  try {
    const userId = req.user.id;

    // Traer solo las citas del usuario
    const citas = await Cita.find({ usuarioId: userId }).sort({ fecha: 1 });

    // Traer historial y tratamientos desde el modelo Paciente
    const paciente = await Paciente.findOne({ usuarioId: userId });

    const tratamientos = paciente?.tratamiento ? [paciente.tratamiento] : [];
    const historial = paciente?.historial || [];

    res.json({ citas, tratamientos, historial });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las citas" });
  }
};

// =========================
// Crear nueva cita
// =========================
const createCita = async (req, res) => {
  try {
    const { paciente, fecha, hora, estado, tratamiento, historial } = req.body;
    const usuarioId = req.user.id;

    const nuevaCita = new Cita({
      paciente,
      fecha,
      hora,
      estado,
      tratamiento: tratamiento || "",
      historial: historial || [],
      usuarioId,
    });

    await nuevaCita.save();
    res.status(201).json(nuevaCita);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear la cita" });
  }
};

// =========================
// Actualizar cita
// =========================
const updateCita = async (req, res) => {
  try {
    const citaId = req.params.id;
    const updates = req.body;

    const cita = await Cita.findById(citaId);
    if (!cita) return res.status(404).json({ error: "Cita no encontrada" });

    // Solo propietario o admin puede actualizar
    if (cita.usuarioId.toString() !== req.user.id && req.user.rol !== "admin") {
      return res.status(403).json({ error: "No autorizado" });
    }

    Object.assign(cita, updates);
    await cita.save();
    res.json(cita);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar la cita" });
  }
};

// =========================
// Eliminar cita
// =========================
const deleteCita = async (req, res) => {
  try {
    const citaId = req.params.id;

    const cita = await Cita.findById(citaId);
    if (!cita) return res.status(404).json({ error: "Cita no encontrada" });

    // Solo propietario o admin puede eliminar
    if (cita.usuarioId.toString() !== req.user.id && req.user.rol !== "admin") {
      return res.status(403).json({ error: "No autorizado" });
    }

    await Cita.findByIdAndDelete(citaId);
    res.json({ message: "Cita eliminada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar la cita" });
  }
};

// =========================
// Obtener solo el historial de citas (por usuario)
// =========================
const getHistorial = async (req, res) => {
  try {
    const userId = req.user.id;

    // Buscar paciente del usuario
    const paciente = await Paciente.findOne({ usuarioId: userId });

    if (!paciente) {
      return res.json([]); // si no hay paciente, historial vacío
    }

    res.json(paciente.historial || []);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener historial de citas" });
  }
};






module.exports = { getCitas, createCita, updateCita, deleteCita, getHistorial };
