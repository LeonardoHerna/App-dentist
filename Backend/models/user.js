const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rol: { type: String, enum: ["admin", "user"], default: "user" },
  
  // Campos agregados para funcionalides nuevas
  profileImage: { type: String, default: "" },
  preferences: {
    notificaciones: {
      correo: { type: Boolean, default: true },
      sms: { type: Boolean, default: false },
      push: { type: Boolean, default: true },
      recordatorios: { type: Boolean, default: true },
    },
    modoOscuro: { type: Boolean, default: false },
    idioma: { type: String, default: "es" },
  },
});

// Hash de contraseña antes de guardar
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);


