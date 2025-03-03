import { env } from "@utils/environment";

export const endpoints = {
  republica: {
    getUpdateAvatarUrl: (userId: string) =>
      `${env.API_ENDPOINT}/user/${userId}/avatar`,
  },
  auth: {
    getLoginUrl: () => `${env.API_ENDPOINT}/auth/login`,
    getCreateUserAccountUrl: () => `${env.API_ENDPOINT}/user`,
    getSelfUserUrl: () => `${env.API_ENDPOINT}/auth/me`,
  }
};
