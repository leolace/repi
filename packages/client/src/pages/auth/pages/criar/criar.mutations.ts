import { client } from "@services/api.client";
import { endpoints } from "@services/endpoints";
import { useMutation } from "@tanstack/react-query";
import { CreateAccountFormFields } from "./criar.types";
import { useLoginMutation } from "../entrar/entrar.mutations";

const ENDPOINT = endpoints.auth.getCreateUserAccountUrl();

export function useCreateAccountMutation() {
  const { mutateAsync: loginMutation } = useLoginMutation();
  return useMutation({
    mutationFn: async (data: CreateAccountFormFields) => {
      const response = await client.post(ENDPOINT, { json: data });

      return response;
    },
    onSuccess: async (_, { email, password }) => {
      await loginMutation({ email, password });
    },
  });
}
