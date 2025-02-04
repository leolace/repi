import { AppError } from "@shared/utils/error";
import { validateSessionToken } from "@shared/utils/generate-token";
import { NextFunction, Request, Response } from "express";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { authorization } = req.headers;
  if (!authorization)
    throw AppError.UnauthorizedException("Authorization not found.");

  const payload = await validateSessionToken(authorization);
  if (!payload) throw AppError.ForbiddenException("Invalid authorization");

  req.app.locals = { user: payload };

  next();
}
