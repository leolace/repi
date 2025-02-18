import { client } from "@services/api.client";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { ILoginProps } from "@pages/auth/pages/entrar/entrar.types";
import { endpoints } from "@services/endpoints";
import { IToken } from "common";

const {
  auth: { getLoginUrl },
} = endpoints;

export function useLoginMutation(options?: UseMutationOptions<IToken, unknown, ILoginProps>) {
  return useMutation({
    mutationFn: async ({ email, password }: ILoginProps) => {
      const endpoint = getLoginUrl();
      const response = await client.post<IToken>(endpoint, {
        json: {
          email,
          password,
        },
      }).json();

      return response;
    },
    onError: (error) => {
      console.error(error);
    },
    ...options
  });
}
