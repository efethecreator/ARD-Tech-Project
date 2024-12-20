import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ApplicationList from "./pages/ApplicationList";
import ApplicationForm from "./pages/ApplicationForm";
import ApplicationDetail from "./pages/ApplicationDetailPage"; // Detay sayfası
import CaseList from "./pages/CaseList";
import CaseForm from "./pages/CaseForm";
import LawyerList from "./pages/LawyerList";
import MediaTracking from "./pages/MediaTracking";
import AddViolation from "./pages/AddViolation"; // Yeni eklenen dosya
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true); // Navbar açık/kapalı durumu

  return (
    <Router>
      <Routes>
        {/* Giriş Sayfası */}
        <Route path="/login" element={<Login />} />

        {/* Kayıt Ol Sayfası */}
        <Route path="/register" element={<Register />} />

        {/* Admin Paneli */}
        <Route
          path="/*"
          element={
            <div className="flex h-screen bg-gray-100">
              {/* Navbar */}
              <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
              <div
                className={`flex-1 flex flex-col transition-all duration-300 ${
                  isMenuOpen ? "ml-64" : "ml-20"
                }`} // Navbar genişliğine göre kaydırma
              >
                {/* İçerik Route'ları */}
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/applications" element={<ApplicationList />} />
                  <Route
                    path="/applications/new"
                    element={<ApplicationForm />}
                  />
                  <Route
                    path="/applications/:id"
                    element={<ApplicationDetail />} // Başvuru detay sayfası
                  />
                  <Route path="/cases" element={<CaseList />} />
                  <Route path="/cases/new" element={<CaseForm />} />
                  <Route path="/lawyers" element={<LawyerList />} />
                  <Route
                    path="/media-tracking"
                    element={<MediaTracking />}
                  />
                  <Route path="/violations/add" element={<AddViolation />} />
                </Routes>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
