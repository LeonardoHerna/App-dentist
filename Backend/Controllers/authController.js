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

    // Encriptar contraseña antes de guardarla
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear usuario
    const user = await User.create({ 
      name, 
      email, 
      password: hashedPassword, 
      rol: rol || "user" 
    });

    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      rol: user.rol,
      token: generateToken(user.id, user.rol),
    });
  } catch (error) {
    console.error("Error en registerUser:", error);
    res.status(500).json({ message: "Error en el servidor", error: error.message });
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
        token: generateToken(user.id, user.rol),
      });
    } else {
      res.status(401).json({ message: "Credenciales inválidas" });
    }
  } catch (error) {
    console.error("Error en loginUser:", error);
    res.status(500).json({ message: "Error en el servidor", error: error.message });
  }
};


// Obtener usuario autenticado
exports.getUser = async (req, res) => {
  try {
    // El middleware de auth debería haber agregado el usuario a req.user
    const user = await User.findById(req.user.id).select("-password"); // excluimos password

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
