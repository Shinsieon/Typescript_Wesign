"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentService = void 0;
const uuid_1 = require("uuid");
const DISABLE_STATUSES = Object.freeze(["CREATED", "DELETED"]);
class DocumentService {
    constructor(documentRepository) {
        this.documentRepository = documentRepository;
    }
    createDocument({ title, content, participants }) {
        const status = "CREATED";
        const id = uuid_1.v4();
        const now = new Date().toISOString();
        return id;
    }
}
exports.DocumentService = DocumentService;
//# sourceMappingURL=document.service.js.map