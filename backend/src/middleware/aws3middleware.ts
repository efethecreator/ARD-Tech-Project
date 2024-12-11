import multer from "multer";
const storage = multer.memoryStorage(); // Dosyayı bellek üzerinde saklar
const upload = multer({ storage });
export default upload;