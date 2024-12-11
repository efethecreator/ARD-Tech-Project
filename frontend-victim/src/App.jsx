import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ViolationForm from "./pages/ViolationForm"; // Mağdur başvuru formu bileşeni
import Header from "./components/Header"; // Ortak başlık bileşeni (eğer kullanıyorsanız)

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-100">
        {/* Header (isteğe bağlı) */}
        <Header />
        <main className="flex-1">
          <Routes>
            {/* Mağdur Başvuru Formu */}
            <Route path="/" element={<ViolationForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
