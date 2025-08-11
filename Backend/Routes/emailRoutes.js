const express = require("express");
const router = express.Router();

const registeredEmails = []; // Temporal en memoria, mejor base real

router.post("/register-email", (req, res) => {
  const { email } = req.body;

  if (!email || !email.includes("@")) {
    return res.status(400).json({ message: "Email inválido" });
  }

  if (registeredEmails.includes(email)) {
    return res.status(409).json({ message: "Email ya registrado" });
  }

  registeredEmails.push(email);

  console.log("Email registrado:", email);
  res.status(201).json({ message: "Email registrado exitosamente" });
});

module.exports = router;
