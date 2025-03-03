import { ISessionContext } from "./types";

export const defaltSessionContext: ISessionContext = {
  user: null,
  logout: () => {},
};