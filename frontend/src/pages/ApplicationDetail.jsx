import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const ApplicationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const applications = JSON.parse(localStorage.getItem("applications")) || [];
  const application = applications[id];

  if (!application) {
    return (
      <div className="text-center mt-10">
        <h1 className="text-2xl font-bold">Başvuru bulunamadı.</h1>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Geri Dön
        </button>
      </div>
    );
  }

  const renderAttachment = (attachment) => {
    if (!attachment) return <p>Dosya yüklenmedi.</p>;

    return (
      <div className="mt-4">
        <p>Ekli Dosya:</p>
        <a
          href={`/${attachment}`} // Eğer dosya server üzerinden sunuluyorsa doğru path verilmeli
          download={attachment.split("/").pop()}
          className="text-blue-500 underline hover:text-blue-700"
        >
          {attachment.split("/").pop()}
        </a>
      </div>
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Başvuru Detayları</h1>
      <p>
        <strong>TC Kimlik Numarası:</strong> {application.tc}
      </p>
      <p>
        <strong>Ad Soyad:</strong> {application.name} {application.surname}
      </p>
      <p>
        <strong>Başvuru Türü:</strong> {application.applicationType}
      </p>
      <p>
        <strong>Sorun Türü:</strong> {application.issueType}
      </p>
      <p>
        <strong>Açıklama:</strong> {application.description}
      </p>
      {renderAttachment(application.attachment)}

      <button
        onClick={() => navigate(-1)}
        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Geri Dön
      </button>
    </div>
  );
};

export default ApplicationDetails;
