import { authClient, client } from "../services/client.server";
import {
  Bixo,
  CompleteSelfUser,
  CompleteUser,
  IUser,
  Republica,
  UserClassesEnum,
} from "common";
// import { verifySession } from "./auth.server";
import { isErrorResponseData } from "../utils/is-error-response";
import { cache } from "react";
import { deleteSessionCookie } from "../cookie.server";
import { redirect } from "react-router";

export const getUsers = async () => {
  const users = await client<IUser[]>("/users");
  return users.data;
};

// export const getSelf = cache(
//   async (request: Request): Promise<CompleteSelfUser | null> => {
//     const session = await verifySession(request);
//     if (!session) return null;

//     const { data: user } = await authClient<CompleteSelfUser>("/auth/me", {
//       sessionToken: session.token,
//     });

//     if (isErrorResponseData(user)) return null;

//     if (!user)
//       throw redirect("/", {
//         headers: {
//           "Set-Cookie": await deleteSessionCookie(),
//         },
//       });

//     const selfUser: CompleteSelfUser = Object.assign(user, { session });

//     return selfUser;
//   },
// );

// export async function getUserById(userId: string) {
//   const users = await client<IUser[]>(`/users?id=${userId}`);
//   return users.data;
// }

// export async function getCompleteUserById(userId: string) {
//   const user = await client<CompleteUser<Bixo | Republica>>(`/user/${userId}`);
//   return user.data;
// }

// export async function getRepublicaByUser(userId: string) {
//   const republica = await client<Republica>(`/republica/${userId}`);
//   return republica.data;
// }

// export const getUserByEmail = async (email: string) => {
//   const users = await client<IUser[]>(`/users?email=${email}`);
//   return users.data;
// };

// export const getUserByClass = async (classType: UserClassesEnum) => {
//   const users = await client<IUser[]>(`/users?class=${classType}`);
//   return users.data;
// };

// export const editUser = async (
//   request: Request,
//   userId: string,
//   dataToEdit: Partial<CompleteUser<Partial<Bixo | Republica>>>,
// ) => {
//   const session = await verifySession(request);
//   if (!session) throw new Error("Verify session failed");

//   const editedUser = await authClient<void>(
//     `/user/${userId}`,
//     {
//       sessionToken: session.token,
//       method: "PATCH",
//       body: JSON.stringify(dataToEdit),
//     },
//   );

//   return editedUser;
// };

// export const uploadFile = async (url: string, file: File) => {
//   const uploadedFile = await fetch(url, {
//     method: "PUT",
//     body: file,
//   });

//   return uploadedFile;
// };
