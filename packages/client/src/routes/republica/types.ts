import { CompleteUser, Republica } from "common";

export interface RouteData {
  user: CompleteUser<Republica>;
  isOwnerUser: boolean;
}
