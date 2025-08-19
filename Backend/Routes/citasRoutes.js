const express = require("express");
const router = express.Router();
const citasController = require("../Controllers/citasController");
const authMiddleware = require("../Controllers/authMiddleware"); 

// ✅ Todas las rutas requieren autenticación
router.use(authMiddleware);

// Obtener todas las citas + tratamientos + historial
router.get("/", citasController.getCitas);


// Obtener historial de citas
router.get("/historial", citasController.getHistorial);



// Crear nueva cita
router.post("/", citasController.createCita);

// Actualizar cita por ID
router.put("/:id", citasController.updateCita);

// Eliminar cita por ID
router.delete("/:id", citasController.deleteCita);

module.exports = router;
