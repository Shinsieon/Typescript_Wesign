import { Controller } from "../../common/interfaces/controller.interface";
import { Handler } from "../../lib/request-handler";
import { ParticipantService } from "./participant.service";
import { DocumentService } from "../documents/document.service";
export default class ParticipantController implements Controller {
    path: string;
    router: import("express-serve-static-core").Router;
    participantService: ParticipantService;
    documentService: DocumentService;
    constructor();
    initializeRoutes(): void;
    token: Handler;
    readDocument: Handler;
    sign: Handler;
}
