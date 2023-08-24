import { Handler } from "express";
import { Controller } from "../../common/interfaces/controller.interface";
import { DocumentService } from "./document.service";
import { ParticipantService } from "../participant/participant.service";
export declare const validEmailCheck: (email: string) => boolean;
export default class DocumentController implements Controller {
    path: string;
    router: import("express-serve-static-core").Router;
    documentService: DocumentService;
    participantService: ParticipantService;
    constructor();
    initializeRoutes(): void;
    checkValidatedUser: (req: any) => any;
    create: Handler;
    findOne: Handler;
    findAll: Handler;
    publish: Handler;
    remove: Handler;
}
