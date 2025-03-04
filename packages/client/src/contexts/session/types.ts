import { CompleteSelfUser } from "common";

export interface ISessionContext {
  user?: CompleteSelfUser;
  logout: VoidFunction;
}
