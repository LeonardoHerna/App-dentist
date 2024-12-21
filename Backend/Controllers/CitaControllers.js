const Cita = require('../Models/Cita');

// Crear una nueva cita
const crearCita = async (req, res) => {
  try {
    const nuevaCita = new Cita(req.body);
    await nuevaCita.save();
    res.status(201).json(nuevaCita);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener todas las citas
const obtenerCitas = async (req, res) => {
  try {
    const citas = await Cita.find();
    res.status(200).json(citas);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { crearCita, obtenerCitas };
