const mongoose = require("mongoose");

const TratamientoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },   // Ej: "Limpieza", "Endodoncia"
  descripcion: { type: String },
  costo: { type: Number },
  paciente: { type: mongoose.Schema.Types.ObjectId, ref: "Paciente" }, 
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: "User" } // Para filtrar por doctor
}, { timestamps: true });

module.exports = mongoose.model("Tratamiento", TratamientoSchema);
