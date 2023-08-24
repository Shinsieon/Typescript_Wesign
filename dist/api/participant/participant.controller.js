"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const request_handler_1 = require("../../lib/request-handler");
const participant_repository_1 = require("./participant.repository");
const participant_service_1 = require("./participant.service");
const exceptions_1 = require("../../common/exceptions");
const document_service_1 = require("../documents/document.service");
const document_repository_1 = require("../documents/document.repository");
class ParticipantController {
    constructor() {
        this.path = "/participant";
        this.router = express_1.Router();
        this.participantService = new participant_service_1.ParticipantService(new participant_repository_1.ParticipantRepository());
        this.documentService = new document_service_1.DocumentService(new document_repository_1.DocumentRepository());
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
            if (!req.headers.authorization)
                throw new exceptions_1.UnauthorizedException();
            const { email } = req.session;
            const participant = this.participantService.findByEmail(email);
            const document = this.documentService.readDocument(participant.documentId);
            return { document };
        };
        this.sign = (req, res) => {
            if (!req.headers.authorization)
                throw new exceptions_1.UnauthorizedException();
            const { signature } = req.body;
            const { email } = req.session;
            if (!signature)
                throw new exceptions_1.BadRequestException();
            const participant = this.participantService.findByEmail(email);
            if (participant.status === "SIGNED")
                throw new exceptions_1.BadRequestException();
            return this.participantService.sign(email);
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