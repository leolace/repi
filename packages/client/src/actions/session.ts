"use server";

export async function getUser() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log("leonardo");
  return { nome: "leonardo" };
}
