import { NextFunction, Request, Response } from "express";
export declare type Handler = (req: Request, res: Response, next: NextFunction) => any | Promise<any>;
export declare const wrap: (handler: Handler) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
