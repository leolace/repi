import { CompleteSelfUser } from "common";

export interface ISessionContext {
  user: CompleteSelfUser | null;
  logout: VoidFunction;
}
