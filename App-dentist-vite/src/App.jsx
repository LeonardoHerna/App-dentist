import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Components/LoginPage";
import Registro from "./Components/Registro";
import Dashboard from "./Pages/Dashboard";
import AdminDashboard from "./Pages/AdminDashboard";
import AdminRoute from "./Components/AdminRoutes";
import LandingPage from "./Components/LandingPage";
function App() {
  return (

   <Router basename="/App-dentist">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/Registro" element={<Registro />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/admin" element={<AdminRoute><AdminDashboard /> </AdminRoute>} />
      



      </Routes>
    </Router>

  );
}

export default App;
