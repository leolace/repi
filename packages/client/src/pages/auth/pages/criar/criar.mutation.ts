import { client } from "@services/api.client";
import { endpoints } from "@services/endpoints";
import { useMutation } from "@tanstack/react-query";
import { CreateAccountFormFields } from "./criar.types";

const ENDPOINT = endpoints.auth.getCreateUserAccountUrl();

export function UseCreateAccountMutation() {
  return useMutation({
    mutationFn: async (data: CreateAccountFormFields) => {
      const response = await client.post(ENDPOINT, { json: data });

      return response;
    },
  });
}
