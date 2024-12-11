import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminHome from "./components/AdminHome";
import ViolationAddPage from "./components/ViolationAddPopup";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<AdminHome />} />
          <Route path="/add-violation" element={<ViolationAddPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
