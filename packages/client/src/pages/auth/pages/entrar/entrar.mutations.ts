import { client } from "@services/api.client";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { ILoginProps } from "@pages/auth/pages/entrar/entrar.types";
import { endpoints } from "@services/endpoints";
import { IToken } from "common";
import { useNavigate } from "react-router";
import { useSessionToken } from "@hooks/session-token";

const LOGIN_ENDPOINT = endpoints.auth.getLoginUrl();

export function useLoginMutation(
  options?: UseMutationOptions<IToken, unknown, ILoginProps>,
) {
  const navigate = useNavigate();
  const { setSessionToken } = useSessionToken();
  return useMutation({
    mutationFn: async ({ email, password }: ILoginProps) => {
      const response = await client.post<IToken>(LOGIN_ENDPOINT, {
        json: {
          email,
          password,
        },
      });

      return response.json();
    },
    onError: (error) => {
      console.error(error);
    },
    onSuccess: ({ token }) => {
      setSessionToken(token);
      navigate("/inicio");
    },
    ...options,
  });
}
