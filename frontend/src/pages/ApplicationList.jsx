import React, { useEffect, useState } from "react";
import useApplicationStore from "../store/applicationStore";
import applicationApi from "../api/applicationApi";
import { useNavigate } from "react-router-dom";

const ApplicationList = () => {
  const {
    applications,
    fetchApplications,
    deleteApplication,
    createApplication,
  } = useApplicationStore();
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

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
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  const openApplicationDetail = (id) => {
    // Başvurunun detay sayfasına yönlendir
    navigate(`/applications/${id}`);
  };

  const categoryFields = {
    "Media Monitoring": [
      "scanPeriod",
      "eventCategory",
      "eventSummary",
      "source",
      "link",
      "visualLink",
      "file",
    ],
    "NGO Data": [
      "scanPeriod",
      "eventCategory",
      "eventSummary",
      "notificationInstitution",
      "link",
      "file",
    ],
    "Bar Committees": [
      "scanPeriod",
      "eventCategory",
      "eventSummary",
      "commissionCase",
      "link",
      "file",
    ],
    "Public Institutions": [
      "scanPeriod",
      "eventCategory",
      "eventSummary",
      "publicInstitution",
      "link",
      "file",
    ],
  };

  const handleChange = (e) => {
    const { name, value, file } = e.target;
    setFormData({
      ...formData,
      [name]: file ? file[0] : value,
    });
  };

  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleFile2Change = (e) => {
    setFormData({ ...formData, file: e.target.file[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading state
    try {
      // Simulate data submission
      console.log("Form data submitted:", formData);
      await createApplication(formData);
      // Handle successful submission
      setLoading(false);
      alert("Form successfully submitted!");
      closePopup(); // Close popup after submission
    } catch (error) {
      console.error("Error during form submission:", error);
      setLoading(false); // Reset loading state on error
    }
  };

  const openModal = (id) => {
    const app = applications.find((app) => app._id === id);
    setSelectedApplication(app);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedApplication(null);
    setIsModalOpen(false);
  };

  const [currentStep, setCurrentStep] = useState(1);

  // Advance to the next step
  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  // Go back to the previous step (optional)
  const handlePreviousStep = () => {
    setCurrentStep((prevStep) => (prevStep > 1 ? prevStep - 1 : 1));
  };

  const handleFinalSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
  
    const data = new FormData();
  
    // FormData'ya form verilerini ekliyoruz
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
  
    // Dosyayı FormData'ya ekliyoruz
    if (file) {
      data.append("file", file); // 'file' parametresi doğru şekilde ekleniyor
    }
  
    try {
      // 1. Adım: Başvuru oluşturma işlemi
      const applicationResponse = await applicationApi.createApplication(data);
      console.log("Application Response:", applicationResponse);
  
      const applicationId = applicationResponse?.data?.data?._id;
      if (!applicationId) {
        console.error("Application Response Error:", applicationResponse);
        throw new Error("Başvuru oluşturulamadı. Application ID alınamadı.");
      }
  
      // 2. Adım: Violation oluşturma işlemi
      const violationData = new FormData();
  
      violationData.append("category", category);
      violationData.append("scanPeriod", formData.scanPeriod || "");
      violationData.append("eventCategory", formData.eventCategory || "");
      violationData.append("eventSummary", formData.eventSummary || "");
      violationData.append("source", formData.source || "");
      violationData.append("link", formData.link || "");
      violationData.append("visualLink", formData.visualLink || "");
      violationData.append("notificationInstitution", formData.notificationInstitution || "");
      violationData.append("commissionCase", formData.commissionCase || "");
      violationData.append("publicInstitution", formData.publicInstitution || "");
  
      // Dosya varsa ekliyoruz
      if (file) {
        violationData.append("file", file);  // Dosya gönderimi de yapılacak
      }
  
      // Violation kaydını oluşturuyoruz
      const violationResponse = await applicationApi.createViolation(violationData);
      console.log("Violation Response:", violationResponse);
  
      const violationId = violationResponse?.data?._id;
      if (!violationId) {
        console.error("Violation Response Error:", violationResponse);
        throw new Error("Violation oluşturulurken hata oluştu.");
      }
  
      // Başvuruyu güncelleyerek violation ekliyoruz
      await applicationApi.addViolation(applicationId, { violationId });
      console.log("Violation successfully added.");
  
      alert("Başvuru ve Violation başarıyla kaydedildi!");
      closePopup();
      fetchApplications();
    } catch (error) {
      console.error("Error during submission:", error);
      alert(error.message || "Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Başvurular</h1>
        <button
          onClick={openPopup}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Başvuru oluştur
        </button>
      </div>
      <div className="overflow-y-auto max-h-[700px] p-4 bg-white rounded-lg shadow-md border">
        {applications.length === 0 ? (
          <p className="text-gray-500 text-center">No applications found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {applications.map((app) => (
              <div
                key={app._id}
                className="bg-gray-50 border rounded-lg shadow-sm p-4 hover:shadow-md"
              >
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  {app.firstName} {app.lastName}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {app.status || "No reason specified"}
                </p>
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => openApplicationDetail(app._id)} // Başvuruya tıklandığında detay sayfasına yönlendir
                    className="text-blue-500 hover:underline"
                  >
                    İncele
                  </button>
                  <button
                    onClick={() => deleteApplication(app._id)}
                    className="text-red-500 hover:underline"
                  >
                    Sil
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isPopupOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={closePopup}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {currentStep === 1 && (
              <div>
                <h2 className="text-xl font-bold mb-4 text-gray-800">
                  Başvuru Oluştur
                </h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleNextStep();
                  }}
                >
                  {[
                    { label: "TC Kimlik Numarası", name: "idNumber" },
                    { label: "İsim", name: "firstName" },
                    { label: "Soyisim", name: "lastName" },
                    { label: "Telefon Numarası", name: "applicationPhone" },
                    { label: "Email", name: "applicationEmail" },
                    { label: "Başvuru Türü", name: "applicantType" },
                    {
                      label: "Başvuru Sebebi",
                      name: "applicationReason",
                    },
                    { label: "Şirket İsmi (Opsiyonel)", name: "companyName" },
                    { label: "Şirket Türü (Opsiyonel)", name: "companyType" },
                  ].map((input, index) => (
                    <div key={index} className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        {input.label}
                      </label>
                      <input
                        type="text"
                        name={input.name}
                        value={formData[input.name]}
                        onChange={handleInputChange}
                        placeholder={` ${input.label}`}
                        className="mt-1 p-2 w-full border rounded"
                      />
                    </div>
                  ))}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Yüklenecek Dosya
                    </label>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="mt-1"
                    />
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={closePopup}
                      className="mr-2 px-4 py-2 text-gray-600 bg-gray-200 rounded hover:bg-gray-300 transition"
                    >
                      İptal
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    >
                      Devam
                    </button>
                  </div>
                </form>
              </div>
            )}

            {currentStep === 2 && (
              <div>
                <h2 className="text-xl font-bold mb-4 text-gray-800">
                  Hak İhlali Oluştur
                </h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleNextStep();
                  }}
                >
                  <div className="mb-4">
                    <label className="block mb-1 font-medium text-gray-700">
                      Kategori Seçiniz
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="border border-gray-300 p-2 rounded w-full"
                      required
                    >
                      <option value="">Kategori Seçiniz</option>
                      <option value="Media Monitoring">Medya Taraması</option>
                      <option value="NGO Data">STK Verileri</option>
                      <option value="Bar Committees">Baro Komisyonları</option>
                      <option value="Public Institutions">
                        Kamu Kurumları
                      </option>
                    </select>
                  </div>

                  {category && (
                    <div className="grid grid-cols-2 gap-4">
                      {/* Dynamic Fields */}
                      {categoryFields[category].map((field, index) => (
                        <div key={index}>
                          <label className="block text-sm font-medium text-gray-700">
                            {
                              {
                                scanPeriod: "Tarama Dönemi",
                                eventCategory: "Olay Kategorisi",
                                eventSummary: "Olay Özeti",
                                source: "Kaynak",
                                link: "Link",
                                visualLink: "Görsel Link",
                                notificationInstitution:
                                  "Bildirim Kurumu",
                                commissionCase: "Vakanın Alındığı Komisyon",
                                publicInstitution: "Kamu Kurumu",
                                file: "Dosya",
                              }[field]
                            }
                          </label>
                          <input
                            type={field === "file" ? "file" : "text"}
                            name={field}
                            onChange={handleChange}
                            className="border p-2 rounded w-full"
                            required={field !== "file"}
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Submit Buttons */}
                  <div className="mt-4 flex justify-between">
                    <button
                      type="button"
                      onClick={handlePreviousStep}
                      className="px-4 py-2 text-gray-600 bg-gray-200 rounded hover:bg-gray-300 transition"
                    >
                      Geri
                    </button>
                    <button
                      type="submit"
                      className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition ${
                        loading ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      disabled={loading}
                    >
                      {loading ? "Saving..." : "Kaydet"}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {currentStep === 3 && (
              <div>
                <h2 className="text-xl font-bold mb-4 text-gray-800">
                  Onayla
                </h2>
                
                <p>Bilgileri onaylamak ve oluşturmak istiyor musunuz?</p>
                
                <button
                  onClick={handleFinalSubmit}
                  className={`px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Oluştur"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      {isModalOpen && selectedApplication && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Application Details
            </h2>
            <p>
              <strong>First Name:</strong> {selectedApplication.firstName}
            </p>
            <p>
              <strong>Last Name:</strong> {selectedApplication.lastName}
            </p>
            <p>
              <strong>Phone:</strong> {selectedApplication.applicationPhone}
            </p>
            <p>
              <strong>Email:</strong> {selectedApplication.applicationEmail}
            </p>
            <p>
              <strong>Reason for Application:</strong>{" "}
              {selectedApplication.applicationReason}
            </p>
            <p>
              <strong>Application Type:</strong>{" "}
              {selectedApplication.applicationType}
            </p>
            <button
              onClick={closeModal}
              className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationList;
