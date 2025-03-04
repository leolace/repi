import { ISessionContext } from "./types";

export const defaultSessionContext: ISessionContext = {
  user: null,
  logout: () => {},
};