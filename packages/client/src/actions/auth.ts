"use server"
import { client } from "@services/client";

export const createAccountAction = async (formData: FormData) => {
  const name = formData.get("name")?.toString();
  const email = formData.get("email")?.toString();
  const classType = formData.get("class")?.toString();
  const password = formData.get("password")?.toString();

  try {
    if (!name || !email || !classType || !password) {
			throw new Error("Fields are missing");
		};

    const res = await client.post("/users", { name, email, class: classType, password });

		return res.data;
  } catch (e) {
		console.error(e);
	}
};
