const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authMiddleware = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extraer token
      token = req.headers.authorization.split(" ")[1];

      // Verificar token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Buscar usuario sin contraseña
      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        return res.status(401).json({ error: "Usuario no encontrado" });
      }

      // Guardar usuario en la request
      req.user = user;

      return next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ error: "Token no válido" });
    }
  }

  // Si no hay token
  if (!token) {
    return res.status(401).json({ error: "No autorizado, no hay token" });
  }
};

module.exports = authMiddleware;
