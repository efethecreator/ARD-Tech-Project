import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ApplicationList from './pages/ApplicationList';
import ApplicationForm from './pages/ApplicationForm';
import CaseList from './pages/CaseList';
import LawyerList from './pages/LawyerList';
import MediaTracking from './pages/MediaTracking';
import Login from './pages/Login';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Giriş Sayfası */}
        <Route path="/login" element={<Login />} />

        {/* Admin Paneli */}
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <div className="flex h-screen">
                <Sidebar />
                <div className="flex-1 flex flex-col bg-gray-100">
                  <Navbar />
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/applications" element={<ApplicationList />} />
                    <Route path="/applications/new" element={<ApplicationForm />} />
                    <Route path="/cases" element={<CaseList />} />
                    <Route path="/lawyers" element={<LawyerList />} />
                    <Route path="/media-tracking" element={<MediaTracking />} />
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
