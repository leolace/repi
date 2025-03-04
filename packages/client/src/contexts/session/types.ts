import { QueryObserverResult } from "@tanstack/react-query";
import { CompleteSelfUser } from "common";

export interface ISessionContext {
  user?: CompleteSelfUser;
  logout: VoidFunction;
  refetchUser: Promise<QueryObserverResult<CompleteSelfUser, Error>>;
}
