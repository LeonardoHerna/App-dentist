const express = require("express");
const router = express.Router();
const { loginUser, registerUser, getUser } = require("../Controllers/authController");
const authMiddleware = require("../Controllers/authMiddleware");

// Login
router.post("/login", loginUser);

// Registro
router.post("/register", registerUser);

// Obtener perfil de usuario logueado
router.get("/me", authMiddleware, getUser);

module.exports = router;

