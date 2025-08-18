const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Función que genera el token con ID y rol
const generateToken = (id, rol) => {
  return jwt.sign({ id, rol }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// Registro de usuario
exports.registerUser = async (req, res) => {
  const { name, email, password, rol } = req.body;

  try {
    console.log("Datos recibidos en /register:", req.body);

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    const user = await User.create({ name, email, password, rol: "user" });

    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      rol: user.rol,
      token: generateToken(user.id, user.rol),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Inicio de sesión
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("Datos recibidos en /login:", req.body);

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        rol: user.rol,
        rolUsuario: user.rol,
        token: generateToken(user.id, user.rol),
      });
    } else {
      res.status(401).json({ message: "Credenciales inválidas" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
