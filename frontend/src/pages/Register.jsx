import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/authApi";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    TCNumber: "",
    password: "",
    confirmPassword: "",
    userRole: "lawyer", // Varsayılan rol
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { name, surname, TCNumber, password, confirmPassword } = formData;

    if (name.trim() === "" || surname.trim() === "") {
      setError("Ad ve Soyad boş bırakılamaz.");
      return false;
    }
    if (!/^\d{11}$/.test(TCNumber)) {
      setError("TC Kimlik Numarası 11 haneli ve sadece rakam olmalıdır.");
      return false;
    }
    if (password.length < 6) {
      setError("Şifre en az 6 karakter olmalıdır.");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Şifreler eşleşmiyor!");
      return false;
    }
    setError("");
    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    try {
      await register(formData);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Kayıt sırasında bir hata oluştu.");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: "url('/src/assets/login-page.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-primary-dark opacity-60"></div>

      {/* Ana Kutu */}
      <div className="relative z-10 bg-white p-6 rounded-lg shadow-lg w-full max-w-md border-t-4 border-secondary-light">
        <h1 className="text-2xl font-bold mb-4 text-center text-primary-dark">
          Kayıt Ol
        </h1>
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="text-sm text-primary-dark">Ad</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-secondary-light"
              placeholder="Adınızı girin"
            />
          </div>
          <div>
            <label className="text-sm text-primary-dark">Soyad</label>
            <input
              type="text"
              name="surname"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-secondary-light"
              placeholder="Soyadınızı girin"
            />
          </div>
          <div>
            <label className="text-sm text-primary-dark">TC Kimlik Numarası</label>
            <input
              type="text"
              name="TCNumber"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-secondary-light"
              placeholder="11 Haneli TC Kimlik Numarası"
            />
          </div>
          <div>
            <label className="text-sm text-primary-dark">Şifre</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-secondary-light"
              placeholder="Şifrenizi girin"
            />
          </div>
          <div>
            <label className="text-sm text-primary-dark">Şifre Onayı</label>
            <input
              type="password"
              name="confirmPassword"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-secondary-light"
              placeholder="Şifrenizi tekrar girin"
            />
          </div>
          <div>
            <label className="text-sm text-primary-dark">Kullanıcı Rolü</label>
            <select
              name="userRole"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-secondary-light"
            >
              <option value="lawyer">Avukat</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>

        {/* Buton */}
        <button
          onClick={handleRegister}
          className="w-full mt-6 bg-secondary-light hover:bg-secondary-dark text-white py-2 rounded transition duration-300"
        >
          Kayıt Ol
        </button>

        {/* Giriş Sayfasına Yönlendirme */}
        <p className="text-center text-sm mt-4 text-primary-dark">
          Zaten bir hesabınız var mı?{" "}
          <a href="/login" className="text-secondary-light hover:underline">
            Giriş Yap
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
