import { NotFoundException } from "../../common/exceptions";
import * as jwt from "../../lib/jwt";
import { DocumentDto } from "./dto/document.dto";
import { DocumentJson } from "./entities/document.entity";
import { DocumentRepository } from "./document.repository";
import { v4 as uuidv4 } from "uuid";
import { UUID } from "../../@types/datatype";

const DISABLE_STATUSES = Object.freeze(["CREATED", "DELETED"]);

export class DocumentService {
  constructor(private readonly documentRepository: DocumentRepository) {}

  createDocument({ title, content, participants }: DocumentDto) {
    const status = "CREATED";
    const id: UUID = uuidv4();
    const now = new Date().toISOString();

    // this.documentRepository.create({
    //   id,
    //   user_id,
    //   title,
    //   content: content,
    //   created_at: now,
    //   updated_at: now,
    // });

    return id;
  }
}
