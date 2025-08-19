const mongoose = require("mongoose");

const HistorialSchema = new mongoose.Schema({
  fecha: { type: String },
  motivo: { type: String },
  observaciones: { type: String },
});

const CitaSchema = new mongoose.Schema({
  paciente: { type: String, required: true },
  fecha: { type: String, required: true },
  hora: { type: String, required: true },
  estado: { type: String, required: true },
  tratamiento: { type: String },           // Tratamiento asignado
  historial: [HistorialSchema],            // Historial clínico relacionado
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: "User" } // Para filtrar citas por usuario
});

module.exports = mongoose.model("Cita", CitaSchema);
