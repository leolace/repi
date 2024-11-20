import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { IUserJWTPayload } from "common";

export const getSession = async () => {
  const session = (await cookies()).get("session")?.value;

  if (!session) return null;
  const decodedSession = jwt.decode(session) as IUserJWTPayload;

  return decodedSession;
};
