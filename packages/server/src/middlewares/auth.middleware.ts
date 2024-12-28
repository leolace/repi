import { ErrorE } from "@utils/error";
import { validateSessionToken } from "@utils/generate-token";
import { NextFunction, Request, Response } from "express";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;
  if (!authorization) throw new ErrorE("Authorization not found.");

  const token = await validateSessionToken(authorization);
  if (!token) throw new ErrorE("Invalid authorization");

  next();
}
