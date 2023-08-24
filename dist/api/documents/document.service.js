"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentService = void 0;
const uuid_1 = require("uuid");
class DocumentService {
    constructor(documentRepository) {
        this.documentRepository = documentRepository;
    }
    createDocument({ user_id, title, content }) {
        const id = uuid_1.v4();
        const now = new Date().toISOString();
        const status = "CREATED";
        this.documentRepository.create({
            id,
            user_id,
            title,
            content,
            status,
            created_at: now,
            updated_at: now,
        });
        return id;
    }
    readDocument(id) {
        const document = this.documentRepository.select(id);
        return document;
    }
    async removeDocument(id) {
        const result = await this.documentRepository.remove(id);
        return true;
    }
    async publishDocument(id) {
        const result = await this.documentRepository.publish(id);
        return true;
    }
    readAllDocument() {
        return this.documentRepository.selectAll();
    }
}
exports.DocumentService = DocumentService;
//# sourceMappingURL=document.service.js.map