const express = require("express");
const router = express.Router();
const Email = require("../Models/Email"); // Ajusta la ruta según dónde tengas el modelo

// POST /api/email/register-email
router.post("/register-email", async (req, res) => {
  const { email } = req.body;

  // Validación simple
  if (!email || !email.includes("@")) {
    return res.status(400).json({ message: "Email inválido" });
  }

  try {
    // Verificamos si el email ya está registrado
    const existingEmail = await Email.findOne({ email });
    if (existingEmail) {
      return res.status(409).json({ message: "Email ya registrado" });
    }

    // Creamos y guardamos el nuevo email
    const newEmail = new Email({ email });
    await newEmail.save();

    res.status(201).json({ message: "Email registrado exitosamente" });
  } catch (error) {
    console.error("Error al registrar email:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

module.exports = router;
