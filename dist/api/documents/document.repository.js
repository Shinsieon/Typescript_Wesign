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
        return;
    }
    select(id) {
        const result = database_1.db
            .prepare(`SELECT * FROM ${this.tableName} WHERE id = ?`)
            .get(id);
        return result;
    }
    selectAll() {
        const result = database_1.db
            .prepare(`SELECT * FROM ${this.tableName}`)
            .all();
        return result;
    }
    save_history(raw) {
        const result = database_1.db
            .prepare([
            "INSERT INTO",
            this.tableName,
            "(id, document_id, type, data, created_at)",
            "VALUES",
            "('', $document_id, $type, $data, $created_at)",
        ].join(" "))
            .run(raw);
        return;
    }
    remove(document_id) {
        const result = database_1.db
            .prepare(["UPDATE", this.tableName, "SET status=? WHERE id = ?"].join(" "))
            .run("DELETED", document_id);
        return true;
    }
    publish(document_id) {
        const result = database_1.db
            .prepare(["UPDATE", this.tableName, "SET status=? WHERE id = ?"].join(" "))
            .run("PUBLISHED", document_id);
        return true;
    }
}
exports.DocumentRepository = DocumentRepository;
//# sourceMappingURL=document.repository.js.map