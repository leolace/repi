import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { RepublicaProfileParams } from "./profile.types";
import { endpoints } from "@services/endpoints";
import { client } from "@services/api.client";
import { CompleteUser, Republica } from "common";

export function useRepublicaProfileQuery() {
  const { id } = useParams<RepublicaProfileParams>();

  return useQuery({
    queryKey: [id, "republica_profile"],
    queryFn: async () => {
      if (!id) throw new Error("Missing republica id");
      const REPUBLICA_ENDPOINT = endpoints.republica.getCompleteUserUrl(id);
      const response =
        await client.get<CompleteUser<Republica>>(REPUBLICA_ENDPOINT);
      return response.json();
    },
    enabled: !!id,
  });
}
