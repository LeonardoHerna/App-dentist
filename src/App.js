import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>Dashboard</h1>} />
        <Route path="/patients" element={<h1>Patients</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
