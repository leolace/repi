import { env } from "@utils/env";

export const endpoints = {
  republica: {
    getUpdateAvatarUrl: (userId: string) =>
      `${env.PUBLIC_API_ENDPOINT}/user/${userId}/avatar`,
  },
};
