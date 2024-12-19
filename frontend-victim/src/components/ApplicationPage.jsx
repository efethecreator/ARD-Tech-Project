import React, { useState } from "react";
import useApplicationStore from "../store/applicationStore";

const ApplicationPage = () => {
  const { createApplication } = useApplicationStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);

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

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value, // files[0] ile dosya değeri ayarlanıyor
    });
  };
  

  const handleNextStep = () => setCurrentStep((prev) => prev + 1);
  const handlePreviousStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handleNextStepWithFileCheck = () => {
    if (!formData.file) {
      alert("Lütfen bir dosya yükleyin!");
      return;
    }
    setCurrentStep(3);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const applicationData = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key]) {
          applicationData.append(key, formData[key]);
        }
      });
  
      console.log("Gönderilen FormData:", [...applicationData.entries()]); // Debug için
      await createApplication(applicationData);
  
      alert("Form başarıyla gönderildi!");
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
        file: null,
      });
      setCurrentStep(1);
    } catch (error) {
      console.error("Form gönderimi sırasında hata oluştu:", error);
      alert(error.response?.data?.message || "Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        {currentStep === 1 && (
          <div>
            <h2 className="text-xl font-bold mb-4 text-center">Başvuru Ekle - Adım 1</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleNextStep();
              }}
              className="space-y-4"
            >
              {["idNumber", "firstName", "lastName", "applicationPhone", "applicationEmail"].map(
                (field, idx) => (
                  <div key={idx}>
                    <label className="block mb-1 font-medium">
                      {field === "idNumber"
                        ? "TC Kimlik Numarası"
                        : field === "firstName"
                        ? "Ad"
                        : field === "lastName"
                        ? "Soyad"
                        : field === "applicationPhone"
                        ? "Telefon"
                        : "E-posta"}
                    </label>
                    <input
                      type={field === "applicationEmail" ? "email" : "text"}
                      name={field}
                      value={formData[field]}
                      onChange={handleInputChange}
                      className="w-full border p-2 rounded"
                      placeholder={`${field} girin`}
                      required
                    />
                  </div>
                )
              )}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  İleri
                </button>
              </div>
            </form>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <h2 className="text-xl font-bold mb-4 text-center">Dosya Ekleme - Adım 2</h2>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Dosya Yükle</label>
              <input
                type="file"
                name="file"
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={handlePreviousStep}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Geri
              </button>
              <button
                onClick={handleNextStepWithFileCheck}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                İleri
              </button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <h2 className="text-xl font-bold mb-4 text-center">Onaylama - Adım 3</h2>
            <p className="text-gray-600 mb-4 text-center">
              Bilgilerinizi kontrol edin ve gönderin.
            </p>
            <div className="flex justify-between">
              <button
                onClick={handlePreviousStep}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Geri
              </button>
              <button
                onClick={handleSubmit}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                disabled={loading}
              >
                {loading ? "Gönderiliyor..." : "Gönder"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationPage;
