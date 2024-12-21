const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const citaRoutes = require('./Routes/CitaRoutes');

const app = express();
const port = process.env.PORT || 5000;

// Middleware para analizar el cuerpo de las solicitudes
app.use(express.json());

// Rutas de citas
app.use('/api', citaRoutes);

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado a MongoDB'))
.catch((err) => console.log('Error de conexión a MongoDB:', err));

// Rutas
app.get('/', (req, res) => {
  res.send('Bienvenido al backend de la app!');
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
