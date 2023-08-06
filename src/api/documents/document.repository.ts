import { db } from "../../lib/database";
import { Repository } from "../../common/interfaces/repository.interface";
import { UUID } from "../../@types/datatype";
import {
  Document,
  DocumentHistoryRaw,
  DocumentRaw,
} from "./entities/document.entity";

export class DocumentRepository implements Repository {
  tableName = "documents";

  create(raw: DocumentRaw) {
    //document 를 생성합니다.
    const result = db
      .prepare(
        [
          "INSERT INTO",
          this.tableName,
          "(id, user_id, title, content, status, created_at, updated_at)",
          "VALUES",
          "($id, $user_id, $title, $content, $status, $created_at, $updated_at)",
        ].join(" ")
      )
      .run(raw);
    console.log("document create result :", result, raw);
    return;
  }
  select(id: UUID) {
    console.log("document repository", id);
    const raw: DocumentRaw = db
      .prepare(`SELECT * FROM ${this.tableName} WHERE id = ?`)
      .get(id);

    return Document.fromJson(raw);
  }

  save_history(raw: DocumentHistoryRaw) {
    const result = db
      .prepare(
        [
          "INSERT INTO",
          this.tableName,
          "(id, document_id, type, data, created_at)",
          "VALUES",
          "('', $document_id, $type, $data, $created_at)",
        ].join(" ")
      )
      .run(raw);

    return;
  }
}
