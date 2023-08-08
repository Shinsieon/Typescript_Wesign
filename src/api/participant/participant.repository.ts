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
  findByDocumentId(document_id: UUID) {
    const raw: ParticipantRaw[] = db
      .prepare(`SELECT * FROM ${this.tableName} WHERE document_id = ?`)
      .all(document_id);

    return raw;
  }

  findByDocumentIdAndEmail(documentId: UUID, email: Email) {
    const raw: ParticipantRaw = db
      .prepare(
        `SELECT * FROM ${this.tableName} WHERE document_id = ? and email = ?`
      )
      .get(documentId, email);

    return Participant.fromJson(raw);
  }

  create(participants: ParticipantRaw[]) {
    //console.log("participant reposiory", participants);
    const result = db.prepare(
      [
        "INSERT INTO",
        this.tableName,
        "(id, document_id, name, email, status, signature, created_at, updated_at)",
        "VALUES",
        "($id, $document_id, $name, $email, $status, $signature, $created_at, $updated_at)",
      ].join(" ")
    );
    const many = db.transaction((participants) => {
      for (const participant of participants) {
        result.run(participant);
      }
    });
    many(participants);
    return;
  }
  remove(document_id: UUID) {
    const result = db
      .prepare(
        ["UPDATE", this.tableName, "SET status = ? where document_id = ?"].join(
          " "
        )
      )
      .run(["DELETED", document_id]);
    return true;
  }
  publish(document_id: UUID) {
    const result = db
      .prepare(
        ["UPDATE", this.tableName, "SET status = ? where document_id = ?"].join(
          " "
        )
      )
      .run(["INVITED", document_id]);
    return true;
  }
}
