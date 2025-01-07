const mongoose = require("mongoose");

const CitaSchema = new mongoose.Schema({
  paciente: { type: String, required: true },
  fecha: { type: String, required: true },
  hora: { type: String, required: true },
  estado: { type: String, required: true },
});

module.exports = mongoose.model("Cita", CitaSchema);
