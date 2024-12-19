import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import applicationApi from "../api/applicationApi";
import violationApi from "../api/violationApi";

const ApplicationDetailPage = () => {
  const { id } = useParams(); // URL parametresinden başvurunun id'sini alıyoruz
  const navigate = useNavigate();
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
    file: null, // Dosyalar burada tutulacak
    violationId: "", // Violation ID
  });
  const [loading, setLoading] = useState(false);
  const [violationData, setViolationData] = useState(null); // Hak ihlali verilerini tutacak state
  const [showViolation, setShowViolation] = useState(false); // Violation bilgilerini göster/gizle durumu

  useEffect(() => {
    const fetchApplicationDetails = async () => {
      setLoading(true);
      try {
        const response = await applicationApi.getById(id); // Başvuruyu ID ile al
        setFormData(response.data); // Formu başvuru verileri ile doldur

        // Eğer başvuruda violationId varsa, hak ihlali verilerini çek
        if (response.data.violationId) {
          const violationResponse = await violationApi.getViolationById(
            response.data.violationId
          );
          setViolationData(violationResponse.data); // Violation verilerini set et
        }
      } catch (error) {
        console.error("Error fetching application details:", error);
        alert("Başvuru verileri alınırken bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplicationDetails();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Violation inputlarını güncellemeyi sağlayan fonksiyon
  const handleViolationInputChange = (e) => {
    const { name, value } = e.target;
    setViolationData({ ...violationData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await applicationApi.update(id, formData); // Başvuruyu güncelle
      alert("Başvuru başarıyla güncellendi!");
      navigate("/applications"); // Başarılı güncelleme sonrası başvuru listesine dön
    } catch (error) {
      console.error("Error updating application:", error);
      alert("Başvuru güncellenirken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddViolation = async () => {
    const violationData = {
      category: "Human Rights",
      eventCategory: "Labor Rights",
      eventSummary: "Summary of the event here",
      source: "Newspaper",
      link: "https://www.example.com/link-to-event",
      visualLink: "https://www.example.com/link-to-event-image",
    };
    try {
      const violationResponse = await violationApi.createViolation(
        violationData
      );
      await violationApi.addViolation(id, {
        violationId: violationResponse.data._id,
      });
      alert("Hak ihlali başarıyla eklendi!");
    } catch (error) {
      console.error("Error adding violation:", error);
      alert("Hak ihlali eklenirken bir hata oluştu.");
    }
  };

  const handleUpdateViolation = async () => {
    try {
      await violationApi.updateViolation(violationData._id, violationData); // Hak ihlali verilerini güncelle
      alert("Hak ihlali başarıyla güncellendi!");
    } catch (error) {
      console.error("Error updating violation:", error);
      alert("Hak ihlali güncellenirken bir hata oluştu.");
    }
  };

  // Violation detaylarının görünürlüğünü toggle eden fonksiyon
  const toggleViolationDetails = () => {
    setShowViolation(!showViolation);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Başvuru Detayları
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            type="text"
            name="applicationPhone"
            value={formData.applicationPhone}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="text"
            name="applicationEmail"
            value={formData.applicationEmail}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Applicant Type
          </label>
          <input
            type="text"
            name="applicantType"
            value={formData.applicantType}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Application Reason
          </label>
          <input
            type="text"
            name="applicationReason"
            value={formData.applicationReason}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Application Type
          </label>
          <input
            type="text"
            name="applicationType"
            value={formData.applicationType}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Company Name
          </label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Company Type
          </label>
          <input
            type="text"
            name="companyType"
            value={formData.companyType}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Uploaded Files
          </label>
          <div className="space-y-2">
            {formData.files && formData.files.length > 0 ? (
              formData.files.map((file, index) => (
                <div key={index}>
                  <a
                    href={file.fileKey}
                    target="_blank"
                    className="text-blue-500"
                  >
                    {file.fileKey}
                  </a>
                </div>
              ))
            ) : (
              <p>No files uploaded.</p>
            )}
          </div>
        </div>

        <div className="mt-4">
          <button
            type="submit"
            className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>

      {/* Hak ihlali verisini düzenlenebilir hale getirme */}
      {formData.violationId ? (
        <div className="mt-4">
          <button
            onClick={toggleViolationDetails}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            {showViolation
              ? "Hide Violation Details"
              : "Show Violation Details"}
          </button>

          {showViolation && violationData && (
            <div className="mt-4 p-4 bg-gray-50 rounded border">
              <h3 className="text-lg font-bold">Violation Details</h3>

              {/* Verilerin düzenlenebilir olması için inputlar ekledik */}
              {violationData.category && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={violationData.category}
                    onChange={handleViolationInputChange}
                    className="mt-1 p-2 w-full border rounded"
                  />
                </div>
              )}

              {violationData.scanPeriod && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Scan Period
                  </label>
                  <input
                    type="text"
                    name="scanPeriod"
                    value={violationData.scanPeriod}
                    onChange={handleViolationInputChange}
                    className="mt-1 p-2 w-full border rounded"
                  />
                </div>
              )}

              {violationData.eventCategory && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Event Category
                  </label>
                  <input
                    type="text"
                    name="eventCategory"
                    value={violationData.eventCategory}
                    onChange={handleViolationInputChange}
                    className="mt-1 p-2 w-full border rounded"
                  />
                </div>
              )}

              {violationData.eventSummary && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Event Summary
                  </label>
                  <textarea
                    name="eventSummary"
                    value={violationData.eventSummary}
                    onChange={handleViolationInputChange}
                    className="mt-1 p-2 w-full border rounded"
                  />
                </div>
              )}

              {violationData.notificationInstitution && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Notification Institution
                  </label>
                  <input
                    type="text"
                    name="notificationInstitution"
                    value={violationData.notificationInstitution}
                    onChange={handleViolationInputChange}
                    className="mt-1 p-2 w-full border rounded"
                  />
                </div>
              )}

              {violationData.commissionCase && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Commission Case
                  </label>
                  <input
                    type="text"
                    name="commissionCase"
                    value={violationData.commissionCase}
                    onChange={handleViolationInputChange}
                    className="mt-1 p-2 w-full border rounded"
                  />
                </div>
              )}

              {violationData.publicInstitution && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Public Institution
                  </label>
                  <input
                    type="text"
                    name="publicInstitution"
                    value={violationData.publicInstitution}
                    onChange={handleViolationInputChange}
                    className="mt-1 p-2 w-full border rounded"
                  />
                </div>
              )}

              {violationData.source && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Source
                  </label>
                  <input
                    type="text"
                    name="source"
                    value={violationData.source}
                    onChange={handleViolationInputChange}
                    className="mt-1 p-2 w-full border rounded"
                  />
                </div>
              )}

              {violationData.link && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Link
                  </label>
                  <input
                    type="text"
                    name="link"
                    value={violationData.link}
                    onChange={handleViolationInputChange}
                    className="mt-1 p-2 w-full border rounded"
                  />
                </div>
              )}

              {violationData.visualLink && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Visual Link
                  </label>
                  <input
                    type="text"
                    name="visualLink"
                    value={violationData.visualLink}
                    onChange={handleViolationInputChange}
                    className="mt-1 p-2 w-full border rounded"
                  />
                </div>
              )}

              {/* Save Button */}
              <div className="mt-4">
                <button
                  onClick={handleUpdateViolation} // Veriyi kaydetmek için
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                >
                  Save Violation Details
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="mt-4">
          <button
            onClick={handleAddViolation}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Hak İhlali Ekle
          </button>
        </div>
      )}
    </div>
  );
};

export default ApplicationDetailPage;
