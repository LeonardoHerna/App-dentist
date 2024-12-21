const express = require('express');
const { crearCita, obtenerCitas } = require('../Controllers/CitaControllers');

const router = express.Router();

// Ruta para crear una cita
router.post('/citas', crearCita);

// Ruta para obtener todas las citas
router.get('/citas', obtenerCitas);

module.exports = router;
