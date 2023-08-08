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
    return;
  }
  select(id: UUID) {
    const result: DocumentRaw = db
      .prepare(`SELECT * FROM ${this.tableName} WHERE id = ?`)
      .get(id);

    return result;
  }
  selectAll() {
    const result: DocumentRaw[] = db
      .prepare(`SELECT * FROM ${this.tableName}`)
      .all();

    return result;
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
  remove(document_id: UUID) {
    const result = db
      .prepare(
        ["UPDATE", this.tableName, "SET status=? WHERE id = ?"].join(" ")
      )
      .run("DELETED", document_id);
    return true;
  }
  publish(document_id: UUID) {
    const result = db
      .prepare(
        ["UPDATE", this.tableName, "SET status=? WHERE id = ?"].join(" ")
      )
      .run("PUBLISHED", document_id);
    return true;
  }
}
