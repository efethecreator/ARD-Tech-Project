import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [tcNo, setTcNo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // Geçici kullanıcı bilgileri
    const adminTC = "12345678901";
    const adminPassword = "admin123";

    if (tcNo === adminTC && password === adminPassword) {
      localStorage.setItem("isAuthenticated", "true"); // Kullanıcıyı sisteme giriş yapmış olarak işaretle
      navigate("/"); // Admin paneline yönlendir
    } else {
      setError("TC Kimlik numarası veya şifre hatalı!");
    }
  };

  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/src/assets/login-page.jpg')", // Arka plan görseli yolu
      }}
    >
      {/* Karartma efekti */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative z-10 bg-primary-dark p-8 rounded shadow-md w-96 opacity-90">
        <h1 className="text-2xl font-bold mb-6 text-center text-secondary-light">
          Admin Giriş
        </h1>
        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-secondary-light">
            TC Kimlik Numarası
          </label>
          <input
            type="text"
            value={tcNo}
            onChange={(e) => setTcNo(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-secondary-light"
            placeholder="TC Kimlik Numarası"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1 text-secondary-light">
            Şifre
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-secondary-light"
            placeholder="Şifre"
          />
        </div>
        <button
          onClick={handleLogin}
          className="w-full bg-secondary-light hover:bg-secondary-dark text-white py-2 rounded transition duration-300"
        >
          Giriş Yap
        </button>
      </div>
    </div>
  );
};

export default Login;
