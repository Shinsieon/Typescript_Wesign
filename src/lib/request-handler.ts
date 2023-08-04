import { NextFunction, Request, Response } from "express";

export type Handler = (
  req: Request,
  res: Response,
  next: NextFunction
) => any | Promise<any>;

export const wrap =
  (handler: Handler) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await handler(req, res, next);
      const wrapResponse = {
        success: res.statusCode === 200 ? true : false,
        response: res.statusCode === 200 ? response : null,
        error: res.statusCode === 200 ? null : response,
      };
      res.json(wrapResponse);
      next();
    } catch (err) {
      next(err);
    }
  };
