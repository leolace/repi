import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "node:crypto";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { env } from "common/src/environment.server";

const s3Client = new S3Client({
  region: "us-east-2",
  credentials: {
    accessKeyId: env.AWS_ACESS_KEY,
    secretAccessKey: env.AWS_SECRET_ACESS_KEY,
  },
});

class S3C {
  async genPreSignedUrl(filename: string) {
    const command = new PutObjectCommand({
      Bucket: "repi-web-s3",
      Key: filename,
    });

    const presignedUrl = await getSignedUrl(s3Client, command);

    return { presignedUrl, filename };
  }

  async upload(file: File) {
    const fileKey = `${randomUUID()}-${file.name}`;

    const command = new PutObjectCommand({
      Bucket: "repi-web-s3",
      Key: fileKey,
      Body: file,
    });

    const a = await s3Client.send(command);

    console.log(a);
  }
}

export const S3 = new S3C();
