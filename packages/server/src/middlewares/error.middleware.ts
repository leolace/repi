import { AppError } from "@shared/utils/error";
import { NextFunction, Request, Response } from "express";

export const errorMiddleware = (
  err: AppError,
  req: Request,
  res: Response,
  _: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  console.log(`[${req.url} - ${statusCode}]`, err.message);
  console.log(err.stack);
  res
    .status(statusCode)
    .json({ status: statusCode, error: err.message, path: req.url });
};
