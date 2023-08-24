"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParticipantRepository = void 0;
const database_1 = require("../../lib/database");
const participant_entity_1 = require("./entities/participant.entity");
class ParticipantRepository {
    constructor() {
        this.tableName = "participants";
    }
    findById(id) {
        const raw = database_1.db
            .prepare(`SELECT * FROM ${this.tableName} WHERE id = ?`)
            .get(id);
        return participant_entity_1.Participant.fromJson(raw);
    }
    findByDocumentId(document_id) {
        const raw = database_1.db
            .prepare(`SELECT * FROM ${this.tableName} WHERE document_id = ?`)
            .all(document_id);
        return raw;
    }
    findByEmail(email) {
        const raw = database_1.db
            .prepare(`SELECT * FROM ${this.tableName} WHERE email = ?`)
            .get(email);
        return participant_entity_1.Participant.fromJson(raw);
    }
    findByDocumentIdAndEmail(documentId, email) {
        const raw = database_1.db
            .prepare(`SELECT * FROM ${this.tableName} WHERE document_id = ? and email = ?`)
            .get(documentId, email);
        return participant_entity_1.Participant.fromJson(raw);
    }
    create(participants) {
        const result = database_1.db.prepare([
            "INSERT INTO",
            this.tableName,
            "(id, document_id, name, email, status, signature, created_at, updated_at)",
            "VALUES",
            "($id, $document_id, $name, $email, $status, $signature, $created_at, $updated_at)",
        ].join(" "));
        const many = database_1.db.transaction((participants) => {
            for (const participant of participants) {
                result.run(participant);
            }
        });
        many(participants);
        return;
    }
    remove(document_id) {
        const result = database_1.db
            .prepare(["UPDATE", this.tableName, "SET status = ? where document_id = ?"].join(" "))
            .run(["DELETED", document_id]);
        return true;
    }
    publish(document_id) {
        const result = database_1.db
            .prepare(["UPDATE", this.tableName, "SET status = ? where document_id = ?"].join(" "))
            .run(["INVITED", document_id]);
        return true;
    }
    sign(email) {
        const result = database_1.db
            .prepare([
            "UPDATE",
            this.tableName,
            "SET signature = ?, status=? where email = ?",
        ].join(" "))
            .run(["sign", "SIGNED", email]);
        console.log("sign 여기?", result, email);
        return true;
    }
}
exports.ParticipantRepository = ParticipantRepository;
//# sourceMappingURL=participant.repository.js.map