import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Local storage'dan başvuruları yükle
    const storedApplications = JSON.parse(localStorage.getItem("applications")) || [];
    setApplications(storedApplications);
  }, []);

  const handleDelete = (index) => {
    // Başvuruyu sil ve localStorage'ı güncelle
    const updatedApplications = applications.filter((_, i) => i !== index);
    setApplications(updatedApplications);
    localStorage.setItem("applications", JSON.stringify(updatedApplications));
  };

  if (applications.length === 0) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold">Hiç başvuru bulunamadı.</h1>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Başvurular</h1>
      <table className="table-auto w-full bg-white shadow-md rounded border">
        <thead>
          <tr>
            <th className="px-4 py-2 border">TC Kimlik</th>
            <th className="px-4 py-2 border">Ad Soyad</th>
            <th className="px-4 py-2 border">Başvuru Türü</th>
            <th className="px-4 py-2 border">Sorun Türü</th>
            <th className="px-4 py-2 border">Açıklama</th>
            <th className="px-4 py-2 border">Dosya</th>
            <th className="px-4 py-2 border">İşlem</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app, index) => (
            <tr key={index}>
              <td className="px-4 py-2 border">{app.tc}</td>
              <td className="px-4 py-2 border">{`${app.name} ${app.surname}`}</td>
              <td className="px-4 py-2 border">{app.applicationType}</td>
              <td className="px-4 py-2 border">{app.issueType}</td>
              <td className="px-4 py-2 border">{app.description}</td>
              <td className="px-4 py-2 border">{app.attachment || "Dosya yok"}</td>
              <td className="px-4 py-2 border">
                <div className="flex gap-2">
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-700"
                    onClick={() => navigate(`/application/${index}`)}
                  >
                    Detayları Gör
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                    onClick={() => handleDelete(index)}
                  >
                    Sil
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
