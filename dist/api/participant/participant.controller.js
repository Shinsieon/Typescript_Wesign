"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const request_handler_1 = require("../../lib/request-handler");
const participant_repository_1 = require("./participant.repository");
const participant_service_1 = require("./participant.service");
class ParticipantController {
    constructor() {
        this.path = "/participant";
        this.router = express_1.Router();
        this.participantService = new participant_service_1.ParticipantService(new participant_repository_1.ParticipantRepository());
        this.token = (req) => {
            const { documentId, email } = req.body;
            const [token, participant] = this.participantService.issueAccessToken({
                documentId,
                email,
            });
            req.session.email = participant.email;
            return {
                token,
                participant,
            };
        };
        this.readDocument = (req, res) => {
            throw new Error("Method not implemented.");
        };
        this.sign = (req, res) => {
            throw new Error("Method not implemented.");
        };
        this.initializeRoutes();
    }
    initializeRoutes() {
        const router = express_1.Router();
        router
            .post("/token", request_handler_1.wrap(this.token))
            .get("/document", request_handler_1.wrap(this.readDocument))
            .post("/sign", request_handler_1.wrap(this.sign));
        this.router.use(this.path, router);
    }
}
exports.default = ParticipantController;
//# sourceMappingURL=participant.controller.js.map