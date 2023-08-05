import { DocumentDto } from "./dto/document.dto";
import { DocumentRepository } from "./document.repository";
import { v4 as uuidv4 } from "uuid";
import { UUID } from "../../@types/datatype";

export class DocumentService {
  constructor(private readonly documentRepository: DocumentRepository) {}

  createDocument({ title, content, participants }: DocumentDto) {
    const id: UUID = uuidv4();
    this.documentRepository.create({
      title,
      content,
      participants,
    });

    return id;
  }
  readDocument(id: UUID) {
    const document = this.documentRepository.select(id);
    console.log("read document", document);
    //participants의 서명은 없어야 한다.
    return document.participants.map((participant) => {
      let { signature, ...rest } = participant;
      return rest;
    });
  }
}
