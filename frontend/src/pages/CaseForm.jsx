import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCaseStore from "../store/caseStore";

const CaseForm = () => {
  const [formData, setFormData] = useState({
    applicationId: "",
    protectedPersonName: "",
    protectedPersonSurname: "",
    protectedPersonTCNumber: "",
    lawyerId: "default-lawyer-id",
    caseNumber: "",
    caseReason: "",
    courtName: "",
    result: "",
    resultPhase: "",
    indictment: "",
    files: [],
  });

  const addCase = useCaseStore((state) => state.addCase);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, files: e.target.files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "files") {
        Array.from(formData.files).forEach((file) =>
          formDataToSend.append("files", file)
        );
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      await addCase(formDataToSend);
      navigate("/cases");
    } catch (error) {
      console.error("Error adding case:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background-light p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-[1200px] max-h-[700px] overflow-hidden">
        <h2 className="text-3xl font-bold text-primary-dark mb-6 text-center">
          Yeni Dava Ekle
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-x-8 gap-y-4">
          {/* 1. Satır */}
          <div>
            <label className="block text-muted text-sm mb-1">Başvuru ID</label>
            <input
              name="applicationId"
              className="w-full border rounded px-3 py-2"
              onChange={handleChange}
              placeholder="Başvuru ID"
            />
          </div>
          <div>
            <label className="block text-muted text-sm mb-1">Korumalı Kişi Adı</label>
            <input
              name="protectedPersonName"
              className="w-full border rounded px-3 py-2"
              onChange={handleChange}
              placeholder="Adı"
            />
          </div>
          <div>
            <label className="block text-muted text-sm mb-1">Soyadı</label>
            <input
              name="protectedPersonSurname"
              className="w-full border rounded px-3 py-2"
              onChange={handleChange}
              placeholder="Soyadı"
            />
          </div>

          {/* 2. Satır */}
          <div>
            <label className="block text-muted text-sm mb-1">TC Kimlik Numarası</label>
            <input
              name="protectedPersonTCNumber"
              className="w-full border rounded px-3 py-2"
              onChange={handleChange}
              placeholder="TC Kimlik No"
            />
          </div>
          <div>
            <label className="block text-muted text-sm mb-1">Dava Numarası</label>
            <input
              name="caseNumber"
              className="w-full border rounded px-3 py-2"
              onChange={handleChange}
              placeholder="Dava No"
            />
          </div>
          <div>
            <label className="block text-muted text-sm mb-1">Mahkeme Adı</label>
            <input
              name="courtName"
              className="w-full border rounded px-3 py-2"
              onChange={handleChange}
              placeholder="Mahkeme Adı"
            />
          </div>

          {/* 3. Satır */}
          <div>
            <label className="block text-muted text-sm mb-1">Sonuç</label>
            <input
              name="result"
              className="w-full border rounded px-3 py-2"
              onChange={handleChange}
              placeholder="Sonuç"
            />
          </div>
          <div>
            <label className="block text-muted text-sm mb-1">Sonuç Aşaması</label>
            <input
              name="resultPhase"
              className="w-full border rounded px-3 py-2"
              onChange={handleChange}
              placeholder="Sonuç Aşaması"
            />
          </div>
          <div>
            <label className="block text-muted text-sm mb-1">Dosya Yükle</label>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* 4. Satır */}
          <div className="col-span-3">
            <label className="block text-muted text-sm mb-1">İddianame</label>
            <textarea
              name="indictment"
              className="w-full border rounded px-3 py-2"
              rows="3"
              onChange={handleChange}
              placeholder="İddianame"
            />
          </div>

          {/* Kaydet Butonu */}
          <div className="col-span-3 flex justify-end mt-4">
            <button
              type="submit"
              className="bg-primary-light text-white px-6 py-2 rounded hover:bg-primary-dark transition"
            >
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CaseForm;
