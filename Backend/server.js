const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./Config/db");
const authRoutes = require("./Routes/authRoutes");
const emailRoutes = require("./Routes/emailRoutesCta");

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: ["http://localhost:5173", "https://leonardoherna.github.io"],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.use("/api/auth", authRoutes);
app.use("/api/pacientes", require("./Routes/pacientesRoutes"));
app.use("/api/citas", require("./Routes/citasRoutes"));
app.use("/api/email", require("./Routes/emailRoutes"));
app.use("/api/emailCta", emailRoutes);
app.use("/api/tratamientos", require("./Routes/tratamientosRoutes"));



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
