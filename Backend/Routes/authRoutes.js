const User = require("../models/user");
const bcrypt = require("bcrypt");

const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");


const { loginUser, registerUser, getUser } = require("../Controllers/authController");
const authMiddleware = require("../Controllers/authMiddleware");

// Login
router.post("/login", loginUser);

// Registro
router.post("/register", registerUser);

// Obtener perfil de usuario logueado
router.get("/me", authMiddleware, getUser);

// Configuración de multer para subir imágenes
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // carpeta donde se guardan las imágenes
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split(".").pop();
    cb(null, `${req.user.id}-${Date.now()}.${ext}`);
  },
});
const upload = multer({ storage });

// ------------------ CAMBIAR CONTRASEÑA ------------------
router.post("/change-password", authMiddleware, async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: "Contraseña actual incorrecta" });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.json({ message: "Contraseña actualizada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar la contraseña" });
  }
});

// ------------------ CAMBIAR IMAGEN DE PERFIL ------------------
router.post(
  "/change-profile-picture",
  authMiddleware,
  upload.single("image"),
  async (req, res) => {
    try {
      if (!req.file) return res.status(400).json({ message: "No se subió ninguna imagen" });

      const user = await User.findById(req.user.id);
      user.profileImage = `/uploads/${req.file.filename}`; // ruta accesible
      await user.save();

      res.json({ imageUrl: user.profileImage });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al subir imagen" });
    }
  }
);

// ------------------ GUARDAR PREFERENCIAS ------------------
router.post("/preferences", authMiddleware, async (req, res) => {
  const { notificaciones, modoOscuro, lenguaje } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    user.preferences = { notificaciones, modoOscuro, lenguaje };
    await user.save();

    res.json({ message: "Preferencias guardadas correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al guardar preferencias" });
  }
});



module.exports = router;

