import { DocumentDto, DocumentResponse } from "./dto/document.dto";
import { DocumentRepository } from "./document.repository";
import { v4 as uuidv4 } from "uuid";
import { UUID } from "../../@types/datatype";
import { DocumentRaw } from "./entities/document.entity";

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
  readDocument(id: UUID): DocumentRaw {
    const document = this.documentRepository.select(id);
    return document;
  }
  async removeDocument(id: UUID): Promise<boolean> {
    const result = await this.documentRepository.remove(id);
    return true;
  }
  async publishDocument(id: UUID): Promise<boolean> {
    const result = await this.documentRepository.publish(id);
    return true;
  }
  readAllDocument(): DocumentRaw[] {
    return this.documentRepository.selectAll();
  }
}
