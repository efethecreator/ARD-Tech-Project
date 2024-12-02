import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleAdminLogin = (e) => {
    e.preventDefault();

    // Admin kullanıcı doğrulama
    if (email === "admin@example.com" && password === "123456") {
      const userData = { email, role: "admin" };
      localStorage.setItem("user", JSON.stringify(userData));
      alert("Admin girişi başarılı!");
      navigate("/dashboard");
    } else {
      setError("Geçersiz email veya şifre.");
    }
  };

  return (
    <div className="relative h-screen flex">
      {/* Sol Taraf: Mağdur Başvuru */}
      <div className="w-1/2 h-full bg-blue-500 flex items-center justify-center text-white hover:w-full transition-all duration-500">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Mağdur Başvuru</h1>
          <button
            className="bg-white text-blue-500 px-4 py-2 rounded hover:bg-gray-100"
            onClick={() => navigate("/victim")}
          >
            Başvuru Yap
          </button>
        </div>
      </div>

      {/* Sağ Taraf: Admin Girişi */}
      <div className="w-1/2 h-full bg-gray-800 flex items-center justify-center text-white hover:w-full transition-all duration-500">
        <div className="text-center w-80">
          <h1 className="text-3xl font-bold mb-4">Admin Girişi</h1>
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <form onSubmit={handleAdminLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mb-3 px-3 py-2 border rounded"
              required
            />
            <input
              type="password"
              placeholder="Şifre"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mb-3 px-3 py-2 border rounded"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700"
            >
              Giriş Yap
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;