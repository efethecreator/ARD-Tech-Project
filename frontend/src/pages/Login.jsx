import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

const Login = () => {
  const [tcNo, setTcNo] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [localError, setLocalError] = useState("");
  const { loginUser, error } = useAuthStore();
  const navigate = useNavigate();

  const validateForm = () => {
    if (!/^\d{11}$/.test(tcNo)) {
      setLocalError("TC Kimlik Numarası 11 haneli ve sadece rakam olmalıdır.");
      return false;
    }
    if (password.length < 6) {
      setLocalError("Şifre en az 6 karakter olmalıdır.");
      return false;
    }
    setLocalError("");
    return true;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;
    setIsLoading(true);
    await loginUser(tcNo, password);
    setIsLoading(false);
    if (!error) {
      navigate("/");
    }
  };

  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: "url('/src/assets/login-page.jpg')", // Arka plan görseli
      }}
    >
      {/* Karartma efekti */}
      <div className="absolute inset-0 bg-primary-dark opacity-60"></div>

      {/* Login Kutusu */}
      <div className="relative z-10 bg-white p-8 rounded-lg shadow-md w-96 border-t-4 border-secondary-light">
        <h1 className="text-2xl font-bold mb-6 text-center text-primary-dark">
          Admin Giriş
        </h1>

        {/* Hata Mesajları */}
        {localError && (
          <p className="text-red-500 text-sm mb-4 text-center">{localError}</p>
        )}
        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        {/* TC Kimlik Numarası */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-primary-dark">
            TC Kimlik Numarası
          </label>
          <input
            type="text"
            value={tcNo}
            onChange={(e) => setTcNo(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-secondary-light"
            placeholder="11 Haneli TC Kimlik Numarası"
          />
        </div>

        {/* Şifre */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2 text-primary-dark">
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

        {/* Giriş Butonu */}
        <button
          onClick={handleLogin}
          className={`w-full py-2 rounded text-white transition duration-300 ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-secondary-light hover:bg-secondary-dark"
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Giriş Yapılıyor..." : "Giriş Yap"}
        </button>

        {/* Kayıt Ol Linki */}
        <p className="text-center text-sm mt-4 text-primary-dark">
          Hesabınız yok mu?{" "}
          <a href="/register" className="text-secondary-light hover:underline">
            Kayıt Ol
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
