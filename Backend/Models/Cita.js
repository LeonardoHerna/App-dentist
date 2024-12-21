const mongoose = require('mongoose');

const citaSchema = new mongoose.Schema({
  paciente: { type: String, required: true },
  fecha: { type: Date, required: true },
  hora: { type: String, required: true },
  estado: { type: String, required: true },
});

const Cita = mongoose.model('Cita', citaSchema);

module.exports = Cita;
