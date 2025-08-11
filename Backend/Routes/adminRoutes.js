// routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const { verificarToken } = require("../Controllers/authMiddleware");

router.get("/dashboard", verificarToken, async (req, res) => {
  if (req.user.rol !== "admin") {
    return res.status(403).json({ message: "Acceso denegado. No eres administrador." });
  }

  // Simulación de datos reales desde la DB
  res.json({
    totalUsuarios: 28,
    totalCitas: 123,
    proximaCita: "2025-08-10 14:00hs",
  });
});

module.exports = router;
