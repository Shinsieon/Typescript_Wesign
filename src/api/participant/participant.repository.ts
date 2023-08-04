import { Email, UUID } from "../../@types/datatype";
import { Repository } from "../../common/interfaces/repository.interface";
import { db } from "../../lib/database";
import { Participant, ParticipantRaw } from "./entities/participant.entity";

export class ParticipantRepository implements Repository {
  readonly tableName = "participants";

  findById(id: UUID) {
    const raw: ParticipantRaw = db
      .prepare(`SELECT * FROM ${this.tableName} WHERE id = ?`)
      .get(id);

    return Participant.fromJson(raw);
  }

  findByDocumentIdAndEmail(documentId: UUID, email: Email) {
    const raw: ParticipantRaw = db
      .prepare(
        `SELECT * FROM ${this.tableName} WHERE document_id = ? and email = ?`
      )
      .get(documentId, email);

    return Participant.fromJson(raw);
  }
}
