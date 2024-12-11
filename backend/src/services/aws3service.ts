import { PutObjectCommand } from "@aws-sdk/client-s3";
import s3Client from "../config/aws3client";
export const uploadFileS3 = async (key: string, file: any) => {
  try {
    const fileBody = file instanceof Buffer ? file : file.buffer;
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME, // S3 Bucket adı
      Key: key, // Dosya ismi
      Body: fileBody, // Dosya içeriği
      ContentType: file.mimetype || "application/octet-stream", // Dosya tipi
    });
    const uploadResult = await s3Client.send(command);
    console.log("File uploaded successfully:", uploadResult);
    return { uploadResult, fileKey: key }; // Yükleme sonucunu ve dosya anahtarını döndür
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    throw error;
  }
};
