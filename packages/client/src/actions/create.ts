"use server";

// import { ICreateAccountUser } from "@app/auth/criar/page.types";

export const createAccountAction = async (formData: FormData) => {
  console.log(formData);

	await new Promise(res => setTimeout(res, 1000));
};
