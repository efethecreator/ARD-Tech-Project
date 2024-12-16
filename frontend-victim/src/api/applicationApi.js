import applicationApi from "../api/applicationApi";

const handleSubmit = async (e) => {
  e.preventDefault();
  // ...
  try {
    const response = await applicationApi.createApplication(data);
    setSuccess("Başvurunuz başarıyla alındı.");
  } catch (err) {
    setError(err.response?.data?.message || "Başvuru gönderilemedi. Lütfen tekrar deneyin.");
  }
};
