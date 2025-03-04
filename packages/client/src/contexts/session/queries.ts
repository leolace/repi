import { client } from "@services/api.client";
import { endpoints } from "@services/endpoints";
import { useQuery } from "@tanstack/react-query";
import { CompleteSelfUser } from "common";

const ENDPOINT = endpoints.auth.getSelfUserUrl();

export function useSelfUserQuery(sessionToken: string) {
  return useQuery({
    queryKey: [sessionToken, "self"],
    queryFn: async () => {
      const response = await client.get<CompleteSelfUser>(ENDPOINT, {
        headers: {
          Authorization: sessionToken,
        },
      });
      if (!response.ok) throw new Error("Algo deu errado.");

      return response.json();
    },
    enabled: !!sessionToken,
  });
}
