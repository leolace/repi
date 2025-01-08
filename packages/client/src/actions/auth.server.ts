import { authClient, client } from "../services/client.server";
import { parseFormData } from "../utils/parse-formdata";
import { IToken, IUser, IUserJWTPayload, UserClassesEnum } from "common";
import * as jose from "jose";
import { redirect } from "react-router";
import { createSessionCookie, getSessionCookie } from "../cookie.server";
import { env } from "common/src/environment.server";

export async function createAccountAction(formData: FormData) {
  const name = parseFormData(formData, "name");
  const email = parseFormData(formData, "email");
  const classType = parseFormData(formData, "class");
  const password = parseFormData(formData, "password");
  let tags: string[] | undefined;

  if (classType === UserClassesEnum.BIXO) 
    tags = parseFormData(formData, "tags").split(",").filter(Boolean);

  const res = await client<IUser>("/user", {
    method: "POST",
    body: JSON.stringify({
      name,
      email,
      class: classType,
      password,
      tags
    })
  });

  return res;
}

export async function verifySession(request: Request) {
  const sessionCookie = await getSessionCookie(request);
  if (!sessionCookie) return null;
  let isValidSession: null | (IUserJWTPayload & { token: string }) = null;

  try {
    const encodedSecret = new TextEncoder().encode(env.JWT_SECRET);
    const result = await jose.jwtVerify<IUserJWTPayload>(
      sessionCookie,
      encodedSecret
    );
    isValidSession = { ...result.payload, token: sessionCookie };
  } catch (e) {
    console.log(e);
    isValidSession = null;
  }

  return isValidSession;
}

async function loginUser({
  email,
  password
}: {
  email: string;
  password: string;
}) {
  const res = await client<IToken>("/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password
    })
  });

  return res;
}

export async function loginAction(formData: FormData) {
  const email = parseFormData(formData, "email");
  const password = parseFormData(formData, "password");

  return await loginUser({ email, password });
}

export async function logout(request: Request) {
  const session = await verifySession(request);
  if (!session) return;

  await authClient("/auth/logout", {
    sessionToken: session.token,
    method: "DELETE",
    body: JSON.stringify({ userId: session.userId })
  });

  return redirect("/inicio", {
    headers: {
      "Set-Cookie": await createSessionCookie("", { maxAge: -1 })
    }
  });
}

export async function requireAuth(request: Request) {
  const token = await verifySession(request);

  if (!token)
    throw redirect("/inicio", {
      headers: {
        "Set-Cookie": await createSessionCookie("", { maxAge: -1 })
      }
    });

  return token;
}

export async function requireClass(
  request: Request,
  userClass: UserClassesEnum
) {
  const token = await verifySession(request);

  if (!token)
    throw redirect("/inicio", {
      headers: {
        "Set-Cookie": await createSessionCookie("", { maxAge: -1 })
      }
    });

  if (token.class !== userClass) throw redirect("/inicio");

  return token;
}
