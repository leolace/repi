import { useGetRootData } from "@hooks/use-get-root-data";
import { client } from "@services/api.client";
import { endpoints } from "@services/endpoints";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

const {
  republica: { getUpdateAvatarUrl },
} = endpoints;

export function useUpdateAvatarProfilePic(
  options?: UseMutationOptions<void, Error, File, unknown>,
) {
  const { user } = useGetRootData();

  return useMutation({
    mutationFn: async (file: File) => {
      if (!user) return;
      const formData = new FormData();
      formData.append("avatar", file);

      console.log(getUpdateAvatarUrl(user.id));

      const response = await client
        .patch(getUpdateAvatarUrl(user.id), {
          body: formData,
        })
        .json<void>();

      return response;
    },
    ...options,
  });
}
