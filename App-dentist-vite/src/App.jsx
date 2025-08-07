import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Components/LoginPage";
import Registro from "./Components/Registro";
import Dashboard from "./Pages/Dashboard";

function App() {
  return (

   
   <Router basename="/App-dentist">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/Registro" element={<Registro />} />
        <Route path="/dashboard/*" element={<Dashboard />} />

      </Routes>
    </Router>

  );
}

export default App;
