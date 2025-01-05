import { IUserJWTPayload } from "common";
import { Locals } from "express";

declare global {
  namespace Express {
    interface Locals {
      user?: IUserJWTPayload;
    }
  }
}
