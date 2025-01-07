const Cita = require("../models/modelsCita");

// Obtener todas las citas
exports.getCitas = async (req, res) => {
  try {
    const citas = await Cita.find();
    res.json(citas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las citas" });
  }
};

// Crear una nueva cita
exports.createCita = async (req, res) => {
  try {
    const { paciente, fecha, hora, estado } = req.body;
    const nuevaCita = new Cita({ paciente, fecha, hora, estado });
    const citaGuardada = await nuevaCita.save();
    res.status(201).json(citaGuardada);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la cita" });
  }
};

// Actualizar una cita existente
exports.updateCita = async (req, res) => {
  try {
    const { id } = req.params;
    const citaActualizada = await Cita.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(citaActualizada);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la cita" });
  }
};

// Eliminar una cita
exports.deleteCita = async (req, res) => {
  try {
    const { id } = req.params;
    await Cita.findByIdAndDelete(id);
    res.json({ message: "Cita eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la cita" });
  }
};
