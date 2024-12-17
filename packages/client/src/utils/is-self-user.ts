import { ISelfUser } from "common";

export const isSelfUser = (user: unknown): user is ISelfUser => {
  return (
    !!user && typeof user === "object" && "id" in user && "session" in user
  );
}