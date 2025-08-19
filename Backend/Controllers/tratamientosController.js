const Tratamiento = require("../models/tratamientos");

// Crear tratamiento
exports.createTratamiento = async (req, res) => {
  try {
    const { nombre, descripcion, costo, paciente } = req.body;
    const nuevoTratamiento = new Tratamiento({
      nombre,
      descripcion,
      costo,
      paciente,
      usuarioId: req.user.id
    });
    await nuevoTratamiento.save();
    res.status(201).json(nuevoTratamiento);
  } catch (error) {
    res.status(500).json({ message: "Error al crear tratamiento", error });
  }
};

// Obtener todos los tratamientos
exports.getTratamientos = async (req, res) => {
  try {
    const tratamientos = await Tratamiento.find({ usuarioId: req.user.id }).populate("paciente");
    res.json(tratamientos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener tratamientos", error });
  }
};

// Obtener tratamiento por ID
exports.getTratamientoById = async (req, res) => {
  try {
    const tratamiento = await Tratamiento.findById(req.params.id).populate("paciente");
    res.json(tratamiento);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener tratamiento", error });
  }
};

// Actualizar tratamiento
exports.updateTratamiento = async (req, res) => {
  try {
    const updated = await Tratamiento.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar tratamiento", error });
  }
};

// Eliminar tratamiento
exports.deleteTratamiento = async (req, res) => {
  try {
    await Tratamiento.findByIdAndDelete(req.params.id);
    res.json({ message: "Tratamiento eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar tratamiento", error });
  }
};
