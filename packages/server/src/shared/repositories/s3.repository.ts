import { S3Client, PutObjectCommand, PutObjectCommandInput } from "@aws-sdk/client-s3";
import { randomUUID } from "node:crypto";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { env } from "@utils/environment";
import fs from "fs";

const s3Client = new S3Client({
  region: env.AWS_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
});

class S3Repository {
  async genPreSignedUrl(filename: string) {
    const command = new PutObjectCommand({
      Bucket: env.AWS_S3_BUCKET_NAME,
      Key: filename,
    });

    const presignedUrl = await getSignedUrl(s3Client, command);

    return { presignedUrl, filename };
  }

  async upload(file: fs.ReadStream, filename: string = randomUUID(), options?: Partial<PutObjectCommandInput>) {
    const command = new PutObjectCommand({
      Bucket: env.AWS_S3_BUCKET_NAME,
      Key: filename,
      Body: file,
      ...options
    });

    const uploadResponse = await s3Client.send(command);

    return Object.assign(uploadResponse, {
      url: `https://${env.AWS_S3_BUCKET_NAME}.s3.${env.AWS_REGION}.amazonaws.com/${filename}`,
    });
  }
}

export const s3Repository = new S3Repository();
