import { Handler } from "express";
import { Controller } from "../../common/interfaces/controller.interface";
import { DocumentService } from "./document.service";
export declare const validEmailCheck: (email: string) => boolean;
export default class DocumentController implements Controller {
    path: string;
    router: import("express-serve-static-core").Router;
    docService: DocumentService;
    constructor();
    initializeRoutes(): void;
    create: Handler;
    findOne: Handler;
    findAll: Handler;
    publish: Handler;
    remove: Handler;
}
