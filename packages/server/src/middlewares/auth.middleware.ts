import { ErrorE } from "@utils/error";
import { validateSessionToken } from "@utils/generate-token";
import { NextFunction, Request, Response } from "express";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;
  if (!authorization) throw new ErrorE("Authorization not found.", 401);

  const sessionToken = await validateSessionToken(authorization);
  if (!sessionToken) throw new ErrorE("Invalid authorization", 401);

  next();
}
