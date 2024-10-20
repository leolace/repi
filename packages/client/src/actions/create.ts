"use server";

// import { ICreateAccountUser } from "@app/auth/criar/page.types";

const users: { name: string; email: string; class: string }[] = [];

export const createAccountAction = async (formData: FormData) => {
  console.log(formData);

  const name = formData.get("name")?.toString();
  const email = formData.get("email")?.toString();
  const classType = formData.get("class")?.toString();

  if (!name || !email || !classType) return;

  await new Promise((res) => setTimeout(res, 1000));
	console.log(name, email, classType);

  users.push({ name, email, class: classType });
};

export const getUsers = async () => {
  return users;
};
