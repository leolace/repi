import { useSession } from "@contexts/session";
import { client } from "@services/api.client";
import { endpoints } from "@services/endpoints";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { RepublicaEditForm } from "./edit.types";

const {
  republica: { getUpdateAvatarUrl, getUpdateRepublicaUrl },
} = endpoints;

export function useUpdateRepublica() {
  const { user } = useSession();

  return useMutation({
    mutationFn: async (data: RepublicaEditForm) => {
      if (!user) return;

      const response = await client
        .patch(getUpdateRepublicaUrl(user.id), {
          json: data,
        })
        .json();

      return response;
    },
  });
}

export function useUpdateAvatarProfilePic(
  options?: UseMutationOptions<void, Error, File, unknown>,
) {
  const { user, refetchUser } = useSession();

  return useMutation({
    mutationFn: async (file: File) => {
      if (!user) return;
      const formData = new FormData();
      formData.append("avatar", file);

      const response = await client
        .patch(getUpdateAvatarUrl(user.id), {
          body: formData,
        })
        .json<void>();

      await refetchUser();
      return response;
    },
    ...options,
  });
}
