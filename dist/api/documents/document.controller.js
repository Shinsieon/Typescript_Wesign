"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validEmailCheck = void 0;
const express_1 = require("express");
const exceptions_1 = require("../../common/exceptions");
const request_handler_1 = require("../../lib/request-handler");
const document_service_1 = require("./document.service");
const document_repository_1 = require("./document.repository");
const validEmailCheck = (email) => {
    const pattern = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    return pattern.test(email);
};
exports.validEmailCheck = validEmailCheck;
class DocumentController {
    constructor() {
        this.path = "/documents";
        this.router = express_1.Router();
        this.docService = new document_service_1.DocumentService(new document_repository_1.DocumentRepository());
        this.create = (req, res) => {
            console.log("[headers]", req.headers);
            if (!req.headers.authorization)
                throw new exceptions_1.UnauthorizedException();
            const { title, content, participants } = req.body;
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
            return {
                email,
            };
        };
        this.findOne = (req, res) => {
            throw new Error("Method not implemented.");
        };
        this.findAll = (req, res) => {
            throw new Error("Method not implemented.");
        };
        this.publish = (req, res) => {
            throw new Error("Method not implemented.");
        };
        this.remove = (req, res) => {
            throw new Error("Method not implemented.");
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