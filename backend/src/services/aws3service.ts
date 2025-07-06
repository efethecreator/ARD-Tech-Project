import { PutObjectCommand } from "@aws-sdk/client-s3";
import s3Client from "../config/aws3client";
export const uploadFileS3 = async (key: string, file: any) => {
  try {
    const fileBody = file instanceof Buffer ? file : file.buffer;
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
      Body: fileBody,
      ContentType: file.mimetype || "application/octet-stream", 
    });
    const uploadResult = await s3Client.send(command);
    console.log("File uploaded successfully:", uploadResult);
    return { uploadResult, fileKey: key }; 
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    throw error;
  }
};
