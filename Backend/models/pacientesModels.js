const mongoose = require("mongoose");

const HistorialSchema = new mongoose.Schema({
  fecha: { type: Date, required: true },
  descripcion: { type: String, required: true },
});

const PacienteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String }, // opcional, para contacto
  telefono: { type: String, required: true },
  foto: { type: String }, // URL de la foto de perfil

  proximaCita: { type: Date }, 
  tratamiento: { type: String }, 

  historial: [HistorialSchema], // lista de tratamientos anteriores

  usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // referencia al usuario en tu colección de usuarios
    required: true,
  },
});

module.exports = mongoose.model("Paciente", PacienteSchema);
