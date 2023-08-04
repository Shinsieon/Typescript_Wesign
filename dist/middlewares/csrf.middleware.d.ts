import { Handler } from "express";
export declare const CSRF_TOKEN_HEADER = "x-csrf-token";
export declare const csrf: () => Handler;
