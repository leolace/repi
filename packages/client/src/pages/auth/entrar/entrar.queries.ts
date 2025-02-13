import { client } from "@services/api.client";
import { useMutation } from "@tanstack/react-query";
import { ILoginProps } from "./entrar.types";

export function useLoginMutation() {
  return useMutation({
    mutationFn: async ({ email, password }: ILoginProps) => {
      const response = await client.post("/auth/login", {
        json: {
          email,
          password,
        },
      });

      return response;
    },
    onSuccess: () => {
      console.log("success");
    }
  });
}
