import { UserClassesEnum } from "../types/index";

export const isUserClass = (value?: string): value is UserClassesEnum => {
  return Object.values(UserClassesEnum).includes(value as UserClassesEnum);
};

export const isValidEmail = (value?: string) => {
  if (!value) return false;
  const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;

  return emailRegex.test(value);
};
