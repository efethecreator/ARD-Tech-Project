import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ApplicationList from "./pages/ApplicationList";
import ApplicationForm from "./pages/ApplicationForm";
import ApplicationDetail from "./pages/ApplicationDetailPage";
import CaseList from "./pages/CaseList";
import CaseForm from "./pages/CaseForm";
import LawyerList from "./pages/LawyerList";
import MediaTracking from "./pages/MediaTracking";
import AddViolation from "./pages/AddViolation";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import useAuthStore from "./store/authStore";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { role, isAuthenticated } = useAuthStore();

  return (
    <Router>
      <Routes>
        {/* Login Page */}
        <Route path="/login" element={<Login />} />

        {/* Register Page */}
        <Route path="/register" element={<Register />} />

        {/* Admin Panel */}
        {isAuthenticated && role === "admin" && (
          <Route
            path="/*"
            element={
              <PrivateRoute allowedRoles={["admin"]}>
                <div className="flex h-screen bg-gray-100">
                  <Sidebar setSidebarOpen={setSidebarOpen} role={role} />
                  <div
                    className={`flex-1 flex flex-col transition-all duration-300 ${
                      sidebarOpen ? "ml-64" : "ml-20"
                    }`}
                  >
                    <Navbar />
                    <Routes>
                      <Route path="/" element={<Navigate to="/dashboard" replace />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/applications" element={<ApplicationList />} />
                      <Route path="/applications/new" element={<ApplicationForm />} />
                      <Route path="/applications/:id" element={<ApplicationDetail />} />
                      <Route path="/cases" element={<CaseList />} />
                      <Route path="/cases/new" element={<CaseForm />} />
                      <Route path="/users" element={<LawyerList />} />
                      <Route path="/media-tracking" element={<MediaTracking />} />
                      <Route path="/violations/add" element={<AddViolation />} />
                    </Routes>
                  </div>
                </div>
              </PrivateRoute>
            }
          />
        )}

        {/* Lawyer Panel */}
        {isAuthenticated && role === "lawyer" && (
          <Route
            path="/lawyer/*"
            element={
              <PrivateRoute allowedRoles={["lawyer"]}>
                <Navigate to="/lawyer/cases" replace />
              </PrivateRoute>
            }
          />
        )}

        {/* Lawyer Cases */}
        <Route
          path="/lawyer/cases/*"
          element={
            <PrivateRoute allowedRoles={["lawyer"]}>
              <div className="flex h-screen bg-gray-100">
                <Sidebar setSidebarOpen={setSidebarOpen} role={role} />
                <div
                  className={`flex-1 flex flex-col transition-all duration-300 ${
                    sidebarOpen ? "ml-64" : "ml-20"
                  }`}
                >
                  <Navbar />
                  <Routes>
                    <Route path="" element={<CaseList />} />
                  </Routes>
                </div>
              </div>
            </PrivateRoute>
          }
        />

        {/* Default Redirect Based on Role */}
        <Route
          path="*"
          element={
            isAuthenticated ? (
              role === "admin" ? (
                <Navigate to="/dashboard" replace />
              ) : role === "lawyer" ? (
                <Navigate to="/lawyer/cases" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Unauthorized Route */}
        <Route path="/error" element={<h1>Unauthorized Access</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
