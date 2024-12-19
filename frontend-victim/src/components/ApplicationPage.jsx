import React, { useState } from "react";
import { useApplicationStore } from "../store/applicationStore";

const ApplicationsPage = () => {
  const { createApplication } = useApplicationStore();

  const [formData, setFormData] = useState({
    idNumber: "",
    firstName: "",
    lastName: "",
    applicationPhone: "",
    applicationEmail: "",
    applicantType: "",
    applicationReason: "",
    applicationType: "",
    companyName: "",
    companyType: "",
    file: null,
  });
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.idNumber) errors.idNumber = "TC Kimlik Numarası zorunludur.";
    if (!formData.firstName) errors.firstName = "Ad zorunludur.";
    if (!formData.lastName) errors.lastName = "Soyad zorunludur.";
    if (!formData.applicationPhone)
      errors.applicationPhone = "Telefon numarası zorunludur.";
    if (!formData.applicationEmail)
      errors.applicationEmail = "E-posta adresi zorunludur.";
    if (!formData.applicantType)
      errors.applicantType = "Başvuran türü zorunludur.";
    if (!formData.applicationReason)
      errors.applicationReason = "Başvuru nedeni zorunludur.";
    if (!formData.applicationType)
      errors.applicationType = "Başvuru tipi zorunludur.";
    if (!file) errors.file = "Bir dosya yüklemek zorunludur.";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setErrorMessage(errors);
      setSuccessMessage("");
      return;
    }

    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    data.append("file", file);

    try {
      await createApplication(data); // Backend'e başvuru gönderme
      setSuccessMessage("Başvuru başarıyla gönderildi!");
      setErrorMessage({});
      setFormData({
        idNumber: "",
        firstName: "",
        lastName: "",
        applicationPhone: "",
        applicationEmail: "",
        applicantType: "",
        applicationReason: "",
        applicationType: "",
        companyName: "",
        companyType: "",
      });
      setFile(null);
    } catch (error) {
      setErrorMessage({ general: "Başvuru gönderilirken bir hata oluştu." });
      setSuccessMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center py-10 px-4">
      <div className="max-w-3xl w-full bg-accent shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-primary mb-4 text-center">
          Başvuru Yönetimi Paneli
        </h1>
        {successMessage && (
          <div className="mb-4 p-3 bg-secondary text-white border border-secondary rounded-md">
            {successMessage}
          </div>
        )}
        {errorMessage.general && (
          <div className="mb-4 p-3 bg-secondary text-white border border-secondary rounded-md">
            {errorMessage.general}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { label: "TC Kimlik Numarası", name: "idNumber" },
            { label: "Ad", name: "firstName" },
            { label: "Soyad", name: "lastName" },
            { label: "Telefon", name: "applicationPhone" },
            { label: "E-posta", name: "applicationEmail" },
            { label: "Başvuran Türü", name: "applicantType" },
            { label: "Başvuru Nedeni", name: "applicationReason" },
            { label: "Başvuru Tipi", name: "applicationType" },
            { label: "Şirket Adı (Opsiyonel)", name: "companyName" },
            { label: "Şirket Türü (Opsiyonel)", name: "companyType" },
          ].map((input, index) => (
            <div key={index} className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                {input.label}
              </label>
              <input
                type="text"
                name={input.name}
                value={formData[input.name] || ""} // Ensuring the value is not null
                onChange={handleInputChange}
                placeholder={`Enter ${input.label}`}
                className="mt-1 p-2 w-full border rounded"
              />
            </div>
          ))}

          {/* File Upload Section */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Dosya Yükle <span className="text-secondary">*</span>
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              className="mt-1 w-full shadow-sm border border-neutral rounded-md focus:ring-secondary focus:border-secondary"
            />
            {file && (
              <div className="mt-2 text-sm text-green-500">
                {file.name} seçildi.
              </div>
            )}
            {errorMessage.file && (
              <p className="text-sm text-red-500">{errorMessage.file}</p>
            )}
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="w-full md:w-auto bg-secondary hover:bg-secondary-dark text-white font-semibold py-2 px-4 rounded-md shadow-lg"
            >
              Başvuruyu Gönder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplicationsPage;
