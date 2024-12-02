import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import VictimForm from "./pages/VictimForm";
import ApplicationDetail from "./pages/ApplicationDetail";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/victim" element={<VictimForm />} />
        <Route path="/application/:id" element={<ApplicationDetail />} /> {/* Yeni rota */}
      </Routes>
    </Router>
  );
}

export default App;