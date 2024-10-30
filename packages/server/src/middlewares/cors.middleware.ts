import { NextFunction, Request, Response } from "express";

export const corsMiddleware = (
  _: Request,
  res: Response,
  next: NextFunction,
) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
};