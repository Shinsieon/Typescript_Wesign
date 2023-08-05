import { db } from "../../lib/database";
import { Repository } from "../../common/interfaces/repository.interface";
import { DocumentDto } from "./dto/document.dto";
import { UUID } from "../../@types/datatype";
import { Document, DocumentRaw } from "./entities/document.entity";

export class DocumentRepository implements Repository {
  tableName = "documents";

  create(raws: DocumentDto) {
    const result = db.prepare(
      [
        "INSERT INTO",
        this.tableName,
        "(id, user_id, title, content, status, created_at, updated_at)",
        "VALUES",
        "($id, $user_id, $title, $content, $status, $created_at, $updated_at)",
      ].join(" ")
    );

    const many = db.transaction((raws) => {
      for (const raw of raws) result.run(raw);
    });
    return;
  }
  select(id: UUID) {
    console.log("document repository", id);
    const raw: DocumentRaw = db
      .prepare(`SELECT * FROM ${this.tableName} WHERE id = ?`)
      .get(id);

    return Document.fromJson(raw);
  }
}
