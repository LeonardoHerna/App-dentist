// middlewares/authMiddleware.js
const jwt = require("jsonwebtoken");

const verificarToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token no proporcionado." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Contiene email, rol, etc.
    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido o expirado." });
  }
};

module.exports = { verificarToken };
