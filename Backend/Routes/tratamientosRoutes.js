const express = require("express");
const router = express.Router();
const tratamientosController = require("../Controllers/tratamientosController");
const authMiddleware = require("../Controllers/authMiddleware");

// Crear tratamiento
router.post("/", authMiddleware, tratamientosController.createTratamiento);

// Obtener todos los tratamientos de un usuario
router.get("/", authMiddleware, tratamientosController.getTratamientos);

// Obtener tratamiento por ID
router.get("/:id", authMiddleware, tratamientosController.getTratamientoById);

// Actualizar tratamiento
router.put("/:id", authMiddleware, tratamientosController.updateTratamiento);

// Eliminar tratamiento
router.delete("/:id", authMiddleware, tratamientosController.deleteTratamiento);

module.exports = router;
