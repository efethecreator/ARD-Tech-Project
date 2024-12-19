import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ApplicationList from "./pages/ApplicationList";
import ApplicationForm from "./pages/ApplicationForm";
import CaseList from "./pages/CaseList";
import CaseForm from "./pages/CaseForm";
import LawyerList from "./pages/LawyerList";
import MediaTracking from "./pages/MediaTracking";
import AddViolation from "./pages/AddViolation"; // Yeni eklenen dosya
import Login from "./pages/Login";
import Register from "./pages/Register";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  // Sidebar'ın açık olup olmadığını kontrol eden state
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
            <PrivateRoute>
              <div className="flex h-screen bg-gray-100">
                {/* Admin Panel Sidebar */}
                <Sidebar setSidebarOpen={setSidebarOpen} />

                {/* İçerik Alanı */}
                <div
                  className={`flex-1 flex flex-col transition-all duration-300 ${
                    sidebarOpen ? "ml-64" : "ml-20"
                  }`} // Sidebar açıldığında sağa kayma efekti
                >
                  {/* Navbar */}
                  <Navbar />

                  {/* İçerik Route'ları */}
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route
                      path="/applications"
                      element={<ApplicationList />}
                    />
                    <Route
                      path="/applications/new"
                      element={<ApplicationForm />}
                    />
                    <Route path="/cases" element={<CaseList />} />
                    <Route path="/cases/new" element={<CaseForm />} />
                    <Route path="/lawyers" element={<LawyerList />} />
                    <Route
                      path="/media-tracking"
                      element={<MediaTracking />}
                    />
                    <Route
                      path="/violations/add"
                      element={<AddViolation />}
                    />
                  </Routes>
                </div>
              </div>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
