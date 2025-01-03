import * as jose from "jose";
import { IUserJWTPayload } from "common";
import { env } from "common/src/environment.server";

const encodedSecret = new TextEncoder().encode(env.JWT_SECRET);
export async function genSessionToken(
  payload: jose.JWTPayload,
  expirationTime: string
) {
  const generatedToken = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setIssuer("urn:example:issuer")
    .setAudience("urn:example:audience")
    .setExpirationTime(expirationTime)
    .sign(encodedSecret);

  return generatedToken;
}

export async function validateSessionToken(token: string) {
  let decryptedSessionToken: IUserJWTPayload | null = null;
  try {
    decryptedSessionToken = (await jose.jwtVerify<IUserJWTPayload>(token, encodedSecret)).payload;
  } catch(e) {
    decryptedSessionToken = null;
  }

  return decryptedSessionToken;
}
