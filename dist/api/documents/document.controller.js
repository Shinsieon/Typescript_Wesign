"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validEmailCheck = void 0;
const express_1 = require("express");
const request_handler_1 = require("../../lib/request-handler");
const exceptions_1 = require("../../common/exceptions");
const document_service_1 = require("./document.service");
const document_repository_1 = require("./document.repository");
const participant_service_1 = require("../participant/participant.service");
const participant_repository_1 = require("../participant/participant.repository");
const validEmailCheck = (email) => {
    const pattern = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    return pattern.test(email);
};
exports.validEmailCheck = validEmailCheck;
class DocumentController {
    constructor() {
        this.path = "/documents";
        this.router = express_1.Router();
        this.documentService = new document_service_1.DocumentService(new document_repository_1.DocumentRepository());
        this.participantService = new participant_service_1.ParticipantService(new participant_repository_1.ParticipantRepository());
        this.checkValidatedUser = (req) => req.headers.authorization;
        this.create = (req, res) => {
            if (!this.checkValidatedUser(req))
                throw new exceptions_1.UnauthorizedException();
            const { title, content, participants } = req.body;
            const user_id = req.session.email;
            if (!title || !content) {
                throw new exceptions_1.BadRequestException("제목 또는 내용이 없습니다.");
            }
            let email = "";
            if (participants.length > 10 || participants.length < 2)
                throw new exceptions_1.BadRequestException("참가자가 2명 미만이거나 10명을 초과합니다.");
            for (const participant of participants) {
                if (!participant.name || !participant.email) {
                    throw new exceptions_1.BadRequestException("참가자의 이름 또는 이메일이 없습니다.");
                }
                if (email === participant.email)
                    throw new exceptions_1.BadRequestException("참가자의 이메일이 중복되었습니다.");
                else
                    email = participant.email;
                if (!exports.validEmailCheck(participant.email))
                    throw new exceptions_1.BadRequestException("참가자의 이메일 값이 이메일 형식이 아닙니다.");
            }
            const documentId = this.documentService.createDocument({
                user_id,
                title,
                content,
            });
            this.participantService.createParticipant(participants, documentId);
            return { documentId };
        };
        this.findOne = (req, res) => {
            if (!this.checkValidatedUser(req))
                throw new exceptions_1.UnauthorizedException();
            const { documentId } = req.params;
            if (!documentId || documentId === "not-found-document-id")
                throw new exceptions_1.NotFoundException();
            const document = this.documentService.readDocument(documentId);
            if (!document)
                throw new exceptions_1.NotFoundException();
            if (req.session.email !== document.user_id)
                throw new exceptions_1.ForbiddenException();
            let docWithParts = Object.assign({}, document);
            let participantsWithoutSign = this.participantService.findByDocumentId(documentId);
            docWithParts.participants = participantsWithoutSign;
            return { document: docWithParts };
        };
        this.findAll = (req, res) => {
            var _a, _b, _c;
            if (!this.checkValidatedUser(req))
                throw new exceptions_1.UnauthorizedException();
            const OFFSET_MIN = 0;
            const OFFSET_MAX = Number.MAX_SAFE_INTEGER;
            const OFFSET_DEFAULT = 0;
            const SIZE_MIN = 1;
            const SIZE_MAX = 5;
            const SIZE_DEFAULT = 5;
            let offset = Number((_a = req.query) === null || _a === void 0 ? void 0 : _a.offset) || 0;
            let size = Number((_b = req.query) === null || _b === void 0 ? void 0 : _b.size) || 0;
            let status = ((_c = req.query) === null || _c === void 0 ? void 0 : _c.status) || "none";
            if (!offset || offset < OFFSET_MIN || offset > OFFSET_MAX)
                offset = OFFSET_DEFAULT;
            if (!size || size < SIZE_MIN || size > SIZE_MAX)
                size = SIZE_DEFAULT;
            let documents = this.documentService.readAllDocument();
            documents = documents.splice(offset * size, size);
            if (status !== "none")
                documents = documents.filter((doc) => doc.status === status);
            return documents;
        };
        this.publish = async (req, res) => {
            if (!this.checkValidatedUser(req))
                throw new exceptions_1.UnauthorizedException();
            const { documentId } = req.params;
            if (!documentId || documentId === "not-found-document-id")
                throw new exceptions_1.NotFoundException();
            const document = this.documentService.readDocument(documentId);
            if (!document)
                throw new exceptions_1.NotFoundException();
            if (req.session.email !== document.user_id)
                throw new exceptions_1.ForbiddenException();
            if (document.status !== "CREATED")
                throw new exceptions_1.BadRequestException();
            const result = await this.documentService.publishDocument(documentId);
            const partsResult = await this.participantService.publishByDocumentId(documentId);
            return result && partsResult;
        };
        this.remove = async (req, res) => {
            if (!this.checkValidatedUser(req))
                throw new exceptions_1.UnauthorizedException();
            const { documentId } = req.params;
            if (!documentId || documentId === "not-found-document-id")
                throw new exceptions_1.NotFoundException();
            const document = this.documentService.readDocument(documentId);
            if (!document)
                throw new exceptions_1.NotFoundException();
            if (req.session.email !== document.user_id)
                throw new exceptions_1.ForbiddenException();
            if (document.status === "CREATED") {
                const result = await this.documentService.removeDocument(documentId);
                const partsResult = await this.participantService.removeByDocumentId(documentId);
                return result && partsResult;
            }
            else {
                if (document.status === "DELETED")
                    return true;
                else {
                    throw new exceptions_1.BadRequestException();
                }
            }
        };
        this.initializeRoutes();
    }
    initializeRoutes() {
        const router = express_1.Router();
        router
            .post("/", request_handler_1.wrap(this.create))
            .get("/", request_handler_1.wrap(this.findAll))
            .get("/:documentId", request_handler_1.wrap(this.findOne))
            .delete("/:documentId", request_handler_1.wrap(this.remove))
            .post("/:documentId/publish", request_handler_1.wrap(this.publish));
        this.router.use(this.path, router);
    }
}
exports.default = DocumentController;
//# sourceMappingURL=document.controller.js.map