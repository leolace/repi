import { IUserJWTPayload } from "common";

declare global {
  namespace Express {
    interface Locals {
      user?: IUserJWTPayload;
    }
  }
}
