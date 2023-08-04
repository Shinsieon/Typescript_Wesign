import { Controller } from "../../common/interfaces/controller.interface";
import { Handler } from "../../lib/request-handler";
import { ParticipantService } from "./participant.service";
export default class ParticipantController implements Controller {
    path: string;
    router: import("express-serve-static-core").Router;
    participantService: ParticipantService;
    constructor();
    initializeRoutes(): void;
    token: Handler;
    readDocument: Handler;
    sign: Handler;
}
