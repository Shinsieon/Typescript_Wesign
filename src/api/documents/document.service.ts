import { DocumentDto, DocumentResponse } from "./dto/document.dto";
import { DocumentRepository } from "./document.repository";
import { v4 as uuidv4 } from "uuid";
import { UUID } from "../../@types/datatype";

// CREATE TABLE `documents` (
//   `id` TEXT PRIMARY KEY,
//   `user_id` TEXT NOT NULL,
//   `title` TEXT NOT NULL,
//   `content` TEXT NOT NULL,
//   `status` TEXT NOT NULL,
//   `created_at` TEXT,
//   `updated_at` TEXT
// );
export class DocumentService {
  constructor(private readonly documentRepository: DocumentRepository) {}

  createDocument({ user_id, title, content }): DocumentResponse {
    const id: UUID = uuidv4();
    const now = new Date().toISOString();
    const status = "CREATED";
    this.documentRepository.create({
      id,
      user_id,
      title,
      content,
      status,
      created_at: now,
      updated_at: now,
    });
    return id;
  }
  readDocument(id: UUID) {
    const document = this.documentRepository.select(id);
    console.log("read document", document);
    return document;
    //participants의 서명은 없어야 한다.
    // return document.participants.map((participant) => {
    //   let { signature, ...rest } = participant;
    //   return rest;
    // });
  }
}
