import { MemoryStore } from "express-session";
import { Email } from "./datatype";

declare module "express-session" {
  interface SessionData {
    email?: Email;
    csrfSecret?: string;
    csrfToken?: string;
  }
}

declare module "express" {
  interface Request {
    sessionStore: MemoryStore;
  }
}
