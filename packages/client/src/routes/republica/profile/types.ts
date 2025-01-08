import { IUser, Republica } from "common";

export interface RouteData {
  user: IUser;
  republica: Republica;
  isOwnerUser: boolean;
}
