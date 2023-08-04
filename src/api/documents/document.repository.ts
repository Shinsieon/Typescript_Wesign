import { CountResult } from "../../common/interfaces/database-result";
import { Email, UUID } from "../../@types/datatype";
import { db } from "../../lib/database";
import { Document, DocumentRaw } from "./entities/document.entity";
import { Repository } from "../../common/interfaces/repository.interface";

export class DocumentRepository implements Repository {
  tableName = "documents";

  create(raw: DocumentRaw) {
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

    return result;
  }
}
