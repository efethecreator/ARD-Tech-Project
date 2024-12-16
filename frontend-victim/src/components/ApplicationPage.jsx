import React, { useState, useEffect } from "react";
import { useApplicationStore } from "../store/applicationStore";

const ApplicationsPage = () => {
  const {
    applications,
    fetchApplications,
    createApplication,
    deleteApplication,
  } = useApplicationStore();

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
  });
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

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
    if (!formData.applicationPhone) errors.applicationPhone = "Telefon numarası zorunludur.";
    if (!formData.applicationEmail) errors.applicationEmail = "E-posta adresi zorunludur.";
    if (!formData.applicantType) errors.applicantType = "Başvuran türü zorunludur.";
    if (!formData.applicationReason) errors.applicationReason = "Başvuru nedeni zorunludur.";
    if (!formData.applicationType) errors.applicationType = "Başvuru tipi zorunludur.";
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
      await createApplication(data);
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
        {Object.keys(formData).map((key) => (
          <div key={key} className="grid grid-cols-1 gap-2">
            <label
              className="block text-sm font-medium text-primary"
              htmlFor={key}
            >
              {key === "idNumber"
                ? "TC Kimlik Numarası"
                : key === "firstName"
                ? "Ad"
                : key === "lastName"
                ? "Soyad"
                : key === "applicationPhone"
                ? "Telefon"
                : key === "applicationEmail"
                ? "E-posta"
                : key === "applicantType"
                ? "Başvuran Türü"
                : key === "applicationReason"
                ? "Başvuru Nedeni"
                : key === "applicationType"
                ? "Başvuru Tipi"
                : key === "companyName"
                ? "Şirket Adı (Opsiyonel)"
                : key === "companyType"
                ? "Şirket Türü (Opsiyonel)"
                : key}
              {["idNumber", "firstName", "lastName", "applicationPhone", "applicationEmail", "applicantType", "applicationReason", "applicationType"].includes(key) && (
                <span className="text-secondary"> *</span>
              )}
            </label>
            <input
              type="text"
              id={key}
              name={key}
              value={formData[key]}
              onChange={handleInputChange}
              className={`mt-1 block w-full shadow-sm border border-neutral rounded-md focus:ring-secondary focus:border-secondary ${
                errorMessage[key] ? "border-red-500" : ""
              }`}
              placeholder={`${
                key === "idNumber"
                  ? "TC kimlik numarasını girin"
                  : key === "firstName"
                  ? "Adınızı girin"
                  : key === "lastName"
                  ? "Soyadınızı girin"
                  : key === "applicationPhone"
                  ? "Telefon numarasını girin"
                  : key === "applicationEmail"
                  ? "E-posta adresinizi girin"
                  : key === "applicantType"
                  ? "Bireysel veya Kurumsal"
                  : key === "applicationReason"
                  ? "Başvuru nedenini girin"
                  : key === "applicationType"
                  ? "Başvuru tipini seçin"
                  : key === "companyName"
                  ? "Şirket adını girin (varsa)"
                  : key === "companyType"
                  ? "Şirket türünü girin (varsa)"
                  : ""
              }`}
            />
            {errorMessage[key] && (
              <p className="text-sm text-red-500">{errorMessage[key]}</p>
            )}
          </div>
        ))}
        <div className="grid grid-cols-1 gap-2">
          <label
            className="block text-sm font-medium text-primary"
            htmlFor="file"
          >
            Dosya Yükle <span className="text-secondary">*</span>
          </label>
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
            className={`mt-1 block w-full shadow-sm border border-neutral rounded-md focus:ring-secondary focus:border-secondary ${
              errorMessage.file ? "border-red-500" : ""
            }`}
          />
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
