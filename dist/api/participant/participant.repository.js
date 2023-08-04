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
    findByDocumentIdAndEmail(documentId, email) {
        const raw = database_1.db
            .prepare(`SELECT * FROM ${this.tableName} WHERE document_id = ? and email = ?`)
            .get(documentId, email);
        return participant_entity_1.Participant.fromJson(raw);
    }
}
exports.ParticipantRepository = ParticipantRepository;
//# sourceMappingURL=participant.repository.js.map