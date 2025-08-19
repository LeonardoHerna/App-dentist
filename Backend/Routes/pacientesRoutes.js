const express = require("express");
const router = express.Router();
const User = require("../models/user"); 
const Paciente = require("../models/pacientesModels");
const authMiddleware = require("../Controllers/authMiddleware"); 

// =========================
// Obtener todos los pacientes (solo admin)
// =========================
router.get("/", authMiddleware, async (req, res) => {
  try {
    if (req.user.rol !== "admin") {
      return res.status(403).json({ error: "Acceso denegado" });
    }
    const pacientes = await Paciente.find();
    res.json(pacientes);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener pacientes" });
  }
});

// =========================
// Obtener perfil del paciente autenticado
// =========================
router.get("/miperfil", authMiddleware, async (req, res) => {
  try {
    const paciente = await Paciente.findOne({ usuarioId: req.user.id });
    const user = await User.findById(req.user.id); // obtenemos info de usuario

    if (!paciente) {
      return res.json({
        nombre: "",
        email: user?.email || "",
        telefono: "",
        foto: user?.profileImage || paciente?.foto || "",
        proximaCita: null,
        tratamiento: "",
        historial: [],
        usuarioId: req.user.id,
      });
    }

    // Si existe paciente, usamos su foto, sino la del user
    paciente.foto = paciente.foto || user?.profileImage || "";

    res.json(paciente);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el perfil del paciente" });
  }
});

// =========================
// Agregar un nuevo paciente
// =========================
router.post("/", authMiddleware, async (req, res) => {
  const { nombre, email, telefono, foto, proximaCita, tratamiento, historial } = req.body;

  try {
    // Evitar duplicados por usuario
    const existe = await Paciente.findOne({ usuarioId: req.user.id });
    if (existe) {
      return res.status(400).json({ error: "El perfil ya existe" });
    }

    const nuevoPaciente = new Paciente({
      nombre,
      email,
      telefono,
      foto,
      proximaCita,
      tratamiento,
      historial,
      usuarioId: req.user.id,
    });

    await nuevoPaciente.save();
    res.status(201).json(nuevoPaciente);
  } catch (error) {
    res.status(500).json({ error: "Error al agregar paciente" });
  }
});

// =========================
// Eliminar paciente (solo admin)
// =========================
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    if (req.user.rol !== "admin") {
      return res.status(403).json({ error: "Acceso denegado" });
    }
    await Paciente.findByIdAndDelete(req.params.id);
    res.json({ message: "Paciente eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar paciente" });
  }
});

module.exports = router;
