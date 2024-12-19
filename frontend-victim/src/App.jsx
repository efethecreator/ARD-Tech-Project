import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ApplicationForm from "./components/ApplicationPage"; // Burada import edilen bileşen adı ApplicationForm

const App = () => {
  return (
    <Router> {/* Ana Router'ı burada ekliyoruz */}
      <Routes>
        <Route path="/" element={<ApplicationForm />} /> {/* Burada ApplicationForm bileşeni kullanılıyor */}
      </Routes>
    </Router>
  );
};

export default App;
