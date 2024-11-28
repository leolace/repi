"use server";
import "server-only";
import { client } from "@services/client";
import { parseFormData } from "@utils/parse-formdata";
import { env, IToken, IUserJWTPayload, UserClassesEnum } from "common";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { isErrorResponse } from "@utils/is-error-response";
import * as jose from "jose";

console.log(env);

export async function createAccountAction(formData: FormData) {
  const name = parseFormData(formData, "name");
  const email = parseFormData(formData, "email");
  const classType = parseFormData(formData, "class");
  const password = parseFormData(formData, "password");
  let tags: string[] | undefined;

  if (classType === UserClassesEnum.BIXO) {
    tags = parseFormData(formData, "tags").split(",").filter(Boolean);
  }

  const res = await client("/auth", {
    method: "POST",
    body: JSON.stringify({
      name,
      email,
      class: classType,
      password,
      tags,
    }),
  });

  if (res.statusText !== "OK")
    return { errors: res.data, request: JSON.stringify(res) };

  redirect("/");
}

export async function setSessionCookie(session: string) {
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const c = await cookies();
  console.log("SETANDO COOOKIES");
  c.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function verifySession() {
  const c = await cookies();
  const sessionCookie = c.get("session")?.value;
  if (!sessionCookie) return null;
  let isValidSession: null | IUserJWTPayload = null;

  try {
    const encodedSecret = new TextEncoder().encode(env.JWT_SECRET);
    const result = await jose.jwtVerify<IUserJWTPayload>(
      sessionCookie,
      encodedSecret
    );
    isValidSession = result.payload;
  } catch (e) {
    console.log(e);
    isValidSession = null;
  }

  return isValidSession;
}

export async function getSession() {
  const session = await verifySession();

  if (!session) {
    await logOut();
    return null;
  }

  return session;
}

export async function login(_: unknown, formData: FormData) {
  const email = parseFormData(formData, "email");
  const password = parseFormData(formData, "password");

  const res = await client<IToken>("/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!res.ok || isErrorResponse(res.data))
    return { errors: res.data, request: JSON.stringify(res) };

  await setSessionCookie(res.data.token);
  redirect("/");
}

export async function deleteSessionCookie() {
  (await cookies()).delete("session");
}

export async function logOut() {
  await deleteSessionCookie();
  redirect("/");
}
