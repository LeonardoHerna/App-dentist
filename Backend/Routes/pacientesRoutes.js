const express = require("express");
const router = express.Router();
const Paciente = require("../models/pacientesModels"); // Modelo de MongoDB

// Obtener todos los pacientes
router.get("/", async (req, res) => {
  try {
    const pacientes = await Paciente.find();
    res.json(pacientes);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener pacientes" });
  }
});

// Agregar un nuevo paciente
router.post("/", async (req, res) => {
  const { nombre, telefono, proximaCita } = req.body;
  try {
    const nuevoPaciente = new Paciente({ nombre, telefono, proximaCita });
    await nuevoPaciente.save();
    res.status(201).json(nuevoPaciente);
  } catch (error) {
    res.status(500).json({ error: "Error al agregar paciente" });
  }
});

// Eliminar un paciente
router.delete("/:id", async (req, res) => {
  try {
    await Paciente.findByIdAndDelete(req.params.id);
    res.json({ message: "Paciente eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar paciente" });
  }
});

module.exports = router;
