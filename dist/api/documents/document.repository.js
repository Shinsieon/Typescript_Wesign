"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentRepository = void 0;
const database_1 = require("../../lib/database");
class DocumentRepository {
    constructor() {
        this.tableName = "documents";
    }
    create(raw) {
        const result = database_1.db
            .prepare([
            "INSERT INTO",
            this.tableName,
            "(id, user_id, title, content, status, created_at, updated_at)",
            "VALUES",
            "($id, $user_id, $title, $content, $status, $created_at, $updated_at)",
        ].join(" "))
            .run(raw);
        return result;
    }
}
exports.DocumentRepository = DocumentRepository;
//# sourceMappingURL=document.repository.js.map