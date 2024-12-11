import { S3Client } from "@aws-sdk/client-s3";
const s3Client = new S3Client({
  region: process.env.AWS_REGION, // AWS bölgesi
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!, // AWS Access Key
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!, // AWS Secret Key
  },
});
export default s3Client;